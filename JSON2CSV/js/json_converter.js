$(function () {
    $('#JSON2CSV').click(function () {
        var recived = $('#JSONwindow').val()

        try {
            var obj = JSON.parse(recived);
            var text = ''

            for (var i = 0; i < obj.length || (obj.length == null && i < 1); i++) {
                for (x in (obj.length > 0 ? obj[i] : obj)) {
                    if (!text.includes(x) && i > 0) throw new Error();
                    if (i == 0) text += (text.length > 0 ? ',' : '') + x;
                }
            }

            for (var i = 0; i < obj.length || (obj.length == null && i < 1); i++) {
                var $text = '', $text2 = ''
                text += '<br>\n';
                for (x in (obj.length > 0 ? obj[i] : obj)) {
                    $text += ($text.length > 0 ? ',' : '');

                    $text2 = '' + (obj.length > 0 ? obj[i] : obj)[x]
                    if ($text2.includes('[object Object]')) throw TypeError

                    $text2 = $text2.split(',').length > 1
                        ? "\"" + (obj.length > 0 ? obj[i] : obj)[x] + "\""
                        : (obj.length > 0 ? obj[i] : obj)[x];

                    $text += $text2
                }
                text += $text
            }

            extensionCheck('.csv')
            $('#CSVwindow').html(text);
        }
        catch (err) {
            $('#descargar').attr("disabled", true)

            switch (err.name) {
                case 'Error':
                    $('#CSVwindow').html('Las claves del arreglo JSON no son iguales.')
                    break;
                case 'SyntaxError':
                    $('#CSVwindow').html('Formato JSON incorrecto')
                    break;
                case 'TypeError':
                    $('#CSVwindow').html('No se aceptan JSON anidados')
                    break;
            }
        }
    })
})