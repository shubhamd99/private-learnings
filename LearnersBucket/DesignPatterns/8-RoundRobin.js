// Round Robin is a scheduling principle where tasks are processed one by one in a circular order,
// giving each task a fixed time or turn, and then moving to the next.

// Real-Life Examples

// 🧑‍💻 CPU scheduling in Operating Systems
// 🌐 Load balancer distributing requests to servers
// 🎧 Call center assigning calls to agents
// 🔁 Task schedulers / job queues
// 🎮 Turn-based games

// A → B → C → A → B → C → A → ...

class RoundRobin {
  constructor(tasks) {
    this.queue = [...tasks];
  }

  next() {
    const task = this.queue.shift(); // take first
    this.queue.push(task); // put it at end
    return task;
  }
}

const rr = new RoundRobin(["A", "B", "C"]);

console.log(rr.next()); // A
console.log(rr.next()); // B
console.log(rr.next()); // C
console.log(rr.next()); // A

// ⚙️ In CPU Scheduling
// Each process gets fixed time quantum (e.g., 10ms)
// If not finished → goes to end of queue
// Next process runs

// Disadvantages
// Context switching overhead
// If time quantum is:
// Too small → too much switching
// Too big → behaves like FCFS
