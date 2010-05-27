(function($) {

$.fn.featurify = function(options) {
var settings = {
	transition : 750,
	pause : 5000,
	directionIn : -1,
	directionOut : -1,
};

if (options) $.extend(settings, options);

this.each(function() {
	//
});

var features = this,
	featuresWidth = features.width(),
	ul = this.find("ul"),
	li = ul.find("li"),
	liWidth = li.width(),
	t = undefined,
	on = false;

features.css({
		overflow:"hidden"
	});

li.hide().first().show();

var featuresHeight = features.height();

ul.css({
		width: featuresWidth + "px",
		position: "relative",
		height: featuresHeight + "px"
	});

li.css({
		position : "absolute",
		width: liWidth + "px"
	});

var loop = function() {
	if (on) return;	

	on = true;

	var li = features.find("li"),
		first = li.first(),
		next = first.next();

	first.css("left", "0px")
		.show()
		.clone()
		.hide()
		.insertAfter(li.last());;

	next.css({
			"left" : settings.directionIn * featuresWidth + "px",
			opacity : 0
		})
		.show();

	first.animate({
			opacity: 0,
			left: settings.directionOut * featuresWidth + "px" 
		},
		settings.transition,
		function() {
			$(this).remove();
		});

	next.animate({
			opacity: 1,
			left: "0px"
		},
		settings.transition);

	setTimeout(function() { on = false; }, settings.transition);
	t = setTimeout(function() { loop(); }, settings.pause);
}

ul.hover(function() {
		clearTimeout(t);
	},
	function() {
		setTimeout(function() { loop(); }, settings.transition);
	});

t = setTimeout(function() { loop(); }, settings.pause);

return this;
};

})(jQuery);