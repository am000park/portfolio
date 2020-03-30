$(function() {
            
    // 페이지 스크롤
    window.addEventListener("wheel", function(e) {
        e.preventDefault();
    }, { passive: false });

    var $html = $("html");
    var boxLength = $(".page").length;
    var page = 0;
    var scrollChk = false;

    $html.animate({ scrollTop: 0 });

    $html.on("wheel", function(e) {
        if(scrollChk) return;
        
        if(e.originalEvent.deltaY > 0) {
            if(page == boxLength) return;
            
            page++;

        } else {
            if(page == 1) return;
            
            page--;
        }

        var scrollTop = (page - 1) * $(window).height();

        scrollChk = true;

        $html.animate({ "scrollTop": scrollTop }, function() {
            scrollChk = false;
        });

    });


    // 텍스트 효과
    var $title = $("#title");
    var titleText = $title.html().trim();
    var textLetters = titleText.split("");
    var titleDuration = 400;

    $title.html("");

    $.each(textLetters, function(index, item) {
        item = (item == " ") ? "&nbsp;" : item;

        $("<span></span>").html(item).hide().appendTo($title);
    });

    var charCursor = $("<span></span>").addClass("charCursor").css({
                        display: "inline-block",
                        width: "30px", height: "1px",
                        borderBottom: "15px solid #444",
                        marginBottom: "-15px"
                    }).appendTo($title);

    $title.children().each(function (index) {
        $(this).delay(index * titleDuration).show(10);
    });

    window.setTimeout(function() {
        window.setInterval(function() {
            charCursor.hide().delay(300).show(10);
        }, 600);
    }, titleDuration * textLetters.length);


    // 슬라이드
    var $slide = $("#slide");
    var $rolling = $slide.children("ul");
    var timerId;

    $("#next").on("click", function() {
        nextSlide();
    });

    $("#prev").on("click", function() {
        $rolling.css( "margin-left", "-33.33%" ).children(":last").prependTo($rolling);

        $rolling.animate({ "margin-left": "0" });
    });

    $slide.hover(
        function() {
            window.clearInterval(timerId);
        },
        function() {
            timerId = window.setInterval(nextSlide, 2000);
        },
    );

    timerId = window.setInterval(nextSlide, 2000);

    function nextSlide() {
        $rolling.animate({ "margin-left": "-33.33%" }, function() {
            $rolling.removeAttr("style").children(":first").appendTo(this);
        });
    }
    
});