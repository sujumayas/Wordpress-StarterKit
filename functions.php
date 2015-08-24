<?php
	define( 'TEMPPATH', get_bloginfo('stylesheet_directory'));
	define( 'IMAGES', TEMPPATH. "/images");
	define( 'JS', TEMPPATH. "/js");

	add_theme_support('nav-menus');
		if ( function_exists('register_nav_menus')) {
				register_nav_menus(
					array(
						'main' => 'Main Nav'
					)
			); 
		}

	if (function_exists('add_theme_support')) {
		add_theme_support('post-thumbnails');
		set_post_thumbnail_size( 480, 480, true );
	}
?>