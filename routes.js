// Main configuration
Router.configure({
    layoutTemplate: 'main'
});

// Define index route
Router.route('/', {
    template: 'index'
});

Router.route('/test', {
    template: 'test'
});

Router.route('/done', {
    template: 'done'
});

Router.route('/csv/:_id', {
  where: 'server',
  action: function () {
    var filename = this.params._id + '.csv';
    var fileData = "";

    var headers = {
      'Content-type': 'text/csv',
      'Content-Disposition': "attachment; filename=" + filename
    };
    var records = Tests.find({userId: this.params._id});
    records.forEach(function(rec) {
      fileData += rec.userId + "," + rec.time + "," + rec.wasCorrect + "\r\n";
    });
    this.response.writeHead(200, headers);
    return this.response.end(fileData);
  }
});

// POST ROUTES

// Individual
Router.route('/post/:_id', {
  template: 'post',
  waitOn: function() {
        return Meteor.subscribe('posts', this.params._id);
    },
	data: function(){
	    return Posts.findOne(this.params._id);
	}
});