const MAX_FRAMES = 3;
const REF_STR_LEN = 7;
const refString = [1, 3, 0, 3, 5, 6, 3];

function fifoPageReplacement() {
    let frames = new Array(MAX_FRAMES).fill(-1);
    let front = 0;
    let pageFaults = 0;
    let pageHits = 0;

    console.log("Page Replacement Sequence (FIFO):");

    for (let i = 0; i < REF_STR_LEN; i++) {
        let found = false;

        for (let j = 0; j < MAX_FRAMES; j++) {
            if (frames[j] === refString[i]) {
                found = true;
                break;
            }
        }

        let frameState = "";

        if (!found) {
            frames[front] = refString[i];
            front = (front + 1) % MAX_FRAMES;
            pageFaults++;
            frameState = frames.map(frame => frame === -1 ? " -" : ` ${frame}`).join(" ");
            console.log(`${frameState} <- Page fault`);
        } else {
            pageHits++;
            frameState = frames.map(frame => frame === -1 ? " -" : ` ${frame}`).join(" ");
            console.log(`${frameState} <- Page hit`);
        }
    }

    console.log(`\nTotal Page Faults (Misses): ${pageFaults}`);
    console.log(`Total Page Hits: ${pageHits}`);
}

fifoPageReplacement();
