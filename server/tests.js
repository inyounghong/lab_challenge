Meteor.publish("tests", function () {
  return Tests.find();
});

Meteor.methods({
  addTest: function (userId, time, wasCorrect) {
    Tests.insert({
      userId: userId,
      time: time,
      wasCorrect: wasCorrect
    });
  },
});