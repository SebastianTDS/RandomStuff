var fullValues = false
var porcentajes = [
    '0%',
    '0%',
    '0%',
    '0%'
]

$(function () {
    actualizarProps();
    $('.range').on('mouseup', function (e) {
        if (e.target.value < 20) {
            e.target.classList.remove('ltpurple');
        }
        if (e.target.value < 40) {
            e.target.classList.remove('purple');
        }
        if (e.target.value < 60) {
            e.target.classList.remove('ltpink');
        }
        if (e.target.value < 80) {
            e.target.classList.remove('pink');
        }

    });

    // move gradient
    $('.range').on('input', function (e) {
        //Change slide thumb color on way up
        if (this.value > 20) {
            e.target.classList.add('ltpurple');
        }
        if (this.value > 40) {
            e.target.classList.add('purple');
        }
        if (this.value > 60) {
            e.target.classList.add('ltpink');
        }
        if (this.value > 80) {
            e.target.classList.add('pink');
        }

        //Change slide thumb color on way down
        if (this.value < 20) {
            e.target.classList.remove('ltpurple');
        }
        if (this.value < 40) {
            e.target.classList.remove('purple');
        }
        if (this.value < 60) {
            e.target.classList.remove('ltpink');
        }
        if (this.value < 80) {
            e.target.classList.remove('pink');
        }
    });

    $('.range').on('input', function (e) {
        switch (e.target.id) {
            case 'bordeA':
                var temp = e.target.value + '% ' + (fullValues == true ? porcentajes[0] : '');
                $('#mainBox').css('border-top-left-radius', temp);
                break;
            case 'bordeB':
                var temp = e.target.value + '% ' + (fullValues == true ? porcentajes[1] : '');
                $('#mainBox').css('border-top-right-radius', temp);
                break;
            case 'bordeC':
                var temp = e.target.value + '% ' + (fullValues == true ? porcentajes[2] : '');
                $('#mainBox').css('border-bottom-right-radius', temp);
                break;
            case 'bordeD':
                var temp = e.target.value + '% ' + (fullValues == true ? porcentajes[3] : '');
                $('#mainBox').css('border-bottom-left-radius', temp);
                break;
            case 'bordeE':
                porcentajes[0] = e.target.value + '%';
                var temp = $('#mainBox').css('border-top-left-radius').split(' ')[0] + ' ' + porcentajes[0];
                $('#mainBox').css('border-top-left-radius', temp);
                break;
            case 'bordeF':
                porcentajes[1] = e.target.value + '%';
                var temp = $('#mainBox').css('border-top-right-radius').split(' ')[0] + ' ' + porcentajes[1];
                $('#mainBox').css('border-top-right-radius', temp);
                break;
            case 'bordeG':
                porcentajes[2] = e.target.value + '%';
                var temp = $('#mainBox').css('border-bottom-right-radius').split(' ')[0] + ' ' + porcentajes[2];
                $('#mainBox').css('border-bottom-right-radius', temp);
                break;
            case 'bordeH':
                porcentajes[3] = e.target.value + '%';
                var temp = $('#mainBox').css('border-bottom-left-radius').split(' ')[0] + ' ' + porcentajes[3];
                $('#mainBox').css('border-bottom-left-radius', temp);
                break;
        }
        actualizarProps();

    });

    $('#copiar').click(function () {
        var $temp = $("<input>");
        $('body').append($temp);
        $temp.val('border-radius: ' + $('#proporciones').html() + ';').select();
        document.execCommand("copy");
        $temp.remove();
        $('.tooltiptext').text('Copiado!');
    })

    $('#copiar').on('mouseout', function () {
        $('.tooltiptext').text('Copiar al portapapeles');
    })

    $('#fullVal').click(function () {
        fullValues = !fullValues;
        reiniciarBordes();
        actualizarProps();

        if (fullValues) {
            $('#fullVal').html('4 VALORES')
            $('.fullval').css('display', 'inline-block')
        }
        else {
            $('#fullVal').html('8 VALORES')
            $('.fullval').css('display', 'none')
        }
    })
});

function actualizarProps() {
    $('#proporciones').html(
        $('#mainBox').css('border-top-left-radius').split(' ')[0] + ' ' +
        $('#mainBox').css('border-top-right-radius').split(' ')[0] + ' ' +
        $('#mainBox').css('border-bottom-right-radius').split(' ')[0] + ' ' +
        $('#mainBox').css('border-bottom-left-radius').split(' ')[0] +
        (fullValues == true ?
            ' / ' + porcentajes[0] + ' ' + porcentajes[1] + ' ' + porcentajes[2] + ' ' + porcentajes[3] :
            '')
    )
}

function reiniciarBordes() {
    $('#mainBox').css('border-top-left-radius', '0%');
    $('#mainBox').css('border-top-right-radius', '0%');
    $('#mainBox').css('border-bottom-left-radius', '0%');
    $('#mainBox').css('border-bottom-right-radius', '0%');
    porcentajes.fill('0%');

    $('.range').each(function(){
        this.value = 0
    })
}