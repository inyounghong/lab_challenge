Meteor.subscribe("tests");

var v_array = ["top", "middle", "bottom"];
var h_array = ["left", "center", "right"];

var vertical = randomVal(v_array);
var horizontal = randomVal(h_array);
var classV = randomVal(v_array);
var classH = randomVal(h_array);

var startTime = new Date();

// Returns random value from array
function randomVal (array){
	return array[ Math.floor(Math.random() * array.length) ]
}

// Returns true if user's answer is correct
function isCorrect (key){
	if (vertical == classV && horizontal == classH){
		return (key == 114); // Was key "r"?
	}
	return (key == 119); // Was key "w"?
}

// Returns the time difference between two dates
function getTime(start, end){
	var time = (end - start)/1000;
	return time;
}

function incTestNumber(){
	var testNum = sessionStorage.testNum;
	if (testNum === undefined){
		testNum = 0;
	}
	sessionStorage.testNum = parseInt(testNum) + 1;
}


Template.test.helpers({
	'vertical': function() {
		return vertical;
    },
    'horizontal': function() {
		return horizontal;
    },
    'classV': function() {
		return classV;
    },
    'classH': function() {
		return classH;
    },
});

Template.body.events({
	'keypress': function(event) {
		// Presses "w" or "r"
        if (event.charCode == 119 || event.charCode == 114) { 

        	var time = getTime(startTime, new Date());

            if (isCorrect(event.charCode)){
            	Meteor.call("addTest", sessionStorage.userId, time, true);
            } else{
            	Meteor.call("addTest", sessionStorage.userId, time, false);
            }

            incTestNumber();

            if (sessionStorage.testNum <= 20){
            	window.location.reload(true);
            } else{
            	Router.go("/done");
            }
        }
    },
});



