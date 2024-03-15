let currentStep = 0;
let amountPasses = 0;

class BubbleSortVaraints {
    sorting = false

    bubbleSortFull(list: Array<number>) {
        // reference to use class property inside of the functions
        let self = this;
        // tasklist to keep the started Timouts to kill them later
        let nextTaskList: Array<ReturnType<typeof setTimeout> > = []
        // interrupts the outer loop if sorting is false
        if (!self.sorting) return
        
        function bubbleSortPass(i: number) {
            // stop at current step
            if (!self.sorting){
                currentStep = i
                console.log("stopped")
                // clear collected Timeouts
                for (let j=0; j < nextTaskList.length; j++){
                    console.log("killing tasks now")
                    let nextTask = nextTaskList[j]
                    clearTimeout(nextTask[0])
                }
                return
            } 
            
            /* der eigentliche algorithmus
            wenn der aktuelle größer ist als der folgende wird gewechselt
            dadurch ist ganz rechts am ende der größte*/
            currentStep = i;
            if (list[i] > list[i + 1]) {
                let tempPos = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tempPos;
            }
            //draw the canvas anew with the highlight on the current step
            canvasData.drawSticks(list);
            
            //if not at the end of list yet -> call function with the next position
            if (i < list.length - 1) {
                let timer = setTimeout(function () {
                    bubbleSortPass(i + 1);
                }, 100);
                // collect reference to kill later
                nextTaskList.push(timer)
                //if at the end of the list -> start a new pass
                //dont make a new one if you already made list.length - 1 amount of passes
            } else if ((i >= list.length - 1) && (amountPasses < list.length - 1 )) {
                setTimeout(function () {
                    bubbleSortVariants.bubbleSortFull(list);
                }, 50);
                currentStep = 0
                amountPasses = amountPasses + 1 
            } else {
                currentStep = 0
                canvasData.drawSticks(list)
            }
        }
        
        bubbleSortPass(currentStep);
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
    stickWidth = 20
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
            if (i == currentStep || i - 1 == currentStep) {
                this.canvasContext.fillStyle = "#801010"
            } else {
                this.canvasContext.fillStyle = "#808080"
            }
            this.canvasContext.fill()
            this.canvasContext.closePath()
        }
    }
}

function checkPattern(input: any, pattern: RegExp) {
    return pattern.test(input);
}

let bubbleSortVariants = new BubbleSortVaraints()
let canvasData = new Canvas()
let list = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
let chosePredefindedList: boolean
let myList: number[]

document.getElementById("generate-list").onclick = () => {
    bubbleSortVariants.sorting = false
    currentStep = 0
    canvasData.shuffleList(list)
    canvasData.drawSticks(list)
}

document.getElementById("create-list").onclick = () => {
    let inputElement = document.getElementById("own-list") as HTMLInputElement
    myList = (inputElement.value.split(",").map(numStr => parseFloat(numStr)))
    if (!checkPattern(myList, new RegExp(/^([1-9]|[1][0-9])(,\s*[1-9]|[1][0-9])*$/))) {
        alert("Bitte geben Sie gültige Werte an!\nGültige Werte: Zahlen von 1 bis 20")
        return
    }
    console.log(myList)

    bubbleSortVariants.sorting = false
    chosePredefindedList = false
    canvasData.drawSticks(myList)
}

document.getElementById("play_or_pause-sorting").onclick = () => {
    let chosenList = chosePredefindedList ? list : myList
    bubbleSortVariants.sorting = !bubbleSortVariants.sorting
    if (bubbleSortVariants.sorting) {
        bubbleSortVariants.bubbleSortFull(chosenList)
    }
}
