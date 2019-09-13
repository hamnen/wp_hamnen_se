<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'hamnen_wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'Slasken1');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'o 4~P41g%+5Y0u@Y$CF7ocuD:&p=n~#35rB<9Slsg_MD1I^=Qg,OKJTf@4=YgNu1');
define('SECURE_AUTH_KEY',  'pJlP<E3,`Uxsgvja2flc=?n$^M|g-^,ad-t8[Y0y.wzK2s3$,DlxYNIl-gfB/[@q');
define('LOGGED_IN_KEY',    'M.7IxtpR&5C^)W$f:V!M8anw]!}2p_TbX!PewO{N~)+;)sVQ6*;fw>7N*xccgS#<');
define('NONCE_KEY',        'fC`Z_;/~6EDMXAVc[r,8?;tfGKrq*y :DUk&-uNPL;3ky.{B(v,#:M`LKO<9KU8M');
define('AUTH_SALT',        '5-pfpMI)or`!&ovPitJ:IB>zMmQsx/Z]9]T+eF62a`bEAAj/@KU8sFq^mRxlQ44T');
define('SECURE_AUTH_SALT', ']Zcj3*?3ryU4J|9D2BV#&,pMV/egd,>82R@bvlufibljWUu|->eoz^Ca<uP_+?J8');
define('LOGGED_IN_SALT',   'ghV82nUS7%zemnIR%]yn/NFeC`+y_m}R>Elv6ls5!8=}u/yr=MUTj4O}[ &rQ>fs');
define('NONCE_SALT',       '}BOx/5HRzKLWUcY@Fdp:=5g_4Cvyy{UIt8f0Ue[7U$$G$X`3eT!$+pgT67<FZ6TA');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
