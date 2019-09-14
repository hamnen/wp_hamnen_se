(function($) {

	$(function() {
		new CategoryGrid({
			id: '<?php echo $id ?>',
			postSpacing: '<?php echo $settings->spacing; ?>',
			matchHeight: <?php echo $settings->match_height; ?>
		});
	});

})(jQuery);
