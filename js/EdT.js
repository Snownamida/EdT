//****************************************************************************//

// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.net/how-to/javascript

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function () {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  return date.getFullYear();
};

//****************************************************************************//

// Script from http://stackoverflow.com/questions/563406/add-days-to-javascript-date/563442#563442

Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

//****************************************************************************//

jQuery.extend(jQuery.fn.pickadate.defaults, {
  monthsFull: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthsShort: [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  weekdaysFull: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  today: "Aujourd'hui",
  clear: "Effacer",
  close: "Fermer",
  firstDay: 1,
  format: "dd mmmm yyyy",
  formatSubmit: "yyyy/mm/dd",
  labelMonthNext: "Mois suivant",
  labelMonthPrev: "Mois précédent",
  labelMonthSelect: "Sélectionner un mois",
  labelYearSelect: "Sélectionner une année",
});

//****************************************************************************//

function jump(target) {
  var topElement = document.getElementById(target);
  if (topElement !== null) {
    var top = document.getElementById(target).offsetTop;
    window.scrollTo(0, top);
  }
}

function jumpTo(target) {
  location.hash = target;
  jump(target);
}

function targetDate(date) {
  return "EdT-S" + date.getWeek();
}

// Startup
window.onload = function () {
  var now = new Date(); // Today
  if (location.hash.length === 0) {
    jump(targetDate(now.addDays(2)));
  }

  $("table.edt").on("click", "a.slot-external-link", function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    window.open(url);
    return false;
  });

  $("body").prepend(
    '<div id="calendar-panel" class="panel no-print"><img src="../img/calendar.png" id="calendar-icon"><input class="datepicker" style="size: 10; display: none;"></div></div>'
  );

  var input = $("#calendar-panel .datepicker").pickadate({
    clear: "",
    onSet: function (context) {
      if (context.select) {
        var date = new Date(context.select);
        jumpTo(targetDate(date));
      }
    },
    onClose: function () {
      this.stop();
    },
  });
  var picker = input.pickadate("picker");

  $("#calendar-icon")
    .css("cursor", "pointer")
    .attr("title", "Sélectionner une Date dans le Calendrier")
    .click(function (e) {
      // stop the click from bubbling
      e.stopPropagation();
      // prevent the default click action
      e.preventDefault();
      // open the date picker
      picker.start();
      picker.open(false);
    });

  $("body").on("keypress", function (event) {
    if (event.key === "€" || event.key === "!") {
      if ($("#calendar-panel input.teacher-filter").length === 0) {
        $("#calendar-panel").append(
          '&nbsp;<input class="teacher-filter" type="text" style="height: 18px; width: 50px;" />'
        );
      }
      $("#calendar-panel input.teacher-filter").focus();
    }
  });
  $("#calendar-panel").on("keyup", ".teacher-filter", function (event) {
    if (event.which === 13) {
      var filter = $(this).val().trim();
      if (filter !== "") {
        var teacherName = filter;
        var targetTeacherName = teacherName
          .toLowerCase()
          .replace(" ", "&nbsp;");
        $("table.container").each(function (i) {
          var $target = $(this);
          $teachers = $target.find("td:last");
          if (
            $teachers.html().toLowerCase().indexOf(targetTeacherName) !== -1
          ) {
            $target
              .parent()
              .css("background-color", "lightskyblue")
              .css("background-image", "url('../img/not-processed.png')")
              .css("cursor", "pointer");
          } else {
            $target
              .parent()
              .css("background-color", "")
              .css("background-image", "")
              .css("cursor", "");
          }
        });
      }
      $(this).val("");
    }
  });

  $("h2").append(
    '&nbsp;&nbsp;&nbsp;&nbsp;<img src="../img/printer.png" style="vertical-align: bottom;" class="print-icon no-print">'
  );

  $("h2 .print-icon")
    .css("cursor", "pointer")
    .attr("title", "Imprimer cette Semaine")
    .on("click", function (e) {
      var id = $(this).closest("h2").attr("id");
      // stop the click from bubbling
      e.stopPropagation();
      // prevent the default click action
      e.preventDefault();
      // open the print dialogue
      //openPrintDialogue('EdT-S20');
      openPrintDialogue(id);
    });

  $.ajax({ url: "../css/EdT.css", method: "GET" })
    .done(function (data) {
      EDT_CSS_STYLE_ELEMENT = "<style>\n" + data + "\n</style>";
      //console.log('Print CSS Loaded');
      //console.log(EDT_CSS_STYLE_ELEMENT);
    })
    .fail(function (error) {
      //console.log('Print CSS FAILED to load... Back to internal copy!');
    });
};

function openPrintDialogue(target) {
  var $title = $("#" + target);
  var $table = $("#" + target).next("table.edt");

  var $iframe = $("<iframe>", {
    name: "myiframe",
    class: "printFrame",
  })
    .appendTo("body")
    .contents();

  $iframe
    .find("head")
    //.append('<title>EdT (Impression ' + target + ')</title>')
    .append($("<title>").text($title.find(".discrete-link").text()))
    .append(EDT_CSS_STYLE_ELEMENT);

  $iframe.find("body").append($title.clone()).append($table.clone());

  window.frames["myiframe"].focus();
  window.frames["myiframe"].print();

  setTimeout(() => {
    $(".printFrame").remove();
  }, 1000);
}

var EDT_CSS_STYLE_ELEMENT = `<style>
body.status-warning {
    background-color: lightgrey;
    background-image: url('../img/not-processed.png');
}

body.status-error {
    background-color: lightsalmon;
    background-image: url('../img/not-processed.png');
}


h1 {
    font-variant: small-caps;
    text-align: center;
    position: fixed;
    top: 0;
    width: 100%;
    background: white;
    z-index: 1;
}

h2 {
    text-align: center;
}

h2 a.nav-link {
    color: indigo;
    text-decoration: none;
}

h2 a.discrete-link {
    color: black;
    text-decoration: underline dotted black;
}

div.panel {
    position: fixed;
    top: 0;
    left: 0;
    margin: 2px;
    z-index: 1;
}

@media print {
    h1 { display: none; }
    /* h2 { display: none; } */
    h2 a.nav-link { display: none; }
    h2 a.discrete-link { text-decoration: none; }
    table.edt { page-break-after: always; }
    .no-print { display: none; }
}

table.edt {
    border-collapse: collapse;
    border: 1px solid black;
    /*width: 100%;*/
    /*margin: 0 1cm;*/
    /* margin: 100px auto 100px auto; */
    background-color: white;
}

table.edt th, table.edt td {
    border: 1px solid black;
    padding: 0 5px;
}

table.edt th.week {
    /* text-align: left */
}

table.edt th.week-group {
    width: 60px;
}

table.edt th.week-separator {
    width: 0px;
    padding: 0 1px;
}

table.edt th.week-separator.vacation {
    width: 0px;
    padding: 0 10px;
    background: lightgrey url("../img/not-processed.png");
}

table.edt td {
    text-align: center;
}

table.edt td.selected {
    text-align: center;
    border: 4px dotted red;
}

table.edt td.NOSLOT { background-color: #F6F6F6; font-style: italic; } 

table.edt td.END {
    background: lightgrey url("../img/not-processed.png");
}

table.edt td.cm {
    font-weight: bold;
}

table.edt tr.header {
    height: 20px;
}

table.edt tr.day-separator {
    height: 10px;
}

table.edt tr.day-group-separator {
    height: 5px;
}

table.edt tr.hour {
    height: 40px;
}

td.spot {
    /* background-color: white; */
}

td.unspot {
    background-color: white;
}

div.title {
    font-size: medium;
    display: inline;
}

div.teacher, a.teacher {
    font-size: small;
    font-weight: normal;
    font-style: italic;
    color: inherit;
    text-decoration: inherit;
}

div.room {
    font-size: xx-small;
    font-weight: normal;
    /*float: right;*/
    /*display: block;*/
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0;
    text-align: right;
}

table.container {
    width: 100%;
    border-collapse: collapse;
    /* border: 1px solid black; */
    border: 0;
}

table.container td {
    /* border: 1px solid black; */
    border: 0;
}

div.container {
    position: relative;
    height: 100%;
    /*padding-bottom: 10px;*/
}

div.inner-container {
    /*margin: auto;*/
    /*vertical-align: middle;*/
}

div.action-panel {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    border: 3px solid #8AC007;
    background: white;
    z-index: 1;
}

div.filter-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    border: 3px solid #8AC007;
    background: white;
    z-index: 1;
}

span.checkbox-set-label {
    font-weight: bold;
    text-decoration: underline red dotted;
    cursor: copy;
}
<style>
`;
