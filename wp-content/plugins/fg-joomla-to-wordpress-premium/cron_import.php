<?php

/**
 * Automatic import executed by cron
 *
 * @link              https://www.fredericgilles.net/fg-joomla-to-wordpress/
 * @since             3.47.0
 * @package           FG_Joomla_to_WordPress
 */

ignore_user_abort(true);

if ( isset($_SERVER['REQUEST_URI']) || !empty($_POST) || defined('DOING_AJAX') || defined('DOING_CRON') ) {
	die();
}

define('DOING_CRON', true); // Tell WordPress we are doing the CRON task

$_SERVER["HTTP_USER_AGENT"] = 'PHP'; // To avoid notices from other plugins

if ( !defined('ABSPATH') ) {
	// Set up WordPress environment
	require_once( __DIR__ . '/../../../wp-load.php' );
	require_once( __DIR__ . '/../../../wp-admin/includes/admin.php' );
	run_FG_Joomla_to_WordPress_cron_import();
}

/**
 * Run the import
 */
function run_FG_Joomla_to_WordPress_cron_import() {
	global $fgj2wpp;

	$actions = array('import');
	foreach ( $actions as $action ) {
		echo "$action...\n";
		$time_start = date('Y-m-d H:i:s');
		$fgj2wpp->display_admin_notice("=== START $action $time_start ===");
		$result = $fgj2wpp->dispatch($action);
		if ( !empty($result) ) {
			echo $result; // Display the result
		}
		$time_end = date('Y-m-d H:i:s');
		$fgj2wpp->display_admin_notice("=== END $action $time_end ===\n");
	}
	echo "IMPORT COMPLETED\n";
}
