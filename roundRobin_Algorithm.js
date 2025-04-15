const n = 6;
const timeQuantum = 5;
const pid = [1, 2, 3, 4, 5, 6];
const arrival = [0, 1, 2, 3, 4, 4];
const burst = [7, 4, 15, 11, 20, 9];

let remaining = [...burst];
let completion = Array(n).fill(0);
let turnaround = Array(n).fill(0);
let waiting = Array(n).fill(0);
let visited = Array(n).fill(0);

let queue = [];
let time = 0;
let completed = 0;


for (let i = 0; i < n; i++) {
  if (arrival[i] === 0) {
    queue.push(i);
    visited[i] = 1;
  }
}

while (completed < n) {
  if (queue.length === 0) {
    time++;
    for (let i = 0; i < n; i++) {
      if (!visited[i] && arrival[i] <= time) {
        queue.push(i);
        visited[i] = 1;
      }
    }
    continue;
  }

  let i = queue.shift();

  if (remaining[i] > timeQuantum) {
    time += timeQuantum;
    remaining[i] -= timeQuantum;
  } else {
    time += remaining[i];
    remaining[i] = 0;
    completion[i] = time;
    turnaround[i] = completion[i] - arrival[i];
    waiting[i] = turnaround[i] - burst[i];
    completed++;
  }

 
  for (let j = 0; j < n; j++) {
    if (!visited[j] && arrival[j] <= time && remaining[j] > 0) {
      queue.push(j);
      visited[j] = 1;
    }
  }

  if (remaining[i] > 0) {
    queue.push(i);
  }
}

console.log("PID\tAT\tBT\tCT\tTAT\tWT");
for (let i = 0; i < n; i++) {
  console.log(
    `P${pid[i]}\t${arrival[i]}\t${burst[i]}\t${completion[i]}\t${turnaround[i]}\t${waiting[i]}`
  );
}
