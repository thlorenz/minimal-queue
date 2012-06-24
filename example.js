var queue = require('./minimal-queue')
  , myQueue = queue.up (function (job) {
      var that = this;
      console.log('Starting ', job);
      setTimeout(function () {
        console.log('Processed %s. Calling done now to allow more jobs to run.', job);         
        that.done();
      }, 200);
    })
  ;

myQueue.concurrency = 2;
myQueue.allDone = function () { console.log('Yay, we are now out of jobs!'); };

myQueue.enqueue('first job');
myQueue.enqueue('second job');
myQueue.enqueue('third job');

