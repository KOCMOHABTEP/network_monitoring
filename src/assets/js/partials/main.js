//
// Main JS file
// Write your code here
//


// Phone mask number
// $(function() {
//     $(".phone").mask("+7 (999) 999-9999");
// });

    // Smooth scroll

    $("body").on('click', '[href*="#"]', function(e){
        var fixed_offset = 100;
        $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
        e.preventDefault();
      });


console.log("Hello i am a main.js");

let a =10;
let b=10;

let count = () => {
    return a*b;
}

console.log(count());

function registr(){
    var form_data = $("#form").serialize(); //собераем все данные из формы
    $.ajax({
    type: "POST", //Метод отправки
    url: "send.php", //путь до php фаила отправителя
    data: form_data,
    success: function() {
           //при успешной отправке - вывести в консоль 'успех'
           console.log('success')
    },
    error: function(){
        //при неудачной отправке - вывести в консоль 'ошибка'
        console.log('error')
    }
});

};
//
// Ready
//

$(document).ready(function () {
    $('.preloader-overlay').delay(1000).fadeOut('slow');

});
