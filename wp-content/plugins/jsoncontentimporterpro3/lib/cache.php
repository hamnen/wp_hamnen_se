<?php
# version 20190112

/* class jci_cache BEGIN */
class jci_Cache {
	/* internal */
	private $cacheFolder = "";
	private $cacheBaseFolder = "";
	private $errormessage = "";
	private $postPayload = "";
	private $postbody = "";

	public function __construct(){
        $this->cacheBaseFolder = WP_CONTENT_DIR.'/cache/';
        $this->cacheFolder = $this->cacheBaseFolder.'jsoncontentimporterpro/';
		$this->checkCacheFolder();
	}

	public function geterrormessage(){
		if (""==$this->errormessage) {
			$this->errormessage = "Cachefolders ok and available";
		}
		return $this->errormessage;
	}
	
	public function getCacheFileName($feedUrl, $postPayload="", $postbody="") {
		$cacheFile = $this->cacheFolder . sanitize_file_name(md5($feedUrl));  # cache json-feed
        if (!empty($postPayload)) {
    			$cacheFile .= "-pl".sanitize_file_name(md5($postPayload));
        }
        if (!empty($postbody)) {
    			$cacheFile .= "-pb".sanitize_file_name(md5($postbody));
        }
  		$cacheFile .= ".cgi";  # cache json-feed
		return $cacheFile;
	}

	public function getCacheFolder() {
		return $this->cacheFolder;
	}

	public function clearCacheFolder() {
		$cachefiles = glob($this->cacheFolder.'*'); // all files
        $nofiles = 0;
        foreach($cachefiles as $file){ // loop files
            if(is_file($file)) {
				#echo $file."<br>";
                $nofiles++;
                unlink($file); // do del
            }
        }
		function deleteDir($path) {
			if (empty($path)) {         return false;    }
			return is_file($path) ?
				@unlink($path) :
				array_map(__FUNCTION__, glob($path.'/*')) == @rmdir($path);
		}
		deleteDir($this->cacheFolder."twigcache");
        echo "$nofiles files deleted, twigcache deleted<br>";
		return $this->cacheFolder;
	}


	public function get_dir_size($directory) {
		$size = 0;
		foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory)) as $file) {
			if ($file->getFilename()!="." && $file->getFilename()!="..") {
				$size += $file->getSize();
			}
		}
		return $size;
	}	
	
	public function format_dir_size($dirsizeinbyte) {
		$sizeval = "MB";
		$sizeinmb = floor(10*$dirsizeinbyte/(1024*1024))/10;
		if (0==$sizeinmb) {
			$sizeinmb = floor(10*$dirsizeinbyte/(1024))/10;
			$sizeval = "kB";
		}
		return $sizeinmb." ".$sizeval;
	}	

	public function checkCacheFolder() {
        # wp version 4.4.2 and later: "/cache" is not created at install, so the plugin has to check and create...
        if (!is_dir($this->cacheBaseFolder)) {
          $mkdirError = @mkdir($this->cacheBaseFolder);
          if (!$mkdirError) {
            # mkdir failed, usually due to missing write-permissions
            $this->errormessage .= "<hr><b>caching not working, plugin aborted:</b><br>";
            $this->errormessage .= "plugin / wordpress / webserver can't create<br><i>".$this->cacheBaseFolder."</i><br>";
            $this->errormessage .= "therefore: set directory-permissions to 0777 (or other depending on the way you create directories with your webserver)<hr>";
            # abort: no caching possible
            return "";
          }
        }

        if (!is_dir($this->cacheFolder)) {
          # cachefolder is missing
          #
          # cacheFolder is always "cache/PLUGINNAME/"
          # check first if "cache" is there
          $cfArr = explode("/", $this->cacheFolder);
          array_pop($cfArr); array_pop($cfArr);
          $cfOneShort = join("/", $cfArr);
          if (!is_dir($cfOneShort)) {
            # create "..../cache/"
            $mkdirError = @mkdir($cfOneShort);
            if (!$mkdirError) {
              # create "..../cache/" failed
              $this->errormessage .= "<hr><b>caching not working, plugin aborted:</b><br>";
              $this->errormessage .= "plugin / wordpress / webserver can't create \"cache\"-folder<br><i>".$cfOneShort."</i><br>";
              $this->errormessage .= "therefore: set directory-permissions of parent-dir to 0777 (or other depending on the way you create directories with your webserver)<hr>";
              # abort: no caching possible
             return "";
            }
          }

          # $this->cacheFolder is no dir: not existing
          # try to create $this->cacheFolder
          $mkdirError = @mkdir($this->cacheFolder);
          if (!$mkdirError) {
            # mkdir failed, usually due to missing write-permissions
            $this->errormessage .= "<hr><b>caching not working, plugin aborted:</b><br>";
            $this->errormessage .= "plugin / wordpress / webserver can't create<br><i>".$this->cacheFolder."</i><br>";
            $this->errormessage .= "therefore: set directory-permissions to 0777 (or other depending on the way you create directories with your webserver)<hr>";
            # abort: no caching possible
            return "";
          }
        }
        # $this->cacheFolder writeable?
        if (!is_writeable($this->cacheFolder)) {
          $this->errormessage .= "please check cacheFolder:<br>".$this->cacheFolder."<br>is not writable. Please change permissions.";
          return "";
        }
	}
}
/* class CheckCacheFolder END */
?>