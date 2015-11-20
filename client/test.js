Meteor.subscribe("tests");

var newRandomsDep = new Tracker.Dependency();

var v_array = ["top", "middle", "bottom"];
var h_array = ["left", "center", "right"];

var valueV = randomVal(v_array);
var valueH = randomVal(h_array);
var classV = randomVal(v_array);
var classH = randomVal(h_array);

var startTime = new Date();

function newRandom(){
	valueV = randomVal(v_array);
	valueH = randomVal(h_array);
	classV = randomVal(v_array);
	classH = randomVal(h_array);
	newRandomsDep.changed();
}

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
		newRandomsDep.depend();
		return valueV;
    },
    'valueH': function() {
    	newRandomsDep.depend();
		return valueH;
    },
    'classV': function() {
    	newRandomsDep.depend();
		return classV;
    },
    'classH': function() {
    	newRandomsDep.depend();
		return classH;
    },
});


Template.body.events({
	'keypress': function(event) {
		// Presses "w" or "r"
		if (sessionStorage.testNum >= 20){
			Router.go("/score");
	    }
        if (Router.current().route._path == "/test" && (event.charCode == 119 || event.charCode == 114)) { 

        	var time = getTime(startTime, new Date());

            if (isCorrect(event.charCode)){
            	Meteor.call("addTest", sessionStorage.userId, time, true);
            } else{
            	Meteor.call("addTest", sessionStorage.userId, time, false);
            }

            incTestNumber();
            newRandom();
        }
    },
});



