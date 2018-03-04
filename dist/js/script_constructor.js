'use strict';

//
// Ready
//
$(document).ready(function () {

    console.log('Файл script_constructor.js загрузился');
    /**
     * Левое меню для страницы с конструктором
     */
    var leftPanelItem = $('.left-panel__item');
    leftPanelItem.on('click', function (event) {
        if (!$(this).hasClass('active')) {
            leftPanelItem.each(function () {
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        } else {
            event.preventDefault();
        }
    });

    /**
     * Модальное окно
     */

    $('.js-modal-close').on('click', function () {
        $(this).parents('.modal-overlay').removeClass('active');
    });

    /**
     * Помощь
     */
    $('.js-help').on('click', function (event) {
        event.preventDefault();
        var overlay = $('.modal-overlay');

        if (!overlay.hasClass('active')) {
            overlay.addClass('active');
        }
    });
});