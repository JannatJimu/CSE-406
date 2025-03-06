function fcfsDiskScheduling(requests, head) {
    let totalSeek = 0;
    let currentPosition = head;

    for (let request of requests) {
        totalSeek += Math.abs(currentPosition - request);
        currentPosition = request;
    }

    return totalSeek;
}


const requests = [176, 79, 34, 60, 92, 11, 41, 114];
const initialHead = 50; 


const totalSeekOperations = fcfsDiskScheduling(requests, initialHead);
console.log("Total number of seek operations:", totalSeekOperations);