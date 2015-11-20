Template.index.onRendered(function(){
	window.setTimeout(function () {
		
        location.href = "/test";
    }, 5000);
})

Template.body.events({
	'keypress': function(event) {
        if (event.charCode == 32) {
            sessionStorage.userId = Random.id();
            sessionStorage.testNum = 0;
            Router.go("/test");


        }
    },
});