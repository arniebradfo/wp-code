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

/**
 * Block Initializer.
 */
// require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
define( 'WP_CODE_LIBS', plugins_url( '/', __FILE__ ) );


function wpCode_admin_enqueue_scripts () {
	wp_enqueue_script( 'wpCode', WP_CODE_LIBS.'dist/app.bundle.js', array(), false, true );

	$wpCodeOptions = array(
		// https://webpack.js.org/guides/public-path/
		// 'publicPath' => WP_CODE_LIBS.'dist/'
		'publicPath' => '/wp-content/plugins/wp-code-dev/dist/'
	);

	wp_localize_script(
		'wpCode',        // for hesh.js
		'wpCodeOptions',   // the object name, shows up in js as window.heshOptions
		$wpCodeOptions     // the php object to translate to js
	);
}
add_action( 'admin_enqueue_scripts', 'wpCode_admin_enqueue_scripts');


?>