const regex = [
    /(?<=\n.*)(\".*?\")(?=\s*,|\s*$)/gm,
    /(?<=\n.*)(\'.*?\')(?=\s*,|\s*$)/gm,
    /^\"|\"$/gm,
    /^\'|\'$/gm
]

$(function () {

    $('#CSV2JSON').click(function () {
        var recieved = $('#JSONwindow').val().replace(regex[0],"(String)").replace(regex[1],"(Arrays)");
        var replaced = {
             strings: $('#JSONwindow').val().match(regex[0]),
             arrays: $('#JSONwindow').val().match(regex[1])
        }
        var myJsonObj = []

        try {
            var cabeceras = recieved.split('\n')[0]
            var cells = recieved.split(/\,|\n/).length;
            var rows = recieved.split('\n').length > 1 ? recieved.split('\n')[0].split(',').length : -1
            var i = 0

            if ((cells % rows) != 0 || rows == -1) throw new Error("Formato CSV invalido");

            recieved.split('\n').forEach(str => {
                if (str == recieved.split('\n')[0]) return;

                myJsonObj.push(new Object())

                for (var y = 0; y < rows; y++) {
                    var propValue = str.split(',')[y]

                    switch(propValue){
                        case '(String)':
                            propValue = replaced.strings[0]
                            propValue = propValue.replace(regex[2], '')
                            replaced.strings.shift()
                            break;
                        case '(Arrays)':
                            propValue = replaced.arrays[0].replace(regex[3],'')
                            propValue = propValue.split(',')
                            replaced.arrays.shift()
                            break;
                        case "false":
                        case "true":
                            propValue = (propValue === 'true')
                            break;
                        default:
                            switch(true){
                                case /^[-+]?\d+$/.test(propValue):
                                    propValue = parseInt(propValue);
                                    break;
                                case /[+-]?([0-9]*[.])?[0-9]+/.test(propValue):
                                    propValue = parseFloat(propValue);
                                    break;
                            }
                            break;
                    }

                    myJsonObj[i][cabeceras.split(',')[y]] = propValue;
                }
                i++;
            });

            extensionCheck('.json')
            $('#CSVwindow').html(JSON.stringify(myJsonObj))

        } catch (error) {
            $('#descargar').attr("disabled", true)
            $('#CSVwindow').html(error.message)
        }
    })
})