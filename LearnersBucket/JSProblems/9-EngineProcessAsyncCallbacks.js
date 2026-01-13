// This question was asked in Meta’s frontend interview.
// The problem statement reads as – Implement an engine that process async callbacks using JavaScript.
// Your task is to provide implementation of the class QueueCallbacks to meet all the condition:

// Constructor requirements
// You should provide the implementation of the constructor and process methods,
// Do not change the names of these methods or the number of  arguments they receive.

// The constructor method should receive an optional string.,
// The value of the string will be responsible for the order in which callbacks stored in the queue are processes.

// The only non-empty value it can receive in the string LIFO(Last in first out).
// the default order of processing callbacks in the queue will be FIFO(First in first out).

// Process method requirements
// The process method receive a single async function that should be executes by following the algorithm described below:

// If there is currently no async function being executed by the class, the received callback method should be executed immediately.
// If there is currently only one async function currently being executed the callback method should be executed immediately as well.
// If there are two async function currently being executed the next callback method should be put into the queue.
// After one of the currently executing async function is finished.
// When there were no argument passed to the constructor the first callback method that was pushed into the queue should be executed (First in first out).
// When the argument passed to the constructor was LIFO, the last callback in the queue should be executed.
// If there are more than 6 callbacks in the queue discard any extra callbacks.
// If there are more than 3 callbacks in the queue, follow FIFO if no argument is passed to constructor.

// Solution
// If you read the problem statements carefully you would be implement  the algorithm step by step. This is how we are going to solve this:

// We will create a constructor function with two methods, process a public method and executeNext a private method.

// We will use three variables, first to track the order, set the  default as FIFO,
// second to hold the callbacks queue, and third to track  the number of executions happening.

// In the process method, we will take the async callback as input,
// if there are less than 2 executing callbacks we will execute the callbacks immediately otherwise
// we will add them to the callback queue (but only if callback queue has less than 6 elements),
// this will satisfy the first two conditions of the process method and the second last method.

// Before starting the execution we will increment the execution count and
// once the callbacks are fulfilled we will decrease the execution count.

// After each execution is completed, we will call the executeNext private method that will depending on the order,
// will get the next callback and call the process method with that callback which will begin its execution.
// The process method will be called only when the callback queue has callback and
// the number of current ongoing execution is less than 2.

// The last point "If there are more than 3 callbacks in the queue,
// follow FIFO if no argument is passed to constructor" can be safely ignored as irrespective order is specified or not in the constructor,
// things will work perfectly.

class QueueCallbacks {
  constructor(order = "FIFO") {
    this.order = order;
    this.callbacksQueue = [];
    this.ongoingExecution = 0;
  }

  process(callback) {
    // if there less than 2 callbacks are being executed, execute the callback immediately
    // once the callback execution has begun, update the ongoing execution count
    // similar once the execution is done, update the onging execution count and trigger executing the next callbacks
    if (this.ongoingExecution < 2) {
      this.ongoingExecution++;

      callback
        .then((i) => {
          console.log(i);
        })
        .finally(() => {
          this.ongoingExecution--;
          this.#executeNext();
        });
    }
    // if more than 2 callbacks are being executed, store them into the queue
    // store no more than 6 items into the queue
    else {
      if (this.callbacksQueue.length < 6) {
        this.callbacksQueue.push(callback);
      }
    }
  }

  #executeNext() {
    // if there are items in the callbacks queue and there is room for execution
    if (this.callbacksQueue.length > 0 && this.ongoingExecution < 2) {
      // get the next callback depending upon the order
      let nextCallback =
        this.order === "LIFO"
          ? this.callbacksQueue.pop()
          : this.callbacksQueue.shift();

      // process the next callback
      this.process(nextCallback);
    }
  }
}

let dummyApi = (index) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(index);
    }, index * 1000);
  });
};

// Test in FIFO order

const asyncCallbacks = new QueueCallbacks();
asyncCallbacks.process(dummyApi(1));
asyncCallbacks.process(dummyApi(2));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(4));
asyncCallbacks.process(dummyApi(5));
asyncCallbacks.process(dummyApi(6));
asyncCallbacks.process(dummyApi(7));
asyncCallbacks.process(dummyApi(8));
asyncCallbacks.process(dummyApi(9));
asyncCallbacks.process(dummyApi(10));

// Output:
// 1 // this will execute first
// 2 // this will execute second
// 4 // this will execute after 2 seconds
// 5 // all of the remaining will execute after 1 second there after
// 6
// 6
// 7
// 8

// You will notice that we get 8 outputs, that is because according to the problem statement,
// the first two callbacks will be executed immediately and then we will store no more than 6 callbacks in the queue.
// Thus we get 8 items, extra two are discarded.

// Test in LIFO order
const asyncCallbacks2 = new QueueCallbacks("LIFO");
asyncCallbacks2.process(dummyApi(1));
asyncCallbacks2.process(dummyApi(2));
asyncCallbacks2.process(dummyApi(6));
asyncCallbacks2.process(dummyApi(4));
asyncCallbacks2.process(dummyApi(5));
asyncCallbacks2.process(dummyApi(6));
asyncCallbacks2.process(dummyApi(7));
asyncCallbacks2.process(dummyApi(8));
asyncCallbacks2.process(dummyApi(9));
asyncCallbacks2.process(dummyApi(10));

// Output:
// 1 // this will execute first
// 2 // this will execute second
// 7 // this will execute after 5 seconds
// 6 // then this
// 5 // then this
// 4 // then this
// 6 // then this
// 8 // then this

console.log(
  "---------------------------------------------------------------------------"
);

// The first two items are executed in the order added as they were  executed immediately,
// the remaining were executed in the LIFO order,  thus there were printed as they resolved.

// Followup - Uber L4
// A similar question was asked in Uber's L4 (SDE2) interview.
// Design and implement a task queue in TypeScript that supports  controlled concurrency.
// The queue should allow executing up to K tasks  in parallel, while additional tasks are queued until slots become available.

// Our implementation functions exactly similar,
// the only difference is there we are supporting only 2 concurrent tasks
// and here it wants k tasks in parallel.
// For that we will update the class and accept the concurrent tasks limit and queue limit as arguments.

class QueueCallbacksNew {
  constructor(
    order = "FIFO",
    concurrentTasks = 2,
    queueLimit = Infinity,
    executor
  ) {
    this.order = order;
    this.allowedConcurrentTasks = concurrentTasks;
    this.queueLimit = queueLimit;
    this.callbacksQueue = [];
    this.ongoingExecution = 0;
    this.executor = executor;
  }

  process(callback) {
    // if there less than 2 callbacks are being executed, execute the callback immediately
    // once the callback execution has begun, update the ongoing execution count
    // similar once the execution is done, update the onging execution count and trigger executing the next callbacks
    if (this.ongoingExecution < this.allowedConcurrentTasks) {
      this.ongoingExecution++;

      this.executor(callback)
      .finally(() => {
        this.ongoingExecution--;
        this.#executeNext();
      });
      // if more than 2 callbacks are being executed, store them into the queue
      // store no more than 6 items into the queue
    } else {
      if (this.callbacksQueue.length < this.queueLimit) {
        this.callbacksQueue.push(callback);
      }
    }
  }

  #executeNext() {
    // if there are items in the callbacks queue and there is room for execution
    if (
      this.callbacksQueue.length > 0 &&
      this.ongoingExecution < this.allowedConcurrentTasks
    ) {
      // get the next callback depending upon the order
      let nextCallback =
        this.order === "LIFO"
          ? this.callbacksQueue.pop()
          : this.callbacksQueue.shift();

      // process the next callback
      this.process(nextCallback);
    }
  }
}

// Followup - Each task should have a unique task ID and support success and error callbacks.
// The design should also allow setting a custom executor to define how  tasks are executed
// (for example, to add logging, retries, or rate limiting).

let taskCounter = 0;

// Let's update the dummyApi function so that it has unique task Id and support success and error callbacks
function dummyApiWithLog(
  delay,
  shouldFail = false,
  { onSuccess, onError } = {}
) {
  const taskId = `task-${++taskCounter}`;

  return {
    id: taskId,

    execute: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error(`Failed after ${delay}s`));
          } else {
            resolve(`Completed in ${delay}s`);
          }
        }, delay * 1000);
      }),

    onSuccess,
    onError,
  };
}

// And then have the executor function.
const defaultExecutor = async (task) => {
  console.log(`Starting ${task.id}`);

  try {
    const result = await task.execute();
    task.onSuccess?.(result, task.id);
  } catch (err) {
    task.onError?.(err, task.id);
  }

  console.log(`Finished ${task.id}`);
};

const asyncCallbacksNew = new QueueCallbacksNew("FIFO", 1, 8, defaultExecutor);

asyncCallbacksNew.process(
  dummyApiWithLog(1, false, {
    onSuccess: (res, id) => console.log(id, res),
    onError: (err, id) => console.error(id, err.message),
  })
);

asyncCallbacksNew.process(
  dummyApiWithLog(2, true, {
    onSuccess: (res, id) => console.log(id, res),
    onError: (err, id) => console.error(id, err.message),
  })
);

asyncCallbacksNew.process(dummyApiWithLog(1));
asyncCallbacksNew.process(dummyApiWithLog(1));

// Output:
// "Starting task-1"
// "task-1" "Completed in 1s"
// "Finished task-1"
// "Starting task-2"
// "task-2" "Failed after 2s" // waits for this to complete before executing next
// "Finished task-2"
// "Starting task-3"
// "Finished task-3"
// "Starting task-4"
// "Finished task-4"
