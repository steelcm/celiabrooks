var UI = function () {

    var showHeader = function () {
        if (window.pageYOffset >300) { 
            if ($("#headcontainer").is(":hidden")) {
                 $("#headcontainer").show().animate({opacity: 1}, 350); 
            }
        }
        else { 
            if ($("#headcontainer").is(":visible")) {
                 $("#headcontainer").animate({opacity: 0}, 10).hide(); 
            }
        };  
    }

    var responsiveHeights = function () {

        //Reset heights
        $("#tour-content .span_4_of_6.split .right").css("height", "auto");
        $("#tour-content #quotes").css("min-height", "0");
        
        // stop fixing heights on mobile devices
        var mq = window.matchMedia( "(min-width: 654px)" );
        var mq2 = window.matchMedia( "(min-width: 954px)" );
        var mq3 = window.matchMedia( "(max-width: 653px)" );

        $("#blog-latest li.tumblr-post").each(function(){
                /*var post = $(this);
                var title = post.find(".title");
                var postHeight = post.height();
                var titleHeight = title.height();
                //alert("post: " + postHeight + "     title: " + titleHeight); */
            });


        if (mq.matches) {
            // window width is more than 654px
            $("#tour-content .span_4_of_6.split .right").css("height", $("#tour-content .span_4_of_6.split").height());
            $("#tour-content #quotes").css("height", $("#tour-content .span_4_of_6.split").height());

            $("#vouchers .span_2_of_6").css("height", $("#vouchers .span_3_of_6").height());
            $("#vouchers .span_1_of_6").css("height", $("#vouchers .span_3_of_6").height());

            $("#tour4 .omega").css("height", $("#tour4 .alpha").height());
            $("#tour5 .omega").css("height", $("#tour5 .alpha").height());


        };
        if (mq2.matches) {

            // window width is more than 954px
            $(".tour-calendar").each(function(){
                var info = $(this).parent().find(".info");
                $(this).css("min-height", info.height());
            });
        };
        if (mq3.matches) {

            //books
            $("#btn-books-load").click(function(){
                $("#books-wrap2").slideDown(300);
                $("#books-load").hide();
            });

            //video
            $("#youmax-encloser").height($(".youmax-video-tnail-box").first().height()*2+72);
            $("#btn-videos-load").click(function(){
                var tempH = $("#youmax-encloser").height();
                $("#youmax-encloser").height(tempH*2);
                if ($("#youmax-encloser").height() > $("#youmax-video-list-div").height()) {
                    $("#youmax-encloser").height($("#youmax-video-list-div").height());
                    $("#btn-videos-load").hide();
                };
            });
        } else { $("#youmax-encloser").height($("#youmax-video-list-div").height()); };

    }

    var fixHeights = function () {

    }

    var init = function () {

        // Navigation menu events
        $("#nav-menu").click(function(){
            $("#nav").fadeToggle();
        });

        $("#nav a, #logo a").click(function(){
            if ($("#nav-menu").is(":visible")) {
                if ($("#nav").is(":visible")) {
                    $("#nav").fadeOut();
                };
            };
        });

        $("#nav-top a").click(function(){
            if ($("#nav-menu-top").is(":visible")) {
                if ($("#nav-top").is(":visible")) {
                    $("#nav-top").fadeOut();
                };
            };
        });

        $("#nav-menu-top").click(function(){
            $("#nav-top").fadeToggle();
        });

        $(".btn-more a.button").click(function(){
            $(this).parent().hide().parent().css("height","auto");
        });

        // header scroll event
        window.addEventListener('scroll', function (event) {
            $.doTimeout( 'scroll', 50, function(){
                showHeader();
            });
        });

        // window resize event
        window.addEventListener('resize', function (event) {
            $.doTimeout( 'resize', 50, function(){
                //alert("resized");
                responsiveHeights();
            });
        });

        // Nice scroll effect on anchors
        $('a.nice-scroll').on('click',function (e) {
            e.preventDefault();

            var target = this.hash,
            $target = $(target);
            var offset = $target.offset().top - $("#headcontainer").height();
            $('html, body').stop().animate({
                'scrollTop': offset
            }, 900, 'swing');
        });

        // Set up SVG fallbacks
        $('#headcontainer img.svg').svgmagic({
           //testmode: true,
           //secure: true
        });
        $('.wrap-dates ul li').svgmagic({
            backgroundimage: true
        });
        $('.svg-bg').svgmagic({
            backgroundimage: true
        });

        // Set up inline popups
        $('.popup-html').magnificPopup({
            type:'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 250,
            mainClass: 'my-mfp-zoom-in'
        });

        // Tours calendars events
        $('.tour-calendar div.wrap-dates ul li').click(function(){
            var self = $(this);
            self.parent().find("li").removeClass("active").end().end().addClass("active");
        });

        //Quotes carousel
        jQuery('#quotes .slider').lbSlider({
            leftBtn: '.sa-left',
            rightBtn: '.sa-right',
            visible: 1,
            autoPlay: true,
            autoPlayDelay: 6
        });
        //Quotes carousel
        jQuery('#quotes2 .slider').lbSlider({
            leftBtn: '.sa-left2',
            rightBtn: '.sa-right2',
            visible: 1,
            autoPlay: true,
            autoPlayDelay: 6
        });
        
        showHeader();

        log('Global JS loaded');

    }

    var log = function (msg) {
        var timestamp = '';
        var currentTime = new Date()
        var hours = currentTime.getHours()
        var minutes = currentTime.getMinutes()
        var seconds = currentTime.getSeconds()
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        timestamp += hours + ":" + minutes + ":" + seconds + " ";
        if (hours > 11) {
            timestamp += "PM"
        } else {
            timestamp += "AM"
        }
        console.log(timestamp + ': ' + msg);
    }

    // Reveal public pointers to  
    // private functions and properties
    return {
        init: init,
        fixHeights : responsiveHeights
    };

};
