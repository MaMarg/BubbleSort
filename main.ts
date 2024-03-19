let currentStep = 0;
let amountPasses = 0;

class BubbleSortVaraints {
    sorting = false

    //Full Sorting Script
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
                // clear collected Timeouts
                for (let j=0; j < nextTaskList.length; j++){
                    console.log("killing tasks now")
                    let nextTask = nextTaskList[j]
                    clearTimeout(nextTask[0])
                }
                return
            } 
            
            /* the main algorithm
            if a an element is bigger then the following, swap them
            the list ends with the biggest element to the far right*/
            currentStep = i;
            if (list[i] > list[i + 1]) {
                let tempPos = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tempPos;
            }
            //draw the canvas anew with the highlight on the current step
            canvasData.drawSticks(list);
            
            //if not at the end of list yet -> call function with the next position
            if (i < list.length - 2) {
                let timer = setTimeout(function () {
                    bubbleSortPass(i + 1);
                }, 100);
                // collect reference to kill later
                nextTaskList.push(timer)
                //if at the end of the list -> start a new pass
                //dont make a new one if you already made list.length - 1 amount of passes
            } else if ((i >= list.length - 2) && (amountPasses < list.length - 1 )) {
                setTimeout(function () {
                    bubbleSortVariants.bubbleSortFull(list);
                }, 50);
                currentStep = 0
                amountPasses = amountPasses + 1 
            } else {
                currentStep = 0
                canvasData.drawSticks(list)
                //TODO disable sort+ step button because its already sorted, so no point until new list
            }
        }
        
        bubbleSortPass(currentStep);
    }
    
    //Step Sorting Script
    bubbleSortStep(list: Array<number>) {
        
        function bubbleSortStepFunction(i: number) { 
            

            /* the main algorithm
            if a an element is bigger then the following, swap them
            the list ends with the biggest element to the far right*/
            if (list[i] > list[i + 1]) {
                let tempPos = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tempPos;
            }
            //draw the canvas anew with the highlight on the current step
            canvasData.drawSticks(list);
            
            //if not at the end of list yet move currentStep along
            if (i < list.length - 2) {
                currentStep = i + 1

            //if at the end of the list -> start a new pass
            //dont make a new one if you already made list.length - 1 amount of passes
            } else if ((i >= list.length - 2) && (amountPasses < list.length - 1 )) {
                currentStep = 0
                amountPasses = amountPasses + 1 

            // if already made list.length -1 amount of passes
            // be done with sorting
            } else {
                currentStep = 0
                canvasData.drawSticks(list)
                //TODO disable sort+ step button because its already sorted, so no point until new list
            }
        }

        
        bubbleSortStepFunction(currentStep);
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
    stickBaseLength = 10
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
        if (this.canvasContext){
            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
            for (let i = 0; i < list.length; i++) {
                
                // calculated dynamical from canvas width
                // ratio is optimal for stick width = 20 at 700
                let ratioStickWidth = this.stickWidth / 700
                //similarly the padding
                let ratioPadding = this.stickPadding / 700
                
                // calculated dynamical from canvas height
                // ratio is optimal for Base Length = 10 at 300 canvas height
                let ratioStickHeight = this.stickBaseLength / 300;
                
                // x coordinate for the stick; horizontal padding + base stick width multiplied by their ratios
                let stickX = (i * ((this.canvas.width * ratioStickWidth) + (this.canvas.width * ratioPadding)))
                
                // length of the stick; value of the stick + 1 for a base length * additional length
                let stickLength = (list[i] + 1) * this.canvas.height * ratioStickHeight
                this.canvasContext.beginPath()
                // draw the stick
                // canvas 0,0 is top left so
                // y coordinate is canvas height - text height - height of the stick (text height is the same as the width)
                // ratios multiplied for different canvas sizes
                this.canvasContext.rect(stickX + (this.canvas.width * ratioPadding), this.canvas.height - stickLength - (ratioStickWidth * this.canvas.width), this.canvas.width * ratioStickWidth, stickLength)
                //highlight the current step in red and the following stick in less
                if (i == currentStep) {
                    this.canvasContext.fillStyle = "#801010"
                } else if (i - 1 == currentStep){
                    this.canvasContext.fillStyle = "#de6040"
                } else {
                    this.canvasContext.fillStyle = "#808080"
                }
                this.canvasContext.fill()
                this.canvasContext.closePath()
                
                // dynamical font size depending on canvas height
                // ratio is optimal 16px size at 300 canvas hight
                let ratioText = 16 / 300;
                this.canvasContext.font = (ratioText * this.canvas.height).toString() + "px Arial"
                this.canvasContext.textAlign = "center"
                this.canvasContext.fillText((list[i]).toString(), stickX + (this.canvas.width * ratioPadding) + (this.canvas.width * ratioStickWidth / 2), this.canvas.height)
            }
        } else {
            alert("You are calling this script from the wrong place")
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
let algorithmValue = "bubblesort-Full"


// Generate new shuffled default list (1-20)
let generateListButton = document.getElementById("generate-list")
if (generateListButton){
    generateListButton.onclick = () => {
        bubbleSortVariants.sorting = false
        currentStep = 0
        canvasData.shuffleList(list)
        chosePredefindedList = true
        canvasData.drawSticks(list)
        amountPasses = 0

        // enable algorithm-select if not already
        let algorithm = document.getElementById("algorithm-select_select") as HTMLSelectElement
        if (algorithm){
            if (algorithm.disabled == true){
                algorithm.disabled = false
            }
        } else {
            alert("You are calling this script from the wrong place")
            return
        }
        // TODO enable sort + step button if not already
        
    }
}


// get new list from Input
let createListButton = document.getElementById("create-list")
if (createListButton){
    createListButton.onclick = () => {
        let inputElement = document.getElementById("own-list") as HTMLInputElement
        // replace/remove all whitespaces, split at "," , parse the input into array of floats
        myList = (inputElement.value.replace(/\s/g,'').split(",").map(numStr => parseFloat(numStr)))
        for (let i = myList.length - 1; i >=0; i--){
            if (isNaN(myList[i])){
                myList.splice(i, 1)
            }
        // TODO list length begrenzen
        }
        // old regex string ([1-9]|[1][0-9])(,\s*[1-9]|[1][0-9])*
        if (!checkPattern(myList, new RegExp(/^(?:[1-9]|(1[0-9])|20)(?:,(?:[1-9]|(1[0-9])|20))*$/))) {
            // TODO alert if had to clean list
            alert("Bitte geben Sie gültige Werte an!\nGültige Werte: Zahlen von 1 bis 20")
            return
        }
        
        bubbleSortVariants.sorting = false
        chosePredefindedList = false
        currentStep = 0
        canvasData.drawSticks(myList)
        amountPasses = 0

        // enable algorithm-select if not already
        let algorithm = document.getElementById("algorithm-select_select") as HTMLSelectElement
        if (algorithm){
            if (algorithm.disabled == true){
                algorithm.disabled = false
            }
        } else {
            alert("You are calling this script from the wrong place")
            return
        }
        // TODO enable sort + step button if not already
    }
}

// play/pause button
let playPauseButton = document.getElementById("play_or_pause-sorting")
if (playPauseButton){
    playPauseButton.onclick = () => {
        // select the right list
        let chosenList = chosePredefindedList ? list : myList
        // switch the sorting state
        bubbleSortVariants.sorting = !bubbleSortVariants.sorting
        // get the selected algorithm and disable the select so it cant be changed mid-sorting
        let algorithm = document.getElementById("algorithm-select_select") as HTMLSelectElement
        if (algorithm){
            if (algorithm.disabled == false){
                algorithmValue = algorithm.value
                algorithm.disabled = true
            }
        } else {
            alert("You are calling this script from the wrong place")
            return
        }
        // if the button was in state play, start sorting with the selected algorithm
        if (bubbleSortVariants.sorting) {
            if (algorithmValue == "bubblesort-Full"){
                bubbleSortVariants.bubbleSortFull(chosenList)
            } else if (algorithmValue == "bubblesort-Short"){
                bubbleSortVariants.bubbleSortShort(chosenList)
            } else {
                alert("how?")
                return
            }
        }
        // TODO disable step button if playing
    }
}

// single step forward button
let  singleStepButton = document.getElementById("single-step")
if (singleStepButton){
    singleStepButton.onclick = () => {
        let chosenList = chosePredefindedList ? list : myList
        bubbleSortVariants.bubbleSortStep(chosenList)
    }
    // TODO bubblesortstep for other algorithms
}
    