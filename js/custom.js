document.addEventListener("DOMContentLoaded", function() {

	// Custom JS
	$('.quick-buy').on('click', function(e) {
		console.log(e);
		e.preventDefault();
		$('.quick-buy-popup').show();
	});

	$('.quick-buy-popup').on('click', function(e) {
		if(!$(e.target).closest(".quick-buy-widget").length){
			$('.quick-buy-popup').hide();
		}
	});


	$("body").on('click', '[href*="#section-mp-numbers"],[href*="#section-mp-fundraising"],[href*="#section-mp-docs"],[href*="#section-mp-merch"],[href*="#section-mp-roadmap"]', function(e){
		var fixed_offset = 0;
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
		e.preventDefault();
	});



	$("body").on("click",".current-lang",function (e){ 
		e.preventDefault();
	});
	$("body").on("mouseup",function (e){ 
		var langPanel = $(".topline-lang-dropdown");
		var langLink = $(".current-lang");
		if ( langLink.is(e.target) ) {
			if ($(".current-lang").is(".active")) {


				if($(window).width() < 992 ){
					langLink.removeClass("active").next().slideUp(300);
				} 
				else{

					langLink.removeClass("active").next().fadeOut(300);
				}
			} 
			else {


					if($(window).width() < 992 ){
						langLink.addClass("active").next().slideDown(300);
					} 
					else{

						langLink.addClass("active").next().fadeIn(300);
					}
			}
		} else {
			if (!langPanel.is(e.target) && langPanel.has(e.target).length === 0 ) {  
				if ($(".current-lang").is(".active")){



					if($(window).width() < 992 ){
						$(".current-lang").removeClass("active").next().slideUp(300);
					} 
					else{

						$(".current-lang").removeClass("active").next().fadeOut(300);
					}
				}  else {
				}
			}
		}
	});



	$("body").on("click",".mobile-menu-btn",function (e){ 
		e.preventDefault();
	});
	$("body").on("click",function (e){ 
		var mobileMenu = $(".mobile-menu-block");
		var mobileMenuLink = $(".mobile-menu-btn");
		if ( mobileMenuLink.is(e.target) ) {
			if ($(".mobile-menu-btn").is(".active")) {
				mobileMenuLink.removeClass("active")
				mobileMenu.removeClass("active")
			} 
			else {
				mobileMenuLink.addClass("active")
				mobileMenu.addClass("active")
			}
		} else {
			if (!mobileMenu.is(e.target) && mobileMenu.has(e.target).length === 0 ) {  
				if ($(".mobile-menu-btn").is(".active")){
					$(".mobile-menu-btn").removeClass("active")
					mobileMenu.removeClass("active")
				}  else {
				}
			}
		}
	});
	$("body").on("click",".mobile-menu-close-btn",function (e){ 
		e.preventDefault();
		$(".mobile-menu-btn").removeClass("active")
		$(".mobile-menu-block").removeClass("active")
	});



	$('.winner-slider').slick({
		slidesToShow: 3,
		arrows: true,
		dots: true,
		prevArrow: '<button type="button" class="slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-next"></button>',
		responsive: [
		{
			breakpoint: 1280,
			settings: {
				arrows: true,
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 992,
			settings: {
				arrows: true,
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: true,
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 576,
			settings: {
				arrows: false,
				slidesToShow: 1,
				variableWidth: true,
			}
		}
		]
	});

	scrollActions()

});



$(window).scroll(function(){

	scrollActions()
});

function scrollActions() {
	$('.mp-one-img:not(.active)').each(function(){
		if($(this).isInViewport(100)) {
			$(this).addClass('active');
		}
	});
	$('.mp-number-img:not(.active)').each(function(){
		if($(this).isInViewport(100)) {
			$(this).addClass('active');
		}
	});
	$('.mp-merch-img:not(.active)').each(function(){
		if($(this).isInViewport(100)) {
			$(this).addClass('active');
		}
	});
	$('.mp-roadmap-img:not(.active)').each(function(){
		if($(this).isInViewport(100)) {
			$(this).addClass('active');
		}
	});
	$('.mp-stake-top-img:not(.active)').each(function(){
		if($(this).isInViewport(100)) {
			$(this).addClass('active');
		}
	});

}


jQuery.fn.isInViewport = function(offset_top = 300) {
	var $ = jQuery;

	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop() - offset_top;
	var viewportBottom = viewportTop + $(window).height();

	return elementBottom > viewportTop && elementTop < viewportBottom;
}

function copyToClipboard(text) {
	var sampleTextarea = document.createElement("textarea");
	document.body.appendChild(sampleTextarea);
	sampleTextarea.value = text; //save main text in it
	sampleTextarea.select(); //select textarea contenrs
	if (document.execCommand("copy")) {
		alert('Copied!');
	}
	document.body.removeChild(sampleTextarea);
}
