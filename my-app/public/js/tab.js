$(function() {
	var owl = $('.owl-1');
    owl.owlCarousel({
        loop:false,
        margin:0,
        nav:false,
        dots: false,
        items: 1,
        smartSpeed: 1000,
        autoplay: false,
        navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
    });

    var carousel_nav_a = $('.carousel-nav a');

    carousel_nav_a.each(function(slide_index){
        var $this = $(this);
        $this.attr('data-num', slide_index);
        $this.click(function(e) {
            owl.trigger('to.owl.carousel',[slide_index,400]);
            e.preventDefault();
        })
    })

    owl.on('changed.owl.carousel', function(event) {
        carousel_nav_a.removeClass('active');
        $(".carousel-nav a[data-num="+event.item.index+"]").addClass('active');
    })
})


// $(function () {
//     var swiper = new Swiper('.swiper', {
//         slidesPerView: 6,
//         direction: getDirection(),
//         navigation: {
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//         },
//         on: {
//             resize: function () {
//                 swiper.changeDirection(getDirection());
//             },
//         },
//     });

//     function getDirection() {
//         var windowWidth = window.innerWidth;
//         var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

//         return direction;
//     }
// })


