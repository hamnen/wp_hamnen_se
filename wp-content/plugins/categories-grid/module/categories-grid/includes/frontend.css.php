/* Post Columns */
body.rtl .item-column {
	float: right;
}
.item-column {
	float: left;
}

.fl-node-<?php echo $id; ?> .terms-grid {
	margin-left: -<?php echo $settings->spacing / 2; ?>px;
	margin-right: -<?php echo $settings->spacing / 2; ?>px;
}
.fl-node-<?php echo $id; ?> .item-column {
	padding-bottom: <?php echo $settings->spacing; ?>px;
	padding-left: <?php echo $settings->spacing / 2; ?>px;
	padding-right: <?php echo $settings->spacing / 2; ?>px;
	width: <?php echo 100 / $settings->columns; ?>%;
}
.fl-node-<?php echo $id; ?> .item-column:nth-child(<?php echo $settings->columns; ?>n + 1) {
	clear: both;
}
@media screen and (max-width: <?php echo $global_settings->medium_breakpoint; ?>px) {
	.fl-node-<?php echo $id; ?> .item-column {
		width: <?php echo 100 / $settings->columns_medium; ?>%;
	}
	.fl-node-<?php echo $id; ?> .item-column:nth-child(<?php echo $settings->columns; ?>n + 1) {
		clear: none;
	}
	.fl-node-<?php echo $id; ?> .item-column:nth-child(<?php echo $settings->columns_medium; ?>n + 1) {
		clear: both;
	}
}
@media screen and (max-width: <?php echo $global_settings->responsive_breakpoint; ?>px) {
	.fl-node-<?php echo $id; ?> .item-column {
		width: <?php echo 100 / $settings->columns_responsive; ?>%;
	}
	.fl-node-<?php echo $id; ?> .item-column:nth-child(<?php echo $settings->columns_medium; ?>n + 1) {
		clear: none;
	}
	.fl-node-<?php echo $id; ?> .item-column:nth-child(<?php echo $settings->columns_responsive; ?>n + 1) {
		clear: both;
	}
}

@media screen and (max-width: 480px) {
	.fl-node-<?php echo $id; ?> .item-column {
		clear: both;
		width: 100%;
	}
	.fl-node-<?php echo $id; ?> .item-column:nth-child(<?php echo $settings->columns_medium; ?>n + 1),
	.fl-node-<?php echo $id; ?> .item-column:nth-child(<?php echo $settings->columns_responsive; ?>n + 1) {
		clear: both;
	}
}

.fl-node-<?php echo $id; ?> .item-column a .term-name {
	<?php if( ! empty( $settings->text_color ) ) : ?>
	color:  #<?php echo $settings->text_color; ?>;
	<?php endif; ?>

	<?php if ( ! empty( $settings->font ) && 'Default' != $settings->font['family'] ) : ?>
		<?php FLBuilderFonts::font_css( $settings->font ); ?>
	<?php endif; ?>
	<?php if ( 'custom' == $settings->font_size ) : ?>
	font-size: <?php echo $settings->custom_font_size; ?>px;
	<?php endif; ?>
	<?php if( ! empty( $settings->padding_top ) ) : ?>
	padding-top: <?php echo $settings->padding_top; ?>px;
	<?php endif; ?>
	<?php if( ! empty( $settings->padding_right ) ) : ?>
	padding-right: <?php echo $settings->padding_right; ?>px;
	<?php endif; ?>
	<?php if( ! empty( $settings->padding_bottom ) ) : ?>
	padding-bottom: <?php echo $settings->padding_bottom; ?>px;
	<?php endif; ?>
	<?php if( ! empty( $settings->padding_left ) ) : ?>
	padding-left: <?php echo $settings->padding_left; ?>px;
	<?php endif; ?>
	margin: 0;
	<?php if( ! empty( $settings->align ) && $settings->align !== 'default' ) : ?>
	text-align: <?php echo $settings->align; ?>;
	<?php endif; ?>
}

<?php if( ! empty( $settings->hover_color ) ) : ?>
.fl-node-<?php echo $id; ?> .item-column a:hover .term-name {
	color:  #<?php echo $settings->hover_color; ?>;
}
<?php endif; 

if ( $settings->description ) {
?>
	.fl-node-<?php echo $id; ?> .item-column .term-description {
		<?php if( ! empty( $settings->desc_color ) ) : ?>
		color:  #<?php echo $settings->desc_color; ?>;
		<?php endif; ?>

		<?php if ( ! empty( $settings->desc_font ) && 'Default' != $settings->desc_font['family'] ) : ?>
			<?php FLBuilderFonts::font_css( $settings->desc_font ); ?>
		<?php endif; ?>
		<?php if ( 'custom' == $settings->desc_font_size ) : ?>
		font-size: <?php echo $settings->desc_custom_font_size; ?>px;
		<?php endif; ?>
		<?php if( ! empty( $settings->align ) && $settings->align !== 'default' ) : ?>
		text-align: <?php echo $settings->align; ?>;
		<?php endif; ?>
	}
<?php
}
	if ( $settings->post_count ) {
?>
	.fl-node-<?php echo $id; ?> .item-column .post-count {
		<?php if( ! empty( $settings->pc_color ) ) : ?>
		color:  #<?php echo $settings->pc_color; ?>;
		<?php endif; ?>

		<?php if ( ! empty( $settings->pc_font ) && 'Default' != $settings->pc_font['family'] ) : ?>
			<?php FLBuilderFonts::font_css( $settings->pc_font ); ?>
		<?php endif; ?>
		<?php if ( 'custom' == $settings->pc_font_size ) : ?>
		font-size: <?php echo $settings->pc_custom_font_size; ?>px;
		<?php endif; ?>
		<?php if( ! empty( $settings->align ) && $settings->align !== 'default' ) : ?>
		text-align: <?php echo $settings->align; ?>;
		<?php endif; ?>
		padding: 8px 0;
	}
<?php
}

if ( $settings->button ) {
	FLBuilder::render_module_css('button', $id, array(
		'align'             => $settings->align,
		'bg_color'          => $settings->btn_bg_color,
		'bg_hover_color'    => $settings->btn_bg_hover_color,
		'bg_opacity'        => $settings->btn_bg_opacity,
		'bg_hover_opacity'  => $settings->btn_bg_hover_opacity,
		'button_transition' => $settings->btn_button_transition,
		'border_radius'     => $settings->btn_border_radius,
		'border_size'       => $settings->btn_border_size,
		'font_size'         => $settings->btn_font_size,
		'padding'           => $settings->btn_padding,
		'style'             => ( isset( $settings->btn_3d ) && $settings->btn_3d ) ? 'gradient' : $settings->btn_style,
		'text'              => $settings->btn_text,
		'text_color'        => $settings->btn_text_color,
		'text_hover_color'  => $settings->btn_text_hover_color,
		'width'             => $settings->btn_width,
	));
}
?>