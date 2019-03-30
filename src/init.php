<?php
/**
 * @since              0.0.1
 * @package            wp-code
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function wpCode_admin_enqueue_scripts () {
	wp_enqueue_script( 'wpCode', WP_CODE_LIBS.'dist/app.bundle.js', array(), false, true );
	// wp_enqueue_script('livereload', 'http://localhost:35729/livereload.js');
	// wp_dequeue_script('$handle')

	$wpCodeOptions = array(
		// https://webpack.js.org/guides/public-path/
		'publicPath' => WP_CODE_LIBS.'dist/'
		// 'publicPath' => '/wp-content/plugins/wp-code-dev/dist/'
	);
	wp_localize_script(
		'wpCode',        // for hesh.js
		'wpCodeOptions',   // the object name, shows up in js as window.heshOptions
		$wpCodeOptions     // the php object to translate to js
	);
}
add_action( 'admin_enqueue_scripts', 'wpCode_admin_enqueue_scripts');
