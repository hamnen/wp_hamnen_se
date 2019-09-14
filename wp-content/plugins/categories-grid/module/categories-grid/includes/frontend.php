<?php

$taxonomy = $settings->taxonomy;
if( ! empty( $taxonomy ) && $taxonomy != 'none' ) {
?>
<div class="terms-grid" itemscope="itemscope" itemtype="https://schema.org/category">
	<?php
		$args = array( 'taxonomy' => $taxonomy, 'orderby' => 'name', 'hide_empty' => true, 'order' => 'ASC' );
		if( ! empty( $settings->inc_terms ) )
		{
			$args['include'] = explode( ',', $settings->inc_terms );
		}
		if( ! empty( $settings->ex_terms ) )
		{
			$args['exclude'] = explode( ',', $settings->ex_terms );
		}
		$terms 	= get_terms( $args );
		if( $terms ) {
			foreach ($terms as $key => $term) {
				$term_link = ( get_term_link( $term, $taxonomy ) ) ? get_term_link( $term, $taxonomy ) : 'JavaScript:void(0)';
	?>
				<div class="item-column">
					<a href="<?php echo esc_url( $term_link ); ?>" rel="bookmark">
						<?php if( $settings->image_position == 'above-title' ) { $module->render_img( $settings->image_size, $term ); } ?>
						<h4 class="term-name" itemprop="name"><?php echo apply_filters( 'cg_term_name', esc_html( $term->name ), $term ); ?></h4>
						<?php if( $settings->image_position == 'below-title' ) { $module->render_img( $settings->image_size, $term ); } ?>
					</a>
					
					<?php if( $settings->post_count ) : ?>
					<div class="post-count"><?php echo $term->count; ?></div>
					<?php endif; ?>

					<?php if( $settings->description ) : ?>
						<div class="term-description"><?php echo wpautop( $term->description ); ?></div>
					<?php endif; ?>

					<?php 
						if( $settings->button ) : 
							$btn_settings = array(
								'align'             => $settings->align,
								'bg_color'          => $settings->btn_bg_color,
								'bg_hover_color'    => $settings->btn_bg_hover_color,
								'bg_opacity'        => $settings->btn_bg_opacity,
								'border_radius'     => $settings->btn_border_radius,
								'border_size'       => $settings->btn_border_size,
								'font_size'         => $settings->btn_font_size,
								'link'              => $term_link,
								'link_nofollow'     => $settings->link_nofollow,
								'link_target'       => $settings->link_target,
								'padding'           => $settings->btn_padding,
								'style'             => $settings->btn_style,
								'text'              => $settings->btn_text,
								'text_color'        => $settings->btn_text_color,
								'text_hover_color'  => $settings->btn_text_hover_color,
								'width'             => $settings->btn_width,
							);
					?>
						<div class="term-button" role="button">
							<?php FLBuilder::render_module_html( 'button', $btn_settings ); ?>
						</div>
					<?php endif; ?>
				</div>
	<?php 
			}
		} 
	?>
</div>
<div class="fl-clear"></div>
<?php } ?>