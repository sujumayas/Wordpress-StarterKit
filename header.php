<!DOCTYPE html>
<html lang="es" class="no-js">
	<head>
		<head>
			<meta charset="utf-8">
			<meta http-equiv="x-ua-compatible" content="ie=edge">
			<title>Titulo de la página: entre 55 caracteres</title>
			<meta name="title" content="Titulo de la página: entre 55 caracteres">
			<meta name="description" content="La descripción: entre 155 caracteres">
			<meta name="keywords" content="Keywords: entre 5 palabras o frases clave">
			<meta name="author" content="autor de la pagina">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="language" content="es">
			<meta name="robots" content="index,follow">
			<meta property="og:title" content="Titulo de la página: entre 55 caracteres | web-url.com">
			<meta property="og:description" content="La descripción: entre 155 caracteres">
			<meta property="og:image" content="img/logo.jpg">
			<meta name="DC.Title" content="Titulo de la página: entre 55 caracteres">
			<meta name="DC.Creator" content="undefined">
			<meta name="DC.Description" content="La descripción: entre 155 caracteres">
			<meta name="DC.Publisher" content="undefined">
			<meta name="DC.Contributor" content="developer">
			<meta name="DC.Language" content="es">
			<link href='http://fonts.googleapis.com/css?family=Roboto:400,900,400italic' rel='stylesheet' type='text/css'>
			<link rel="stylesheet" href="style.css">
			<link href="img/favicon.ico" rel="icon" type="image/vnd.microsoft.icon">
			<link href="img/favicon.ico" rel="shortcut icon" type="image/x-icon">
			<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
			<!--Código de Google Analytics: cambie UA-XXXXX-X en el -config.jade por su GA site ID.-->
			<script>
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				ga('create', 'UA-XXXXX-X', 'auto');
				ga('send', 'pageview');
			</script>
			<?php wp_head(); ?>
		</head>
	</head>
	<body><!--[if lt IE 8]>
		<p class="browsehappy"></p>You are using an <strong>outdated</strong> browser.
		Please <a href="http://browsehappy.com/">upgrade your browser</a>
		to improve your experience.
		<![endif]-->
		<header>
			<nav>
				<?php 
					wp_nav_menu( array('menu' => 'Main', 'container' => 'div', 'container_class' => 'menu', 'items_wrap' => '<ul id="%1$s">%3$s</ul>' )); 
				?>
			</nav>
		</header>
		<div id="wrapper">