# minimal-queue

Minimal FIFO queue implementation to be used for simple concurrency limiting scenarios.

# Installation

`npm install minimal-queue`

# Usage

Create a queue by passing a worker function that will be processed each time some arguments are enqueued.
Optionally limit concurrency (default is 50) in order to limit number of jobs allowed to run at the same time.

## Example

```javascript

var queue = require('minimal-queue')
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

```
Running the above produces the following output:

    Starting  first job
    Starting  second job
    Processed first job. Calling done now to allow more jobs to run.
    Starting  third job
    Processed second job. Calling done now to allow more jobs to run.
    Processed third job. Calling done now to allow more jobs to run.
    Yay, we are now out of jobs!
