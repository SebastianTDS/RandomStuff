$(function () {
    $('#descargarCSV').attr("disabled", true)

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

            $('#CSVwindow').html(text);
            $('#descargarCSV').attr("disabled", false)
        }
        catch (err) {
            $('#descargarCSV').attr("disabled", true)

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

    $('#limpiarCSV, #limpiarJSON').click(function (e) {
        $('.botones #' + e.target.id).parent().siblings(0).val('')
        $('.botones #' + e.target.id).parent().siblings(0).text('')
        if(e.target.id == "limpiarCSV") $('#descargarCSV').attr("disabled", true);
    })

    $('#subirJSON').click(function(){
        $('.botones input[type=file]').click();
    })

    $('.botones input[type=file]').change(function(e){
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            $('#JSONwindow').val(event.target.result)
        });
        reader.readAsText(e.target.files[0]);
        e.target.value = ''
    })

    $('#descargarCSV').click(function(){
        var myBlob = new Blob([$('#CSVwindow').text()], {type: 'application/vnd.ms-excel'});
        $('#link').attr("href", window.URL.createObjectURL(myBlob))
        $('#link').attr("download", "conversion.csv")
    })

})