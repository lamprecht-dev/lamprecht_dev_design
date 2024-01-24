// gsap.registerPlugin(ScrollTrigger);

$(function () {
    close_nav();
    $(".small.header .nav").on("click", open_nav);
    $(".scroll.header.small .nav").on("click", open_nav);
    $("#nav_modal").on("click", close_nav);

    $(document).on("scroll", adjust_nav_bar);

    $.each($("[data-scroll-to]"), function (indexInArray, valueOfElement) { 
        let trarget = $(valueOfElement).data("scroll-to");
        $(valueOfElement).on("click", () => {
            scroll_to_element(trarget);
        })
    });
});

function open_nav(){
    $("#nav_modal").addClass("show");
    //$("#nav_modal").show();
}

function close_nav(){
    $("#nav_modal").removeClass("show");
    //$("#nav_modal").hide();
}

function scroll_to_element(el){
   $('html, body').animate({
        scrollTop: $("#" + el).offset().top - 75
    }, 600);
}

var last_scroll_top = 0;
var scroll_bar_showing = false;
var last_scroll_nav_highlight = "about";

function adjust_nav_bar(event){
    const dir = ($(document).scrollTop() - last_scroll_top) > 0; 
    last_scroll_top = $(document).scrollTop();
    const el_selector = ".scroll.header";
    let el_height = $(el_selector+".small").outerHeight();
    let el_height2 = $(el_selector+".big").outerHeight();

    if(last_scroll_top < $("#poly-bg").height()){
        $(el_selector+".small").css("top", -el_height + "px");
        $(el_selector+".big").css("top", -el_height2+"px");
    }
    else{
        if (dir){
            // Scroll Down
            $(el_selector+".small").css("top", -el_height + "px");
        }
        else{
            $(el_selector+".small").css('top', 0 + "px");
        }
        $(el_selector+".big").css("top", 0);

    }

    let scroll_positions = ["about", "work", "experience", "contact"];
    let latest_position = "about";
    for(let i in scroll_positions){
        let sp = scroll_positions[i];
        let ot = $("#"+sp).offset().top;
        if (last_scroll_top >= ot - 200){
            latest_position = sp;
        }
    }

    $(".nav_"+last_scroll_nav_highlight).removeClass("accent");
    $(".nav_"+latest_position).addClass("accent");
    last_scroll_nav_highlight = latest_position;
}
