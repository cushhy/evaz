$(function () {

    var header = $("#header"),
        introH = $("#intro").innerHeight(),
        scrollOffset = $(window).scrollTop();


    /* --------  Fixed Header     ---------  */
    checkScroll(scrollOffset)

    $(window).on("scroll", function () {
        scrollOffset = $(this).scrollTop();

        checkScroll(scrollOffset);
    });


    function checkScroll(scrollOffset) {
        if (scrollOffset >= introH) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }


    /* --------   Smooth scroll    ---------  */

    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        var $this = $(this)
        blockId = $this.data('scroll'),
            blockOffset = $(blockId).offset().top;

        $('nav').removeClass('active');
        $this.addClass('active');

        $('html, body').animate({
            scrollTop: blockOffset
        }, 1000)
    })


    /* --------    Collapse       ---------  */

    $(' [data-collapse] ').on('click', function (event) {
        event.preventDefault()

        var $this = $(this)
        blockId = $this.data('collapse')

        $this.toggleClass('active')
    })


    $("#modalForm").submit(function () {
        var errors = false;

        if (!errors) {
            var data = $("#modalForm").serialize();
            $.ajax({
                url: "modal.php",
                type: "POST",
                data: data,
                success: function (res) {
                    if (res == 1) {
                        $.fancybox.close({
                            href: "javascript:;",
                            src: "#modal-form",
                        });
                        $.fancybox.open({
                            href: "javascript:;",
                            src: "#preorder_window_thank",
                        });
                    } else {
                        alert("Ошибка отправки!");
                    }
                },
                error: function () {
                    alert("Ошибка!");
                },
            });
        }
        return false;
    });

});
