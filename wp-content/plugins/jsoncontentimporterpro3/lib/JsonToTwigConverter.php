<?php

class JsonToTwigConverter
{
    const INDENT_STEP = '  ';
    const STUB_OBJECT_NAME = 'item';


    private $json;


    public function __construct($json = '')
    {
        $this->json = $json;
    }



    public function getTwig()
    {
        $lines = $this->getLines($this->json);

        return implode(PHP_EOL, $lines);
    }

    public function convertJsonStringToTwig($jsonString, $outputFile)
    {
        $lines = $this->getLines($jsonString);
        file_put_contents($outputFile, implode(PHP_EOL, $lines));
    }

    /**
     * Return array of lines
     *
     * @param $jsonString string Expects raw json string
     * @param int $level
     * @param null $key
     *
     * @return array|bool
     */
    public function getLines($jsonString, $level = 0, $key = null)
    {
        $jsonStructure = json_decode($jsonString);

        if (is_array($jsonStructure)){

            return $this->getLinesForArray($jsonStructure);

        } elseif (is_object($jsonStructure)){

            return $this->getLinesForObject($jsonStructure);
        }

        return false;
    }


    private function getLineForObjectProp($propKey, $level = 0, $key = null)
    {
        $propKeyValueLiteral = "{$key}['$propKey']";
//        if (!preg_match('/^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/', $propKey)){
//            $propKeyValueLiteral = "attribute($key, '$propKey')";
//        }

        $propKeyEsc = addcslashes($propKey, "{{}}");

        return str_repeat(self::INDENT_STEP, $level) . "$propKeyEsc = {{ $propKeyValueLiteral }}";
//        return str_repeat(self::INDENT_STEP, $level) . "{{ '$propKey: ' ~ $propKeyValueLiteral }}";
    }

    private function getLinesForObject(\StdClass $object, $level = 0, $key = null)
    {
        $lines = [];

        if ($level === 0 && !$key){
            $key = '_context';
        } elseif (!$key) {
            $key = self::STUB_OBJECT_NAME;
        }

        foreach ($object as $propKey => $propValue){
            $lines[] = str_repeat(self::INDENT_STEP, $level) . "{% if {$key}['$propKey'] is defined %}";
            if (is_array($propValue)){
                $lines[] = str_repeat(self::INDENT_STEP, $level + 1) . "{{ '$propKey: ' }}";
                $lines = array_merge($lines, $this->getLinesForArray($propValue, $level + 2, "{$key}['$propKey']"));
            } elseif (is_object($propValue)){
                $lines[] = str_repeat(self::INDENT_STEP, $level + 1) . "{{ '$propKey: ' }}";
                $lines = array_merge($lines, $this->getLinesForObject($propValue, $level + 2, "{$key}['$propKey']", substr($propKey, 0, -1)));
            } else {
                $lines[] = $this->getLineForObjectProp($propKey, $level + 2, $key);
            }
            $lines[] = str_repeat(self::INDENT_STEP, $level) . "{% endif %}";
        }

        return $lines;
    }

    private function getLinesForArray(array $array, $level = 0, $key = null, $itemKey = null)
    {
        $lines = [];

        if (!$key && $level === 0){
            $key = '_parent';
            $itemKey = 'item';
        }

        if (!$key){
            $key = 'level_' . $level . '_items';
        }

        if (!$itemKey){
            $itemKey = 'level_' . $level . '_item';
        }

        // @TODO now we're assuming that array's values are homogeneous. Probably consider opposite.
        $lines[] = str_repeat(self::INDENT_STEP, $level) . "{% for $itemKey in $key %}";
        if (isset($array[0]) && is_object($array[0])){
            $accumObj = $this->getAccumObjectOfArray($array);
            $lines = array_merge($lines, $this->getLinesForObject($accumObj, $level + 1, $itemKey));
        } elseif (isset($array[0]) && is_array($array[0])){
            $lines = array_merge($lines, $this->getLinesForArray($array[0], $level + 1, $itemKey));
        } else {
            $lines[] = str_repeat(self::INDENT_STEP, $level + 1) . "{{ $itemKey }}";
        }
        $lines[] = str_repeat(self::INDENT_STEP, $level) . "{% endfor %}";

        return $lines;

    }

    private function getAccumObjectOfArray($array)
    {
        $accumObj = new \StdClass();
        foreach ($array as $obj) {
            $accumObj = (object)array_merge((array)$accumObj, (array)$obj);
        }

        return $accumObj;
    }

}
