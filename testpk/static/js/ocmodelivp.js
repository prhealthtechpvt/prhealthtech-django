var tableExists=false;
var timeValues=[];
var concentrationValues = [];
var logConcentrationValues = [];
var chartValues = [];
var vidcVal = 0;
google.charts.load('current', {'packages':['corechart']});

function drawBasic() {

        var data = new google.visualization.DataTable();


        var sampleData = [];

        sampleData=chartValues;

        console.log(sampleData);

        data.addColumn('number','Time');
        data.addColumn('number','Log of Concentration');
        data.addColumn('number','MEC');
        data.addColumn('number','MSC');

        data.addRows(sampleData);

        var options = {
            colors: ['blue', 'green', 'red'],
            hAxis: {
            title: 'Time',
            minValue: 0
            },
            vAxis: {
            // scaleType: 'log',
            title: 'Log of Concentration',
            // maxValue: vidcVal,
            baselineColor: '#ccc',
            gridlineColor: '#ccc'
            },
            pointSize: 5,
            trendlines: { 0: {
                lineWidth:10,
                color: 'purple',
                opacity: 0.4
            },

            curveType: 'function',
            backgroundColor: {
                fill: 'black'

                },


        }

        };

        var chart = new google.visualization.LineChart(document.getElementById('Graph1'));

        if (tableExists=true){
            chart.clearChart()
        };
        chart.draw(data, options);
}

function linearRegression(y,x){
    var lr = {};
    var n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;

    for (var i = 0; i < y.length; i++) {

        sum_x += x[i];
        sum_y += y[i];
        sum_xy += (x[i]*y[i]);
        sum_xx += (x[i]*x[i]);
        sum_yy += (y[i]*y[i]);
    }

    lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
    lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
    lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

    return lr;
}


$(document).ready(function () {

    // The event listener for the file upload
    document.getElementById('upload').addEventListener('change', upload, false);

    //Method that checks that the browser supports the HTML5 file Application
    function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            isCompatible = true;
        }
        return isCompatible;
    }

    // Method that reads and processes the selected file
    function upload(evt) {
        if (!browserSupportFileUpload()) {

        } else {
            var data = null;
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (event) {
                var csvData = event.target.result;

                successFunction(csvData);
                if (tableExists===true) {
                    timeValues=[];
                    concentrationValues=[];
                    logConcentrationValues=[];
                    chartValues=[];
                }
                    IVBolusCalc();

            };
            reader.onerror = function () {

            };
        };
    }

});

function deleteTable() {
    $('#MyTab1').remove();
}

function successFunction(data) {

    if (tableExists===true) {
        deleteTable();
    }

    var allRows = data.split(/\r?\n|\r/);
    var table = '<table id="MyTab1">';
    for (var singleRow= 0; singleRow < allRows.length; singleRow++) {
    if (singleRow===0) {
        table += '<thead>';
        table += '<tr>';
    } else {
        table += '<tr>';
    }

    var rowCells = allRows[singleRow].split(',');
    for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
        if (singleRow===0) {
            table += '<th>';
            table += rowCells[rowCell];
            table += '</th>';
        } else {
            table += '<td>';
            table += rowCells[rowCell];
            table += '</td>';
        }
    }
    if (singleRow===0) {
        table += '</tr>';
        table += '</thead>';
        table += '<thead>';
    } else {
        table += '</tr>';
    }
    }
    table += '</tbody>';
    table += '</table>';
    $('#sampleData').append(table);
    tableExists=true;
    console.log(tableExists)

}

function IVBolusCalc() {


    var lmec=document.getElementById('min-effect-conc').value;
    var lmsc=document.getElementById('max-safe-conc').value;

    console.log(lmec);
    console.log(lmsc);

    let rows = document.querySelector("#MyTab1").rows;
    console.log(rows);
    var r=0;
    xval=0.00;
    yval=0.00;
    for (let row of rows)
    {
            var c=0;
            for(let cell of row.cells)

            {

                let value = parseFloat(cell.innerText);



                if (r!=0){
                        if (c===0){
                            timeValues.push(value);
                            xval=value;
                        } else {
                            concentrationValues.push(value);
                            logConcentrationValues.push(parseFloat(Math.log10(value).toFixed(3)));
                            yval=parseFloat(Math.log10(value).toFixed(3));
                        }


                }

                c=c+1;

            }
            if(r!=0){
                chartValues.push([xval,yval,Math.log10(lmec),Math.log10(lmsc)]);
            }


            r=r+1;
    }
    chartValues.push([0,null,Math.log10(lmec),Math.log10(lmsc)]);
    console.log(timeValues);
    console.log(concentrationValues);
    console.log(logConcentrationValues);
    console.log(chartValues);

    //Regression


    var lr = linearRegression(logConcentrationValues, timeValues);

    var slope = lr.slope.toFixed(3);
    var Ke = (-1*slope*2.303).toFixed(3);
    var tHalf = (0.693/Ke).toFixed(2);
    var idcValue=lr.intercept.toFixed(3);
    var vvd=(((document.getElementById('dose').value*1000)/Math.pow(10,idcValue))/1000).toFixed(3);
    var vcl=((Ke*vvd*1000)/60).toFixed(3);
    var vauc=(Math.pow(10,idcValue)/Ke).toFixed(2);
    var vaumc=(vauc/Ke).toFixed(2);
    var vmrt=(vaumc/vauc).toFixed(2);

    vidcVal=idcValue;



    document.getElementById('iv_bolus_slope').innerHTML=slope;
    document.getElementById('iv_bolus_KE').innerHTML=Ke;
    document.getElementById('iv_bolus_thalf').innerHTML=tHalf;
    document.getElementById('iv_bolus_idc').innerHTML=(Math.pow(10,idcValue).toFixed(3));
    document.getElementById('iv_bolus_vd').innerHTML=vvd;
    document.getElementById('iv_bolus_cl').innerHTML=vcl;
    document.getElementById('iv_bolus_auc').innerHTML=vauc;
    document.getElementById('iv_bolus_aumc').innerHTML=vaumc;
    document.getElementById('iv_bolus_mrt').innerHTML=vmrt;




    google.charts.setOnLoadCallback(drawBasic);

}
