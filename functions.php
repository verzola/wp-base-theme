<?php

add_action('after_setup_theme', function () {
    // Disable the admin toolbar.
    show_admin_bar(false);

    // Add post thumbnails support.
    add_theme_support('post-thumbnails');

    // Add title tag theme support.
    add_theme_support('title-tag');

    // Add HTML5 theme support.
    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'widgets',
    ]);

    // Register navigation menus.
    register_nav_menus([
        'navigation' => __('Navigation', 'wordplate'),
    ]);
});

// Enqueue theme scripts and styles
add_action('wp_enqueue_scripts', function () {
    $manifest = json_decode(file_get_contents(__DIR__ . '/dist/manifest.json'), true);

    wp_enqueue_script('base_js', get_stylesheet_directory_uri() . '/dist/' . $manifest['main.js'], ['jquery']);

    if (isset($manifest['main.css'])) {
        wp_enqueue_style('base_css', get_stylesheet_directory_uri() . '/dist/' . $manifest['main.css']);
    }

    wp_enqueue_style('google-font', 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700');
});

// Remove JPEG compression.
add_filter('jpeg_quality', function () {
    return 100;
}, 10, 2);
