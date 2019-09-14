<?php 

if( ! class_exists('CategoriesGridModule') ) :
/**
 * @class CategoriesGridModule
 */
class CategoriesGridModule extends FLBuilderModule {

	/**
	 * @method __construct
	 */
	public function __construct()
	{
		parent::__construct(array(
			'name'          	=> __('Categories - Grid', 'categories-grid'),
			'description'   	=> __('Displaying the term name with archive link', 'categories-grid'),
			'category'      	=> __('Posts', 'categories-grid'),
			'dir' 				=> CG_DIR . 'module/categories-grid/',
			'url' 				=> CG_URL . 'module/categories-grid/',
			'partial_refresh'	=> true
		));
	}

	static public function get_taxonomies()
	{
		$tax_options = array( 'none' => __( 'None', 'categories-grid' ) );

		$args = array(
			'public'   => true,
			'_builtin' => false
		); 
		$output 	= 'objects';
		$operator 	= 'or';
		$taxonomies = get_taxonomies( $args, $output, $operator );
		if ( $taxonomies ) {
			foreach ( $taxonomies as $tax => $data ) {
				$terms = get_terms( array( 'taxonomy' => $tax ) );
				if ( empty( $terms ) )
					continue;
				$tax_options[$tax] = esc_html( $data->label );
			}
		}

		return $tax_options;
	}

	public function render_img( $size = 'medium', $term ) {
		/*if( function_exists( 'taxonomy_image_plugin_get_associations' ) )
		{
			$attachment_id = 0;
			$associations = taxonomy_image_plugin_get_associations();
			if ( isset( $associations[ $term->term_id ] ) ) {
				$attachment_id = (int) $associations[ $term->term_id ];
				$image_attributes = wp_get_attachment_image_src( $attachment_id, $size );
				if ( $image_attributes ) : ?>
				<div class="term-img"><img src="<?php echo $image_attributes[0]; ?>" width="<?php echo $image_attributes[1]; ?>" height="<?php echo $image_attributes[2]; ?>" alt="" /></div>
				<?php endif;
			}
		} else {
			--
		}*/

		$cat_feat_img_id = get_term_meta( $term->term_id, 'cat_feat_img_id', true );
		if ( $cat_feat_img_id ) {
			$image_attributes = wp_get_attachment_image_src( absint( $cat_feat_img_id ), $size );
			if ( $image_attributes ) : 
	?>
				<div class="term-img"><img src="<?php echo $image_attributes[0]; ?>" width="<?php echo $image_attributes[1]; ?>" height="<?php echo $image_attributes[2]; ?>" alt="" /></div>
			<?php endif;
		} else {
			global $_wp_additional_image_sizes;
			if ( in_array( $size, array('thumbnail', 'medium', 'medium_large', 'large') ) ) {
				$width  = get_option( "{$size}_size_w" );
				$height = get_option( "{$size}_size_h" );
			} elseif ( isset( $_wp_additional_image_sizes[ $size ] ) ) {
				$width  = $_wp_additional_image_sizes[ $size ]['width'];
				$height = $_wp_additional_image_sizes[ $size ]['height'];
			}
			echo '<div class="term-img"><img src="' . CG_URL . 'images/placeholder.png" width="' . $width . '" height="' . $height .'" alt="" /></div>';
		}
	}
}

/**
 * Register the module and its form settings.
 */
FLBuilder::register_module('CategoriesGridModule', array(
	'general' 		=> array(
		'title' 		=> __('General', 'categories-grid'),
		'sections' 		=> array(
			'general' 		=> array(
				'title' 		=> '',
				'fields' 		=> array(
					'taxonomy' 		=> array(
						'type' 			=> 'select',
						'label' 		=> __( 'Taxonomy', 'categories-grid' ),
						'default'		=> 'none',
						'options' 		=> CategoriesGridModule::get_taxonomies(),
						'className' 	=> 'cg-taxonomy',
						'preview' 		=> array(
							'type' 			=> 'none'
						)
					),
					'inc_terms' => array(
						'type'          => 'text',
						'label'         => __( 'Includes Terms', 'categories-grid' ),
						'default'       => '',
						'size'          => '30',
						'description'   => __( 'Term IDs, comma separated - 1,2,3 for example', 'categories-grid' ),
					),
					'ex_terms' => array(
						'type'          => 'text',
						'label'         => __( 'Excludes Terms', 'categories-grid' ),
						'default'       => '',
						'size'          => '30',
						'description'   => __( 'Term IDs, comma separated - 1,2,3 for example', 'categories-grid' ),
					),
					'columns'  => array(
						'type'          => 'unit',
						'label'         => __( 'Columns', 'categories-grid' ),
						'responsive'  => array(
							'default' 	  => array(
								'default'    => '4',
								'medium'     => '2',
								'responsive' => '2',
							),
						),
					),
					'spacing' => array(
						'type'          => 'text',
						'label'         => __( 'Spacing', 'categories-grid' ),
						'default'       => '20',
						'maxlength'     => '3',
						'size'          => '4',
						'description'   => 'px',
					),
					'match_height'  => array(
						'type'          => 'select',
						'label'         => __( 'Equal Heights', 'categories-grid' ),
						'default'       => '0',
						'options'       => array(
							'1'             => __( 'Yes', 'categories-grid' ),
							'0'             => __( 'No', 'categories-grid' ),
						),
					),
					'image_position' => array(
						'type'          => 'select',
						'label'         => __( 'Image Position', 'categories-grid' ),
						'default'       => 'above-title',
						'options'       => array(
							'above-title'   => __( 'Above Title', 'categories-grid' ),
							'below-title'   => __( 'Below Title', 'categories-grid' ),
						),
					),
					'image_size'    => array(
						'type'          => 'photo-sizes',
						'label'         => __( 'Image Size', 'categories-grid' ),
						'default'       => 'medium',
					),
					'post_count'  => array(
						'type'          => 'select',
						'label'         => __( 'Show Post Count', 'categories-grid' ),
						'default'       => '0',
						'options'       => array(
							'1'             => __( 'Yes', 'categories-grid' ),
							'0'             => __( 'No', 'categories-grid' ),
						),
					),
					'description'  => array(
						'type'          => 'select',
						'label'         => __( 'Show Category Description', 'categories-grid' ),
						'default'       => '1',
						'options'       => array(
							'1'             => __( 'Yes', 'categories-grid' ),
							'0'             => __( 'No', 'categories-grid' ),
						),
						'toggle' 	=> array(
							'1' 		=> array(
								'sections' 	=> array( 'cat_desc', 'desc_fonts' )
							)
						)
					),
					'button'  => array(
						'type'          => 'select',
						'label'         => __( 'Show Button', 'categories-grid' ),
						'default'       => '1',
						'options'       => array(
							'1'             => __( 'Yes', 'categories-grid' ),
							'0'             => __( 'No', 'categories-grid' ),
						),
						'toggle' 	=> array(
							'1' 		=> array(
								'fields' 	=> array( 'btn_text' ),
								'sections' 	=> array( 'btn_colors', 'btn_style', 'btn_structure' )
							)
						)
					),
					'btn_text'      => array(
						'type'          => 'text',
						'label'         => __( 'Text', 'categories-grid' ),
						'default'		=> __( 'Read More', 'categories-grid' )
					)
				)
			)
		)
	),
	'style'			=> array(
		'title' 		=> __('Style', 'categories-grid'),
		'sections' 		=> array(
			'cat_title' 	=> array(
				'title' 		=> __( 'Category Title', 'categories-grid' ),
				'fields' 		=> array(
					'text_color' 	=> array(
						'type' 			=> 'color',
						'label' 		=> __( 'Text Color', 'categories-grid' ),
						'default' 		=> '232323',
						'show_reset'    => true
					),
					'hover_color' 	=> array(
						'type' 			=> 'color',
						'label' 		=> __( 'Hover Color', 'categories-grid' ),
						'default' 		=> '999999',
						'show_reset'    => true
					),
					'align'    => array(
						'type'          => 'select',
						'label'         => __( 'Alignment', 'categories-grid' ),
						'default'       => 'default',
						'options'       => array(
							'default'       => __( 'Default', 'categories-grid' ),
							'left'          => __( 'Left', 'categories-grid' ),
							'center'        => __( 'Center', 'categories-grid' ),
							'right'         => __( 'Right', 'categories-grid' ),
						),
					),
					'padding' => array(
						'type'          => 'dimension',
						'label'         => __( 'Padding', 'categories-grid' ),
						'placeholder' 	=> '0',
						'maxlength'     => '3',
						'size'          => '4',
						'description'   => 'px',
					)
				)
			),
			'cat_desc' 	=> array(
				'title' 		=> __( 'Category Description', 'categories-grid' ),
				'fields' 		=> array(
					'desc_color' 	=> array(
						'type' 			=> 'color',
						'label' 		=> __( 'Color', 'categories-grid' ),
						'default' 		=> '666666',
						'show_reset'    => true
					),
				)
			),
			'pc_style' 	=> array(
				'title' 		=> __( 'Post Count', 'categories-grid' ),
				'fields' 		=> array(
					'pc_color' 	=> array(
						'type' 			=> 'color',
						'label' 		=> __( 'Color', 'categories-grid' ),
						'default' 		=> '999999',
						'show_reset'    => true
					),
				)
			),
			'btn_colors'     => array(
				'title'         => __( 'Button Colors', 'categories-grid' ),
				'fields'        => array(
					'btn_bg_color'  => array(
						'type'          => 'color',
						'label'         => __( 'Background Color', 'categories-grid' ),
						'default'       => '',
						'show_reset'    => true,
					),
					'btn_bg_hover_color' => array(
						'type'          => 'color',
						'label'         => __( 'Background Hover Color', 'categories-grid' ),
						'default'       => '',
						'show_reset'    => true,
						'preview'       => array(
							'type'          => 'none',
						),
					),
					'btn_text_color' => array(
						'type'          => 'color',
						'label'         => __( 'Text Color', 'categories-grid' ),
						'default'       => '',
						'show_reset'    => true,
					),
					'btn_text_hover_color' => array(
						'type'          => 'color',
						'label'         => __( 'Text Hover Color', 'categories-grid' ),
						'default'       => '',
						'show_reset'    => true,
						'preview'       => array(
							'type'          => 'none',
						),
					),
				),
			),
			'btn_style'     => array(
				'title'         => __( 'Button Style', 'categories-grid' ),
				'fields'        => array(
					'btn_style'     => array(
						'type'          => 'select',
						'label'         => __( 'Style', 'categories-grid' ),
						'default'       => 'flat',
						'options'       => array(
							'flat'          => __( 'Flat', 'categories-grid' ),
							'gradient'      => __( 'Gradient', 'categories-grid' ),
							'transparent'   => __( 'Transparent', 'categories-grid' ),
						),
						'toggle'        => array(
							'transparent'   => array(
								'fields'        => array( 'btn_bg_opacity', 'btn_bg_hover_opacity', 'btn_border_size' ),
							),
						),
					),
					'btn_border_size' => array(
						'type'          => 'text',
						'label'         => __( 'Border Size', 'categories-grid' ),
						'default'       => '2',
						'description'   => 'px',
						'maxlength'     => '3',
						'size'          => '5',
						'placeholder'   => '0',
					),
					'btn_bg_opacity' => array(
						'type'          => 'text',
						'label'         => __( 'Background Opacity', 'categories-grid' ),
						'default'       => '0',
						'description'   => '%',
						'maxlength'     => '3',
						'size'          => '5',
						'placeholder'   => '0',
					),
					'btn_bg_hover_opacity' => array(
						'type'          => 'text',
						'label'         => __( 'Background Hover Opacity', 'categories-grid' ),
						'default'       => '0',
						'description'   => '%',
						'maxlength'     => '3',
						'size'          => '5',
						'placeholder'   => '0',
					),
					'btn_button_transition' => array(
						'type'          => 'select',
						'label'         => __( 'Transition', 'categories-grid' ),
						'default'       => 'disable',
						'options'       => array(
							'disable'        => __( 'Disabled', 'categories-grid' ),
							'enable'         => __( 'Enabled', 'categories-grid' ),
						),
					),
				),
			),
			'btn_structure' => array(
				'title'         => __( 'Button Structure', 'categories-grid' ),
				'fields'        => array(
					'btn_width'     => array(
						'type'          => 'select',
						'label'         => __( 'Button Width', 'categories-grid' ),
						'default'       => 'auto',
						'options'       => array(
							'auto'          => _x( 'Auto', 'Width.', 'categories-grid' ),
							'full'          => __( 'Full Width', 'categories-grid' ),
						),
					),
					'btn_font_size' => array(
						'type'          => 'text',
						'label'         => __( 'Font Size', 'categories-grid' ),
						'default'       => '14',
						'maxlength'     => '3',
						'size'          => '4',
						'description'   => 'px',
					),
					'btn_padding'   => array(
						'type'          => 'text',
						'label'         => __( 'Padding', 'categories-grid' ),
						'default'       => '10',
						'maxlength'     => '3',
						'size'          => '4',
						'description'   => 'px',
					),
					'btn_border_radius' => array(
						'type'          => 'text',
						'label'         => __( 'Round Corners', 'categories-grid' ),
						'default'       => '4',
						'maxlength'     => '3',
						'size'          => '4',
						'description'   => 'px',
					),
				),
			),
		)
	),
	'fonts' 		=> array(
		'title' 		=> __('Font', 'categories-grid'),
		'sections' 		=> array(
			'terms_font' 	=> array(
				'title' 		=> __( 'Category Name', 'categories-grid' ),
				'fields' 		=> array(
					'font'          => array(
						'type'          => 'font',
						'default'		=> array(
							'family'		=> 'Default',
							'weight'		=> 300,
						),
						'label'         => __( 'Font', 'categories-grid' ),
						'preview'         => array(
							'type'            => 'font',
							'selector'        => '.term-name',
						),
					),
					'font_size'     => array(
						'type'          => 'select',
						'label'         => __( 'Font Size', 'categories-grid' ),
						'default'       => 'default',
						'options'       => array(
							'default'       => __( 'Default', 'categories-grid' ),
							'custom'        => __( 'Custom', 'categories-grid' ),
						),
						'toggle'        => array(
							'custom'        => array(
								'fields'        => array( 'custom_font_size' ),
							),
						),
					),
					'custom_font_size' => array(
						'type'          => 'text',
						'label'         => __( 'Custom Font Size', 'categories-grid' ),
						'default'       => '24',
						'maxlength'     => '3',
						'size'          => '4',
						'description'   => 'px',
						'sanitize'		=> 'absint',
					)
				)
			),
			'desc_fonts' 	=> array(
				'title' 		=> __( 'Category Description', 'categories-grid' ),
				'fields' 		=> array(
					'desc_font'		=> array(
						'type'          => 'font',
						'default'		=> array(
							'family'		=> 'Default',
							'weight'		=> 300,
						),
						'label'         => __( 'Font', 'categories-grid' ),
						'preview'         => array(
							'type'            => 'font',
							'selector'        => '.term-name',
						),
					),
					'desc_font_size' => array(
						'type'          => 'select',
						'label'         => __( 'Font Size', 'categories-grid' ),
						'default'       => 'default',
						'options'       => array(
							'default'       => __( 'Default', 'categories-grid' ),
							'custom'        => __( 'Custom', 'categories-grid' ),
						),
						'toggle'        => array(
							'custom'        => array(
								'fields'        => array( 'desc_custom_font_size' ),
							),
						),
					),
					'desc_custom_font_size' => array(
						'type'          => 'text',
						'label'         => __( 'Custom Font Size', 'categories-grid' ),
						'default'       => '24',
						'maxlength'     => '3',
						'size'          => '4',
						'description'   => 'px',
						'sanitize'		=> 'absint',
					)
				)
			),
			'pc_fonts' 	=> array(
				'title' 		=> __( 'Post Count', 'categories-grid' ),
				'fields' 		=> array(
					'pc_font'		=> array(
						'type'          => 'font',
						'default'		=> array(
							'family'		=> 'Default',
							'weight'		=> 300,
						),
						'label'         => __( 'Font', 'categories-grid' ),
						'preview'         => array(
							'type'            => 'font',
							'selector'        => '.term-name',
						),
					),
					'pc_font_size' => array(
						'type'          => 'select',
						'label'         => __( 'Font Size', 'categories-grid' ),
						'default'       => 'default',
						'options'       => array(
							'default'       => __( 'Default', 'categories-grid' ),
							'custom'        => __( 'Custom', 'categories-grid' ),
						),
						'toggle'        => array(
							'custom'        => array(
								'fields'        => array( 'pc_custom_font_size' ),
							),
						),
					),
					'pc_custom_font_size' => array(
						'type'          => 'text',
						'label'         => __( 'Custom Font Size', 'categories-grid' ),
						'default'       => '24',
						'maxlength'     => '3',
						'size'          => '4',
						'description'   => 'px',
						'sanitize'		=> 'absint',
					)
				)
			)
		)
	)
) );

endif;