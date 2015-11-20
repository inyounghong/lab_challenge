Meteor.subscribe("tests");

var v_array = ["top", "middle", "bottom"];
var h_array = ["left", "center", "right"];

var valueV = randomVal(v_array);
var valueH = randomVal(h_array);
var classV = randomVal(v_array);
var classH = randomVal(h_array);

var startTime = new Date();

// Returns random value from array
function randomVal (array){
	return array[ Math.floor(Math.random() * array.length) ]
}

// Returns true if user's answer is correct
function isCorrect (key){
	if (valueV == classV && valueH == classH){
		return (key == 114); // Was key "r"?
	}
	return (key == 119); // Was key "w"?
}

// Returns the time difference between two dates
function getTime(start, end){
	var time = (end - start)/1000;
	return time;
}

// Increments test number after each test
function incTestNumber(){
	var testNum = sessionStorage.testNum;
	if (testNum === undefined){
		testNum = 0;
	}
	sessionStorage.testNum = parseInt(testNum) + 1;
}

Template.test.helpers({
	'valueV': function() {
		return valueV;
    },
    'valueH': function() {
		return valueH;
    },
    'classV': function() {
		return classV;
    },
    'classH': function() {
		return classH;
    },
});

Template.test.onRendered(function(){
	if (sessionStorage.testNum >= 20){
		Router.go("/score");
    }
})

Template.body.events({
	'keypress': function(event) {
		// Presses "w" or "r"
        if (Router.current().route._path == "/test" && (event.charCode == 119 || event.charCode == 114)) { 

        	var time = getTime(startTime, new Date());

            if (isCorrect(event.charCode)){
            	Meteor.call("addTest", sessionStorage.userId, time, true);
            } else{
            	Meteor.call("addTest", sessionStorage.userId, time, false);
            }

            incTestNumber();
            window.location.reload(true);
        }
    },
});



