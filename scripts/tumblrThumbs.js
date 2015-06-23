(function($) {
	
	var defaults = {
		title:  'Celia Brooks blog',
		blog: 'http://5-2veg.tumblr.com'
	};
	
	$.fn.tumblrThumbs = function(options) {
		
		// Handle the default settings
		var settings = $.extend({}, defaults, options);
		
		// Remove trailing slashes and Assemble the Tumblr API URL 
		var url = settings.blog.replace(/\/$/,'') + "/api/read/json?num=20&type=text&callback=?";

		// Post counter
		var count = 0;
		var latestNewsCount = 0;
		
		var self = $(this);

		var LatestNewsTag = "latest_news";

		//The final markup
		var toc = "";
		var toc2 = ""; //latest blog posts
		var toc3 = ""; //latest news posts

		//this.append('<div class="tumblr-data"><ul></ul></div>');
		toc = toc + '<div class="tumblr-data">\n<ul>\n';
		toc2 = toc2 + '<div class="tumblr-data">\n<ul>\n';
		toc3 = toc3 + '<div class="tumblr-data">\n<ul>\n';
		//var postList = this.find('ul');
		
		//Get the posts as json	
		$.getJSON(url, function(data) {
			$.each(data.posts, function(i,posts){ 
				
				var reg = '<img [^>]*src=".*?[^\]"[^>]*/>';
				var title, body, time, rtags, imgSrc = "";

				// Check if It's a text type post
				if (posts["type"]=="regular" || posts["type"]=="text"){

					//Found at least a regular post, prepare the div
					if (count == 0) {						
						//postList.append('<div class="row" style="clear: both">');
						toc = toc + '<div class="row">\n';
					}

					count = count + 1;

					// Remove any HTML tags
					title = posts['regular-title'].replace(reg,"");

					// Limit to 200 chars
					//body = posts['regular-body'].replace(reg,"").substring(0,200) + "...";

					// Fetch date (optional: Calculate the human-readable relative time)
					//time = posts['date']; //$.timeago( new Date( posts['unix-timestamp'] * 1000 ) );

					//Fetch Main picture
					var div = document.createElement('div');
					div.innerHTML = posts['regular-body'];
					var firstImage = div.getElementsByTagName('img')[0];
					imgSrc = firstImage ? firstImage.src : "";
					// or, if you want the unresolved src, as it appears in the original HTML:
					//var rawImgSrc = firstImage ? firstImage.getAttribute("src") : "";
					var isLatestNews = false;


				    // Fetch Tags
				    rtags = ""; 
					if(typeof posts.tags !== 'undefined'){
					    $.each(posts.tags, function(i,tags){
					    	if (tags == LatestNewsTag) { isLatestNews = true; } //is it a latest news blogpost?
					    	rtags = rtags + " " + tags;
					    	tagsList.push(tags);
					     });
					 };

				    var curColor = "orange";
				    if (count % 2 === 0 ) {						
						curColor = "pink";
					} else { curColor = "orange"; }

					if (latestNewsCount < 2 && isLatestNews) {	
						latestNewsCount = latestNewsCount + 1,					
						toc3 = toc3 + '<li class="tumblr-post pink" data-tags="' + rtags + '">\
											<a href="' + posts.url + '" class="popup-blog" target="_blank">\
												<div class="pic"><img src="'+ imgSrc +'" /></div>\
													<div class="title">'+ title + '</div>\
													<div class="arrows"><img src="'+ object_name.templateUrl +'/images/right_arrow.svg" class="svg" /></div>\
											</a>\
										</li>';
					}

					if (count < 5) {						
						toc2 = toc2 + '<li class="tumblr-post '+ curColor +'" data-tags="' + rtags + '">\
											<a href="' + posts.url + '" class="popup-blog" target="_blank">\
												<div class="pic"><img src="'+ imgSrc +'" /></div>\
												<div class="title">'+ title + '</div>\
												<div class="arrows"><img src="'+ object_name.templateUrl +'/images/right_arrow.svg" class="svg" /></div>\
											</a>\
										</li>';

					}

					toc = toc + '<li class="tumblr-post col span_2_of_6 '+ curColor +'" data-tags="' + rtags + '">\
										<a href="' + posts.url + '" class="popup-blog" target="_blank">\
											<div class="pic"><img src="'+ imgSrc +'" /></div>\
											<div class="title">'+ title + '</div>\
											<div class="arrows"><img src="'+ object_name.templateUrl +'/images/right_arrow.svg" class="svg" /></div>\
										</a>\
									</li>';

			    } else {
/*
					var caption = "";
					
					if (posts["type"]=="photo"){
					  caption = posts["photo-caption"];
					  caption = title.replace(/(<([^>]+)>)/ig,"");
					  caption = title.substring(0,100) + "...";
					};

					if (posts["type"]=="video") {
					  caption = posts["video-caption"];
					  caption = title.replace(/(<([^>]+)>)/ig,"");
					  caption = title.substring(0,100) + "...";
					};
					*/
			    };

			}); 
			
		}).success(function (data) {

            function resetBlogHeight() {
                //$("#blog-content .tumblr-data").css({'height': $("#blog-content .tumblr-data ul > div.row").height()*3-10 +"px"}); 
                $("#blog-content").parent().css("opacity","0.001").delay(100).animate({opacity: '1'}, 400);
                $("#blog-content .tumblr-data").css({'height': "auto"}); 
                if (count < 4){
                	$("#blog-load").hide();
                }
                else {
                	$("#blog-load").show();
                }
                
            }

			if (count > 0){
				toc = toc + '</div>\n</ul>\n</div>'
				toc2 = toc2 + '\n</ul>\n</div>'
				toc3 = toc3 + '\n</ul>\n</div>'
			 	//return this;
			 	self.html(toc);
			 	$("#blog-latest").html(toc2);
			 	$("#news-latest").html(toc3);

		 		tagsList.sort();
		 		tagsList = $.unique(tagsList);
		 		var optionsList = '<select id="blog-filter" name="blog-filter">\n';
				for( i = 0; i < tagsList.length; i++) {
 					optionsList = optionsList + '<option>'+(tagsList[i])+'</option>\n'
			    }
			    var optionsList = optionsList + "</select>";
			    $("#blog-filters").html(optionsList);
				// Set up inline popups
				$('.popup-blog').magnificPopup({
				  		type: 'iframe',
						removalDelay: 30,
						closeBtnInside: false,
						overflowY: 'hidden',
						mainClass: 'my-mfp-zoom-in blog-iframe'
					});
				$('a.popup-blog').click(function(){ 
					$("#blog-btn2").show();
					var tempUrl = $(this).attr("href");
					var parent = $(this).parent();
					var prevLink, nextLink = "";

					// Button open in new window
					$("#blog-btn2").click(function(){
 						window.open(tempUrl);
			    	});

					// Button previous blog post
					if (parent.prev().length < 1) { 
						$("#blog-btn3").hide();
					}
					else { 
						prevLink = parent.prev().find('a');
					}
					$("#blog-btn3").click(function(){
						setTimeout(function() {
						    $(prevLink).trigger("click");
						}, 100);						
			    	});

					// Button next blog post
					if (parent.next().length < 1) { 
						$("#blog-btn4").hide();
					}
					else { 
						nextLink = parent.next().find('a');
					}
					$("#blog-btn4").click(function(){
						setTimeout(function() {
						    $(nextLink).trigger("click");
						}, 100);						
			    	});


				});


				ui.fixHeights();
			}

            $("#blog-filter").change(function () {
                 var optionSelected = $(this).find("option:selected");
                 var valueSelected  = optionSelected.val();
                 var textSelected   = optionSelected.text();
                 var filteredCount = 0;
                 resetBlogHeight();
            	//hide all istances of the blog containing that tag
             	$("#blog-content li.tumblr-post").each(function() {
             		var fullTags = $(this).attr("data-tags");
             		$(this).show();
             		if (fullTags.toLowerCase().indexOf(textSelected) < 0) {
             			$(this).hide();
             		} else { filteredCount = filteredCount + 1;  }
              	});
             	
             	$("#blog-content li.tumblr-post:visible").each(function(){
             		var self = $(this);
             		self.removeClass("pink").removeClass("orange");

				    if (filteredCount % 2 === 0 ) {						
						self.addClass("orange");
					} else { self.addClass("pink"); }

					filteredCount = filteredCount+1;
             	});

                if (filteredCount < 4){
                	$("#blog-load").hide();
                }
                else {
                	$("#blog-content .tumblr-data").css({'height': "400px"}); 
                	$("#blog-load").show();

                }
				// Set up inline popups 
				/*
				$('.popup-blog').magnificPopup({
				  		type: 'iframe',
						removalDelay: 250,
						mainClass: 'my-mfp-zoom-in'
					});
*/
             });

    	}); // End of posts JSon loop

	};

})(jQuery);