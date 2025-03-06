let input = [
    { "Process": 1, "Arrival": 0, "Burst": 5 , "Priority": 10},
    { "Process": 2, "Arrival": 1, "Burst": 4 , "Priority": 20},
    { "Process": 3, "Arrival": 2, "Burst": 2 , "Priority": 30},
    { "Process": 4, "Arrival": 4, "Burst": 1 , "Priority": 40}
];

console.log("Inputs:");  
input.forEach(process => {
    console.log(`Process: ${process.Process}, Arrival: ${process.Arrival}, Burst: ${process.Burst}, Priority: ${process.Priority}`);
    process.Remaining = process.Burst; 
    process.Response = undefined;    
}); 
console.log("");

const timeQuantum = 1; 
let processes = [...input]; 
processes.sort((p1, p2) => p1.Arrival - p2.Arrival); 

let readyQueue = [], ganttChart = [], output = [], currentTime = 0;


while (processes.length > 0 && processes[0].Arrival <= currentTime) {
    readyQueue.push(processes.shift());
}

while (readyQueue.length > 0) {
   
    readyQueue.sort((p1, p2) => p2.Priority - p1.Priority);

    let currentProcess = readyQueue.shift(); // Select highest-priority process
    ganttChart.push(`P${currentProcess.Process}`); // Add to Gantt Chart

    // Set Response Time if it's the first execution
    if (currentProcess.Response === undefined) {
        currentProcess.Response = currentTime - currentProcess.Arrival;
    }

    // Execute process for time quantum
    if (currentProcess.Remaining > timeQuantum) {
        currentProcess.Remaining -= timeQuantum;
        currentTime += timeQuantum;
    } else {
        currentTime += currentProcess.Remaining;
        currentProcess.Remaining = 0;
    }

    // Add newly arrived processes to ready queue
    while (processes.length > 0 && processes[0].Arrival <= currentTime) {
        readyQueue.push(processes.shift());
    }

   
    if (currentProcess.Remaining === 0) {
        currentProcess.Completion = currentTime;
        currentProcess.Turnaround = currentProcess.Completion - currentProcess.Arrival;
        currentProcess.Waiting = currentProcess.Turnaround - currentProcess.Burst;
        output.push(currentProcess);
    } else {
        readyQueue.push(currentProcess); 
    }
}


process.stdout.write("Gantt Chart: | ");
ganttChart.forEach(p => process.stdout.write(p + " | "));
console.log("\n");

console.log("Output after Calculation:");

output.sort((p1, p2) => p1.Process - p2.Process);
output.forEach(p => {
    console.log(`Process: ${p.Process}, Completion: ${p.Completion}, Turnaround: ${p.Turnaround}, Waiting: ${p.Waiting}`);
});