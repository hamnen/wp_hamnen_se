<?php
/*
 * work with twig 20181005
 */

class doTwig {
	private $isTwig2 = false;
	private $parser = "twig";
    private $twig_environment_settings = NULL;
	private $twig_loader = NULL;
	private $twig_environment = NULL;
	private $datastructure = "";
	private $ts = NULL;
	private $result = "";
	private $jsonObj = array();
	private $debugmsg = "";
	private $maskspecialcharsinjsonFlag = TRUE;

	
	public function __construct($parser, $maskspecialcharsinjsonFlag){ # construct - setTwig - tryTwig - getTwigResult - getTwigDebug
		$this->parser = $parser;
		$this->maskspecialcharsinjsonFlag = $maskspecialcharsinjsonFlag;
		$this->jci_setup_twig_environment();
		$this->addTwigExtensions();
    }

	public function executeTwig($jsonObj, $datastructure, $parser, $maskspecialcharsinjsonFlag){
		$this->setTwig($jsonObj, $datastructure, $parser, $maskspecialcharsinjsonFlag);
		$this->tryTwig();
		return $this->getTwigResult();
	}

	public function getTwigResult(){
		return $this->result;
	}
	
	public function getTwigDebug(){
		return $this->debugmsg;
	}

	public function setTwig($jsonObj, $datastructure, $parser, $maskspecialcharsinjsonFlag){
		$this->debugmsg = ""; # clear 
		$this->parser = $parser;
		$this->jsonObj = $jsonObj;
		$this->datastructure = $datastructure;
		$this->maskspecialcharsinjsonFlag = $maskspecialcharsinjsonFlag;
		$this->setTwigTemplate();
	}

	public function tryTwig(){
		try {
			$this->twig_environment->parse($this->twig_environment->tokenize($this->ts));
			// the $template is valid
        } catch (Twig_Error_Syntax $e) {
			// $template contains one or more syntax errors
			$this->jci_collectDebugMessage("twig: template-error: ".$e->getRawMessage());
			$errormsg = get_option('jci_pro_errormessage');
			if ($errormsg=="") {
				$this->result = $this->datastructure;
				return $this->debugmsg."Twig-Error: ".$e->getRawMessage();
			}
			$this->result = $this->datastructure;
			return $this->debugmsg.$errormsg." (101)";
        }
		#$this->datastructure = $this->maskSpecialCharsInJSON($this->datastructure);
		$template = $this->twig_environment->createTemplate($this->datastructure);
		$this->jci_collectDebugMessage("twig-template: ".$this->datastructure);
		$this->jci_collectDebugMessage("twig-JSON: ".print_r($this->jsonObj, TRUE));
		$resultTmp = $template->render($this->jsonObj);
		$this->result = $this->unmaskSpecialCharsInJSON($resultTmp);
		
	}
		
	public function maskSpecialCharsInJSON($intxt) {
        if (!$this->maskspecialcharsinjsonFlag) {
          return $intxt;
        }
        $intxt = preg_replace('/\$/', "_symbol_dollar_", $intxt);
        #$intxt = preg_replace('/</', "_symbol_smallerthan_", $intxt);
        #$intxt = preg_replace('/>/', "_symbol_greaterthan_", $intxt);
        #   $intxt = preg_replace('/\\\\\"/', "_symbol_backslash_masking_quotationmark_", $intxt);
        $intxt = preg_replace('/\\\\\//', "_symbol_backslash_masking_slash_", $intxt);
        #$intxt = preg_replace('/\//', "_symbol_slash_", $intxt);
        $intxt = preg_replace("/\@/", "_symbol_at_", $intxt);
        $intxt = preg_replace("/\!/", "_symbol_exclamationmark_", $intxt);
        return $intxt;
	}

	public function unMaskSpecialCharsInJSON($intxt) {
        if (!$this->maskspecialcharsinjsonFlag) {
          return $intxt;
        }
        $intxt = preg_replace("/_symbol_slash_/i", '/', $intxt);
        $intxt = preg_replace('/_symbol_backslash_masking_slash_/', '/', $intxt);
        $intxt = preg_replace('/_symbol_backslash_masking_quotationmark_/', '"', $intxt);
        $intxt = preg_replace("/_symbol_sqrbracket_open_/i", '[', $intxt);
        $intxt = preg_replace("/_symbol_sqrbracket_close_/i", ']', $intxt);
        $intxt = preg_replace("/_symbol_curlbracket_open_/i", '{', $intxt);
        $intxt = preg_replace("/_symbol_curlbracket_close_/i", '}', $intxt);
        $intxt = preg_replace("/_symbol_at_/i", "@", $intxt);
        $intxt = preg_replace("/_symbol_dot_/i", ".", $intxt);
        $intxt = preg_replace("/_symbol_exclamationmark_/i", "!", $intxt);
        $intxt = preg_replace('/_symbol_smallerthan_/', "<", $intxt);
        $intxt = preg_replace('/_symbol_greaterthan_/', ">", $intxt);
        $intxt = preg_replace("/_symbol_dollar_/i", '$', $intxt);
        return $intxt;
	}

	private function jci_setup_twig_environment() {
		# load and register Twig
		if (class_exists( 'Twig_Autoloader' ) ) {
			$foundTwigVersion = Twig_Environment::VERSION;
			if (preg_match("/^2/", $foundTwigVersion)) {
				$this->isTwig2 = TRUE;
			}
			$this->jci_collectDebugMessage("plugin is using Twig from another plugin: twig-version is ".$foundTwigVersion);
		} else {
			$this->jci_collectDebugMessage("load Twig from JCI-plugin");
			if ($this->parser=="twig243") {
				$inc = WP_PLUGIN_DIR . '/jsoncontentimporterpro3/vendor/autoload.php';
				require_once $inc;
				$this->isTwig2 = TRUE;
			} else {
				$inc = WP_PLUGIN_DIR . '/jsoncontentimporterpro3/Twig/Autoloader.php';
				if (!file_exists($inc) || !is_readable($inc)) {
					$this->jci_collectDebugMessage("Twig not found in ".$inc);
				} else {
					require_once $inc;
				}
				Twig_Autoloader::register();
			}
		}
		
		# set path to Twig-Templates
		$this->twig_loader = new Twig_Loader_Filesystem(WP_PLUGIN_DIR."/jsoncontentimporterpro3/"); # as we load the template via shortcode-param this is not needed - but I don't know how to avoid it...
		# set twig options
		$this->twig_environment_settings = array(
			'charset' => get_bloginfo('charset'),  # default is utf-8
			'autoescape' => false,
			#'strict_variables' => true,  # ignore invalid variables
			'auto_reload' => true,
			#'cache' => WP_CONTENT_DIR.'/cache/jsoncontentimporterpro/twigcache',
		);

		$cachebaseFolder = WP_CONTENT_DIR.'/cache/';
		$cacheFolder1 = $cachebaseFolder.'jsoncontentimporterpro/';
		$cacheFolder2 = $cacheFolder1.'twigcache';
		$twigcacheactive = TRUE;
		if (1!=get_option('jci_pro_enable_twigcache')) {
			$twigcacheactive = FALSE;
		}
		$twigCacheDirThere = FALSE;
		if (is_dir($cacheFolder2)) {
			# all there
			$twigCacheDirThere = TRUE;
		} else if (is_dir($cacheFolder1)) {
			if ($twigcacheactive) {
				$mkdirError2 = @mkdir($cacheFolder2);
				if (is_dir($cacheFolder2)) {
					# all there
					$twigCacheDirThere = TRUE;
				}
			}
		} else if (is_dir($cachebaseFolder)) {
			$mkdirError1 = @mkdir($cacheFolder1);
			if ($twigcacheactive) {
				$mkdirError2 = @mkdir($cacheFolder2);
			}
			if (is_dir($cacheFolder2)) {
				# all there
				$twigCacheDirThere = TRUE;
			}
		}
		if ($twigCacheDirThere && $twigcacheactive) {
			# all there
			$this->twig_environment_settings['cache'] = $cacheFolder2;
		}

		if (defined('WP_DEBUG') && true === WP_DEBUG) {
			$this->twig_environment_settings['debug'] = true;
		}

		# invoke Twig
  		$this->twig_environment = new Twig_Environment($this->twig_loader, $this->twig_environment_settings);

		## twig extension begin
       /*
	   $twig_extra_filter_convert2html = new Twig_SimpleFilter('convert2html', function ($data) {
           return "beroiuni";
       });
		$this->twig_environment->addFilter($twig_extra_filter_convert2html);
		*/
		/**/
		## twig extension end

		if (defined('WP_DEBUG') && true === WP_DEBUG) {
			$this->twig_environment->addExtension(new Twig_Extension_Debug());
		}
		$this->jci_collectDebugMessage("success - Twig loaded, version: ".Twig_Environment::VERSION);
	}

	private  function jci_collectDebugMessage($msg){
		$this->debugmsg .= htmlentities($msg)."<br>";
	}

	private function setTwigTemplate(){
       if ($this->parser=="twig") {
          $this->ts = $this->datastructure;
        } else if ($this->isTwig2) {
          $this->ts = new Twig_Source($this->datastructure, "");
        }
    }
	
	private function addTwigExtensions() {
		$twig_extra_filter_sortbyjsonfield = new Twig_SimpleFilter('sortbyjsonfield', function ($data, $sortdata) {
			$sortdataArr = explode("##", $sortdata);
			$i = 1;
			foreach ($sortdataArr as $val) {
				$sortdetailArr = explode(",", $val);
				$sortfield{$i} = trim($sortdetailArr[0]);
				$sortorder{$i} = "";
				if (isset($sortdetailArr[1])) {
					if ("desc"==trim($sortdetailArr[1])) {
						$sortorder{$i} = "desc";
					}
				}
				$sortflag{$i} = "";
				if (isset($sortdetailArr[2])) {
					if ("num"==trim($sortdetailArr[2])) {
						$sortflag{$i} = "num";
					}
				}
				$i++;
			}
			$data = $this->sortJsonArray($data, $sortfield, $sortorder, $sortflag);
			return $data;
		});

        $twig_extra_filter_dateformat = new Twig_SimpleFilter('dateformat', function ($data, $dateformatstr, $datetimezone, $datelocale) {
		    $curentTimezone = date_default_timezone_get();
 		    date_default_timezone_set($datetimezone);
		    $validDateLocale = FALSE;
		    if (preg_match("/([a-z_]*)/i", $datelocale)) {
				$validDateLocale = TRUE;
		    }
		    if ($validDateLocale) {
			    $getlocale = setlocale (LC_TIME,"0");
			    setlocale(LC_TIME, $datelocale);
		    }
			if (!( is_numeric($data) && (int)$data == $data )) {
				$data = strtotime($data);
			}
		    $formattedDate = strftime($dateformatstr, $data);
		    if ($validDateLocale) {
			    setlocale(LC_TIME, $getlocale);
		    }
		    date_default_timezone_set($curentTimezone);
		    return $formattedDate;
		});

        $twig_extra_filter_converthex2ascii = new Twig_SimpleFilter('converthex2ascii', function ($data) {
          #$data = "0xefef39a10000000000000000000000000000000000000000000000000000000000000005";
          $dataTmp = substr($data, 2, strlen($data));
          $dataTmp = @hex2bin ($dataTmp);
          if ($dataTmp) {
            $data = $dataTmp;
          }
	        return $data;
       });

       $twig_extra_filter_convert2html = new Twig_SimpleFilter('convert2html', function ($data) {
		 $data = $this->unMaskSpecialCharsInJSON($data);
         $dataTmp = htmlentities($data, TRUE);
         if (empty($dataTmp)) {
           return $this->maskSpecialCharsInJSON($data);
         }
         return $this->maskSpecialCharsInJSON($dataTmp);
       });

       $twig_extra_filter_base64encode = new Twig_SimpleFilter('base64encode', function ($data) {
         $data = $this->unMaskSpecialCharsInJSON($data);
         $dataTmp = base64_encode($data);
         if (empty($dataTmp)) {
           return $this->maskSpecialCharsInJSON($data);
         }
         return $this->maskSpecialCharsInJSON($dataTmp);
       });

       $twig_extra_filter_removespecialcharsinurl  = new Twig_SimpleFilter('removespecialcharsinurl', function ($data) {
         $data = $this->unMaskSpecialCharsInJSON($data);
         $data = strtolower($data);
         $data = preg_replace("/ /i", "-", $data);
         $data = str_replace(array('ä','ö','ü','ß','Ä','Ö','Ü', '&auml;', '&ouml;', '&uuml;', '&szlig;', '&Auml;', '&Ouml;', '&Uuml;'),array('ae','oe','ue','ss','Ae','Oe','Ue', 'ae', 'oe', 'ue', 'ss', 'Ae', 'Oe', 'Ue'),utf8_decode($data));
         $data = preg_replace("/[^a-z0-9\-]/i", "", $data);
         $data = $this->maskSpecialCharsInJSON($data);
         return $data;
       });

		$twig_extra_filter_stringshorter  = new Twig_SimpleFilter('stringshorter', function ($data, $length, $suffix) {
			$data = $this->unMaskSpecialCharsInJSON($data);
			if (strlen($data)<=$length) {
				return $this->maskSpecialCharsInJSON($data);
			}
			$data = mb_substr($data, 0, $length).$suffix;
			return $this->maskSpecialCharsInJSON($data);
		});

       $twig_extra_filter_numberformat  = new Twig_SimpleFilter('formatnumber', function ($data, $decimals, $dec_point, $thousands_sep) {
         if (!is_numeric($data)) {
           return $data;
         }
         $numArr = explode("-", (string) $data);
         if (count($numArr)==2 && is_numeric($numArr[1]) && $numArr[1]>0) {
           $data = number_format($data, $numArr[1]+1, $dec_point, $thousands_sep);
           return $data;
         }
         $numArr = explode("+", (string) $data);
         if (count($numArr)==2 && is_numeric($numArr[1]) && $numArr[1]>0) {
           $data = number_format($data, 0, $dec_point, $thousands_sep);
           return $data;
         }
         $data = number_format($data, $decimals, $dec_point, $thousands_sep);
         return $data;
       });
      $this->twig_environment->addFilter($twig_extra_filter_sortbyjsonfield);
      $this->twig_environment->addFilter($twig_extra_filter_dateformat);
      $this->twig_environment->addFilter($twig_extra_filter_convert2html);
      $this->twig_environment->addFilter($twig_extra_filter_base64encode);
      $this->twig_environment->addFilter($twig_extra_filter_removespecialcharsinurl);
      $this->twig_environment->addFilter($twig_extra_filter_stringshorter);
      $this->twig_environment->addFilter($twig_extra_filter_numberformat);
      $this->twig_environment->addFilter($twig_extra_filter_converthex2ascii);
	}
	
    private function sortJsonArray($arrayIn, $sortField, $sortOrder, $sortFlag) {
      @usort($arrayIn, function ($a, $b) use ($sortField, $sortOrder, $sortFlag) {
        $eval = NULL;
        for ($i=1;$i<=count($sortField);$i++) {
          if ($sortField{$i}=="") {
            continue;
          }
          $valA = $a[$sortField{$i}];
          $valB = $b[$sortField{$i}];

          $sr = $sortField{$i};
          if (preg_match("/\./", $sr)) {
            $tmpA = $a;
            $tmpB = $b;
            $srArr = explode(".", $sr);
            for ($ji=0;$ji<count($srArr);$ji++) {
              $tmpA = $tmpA[$srArr[$ji]];
              $tmpB = $tmpB[$srArr[$ji]];
            }
            $valA = $tmpA;
            $valB = $tmpB;
          }

          $this->jci_collectDebugMessage("sorting $sr, order: ".$sortOrder{$i}.": ".$valA." vs. ".$valB);
          if ($sortFlag{$i}=="num" && is_numeric($valA) && is_numeric($valB)) {
            if ($sortOrder{$i}=="desc") {
              $eval .= $valB-$valA;
            } else {
              $eval .= $valA-$valB;
            }
          } else {
             $d = strtolower($valB);
             $t = strtolower($valA);
          if ($sortOrder{$i}=="desc") {
              $eval .= strcmp($d,$t);
            } else {
              $eval .= strcmp($t,$d);
            }
          }
        }
        return $eval;
      });
      return $arrayIn;
    }	
}



?>
