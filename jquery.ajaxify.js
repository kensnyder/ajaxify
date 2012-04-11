(function($) {
	
	"use strict";
	
	$.fn.ajaxify = function(options) {
		options = $.extend({}, $.fn.ajaxify.defaultOptions, options || {});
		return this.each(function() {
			var $container = $(this);
			var setHtml = function(h) { $container[$.fn.html5 ? 'html5' : 'html'](h) };
			var onComplete = function(xhr) {
				setHtml(options.preHtml + xhr.responseText + options.postHtml);
			};
			$container.delegate('a', 'click', function(evt) {
				if (this.target) {
					return;
				}
				evt.preventDefault();
				if (options.loadingHtml !== false) {
					setHtml(options.loadingHtml);
				}
				$.ajax({
					url: this.href,
					complete: onComplete
				});
			});
			$container.delegate('form', 'submit', function(evt) {
				evt.preventDefault();
				if (options.loadingHtml !== false) {
					setHtml(options.loadingHtml);
				}
				var $form = $(this);
				$.ajax({
					type: this.method ? this.method : 'get',
					url: this.action,
					data: $form.serialize(),
					complete: onComplete
				})
			});
			if (options.initialUrlAttribute) {
				$.ajax({
					url: $container.attr(options.initialUrlAttribute),
					complete: onComplete
				});			
			}
		});
	};
	
	$.fn.ajaxify.defaultOptions = {
		initialUrlAttribute: false,
		preHtml: '',
		postHtml: '<div style="clear:both"></div>',
		loadingHtml: '<div class="loader-large">Loading...</div>'
	};
	
})(jQuery);