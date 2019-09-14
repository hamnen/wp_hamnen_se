jQuery( document ).ready(function() {
  // Only show the "remove image" button when needed
  if ( '0' === jQuery( '#cat_feat_img_id' ).val() || '' === jQuery( '#cat_feat_img_id' ).val() ) {
  	jQuery( '.remove_image_button' ).hide();
  }
});

// Uploading files
var file_frame;

jQuery( document ).on( 'click', '.upload_image_button', function( event ) {

	event.preventDefault();

	// If the media frame already exists, reopen it.
	if ( file_frame ) {
		file_frame.open();
		return;
	}

	// Create the media frame.
	file_frame = wp.media.frames.downloadable_file = wp.media({
		title: MU.title,
		button: {
			text: MU.button_text
		},
		multiple: false
	});

	// When an image is selected, run a callback.
	file_frame.on( 'select', function() {
		var attachment = file_frame.state().get( 'selection' ).first().toJSON();

		jQuery( '#cat_feat_img_id' ).val( attachment.id );
		jQuery( '#cat_feat_img' ).find( 'img' ).attr( 'src', attachment.sizes.thumbnail.url );
		jQuery( '.remove_image_button' ).show();
	});

	// Finally, open the modal.
	file_frame.open();
});

jQuery( document ).on( 'click', '.remove_image_button', function() {
	jQuery( '#cat_feat_img' ).find( 'img' ).attr( 'src', MU.placeholder );
	jQuery( '#cat_feat_img_id' ).val( '' );
	jQuery( '.remove_image_button' ).hide();
	return false;
});