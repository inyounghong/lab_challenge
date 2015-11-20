Template.score.helpers({
	'userScore': function() {
        return Tests.find({userId: sessionStorage.userId, wasCorrect: true}).count();
    },
});

Template.done.helpers({
	'userId': function() {
        return sessionStorage.userId;
    },
});