<?php

/*
 * Plugin Name: Easy Social Share Buttons for WordPress: Multi-step Social Shares Recovery
 * Description: Free extension for Easy Social Share Buttons for WordPress which makes possible to generate share recovery with multiple URL changes. Requires Easy Social Share Buttons for WordPress 5.2 or newer
 * Page Plugin URI: http://codecanyon.net/item/easy-social-share-buttons-for-wordpress/6394476?ref=appscreo
 * Version: 1.0 
 * Author: CreoApps 
 * Author URI: http://codecanyon.net/user/appscreo/portfolio?ref=appscreo
 */

define('ESSB_MSSR_VERSION', '1.0');

add_action ( 'init', 'essb_recovery_init', 9 );

function essb_recovery_init() {
	
	if (class_exists('ESSBOptionsStructureHelper')) {
		ESSBOptionsStructureHelper::menu_item('social', 'advanced-recovery', __('Advanced Counter Recovery', 'essb'), ' ti-new-window');
		
		// recovery #1
		ESSBOptionsStructureHelper::panel_start('social', 'advanced-recovery', __('Recover my shares - Additional Change #1', 'essb'), __('Share counter recovery allows you restore back shares once you make a permalink change (including installing a SSL certificate). Share recovery will show back shares only if they are present for both versions of URL (before and after change).', 'essb'), 'fa21 fa fa-magic', array("mode" => "switch", 'switch_id' => 'counter_recover_active_add1', 'switch_on' => __('Yes', 'essb'), 'switch_off' => __('No', 'essb')));
				
		$recover_type = array(
				'unchanged'			=> __( 'Unchanged' , 'essb' ),
				'default' 			=> __( 'Plain' , 'essb' ),
				'day_and_name' 		=> __( 'Day and Name' , 'essb' ),
				'month_and_name' 	=> __( 'Month and Name' , 'essb' ),
				'numeric' 			=> __( 'Numeric' , 'essb' ),
				'post_name' 		=> __( 'Post Name' , 'essb' ),
				'custom'			=> __( 'Custom' , 'essb' )
		);
		
		ESSBOptionsStructureHelper::field_select('social', 'advanced-recovery', 'counter_recover_mode_add1', __('Previous url format', 'essb'), __('Choose how your site address is changed. If you choose custom use the field below to setup your URL structure', 'essb'), $recover_type);
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_custom_add1', __('Custom Permalink Format', 'essb'), __('', 'essb'));
		
		//ESSBOptionsStructureHelper::field_switch('social', 'sharecnt', 'counter_recover_slash', __('My previous url does not have trailing slash', 'essb'), __('Activate this option if your previous url does not contain trailing slash at the end.', 'essb'), '', __('Yes', 'essb'), __('No', 'essb'));
		
		$recover_mode = array("unchanged" => "Unchanged", "http2https" => "Switch from http to https", "https2http" => "Switch from https to http");
		ESSBOptionsStructureHelper::field_select('social', 'advanced-recovery', 'counter_recover_protocol_add1', __('Change of connection protocol', 'essb'), __('If you change your connection protocol then choose here the option that describes it.', 'essb'), $recover_mode);
		
		$recover_domain = array(
				'unchanged'			=> __( 'Unchanged' , 'essb' ),
				'www'				=> __( 'www' , 'essb' ),
				'nonwww'			=> __( 'non-www' , 'essb' ));
		ESSBOptionsStructureHelper::field_select('social', 'advanced-recovery', 'counter_recover_prefixdomain_add1', __('Previous Domain Prefix', 'essb'), __('If you make a change of your domain prefix than you need to describe it here.', 'essb'), $recover_domain);
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_subdomain_add1', __('Subdomain', 'essb'), __('If you move your site to a subdomain enter here its name (without previx and extra symbols', 'essb'));
		
		ESSBOptionsStructureHelper::hint('social', 'advanced-recovery', __('Cross-domain recovery', 'essb'), __('If you\'ve migrated your website from one domain to another, fill in these two fields to activate cross-domain share recovery', 'essb'));
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_domain_add1', __('Previous domain name', 'essb'), __('If you have changed your domain name please fill in this field previous domain name with protocol (example http://example.com) and choose recovery mode to be <b>Change domain name</b>', 'essb'));
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_newdomain_add1', __('New domain name', 'essb'), __('If plugin is not able to detect your new domain fill here its name with protocol (example http://example.com)', 'essb'));
		ESSBOptionsStructureHelper::panel_end('social', 'advanced-recovery');
		

		// recovery #2
		ESSBOptionsStructureHelper::panel_start('social', 'advanced-recovery', __('Recover my shares - Additional Change #2', 'essb'), __('Share counter recovery allows you restore back shares once you make a permalink change (including installing a SSL certificate). Share recovery will show back shares only if they are present for both versions of URL (before and after change).', 'essb'), 'fa21 fa fa-magic', array("mode" => "switch", 'switch_id' => 'counter_recover_active_add2', 'switch_on' => __('Yes', 'essb'), 'switch_off' => __('No', 'essb')));
		
		$recover_type = array(
				'unchanged'			=> __( 'Unchanged' , 'essb' ),
				'default' 			=> __( 'Plain' , 'essb' ),
				'day_and_name' 		=> __( 'Day and Name' , 'essb' ),
				'month_and_name' 	=> __( 'Month and Name' , 'essb' ),
				'numeric' 			=> __( 'Numeric' , 'essb' ),
				'post_name' 		=> __( 'Post Name' , 'essb' ),
				'custom'			=> __( 'Custom' , 'essb' )
		);
		
		ESSBOptionsStructureHelper::field_select('social', 'advanced-recovery', 'counter_recover_mode_add2', __('Previous url format', 'essb'), __('Choose how your site address is changed. If you choose custom use the field below to setup your URL structure', 'essb'), $recover_type);
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_custom_add2', __('Custom Permalink Format', 'essb'), __('', 'essb'));
		
		//ESSBOptionsStructureHelper::field_switch('social', 'sharecnt', 'counter_recover_slash', __('My previous url does not have trailing slash', 'essb'), __('Activate this option if your previous url does not contain trailing slash at the end.', 'essb'), '', __('Yes', 'essb'), __('No', 'essb'));
		
		$recover_mode = array("unchanged" => "Unchanged", "http2https" => "Switch from http to https", "https2http" => "Switch from https to http");
		ESSBOptionsStructureHelper::field_select('social', 'advanced-recovery', 'counter_recover_protocol_add2', __('Change of connection protocol', 'essb'), __('If you change your connection protocol then choose here the option that describes it.', 'essb'), $recover_mode);
		
		$recover_domain = array(
				'unchanged'			=> __( 'Unchanged' , 'essb' ),
				'www'				=> __( 'www' , 'essb' ),
				'nonwww'			=> __( 'non-www' , 'essb' ));
		ESSBOptionsStructureHelper::field_select('social', 'advanced-recovery', 'counter_recover_prefixdomain_add2', __('Previous Domain Prefix', 'essb'), __('If you make a change of your domain prefix than you need to describe it here.', 'essb'), $recover_domain);
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_subdomain_add2', __('Subdomain', 'essb'), __('If you move your site to a subdomain enter here its name (without previx and extra symbols', 'essb'));
		
		ESSBOptionsStructureHelper::hint('social', 'advanced-recovery', __('Cross-domain recovery', 'essb'), __('If you\'ve migrated your website from one domain to another, fill in these two fields to activate cross-domain share recovery', 'essb'));
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_domain_add2', __('Previous domain name', 'essb'), __('If you have changed your domain name please fill in this field previous domain name with protocol (example http://example.com) and choose recovery mode to be <b>Change domain name</b>', 'essb'));
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_newdomain_add2', __('New domain name', 'essb'), __('If plugin is not able to detect your new domain fill here its name with protocol (example http://example.com)', 'essb'));
		ESSBOptionsStructureHelper::panel_end('social', 'advanced-recovery');
		
		// recovery #3
		ESSBOptionsStructureHelper::panel_start('social', 'advanced-recovery', __('Recover my shares - Additional Change #3', 'essb'), __('Share counter recovery allows you restore back shares once you make a permalink change (including installing a SSL certificate). Share recovery will show back shares only if they are present for both versions of URL (before and after change).', 'essb'), 'fa21 fa fa-magic', array("mode" => "switch", 'switch_id' => 'counter_recover_active_add3', 'switch_on' => __('Yes', 'essb'), 'switch_off' => __('No', 'essb')));
		
		$recover_type = array(
				'unchanged'			=> __( 'Unchanged' , 'essb' ),
				'default' 			=> __( 'Plain' , 'essb' ),
				'day_and_name' 		=> __( 'Day and Name' , 'essb' ),
				'month_and_name' 	=> __( 'Month and Name' , 'essb' ),
				'numeric' 			=> __( 'Numeric' , 'essb' ),
				'post_name' 		=> __( 'Post Name' , 'essb' ),
				'custom'			=> __( 'Custom' , 'essb' )
		);
		
		ESSBOptionsStructureHelper::field_select('social', 'advanced-recovery', 'counter_recover_mode_add3', __('Previous url format', 'essb'), __('Choose how your site address is changed. If you choose custom use the field below to setup your URL structure', 'essb'), $recover_type);
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_custom_add3', __('Custom Permalink Format', 'essb'), __('', 'essb'));
		
		//ESSBOptionsStructureHelper::field_switch('social', 'sharecnt', 'counter_recover_slash', __('My previous url does not have trailing slash', 'essb'), __('Activate this option if your previous url does not contain trailing slash at the end.', 'essb'), '', __('Yes', 'essb'), __('No', 'essb'));
		
		$recover_mode = array("unchanged" => "Unchanged", "http2https" => "Switch from http to https", "https2http" => "Switch from https to http");
		ESSBOptionsStructureHelper::field_select('social', 'advanced-recovery', 'counter_recover_protocol_add3', __('Change of connection protocol', 'essb'), __('If you change your connection protocol then choose here the option that describes it.', 'essb'), $recover_mode);
		
		$recover_domain = array(
				'unchanged'			=> __( 'Unchanged' , 'essb' ),
				'www'				=> __( 'www' , 'essb' ),
				'nonwww'			=> __( 'non-www' , 'essb' ));
		ESSBOptionsStructureHelper::field_select('social', 'advanced-recovery', 'counter_recover_prefixdomain_add3', __('Previous Domain Prefix', 'essb'), __('If you make a change of your domain prefix than you need to describe it here.', 'essb'), $recover_domain);
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_subdomain_add3', __('Subdomain', 'essb'), __('If you move your site to a subdomain enter here its name (without previx and extra symbols', 'essb'));
		
		ESSBOptionsStructureHelper::hint('social', 'advanced-recovery', __('Cross-domain recovery', 'essb'), __('If you\'ve migrated your website from one domain to another, fill in these two fields to activate cross-domain share recovery', 'essb'));
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_domain_add3', __('Previous domain name', 'essb'), __('If you have changed your domain name please fill in this field previous domain name with protocol (example http://example.com) and choose recovery mode to be <b>Change domain name</b>', 'essb'));
		ESSBOptionsStructureHelper::field_textbox_stretched('social', 'advanced-recovery', 'counter_recover_newdomain_add3', __('New domain name', 'essb'), __('If plugin is not able to detect your new domain fill here its name with protocol (example http://example.com)', 'essb'));
		ESSBOptionsStructureHelper::panel_end('social', 'advanced-recovery');
	}
	
}

/**
 * Generate list of advanced URLs for recovery
 * 
 * @param unknown_type $past_url
 * @param unknown_type $post_id
 * @return multitype:NULL Ambigous <unknown, mixed>
 */
function essb_advnaced_recovery_url_list($past_url, $post_id) {
	$url_list = array();
	
	if (function_exists('essb_option_value')) {
		if (essb_option_bool_value('counter_recover_active_add1')) {
			$url_list[] = essb_recovery_get_alt_permalink_advanced($past_url, $post_id, 'add1');
		}

		if (essb_option_bool_value('counter_recover_active_add2')) {
			$url_list[] = essb_recovery_get_alt_permalink_advanced($past_url, $post_id, 'add2');
		}
		
		if (essb_option_bool_value('counter_recover_active_add3')) {
			$url_list[] = essb_recovery_get_alt_permalink_advanced($past_url, $post_id, 'add3');
		}		
	}
	
	return $url_list;
}

function essb_recovery_get_alt_permalink_advanced($past_url, $post_id, $advanced_key) {
	$rewritecode = array ('%year%', '%monthnum%', '%day%', '%hour%', '%minute%', '%second%', '%postname%', '%post_id%', '%category%', '%author%', '%pagename%' );

	$post = get_post ( $post_id );
	$leavename = false;

	$structure = essb_option_value ( 'counter_recover_mode_'.$advanced_key );
	$permalink = '';

	if ($structure == 'custom') {
		$permalink = essb_option_value ( 'counter_recover_custom_'.$advanced_key );
	} else if ($structure == 'unchanged') {
		$permalink = get_option ( 'permalink_structure' );
	} else if ($structure == 'default') {
		$permalink = '';
	} else if ($structure == 'day_and_name') {
		$permalink = '/%year%/%monthnum%/%day%/%postname%/';
	} else if ($structure == 'month_and_name') {
		$permalink = '/%year%/%monthnum%/%postname%/';
	} else if ($structure == 'numeric') {
		$permalink = '/archives/%post_id%';
	} else if ($structure == 'post_name') {
		$permalink = '/%postname%/';
	} else {
		$permalink = get_option ( 'permalink_structure' );
	}

	$permalink = apply_filters ( 'pre_post_link', $permalink, $post, $leavename );

	// Check if the user has defined a specific custom URL
	$custom_url = get_post_meta ( get_the_ID (), 'essb_activate_sharerecovery', true );
	if ($custom_url) {
		return $custom_url;
	}
	else {

		if ('' != $permalink && ! in_array ( $post->post_status, array ('draft', 'pending', 'auto-draft', 'future' ) )) {
			$unixtime = strtotime ( $post->post_date );
				
			$category = '';
			if (strpos ( $permalink, '%category%' ) !== false) {
				$cats = get_the_category ( $post->ID );
				if ($cats) {
					usort ( $cats, '_usort_terms_by_ID' ); // order by ID
						
					$category_object = apply_filters ( 'post_link_category', $cats [0], $cats, $post );
						
					$category_object = get_term ( $category_object, 'category' );
					$category = $category_object->slug;
					if ($parent = $category_object->parent) {
						$category = get_category_parents ( $parent, false, '/', true ) . $category;
					}
				}

				if (empty ( $category )) {
					$default_category = get_term ( get_option ( 'default_category' ), 'category' );
					$category = is_wp_error ( $default_category ) ? '' : $default_category->slug;
				}
			}
				
			$author = '';
			if (strpos ( $permalink, '%author%' ) !== false) {
				$authordata = get_userdata ( $post->post_author );
				$author = $authordata->user_nicename;
			}
				
			$date = explode ( ' ', date ( 'Y m d H i s', $unixtime ) );
			$rewritereplace = array ($date [0], $date [1], $date [2], $date [3], $date [4], $date [5], $post->post_name, $post->ID, $category, $author, $post->post_name );
				
			$permalink = home_url ( str_replace ( $rewritecode, $rewritereplace, $permalink ) );
				
			if ($structure != 'custom') {
				$permalink = user_trailingslashit ( $permalink, 'single' );
			}

		} else {
			$permalink = home_url ( '?p=' . $post->ID );
		}

		$url = apply_filters ( 'post_link', $permalink, $post, $leavename );


		if (is_front_page ()) {
			$url = get_site_url ();

		}

		if (essb_option_value('counter_recover_domain_'.$advanced_key) != '' && essb_option_value('counter_recover_newdomain_'.$advanced_key)) {
			$url = str_replace ( essb_option_value('counter_recover_newdomain_'.$advanced_key), essb_option_value('counter_recover_domain_'.$advanced_key), $url );
		}

		// Filter the Protocol
		if (essb_option_value('counter_recover_protocol_'.$advanced_key) == 'http2https' && strpos ( $url, 'https' ) !== false) {
			$url = str_replace ( 'https', 'http', $url );
		}
		else if (essb_option_value('counter_recover_protocol_'.$advanced_key) == 'https2http' && strpos ( $url, 'https' ) === false) {
			$url = str_replace ( 'http', 'https', $url );
		}

		if (essb_option_value('counter_recover_prefixdomain_'.$advanced_key) == 'unchanged') {

		}
		else if (essb_option_value('counter_recover_prefixdomain_'.$advanced_key) == 'www' && strpos ( $url, 'www' ) === false) {
			$url = str_replace ( 'http://', 'http://www.', $url );
			$url = str_replace ( 'https://', 'https://www.', $url );
		}
		else if (essb_option_value('counter_recover_prefixdomain_'.$advanced_key) == 'nonwww' && strpos ( $url, 'www' ) !== false) {
			$url = str_replace ( 'http://www.', 'http://', $url );
			$url = str_replace ( 'https://www.', 'https://', $url );
		}

		// Filter out the subdomain
		if (essb_option_value('counter_recover_subdomain_'.$advanced_key) != '') {
			$url = str_replace (essb_option_value('counter_recover_subdomain_'.$advanced_key) . '.', '', $url );

		}

		return $url;

	}

}
