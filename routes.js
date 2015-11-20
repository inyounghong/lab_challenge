// Main configuration
Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    template: 'index'
});

Router.route('/test', {
    template: 'test'
});

Router.route('/score', {
    template: 'score'
});

Router.route('/done', {
    template: 'done'
});

// Generating downloadable csv
Router.route('/csv/:_id', {
  where: 'server',
  action: function () {
    var filename = this.params._id + '.csv';
    var fileData = "User Id, Response Time (Seconds), Correct?\r\n";

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