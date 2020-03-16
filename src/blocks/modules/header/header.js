import $ from "jquery";
import scrollTo from "jquery.scrollto";
import "jquery-mask-plugin";

$(document).ready(() => {

    const nav = $("nav");
    let navHeight = nav.innerHeight();

    const headerHeight = $("header").innerHeight();

    const toggleClassNav = function () {
        if (nav.offset().top > headerHeight/2) {
            nav.addClass('p-cleared');
        } else {
            nav.removeClass('p-cleared');
        }
    };

    toggleClassNav();

    $(window).scroll(toggleClassNav);

    if (window.innerWidth < 992) {
        navHeight = 0;
    }

    const btn = $("nav .btn");
    const sectionContacts = $("#s-contacts");
    if (btn.length && sectionContacts.length) {
        btn.on("click", () => scrollTo(sectionContacts, 1000, {offset: navHeight * -1}));
    }

    const btnOrder = $(".h-btn .btn, .s-item .btn");
    const sectionOrder = $("#s-order");
    if (btnOrder.length) {
        btnOrder.on("click", (event) => {
            const service = event.currentTarget.getAttribute("data-service");

            if (service) {
                sectionOrder.find(`select option[value='${service}']`).attr("selected", "selected");
            }

            return scrollTo(sectionOrder, 1000, {offset: navHeight * -1})
        });
    }

    const hMobMenu = $(".h-mob-menu svg");
    const btnCloseMenu = $(".h-mob-menu-close");
    const hTopMenu = $(".h-top-menu");
    if (hMobMenu.length) {
        hMobMenu.on("click", function () {
            hTopMenu.addClass("is-opened");
            return hTopMenu.fadeIn() && btnCloseMenu.fadeIn();
        });

        btnCloseMenu.on("click", function () {
            return hTopMenu.fadeOut() && $(this).fadeOut();
        });

        hTopMenu.on("click", 'li a', function (event) {
            event.preventDefault();

            if (hTopMenu.hasClass("is-opened")) {
                return scrollTo($(this).attr("href"), 1000, {offset: navHeight * -1}) && hTopMenu.fadeOut() && btnCloseMenu.fadeOut();
            }

            return scrollTo($(this).attr("href"), 1000, {offset: navHeight * -1});
        });
    }

    $("input[name=phone]").mask('+7 (000) 000-00-00', {placeholder: '+7 (___) ___-__-__'});

    /*
    |-----------------------------------------------------------
    |   notification
    |-----------------------------------------------------------
    */
    const Notification = {
        element: false,
        setElement: function (element) {
            return this.element = element;
        },
        notify: function (message) {
            if (! this.element) {
                this.setElement($(".notify"));
            }
            return this.element.html('<div>' + message + '</div>') && this.element.fadeIn().delay(7000).fadeOut();
        }
    };

    formHandler("#order-form", Notification);
    formHandler("#contacts-form", Notification);
});

function formHandler(selector, Notification) {
    return $(document).on("submit", selector, function(e){
        e.preventDefault();
        const _this = $(this),
            url = _this.attr('action'),
            data = _this.serialize(),
            submitBtn = _this.find("button[type=submit]");

        return $.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: data,
            beforeSend: function() {
                return submitBtn.addClass("is-sent");
            },
            success: function (data) {
                Notification.notify(data.message);
                return submitBtn.removeClass("is-sent") && _this.trigger("reset");
            }
        });
    });
}

$(document).ajaxError(function () {
    return $("form button[type=submit]").removeClass("is-sent") && $('.notify').html('<div>Произошла ошибка =(</div>').fadeIn().delay(3000).fadeOut();
});
