// scripts.js

$(function(){
	//this code will execute after the DOM is loaded
	var carouselList = $("#carousel ul");
	var dotsArray = $('.js-dots li').toArray();

	var counter = 9999999 * dotsArray.length;
	
	function renderDots() {
		$(dotsArray).removeClass('active');

		$(dotsArray[counter % dotsArray.length]).addClass('active');
		
	}
	
	function changeSlide(msTime) {
		msTime = msTime || 500;
		carouselList.animate({'marginLeft':-400}, msTime, moveFirstSlide);
	}

	function goToSlide() {
		clearInterval(interval);
		interval = setInterval(changeSlide, 4000);

		var moves = $(this).index() - (counter % dotsArray.length);

		for (var i = 0; i < moves; i++) {
			setTimeout(changeSlide, i * (500 / moves), 500 / moves);
		}
	}

	$(dotsArray).click(goToSlide);

	function changeSlidePrev() {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");

		firstItem.before(lastItem);

		carouselList.css({'marginLeft':-400});

		carouselList.animate({'marginLeft': 0}, 500);

		counter--;
		renderDots();
	}

	var interval = setInterval(changeSlide, 4000); //every 3 seconds, it performs a function to change the slide

	function moveFirstSlide () {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");
		
		lastItem.after(firstItem);
		carouselList.css({marginLeft:0});

		counter++;
		renderDots();
	}

	$('.js-next').click(function () {
		clearInterval(interval);
		changeSlide();
		interval = setInterval(changeSlide, 4000);
	});

	$('.js-prev').click(function () {
		clearInterval(interval);
		changeSlidePrev();
		interval = setInterval(changeSlide, 4000);
	});
	
});
