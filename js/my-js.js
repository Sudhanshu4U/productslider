	var oldx = 0, oldy = 0, checker = false, cimgwidth = 0;
	var xstart1 = 0;
	var ystart1 = 0;
	var xstart2 = 0;
	var ystart2 = 0;
	
	
	
	$( window ).resize(function() {
		var popupheight = parseInt($("#popup").css("height"));
		popupheight = popupheight-(70+100);
		$(".slider .owl-item").css("height", popupheight+"px");
		$(".slider .owl-item .draggable").css("height", popupheight+"px");
		$(".slider .owl-item .draggable").css("width", "auto");
		$(".slider .owl-item .draggable").css("width", $(".slider .owl-item .draggable").css("width"));
	});
    $(document).ready(function() {
        var owl = $(".slider").owlCarousel({
			singleItem:true,
			navigation: true,
			navigationText: ['&lsaquo;','&rsaquo;'],
			slideSpeed: 300,
			paginationSpeed: 400,
			singleItem: true,
			mouseDrag:false,
			touchDrag: false,
			afterInit: makePages,
			afterUpdate: makePages,
			afterMove: function (elem) 
			{
				$(".slider .owl-item .draggable").attr("zoom-counter", "0");
				var current = this.currentItem;
				$(".owl-item").removeClass("activeClass");
				$(".owl-item").eq(current).addClass("activeClass");
				
				var popupheight = parseInt($("#popup").css("height"));
				popupheight = popupheight-(70+100);
				$(".slider .owl-item").css("height", popupheight+"px");
				$(".slider .owl-item .draggable").css("height", popupheight+"px");
				$(".slider .owl-item .draggable").css("width", "auto");
				$(".slider .owl-item .draggable").css("width", $(".slider .owl-item .draggable").css("width"));
				
				$(".slider .owl-item .draggable").css({
				left: 'auto',
				position: 'relative',
				right: 'auto',
				top: 0,
				transition: 'width 1s ease 0s, height 1s ease 0s',
				});
				$(".slider .owl-item .draggable").attr("zoom-counter", 0);
			}
  		});
  		$(".slider .owl-wrapper").append('<div style="float:right;z-index: 100;"><div class="zoomerleft" onclick="zoomin()">+</div><div class="zoomerright" onclick="zoomout()">-</div></div>');
  		$('.owl-carousel2').owlCarousel({
			
			items: 3,
			loop: true,
			margin: 10,
			autoplay: true,
			autoplayTimeout: 1000,
			autoplayHoverPause: true          
		});
		$(".owl-carousel2 .owl-controls").show();
		$(".owl-carousel2 .owl-prev").html('<i aria-hidden="true" class="fa fa-angle-left"></i>');
		$(".owl-carousel2 .owl-next").html('<i aria-hidden="true" class="fa fa-angle-right"></i>');
		$(".slider .owl-prev").html('<img src="images/left.png" alt=""/>');
		$(".slider .owl-next").html('<img src="images/right.png" alt=""/>');
		
		function showNaves()
		{
			$(".owl-carousel2 .owl-controls").show();
		}
		function makePages() 
		{
			var current = this.currentItem;
			$(".owl-item").removeClass("activeClass");
			$(".owl-item").eq(current).addClass("activeClass");
			oldx = 0; 
			oldy = 0; 
			checker = false;
			
			var popupheight = parseInt($("#popup").css("height"));
			popupheight = popupheight-(70+100);
			$(".slider .owl-item").css("height", popupheight+"px");
			$(".slider .owl-item .draggable").css("height", popupheight+"px");
			$(".slider .owl-item .draggable").css("width", "auto");
			
			cimgwidth = parseInt($(".slider .owl-item .draggable").css("width"));
			$(".slider .owl-item .draggable").css("width", cimgwidth+"px");
			
			$.each(this.owl.userItems, function(i) {
				$('.owl-controls .owl-page').eq(i)
					.css({
						'background': 'url(' + $(this).find('img').attr('src') + ')',
						'background-size': 'cover'
					})
			});
			
		}
		$(".slider .owl-item .draggable").on('mouseout', function(event) 
		{
			checker = false;
			oldx = event.pageX;
			oldy = event.pageY;
			event.preventDefault();
		});
		$(".slider .owl-item .draggable").on('mousedown', function(event) 
		{
			$(".slider .activeClass .draggable").css({"transition": "width 1s, height 1s"});
			checker = true;
			oldx = event.pageX;
			oldy = event.pageY;
			event.preventDefault();
		});
		$(".slider .owl-item .draggable").on('mouseup', function(event) 
		{
			checker = false;
			var itemwidth = $(".slider .activeClass").css("width");
			var width1 = $(".slider .activeClass .draggable").css("width");
			var height1 = $(".slider .activeClass .draggable").css("height");
			if(oldx != 0)
			{
				if(parseInt(width1) > parseInt(itemwidth))
				{
				var mainx 	= event.pageX - oldx;
				var oldleft = parseInt($(".slider .activeClass .draggable").css("left"));
				var diff = parseInt(width1) + oldleft;
				
				mainx 		= mainx + oldleft;
				mainx 		= mainx + "px";
				$(".slider .activeClass .draggable").css("left", mainx);
				$(".slider .activeClass .draggable").css("position", "relative");
				}
			}
			if(oldy != 0)
			{
				var mainx 	= event.pageY - oldy;
				var oldleft = parseInt($(".slider .activeClass .draggable").css("top"));
				mainx 		= mainx + oldleft;
				mainx 		= mainx + "px";
				$(".slider .activeClass .draggable").css("top", mainx);
				$(".slider .activeClass .draggable").css("position", "relative");
			}
			oldx = event.pageX;
			oldy = event.pageY;
			event.preventDefault();
		});
		$(".slider .owl-item .draggable").on('mousemove', function(event) 
		{
			if(checker == true)
			{
				var itemwidth = $(".slider .activeClass").css("width");
				var width1 = $(".slider .activeClass .draggable").css("width");
				
				var itemheight = $(".slider .activeClass").css("height");
				var height1 = $(".slider .activeClass .draggable").css("height");

				if(parseInt(width1) > parseInt(itemwidth))
				{
					if(oldx != 0)
					{
						var diff 	= parseInt(itemwidth) - parseInt(width1);
						var mainx 	= event.pageX - oldx;
						
						var oldleft = parseInt($(".slider .activeClass .draggable").css("left"));
						mainx 		= mainx + oldleft;
						if((diff <= mainx) && (mainx <= 0) )
						{
							mainx 		= mainx + "px";
							$(".slider .activeClass .draggable").css("left", mainx);
							$(".slider .activeClass .draggable").css("position", "relative");
						}
					}
				}
				if(parseInt(height1) > parseInt(itemheight))
				{
					if(oldy != 0)
					{
						var diff 	= parseInt(itemheight) - parseInt(height1);
						var mainx 	= event.pageY - oldy;
						var oldleft = parseInt($(".slider .activeClass .draggable").css("top"));
						mainx 		= mainx + oldleft;
						if((diff <= mainx) && (mainx <= 0) )
						{
							mainx 		= mainx + "px";
							$(".slider .activeClass .draggable").css("top", mainx);
							$(".slider .activeClass .draggable").css("position", "relative");
						}
					}
				}
			}
			
			oldx = event.pageX;
			oldy = event.pageY;
			event.preventDefault();
		});
		$("body").on('touchstart', function (e) 
		{
			if (e.touches.length >= 2)
				e.preventDefault();
		});
		$(".slider").on('touchstart', function (e) 
		{
			if (e.touches.length >= 2)
				e.preventDefault();
		});
		$(".slider .owl-item").on('touchstart', function (e) 
		{
			if (e.touches.length >= 2)
				e.preventDefault();
		});
		
		$(".slider .owl-item .draggable").on('touchstart', function (e) 
		{
			if (e.touches.length >= 2)
			{
				e.preventDefault();
				$(".slider .owl-item .draggable").css("transition", "none");
				xstart1 = e.touches.item(0).pageX;
				ystart1 = e.touches.item(0).pageY;
				xstart2 = e.touches.item(1).pageX;
				ystart2 = e.touches.item(1).pageY;
			}
			else if(e.touches.length == 1)
			{
				checker = true;
				oldx = e.touches.item(0).clientX;
				oldy = e.touches.item(0).clientY;
				//alert("x = " + oldx + " " + "y = " + oldy);
				e.preventDefault();
			}
			else{e.preventDefault();}
				
		});
		$(".slider .owl-item .draggable").on('touchmove', function (e) 
		{
			if (e.touches.length >= 2)
			{
				e.preventDefault();
				$(".slider .owl-item .draggable").css("transition", "none");
				var xmove1 = e.touches.item(0).pageX;
				var ymove1 = e.touches.item(0).pageY;
				var xmove2 = e.touches.item(1).pageX;
				var ymove2 = e.touches.item(1).pageY;
				var diffx1 = 0, diffx2 = 0, diffy1 = 0, diffy2 = 0;
				
				if((
				(xstart1 > xmove1) && 
				(xstart2 < xmove2) && 
				(ystart1 < ymove1) && 
				(ystart2 > ymove2)) ||
				
				((xstart1 < xmove1) && 
				(xstart2 > xmove2) && 
				(ystart1 > ymove1) && 
				(ystart2 < ymove2)) /*||
				
				((xstart1 > xmove1) &&
				(xstart2 < ymove2) &&
				(ystart1 > ymove1) &&
				(ystart2 < ymove2)) ||
				
				((xstart1 < xmove1) && 
				(xstart2 > xmove2) && 
				(ystart1 < ymove1) && 
				(ystart2 > ymove2))*/
				)
				{
					var width 		= parseInt($(".slider .activeClass .draggable").css("width"));
					var w1			= width;
					var left 		= parseInt($(".slider .activeClass .draggable").css("left"));
					var top 		= parseInt($(".slider .activeClass .draggable").css("top"));
					width 			+= 30;
					left  			-= 15;
					top  			-= 15;
					
					$(".slider .activeClass .draggable").css("width", width+"px");
					$(".slider .activeClass .draggable").css("left", left+"px");
					$(".slider .activeClass .draggable").css("top", top+"px");
					$(".slider .owl-item .draggable").css("height", "auto");
					xstart1 = xmove1;
					xstart2 = xmove2;
					ystart1 = ymove1;
					ystart2 = ymove2;
				}
				else if((
				(xmove1 > xstart1) && 
				(xmove2 < xstart2) && 
				(ymove1 < ystart1) && 
				(ymove2 > ystart2)) ||
				
				((xmove1 < xstart1) && 
				(xmove2 > xstart2) && 
				(ymove1 > ystart1) &&
				(ymove2 < ystart2))/* ||
				 
				((xmove1 > xstart1) && 
				(xmove2 < xstart2) && 
				(ymove1 < ystart1) &&
				(ymove2 > ystart2)) ||
				
				((xmove1 < xstart1) && 
				(xmove2 > xstart2) && 
				(ymove1 > ystart1) &&
				(ymove2 < ystart2)) */				
				)
				{
					var width 		= parseInt($(".slider .activeClass .draggable").css("width"));
					var left 		= parseInt($(".slider .activeClass .draggable").css("left"));
					var top 		= parseInt($(".slider .activeClass .draggable").css("top"));
					width 			-= 30;
					left  			+= 15;
					top  			+= 15;
					
					if(left <= 0)
					{
						var height 		= parseInt($(".slider .activeClass .draggable").css("height"));
						var popupheight = parseInt($("#popup").css("height"));
						var popupwidth = parseInt($("#popup").css("width"));
						popupheight = popupheight-(70+100);
						
						if(height > popupheight && width > popupwidth)
						{
							$(".slider .activeClass .draggable").css("width", width+"px");
							$(".slider .activeClass .draggable").css("left", left+"px");
							$(".slider .activeClass .draggable").css("top", top+"px");
							$(".slider .owl-item .draggable").css("height", "auto");
						}
						else if(height > popupheight)
						{
							$(".slider .activeClass .draggable").css("width", width+"px");
							$(".slider .activeClass .draggable").css("left", "0px");
							$(".slider .activeClass .draggable").css("top", top+"px");
							$(".slider .owl-item .draggable").css("height", "auto");
						}
						else
						{
							$(".slider .activeClass .draggable").css("left","0px");
							$(".slider .activeClass .draggable").css("top","0px");
						}
						xstart1 = xmove1;
						xstart2 = xmove2;
						ystart1 = ymove1;
						ystart2 = ymove2;
						
					}
					
				}
			}
			else if(e.touches.length == 1)
			{
				if(checker == true)
				{
					var itemwidth = $(".slider .activeClass").css("width");
					var width1 = $(".slider .activeClass .draggable").css("width");
					
					var itemheight = $(".slider .activeClass").css("height");
					var height1 = $(".slider .activeClass .draggable").css("height");

					if(parseInt(width1) > parseInt(itemwidth))
					{
						if(oldx != 0)
						{
							var diff 	= parseInt(itemwidth) - parseInt(width1);
							var mainx 	= e.touches.item(0).pageX - oldx;
							
							var oldleft = parseInt($(".slider .activeClass .draggable").css("left"));
							mainx 		= mainx + oldleft;
							if((diff <= mainx) && (mainx <= 0) )
							{
								mainx 		= mainx + "px";
								$(".slider .activeClass .draggable").css("left", mainx);
								$(".slider .activeClass .draggable").css("position", "relative");
							}
						}
					}
					if(parseInt(height1) > parseInt(itemheight))
					{
						if(oldy != 0)
						{
							var diff 	= parseInt(itemheight) - parseInt(height1);
							var mainx 	= e.touches.item(0).pageY - oldy;
							var oldleft = parseInt($(".slider .activeClass .draggable").css("top"));
							mainx 		= mainx + oldleft;
							if((diff <= mainx) && (mainx <= 0) )
							{
								mainx 		= mainx + "px";
								$(".slider .activeClass .draggable").css("top", mainx);
								$(".slider .activeClass .draggable").css("position", "relative");
							}
						}
					}
				}
				
				oldx = e.touches.item(0).pageX;
				oldy = e.touches.item(0).pageY;
				e.preventDefault();
			}
			else{e.preventDefault();}
				
		});
    });
    function showpopup()
	{
		$("#popup").show();
		var popupheight = parseInt($("#popup").css("height"));
		popupheight = popupheight-(70+100);
		$(".slider .owl-item").css("height", popupheight+"px");
		$(".slider .owl-item .draggable").css("height", popupheight+"px");
		$(".slider .owl-item .draggable").css("width","auto");
		$(".slider .owl-item .draggable").css("width", $(".slider .owl-item .draggable").css("width"));
		$(".spzoom-zoom").css("visibility","hidden");
		$(".spzoom-tracker").css("visibility","hidden");
		setTimeout(function()
		{
			$( ".stretchicon-container" ).fadeOut( "slow");
		}, 3000);
		/*
		var el = document.documentElement , rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen || el.exitFullscreen || el.mozCancelFullscreen;
		
		
		if(typeof rfs!="undefined" && rfs)
		{
			rfs.call(el);
		} 
		else if(typeof window.ActiveXObject!="undefined")
		{
			var wscript = new ActiveXObject("WScript.Shell");
			if (wscript!=null) 
			{
				wscript.SendKeys("{F11}");
			}
		}*/
		return false;
	}
	function exitfull()
	{
		var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);
        
        $(".slider .owl-item .draggable").attr("zoom-counter", "0");
        
        var popupheight = parseInt($("#popup").css("height"));
		popupheight = popupheight-(70+100);
		$(".slider .owl-item").css("height", popupheight+"px");
		$(".slider .owl-item .draggable").css("height", popupheight+"px");
		$(".slider .owl-item .draggable").css("width", "auto");
		$(".slider .owl-item .draggable").css("width", $(".slider .owl-item .draggable").css("width"));
        
        $(".slider .owl-item .draggable").css({
			left: 'auto',
			position: 'relative',
			right: 'auto',
			top: 0,
			transition: 'width 1s ease 0s, height 1s ease 0s'
		});
		$(".slider .owl-item .draggable").attr("zoom-counter", 0);
		$("#popup").hide();
		/*var docElm = document.documentElement;
		if (!isInFullScreen) {
			if (docElm.requestFullscreen) {
				//docElm.requestFullscreen();
			} else if (docElm.mozRequestFullScreen) {
				//docElm.mozRequestFullScreen();
			} else if (docElm.webkitRequestFullScreen) {
				//docElm.webkitRequestFullScreen();
			} else if (docElm.msRequestFullscreen) {
				//docElm.msRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}*/
		
		
		
			
	}
	function changeImage(str, jump)
	{
		$(".owl-carousel2 .owl-item").css("border-bottom", "none");
		$(".owl-carousel2 .owl-item:nth-child("+jump+")").css("border-bottom", "2px solid #FF0000");
		$("#imagezoomer").attr("href", str);
		$("#imagezoomer img").attr("src", str);
		$("#imagezoomer .spzoom-zoom img").attr("src", str);
		
		str = str - 1;
		$('.slider').trigger('owl.jumpTo', jump);
	}
	function zoomin()
	{
		var zoomcounter = parseInt($(".slider .activeClass .draggable").attr("zoom-counter"));
		
		if(zoomcounter < 3)
		{
			var margin = $(".slider .activeClass .draggable").css("top");
			var width1 = $(".slider .activeClass .draggable").css("width");
			var itemwidth = parseInt($(".slider .activeClass").css("width"));
			
			$(".slider .activeClass .draggable").css({"transition": "width 1s, height 1s, top 1s"});
			
			width1 = parseInt(width1);
			width1 += 400;
			$(".slider .activeClass .draggable").css("height","auto");
			
			margin = parseInt(margin) - 200;
			width1 = width1+"px";			
			margin = margin + "px";

			$(".slider .activeClass .draggable").css({"position":"relative","top": margin, "width": width1});
			
			
			var height = $(".slider .activeClass .draggable").css("height");
			var itemheight = parseInt($(".slider .activeClass").css("height"));
			if(itemwidth >= parseInt(width1))
			{
				$(".slider .activeClass .draggable").css("left", "auto");
				$(".slider .activeClass .draggable").css("right", "auto");
				$(".shiftleft").hide();
				$(".shiftright").hide();
			}
			else
			{
				$(".shiftleft").show();
				$(".shiftright").show();
			}
			
			if(itemheight >= parseInt(height))
			{
				$(".shifttop").hide();
				$(".shiftbottom").hide();
			}
			else
			{
				$(".shifttop").show();
				$(".shiftbottom").show();
			}
			zoomcounter++;
			$(".slider .activeClass .draggable").attr("zoom-counter", zoomcounter);
		}
		
	}
	function zoomout()
	{
		var zoomcounter = parseInt($(".slider .activeClass .draggable").attr("zoom-counter"));
		if(zoomcounter > 0)
		{
			zoomcounter--;
			$(".slider .activeClass .draggable").attr("zoom-counter", ""+zoomcounter);
		}
		var margin = $(".slider .activeClass .draggable").css("top");
		var width = $(".slider .activeClass .draggable").css("width");
		
		var height = parseInt($(".slider .activeClass .draggable").css("height"));
		
		$(".slider .activeClass .draggable").css("left", "auto");
		
		$(".slider .activeClass .draggable").css({"transition": "width 1s, height 1s, top 1s"});
		
		width = parseInt(width);
		width -= 400;
		
		var popupheight = parseInt($("#popup").css("height"));
		popupheight = popupheight-(70+100);
		if(width >= cimgwidth)
		{
			width = width+"px";
			
			if(height > popupheight)
			{
				margin = parseInt(margin) + 200;
				margin = margin + "px";
				$(".slider .activeClass .draggable").css("top",margin);
				$(".slider .activeClass .draggable").css("width", width);
			}
			var itemheight = parseInt($(".slider .activeClass").css("height"));
			
			var itemwidth = parseInt($(".slider .activeClass").css("width"));

			if(itemwidth >= parseInt(width))
			{
				$(".slider .activeClass .draggable").css("left", "auto");
				$(".slider .activeClass .draggable").css("right", "auto");
			}
		}
		else
		{
			$(".slider .activeClass .draggable").css("left","0px");
			$(".slider .activeClass .draggable").css("top","0px");
			$(".slider .activeClass .draggable").css("width", cimgwidth+"px");
		}
	}
