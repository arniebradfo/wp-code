<?php

/**
 * @since              0.0.1
 * @package            wp-code
 *
 * Plugin Name:        WP Code
 * Plugin URI:         https://www.wpcode.app
 * Description:        A Wordpress admin code editor plugin using the Monaco code editor that powers Visual Studio Code.
 * Text Domain:        wp-code
 * Author:             James Bradford
 * Author URI:         http://bradford.digital/
 * License:            MIT
 * License URI:        https://tldrlegal.com/license/mit-license
 * GitHub Branch:      release
 * GitHub Plugin URI:  https://github.com/arniebradfo/wp-code
 * Version:            0.0.1
 * Requires at least:  4.0.15
 * Tested up to:       5.0.1
 * Stable tag:         0.0.1
**/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'WP_CODE_LIBS', plugins_url( '/', __FILE__ ) );

require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

?>