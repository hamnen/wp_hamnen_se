<?php
global $wpdb;
add_action('admin_menu', 'register_jci_pro_create_menu');

function register_jci_pro_create_menu() {
	//create new top-level menu
	add_menu_page('JSON Content Importer Pro', 'JSON Content Importer Pro', 'administrator', 'unique_jcipro_menu_slug', 'jci_pro_settings_page',plugins_url('/images/jci-pro-loadcircle-16x16.png', __FILE__));
  add_submenu_page('unique_jcipro_menu_slug', 'Options', 'Options', 'administrator', 'unique_jcipro_menu_slug', 'register_jci_pro_settings');
  add_submenu_page('unique_jcipro_menu_slug', 'Template-Manager', 'Template-Manager', 'administrator', 'jciprotemplateslug', 'register_jci_pro_templates');
  add_submenu_page('unique_jcipro_menu_slug', 'Add Template', 'Add Template', 'administrator', 'jciproaddtemplateslug', 'register_jci_pro_add_templates');
  add_submenu_page('unique_jcipro_menu_slug', 'JCI pro Licence', 'JCI pro Licence', 'administrator', 'jciprolicence', 'edd_jcipro_license_page');
	add_action( 'admin_init', 'register_jci_pro_settings' );//call register settings function
}


/* options BEGIN */
function register_jci_pro_settings() {
	//register our settings
#	register_setting( 'jci-pro-options', 'jci_pro_json_url' );
	register_setting( 'jci-pro-options', 'jci_pro_json_fileload_basepath' );
	register_setting( 'jci-pro-options', 'jci_pro_enable_cache' );
	register_setting( 'jci-pro-options', 'jci_pro_enable_twigcache' );
	register_setting( 'jci-pro-options', 'jci_pro_cache_time' );
	register_setting( 'jci-pro-options', 'jci_pro_cache_time_format' );
	register_setting( 'jci-pro-options', 'jci_pro_errormessage' );
	register_setting( 'jci-pro-options', 'jci_pro_uninstall_deleteall' );
	register_setting( 'jci-pro-options', 'jci_pro_allow_urlparam' );
	register_setting( 'jci-pro-options', 'jci_pro_allow_urldirdyn' );
	register_setting( 'jci-pro-options', 'jci_pro_allow_regexp' );
	register_setting( 'jci-pro-options', 'jci_pro_allow_oauth_code' );
	register_setting( 'jci-pro-options', 'jci_pro_http_header_accept' );
	register_setting( 'jci-pro-options', 'jci_pro_http_header_useragent' );
	register_setting( 'jci-pro-options', 'jci_pro_http_body' );
	register_setting( 'jci-pro-options', 'jci_pro_delimiter' );
	register_setting( 'jci-pro-options', 'jci_pro_use_wpautop' );
	register_setting( 'jci-pro-options', 'jci_pro_order_of_shortcodeeval' );
	register_setting( 'jci-pro-options', 'jci_pro_debugmode' );
	register_setting( 'jci-pro-options', 'jci_pro_custom_post_types' );

	register_setting( 'jci-pro-options', 'jci_pro_curl_optionlist' );
	register_setting( 'jci-pro-options', 'jci_pro_curl_usernamepassword' );
	register_setting( 'jci-pro-options', 'jci_pro_curl_authmethod' );

	register_setting( 'jci-pro-options', 'edd_jcipro_license_key' );
	register_setting( 'jci-pro-options', 'edd_jcipro_license_status' );
	register_setting( 'jci-pro-options', 'edd_jcipro_license_lifetime' );
	register_setting( 'jci-pro-options', 'edd_jcipro_license_lc' );
	register_setting( 'jci-pro-options', 'edd_jcipro_license_lv' );
	register_setting( 'jci-pro-options', 'edd_jcipro_license_errormsg' );
	register_setting( 'jci-pro-options', 'edd_jcipro_license_errormsgacdeac' );

}

function jci_pro_settings_page() {
  $errorLevelSaveOptions = jci_pro_save_settings(); # save new settings if needed
?>
<div class="wrap">
<h2>JSON Content Importer: Settings</h2>
  <?php
  global $pagenow;
  if ( $pagenow == 'admin.php' && $_GET['page'] == 'unique_jcipro_menu_slug' ){
    # define tabs for plugin-admin-menu
    $currenttab = 'syntax';
    if ( isset ( $_GET['tab'] ) ) {
      $currenttab = $_GET['tab'];
    }
    jci_pro_admin_tabs($currenttab);
  ?>

<form method="post" action="admin.php?page=unique_jcipro_menu_slug&tab=<?php echo $currenttab; ?>">
    <?php settings_fields( 'jci-pro-options' ); ?>
    <?php do_settings_sections( 'jci-pro-options' ); ?>
    <table class="form-table">
    <?php
      # save: failed, no changes or changes-saved?
      if ($errorLevelSaveOptions == -5 ) {
        echo '<tr><td colspan="2"><b>Saving of URL-Timeout failed: must be a number</b></td></tr>';
      } else if ($errorLevelSaveOptions == -6) {  # there were changes
        echo '<tr><td colspan="2"><b>Saving of Cachetime failed: must be a number</b></td></tr>';
      } else if ($errorLevelSaveOptions<0) {  # there were changes
        echo '<tr><td colspan="2"><b>Saving failed, errorcode: '.$errorLevelSaveOptions.'</b></td></tr>';
      } else if ($errorLevelSaveOptions==2) {  # there were changes
         echo '<tr><td colspan="2"><b>Saving successful: Changed values saved</b></td></tr>';
      } else if ($errorLevelSaveOptions==1) {
         echo '<tr><td colspan="2"><b>Nothing changed, nothing saved</b></td></tr>';
      } else if ($errorLevelSaveOptions==1) {
         echo '<tr><td colspan="2"><b>Nothing changed, nothing saved</b></td></tr>';
      }
      wp_nonce_field( "jci-pro-set-page" );
      switch ( $currenttab ){
        case 'settings' :
    ?>
        <tr>
        	<td colspan="2">
        <h1>Cache:</h1>
            Enable Cache: <input type="checkbox" name="jci_pro_enable_cache" value="1" <?php echo (get_option('jci_pro_enable_cache') == 1)?"checked=checked":""; ?> />
        	 &nbsp;&nbsp;&nbsp; reload json from web if cachefile is older than <input type="text" name="jci_pro_cache_time" size="2" value="<?php echo get_option('jci_pro_cache_time'); ?>" />
           <select name="jci_pro_cache_time_format">
           			<option value="minutes" <?php echo (get_option('jci_pro_cache_time_format') == 'minutes')?"selected=selected":""; ?>>Minutes</option>
                    <option value="days" <?php echo (get_option('jci_pro_cache_time_format') == 'days')?"selected=selected":""; ?>>Days</option>
                    <option value="month" <?php echo (get_option('jci_pro_cache_time_format') == 'month')?"selected=selected":""; ?>>Months</option>
                    <option value="year" <?php echo (get_option('jci_pro_cache_time_format') == 'year')?"selected=selected":""; ?>>Years</option>
           </select>
           <br>
            Enable twig-Cache: <input type="checkbox" name="jci_pro_enable_twigcache" value="1" <?php echo (get_option('jci_pro_enable_twigcache') == 1)?"checked=checked":""; ?> />
			<br>
<?php
        if ( isset ( $_GET['clearcache'] ) && $_GET['clearcache']=="y") {
          $dcwpn = wp_verify_nonce( $_REQUEST['_wpnonce'], 'jcipro_clearcache' );
          if (!$dcwpn) {
            echo "deleting of cache failed because security check failed<br>";
        } else {
			require_once plugin_dir_path( __FILE__ ) . '/lib/cache.php';
			$jci_Cache = new jci_Cache();
			$jci_Cache->clearCacheFolder();
          }
        }
        $clearCacheUrl = "admin.php?page=unique_jcipro_menu_slug&tab=settings&clearcache=y";
        $wpn_cc_url = wp_nonce_url( $clearCacheUrl, 'jcipro_clearcache' );
?>
           <a href="<?php echo $wpn_cc_url; ?>">CLEAR CACHE</a>
           </td>
        </tr>

       <tr valign="top">
        <td colspan="2">
           <h1>Usage of other shortcodes:</h1>
           You can place third-party-Shortcodes of other plugins in the template (e. g. <a href="https://wordpress.org/plugins/tablepress/" target="_blank">TablePress</a>, <a href="https://wordpress.org/plugins/contact-form-7/" target="_blank">Contact Form 7</a>). There are two ways to handle this: First evaluate JSONContentImporter-Shortcode and then evaluate the third-party-Shortcode (default). Or first evaluate the third-party-plugin<br>
Example: If you want to fill JSON-data into a "Contact Form 7"-Form, you have to evaluate the "Contact Form 7" Shortcode [contact-form-7 id="..." title="..."] first. And you have to place the JSON-placeholders into the "Contact Form 7"-Template! Eval the [contact-form-7 id="..." title="..."] gives you the HTML of that with the JSON-placeholders: Those are replaced by eval the JSONContentImporter-Shortcode. As this is not the default way, you have to set this here!<br>

           <?php
              $val_jci_pro_order_of_shortcodeeval = get_option('jci_pro_order_of_shortcodeeval');
              if ($val_jci_pro_order_of_shortcodeeval=="") {
                $val_jci_pro_order_of_shortcodeeval = 1;
              }
          ?>
           <input type="radio" name="jci_pro_order_of_shortcodeeval" value="1" <?php echo ($val_jci_pro_order_of_shortcodeeval == 1)?"checked=checked":""; ?> /> first JSONContentImporter-Shortcode, 2nd: third-party-Shortcodes (default)
           <br>
           <input type="radio" name="jci_pro_order_of_shortcodeeval" value="2" <?php echo ($val_jci_pro_order_of_shortcodeeval == 2)?"checked=checked":""; ?> /> first third-party-Shortcodes, 2nd: JSONContentImporter-Shortcode (use this for TablePress, Contact Form 7 etc.)
        </td>
      </tr>


       <tr valign="top">
        <td colspan="2">
           <h1>Text of errormessage, displayed e.g. if JSON-API is unavailable:</h1>
            <?php
              $errormessage = get_option('jci_pro_errormessage');
              if ($errormessage=="") {
                $errormessage = ""; #sorry - data is unavailabe, try again later, please.";
              }
           ?>
           <input type="text" name="jci_pro_errormessage" placeholder="define custom errormessage here..." value="<?php echo $errormessage; ?>" size="100">
        </td>
      </tr>

       <tr valign="top">
        <td colspan="2">
           <h1>Load JSON-data from server filesystem:</h1>
           You can access JSON-datafiles via server-filesystem (and not via URL): Then you have to set the two Shortcode-parameter "feedsource=file" and "feedfilename=DIR/NAME_OF_FILE".
           Where "DIR" is a one or more directories and "NAME_OF_FILE" the filename.
           The following option sets the base path to the file, hence the plugin tires to get "OPTIONVALUE/DIR/NAME_OF_FILE" ("../" and such in DIR is filtered!)<br>
            <?php
              $val_jci_pro_json_fileload_basepath = get_option('jci_pro_json_fileload_basepath');
              if ($val_jci_pro_json_fileload_basepath=="") {
                $val_jci_pro_json_fileload_basepath = WP_CONTENT_DIR;
                if (!preg_match("/\/$/", $val_jci_pro_json_fileload_basepath)) {
                  $val_jci_pro_json_fileload_basepath .= "/";
                }
              }
           ?>
           <input type="text" name="jci_pro_json_fileload_basepath" placeholder="base directory where JSON-files are stored" value="<?php echo $val_jci_pro_json_fileload_basepath; ?>" size="100">
        </td>
      </tr>

       <tr valign="top">
        <td colspan="2">
           <h1>Use wpautop or not:</h1>
           The single- or double-linefeeds of the text between [jsoncontentimporterpro] and [/jsoncontentimporterpro] can be handled in different ways:
           <br>Converted into HTML-linefeeds or ignored.
           <br>
           If you have trouble with linefeeds, try using <a href="https://codex.wordpress.org/Function_Reference/wpautop" target="_blank">"wpautop"</a> by switching the following radio-button to "use wpautop".
           <br>
           <?php
              $val_jci_pro_use_wpautop = get_option('jci_pro_use_wpautop');
              if ($val_jci_pro_use_wpautop=="") {
                $val_jci_pro_use_wpautop = 2;
              }
          ?>
           <input type="radio" name="jci_pro_use_wpautop" value="1" <?php echo ($val_jci_pro_use_wpautop == 1)?"checked=checked":""; ?> /> use wpautop
           <br>
           <input type="radio" name="jci_pro_use_wpautop" value="2" <?php echo ($val_jci_pro_use_wpautop == 2)?"checked=checked":""; ?> /> do NOT use wpautop (default)
           <br>
           <input type="radio" name="jci_pro_use_wpautop" value="3" <?php echo ($val_jci_pro_use_wpautop == 3)?"checked=checked":""; ?> /> remove wpautop ("do NOT use wpautop" does not work in all situations)
        </td>
      </tr>


       <tr valign="top">
        <td colspan="2">
           <h1>Switch debug mode off / on:</h1>
           In case of problems, the debug mode gives you some hints what's going wrong.
           <br>
           If switched on, use the shortcode and check the created page. On the page some debug-messages will occur (if not, see html-sourcecode - sometimes css-themes overlap...)
           <br>
           <?php
              $val_jci_pro_debugmode = get_option('jci_pro_debugmode');
              if ($val_jci_pro_debugmode=="") {
                $val_jci_pro_debugmode = 1;
              }
          ?>
           <input type="radio" name="jci_pro_debugmode" value="1" <?php echo ($val_jci_pro_debugmode == 1)?"checked=checked":""; ?> /> debugmode off
           <br>
           <input type="radio" name="jci_pro_debugmode" value="2" <?php echo ($val_jci_pro_debugmode == 2)?"checked=checked":""; ?> /> debugmode ON (display some debug-infos)
           <br>
           <input type="radio" name="jci_pro_debugmode" value="10" <?php echo ($val_jci_pro_debugmode == 10)?"checked=checked":""; ?> /> debugmode ON (display more debug-infos)
        </td>
      </tr>
      <tr valign="top"><td colspan="2">
    <input type="hidden" name="jci-pro-settings-submit" value="savesettings" />
    <input type="submit" name="Submit"  class="button-primary" value="Update Settings" />
        </td></tr>
<?php
  break;
  case 'header' :
?>
       <tr valign="top">
        <td colspan="2">
           <h1>Retrieve JSON-data from API: Add data to header</h1>
           <b>Add OAuth-Key (leave blank if API works without it):</b><br>Authorization: Bearer &lt;xxxxx-xxx-xxx-xxxx-xxxxxx&gt;<br>
          If "Basic TOKEN" is required, use "Basic TOKEN" (Bearer will not used in this case)
           <br>
           <?php
              $val_jci_pro_allow_oauth_code = get_option('jci_pro_allow_oauth_code');
           ?>
           <input type="text" name="jci_pro_allow_oauth_code" placeholder="OAuth Bearerkey: xxxxx-xxx-xxx-xxxx-xxxxxx" value="<?php echo $val_jci_pro_allow_oauth_code; ?>" size="100">
           <hr>
           <b>Add Useragent (leave blank if API works without it):</b>
           <br>
           Useragent: When surfing via Browser the Browser adds his Browser-Signature (=Useragent, e.g. "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0"), so requests can handled Browser specific.
           <br>
           <?php
              $val_jci_pro_http_header_useragent = get_option('jci_pro_http_header_useragent');
           ?>
           <input type="text" name="jci_pro_http_header_useragent" placeholder="Example: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0" value="<?php echo $val_jci_pro_http_header_useragent; ?>" size="100">
           <hr>
           <b>Accept-Header: Some API-server need to know what kind of request should be done (leave blank if API works without it):</b>
           <br>E.g. setting it to "application/json" the server answers with JSON. Or "application/xml" gives XML-data.
           <br>
           <?php
              $val_jci_pro_http_header_accept = get_option('jci_pro_http_header_accept');
           ?>
           <input type="text" name="jci_pro_http_header_accept" placeholder="JSON: application/json" value="<?php echo $val_jci_pro_http_header_accept; ?>" size="100">

           <hr>
           <b>HTTP-Body: Some API-server, esp. with POST-requests, require some input in the HTTP-body which follows the HTTP-header.</b>
           <br> E.g. some authentication-data. This is the place to set a HTTP-body for all Plugin-Requests.
	   <br>Overwritten by Shortcode-Parameter "postbody".
           <br>
           <?php
              $val_jci_pro_http_body = get_option_and_prepare_for_form('jci_pro_http_body');
           ?>
           <input type="text" name="jci_pro_http_body" placeholder="Whatever the API expects, e.g. some JSON" value="<?php echo $val_jci_pro_http_body; ?>" size="100">




        </td>
      </tr>
      <tr valign="top"><td colspan="2">
    <input type="hidden" name="jci-pro-settings-submit" value="savesettings" />
    <input type="submit" name="Submit"  class="button-primary" value="Update Settings" />
        </td></tr>

<?php
  break;
  case 'syntaxtwig' :
?>
        <tr>
        	<td colspan="2">
          ....
          </td>
        </tr>

<?php
  break;
  case 'syntax' :
?>
        <tr>
        	<td colspan="2">
            <h1>Template engines - Available Syntax for Wordpress-Pages and -Blogentries:</h1>
            A templateengine / parser connects the JSON-data with the template and it's placeholders.
            <br>
            This plugin provides two ways to do that:
            <br>
            <b>The first way</b> is to use the <a href="http://twig.sensiolabs.org/" target="_blank">twig-templateengine</a>: This is a very powerful way and <a href="http://twig.sensiolabs.org/doc/intro.html" target="_blank">easy to learn</a>.
            <p>
            <b>The second way</b> is to use the is the JCI-templateengine used in the <a href="https://wordpress.org/plugins/json-content-importer/" target="_blank">free version</a> plus
            <a href="https://json-content-importer.com/compare/" target="_blank">some additional features</a>.
            <p><strong>It is highly reccomended to use the twig-Templateengine, as twig is much more powerful!</strong>
            <p><strong>see some <a href="https://json-content-importer.com/support/videos-on-json-content-importer/" target="_blank">HowTo-Videos on Youtube</a></strong>
            <p>Examples for using the twig-templateengine (see <a href="http://api.json-content-importer.com/" target="_blank">more examples here</a> and <a href="http://twig.sensiolabs.org/doc/intro.html" target="_blank">the twig-manual here</a>):
    <br>
    <hr>
    [jsoncontentimporterpro url="http://..." parser=twig debugmode=10]<br>test<br>[/jsoncontentimporter]
    <hr>
    The "debugmode=10" shows you whats happening. If the JSON can't be retrieved <a href="https://json-content-importer.com/support/shortcode-jsoncontentimporterpro/" target="_blank">see here for adding authentication data</a>

         <hr>
         <b>Try this templatecode, see JSON-Code for a existing "JSONFIELD":</b><br>
        <hr>
        {% for item in _context %}  {{item.JSONFIELD}} {% endfor %}
<hr>
    
           </td>
        </tr>
<?php
  break;
  case 'examples' :
?>
       <tr valign="top">
        <td colspan="2">
           <h1>Some help:</h1>
          <a href="https://json-content-importer.com/examples/very-basic-example/" target="_blank">see www.json-content-importer.com/examples/very-basic-example/</a>

        </td>
      </tr>


<?php
  break;
  case 'shortcodeatt' :
?>
      <tr valign="top">
        <td colspan="2">
            <h1>Set some Shortcode-Attributes:</h1>
           With the <b>Shortcode-Attributes "filterresultsin" or/and "filterresultsnotin"</b> you can define parameter which <b>filter the JSON-data</b>.
           E.g. "...page/?f=3" would be made useful by "filterresultsin=f". Then the JSON-data is filtered for value "3" of field "f".
           <br><b>By default the matching of the fields value is done by a regular expression.</b> This means: "3" would match "33", "136" etc..
           If you really want "3" you have to use <b>^3$"</b> as this is the regular expression for that.
           <br>Or, you can switch the following radio-button to off, for using exact match instead of regular-expression-match:
           <br>
           <?php
            $val_jci_pro_allow_regexp = get_option('jci_pro_allow_regexp');
            if ($val_jci_pro_allow_regexp=="") {
              $val_jci_pro_allow_regexp = 2;
            }
           ?>
           <input type="radio" name="jci_pro_allow_regexp" value="1" <?php echo ($val_jci_pro_allow_regexp == 1)?"checked=checked":""; ?> /> use exact match, no regular-expression-match
           <br>
           <input type="radio" name="jci_pro_allow_regexp" value="2" <?php echo ($val_jci_pro_allow_regexp == 2)?"checked=checked":""; ?> /> use regular-expression-match, no exact match
           <hr>
           <b>Allow Shortcode-Parameter "urlparam", "pathparam", "fileext":</b>
           <br>
            The URL of the JSON-Feed is defined either by the Shortcode-Parameter "url" or by together with the Template at the Plugin-settings.
            By default the "url" is static and always the same. But sometimes it should be dynamic: When calling the page GET-parameter should be passed into the plugin for setting
            the URL.
            <p>
            E.g. a Wordpress-page like "http://...displayDomain/example.php?test=5&exa=7" should use a JSON-Feed like "http://...JSONdomain/data.json?test=5&exa=7".
            Without "urlparam" you can define the Shortcode like this: [jsoncontentimporterpro url="http://...JSONdomain/data.json"], there is no way to pass the value of "test" to the JSON-Templateengine.
            <p>
            By "urlparam" you can do this. [jsoncontentimporterpro url="http://...JSONdomain/data.json" urlparam="test#exa"] will put together the URL of the JSON-Feed out of "url" and the "#" separated parameter.
            <p>
            <b>Attention:</b><br>By using "urlparam" <b>anyone</b> can pass any value via browser to "http://...JSONdomain/...". Although the values are sanitized this is a bit of risk you should be aware of.
            You should know, how "http://...JSONdomain/..." reacts when someone evil tries to manipulate the URL!
            Hence this feature is switched off by default.
            <p><b>By switching it on you should know what you do!</b>
           <p>
           <b>"urlparam" is</b>
           <br>
           <?php
            $val_gjci_pro_allow_urlparam = get_option('jci_pro_allow_urlparam');
            if ($val_gjci_pro_allow_urlparam=="") {
              $val_gjci_pro_allow_urlparam = 1;
            }
           ?>
           <input type="radio" name="jci_pro_allow_urlparam" value="1" <?php echo ($val_gjci_pro_allow_urlparam == 1)?"checked=checked":""; ?> /> off
           <br>
           <input type="radio" name="jci_pro_allow_urlparam" value="2" <?php echo ($val_gjci_pro_allow_urlparam == 2)?"checked=checked":""; ?> /> on
           <hr>
           <b>"pathparam", "fileext":</b>
           <br>
            If the URL itself should be dynamic, the Shortcode-Parameter "pathparam" and "fileext" can be used: With that you can define what Input-GET-Value is used to put together the JSON-Feedurl.
            <br>
            E.g. Wordpress-page like "http://...displayDomain/example.php?dir1=a&dir2=b" should use a JSON-Feed like "http://...JSONdomain/a/b.php".
            Then you have to set the two Shortcode-Parameter as following:
            <br>pathparam="dir1#dir2" and fileext="php"
            <p>
            <b>Attention:</b><br>
            Whereas "fileext" is not dynamic and fixed in the Shortcode, "pathparam" is dynamic: <b>anyone</b> can pass any value via browser to "http://...JSONdomain/...".
            Although the value of "pathparam" is sanitized this adds some risk you should be aware of. You should know, how "http://...JSONdomain/..." reacts when someone evil tries to manipulate the URL!
            Hence this feature is switched off by default.
            <p><b>By switching it on you should know what you do! I exclude any liability!</b>
           <p>
           <b>"pathparam", "fileext" are</b>
           <br>
           <?php
            $val_jci_pro_allow_urldirdyn = get_option('jci_pro_allow_urldirdyn');
            if ($val_jci_pro_allow_urldirdyn=="") {
              $val_jci_pro_allow_urldirdyn = 1;
            }
           ?>
           <input type="radio" name="jci_pro_allow_urldirdyn" value="1" <?php echo ($val_jci_pro_allow_urldirdyn == 1)?"checked=checked":""; ?> /> off
           <br>
           <input type="radio" name="jci_pro_allow_urldirdyn" value="2" <?php echo ($val_jci_pro_allow_urldirdyn == 2)?"checked=checked":""; ?> /> on
           <hr>
           <b>Delimiter (JCI-templatenegine only, irrelevant for twig):</b><br>
           JSON-value manipulators like "ifNotEmptyAddLeftRight" or the "jcix-syntax for unnamed arrays" require an delimiter (e.g. {KEY:ifNotEmptyAddLeftRight:left##right##no##})<br>
           If another delimiter instead of "##" should be used (if "##" is part of left or right...), set another delimiter here and use it in the template:
           <br>
           <?php
              $val_jci_pro_delimiter = get_option('jci_pro_delimiter');
              if (empty($val_jci_pro_delimiter)) {
                $val_jci_pro_delimiter = "##";
              }
           ?>
           <input type="text" name="jci_pro_delimiter" value="<?php echo $val_jci_pro_delimiter; ?>" size="5">
        </td>
      </tr>
      <tr valign="top"><td colspan="2">
    <input type="hidden" name="jci-pro-settings-submit" value="savesettings" />
    <input type="submit" name="Submit"  class="button-primary" value="Update Settings" />
        </td></tr>

<?php
  break;
  case 'curlsettings' :
?>
           <tr valign="top">
        <td colspan="2">
           <h1>Default settings if you use the Shortcode-Attribute "method=curlget":</h1>
           <b>Set some CURL-Options here, leave empty if authentication is not needed!</b>
           <br>
           Username and Password used for <a href="http://php.net/manual/en/function.curl-setopt.php" target="_blank">CURLOPT_USERPWD</a>, separated by ":"<br>
           <?php
              $curlusernamepassword = get_option('jci_pro_curl_usernamepassword');
           ?>
           <input type="text" name="jci_pro_curl_usernamepassword" placeholder="USERNAME:PASSWORD" value="<?php echo $curlusernamepassword; ?>" size="80">
           <hr>
           HTTP authentication method(s) to use, see <a href="http://php.net/manual/en/function.curl-setopt.php" target="_blank">CURLOPT_HTTPAUTH</a><br>
            Valid strings are: CURLAUTH_BASIC, CURLAUTH_DIGEST, CURLAUTH_GSSNEGOTIATE, CURLAUTH_NTLM, CURLAUTH_ANY or CURLAUTH_ANYSAFE.
           <br>
           <?php
              $curlauthmethod = get_option('jci_pro_curl_authmethod');
           ?>
           <input type="text" name="jci_pro_curl_authmethod" placeholder="CURLAUTH_BASIC, CURLAUTH_DIGEST, CURLAUTH_GSSNEGOTIATE, CURLAUTH_NTLM, CURLAUTH_ANY or CURLAUTH_ANYSAFE" value="<?php echo $curlauthmethod; ?>" size="20">
           <hr>
           Set <a href="http://php.net/manual/en/function.curl-setopt.php" target=_blank>CURL-Options as you like:</a><br>
           Syntax: OPTIONNAME1=OPTIONVALUE1;OPTIONNAME2=OPTIONVALUE2 where "true" is 1 and "false" is 0.
           <br>
           Example: "CURLOPT_SSL_VERIFYPEER=0;CURLOPT_SSL_VERIFYHOST=0" switches off https-verification (in case of great need)
           <br>
           <?php
              $curloptionlist = get_option('jci_pro_curl_optionlist');
           ?>
           <input type="text" name="jci_pro_curl_optionlist" placeholder="OPTIONNAME1=OPTIONVALUE1;OPTIONNAME2=OPTIONVALUE2" value="<?php echo $curloptionlist; ?>" size="80">
           <hr>
           more http/curl-settings: <br>
           HTTP-Timeout: Set Shortcode-Attribute "urlgettimeout=NO_OF_SECONDS"<br>
           User-Agents: Set value at Plugin-Option Tab "HTTP: Header, Body"
        </td>
      </tr>
      <tr valign="top"><td colspan="2">
    <input type="hidden" name="jci-pro-settings-submit" value="savesettings" />
    <input type="submit" name="Submit"  class="button-primary" value="Update CURL-Settings" />
        </td></tr>
<?php
  break;
  case 'uninstall' :
?>
      <tr valign="top">
        <td colspan="2">
           <h1>Uninstall:</h1>
           <br>
           On default, not all data of this plugin is deleted:
           Only if the following checkbox is activated, also templates and the above option-data are deleted
           <br>
           <input type="checkbox" name="jci_pro_uninstall_deleteall" value="1" <?php echo (get_option('jci_pro_uninstall_deleteall') == 1)?"checked=checked":""; ?> /> delete all, incl. templates and above options
        </td>
      </tr>
      <tr valign="top"><td colspan="2">
    <input type="hidden" name="jci-pro-settings-submit" value="savesettings" />
    <input type="submit" name="Submit"  class="button-primary" value="Update Settings" />
        </td></tr>
<?php
  break;
  case 'gdpr' :
?>
      <tr valign="top">
        <td colspan="2">
           <h1>General Data Protection Regulation (GDPR):</h1>
           <br>
           The General Data Protection Regulation <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank">(EU) 2016/679</a> ("GDPR") is a regulation in EU law on data protection and privacy for all individuals within the European Union (EU) and the European Economic Area (EEA) 
           (<a href="https://en.wikipedia.org/wiki/General_Data_Protection_Regulation" target="_blank">see more on that at Wikipedia</a>).
           For this plugin this is relevant in two ways:
          <ol>
          <li>You use the plugin to get data from APIs, transform it and display it on a website: If the data contains personal data you have to check the GDPR. Then the plugin is piece of software working with that data. Add then the plugin to your <a href="https://gdpr-info.eu/art-30-gdpr/" target="_blank">GDPR-"Records of processing activities"</a>.</li>
          <li>When you install and activate the plugin with your licencekey: The licencekey is frequently validated by www.json-content-importer.com.
          As the licencekey is connected to the buyer of the plugin, this is the automatic usage of pseudonym personal data by www.json-content-importer.com. When buying the plugin the customer aggreed to that, by accepting the terms of service and purchase.
          </li>
          </ol>
           
           <br>
        </td>
      </tr>
      <tr valign="top"><td colspan="2">
    <input type="hidden" name="jci-pro-settings-submit" value="savesettings" />
    <input type="submit" name="Submit"  class="button-primary" value="Update Settings" />
        </td></tr>
<?php
break;
  case 'customposttypes' :
?>
      <tr valign="top">
        <td colspan="2">
           <h1>Custom Post Types:</h1>
           <br>
           You can create posts/pages/customtypes out of JSON-data with this plugin.
You should create this Content in a Custom Type Post-Type created for that. This has to be done before doing the real JSON-create-Page-stuff.
Here you have to define three parameters importains for the Custom PostType:
<ul>
<li>type: Singluar name of the Custom Type Page. The Plugin adds automatic "jci_" as prefix to avoid trouble with other plugins</li>
<li>ptredirect: Path for the URL of the created pages</li>
<li>ptname: Menuname in the Wordpress-Dashboard</li>
</ul>
The keys and values have to be separated by "=" and the pairs by ";". If you want to define more than one Custom Type Page separate by "##".

Example:<br>
type=mynewpagetype;ptredirect=herewego;ptname=MyCreatedPages##type=mynewpagetype1;ptredirect=herewego1;ptname=MyCreatedPages1

           <?php
              $val_jci_pro_custom_post_types = get_option('jci_pro_custom_post_types');
              $val_jci_pro_custom_post_types = stripslashes($val_jci_pro_custom_post_types);
              $val_jci_pro_custom_post_types = htmlentities($val_jci_pro_custom_post_types);
           ?>
          <input type="text" name="jci_pro_custom_post_types" value="<?php echo $val_jci_pro_custom_post_types; ?>" size="150">

        </td>
      </tr>
      <tr valign="top"><td colspan="2">
    <input type="hidden" name="jci-pro-settings-submit" value="savesettings" />
    <input type="submit" name="Submit"  class="button-primary" value="Update Settings" />
        </td></tr>
<?php
break;
  case 'check' :
?>
      <tr valign="top">
        <td colspan="2">
           <h1>Check if installation is ok:</h1>
<?php
        $phpvers = phpversion();
        echo "<b>PHP-Version:</b> Installed: $phpvers<br>";
        echo 'Twig 1.X Parser (shortcode: parser=twig) <a href="https://twig.sensiolabs.org/doc/1.x/intro.html" target="_blank">needs at least PHP 5.2.7</a>: ';
        if (version_compare('5.2.7', $phpvers)==1) {
          echo '<b><span style="color:#f00;">PHP NOT ok for using twig 1.X parser</span></b>';
        } else {
          echo '<b><span style="color:#4CC417;">PHP ok for using twig 1.X parser</span></b>';
        }
        echo '<br>Twig 2.X Parser (shortcode: parser=twig243) <a href="https://twig.sensiolabs.org/doc/2.x/intro.html" target="_blank">needs at least PHP 7.0.0</a>: ';
        if (version_compare('7.0.0', $phpvers)==1) {
          echo '<b><span style="color:#f00;">PHP NOT ok for using twig 2.X parser</span></b>';
        } else {
          echo '<b><span style="color:#4CC417;">PHP ok for using twig 2.X parser (shortcode: parser=twig243)</span></b>';
        }
        echo "<br>JCI-parser needs at least PHP 5.3.0 for using <a href=\"http://php.net/manual/de/functions.anonymous.php\" target=\"_blank\">Anonymous PHP-functions</a>: ";
        if (version_compare('5.3.0', $phpvers)==1) {
          echo '<b><span style="color:#f00;">PHP NOT ok for using JCI-parser</span></b>';
        } else {
          echo '<b><span style="color:#4CC417;">PHP ok for using JCI-parser</span></b>';
        }
        echo "<hr>";

        // check multisite BEGIN
        if (function_exists('is_multisite') && is_multisite()) {
          echo "<b>This is a wordpress multisite installation:</b><br>";
          echo "If a plugins is 'networkwide activated' it's available for all multisite websites.<br>";
          echo "If it's 'networkwide deactivated' it is not available.<br>";
          // network activation? yes: create db for each blog id
          if ($networkwide) {
            echo '<b><span style="color:#f00;">Plugin is NOT activated networkwide: Activate via "network admin dashboard &gt; plugins", please.</span></b>';
          } else {
            echo '<b><span style="color:#4CC417;">Plugin is activated networkwide.</span></b>';
          }
        }
        // check multisite END


      // check if twig is working BEGIN
      echo "<hr><b>Check twig:</b><br>";

      $twigOk = FALSE;
      if (class_exists( 'Twig_Autoloader' ) ) {
        # there is a twig from another plugin
        $foundTwigVersion = Twig_Environment::VERSION;
        echo '<b><span style="color:#f00;">Twig Version '.$foundTwigVersion.' found, but loaded from another plugin (e.g. "Timber")!</span></b><br>';
        echo "Therefore you have to use this twig which is no problem in almost any cases.<br>";
        echo "If you deactivate other plugins you can find the one who is using twig too.<br>";
        echo "The JCI-plugin uses Twig 1.24.0 (parser=twig) or 2.4.3 (parser=twig243).";
        $twigOk = TRUE;
      } else {
        if (version_compare('7.0.0', $phpvers)==-1) {
         # check twig 2.X
          $inc = WP_PLUGIN_DIR . '/jsoncontentimporterpro3/vendor/autoload.php';
          $twigOk = checkTwig("2.X", $inc, "twig243");
        }
        if (!$twigOk) {
          $inc = WP_PLUGIN_DIR . '/jsoncontentimporterpro3/Twig/Autoloader.php';
          $twigOk = checkTwig("1.X", $inc, "twig");
        }
      }
      if (!$twigOk) {
        echo "twig not working";
      }
	  
       // check if twig is working END

      // check if cache is working BEGIN
		
		echo "<hr><b>Check JSON-cacher and cachefolder (directory where JSON-feeds are stored to reduce API-requests):</b><br>";
		require_once plugin_dir_path( __FILE__ ) . '/lib/cache.php';
		$jci_Cache = new jci_Cache();

        $cacheEnabledOption = get_option('jci_pro_enable_cache');
        if ($cacheEnabledOption==1) {
          echo "Cache is active (see 'Settings')<br>";
        } else {
          echo "Cache is NOT active (see 'Settings')<br>";
        }
        $cacheFolder = $jci_Cache->getCacheFolder();
		if (is_dir($cacheFolder)) {
          # cachedir is there
          if (is_writeable($cacheFolder)) {
            echo '<span style="color:#4CC417;">cacheFolder '.$cacheFolder.' is there and writeable</span>';
          } else {
            echo '<span style="color:#f00;">cacheFolder '.$cacheFolder.' is there but NOT writeable</span>';
          }
        } else {
          # cachedir is NOT there
          echo '<span style="color:#f00;">cacheFolder '.$cacheFolder.' is NOT there</span>';
          echo "<br>don't panic: this is ok if cache was never active on this wordpress installation.";
          echo "<br>the directory is created the first time the cache is switched on and used!";
        }
		
		echo "<br>";
		if (class_exists('RecursiveDirectoryIterator')) { 
			if (is_dir($cacheFolder)) {
				$sizecachedir = $jci_Cache->get_dir_size($cacheFolder);
				echo "Total size of Cache: ".$jci_Cache->format_dir_size($sizecachedir);
				$cacheTwigCacheFolder = $cacheFolder.'/twigcache';
				if (is_dir($cacheTwigCacheFolder)) {
					$sizetwigcachedir = $jci_Cache->get_dir_size($cacheTwigCacheFolder);
					echo ", twig-Cache: ".$jci_Cache->format_dir_size($sizetwigcachedir);
				}
				$clearCacheUrl = "admin.php?page=unique_jcipro_menu_slug&tab=settings&clearcache=y";
				$wpn_cc_url = wp_nonce_url( $clearCacheUrl, 'jcipro_clearcache' );
				echo "<br><a href=\"".$wpn_cc_url."\">CLEAR CACHE</a>";
			}

		} else {
			echo "Calc of Cachefolder-Size failed due to missing PHP-Class (PHP5 or 7 required)";
		}
        echo "<hr>";

      // check if cache is working END


        echo "<hr>";

        echo "<b>Check database for template-manager:</b><br>";
        global $wpdb;
        if (function_exists('is_multisite') && is_multisite()) {
          $blogIdCurrent = $wpdb->blogid;
          echo "Wordpress-multisite installation, current blog id: ".$blogIdCurrent."<br>";
        } else {
          echo "Wordpress-singlesite installation<br>";
        }
        $table_name = $wpdb->prefix.'plugin_jci_pro_templates';
        if ($wpdb->get_var( "SHOW TABLES LIKE '{$table_name}'") == $table_name) {
          echo '<b><span style="color:#4CC417;">'.$table_name.' ok</span></b><br>';
        } else {
          echo '<b><span style="color:#f00;">'.$table_name.' MISSING</span></b><br>';
          echo 'When installing this plugin, Wordpress tries to create a table in the wordpress-database named '.$table_name.'.<br>';
          echo 'This failed at this installation, very unusual behaviour! Try this:<br>';
          echo 'Please uninstall this plugin, deactivate all other plugins and reinstall this plugin.<br>If that does not solve the problem: ';
          echo '<a href="https://json-content-importer.com/legal-contact/" target="_blank">Contact the plugin-developer</a>';
        }
        echo "<hr>";

        echo "<b>Check other plugins:</b><br>";
        echo "Some other plugins also use the twig-templateengine. This may cause problems as severals twig-libraries are arround:<br>";
        echo "In this case, wordpress might not use the twig-libraray which comes whith this plugin. But a newer or older version.<br>";
        echo "If you have problems here, report to the <a href=\"https://json-content-importer.com/legal-contact/\" target=\"_blank\">pluginauthor</a>, please.<br>Plugins to watch:<br>";
        $arr_pluginlist = get_plugins();
        if (count($arr_pluginlist)==0) {
          echo '<span style="color:#4CC417;">no other plugins installed - no such problems ;-)</span><br>';
        } else {
          $listOfProblemPlugins{"timber-library/timber.php"} = 1;
          $listOfProblemPlugins{"hello.php"} = 2;
          $listOfProblemPlugins{"akismet/akismet.php"} = 2;
          $listOfProblemPlugins{"json-content-importer/json-content-importer.php"} = 2;
          $listOfProblemPlugins{"jsoncontentimporterpro3/jsoncontentimporterpro.php"} = 3;
          $listOfProblemPlugins{"si-captcha-for-wordpress/si-captcha.php"} = 2;
          $listOfProblemPlugins{"admin-menu-editor/menu-editor.php"} = 2;
          $listOfProblemPlugins{"automatic-post-tagger/automatic-post-tagger.php"} = 2;
          $listOfProblemPlugins{"contest-gallery/index.php"} = 2;
          $listOfProblemPlugins{"email-address-encoder/email-address-encoder.php"} = 2;
          $listOfProblemPlugins{"jetpack/jetpack.php"} = 2;
          $listOfProblemPlugins{"json-content-importer-widget/json-content-importer-widget.php"} = 2;
          $listOfProblemPlugins{"jm-twitter-cards/jm-twitter-cards.php"} = 2;
          $listOfProblemPlugins{"google-sitemap-generator/sitemap.php"} = 2;
          $listOfProblemPlugins{"newyorktimes-api-jci/newyorktimes-api-jci.php"} = 2;
          $listOfProblemPlugins{"seo-image/seo-friendly-images.php"} = 2;
          $listOfProblemPlugins{"updraftplus/updraftplus.php"} = 2;
          $listOfProblemPlugins{"wordpress-popular-posts/wordpress-popular-posts.php"} = 2;
          $listOfProblemPlugins{"wordfence/wordfence.php"} = 2;
          $listOfProblemPlugins{"wp-google-analytics/wp-google-analytics.php"} = 2;
          $listOfProblemPlugins{"wp-super-cache/wp-cache.php"} = 2;
          $listOfProblemPlugins{"wordpress-seo/wp-seo.php"} = 2;
          $listOfProblemPlugins{"yet-another-related-posts-plugin/yarpp.php"} = 2;
          $listOfProblemPlugins{"insert-php/insert_php.php"} = 2;
          $listOfProblemPlugins{"syntaxhighlighter/syntaxhighlighter.php"} = 2;
          $listOfProblemPlugins{"wp-global-variable/my-global-variable.php"} = 2;
          $listOfProblemPlugins{"Classic Editor"} = 2;
          $listOfProblemPlugins{"Gutenberg"} = 2;
          $listOfProblemPlugins{"wp-file-upload/wordpress_file_upload.php"} = 2;
          $listOfProblemPlugins{"wp-memory-usage/wp-memory-usage.php"} = 2;
          $listOfProblemPlugins{"wp-crontrol/wp-crontrol.php"} = 2;
          $listOfProblemPlugins{"wp-google-maps/wpGoogleMaps.php"} = 2;
          $listOfProblemPlugins{"rest-api/plugin.php"} = 2;
          $listOfProblemPlugins{"wpseo/wpseo.php"} = 2;
          
          
          
          

          #var_Dump($arr_pluginlist);
          $foundProblemPlugins = 0;
          $show2admin = FALSE; # TRUE;
          echo "<ol>";
          foreach ($arr_pluginlist as $key => $pl) {
            if ( isset($listOfProblemPlugins{$key}) && $listOfProblemPlugins{$key}==1) {
              # problem plugins
              $foundProblemPlugins++;
              if (is_plugin_active($key)) {
                if (!$show2admin) {
                  echo '<li><span style="color:#f00;">'.$pl["Name"]." (plugin set active: this may cause problems)</span></li>";
                }
              } else {
                if (!$show2admin) {
                  echo '<li><span style="color:#f00;">'.$pl["Name"]." (plugin is set inactive, when active this may work but also may cause problems)</span></li>";
                }
              }
            } else if ( isset($listOfProblemPlugins{$key}) && $listOfProblemPlugins{$key}==2) {
              # ok plugins
                if (!$show2admin) {
                  echo '<li><span style="color:#4CC417;">'.$pl["Name"]." (plugin ok with JCI-plugin)</span></li>";
                }
            } else if ( isset($listOfProblemPlugins{$key}) && $listOfProblemPlugins{$key}==3) {
                # this is the plugin itself
            } else {
              # unknown status plugins
              if (is_plugin_active($key)) {
                if ($show2admin) {
                  echo '$listOfProblemPlugins{"'.$pl["Name"].'"} = 2;<br>';
                } else {
                  echo '<li><span style="color:f00;">'.$pl["Name"]." (active plugin, unknown status regarding this twig-problem: $key)</span></li>";
                }
              } else {
                if ($show2admin) {
                  #echo '$listOfProblemPlugins{"'.$pl["Name"].'"} = 2;<br>';
                } else {
                  echo '<li><span style="color:f00;">'.$pl["Name"]." (inactive plugin, unknown status regarding this twig-problem: $key)</span></li>";
                }
              }
            }
          }
          echo "</ol>";
          echo (count($arr_pluginlist)-1)." plugins found: $foundProblemPlugins may cause problems";
        }

?>


        </td>
      </tr>
<?php
break;
}
}
?>
    </table>
</form>
</div>
<?php
}
/* options END */

function checkTwig($twigVersion, $inc, $shortcodeForTwig) {
  if (!file_exists($inc) || !is_readable($inc)) {
    echo '<span style="color:#f00;">Twig '.$twigVersion.' not found in '.$inc.'</span><br>';
    return FALSE;
  }
  require_once $inc;
  if ($twigVersion=="1.X") {
    Twig_Autoloader::register();
  }
  $twig_loader = new Twig_Loader_Filesystem(WP_PLUGIN_DIR."/jsoncontentimporterpro3/"); # as we load the template via shortcode-param this is not needed - but I don'T know how to avoid it?

	# set twig options
  $twig_environment_settings = array(
	  'charset' => get_bloginfo('charset'),
    'autoescape' => false,
	 	'auto_reload' => true,
	);
  $twig_environment = new Twig_Environment($twig_loader, $twig_environment_settings);

  # check template-string
  echo "status twig version $twigVersion: ";

  $temp = "{{lv}} Twig-Version: {{ constant('Twig_Environment::VERSION') }} : use 'parser=".$shortcodeForTwig."' in shortcode";
  if ($twigVersion=="1.X") {
    $ts = $temp;
  } else if ($twigVersion=="2.X") {
    $ts = new Twig_Source($temp, "");
  }

  try {
    $twig_environment->parse($twig_environment->tokenize($ts));
    // the $template is valid
  } catch (Twig_Error_Syntax $e) {
    // $template contains one or more syntax errors
    echo $e->getRawMessage();
    return FALSE;
  }
  $template = $twig_environment->createTemplate($temp);
  $vals = array("lv" => "All ok - ");
  $res = $template->render($vals);
  if (preg_match("/^All ok/", $res)) {
    echo '<b><span style="color:#4CC417;">'.$res.'</span></b>';
  } else {
    echo '<b><span style="color:#f00;">NO: parsing of template failed</span></b>';
  };
  return TRUE;
}


function get_option_and_prepare_for_form($txt) {
  $txtoption = get_option($txt);
  $txtoption = preg_replace("/\"/", "&quot;", $txtoption);
  return stripslashes($txtoption);
}


/* define tabs for plugin-admin-menu BEGIN*/
function jci_pro_admin_tabs( $current = 'syntax' ) {
    $tabs = array(
          'syntax' => 'Template engines',
          #'syntaxtwig' => 'Twig-Parser',
          #'examples' => 'Examples',
          'shortcodeatt' => 'Shortcode-Attributes',
          #'shortcodeval' => 'Shortcode-Values',
          'settings' => 'Settings',
          'header' => 'HTTP: Header, Body',
          'curlsettings' => 'CURL-settings',
          'customposttypes' => 'Custom Post Types',
          'check' => 'Check Installation',
          'gdpr' => 'GDPR',
          'uninstall' => 'Uninstall',
          );
    echo '<h2 class="nav-tab-wrapper">';
    foreach( $tabs as $tab => $name ){
        $class = ( $tab == $current ) ? ' nav-tab-active' : '';
        echo "<a class='nav-tab$class' href='?page=unique_jcipro_menu_slug&tab=$tab'>$name</a>";

    }
    echo '</h2>';
}
/* define tabs for plugin-admin-menu END*/

/* save settings BEGIN*/
function jci_pro_save_check_value($val, $changefound) {
  $areThereChanges = $changefound;
  $inputValPost = trim((@$_POST[$val])); # remove spaces at begin / end
#  $inputValPost = trim(strip_tags(@$_POST[$val])); # remove tags and spaces at begin / end: not good as aa<bbb would be stored as aa
  if (!($inputValPost == get_option($val))) {
    update_option( $val, $inputValPost );
    $areThereChanges = TRUE;
  }
  return $areThereChanges;
}
/* save settings END*/


/* save settings BEGIN*/
function jci_pro_save_settings() {
  # check if call is ok
  if (!isset($_POST["jci-pro-settings-submit"]) || ($_POST["jci-pro-settings-submit"] != 'savesettings') ) {
    # invalid savecall
    return 0;
  }

  #$nonce = $_REQUEST['_wpnonce'];
  isset($_REQUEST['_wpnonce']) ? $nonce = $_REQUEST['_wpnonce'] : $nonce = NULL;

  $nonceCheck = wp_verify_nonce( $nonce, "jci-pro-set-page" );
  if (!$nonceCheck) {
    # invalid nonce, hence invalid call
    return -2;
  }

   global $pagenow;
   if ( $pagenow == 'admin.php' && $_GET['page'] == 'unique_jcipro_menu_slug' ){
      if ( isset ( $_GET['tab'] ) ) {
        $tab = $_GET['tab'];
      } else {
        $tab = 'syntax';
      }

      $areThereChanges = FALSE;
      switch ( $tab ){
      case 'header' :
        $areThereChanges = jci_pro_save_check_value("jci_pro_allow_oauth_code", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_http_header_useragent", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_http_header_accept", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_http_body", $areThereChanges);
        if ($areThereChanges) {
          return 2;
        } else {
          return 1;
        }
      break;
      case 'settings' :
        $areThereChanges = jci_pro_save_check_value("jci_pro_use_wpautop", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_order_of_shortcodeeval", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_debugmode", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_errormessage", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_json_fileload_basepath", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_enable_cache", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_enable_twigcache", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_cache_time_format", $areThereChanges);
        if (!is_numeric($_POST['jci_pro_cache_time'] )) {
          return -6;
        } else {
          $areThereChanges = jci_pro_save_check_value("jci_pro_cache_time", $areThereChanges);
        }
        if ($areThereChanges) {
          return 2;
        } else {
          return 1;
        }
      break;
      case 'curlsettings' :
        $areThereChanges = jci_pro_save_check_value("jci_pro_curl_usernamepassword", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_curl_authmethod", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_curl_optionlist", $areThereChanges);
        if ($areThereChanges) {
          return 2;
        } else {
          return 1;
        }
      break;
      case 'syntax' :
         return 1;
      break;
      case 'uninstall' :
         # no settings yet $settings['....'] = ....
        $areThereChanges = jci_pro_save_check_value("jci_pro_uninstall_deleteall", $areThereChanges);
        if ($areThereChanges) {
          return 2;
        } else {
          return 1;
        }
      break;
      case 'customposttypes' :
         # no settings yet $settings['....'] = ....
        $areThereChanges = jci_pro_save_check_value("jci_pro_custom_post_types", $areThereChanges);
        if ($areThereChanges) {
          return 2;
        } else {
          return 1;
        }
      break;
      case 'shortcodeatt' :
        $areThereChanges = jci_pro_save_check_value("jci_pro_allow_urlparam", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_allow_regexp", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_allow_urldirdyn", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_delimiter", $areThereChanges);
        $areThereChanges = jci_pro_save_check_value("jci_pro_custom_post_types", $areThereChanges);

        if ($areThereChanges) {
          return 2;
        } else {
          return 1;
        }
      break;
      }
   }
   return -3;
}
/* save settings END*/

/* templates BEGIN */
function remove_param_quotes() {
	$_GET    = stripslashes_deep($_GET);
	$_POST   = stripslashes_deep($_POST);
	$_COOKIE = stripslashes_deep($_COOKIE);
	$_REQUEST = stripslashes_deep($_REQUEST);
}

function create_jci_pro_plugin_db($networkwide) {
  handle_jci_pro_plugin_db('_activate_jci_database', $networkwide);
}
function deactivate_jci_pro_plugin_db($networkwide) {
  handle_jci_pro_plugin_db('_deactivate_jci_database', $networkwide);
}


function handle_jci_pro_plugin_db($typefunction, $networkwide) {
    global $wpdb;
    if (function_exists('is_multisite') && is_multisite()) {
        // network activation? yes: create db for each blog id
        if ($networkwide) {
          $blogIdCurrent = $wpdb->blogid;
          // retrieve blogIds
          $blogIdArr = $wpdb->get_col("SELECT blog_id FROM $wpdb->blogs");
          foreach ($blogIdArr as $blogid) {
            switch_to_blog($blogid);
            call_user_func($typefunction, $networkwide);
          }
          switch_to_blog($blogIdCurrent);
          return;
        }
    } else {
      if ( false == current_user_can( 'activate_plugins' ) ) {
        return;
      }
      call_user_func($typefunction, $networkwide);
    }
}


function _activate_jci_database() {
    global $wpdb;
    $table_name = $wpdb->prefix.'plugin_jci_pro_templates';
    _create_jci_database($table_name);
}

function _deactivate_jci_database() {
    global $wpdb;
    $table_name = $wpdb->prefix.'plugin_jci_pro_templates';
    if ($wpdb->get_var( "SHOW TABLES LIKE '{$table_name}'") != $table_name) {
      _delete_jci_database($table_name, $type);
    }
}

function _delete_jci_database() {
  global $wpdb;
	$table_name = $wpdb->prefix."plugin_jci_pro_templates";
	if ( $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" ) != $table_name )	{
		$sql = "DROP TABLE IF EXISTS {$table_name}";
		$wpdb->query($sql);
	}
}


function _create_jci_database($table_name) {
  global $wpdb;
    $charset_collate = "";
    if (!empty ($wpdb->charset)) $charset_collate = "DEFAULT CHARACTER SET {$wpdb->charset}";
    if (!empty ($wpdb->collate)) $charset_collate .= " COLLATE {$wpdb->collate}";
		$sql = "CREATE TABLE {$table_name} (
		id INTEGER(10) AUTO_INCREMENT,
		nameoftemplate TEXT CHARACTER SET utf8 NOT NULL,
		template TEXT CHARACTER SET utf8 NOT NULL,
		urloftemplate TEXT CHARACTER SET utf8,
		basenode TEXT CHARACTER SET utf8,
		method TEXT CHARACTER SET utf8,
		parser TEXT CHARACTER SET utf8,
		postpayload TEXT CHARACTER SET utf8,
		postbody TEXT CHARACTER SET utf8,
		curloptions TEXT CHARACTER SET utf8,
		cachetime TEXT CHARACTER SET utf8,
		urlgettimeout TEXT CHARACTER SET utf8,
		urlparam4twig  TEXT CHARACTER SET utf8,
		debugmode TEXT CHARACTER SET utf8,
		PRIMARY KEY  (id),
    KEY nameoftemplateindex1 (nameoftemplate(40))
     ) {$charset_collate};";

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql );
    update_option('plugin_jci_pro_templates_version','1.1');
    $nooflinesindb = $wpdb->get_var( "SELECT COUNT(*) FROM $table_name" );
  	if ( $nooflinesindb==0 )	{
      $defaultitem = "template goes here... {...}";
  	  $wpdb->insert( $table_name, array( 'template' => $defaultitem, 'nameoftemplate' => 'default' ) );
    }

}

function new_blog($blog_id, $user_id, $domain, $path, $site_id, $meta ) {
    global $wpdb;
    if (is_plugin_active_for_network('jsoncontentimporterpro3/jsoncontentimporterpro.php')) {
      $blogIdCurrent = $wpdb->blogid;
      switch_to_blog($blog_id);
      _activate_jci_database();
      switch_to_blog($blogIdCurrent);
    }
}

register_deactivation_hook( __FILE__, 'deactivate_jci_pro_plugin_db' );

if( !class_exists( 'WP_List_Table' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}

class Templates_WP_List_Table extends WP_List_Table {
  private $numRows = 0;
  private $tm_data = 0;
  public function setNumRows( $numRows ) {
    $this->numRows = $numRows;
  }
  public function setTmData( $tm_data ) {
    $this->tm_data = $tm_data;
  }

  private function column_overview_display( $column_content ) {
    $lenofitem = 20;
    if (strlen($column_content)>$lenofitem) {
      return substr( $column_content, 0, $lenofitem)."...";
    }
    return $column_content;
  }

  function column_default( $item, $column_name ) {
    if ('debugmode'==$column_name) {
      if ($item[$column_name]<=1) {
        $outval = "off";
      } else {
        $outval = "on (".$item[$column_name].")";
      }
    }
    switch( $column_name ) {
        case 'id':
		    case 'template':
            return $this->column_overview_display($item[ $column_name ]);
		    case 'nameoftemplate':
            return $item[ $column_name ];
		    case 'urloftemplate':
            return $this->column_overview_display($item[ $column_name ]);
            #return $item[ $column_name ];
		    case 'basenode':
            return $item[ $column_name ];
		    case 'method':
            return $item[ $column_name ];
		    case 'parser':
            return $item[ $column_name ];
		    case 'postpayload':
            #return $item[ $column_name ];
            return $this->column_overview_display($item[ $column_name ]);
		    case 'postbody':
            return $this->column_overview_display($item[ $column_name ]);
            #return $item[ $column_name ];
		    case 'curloptions':
            #return $item[ $column_name ];
            return $this->column_overview_display($item[ $column_name ]);
		    case 'cachetime':
            return $item[ $column_name ];
		    case 'urlgettimeout':
            return $item[ $column_name ];
		    case 'urlparam4twig':
            return $this->column_overview_display($item[ $column_name ]);
            #return $item[ $column_name ];
		    case 'debugmode':
            return $outval;
        default:
            return print_r( $item, true ) ; //show the whole array for troubleshooting
    }
  }

  function get_columns(){
    # name of the columns: if active create column
    $columns = array(
		  'id' => __( 'ID (for Shortcode)' ),
      'nameoftemplate'  => __( 'Templatename' ),
      'template'  => __( 'Templatecode' ),
      'urloftemplate'  => __( 'URL of Template' ),
      'urlparam4twig'  => __( 'URL-Param4twig' ),
      #'basenode'  => __( 'JSON basenode' ),
      'method'  => __( 'http Method' ),
      'curloptions'  => __( 'Curloptions' ),
      'parser'  => __( 'Parser' ),
      #'postpayload'  => __( 'postpayload' ),
      #'postbody'  => __( 'postbody' ),
      #'cachetime'  => __( 'cachetime' ),
      #'urlparam'  => __( 'urlparam' ),
      #'urlgettimeout'  => __( 'urlgettimeout' ),
      'debugmode'  => __( 'debugmode' ),
    );
    return $columns;
  }

  function column_id($item) {
	   $actions = array(
      'edit'      => sprintf('<a href="?page=%s&action=%s&id=%s">change</a>',$_REQUEST['page'],'edit',$item['id']),
      'delete'    => sprintf('<a href="?page=%s&action=%s&id=%s">delete</a>',$_REQUEST['page'],'delete',$item['id']),
    );
	 return sprintf('%1$s %2$s', $item["id"], $this->row_actions($actions, TRUE) );
  }

  function prepare_items() {
  	$current_page = $this->get_pagenum();
  	$this->set_pagination_args( array(
      'total_items' => $this->numRows,  // calc total number of items
      'per_page'    => 20          // set how many items to show on one page
	  ) );
	  $this->items = $this->found_data;

    $columns  = $this->get_columns();
	  $hidden   = array();
	  $sortable = array();
	  $this->_column_headers = array( $columns, $hidden, $sortable );
	  $this->items = $this->tm_data;
  }
}

function register_jci_pro_add_templates($tm_data) {
  global $wpdb;
  $errormsg = "";
  $msg = "";
  if ( isset($_POST['submit']) ) {
  	remove_param_quotes();
    $template = $_POST['template'];
    if (""==trim($template)) {
	    echo '<h1><span style="color:#f00;">Template-Code missing! Add new template:</span></h1>';
      showTemplateItem(NULL, "", "add");
      return "";
    } else {
      if (!isset($_POST['postpayload'])) { $_POST['postpayload']=''; }
      if (!isset($_POST['postbody'])) { $_POST['postbody']=''; }
      if (!isset($_POST['cachetime'])) { $_POST['cachetime']=0; }
      if (!isset($_POST['urlgettimeout'])) { $_POST['urlgettimeout']=0; }
      if (!isset($_POST['debugmode'])) { $_POST['debugmode']=0; }
      
	   $insertErrorlevel = $wpdb->insert( $wpdb->prefix. 'plugin_jci_pro_templates', 
       array( 
          'template' => $template
          , 'nameoftemplate' => $_POST['nameoftemplate']
          , 'urloftemplate' => $_POST['urloftemplate']
          , 'basenode' => $_POST['basenode']
          , 'method' => $_POST['method']
          , 'parser' => $_POST['parser']
          , 'postpayload' => $_POST['postpayload']
          , 'postbody' => $_POST['postbody']
          , 'curloptions' => $_POST['curloptions']
          , 'cachetime' => $_POST['cachetime']
          #, 'urlparam' => $_POST['urlparam']
          , 'urlgettimeout' => $_POST['urlgettimeout']
          , 'urlparam4twig' => $_POST['urlparam4twig']
          , 'debugmode' => $_POST['debugmode']
          ) 
        );
      if ($insertErrorlevel) {
        $errormsg = '<span style="color:#4CC417;">Success saving Template</span>';
      } else {
        $errormsg = '<span style="color:#f00;">Saving Template failed</span>';
      }
      $insertedid = $wpdb->insert_id;
      if (is_int($insertedid) && ($insertedid>0)) {
        $table = $wpdb->get_row( "SELECT * from " . $wpdb->prefix . "plugin_jci_pro_templates WHERE id = " . sanitize_text_field($insertedid) . "" );
      }  
  	  echo "<h1>Template $insertedid saved. Any changes needed?</h1>";
      showTemplateItem($table, $errormsg, "change");
      return "";
    }
  }
	echo "<h1>Add new template:</h1>";
  showTemplateItem(NULL, "", "add");
  return "";
}

function showTemplateItem($table, $errormsg, $type) {
?>
    <div style = "font-weight:bold;color:#4CC417;font-size:14px;padding:5px;"><?php echo $errormsg; ?></div>

    <?php 
      $tmpformurl = "";
      if (isset($table->id)) {
        $tmpformurl = "jciprotemplateslug&action=edit&id=".$table->id;
      } else { 
        $tmpformurl = "jciproaddtemplateslug";
      }   
    ?>

    <form action="admin.php?page=<?php echo $tmpformurl; ?>" method="post">
    <b>MANDATORY: Template-Text:</b> Either in <a href="https://json-content-importer.com/documentation/" target="_blank">JCI-Parser-Syntax</a> or <a href="http://twig.sensiolabs.org/documentation" target="_blank">Twig-Syntax</a><br>
    <?php
        if (isset($table->template)) {
            $table->template = htmlentities($table->template);
            $tmp = $table->template;
          } else {
            $tmp = "";
        }
     ?>
    <textarea style = "display:block;width:800px;height:500px;margin-bottom: 10px;" placeholder="Insert template-text here: either for the JCI-parser OR twig" name="template" id="template" ><?php echo $tmp; ?></textarea><br>
    <b>MANDATORY: Set a unique (!!!) template-name:</b><br>
    <input type="text" name="nameoftemplate" placeholder="set a unique (!!!) templatename..." value = "<?php isset($table->nameoftemplate) ? $tmp = $table->nameoftemplate : $tmp = ""; echo $tmp; ?>" size="20" /><br><br>
    <b>Debugmode:</b><br>
    <?php isset($table->debugmode) ? $tmp = $table->debugmode : $tmp = 1; ?>
    <input type="radio" name="debugmode" value="1" <?php echo ($tmp == 1)?"checked=checked":""; ?> /> debugmode off
    <br>
    <input type="radio" name="debugmode" value="2" <?php echo ($tmp == 2)?"checked=checked":""; ?> /> debugmode ON (display some debug-infos)
    <br>
    <input type="radio" name="debugmode" value="10" <?php echo ($tmp == 10)?"checked=checked":""; ?> /> debugmode ON (display more debug-infos)
    <hr>
    <b>URL of Template:</b> The plugin is searching the Shortcode for "url". <br>If there's no url, but an url is defined with the connected template then this is the url.  You can put twig into the URL. The variables defined at urlparam4twig are available as urlparam.VARIABLE in the twig here.
    <br>
     <?php 
        if (isset($table->urloftemplate)) {
            $tmp = $table->urloftemplate;
            $tmp = htmlspecialchars($tmp, ENT_QUOTES);
          } else {
            $tmp = "";
        }
     ?>
    <textarea style="display:block;width:800px;height:100px;margin-bottom: 10px;" placeholder="Insert URL here. Linefeeds are removed when URL is used. {{urlparam.VAR1}} is the value of the GET/POST-Variable defined by urlparam4twig" name="urloftemplate" id="urloftemplate" ><?php echo $tmp; ?></textarea>
     urlparam4twig (separated by #):
    <input type="text" name="urlparam4twig" placeholder="urlparam4twig" value = "<?php isset($table->urlparam4twig) ? $tmp = $table->urlparam4twig : $tmp = ""; echo $tmp; ?>" size="250" /><br><br>
    <b>Method of API-request (best choice in almost any case: curlget / curlpost):</b><br>
    <?php
      if ("add"==$type) {
        $method = "curlget"; 
      } else  {
        $method = "get"; 
      }
      if (isset($table->method)) { $method = $table->method; } 
    ?>
    <table border="0" width="50%">
    <tr><td>
    <input type="radio" name="method" value="curlget" <?php ($method=="curlget") ? $tmp = " checked " : $tmp = ""; echo $tmp; ?> /> <a href="https://curl.haxx.se/docs/httpscripting.html" title="default setting: together with the curloptions this should work in almost any cases" target="_blank">CURL-GET</a>
    <br><input type="radio" name="method" <?php ($method=="curlpost") ? $tmp = " checked " : $tmp = ""; echo $tmp; ?> value="curlpost" /> CURL-POST
    </td><td>
    <input type="radio" name="method" <?php ($method=="get") ? $tmp = " checked " : $tmp = ""; echo $tmp; ?>  value="get" /> <a href="https://codex.wordpress.org/Function_Reference/wp_remote_get" target="_blank">WP-GET</a>
    <br><input type="radio" name="method" <?php ($method=="post") ? $tmp = " checked " : $tmp = ""; echo $tmp; ?> value="post" /> <a href="https://codex.wordpress.org/Function_Reference/wp_remote_post" target="_blank">WP-POST</a>
    </td><td>
    <input type="radio" name="method" <?php ($method=="rawget") ? $tmp = " checked " : $tmp = ""; echo $tmp; ?> value="rawget" /> <a href="http://php.net/manual/de/function.file-get-contents.php" target="_blank">PHP-RAWGET</a>
    <br><input type="radio" name="method" <?php ($method=="rawpost") ? $tmp = " checked " : $tmp = ""; echo $tmp; ?> value="rawpost" /> <a href="http://php.net/manual/de/function.stream-context-create.php" target="_blank">PHP-RAWPOST</a>
    </td></tr></table>
    <hr><b>Curloptions:</b><br>
    <a href="https://json-content-importer.com/support/simple-example-of-wordpress-shortcode/" target="_blank">Example</a>: CURLOPT_HTTPAUTH=CURLAUTH_BASIC;CURLOPT_TIMEOUT=30;CURLOPT_HTTPHEADER=a:{{urlparam.VAR1}}##c:d;CURLOPT_POSTFIELDS=e:f##{"g":"h"}##i:j<br>
     <?php
      if (isset($table->curloptions) ){
        $tmp = $table->curloptions;
        $tmp = htmlspecialchars($tmp, ENT_QUOTES);
      } else {
        $tmp = "";
      }
     ?>
    <input type="text" name="curloptions" placeholder="CURLOPT_HTTPAUTH=CURLAUTH_BASIC;CURLOPT_TIMEOUT=30;CURLOPT_HTTPHEADER=a:b##c:d;CURLOPT_POSTFIELDS=e:f##{&quot;g&quot;:&quot;h&quot;}##i:j" value = "<?php echo $tmp; ?>" size="250" />


    <hr><b>Postpayload (can be done by curloptions CURLOPT_POSTFIELDS or direct through this field if curl is not used):</b><br>
    Add data to header: Some POST-APIs need inputdata like that. "JSON_PAYLOAD" must contain valid JSON! If "JSON_PAYLOAD" contains strings like "POSTGET_something" where something is a letter or number this is replaced by the value of the "something" GET / POST parameter. If "JSON_PAYLOAD" must contain ] or [ use #BRO# ("bracket-open") and #BRC# ("bracket-close") instead, otherwise wordpress gets confused.
    <br>
     <?php
      if (isset($table->postpayload) ){
        $tmp = $table->postpayload;
        $tmp = htmlspecialchars($tmp, ENT_QUOTES);
      } else {
        $tmp = "";
      }
     ?>   
    <input type="text" name="postpayload" placeholder="valid JSON string" value = "<?php echo $tmp; ?>" size="250" />
    <hr><b>Postbody (used only if WP-POST is the selected method!):</b><br>
    Add data to the http-body: Some POST-APIs need inputdata like that. If ] or [ is in the JSON use #BRO# ("bracket-open") and #BRC# ("bracket-close") instead, otherwise wordpress gets confused.
    <br>
     <?php
      if (isset($table->postbody) ){
        $tmp = $table->postbody;
        $tmp = htmlspecialchars($tmp, ENT_QUOTES);
      } else {
        $tmp = "";
      }
     ?>
    <input type="text" name="postbody" placeholder="valid JSON string" value = "<?php echo $tmp; ?>" size="250" />
    <hr><b>Cachetime:</b> Set the cachetime for this URL to n seconds, regardless of the settings in the plugin-option, even when caching is switched off there.
    <br>
    <input type="text" name="cachetime" placeholder="Number of seconds" value = "<?php isset($table->cachetime) ? $tmp = $table->cachetime : $tmp = ""; echo $tmp; ?>" size="20" />

    <hr><b>Timeout for URL-retrieving (if possible do not use. use "CURLOPT_TIMEOUT=..." with CURL-GET or CURL-POST):</b> Who many seconds for loading url till timeout?
    <br>
    <input type="text" name="urlgettimeout" placeholder="Number of seconds" value = "<?php isset($table->urlgettimeout) ? $tmp = $table->urlgettimeout : $tmp = ""; echo $tmp; ?>" size="20" />
 
    <hr>
    <b>Parser (twig is highly recommended!):</b> <input type="radio" name="parser" <?php 
      $tmp = "";
      if ($type=="add") {
          $tmp = " checked "; 
      } else {
        if (isset($table->parser) && ($table->parser=="twig")) {
          $tmp = " checked "; 
        }
      }
      echo $tmp; 
    ?> value="twig" />twig&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="parser" <?php 
      $tmp = "";
      if (isset($table->parser) && ($table->parser=="twig243")) {
        $tmp = " checked "; 
      }
      echo $tmp; 
    ?> value="twig243" />twig 2.4.3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="parser" <?php 
      $tmp = "";
      if ($type=="change") {
        if (isset($table->parser)) {
          if ($table->parser=="jci") {
            $tmp = " checked ";
          }
        } else {
          $tmp = " checked "; 
        }
      }
      echo $tmp; 
    ?> value="jci" />JCI (like free plugin)
    <hr>
    <b>JSON basenode (not needed with twig!):</b> If not defined in the Shortcode. Try this to display JSON-data structure: <a href="http://jsonviewer.stack.hu/" target="_blank">jsonviewer.stack.hu</a>:
    <br>
    <input type="text" name="basenode" placeholder="check JSON-data structure" value = "<?php isset($table->basenode) ? $tmp = $table->basenode : $tmp = ""; echo $tmp; ?>" size="50" /><br><br>
    <hr>  
<?PHP
    if ($type=="change") {
?>  
    <input class = 'button-primary' type = "submit" name = "update" value = "Save changed template" id = "update" />
    <a class = 'button-primary' href = "admin.php?page=jciprotemplateslug">Back to template list</a>
    <input type = "hidden" name = "update_id" value = "<?php isset($table->id) ? $tmp = $table->id : $tmp = ""; echo $tmp; ?>" />
<?PHP
    }
    if ($type=="add") {
?>  
      <input type = "hidden" name = "submit" />
      <input type = "hidden" name = "type" value = "change" />
			<input class = "button-primary" type = "submit" value = "Save new template" name = "Save new template" id = "tb_add" />
<?PHP
    }
?>  
    </form>
    <div style = "font-weight:bold;color:#4CC417;font-size:14px;padding:5px;"><?php echo $errormsg; ?></div>
<?PHP
  }





function register_jci_pro_templates($tm_data) {
  global $wpdb;
  $errormsg = "";
  $msg = "";

  if (isset($_GET['action']) && $_GET['action'] == 'delete') {
	  global $wpdb;
	  $deleteErrorLevel = $wpdb->delete( $wpdb->prefix . "plugin_jci_pro_templates", array( 'id' => $_GET['id'] ) );
    if ($deleteErrorLevel) {
      $errormsg = '<span style="color:#4CC417;">Success deleting Template</span>';
    }
  }

  if (isset($_POST['update']) && $_POST['update'] ) {
	   remove_param_quotes();
	   global $wpdb;

     $checkUniqueNameOfTemplate = $wpdb->get_results( 'SELECT COUNT(*) AS ANZ FROM ' . $wpdb->prefix . 'plugin_jci_pro_templates
              WHERE nameoftemplate=\''.$_POST['nameoftemplate'].'\' AND NOT id='.$_POST['update_id']  ); #
     if ($checkUniqueNameOfTemplate[0]->{"ANZ"}>0) {
        #this name is given at another template: do not accept it!
  	   $errormsg = '<span style="color:#f00;">Changed template NOT saved: Set a unique (!!!) template-name, please!</span>';
     } else {
       if (!isset($_POST['postpayload'])) { $_POST['postpayload']=''; }
       if (!isset($_POST['postbody'])) { $_POST['postbody']=''; }
       if (!isset($_POST['cachetime'])) { $_POST['cachetime']=0; }
       if (!isset($_POST['urlgettimeout'])) { $_POST['urlgettimeout']=0; }
       if (!isset($_POST['debugmode'])) { $_POST['debugmode']=0; }
  	   $wpdb->update(
	 	    $wpdb->prefix . "plugin_jci_pro_templates",
	 	     array( 
          'template' => $_POST['template']
           , 'nameoftemplate' => $_POST['nameoftemplate']
           , 'urloftemplate' => $_POST['urloftemplate']
           , 'basenode' => $_POST['basenode'] 
           , 'method' => $_POST['method'] 
           , 'parser' => $_POST['parser'] 
           , 'postpayload' => $_POST['postpayload'] 
           , 'postbody' => $_POST['postbody'] 
           , 'curloptions' => $_POST['curloptions'] 
           , 'cachetime' => $_POST['cachetime'] 
         #  , 'urlparam' => $_POST['urlparam'] 
           , 'urlgettimeout' => $_POST['urlgettimeout'] 
           , 'urlparam4twig' => $_POST['urlparam4twig'] 
           , 'debugmode' => $_POST['debugmode'] 
           ),
		      array( 'id' => $_POST['update_id'] )
	     );
	     $errormsg = '<span style="color:#4CC417;">Changed template saved!</span>';
    }
  }

  if (isset($_GET['action']) && $_GET['action'] == 'edit') {
    $table = $wpdb->get_row( "SELECT * from " . $wpdb->prefix . "plugin_jci_pro_templates WHERE id = " . sanitize_text_field($_GET['id']) . "" );
  ?>

    <h1>Edit template <?php echo sanitize_text_field($_GET['id']) ?>:</h1>
<?PHP
  showTemplateItem($table, $errormsg, "change");
  return "";
  }



  // pagination BEGIN
  $tb_tmp = $wpdb->get_results( 'SELECT * FROM ' . $wpdb->prefix . 'plugin_jci_pro_templates ORDER BY id DESC',  ARRAY_A);
  $numRows = $wpdb->num_rows;  # no of templates
  $notemplatesonpage = 20; # must be the same as in line1132 
  if ( isset( $_GET["paged"] ) ) {
	 $start = ( $_GET["paged"] * $notemplatesonpage ) - $notemplatesonpage;
  	#$end = $_GET["paged"] * $notemplatesonpage;
  } else {
	 $start = 0;
	 #$end = $notemplatesonpage;
  }
  // pagination END

  // get items
  #$tb_items1 = $wpdb->get_results( 'SELECT * FROM ' . $wpdb->prefix . 'plugin_jci_pro_templates ORDER BY id DESC LIMIT ' . $start . ',' . $end . '',  ARRAY_A);
  $tb_items1 = $wpdb->get_results( 'SELECT * FROM ' . $wpdb->prefix . 'plugin_jci_pro_templates ORDER BY id DESC LIMIT ' . $start . ',' . $notemplatesonpage . '',  ARRAY_A);
  function filter(&$value) {
	 $value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
  }

  array_walk_recursive($tb_items1, "filter");

  $TB_WP_List_Table_Obj = new Templates_WP_List_Table();
  $TB_WP_List_Table_Obj->setNumRows($numRows);
  $TB_WP_List_Table_Obj->setTmData($tb_items1);

  echo '<h1>JSON Content Importer Plugin: Template-Manager</h1><div class="wrap">';
  $TB_WP_List_Table_Obj->prepare_items();
  $TB_WP_List_Table_Obj->display();
  echo '</div>';
}
/* templates END */


/* EDD BEGIN */
function edd_jcipro_license_page() {
	$license 	= get_option( 'edd_jcipro_license_key' );
	$status 	= get_option( 'edd_jcipro_license_status' );
	?>
	<div class="wrap">
		<h2>JCI pro Plugin License Options:</h2>
		<form method="post" action="options.php">

			<?php settings_fields('edd_jcipro_license'); ?>

			<table class="form-table">
				<tbody>
					<tr valign="top">
						<th scope="row" valign="top">
							<?php _e('License Key'); ?>
						</th>
						<td>
							<input id="edd_jcipro_license_key" name="edd_jcipro_license_key" type="text" class="regular-text" value="<?php esc_attr_e( $license ); ?>" />
							<label class="description" for="edd_jcipro_license_key"><?php _e('Enter your license key'); ?></label>
						</td>
					</tr>
					<?php if( false !== $license ) { ?>
						<tr valign="top">
							<th scope="row" valign="top">
								<?php _e('Activate License'); ?>
							</th>
							<td>
								<?php if( $status !== false && $status == 'valid' ) { ?>
									<span style="color:green;"><?php _e('active'); ?></span>
									<?php wp_nonce_field( 'edd_jcipro_nonce', 'edd_jcipro_nonce' ); ?>
									<input type="submit" class="button-secondary" name="edd_license_deactivate" value="<?php _e('Deactivate License'); ?>"/>
								<?php } else {
									wp_nonce_field( 'edd_jcipro_nonce', 'edd_jcipro_nonce' ); ?>
									<input type="submit" class="button-secondary" name="edd_license_activate" value="<?php _e('Activate License'); ?>"/>
								<?php } ?>
							</td>
						</tr>

						<tr valign="top">
							<th scope="row" valign="top">
								<?php _e('License Check'); ?>
							</th>
							<td>
               <?php
               $license_lc = trim(get_option('edd_jcipro_license_lc')); # time of last licence check
	             $license_lv = trim(get_option('edd_jcipro_license_lv')); #
	             $license_errormsg = trim(get_option('edd_jcipro_license_errormsg')); #
	             $license_errormsgacdeac = trim(get_option('edd_jcipro_license_errormsgacdeac')); #
	             $license_lifetime = trim(get_option('edd_jcipro_license_lifetime')); #

				if($license_lc>0) {
					echo "Last licence check: ".date("d.m.Y, H:i", $license_lc);
					echo "<br>Result of last licence check: ";
					if ($license_lv==-1) {
						echo "ok";
						if ($license_lifetime!=-1) {
							echo "<br>Licence valid until: ".$license_lifetime;
						}
					} else {
						echo "NOT ok";
					}
					if ($license_errormsg!="") {
						echo "<br>Licencing-Errormessage: ".$license_errormsg;
					}
					if ($license_errormsgacdeac!="") {
						echo "<br>Licence active / deactive: ".$license_errormsgacdeac;
					}
				} else {
					echo "No licence check up to now. This will be done with the next usage of the Plugin.";
				}
               ?>
							</td>
						</tr>
						<tr valign="top">
							<td colspan="2">
If you get a "Are you sure?"-page when trying to activate the plugin:
<br>Deactivate all other plugins and try it again. Then reactivate the other plugins.
<hr>
          <h1>License of this Plugin:</h1>
<pre>
Copyright (c) 2016, Bernhard Kux, Munich, Germany
All rights reserved.
Redistribution and use in source and binary forms, with or without modification, is NOT PERMITTED.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Additional BSD 3-Clause License licencing notes regarding the Twig-Software integrated in this Plugin (many thanks to the Twig-Developement team):
Licencing notes see http://twig.sensiolabs.org/license and here:
--begin of Twig-Licencing notes--
Copyright (c) 2009-2014 by the Twig Team, see AUTHORS for more details.
Some rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. The names of the contributors may not be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS
BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
--end of Twig-Licencing notes--
</pre>
							</td>
						</tr>
					<?php } ?>
				</tbody>
			</table>
			<?php submit_button(); ?>

		</form>
	<?php
}

function edd_jcipro_register_option() {
	// creates our settings in the options table
	register_setting('edd_jcipro_license', 'edd_jcipro_license_key', 'edd_jcipro_sanitize_license' );
}
add_action('admin_init', 'edd_jcipro_register_option');

function edd_jcipro_sanitize_license( $new ) {
	$old = get_option( 'edd_jcipro_license_key' );
	if( $old && $old != $new ) {
		delete_option( 'edd_jcipro_license_status' ); // new license has been entered, so must reactivate

    update_option('edd_jcipro_license_lifetime', -1);
    update_option('edd_jcipro_license_lc', -1);
    update_option('edd_jcipro_license_lv', '');
    update_option('edd_jcipro_license_errormsg', '');
    update_option('edd_jcipro_license_errormsgacdeac', '');
	}
	return $new;
}

function edd_license_erroradd($errormsg) {
   update_option('edd_jcipro_license_errormsg', $errormsg);
}

function edd_license_erroradd_acdeac($errormsg) {
   update_option('edd_jcipro_license_errormsgacdeac', $errormsg);
}



/* licencing */
function edd_jcipro_activate_license() {
	// listen for our activate button to be clicked
	if( isset( $_POST['edd_license_activate'] ) ) {
    edd_license_erroradd_acdeac('');
    edd_license_erroradd('');
		// run a quick security check
	 	if( ! check_admin_referer( 'edd_jcipro_nonce', 'edd_jcipro_nonce' ) ) {
      edd_license_erroradd_acdeac("nonce failed trying to activate license");
			return FALSE; // get out if we didn't click the Activate button
   }

		// retrieve the license from the database
		$license = trim( get_option( 'edd_jcipro_license_key' ) );

		// data to send in our API request
		$api_params = array(
			'edd_action'=> 'activate_license',
			'license' 	=> $license,
			'item_name' => urlencode( EDD_JCIPRO_ITEM_NAME ), // the name of our product in EDD
			'url'       => home_url()
		);


		// Call the custom API.
		$response = wp_remote_post( EDD_JCIPRO_STORE_URL, array( 'timeout' => 15, 'sslverify' => false, 'body' => $api_params ) );

		// make sure the response came back okay
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) { #340
			if ( is_wp_error( $response ) ) {
				$message = $response->get_error_message();
			} else {
				$message = __( 'Licencing-server: Failed trying to activate license' );
			}
      edd_license_erroradd_acdeac($message);
			return FALSE;
    }

		// decode the license data
   $license_data = json_decode( wp_remote_retrieve_body( $response ) );
   if ( false === $license_data->success ) {
				switch( $license_data->error ) {
					case 'expired' :
						$message = sprintf(
							__( 'Your license key expired on %s.' ),
							date_i18n( get_option( 'date_format' ), strtotime( $license_data->expires, current_time( 'timestamp' ) ) )
						);
						break;

					case 'revoked' :
						$message = __( 'Your license key has been disabled.' );
						break;

					case 'missing' :
						$message = __( 'Invalid license.' );
						break;

					case 'invalid' :
					#case 'site_inactive' :
						$message = __( 'Your license is not active for this URL.' );
						break;

					case 'item_name_mismatch' :
						$message = sprintf( __( 'This appears to be an invalid license key for %s.' ), EDD_SAMPLE_ITEM_NAME );
						break;

					case 'site_inactive' :
					case 'no_activations_left':
            $no_license_limit = $license_data->license_limit;
            $no_site_count = $license_data->site_count;
            $no_activations_left = $license_data->activations_left;
            if ($no_activations_left==0) {
              if ($no_license_limit==1) {
                return "Your licencekey is ok. But: You activated this licencekey already for another Domain. Domain means the fully qualified domain name, e.g. www.xy.com and test.xy.com are different. First deactivate this licence and then activate it here, please. You can do this here: <a href=https://json-content-importer.com/your-downloads/ target=_blank>https://json-content-importer.com/your-downloads/</a>";
              } else {
                return "Your licencekey is ok. But: You activated all of your $no_license_limit licencekeys for other Domains. Domain means the fully qualified domain name, e.g. www.xy.com and test.xy.com are different. First deactivate one of these licences and then activate it here, please.You can do this here: <a href=https://json-content-importer.com/your-downloads/ target=_blank>https://json-content-importer.com/your-downloads/</a>";
              }
            }
            return "Your site licence is inactive: Check your licencekey, please.";
						#$message = __( 'Your license key has reached its activation limit.' );
						break;

					default :
						$message = __( 'An error occurred, please try again.' );
						break;
				}
        edd_license_erroradd_acdeac($message);
   }


    #340begin
    #if (!isset($license_data->error)) {
    #  $license_data->error = "";
    #}
    #340end
		// $license_data->license will be either "valid" or "invalid"
		update_option( 'edd_jcipro_license_status', $license_data->license );

    if ($license_data->license=="valid") {
  		update_option( 'edd_jcipro_license_lifetime', $license_data->expires );
	  /* #340begin
    } else if(
        $license_data->license == 'site_inactive' ||
        $license_data->error == 'no_activations_left'
    ) {
      $no_license_limit = $license_data->license_limit;
      $no_site_count = $license_data->site_count;
      $no_activations_left = $license_data->activations_left;
      if ($no_activations_left==0) {
        if ($no_license_limit==1) {
          return "Your licencekey is ok. But: You activated this licencekey already for another Domain. Domain means the fully qualified domain name, e.g. www.xy.com and test.xy.com are different. First deactivate this licence and then activate it here, please. You can do this here: <a href=https://json-content-importer.com/your-downloads/ target=_blank>https://json-content-importer.com/your-downloads/</a>";
        } else {
          return "Your licencekey is ok. But: You activated all of your $no_license_limit licencekeys for other Domains. Domain means the fully qualified domain name, e.g. www.xy.com and test.xy.com are different. First deactivate one of these licences and then activate it here, please.You can do this here: <a href=https://json-content-importer.com/your-downloads/ target=_blank>https://json-content-importer.com/your-downloads/</a>";
        }
      }
      return "Your site licence is inactive: Check your licencekey, please.";
      #340end */
    } else {
  		update_option( 'edd_jcipro_license_lifetime', -1 );
      edd_license_erroradd_acdeac("Licencing-Server: Invalid licence");
    }

	}
}

 add_action('admin_init', 'edd_jcipro_activate_license');



function edd_jcipro_check_license_showdebug($debugmsg) {
  echo "<i>DEBUG: ".$debugmsg."</i><br>";
}

function edd_jcipro_check_license($inp="") {
  $lviewer = "";
  if (isset($_GET["lv"])) {
    $lviewer = sanitize_text_field($_GET["lv"]);
  }
  $showldata = FALSE;
  if ($lviewer=="354dvjvh") {
    $showldata = TRUE;
  }

  if ($inp=="admininit") {
    $showldata = FALSE;
  } else {
    $val_jci_pro_debugmode = get_option('jci_pro_debugmode');
    if ($val_jci_pro_debugmode>1) {
      $showldata = TRUE;
    } else {
      $showldata = FALSE;
    }
  }
  #if ($inp=="") {
	 $license_lc = trim(get_option('edd_jcipro_license_lc')); # time of last licence check
	 $license_lv = trim(get_option('edd_jcipro_license_lv')); # status of last licence check
	 $license_lifetime = trim(get_option('edd_jcipro_license_lifetime'));
   $timesincelastcheck = time()-$license_lc;
   if ($license_lv==-1 && ($timesincelastcheck<86400)) {
    if ($showldata) {
      edd_jcipro_check_license_showdebug("valid licence cached");
    }
    return -1;
   } else {
    if ($showldata) {
      edd_jcipro_check_license_showdebug("NO valid licence cached");
    }
   }
   update_option('edd_jcipro_license_lc', time());
   update_option('edd_jcipro_license_lv', "precheck");
  #}
  if ($showldata) {
    edd_jcipro_check_license_showdebug("start check of licence");
  }
	$license = trim( get_option( 'edd_jcipro_license_key' ) );

	$api_params = array(
		'edd_action' => 'check_license',
		'license' => $license,
		'item_name' => urlencode( EDD_JCIPRO_ITEM_NAME ),
		'url'       => home_url()
	);
  if ($showldata) {
    edd_jcipro_check_license_showdebug("do licencecheck: ".substr($license,0,4)."...");
  }

	// Call the custom API.
	$response = wp_remote_post( EDD_JCIPRO_STORE_URL, array( 'timeout' => 15, 'sslverify' => false, 'body' => $api_params ) );
	if ( is_wp_error( $response ) ) {
    update_option('edd_jcipro_license_lc', time());
    update_option('edd_jcipro_license_lv', -1);
    if ($showldata) {
      edd_jcipro_check_license_showdebug("pass licencecheck");
    }
		return -1; # if licencing server is down: pass
  }

	$license_data = json_decode( wp_remote_retrieve_body( $response ) );
	if( $license_data->license == 'valid' ) {
		// this license is still valid: do nothing besides caching update
    update_option('edd_jcipro_license_lc', time());
    update_option('edd_jcipro_license_lv', -1);
    if ($showldata) {
      edd_jcipro_check_license_showdebug("valid licence found");
    }
    return -1;
	} else if (
    $license_data->license == 'site_inactive' ||
    $license_data->error == 'no_activations_left'
  ) {
    $no_license_limit = $license_data->license_limit;
    $no_site_count = $license_data->site_count;
    $no_activations_left = $license_data->activations_left;
    if ($no_activations_left==0) {
        if ($no_license_limit==1) {
          $retval = "Your licencekey is ok. But: You activated this licencekey (valid for 1 domain) already for another Domain. First deactivate this licence and then activate it here, please.";
        } else {
          $retval = "Your licencekey is ok. But: You activated this licencekey (valid for $no_license_limit domains) already for another Domain. First deactivate this licence and then activate it here, please.";
        }
        update_option('edd_jcipro_license_lv', $retval);
        edd_license_erroradd($retval);
        return $retval;
    }
	};
  $plugin_buy = '<a href="https://json-content-importer.com">buy Plugin</a>';
  $contact_developer = '<a href="https://json-content-importer.com" target="_blank">contact developer</a>';
  $retval = "unknown error - $contact_developer";
  if( $license_data->license == 'site_inactive' ) {
    $retval = "Licence of Plugin JSON Content Importer Pro not activated: Press 'Activate Licence' ";
	} else if( $license_data->license == 'inactive' ) {
    $retval = "Licence of Plugin JSON Content Importer Pro inactive: $contact_developer";
	} else if( $license_data->license == 'invalid' ) {
    $retval = "Invalid licencekey: Check your licencekey please.<br>$contact_developer or $plugin_buy";
	} else {
    $retval = "Problems with Licence of Plugin JSON Content Importer Pro (".$license_data->license.")<br>$contact_developer or $plugin_buy";
	}
  update_option('edd_jcipro_license_status', $license_data->license );
  update_option('edd_jcipro_license_lc', time());
  update_option('edd_jcipro_license_lv', $retval);
  edd_license_erroradd($retval);

  if ($showldata) {
    edd_jcipro_check_license_showdebug("INVALID licence found: $retval");
  }
  return $retval;
}

// deac
function edd_jcipro_deactivate_license() {

	// listen for our activate button to be clicked
	if( isset( $_POST['edd_license_deactivate'] ) ) {
    edd_license_erroradd_acdeac('');
    edd_license_erroradd('');
		// run a quick security check
   	if( ! check_admin_referer( 'edd_jcipro_nonce', 'edd_jcipro_nonce' ) ) {
      edd_license_erroradd_acdeac("nonce failed trying to DEactivate license: Maybe deactivating other plugins helps.");
			return FALSE; // get out if we didn't click the Activate button
    }

		// retrieve the license from the database
		$license = trim( get_option( 'edd_jcipro_license_key' ) );

		// data to send in our API request
		$api_params = array(
			'edd_action'=> 'deactivate_license',
			'license' 	=> $license,
			'item_name' => urlencode( EDD_JCIPRO_ITEM_NAME ), // the name of our product in EDD
			'url'       => home_url()
		);

		// Call the custom API.
		$response = wp_remote_post( EDD_JCIPRO_STORE_URL, array( 'timeout' => 15, 'sslverify' => false, 'body' => $api_params ) );

		// make sure the response came back okay
		#340 if ( is_wp_error( $response ) ) {
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			if ( is_wp_error( $response ) ) {
				$message = $response->get_error_message();
			}
      edd_license_erroradd_acdeac("Licencing-Server: Failed trying to DEactivate license ($message)");
			return false;
    }

		// decode the license data
		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		// $license_data->license will be either "deactivated" or "failed"
		if( $license_data->license == 'deactivated' ) {
			delete_option( 'edd_jcipro_license_status' );
  		update_option( 'edd_jcipro_license_lifetime', -1 );
    } else {
      edd_license_erroradd_acdeac("Licencing-Server: Deactivating of licence failed. ");
    }

	}
}
 add_action('admin_init', 'edd_jcipro_deactivate_license');

/* EDD END */
?>