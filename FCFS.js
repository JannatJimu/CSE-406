// Arrival times
let arr1 = [2, 0, 4];
// Burst times
let arr2 = [5, 3, 4]; 

// Sort arrival time array
arr1= arr1.sort(function(a ,b){return a-b});

// Swap first two elements of burst time array
[arr2[0], arr2[1]] = [arr2[1], arr2[0]];

console.log("Sorted Arrival Times:", arr1);
console.log("Swapped Burst Times:", arr2);

let completion = [];
let turnaround = [];
let waiting = [];

// Calculate Completion Time (CT)
completion[0] = arr1[0] + arr2[0]; 
for (let i = 1; i < arr1.length; i++) {
    completion[i] = Math.max(arr1[i], completion[i - 1]) + arr2[i];
}

// Calculate Turnaround Time (TAT) and Waiting Time (WT)
for (let i = 0; i < arr1.length; i++) {
    turnaround[i] = completion[i] - arr1[i];
    waiting[i] = turnaround[i] - arr2[i];
}

console.log("Completion Time:", completion);
console.log("Turnaround Time:", turnaround);
console.log("Waiting Time:", waiting);