$(document).ready(function () {
    var form = $('#form_buying_product');
    console.log(form);
    form.on('submit', function (e) {
        e.preventDefault();
        console.log('123');
        var nmb = $('#number').val();
        console.log(nmb);
        var submit_btn = $('#submit_btn');
        var product_id = submit_btn.data("product_id");
        var product_name = submit_btn.data("name");
        var product_price = submit_btn.data("price");
        console.log(product_id);
        console.log(product_name);
        console.log(product_price);


        var data = {};
        data.product_id = product_id;
        data.nmb = nmb;
        var csrf_token = $('#form_buying_product [name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;
        var url = form.attr("action");
        console.log(data)
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: true,
            success: function(data) {
                console.log("OK");
                console.log(data.products_total_nmb);
                if (data.products_total_nmb){
                    $('#basket_total_nmb').text("("+data.products_total_nmb+")");
                }
            },
            error: function(){
                console.log("Error")
                }
        });


        $('.basket-items ul').append('<li>'+product_name+', ' + nmb + 'шт. ' + 'по ' + product_price + ' руб      ' +
            //'<a class="delete-item" href="">x</a>' +
            '</li>');
   });

    function shovingBasket(){
         $('.basket-items').removeClass('hidden');
    };

    $('.basket-container').on('click', function (e) {
        e.preventDefault();
        shovingBasket();
    });
    $('.basket-container').mouseover(function (e) {
        shovingBasket();
        });
    // $('.basket-container').mouseout(function (e) {
    //      shovingBasket();
    // });

    $(document).on('click', '.delete-item', function(e){
        e.preventDefault();
        $(this).closest('li').remove();
    });
});