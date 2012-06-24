var queue = require('./minimal-queue');

var q = queue.up (function (msg, o) { 
  console.log('called', o); 
  var that = this;

  setTimeout(function () {
    console.log('Pending: %s, Running: %s', that._pending.length, that._running);
    that.done(); 
    if (o.index < 10) { 
      that.enqueue('queued later', { index: o.index + 10, name: 'crazy' });
      that.enqueue('queued later', { index: o.index + 10, name: 'more crazy' });
    }
  }, 200 + 100 * o.index);
});

q.allDone = function () {
  console.log('all done');
};

for (var i = 0; i < 10; i++) {
  q.enqueue('hello-' + i, { index: i, name: 'name ' + i });
  console.log('Pending: %s, Running: %s', q._pending.length, q._running);
}
