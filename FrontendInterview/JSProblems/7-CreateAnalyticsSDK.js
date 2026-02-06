// Implement an analytics SDK that exposes log events,
// it takes in events and queues them,
// and then starts sending the events.

// The SDK should adhere the following properties.
// Send each event after a delay of 1 second and this logging fails every n % 5 times.
// Send the next event only after the previous one resolves.
// When the failure occurs attempt a retry.Input:

// Delay function
// The most important part of this function is that the events will be sent after a delay of 1 second and fails n % 5 times.
// We can do the same by extending the sleep function.
// Create a new Promise and inside that run a setTimeout that will resolve the promise.
// To the same, we will add one extra condition that will check if the current execution is n % 5 then reject, else resolve.

class SDK {
  constructor() {
    // hold the events
    this.queue = [];
    // track the count
    this.count = 1;
  }

  // function to delay the exection
  wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject every n % 5 time
        if (this.count % 5 === 0) {
          reject();
        } else {
          resolve();
        }
      }, 1000);
    });
  }

  // push event in the queue
  logEvent(ev) {
    this.queue.push(ev);
  }

  // to send analytics
  // recursively send the events
  async sendAnalytics() {
    // if there are no events in the queue
    // stop execution
    if (this.queue.length === 0) {
      return;
    }

    // get the first element from the queue
    const current = this.queue.shift();

    try {
      // delay
      await this.wait();

      // print the event
      // can perform any other operations as well like making api call
      console.log("Analytics sent " + current);

      // increase the count
      this.count++;
    } catch (err) {
      // if execution fails
      console.log("-----------------------");
      console.log("Failed to send " + current);
      console.log("Retrying sending " + current);
      console.log("-----------------------");

      // reset the count
      this.count = 1;

      // push the event back into the queue
      this.queue.unshift(current);
    } finally {
      // recursively call the same function
      // to send the remaining
      this.sendAnalytics();
    }
  }
}

const sdk = new SDK();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");

sdk.sendAnalytics();

// Output:
// "Analytics sent event 1"
// "Analytics sent event 2"
// "Analytics sent event 3"
// "Analytics sent event 4"
// "-----------------------"
// "Failed to send event 5"
// "Retrying sending event 5"
// "-----------------------"
// "Analytics sent event 5"
// "Analytics sent event 6"
// "Analytics sent event 7"
// "Analytics sent event 8"
// "-----------------------"
// "Failed to send event 9"
// "Retrying sending event 9"
// "-----------------------"
// "Analytics sent event 9"
// "Analytics sent event 10"
