class BubbleSortVaraints {
    bubleSortFull(list: Array<number>) {
        let listLength = list.length
        for (let i = listLength; i > 1; i--) {
            for (let j = 0; j < listLength - 1; j++) {
                if (list[j] > list[j + 1]) {
                    [list[j], list[j + 1]] = [list[j + 1], list[j]]
                }
            }
        }
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

    predefinedList = [3, 10, 4, 2, 9, 5, 6, 8, 7, 1]

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

    drawSticks() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.predefinedList.length; i++) {
            let stickX = (i * (this.stickWidth + this.stickPadding));
            let lengthExtender = this.predefinedList[i] * 20;
            let stickLength = (this.stickMaxLength + lengthExtender)
            this.canvasContext.beginPath();
            this.canvasContext.rect((stickX + this.stickPadding), (298 - stickLength), this.stickWidth, stickLength);
            this.canvasContext.fillStyle = "#808080";
            this.canvasContext.fill();
            this.canvasContext.closePath();
        }
        this.shuffleList(this.predefinedList)
    }
}

let bubbleSortVariants = new BubbleSortVaraints()
let canvasData = new Canvas()

document.getElementById("generate-list").onclick = function () {
    canvasData.drawSticks()
}

document.getElementById("start-sorting").onclick = function () {
    bubbleSortVariants.bubleSortFull(canvasData.predefinedList)
    canvasData.drawSticks()
}