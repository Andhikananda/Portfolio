$(window).on('scroll', function() {
    $('header').each(function(){
        if ($(window).scrollTop() >= 1 ) {
            $(this).addClass('onscroll');
        } else {
            $(this).removeClass('onscroll');
        }
    });
});

$('.open-menu').on('click', function(){
    $('nav.link').toggleClass('open');
});
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('nav.link a').on('click', function(){
        $(this).parents('nav.link').toggleClass('open');
    });
}
$(window).scroll(function() {
    $('section').each(function() {
        var id = $(this).attr('id');
        if ($(window).scrollTop() >= $('#' + id).offset().top - 80) {
            $('.menu a').removeClass('active');
            $('.menu a.' + id).addClass('active');
        } else {
            $('.menu a' + id).removeClass('active');
        }
    });

    if ($(window).scrollTop() >= $('html').offset().top + 1) {
        $('.navigasi').addClass('toggle');
    } else {
        $('.navigasi').removeClass('toggle');
    }
});
$(window).scroll(function() {
    if ($(window).scrollTop() >= $('#cover').offset().top + $(window).height() / 2) {
        $('#contactMobile').addClass('active');
    } else {
        $('#contactMobile').removeClass('active');
    }
});
$(window).bind('load',function(){
    $('img').each(function(){
        var url = $(this).attr('data-src');
        $(this).attr('src',url);
    });
    $('.lazy-bg').each(function(){
        var url = $(this).attr('data-src');
        $(this).attr('style','background-image:url("'+ url +'");');
    });
})
$('.poptamv-btn').on('click', function() {
    var title = $(this).attr('data-title');
    var target = $(this).attr('href');
    $(target).addClass('open');
    $(target).find('.title-content').html(title);
    if($(this).attr('data-img') != null) {
        var img = $(this).attr('data-img');
        $(target).find('.content img').show();
        $(target).find('.content img').attr('src',img);
    }
    if($(this).attr('data-width') != null) {
        var width = $(this).attr('data-width');
        $(target).find('.wrap').attr('style','max-width:'+width+'px!important;')
    }
    if($(this).attr('data-tooltip') != null) {
        var tooltip = $(this).attr('data-tooltip');
        $(target).find('.poptamv-wrap').show();
        $(target).find('.poptamv-wrap').html(tooltip)
    }
});
$('.poptamv .closeTamv').on('click', function() {
    $(this).parents('.poptamv').removeClass('open');
});
$(document).keyup(function(e) {
    if (e.key === "Escape") {
        $('.poptamv .closeTamv').trigger('click');
    }
});

$('<div id="otwBg"></div>').appendTo('body');
$('.otw').on('click',function(){
    var id = $(this).attr('href');
    if($(id).val() != null) {
        $('#otwBg').fadeIn(200);
        $('html, body').animate({scrollTop: $(id).offset().top - 70}, 600);
        setTimeout(function(){ 
             $('#otwBg').fadeOut(600);
        }, 600);
    }
});
$('.pricing a.more').on('click',function(){
    $(this).parents('.item').find('ul.feature').toggle();
    $(this).find('i').toggleClass('ion-ios-arrow-down');
    $(this).find('i').toggleClass('ion-ios-arrow-up');
});
$( document ).ready( function() {
    var targets = $( '[class~=tooltip]' ),
        target  = false,
        tooltip = false,
        title   = false;
    targets.on( 'mouseenter', function() {
        target  = $( this );
        tip     = target.attr( 'data-tooltip' );
        tooltip = $( '<div id="tooltip"></div>' );
        if( !tip || tip == '' )
            return false;
        tooltip.css( 'opacity', 0 )
               .html( tip )
               .appendTo( 'body' );
        var init_tooltip = function() {
            if( $( window ).width() < tooltip.outerWidth() * 1.5 )
                tooltip.css( 'max-width', $( window ).width() / 2 );
            else
                tooltip.css( 'max-width', 340 );
            var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                pos_top  = target.offset().top - tooltip.outerHeight() - 20;
            if( pos_left < 0 ) {
                pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                tooltip.addClass( 'left' );
            }
            else
                tooltip.removeClass( 'left' );
            if( pos_left + tooltip.outerWidth() > $( window ).width() ) {
                pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                tooltip.addClass( 'right' );
            }
            else
                tooltip.removeClass( 'right' );
            if( pos_top < 0 ) {
                var pos_top = target.offset().top + target.outerHeight();
                tooltip.addClass( 'top' );
            }
            else
                tooltip.removeClass( 'top' );
            tooltip.css( { left: pos_left, top: pos_top } )
                   .animate( { top: '+=10', opacity: .9 }, 200 );
        };
        init_tooltip();
        $( window ).resize( init_tooltip );
        var remove_tooltip = function() {
            tooltip.animate( { top: '-=10', opacity: 0 }, 200, function()
            {
                $( this ).remove();
            });
            target.attr( 'data-tooltip', tip );
        };
        target.on( 'mouseleave', remove_tooltip );
        tooltip.on( 'click', remove_tooltip );
    });
});

$('.popWin').on('click', function(){
    var target_url = $(this).attr('href'),
    w = $(this).attr('data-popWidth'),
    h = $(this).attr('data-popHeight');

    if (w == null) {
        w = 960;
    }
    if (h == null) {
        h = 540;
    }

    left = Number((screen.width / 2) - (w / 2)),
    tops = Number((screen.height / 2) - (h / 2)),
    popupWindow = window.open(target_url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + w + ', height=' + h + ', top=' + tops + ', left=' + left);
    popupWindow.focus();
    return false;
});
$('.photoGallery').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled:true
        },
        // Delay in milliseconds before popup is removed
        removalDelay: 300,

        // Class that is added to popup wrapper and background
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade'

    });
});


$('#slide').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    nav: false,
    navText: ["<i class='icon ion-ios-arrow-back'></i>", "<i class='icon ion-ios-arrow-forward'></i>"],
    margin:10,
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
});
// $("#slide").on("translate.owl.carousel", function() {
//     $(this).find(".owl-item .col.left").removeClass("fadeInLeft animated").css("opacity", "0");
//     $(this).find(".owl-item .col.right").removeClass("fadeInUp animated").css("opacity", "0");
// });
// $("#slide").on("translated.owl.carousel", function() {
//     $(this).find(".owl-item.active .col.left").addClass("fadeInLeft animated").css("opacity", "1");
//     $(this).find(".owl-item.active .col.right").addClass("fadeInUp animated").css("opacity", "1");
// });
