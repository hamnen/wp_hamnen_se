<?php

/**
 * Listing Categories Module for Beaver Builder Plugin.
 * 
 * @wordpress-plugin
 * Plugin Name: 	Listing Categories - BB Module
 * Plugin URI: 		https://www.wpbeaverworld.com
 * Description: 	Displaying the categories in grid
 * Author: 			WP Beaver World
 * Author URI: 		https://www.wpbeaverworld.com/
 *
 * Version: 		1.0
 *
 * License: 		GPLv2 or later
 * License URI: 	http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Text Domain: 	categories-grid
 * Domain Path: 	languages  
 */

/**
 * Copyright (c) 2017 WP Beaver World. All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 */

//* Prevent direct access to the plugin
if ( !defined( 'ABSPATH' ) ) {
  wp_die( __( "Sorry, you are not allowed to access this page directly.", 'categories-grid' ) );
}

//* Define constants
define( 'CG_VERSION', 	'1.0' );
define( 'CG_FILE', 		trailingslashit( dirname( __FILE__ ) ) . 'categories-grid.php' );
define( 'CG_DIR', 		plugin_dir_path( CG_FILE ) );
define( 'CG_URL', 		plugins_url( '/', CG_FILE ) );

//* Activate plugin
register_activation_hook( __FILE__, 'cg_activate' );
		
add_action( 'admin_init', 			'cg_plugin_deactivate' );
add_action( 'switch_theme', 		'cg_plugin_deactivate' );
add_action( 'plugins_loaded', 		'cg_load_textdomain' );
add_action( 'init', 				'cg_load_module', 99 );

/**
 * Callback function
 */ 
function cg_activate()
{
	if ( ! class_exists('FLBuilder') )
	{
		//* Deactivate ourself
		deactivate_plugins( __FILE__ );
		add_action( 'admin_notices', 'cg_admin_notice_message' );
		add_action( 'network_admin_notices', 'cg_admin_notice_message' );
		return;	
	}
}

/**
 * This function is triggered when the WordPress theme is changed.
 * It checks if the Beaver Builder Plugin is active. If not, it deactivates itself.
 */
function cg_plugin_deactivate()
{
	if ( ! class_exists('FLBuilder') )
	{
		//* Deactivate ourself
		deactivate_plugins( __FILE__ );
		add_action( 'admin_notices', 'cg_admin_notice_message' );
		add_action( 'network_admin_notices', 'cg_admin_notice_message' );
	}
}

/**
 * Shows an admin notice if you're not using the Beaver Builder Theme and Plugin.
 */
function cg_admin_notice_message()
{
	if ( ! is_admin() ) {
		return;
	}
	else if ( ! is_user_logged_in() ) {
		return;
	}
	else if ( ! current_user_can( 'update_core' ) ) {
		return;
	}

	$error = __( 'Sorry, you can\'t use the Listing Categories Plugin unless the Beaver Builder Plugin is active. The plugin has been deactivated.', 'categories-grid' );

	echo '<div class="error"><p>' . $error . '</p></div>';

	if ( isset( $_GET['activate'] ) )
	{
		unset( $_GET['activate'] );
	}
}

/**
 * Loads Text Domain
 */ 
function cg_load_textdomain()
{
	//* Load textdomain for translation 
	load_plugin_textdomain( 'categories-grid', false, basename( CG_DIR ) . '/languages' );

	add_action( 'admin_enqueue_scripts', 'cg_admin_enqueue_scripts' );
	add_action( 'admin_init', 'cg_terms_featured_image_field' );
	add_action( 'wp_head', 'cg_add_og_image_category_page' );
	add_action( 'registered_post_type', 'cg_delete_transient', 90 );
	add_action( 'registered_taxonomy', 'cg_delete_transient', 90 );
}

/**
 * Loads module.
 */ 
function cg_load_module()
{
	if( ! class_exists('FLBuilder') )
		return;

	require_once CG_DIR . 'module/categories-grid/categories-grid.php';
}

//* Load media uploader js file
function cg_admin_enqueue_scripts( $hook ) {
	if ( 'term.php' != $hook && 'edit-tags.php' != $hook ) {
	    return;
	}
	
	wp_enqueue_media();
	
	wp_enqueue_script( 'cat-media-uploader', CG_URL . '/js/media.uploader.js', array(), CHILD_THEME_VERSION, true );
	wp_localize_script( 
		'cat-media-uploader', 
		'MU', 
		array( 
			'title'       => __( "Choose an image", "theme-prefix" ), 
			'button_text' => __( "Use image", "theme-prefix" ), 
			'placeholder' => CG_URL . "/images/placeholder.png" 
		) 
	);
}
 
/**
 * Adding media uploader button in Add & Edit form
 * Also saving the data when creating or updating a category 
 */
function cg_terms_featured_image_field() {

	$save_data = false;

	 //* Adding a new field
    foreach( cg_get_all_taxonomies() as $key => $label ) {
		add_action( substr_replace( $key, '', 0, 1 ) . '_add_form_fields', 'cg_terms_add_form_fields' );
		add_action( substr_replace( $key, '', 0, 1 ) . '_edit_form_fields', 'cg_terms_edit_form_fields', 10 );

		add_filter( 'manage_edit-' . substr_replace( $key, '', 0, 1 ) . '_columns', 'cg_terms_columns' );
		add_filter('manage_' . substr_replace( $key, '', 0, 1 ) . '_custom_column', 'cg_terms_column_image', 10, 3 );

		$save_data = true;
	}  

	//* Saving the custom data
    if( $save_data === true )
    {
		add_action( 'created_term', 'cg_save_terms_form_data', 10, 3 );
		add_action( 'edit_term', 'cg_save_terms_form_data', 10, 3 );
	}
}

/**
 * Callback function. Adding placeholder image with upload button
 */
function cg_terms_add_form_fields() {
?>
	<div class="form-field">
		<label><?php _e( 'Featured Image', 'categories-grid' ); ?></label>
		<div id="cat_feat_img" style="padding-top: 10px;"><img src="<?php echo CG_URL; ?>/images/placeholder.png" width="220px" height="220px" /></div>
		<div style="padding-top: 10px;">
			<input type="hidden" id="cat_feat_img_id" name="cat_feat_img_id" />
			<button type="button" class="upload_image_button button"><?php _e( 'Upload/Add image', 'categories-grid' ); ?></button>
			<button type="button" class="remove_image_button button"><?php _e( 'Remove image', 'categories-grid' ); ?></button>
		</div>
		<div class="clear"></div>
	</div>
<?php
}

/**
 * Edit term's featured image
 * 
 * @param mixed $term Term (category) being edited  
 */ 
function cg_terms_edit_form_fields( $term ) {
	$cat_feat_img_id = absint( get_term_meta( $term->term_id, 'cat_feat_img_id', true ) );

	if ( $cat_feat_img_id ) {
	  $image = wp_get_attachment_thumb_url( $cat_feat_img_id );
	} else {
	  $image = CG_URL . '/images/placeholder.png';
	}
?>
	<tr class="form-field">
		<th scope="row" valign="top"><label><?php _e( 'Featured Image', 'categories-grid' ); ?></label></th>
		<td>
			<div id="cat_feat_img" style="margin-bottom: 10px;"><img src="<?php echo esc_url( $image ); ?>" width="220px" height="220px" /></div>
			<div>
				<input type="hidden" id="cat_feat_img_id" name="cat_feat_img_id" value="<?php echo $cat_feat_img_id; ?>" />
				<button type="button" class="upload_image_button button"><?php _e( 'Upload/Add image', 'categories-grid' ); ?></button>
				<button type="button" class="remove_image_button button"><?php _e( 'Remove image', 'categories-grid' ); ?></button>
			</div>
			<div class="clear"></div>
		</td>
	</tr>
<?php
}

/**
 * Saving data
 *
 * @param mixed $term_id Term ID being saved
 * @param mixed $tt_id
 * @param string $taxonomy
 */
function cg_save_terms_form_data( $term_id, $tt_id = '', $taxonomy = '' ) {
	if ( isset( $_POST['cat_feat_img_id'] ) && '' !== $taxonomy ) {
		update_term_meta( $term_id, 'cat_feat_img_id', absint( $_POST['cat_feat_img_id'] ) );
	}
}

//* Adding the column name
function cg_terms_columns( $cg_terms_columns ) {
	array_shift( $cg_terms_columns );

	$new_columns                    = array();    
	$new_columns['cb']              = '';
	$new_columns['cat_image_thumb'] = __( 'Image', 'categories-grid' );

	return array_merge( $new_columns, $cg_terms_columns );
}

//* Add image thumb at Image column
function cg_terms_column_image( $arg1, $column_name, $term_id ) {    
	if ( $column_name == 'cat_image_thumb' )
	{
		$cat_feat_img_id = absint( get_term_meta( $term_id, 'cat_feat_img_id', true ) );

		if ( $cat_feat_img_id ) {
			$image = wp_get_attachment_thumb_url( $cat_feat_img_id );
		} else {
			$image = CG_URL . '/images/placeholder.png';
		}

		return sprintf( '<img src="%s" width="60px" height="60px" />', esc_url( $image ) );
	}
}

function cg_add_og_image_category_page()
{
	if( ! is_category() && ! is_tag() && ! is_tax() ) {
		return '';
	}

	$term_id        = 0;
	$image 			= '';
	$queried_object = get_queried_object();
	if ( is_object( $queried_object ) && isset( $queried_object->term_id ) ) {
		$term_id = $queried_object->term_id;

		$cat_feat_img_id = absint( get_term_meta( $term_id, 'cat_feat_img_id', true ) );
    
		if ( $cat_feat_img_id ) {
			$image = wp_get_attachment_url( $cat_feat_img_id );
			echo '<meta property="og:image" content="' . $image . '" />' . "\n";
		}
	}

	return '';
}

/**
 * By default excluding some taxonomies
 */
function cg_exclude_taxonomies( $taxonomy ) {
    $filters = array( '', 'nav_menu', 'post_format', 'product_type' );
    return ( ! in_array( $taxonomy->name, $filters ) );
}

/**
 * Generating array list of all taxonomies
 * Saving the data in cache for 7 days. You can adjust the expire date as per your requirement
 * 
 * @uses    get_post_types()
 * @uses    get_object_taxonomies()
 * 
 * @return  array $taxonomies all taxonomies of your site      
 */
function cg_get_all_taxonomies() {
    $taxonomies = array();
    
    if( false === ( $taxonomies = get_transient( 'all_taxonomies' ) ) ) {
      //* Getting all registered post types
      $post_types = get_post_types( array( 'public' => true ), 'names', 'and' );
      if( $post_types ) :
        foreach ( $post_types as $post_type ) {
          
          if( $post_type == '' || $post_type == 'page' || $post_type == 'attachment' )
            continue;
            
          //* Getting all taxonomies of registered post type
          $tax_objects = get_object_taxonomies( $post_type, 'objects' );
          $tax_objects = array_filter( $tax_objects, 'cg_exclude_taxonomies' );
          foreach( $tax_objects as $tax_object ) {
            $taxonomies[ '_' . $tax_object->name ] = $tax_object->label;
          }
          
        } 
      endif;
      
      //* Saving the data for 7 days
      set_transient( 'all_taxonomies', $taxonomies, 7 * DAY_IN_SECONDS );
    }
    
    return $taxonomies;
}

/**
 * Delete transient when you are registering a post type or taxonomy
 * 
 * @uses   delete_transient() 
 */
function cg_delete_transient() {
    delete_transient( 'all_taxonomies' );
}