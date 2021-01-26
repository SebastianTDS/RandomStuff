const regex = /^[0-1]+$/

$(function () {
    $('#caja_principal :submit').click(() => {
        var value = $('#caja_principal :text').val();
        var resultado = 0

        if (regex.test(value)) {
            for (var i = value.length - 1; i >= 0; i--) {
                resultado += value.charAt(i) * Math.pow(2, (value.length - 1 - i))
            }
            $('.mensaje').css("display","none")
            $('#valor').html(resultado)
        } else {
            $('.mensaje').css("display","flex")
            $('#valor').html("NaN")
        }
    });
})