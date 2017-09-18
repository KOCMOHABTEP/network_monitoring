//
// Main JS file
// Write your code here
//


// Phone mask number
// $(function() {
//     $(".phone").mask("+7 (999) 999-9999");
// });

    // Smooth scroll

    $(function(){
        $('a[href*="#"]').bind("click", function(e){
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });
        return false;
    })


console.log("Hello i am a main.js");

let a =10;
let b=10;

let count = () => {
    return a*b;
}

console.log(count());


//
// Ready
//

$(document).ready(function () {
    
    // Yandex Map + placemark example

    // ymaps.ready(init);
    // var myMap, myPlacemark;

    // function init(){ 
    //     myMap = new ymaps.Map("map", {
    //         center: [55.876758068870174,37.66339549999998],
    //         zoom: 17,
    //         controls:[]
    //     }); 
        
    //     myPlacemark = new ymaps.Placemark([55.876758068870174,37.66339549999998], {
    //         balloonContent: 'Адрес Адрес Адрес'
    //     },{
    //         iconLayout: 'default#image',
    //         iconImageHref: './assets/img/placemark-icon.png',
    //         iconImageSize: [34, 42],
    //         iconImageOffset: [-30, -50]
    //     });
        
    //     myMap.geoObjects.add(myPlacemark);
    // }







});
