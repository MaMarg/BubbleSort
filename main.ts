class BubbleSortVaraints {

    /*let listLength = list.length;
for (let i = listLength; i > 1; i--) {
    for (let j = 0; j < listLength - 1; j++) {
        if (list[j] > list[j + 1]) {
            [list[j], list[j + 1]] = [list[j + 1], list[j]];
            canvasData.drawSticks(list);
        }
    }
}*/
    sorting = false

    bubbleSortFull(list: Array<number>) {
        if (!this.sorting) return

        function bubbleSortPass(i: number) {
            if (list[i] > list[i + 1]) {
                let tempPos = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tempPos;
                canvasData.drawSticks(list);
            }

            if (i < list.length) {
                setTimeout(function () {
                    bubbleSortPass(i + 1);
                }, 50);
            } else if (i >= list.length) {
                setTimeout(function () {
                    bubbleSortVariants.bubbleSortFull(list);
                }, 50);
            }
        }

        bubbleSortPass(0);
    }

    bubbleSortShort(list: Array<number>) {
        let listLength = list.length
        let swapped: boolean
        do {
            swapped = false;
            for (let i = 0; i < listLength - 1; i = i + 1) {
                if (list[i] > list[i + 1]) {
                    [list[i], list[i + 1]] = [list[i + 1], list[i]]
                    swapped = true;
                }
            }
            listLength = listLength - 1;
        } while (swapped);
    }
}

class Canvas {
    canvas = document.getElementById("canvas-bubblesort") as HTMLCanvasElement
    canvasContext = this.canvas.getContext("2d")
    stickWidth = 10
    stickMaxLength = 10
    stickPadding = 2

    shuffleList(list: number[]) {
        let currentIndex = list.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = list[currentIndex];
            list[currentIndex] = list[randomIndex];
            list[randomIndex] = temporaryValue;
        }
    }

    drawSticks(list: number[]) {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let i = 0; i < list.length; i++) {
            let stickX = (i * (this.stickWidth + this.stickPadding))
            let lengthExtender = list[i] * 10
            let stickLength = (this.stickMaxLength + lengthExtender)
            this.canvasContext.beginPath()
            this.canvasContext.rect((stickX + this.stickPadding), (298 - stickLength), this.stickWidth, stickLength)
            this.canvasContext.fillStyle = "#808080"
            this.canvasContext.fill()
            this.canvasContext.closePath()
        }
    }
}

let bubbleSortVariants = new BubbleSortVaraints()
let canvasData = new Canvas()
let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

document.getElementById("generate-list").onclick = function () {
    bubbleSortVariants.sorting = false
    canvasData.shuffleList(list)
    canvasData.drawSticks(list)
}

document.getElementById("play_or_pause-sorting").onclick = function () {
    bubbleSortVariants.sorting = !bubbleSortVariants.sorting
    if (bubbleSortVariants.sorting) {
        bubbleSortVariants.bubbleSortFull(list)
    }
}