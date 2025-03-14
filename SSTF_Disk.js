function sstf(sequence, head) {
    let totalDistance = 0;
    let remainingRequests = [...sequence];
    
    while (remainingRequests.length > 0) {
        
        let distances = remainingRequests.map(request => Math.abs(request - head));
        let minDistanceIndex = distances.indexOf(Math.min(...distances));
     
        totalDistance += distances[minDistanceIndex];
        head = remainingRequests[minDistanceIndex];
        
        remainingRequests.splice(minDistanceIndex, 1);
    }
    
    return totalDistance;
}

let sequence = [176, 79, 34, 60, 92, 11, 41, 114];
let head = 50;

let totalDistance = sstf(sequence, head);
console.log("Total Distance Traveled: " + totalDistance);
