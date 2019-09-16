/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera|opr|opios/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      if( /touchpad\//i.test(ua) ){
        result.touchpad = t;
      }
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

(function($){
  UABBTrigger = {

      /**
       * Trigger a hook.
       *
       * @since 1.1.0.3
       * @method triggerHook
       * @param {String} hook The hook to trigger.
       * @param {Array} args An array of args to pass to the hook.
       */
      triggerHook: function( hook, args )
      {
        $( 'body' ).trigger( 'uabb-trigger.' + hook, args );
      },
    
      /**
       * Add a hook.
       *
       * @since 1.1.0.3
       * @method addHook
       * @param {String} hook The hook to add.
       * @param {Function} callback A function to call when the hook is triggered.
       */
      addHook: function( hook, callback )
      {
        $( 'body' ).on( 'uabb-trigger.' + hook, callback );
      },
    
      /**
       * Remove a hook.
       *
       * @since 1.1.0.3
       * @method removeHook
       * @param {String} hook The hook to remove.
       * @param {Function} callback The callback function to remove.
       */
      removeHook: function( hook, callback )
      {
        $( 'body' ).off( 'uabb-trigger.' + hook, callback );
      },
  };
})(jQuery);

jQuery(document).ready(function( $ ) {

    if( typeof bowser !== 'undefined' && bowser !== null ) {

      var uabb_browser   = bowser.name,
          uabb_browser_v = bowser.version,
          uabb_browser_class = uabb_browser.replace(/\s+/g, '-').toLowerCase(),
          uabb_browser_v_class = uabb_browser_class + parseInt( uabb_browser_v );
      
      $('html').addClass(uabb_browser_class).addClass(uabb_browser_v_class);
      
    }

    $('.uabb-row-separator').parents('html').css('overflow-x', 'hidden');
});

(function($) {
	$(function() {

		// FitVids
		if ( 'undefined' !== typeof $.fn.fitVids ) {
			$('.fl-module-fl-post-content').fitVids();
		}

	});
})(jQuery);
jQuery(function($) {
	
	$(function() {
		$( '.fl-node-5d584c8ff0fb7 .fl-photo-img' )
			.on( 'mouseenter', function( e ) {
				$( this ).data( 'title', $( this ).attr( 'title' ) ).removeAttr( 'title' );
			} )
			.on( 'mouseleave', function( e ){
				$( this ).attr( 'title', $( this ).data( 'title' ) ).data( 'title', null );
			} );
	});
});

(function($) {

	PPContentGrid = function(settings)
	{
		this.settings       = settings;
		this.nodeClass      = '.fl-node-' + settings.id;
		this.wrapperClass   = this.nodeClass + ' .pp-content-post-' + this.settings.layout;
		this.postClass      = this.wrapperClass + ' .pp-content-' + this.settings.layout + '-post';
		this.matchHeight	= settings.matchHeight == 'yes' ? true : false;
		this.style			= settings.style;
		this.masonry		= settings.masonry == 'yes' ? true : false;
		this.perPage 		= settings.perPage;
		this.filters 		= settings.filters;
		this.filterTax 		= settings.filterTax;
		this.filterType 	= settings.filterType;
		this.cacheData		= {};

		if(this._hasPosts()) {
			this._initLayout();
		}
	};

	PPContentGrid.prototype = {
		settings        : {},
		nodeClass       : '',
		wrapperClass    : '',
		postClass       : '',
		perPage			: '',
		filters			: false,
		filterTax		: '',
		filterType		: '',
		filterData		: {},
		isFiltering		: false,
		activeFilter	: '',
		totalPages		: 1,
		currentPage		: 1,
		cacheData		: {},
		matchHeight		: false,
		masonry			: false,
		style			: '',

		_hasPosts: function()
		{
			return $(this.postClass).length > 0;
		},

		_initLayout: function()
		{
			if ( $(this.nodeClass).find('.pp-posts-wrapper').hasClass('pp-posts-initiated') ) {
				return;
			}

			switch(this.settings.layout) {

				case 'grid':
					this._gridLayout();
					this._initPagination();
					this._reLayout();
					break;

				case 'carousel':
					this._carouselLayout();
					break;
			}

			$(this.postClass).css('visibility', 'visible');

			var self = this;

			$(window).on('load', function() {
				FLBuilderLayout._scrollToElement( $( self.nodeClass + ' .pp-paged-scroll-to' ) );
			});

			$(this.nodeClass).find('.pp-posts-wrapper').addClass('pp-posts-initiated');
		},

		_gridLayout: function()
		{
			var wrap = $(this.wrapperClass);

			var postFilterData = {
				itemSelector: '.pp-content-post',
				percentPosition: true,
				transitionDuration: '0.3s',
			};

			if ( !this.masonry ) {
				postFilterData = $.extend( {}, postFilterData, {
					layoutMode: 'fitRows',
					fitRows: {
						gutter: '.pp-grid-space'
				  	},
				} );
			}

			if ( this.masonry ) {

				postFilterData = $.extend( {}, postFilterData, {
					masonry: {
						columnWidth: '.pp-content-post',
						gutter: '.pp-grid-space'
					},
				} );
			}

			// set filter data globally to use later for ajax scroll pagination.
			this.filterData = postFilterData;

			wrap.imagesLoaded( $.proxy( function() {

				var node = $(this.nodeClass);
				var base = this;
				var postFilters = $(this.nodeClass).find('.pp-content-post-grid').isotope(postFilterData);

                if ( this.settings.filters || this.masonry ) {

					var filterWrap = $(this.nodeClass).find('.pp-post-filters');
					var filterToggle = $(this.nodeClass).find('.pp-post-filters-toggle');

					filterToggle.on('click', function () {
						filterWrap.slideToggle(function () {
							if ($(this).is(':visible')) {
								filterToggle.addClass('pp-post-filters-open');
							}
							if (!$(this).is(':visible')) {
								filterToggle.removeClass('pp-post-filters-open');
							}
						});
					});

					filterWrap.on('click', '.pp-post-filter', function() {
						// set active filter globally to use later for ajax scroll pagination.
						base.activeFilter = $(this).data('term');
						base.isFiltering = true;

						if ('static' === base.filterType) {
							var filterVal = $(this).attr('data-filter');
							postFilters.isotope({ filter: filterVal });
						} else {
							var term = $(this).data('term');
							$(base.wrapperClass).addClass('pp-is-filtering');
							base._getPosts(term, postFilterData);
						}

						filterWrap.find('.pp-post-filter').removeClass('pp-filter-active');
						$(this).addClass('pp-filter-active');

						filterToggle.find('span.toggle-text').html($(this).text());
						if (filterToggle.hasClass('pp-post-filters-open')) {
							filterWrap.slideUp();
							filterToggle.removeClass('pp-post-filters-open');
						}

						$(base.nodeClass).trigger('grid.filter.change');
					});
					
					if ('dynamic' === base.filterType) {
						$(base.nodeClass).find('.fl-builder-pagination a').off('click').on('click', function (e) {
							e.preventDefault();
							var pageNumber = base._getPageNumber( this );
							base.currentPage = pageNumber;
							base._getPosts('', postFilterData, pageNumber);
						});
					}

					// Trigger filter by hash parameter in URL.
					if ( '' !== location.hash ) {
						var filterHash = location.hash.split('#')[1];

						filterWrap.find('li[data-term="' + filterHash + '"]').trigger('click');
					}

					// Trigger filter on hash change in URL.
					$(window).on('hashchange', function() {
						if ( '' !== location.hash ) {
							var filterHash = location.hash.split('#')[1];
	
							filterWrap.find('li[data-term="' + filterHash + '"]').trigger('click');
						}
					});
                }

                if( ! this.masonry ) {
                    setTimeout( function() {
						if ( base.settings.filters && 'static' === base.filterType ) {
							node.find('.pp-filter-active').trigger('click');
						}
						base._gridLayoutMatchHeight();
						wrap.isotope('layout');
                    }, 1000 );
                }

			}, this ) );
		},

		_carouselLayout: function()
		{
			var wrap = $(this.nodeClass + ' .pp-content-post-carousel .pp-content-posts-inner');
			wrap.imagesLoaded( $.proxy( function() {
				var owlOptions = {
					onInitialized: $.proxy(this._gridLayoutMatchHeightSimple, this),
					onResized: $.proxy(this._gridLayoutMatchHeightSimple, this),
					onRefreshed: $.proxy(this._gridLayoutMatchHeightSimple, this),
					onLoadedLazy: $.proxy(this._gridLayoutMatchHeightSimple, this),
				};
				if ( $(this.postClass).length < this.settings.carousel.items ) {
					this.settings.carousel.slideBy = 'page';
					this.settings.carousel.loop = false;
				}
				wrap.owlCarousel( $.extend({}, this.settings.carousel, owlOptions) );
			}, this));
		},

		_getPosts: function (term, isotopeData, paged) {
			var processAjax = false,
				filter 		= term,
				paged 		= (!paged || 'undefined' === typeof paged) ? 1 : paged;

			if ('undefined' === typeof term || '' === term) {
				filter = 'all';
			}

			var cacheData = this._getCacheData(filter);

			if ('undefined' === typeof cacheData) {
				processAjax = true;
			} else {
				var cachedResponse = cacheData.page[paged];
				if ('undefined' === typeof cachedResponse) {
					processAjax = true;
				} else {
					$(this.nodeClass).trigger('grid.beforeRender');
					this._renderPosts(cachedResponse, {
						term: term,
						isotopeData: isotopeData,
						page: paged
					});
				}
			}

			if (processAjax) {
				this._getAjaxPosts(term, isotopeData, paged);
			}
		},

		_getAjaxPosts: function (term, isotopeData, paged) {
			var taxonomy = this.filterTax,
				perPage = this.perPage,
				paged = 'undefined' === typeof paged ? false : paged,
				self = this;

			var gridWrap = $(this.wrapperClass);

			var currentPage = this.settings.current_page.split('?')[0];

			var data = {
				pp_action: 'get_ajax_posts',
				node_id: this.settings.id,
				page: !paged ? this.settings.page : paged,
				current_page: currentPage,
				settings: this.settings.fields
			};

			// Archive.
			if ( 'undefined' !== typeof this.settings.is_archive ) {
				data['is_archive'] = true;
			}

			// Term.
			if ('' !== term || 'undefined' === typeof term) {
				data['term'] = term;
			} else if ( this.settings.is_tax && this.settings.current_term ) {
				data['is_tax'] = true;
				data['taxonomy'] = this.settings.current_tax;
				data['term'] = this.settings.current_term;
			}

			// Author.
			if ( this.settings.is_author && this.settings.current_author ) {
				data['is_author'] = true;
				data['author_id'] = this.settings.current_author;
			}

			if ('undefined' !== typeof this.settings.orderby || '' !== this.settings.orderby) {
				data['orderby'] = this.settings.orderby;
			}

			$.ajax({
				type: 'post',
				url: window.location.href.split( '#' ).shift(),
				data: data,
				success: function (response) {
					self._setCacheData(term, response, paged);
					$(self.nodeClass).trigger('grid.beforeRender');
					self._renderPosts(response, {
						term: term,
						isotopeData: isotopeData,
						page: paged
					});
				}
			});
		},

		_renderPosts: function (response, args) {
			var self = this,
				wrap = $(this.wrapperClass),
				posts = $(response.data);

			if ( ( 'load_more' !== self.settings.pagination && 'scroll' !== self.settings.pagination ) || self.isFiltering ) {
				wrap.isotope('remove', $(this.postClass));
			}

			if (!this.masonry) {
				wrap.isotope('insert', $(response.data), $.proxy(this._gridLayoutMatchHeight, this));
				wrap.imagesLoaded($.proxy(function () {
					setTimeout(function () {
						self._gridLayoutMatchHeight();
					}, 150);
				}, this));
			} else {
				wrap.isotope('insert', $(response.data));
			}
			
			wrap.find('.pp-grid-space').remove();
			wrap.append('<div class="pp-grid-space"></div>');

			wrap.imagesLoaded($.proxy(function () {
				setTimeout(function () {
					if (!this.masonry) {
						self._gridLayoutMatchHeight();
					}
					wrap.isotope('layout');
				}, 500);
			}, this));

			if (response.pagination) {
				var $pagination = $(response.pagination);

				if ( 'load_more' === self.settings.pagination || 'scroll' === self.settings.pagination ) {
					$pagination.hide();
				}

				$(self.nodeClass).find('.fl-builder-pagination').remove();
				$(self.nodeClass).find('.fl-module-content').append($pagination);
				$(self.nodeClass).find('.pp-ajax-pagination a').off('click').on('click', function (e) {
					e.preventDefault();
					var pageNumber = self._getPageNumber( this );
					self.currentPage = pageNumber;
					self._getPosts(args.term, args.isotopeData, pageNumber);
				});
			} else {
				$(self.nodeClass).find('.fl-builder-pagination').remove();
			}

			if ( ('load_more' !== self.settings.pagination && 'scroll' !== self.settings.pagination) || self.isFiltering ) {
				var offsetTop = wrap.offset().top - 200;
				$('html, body').stop().animate({
					scrollTop: offsetTop
				}, 300);
			}

			if ( self.isFiltering ) {
				self.isFiltering = false;
				$(self.nodeClass).trigger( 'grid.filter.complete' );
			}
			wrap.removeClass('pp-is-filtering');

			$(self.nodeClass).trigger('grid.rendered');
		},

		_getPageNumber: function( pageElement )
		{
			var pageNumber = parseInt( $(pageElement).text() ); //$(pageElement).attr('href').split('#page-')[1];

			if ( $(pageElement).hasClass('next') ) {
				pageNumber = parseInt( $(pageElement).parents('.pp-content-grid-pagination').find('.current').text() ) + 1;
			}
			if ( $(pageElement).hasClass('previous') ) {
				pageNumber = parseInt( $(pageElement).parents('.pp-content-grid-pagination').find('.current').text() ) - 1;
			}

			return pageNumber;
		},

		_setCacheData: function (filter, response, paged) {
			if ('undefined' === typeof filter || '' === filter) {
				filter = 'all';
			}
			if ('undefined' === typeof paged || !paged) {
				paged = 1;
			}

			if ('undefined' === typeof this.cacheData.ajaxCache) {
				this.cacheData.ajaxCache = {};
			}
			if ('undefined' === typeof this.cacheData.ajaxCache[filter]) {
				this.cacheData.ajaxCache[filter] = {};
			}
			if ('undefined' === typeof this.cacheData.ajaxCache[filter].page) {
				this.cacheData.ajaxCache[filter].page = {};
			}

			this.cacheData.ajaxCache[filter].page[paged] = response;
		},

		_getCacheData: function (filter) {
			var cacheData = this.cacheData;

			if ('undefined' === typeof cacheData.ajaxCache) {
				cacheData.ajaxCache = {};
			}

			return cacheData.ajaxCache[filter];
		},

		_gridLayoutMatchHeight: function()
		{
			var highestBox = 0;
			var contentHeight = 0;
			var postElements = $(this.postClass + ':visible');
			var columns = this.settings.postColumns.desktop;

			if (! this.matchHeight || 1 === columns) {
				return;
			}

			if ( 'style-9' === this.style ) {
				return;
			}

			if ( this.settings.layout === 'grid' ) {
				if ( this.masonry ) {
					return;
				}

				if (window.innerWidth <= 980) {
					columns = this.settings.postColumns.tablet;
				}
				if (window.innerWidth <= 767) {
					columns = this.settings.postColumns.mobile;
				}

				if ( 1 === columns ) {
					return;
				}

				postElements.css('height', 'auto');

				var rows = Math.round(postElements.length / columns);

				if ( postElements.length % columns > 0 ) {
					rows = rows + 1;
				}

				// range.
				var j = 1,
					k = columns;

				for( var i = 0; i < rows; i++ ) {
					// select number of posts in the current row.
					var postsInRow = $(this.postClass + ':visible:nth-child(n+' + j + '):nth-child(-n+' + k + ')');

					// get height of the larger post element within the current row.
					postsInRow.css('height', '').each(function () {
						if ($(this).height() > highestBox) {
							highestBox = $(this).height();
							contentHeight = $(this).find('.pp-content-post-data').outerHeight();
						}
					});
					// apply the height to all posts in the current row.
					postsInRow.height(highestBox);

					// increment range.
					j = k + 1;
					k = k + columns;
					if ( k > postElements.length ) {
						k = postElements.length;
					}
				}
			} else {
				// carousel layout.
				postElements.css('height', '').each(function(){

					if($(this).height() > highestBox) {
						highestBox = $(this).height();
						contentHeight = $(this).find('.pp-content-post-data').outerHeight();
					}
				});

				postElements.height(highestBox);
			}
            //$(this.postClass).find('.pp-content-post-data').css('min-height', contentHeight + 'px').addClass('pp-content-relative');
		},

		_gridLayoutMatchHeightSimple: function () {
			if ( ! this.matchHeight ) {
				return;
			}

			if ( 'style-9' === this.style ) {
				return;
			}

			var highestBox = 0;
			var contentHeight = 0;
			var postElements = $(this.postClass);

			var columns = this.settings.postColumns.desktop;

			if (window.innerWidth <= 980) {
				columns = this.settings.postColumns.tablet;
			}
			if (window.innerWidth <= 767) {
				columns = this.settings.postColumns.mobile;
			}

			if ( 1 === columns && this.settings.layout === 'grid' ) {
				return;
			}

			postElements.css('height', '').each(function () {

				if ($(this).height() > highestBox) {
					highestBox = $(this).height();
					contentHeight = $(this).find('.pp-content-post-data').outerHeight();
				}
			});

			postElements.height(highestBox);
		},

		_initPagination: function()
		{
			var self = this;

			setTimeout(function() {
				self._getTotalPages();

				if ( self.settings.pagination === 'load_more' ) {
					self._initLoadMore();
				}
				if ( self.settings.pagination === 'scroll' && typeof FLBuilder === 'undefined' ) {
					self._initScroll();
				}
			}, 500);
		},

		_getTotalPages: function()
		{
			var pages = $( this.nodeClass + ' .pp-content-grid-pagination' ).find( 'li .page-numbers:not(.next)' );

			if ( pages.length > 1) {
				var total = pages.last().text().replace( /\D/g, '' )
				this.totalPages = parseInt( total );
			} else {
				this.totalPages = 1;
			}

			return this.totalPages;
		},

		_initLoadMore: function()
		{
			var self 		= this,
				$button 	= $(this.nodeClass).find('.pp-grid-load-more-button'),
				currentPage = self.currentPage,
				isAjaxPagination = 'dynamic' === self.filterType;

			$button.on('click', function(e) {
				e.preventDefault();

				$(this).addClass('disabled loading');
				self.isFiltering = false;

				currentPage = parseInt( currentPage ) + 1;

				self._getPosts(self.activeFilter, self.filterData, currentPage);
				self.currentPage = currentPage;
			});

			$(self.nodeClass).on('grid.rendered', function() {
				$button.removeClass( 'disabled loading' );

				if ( currentPage >= self.totalPages ) {
					$button.parent().hide();
				}
			});

			// Reset pagination index on filter.
			$(self.nodeClass).on('grid.filter.complete', function() {
				if ( $(self.nodeClass).find( '.pp-content-grid-pagination' ).length > 0 ) {
					self._getTotalPages();
					self.currentPage = currentPage = 1;
					$button.parent().show();
				} else {
					$button.parent().hide();
				}
			});
		},

		_initScroll: function()
		{
			var	self			= this,
				gridOffset 		= $(this.wrapperClass).offset(),
				gridHeight		= $(this.wrapperClass).height(),
				winHeight		= $(window).height(),
				currentPage 	= this.currentPage,
				activeFilter	= self.activeFilter,
				rendered		= false,
				loaded			= false;

			if ( ! self.filters || 'dynamic' !== self.filterType ) {
				activeFilter = '';
			}

			$(window).on('scroll', $.proxy( function() {
				if ( loaded ) {
					return;
				}
				var scrollPos = $(window).scrollTop();

				if ( scrollPos >= gridOffset.top - ( winHeight - gridHeight ) ) {
					self.isFiltering = false;
					currentPage = parseInt( currentPage ) + 1;

					$(self.nodeClass).find('.pp-content-grid-loader').show();

					if ( currentPage <= self.totalPages ) {
						loaded = true;
						self._getPosts(activeFilter, self.filterData, currentPage);
					} else {
						loaded = true;
						$(self.nodeClass).find('.pp-content-grid-loader').hide();
					}

					self.currentPage = currentPage;
				}
			}, this ) );

			$(self.nodeClass).on('grid.filter.change', function() {
				// re-assign active filter.
				if ( self.filters && 'dynamic' === self.filterType ) {
					activeFilter = self.activeFilter
				}
				
				// get container height.
				gridHeight = $(self.wrapperClass).height();
				self._gridLayoutMatchHeightSimple();

				$(self.wrapperClass).isotope('layout');

				if ( 'dynamic' === self.filterType ) {
					self._getTotalPages();
					self.currentPage = currentPage = 1;
					loaded = false;
				}
			});

			$(self.nodeClass).on('grid.rendered', function() {
				// get gridHeight again after render.
				gridHeight = $(self.wrapperClass).height();

				if ( ! rendered ) {
					self._getTotalPages();
				}
				
				$(self.nodeClass).find('.pp-content-grid-loader').hide();

				setTimeout(function() {
					self._gridLayoutMatchHeightSimple();
					$(self.wrapperClass).isotope('layout');
				}, 500);

				// set loaded flag.
				if ( currentPage >= self.totalPages ) {
					loaded = true;
				} else {
					loaded = false;
				}

				rendered = true;
			});

			// Reset pagination index on filter.
			$(self.nodeClass).on('grid.filter.complete', function() {
				if ( $(self.nodeClass).find( '.pp-content-grid-pagination' ).length > 0 ) {
					self._getTotalPages();
					self.currentPage = currentPage = 1;
				}
			});
		},

		_reLayout: function()
		{
			var self = this;

			$(document).on('sf:ajaxfinish', '.searchandfilter', function(){
				self._gridLayout();
			});
		}
	};

})(jQuery);


var ppcg_5d52f2961f124 = '';

;(function($) {
	var left_arrow_svg = '<svg aria-hidden="true" data-prefix="fal" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-left fa-w-6 fa-2x"><path fill="currentColor" d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z" class=""></path></svg>';
	var right_arrow_svg = '<svg aria-hidden="true" data-prefix="fal" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-right fa-w-6 fa-2x"><path fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" class=""></path></svg>';

	var PPContentGridOptions = {
		id: '5d52f2961f124',
		layout: 'grid',
		style: 'style-8',
		ajaxUrl: 'http://olle.dyndns-ip.com/hamnen_wordpress/wp-admin/admin-ajax.php',
		perPage: '4',
		fields: {"layout":"grid","post_grid_style_select":"style-8","custom_layout":{"html":"[wpbb-if post:featured_image]\n<div class=\"pp-content-grid-post-image\">\n\t[wpbb post:featured_image size=\"large\" display=\"tag\" linked=\"yes\"]\n<\/div>\n[\/wpbb-if]\n\n<div class=\"pp-content-grid-post-text\">\n\n    <h3 class=\"pp-content-grid-post-title\">[wpbb post:link text=\"title\"]<\/h3>\n\n    <div class=\"pp-content-grid-post-meta\">\n    \t[wpbb post:date format=\"F j, Y\"]\n\t\t<span class=\"pp-content-grid-post-meta-sep\"> | <\/span>\n\t\t[wpbb post:terms_list taxonomy=\"category\" separator=\", \"]\n    <\/div>\n\n\t<div class=\"pp-content-grid-separator\"><\/div>\n\n    <div class=\"pp-content-grid-post-excerpt\">\n    \t[wpbb post:excerpt length=\"17\" more=\"...\"]\n    <\/div>\n\n    <div class=\"pp-content-grid-post-more-link\">\n    \t<a href=\"[wpbb post:url]\"><span class=\"fa fa-angle-right\"><\/span> Read More<\/a>\n    <\/div>\n\n<\/div>\n","css":".pp-content-grid-post {\n    font-size: 14px;\n}\n.pp-content-grid-post-image {\n    padding: 20px;\n    padding-bottom: 0;\n}\n.pp-content-grid-post-text {\n    padding: 20px;\n}\n.pp-content-grid-post-title {\n    font-size: 20px;\n\tline-height: 26px;\n\tmargin: 0;\n\tpadding: 0;\n}\n.pp-content-grid-post-meta {\n    padding: 0;\n}\n.pp-content-grid-post-meta a {\n    text-decoration: none;\n}\n.pp-content-grid-post-meta,\n.pp-content-grid-post-meta a {\n    color: #888;\n    font-size: 12px;\n}\n.pp-content-grid-post-meta a:hover {\n    color: #000;\n}\n.pp-content-grid-separator {\n    min-height: 2px;\n    width: 60px;\n    background: #000;\n    margin-top: 10px;\n    margin-bottom: 20px;\n}\n"},"match_height":"no","custom_height":"275","custom_height_medium":"","custom_height_responsive":"","total_post":"custom","total_posts_count":"4","posts_per_page":"4","exclude_current_post":"yes","post_grid_count":{"desktop":"2","tablet":"1","mobile":"1"},"post_spacing":"2","auto_play":"yes","stop_on_hover":"no","lazy_load":"no","slides_center_align":"no","transition_speed":"2","slides_speed":"","slide_loop":"yes","slider_pagination":"yes","slider_navigation":"no","post_slider_arrow_font_size":"30","arrow_color":"000000","arrow_hover_color":"eeeeee","arrow_bg_color":"","arrow_bg_hover_color":"","arrow_border":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"arrow_border_hover_color":"","post_slider_dot_bg_color":"666666","post_slider_dot_bg_hover":"000000","post_slider_dot_width":"10","post_slider_dot_border_radius":"100","post_bg_color":"f1f1f1","post_bg_color_hover":"","post_content_alignment":"left","field_separator_1":"","post_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"4","top_right":"4","bottom_left":"4","bottom_right":"4"},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"post_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"post_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"show_image_effect":"yes","image_effect_opacity":"","image_effect_brightness":"","image_effect_contrast":"","image_effect_saturate":"","image_effect_hue_rotate":"","image_effect_grayscale":"","image_effect_blur":"","image_effect_sepia":"","image_effect_invert":"","image_effect_opacity_hover":"","image_effect_brightness_hover":"","image_effect_contrast_hover":"","image_effect_saturate_hover":"","image_effect_hue_rotate_hover":"","image_effect_grayscale_hover":"","image_effect_blur_hover":"","image_effect_sepia_hover":"","image_effect_invert_hover":"","post_title_divider_color":"333333","post_category_bg_color":"000000","post_category_text_color":"ffffff","post_category_position":"left","post_title_overlay_color":"000000","post_title_overlay_opacity":"50","post_date_day_bg_color":"f9f9f9","post_date_day_text_color":"888888","post_date_month_bg_color":"000000","post_date_month_text_color":"ffffff","post_date_bg_color":"000000","post_date_text_color":"ffffff","post_date_border_radius":"2","product_rating_color":"000000","product_price_color":"000000","button_width":"default","button_bg_color":"666666","button_bg_hover_color":"000000","button_text_color":"ffffff","button_text_hover_color":"","button_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_hover_color":"eeeeee","button_margin":{"top":"10","bottom":"5"},"responsive_filter":"no","filter_alignment":"left","filter_margin":"10","filter_bg_color":"","filter_bg_color_active":"","filter_text_color":"333333","filter_text_color_active":"000000","filter_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_hover_color":"","filter_toggle_bg":"ffffff","filter_toggle_color":"444444","filter_toggle_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination":"numbers","load_more_text":"Load More","no_results_message":"Sorry, we couldn't find any posts. Please try a different search.","show_search":"no","pagination_nofollow":"no","pagination_align":"left","pagination_spacing_v":"14","pagination_spacing":"5","pagination_bg_color":"ffffff","pagination_bg_color_hover":"eeeeee","pagination_color":"000000","pagination_color_hover":"","pagination_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"title_tag":"h3","title_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"left","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_font_color":"","title_margin":{"top":"5","bottom":"5"},"content_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_font_color":"","description_margin":{"top":"5","bottom":"5"},"meta_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"meta_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"meta_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"post_meta_font_color":"606060","post_meta_bg_color":"333","event_date_color":"","event_date_case":"default","field_separator_e1":"","event_venue_color":"","field_separator_e2":"","event_cost_color":"","button_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"button_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"button_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"pagination_font_size":"14","pagination_font_size_medium":"","pagination_font_size_responsive":"","responsive_display":"","visibility_display":"","visibility_user_capability":"","visibility_logic":"[]","animation":{"style":"","delay":"0","duration":"1"},"container_element":"div","id":"","class":"","arrow_padding_top":"10","arrow_padding_right":"10","arrow_padding_bottom":"10","arrow_padding_left":"10","post_grid_padding_top":"0","post_grid_padding_top_medium":"","post_grid_padding_top_responsive":"","post_grid_padding_right":"0","post_grid_padding_right_medium":"","post_grid_padding_right_responsive":"","post_grid_padding_bottom":"0","post_grid_padding_bottom_medium":"","post_grid_padding_bottom_responsive":"","post_grid_padding_left":"0","post_grid_padding_left_medium":"","post_grid_padding_left_responsive":"","post_content_padding_top":"10","post_content_padding_top_medium":"","post_content_padding_top_responsive":"","post_content_padding_right":"10","post_content_padding_right_medium":"","post_content_padding_right_responsive":"","post_content_padding_bottom":"10","post_content_padding_bottom_medium":"","post_content_padding_bottom_responsive":"","post_content_padding_left":"16","post_content_padding_left_medium":"","post_content_padding_left_responsive":"","button_padding_top":"10","button_padding_top_medium":"","button_padding_top_responsive":"","button_padding_right":"10","button_padding_right_medium":"","button_padding_right_responsive":"","button_padding_bottom":"10","button_padding_bottom_medium":"","button_padding_bottom_responsive":"","button_padding_left":"10","button_padding_left_medium":"","button_padding_left_responsive":"","filter_padding_top":"8","filter_padding_right":"8","filter_padding_bottom":"8","filter_padding_left":"8","pagination_padding_top":"10","pagination_padding_right":"10","pagination_padding_bottom":"10","pagination_padding_left":"10","margin_top":"","margin_unit":"px","margin_top_medium":"","margin_medium_unit":"px","margin_top_responsive":"","margin_responsive_unit":"px","margin_right":"0","margin_right_medium":"","margin_right_responsive":"","margin_bottom":"","margin_bottom_medium":"","margin_bottom_responsive":"","margin_left":"0","margin_left_medium":"","margin_left_responsive":"","type":"pp-content-grid","connections":{"arrow_color":"","arrow_hover_color":"","arrow_bg_color":"","arrow_bg_hover_color":"","arrow_border_hover_color":"","post_slider_dot_bg_color":"","post_slider_dot_bg_hover":"","custom_content":"","more_link_text":"","all_filter_label":"","post_bg_color":"","post_bg_color_hover":"","post_title_divider_color":"","post_category_bg_color":"","post_category_text_color":"","post_title_overlay_color":"","post_date_day_bg_color":"","post_date_day_text_color":"","post_date_month_bg_color":"","post_date_month_text_color":"","post_date_bg_color":"","post_date_text_color":"","product_rating_color":"","product_price_color":"","button_bg_color":"","button_bg_hover_color":"","button_text_color":"","button_text_hover_color":"","button_border_hover_color":"","filter_bg_color":"","filter_bg_color_active":"","filter_text_color":"","filter_text_color_active":"","filter_border_hover_color":"","filter_toggle_bg":"","filter_toggle_color":"","pagination_bg_color":"","pagination_bg_color_hover":"","pagination_color":"","pagination_color_hover":"","title_font_color":"","content_font_color":"","post_meta_font_color":"","post_meta_bg_color":"","event_date_color":"","event_venue_color":"","event_cost_color":""},"data_source":"custom_query","data_source_acf_relational_type":"relationship","data_source_acf_relational_key":"","post_type":"post","order_by":"date","order_by_meta_key":"","order":"DESC","offset":"0","posts_post_matching":"0","posts_post":"27060,26799","tax_post_category_matching":"related","tax_post_category":"","tax_post_post_tag_matching":"1","tax_post_post_tag":"","posts_page_matching":"1","posts_page":"","posts_hamnenplay_matching":"1","posts_hamnenplay":"","users_matching":"1","users":"","show_title":"yes","show_content":"no","content_type":"excerpt","custom_content":"","content_length":"300","more_link_type":"box","more_link_text":"Read More","post_grid_filters_display":"no","post_grid_filters_type":"dynamic","post_grid_filters":"category","all_filter_label":"All","show_image":"yes","image_thumb_size":"large","image_thumb_crop":"landscape","fallback_image":"default","fallback_image_custom":"","show_author":"no","show_date":"no","show_categories":"no","post_taxonomies":"category","meta_separator":" | ","as_values_posts_post":"","as_values_tax_post_category":"","as_values_tax_post_post_tag":"","as_values_posts_page":"","as_values_posts_hamnenplay":"","as_values_users":"","fallback_image_custom_src":""},
		pagination: 'numbers',
		current_page: 'http://olle.dyndns-ip.com/hamnen_wordpress/hamnen_wordpress/artiklar/motorbatar/brandskar-290-open-tradition-i-tuff-kostym/',
		page: '0',
		is_tax: false,
		is_author: false,
		postSpacing: '2',
		postColumns: {
			desktop: 2,
			tablet: 1,
			mobile: 1,
		},
		matchHeight: 'no',
		filters: false,
					filterTax: 'category',
			filterType: 'dynamic',
						masonry: 'yes',
					};

	
	
	
	
	ppcg_5d52f2961f124 = new PPContentGrid( PPContentGridOptions );
	
	// expandable row fix.
	var state = 0;
	$(document).on('pp_expandable_row_toggle', function(e, selector) {
		if ( selector.is('.pp-er-open') && state === 0 ) {
			ppcg_5d52f2961f124 = new PPContentGrid( PPContentGridOptions );
			state = 1;
		}
	});

	// Tabs and Content Grid fix
	var tabs_state = false;
	$(document).on('pp-tabs-switched', function(e, selector) {
		if ( selector.find('.pp-content-post-grid').length > 0 && ! tabs_state ) {
			if ( 'undefined' !== typeof $.fn.isotope ) {
				setTimeout(function() {
					selector.find('.pp-content-post-grid').isotope('layout');
					tabs_state = true;
				}, 500);
			}
		}
	});

})(jQuery);
jQuery(function($) {
	
	$(function() {
		$( '.fl-node-5d51bc6d57270 .fl-photo-img' )
			.on( 'mouseenter', function( e ) {
				$( this ).data( 'title', $( this ).attr( 'title' ) ).removeAttr( 'title' );
			} )
			.on( 'mouseleave', function( e ){
				$( this ).attr( 'title', $( this ).data( 'title' ) ).data( 'title', null );
			} );
	});
});

/* Start Global Node Custom JS */

/* End Global Node Custom JS */


/* Start Layout Custom JS */

/* End Layout Custom JS */

	;(function($) {
				var url ='http://olle.dyndns-ip.com/hamnen_wordpress/wp-content/plugins/bb-ultimate-addon/assets/js/particles.min.js';
				window.particle_js_loaded = 0;

				$.cachedScript = function( url, options ) {

					// Allow user to set any option except for dataType, cache, and url.
					options = $.extend( options || {}, {
						dataType: "script",
						cache: true,
						url: url
					});
					// Return the jqXHR object so we can chain callbacks.
					return $.ajax( options );
				};

				if ( $( '.uabb-row-particles-background' ).length ) {

					$.cachedScript( url ).done( function( script, textStatus ) {					
						window.particle_js_loaded = 1;
						init_particles_row_background_script();

					});
				}
			function init_particles_row_background_script() {

									row_id = '5d5131be40122';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-row-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
													} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d51279e890be';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-row-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
													} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d51209549a17';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-row-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
													} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
						}
		})(jQuery);
		;(function($){
		$( document ).on( 'change', 'select[name=uabb_row_particles_style]', function() {
			_hideFields();
		});
		$( document ).on( 'change', 'select[name=enable_particles]', function() {
			_hideFields();
		});
		$( document ).on( 'change', 'select[name=uabb_row_particles_settings]', function() {
			_hideFields();
		});

		$( document ).on( 'init', '.fl-builder-settings', function() {
			_hideFields();
		});
		function _hideFields() { 

			var form = $('.fl-builder-settings');

			var branding = 'no';

			if ( form.length > 0 ) {

				enable_particle = form.find( 'select[name=enable_particles]' ).val();

				if ( 'no' === enable_particle ) {

					form.find('#fl-field-uabb_particles_direction').hide();
					form.find('#fl-field-uabb_particles_custom_code').hide();
					form.find('#fl-field-uabb_row_particles_style').hide();
					form.find('#fl-field-uabb_row_particles_color').hide();
					form.find('#fl-field-uabb_row_particles_color_opacity').hide();
					form.find('#fl-field-uabb_row_particles_settings').hide();
					form.find('#fl-field-uabb_row_particles_interactive_settings').hide();
					form.find('#fl-field-uabb_row_particles_size').hide();
					form.find('#fl-field-uabb_row_particles_speed').hide();
					form.find('#fl-field-uabb_row_number_particles').hide();

				} else {
					if ( 'snow' === form.find('select[name=uabb_row_particles_style]').val() ) {
						form.find('#fl-field-uabb_row_particles_style').show();
						form.find('#fl-field-uabb_row_particles_color').show();
						form.find('#fl-field-uabb_row_particles_color_opacity').show();
						form.find('#fl-field-uabb_row_particles_settings').show();
						form.find('#fl-field-uabb_particles_direction').show();
						form.find('#fl-field-uabb_particles_custom_code').hide();
						if (  'yes' === form.find('select[name=uabb_row_particles_settings]').val() ) {
							form.find('#fl-field-uabb_row_particles_size').show();
							form.find('#fl-field-uabb_row_particles_speed').show();
							form.find('#fl-field-uabb_row_number_particles').show();
							form.find('#fl-field-uabb_row_particles_interactive_settings').show();
						} else {
							form.find('#fl-field-uabb_row_particles_size').hide();
							form.find('#fl-field-uabb_row_particles_speed').hide();
							form.find('#fl-field-uabb_row_particles_interactive_settings').hide();
							form.find('#fl-field-uabb_row_number_particles').hide();
						}
					}
					if ( 'custom' === form.find('select[name=uabb_row_particles_style]').val() ) {

						form.find('#fl-field-uabb_particles_custom_code').show();
						form.find('#fl-field-uabb_particles_direction').hide();
						form.find('#fl-field-uabb_row_particles_style').show();
						form.find('#fl-field-uabb_row_particles_color').hide();
						form.find('#fl-field-uabb_row_particles_color_opacity').hide();
						form.find('#fl-field-uabb_row_particles_settings').hide();
						form.find('#fl-field-uabb_row_particles_interactive_settings').hide();
						form.find('#fl-field-uabb_row_particles_size').hide();
						form.find('#fl-field-uabb_row_particles_speed').hide();
						form.find('#fl-field-uabb_row_number_particles').hide();
					}
					if ( 'nasa' === form.find('select[name=uabb_row_particles_style]').val() || 'default' === form.find('select[name=uabb_row_particles_style]').val() ) {
						form.find('#fl-field-uabb_row_particles_style').show();
						form.find('#fl-field-uabb_row_particles_color').show();
						form.find('#fl-field-uabb_row_particles_color_opacity').show();
						form.find('#fl-field-uabb_row_particles_settings').show();
						form.find('#fl-field-uabb_row_particles_interactive_settings').show();
						form.find('#fl-field-uabb_particles_custom_code').hide();
						form.find('#fl-field-uabb_particles_direction').hide();

						if (  'yes' === form.find('select[name=uabb_row_particles_settings]').val() ) {
							form.find('#fl-field-uabb_row_particles_size').show();
							form.find('#fl-field-uabb_row_particles_speed').show();
							form.find('#fl-field-uabb_row_number_particles').show();
							form.find('#fl-field-uabb_row_particles_interactive_settings').show();
						} else {
							form.find('#fl-field-uabb_row_particles_size').hide();
							form.find('#fl-field-uabb_row_particles_speed').hide();
							form.find('#fl-field-uabb_row_number_particles').hide();
							form.find('#fl-field-uabb_row_particles_interactive_settings').hide();
						}
					}
					if ( 'custom' === form.find('select[name=uabb_row_particles_style]').val() ) {

						style_selector = form.find( '#fl-field-uabb_row_particles_style' );

						wrapper =	style_selector.find( '.fl-field-control-wrapper' );

						if ( wrapper.find( '.fl-field-description' ).length === 0 ) {

							if ( 'no' === branding ) {

								style_selector.find( '.fl-field-control-wrapper' ).append( '<span class="fl-field-description uabb-particle-docs-list"><div class="uabb-docs-particle"> Add custom JSON for the Particles Background below. To generate a completely customized background style follow steps below - </div><div class="uabb-docs-particle">1. Visit a link <a class="uabb-docs-particle-link" href="https://vincentgarreau.com/particles.js/" target="_blank"> here </a> and choose required attributes for particles</div><div class="uabb-docs-particle">2. Once a custom style is created, download JSON from "Download current config (json)" link</div><div class="uabb-docs-particle">3. Copy JSON code from the above file and paste it below</div><div class="uabb-docs-particle">To know more about creating a custom style, refer to a document <a class="uabb-docs-particle-link" href="https://www.ultimatebeaver.com/docs/custom-particle-backgrounds/?utm_source=uabb-pro-backend&utm_medium=row-editor-screen&utm_campaign=particle-backgrounds-row" target="_blank" rel="noopener"> here. </a></div></span>' );

							} else {

								style_selector.find( '.fl-field-control-wrapper' ).append( '<span class="fl-field-description uabb-particle-docs-list"><div class="uabb-docs-particle"> Add custom JSON for the Particles Background below. To generate a completely customized background style follow steps below - </div><div class="uabb-docs-particle">1. Visit a link <a class="uabb-docs-particle-link" href="https://vincentgarreau.com/particles.js/" target="_blank"> here </a> and choose required attributes for particles</div><div class="uabb-docs-particle">2. Once a custom style is created, download JSON from "Download current config (json)" link</div><div class="uabb-docs-particle">3. Copy JSON code from the above file and paste it below</div></span>' );
							}

						} else {
							wrapper.find( '.fl-field-description' ).show();
						}
					} else {

						style_selector = form.find( '#fl-field-uabb_row_particles_style' );

						wrapper =	style_selector.find( '.fl-field-control-wrapper' );

						wrapper.find( '.fl-field-description' ).hide();
					}
				}
			}
		}
	})(jQuery);
		;(function($) {
			var url ='http://olle.dyndns-ip.com/hamnen_wordpress/wp-content/plugins/bb-ultimate-addon/assets/js/particles.min.js';
				window.particle_js_loaded = 0;

				$.cachedScript = function( url, options ) {

					// Allow user to set any option except for dataType, cache, and url.
					options = $.extend( options || {}, {
						dataType: "script",
						cache: true,
						url: url
					});

					// Return the jqXHR object so we can chain callbacks.
					return $.ajax( options );
				};
				if ( $( '.uabb-col-particles-background' ).length ) {

					$.cachedScript( url ).done( function( script, textStatus ) {					
						window.particle_js_loaded = 1;
						init_particles_col_background_script();

					});
				}

			function init_particles_col_background_script() {

									row_id = '5d5131be5349a';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d51bd5029da4';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d51279ec5675';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d51bd42e5cc4';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d5139b1e9ad0';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d51395c3db1f';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d754d1c8ca16';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d51209549a21';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d51ca6a039fb';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d51ca6a03a01';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d5147de7a93b';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
								row_id = '5d5279e7d9f6f';

					nodeclass = '.fl-node-' + row_id;

					var nodeClass  	= jQuery( '.fl-node-' + row_id );

					particle_selector = nodeClass.find( '.uabb-col-particles-background' );

					if ( particle_selector.length > 0 ) {

						data_particles = particle_selector.data( 'particle' );
						enable_particles = data_particles.enable_particles;
						particles_style =  data_particles.particles_style;
						particles_dot_color = data_particles.particles_dot_color;
						number_particles = data_particles.number_particles;
						particles_size = data_particles.particles_size;
						particles_speed = data_particles.particles_speed;
						interactive_settings = data_particles.interactive_settings;
						advanced_settings = data_particles.advanced_settings;
						particles_opacity = data_particles.particles_opacity;
						particles_direction = data_particles.particles_direction;
						row_id = data_particles.id;

						if ( 'yes' === enable_particles ){
							if ( 'custom' === particles_style ) {
															} else {
								var number_value = 150,
									shape_type = 'circle',
									shape_nb_sides = 5,
									opacity_value = 0.6,
									opacity_random = true,
									opacity_anim_enable  = false,
									line_linked = false,
									move_speed = 4,
									move_random = true,
									size_value = 2,
									size_random = true,
									size_anim_enable  = false,
									onhover = 'repulse',
									move_direction = 'none',
									interactive = false;
								if ( 'default' === particles_style ) {
									line_linked = true;
									opacity_random = false;
									move_random = false;
									move_speed = 6;
								} else if( 'nasa' == particles_style ) {
									number_value = 160;
									shape_type = 'circle';
									opacity_value = 1;
									opacity_anim_enable  = true;
									move_speed = 1;
									size_value = 3;
									onhover = 'bubble';
								} else if ( 'snow' == particles_style ) {
									opacity_value = 0.5;
									size_value = 4;
									move_speed = 3;
									move_direction = particles_direction;
									number_value = 200;
									opacity_random = false;
								}  else if ( 'flow' == particles_style ) {
									number_value = 14;
									shape_type = 'polygon';
									shape_nb_sides = 6;
									opacity_value = 0.3;
									move_speed = 5;
									size_value = 40;
									size_random = false;
									size_anim_enable  = true;

								} else if( 'bubble' == particles_style ) {
									move_speed = 5;
									move_direction = 'top';
									number_value = 500;
									size_value = 1;
									size_random = false;
									opacity_value = 0.6;
									opacity_random = false;
								}
								if( particles_dot_color == '' ) {
									particles_dot_color = '#bdbdbd';
								}
								if( particles_opacity != '' || particles_opacity == '0' ) {
									opacity_value = particles_opacity;
								}
								if ( 'yes' === advanced_settings ) {

									if( number_particles != '' ) {
										number_value = number_particles;
									}

									if( particles_size !== '' ) {
										size_value = particles_size;
									}

									if( particles_speed !== '' ) {
										move_speed = particles_speed;
									}
								}
								if ( interactive_settings == 'yes' ) {
									interactive = true;
								}
								var config = {
									"particles": {
										"number": {
											"value": number_value,
											"density": {
												"enable": true,
												"value_area": 800
											}
										},
										"color": {
											"value": particles_dot_color
										},
										"shape": {
											"type": shape_type,
											"stroke": {
												"width": 0,
												"color": "#ffffff"
											},
											"polygon": {
												"nb_sides": shape_nb_sides
											},
										},
										"opacity": {
											"value": opacity_value,
											"random": opacity_random,
											"anim": {
												"enable": opacity_anim_enable,
												"speed": 1,
												"opacity_min": 0.1,
												"sync": false
											}
										},
										"size": {
											"value": size_value,
											"random": size_random,
											"anim": {
												"enable": size_anim_enable,
												"speed": 5,
												"size_min": 35,
												"sync": false
											}
										},
										"line_linked": {
											"enable": line_linked,
											"distance": 150,
											"color": particles_dot_color,
											"opacity": 0.4,
											"width": 1
										},
										"move": {
											"enable": true,
											"speed": move_speed,
											"direction": move_direction,
											"random": move_random,
											"straight": false,
											"out_mode": "out",
											"attract": {
											"enable": false,
											"rotateX": 600,
											"rotateY": 1200
											}
										}
									},
									"interactivity": {
										"detect_on": "canvas",
										"events": {
											"onhover": {
												"enable": interactive,
												"mode": onhover,
											},
											"onclick": {
												"enable": false,
												"mode": "push"
											},
											"resize": true
										},
										"modes": {
											"grab": {
												"distance": 400,
												"line_linked": {
													"opacity": 1
												}
											},
											"bubble": {
												"distance": 200,
												"size": 0,
												"duration": 2,
												"opacity": 0,
												"speed": 2
											},
											"repulse": {
												"distance": 150
											},
											"push": {
												"particles_nb": 4
											},
											"remove": {
												"particles_nb": 2
											}
										}
									},
								"retina_detect": true
								}
								particlesJS( 'uabb-particle-' + row_id, config );
							}
						}
					}
						}
		})(jQuery);
		;(function($){
		$( document ).on( 'change', 'select[name=uabb_col_particles_style]', function() {
			_hideFields();
		});
		$( document ).on( 'change', 'select[name=enable_particles_col]', function() {
			_hideFields();
		});
		$( document ).on( 'change', 'select[name=uabb_col_particles_settings]', function() {
			_hideFields();
		});

		$( document ).on( 'init', '.fl-builder-settings', function() {
			_hideFields();
		});
		function _hideFields() {

			var form = $('.fl-builder-settings');

			var branding = 'no';

			if ( form.length > 0 ) {

				enable_particle = form.find( 'select[name=enable_particles_col]' ).val();

				if ( 'no' === enable_particle ) {

					form.find('#fl-field-uabb_particles_direction_col').hide();
					form.find('#fl-field-uabb_particles_custom_code_col').hide();
					form.find('#fl-field-uabb_col_particles_style').hide();
					form.find('#fl-field-uabb_col_particles_color').hide();
					form.find('#fl-field-uabb_col_particles_color_opacity').hide();
					form.find('#fl-field-uabb_col_particles_settings').hide();
					form.find('#fl-field-uabb_col_particles_interactive_settings').hide();
					form.find('#fl-field-uabb_col_particles_size').hide();
					form.find('#fl-field-uabb_col_particles_speed').hide();
					form.find('#fl-field-uabb_col_number_particles').hide();

				} else {
					if ( 'snow' === form.find('select[name=uabb_col_particles_style]').val() ) {
						form.find('#fl-field-uabb_col_particles_style').show();
						form.find('#fl-field-uabb_col_particles_color').show();
						form.find('#fl-field-uabb_col_particles_color_opacity').show();
						form.find('#fl-field-uabb_col_particles_settings').show();
						form.find('#fl-field-uabb_particles_direction_col').show();
						form.find('#fl-field-uabb_particles_custom_code_col').hide();
						if (  'yes' === form.find('select[name=uabb_col_particles_settings]').val() ) {
							form.find('#fl-field-uabb_col_particles_size').show();
							form.find('#fl-field-uabb_col_particles_speed').show();
							form.find('#fl-field-uabb_col_number_particles').show();
							form.find('#fl-field-uabb_col_particles_interactive_settings').show();
						} else {
							form.find('#fl-field-uabb_col_particles_size').hide();
							form.find('#fl-field-uabb_col_particles_speed').hide();
							form.find('#fl-field-uabb_col_number_particles').hide();
							form.find('#fl-field-uabb_col_particles_interactive_settings').hide();
						}
					}
					if ( 'custom' === form.find('select[name=uabb_col_particles_style]').val() ) {

						form.find('#fl-field-uabb_particles_custom_code_col').show();
						form.find('#fl-field-uabb_particles_direction_col').hide();
						form.find('#fl-field-uabb_col_particles_style').show();
						form.find('#fl-field-uabb_col_particles_color').hide();
						form.find('#fl-field-uabb_col_particles_color_opacity').hide();
						form.find('#fl-field-uabb_col_particles_settings').hide();
						form.find('#fl-field-uabb_col_particles_interactive_settings').hide();
						form.find('#fl-field-uabb_col_particles_size').hide();
						form.find('#fl-field-uabb_col_particles_speed').hide();
						form.find('#fl-field-uabb_col_number_particles').hide();
					}
					if ( 'nasa' === form.find('select[name=uabb_col_particles_style]').val() || 'default' === form.find('select[name=uabb_col_particles_style]').val() ) {
						form.find('#fl-field-uabb_col_particles_style').show();
						form.find('#fl-field-uabb_col_particles_color').show();
						form.find('#fl-field-uabb_col_particles_color_opacity').show();
						form.find('#fl-field-uabb_col_particles_settings').show();
						form.find('#fl-field-uabb_col_particles_interactive_settings').show();
						form.find('#fl-field-uabb_particles_custom_code_col').hide();
						form.find('#fl-field-uabb_particles_direction_col').hide();

						if (  'yes' === form.find('select[name=uabb_col_particles_settings]').val() ) {
							form.find('#fl-field-uabb_col_particles_size').show();
							form.find('#fl-field-uabb_col_particles_speed').show();
							form.find('#fl-field-uabb_col_number_particles').show();
							form.find('#fl-field-uabb_col_particles_interactive_settings').show();
						} else {
							form.find('#fl-field-uabb_col_particles_size').hide();
							form.find('#fl-field-uabb_col_particles_speed').hide();
							form.find('#fl-field-uabb_col_number_particles').hide();
							form.find('#fl-field-uabb_col_particles_interactive_settings').hide();
						}
					}
					if ( 'custom' === form.find('select[name=uabb_col_particles_style]').val() ) {

						style_selector = form.find( '#fl-field-uabb_col_particles_style' );

						wrapper =	style_selector.find( '.fl-field-control-wrapper' );

						if ( wrapper.find( '.fl-field-description' ).length === 0 ) {

							if ( 'no' === branding ) {

								style_selector.find( '.fl-field-control-wrapper' ).append( '<span class="fl-field-description uabb-particle-docs-list"><div class="uabb-docs-particle"> Add custom JSON for the Particles Background below. To generate a completely customized background style follow steps below - </div><div class="uabb-docs-particle">1. Visit a link <a class="uabb-docs-particle-link" href="https://vincentgarreau.com/particles.js/" target="_blank"> here </a> and choose required attributes for particles</div><div class="uabb-docs-particle">2. Once a custom style is created, download JSON from "Download current config (json)" link</div><div class="uabb-docs-particle">3. Copy JSON code from the above file and paste it below</div><div class="uabb-docs-particle">To know more about creating a custom style, refer to a document <a class="uabb-docs-particle-link" href="https://www.ultimatebeaver.com/docs/custom-particle-backgrounds/?utm_source=uabb-pro-backend&utm_medium=column-editor-screen&utm_campaign=particle-backgrounds-column" target="_blank" rel="noopener"> here. </a></div></span>' );

							} else {

								style_selector.find( '.fl-field-control-wrapper' ).append( '<span class="fl-field-description uabb-particle-docs-list"><div class="uabb-docs-particle"> Add custom JSON for the Particles Background below. To generate a completely customized background style follow steps below - </div><div class="uabb-docs-particle">1. Visit a link <a class="uabb-docs-particle-link" href="https://vincentgarreau.com/particles.js/" target="_blank"> here </a> and choose required attributes for particles</div><div class="uabb-docs-particle">2. Once a custom style is created, download JSON from "Download current config (json)" link</div><div class="uabb-docs-particle">3. Copy JSON code from the above file and paste it below</div></span>' );
							}

						} else {
							wrapper.find( '.fl-field-description' ).show();
						}
					} else {

						style_selector = form.find( '#fl-field-uabb_col_particles_style' );

						wrapper =	style_selector.find( '.fl-field-control-wrapper' );

						wrapper.find( '.fl-field-description' ).hide();
					}
				}
			}
		}
	})(jQuery);
	