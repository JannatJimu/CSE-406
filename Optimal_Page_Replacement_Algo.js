const REF_STR_LEN = 14;
const MAX_FRAMES = 4;

function predict(ref, frames, index) {
    let farthest = index, replaceIndex = -1;

    for (let i = 0; i < MAX_FRAMES; i++) {
        let j = ref.indexOf(frames[i], index);
        if (j === -1) return i;
        if (j > farthest) {
            farthest = j;
            replaceIndex = i;
        }
    }
    return replaceIndex === -1 ? 0 : replaceIndex;
}

function optimalPageReplacement() {
    const ref = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 3];
    let frames = Array(MAX_FRAMES).fill(-1), pageFaults = 0, hits = 0, filled = 0;

    console.log("Page Replacement Sequence (Optimal):");

    for (let i = 0; i < REF_STR_LEN; i++) {
        if (frames.includes(ref[i])) {
            hits++;
            console.log(`${frames.map(f => f === -1 ? " -" : ` ${f}`).join(" ")} <- Page hit`);
            continue;
        }

        if (filled < MAX_FRAMES) {
            frames[filled++] = ref[i];
        } else {
            frames[predict(ref, frames, i + 1)] = ref[i];
        }

        pageFaults++;
        console.log(`${frames.map(f => f === -1 ? " -" : ` ${f}`).join(" ")} <- Page fault`);
    }

    console.log(`\nTotal Page Faults (Misses): ${pageFaults}`);
    console.log(`Total Page Hits: ${hits}`);
}

optimalPageReplacement();
