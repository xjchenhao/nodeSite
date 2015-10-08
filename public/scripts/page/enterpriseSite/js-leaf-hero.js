(function($){
	$(document).ready(function() {
		var ready = true;
		$('ul#preview-slider-holder > li').mouseover(function () {
			var _this = this;
			position = 0;
			if($(this).hasClass('preview-first')){
				position = 0;
			} else if($(this).hasClass('preview-second')){
				position = 1;
			} else if($(this).hasClass('preview-third')){
				position = 2;
			}
			if(!ready){
				$("#preview-slider > div:not(':last'):not(':eq(" + position + ")')").each(function(){
					if($(this).is(':animated')){
						$(this).stop(true, true);
					}				
				});				
			}
			ready = false;
			$("#preview-slider > div:not(':last'):not(':eq(" + position + ")')").hide();
			$('img', this).animate({"top": "-15px"}, 200);
			$('#preview-slide-' + (position + 1)).fadeIn(600, function(){
				ready = true;
			});
			$('img[id^="preview-thumbnail-im"]:not([id="preview-thumbnail-im' + (position+1) + '"])').stop(true, false).animate({'top': '0px'}, 200);
		});	
		var hh=0;
		slider_zd(hh);
		function slider_zd(aa){
			$('ul#preview-slider-holder > li').eq(hh).mouseover();
			if(aa+1<3){
				hh=hh+1;
			}
			else{
				hh=0;
			}
		}
		window.setInterval(function(){slider_zd(hh);},4000);
	});
})(jQuery);