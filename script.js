// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $(document).ready(function () {

    $("#currentDay").html(dayjs().format('dddd, MMMM D'));
    var hours = [
      "8AM",
      "9AM",
      "10AM",
      "11AM",
      "12PM",
      "1PM",
      "2PM",
      "3PM",
      "4PM",
      "5PM",
      "6PM",
      "7PM",
      "8PM",
    ];

    var savedData;
    if (localStorage.getItem("calendar")) {
      savedData = JSON.parse(localStorage.getItem("calendar"));
    } else {
      savedData = new Array();
    }

    var currentHour = dayjs().format('h');
    var amPm = dayjs().format("a").toUpperCase();

    //this is a loop in jquery
    $.each(hours, function (i, time) {
      // we are saying for each hour in hours, which the value gets substituted in the parameter "time" 
      var currentTime = currentHour;
      var loopTime = parseInt(time.replace('AM','').replace('PM',''));
      var pastCurrentOrPresent = '';
      var currentAmPm = time.replace(/[0-9]+/g, '');
    
      if((loopTime < currentTime) && (currentAmPm === amPm)) {
        pastCurrentOrPresent = "past";
      } else if ((currentTime == loopTime) && (currentAmPm === amPm)) {
        pastCurrentOrPresent = "present";
      } else if ((loopTime > currentTime) && (currentAmPm === amPm) && (loopTime!==12)) {
        pastCurrentOrPresent = "future";
      } else if (loopTime == 12) {
        if (currentAmPm == 'AM') {
          pastCurrentOrPresent = 'future';
        } else {
          pastCurrentOrPresent = 'past';
        }
      } else {
        pastCurrentOrPresent = "past";
      }

      var currentData = "";
      if (savedData[i + 1]) {
        currentData = savedData[i + 1];
      }
      $(
        ".container-fluid"
      ).append(`<div id="hour-${i + 1}" class="row time-block ${pastCurrentOrPresent}">
      <div class="col-2 col-md-1 hour text-center py-3">${time}</div>
      <textarea class="col-8 col-md-10 description" rows="3">${currentData}</textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`);

    $(".saveBtn").on('click', function(e) {
      e.preventDefault();
      var currentIndex = parseInt($(e.currentTarget).parent().attr('id').replace("hour-", ""));
      var divName = $(e.currentTarget).siblings('.hour').html();
      var enteredText = $(e.currentTarget).siblings("textarea").val();
      savedData[currentIndex] = enteredText;
      localStorage.setItem("calendar", JSON.stringify(savedData));
    });
    });
  });
});
