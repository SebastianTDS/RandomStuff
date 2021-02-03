var extension = '.txt'

$(function(){
    $('#descargar').attr("disabled", true)

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

    $('#descargar').click(function(){
        var contentType
        if(extension == '.csv') contentType ='application/vnd.ms-excel'
        else contentType = 'application/json'

        var myBlob = new Blob([$('#CSVwindow').text()], {type: 'application/vnd.ms-excel'});
        $('#link').attr("href", window.URL.createObjectURL(myBlob))
        $('#link').attr("download", "conversion" + extension)
    })
})

function extensionCheck(ext){
    $('#descargar').attr("disabled", false)
    extension = ext
}