<?php
/**
 * @since              0.0.1
 * @package            wp-code
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function wp_code_enqueue_test() {
	// enqueue script on backend
	wp_enqueue_script( 'wp-code', plugins_url( '/dist/app.bundle.js', dirname( __FILE__ ) ), false, false, true );
}
add_action( 'admin_init', 'wp_code_enqueue_test' );

