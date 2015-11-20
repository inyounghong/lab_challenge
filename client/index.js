Template.index.onRendered(function(){
	// Reset user and info
	sessionStorage.userId = Random.id();
    sessionStorage.testNum = 0;
	
	timeout = window.setTimeout(function () {
        location.href = "/test";
    }, 5000);
})

Template.body.events({
	'keypress': function(event) {
        if (event.charCode == 32) {
            clearTimeout(timeout);
            Router.go("/test");
        }
    },
});