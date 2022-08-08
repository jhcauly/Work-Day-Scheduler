var container = $('#container');
var timeDisplayEl = $('#currentDay');
var time = ['9-AM', '10-AM', '11-AM', '12-AM', '1-PM', '2-PM', '3-PM', '4-PM', '5-PM'];
var storedTodos = JSON.parse(localStorage.getItem("todos"));
var todos = [];


function displayTime() {
    /* Here i get the Month and Day of the date */
    var rightNow = moment().format(', MMMM DD');
    /* Here i create the array of weekday names*/
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var date = new Date();
    /* Here i send the correct date to Display where user can see date */
    timeDisplayEl.text(weekday[date.getDay()] + rightNow + "th");
}
/* This function we take time and add new class at the textarea */
function checkTime() {
    for (var i = 0; i < time.length; i++) {
        var check = i + 9;
        var textarea = $('#' + check + "tex" + i)
            /* RighNow get hour at moment */
        var rightNow = moment().format('H');
        /* If rightNow is more than check add new class PAST at the textarea */
        if (check < Number(rightNow)) {

            idButtonvar = i + 9;
            idBUttonString = $("#" + idButtonvar + "tex" + i);

            idBUttonString.addClass('past');
        }
        /* If rightNow is equal than check add new class PRESENT at the textarea */

        if (check === Number(rightNow)) {

            idButtonvar = i + 9;
            idBUttonString = $("#" + idButtonvar + "tex" + i);
            idBUttonString.addClass('present');
        }
        /* If rightNow is less than check add new class FUTURE at the textarea */

        if (check > Number(rightNow)) {

            idButtonvar = i + 9;
            idBUttonString = $("#" + idButtonvar + "tex" + i);
            idBUttonString.addClass('future');
        }

    }
}
/* The init start when the page is opened */
function init() {
    if (storedTodos !== null) {
        todos = storedTodos;
        for (i = 0; i < time.length; i++) {

            createPage(i);
            showTextArea(i);


        }

    } else {
        for (i = 0; i < time.length; i++) {
            var newArray = i + 9;
            todos[i] = "#" + newArray + "tex" + i;
            createPage(i);
            showTextArea(i);
        }
    }
    checkTime()



}

function createPage(i) {

    var divRow = $('<div>');
    divRow.addClass('row');
    var divLabel = $('<div>');
    divLabel.addClass('hour');
    var label = $('<label>');
    var textarea = $('<textarea>');
    textarea.addClass('textarea');
    var textareavar = i + 9 + "tex" + i;
    textarea.attr('id', textareavar);
    var saveBtn = $('<button>');
    saveBtn.addClass('saveBtn fas fa-save');
    saveBtn.attr('id', i);
    label.text(time[i]);
    /* This function work when i click the save button, i get the id of button and save at correct place in array todos
     */
    saveBtn.on('click', function() {
        /* I take the id of button*/
        var idButton = $(this).attr('id');
        /* Here i transform the id of button in Number and plus 9 because the hours start in 9*/
        var idButtonvar = parseInt(idButton) + 9;
        /* Here i concatenate the id,tex and id of button*/
        var idBUttonString = "#" + idButtonvar + "tex" + $(this).attr('id').toString();;
        /* Here i get the value of textarea */
        var todoText = $(idBUttonString).val();
        todoText = idBUttonString + "-" + todoText
        var arrayTodoText = todoText.split("-");


        todos[idButton] = todoText
        var verification = todos[idButton].split("-")
        if (verification[0] === arrayTodoText[0]) {

            todos[idButton] = todoText

            storeTodos();
        }


    });
    /* Here is wher i add elements to the index, i created the Label, textearea and button*/
    divRow.append(divLabel);
    divRow.append(textarea);
    divRow.append(saveBtn);
    divLabel.append(label);
    container.append(divRow);
}
/* This function it is where i show the user then Scheduler. The function get the id and set new value at the textarea*/
function showTextArea(id) {
    var textareavar = id + 9 + "tex" + id;
    var idText = "#" + textareavar;
    var container = $(idText);
    if (todos[id] != undefined) {
        $(idText).val(todos[id].split("-")[1])
    }
}
/* Here we get array TODOS and send to localStore, where we can bring back when start system!
 */
function storeTodos() {

    localStorage.setItem("todos", JSON.stringify(todos));
}
init()
setInterval(displayTime, 0);