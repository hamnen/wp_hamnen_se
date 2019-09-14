<?php
/*
 * static to collect all debug messages....
 * versiondate: 20190112
 */

class logDebug {
	static public $debugmessage = "";
	
	static public function jci_addDebugMessage($debugmessageIn, $debugMode, $debugLevelCurrent, $debugLevel=2, $suffix="", $convert2html=TRUE, $switchoffDebugPrefix = FALSE, $prefix="", $maxlength=400){ 
		if (!$debugMode) {
			return "";
		}
		if ($debugLevelCurrent-$debugLevel<0) {
			return "";
		}
		if ($debugmessageIn=="") {
			return "";
		}
		$dmadd = "";
		if ($prefix) {
			$dmadd .= $prefix;
		}
		if (!$switchoffDebugPrefix) {
			$dmadd .= "<i>DEBUG: ";
		}
		#unset($debugmessageIn); $debugmessageIn{"test"} = "test";
		if (is_array($debugmessageIn)) {
			$debugmessageIn = self::jci_loadArray2str($debugmessageIn, ": ", " (", ") ");
		}
		if ($convert2html) {
			$dm = htmlentities(utf8_encode($debugmessageIn), ENT_QUOTES, "UTF-8");
			if ($dm=="") {
				$dmadd .= $debugmessageIn;
			} else {
				$dmadd .= $dm;
			}
		} else {
			$dmadd .= $debugmessageIn;
		}

		if (!$switchoffDebugPrefix) {
			$dmadd .= "</i>";
		}
		if ($suffix=="") {
			$dmadd .= "<br>";
		} else {
			$dmadd .= $suffix;
		}
		if (($maxlength>0) && (strlen($dmadd)>$maxlength)) {
			$dmadd = substr($dmadd, 0, $maxlength)."...<br>";
		}
		self::$debugmessage .= $dmadd;
    }

	static public  function jci_buildDebugTextarea($message, $debugMode, $debugLevelCurrent, $txt, $addline=FALSE) {
		$norowsmax = 20;
        $norows = $norowsmax; 
		
		$txt = preg_replace("/&#34;/", "&amp;#34;", $txt);
		$txt = htmlentities($txt);
		
        $strlentmp = round(strlen($txt)/90);
        if ($strlentmp<20) {
          $norows = $strlentmp;
        }
        $nooflines = substr_count($txt, "\n");
        if ($nooflines > $norows) {
          $norows = $nooflines;
        }
        if ($norows > $norowsmax) {
          $norows = $norowsmax;
        }
        $norows = $norows + 2;
        $out = $message."<br><textarea rows=".$norows." cols=90>".$txt."</textarea>";
        if ($addline) {
          $out .= "<hr>";
        }
        self::jci_addDebugMessage($out, $debugMode, $debugLevelCurrent, 10, "", FALSE, FALSE, "", -1);
	}
	
	static public function jci_clearDebugMessage() {
		self::$debugmessage = "";
	}

	static private function jci_loadArray2str($arr, $glue, $left, $right) {
      $out = "";
      foreach ($arr as $key => $value) {
        if (is_array($value)) {
          $v = "";
          foreach ($value as $key1 => $value1) {
            $v .= $left.$key1.$glue.$value1.$right;
          }
        } else {
          $v = $value;
        }
        $out .= $left.$key.$glue.$v.$right;
      }
      return $out;
    }	
	
	
}
?>
