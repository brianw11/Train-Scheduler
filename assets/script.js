var config = {
    apiKey: "AIzaSyAS1XgZs45H3IwmBUWKyF4Wn7yHb-UNzrs",
    authDomain: "train-scheduler-5f13e.firebaseapp.com",
    databaseURL: "https://train-scheduler-5f13e.firebaseio.com",
    projectId: "train-scheduler-5f13e",
    storageBucket: "train-scheduler-5f13e.appspot.com",
    messagingSenderId: "544977255479"
  };
  firebase.initializeApp(config);


var database = firebase.database();

    $("#add-train").on("click", function() {

    var trainNameInput = $('#trainNameInput').val().trim();
    var destinationInput = $('#destinationInput').val().trim();
    var startTimeInput = $('#startTimeInput').val().trim();
    var frequencyInput = $('#frequencyInput').val().trim();


    if( trainNameInput != "" &&
        destinationInput != "" &&
        startTimeInput != "" &&
        frequencyInput != "" ){

    database.ref().push({
        trainName: trainNameInput,
        destination: destinationInput,
        startTime: startTimeInput,
        frequency: frequencyInput
    });  
    document.getElementById("#add-train").value = '';
    }
    else {
        return false;
    }

    return false;
})

function AutoRefresh( t ) {
setTimeout("location.reload(true);", t);
}

database.ref().on("child_added", function(childSnapshot) {

    var $trainBody = $('#trainRows');
    var $trainRow = $('<tr>');
    var $trainName = $('<td>').html(childSnapshot.val().trainName).appendTo($trainRow);
    var $destination = $('<td>').html(childSnapshot.val().destination).appendTo($trainRow);
    var $frequency = $('<td>').html(childSnapshot.val().frequency).appendTo($trainRow); 
    
    var frequency = childSnapshot.val().frequency;
    var startTime = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");        
    var minAway = frequency - (moment().diff(moment(startTime), "minutes") % frequency);
    
    var nextTrain = $('<td>').html(moment(moment().add(minAway, "minutes")).format("hh:mm")).appendTo($trainRow);
    var minutesAway = $('<td>').html(minAway).appendTo($trainRow);
        
    $trainRow.appendTo($trainBody);

});
