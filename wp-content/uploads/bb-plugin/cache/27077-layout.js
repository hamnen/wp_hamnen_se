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
var wpAjaxUrl = 'http://olle.dyndns-ip.com/hamnen_wordpress/wp-admin/admin-ajax.php';var flBuilderUrl = 'http://olle.dyndns-ip.com/hamnen_wordpress/wp-content/plugins/bb-plugin/';var FLBuilderLayoutConfig = {
	anchorLinkAnimations : {
		duration 	: 1000,
		easing		: 'swing',
		offset 		: 100
	},
	paths : {
		pluginUrl : 'http://olle.dyndns-ip.com/hamnen_wordpress/wp-content/plugins/bb-plugin/',
		wpAjaxUrl : 'http://olle.dyndns-ip.com/hamnen_wordpress/wp-admin/admin-ajax.php'
	},
	breakpoints : {
		small  : 480,
		medium : 768	},
	waypoint: {
		offset: 80
	}
};
(function($){

	if(typeof FLBuilderLayout != 'undefined') {
		return;
	}

	/**
	 * Helper class with generic logic for a builder layout.
	 *
	 * @class FLBuilderLayout
	 * @since 1.0
	 */
	FLBuilderLayout = {

		/**
		 * Initializes a builder layout.
		 *
		 * @since 1.0
		 * @method init
		 */
		init: function()
		{
			// Destroy existing layout events.
			FLBuilderLayout._destroy();

			// Init CSS classes.
			FLBuilderLayout._initClasses();

			// Init backgrounds.
			FLBuilderLayout._initBackgrounds();

			// Only init if the builder isn't active.
			if ( 0 === $('.fl-builder-edit').length ) {

				// Init module animations.
				FLBuilderLayout._initModuleAnimations();

				// Init anchor links.
				FLBuilderLayout._initAnchorLinks();

				// Init the browser hash.
				FLBuilderLayout._initHash();

				// Init forms.
				FLBuilderLayout._initForms();
			}
		},

		/**
		 * Public method for refreshing Wookmark or MosaicFlow galleries
		 * within an element.
		 *
		 * @since 1.7.4
		 * @method refreshGalleries
		 */
		refreshGalleries: function( element )
		{
			var $element  = 'undefined' == typeof element ? $( 'body' ) : $( element ),
				mfContent = $element.find( '.fl-mosaicflow-content' ),
				wmContent = $element.find( '.fl-gallery' ),
				mfObject  = null;

			if ( mfContent ) {

				mfObject = mfContent.data( 'mosaicflow' );

				if ( mfObject ) {
					mfObject.columns = $( [] );
					mfObject.columnsHeights = [];
					mfContent.data( 'mosaicflow', mfObject );
					mfContent.mosaicflow( 'refill' );
				}
			}
			if ( wmContent ) {
				wmContent.trigger( 'refreshWookmark' );
			}
		},

		/**
		 * Public method for refreshing Masonry within an element
		 *
		 * @since 1.8.1
		 * @method refreshGridLayout
		 */
		refreshGridLayout: function( element )
		{
			var $element 		= 'undefined' == typeof element ? $( 'body' ) : $( element ),
				msnryContent	= $element.find('.masonry');

			if ( msnryContent.length )	{
				msnryContent.masonry('layout');
			}
		},

		/**
		 * Public method for reloading BxSlider within an element
		 *
		 * @since 1.8.1
		 * @method reloadSlider
		 */
		reloadSlider: function( element )
		{
			var $element 	= 'undefined' == typeof element ? $( 'body' ) : $( element ),
				bxContent	= $element.find('.bx-viewport > div').eq(0),
				bxObject   	= null;

			if ( bxContent.length ) {
				bxObject = bxContent.data( 'bxSlider');
				if ( bxObject ) {
					bxObject.reloadSlider();
				}
			}
		},

		/**
		 * Public method for resizing WP audio player
		 *
		 * @since 1.8.2
		 * @method resizeAudio
		 */
		resizeAudio: function( element )
		{
			var $element 	 	= 'undefined' == typeof element ? $( 'body' ) : $( element ),
				audioPlayers 	= $element.find('.wp-audio-shortcode.mejs-audio'),
				player 		 	= null,
				mejsPlayer 	 	= null,
				rail 			= null,
				railWidth 		= 400;

			if ( audioPlayers.length && typeof mejs !== 'undefined' ) {
            	audioPlayers.each(function(){
	            	player 		= $(this);
	            	mejsPlayer 	= mejs.players[player.attr('id')];
	            	rail 		= player.find('.mejs-controls .mejs-time-rail');
	            	var innerMejs = player.find('.mejs-inner'),
	            		total 	  = player.find('.mejs-controls .mejs-time-total');

	            	if ( typeof mejsPlayer !== 'undefined' ) {
	            		railWidth = Math.ceil(player.width() * 0.8);

	            		if ( innerMejs.length ) {

		            		rail.css('width', railWidth +'px!important');
		            		//total.width(rail.width() - 10);

		            		mejsPlayer.options.autosizeProgress = true;

		            		// webkit has trouble doing this without a delay
							setTimeout(function () {
								mejsPlayer.setControlsSize();
							}, 50);

			            	player.find('.mejs-inner').css({
			            		visibility: 'visible',
			            		height: 'inherit'
			            	});
		            	}
		           	}
	            });
	        }
		},

		/**
		 * Public method for preloading WP audio player when it's inside the hidden element
		 *
		 * @since 1.8.2
		 * @method preloadAudio
		 */
		preloadAudio: function(element)
		{
			var $element 	 = 'undefined' == typeof element ? $( 'body' ) : $( element ),
				contentWrap  = $element.closest('.fl-accordion-item'),
				audioPlayers = $element.find('.wp-audio-shortcode.mejs-audio');

			if ( ! contentWrap.hasClass('fl-accordion-item-active') && audioPlayers.find('.mejs-inner').length ) {
				audioPlayers.find('.mejs-inner').css({
					visibility : 'hidden',
					height: 0
				});
			}
		},

		/**
		 * Public method for resizing slideshow momdule within the tab
		 *
		 * @since 1.10.5
		 * @method resizeSlideshow
		 */
		resizeSlideshow: function(){
			if(typeof YUI !== 'undefined') {
				YUI().use('node-event-simulate', function(Y) {
					Y.one(window).simulate("resize");
				});
			}
		},

		/**
		 * Public method for reloading an embedded Google Map within the tabs or hidden element.
		 *
		 * @since 2.2
		 * @method reloadGoogleMap
		 */
		reloadGoogleMap: function(element){
			var $element  = 'undefined' == typeof element ? $( 'body' ) : $( element ),
			    googleMap = $element.find( 'iframe[src*="google.com/maps"]' );

			if ( googleMap.length ) {
			    googleMap.attr( 'src', function(i, val) {
			        return val;
			    });
			}
		},

		/**
		 * Unbinds builder layout events.
		 *
		 * @since 1.0
		 * @access private
		 * @method _destroy
		 */
		_destroy: function()
		{
			var win = $(window);

			win.off('scroll.fl-bg-parallax');
			win.off('resize.fl-bg-video');
		},

		/**
		 * Checks to see if the current device has touch enabled.
		 *
		 * @since 1.0
		 * @access private
		 * @method _isTouch
		 * @return {Boolean}
		 */
		_isTouch: function()
		{
			if(('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) {
				return true;
			}

			return false;
		},

		/**
		 * Checks to see if the current device is mobile.
		 *
		 * @since 1.7
		 * @access private
		 * @method _isMobile
		 * @return {Boolean}
		 */
		_isMobile: function()
		{
			return /Mobile|Android|Silk\/|Kindle|BlackBerry|Opera Mini|Opera Mobi|webOS/i.test( navigator.userAgent );
		},

		/**
		 * Initializes builder body classes.
		 *
		 * @since 1.0
		 * @access private
		 * @method _initClasses
		 */
		_initClasses: function()
		{
			var body = $( 'body' ),
				ua   = navigator.userAgent;

			// Add the builder body class.
			if ( ! body.hasClass( 'archive' ) && $( '.fl-builder-content-primary' ).length > 0 ) {
				body.addClass('fl-builder');
			}

			// Add the builder touch body class.
			if(FLBuilderLayout._isTouch()) {
				body.addClass('fl-builder-touch');
			}

			// Add the builder mobile body class.
			if(FLBuilderLayout._isMobile()) {
				body.addClass('fl-builder-mobile');
			}

			// IE11 body class.
			if ( ua.indexOf( 'Trident/7.0' ) > -1 && ua.indexOf( 'rv:11.0' ) > -1 ) {
				body.addClass( 'fl-builder-ie-11' );
			}
		},

		/**
		 * Initializes builder node backgrounds that require
		 * additional JavaScript logic such as parallax.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _initBackgrounds
		 */
		_initBackgrounds: function()
		{
			var win = $(window);

			// Init parallax backgrounds.
			if($('.fl-row-bg-parallax').length > 0 && !FLBuilderLayout._isMobile()) {
				FLBuilderLayout._scrollParallaxBackgrounds();
				FLBuilderLayout._initParallaxBackgrounds();
				win.on('scroll.fl-bg-parallax', FLBuilderLayout._scrollParallaxBackgrounds);
			}

			// Init video backgrounds.
			if($('.fl-bg-video').length > 0) {
				FLBuilderLayout._initBgVideos();
				FLBuilderLayout._resizeBgVideos();
				win.on('resize.fl-bg-video', FLBuilderLayout._resizeBgVideos);
			}
		},

		/**
		 * Initializes all parallax backgrounds in a layout.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _initParallaxBackgrounds
		 */
		_initParallaxBackgrounds: function()
		{
			$('.fl-row-bg-parallax').each(FLBuilderLayout._initParallaxBackground);
		},

		/**
		 * Initializes a single parallax background.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _initParallaxBackgrounds
		 */
		_initParallaxBackground: function()
		{
			var row     = $(this),
				content = row.find('> .fl-row-content-wrap'),
				src     = row.data('parallax-image'),
				loaded  = row.data('parallax-loaded'),
				img     = new Image();

			if(loaded) {
				return;
			}
			else if(typeof src != 'undefined') {

				$(img).on('load', function() {
					content.css('background-image', 'url(' + src + ')');
					row.data('parallax-loaded', true);
				});

				img.src = src;
			}
		},

		/**
		 * Fires when the window is scrolled to adjust
		 * parallax backgrounds.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _scrollParallaxBackgrounds
		 */
		_scrollParallaxBackgrounds: function()
		{
			$('.fl-row-bg-parallax').each(FLBuilderLayout._scrollParallaxBackground);
		},

		/**
		 * Fires when the window is scrolled to adjust
		 * a single parallax background.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _scrollParallaxBackground
		 */
		_scrollParallaxBackground: function()
		{
			var win     = $(window),
				row     = $(this),
				content = row.find('> .fl-row-content-wrap'),
				speed   = row.data('parallax-speed'),
				offset  = content.offset(),
				yPos    = -((win.scrollTop() - offset.top) / speed);

			content.css('background-position', 'center ' + yPos + 'px');
		},

		/**
		 * Initializes all video backgrounds.
		 *
		 * @since 1.6.3.3
		 * @access private
		 * @method _initBgVideos
		 */
		_initBgVideos: function()
		{
			$('.fl-bg-video').each(FLBuilderLayout._initBgVideo);
		},

		/**
		 * Initializes a video background.
		 *
		 * @since 1.6.3.3
		 * @access private
		 * @method _initBgVideo
		 */
		_initBgVideo: function()
		{
			var wrap   = $( this ),
				width       = wrap.data( 'width' ),
				height      = wrap.data( 'height' ),
				mp4         = wrap.data( 'mp4' ),
				youtube     = wrap.data( 'youtube'),
				vimeo       = wrap.data( 'vimeo'),
				mp4Type     = wrap.data( 'mp4-type' ),
				webm        = wrap.data( 'webm' ),
				webmType    = wrap.data( 'webm-type' ),
				fallback    = wrap.data( 'fallback' ),
				loaded      = wrap.data( 'loaded' ),
				videoMobile = wrap.data( 'video-mobile' ),
				fallbackTag = '',
				videoTag    = null,
				mp4Tag      = null,
				webmTag     = null;

			// Return if the video has been loaded for this row.
			if ( loaded ) {
				return;
			}

			videoTag  = $( '<video autoplay loop muted playsinline></video>' );

			/**
			 * Add poster image (fallback image)
			 */
			if( 'undefined' != typeof fallback && '' != fallback ) {
				videoTag.attr( 'poster', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' )
				videoTag.css( 'background', 'transparent url("' + fallback + '") no-repeat center center' )
				videoTag.css( 'background-size', 'cover' )
				videoTag.css( 'height', '100%' )
			}

			// MP4 Source Tag
			if ( 'undefined' != typeof mp4 && '' != mp4 ) {

				mp4Tag = $( '<source />' );
				mp4Tag.attr( 'src', mp4 );
				mp4Tag.attr( 'type', mp4Type );

				videoTag.append( mp4Tag );
			}
			// WebM Source Tag
			if ( 'undefined' != typeof webm && '' != webm ) {

				webmTag = $( '<source />' );
				webmTag.attr( 'src', webm );
				webmTag.attr( 'type', webmType );

				videoTag.append( webmTag );
			}

			// This is either desktop, or mobile is enabled.
			if ( ! FLBuilderLayout._isMobile() || ( FLBuilderLayout._isMobile() && "yes" == videoMobile ) ) {
				if ( 'undefined' != typeof youtube ) {
					FLBuilderLayout._initYoutubeBgVideo.apply( this );
				}
				else if ( 'undefined' != typeof vimeo ) {
					FLBuilderLayout._initVimeoBgVideo.apply( this );
				}
				else {
					wrap.append( videoTag );
				}
			}
			else {
				// if we are here, it means we are on mobile and NO is set so remove video src and use fallback
				videoTag.attr('src', '')
				wrap.append( videoTag );
			}

			// Mark this video as loaded.
			wrap.data('loaded', true);
		},

		/**
		 * Initializes Youtube video background
		 *
		 * @since 1.9
		 * @access private
		 * @method _initYoutubeBgVideo
		 */
		_initYoutubeBgVideo: function()
		{
			var playerWrap  = $(this),
				videoId     = playerWrap.data('video-id'),
				videoPlayer = playerWrap.find('.fl-bg-video-player'),
				enableAudio = playerWrap.data('enable-audio'),
				audioButton = playerWrap.find('.fl-bg-video-audio'),
				startTime   = 'undefined' !== typeof playerWrap.data('start') ? playerWrap.data('start') : 0,
				endTime     = 'undefined' !== typeof playerWrap.data('end') ? playerWrap.data('end') : 0,
				loop        = 'undefined' !== typeof playerWrap.data('loop') ? playerWrap.data('loop') : 1,
				stateCount  = 0,
				player;

			if ( videoId ) {
				FLBuilderLayout._onYoutubeApiReady( function( YT ) {
					setTimeout( function() {

						player = new YT.Player( videoPlayer[0], {
							videoId: videoId,
							events: {
								onReady: function(event) {
									if ( "no" === enableAudio || FLBuilderLayout._isMobile() ) {
										event.target.mute();
									}
									else if ( "yes" === enableAudio && event.target.isMuted ) {
										event.target.unMute();
									}

									// Store an instance to a parent
									playerWrap.data('YTPlayer', player);
									FLBuilderLayout._resizeYoutubeBgVideo.apply(playerWrap);

									// Queue the video.
									event.target.playVideo();

									if ( audioButton.length > 0 && ! FLBuilderLayout._isMobile() ) {
										audioButton.on( 'click', {button: audioButton, player: player}, FLBuilderLayout._toggleBgVideoAudio );
									}
								},
								onStateChange: function( event ) {
									// Manual check if video is not playable in some browsers.
									// StateChange order: [-1, 3, -1]
									if ( stateCount < 4 ) {
										stateCount++;
									}

									// Comply with the audio policy in some browsers like Chrome and Safari.
									if ( stateCount > 1 && (-1 === event.data || 2 === event.data) && "yes" === enableAudio ) {
										player.mute();
										player.playVideo();
										audioButton.show();
									}

									if ( event.data === YT.PlayerState.ENDED && 1 === loop ) {
										if ( startTime > 0 ) {
											player.seekTo( startTime );
										}
										else {
											player.playVideo();
										}
									}
								},
								onError: function(event) {
									console.info('YT Error: ' + event.data)
									FLBuilderLayout._onErrorYoutubeVimeo(playerWrap)
								}
							},
							playerVars: {
								playsinline: FLBuilderLayout._isMobile() ? 1 : 0,
								controls: 0,
								showinfo: 0,
								rel : 0,
								start: startTime,
								end: endTime,
							}
						} );
					}, 1 );
				} );
			}
		},

		/**
		 * On youtube or vimeo error show the fallback image if available.
		 * @since 2.0.7
		 */
		_onErrorYoutubeVimeo: function(playerWrap) {

			fallback = playerWrap.data('fallback') || false
			if( ! fallback ) {
				return false;
			}
			playerWrap.find('iframe').remove()
			fallbackTag = $( '<div></div>' );
			fallbackTag.addClass( 'fl-bg-video-fallback' );
			fallbackTag.css( 'background-image', 'url(' + playerWrap.data('fallback') + ')' );
			playerWrap.append( fallbackTag );
		},

		/**
		 * Check if Youtube API has been downloaded
		 *
		 * @since 1.9
		 * @access private
		 * @method _onYoutubeApiReady
		 * @param  {Function} callback Method to call when YT API has been loaded
		 */
		_onYoutubeApiReady: function( callback ) {
			if ( window.YT && YT.loaded ) {
				callback( YT );
			} else {
				// If not ready check again by timeout..
				setTimeout( function() {
					FLBuilderLayout._onYoutubeApiReady( callback );
				}, 350 );
			}
		},

		/**
		 * Initializes Vimeo video background
		 *
		 * @since 1.9
		 * @access private
		 * @method _initVimeoBgVideo
		 */
		_initVimeoBgVideo: function()
		{
			var playerWrap	= $(this),
				videoId 	= playerWrap.data('video-id'),
				videoPlayer = playerWrap.find('.fl-bg-video-player'),
				enableAudio = playerWrap.data('enable-audio'),
				audioButton = playerWrap.find('.fl-bg-video-audio'),
				player,
				width = playerWrap.outerWidth();

			if ( typeof Vimeo !== 'undefined' && videoId )	{
				player = new Vimeo.Player(videoPlayer[0], {
					id         : videoId,
					loop       : true,
					title      : false,
					portrait   : false,
					background : true,
					autopause  : false,
					muted      : true
				});

				playerWrap.data('VMPlayer', player);
				if ( "no" === enableAudio ) {
					player.setVolume(0);
				}
				else if ("yes" === enableAudio ) {
					// Chrome and Safari have audio policy restrictions for autoplay videos.
					if ( $.browser.safari || $.browser.chrome ) {
						player.setVolume(0);
						audioButton.show();
					}
					else {
						player.setVolume(1);
					}
				}

				player.play().catch(function(error) {
					FLBuilderLayout._onErrorYoutubeVimeo(playerWrap)
				});

				if ( audioButton.length > 0 ) {
					audioButton.on( 'click', {button: audioButton, player: player}, FLBuilderLayout._toggleBgVideoAudio );
				}
			}
		},

		/**
		 * Mute / unmute audio on row's video background.
		 * It works for both Youtube and Vimeo.
		 *
		 * @since 2.1.3
		 * @access private
		 * @method _toggleBgVideoAudio
		 * @param {Object} e Method arguments
		 */
		_toggleBgVideoAudio: function( e ) {
			var player  = e.data.player,
			    control = e.data.button.find('.fl-audio-control');

			if ( control.hasClass( 'fa-volume-off' ) ) {
				// Unmute
				control
					.removeClass( 'fa-volume-off' )
					.addClass( 'fa-volume-up' );
				e.data.button.find( '.fa-times' ).hide();

				if ( 'function' === typeof player.unMute ) {
					player.unMute();
				}
				else {
					player.setVolume( 1 );
				}
			}
			else {
				// Mute
				control
					.removeClass( 'fa-volume-up' )
					.addClass( 'fa-volume-off' );
				e.data.button.find( '.fa-times' ).show();

				if ( 'function' === typeof player.unMute ) {
					player.mute();
				}
				else {
					player.setVolume( 0 );
				}
			}
		},

		/**
		 * Fires when there is an error loading a video
		 * background source and shows the fallback.
		 *
		 * @since 1.6.3.3
		 * @access private
		 * @method _videoBgSourceError
		 * @param {Object} e An event object
		 * @deprecated 2.0.3
		 */
		_videoBgSourceError: function( e )
		{
			var source 		= $( e.target ),
				wrap   		= source.closest( '.fl-bg-video' ),
				vid		    = wrap.find( 'video' ),
				fallback  	= wrap.data( 'fallback' ),
				fallbackTag = '';
			source.remove();

			if ( vid.find( 'source' ).length ) {
				// Don't show the fallback if we still have other sources to check.
				return;
			} else if ( '' !== fallback ) {
				fallbackTag = $( '<div></div>' );
				fallbackTag.addClass( 'fl-bg-video-fallback' );
				fallbackTag.css( 'background-image', 'url(' + fallback + ')' );
				wrap.append( fallbackTag );
				vid.remove();
			}
		},

		/**
		 * Fires when the window is resized to resize
		 * all video backgrounds.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _resizeBgVideos
		 */
		_resizeBgVideos: function()
		{
			$('.fl-bg-video').each( function() {

				FLBuilderLayout._resizeBgVideo.apply( this );

				if ( $( this ).parent().find( 'img' ).length > 0 ) {
					$( this ).parent().imagesLoaded( $.proxy( FLBuilderLayout._resizeBgVideo, this ) );
				}
			} );
		},

		/**
		 * Fires when the window is resized to resize
		 * a single video background.
		 *
		 * @since 1.1.4
		 * @access private
		 * @method _resizeBgVideo
		 */
		_resizeBgVideo: function()
		{
			if ( 0 === $( this ).find( 'video' ).length && 0 === $( this ).find( 'iframe' ).length ) {
				return;
			}

			var wrap        = $(this),
				wrapHeight  = wrap.outerHeight(),
				wrapWidth   = wrap.outerWidth(),
				vid         = wrap.find('video'),
				vidHeight   = wrap.data('height'),
				vidWidth    = wrap.data('width'),
				newWidth    = wrapWidth,
				newHeight   = Math.round(vidHeight * wrapWidth/vidWidth),
				newLeft     = 0,
				newTop      = 0,
				iframe 		= wrap.find('iframe');

			if ( vid.length ) {
				if(vidHeight === '' || typeof vidHeight === 'undefined' || vidWidth === '' || typeof vidWidth === 'undefined') {
					vid.css({
						'left'      : '0px',
						'top'       : '0px',
						'width'     : newWidth + 'px'
					});

					// Try to set the actual video dimension on 'loadedmetadata' when using URL as video source
					vid.on('loadedmetadata', FLBuilderLayout._resizeOnLoadedMeta);

				}
				else {

					if(newHeight < wrapHeight) {
						newHeight   = wrapHeight;
						newWidth    = Math.round(vidWidth * wrapHeight/vidHeight);
						newLeft     = -((newWidth - wrapWidth)/2);
					}
					else {
						newTop      = -((newHeight - wrapHeight)/2);
					}

					vid.css({
						'left'      : newLeft + 'px',
						'top'       : newTop + 'px',
						'height'    : newHeight + 'px',
						'width'     : newWidth + 'px'
					});
				}
			}
			else if ( iframe.length ) {

				// Resize Youtube video player within iframe tag
				if ( typeof wrap.data('youtube') !== 'undefined' ) {
					FLBuilderLayout._resizeYoutubeBgVideo.apply(this);
				}
			}
		},

		/**
		 * Fires when video meta has been loaded.
		 * This will be Triggered when width/height attributes were not specified during video background resizing.
		 *
		 * @since 1.8.5
		 * @access private
		 * @method _resizeOnLoadedMeta
		 */
		_resizeOnLoadedMeta: function(){
			var video 		= $(this),
				wrapHeight 	= video.parent().outerHeight(),
				wrapWidth 	= video.parent().outerWidth(),
				vidWidth 	= video[0].videoWidth,
				vidHeight 	= video[0].videoHeight,
				newHeight   = Math.round(vidHeight * wrapWidth/vidWidth),
				newWidth    = wrapWidth,
				newLeft     = 0,
				newTop 		= 0;

			if(newHeight < wrapHeight) {
				newHeight   = wrapHeight;
				newWidth    = Math.round(vidWidth * wrapHeight/vidHeight);
				newLeft     = -((newWidth - wrapWidth)/2);
			}
			else {
				newTop      = -((newHeight - wrapHeight)/2);
			}

			video.parent().data('width', vidWidth);
			video.parent().data('height', vidHeight);

			video.css({
				'left'      : newLeft + 'px',
				'top'       : newTop + 'px',
				'width'     : newWidth + 'px',
				'height' 	: newHeight + 'px'
			});
		},

		/**
		 * Fires when the window is resized to resize
		 * a single Youtube video background.
		 *
		 * @since 1.9
		 * @access private
		 * @method _resizeYoutubeBgVideo
		 */
		_resizeYoutubeBgVideo: function()
		{
			var wrap				= $(this),
				wrapWidth 			= wrap.outerWidth(),
				wrapHeight 			= wrap.outerHeight(),
				player 				= wrap.data('YTPlayer'),
				video 				= player ? player.getIframe() : null,
				aspectRatioSetting 	= '16:9', // Medium
				aspectRatioArray 	= aspectRatioSetting.split( ':' ),
				aspectRatio 		= aspectRatioArray[0] / aspectRatioArray[1],
				ratioWidth 			= wrapWidth / aspectRatio,
				ratioHeight 		= wrapHeight * aspectRatio,
				isWidthFixed 		= wrapWidth / wrapHeight > aspectRatio,
				width 				= isWidthFixed ? wrapWidth : ratioHeight,
				height 				= isWidthFixed ? ratioWidth : wrapHeight;

			if ( video ) {
				$(video).width( width ).height( height );
			}
		},

		/**
		 * Initializes module animations.
		 *
		 * @since 1.1.9
		 * @access private
		 * @method _initModuleAnimations
		 */
		_initModuleAnimations: function()
		{
			if(typeof jQuery.fn.waypoint !== 'undefined') {
				$('.fl-animation').each( function() {
					var node = $( this ),
						nodeTop = node.offset().top,
						winHeight = $( window ).height(),
						bodyHeight = $( 'body' ).height(),
						waypoint = FLBuilderLayoutConfig.waypoint,
						offset = '80%';

					if ( typeof waypoint.offset !== undefined ) {
						offset = FLBuilderLayoutConfig.waypoint.offset + '%';
					}

					if ( bodyHeight - nodeTop < winHeight * 0.2 ) {
						offset = '100%';
					}

					node.waypoint({
						offset: offset,
						handler: FLBuilderLayout._doModuleAnimation
					});
				} );
			}
		},

		/**
		 * Runs a module animation.
		 *
		 * @since 1.1.9
		 * @access private
		 * @method _doModuleAnimation
		 */
		_doModuleAnimation: function()
		{
			var module = 'undefined' == typeof this.element ? $(this) : $(this.element),
				delay = parseFloat(module.data('animation-delay')),
				duration = parseFloat(module.data('animation-duration'));

			if ( ! isNaN( duration ) ) {
				module.css( 'animation-duration', duration + 's' );
			}

			if(!isNaN(delay) && delay > 0) {
				setTimeout(function(){
					module.addClass('fl-animated');
				}, delay * 1000);
			} else {
				setTimeout(function(){
					module.addClass('fl-animated');
				}, 1);
			}
		},

		/**
		 * Opens a tab or accordion item if the browser hash is set
		 * to the ID of one on the page.
		 *
		 * @since 1.6.0
		 * @access private
		 * @method _initHash
		 */
		_initHash: function()
		{
			var hash 			= window.location.hash.replace( '#', '' ).split( '/' ).shift(),
				element 		= null,
				tabs			= null,
				responsiveLabel	= null,
				tabIndex		= null,
				label			= null;

			if ( '' !== hash ) {

				try {

					element = $( '#' + hash );

					if ( element.length > 0 ) {

						if ( element.hasClass( 'fl-accordion-item' ) ) {
							setTimeout( function() {
								element.find( '.fl-accordion-button' ).trigger( 'click' );
							}, 100 );
						}
						if ( element.hasClass( 'fl-tabs-panel' ) ) {

							setTimeout( function() {

								tabs 			= element.closest( '.fl-tabs' );
								responsiveLabel = element.find( '.fl-tabs-panel-label' );
								tabIndex 		= responsiveLabel.data( 'index' );
								label 			= tabs.find( '.fl-tabs-labels .fl-tabs-label[data-index=' + tabIndex + ']' );

								if ( responsiveLabel.is( ':visible' ) ) {
									responsiveLabel.trigger( 'click' );
								}
								else {
									label[0].click();
									FLBuilderLayout._scrollToElement( element );
								}

							}, 100 );
						}
					}
				}
				catch( e ) {}
			}
		},

		/**
		 * Initializes all anchor links on the page for smooth scrolling.
		 *
		 * @since 1.4.9
		 * @access private
		 * @method _initAnchorLinks
		 */
		_initAnchorLinks: function()
		{
			$( 'a' ).each( FLBuilderLayout._initAnchorLink );
		},

		/**
		 * Initializes a single anchor link for smooth scrolling.
		 *
		 * @since 1.4.9
		 * @access private
		 * @method _initAnchorLink
		 */
		_initAnchorLink: function()
		{
			var link    = $( this ),
				href    = link.attr( 'href' ),
				loc     = window.location,
				id      = null,
				element = null;
			if ( 'undefined' != typeof href && href.indexOf( '#' ) > -1 && link.closest('svg').length < 1 ) {

				if ( loc.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && loc.hostname == this.hostname ) {

					try {

						id      = href.split( '#' ).pop();
						// If there is no ID then we have nowhere to look
						// Fixes a quirk in jQuery and FireFox
						if( ! id ) {
							return;
						}
						element = $( '#' + id );

						if ( element.length > 0 ) {
							if ( link.hasClass( 'fl-scroll-link' ) || element.hasClass( 'fl-row' ) || element.hasClass( 'fl-col' ) || element.hasClass( 'fl-module' ) ) {
								$( link ).on( 'click', FLBuilderLayout._scrollToElementOnLinkClick );
							}
							if ( element.hasClass( 'fl-accordion-item' ) ) {
								$( link ).on( 'click', FLBuilderLayout._scrollToAccordionOnLinkClick );
							}
							if ( element.hasClass( 'fl-tabs-panel' ) ) {
								$( link ).on( 'click', FLBuilderLayout._scrollToTabOnLinkClick );
							}
						}
					}
					catch( e ) {}
				}
			}
		},

		/**
		 * Scrolls to an element when an anchor link is clicked.
		 *
		 * @since 1.4.9
		 * @access private
		 * @method _scrollToElementOnLinkClick
		 * @param {Object} e An event object.
		 * @param {Function} callback A function to call when the scroll is complete.
		 */
		_scrollToElementOnLinkClick: function( e, callback )
		{
			var element = $( '#' + $( this ).attr( 'href' ).split( '#' ).pop() );

			FLBuilderLayout._scrollToElement( element, callback );

			e.preventDefault();
		},

		/**
		 * Scrolls to an element.
		 *
		 * @since 1.6.4.5
		 * @access private
		 * @method _scrollToElement
		 * @param {Object} element The element to scroll to.
		 * @param {Function} callback A function to call when the scroll is complete.
		 */
		_scrollToElement: function( element, callback )
		{
			var config  = FLBuilderLayoutConfig.anchorLinkAnimations,
				dest    = 0,
				win     = $( window ),
				doc     = $( document );

			if ( element.length > 0 ) {

				if ( element.offset().top > doc.height() - win.height() ) {
					dest = doc.height() - win.height();
				}
				else {
					dest = element.offset().top - config.offset;
				}

				$( 'html, body' ).animate( { scrollTop: dest }, config.duration, config.easing, function() {

					if ( 'undefined' != typeof callback ) {
						callback();
					}

					if ( undefined != element.attr( 'id' ) ) {

						if ( history.pushState ) {
							history.pushState( null, null, '#' + element.attr( 'id' ) );
						}
						else {
							window.location.hash = element.attr( 'id' );
						}
					}
				} );
			}
		},

		/**
		 * Scrolls to an accordion item when a link is clicked.
		 *
		 * @since 1.5.9
		 * @access private
		 * @method _scrollToAccordionOnLinkClick
		 * @param {Object} e An event object.
		 */
		_scrollToAccordionOnLinkClick: function( e )
		{
			var element = $( '#' + $( this ).attr( 'href' ).split( '#' ).pop() );

			if ( element.length > 0 ) {

				var callback = function() {
					if ( element ) {
						element.find( '.fl-accordion-button' ).trigger( 'click' );
						element = false;
					}
				};

				FLBuilderLayout._scrollToElementOnLinkClick.call( this, e, callback );
			}
		},

		/**
		 * Scrolls to a tab panel when a link is clicked.
		 *
		 * @since 1.5.9
		 * @access private
		 * @method _scrollToTabOnLinkClick
		 * @param {Object} e An event object.
		 */
		_scrollToTabOnLinkClick: function( e )
		{
			var element 		= $( '#' + $( this ).attr( 'href' ).split( '#' ).pop() ),
				tabs			= null,
				label   		= null,
				responsiveLabel = null;

			if ( element.length > 0 ) {

				tabs 			= element.closest( '.fl-tabs' );
				responsiveLabel = element.find( '.fl-tabs-panel-label' );
				tabIndex 		= responsiveLabel.data( 'index' );
				label 			= tabs.find( '.fl-tabs-labels .fl-tabs-label[data-index=' + tabIndex + ']' );

				if ( responsiveLabel.is( ':visible' ) ) {

					var callback = function() {
						if ( element ) {
							responsiveLabel.trigger( 'click' );
							element = false;
						}
					};

					FLBuilderLayout._scrollToElementOnLinkClick.call( this, e, callback );
				}
				else {
					label[0].click();
					FLBuilderLayout._scrollToElement( element );
				}

				e.preventDefault();
			}
		},

		/**
		 * Initializes all builder forms on a page.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _initForms
		 */
		_initForms: function()
		{
			if ( ! FLBuilderLayout._hasPlaceholderSupport ) {
				$( '.fl-form-field input' ).each( FLBuilderLayout._initFormFieldPlaceholderFallback );
			}

			$( '.fl-form-field input' ).on( 'focus', FLBuilderLayout._clearFormFieldError );
		},

		/**
		 * Checks to see if the current device has HTML5
		 * placeholder support.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _hasPlaceholderSupport
		 * @return {Boolean}
		 */
		_hasPlaceholderSupport: function()
		{
			var input = document.createElement( 'input' );

			return 'undefined' != input.placeholder;
		},

		/**
		 * Initializes the fallback for when placeholders aren't supported.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _initFormFieldPlaceholderFallback
		 */
		_initFormFieldPlaceholderFallback: function()
		{
			var field       = $( this ),
				val         = field.val(),
				placeholder = field.attr( 'placeholder' );

			if ( 'undefined' != placeholder && '' === val ) {
				field.val( placeholder );
				field.on( 'focus', FLBuilderLayout._hideFormFieldPlaceholderFallback );
				field.on( 'blur', FLBuilderLayout._showFormFieldPlaceholderFallback );
			}
		},

		/**
		 * Hides a fallback placeholder on focus.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _hideFormFieldPlaceholderFallback
		 */
		_hideFormFieldPlaceholderFallback: function()
		{
			var field       = $( this ),
				val         = field.val(),
				placeholder = field.attr( 'placeholder' );

			if ( val == placeholder ) {
				field.val( '' );
			}
		},

		/**
		 * Shows a fallback placeholder on blur.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _showFormFieldPlaceholderFallback
		 */
		_showFormFieldPlaceholderFallback: function()
		{
			var field       = $( this ),
				val         = field.val(),
				placeholder = field.attr( 'placeholder' );

			if ( '' === val ) {
				field.val( placeholder );
			}
		},

		/**
		 * Clears a form field error message.
		 *
		 * @since 1.5.4
		 * @access private
		 * @method _clearFormFieldError
		 */
		_clearFormFieldError: function()
		{
			var field = $( this );

			field.removeClass( 'fl-form-error' );
			field.siblings( '.fl-form-error-message' ).hide();
		}
	};

	/* Initializes the builder layout. */
	$(function(){
		FLBuilderLayout.init();
	});

})(jQuery);

/* Start Global JS */

/* End Global JS */


;(function($) {

	PPSearchForm = function(settings) {
		this.id 	= settings.id;
		this.node 	= $('.fl-node-' + this.id);
		this.form	= this.node.find('.pp-search-form');

		this._init();
	};

	PPSearchForm.prototype = {
		id: '',
		node: '',
		form: '',

		_init: function() {
			this.form.find('.pp-search-form__input').on('focus', $.proxy(function() {
				this.form.addClass('pp-search-form--focus');
			}, this));
			this.form.find('.pp-search-form__input').on('blur', $.proxy(function() {
				this.form.removeClass('pp-search-form--focus');
			}, this));

			this.form.find('.pp-search-form__toggle').on('click', $.proxy(function() {
				this.form.find('.pp-search-form__container').addClass('pp-search-form--lightbox').find('.pp-search-form__input').focus();
			}, this));

			this.form.find('.pp-search-form--lightbox-close').on('click', $.proxy(function() {
				this.form.find('.pp-search-form__container').removeClass('pp-search-form--lightbox');
			}, this));

			var self = this;

			// close modal box on Esc key press.
			$(document).keyup(function(e) {
                if ( 27 == e.which && self.form.find('.pp-search-form--lightbox').length > 0 ) {
                    self.form.find('.pp-search-form__container').removeClass('pp-search-form--lightbox');
                }
			});
		},
	};

})(jQuery);;(function($) {
	
	new PPSearchForm({
		id: '5d5bd4d076906',
	});

})(jQuery);
(function($) {

	FLBuilderPostGrid = function(settings)
	{
		this.settings    = settings;
		this.nodeClass   = '.fl-node-' + settings.id;
		this.matchHeight = settings.matchHeight;

		if ( 'columns' == this.settings.layout ) {
			this.wrapperClass = this.nodeClass + ' .fl-post-grid';
			this.postClass    = this.nodeClass + ' .fl-post-column';
		}
		else {
			this.wrapperClass = this.nodeClass + ' .fl-post-' + this.settings.layout;
			this.postClass    = this.wrapperClass + '-post';
		}

		if(this._hasPosts()) {
			this._initLayout();
			this._initInfiniteScroll();
		}
	};

	FLBuilderPostGrid.prototype = {

		settings        : {},
		nodeClass       : '',
		wrapperClass    : '',
		postClass       : '',
		gallery         : null,
		currPage		: 1,
		totalPages		: 1,

		_hasPosts: function()
		{
			return $(this.postClass).length > 0;
		},

		_initLayout: function()
		{
			switch(this.settings.layout) {

				case 'columns':
				this._columnsLayout();
				break;

				case 'grid':
				this._gridLayout();
				break;

				case 'gallery':
				this._galleryLayout();
				break;
			}

			$(this.postClass).css('visibility', 'visible');

			FLBuilderLayout._scrollToElement( $( this.nodeClass + ' .fl-paged-scroll-to' ) );
		},

		_columnsLayout: function()
		{
			$(this.wrapperClass).imagesLoaded( $.proxy( function() {
				this._gridLayoutMatchHeight();
			}, this ) );

			$( window ).on( 'resize', $.proxy( function(){
				$(this.wrapperClass).imagesLoaded( $.proxy( function() {
					this._gridLayoutMatchHeight();
				}, this ) );
			}, this ) );
		},

		_gridLayout: function()
		{
			var wrap = $(this.wrapperClass);

			wrap.masonry({
				columnWidth         : this.nodeClass + ' .fl-post-grid-sizer',
				gutter              : parseInt(this.settings.postSpacing),
				isFitWidth          : true,
				itemSelector        : this.postClass,
				transitionDuration  : 0,
				isRTL               : this.settings.isRTL
			});

			wrap.imagesLoaded( $.proxy( function() {
				this._gridLayoutMatchHeight();
				wrap.masonry();
			}, this ) );

			$(window).scroll($.debounce( 25, function(){
				wrap.masonry()
			}));

		},

		_gridLayoutMatchHeight: function()
		{
			var highestBox = 0;

			if ( ! this._isMatchHeight() ) {
				$(this.nodeClass + ' .fl-post-grid-post').css('height', '');
				return;
			}

            $(this.nodeClass + ' .fl-post-grid-post').css('height', '').each(function(){

                if($(this).height() > highestBox) {
                	highestBox = $(this).height();
                }
            });

            $(this.nodeClass + ' .fl-post-grid-post').height(highestBox);
		},

		_isMatchHeight: function(){
			var width 		= $( window ).width(),
				breakpoints = FLBuilderLayoutConfig.breakpoints,
				matchMedium = '' != this.matchHeight.medium ? this.matchHeight.medium : this.matchHeight.default;
				matchSmall  = '' != this.matchHeight.responsive ? this.matchHeight.responsive : this.matchHeight.default;

			return (width > breakpoints.medium && 1 == this.matchHeight.default)
				   || (width > breakpoints.small && width <= breakpoints.medium && 1 == matchMedium)
				   || (width <= breakpoints.small && 1 == matchSmall);
		},

		_galleryLayout: function()
		{
			this.gallery = new FLBuilderGalleryGrid({
				'wrapSelector' : this.wrapperClass,
				'itemSelector' : '.fl-post-gallery-post',
				'isRTL'        : this.settings.isRTL
			});
		},

		_initInfiniteScroll: function()
		{
			var isScroll = 'scroll' == this.settings.pagination || 'load_more' == this.settings.pagination,
				pages	 = $( this.nodeClass + ' .fl-builder-pagination' ).find( 'li .page-numbers:not(.next)' );

			if( pages.length > 1) {
				total = pages.last().text().replace( /\D/g, '' )
				this.totalPages = parseInt( total );
			}

			if( isScroll && this.totalPages > 1 && 'undefined' === typeof FLBuilder ) {
				this._infiniteScroll();

				if( 'load_more' == this.settings.pagination ) {
					this._infiniteScrollLoadMore();
				}
			}
		},

		_infiniteScroll: function(settings)
		{
			var path 		= $(this.nodeClass + ' .fl-builder-pagination a.next').attr('href'),
				pagePattern = /(.*?(\/|\&|\?)paged-[0-9]{1,}(\/|=))([0-9]{1,})+(.*)/,
				wpPattern   = /^(.*?\/?page\/?)(?:\d+)(.*?$)/,
				pageMatched = null,
				scrollData	= {
					navSelector     : this.nodeClass + ' .fl-builder-pagination',
					nextSelector    : this.nodeClass + ' .fl-builder-pagination a.next',
					itemSelector    : this.postClass,
					prefill         : true,
					bufferPx        : 200,
					loading         : {
						msgText         : 'Loading',
						finishedMsg     : '',
						img             : FLBuilderLayoutConfig.paths.pluginUrl + 'img/ajax-loader-grey.gif',
						speed           : 1
					}
				};

			// Define path since Infinitescroll incremented our custom pagination '/paged-2/2/' to '/paged-3/2/'.
			if ( pagePattern.test( path ) ) {
				scrollData.path = function( currPage ){
					pageMatched = path.match( pagePattern );
					path = pageMatched[1] + currPage + pageMatched[5];
					return path;
				}
			}
			else if ( wpPattern.test( path ) ) {
				scrollData.path = path.match( wpPattern ).slice( 1 );
			}

			$(this.wrapperClass).infinitescroll( scrollData, $.proxy(this._infiniteScrollComplete, this) );

			setTimeout(function(){
				$(window).trigger('resize');
			}, 100);
		},

		_infiniteScrollComplete: function(elements)
		{
			var wrap = $(this.wrapperClass);

			elements = $(elements);

			if(this.settings.layout == 'columns') {
				wrap.imagesLoaded( $.proxy( function() {
					this._gridLayoutMatchHeight();
					elements.css('visibility', 'visible');
				}, this ) );
			}
			else if(this.settings.layout == 'grid') {
				wrap.imagesLoaded( $.proxy( function() {
					this._gridLayoutMatchHeight();
					wrap.masonry('appended', elements);
					wrap.masonry();
					elements.css('visibility', 'visible');
				}, this ) );
			}
			else if(this.settings.layout == 'gallery') {
				this.gallery.resize();
				elements.css('visibility', 'visible');
			}

			if( 'load_more' == this.settings.pagination ) {
				$( '#infscr-loading' ).appendTo( this.wrapperClass );
			}

			this.currPage++;

			this._removeLoadMoreButton();
		},

		_infiniteScrollLoadMore: function()
		{
			var wrap = $( this.wrapperClass );

			$( window ).unbind( '.infscr' );

			$(this.nodeClass + ' .fl-builder-pagination-load-more .fl-button').on( 'click', function(){
				wrap.infinitescroll( 'retrieve' );
				return false;
			});
		},

		_removeLoadMoreButton: function()
		{
			if ( 'load_more' == this.settings.pagination && this.totalPages == this.currPage ) {
				$( this.nodeClass + ' .fl-builder-pagination-load-more' ).remove();
			}
		}
	};

})(jQuery);
(function($) {

	$(function() {

		new FLBuilderPostGrid({
			id: '5d5bd763adcd6',
			layout: 'feed',
			pagination: 'load_more',
			postSpacing: '0',
			postWidth: '300',
			matchHeight: {
				default	   : '0',
				medium 	   : '',
				responsive : ''
			},
			isRTL: false		});
	});

	
})(jQuery);
jQuery(function($) {
	
	$(function() {
		$( '.fl-node-5d5bd763adcea .fl-photo-img' )
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


var ppcg_5d5bd763adcd1 = '';

;(function($) {
	var left_arrow_svg = '<svg aria-hidden="true" data-prefix="fal" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-left fa-w-6 fa-2x"><path fill="currentColor" d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z" class=""></path></svg>';
	var right_arrow_svg = '<svg aria-hidden="true" data-prefix="fal" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-right fa-w-6 fa-2x"><path fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" class=""></path></svg>';

	var PPContentGridOptions = {
		id: '5d5bd763adcd1',
		layout: 'grid',
		style: 'style-8',
		ajaxUrl: 'http://olle.dyndns-ip.com/hamnen_wordpress/wp-admin/admin-ajax.php',
		perPage: '5',
		fields: {"layout":"grid","post_grid_style_select":"style-8","custom_layout":{"html":"[wpbb-if post:featured_image]\n<div class=\"pp-content-grid-post-image\">\n\t[wpbb post:featured_image size=\"large\" display=\"tag\" linked=\"yes\"]\n<\/div>\n[\/wpbb-if]\n\n<div class=\"pp-content-grid-post-text\">\n\n    <h3 class=\"pp-content-grid-post-title\">[wpbb post:link text=\"title\"]<\/h3>\n\n    <div class=\"pp-content-grid-post-meta\">\n    \t[wpbb post:date format=\"F j, Y\"]\n\t\t<span class=\"pp-content-grid-post-meta-sep\"> | <\/span>\n\t\t[wpbb post:terms_list taxonomy=\"category\" separator=\", \"]\n    <\/div>\n\n\t<div class=\"pp-content-grid-separator\"><\/div>\n\n    <div class=\"pp-content-grid-post-excerpt\">\n    \t[wpbb post:excerpt length=\"17\" more=\"...\"]\n    <\/div>\n\n    <div class=\"pp-content-grid-post-more-link\">\n    \t<a href=\"[wpbb post:url]\"><span class=\"fa fa-angle-right\"><\/span> Read More<\/a>\n    <\/div>\n\n<\/div>\n","css":".pp-content-grid-post {\n    font-size: 14px;\n}\n.pp-content-grid-post-image {\n    padding: 20px;\n    padding-bottom: 0;\n}\n.pp-content-grid-post-text {\n    padding: 20px;\n}\n.pp-content-grid-post-title {\n    font-size: 20px;\n\tline-height: 26px;\n\tmargin: 0;\n\tpadding: 0;\n}\n.pp-content-grid-post-meta {\n    padding: 0;\n}\n.pp-content-grid-post-meta a {\n    text-decoration: none;\n}\n.pp-content-grid-post-meta,\n.pp-content-grid-post-meta a {\n    color: #888;\n    font-size: 12px;\n}\n.pp-content-grid-post-meta a:hover {\n    color: #000;\n}\n.pp-content-grid-separator {\n    min-height: 2px;\n    width: 60px;\n    background: #000;\n    margin-top: 10px;\n    margin-bottom: 20px;\n}\n"},"match_height":"yes","custom_height":"199","custom_height_medium":"","custom_height_responsive":"","total_post":"custom","total_posts_count":"10","posts_per_page":"5","exclude_current_post":"yes","post_grid_count":{"desktop":"1","tablet":"1","mobile":"1"},"post_spacing":"0","auto_play":"yes","stop_on_hover":"no","lazy_load":"no","slides_center_align":"yes","transition_speed":"2","slides_speed":"","slide_loop":"yes","slider_pagination":"yes","slider_navigation":"no","post_slider_arrow_font_size":"30","arrow_color":"000000","arrow_hover_color":"eeeeee","arrow_bg_color":"","arrow_bg_hover_color":"","arrow_border":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"arrow_border_hover_color":"","post_slider_dot_bg_color":"666666","post_slider_dot_bg_hover":"000000","post_slider_dot_width":"10","post_slider_dot_border_radius":"100","post_bg_color":"ffffff","post_bg_color_hover":"ffffff","post_content_alignment":"left","field_separator_1":"","post_border_group":{"style":"solid","color":"d9d9d9","width":{"top":"0","right":"0","bottom":"1","left":"0"},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"post_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"post_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"show_image_effect":"no","image_effect_opacity":"","image_effect_brightness":"","image_effect_contrast":"","image_effect_saturate":"","image_effect_hue_rotate":"","image_effect_grayscale":"","image_effect_blur":"","image_effect_sepia":"","image_effect_invert":"","image_effect_opacity_hover":"","image_effect_brightness_hover":"","image_effect_contrast_hover":"","image_effect_saturate_hover":"","image_effect_hue_rotate_hover":"","image_effect_grayscale_hover":"","image_effect_blur_hover":"","image_effect_sepia_hover":"","image_effect_invert_hover":"","post_title_divider_color":"333333","post_category_bg_color":"000000","post_category_text_color":"ffffff","post_category_position":"left","post_title_overlay_color":"000000","post_title_overlay_opacity":"50","post_date_day_bg_color":"f9f9f9","post_date_day_text_color":"888888","post_date_month_bg_color":"000000","post_date_month_text_color":"ffffff","post_date_bg_color":"000000","post_date_text_color":"ffffff","post_date_border_radius":"2","product_rating_color":"000000","product_price_color":"000000","button_width":"default","button_bg_color":"666666","button_bg_hover_color":"000000","button_text_color":"ffffff","button_text_hover_color":"","button_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_hover_color":"eeeeee","button_margin":{"top":"10","bottom":"5"},"responsive_filter":"no","filter_alignment":"left","filter_margin":"0","filter_bg_color":"","filter_bg_color_active":"","filter_text_color":"333333","filter_text_color_active":"000000","filter_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_hover_color":"","filter_toggle_bg":"ffffff","filter_toggle_color":"444444","filter_toggle_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination":"load_more","load_more_text":"Visa fler","no_results_message":"Ledsen, vi hittade inga inl\u00e4gg. F\u00f6rs\u00f6k igen","show_search":"no","pagination_nofollow":"no","pagination_align":"center","pagination_spacing_v":"0","pagination_spacing":"0","pagination_bg_color":"ffffff","pagination_bg_color_hover":"ffffff","pagination_color":"f05123","pagination_color_hover":"","pagination_border_group":{"style":"solid","color":"6b6b6b","width":{"top":"1","right":"0","bottom":"0","left":"0"},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"title_tag":"h3","title_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":"px"},"text_align":"left","letter_spacing":{"length":"0"},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_font_color":"303130","title_margin":{"top":"10","bottom":"0"},"content_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_font_color":"","description_margin":{"top":"5","bottom":"5"},"meta_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"meta_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"meta_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"post_meta_font_color":"606060","post_meta_bg_color":"333","event_date_color":"","event_date_case":"default","field_separator_e1":"","event_venue_color":"","field_separator_e2":"","event_cost_color":"","button_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"button_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"button_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"pagination_font_size":"14","pagination_font_size_medium":"","pagination_font_size_responsive":"","responsive_display":"","visibility_display":"","visibility_user_capability":"","visibility_logic":"[]","animation":{"style":"","delay":"0","duration":"1"},"container_element":"div","id":"","class":"","arrow_padding_top":"10","arrow_padding_right":"10","arrow_padding_bottom":"10","arrow_padding_left":"10","post_grid_padding_top":"0","post_grid_padding_top_medium":"","post_grid_padding_top_responsive":"","post_grid_padding_right":"0","post_grid_padding_right_medium":"","post_grid_padding_right_responsive":"","post_grid_padding_bottom":"0","post_grid_padding_bottom_medium":"","post_grid_padding_bottom_responsive":"","post_grid_padding_left":"0","post_grid_padding_left_medium":"","post_grid_padding_left_responsive":"","post_content_padding_top":"0","post_content_padding_top_medium":"","post_content_padding_top_responsive":"","post_content_padding_right":"5","post_content_padding_right_medium":"","post_content_padding_right_responsive":"","post_content_padding_bottom":"0","post_content_padding_bottom_medium":"","post_content_padding_bottom_responsive":"","post_content_padding_left":"12","post_content_padding_left_medium":"","post_content_padding_left_responsive":"","button_padding_top":"10","button_padding_top_medium":"","button_padding_top_responsive":"","button_padding_right":"10","button_padding_right_medium":"","button_padding_right_responsive":"","button_padding_bottom":"10","button_padding_bottom_medium":"","button_padding_bottom_responsive":"","button_padding_left":"10","button_padding_left_medium":"","button_padding_left_responsive":"","filter_padding_top":"0","filter_padding_right":"0","filter_padding_bottom":"0","filter_padding_left":"0","pagination_padding_top":"10","pagination_padding_right":"10","pagination_padding_bottom":"10","pagination_padding_left":"10","margin_top":"0","margin_unit":"px","margin_top_medium":"","margin_medium_unit":"px","margin_top_responsive":"","margin_responsive_unit":"px","margin_right":"0","margin_right_medium":"","margin_right_responsive":"","margin_bottom":"0","margin_bottom_medium":"","margin_bottom_responsive":"","margin_left":"0","margin_left_medium":"","margin_left_responsive":"","type":"pp-content-grid","connections":{"arrow_color":"","arrow_hover_color":"","arrow_bg_color":"","arrow_bg_hover_color":"","arrow_border_hover_color":"","post_slider_dot_bg_color":"","post_slider_dot_bg_hover":"","custom_content":"","more_link_text":"","all_filter_label":"","post_bg_color":"","post_bg_color_hover":"","post_title_divider_color":"","post_category_bg_color":"","post_category_text_color":"","post_title_overlay_color":"","post_date_day_bg_color":"","post_date_day_text_color":"","post_date_month_bg_color":"","post_date_month_text_color":"","post_date_bg_color":"","post_date_text_color":"","product_rating_color":"","product_price_color":"","button_bg_color":"","button_bg_hover_color":"","button_text_color":"","button_text_hover_color":"","button_border_hover_color":"","filter_bg_color":"","filter_bg_color_active":"","filter_text_color":"","filter_text_color_active":"","filter_border_hover_color":"","filter_toggle_bg":"","filter_toggle_color":"","pagination_bg_color":"","pagination_bg_color_hover":"","pagination_color":"","pagination_color_hover":"","title_font_color":"","content_font_color":"","post_meta_font_color":"","post_meta_bg_color":"","event_date_color":"","event_venue_color":"","event_cost_color":""},"data_source":"custom_query","data_source_acf_relational_type":"relationship","data_source_acf_relational_key":"","post_type":"post","order_by":"date","order_by_meta_key":"","order":"DESC","offset":"0","posts_post_matching":"1","posts_post":"","tax_post_category_matching":"1","tax_post_category":"250","tax_post_post_tag_matching":"1","tax_post_post_tag":"","posts_page_matching":"1","posts_page":"","users_matching":"1","users":"","show_title":"yes","show_content":"no","content_type":"excerpt","custom_content":"","content_length":"300","more_link_type":"title_thumb","more_link_text":"Read More","post_grid_filters_display":"no","post_grid_filters_type":"static","post_grid_filters":"category","all_filter_label":"All","show_image":"yes","image_thumb_size":"medium","image_thumb_crop":"","fallback_image":"default","fallback_image_custom":"","show_author":"no","show_date":"no","show_categories":"no","post_taxonomies":"category","meta_separator":" | ","as_values_posts_post":"","as_values_tax_post_category":"","as_values_tax_post_post_tag":"","as_values_posts_page":"","as_values_users":"","fallback_image_custom_src":"","posts_hamnenplay_matching":"1","posts_hamnenplay":"","as_values_posts_hamnenplay":""},
		pagination: 'load_more',
		current_page: 'http://olle.dyndns-ip.com/hamnen_wordpress/hamnen_wordpress/?s=kunskap',
		page: '0',
		is_tax: false,
		is_author: false,
		postSpacing: '0',
		postColumns: {
			desktop: 1,
			tablet: 1,
			mobile: 1,
		},
		matchHeight: 'yes',
		filters: false,
					filterTax: 'category',
			filterType: 'static',
							};

	
	
	
	
	ppcg_5d5bd763adcd1 = new PPContentGrid( PPContentGridOptions );
	
	// expandable row fix.
	var state = 0;
	$(document).on('pp_expandable_row_toggle', function(e, selector) {
		if ( selector.is('.pp-er-open') && state === 0 ) {
			ppcg_5d5bd763adcd1 = new PPContentGrid( PPContentGridOptions );
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


var ppcg_5d5bd763adce4 = '';

;(function($) {
	var left_arrow_svg = '<svg aria-hidden="true" data-prefix="fal" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-left fa-w-6 fa-2x"><path fill="currentColor" d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z" class=""></path></svg>';
	var right_arrow_svg = '<svg aria-hidden="true" data-prefix="fal" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-right fa-w-6 fa-2x"><path fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" class=""></path></svg>';

	var PPContentGridOptions = {
		id: '5d5bd763adce4',
		layout: 'grid',
		style: 'custom',
		ajaxUrl: 'http://olle.dyndns-ip.com/hamnen_wordpress/wp-admin/admin-ajax.php',
		perPage: '3',
		fields: {"layout":"grid","post_grid_style_select":"custom","custom_layout":{"html":"<div class=\"pp-custom-grid-post-text\">\n<a href=\"[wpbb post:url]\">\n<img src=\"[wpbb post:custom_field key='thumbnailimage']\"\/>\n<div class=\"pp-custom-grid-post-langd\"><div class=\"pp-custom-grid-post-play\"><\/div><span class=\"time\">[wpbb post:excerpt length='1' more=' ']<\/span><\/div>\n<div><h3 class=\"pp-post-title\">[wpbb post:title]<\/h3><\/div><\/a>\n<\/div>","css":".pp-content-grid-post {\n    font-size: 14px;\n}\n.pp-content-grid-post-image {\n    padding: 20px;\n    padding-bottom: 0;\n}\n.pp-content-grid-post-text {\n    padding: 20px;\n}\n.pp-content-grid-post-title {\n    font-size: 20px;\n\tline-height: 26px;\n\tmargin: 0;\n\tpadding: 0;\n}\n.pp-content-grid-post-meta {\n    padding: 0;\n}\n.pp-content-grid-post-meta a {\n    text-decoration: none;\n}\n.pp-content-grid-post-meta,\n.pp-content-grid-post-meta a {\n    color: #888;\n    font-size: 12px;\n}\n.pp-content-grid-post-meta a:hover {\n    color: #000;\n}\n.pp-content-grid-separator {\n    min-height: 2px;\n    width: 60px;\n    background: #000;\n    margin-top: 10px;\n    margin-bottom: 20px;\n}\n","connections":{"html":""}},"match_height":"no","custom_height":"275","custom_height_medium":"","custom_height_responsive":"","total_post":"custom","total_posts_count":"9","posts_per_page":"3","exclude_current_post":"no","post_grid_count":{"desktop":"1","tablet":"1","mobile":"1"},"post_spacing":"0","auto_play":"yes","stop_on_hover":"no","lazy_load":"no","slides_center_align":"yes","transition_speed":"2","slides_speed":"","slide_loop":"yes","slider_pagination":"yes","slider_navigation":"no","post_slider_arrow_font_size":"30","arrow_color":"000000","arrow_hover_color":"eeeeee","arrow_bg_color":"","arrow_bg_hover_color":"","arrow_border":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"arrow_border_hover_color":"","post_slider_dot_bg_color":"666666","post_slider_dot_bg_hover":"000000","post_slider_dot_width":"10","post_slider_dot_border_radius":"100","post_bg_color":"121212","post_bg_color_hover":"","post_content_alignment":"left","field_separator_1":"","post_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"0","top_right":"0","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"post_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"post_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"show_image_effect":"no","image_effect_opacity":"","image_effect_brightness":"","image_effect_contrast":"","image_effect_saturate":"","image_effect_hue_rotate":"","image_effect_grayscale":"","image_effect_blur":"","image_effect_sepia":"","image_effect_invert":"","image_effect_opacity_hover":"","image_effect_brightness_hover":"","image_effect_contrast_hover":"","image_effect_saturate_hover":"","image_effect_hue_rotate_hover":"","image_effect_grayscale_hover":"","image_effect_blur_hover":"","image_effect_sepia_hover":"","image_effect_invert_hover":"","post_title_divider_color":"333333","post_category_bg_color":"000000","post_category_text_color":"ffffff","post_category_position":"left","post_title_overlay_color":"000000","post_title_overlay_opacity":"50","post_date_day_bg_color":"f9f9f9","post_date_day_text_color":"888888","post_date_month_bg_color":"000000","post_date_month_text_color":"ffffff","post_date_bg_color":"000000","post_date_text_color":"ffffff","post_date_border_radius":"2","product_rating_color":"000000","product_price_color":"000000","button_width":"default","button_bg_color":"666666","button_bg_hover_color":"000000","button_text_color":"ffffff","button_text_hover_color":"","button_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_hover_color":"eeeeee","button_margin":{"top":"10","bottom":"5"},"responsive_filter":"no","filter_alignment":"left","filter_margin":"10","filter_bg_color":"","filter_bg_color_active":"","filter_text_color":"333333","filter_text_color_active":"000000","filter_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_hover_color":"","filter_toggle_bg":"ffffff","filter_toggle_color":"444444","filter_toggle_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination":"load_more","load_more_text":"Visa fler","no_results_message":"Sorry, we couldn't find any posts. Please try a different search.","show_search":"no","pagination_nofollow":"no","pagination_align":"center","pagination_spacing_v":"15","pagination_spacing":"5","pagination_bg_color":"272727","pagination_bg_color_hover":"","pagination_color":"f05123","pagination_color_hover":"","pagination_border_group":{"style":"solid","color":"ffffff","width":{"top":"1","right":"0","bottom":"0","left":"0"},"radius":{"top_left":"0","top_right":"0","bottom_left":"4","bottom_right":"4"},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"title_tag":"h3","title_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_font_color":"","title_margin":{"top":"5","bottom":"5"},"content_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_font_color":"","description_margin":{"top":"5","bottom":"5"},"meta_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"meta_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"meta_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"post_meta_font_color":"606060","post_meta_bg_color":"333","event_date_color":"","event_date_case":"default","field_separator_e1":"","event_venue_color":"","field_separator_e2":"","event_cost_color":"","button_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"button_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"button_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"pagination_font_size":"14","pagination_font_size_medium":"","pagination_font_size_responsive":"","responsive_display":"","visibility_display":"","visibility_user_capability":"","visibility_logic":"[]","animation":{"style":"","delay":"0","duration":"1"},"container_element":"div","id":"","class":"","arrow_padding_top":"10","arrow_padding_right":"10","arrow_padding_bottom":"10","arrow_padding_left":"10","post_grid_padding_top":"0","post_grid_padding_top_medium":"","post_grid_padding_top_responsive":"","post_grid_padding_right":"0","post_grid_padding_right_medium":"","post_grid_padding_right_responsive":"","post_grid_padding_bottom":"0","post_grid_padding_bottom_medium":"","post_grid_padding_bottom_responsive":"","post_grid_padding_left":"0","post_grid_padding_left_medium":"","post_grid_padding_left_responsive":"","post_content_padding_top":"10","post_content_padding_top_medium":"","post_content_padding_top_responsive":"","post_content_padding_right":"10","post_content_padding_right_medium":"","post_content_padding_right_responsive":"","post_content_padding_bottom":"10","post_content_padding_bottom_medium":"","post_content_padding_bottom_responsive":"","post_content_padding_left":"10","post_content_padding_left_medium":"","post_content_padding_left_responsive":"","button_padding_top":"10","button_padding_top_medium":"","button_padding_top_responsive":"","button_padding_right":"10","button_padding_right_medium":"","button_padding_right_responsive":"","button_padding_bottom":"10","button_padding_bottom_medium":"","button_padding_bottom_responsive":"","button_padding_left":"10","button_padding_left_medium":"","button_padding_left_responsive":"","filter_padding_top":"8","filter_padding_right":"8","filter_padding_bottom":"8","filter_padding_left":"8","pagination_padding_top":"10","pagination_padding_right":"10","pagination_padding_bottom":"10","pagination_padding_left":"10","margin_top":"0","margin_unit":"px","margin_top_medium":"","margin_medium_unit":"px","margin_top_responsive":"","margin_responsive_unit":"px","margin_right":"0","margin_right_medium":"","margin_right_responsive":"","margin_bottom":"0","margin_bottom_medium":"","margin_bottom_responsive":"","margin_left":"0","margin_left_medium":"","margin_left_responsive":"","type":"pp-content-grid","connections":{"arrow_color":"","arrow_hover_color":"","arrow_bg_color":"","arrow_bg_hover_color":"","arrow_border_hover_color":"","post_slider_dot_bg_color":"","post_slider_dot_bg_hover":"","custom_content":"","more_link_text":"","all_filter_label":"","post_bg_color":"","post_bg_color_hover":"","post_title_divider_color":"","post_category_bg_color":"","post_category_text_color":"","post_title_overlay_color":"","post_date_day_bg_color":"","post_date_day_text_color":"","post_date_month_bg_color":"","post_date_month_text_color":"","post_date_bg_color":"","post_date_text_color":"","product_rating_color":"","product_price_color":"","button_bg_color":"","button_bg_hover_color":"","button_text_color":"","button_text_hover_color":"","button_border_hover_color":"","filter_bg_color":"","filter_bg_color_active":"","filter_text_color":"","filter_text_color_active":"","filter_border_hover_color":"","filter_toggle_bg":"","filter_toggle_color":"","pagination_bg_color":"","pagination_bg_color_hover":"","pagination_color":"","pagination_color_hover":"","title_font_color":"","content_font_color":"","post_meta_font_color":"","post_meta_bg_color":"","event_date_color":"","event_venue_color":"","event_cost_color":""},"data_source":"custom_query","data_source_acf_relational_type":"relationship","data_source_acf_relational_key":"","post_type":"hamnenplay","order_by":"date","order_by_meta_key":"","order":"DESC","offset":"0","posts_post_matching":"1","posts_post":"","tax_post_category_matching":"1","tax_post_category":"","tax_post_post_tag_matching":"1","tax_post_post_tag":"","posts_page_matching":"1","posts_page":"","posts_hamnenplay_matching":"0","posts_hamnenplay":"27267","users_matching":"1","users":"","show_title":"yes","show_content":"yes","content_type":"excerpt","custom_content":"","content_length":"300","more_link_type":"box","more_link_text":"Read More","post_grid_filters_display":"no","post_grid_filters_type":"dynamic","all_filter_label":"All","show_image":"yes","image_thumb_size":"large","image_thumb_crop":"","fallback_image":"default","fallback_image_custom":"","show_author":"yes","show_date":"yes","show_categories":"no","meta_separator":" | ","as_values_posts_post":"","as_values_tax_post_category":"","as_values_tax_post_post_tag":"","as_values_posts_page":"","as_values_posts_hamnenplay":"","as_values_users":"","post_grid_filters":"","fallback_image_custom_src":"","post_taxonomies":""},
		pagination: 'load_more',
		current_page: 'http://olle.dyndns-ip.com/hamnen_wordpress/hamnen_wordpress/?s=kunskap',
		page: '0',
		is_tax: false,
		is_author: false,
		postSpacing: '0',
		postColumns: {
			desktop: 1,
			tablet: 1,
			mobile: 1,
		},
		matchHeight: 'no',
		filters: false,
					filterTax: '',
			filterType: 'dynamic',
						masonry: 'yes',
					};

	
	
	
	
	ppcg_5d5bd763adce4 = new PPContentGrid( PPContentGridOptions );
	
	// expandable row fix.
	var state = 0;
	$(document).on('pp_expandable_row_toggle', function(e, selector) {
		if ( selector.is('.pp-er-open') && state === 0 ) {
			ppcg_5d5bd763adce4 = new PPContentGrid( PPContentGridOptions );
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


var ppcg_5d5bd763adcd2 = '';

;(function($) {
	var left_arrow_svg = '<svg aria-hidden="true" data-prefix="fal" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-left fa-w-6 fa-2x"><path fill="currentColor" d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z" class=""></path></svg>';
	var right_arrow_svg = '<svg aria-hidden="true" data-prefix="fal" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-right fa-w-6 fa-2x"><path fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" class=""></path></svg>';

	var PPContentGridOptions = {
		id: '5d5bd763adcd2',
		layout: 'grid',
		style: 'style-8',
		ajaxUrl: 'http://olle.dyndns-ip.com/hamnen_wordpress/wp-admin/admin-ajax.php',
		perPage: '5',
		fields: {"layout":"grid","post_grid_style_select":"style-8","custom_layout":{"html":"[wpbb-if post:featured_image]\n<div class=\"pp-content-grid-post-image\">\n\t[wpbb post:featured_image size=\"large\" display=\"tag\" linked=\"yes\"]\n<\/div>\n[\/wpbb-if]\n\n<div class=\"pp-content-grid-post-text\">\n\n    <h3 class=\"pp-content-grid-post-title\">[wpbb post:link text=\"title\"]<\/h3>\n\n    <div class=\"pp-content-grid-post-meta\">\n    \t[wpbb post:date format=\"F j, Y\"]\n\t\t<span class=\"pp-content-grid-post-meta-sep\"> | <\/span>\n\t\t[wpbb post:terms_list taxonomy=\"category\" separator=\", \"]\n    <\/div>\n\n\t<div class=\"pp-content-grid-separator\"><\/div>\n\n    <div class=\"pp-content-grid-post-excerpt\">\n    \t[wpbb post:excerpt length=\"17\" more=\"...\"]\n    <\/div>\n\n    <div class=\"pp-content-grid-post-more-link\">\n    \t<a href=\"[wpbb post:url]\"><span class=\"fa fa-angle-right\"><\/span> Read More<\/a>\n    <\/div>\n\n<\/div>\n","css":".pp-content-grid-post {\n    font-size: 14px;\n}\n.pp-content-grid-post-image {\n    padding: 20px;\n    padding-bottom: 0;\n}\n.pp-content-grid-post-text {\n    padding: 20px;\n}\n.pp-content-grid-post-title {\n    font-size: 20px;\n\tline-height: 26px;\n\tmargin: 0;\n\tpadding: 0;\n}\n.pp-content-grid-post-meta {\n    padding: 0;\n}\n.pp-content-grid-post-meta a {\n    text-decoration: none;\n}\n.pp-content-grid-post-meta,\n.pp-content-grid-post-meta a {\n    color: #888;\n    font-size: 12px;\n}\n.pp-content-grid-post-meta a:hover {\n    color: #000;\n}\n.pp-content-grid-separator {\n    min-height: 2px;\n    width: 60px;\n    background: #000;\n    margin-top: 10px;\n    margin-bottom: 20px;\n}\n"},"match_height":"yes","custom_height":"199","custom_height_medium":"","custom_height_responsive":"","total_post":"custom","total_posts_count":"10","posts_per_page":"5","exclude_current_post":"yes","post_grid_count":{"desktop":"1","tablet":"1","mobile":"1"},"post_spacing":"0","auto_play":"yes","stop_on_hover":"no","lazy_load":"no","slides_center_align":"yes","transition_speed":"2","slides_speed":"","slide_loop":"yes","slider_pagination":"yes","slider_navigation":"no","post_slider_arrow_font_size":"30","arrow_color":"000000","arrow_hover_color":"eeeeee","arrow_bg_color":"","arrow_bg_hover_color":"","arrow_border":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"arrow_border_hover_color":"","post_slider_dot_bg_color":"666666","post_slider_dot_bg_hover":"000000","post_slider_dot_width":"10","post_slider_dot_border_radius":"100","post_bg_color":"ffffff","post_bg_color_hover":"ffffff","post_content_alignment":"left","field_separator_1":"","post_border_group":{"style":"solid","color":"d9d9d9","width":{"top":"0","right":"0","bottom":"1","left":"0"},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"post_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"post_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"show_image_effect":"no","image_effect_opacity":"","image_effect_brightness":"","image_effect_contrast":"","image_effect_saturate":"","image_effect_hue_rotate":"","image_effect_grayscale":"","image_effect_blur":"","image_effect_sepia":"","image_effect_invert":"","image_effect_opacity_hover":"","image_effect_brightness_hover":"","image_effect_contrast_hover":"","image_effect_saturate_hover":"","image_effect_hue_rotate_hover":"","image_effect_grayscale_hover":"","image_effect_blur_hover":"","image_effect_sepia_hover":"","image_effect_invert_hover":"","post_title_divider_color":"333333","post_category_bg_color":"000000","post_category_text_color":"ffffff","post_category_position":"left","post_title_overlay_color":"000000","post_title_overlay_opacity":"50","post_date_day_bg_color":"f9f9f9","post_date_day_text_color":"888888","post_date_month_bg_color":"000000","post_date_month_text_color":"ffffff","post_date_bg_color":"000000","post_date_text_color":"ffffff","post_date_border_radius":"2","product_rating_color":"000000","product_price_color":"000000","button_width":"default","button_bg_color":"666666","button_bg_hover_color":"000000","button_text_color":"ffffff","button_text_hover_color":"","button_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_hover_color":"eeeeee","button_margin":{"top":"10","bottom":"5"},"responsive_filter":"no","filter_alignment":"left","filter_margin":"0","filter_bg_color":"","filter_bg_color_active":"","filter_text_color":"333333","filter_text_color_active":"000000","filter_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_hover_color":"","filter_toggle_bg":"ffffff","filter_toggle_color":"444444","filter_toggle_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination":"load_more","load_more_text":"Visa fler","no_results_message":"Ledsen, vi hittade inga inl\u00e4gg. F\u00f6rs\u00f6k igen","show_search":"no","pagination_nofollow":"no","pagination_align":"center","pagination_spacing_v":"0","pagination_spacing":"0","pagination_bg_color":"ffffff","pagination_bg_color_hover":"ffffff","pagination_color":"f05123","pagination_color_hover":"","pagination_border_group":{"style":"solid","color":"6b6b6b","width":{"top":"1","right":"0","bottom":"0","left":"0"},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"title_tag":"h3","title_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":"px"},"text_align":"left","letter_spacing":{"length":"0"},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_font_color":"303130","title_margin":{"top":"10","bottom":"0"},"content_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_font_color":"","description_margin":{"top":"5","bottom":"5"},"meta_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"meta_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"meta_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"post_meta_font_color":"606060","post_meta_bg_color":"333","event_date_color":"","event_date_case":"default","field_separator_e1":"","event_venue_color":"","field_separator_e2":"","event_cost_color":"","button_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"button_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"button_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"pagination_font_size":14,"pagination_font_size_medium":"","pagination_font_size_responsive":"","responsive_display":"","visibility_display":"","visibility_user_capability":"","visibility_logic":"[]","animation":{"style":"","delay":"0","duration":"1"},"container_element":"div","id":"","class":"","arrow_padding_top":"10","arrow_padding_right":"10","arrow_padding_bottom":"10","arrow_padding_left":"10","post_grid_padding_top":"0","post_grid_padding_top_medium":"","post_grid_padding_top_responsive":"","post_grid_padding_right":"0","post_grid_padding_right_medium":"","post_grid_padding_right_responsive":"","post_grid_padding_bottom":"0","post_grid_padding_bottom_medium":"","post_grid_padding_bottom_responsive":"","post_grid_padding_left":"0","post_grid_padding_left_medium":"","post_grid_padding_left_responsive":"","post_content_padding_top":"0","post_content_padding_top_medium":"","post_content_padding_top_responsive":"","post_content_padding_right":"5","post_content_padding_right_medium":"","post_content_padding_right_responsive":"","post_content_padding_bottom":"0","post_content_padding_bottom_medium":"","post_content_padding_bottom_responsive":"","post_content_padding_left":"12","post_content_padding_left_medium":"","post_content_padding_left_responsive":"","button_padding_top":"10","button_padding_top_medium":"","button_padding_top_responsive":"","button_padding_right":"10","button_padding_right_medium":"","button_padding_right_responsive":"","button_padding_bottom":"10","button_padding_bottom_medium":"","button_padding_bottom_responsive":"","button_padding_left":"10","button_padding_left_medium":"","button_padding_left_responsive":"","filter_padding_top":"0","filter_padding_right":"0","filter_padding_bottom":"0","filter_padding_left":"0","pagination_padding_top":"10","pagination_padding_right":"10","pagination_padding_bottom":"10","pagination_padding_left":"10","margin_top":"0","margin_unit":"px","margin_top_medium":"","margin_medium_unit":"px","margin_top_responsive":"","margin_responsive_unit":"px","margin_right":"0","margin_right_medium":"","margin_right_responsive":"","margin_bottom":"0","margin_bottom_medium":"","margin_bottom_responsive":"","margin_left":"0","margin_left_medium":"","margin_left_responsive":"","type":"pp-content-grid","connections":{"arrow_color":"","arrow_hover_color":"","arrow_bg_color":"","arrow_bg_hover_color":"","arrow_border_hover_color":"","post_slider_dot_bg_color":"","post_slider_dot_bg_hover":"","custom_content":"","more_link_text":"","all_filter_label":"","post_bg_color":"","post_bg_color_hover":"","post_title_divider_color":"","post_category_bg_color":"","post_category_text_color":"","post_title_overlay_color":"","post_date_day_bg_color":"","post_date_day_text_color":"","post_date_month_bg_color":"","post_date_month_text_color":"","post_date_bg_color":"","post_date_text_color":"","product_rating_color":"","product_price_color":"","button_bg_color":"","button_bg_hover_color":"","button_text_color":"","button_text_hover_color":"","button_border_hover_color":"","filter_bg_color":"","filter_bg_color_active":"","filter_text_color":"","filter_text_color_active":"","filter_border_hover_color":"","filter_toggle_bg":"","filter_toggle_color":"","pagination_bg_color":"","pagination_bg_color_hover":"","pagination_color":"","pagination_color_hover":"","title_font_color":"","content_font_color":"","post_meta_font_color":"","post_meta_bg_color":"","event_date_color":"","event_venue_color":"","event_cost_color":""},"data_source":"custom_query","data_source_acf_relational_type":"relationship","data_source_acf_relational_key":"","post_type":"post","order_by":"meta_value_num","order_by_meta_key":"wpb_post_views_count","order":"DESC","offset":"0","posts_post_matching":"0","posts_post":"26799","tax_post_category_matching":"1","tax_post_category":"","tax_post_post_tag_matching":"1","tax_post_post_tag":"","posts_page_matching":"1","posts_page":"","users_matching":"1","users":"","show_title":"yes","show_content":"no","content_type":"excerpt","custom_content":"","content_length":"300","more_link_type":"title_thumb","more_link_text":"Read More","post_grid_filters_display":"no","post_grid_filters_type":"static","post_grid_filters":"category","all_filter_label":"All","show_image":"yes","image_thumb_size":"medium","image_thumb_crop":"","fallback_image":"default","fallback_image_custom":"","show_author":"no","show_date":"no","show_categories":"no","post_taxonomies":"category","meta_separator":" | ","as_values_posts_post":"","as_values_tax_post_category":"","as_values_tax_post_post_tag":"","as_values_posts_page":"","as_values_users":"","fallback_image_custom_src":""},
		pagination: 'load_more',
		current_page: 'http://olle.dyndns-ip.com/hamnen_wordpress/hamnen_wordpress/?s=kunskap',
		page: '0',
		is_tax: false,
		is_author: false,
		postSpacing: '0',
		postColumns: {
			desktop: 1,
			tablet: 1,
			mobile: 1,
		},
		matchHeight: 'yes',
		filters: false,
					filterTax: 'category',
			filterType: 'static',
							};

	
	
	
	
	ppcg_5d5bd763adcd2 = new PPContentGrid( PPContentGridOptions );
	
	// expandable row fix.
	var state = 0;
	$(document).on('pp_expandable_row_toggle', function(e, selector) {
		if ( selector.is('.pp-er-open') && state === 0 ) {
			ppcg_5d5bd763adcd2 = new PPContentGrid( PPContentGridOptions );
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
		$( '.fl-node-5d5bd763adce0 .fl-photo-img' )
			.on( 'mouseenter', function( e ) {
				$( this ).data( 'title', $( this ).attr( 'title' ) ).removeAttr( 'title' );
			} )
			.on( 'mouseleave', function( e ){
				$( this ).attr( 'title', $( this ).data( 'title' ) ).data( 'title', null );
			} );
	});
});


var ppcg_5d5bd763adced = '';

;(function($) {
	var left_arrow_svg = '<svg aria-hidden="true" data-prefix="fal" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-left fa-w-6 fa-2x"><path fill="currentColor" d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z" class=""></path></svg>';
	var right_arrow_svg = '<svg aria-hidden="true" data-prefix="fal" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-right fa-w-6 fa-2x"><path fill="currentColor" d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z" class=""></path></svg>';

	var PPContentGridOptions = {
		id: '5d5bd763adced',
		layout: 'grid',
		style: 'style-8',
		ajaxUrl: 'http://olle.dyndns-ip.com/hamnen_wordpress/wp-admin/admin-ajax.php',
		perPage: '5',
		fields: {"layout":"grid","post_grid_style_select":"style-8","custom_layout":{"html":"[wpbb-if post:featured_image]\n<div class=\"pp-content-grid-post-image\">\n\t[wpbb post:featured_image size=\"large\" display=\"tag\" linked=\"yes\"]\n<\/div>\n[\/wpbb-if]\n\n<div class=\"pp-content-grid-post-text\">\n\n    <h3 class=\"pp-content-grid-post-title\">[wpbb post:link text=\"title\"]<\/h3>\n\n    <div class=\"pp-content-grid-post-meta\">\n    \t[wpbb post:date format=\"F j, Y\"]\n\t\t<span class=\"pp-content-grid-post-meta-sep\"> | <\/span>\n\t\t[wpbb post:terms_list taxonomy=\"category\" separator=\", \"]\n    <\/div>\n\n\t<div class=\"pp-content-grid-separator\"><\/div>\n\n    <div class=\"pp-content-grid-post-excerpt\">\n    \t[wpbb post:excerpt length=\"17\" more=\"...\"]\n    <\/div>\n\n    <div class=\"pp-content-grid-post-more-link\">\n    \t<a href=\"[wpbb post:url]\"><span class=\"fa fa-angle-right\"><\/span> Read More<\/a>\n    <\/div>\n\n<\/div>\n","css":".pp-content-grid-post {\n    font-size: 14px;\n}\n.pp-content-grid-post-image {\n    padding: 20px;\n    padding-bottom: 0;\n}\n.pp-content-grid-post-text {\n    padding: 20px;\n}\n.pp-content-grid-post-title {\n    font-size: 20px;\n\tline-height: 26px;\n\tmargin: 0;\n\tpadding: 0;\n}\n.pp-content-grid-post-meta {\n    padding: 0;\n}\n.pp-content-grid-post-meta a {\n    text-decoration: none;\n}\n.pp-content-grid-post-meta,\n.pp-content-grid-post-meta a {\n    color: #888;\n    font-size: 12px;\n}\n.pp-content-grid-post-meta a:hover {\n    color: #000;\n}\n.pp-content-grid-separator {\n    min-height: 2px;\n    width: 60px;\n    background: #000;\n    margin-top: 10px;\n    margin-bottom: 20px;\n}\n"},"match_height":"yes","custom_height":"199","custom_height_medium":"","custom_height_responsive":"","total_post":"custom","total_posts_count":"10","posts_per_page":"5","exclude_current_post":"yes","post_grid_count":{"desktop":"1","tablet":"1","mobile":"1"},"post_spacing":"0","auto_play":"yes","stop_on_hover":"no","lazy_load":"no","slides_center_align":"yes","transition_speed":"2","slides_speed":"","slide_loop":"yes","slider_pagination":"yes","slider_navigation":"no","post_slider_arrow_font_size":"30","arrow_color":"000000","arrow_hover_color":"eeeeee","arrow_bg_color":"","arrow_bg_hover_color":"","arrow_border":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"arrow_border_hover_color":"","post_slider_dot_bg_color":"666666","post_slider_dot_bg_hover":"000000","post_slider_dot_width":"10","post_slider_dot_border_radius":"100","post_bg_color":"ffffff","post_bg_color_hover":"ffffff","post_content_alignment":"left","field_separator_1":"","post_border_group":{"style":"solid","color":"d9d9d9","width":{"top":"0","right":"0","bottom":"1","left":"0"},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"post_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"post_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"show_image_effect":"no","image_effect_opacity":"","image_effect_brightness":"","image_effect_contrast":"","image_effect_saturate":"","image_effect_hue_rotate":"","image_effect_grayscale":"","image_effect_blur":"","image_effect_sepia":"","image_effect_invert":"","image_effect_opacity_hover":"","image_effect_brightness_hover":"","image_effect_contrast_hover":"","image_effect_saturate_hover":"","image_effect_hue_rotate_hover":"","image_effect_grayscale_hover":"","image_effect_blur_hover":"","image_effect_sepia_hover":"","image_effect_invert_hover":"","post_title_divider_color":"333333","post_category_bg_color":"000000","post_category_text_color":"ffffff","post_category_position":"left","post_title_overlay_color":"000000","post_title_overlay_opacity":"50","post_date_day_bg_color":"f9f9f9","post_date_day_text_color":"888888","post_date_month_bg_color":"000000","post_date_month_text_color":"ffffff","post_date_bg_color":"000000","post_date_text_color":"ffffff","post_date_border_radius":"2","product_rating_color":"000000","product_price_color":"000000","button_width":"default","button_bg_color":"666666","button_bg_hover_color":"000000","button_text_color":"ffffff","button_text_hover_color":"","button_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"button_border_hover_color":"eeeeee","button_margin":{"top":"10","bottom":"5"},"responsive_filter":"no","filter_alignment":"left","filter_margin":"0","filter_bg_color":"","filter_bg_color_active":"","filter_text_color":"333333","filter_text_color_active":"000000","filter_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"filter_border_hover_color":"","filter_toggle_bg":"ffffff","filter_toggle_color":"444444","filter_toggle_border_group":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination":"load_more","load_more_text":"Visa fler","no_results_message":"Ledsen, vi hittade inga inl\u00e4gg. F\u00f6rs\u00f6k igen","show_search":"no","pagination_nofollow":"no","pagination_align":"center","pagination_spacing_v":"0","pagination_spacing":"0","pagination_bg_color":"ffffff","pagination_bg_color_hover":"ffffff","pagination_color":"f05123","pagination_color_hover":"","pagination_border_group":{"style":"solid","color":"6b6b6b","width":{"top":"1","right":"0","bottom":"0","left":"0"},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination_border_group_medium":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"pagination_border_group_responsive":{"style":"","color":"","width":{"top":"","right":"","bottom":"","left":""},"radius":{"top_left":"","top_right":"","bottom_left":"","bottom_right":""},"shadow":{"color":"","horizontal":"","vertical":"","blur":"","spread":""}},"title_tag":"h3","title_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":"px"},"text_align":"left","letter_spacing":{"length":"0"},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"title_font_color":"303130","title_margin":{"top":"10","bottom":"0"},"content_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"content_font_color":"","description_margin":{"top":"5","bottom":"5"},"meta_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"meta_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"meta_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"post_meta_font_color":"606060","post_meta_bg_color":"333","event_date_color":"","event_date_case":"default","field_separator_e1":"","event_venue_color":"","field_separator_e2":"","event_cost_color":"","button_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"button_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"button_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography":{"font_family":"Default","font_weight":"default","font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography_medium":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"filter_typography_responsive":{"font_size":{"length":"","unit":"px"},"line_height":{"length":"","unit":""},"text_align":"","letter_spacing":{"length":""},"text_transform":"","text_decoration":"","font_style":"","font_variant":"","text_shadow":{"color":"","horizontal":"","vertical":"","blur":""}},"pagination_font_size":"14","pagination_font_size_medium":"","pagination_font_size_responsive":"","responsive_display":"","visibility_display":"","visibility_user_capability":"","visibility_logic":"[]","animation":{"style":"","delay":"0","duration":"1"},"container_element":"div","id":"","class":"","arrow_padding_top":"10","arrow_padding_right":"10","arrow_padding_bottom":"10","arrow_padding_left":"10","post_grid_padding_top":"0","post_grid_padding_top_medium":"","post_grid_padding_top_responsive":"","post_grid_padding_right":"0","post_grid_padding_right_medium":"","post_grid_padding_right_responsive":"","post_grid_padding_bottom":"0","post_grid_padding_bottom_medium":"","post_grid_padding_bottom_responsive":"","post_grid_padding_left":"0","post_grid_padding_left_medium":"","post_grid_padding_left_responsive":"","post_content_padding_top":"0","post_content_padding_top_medium":"","post_content_padding_top_responsive":"","post_content_padding_right":"5","post_content_padding_right_medium":"","post_content_padding_right_responsive":"","post_content_padding_bottom":"0","post_content_padding_bottom_medium":"","post_content_padding_bottom_responsive":"","post_content_padding_left":"12","post_content_padding_left_medium":"","post_content_padding_left_responsive":"","button_padding_top":"10","button_padding_top_medium":"","button_padding_top_responsive":"","button_padding_right":"10","button_padding_right_medium":"","button_padding_right_responsive":"","button_padding_bottom":"10","button_padding_bottom_medium":"","button_padding_bottom_responsive":"","button_padding_left":"10","button_padding_left_medium":"","button_padding_left_responsive":"","filter_padding_top":"0","filter_padding_right":"0","filter_padding_bottom":"0","filter_padding_left":"0","pagination_padding_top":"10","pagination_padding_right":"10","pagination_padding_bottom":"10","pagination_padding_left":"10","margin_top":"0","margin_unit":"px","margin_top_medium":"","margin_medium_unit":"px","margin_top_responsive":"","margin_responsive_unit":"px","margin_right":"0","margin_right_medium":"","margin_right_responsive":"","margin_bottom":"0","margin_bottom_medium":"","margin_bottom_responsive":"","margin_left":"0","margin_left_medium":"","margin_left_responsive":"","type":"pp-content-grid","connections":{"arrow_color":"","arrow_hover_color":"","arrow_bg_color":"","arrow_bg_hover_color":"","arrow_border_hover_color":"","post_slider_dot_bg_color":"","post_slider_dot_bg_hover":"","custom_content":"","more_link_text":"","all_filter_label":"","post_bg_color":"","post_bg_color_hover":"","post_title_divider_color":"","post_category_bg_color":"","post_category_text_color":"","post_title_overlay_color":"","post_date_day_bg_color":"","post_date_day_text_color":"","post_date_month_bg_color":"","post_date_month_text_color":"","post_date_bg_color":"","post_date_text_color":"","product_rating_color":"","product_price_color":"","button_bg_color":"","button_bg_hover_color":"","button_text_color":"","button_text_hover_color":"","button_border_hover_color":"","filter_bg_color":"","filter_bg_color_active":"","filter_text_color":"","filter_text_color_active":"","filter_border_hover_color":"","filter_toggle_bg":"","filter_toggle_color":"","pagination_bg_color":"","pagination_bg_color_hover":"","pagination_color":"","pagination_color_hover":"","title_font_color":"","content_font_color":"","post_meta_font_color":"","post_meta_bg_color":"","event_date_color":"","event_venue_color":"","event_cost_color":""},"data_source":"custom_query","data_source_acf_relational_type":"relationship","data_source_acf_relational_key":"","post_type":"post","order_by":"date","order_by_meta_key":"","order":"DESC","offset":"0","posts_post_matching":"1","posts_post":"","tax_post_category_matching":"1","tax_post_category":"269","tax_post_post_tag_matching":"1","tax_post_post_tag":"","posts_page_matching":"1","posts_page":"","users_matching":"1","users":"","show_title":"yes","show_content":"no","content_type":"excerpt","custom_content":"","content_length":"300","more_link_type":"title_thumb","more_link_text":"Read More","post_grid_filters_display":"no","post_grid_filters_type":"static","post_grid_filters":"category","all_filter_label":"All","show_image":"yes","image_thumb_size":"medium","image_thumb_crop":"","fallback_image":"default","fallback_image_custom":"","show_author":"no","show_date":"no","show_categories":"no","post_taxonomies":"category","meta_separator":" | ","as_values_posts_post":"","as_values_tax_post_category":"","as_values_tax_post_post_tag":"","as_values_posts_page":"","as_values_users":"","fallback_image_custom_src":"","posts_hamnenplay_matching":"1","posts_hamnenplay":"","as_values_posts_hamnenplay":""},
		pagination: 'load_more',
		current_page: 'http://olle.dyndns-ip.com/hamnen_wordpress/hamnen_wordpress/?s=kunskap',
		page: '0',
		is_tax: false,
		is_author: false,
		postSpacing: '0',
		postColumns: {
			desktop: 1,
			tablet: 1,
			mobile: 1,
		},
		matchHeight: 'yes',
		filters: false,
					filterTax: 'category',
			filterType: 'static',
							};

	
	
	
	
	ppcg_5d5bd763adced = new PPContentGrid( PPContentGridOptions );
	
	// expandable row fix.
	var state = 0;
	$(document).on('pp_expandable_row_toggle', function(e, selector) {
		if ( selector.is('.pp-er-open') && state === 0 ) {
			ppcg_5d5bd763adced = new PPContentGrid( PPContentGridOptions );
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
		$( '.fl-node-5d5bd763adcdc .fl-photo-img' )
			.on( 'mouseenter', function( e ) {
				$( this ).data( 'title', $( this ).attr( 'title' ) ).removeAttr( 'title' );
			} )
			.on( 'mouseleave', function( e ){
				$( this ).attr( 'title', $( this ).data( 'title' ) ).data( 'title', null );
			} );
	});
});
jQuery(function($) {
	
	$(function() {
		$( '.fl-node-5d5bd763adce1 .fl-photo-img' )
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

									row_id = '5d5bd763adcc7';

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

									row_id = '5d5bd763adcca';

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
								row_id = '5d5e601448732';

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
								row_id = '5d5bd763adce8';

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
								row_id = '5d5bd763adccb';

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
								row_id = '5d5bd763adcda';

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
								row_id = '5d5bd763adcde';

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
								row_id = '5d5bd763adccc';

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
	