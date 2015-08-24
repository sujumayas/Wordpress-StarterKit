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
	<?php query_posts('category_name=portada'); ?>
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	
	<article>
		<a href="<?php the_permalink(); ?>">
			<img src="<?php print IMAGES; ?>/screenshot.png" class="over"/>
			<?php the_post_thumbnail('thumbnail', array('class' => 'above')); ?>
		</a>
		<h2 class="title"><?php the_title();?></h2>
	</article>

	
	<?php endwhile; else: ?>
		<span><?php _e('Lo siento no hay artículos!'); ?></span>
	<?php endif; ?>

</section>

<?php get_footer(); ?>