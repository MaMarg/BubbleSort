let currentStep = 0;
let amountPasses = 0;
let currentLength = 0;
let swapped = false;
class BubbleSortVaraints {
    sorting = false
    nextSwap = false

    //Full Sorting Script
    bubbleSortFull(list: Array<number>, listLength:number) {

        // initialize if length given was 0
        if (listLength == 0){
            listLength = list.length
            currentLength = listLength
        }
        // reference to use class property inside of the functions
        let self = this;
        // tasklist to keep the started Timouts to kill them later
        let nextTaskList: Array<ReturnType<typeof setTimeout>> = []
        // interrupts the outer loop if sorting is false
        if (!self.sorting) return

        function bubbleSortPass(i: number) {
            // stop at current step
            if (!self.sorting) {
                currentStep = i
                // clear collected Timeouts
                for (let j = 0; j < nextTaskList.length; j++) {
                    console.log("killing tasks now")
                    let nextTask = nextTaskList[j]
                    clearTimeout(nextTask[0])
                }
                canvasData.drawSticks(list);
                self.drawTextBubblesortFull(list);
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
            if (i < listLength - 2) {
                let timer = setTimeout(function () {
                    bubbleSortPass(i + 1);
                }, 100);
                // collect reference to kill later
                nextTaskList.push(timer)
                //if at the end of the list -> start a new pass
                //dont make a new one if you already made list.length - 1 amount of passes
            } else if ((i >= listLength - 2) && (amountPasses < list.length - 1 )) {
                currentLength = listLength - 1
                setTimeout(function () {
                    bubbleSortVariants.bubbleSortFull(list, currentLength);
                }, 50);
                currentStep = 0
                amountPasses = amountPasses + 1
            } else {
                currentStep = 0
                canvasData.drawSticks(list, true)
                switchPlayStepBtn(false)
            }
        }

        bubbleSortPass(currentStep);
    }
    
    //Optimized Bubblesort Script (stop if havent swapped and not checking already sorted part)
    bubbleSortShort(list: Array<number>,listLength: number) {
        // set current list length
        // use whole length if called without currentlength
        if (listLength == 0){
           listLength = list.length
           currentLength = listLength 
        } 
        swapped = false
        
        // reference for self
        let self = this
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
                self.drawTextBubblesortShort(list);
                return
            }

            //draw the canvas anew with the highlight on the current step
            canvasData.drawSticks(list);
            
            /* the main algorithm
            if a an element is bigger then the following, swap them
            the list ends with the biggest element to the far right*/
            currentStep = i;
            if (list[i] > list[i + 1]) {
                let tempPos = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tempPos;
                // if you swapped set swapped true -> next pass will happen
                swapped = true
            }
            
            //if not at the end of list yet -> call function with the next position
            if (i < listLength - 2) {
                let timer = setTimeout(function () {
                    bubbleSortPass(i + 1);
                }, 100);
                // collect reference to kill later
                nextTaskList.push(timer)
            //if at the end of the list -> start a new pass
            //only if you swapped during the last pass
            } else if ((i >= listLength - 2) && (swapped)) {
                currentLength = listLength - 1
                setTimeout(function () {
                    bubbleSortVariants.bubbleSortShort(list,currentLength);
                }, 50);
                currentStep = 0
                amountPasses = amountPasses + 1
            // if you are at the end and havent swapped, be done with sorting
            } else {
                currentStep = 0
                canvasData.drawSticks(list, true)
                switchPlayStepBtn(false)
                self.clearTextBubbleSortStep()
            }
        }
        
        bubbleSortPass(currentStep);
    }
    
    //Step Sorting Script for the basic Bubblesort
    bubbleSortFullStep(list: Array<number>, listLength : number) {
        let self = this
        self.nextSwap = false
        // if havent run a pass yet, listLength is the full length of the list
        if (amountPasses == 0) listLength = list.length
        // if the currentLength is 0 initialize current length 
        //it should only be zero before the first start of sorting
        if (currentLength == 0) currentLength = list.length


        // if your algorithm says swap next singlestep press just swaps and redraws


        function stepFunction(i: number) { 
            
            /* the main algorithm
            if a an element is bigger then the following, swap them
            the list ends with the biggest element to the far right*/
            if (list[i] > list[i + 1]){
                self.nextSwap = true
                swapStepFunction(i)
            } else {
                //if not at the end of list yet move currentStep along
                if (i < currentLength - 2) {
                    currentStep = i + 1
                    //draw the canvas anew with the highlight on the current step
                    canvasData.drawSticks(list);
                    //if at the end of the list -> start a new pass
                    //dont make a new one if you already made list.length - 1 amount of passes
                } else if ((i >= currentLength - 2) && (amountPasses < list.length - 1 )) {
                    currentStep = 0
                    amountPasses = amountPasses + 1
                    currentLength = currentLength - 1 
                    //draw the canvas anew with the highlight on the current step
                    canvasData.drawSticks(list);
                    // if already made list.length -1 amount of passes
                    // be done with sorting
                } else {
                    currentStep = 0
                    //draw the canvas anew with the highlight on the current step
                    canvasData.drawSticks(list, true)
                    self.clearTextBubbleSortStep()
                    switchPlayStepBtn(false)
                    self.nextSwap = false
                    return
                }
                self.nextSwap = false
            }
            
            // draw the text for the step
            self.drawTextBubblesortFull(list)
        }
        
        // function to swaps the sticks and then redraw
        function swapStepFunction(i:number){
            // swap
            let tempPos = list[i]
            list[i] = list[i + 1]
            list[i + 1] = tempPos
            // redraw
            canvasData.drawSticks(list)
        }

        
        stepFunction(currentStep);
    }

    //Step Sorting Script for the Optimized Bubblesort
    bubbleSortShortStep(list: Array<number>, listLength : number) {

        // selfreference to use the class stuff
        // nextswap to color specific things later
        let self = this
        self.nextSwap = false

        // if havent run a pass yet, listLength is the full length of the list
        if (amountPasses == 0) listLength = list.length
        // if the currentLength is 0 initialize current length 
        //it should only be zero before the first start of sorting
        if (currentLength == 0) currentLength = list.length

        function stepFunction(i: number) { 
            /* the main algorithm
            if a an element is bigger then the following, swap them
            the list ends with the biggest element to the far right*/
            if (list[i] > list[i + 1]){
                self.nextSwap = true
                swapped = true
                swapStepFunction(i)
            } else {
                //if not at the end of list yet move currentStep along
                if (i < currentLength - 2) {
                    currentStep = i + 1
                    //draw the canvas anew with the highlight on the current step
                    canvasData.drawSticks(list);
                    //if at the end of the list and swapped-> start a new pass
                    //dont make a new one if you havent swapped -> its already sorted
                } else if ((i >= currentLength - 2) && (swapped)) {
                    currentStep = 0
                    swapped = false
                    amountPasses = amountPasses + 1
                    currentLength = currentLength - 1 
                    //draw the canvas anew with the highlight on the current step
                    canvasData.drawSticks(list);
                    // if the list is sorted be done
                } else {
                    currentStep = 0
                    //draw the canvas anew with the highlight on the current step
                    canvasData.drawSticks(list, true)
                    self.clearTextBubbleSortStep()
                    switchPlayStepBtn(false)
                    self.nextSwap = false
                    return
                }
                self.nextSwap = false
            }
            
            // draw the text for the step
            self.drawTextBubblesortShort(list)
        }

        // function to swaps the sticks and then redraw
        function swapStepFunction(i:number){
            // swap
            let tempPos = list[i]
            list[i] = list[i + 1]
            list[i + 1] = tempPos
            // redraw
            canvasData.drawSticks(list)
        }

        stepFunction(currentStep);
    }

    // get the element containing the explanation of the current step
    paragraph = document.getElementById("highlighted-text") as HTMLDivElement
    
    // clears the descriptor for the current step
    clearTextBubbleSortStep(){
        this.paragraph.innerHTML = ""
    }

    // draws the descriptor for the current step for BubblesortFull
    drawTextBubblesortFull(list: number[]) {
        this.paragraph.innerHTML = ""
        // set text for outer loop
        this.paragraph.innerHTML = `<p id="outerLoopText1" align="right">for (n = A.size; n &gt; 1; n = n - 1){--&gt; die äußere Schleife</p>`
        this.paragraph.innerHTML += `<p id="outerLoopText2" align="right">n ist die Anzahl der noch nötigen Durchgänge.</p>`
        this.paragraph.innerHTML += `<p id="outerLoopText3" align="right">Aktuell ist n = <mark background-color="aqua">${list.length - 1 - amountPasses}</mark>.</p>`
        // set text for inner loop
        this.paragraph.innerHTML += `<p id="innerLoopText1" align="right">for (i = 0; i &lt; n - 1; i = i + 1){--&gt; die innere Schleife</p>`
        this.paragraph.innerHTML += `<p id="innerLoopText2" align="right">i ist der Index des aktuellen Schritts.</p>`
        this.paragraph.innerHTML += `<p id="innerLoopText3" align="right">Aktuell ist i = <mark background-color="aqua">${currentStep}</mark>.</p>`
        // set text for comparison
        this.paragraph.innerHTML += `<p id="comparisonText1" align="right">if (A[i] &gt; A[i+1]){--&gt;Vergleich der Werte</p>`
        this.paragraph.innerHTML += `<p id="comparisonText2" align="right">Der aktuelle (${list[currentStep]}) und der nächste Wert (${list[currentStep + 1]}) werden verglichen.</p>`
        this.paragraph.innerHTML += `<p id="comparisonText3" align="right">Das <mark background-color="aqua">${(list[currentStep] > list[currentStep + 1]) ? "aktuelle" : "nächste"}</mark> Element ist größer.</p>`
        this.paragraph.innerHTML += `<p id="comparisonText4" align="right">Es wird <mark background-color="aqua">${(list[currentStep] > list[currentStep + 1]) ? "getauscht" : "nicht getauscht"}</mark>.</p>`
    }

    // draw the descriptor for the current step for Bubblesort Short
    drawTextBubblesortShort(list: number[]) {
        this.paragraph.innerHTML = ""
        // set text for outer loop
        this.paragraph.innerHTML = `<p id="outerLoopText1" align="right">while (swapped){--&gt; die äußere Schleife (fußgesteuert)</p>`
        this.paragraph.innerHTML += `<p id="outerLoopText2" align="right">Es wird gesprüft ob irgendwann in diesem Durchgang getauscht wurde.</p>`
        this.paragraph.innerHTML += `<p id="outerLoopText3" align="right">Falls Nein, ist die Liste auf jeden Fall fertig sortiert.</p>`
        this.paragraph.innerHTML += `<p id="outerLoopText4" align="right">In diesem Durchgang ist <mark background-color="aqua">${(swapped) ? "bereits getauscht worden" : "noch nicht getauscht worden"}</mark>.</p>`
        // set text for inner loop
        this.paragraph.innerHTML += `<p id="innerLoopText1" align="right">for (i = 0; i &lt; n - 1; i = i + 1){--&gt; die innere Schleife</p>`
        this.paragraph.innerHTML += `<p id="innerLoopText2" align="right">i ist der Index des aktuellen Schritts.</p>`
        this.paragraph.innerHTML += `<p id="innerLoopText3" align="right">Aktuell ist i = <mark background-color="aqua">${currentStep}</mark>.</p>`
        // set text for comparison
        this.paragraph.innerHTML += `<p id="comparisonText1" align="right">if (A[i] &gt; A[i+1]){--&gt;Vergleich der Werte</p>`
        this.paragraph.innerHTML += `<p id="comparisonText2" align="right">Der aktuelle (${list[currentStep]}) und der nächste Wert (${list[currentStep + 1]}) werden verglichen.</p>`
        this.paragraph.innerHTML += `<p id="comparisonText3" align="right">Das <mark background-color="aqua">${(list[currentStep] > list[currentStep + 1]) ? "aktuelle" : "nächste"}</mark> Element ist größer.</p>`
        this.paragraph.innerHTML += `<p id="comparisonText4" align="right">Es wird <mark background-color="aqua">${(list[currentStep] > list[currentStep + 1]) ? "getauscht" : "nicht getauscht"}</mark>.</p>`
    }
}


//this class contains the drawing / optical bits
class Canvas {
    canvas = document.getElementById("canvas-bubblesort") as HTMLCanvasElement
    canvasContext = this.canvas.getContext("2d")
    stickWidth = 20
    stickBaseLength = 10
    stickPadding = 2

    // shuffles the values in the default list
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

    // draws the canvas with the hightlighted sticks
    drawSticks(list: number[], sorted?: boolean, unSorted?:boolean) {
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
                // decide on stick color
                // highlight the current step in red and the following stick in orange
                // everything else is gray
                // if its done sorting everything is green
                // the already sorted part  is green too

                //sorted parts in green
                let unsortedLength = (unSorted) ? list.length : currentLength
                if ((sorted) || (i >= unsortedLength)){
                   this.canvasContext.fillStyle = "#106010" 
                //stick at current position in orange if its currently the swap step
                } else if ((i == currentStep) && (bubbleSortVariants.nextSwap)) {
                    this.canvasContext.fillStyle = "#de6040"
                // stick at next position in red if its currently the swap step
                } else if ((i - 1 == currentStep) && (bubbleSortVariants.nextSwap)) {
                    this.canvasContext.fillStyle = "#801010"
                // stick at current position in red
                } else if (i == currentStep) {
                    this.canvasContext.fillStyle = "#801010"
                // stick at next position in orange
                } else if (i - 1 == currentStep){
                    this.canvasContext.fillStyle = "#de6040"
                // if nothing special gray
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

// switch PlayPauseButton and Step Button on and off
function switchPlayStepBtn(setActive: boolean){
    let playPauseButton= document.getElementById("play_or_pause-sorting") as HTMLButtonElement
    if (playPauseButton) playPauseButton.disabled = !setActive
    let stepForwardButton= document.getElementById("single-step") as HTMLButtonElement
    if (stepForwardButton) stepForwardButton.disabled = !setActive
}


let bubbleSortVariants = new BubbleSortVaraints()
let canvasData = new Canvas()
let list = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
let chosePredefindedList: boolean
let myList: number[]
let algorithmValue = "bubblesort-Full"


// Generate new shuffled default list (1-20)
let generateListButton = document.getElementById("generate-list")
if (generateListButton) {
    generateListButton.onclick = () => {
        bubbleSortVariants.sorting = false
        currentStep = 0
        currentLength = 0
        amountPasses = 0
        canvasData.shuffleList(list)
        chosePredefindedList = true
        canvasData.drawSticks(list, false, true)

        // enable algorithm-select if not already
        let algorithm = document.getElementById("algorithm-select_select") as HTMLSelectElement
        if (algorithm) {
            if (algorithm.disabled == true) {
                algorithm.disabled = false
            }
        } else {
            alert("You are calling this script from the wrong place")
            return
        }
        switchPlayStepBtn(true)
        bubbleSortVariants.clearTextBubbleSortStep()
    }
}


// get new list from Input
let createListButton = document.getElementById("create-list")
if (createListButton) {
    createListButton.onclick = () => {
        let inputElement = document.getElementById("own-list") as HTMLInputElement
        // replace/remove all whitespaces, split at "," , parse the input into array of floats
        myList = (inputElement.value.replace(/\s/g, '').split(",").map(numStr => parseFloat(numStr)))
        for (let i = myList.length - 1; i >= 0; i--) {
            if (isNaN(myList[i])) {
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
        currentLength = 0
        amountPasses = 0
        canvasData.drawSticks(myList, false, true)
        bubbleSortVariants.clearTextBubbleSortStep()

        // enable algorithm-select if not already
        let algorithm = document.getElementById("algorithm-select_select") as HTMLSelectElement
        if (algorithm) {
            if (algorithm.disabled == true) {
                algorithm.disabled = false
            }
        } else {
            alert("You are calling this script from the wrong place")
            return
        }
        switchPlayStepBtn(true)
    }
}

// play/pause button
let playPauseButton = document.getElementById("play_or_pause-sorting") as HTMLButtonElement
if (playPauseButton) {
    playPauseButton.onclick = () => {
        playPauseButton.innerHTML = bubbleSortVariants.sorting ? "<i class=\"fas fa-play\"></i>" : "<i class=\"fas fa-pause\"></i>"
        // select the right list
        let chosenList = chosePredefindedList ? list : myList
        // switch the sorting state
        bubbleSortVariants.sorting = !bubbleSortVariants.sorting
        // get the selected algorithm and disable the select so it cant be changed mid-sorting
        let algorithm = document.getElementById("algorithm-select_select") as HTMLSelectElement
        if (algorithm) {
            if (algorithm.disabled == false) {
                algorithmValue = algorithm.value
                algorithm.disabled = true
            }
        } else {
            alert("You are calling this script from the wrong place")
            return
        }

        // if in state play, disable step button, else enable
        let stepForwardButton = document.getElementById("single-step") as HTMLButtonElement
        if (stepForwardButton){
            stepForwardButton.disabled = bubbleSortVariants.sorting
        } else {
            alert("how did you get here?")
            return
        }

        // if the button was in state play, start sorting with the selected algorithm
        if (bubbleSortVariants.sorting) {
            // clear text if there still was some
            bubbleSortVariants.clearTextBubbleSortStep()
            if (algorithmValue == "bubblesort-Full"){
                bubbleSortVariants.bubbleSortFull(chosenList,currentLength)
            } else if (algorithmValue == "bubblesort-Short"){
                bubbleSortVariants.bubbleSortShort(chosenList,currentLength)
            } else {
                alert("how?")
                return
            }
        }
    }
}

// single step forward button
let  stepForwardButton = document.getElementById("single-step")
if (stepForwardButton){
    stepForwardButton.onclick = () => {
        let chosenList = chosePredefindedList ? list : myList
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
        if (algorithmValue == "bubblesort-Full"){
            bubbleSortVariants.bubbleSortFullStep(chosenList,currentLength)
        } else if (algorithmValue == "bubblesort-Short"){
            bubbleSortVariants.bubbleSortShortStep(chosenList,currentLength)
        } else {
            alert("how?")
            return
        }
    }
}
    
// TODO the button with the switch pseudo
// TODO the optimised pseudo
// TODO optics
