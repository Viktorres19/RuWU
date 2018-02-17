  $(document).ready(function() {

//fast move by the anchor
	$(".desktop-menu, .flex-bottom").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});

//mobile menu
		$(".points-wrapper").after("<div id='my-menu'>");
		$(".points-wrapper").clone().appendTo("#my-menu");
		$("#my-menu").find("*").attr("style", "");
		$("#my-menu").find("ul").removeClass("points-wrapper");
		$("#my-menu").mmenu({
			extensions: [ 'widescreen', 'effect-menu-slide', 'pagedim-black' ],			
			navbar: {
				title: "Опции бегового клуба"
			}
		});		

		var api = $("#my-menu").data("mmenu");
		api.bind("closed", function() {
			$(".toggle-mnu").removeClass("on");
			$(".mobile-menu b").html("Опции нашего бегового клуба");
		});

   	$(".mobile-menu").click(function() {
			var mmAPI = $("#my-menu").data( "mmenu" );			
			mmAPI.open();
			var thiss = $(this).find(".toggle-mnu");
		  thiss.toggleClass("on");
		  $(".points-wrapper").slideToggle();
		  $(".mobile-menu b").html("&nbsp;");
		  return false;
		});				


//Equal heights
  $(".course .course-text").equalHeights();    
  $(".results .results-item").equalHeights();    
  $(".subs-item-middle").equalHeights();      

//owl carousel
	$(".slideshow-experts .owl-carousel").owlCarousel({
		autoplay: true,
		autoplayTimeout: 10000,
		smartSpeed: 500,
		autoplayHoverPause: true,	
		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],	
		loop: true,
		nav: true,
		items: 1
	});

	$(".carousel-services").owlCarousel({
		autoplay: true,
		loop: true,
		smartSpeed: 700,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2,
			},
			992: {
				items: 3,
			},
			1100: {
				items: 4
			}
		}
	});	

	function carouselService()	{
		$('.carousel-serveces-item').each(function() {
			var ths = $(this),
				thsh = ths.find('.carousel-services-image').outerHeight();
				ths.find('carousel-services-image').css('min-height', thsh);
		});
	}carouselService();

	$(".carousel-user").owlCarousel({
		loop: true,
		items: 1,
		nav: true,
		navText: ['<i class="fa fa-rocket reverse"></i>','<i class="fa fa-rocket"></i>']

	});	


// script to change color of the subscriptions
	$('.subs-item .subs-item-bottom .button').hover(
	    function(){
	        $(this).parent().parent().children().first().addClass('gbrighten');
	    },
	    function(){
	        $(this).parent().parent().children().first().removeClass('gbrighten');
	    }
	);		

	//button up functions
	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	});
	$('.top').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});		
	//button up functions end

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};	


	//E-mail Ajax Send
	$("form.callback").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "/mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css("display", "flex").hide().fadeIn();
			setTimeout(function() {
				$(th).find('.success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});	

 });

$(window).on('load', function() {
	$('.preloader').delay(1000).fadeOut('slow');
});