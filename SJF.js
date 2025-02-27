console.log("\nSJF CPU Scheduling Algorithm:\n");
let processes = [
    { id: 1, arrival: 2, burst: 6 },
    { id: 2, arrival: 5, burst: 2 },
    { id: 3, arrival: 1, burst: 8 },
    { id: 4, arrival: 0, burst: 3 },
    { id: 5, arrival: 4, burst: 4 }
];

console.log("Initial Processes:", processes);
// Sort by Arrival Time
processes.sort((a, b) => a.arrival - b.arrival);

let completed = [], time = 0, totalTA = 0, totalWT = 0;
while (processes.length > 0) {
    let available = processes.filter(p => p.arrival <= time);
    if (available.length === 0) {
        time = processes[0].arrival;
        available = [processes[0]];
    }
    // Select the process with the shortest burst time
    available.sort((a, b) => a.burst - b.burst);
    let current = available.shift();
    
    // Process execution
    time += current.burst;
    let turnAround = time - current.arrival;
    let waiting = turnAround - current.burst;
    totalTA += turnAround;
    totalWT += waiting;
    
    completed.push({ ...current, completion: time, turnAround, waiting });
    processes = processes.filter(p => p.id !== current.id);
}
console.log("\nFinal Process Execution Order:");
completed.forEach(p => console.log(`Process ${p.id} | Completion: ${p.completion} | Turnaround: ${p.turnAround} | Waiting: ${p.waiting}`));

console.log("\nAverage Turnaround Time:", (totalTA / completed.length).toFixed(2));
console.log("Average Waiting Time:", (totalWT / completed.length).toFixed(2));

