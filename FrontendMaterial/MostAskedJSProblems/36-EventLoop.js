class EventLoop {
  constructor() {
    this.callStack = [];
    this.microTaskQueue = [];
    this.macroTaskQueue = [];
  }

  execute(task) {
    // Initial synchronous task
    this.callStack.push(task);
    this.processCallStack();

    // Event loop cycle
    while (this.microTaskQueue.length > 0 || this.macroTaskQueue.length > 0) {
      // First priority: drain all microtasks
      this.runMicroTasks();

      // Second priority: execute only one macrotask
      this.runOneMacroTask();
    }
  }

  processCallStack() {
    while (this.callStack.length > 0) {
      const task = this.callStack.pop();

      try {
        task();
      } catch (error) {
        console.error("Task Error:", error.message);
      }
    }
  }

  queueMicroTask(task) {
    this.microTaskQueue.push(task);
  }

  setTimeout(task) {
    this.macroTaskQueue.push(task);
  }

  runMicroTasks() {
    while (this.microTaskQueue.length > 0) {
      const microTask = this.microTaskQueue.shift();

      // push selected microtask to call stack
      this.callStack.push(microTask);
      this.processCallStack();
    }
  }

  runOneMacroTask() {
    if (this.macroTaskQueue.length === 0) return;

    const macroTask = this.macroTaskQueue.shift();

    // push selected macrotask to call stack
    this.callStack.push(macroTask);
    this.processCallStack();
  }
}

// Example
const eventLoop = new EventLoop();

eventLoop.execute(() => {
  console.log("1");

  // First macrotask
  eventLoop.setTimeout(() => {
    console.log("2");

    eventLoop.queueMicroTask(() => {
      console.log("3");
    });
  });

  // Second macrotask
  eventLoop.setTimeout(() => {
    console.log("7");

    eventLoop.queueMicroTask(() => {
      console.log("8");
    });
  });

  // Microtask
  eventLoop.queueMicroTask(() => {
    console.log("4");

    eventLoop.queueMicroTask(() => {
      console.log("5");
    });
  });

  console.log("6");
});

// Sync code:
// 1, 6

// Microtasks (fully drained):
// 4, 5

// Macrotask #1:
// 2
// Microtask added by it:
// 3

// Macrotask #2:
// 7
// Microtask added by it:
// 8
