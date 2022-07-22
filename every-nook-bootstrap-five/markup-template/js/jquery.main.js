$(document).ready(function () {
	isElementExist(".header-page", initSmartMenu)
	isElementExist("video", initVideoBtn)
	initMenuHeightDropdown();
	headerUserBtns();
	isElementExist(".property-slider", initPropertyCardSlider);
	isElementExist(".main-content-slider", initMainContentSlider);
	isElementExist(".snapshot-slider", initSnapshotSlider);
	isElementExist(".single-slider", initSingleSlider);
	isElementExist(".card-slider", initCardSlider);
	isElementExist(".tour-slider", initTourSlider);
	isElementExist(".quote-slider", initQuoteSlider);
	isElementExist(".screen-slider", initScreenSlider);
	isElementExist(".navigation-menu", initStickyMenu);
	isElementExist(".nav-bar-scrollable", initScrollableMenu);
	isElementExist(".close-btn", initCloseCollapseOnButton);
	isElementExist(".sticky-panel", initStickyBlock);
	isElementExist(".side-nav", initMenuFixed);
	isElementExist(".my-rating", initStarRating);
	isElementExist(".different-address", initCreateTeamChecked);
	isElementExist("[data-aos]", initAOS);
	initDetailsPanel();
	initMultiSelectSearch();
	initIsotope();
	initMarqueeSlider();
	initReviewExpanded();
	initDropHover();
	initDropMenu();
	initMobileMenu();
	initStickyButtons();
	initStickBar();
	initCheckedClass();
	initTooltip();
	initDropdown();
	initValidate();
	initCollapse();
	initImgLoader();
	initSlidingMenu();
	initButtonPassword();
	initSnazzyMap();
	initScrollWrap();
	initSelection();
	initMap();
	initTypeSelect();
	initTransactionMap();
	initModalShow();
	initScrollLink();
});


// Helper if element exist then call function
function isElementExist(_el, _cb) {
	var elem = document.querySelector(_el);

	if (document.body.contains(elem)) {
		try {
			_cb();
		} catch (e) {
			console.log(e);
		}
	}
}

//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------

//= vendors/smartmenus.js

//= vendors/jquery.inputmask.min.js

//= vendors/mdb/timepicker.min.js

//= vendors/mdb/select.min.js

//= vendors/mdb/datepicker.min.js

//= vendors/snazzy-info-window.js

//= vendors/swiper-bundle.min.js

//= vendors/jquery.vide.js

//= vendors/cropper.min.js

//= vendors/isotope.pkgd.min.js

//= vendors/packery.pkgd.min.js

//= vendors/aos.js

//= vendors/jquery-cropper.min.js

//= vendors/sticky-kit.min.js

//= vendors/sly.min.js

//= vendors/jquery.sticky.js

//= vendors/select2.min.js

//= vendors/jquery.star-rating-svg.js

//= vendors/debounce.js

//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------


//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------



// isotope function

function initIsotope() {
	var $grid = $('.grid-items');
	$grid.isotope({
		itemSelector: '.item',
		masonry: {
		  columnWidth: '.grid-sizer',
		  percentPosition: true,
		}
	})
}

function initMultiSelectSearch(){
	$('.custom-multiple-select').select2({
		dropdownParent: $('.search-vendor'),
		allowClear: true,
		placeholder: function(){
			$(this).data('placeholder');
		}
	});
	$('.vendor-select-location .custom-multiple-select').select2({
		dropdownParent: $('.search-vendor'),
		allowClear: true,
		dropdownCssClass: 'location-select',
	});
}

function initDetailsPanel() {
	jQuery('.property-card').each(function() {
		if ($(this).find('.alert-show').hasClass('active')) {
			$(this).addClass('alert-showed')
		}
	});

	$('.property-card .detail-btn').on('click', function(e) {
		e.preventDefault();
		if($(this).closest('.property-card').hasClass('details-show')){
			$(this).closest('.property-card').removeClass('details-show');
		} else {
			$('.property-card.details-show').removeClass('details-show');
			$(this).closest('.property-card').addClass('details-show');
		}
	});

	$('.property-card .summary-btn').on('click', function(e) {
		e.preventDefault();
		if($(this).closest('.property-card').hasClass('summary-show')){
			$(this).closest('.property-card').removeClass('summary-show');
		} else {
			$('.property-card.details-show').removeClass('summary-show');
			$(this).closest('.property-card').addClass('summary-show');
		}
	});

	$('.details-panel-close').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.property-card').removeClass("details-show");
		$(this).closest('.property-card').removeClass("summary-show");
	});

	$('.dismiss-btn').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.property-card').find('.alert-bar.alert-show').removeClass('active');
		$(this).closest('.property-card').removeClass('alert-showed');
	});
}


function initMainContentSlider() {
	$(".testimonial-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: 'auto',
			loop: false,
			spaceBetween: 15,
			autoHeight: true,
			mousewheel: false,
			navigation: {
				nextEl: $(self).closest('.testimonial-slider').find(".swiper-button-next").get(0),
				prevEl: $(self).closest('.testimonial-slider').find(".swiper-button-prev").get(0),
			},
			// breakpoints: {
			// 	640: {
			// 		slidesPerView: 2,
			// 	},
			// 	1200: {
			// 		spaceBetween: 28,
			// 		slidesPerView: 2,
			// 	}
			// }
		});
	});
}

function initDropMenu() {
	$('.nav a').on('click', function (e) {
		if ($(this).siblings('.nav-drop').length && !$(this).closest('li').hasClass('drop-open')) {
			e.preventDefault();
			$(this).closest('li').addClass('drop-open');
			$(this).closest('li').siblings('li.drop-open').find('li.drop-open').removeClass('drop-open');
			$(this).closest('li').siblings('li.drop-open').removeClass('drop-open');
		}
	});
	$('.nav a').on('click', function (e) {
		if ($(this).siblings('.nav-second-drop').length && !$(this).closest('li').hasClass('drop-open')) {
			e.preventDefault();
			$(this).closest('li').addClass('drop-open');
			$(this).closest('li').siblings('li.drop-open').find('li.drop-open').removeClass('drop-open');
			$(this).closest('li').siblings('li.drop-open').removeClass('drop-open');
		}
	});
};

function initAOS() {
	AOS.init({
		disable: window.innerWidth > 1024,
		duration: 1200,
		offset: 100
	})
}

function initDropHover() {
	$('.nav ul li').each(function () {
		if ($(this).find('.nav-drop').length) {
			$(this).addClass('has-drop');
		}
	});
	$('.nav-drop li').each(function () {
		if ($(this).find('.nav-second-drop').length) {
			$(this).addClass('drop-hover');
		}
	});
};

// smart menu init
function initSmartMenu() {
	var distanceBetweenMenuAndNav = jQuery(".header-menu-wrapper").offset().top + jQuery(".header-menu-wrapper").innerHeight() - jQuery(".nav").offset().top - jQuery(".nav").innerHeight();
	jQuery(".header-menu").smartmenus({
		collapsibleBehavior: "accordion",
		// mainMenuSubOffsetY: distanceBetweenMenuAndNav
	});

	// changed date attribute to a class (need to reverse last item menu)
	// jQuery('.header-menu').children().last().addClass('nav-sm-reverse');

	jQuery("body").mobileNav({
		menuActiveClass: "nav-active",
		menuOpener: ".nav-opener",
		hideOnClickOutside: true,
		menuDrop: ".nav-drop"
	}), "ontouchstart" in document.documentElement ||
			jQuery(window).on("resize orientationchange", function() {
				jQuery("body").removeClass("nav-active"), $.SmartMenus.hideAll();
	});
}

//video play button

function initVideoBtn() {
    // Video
    var video = document.getElementById("video");
    // Button
    var playButton = document.getElementById("play");

    // Event listener for the play/pause button
    playButton.addEventListener("click", function () {
        if (video.paused == true) {
            // Play the video
            video.play();
			video.setAttribute("controls", true)

            // Update the button text to 'Pause'
            playButton.classList.add("none");
        } else {
            // Pause the video
            video.pause();
			video.removeAttribute("controls", true);

            // Update the button text to 'Play'
            playButton.classList.remove("none");
        }
    });
}

//menu height dropdown

function initMenuHeightDropdown() {
	const dropdowns = document.querySelectorAll(".menu-item-with-dropdown");
	const submenu = document.querySelectorAll("a.hassubmenu");


	Array.from(dropdowns).forEach((dropdown) => {
		dropdown.parentElement.addEventListener("mouseenter", function() {
			dropdown.lastElementChild.style.height = dropdown.parentElement.scrollHeight + 4 + "px";
		})
    });
	Array.from(dropdowns).forEach((dropdown) => {
		dropdown.parentElement.addEventListener("click", function() {
			dropdown.lastElementChild.style.height = dropdown.parentElement.scrollHeight + 4 + "px";
		})
    });	

	Array.from(dropdowns).forEach((dropdown) => {
		dropdown.parentElement.addEventListener("click", function() {
			dropdown.lastElementChild.style.height = dropdown.parentElement.scrollHeight + 4 + "px";
		})
    });	



}

// header user btns

function headerUserBtns() {
	const headerBtns = document.querySelectorAll(".header-user button");

	Array.from(headerBtns).forEach((btn) => {
		btn.addEventListener("click", function() {
			btn.nextElementSibling.classList.toggle("active");
		})
		document.addEventListener('click', function(event) {
		  var isClickInside = btn.nextElementSibling.contains(event.target);
		  var isClickInside2 = btn.contains(event.target);
		
		  if (!isClickInside && !isClickInside2) {
			btn.nextElementSibling.classList.remove("active");
		  }
		});
		
    });	




}

function initStickyButtons() {
	if ($('.sticky-nav-buttons').length) {
		var stickyTop = $('.section-navigation').offset().top + 200;
		$(window).on('scroll', function () {
			if ($(window).scrollTop() > stickyTop) {
				$('.sticky-nav-buttons').addClass('sticky');
			} else {
				$('.sticky-nav-buttons').removeClass('sticky');
			}
		});
	}

	var offsetArr2 = [];
	$(window).on('load resize', function () {
		offsetArr2 = [];
		for (var i = 0; i < $('.sticky-nav-buttons li').length; i++) {
			var elId = $('.sticky-nav-buttons li').eq(i).find('a').attr('href');
			if (elId !== '#' && $(elId).length) {
				offsetArr2.push($(elId).offset().top);
			}
		}
	});
	$(window).on('load resize scroll', function () {
		var _top = $(window).scrollTop();
		for (var i = offsetArr2.length - 1; i >= 0; i--) {
			if (_top + $('.sticky-nav-buttons').innerHeight() + 25 > offsetArr2[i]) {
				$('.sticky-nav-buttons li').removeClass('active');
				$('.sticky-nav-buttons li').eq(i).closest('li').addClass('active');
				break;
			} else if (_top < offsetArr2[0]) {
				$('.sticky-nav-buttons li').removeClass('active');
			}
		}
	});
}

function initStarRating() {
	$(".my-rating").starRating({
		totalStars: 5,
		starShape: 'rounded',
		emptyColor: '#A3A5B0',
		hoverColor: '#1AACFF',
		strokeWidth: 0,
		disableAfterRate: false,
		activeColor: '#1AACFF',
		ratedColor: '#1AACFF',
		ratedColors: ['#1AACFF', '#1AACFF', '#1AACFF', '#1AACFF', '#1AACFF'],
		starSize: 35
	});
}

function initModalShow() {
	if ($('#welcome-modal').length) {
		$(window).on('load', function () {
			setTimeout(function () {
				var myModal = new bootstrap.Modal($('#welcome-modal').get(0)).show();
			}, 1000);
		});
	};
}

function initMenuFixed() {
	$(window).on('load resize scroll', function () {
		if ($(window).scrollTop() > 400) {
			$('.side-nav').addClass('fixed');
		} else {
			$('.side-nav').removeClass('fixed');
		}
	});
};

function initMarqueeSlider() {
	$(".left-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			direction: 'vertical',
			grabCursor: false,
			allowTouchMove: false,
			slidesPerView: 'auto',
			spaceBetween: 15,
			mousewheel: false,
			loop: true,
			shortSwipes: false,
			longSwipes: false,
			speed: 7000,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			},
		});
	});
	$(".right-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			direction: 'vertical',
			grabCursor: false,
			allowTouchMove: false,
			slidesPerView: 'auto',
			spaceBetween: 15,
			mousewheel: false,
			loop: true,
			centeredSlides: true,
			shortSwipes: false,
			longSwipes: false,
			allowTouchMove: false,
			speed: 7000,
			disableOnInteraction: true,
			waitForTransition: false,
			autoplay: {
				delay: 1,
				reverseDirection: true,
			},
		});
	});
}

function initScreenSlider() {
	$(".screen-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			direction: 'vertical',
			grabCursor: false,
			shortSwipes: false,
			longSwipes: false,
			allowTouchMove: false,
			slidesPerView: 'auto',
			loop: true,
			spaceBetween: 15,
			mousewheel: false,
			autoplay: {
				delay: 1,
			},
			speed: 5000,
		});
	});
}

function initQuoteSlider() {
	$(".quote-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: 1,
			loop: false,
			spaceBetween: 15,
			autoHeight: true,
			mousewheel: false,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			navigation: {
				nextEl: $(self).closest('.swiper').find(".swiper-button-next").get(0),
				prevEl: $(self).closest('.swiper').find(".swiper-button-prev").get(0),
			},
			pagination: {
				el: $(self).closest('.swiper').find(".swiper-pagination").get(0),
				clickable: true
			},
		});
	});
}

function initScrollLink() {
	$(".anchor-list").on("click", "a", function (event) {
		event.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top }, 1500);
	});
}


function initReviewExpanded() {
	$('.btn-expanded').on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('open');
		$(this).closest('.review-content').toggleClass('open');
	});
}

function initStickBar() {
	var window_width = $(window).width();

	if (window_width < 1024) {
		$("#sticky-bar").trigger("sticky_kit:detach");
	} else {
		make_sticky();
	}

	$(window).on('resize load', function () {

		window_width = $(window).width();

		if (window_width < 1024) {
			$("#sticky-bar").trigger("sticky_kit:detach");
		} else {
			make_sticky();
		}

	});

	function make_sticky() {
		var headerHeight = $('.section-nav').innerHeight();
		$("#sticky-bar").stick_in_parent({
			offset_top: headerHeight + 20
		});
	}
};

function initTransactionMap() {
	if (!$('#map').length) return;

	var styles = [{ "featureType": "landscape", "stylers": [{ "hue": "#FFBB00" }, { "saturation": 43.400000000000006 }, { "lightness": 37.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.highway", "stylers": [{ "hue": "#FFC200" }, { "saturation": -61.8 }, { "lightness": 45.599999999999994 }, { "gamma": 1 }] }, { "featureType": "road.arterial", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 51.19999999999999 }, { "gamma": 1 }] }, { "featureType": "road.local", "stylers": [{ "hue": "#FF0300" }, { "saturation": -100 }, { "lightness": 52 }, { "gamma": 1 }] }, { "featureType": "water", "stylers": [{ "hue": "#0078FF" }, { "saturation": -13.200000000000003 }, { "lightness": 2.4000000000000057 }, { "gamma": 1 }] }, { "featureType": "poi", "stylers": [{ "hue": "#00FF6A" }, { "saturation": -1.0989010989011234 }, { "lightness": 11.200000000000017 }, { "gamma": 1 }] }]


	if (document.querySelector('#map[data-center]')) {
		var newLocation = document.querySelector('#map[data-center]').dataset.center;
		location.lat = parseFloat(newLocation.split(', ')[0]);
		location.lng = parseFloat(newLocation.split(', ')[1]);
	}

	var styledMap = new google.maps.StyledMapType(styles);

	var map = new google.maps.Map(document.getElementById('map'), {
		center: location,
		zoom: 12,
		scrollwheel: false,
		disableDefaultUI: true
	});

	if (!document.querySelector('.markers')) {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
		});
	} else {
		$('.markers li').each(function () {
			var newLocation = $(this).data('coords');
			var iconImage = $(this).data('markerIcon');
			location.lat = parseFloat(newLocation.split(', ')[0]);
			location.lng = parseFloat(newLocation.split(', ')[1]);

			var contentString = $(this).html();

			var marker = new google.maps.Marker({
				position: location,
				icon: iconImage,
				map: map,
				infoWindow: infowindow
			});

			var infowindow = new SnazzyInfoWindow({
				content: contentString,
				marker: marker,
			});

			marker.addListener('mouseover', function () {
				infowindow.open(map, this);
			});

			marker.addListener('mouseout', function () {
				infowindow.close();
			});

			marker.addListener('click', function () {
				var myModal = new bootstrap.Modal($('.modal').get(0), {
					keyboard: false
				}).show();
			});
		});
	}

	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
};

function initTypeSelect() {
	$(".select-item").select2({
		minimumResultsForSearch: Infinity,
		width: 'resolve',
		dropdownCssClass: 'dropdown-select',
		templateResult: formatState,
		templateSelection: formatState
	});

	function formatState(opt) {
		if (!opt.id) {
			return opt.text.toUpperCase();
		}

		var optimage = $(opt.element).attr('data-image');
		console.log(optimage)
		if (!optimage) {
			return opt.text.toUpperCase();
		} else {
			var $opt = $(
				'<span class="type-option"> <img src="' + optimage + '" class="data-img" /> <span>' + opt.text.toUpperCase() + '</span></span>'
			);
			return $opt;
		}
	};
}

function initMap() {
	$('.map').each(function () {
		var $map = $(this),
			location = $map.data('location').split(', ');
		var map = new google.maps.Map(this, {
			center: {
				lat: parseFloat(location[0]),
				lng: parseFloat(location[1])
			},
			zoom: 13
		});
	});
};

function initSelection() {
	$('.form-selection').each(function () {
		var $wrap = $(this),
			check = $wrap.find('.check-all'),
			uncheck = $wrap.find('.uncheck-all');

		var checkboxes = $wrap.find('input[type="checkbox"]');

		function handler(type) {
			checkboxes.each(function (index, item) {
				$(this).prop('checked', type).trigger('change');
			})
		}

		check.on('click', handler.bind(null, true));
		uncheck.on('click', handler.bind(null, false));
	});
}

function initScrollWrap() {
	var $frame = $('.navigation-menu .scroll-cover');
	var $wrap = $frame.parent();

	// Call Sly on frame
	$frame.each(function () {
		$(this).sly({
			horizontal: 1,
			itemNav: 'basic',
			scrollSource: null,
			smart: 1,
			activateOn: 'click',
			mouseDragging: true,
			touchDragging: 1,
			releaseSwing: 1,
			scrollBy: 0,
			activatePageOn: 'click',
			speed: 300,
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,
			prevPage: $wrap.find('.prev'),
			nextPage: $wrap.find('.next')
		});
	});

	$('.nav-dropdown .active-category').on('click', function () {
		$(this).closest('.nav-dropdown').toggleClass('open');
	});

	$(document).on('click', function (e) {
		if ($(e.target).closest('.active-category').length) return;
		$('.nav-dropdown').removeClass('open');
	});
}

function initSnazzyMap() {

	google.maps.event.addDomListener(window, 'load', init);

	function init() {
		$('#map-card').each(function () {
			var $map = $(this),
				location = $map.data('location').split(', ');

			var map = new google.maps.Map(this, {
				center: {
					lat: parseFloat(location[0]),
					lng: parseFloat(location[1])
				},
				zoom: 11,

				styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]

			});
			var marker = new google.maps.Marker({
				map: map,
			});
		});
	}
};

function initButtonPassword() {
	$('.login-form .btn-show').on('click', function () {
		if ($('.form-control-password').attr('data-password') == 'false') {

			$('.form-control-password').removeAttr('type');
			$('.form-control-password').attr('type', 'text');

			$('.form-control-password').removeAttr('data-password');
			$('.form-control-password').attr('data-password', 'true');

			$('.button-psswd').html('Hide password');

		} else {

			$('.form-control-password').removeAttr('type');
			$('.form-control-password').attr('type', 'password');

			$('.form-control-password').removeAttr('data-password');
			$('.form-control-password').attr('data-password', 'false');
		}

	});
}

function initSlidingMenu() {
	$(".side-nav .expand-button").on("click", function (e) {
		e.preventDefault();
		$("body").toggleClass("slide-nav-open");
	});
	$(".side-menu a").on("click", function (e) {
		$(this).closest("li").hasClass("active") && $(window).innerWidth() < 1023 && $(this).closest(".side-menu").toggleClass("open");
	});
	$(document).on("click", function (e) {
		$(e.target).closest(".side-menu.open li.active").length || $(".side-menu.open").removeClass("open");
		$(e.target).closest(".side-nav").length || $("body.slide-nav-open").removeClass("slide-nav-open");
	});
}

function initImgLoader() {
	$('.image-loader').each(function () {
		var loader = this;
		$(loader).find('input[type="file"]').on('change', function (e) {
			readURL(this);
			$(loader).find('.image-preview').fadeIn();
		});

		$(loader).find('.image-preview-uploaded img').on('load', function () {
			$(this).cropper('destroy').cropper({
				aspectRatio: 1 / 1,
				preview: $(loader).find('.image-preview-img')
			});
		});
	});

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$(input).closest('.image-loader').find('.image-preview-uploaded img').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}
}

function initSingleSlider() {
	$(".single-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: 1,
			loop: false,
			spaceBetween: 30,
			autoHeight: true,
			mousewheel: false,
			observer: true,
			observeParents: true,
			visibilityFullFit: true,
			navigation: {
				nextEl: $(self).closest('.module-unit').find(".swiper-button-next").get(0),
				prevEl: $(self).closest('.module-unit').find(".swiper-button-prev").get(0),
			},
		});
	});
}

function initCardSlider() {
	$(".card-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: 'auto',
			loop: false,
			spaceBetween: 15,
			autoHeight: true,
			mousewheel: false,
			navigation: {
				nextEl: $(self).closest('.module-unit').find(".swiper-button-next").get(0),
				prevEl: $(self).closest('.module-unit').find(".swiper-button-prev").get(0),
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
				1200: {
					spaceBetween: 28,
					slidesPerView: 3,
				}
			}
		});
	});
}

function initPropertyCardSlider() {
	$(".property-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: 'auto',
			loop: false,
			spaceBetween: 15,
			autoHeight: true,
			mousewheel: false,
			navigation: {
				nextEl: $(self).closest('.module-unit').find(".swiper-button-next").get(0),
				prevEl: $(self).closest('.module-unit').find(".swiper-button-prev").get(0),
			},
			breakpoints: {
				640: {
					slidesPerView: 2,
				},
				992: {
					spaceBetween: 28,
					slidesPerView: 2,
				}
			}
		});
	});
}

function initSnapshotSlider() {
	$(".snapshot-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: "auto",
			loop: false,
			spaceBetween: 15,
			autoHeight: true,
			mousewheel: false,
			navigation: {
				nextEl: $(self).closest('.module-unit').find(".swiper-button-next").get(0),
				prevEl: $(self).closest('.module-unit').find(".swiper-button-prev").get(0),
			},
			breakpoints: {
				667: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 3,
				},
				1200: {
					spaceBetween: 30,
					slidesPerView: 5,
				}
			}
		});
	});
}

function initDropdown() {
	var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
	var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
		return new bootstrap.Dropdown(dropdownToggleEl)
	})
}

function initCollapse() {
	var collapseElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="collapse"]'))
}

function initValidate() {
	$("input.number-only").inputmask("numeric", {
		rightAlign: false,
		allowPlus: false,
		allowMinus: false,
		autoGroup: true,
		digitsOptional: false,
		autoUnmask: true,
		digits: 0,
		showMaskOnHover: false,
		placeholder: "",
		numericInput: true
	});
	$("input.number-decimal").inputmask("numeric", {
		rightAlign: false,
		allowPlus: false,
		allowMinus: false,
		autoGroup: true,
		digitsOptional: false,
		autoUnmask: true,
		digits: 2,
		showMaskOnHover: false,
		placeholder: "",
		numericInput: true
	});
	$("input.currency").inputmask("decimal", {
		prefix: '',
		groupSeparator: '.',
		autoGroup: true,
		rightAlign: false,
		digits: 2,
		showMaskOnHover: false,
	});
}

const $win = $(window);
let windowWidth = $win.width();
$(window).on('resize', debounce(() => {
	// To prevent unexpected repaint on mobile devices on scroll
	if (windowWidth !== $win.width()) {

		initTooltip();
	}
	windowWidth = $win.width();
}, 50));

function initTooltip() {
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		if ($(window).width() <= 992) {
				if(tooltipTriggerEl.classList.contains('tooltip-btn')) {
					tooltipTriggerEl.setAttribute("data-bs-placement", "left");
				}
			}
			else {
				if(tooltipTriggerEl.classList.contains('.tooltip-btn')) {
					tooltipTriggerEl.removeAttribute("data-bs-placement");
				}
			}
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})	

}

function initCheckedClass() {
	$('.form-check-input').on('change', function () {
		if ($(this).prop('checked')) {
			$(this).closest('.form-check-card').addClass('checked');
			$(this).closest('.form-check-group').addClass('checked');
			triggerSiblings(this);
		} else {
			$(this).closest('.form-check-card').removeClass('checked');
			$(this).closest('.form-check-group').removeClass('checked');
		}
	});

	function triggerSiblings(elem) {
		$('.form-check-input[name="' + $(elem).attr('name') + '"]').not(elem).trigger('change');
	}
}

function initStickyMenu() {
	if ($('.navigation-menu').length) {
		$(window).on('scroll', function () {
			var stickyTop = $('.section-nav').offset().top;
			var headerHeight = $('.header').innerHeight();
			if ($(window).scrollTop() + headerHeight > stickyTop) {
				$('.navigation-menu').addClass('sticky');
			} else {
				$('.navigation-menu').removeClass('sticky');
			}
		});
	}

	var offsetArr = [];
	$(window).on('load resize', function () {
		offsetArr = [];
		for (var i = 0; i < $('.navigation-menu li').length; i++) {
			var elId = $('.navigation-menu li').eq(i).find('a').attr('href');
			if (elId !== '#' && $(elId).length) {
				offsetArr.push($(elId).offset().top);
			}
		}
	});

	$('.navigation-menu a').on('click', function (e) {
		if ($(this).attr('href')[0] == "#") {
			if ($($(this).attr('href')).length) {
				e.preventDefault();
				var self = this;
				var dest = $($(self).attr('href')).offset().top;
				dest = dest - $('.navigation-menu').innerHeight() - 25;
				$('html, body').stop().animate({
					scrollTop: dest
				}, 700);
				var text = $(this).text();
			}
		}
	});

	$(window).on('load resize scroll', function () {
		var _top = $(window).scrollTop();
		for (var i = offsetArr.length - 1; i >= 0; i--) {
			if (_top + $('.navigation-menu').innerHeight() + 25 > offsetArr[i]) {
				$('.navigation-menu li').removeClass('active');
				$('.navigation-menu li').eq(i).closest('li').addClass('active');
				break;
			} else if (_top < offsetArr[0]) {
				$('.navigation-menu li').removeClass('active');
			}
		}
	});
}

function initScrollableMenu() {
	// duration of scroll animation
	var scrollDuration = 300;
	// paddles
	var leftPaddle = document.getElementsByClassName('nav-bar-arrow-left');
	var rightPaddle = document.getElementsByClassName('nav-bar-arrow-right');

	// get some relevant size for the paddle triggering point
	var paddleMargin = 20;

	// get wrapper width
	var getMenuWrapperSize = function() {
		return $('.nav-bar-scrollable').outerWidth();
	}
	var menuWrapperSize = getMenuWrapperSize();
	// the wrapper is responsive
	$(window).on('resize', function() {
		menuWrapperSize = getMenuWrapperSize();
	});
	// size of the visible part of the menu is equal as the wrapper size
	var menuVisibleSize = menuWrapperSize;

	// get total width of all menu items
	var getMenuSize = function() {
		var itemsLength = 0;
		$('.nav-bar-menu li').each(function() {
			itemsLength += $(this).innerWidth();
		});

		return itemsLength;
	};
	var menuSize = getMenuSize();
	// get how much of menu is invisible
	var menuInvisibleSize = menuSize - menuWrapperSize;

	// get how much have we scrolled to the left
	var getMenuPosition = function() {
		return $('.nav-bar-menu').scrollLeft();
	};

	// finally, what happens when we are actually scrolling the menu
	$('.nav-bar-menu').on('scroll', function() {

		// get how much of menu is invisible
		menuInvisibleSize = menuSize - menuWrapperSize;
		// get how much have we scrolled so far
		var menuPosition = getMenuPosition();

		var menuEndOffset = menuInvisibleSize - paddleMargin;

		// show & hide the paddles
		// depending on scroll position
		if (menuPosition <= paddleMargin) {
			$(leftPaddle).addClass('hidden');
			$(rightPaddle).removeClass('hidden');
		} else if (menuPosition < menuEndOffset) {
			// show both paddles in the middle
			$(leftPaddle).removeClass('hidden');
			$(rightPaddle).removeClass('hidden');
		} else if (menuPosition >= menuEndOffset) {
			$(leftPaddle).removeClass('hidden');
			$(rightPaddle).addClass('hidden');
		}

		// print important values
		// $('#print-wrapper-size span').text(menuWrapperSize);
		// $('#print-menu-size span').text(menuSize);
		// $('#print-menu-invisible-size span').text(menuInvisibleSize);
		// $('#print-menu-position span').text(menuPosition);

	});

	// scroll to left
	$(rightPaddle).on('click', function() {
		$('.nav-bar-menu').animate( { scrollLeft: menuInvisibleSize}, scrollDuration);
	});

	// scroll to right
	$(leftPaddle).on('click', function() {
		$('.nav-bar-menu').animate( { scrollLeft: '0' }, scrollDuration);
	});
}

function initCloseCollapseOnButton() {
	$(".close-btn").on("click", function () {
		$('.collapse').collapse('hide');
	});
}


function initMobileMenu() {
	$('.burger').on('click', function (e) {
		e.preventDefault();
		$('body').toggleClass('menu-open');
	});
}


function initTourSlider() {
	$(".tour-slider").each(function () {
		const self = this;
		var swiper = new Swiper(this, {
			slidesPerView: 'auto',
			loop: false,
			spaceBetween: 15,
			autoHeight: true,
			mousewheel: false,
			navigation: {
				nextEl: $(self).closest('.module-unit').find(".swiper-button-next").get(0),
				prevEl: $(self).closest('.module-unit').find(".swiper-button-prev").get(0),
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				992: {
					spaceBetween: 28,
					slidesPerView: 3,
				}
			}
		});
	});
}

function initStickyBlock() {
	if (window.matchMedia("(min-width: 1200px)").matches) {
		$(".sticky-panel").sticky({
			topSpacing: 20,
			bottomSpacing: 1100
		});
	}
}

function initCreateTeamChecked() {
		// Get the checkbox
		var checkBox = document.getElementById("flexRadioDefault1");
		var checkBox2 = document.getElementById("flexRadioDefault2");
		// Get the output text
		var forms = document.querySelector(".different-address");
	  
		// If the checkbox is checked, display the output text

		if (checkBox2.checked == true){
			forms.classList.add("active");
		} else {
			  forms.classList.remove("active");
		}

		checkBox2.addEventListener("change", function() {
			if (checkBox2.checked == true){
			  forms.classList.add("active");
			}
		})
		checkBox.addEventListener("change", function() {
			if (checkBox.checked == true){
			  forms.classList.remove("active");
			}
		})

}




//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------
