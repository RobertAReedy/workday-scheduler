var timeSlotArray = [];
var descriptionArr = [];
var container = document.querySelector(".container");
var testCurrentHour = moment();

function buildSlots() {
    $("#currentDay").text(moment().format("dddd[,] MMMM Do"));
    for (var i = 9; i <= 17; i++) {
        //creates the row to have the three columns append to
        var row = document.createElement("div"); 
        row.className = "row";

        //creates and appends the first column (time)
        var hourSlot = document.createElement("div"); 
        hourSlot.classList = "col-1 hour";
        if (i < 13) {
            hourSlot.textContent = i + "am";
        }
        else {
            hourSlot.textContent = (i - 12) + "am";
        }
        row.appendChild(hourSlot);

        //creates and appends the second column (task text area)
        var descriptionSlot = document.createElement("textarea");
        $(descriptionSlot).attr("data-time", i);
        setUrgency(descriptionSlot);
        descriptionArr.push(descriptionSlot);
        row.appendChild(descriptionSlot);

        //creates and appends the third column (save button)
        var saveSlot = document.createElement("button");
        saveSlot.classList = "col-1 saveBtn";
        $(saveSlot).attr("id", i); 
        var image = document.createElement("i");
        image.classList = "fas fa-save";
        saveSlot.appendChild(image);
        row.appendChild(saveSlot);

        container.appendChild(row);
        // timeSlotArray.push({
        //     row: row,
        //     hour: hourSlot,
        //     desc: descriptionSlot,
        //     save: saveSlot,
        //     image: image,
        //     time: i
        // });
        
    }
    //console.log("Here is the timeslot array", timeSlotArray);
    setDescFromStorage();
}

/**
 * Will set all description boxes (central textareas in each row)
 * to the corresponding value in localstorage
 */
function setDescFromStorage() {
    for (var i = 0; i < descriptionArr.length; i++) {
        //getItem is i+9 here as the localstorage id is related to
        //the time in the timeSlot, not its position in the descriptionArr array
        descriptionArr[i].value = localStorage.getItem(i+9);
    }
}

/**
 * Test function to log what's in the description array's value slots
 */
function checkDescriptionArr() {
    for (var i = 0; i < descriptionArr.length; i++) {
        console.log(descriptionArr[i].value);
    }
}

function toHours(milliseconds) {
    return milliseconds / (1000 * 60 * 60);
}

function setUrgency(description) {
    var date = new Date;
    console.log("current hour: " + date.getHours());
    if ($(description).attr("data-time") <= date.getHours()) {
        description.classList = "col-10 description past";
    }
    else if ($(description).attr("data-time") > date.getHours() + 1) {
        description.classList = "col-10 description future";
    }
    else {
        description.classList = "col-10 description present";
    }
    
}

buildSlots();


/**
 * This is going to save the text in the corresponding textarea in localstorage
 */
$(".container").on("click", ".saveBtn", function(event) {
    var descriptionContent = $(this).siblings()[1].value;
    // console.log("Contained in adjacent textarea: " + descriptionContent);
    // console.log($(this).attr("id"));
    localStorage.setItem($(this).attr("id"), descriptionContent);
});

