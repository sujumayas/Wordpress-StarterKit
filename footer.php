</div>
	<!-- END of #wrapper-->
	<footer>
		<?php 
			wp_nav_menu( array('menu' => 'Footer', 'container' => 'div', 'container_class' => 'footer_menu', 'items_wrap' => '<ul id="%1$s">%3$s</ul>' )); 
		?>
	</footer>
	<script src="<?php print JS; ?>/main.js"></script>
  </body>
</html>