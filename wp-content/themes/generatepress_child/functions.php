<?php
/**
 * GeneratePress child theme functions and definitions.
 *
 * Add your custom PHP in this file. 
 * Only edit this file if you have direct access to it on your server (to fix errors if they happen).
 */

function generatepress_child_enqueue_scripts() {
	if ( is_rtl() ) {
		wp_enqueue_style( 'generatepress-rtl', trailingslashit( get_template_directory_uri() ) . 'rtl.css' );
	}
}
add_action( 'wp_enqueue_scripts', 'generatepress_child_enqueue_scripts', 100 );

// Encue scripts to childtheme
function my_scripts_method() {
    wp_enqueue_script(
        'custom-script',
        get_stylesheet_directory_uri() . '/js/jquery.showmore.js',
        array( 'jquery' )
    );
}

add_action( 'wp_enqueue_scripts', 'my_scripts_method' );

function my_owl_slider() {
wp_enqueue_script( 'owlcarousel', get_stylesheet_directory_uri() . '/owl/owl.carousel.min.js', array( 'jquery' ), false, true );
wp_enqueue_style( 'owlcarousel-style', get_stylesheet_directory_uri() . '/owl/owl.carousel.min.css' );
wp_enqueue_style( 'owlcarousel-theme', get_stylesheet_directory_uri() . '/owl/owl.theme.default.min.css' );
}

add_action( 'wp_enqueue_scripts', 'my_owl_slider' );


/* Replace the theme's menu with UberMenu */
function generate_navigation_position(){
    if( function_exists( 'ubermenu' ) ){
        ubermenu( 'main' , array( 'theme_location' => 'primary' ) );
    }
}
 
/* Stop the theme from filtering the menu output */
add_action( 'wp_head' , 'stop_generatepress_menu_filter' );
function stop_generatepress_menu_filter(){
    remove_filter( 'walker_nav_menu_start_el', 'generate_nav_dropdown', 10, 4 );
}

/* Räknare för popular post på inläggen */
function wpb_set_post_views($postID) {
    $count_key = 'wpb_post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        $count = 0;
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
    }else{
        $count++;
        update_post_meta($postID, $count_key, $count);
    }
}
//To keep the count accurate, lets get rid of prefetching
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);

function wpb_track_post_views ($post_id) {
    if ( !is_single() ) return;
    if ( empty ( $post_id) ) {
        global $post;
        $post_id = $post->ID;    
    }
    wpb_set_post_views($post_id);
}
add_action( 'wp_head', 'wpb_track_post_views');

// Sätter default på gamla importerade gallerier, även nya infogade
function my_gallery_default_type_set_link( $settings ) {
$settings['galleryDefaults']['link'] = 'file';
$settings['galleryDefaults']['size'] = 'medium';
$settings['galleryDefaults']['columns'] = '3';
return $settings;
}
add_filter( 'media_view_settings', 'my_gallery_default_type_set_link');

/**
 * Modify the document title for the search page
 */

add_filter('fl_theme_builder_page_archive_get_title', 'wpshout_filter_example');

function wpshout_filter_example($title) {	
$classes = get_body_class();
if (in_array('search',$classes)) {
    $title = sprintf( _x( '%s', 'Search results title.', 'fl-theme-builder' ), get_search_query() );
	return $title;
} else { // Everything else...
			$title = get_the_archive_title();
	return $title;
		}
}
	
	/*if ( is_category() ) {
			$title = single_cat_title( '', true );
		} elseif ( is_tag() ) {
			$title = single_tag_title( '', true );
		} elseif ( is_tax() ) { // Taxonomy
			$title = single_term_title( '', true );
		} elseif ( is_author() ) { // Author
			$title = get_the_author();
		} elseif ( is_search() ) { // Search
			/* translators: %s: Search results title */
	/*		$title = sprintf( _x( 'Search Results: %s', 'Search results title.', 'fl-theme-builder' ), get_search_query() );
		} elseif ( is_post_type_archive() ) { // Post Type
			$title = post_type_archive_title( '', true );
		} elseif ( is_home() ) { // Posts Archive
			$title = __( 'Posts', 'fl-theme-builder' );
		} else { // Everything else...
			$title = get_the_archive_title();
		}
}*/
// Sökfilter för views
/*add_filter( 'wpv_filter_query', 'exclude_terms_func', 10, 3 );
function exclude_terms_func($query, $setting, $views_ID)
{
    if($views_ID == 27073)
    {
        $query['tax_query'][] = array(
            'taxonomy' => 'category',
            'field' => 'slug',
            'terms' => array( 'motorbatar', 'segelbatar' ),
            'operator' => 'IN'
        );
        $query['tax_query']['relation'] = 'AND';
    }
    return $query;
}*/