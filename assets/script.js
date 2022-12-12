$(document).ready(function () {

    //Grab current day and date from dayjs and put in header
    $('#currentDay').text(dayjs().format('dddd, DD MMMM YYYY'));

    var currentHour = dayjs().hour();
    console.log(currentHour);

    $('.row textarea').attr("placeholder", "Enter your notes here...").each(function (i) {
        //The requirement is to show the workday, 9am - 5pm, so I offset the loop by 9 hours
        var hour = i + 9;

        if (hour < currentHour) {
            $(this).addClass('past');
        }
        else if (hour === currentHour) {
            $(this).addClass('present');
        }
        else {
            $(this).addClass('future');
        }
    });

    //Iterate through all saved schedule hours and render in time blocks 
    for (var i = 9; i < 18; i++) {
        var hour = 'hour' + i;
        var hourText = localStorage.getItem(hour);
        $('#' + hour).val(hourText);
    }

    // Attach "ON CLICK" event to all the save buttons
    $(".saveBtn").on("click", function () {
        //Grab the text from the textarea that is the sibling of the clicked save button
        var timeBlock = $(this).siblings("textarea");
        var hourText = timeBlock.val();
        
        //Grab the id from that same textarea
        var hour = timeBlock.attr('id');
        localStorage.setItem(hour, hourText);
    });

    //Reset button to clear all time blocks if desired (not automatically cleared in case of recurring events)
    $('#reset').on("click", function () {
        for (var i = 9; i < 18; i++) {
            localStorage.removeItem("hour" + i);
            $('#hour' + i).val("");
        }
    })
});