import $ from "jquery";
import scrollTo from "jquery.scrollto";
import "jquery-mask-plugin";

$(document).ready(() => {

    const btn = $("header .h-top-btn .btn");
    const sectionContacts = $("#s-contacts");
    if (btn.length && sectionContacts.length) {
        btn.on("click", () => scrollTo(sectionContacts, 1000));
    }

    const btnOrder = $(".h-btn .btn, .s-item .btn");
    const sectionOrder = $("#s-order");
    if (btnOrder.length) {
        btnOrder.on("click", (event) => {
            const service = event.currentTarget.getAttribute("data-service");

            if (service) {
                sectionOrder.find(`select option[value='${service}']`).attr("selected", "selected");
            }

            return scrollTo(sectionOrder, 1000)
        });
    }

    const hMobMenu = $(".h-mob-menu svg");
    const btnCloseMenu = $(".h-mob-menu-close");
    const hTopMenu = $(".h-top-menu");
    if (hMobMenu.length) {
        hMobMenu.on("click", function () {
            return hTopMenu.fadeIn() && btnCloseMenu.fadeIn();
        });

        btnCloseMenu.on("click", function () {
            return hTopMenu.fadeOut() && $(this).fadeOut();
        });

        hTopMenu.on("click", 'li a', function (event) {
            event.preventDefault();
            return scrollTo($(this).attr("href"), 1000) && hTopMenu.fadeOut() && btnCloseMenu.fadeOut();
        });
    }

    $("input[name=phone]").mask('+7 (000) 000-00-00', {placeholder: '+7 (___) ___-__-__'});
});

$(document).ajaxError(function () {
    return $('.notify').html('<div>Произошла ошибка =(</div>').fadeIn().delay(3000).fadeOut();
});
