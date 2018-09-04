// Select DOM Items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));

    // Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));

    // Set Menu State
    showMenu = false;
  }
  
}
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

