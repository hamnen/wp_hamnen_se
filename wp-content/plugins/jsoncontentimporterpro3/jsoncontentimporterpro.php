<?php
/*
Plugin Name: JSON Content Importer Pro
Plugin URI: https://json-content-importer.com/
Description: PRO-Version - Plugin and widget to import, cache and display a JSON-API/-Feed. Display is done with wordpress-shortcode and a templateengine.
Version: 3.4.13
Author: Bernhard Kux
Author URI: http://www.kux.de/
*/

/* block direct requests */
if ( !function_exists( 'add_action' ) ) {
	echo 'Hello, this is a plugin: You must not call me directly.';
	exit;
}
defined('ABSPATH') OR exit;

define( 'JCIPRO_VERSION', '3.4.13' );  // current version number
define( 'EDD_JCIPRO_STORE_URL', 'https://json-content-importer.com' );
define( 'EDD_JCIPRO_ITEM_NAME', 'Download JSON Content Importer PRO' );

require_once( ABSPATH . 'wp-admin/includes/plugin.php' );

if(!class_exists('JsonContentImporterPro')){
  require_once plugin_dir_path( __FILE__ ) . '/class-json-content-importer-pro.php';
}

require_once plugin_dir_path( __FILE__ ) . '/options.php';

# do not execute the plugin when saving a page with it in the admin-area
if (!is_admin()) {
  $JsonContentImporterPro = new JsonContentImporterPro();
}

register_activation_hook( __FILE__, 'create_jci_pro_plugin_db' ); # when activating plugin: create db if needed
register_deactivation_hook( __FILE__, 'deactivate_jci_pro_plugin_db' );
add_action( 'wpmu_new_blog', 'new_blog', 10, 6); # in case a new blog is added

$val_jci_pro_use_wpautop = get_option('jci_pro_use_wpautop');
if ($val_jci_pro_use_wpautop==3) {
  remove_filter( 'the_content', 'wpautop' );
  remove_filter( 'the_excerpt', 'wpautop' );
}

/* WIDGET BEGIN */
if (PHP_VERSION_ID && (PHP_VERSION_ID < 7.2)) {
	require_once plugin_dir_path( __FILE__ ) . '/class-json-content-widget.php';
	add_filter('widget_text', 'do_shortcode');
	#add_action('widgets_init', create_function('', 'return register_widget("jci_widget_plugin");'));
	function jci_widget_plugin_func () {
		register_widget('jci_widget_plugin');
	}
	add_action ('widgets_init', 'jci_widget_plugin_func');
}
/* WIDGET END */

/* EDD BEGIN: update */
if( !class_exists( 'EDD_SL_Plugin_Updater' ) ) {
	// load our custom updater
	include( dirname( __FILE__ ) . '/EDD_SL_Plugin_Updater.php' );
}

add_action( 'admin_notices', 'jcipro_update348message' );
function jcipro_update348message() {
	$templateDBversion = get_option( 'plugin_jci_pro_templates_version' );
	if ($templateDBversion!='1.1') {
		if (jcipro_isDBok()) {
			#db ok, but flag wrong: fix flag
			update_option('plugin_jci_pro_templates_version','1.1');
		} else {
   ?>
    <div class="error notice">
        <p><?php _e( 'JSON Content Importer PRO Plugin: <b>Deactivate and then activate the plugin, please.</b><br>This will update the database of the new plugins template-manager. ('.$templateDBversion.')' ); ?></p>
    </div>
    <?php
		}
  }
}

function jcipro_isDBok() {
    global $wpdb;
	@$tmpl = @$wpdb->get_row( 'DESCRIBE ' . $wpdb->prefix . 'plugin_jci_pro_templates', OBJECT, 13 );
    if (is_null(@$tmpl)) {
		return FALSE;
	}
	if ("debugmode"===@$tmpl->Field) {
		#field 13 is debugmode: db ok
		return TRUE;
	}
	return FALSE;
}

function edd_sl_jcipro_plugin_updater() {
	$license_key = trim( get_option( 'edd_jcipro_license_key' ) );
	$edd_updater = new EDD_SL_Plugin_Updater( EDD_JCIPRO_STORE_URL, __FILE__, array(
			'version' 	=> JCIPRO_VERSION,
			'license' 	=> $license_key, 		// license key (used get_option above to retrieve from DB)
			'item_name' => EDD_JCIPRO_ITEM_NAME, 	// name of this plugin
			'author' 	=> 'Bernhard Kux',  // author of this plugin
			'beta'		=> false
		)
	);
}
add_action( 'admin_init', 'edd_sl_jcipro_plugin_updater', 0 );
/* EDD END */

$getShowIn = "";
if (isset($_GET["show"])) {
  $getShowIn = htmlentities($_GET["show"], ENT_QUOTES);
}
if ("oc"==$getShowIn) {
  add_filter("template_include", "jci_func_showOnlyContent", 11);
  function jci_func_showOnlyContent() {
     $shortcodeOnlyTemplate = dirname( __FILE__ ) . '/themes/onlythecontent/themeOnlyTheContent.php';
     return $shortcodeOnlyTemplate;
  }

  ### BEGIN workaround CDATA & Wordpress: WP converts ]]> to ]]&gt; by default in the core
  function cdata_fix($content) {
    $content = str_replace("]]&gt;", "]]>", $content);
    return $content;
  }
  function cdata_template_redirect( $content ) {
    ob_start('cdata_fix');
  }
  add_action('template_redirect','cdata_template_redirect',-1);
  ### END workarround CDATA & Wordpress , thank you https://sqlbuddy.de/wordpress-und-cdata-javascript/
}

# added 3.4.0: create and register custom post types BEGIN
$ctin = stripslashes(get_option( 'jci_pro_custom_post_types' ));
if (""!=$ctin) {
  add_action( 'init',
    function() use ( $ctin ) {
      $ctinArr0 = explode("##", $ctin);
      for ($i=0;$i<count($ctinArr0);$i++) {
        $ctinArr1 = explode(";", $ctinArr0[$i]);
        $zorb = array();
        for ($j=0;$j<count($ctinArr1);$j++) {
          $ctinArr2 = explode("=", $ctinArr1[$j]);
          if (!empty($ctinArr2[0]) && !empty($ctinArr2[1])) {
            $zorb{$ctinArr2[0]} = $ctinArr2[1];
          }
        }

      if (!empty($zorb{'type'}) && !empty($zorb{'ptname'})) {
        $zorbArr =
          array(
            'labels' => array(
              'name' => __( $zorb{'ptname'} ),
              'singular_name' => __( $zorb{'type'} )
            ),
            'supports' => array(
               'custom-fields',
                'title',
	              'editor',
	              'post-thumbnails',
	              'revisions',
            ),
            'public' => true,
            'has_archive' => true,
         
        );
        if (!empty($zorb{'ptredirect'})) {
          $zorbArr{'rewrite'} = array('slug' => $zorb{'ptredirect'});
        }
        register_post_type( $zorb{'type'}, $zorbArr);
      }
    }
  });
}
# added 3.4.0: create and register custom post types END
?>