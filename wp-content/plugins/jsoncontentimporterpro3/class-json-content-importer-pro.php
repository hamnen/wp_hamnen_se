<?php
/*
CLASS JsonContentImporterPro
Description: Class for WP-plugin "JSON Content Importer Pro"
Version: 3.4.13
Author: Bernhard Kux
Author URI: https://json-content-importer.com
*/

class JsonContentImporterPro {

    /* shortcode-params */
    private $numberofdisplayeditems = -1; # -1: show all
    private $feedUrl = ""; # url of JSON-Feed
    private $urlparam = ""; # dyn URL
    private $pathparam = ""; # dyn PATH WARRNING : must be written in the order we wish: dir1#dirA#file -> /valuedir1/valuedirA/valuefile
    private $fileext = ""; # extention of the file that finish the dyn Path
    private $urlgettimeout = 5; # 5 sec default timeout for http-url
    private $basenode = ""; # where in the JSON-Feed is the data?
    private $hidedisplayflag = FALSE; # display only if something is fullfilled: if TRUE show nothing
    private $loopWithoutSubloop = "";
    private $oneofthesewordsmustbein = ""; # optional: one of these ","-separated words have to be in the created html-code
    private $oneofthesewordsmustbeindepth = 1; # optional: json-tree-depth for $oneofthesewordsmustbein
    private $requiredfieldsandvalues = ""; # optional: if set only the "#"-separated list of "key=value" pairs are parsed, others are ignored
    private $requiredfieldsandvaluesdepth = 1; # optional:  json-tree-depth for $requiredfieldsandvalues
    private $delimiter = "##";

    private $sortField = "";
    private $sortorderIsUp = FALSE;
    private $sorttypeIsNatural = FALSE;
    private $filterresultsin = "";
    private $filterresultsnotin = "";

    private $templateid = "";
    private $nameoftemplate = "";

    private $requiredfieldsandvalueslogicandbetweentwofields = FALSE;
      # if true: several fields in requiredFieldsAndValues: all must match
      # if false: several fields in requiredFieldsAndValues: one of it must match

    private $oneofthesewordsmustnotbeIn = ""; # optional: one of these ","-separated words must NOT in the created html-code
    private $oneofthesewordsmustnotbeindepth = 1; # optional:  json-tree-depth for $oneofthesewordsmustnotbeIn

    /* plugin settings */
    private $isCacheEnable = FALSE;

    /* internal */
		private $cacheFile = "";
		private $jsondata = "";
    private $feedsource = "http"; # get json via http, file, ftp..., default: http, then empty
    private $feedfilename = "";
		private $feedData  = "";
 		#private $cacheFolder = "";
    #private $cacheBaseFolder = "";
    private $datastructure = "";
    private $triggerUnique = NULL;
    private $cacheExpireTime = 0;
    private $param1 = "";
    private $param2 = "";
    private $licencelevel = "-12";
    private $debugModeIsOn = FALSE;
    private $debugLevel = 2;
    private $debugMessage = "";
    private $method = "get";
    private $urlparamval = Array();
    private $postPayload = "";
    private $postbody = "";
    private $urlencodepostpayload = '';

    private $customfieldparam = "";
    private $header = "";
    private $auth = "";
    private $inputtype = "json";
    private $urlgetaddrandom = FALSE;
    private $trytohealjson = FALSE;
    private $cachetime = 0;

    private $parser = "jci"; # either "jci" or "twig"

    private $mode = '';
    private $pageid = '';
    private $createoptionsArr = NULL;
    private $convertJsonNumbers2Strings = FALSE;
    private $removeampfromurl = FALSE;
    private $curloptions = "";
    private $urladdparam = "";
    private $urlparam4twig = "";
	private $postdateoffset = 0;
	private $forceTemplate = FALSE;

    /* TWIG vars BEGIN */
    #private $twig_environment_settings = NULL;
		private $twig_loader = NULL;
#		private $twig_environment = NULL;
    #private $isTwig2 = FALSE;
    private $httpstatuscodemustbe200 = TRUE;
    private $maskspecialcharsinjsonFlag = TRUE;
    private $displayapireturn = 0;
    #private $errormessagecache = "";
    private $createmessage = "";
    private $addpostdata2json = FALSE;
	private $upload = FALSE;
    /* TWIG vars END */

	public function __construct(){
		add_action( 'admin_init', array( $this, 'check_licence' ) );
    	add_shortcode('jsoncontentimporterpro' , array(&$this , 'shortcodeExecute')); # hook shortcode
		$val_jci_pro_debugmode = get_option('jci_pro_debugmode');
		$this->debugLevel = $val_jci_pro_debugmode;
		if ($val_jci_pro_debugmode>1) {
			$this->debugModeIsOn = TRUE;
		}
		require_once plugin_dir_path( __FILE__ ) . '/lib/logdebug.php';
    }

	/* debugging BEGIN */
	private function jci_showDebugMessage() {
		return logDebug::$debugmessage;
	}
    private function buildDebugTextarea($message, $txt, $addline=FALSE) {
		logDebug::jci_buildDebugTextarea($message, $this->debugModeIsOn, $this->debugLevel, $txt, $addline);
    }
	private function jci_collectDebugMessage($debugMessage, $debugLevel=2, $suffix="", $convert2html=TRUE, $switchoffDebugPrefix = FALSE, $prefix="", $maxlength=400) {
		logDebug::jci_addDebugMessage($debugMessage, $this->debugModeIsOn, $this->debugLevel, $debugLevel, $suffix, $convert2html, $switchoffDebugPrefix, $prefix, $maxlength);
    }
	private function jci_collectCreateMessage($message, $convert2html=FALSE) {
		$tmpDebugLevelMode = $this->debugModeIsOn;
		$this->debugModeIsOn = TRUE;
		$tmpDebugLevel = $this->debugLevel;
		$this->debugLevel = 100;
		$this->jci_collectDebugMessage($message, 100, "", $convert2html, TRUE);
		$this->debugModeIsOn = $tmpDebugLevelMode;
		$this->debugLevel = $tmpDebugLevel;
	}
	/* debugging END */



    function check_licence() {
        $this->licencelevel = edd_jcipro_check_license("admininit");
        #$this->jci_collectDebugMessage("check licence of plugin");
        if (!($this->licencelevel==-1)) {
            add_action( 'admin_notices', array( $this, 'disabled_notice' ) );
	      }
    }

    function disabled_notice() {
       $this->jci_collectDebugMessage("licence of plugin is not active");
       echo '<div class="error">
	       <p>'.$this->licencelevel.'
	    </div>';
	  }

    # filtering JSON - BEGIN
	  # inspired by George from USA
      function filterJSON($jsonObj, $filterpattern, $filtertype) {
	      #filter the json-array if necessary
	      #first we filter on the results that should "match" the input
        if (!empty($filterpattern)) {
		      $filterpatternArr = explode(",",$filterpattern);
		      foreach($filterpatternArr as $filterpatternArrItem) {
			      if (strpos($filterpatternArrItem, '=') === false) {
				      $filterresultskey = $filterpatternArrItem;
				      $filterresultsvalue = sanitize_text_field($_GET[$filterpatternArrItem]);
              if (empty($filterresultsvalue)) {
  				      $filterresultsvalue = sanitize_text_field($_POST[$filterpatternArrItem]);
              }
			      } else {
				      $parts = explode('=', $filterpatternArrItem, 2);
				      $filterresultskey = $parts[0];
				      $filterresultsvalue = $parts[1];
			      }
			      if(!empty($filterresultsvalue)) {
              # if 1: use exact match, no regular-expression-match / if 2: use regular-expression-match, no exact match
              $val_jci_pro_allow_regexp = get_option('jci_pro_allow_regexp');
              if ($val_jci_pro_allow_regexp=="") {
                $val_jci_pro_allow_regexp = 2;
              }
              foreach ($jsonObj as $elementKey => $element) {
					      foreach($element as $valueKey => $value) {
                  if ($filtertype=="resultin") {
                    if ($val_jci_pro_allow_regexp==1) {
  						        if($valueKey == $filterresultskey && ($filterresultsvalue!=$value)) {
	 	   					        unset($jsonObj[$elementKey]);
	   					        }
                    } else {
  						        if($valueKey == $filterresultskey && (!preg_match("/".$filterresultsvalue."/", $value))) {
	 	   					        unset($jsonObj[$elementKey]);
	   					        }
                    }
                  }
                  if ($filtertype=="resultnotin") {
                    if ($val_jci_pro_allow_regexp==1) {
  						        if($valueKey==$filterresultskey && $filterresultsvalue==$value) {
	   						        unset($jsonObj[$elementKey]);
		  				        }
                    } else {
  						        if($valueKey==$filterresultskey && preg_match("/".$filterresultsvalue."/", $value)) {
	   						        unset($jsonObj[$elementKey]);
		  				        }
                    }
                  }
					      }
				      }
			      }
		      }
          return $jsonObj;
	      }
      }

      # sorting JSON - BEGIN
	    # inspired by George from USA
      function sortfunc($a, $b) {
        $sortfieldTmp = $this->sortField;
        $sorttypeIsNaturalTmp = $this->sorttypeIsNatural;
        $sortorderIsUpTmp = $this->sortorderIsUp;
        # $sortorder_is_up: if TRUE: UP; if FALSE: down
        # $sorttype: if TRUE sort natural, if FALSE standard-sort
        if ($sorttypeIsNaturalTmp) {
          if ($sortorderIsUpTmp) {
            return strnatcmp($b->$sortfieldTmp, $a->$sortfieldTmp);
          } else {
            return strnatcmp($a->$sortfieldTmp, $ba->$sortfieldTmp);
          }
        }
        if ($a->$sortfieldTmp == $b->$sortfieldTmp) {
          return 0;
        }
        if ($sortorderIsUpTmp) {
          return $a->$sortfieldTmp < $b->$sortfieldTmp ? 1 : -1;
        } else {
          return $a->$sortfieldTmp < $b->$sortfieldTmp ? -1 : 1;
        }
      }

    private function removeInvalidQuotes($txtin) {
      $invalid1 = urldecode("%E2%80%9D");
      $invalid2 = urldecode("%E2%80%B3");
      $txtin = preg_replace("/^[".$invalid1."|".$invalid2."]*/i", "", $txtin);
      $txtin = preg_replace("/[".$invalid1."|".$invalid2."]*$/i", "", $txtin);
      return $txtin;
    }
    private function replaceInTwigCodeInvalidQuotesWithValidQuotes($txtin) {
      $invalid1 = urldecode("&#8222;");
      $invalid2 = urldecode("&#8220;");
      $txtin = preg_replace("/{{(.*)".$invalid1."(.*)".$invalid2."(.*)}}/i", '{{'.'${1}'."\"".'${2}'."\"".'${3}'.'}}', $txtin);
      return $txtin;
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

    private function func_trytohealjson($jsonin) {
       # handle "not-so-perfect-JSON" like https://www.google.com/finance/info?q=NASDAQ%3aGOOG
	   # and: https://delivery.travelsuite.de/offers?cid=909091&campaignSourceCode=antalya-landingpage
	   
      $fdTmp = trim($this->feedData);
      if (
        (!preg_match("/^(\[|\{)/", $fdTmp))
        ||
        (!preg_match("/(\[|\})$/", $fdTmp))
      ) {
		$posFirstCurl = strpos($fdTmp, "{");
		$posFirstSqr = strpos($fdTmp, "[");
		$left = min($posFirstCurl, $posFirstSqr);
		$fdTmp = substr($fdTmp, $left);
		
		$posLastCurl = strrpos($fdTmp, "}");
		$postLastSqr = strrpos($fdTmp, "]");
		$right = max($posLastCurl, $postLastSqr);
		$fdTmp = substr($fdTmp, 0, $right+1);
		
		$inspurl = "https://jsoneditoronline.org";
		$this->buildDebugTextarea("<br>Inspect trytohealjson-JSON: Copypaste (click in box, Strg-A marks all, then insert into clipboard) the JSON from the following box to <a href=\"".$inspurl."\" target=_blank>".$inspurl."</a>):", $fdTmp);

		
        # retrieved string does not start or end like JSON should
        #$this->jci_collectDebugMessage("trytohealjson-input: ".$fdTmp);
#		$fdTmp = preg_replace("/^(.*)\[/", "[", $fdTmp);
#        $fdTmp = preg_replace("/^(.*)\{/", "{", $fdTmp);
#        $fdTmp = preg_replace("/\](.*)$/", "]", $fdTmp);
#        $fdTmp = preg_replace("/\}(.*)$/", "}", $fdTmp);
        #$this->jci_collectDebugMessage("trytohealjson-result: ".$fdTmp);
        return $fdTmp;
      }
    }


	private function deleteCPT($typeOfNewpage, $nameofthejsonimport) {
		$this->jci_collectCreateMessage( "<b>try to delete previous generated pages! key: $nameofthejsonimport</b>");
		$args = array(
			'post_type'  => $typeOfNewpage,
			'posts_per_page' => '-1', # all pages!
			'meta_query' => array(
				array(
					'key'     => 'jci_uniquekey_cr',
			        'value'   => $nameofthejsonimport
				)
			)     
		);
		$query = new WP_Query( $args );
		$this->jci_collectCreateMessage( "found ".$query->found_posts." pages of this type: <b>".$typeOfNewpage."</b> - try to delete these pages");
		$i = 1;
		$no_of_failed_pages_to_delete = 0;
		while ( $query->have_posts() ) {
			$query->the_post();
			$delActionOkTmp = wp_delete_post( $query->post->ID, TRUE );
			if ($delActionOkTmp) {
			} else {
				$this->jci_collectCreateMessage( "($i) delete page ".$query->post->ID." <b>FAILED</b>");
				$no_of_failed_pages_to_delete++;
			}
			$i++;
		}
		if ($no_of_failed_pages_to_delete==0) {
			$this->jci_collectCreateMessage( "all ".$query->found_posts." pages successfully deleted<br>");
		}  else {
			$this->jci_collectCreateMessage( "<hr>deletion of $no_of_failed_pages_to_delete pages of ".$query->found_posts." failed<hr>");
		}          
	}	


    private function createPage($no, $newPostType, $newPostTitle, $newPostSlugname, $newPostCategory, $content, $jci_uniquekey_createpost) {
      #global $wp_query;
      #$pageid = $wp_query->post->ID;
      $this->jci_collectDebugMessage("($no) pageID of creating page: ".$this->pageid);
      if (""==$this->pageid) {
        return -1;
      }
      $custom_fields_arr = get_post_custom($this->pageid);
      $nameofthejsonimport = $jci_uniquekey_createpost; #trim($custom_fields_arr['jci_uniquekey_createpost'][0]);
      if ($nameofthejsonimport=="") {
        $this->jci_collectDebugMessage( "($no) No page created: Set CustomField 'jci_uniquekey_createpost'<br>\n" );
        return -1;
      }
		$postdateoffsettmp = trim(@$this->createoptionsArr{'postdateoffset'});
		$postdate = NULL;
		if (is_numeric($postdateoffsettmp)) {
			$this->postdateoffset = $postdateoffsettmp;
			$postdatetimestamp = time() - $this->postdateoffset;
			$postdate = date("Y-m-d H:i:s", $postdatetimestamp);
			$this->jci_collectCreateMessage( "numeric postdateoffset ".$this->postdateoffset.": ".$postdate);
		} else if ("wptimezone" == $postdateoffsettmp) {
			$wptimezone = get_option('timezone_string');
			$errorleveltimezoneset = date_default_timezone_set($wptimezone);
			$postdate = date("Y-m-d H:i:s");
			if ($errorleveltimezoneset) {
				$this->jci_collectCreateMessage( "Use timezone $wptimezone of wordpress ok: ".$postdate);
			} else {
				$this->jci_collectCreateMessage( "Use timezone $wptimezone of wordpress failed: ".$postdate);
			}
		} else if (""!=$postdateoffsettmp) {
			# valid timezone-string? https://www.php.net/manual/de/timezones.php
			$errorleveltimezoneset = date_default_timezone_set($postdateoffsettmp);
			$postdate = date("Y-m-d H:i:s");
			if ($errorleveltimezoneset) {
				$this->jci_collectCreateMessage( "Use timezone $postdateoffsettmp of wordpress ok: ".$postdate);
			} else {
				$this->jci_collectCreateMessage( "Use timezone $postdateoffsettmp of wordpress failed: ".$postdate);
			}
		} else {
			$postdate = date("Y-m-d H:i:s");
			$this->jci_collectCreateMessage( "postdate without considering timezones: ".$postdate);
		}
        $this->jci_collectDebugMessage( "($no) page postdate: ".$postdate);
	
		$newPostArr = array(
			'post_title'   => $newPostTitle,
			'post_name'    => $newPostSlugname,
			'post_content' => $content,
			'post_status'  => 'publish',
			# 'post_author'   => 1,
			'post_type'    => $newPostType,
			'post_category'=> $newPostCategory,
			'post_date'    => $postdate,
			# 'post_parent'  =>
      );

      // Insert the post into the database.
      $idOfNewPost = FALSE;
      remove_all_filters("content_save_pre"); # otherwise tags like <script> and <style> are removed when build-url is called as not-logged in....

      $idOfNewPost = wp_insert_post( $newPostArr );
      if ( ! $idOfNewPost ) {
          $this->jci_collectDebugMessage("<b>($no) creating of new post failed</b><br>");
          return -1;
      }

      $this->jci_collectDebugMessage( "($no) Publishing date / time of page (this is the real server time...): ".$postdate);

      $this->jci_collectDebugMessage( "($no) creating of new post ok, id=$idOfNewPost" );
      /*  customfields are added after the pagecreation: and the twig code is executed then...
      $cf = @$this->createoptionsArr{'customfields'};
      if (empty($cf)) {
        echo "($no)".' no extra customfields in shortcode defined. Example: "customfields": #BRO# {"extracustomfield1":"extravalue1"}, {"extracustomfield2":"extravalue2"}#BRC#}'."<br>";
      } else {
        echo "($no) add custom fields:<br>";
        for ($j=0; $j<count($this->createoptionsArr{'customfields'});$j++) {
          foreach ($this->createoptionsArr{'customfields'}[$j] as $key => $value) {
            add_post_meta($idOfNewPost, $key, $value, true);
            echo "($no) add custom field value from shortcode: $key : $value<br>";
            $this->jci_collectDebugMessage("add custompost-param to $idOfNewPost:  $key : $value");
          }
        }
      }
      */
      if ($nameofthejsonimport!="") {
        add_post_meta($idOfNewPost, 'jci_uniquekey_cr', $nameofthejsonimport, true);
        $this->jci_collectDebugMessage( "($no) add custom field for delete: jci_uniquekey_cr : $nameofthejsonimport" );
      }
      return $idOfNewPost;
    }

private function getCustomPageSettingsFromPluginOptions($nameOfCustomPage) {
      $ctin = stripslashes(get_option( 'jci_pro_custom_post_types' ));
      $foundItem = FALSE;
      $ctinArr0 = explode("##", $ctin);
      $zorbTmp = array();
       for ($i=0;$i<count($ctinArr0);$i++) {
        $ctinArr1 = explode(";", $ctinArr0[$i]);
        for ($j=0;$j<count($ctinArr1);$j++) {
          $ctinArr2 = explode("=", $ctinArr1[$j]);
          if (!empty($ctinArr2[0]) && !empty($ctinArr2[1])) {
            $zorbTmp{$ctinArr2[0]} = $ctinArr2[1];
            if ($ctinArr2[1]==$nameOfCustomPage) {
              $foundItem = TRUE;
            }
          }
        }
        if ($foundItem) {
          break;
        }
        unset($zorbTmp);
      }
      if ($foundItem) {
        return $zorbTmp;
      }
      return NULL;
}


    /* shortcodeExecute: read shortcode-params and check cache */
	public function shortcodeExecute($atts , $content = ""){
		logDebug::jci_clearDebugMessage();
		$this->licencelevel = edd_jcipro_check_license();
		if ($this->licencelevel!=-1) {
			return "Plugin JSON Content Importer Pro not running: Check Licence!";
		}
		extract(shortcode_atts(array(
			'id' => '',
			'nameoftemplate' => '',
			'url' => '',
			'urlparam' => '',
			'pathparam' => '',
			'fileext' => '',
			'urlgettimeout' => '',
			'numberofdisplayeditems' => '',
			'oneofthesewordsmustbein' => '',
			'oneofthesewordsmustbeindepth' => '',
			'oneofthesewordsmustnotbein' => '',
			'oneofthesewordsmustnotbeindepth' => '',
			'requiredfieldsandvalues' => '',
			'requiredfieldsandvaluesdepth' => '',
			'requiredfieldsandvalueslogicandbetweentwofields' => '',
			'basenode' => '',
			'param1' => '',
			'param2' => '',
			'dodisplayonlyif' => '',
			'filterresultsin' => '',
			'filterresultsnotin' => '',
			'sortfield' => '',
			'sortorderisup' => '',
			'sorttypeisnatural' => '',
			'loopwithoutsubloop' => '',
			'parser' => '',           
			'method' => '',
			'feedsource' => '',
			'feedfilename' => '',
			'postpayload' => '',
			'postbody' => '',
			'customfieldparam' => '',
			'header' => '',
			'auth' => '',
			'urlgetaddrandom' => '',
			'inputtype' => '',
			'trytohealjson' => '',
			'cachetime' => 0,
		    'debugmode' => 0,
			'urlencodepostpayload' => '',
			'mode' => '',
			'createoptions' => '',
			'convertjsonnumbers2strings' => '',
			'removeampfromurl' => '',
			'curloptions' => '',
			'urladdparam' => '',
			'urlparam4twig' => '',  
			'httpstatuscodemustbe200' => '',     
			'maskspecialcharsinjson' => '',     
			'displayapireturn' => '',
			'addpostdata2json' => FALSE,
			'forcetemplate' => FALSE,
		), $atts));
             
		if ($forcetemplate==1) {
			$this->forceTemplate = TRUE;
		} else {
			$this->forceTemplate = FALSE;
		}
		
		# debugmode per page
		if (intval($debugmode)>1) {
			# valid debugmode
			$this->debugLevel = $debugmode;
			$this->debugModeIsOn = TRUE;
			$this->jci_collectDebugMessage("set debugmode active via shortcode, level: ".$this->debugLevel, $this->debugLevel, "", TRUE, FALSE, "<br>");
   		} else {
			$this->debugLevel = 1;
			$this->debugModeIsOn = FALSE;
		}

      if ("no"==$httpstatuscodemustbe200) {
        $this->httpstatuscodemustbe200 = FALSE;
      }
      if ("no"==$maskspecialcharsinjson) {
        $this->maskspecialcharsinjsonFlag = FALSE;
      }
      $this->displayapireturn = 0;
      if ($displayapireturn>0) {
        $this->displayapireturn = $displayapireturn;
        #$this->maskspecialcharsinjsonFlag = FALSE; # by default
      }
      if ($addpostdata2json=="y") {
        $this->addpostdata2json = TRUE;
      }
      
      if ($curloptions!="") {
        $this->jci_collectDebugMessage("set curloptions via shortcode: ".$this->curloptions);
        $this->curloptions = $curloptions;
      }
 
      ################## get template if set
      $this->nameoftemplate = $this->removeInvalidQuotes($nameoftemplate);
      $id = $this->removeInvalidQuotes($id);
      if (is_numeric($id) && ($id>0)) {
        $this->templateid = $id;
      } else {
        $this->templateid = '';
      }
      $overwriteValuesFromTemplate = FALSE;
      if ($content=="") {
        # shortcode without content: get textitem out of database
        # either via templateid or nameoftemplate. if both are set use id
        $thereIsAIdOrName = FALSE;
        if (is_numeric($this->templateid) && ($this->templateid>0)) {
          $this->jci_collectDebugMessage("load template with this id: ".$this->templateid);
          $thereIsAIdOrName = TRUE;
          $selectStr = " id = ".$this->templateid;
        } else if ($this->nameoftemplate!="") {
          $selectStr = " nameoftemplate = \"".$this->nameoftemplate."\"";
          $this->jci_collectDebugMessage("load template with this id: ".$this->nameoftemplate);
          $thereIsAIdOrName = TRUE;
        } else {
			#$content = "<hr><b>template not found: add id=TEMPLATE_ID to shortcode OR between [jsoncontentimporterpro...]TEMPLATE[/jsoncontentimporterpro], please</b><hr>";
        }
        if ($thereIsAIdOrName) {
          global $wpdb;
          $tmpl = $wpdb->get_row( 'SELECT template, urloftemplate, basenode, urlparam4twig, method, parser, curloptions, postpayload, postbody, cachetime, urlgettimeout, debugmode FROM ' . $wpdb->prefix . 'plugin_jci_pro_templates WHERE '.$selectStr );
          if (is_null($tmpl)) {
              $this->jci_collectDebugMessage("Template-Database was not updated when upgrading to 3.4.7 and later! Deactivate, then activate the Plugin".$this->debugLevel);
              $tmpl = $wpdb->get_row( 'SELECT template, urloftemplate, basenode FROM ' . $wpdb->prefix . 'plugin_jci_pro_templates WHERE '.$selectStr );
            if (is_null($tmpl)) {
              return $this->jci_showDebugMessage()."Plugin-Template not found: Check if this template-id or -name is really existing!";
}            }
          if (("twig"==@$tmpl->parser) || ("twig243"==@$tmpl->parser)) { 
            $this->parser = $this->removeInvalidQuotes($tmpl->parser);           
            $this->jci_collectDebugMessage("parser set via template ".$this->templateid.": ".$this->parser);
          }
          if (""==$debugmode) {
            # check template
            if (intval(@$tmpl->debugmode)>1) {
	 	          $this->debugLevel = $tmpl->debugmode;
         	    $this->debugModeIsOn = TRUE;
              $this->jci_collectDebugMessage("set debugmode active via template, level: ".$this->debugLevel);
            } else {
              $this->jci_collectDebugMessage("debugmode via template unchanged: ".$this->debugLevel);
            }
          }
          $overwriteValuesFromTemplate = TRUE;
        }
      }
      $this->jci_collectDebugMessage("version of plugin: ".JCIPRO_VERSION);
      if (""!=$parser) {
        # if parser is set in shortcode: use this!!
        if ($parser=="twig" || $parser=="twig243" || $parser="jci") {
          $this->parser = $this->removeInvalidQuotes($parser);
          $this->jci_collectDebugMessage("parser set via shortcode: ".$this->parser);
        } else {
          $this->jci_collectDebugMessage("parser NOT set via shortcode - invalid parser specified, selected parser is: ".$this->parser);
        }
      }
      $this->jci_collectDebugMessage("selected parser: ".$this->parser);

	################## set twig: even with the jci-parser we need it for urlparam4twig etc.
	### twig-init-begin
	$inc = WP_PLUGIN_DIR . '/jsoncontentimporterpro3/lib/twig.php';
	require_once $inc;
	$twigHandler = new doTwig($this->parser, $this->maskspecialcharsinjsonFlag);
	### twig-init-end




      ###### shortcode: dodisplayonlyif: display NOT, if something is NOT fullfilled
      # e.g. POST- or GET-parameter is set with a special value:
      # dodisplayonlyif="POST/GET:variablename:variablevalue"
      # variablename:variablevalue: allowed only [0-9a-zA-Z_-.;]
      $dodisplayonlyif = $this->removeInvalidQuotes($dodisplayonlyif);
      if (!empty($dodisplayonlyif) && preg_match("/([a-z]+)\:([0-9a-z\_\-\.\;]+)\:([0-9a-z\_\-\.\;]+)/i", $dodisplayonlyif)) {
        $dodisplayonlyifArr = explode(":", $dodisplayonlyif, 3);
        $varimetho = trim($dodisplayonlyifArr[0]);
        $variname = trim($dodisplayonlyifArr[1]);
        $varivalue = trim($dodisplayonlyifArr[2]);

        if ($varimetho=="GET") {
          $vargot = sanitize_text_field($_GET[$variname]);
          if (!strcmp($varivalue, $vargot)) {
            $this->hidedisplayflag = TRUE;
          }
        } else if ($varimetho=="POST") {
          $vargot = sanitize_text_field($_POST[$variname]);
          if (!strcmp($varivalue, $vargot)) {
            $this->hidedisplayflag = TRUE;
          }
        }
      }

      if ("no"==$urlencodepostpayload) {
        $this->urlencodepostpayload = $urlencodepostpayload;
      }

      $loopwithoutsubloop = $this->removeInvalidQuotes($loopwithoutsubloop);
      if ($loopwithoutsubloop=="y") {
        $this->loopWithoutSubloop = "y";
      }

      $this->param1 = $this->removeInvalidQuotes($param1);
      $this->param2 = $this->removeInvalidQuotes($param2);
      
      $this->customfieldparam = $this->removeInvalidQuotes($customfieldparam);

	    if (get_option('jci_pro_delimiter')!="") {
        $this->delimiter = get_option('jci_pro_delimiter');
      }

      $this->filterresultsin = $this->removeInvalidQuotes($filterresultsin);
      $this->filterresultsnotin = $this->removeInvalidQuotes($filterresultsnotin);

      $this->header = $this->removeInvalidQuotes($header);
      $this->auth = $this->removeInvalidQuotes($auth);
      if ("yes"==$urlgetaddrandom) {
        $this->urlgetaddrandom = TRUE;
      } else {
        $this->urlgetaddrandom = FALSE;
      }

      if ($convertjsonnumbers2strings=="yes") {
        $this->convertJsonNumbers2Strings = TRUE;
      }

      if ("yes"==$trytohealjson) {
        $this->trytohealjson = TRUE;
      } else {
        $this->trytohealjson = FALSE;
      }

      if ("xml"==$inputtype) {
        $this->inputtype = "xml";
      }

      $this->sortField = $this->removeInvalidQuotes($sortfield);
      $sortorderisup = $this->removeInvalidQuotes($sortorderisup);
      if ($sortorderisup=="yes") {
        $this->sortorderIsUp = $sortorderisup;
      } else {
        $this->sortorderIsUp = "";
      }
      $sorttypeisnatural = $this->removeInvalidQuotes($sorttypeisnatural);
      if ($sorttypeisnatural=="yes") {
        $this->sorttypeIsNatural = $sorttypeisnatural;
      } else {
        $this->sorttypeIsNatural = "";
      }

      $this->mode = $this->removeInvalidQuotes($mode);
      if ($this->mode=="create") {
        # title and slugname
        global $wp_query;
        @$pageid = $wp_query->post->ID;
        if (""==$pageid) {
          $this->jci_collectDebugMessage( "ID of the creating page not available. No creation or deletion done.\n");
          #echo "ID of the creating page not available. No creation or deletion done.\n";
          return $this->jci_showDebugMessage();
        }  else {
          $this->pageid = $pageid;
          $this->jci_collectDebugMessage( "ID of the creating page is ".$this->pageid."\n");
          #echo "ID of the creating page is ".$this->pageid."<br>\n";
        }
        $this->jci_collectDebugMessage( "mode: ".$this->mode."<br>");    
        #echo "mode: ".$this->mode."<br>";    
        if ($createoptions!="") {
          $createoptionsTmp = $this->removeInvalidQuotes($createoptions);
          $createoptionsTmp = preg_replace("/#BRO#/", "[", $createoptionsTmp);
          $createoptionsTmp = preg_replace("/#BRC#/", "]", $createoptionsTmp);
          $this->jci_collectDebugMessage("createoptions: ".$createoptionsTmp);
          $this->createoptionsArr = json_decode($createoptionsTmp, TRUE);
          if ($this->createoptionsArr==NULL) {
            $this->jci_collectDebugMessage( "<font color=red>createoptions: JSON decoding fails, check JSON-syntax in Shortcode!</font><br>", $this->debugLevel, "", FALSE);
            #echo "<font color=red>createoptions: JSON decoding fails, check JSON-syntax in Shortcode!</font><br>";
          } else {
            $this->jci_collectDebugMessage( "<font color=green>createoptions in shortcode: JSON ok!</font>", $this->debugLevel, "", FALSE);
            #echo "<font color=green>createoptions in shortcode: JSON ok!</font><br>";
          }
        }
      }

      $this->oneofthesewordsmustbein = $this->removeInvalidQuotes($oneofthesewordsmustbein);
      $this->oneofthesewordsmustbeindepth = $this->removeInvalidQuotes($oneofthesewordsmustbeindepth);
      $this->oneofthesewordsmustnotbein = $this->removeInvalidQuotes($oneofthesewordsmustnotbein);
      $this->oneofthesewordsmustnotbeindepth = $this->removeInvalidQuotes($oneofthesewordsmustnotbeindepth);
      $this->requiredfieldsandvalues = $this->removeInvalidQuotes($requiredfieldsandvalues);
      $this->requiredfieldsandvaluesdepth = $this->removeInvalidQuotes($requiredfieldsandvaluesdepth);
      $requiredfieldsandvalueslogicandbetweentwofields = $this->removeInvalidQuotes($requiredfieldsandvalueslogicandbetweentwofields);
      if ($requiredfieldsandvalueslogicandbetweentwofields=="yes") {
        # yes: all fields must match
        $this->requiredfieldsandvalueslogicandbetweentwofields = TRUE;
      } else {
        $this->requiredfieldsandvalueslogicandbetweentwofields = FALSE;
      }

      $this->basenode = $this->removeInvalidQuotes($basenode);
      $this->feedUrl = $this->removeInvalidQuotes($url);
      if (""!=$this->basenode) {
        $this->jci_collectDebugMessage("basenode: ".$this->basenode);
      }
	  
      if ($overwriteValuesFromTemplate) {
			$content = @$tmpl->template;
			if ($this->forceTemplate) { 
				$this->basenode = $tmpl->basenode;
				$this->jci_collectDebugMessage("force template via template ".$this->templateid.": ".$content);
				$this->jci_collectDebugMessage("force basenode via template ".$this->templateid.": ".$this->basenode);

				$this->feedUrl = trim($tmpl->urloftemplate);
				$this->jci_collectDebugMessage("force url via template ".$this->templateid.": ".$this->feedUrl);

				$this->urlparam4twig = $tmpl->urlparam4twig;           
				$this->jci_collectDebugMessage("force urlparam4twig via template ".$this->templateid.", urlparam4twig and use: ".$this->urlparam4twig);

				$this->method = $tmpl->method;          
				$this->jci_collectDebugMessage("force method via template ".$this->templateid.", method: ".$this->method);

				$this->curloptions = $tmpl->curloptions;          
				$this->jci_collectDebugMessage("force curloptions via template ".$this->templateid.": ".$this->curloptions);

				$this->postPayload = $tmpl->postpayload;          
				$this->jci_collectDebugMessage("force postpayload via template ".$this->templateid.": ".$this->postPayload);

				$this->postbody = $tmpl->postbody;          
				$this->jci_collectDebugMessage("force postbody via template ".$this->templateid.": ".$this->postbody);

				$this->cachetime = $tmpl->cachetime;          
				$this->jci_collectDebugMessage("force cachetime via template ".$this->templateid.": ".$this->cachetime);

				$this->urlgettimeout = $tmpl->urlgettimeout;          
				$this->jci_collectDebugMessage("force urlgettimeout via template ".$this->templateid.": ".$this->urlgettimeout);
			} else {
				if (@$tmpl->basenode!="") {
					$this->basenode = $tmpl->basenode;
				}
				if (@$tmpl->urloftemplate!="") {
					$this->feedUrl = trim($tmpl->urloftemplate);
				}
				if (@$tmpl->urlparam4twig!="") {        
					$this->urlparam4twig = $tmpl->urlparam4twig;           
					$this->jci_collectDebugMessage("load from template ".$this->templateid.", urlparam4twig and use: ".$this->urlparam4twig);
				}
				if (@$tmpl->method!="") {   
					$this->method = $tmpl->method;          
					$this->jci_collectDebugMessage("set method via template ".$this->templateid.", method: ".$this->method);
				}
				if (@$tmpl->curloptions!="") {   
					$this->curloptions = $tmpl->curloptions;          
					$this->jci_collectDebugMessage("set curloptions via template ".$this->templateid.": ".$this->curloptions);
				}
				if (@$tmpl->postpayload!="") {   
					$this->postPayload = $tmpl->postpayload;          
					$this->jci_collectDebugMessage("set postpayload via template ".$this->templateid.": ".$this->postPayload);
				}
				if (@$tmpl->postbody!="") {   
					$this->postbody = $tmpl->postbody;          
					$this->jci_collectDebugMessage("set postbody via template ".$this->templateid.": ".$this->postbody);
				}
				if (@$tmpl->cachetime!="") {   
					$this->cachetime = $tmpl->cachetime;          
					$this->jci_collectDebugMessage("set cachetime via template ".$this->templateid.": ".$this->cachetime);
				}
				if (@$tmpl->urlgettimeout!="") {   
					$this->urlgettimeout = $tmpl->urlgettimeout;          
					$this->jci_collectDebugMessage("set urlgettimeout via template ".$this->templateid.": ".$this->urlgettimeout);
				}
				$this->jci_collectDebugMessage("set template via template ".$this->templateid.": ".$content);
				$this->jci_collectDebugMessage("set url via template ".$this->templateid.": ".$this->feedUrl);
				$this->jci_collectDebugMessage("set basenode via template ".$this->templateid.": ".$this->basenode);
			}
      }
      if (intval($cachetime)>0 || $cachetime!="") {
        $this->cachetime = $cachetime;
        $this->jci_collectDebugMessage("set cachetime via shortcode: ".$this->cachetime);
      }
      if (""!=$postpayload) {
        $this->postPayload = $this->removeInvalidQuotes($postpayload);
        $this->jci_collectDebugMessage("set postpayload via shortcode: ".$this->postPayload);
      }
      if (""!=$postbody) {
        $this->postbody = $this->removeInvalidQuotes($postbody);
        $this->jci_collectDebugMessage("set postbody via shortcode: ".$this->postbody);
      }
	  
	if (isset($_FILES) && (!empty($_FILES))) {
		/*
		var_Dump($_FILES);
		require_once("lib/upload.php");
		$jciuploadclass = new JCIHandleFileUpload();
		$this->curloptions .= $jciuploadclass->getCrloptionsAdd();
		$this->upload = $jciuploadclass->getUploadStatus();
		#$this->jci_collectDebugMessage("upload: ".$jciuploadclass->getDebugmessage(), 10);
		*/
	}
		  
      $method = $this->removeInvalidQuotes($method);
      if ($method=="post" ||
        $method=="rawpost" ||
        $method=="get" ||
        $method=="curlget" ||
        $method=="curlpost" ||
        $method=="rawget"
      ) {
        $this->method = $method;
        $this->jci_collectDebugMessage("set method via shortcode: ".$this->method);
      }
      $this->jci_collectDebugMessage("active method: ".$this->method);

      if (""!=$urladdparam) {
		$this->urladdparam = $urladdparam;    
        $dummyarray = array();   
		$this->urladdparam = $twigHandler->executeTwig($dummyarray, $this->urladdparam, $this->parser, $this->maskspecialcharsinjsonFlag);
		$twigDebugMsg = $twigHandler->getTwigDebug();
        $this->jci_collectDebugMessage("execute twig-code in urladdparam-parameter: ".$twigDebugMsg, 2, "", FALSE);
        $this->jci_collectDebugMessage("result twig-code in urladdparam-parameter: ".$this->urladdparam);
        if (preg_match("/#BRO#(.*)#BRC#/i", $this->urladdparam)) {
          $this->urladdparam = preg_replace("/#BRO#/i", "[", $this->urladdparam);
          $this->urladdparam = preg_replace("/#BRC#/i", "]", $this->urladdparam);
          $this->urladdparam = preg_replace("/%22/i", "\"", $this->urladdparam);
          $this->urladdparam = preg_replace("/&amp;/i", "&", $this->urladdparam);
          $this->jci_collectDebugMessage("execute Shortcode in urladdparam-parameter: ".$this->urladdparam);
          $this->urladdparam = do_shortcode($this->urladdparam);
        }
        $this->jci_collectDebugMessage("add to URL: ".$this->urladdparam);
        $this->feedUrl .= $this->urladdparam;
      }      

      if ("yes"==$removeampfromurl) {
        $this->removeampfromurl = TRUE;
      }
      if ($this->removeampfromurl) {
        $this->feedUrl = preg_replace("/&amp;/i", "&", $this->feedUrl);
        $this->jci_collectDebugMessage("&amp; in URL replaced by &");
      }
      if ($this->urlgetaddrandom) {
        $uniqid = uniqid();
        $md5key = md5(time());
        if (preg_match("/\?/i", $this->feedUrl)) {
          $this->feedUrl .= "&n".$uniqid."=".$md5key;
        } else {
          $this->feedUrl .= "?w".$uniqid."=".$md5key;
        }
      }

      $this->pathparam = $this->removeInvalidQuotes($pathparam);
      $this->fileext = $this->removeInvalidQuotes($fileext);
      $dynpathadd = "";

      # inspired by Lucas Butty
      $val_jci_pro_allow_urldirdyn = get_option('jci_pro_allow_urldirdyn');
      if ($val_jci_pro_allow_urldirdyn=="") {
        $val_jci_pro_allow_urldirdyn = 1;
      }
      if ($val_jci_pro_allow_urldirdyn==2) {
        $debugmsg = "dynamic url allowed, pathparam: ";
        if ($this->pathparam=="") { $debugmsg .= "no pathparam defined";  } else { $debugmsg .= $this->pathparam;   }
        $debugmsg .= ", fileext: ";
        if ($this->fileext=="")   { $debugmsg .= "no fileext defined";     } else { $debugmsg .= $this->fileext;         }
        $this->jci_collectDebugMessage($debugmsg);
        if ($this->pathparam!="") {
          $pathparamArr = explode("#", $this->pathparam);
          $size = count($pathparamArr);
          for ($pathlp=0; $pathlp<$size; $pathlp++) {
						if (isset($_GET[$pathparamArr[$pathlp]])) {
			         $valtmp = urlencode(sanitize_text_field($_GET[$pathparamArr[$pathlp]]));
				        if ($valtmp!="" && $pathlp < ($size-1)) {
					         $dynpathadd = $dynpathadd . $valtmp . "/";
				        } else if ($valtmp!="" && $pathlp == ($size-1)) {
					         $dynpathadd = $dynpathadd . $valtmp;
				        }
			       }
          }
        }
        if ($fileext!="") {
						if (preg_match("/^\?/", $fileext)) {
							$dynpathadd = $dynpathadd . $fileext ;
							$this->jci_collectDebugMessage("create url: no extra dot");
						} else {
							$dynpathadd = $dynpathadd . '.' . $fileext ;
							$this->jci_collectDebugMessage("create url: add extra dot");
						}
        }
        if ($dynpathadd!="") {
            if (substr($this->feedUrl, -1) != '/') {
              $dynpathadd = '/' . $dynpathadd;
            }
            if (preg_match("/\&$/", $dynpathadd)) {
              $dynpathadd = preg_replace("/\&$/", "", $dynpathadd);
            }
            $this->feedUrl = $this->feedUrl . $dynpathadd;
  					$this->jci_collectDebugMessage("created dynamic url: ".$this->feedUrl);
        }

      } else {
        $this->jci_collectDebugMessage("dynamic url NOT allowed, therefore ignore pathparam / fileext. Switch on: See plugin-options");
      }

      $this->urlparam = $this->removeInvalidQuotes($urlparam);

      $dynurladd = "";
      $val_jci_pro_allow_urlparam = get_option('jci_pro_allow_urlparam');
      if ($val_jci_pro_allow_urlparam=="") {
        $val_jci_pro_allow_urlparam = 2;
      }

      if (($val_jci_pro_allow_urlparam==2) && ($this->urlparam!="")) {
        $this->jci_collectDebugMessage("urlparam allowed, urlparam: ".$this->urlparam);
        $urlparamArr = explode("#", $this->urlparam);
        for ($urlp=0; $urlp<count($urlparamArr); $urlp++) {
          unset($valtmp);
          unset($urlpkey);
          unset($urlpkeyjson);
          unset($urlpkeyjsonArr);
          # loop through each urlparam-item
          $urlpval = $urlparamArr[$urlp];                  
          if (preg_match("/%5B(.*)%5D/i", $urlpval) ) {
            # multidim GET or POST-parameter
            $g = NULL;
            if (@count($_GET)) {
              $g = $_GET;
            } else if (@count($_POST)) {
              $g = $_POST;
            }
            $tmpArr = explode("%5B", $urlpval);
            $g = @$g{$tmpArr[0]};
            $keyu = @$tmpArr[0];
            $namedparameter = TRUE;
            for ($k=0;$k<count($tmpArr);$k++) {
              # loop through each defined key
              if (preg_match("/%5D/i", $tmpArr{$k})) {
                $tmpArr1 = explode("%5D", $tmpArr{$k});
                 if ($tmpArr1[0]=="") {
                    $namedparameter = FALSE;
                    for ($w=0;$w<count($g);$w++) {
                      $valtmp{$w} = sanitize_text_field($g[$w]);  # value of item
                      $urlpkeyjson{$w} = $keyu.".".$w."";
                      $urlpkey{$w} = $keyu."%5B%5D";
                    }
                } else {
                  $g = $g{$tmpArr1[0]};
                  $keyu .= ".".$tmpArr1[0];
                }
              } else {
              }
            }
            if ($namedparameter) {
              if (is_string($g)) {
                $valtmp{0} = sanitize_text_field($g);
              } else {
              }
              $urlpkeyjson{0} = $keyu;
              $urlpkey{0} = $urlpval;
            } else {
            }
          } else {
            # 1D-GET-param
            if (isset($_GET[$urlpval])) {
              $valtmp{0} = sanitize_text_field($_GET[$urlpval]);
            } else {
              $valtmp{0} = "";
            }
            $urlpkey{0} = sanitize_text_field($urlpval);
            $urlpkeyjson{0} = $urlpkey{0};
            # POST only with 1D-param
            #if (@count($valtmp)==0) {
            if (isset($_POST[$urlpval])) {
              $valtmp{0} = sanitize_text_field($_POST[$urlpval]);
            }
            #}
          }
          if (isset($valtmp) && count($valtmp)>0) {
#            $dynurladd .= sanitize_text_field($urlpval)."=".urlencode($valtmp)."&";
           # build url and json
            for ($w=0;$w<count($valtmp);$w++) {
               if (@$valtmp{$w}!="") {
                 $urlpkey{$w} = preg_replace("/\_nowpquery/i", "", $urlpkey{$w});
                 $dynurladd .= @$urlpkey{$w}."=".urlencode(@$valtmp{$w})."&";
                 $urlpkeyjsonArr{$valtmp{$w}} = "x";
                 if (isset($urlpkey{$w}) && ($urlpkey{$w}!="")) {
                  $this->urlparamval{@$urlpkey{$w}.''} = @$valtmp{$w};
                 }
               }
             }
            if (isset($keyu) && ($keyu!="")) {
              $this->urlparamval{$keyu.''} = @$urlpkeyjsonArr;
            }
          }
        }
        if ($dynurladd!="") {
          if (preg_match("/\&$/", $dynurladd)) {
            $dynurladd = preg_replace("/\&$/", "", $dynurladd);
          }
          if (preg_match("/\?/", $this->feedUrl)) {
            $this->feedUrl .= "&".$dynurladd;
          } else {
            $this->feedUrl .= "?".$dynurladd;
          }
        }
      }

      #$customfields
      $valcfp = NULL;
      if ($this->customfieldparam!="") {
        $customfieldparamUrl = "";
        $this->jci_collectDebugMessage("customfieldparam: ".$this->customfieldparam);
        $customfieldparamArr = explode(",", $this->customfieldparam);
        # get page id
        global $wp_query;
        $pageid = $wp_query->post->ID;
        if (""==$pageid) {
          $this->jci_collectDebugMessage("no pageid found for customfieldparam");
        }  else {
          $this->pageid = $pageid;
          $this->jci_collectDebugMessage("customfieldparam from pageid ".$this->pageid);
          for ($customfieldparamItemNo=0; $customfieldparamItemNo<count($customfieldparamArr); $customfieldparamItemNo++) {
            $this->jci_collectDebugMessage("customfieldparam ".$customfieldparamItemNo." value: ".$customfieldparamItemNo);
            $cfName = trim($customfieldparamArr[$customfieldparamItemNo]);
            $cfVal = trim(get_post_meta($this->pageid, $cfName, true));
            $this->jci_collectDebugMessage("pageid ".$this->pageid." value: ".$cfVal);
            if ($cfVal!="") {
              $this->jci_collectDebugMessage("customfieldparam ".$cfName." value: ".$cfVal);
              $this->feedUrl = preg_replace("/\<cf_".$cfName."\>/", $cfVal, $this->feedUrl);
              $valcfp{$cfName} = $cfVal;
            }
          }
        }
      }
      
      # fill placeholders URLPARAMVAL_BEGIN_ with values
      if (preg_match("/URLPARAMVAL_BEGIN_/", $this->feedUrl)) {
        # replace URLPARAMVAL_... with input values
        $number_of_URLPARAMVAL = preg_match_all("/URLPARAMVAL_BEGIN_([a-z0-9]*)##(.*?)_URLPARAMVAL_END/i", $this->feedUrl, $match_filler);
        $this->jci_collectDebugMessage("Number of URLPARAMVAL_ placeholders in URL: ".$number_of_URLPARAMVAL);
        if ($number_of_URLPARAMVAL>0) {
  	      for ($i=0; $i<$number_of_URLPARAMVAL; $i++) {
            $foundString = $match_filler[0][$i];
            $fi = trim($match_filler[1][$i]);
            $defaultvalue = trim($match_filler[2][$i]);
            $suffix = trim($match_filler[3][$i]); # before the value, if theres a value
            $praefix = trim($match_filler[4][$i]); # after the value
            $tmp = sanitize_text_field(@$_GET[$fi]);
            if (""==$tmp) {
              $tmp = sanitize_text_field(@$_POST[$fi]);
              if (""==$tmp) {
                $tmp = $defaultvalue;
                $this->jci_collectDebugMessage("POST: URLPARAMVAL_ $fi default value in URL: ".$tmp);
              } else {
                $this->jci_collectDebugMessage("POST: URLPARAMVAL_ $fi in URL: ".$tmp);
              }
            } else {
              $this->jci_collectDebugMessage("GET: URLPARAMVAL_ $fi in URL: ".$tmp);
            }
            $this->feedUrl = preg_replace("/".$foundString."/", $tmp,  $this->feedUrl);
            #echo "<hr>set urparamaval: $fi : $tmp<hr>";
            $this->urlparamval{$fi} = $tmp;  
           # print_r($this->urlparamval);
          }
        }
      }
      if (""!=$urlparam4twig) {
        $this->urlparam4twig = $this->removeInvalidQuotes($urlparam4twig);
      }
 
       if (""!=$this->urlparam4twig) {
        $this->jci_collectDebugMessage("read urlparam4twig : ".$this->urlparam4twig);
        $urlparam4TwigArr = explode("#", $this->urlparam4twig);
        for ($urlp=0; $urlp<count($urlparam4TwigArr); $urlp++) {
          #echo $urlparam4TwigArr[$urlp]."<hr>";
          $fi = trim($urlparam4TwigArr[$urlp]);
          $tmp = sanitize_text_field(@$_GET[$fi]);
          if (""==$tmp) {
            $tmp = sanitize_text_field(@$_POST[$fi]);
            if (""!=$tmp) {
              $this->jci_collectDebugMessage("POST: URLPARAMVAL_ $fi in URL: ".$tmp);
            }
          } else {
            $this->jci_collectDebugMessage("GET: URLPARAMVAL_ $fi in URL: ".$tmp);
          }
          $this->urlparamval{$fi} = $tmp;  
        }
      }
      # if there is a shotcode in the url: execute it
      if (preg_match("/#BRO#(.*)#BRC#/i", $this->feedUrl)) {
          $urlShortcodeExcecuted = preg_replace("/#BRO#/i", "[", $this->feedUrl);
          $urlShortcodeExcecuted = preg_replace("/#BRC#/i", "]", $urlShortcodeExcecuted);
          $urlShortcodeExcecuted = preg_replace("/%22/i", "\"", $urlShortcodeExcecuted);
          $urlShortcodeExcecuted = preg_replace("/&amp;/i", "&", $urlShortcodeExcecuted);
          $this->jci_collectDebugMessage("execute Shortcode in url-parameter: ".$urlShortcodeExcecuted);
          $urlShortcodeExcecuted = do_shortcode($urlShortcodeExcecuted);
          $this->feedUrl = $urlShortcodeExcecuted;
          $this->jci_collectDebugMessage("result url after executing Shortcode: ".$this->feedUrl);
      }
      
            
      # if there is twig code in the url: execute it
      if (preg_match("/[{%]/", $this->feedUrl) || preg_match("/[{{]/", $this->feedUrl)) {    # detect twig by "{%" or "{{"
        $this->jci_collectDebugMessage("{ or % in url: exexcute twig-parser on it with urlparam-data: ".$this->feedUrl);
        $urlparamArr4Twig{"urlparam"} = $this->urlparamval;
		$urlTwigExcecuted = $twigHandler->executeTwig($urlparamArr4Twig, $this->feedUrl, $this->parser, $this->maskspecialcharsinjsonFlag);
		$twigDebugMsg = $twigHandler->getTwigDebug();
        $this->jci_collectDebugMessage("execute twig-code in url-parameter: ".$twigDebugMsg, 2, "", FALSE);
        $this->feedUrl = $urlTwigExcecuted;
      }
      
      

      $this->feedUrl = trim($this->feedUrl);
	    $this->jci_collectDebugMessage("JSON-url: ".$this->feedUrl, 10);

		
		
		
      #if (""!=$curloptions) {
      if (""!=$this->curloptions) {
        if (preg_match("/{{(.*)}}/i",  $this->curloptions)) {
			$urlparamArr4Twig{"urlparam"} = $this->urlparamval;
			$curloptionTwigExcecuted = $twigHandler->executeTwig($urlparamArr4Twig, $this->curloptions, $this->parser, $this->maskspecialcharsinjsonFlag);
			$twigDebugMsg = $twigHandler->getTwigDebug();
			$this->jci_collectDebugMessage("execute twig-code in curloptions: ".$twigDebugMsg, 10, "", FALSE);
			$this->curloptions = $curloptionTwigExcecuted;
			$this->jci_collectDebugMessage("curloptions after twig-execution: ".$this->curloptions, 10);
        }
        $this->curloptions = preg_replace("/%22/i", "\"", $this->curloptions);
        $this->curloptions = preg_replace("/%7B/i", "{", $this->curloptions);
        $this->curloptions = preg_replace("/%7D/i", "}", $this->curloptions);
        if (preg_match("/#BRO#(.*)#BRC#/i",  $this->curloptions)) {
          $this->curloptions = preg_replace("/#BRO#/i", "[", $this->curloptions);
          $this->curloptions = preg_replace("/#BRC#/i", "]", $this->curloptions);
          $this->jci_collectDebugMessage("PRE-shortcode: curloptions-parameter shortcode-execution: ".$this->curloptions, 10);
          $this->curloptions = do_shortcode($this->curloptions);
          $this->jci_collectDebugMessage("POST-shortcode: curloptions-parameter shortcode-execution: ".$this->curloptions, 10);
        }
      }
      $this->jci_collectDebugMessage("curloptions really used: ".$this->curloptions);

      /* caching or not? */
      /* cache */
      if (
          (!class_exists('FileLoadWithCachePro'))
          || (!class_exists('JSONdecodePro'))
      ) {
        require_once plugin_dir_path( __FILE__ ) . '/class-fileload-cache-pro.php';
      }

      # set cachetime BEGIN
			if (get_option('jci_pro_enable_cache')==1) {
        $this->isCacheEnable = TRUE;
      }

      $cacheTimeFromOption = get_option('jci_pro_cache_time');  # max age of cachefile: if younger use cache, if not retrieve from web
			$format = get_option('jci_pro_cache_time_format');
      $cacheExpireTime = strtotime(date('Y-m-d H:i:s', strtotime(" -".$cacheTimeFromOption." " . $format )));
      $this->cacheExpireTime = $cacheExpireTime;
      if ($this->cachetime > 0) {
        $this->isCacheEnable = TRUE;
        $this->cacheExpireTime = time() - $this->cachetime;
      }
      # set cachetime END

	if ($this->isCacheEnable) {
        # 1 = checkbox "enable cache" activ
        $ctt = ": Cachetime set via Plugin-Options: ".$cacheTimeFromOption." ".$format;
        if ($this->cachetime > 0) {
          $ctt = ": Cachetime is set via Shortcode / Template to ".$this->cachetime." seconds";
        }
  	    $this->jci_collectDebugMessage("Caching is enabled".$ctt);
        # check cacheFolder
		require_once plugin_dir_path( __FILE__ ) . '/lib/cache.php';

        $cacheFolderObj = new jci_Cache();
        #$this->errormessagecache = $checkCacheFolderObj->geterrormessage();
  	    $this->jci_collectDebugMessage("Caching-Foldercheck: ".$cacheFolderObj->geterrormessage(), 10);

        # cachefolder ok: set cachefile
		$this->cacheFile = $cacheFolderObj->getCacheFileName($this->feedUrl, $this->postPayload, $this->postbody);
        $this->jci_collectDebugMessage("use this cachefile: ".$this->cacheFile, 10);
      } else {
        # if not=1: no caching
  	    $this->jci_collectDebugMessage("Caching is NOT enabled");
        $this->isCacheEnable = FALSE;
      }

      /* set other parameter */
      $numberofdisplayeditems = $this->removeInvalidQuotes($numberofdisplayeditems);
      if ($numberofdisplayeditems>=0) {
        $this->numberofdisplayeditems = $numberofdisplayeditems;
      }
   
      $urlgettimeout = $this->removeInvalidQuotes($urlgettimeout);
      if (intval($urlgettimeout)>0 || $urlgettimeout!="") {
        $this->urlgettimeout = $urlgettimeout;
        $this->jci_collectDebugMessage("set urlgettimeout via shortcode: ".$this->urlgettimeout);
      }

      $feedsource = $this->removeInvalidQuotes($feedsource);
      if ($feedsource=="") {
        #http-get
        $this->feedsource = "http";
      } else if ($feedsource == "file") {
        $this->feedsource = "file";
        $this->feedfilename = $this->removeInvalidQuotes($feedfilename);
      } else if ($feedsource == "ftp") {
        #$this->feedsource = "ftp"; # maybe future use
      }

      if ($this->feedUrl=="" && $this->feedsource!="file") {
  	    $this->jci_collectDebugMessage("no URL defined: abort, display defined errormessage");
        $errormsg = get_option('jci_pro_errormessage');
        if ($errormsg=="") {
          return $this->jci_showDebugMessage()."No URL defined - plugin aborted: Check url= parameter, remove quotation marks and linefeeds!<hr>";
        }
        return $this->jci_showDebugMessage().$errormsg;
      }

      if ($this->mode=="testurl") {
        echo "<hr>Testing URL from shortcode: <a href=\"".$this->feedUrl."\" target=_blank>".$this->feedUrl."</a><br>";
        #echo "<a href=\"https://jsoneditoronline.org/?url=".urlencode($this->feedUrl)."\" target=_blank>open in JSON-viewer (works only if JSON is available without parameters and authentication)</a><br>";
        # only if CORS is active for URL
        $this->debugLevel = 90;
        $this->debugModeIsOn = FALSE;#TRUE;
        $this->isCacheEnable = FALSE;
        $this->convertJsonNumbers2Strings = TRUE;
        
        $this->method = "curlget";
        echo "Method: ".$this->method."<br>";
        echo "Timeout: ".$this->urlgettimeout."<br>";
        $fileLoadWithCacheObj = new FileLoadWithCachePro(
            $this->feedUrl, $this->urlgettimeout, $this->isCacheEnable,'',
            '', $this->method, NULL, '', '',
            $this->postPayload, $this->header, $this->auth, $this->postbody,
            $this->debugLevel, $this->debugModeIsOn, $this->urlencodepostpayload, $this->curloptions,
            $this->httpstatuscodemustbe200
            );
        $fileLoadWithCacheObj->retrieveJsonData();
		$httpcode = $fileLoadWithCacheObj->getErrormsgHttpCode();
        if ((200!=$httpcode) && ($this->httpstatuscodemustbe200)) {
          return "<b>Retrieving of ".$this->feedUrl." failed.<br>http-error: ".$httpcode."</b>";
        }

        if (!($fileLoadWithCacheObj->getAllok())) {
          # loading of JSON failed, errormessage is NOT displayed at failed method
          return "<hr>Test failed: JSON can't be retrieved<hr>";
        }
        $this->feedData = $fileLoadWithCacheObj->getFeeddataWithoutpayloadinputstr();
        $anzdata = 30;
        if (strlen($this->feedData)>$anzdata) {
          echo "Got data, first $anzdata characters: ".substr($this->feedData, 0, $anzdata)."...";     
        } else {
          echo "Got data: ".$this->feedData;     
        }
        #decodeFeedData 
        $jsonDecodeObj = new JSONdecodePro($this->feedData, TRUE, $this->debugLevel, $this->debugModeIsOn, $this->convertJsonNumbers2Strings);
        $vals = $jsonDecodeObj->getJsondata();
        if (!$jsonDecodeObj->getIsAllOk()) {
          return "<br>JSON-Decoding failed. Check structure and encoding of JSON-data.";
        }
  
        function loopArr($arr, $leadin, $level) {
         #echo "<br>level: $level<br>";
          $lead = @array_shift(@array_keys($arr));
          $tr =  $arr[$lead];
          if (is_Array($tr)) {
            if (is_int($lead)) {
              $leadin = preg_replace("/\.$/", "", $leadin);
              if ($level==1) {
                $leadin .= "_context";
              }
              $leadin .= "[".$lead."].";
            } else {
              $leadin .= $lead.".";
            }
            $lv = $level+1;
           # echo "<br>lv: $lv<br>";
            $rt = loopArr($tr, $leadin, $lv); 
            $leadin = $rt;
          } else {
            $leadin .= $lead.".";
          }
          return $leadin;
        }   

        $twigcodeItem = loopArr($vals, "", 1);  
        $twigcodeItem = preg_replace("/\.$/", "", $twigcodeItem);
        $twigcode = "first item of JSON: {{".$twigcodeItem."}}";
        #$out = "<hr>Test successful: JSON is avaiblable<br>";
        $out = "<hr>Try this shortcode:<br>";
        $out .= "<pre>[jsoncontentimporterpro url=".$this->feedUrl." debugmode=10 method=curlget parser=twig]\n".$twigcode."\n[/jsoncontentimporterpro]</pre>";
        $out .= "<hr>";
        return $out;
      }
      $fileLoadWithCacheObj = new FileLoadWithCachePro(
            $this->feedUrl, $this->urlgettimeout, $this->isCacheEnable, $this->cacheFile,
            $this->cacheExpireTime, $this->method, NULL, $this->feedsource, $this->feedfilename,
            $this->postPayload, $this->header, $this->auth, $this->postbody,
            $this->debugLevel, $this->debugModeIsOn, $this->urlencodepostpayload, $this->curloptions, $this->httpstatuscodemustbe200
            );
      $fileLoadWithCacheObj->retrieveJsonData();

      if (!($fileLoadWithCacheObj->getAllok())) {
        # loading of JSON failed, errormessage is NOT displayed at failed method
        $this->jci_collectDebugMessage("error loading JSON: ".$fileLoadWithCacheObj->getErrormsg());
        return $this->jci_showDebugMessage();
      }
      $this->feedData = $fileLoadWithCacheObj->getFeeddata();

      $gotjsontmp = "";
      if (preg_match("/##payloadinputstr##/", $this->feedData)) {
        $outTmp = explode("##payloadinputstr##", $this->feedData);
        $this->jci_collectDebugMessage("payloadinputstr: ".$outTmp[1], 10);
        $gotjsontmp = $outTmp[0];
      } else {
        $gotjsontmp = $this->feedData;
      }

      if ($this->inputtype=="xml" && $gotjsontmp!="") {
        $this->jci_collectDebugMessage("loading XML, try to convert to JSON: ".$gotjsontmp, 10);
        $xml = simplexml_load_string($gotjsontmp, "SimpleXMLElement", LIBXML_NOCDATA);
        $tmpFeedData = json_encode($xml);
        if ($tmpFeedData!="") {
          $this->feedData = $tmpFeedData;
          $gotjsontmp = $tmpFeedData;
        }
      }

      $inspurl = "https://jsoneditoronline.org";
      $this->buildDebugTextarea("api-answer:<br>Inspect JSON: Copypaste (click in box, Strg-A marks all, then insert into clipboard) the JSON from the following box to <a href=\"".$inspurl."\" target=_blank>".$inspurl."</a>):", $gotjsontmp);

      if (preg_match("/^json\_callback/", $this->feedData)) {
        $this->feedData = preg_replace("/^json\_callback\(/", "", trim($this->feedData));
        $this->feedData = preg_replace("/\)\;$/", "", trim($this->feedData));
        $this->feedData = preg_replace("/\'/", "\"", trim($this->feedData));
      }

			# build json-array
      if (($this->parser=="twig") || ($this->parser=="twig243")) {
        $content = $this->replaceInTwigCodeInvalidQuotesWithValidQuotes($content);
#        $this->jci_setup_twig_environment();
        ### keys with @ or ! or $
         $this->feedData = $twigHandler->maskSpecialCharsInJSON($this->feedData); ### feed-string is masked here to convert it to JSON

        $payloadinputstrPattern = "##payloadinputstr##";
        $payloadinputJson = NULL;
        if (preg_match("/$payloadinputstrPattern/", $this->feedData)) {
          $tmpFeeddataArr = explode($payloadinputstrPattern, $this->feedData);
          $this->feedData = $tmpFeeddataArr[0];
          $payloadinputstr = $tmpFeeddataArr[1];
          $payloadinputJson = json_decode($payloadinputstr, TRUE);
        }

        if ($this->trytohealjson) {
          $this->feedData = $this->func_trytohealjson($this->feedData);
          #$this->jci_collectDebugMessage("trytohealjson JSON: ".$this->feedData, 10);
        }
        if ($this->displayapireturn>0) {
          # if the api does not return JSON but something else (e.g. an encoded image) with this parameter the api-return can be taken via {{data}} 
          $this->jci_collectDebugMessage("displayapireturn: ".$this->displayapireturn, 10);
          $apianswer = $this->feedData;
          $apianswer = $twigHandler->unMaskSpecialCharsInJSON($apianswer);
          if ($this->displayapireturn & 2) {
            $this->jci_collectDebugMessage("displayapireturn: execute base64_encode on api-answer", 10);
            $apianswer = base64_encode($apianswer);
          }
          if ($this->displayapireturn & 4) {
            $this->jci_collectDebugMessage("displayapireturn: remove linefeed out of api-answer", 10);
            $apianswer = preg_replace("/\n/", "", $apianswer);
          }
          #$this->jci_collectDebugMessage("JSON: key 'data', value: ".$apianswer, 10);
		  $apianswer = preg_replace("/\"/", '\\"', $apianswer);
		  if ($this->upload) {
			  $this->feedData = '{ "data" : '.$apianswer.'}';
		  } else {
			  $this->feedData = '{ "data" : "'.$apianswer.'"}';
			$this->buildDebugTextarea("converted JSON-answer:<br>Inspect JSON: Copypaste (click in box, Strg-A marks all, then insert into clipboard) the JSON from the following box to <a href=\"".$inspurl."\" target=_blank>".$inspurl."</a>):", $this->feedData);
		  }
        }

        $jsonDecodeObj = new JSONdecodePro($this->feedData, TRUE, $this->debugLevel, $this->debugModeIsOn, $this->convertJsonNumbers2Strings);
        $vals = $jsonDecodeObj->getJsondata();
        if (!$jsonDecodeObj->getIsAllOk()) {
          $errormsg = get_option('jci_pro_errormessage');
           if ($errormsg=="") {
             return $this->jci_showDebugMessage()."JSON-Decoding failed. Check structure and encoding of JSON-data.";
           } else {
             return $this->jci_showDebugMessage().$errormsg;
           }
        }
        if (isset($payloadinputJson)) {
          $vals{"payloadparam"} = $payloadinputJson;
          $this->jci_collectDebugMessage("POST-payloadparam: ".$this->postPayload, 10);
        }

        if ($valcfp!=NULL) {
          $vals{"cfp"} = $valcfp;
        }

      if (!empty($this->param1)) {
        $vals{"param1"} = $this->param1;
      }
      if (!empty($this->param2)) {
        $vals{"param2"} = $this->param2;
      }
      if (!empty($this->urlparamval)) {
        $vals{"urlparam"} = $this->urlparamval;
      }
      if (isset($vals{"urlparam"})) {
        $this->jci_collectDebugMessage("urlparam in JSON, call by 'urlparam.KEY': ".print_r($vals{"urlparam"}, TRUE), 10);
      }
      
      # add post-data
      if ($this->addpostdata2json) {
        $tmp1 = Array();
        $postparam = get_post();
        if ($postparam) {
          $vals{"jcipageparam"} = $postparam;
        }
      }

        $val_jci_pro_use_wpautop = get_option('jci_pro_use_wpautop');
        if ($val_jci_pro_use_wpautop==2) {
          $this->jci_collectDebugMessage("twig: use wpautop");
          $postwithbreaks = wpautop( $content, FALSE);
        } else {
          $this->jci_collectDebugMessage("twig: wpautop not used");
          $postwithbreaks = $content;
        }
        $this->datastructure = $postwithbreaks;

        if ($this->datastructure=="") {
			# suggest template: create twig out of JSON
			require_once plugin_dir_path( __FILE__ ) . '/lib/JsonToTwigConverter.php';
			#json-data: check if really JSON
			if (json_decode($this->feedData, TRUE)) {
				# we have JSON
				$j2t = new JsonToTwigConverter($this->feedData);
				$res = $j2t->getTwig();
				$this->datastructure = "<b>the result of this computer-generated code:</b><br>".$res;
				echo "<hr><b>As there was no twig-template defined in the shortcode and plugin-template, an intelligent algorithm created twig-sourcecode:</b><br>Copy paste this to a plugin-template.<br><textarea rows=6 cols=90>$res</textarea><hr>";
			} else {
				# no JSON
				return $this->jci_showDebugMessage()."<br>Invalid JSON - creating of example twig failed - work on access to API and JSON. Check debugmode! plugin aborted!";
			}
        }

        #$this->jci_collectDebugMessage("twig-template: ".$this->datastructure);
        $this->buildDebugTextarea("twig-template:", $this->datastructure);

        # check template-string
        # twig 1.x: tokenize expects string
        # twig 2.x: tokenize expects instance of Twig_Source
        $ts = NULL;

        $val_jci_pro_order_of_shortcodeeval = get_option('jci_pro_order_of_shortcodeeval');
        if ($val_jci_pro_order_of_shortcodeeval=="") {
          $val_jci_pro_order_of_shortcodeeval = 1;
        }
        if ($val_jci_pro_order_of_shortcodeeval==2) {
          $this->jci_collectDebugMessage("twig: eval shortcode in template BEFORE inserting JSON");
          $this->datastructure = do_shortcode($this->datastructure);
        }
		
		$res = $twigHandler->executeTwig($vals, $this->datastructure, $this->parser, $this->maskspecialcharsinjsonFlag);
		
        if (isset($vals["urlparam"]) && is_array($vals["urlparam"])){
          $urlparamStr = json_encode($vals["urlparam"]);
          $this->jci_collectDebugMessage("twig: available urlparam (adress via 'urlparam.NAME_OF_KEY') : ".$urlparamStr);
        }
        
        $this->buildDebugTextarea("JSON used for twig-template:<br>Inspect JSON: Copypaste (click in box, Strg-A marks all, then insert into clipboard) the JSON from the following box to <a href=\"".$inspurl."\" target=_blank>".$inspurl."</a>):", json_encode($vals));
        
        # execute shortcode in rendered text
        if (
          ($val_jci_pro_order_of_shortcodeeval==1)
          && ($this->mode!="create")
          ) {
          #if (!preg_match("/\[jsoncontentimporterpro/", $res)) {  # prevent infinite looping # removed v335
          $this->jci_collectDebugMessage("twig: eval shortcode in template AFTER inserting JSON");
          $res = $twigHandler->unMaskSpecialCharsInJSON($res); 
          $res = do_shortcode($res);
          $res = $twigHandler->maskSpecialCharsInJSON($res); 
          #} else {
          #  $this->jci_collectDebugMessage("twig: eval shortcode failed: double [jsoncontentimporterpro]");
          #}
        }
        #$this->jci_collectDebugMessage("twig result: $res", 10, "<hr>");
        $res = $twigHandler->unMaskSpecialCharsInJSON($res);
        $this->buildDebugTextarea("Twig-result:", $res);

        if ($this->mode=="create") {
# added 3.4.0: create custom post types BEGIN
          $this->jci_collectCreateMessage("<hr><b>start creating pages:</b>");
          $loopKey = $this->createoptionsArr{'loop'};
          if (empty($loopKey)) {
            # work on single page
            $valsTmp = $vals;
            $this->jci_collectCreateMessage("create page without JSON-loopkey");
          } else {
            # work on loop   
            $this->jci_collectCreateMessage("create page with JSON-loopkey: ".$loopKey);
            $loopKeyArr = explode(".", $loopKey);
            $valsTmp = $vals;
            foreach ($loopKeyArr as $lk) {
              $valsTmp = $valsTmp[$lk];
            }
          }
            if (""==$this->pageid) {
              #echo "ID of the creating page not available. No creation or deletion done.<br>\n";
              $this->jci_collectCreateMessage("ID of the creating page not available. No creation or deletion done.<br>\n");
              return $this->jci_showDebugMessage()."Page-ID not available\n";
            }
            $this->jci_collectCreateMessage("ID of the creating page is ".$this->pageid);
            $this->jci_collectCreateMessage( "no of pages to create: ".count($valsTmp));
            $typeOfNewpage = $this->createoptionsArr{'type'};
					
            $this->jci_collectCreateMessage( "pagetype: ".$typeOfNewpage." ('type' in 'createoptions' in shortcode must match 'type' in in plugin-settings!)");
            $zorbArr = $this->getCustomPageSettingsFromPluginOptions($typeOfNewpage);
            if (""!=$typeOfNewpage && $typeOfNewpage==$zorbArr{"type"}) {
              $this->jci_collectCreateMessage( "<font color=green>Great! Pagetype ".$typeOfNewpage." defined in plugin-options!</font>");
            } else {
              $this->jci_collectCreateMessage( "<font color=red>Pagetype not defined in plugin-options: <a href=/wp-admin/admin.php?page=unique_jcipro_menu_slug&tab=customposttypes target=_blank>click here</a>!</font><br>");
            }

            $custom_fields_arr = get_post_custom($this->pageid);
            # delete previous created pages if flag deleteold is yes
            $deleteOldFlag = @$this->createoptionsArr{'deleteold'};
			$nameofthejsonimport = @$custom_fields_arr['jci_uniquekey_createpost'][0];  # is key in field?
            if ($nameofthejsonimport=="") {
				$minlengthofkey = 5;
				$juktmp = "";
                $this->jci_collectCreateMessage( "Custom Fields 'jci_uniquekey_createpost' missing: Use 'key' from parameter-list from option-list of this custom post type.");
				$juktmp = @$zorbArr{"key"};
				
                if (strlen($juktmp)>$minlengthofkey) {
					$nameofthejsonimport = $juktmp;
					$this->jci_collectCreateMessage( "<font color=green>key of this Custom Post Type set to $nameofthejsonimport via the plugin-options</font>");
                } else {
					$this->jci_collectCreateMessage( "<font color=red>key option-list of this custom post type missing or too short (length at least $minlengthofkey).</font><hr>");
					return $this->jci_showDebugMessage();
                }
            } else {
				$this->jci_collectCreateMessage( "<font color=green>Custom Fields 'jci_uniquekey_createpost' set to $nameofthejsonimport: delete pages with that key</font>");
            }

			if ("yes" == $deleteOldFlag) {
				# if all should be deleted, all cpt must have the same key. the md5 removes all twig etc out of the key
				$nameofthejsonimport = md5($nameofthejsonimport);
				$this->deleteCPT( $typeOfNewpage, $nameofthejsonimport );
			} else if ("some" == $deleteOldFlag) {
				$this->jci_collectCreateMessage( "<b>do NOT delete all previous generated pages, but maybe some - depending on the key and JSON-data!</b>");
            } else {
				$this->jci_collectCreateMessage( "<b>do NOT delete any previous generated pages!</b>");
			}

            $titelRawFull = @$custom_fields_arr["jci_title_createpost"][0];
            if (empty($titelRawFull)) {
				$titelRawFull = $this->createoptionsArr{'title'};
				$titelRawFull = preg_replace("/#SQM#/", "'", $titelRawFull);
				$this->jci_collectCreateMessage( "title template from shortcode: ".$titelRawFull);
				#echo "title template from shortcode: ".$titelRawFull."<br>";
            } else {
				$titelRawFull = preg_replace("/#SQM#/", "'", $titelRawFull);
				$this->jci_collectCreateMessage( "title template from custom tags: ".$titelRawFull);
				#echo "title template from custom tags: ".$titelRawFull."<br>";
            }

            $slugnameRawFull = @$custom_fields_arr["jci_slugname_createpost"][0];
            if (empty($slugnameRawFull)) {
				$slugnameRawFull = $this->createoptionsArr{'slugname'};
				$slugnameRawFull = preg_replace("/#SQM#/", "'", $slugnameRawFull);
				$this->jci_collectCreateMessage( "slugname template from shortcode: ".$slugnameRawFull);
            } else {
				$slugnameRawFull = preg_replace("/#SQM#/", "'", $slugnameRawFull);
				$this->jci_collectCreateMessage( "slugname template from custom tags: ".$slugnameRawFull);
            }
            $this->jci_collectCreateMessage( "<hr><b>start looping:</b><br>");

			$k = 1;
			foreach ($valsTmp as $pageitem) {
				# execute twig-code in the key: 
				$keyofitem = $twigHandler->executeTwig($pageitem, $nameofthejsonimport, $this->parser, FALSE);
				$this->jci_collectDebugMessage("($k) key of item: ".$keyofitem, 2, "", FALSE);
				if ( ("some" == $deleteOldFlag) && (""!=$keyofitem)) {
					# execute twig-code in the key:
					$this->deleteCPT( $typeOfNewpage, $keyofitem );
				}
				$titelOfNewpage = $twigHandler->executeTwig($pageitem, $titelRawFull, $this->parser, $this->maskspecialcharsinjsonFlag);
				$this->jci_collectDebugMessage("($k) execute twig-code in title-template: ".$twigHandler->getTwigDebug(), 2, "", FALSE);
				$this->jci_collectDebugMessage("($k) title: ".$titelOfNewpage);
				$slugnameOfNewpage = $twigHandler->executeTwig($pageitem, $slugnameRawFull, $this->parser, $this->maskspecialcharsinjsonFlag);
				if ($slugnameOfNewpage!="") {
					$slugnameOfNewpage = sanitize_text_field($slugnameOfNewpage);
				}
				$this->jci_collectDebugMessage("($k) execute twig-code in slugname-template: ".$twigHandler->getTwigDebug(), 2, "", FALSE);
				$this->jci_collectDebugMessage("($k) slugname: ".$slugnameOfNewpage);

				$this->jci_collectCreateMessage("($k) title of created page: $titelOfNewpage", TRUE);
				$this->jci_collectCreateMessage("($k) <a href=/".$zorbArr{"ptredirect"}."/".$slugnameOfNewpage." target=_blank>show created page</a>");
				$this->jci_collectCreateMessage("($k) slug: $slugnameOfNewpage", TRUE);

				$newPostCategoryInputString = @$this->createoptionsArr{'categoryids'};
				$newPostCategoryArr = array();
				if ($newPostCategoryInputString!="") {
					$this->jci_collectCreateMessage( "($k) Category-IDs for created Page: ".$newPostCategoryInputString, TRUE);
					$newPostCategoryArr = explode(",", $newPostCategoryInputString);
				}
				$this->jci_collectCreateMessage( "($k) twig-template 4 page (1st 30 chars): ".substr(htmlentities($this->datastructure), 0, 30));
			
				$resTmp = $twigHandler->executeTwig($pageitem, $this->datastructure, $this->parser, $this->maskspecialcharsinjsonFlag);
				$this->jci_collectDebugMessage("($k) execute twig-code in template: ".$twigHandler->getTwigDebug(), 2, "", FALSE);			
				
				if (preg_match("/#posinloop#/", $resTmp)) {
					$resTmp = preg_replace("/#posinloop#/", $k, $resTmp);
					$this->jci_collectCreateMessage( "($k) Insert position in loop into shortcode: ".htmlentities($resTmp));
					#echo "($k) Insert position in loop into shortcode: ".htmlentities($resTmp)."<br>";
				}
				$resTmp = $twigHandler->unMaskSpecialCharsInJSON($resTmp);
				$this->jci_collectCreateMessage( "($k) content 4 page pre do_shortcode: ".htmlentities($resTmp));

				# if shortcode inside: evaluate now
				$resTmp = do_shortcode($resTmp);
				$this->jci_collectDebugMessage("($k) content 4 page after do_shortcode: ".htmlentities($resTmp));
				#echo "($k) typeOfNewpage: ".$typeOfNewpage."<br>";
				$idOfNewPost = $this->createPage($k, $typeOfNewpage, $titelOfNewpage, $slugnameOfNewpage, $newPostCategoryArr, $resTmp, $keyofitem);
				if (isset($idOfNewPost) && ($idOfNewPost>0)) {
					// add custom fields - BEGIN
					$cf = @$this->createoptionsArr{'customfields'};
					if (empty($cf)) {
						$this->jci_collectCreateMessage( "($k)".' no extra customfields in shortcode defined. Example: "customfields": #BRO# {"extracustomfield1":"extravalue1"}, {"1#SEP#extracustomfield2":"extravalue2#SQM#SingleQuote#SQM#"}, {"2#SEP#extracustomfield2":"extravalue3"}#BRC#}');
					} else {
						$noofcf = count($this->createoptionsArr{'customfields'});
						$this->jci_collectCreateMessage( "($k) add ".($noofcf)." custom fields");
						for ($j=0; $j<$noofcf;$j++) {
							foreach ($this->createoptionsArr{'customfields'}[$j] as $key => $value) {
								$key = preg_replace("/#SQM#/", "'", $key);
								$value = preg_replace("/#SQM#/", "'", $value);
								$uniquekey = TRUE;
								if (preg_match("/(.*)#SEP#/i", $key)) {  # identical keys: INTEGER#SEP#KEYNAME
										$keyArr = explode("#SEP#", $key);
										$key = $keyArr[1];
										$uniquekey = FALSE;
								}
								$this->jci_collectCreateMessage( "($k) template for custom field value from shortcode: $key : $value");
								$key = $twigHandler->executeTwig($pageitem, $key, $this->parser, $this->maskspecialcharsinjsonFlag);
								$this->jci_collectDebugMessage("($k) execute twig-code in customfield-key $key: ".$twigHandler->getTwigDebug(), 2, "", FALSE);

								$value = $twigHandler->executeTwig($pageitem, $value, $this->parser, $this->maskspecialcharsinjsonFlag);
								$this->jci_collectDebugMessage("($k) execute twig-code in customfield-value $value: ".$twigHandler->getTwigDebug(), 2, "", FALSE);
								$value = $twigHandler->unMaskSpecialCharsInJSON($value);
								$cfcreateflag = add_post_meta($idOfNewPost, $key, $value, $uniquekey);
								if ($cfcreateflag) {
									$this->jci_collectCreateMessage( "($k) Success: add custom field value from shortcode to page $idOfNewPost: $key : $value");
								} else {
									$this->jci_collectCreateMessage( "($k) Failed: add custom field value from shortcode to page $idOfNewPost: $key : $value");
								}
							}
						}
					}
				}
				// add custom fields - END
				$this->jci_collectCreateMessage( "<hr>");
				$k++;
			}
			return $this->jci_showDebugMessage();
			# added 3.4.0: create custom post types END
        } else {
          return $this->jci_showDebugMessage().$res;
        }

      } else {
        $payloadinputstrPattern = "##payloadinputstr##";
        if (preg_match("/$payloadinputstrPattern/", $this->feedData)) {
          $tmpFeeddataArr = explode($payloadinputstrPattern, $this->feedData);
          $this->feedData = $tmpFeeddataArr[0];
        }

        $jsonDecodeObj = new JSONdecodePro($this->feedData, FALSE, $this->debugLevel, $this->debugModeIsOn, $this->convertJsonNumbers2Strings);
        $this->jsondata = $jsonDecodeObj->getJsondata();
        if (!$jsonDecodeObj->getIsAllOk()) {
          $errormsg = get_option('jci_pro_errormessage');
           if ($errormsg=="") {
             return $this->jci_showDebugMessage()."JSON-Decoding failed. Check structure and encoding if JSON-data.";
           } else {
             return $this->jci_showDebugMessage().$errormsg;
           }
        }
        if ($sortorderisup=="yes") {
          $this->sortorderIsUp = TRUE;
        } else {
          $this->sortorderIsUp = FALSE;
        }
        if ($sorttypeisnatural=="yes") {
          $this->sorttypeIsNatural = TRUE;
        } else {
          $this->sorttypeIsNatural = FALSE;
        }
        $this->sortField = $sortfield;
	     if (!empty($this->sortField)) {
         usort($this->jsondata, array($this, 'sortfunc'));
        }
        # sorting JSON - END

        # filtering JSON - BEGIN
        if(!empty($this->filterresultsin)) {
          $this->jsondata = $this->filterJSON($this->jsondata, $this->filterresultsin, "resultin");
        }
        if(!empty($this->filterresultsnotin)) {
          $this->jsondata = $this->filterJSON($this->jsondata, $this->filterresultsnotin, "resultnotin");
        }
        # filtering JSON - END

        $val_jci_pro_use_wpautop = get_option('jci_pro_use_wpautop');
        if ($val_jci_pro_use_wpautop==2) {
          $this->jci_collectDebugMessage("JCI-parser: use wpautop");
          $postwithbreaks = wpautop( $content, FALSE);
        } else {
          $postwithbreaks = $content;
          $this->jci_collectDebugMessage("JCI-parser: wpautop not used");
        }
        $this->datastructure = preg_replace("/\n/", "", $postwithbreaks);

        require_once plugin_dir_path( __FILE__ ) . '/class-json-parser-pro.php';
        $this->jci_collectDebugMessage("JCI-parser loaded");

        $val_jci_pro_order_of_shortcodeeval = get_option('jci_pro_order_of_shortcodeeval');
        if ($val_jci_pro_order_of_shortcodeeval=="") {
          $val_jci_pro_order_of_shortcodeeval = 1;
        }
        if (($val_jci_pro_order_of_shortcodeeval==2)
          && ($this->mode!="create")
        ){
          if (!preg_match("/\[jsoncontentimporterpro/", $this->datastructure)) {  # prevent infinite looping
            $this->jci_collectDebugMessage("eval shortcode in template BEFORE inserting JSON");
            $this->datastructure = do_shortcode($this->datastructure);
          } else {
            $this->jci_collectDebugMessage("jci: eval shortcode failed: double [jsoncontentimporterpro]");
          }
        }

        $this->buildDebugTextarea("JCI template:", $this->datastructure);
         $JsonContentParserPro = new JsonContentParserPro($this->jsondata, $this->datastructure, $this->basenode, $this->numberofdisplayeditems,
            $this->oneofthesewordsmustbein, $this->oneofthesewordsmustbeindepth,
            $this->requiredfieldsandvalues, $this->requiredfieldsandvaluesdepth,
            $this->requiredfieldsandvalueslogicandbetweentwofields,
            $this->oneofthesewordsmustnotbein, $this->oneofthesewordsmustnotbeindepth,
            $this->hidedisplayflag, $this->loopWithoutSubloop, $this->delimiter, $this->param1, $this->param2
            );
        $retval = $JsonContentParserPro->retrieveDataAndBuildAllHtmlItems();
        if (($val_jci_pro_order_of_shortcodeeval==1)
          && ($this->mode!="create")
          ) {
          if (!preg_match("/\[jsoncontentimporterpro/", $retval)) {  # prevent infinite looping
            $this->jci_collectDebugMessage("eval shortcode in template AFTER inserting JSON");
            $retval = do_shortcode($retval);
          } else {
            $this->jci_collectDebugMessage("jci: eval shortcode failed: double [jsoncontentimporterpro]");
          }
        }
        if ($retval=="errorjsonstruc") {  # failed json-parsing
          $this->jci_collectDebugMessage("JCI-parser result: failed json-parsing", 10, "<hr>");
          $errormsg = get_option('jci_pro_errormessage');
          if ($errormsg=="") {
            return $this->jci_showDebugMessage()."JSON decoding failed: Is input-JSON valid? Check please!<hr>";
          }
          #$retval = do_shortcode($retval);  why here?
          return $this->jci_showDebugMessage().$errormsg;
        }
        $this->buildDebugTextarea("JCI-parser result:", $retval, TRUE);
        return $this->jci_showDebugMessage().$retval;
      }
		}
}
?>