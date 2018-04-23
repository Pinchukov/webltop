$(function() {

	$('.logo-litera').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace('TOP', '<span class="uk-text-warning">TOP</span>'));
	});


$('.nav-items-active li').removeClass('uk-active');
	var path = window.location.pathname;
	$('.nav-items-active li a').each(function() {
		var href = $(this).attr('href');
		if(path.slice(1).substring(0, href.length) === href) {
			$(this).parent('li').addClass('uk-active');
		}
	});

	$('.search').click(function() {
		$('.search-field').stop().slideToggle();
		$('.search-field input[type=text]').focus();
	});

	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('.search-field').slideUp();
		}
	}).click(function() {
		$('.search-field').slideUp();
	});
	$('.search-wrap').click(function(e) {
		e.stopPropagation();
	});

	
	$("body").prognroll({
		height: 3,
		color: "#faa05a",
		custom: false
	});



});


//mail sender
$(document).ready(function () {
//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#forms").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за сообщение!");
			setTimeout(function() {
				$.magnificPopup.close();
				$("#forms").trigger("reset");
			}, 1000);
		});
		return false;
	});


}); //end document.ready function