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

  // setChecked: function (postId, setChecked) {
  //   Posts.update(postId, { $set: { checked: setChecked} });
  // },
  // setPrivate: function (postId, setToPrivate) {
  //   var task = Post.findOne(postId);
 
  //   // Make sure only the task owner can make a task private
  //   if (task.owner !== Meteor.userId()) {
  //     throw new Meteor.Error("not-authorized");
  //   }
 
  //   Post.update(postId, { $set: { private: setToPrivate } });
  // }
});