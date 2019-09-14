<?php
/**
 * Plugin Name: FG Joomla to WordPress Premium Simple Image Gallery module
 * Depends:		FG Joomla to WordPress Premium
 * Plugin Uri:  https://www.fredericgilles.net/fg-joomla-to-wordpress/
 * Description: A plugin to migrate Simple Image Gallery galleries as WordPress galleries
 * 				Needs the plugin «FG Joomla to WordPress Premium» to work
 * Version:     2.7.0
 * Author:      Frédéric GILLES
 */

// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

add_action( 'admin_init', 'fgj2wp_simpleimagegallery_test_requirements' );

if ( !function_exists( 'fgj2wp_simpleimagegallery_test_requirements' ) ) {
	function fgj2wp_simpleimagegallery_test_requirements() {
		new fgj2wp_simpleimagegallery_requirements();
	}
}

if ( !class_exists('fgj2wp_simpleimagegallery_requirements', false) ) {
	class fgj2wp_simpleimagegallery_requirements {
		private $parent_plugin = 'fg-joomla-to-wordpress-premium/fg-joomla-to-wordpress-premium.php';
		private $required_premium_version = '3.36.0';

		public function __construct() {
			load_plugin_textdomain( 'fgj2wp_simpleimagegallery', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
			if ( !is_plugin_active($this->parent_plugin) ) {
				add_action( 'admin_notices', array($this, 'error') );
			} else {
				$plugin_data = get_plugin_data(WP_PLUGIN_DIR . '/' . $this->parent_plugin);
				if ( !$plugin_data or version_compare($plugin_data['Version'], $this->required_premium_version, '<') ) {
					add_action( 'admin_notices', array($this, 'version_error') );
				}
			}
		}
		
		/**
		 * Print an error message if the Premium plugin is not activated
		 */
		function error() {
			echo '<div class="error"><p>[fgj2wp_simpleimagegallery] '.__('The Simple Image Gallery module needs the «FG Joomla to WordPress Premium» plugin to work. Please install and activate <strong>FG Joomla to WordPress Premium</strong>.', 'fgj2wp_simpleimagegallery').'<br /><a href="https://www.fredericgilles.net/fg-joomla-to-wordpress/" target="_blank">https://www.fredericgilles.net/fg-joomla-to-wordpress/</a></p></div>';
		}
		
		/**
		 * Print an error message if the Premium plugin is not at the required version
		 */
		function version_error() {
			printf('<div class="error"><p>[fgj2wp_simpleimagegallery] '.__('The Simple Image Gallery module needs at least the <strong>version %s</strong> of the «FG Joomla to WordPress Premium» plugin to work. Please install and activate <strong>FG Joomla to WordPress Premium</strong> at least the <strong>version %s</strong>.', 'fgj2wp_simpleimagegallery').'<br /><a href="https://www.fredericgilles.net/fg-joomla-to-wordpress/" target="_blank">https://www.fredericgilles.net/fg-joomla-to-wordpress/</a></p></div>', $this->required_premium_version, $this->required_premium_version);
		}
	}
}

if ( !defined('WP_LOAD_IMPORTERS') && !defined('DOING_AJAX') ) return;

if ( !defined('FGJ2WPP_USE_FTP') ) {
	define('FGJ2WPP_USE_FTP', 1); // Use the FTP connection
}

add_action( 'plugins_loaded', 'fgj2wp_simpleimagegallery_load', 25 );

if ( !function_exists( 'fgj2wp_simpleimagegallery_load' ) ) {
	function fgj2wp_simpleimagegallery_load() {
		if ( !defined('FGJ2WPP_LOADED') ) return;

		load_plugin_textdomain( 'fgj2wp_simpleimagegallery', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		
		global $fgj2wpp;
		new fgj2wp_simpleimagegallery($fgj2wpp);
	}
}

if ( !class_exists('fgj2wp_simpleimagegallery', false) ) {
	class fgj2wp_simpleimagegallery {
		
		protected $imported_images = array();
		private $plugin_ftp;
		private $is_connected = false;
		private $upload_dir;
		private $upload_url;
		private $galleries_directory = '';
		
		/**
		 * Sets up the plugin
		 *
		 */
		public function __construct($plugin) {
			
			$this->plugin = $plugin;
			
			add_filter( 'fgj2wp_pre_display_admin_page', array ($this, 'process_admin_page'), 11, 1 );
			add_action( 'fgj2wp_pre_import_posts', array ($this, 'ftp_login') );
			add_action( 'fgj2wp_pre_import_posts', array ($this, 'guess_galleries_directory') );
			add_filter( 'fgj2wp_pre_insert_post', array ($this, 'process_galleries'), 10, 2 );
		}
		
		/**
		 * FTP login
		 *
		 */
		public function ftp_login() {
			$this->plugin_ftp = new FG_Joomla_to_WordPress_FTP($this->plugin);
			$this->is_connected = $this->plugin_ftp->login();
		}
		
		/**
		 * Try to determine the gallery folder
		 * 
		 * @since 2.6.0
		 */
		public function guess_galleries_directory() {
			$params = $this->plugin->get_params('jw_sig');
			if ( isset($params['galleries_rootfolder']) ) {
				// Simple Images Gallery
				$this->galleries_directory = $params['galleries_rootfolder'];
			} else {
				// Simple Images Gallery Plus
				$params = $this->plugin->get_params('sigplus');
				if ( isset($params['base_folder']) ) {
					$this->galleries_directory = $params['base_folder'];
				}
			}
		}
		
		/**
		 * Import the Simple Image galleries
		 * 
		 * @param array $new_post WordPress post
		 * @param array $post Joomla article
		 */
		public function process_galleries($new_post, $post) {
			if ( $this->is_connected ) {
				$this->post_date = $post['date'];

				// Determine the upload dir
				$img_dir = strftime('%Y/%m', strtotime($post['date']));
				$uploads = wp_upload_dir($img_dir);
				$this->upload_dir = $uploads['path'];
				$this->upload_url = $uploads['url'];

				$content = $new_post['post_content'];
				$content = preg_replace_callback('#\{(gallery|vsig).*?\}(.*?)\{/\1\}#', array($this, 'replace_gallery_shortcode'), $content);
				$content = preg_replace_callback('#\{(artsexylightbox) path=\\\*"(.*?)\\\*".*?\}\{/\1\}#', array($this, 'replace_gallery_shortcode'), $content);
				$new_post['post_content'] = $content;
			}
			return $new_post;
		}
		
		/**
		 * Replace the Simple Image Gallery shortcode by the WordPress gallery shortcode and import the media gallery
		 * 
		 * @param array $matches Result of the preg_match
		 * @return string Replacement
		 */
		private function replace_gallery_shortcode($matches) {
			$shortcode = '';
			$gallery_shortcode = $matches[1];
			if ( $gallery_shortcode == 'artsexylightbox' ) {
				$images_dirs = array('');
			} elseif ( !empty($this->galleries_directory) ) {
				$images_dirs = array($this->galleries_directory);
			} else {
				// Try the most common galleries directories
				$images_dirs = array('images/galleries/', 'images/stories/galleries/', 'images/stories/', 'images/');
			}
			$directory = $matches[2];
			$directory = preg_replace('/:.*/', '', $directory);
			// Get the images list through FTP
			foreach ( $images_dirs as $images_dir ) { // Test the different directories
				$full_dir = trailingslashit($images_dir) . $directory;
				$images = $this->plugin_ftp->list_directory($full_dir);
				if ( !empty($images) ) { // We have found the right directory
					break;
				}
			}
			if ( !empty($images) ) {
				$this->plugin_ftp->chdir($full_dir);
				$images_ids = array();
				$matches1 = array();
				foreach ( $images as $image ) {
					if ( preg_match('/(.*)\.(jpg|png|gif)$/i', $image, $matches1) ) {
						$image_name = $matches1[1];
						$filetype = wp_check_filetype($image);

						// Import the image
						$new_full_filename = $this->upload_dir . '/' . $image;
						if ( $this->plugin_ftp->get($image, $new_full_filename) ) {
							$guid = $this->upload_url . '/' . $image;
							$attachment_id = $this->plugin->insert_attachment($image_name, $image_name, $new_full_filename, $guid, $this->post_date, $filetype['type']);
							if ( $attachment_id !== false ) {
								$images_ids[] = $attachment_id;
							}
						}
					}
				}
				if ( !empty($images_ids) ) {
					$images_list = implode(',', $images_ids);
					$shortcode = '[gallery ids="' . $images_list . '"]';
				}
			}
			return $shortcode;
		}

		/**
		 * Add information to the admin page
		 * 
		 * @param array $data
		 * @return array
		 */
		public function process_admin_page($data) {
			$data['title'] .= ' ' . __('+ Simple Image Gallery add-on', __CLASS__);
			$data['description'] .= "<br />" . __('The Simple Image Gallery add-on will also import the Simple Image Gallery images.', __CLASS__);
			return $data;
		}
		
	}
}
