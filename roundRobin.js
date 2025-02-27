function roundRobin(processes, quantum) {
    let n = processes.length;
    let remainingTime = processes.map(p => p.bt);
    let completionTime = Array(n).fill(0);
    let turnaroundTime = Array(n).fill(0);
    let waitingTime = Array(n).fill(0);
    let responseTime = Array(n).fill(-1);
    
    let time = 0, queue = [], visited = new Set();

    // Sort by arrival time
    processes.sort((a, b) => a.at - b.at);
    queue.push(0);
    visited.add(0);

    while (queue.length > 0) {
        let index = queue.shift();
        let p = processes[index];

        if (responseTime[index] === -1) {
            responseTime[index] = time - p.at; // First execution
        }

        let execTime = Math.min(quantum, remainingTime[index]);
        time += execTime;
        remainingTime[index] -= execTime;

        // Check new arrivals and add to queue
        for (let i = 0; i < n; i++) {
            if (i !== index && !visited.has(i) && processes[i].at <= time) {
                queue.push(i);
                visited.add(i);
            }
        }

        if (remainingTime[index] > 0) {
            queue.push(index); // Re-add unfinished process
        } else {
            completionTime[index] = time;
            turnaroundTime[index] = completionTime[index] - p.at;
            waitingTime[index] = turnaroundTime[index] - p.bt;
        }
    }

    console.log("P\tAT\tBT\tCT\tTAT\tWT\tRT");
    processes.forEach((p, i) => {
        console.log(`${p.pid}\t${p.at}\t${p.bt}\t${completionTime[i]}\t${turnaroundTime[i]}\t${waitingTime[i]}\t${responseTime[i]}`);
    });
}

let processes = [
    { pid: 'P1', at: 0, bt: 5 },
    { pid: 'P2', at: 1, bt: 4 },
    { pid: 'P3', at: 2, bt: 2 },
    { pid: 'P4', at: 4, bt: 1 }
];

roundRobin(processes, 2);
