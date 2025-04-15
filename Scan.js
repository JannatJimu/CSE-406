function elevatorDiskScheduling(requests, head, direction = "up", diskSize = 300) {
    let seekSequence = [];
    let seekCount = 0;

    requests.sort((a, b) => a - b);

    let left = requests.filter(r => r < head);
    let right = requests.filter(r => r >= head);

    if (direction === "up") {
        for (let i = 0; i < right.length; i++) {
            seekSequence.push(right[i]);
        }

        for (let i = left.length - 1; i >= 0; i--) {
            seekSequence.push(left[i]);
        }
    } else {
        for (let i = left.length - 1; i >= 0; i--) {
            seekSequence.push(left[i]);
        }

        for (let i = 0; i < right.length; i++) {
            seekSequence.push(right[i]);
        }
    }

    let current = head;
    for (let i = 0; i < seekSequence.length; i++) {
        seekCount += Math.abs(seekSequence[i] - current);
        current = seekSequence[i];
    }

    console.log(`Seek Sequence: ${seekSequence.join(" -> ")}`);
    console.log(`Total Seek Operations: ${seekCount}`);
}
  
const requestSequence = [137, 240, 179, 75, 118, 29, 15, 51];
const head = 55;

elevatorDiskScheduling(requestSequence, head, "up");
