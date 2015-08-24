<?php 

/**
 * @package WordPress
 * @subpackage Beatpeep Wordpress StarterKit
 */

get_header(); ?>
<section>
	<article>
		<div >
			<img src="<?php print IMAGES; ?>/scratch-bg.png"/>
			<h1 class="title"><?php the_title();?></h1>
		</div>
	</article>
</section>

<section>
	<article>
		<p>La página que estas buscando no existe</p>

		<p>The page you are looking for does not exist</p>
	</article>
</section>


<?php get_footer(); ?>