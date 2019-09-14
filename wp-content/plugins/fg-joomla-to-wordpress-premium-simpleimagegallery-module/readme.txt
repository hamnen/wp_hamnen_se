=== FG Joomla to WordPress Premium Simple Image Gallery module ===
Contributors: Frédéric GILLES
Plugin Uri: https://www.fredericgilles.net/fg-joomla-to-wordpress/
Tags: joomla, wordpress, migrator, converter, import, simple image gallery, very simple image gallery
Requires at least: 4.5
Tested up to: 5.0.3
Stable tag: 2.7.0
Requires PHP: 5.3
License: GPLv2

A plugin to migrate the Simple Image Gallery images as WordPress galleries
Needs the plugin «FG Joomla to WordPress Premium» to work

== Description ==

This is the Simple Image Gallery add-on. It works only if the plugin FG Joomla to WordPress Premium is already installed.
It has been tested with **Wordpress 5.0**. It is compatible with multisite installations.

Major features include:

* migrates Simple Image Gallery galleries as WordPress galleries
* migrates Very Simple Image Gallery galleries as WordPress galleries
* migrates SigPlus galleries as WordPress galleries
* migrates Art sexy lightbox galleries as WordPress galleries

== Installation ==

1.  Prerequesite: Buy and install the plugin «FG Joomla to WordPress Premium»
2.  Extract plugin zip file and load up to your wp-content/plugin directory
3.  Activate Plugin in the Admin => Plugins Menu
4.  Run the importer in Tools > Import > Joomla (FG)

== Translations ==
* French (fr_FR)
* English (default)
* other can be translated

== Changelog ==

= 2.7.0 =
New: Compatible with Art sexy lightbox
Tested with WordPress 5.0

= 2.6.1 =
Fixed: Notice: Constant FGJ2WPP_USE_FTP already defined
Fixed: Images were not transfered if the images directory doesn't end with a slash

= 2.6.0 =
New: Compatible with SigPlus
Tested with WordPress 4.9

= 2.5.0 =
New: Compatible with Very Simple Image Gallery
Tested with WordPress 4.7

= 2.4.0 =
New: Look for the images galleries in /images in addition to the other directories
Tested with WordPress 4.6

= 2.3.0 =
New: Look for the images galleries in /images/stories in addition to the other directories
Tested with WordPress 4.5.3

= 2.2.0 =
New: Look for the images galleries in /images/stories/galleries in addition to /images/galleries
Tested with WordPress 4.5.2

= 2.1.0 =
New: Compatible with FG Joomla to WordPress Premium 3.3.0

= 2.0.0 =
New: Run the import in AJAX
New: Compatible with PHP 7

= 1.0.1 =
Fixed: Try to find the images in the images/gallery directory
Fixed: Images with uppercase extensions were not imported
Tested with WordPress 4.4

= 1.0.0 =
Initial version
