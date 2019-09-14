(function($) {

	CategoryGrid = function(settings)
	{
		this.settings    = settings;
		this.nodeClass   = '.fl-node-' + settings.id;
		this.matchHeight = settings.matchHeight;

		this.wrapperClass = this.nodeClass + ' .terms-grid';
		this.itemClass    = this.nodeClass + ' .item-column';

		if(this._hasTerms()) {
			this._initLayout();
		}
	};

	CategoryGrid.prototype = {

		settings        : {},
		nodeClass       : '',
		wrapperClass    : '',
		itemClass       : '',

		_hasTerms: function()
		{
			return $(this.itemClass).length > 0;
		},

		_initLayout: function()
		{
			this._columnsLayout();

			$(this.itemClass).css('visibility', 'visible');
		},

		_columnsLayout: function()
		{
			$(this.wrapperClass).imagesLoaded( $.proxy( function() {
				this._matchHeight();
			}, this ) );

			$( window ).on( 'resize', $.proxy( this._matchHeight, this ) );
		},

		_matchHeight: function()
		{
			var highestBox = 0;

			if ( 0 === this.matchHeight ) {
				return;
			}

            $(this.nodeClass + ' .item-column').css('height', '').each(function(){

                if($(this).height() > highestBox) {
                	highestBox = $(this).height();
                }
            });

            $(this.nodeClass + ' .item-column').height(highestBox);
		}
	};

})(jQuery);
