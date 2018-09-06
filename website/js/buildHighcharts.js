$(document).ready(function(){
        $('#insuranceForm').submit(function () {
            CalcInsurance();
            return false;
        });

    
    function CalcInsurance(){
        // get element from form
        const monthlyRepayments = document.getElementById("monthlyRepayments").value;
        const insuranceInterest = document.getElementById("insuranceInterest").value;
        const interest = document.getElementById("interest").value;
        const finalInterest = (parseFloat(insuranceInterest) + parseFloat(interest)) / 100;
        const e = document.getElementById("refundTime");
        const refundTime = e.options[e.selectedIndex].value;
    
        var calc1 = 1 - (1 / Math.pow(1 + finalInterest / 12, 12 * refundTime));
        var finalCalc = (monthlyRepayments * calc1) / (finalInterest / 12);
        var calcWithothInterest = monthlyRepayments * 12 * refundTime;
        var fee = calcWithothInterest - finalCalc;
        document.getElementById("tbodyTable").innerHTML = "";
        for(i = 4; i >= 0; i--){
        var title = 10 + 5*i + " ans";
        var refundTimePerYear = 10 + 5 * i;
        // beggin the calc
        var calc1 = 1 - 1 / Math.pow(1 + finalInterest / 12, 12 * refundTimePerYear);
        var finalCalc = (monthlyRepayments * calc1) / (finalInterest / 12);
        var calcWithothInterest = monthlyRepayments * 12 * refundTimePerYear;
        var fee = calcWithothInterest - finalCalc;
        buildTable(title, Math.round(finalCalc), Math.round(fee));
        }
        buildHighChart();
        console.log("hello " + finalCalc + "  " + calcWithothInterest);
        
        
    }
    function buildTable(title, num1, num2){
        var table = document.getElementById("tbodyTable");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = title;
        cell2.innerHTML = num1;
        cell3.innerHTML = num2;
        }
    
        // var str ="<tr>";
        // str += "<th>45</th>"
        // str+="<td>45</td>"
        // str+= "</tr>"
        // document.getElementById("tbodyTable").appendChild(str);
    
    
    function buildHighChart(){
        Highcharts.chart("highchart1", {
        data: {
            table: "datatable"
        },
        chart: {
            type: "column"
        },
        title: {
            text:
            "Montants de prêt et Coût du crédit en fonction des durées du remboursement"
        },
        yAxis: {
            allowDecimals: false,
            title: {
            text: "Units"
            }
        },
        tooltip: {
            formatter: function() {
            return (
                "<b>" +
                this.series.name +
                "</b><br/>" +
                this.point.y +
                " " +
                this.point.name.toLowerCase()
            );
            }
        }
        });
    }
  
});