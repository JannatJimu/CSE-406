function cscanDiskScheduling(requests, head, diskSize = 200) {
    let total = 0;
    requests.sort((a, b) => a - b);

    let left = [], right = [];
    for (let req of requests) {
        if (req < head) left.push(req);
        else right.push(req);
    }

    for (let i = 0; i < right.length; i++) {
        total += Math.abs(head - right[i]);
        head = right[i];
    }

    if (head !== diskSize - 1) {
        total += Math.abs(head - (diskSize - 1));
        head = diskSize - 1;
    }

    total += diskSize - 1;
    head = 0;

    for (let i = 0; i < left.length; i++) {
        total += Math.abs(head - left[i]);
        head = left[i];
    }

    console.log("Total distance:", total);
}

const requests = [0, 14, 41, 53, 65, 67, 98, 122, 124, 183, 199];
const head = 53;
cscanDiskScheduling(requests, head);
