<?php 

/*
	Template Name: Index
*/

/**
 * @package WordPress
 * @subpackage Beatpeep Wordpress StarterKit
 */

get_header(); ?>

<section>
	<div class="icof-user">Awesome Fonts - .icof-iconName</div>
	<div class="spr-mail"></div>

	<?php query_posts('category_name=portada'); ?>
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		
		<!-- Content Here -->
	
	
	
	<?php endwhile; else: ?>
		<span><?php _e('Lo siento no hay artículos!'); ?></span>
	<?php endif; ?>

</section>

<?php get_footer(); ?>