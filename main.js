var currentStep = 0;
var amountPasses = 0;
var currentLength = 0;
var swapped = false;
var BubbleSortVaraints = /** @class */ (function () {
    function BubbleSortVaraints() {
        this.sorting = false;
        this.nextSwap = false;
        // TODO make it look nice
        // draws the descriptor for the current step for BubblesortFull
        this.paragraph = document.getElementById("highlighted-text");
    }
    //Full Sorting Script
    BubbleSortVaraints.prototype.bubbleSortFull = function (list, listLength) {
        // initialize if length given was 0
        if (listLength == 0) {
            listLength = list.length;
            currentLength = listLength;
        }
        // reference to use class property inside of the functions
        var self = this;
        // tasklist to keep the started Timouts to kill them later
        var nextTaskList = [];
        // interrupts the outer loop if sorting is false
        if (!self.sorting)
            return;
        function bubbleSortPass(i) {
            // stop at current step
            if (!self.sorting) {
                currentStep = i;
                // clear collected Timeouts
                for (var j = 0; j < nextTaskList.length; j++) {
                    console.log("killing tasks now");
                    var nextTask = nextTaskList[j];
                    clearTimeout(nextTask[0]);
                }
                canvasData.drawSticks(list);
                self.drawTextBubblesortFull(list);
                return;
            }
            /* the main algorithm
            if a an element is bigger then the following, swap them
            the list ends with the biggest element to the far right*/
            currentStep = i;
            if (list[i] > list[i + 1]) {
                var tempPos = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tempPos;
            }
            //draw the canvas anew with the highlight on the current step
            canvasData.drawSticks(list);
            //if not at the end of list yet -> call function with the next position
            if (i < listLength - 2) {
                var timer = setTimeout(function () {
                    bubbleSortPass(i + 1);
                }, 100);
                // collect reference to kill later
                nextTaskList.push(timer);
                //if at the end of the list -> start a new pass
                //dont make a new one if you already made list.length - 1 amount of passes
            }
            else if ((i >= listLength - 2) && (amountPasses < list.length - 1)) {
                currentLength = listLength - 1;
                setTimeout(function () {
                    bubbleSortVariants.bubbleSortFull(list, currentLength);
                }, 50);
                currentStep = 0;
                amountPasses = amountPasses + 1;
            }
            else {
                currentStep = 0;
                canvasData.drawSticks(list, true);
                switchPlayStepBtn(false);
            }
        }
        bubbleSortPass(currentStep);
    };
    //Optimized Bubblesort Script (stop if havent swapped and not checking already sorted part)
    BubbleSortVaraints.prototype.bubbleSortShort = function (list, listLength) {
        // set current list length
        // use whole length if called without currentlength
        if (listLength == 0) {
            listLength = list.length;
            currentLength = listLength;
        }
        swapped = false;
        // reference for self
        var self = this;
        // tasklist to keep the started Timouts to kill them later
        var nextTaskList = [];
        // interrupts the outer loop if sorting is false
        if (!self.sorting)
            return;
        function bubbleSortPass(i) {
            // stop at current step
            if (!self.sorting) {
                currentStep = i;
                // clear collected Timeouts
                for (var j = 0; j < nextTaskList.length; j++) {
                    console.log("killing tasks now");
                    var nextTask = nextTaskList[j];
                    clearTimeout(nextTask[0]);
                }
                return;
            }
            //draw the canvas anew with the highlight on the current step
            canvasData.drawSticks(list);
            /* the main algorithm
            if a an element is bigger then the following, swap them
            the list ends with the biggest element to the far right*/
            currentStep = i;
            if (list[i] > list[i + 1]) {
                var tempPos = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tempPos;
                // if you swapped set swapped true -> next pass will happen
                swapped = true;
            }
            //if not at the end of list yet -> call function with the next position
            if (i < listLength - 2) {
                var timer = setTimeout(function () {
                    bubbleSortPass(i + 1);
                }, 100);
                // collect reference to kill later
                nextTaskList.push(timer);
                //if at the end of the list -> start a new pass
                //only if you swapped during the last pass
            }
            else if ((i >= listLength - 2) && (swapped)) {
                currentLength = listLength - 1;
                setTimeout(function () {
                    bubbleSortVariants.bubbleSortShort(list, currentLength);
                }, 50);
                currentStep = 0;
                amountPasses = amountPasses + 1;
                // if you are at the end and havent swapped, be done with sorting
            }
            else {
                currentStep = 0;
                canvasData.drawSticks(list, true);
                switchPlayStepBtn(false);
            }
        }
        bubbleSortPass(currentStep);
    };
    //Step Sorting Script for the basic Bubblesort
    BubbleSortVaraints.prototype.bubbleSortFullStep = function (list, listLength) {
        var self = this;
        self.nextSwap = false;
        // if havent run a pass yet, listLength is the full length of the list
        if (amountPasses == 0)
            listLength = list.length;
        // if the currentLength is 0 initialize current length 
        //it should only be zero before the first start of sorting
        if (currentLength == 0)
            currentLength = list.length;
        // if your algorithm says swap next singlestep press just swaps and redraws
        function stepFunction(i) {
            /* the main algorithm
            if a an element is bigger then the following, swap them
            the list ends with the biggest element to the far right*/
            if (list[i] > list[i + 1]) {
                self.nextSwap = true;
                swapStepFunction(i);
            }
            else {
                //if not at the end of list yet move currentStep along
                if (i < currentLength - 2) {
                    currentStep = i + 1;
                    //draw the canvas anew with the highlight on the current step
                    canvasData.drawSticks(list);
                    //if at the end of the list -> start a new pass
                    //dont make a new one if you already made list.length - 1 amount of passes
                }
                else if ((i >= currentLength - 2) && (amountPasses < list.length - 1)) {
                    currentStep = 0;
                    amountPasses = amountPasses + 1;
                    currentLength = currentLength - 1;
                    //draw the canvas anew with the highlight on the current step
                    canvasData.drawSticks(list);
                    // if already made list.length -1 amount of passes
                    // be done with sorting
                }
                else {
                    currentStep = 0;
                    //draw the canvas anew with the highlight on the current step
                    canvasData.drawSticks(list, true);
                    self.drawTextBubblesortFull(list, true);
                    switchPlayStepBtn(false);
                }
                self.nextSwap = false;
            }
            // draw the text for the step
            self.drawTextBubblesortFull(list);
        }
        // function to swaps the sticks and then redraw
        function swapStepFunction(i) {
            // swap
            var tempPos = list[i];
            list[i] = list[i + 1];
            list[i + 1] = tempPos;
            // redraw
            canvasData.drawSticks(list);
        }
        stepFunction(currentStep);
    };
    //Step Sorting Script for the Optimized Bubblesort
    BubbleSortVaraints.prototype.bubbleSortShortStep = function (list, listLength) {
        // if havent run a pass yet, listLength is the full length of the list
        if (amountPasses == 0)
            listLength = list.length;
        // if the currentLength is 0 initialize current length 
        //it should only be zero before the first start of sorting
        if (currentLength == 0)
            currentLength = list.length;
        function stepFunction(i) {
            //draw the canvas anew with the highlight on the current step
            canvasData.drawSticks(list);
            /* the main algorithm
            if a an element is bigger then the following, swap them
            the list ends with the biggest element to the far right*/
            if (list[i] > list[i + 1]) {
                var tempPos = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tempPos;
                // if you swapped set swapped true -> next pass will happen
                swapped = true;
            }
            //if not at the end of unsorted area, move currentStep along
            if (i < currentLength - 2) {
                currentStep = i + 1;
                //if at the end of the list and swapped in this pass -> start a new pass
            }
            else if ((i >= currentLength - 2) && (swapped)) {
                currentStep = 0;
                amountPasses = amountPasses + 1;
                currentLength = currentLength - 1;
                swapped = false;
                // if you havent swapped, be done with sorting
            }
            else {
                currentStep = 0;
                canvasData.drawSticks(list, true);
                switchPlayStepBtn(false);
            }
        }
        stepFunction(currentStep);
    };
    BubbleSortVaraints.prototype.drawTextBubblesortFull = function (list, clear) {
        if (clear) {
            this.paragraph.innerHTML = "";
            return;
        }
        // set text for outer loop
        this.paragraph.innerHTML = "<p id=\"outerLoopText1\" align=\"right\">for (n = A.size; n &gt; 1; n = n - 1){--&gt; die \u00E4u\u00DFere Schleife</p>";
        this.paragraph.innerHTML += "<p id=\"outerLoopText2\" align=\"right\">n ist die Anzahl der noch n\u00F6tigen Durchg\u00E4nge.</p>";
        this.paragraph.innerHTML += "<p id=\"outerLoopText3\" align=\"right\">Aktuell ist n = <mark background-color=\"aqua\">".concat(list.length - 1 - amountPasses, "</mark>.</p>");
        // set text for inner loop
        this.paragraph.innerHTML += "<p id=\"innerLoopText1\" align=\"right\">for (i = 0; i &lt; n - 1; i = i + 1){--&gt; die innere Schleife</p>";
        this.paragraph.innerHTML += "<p id=\"innerLoopText2\" align=\"right\">i ist der Index des aktuellen Schritts.</p>";
        this.paragraph.innerHTML += "<p id=\"innerLoopText3\" align=\"right\">Aktuell ist i = <mark background-color=\"aqua\">".concat(currentStep, "</mark>.</p>");
        // set text for comparison
        this.paragraph.innerHTML += "<p id=\"comparisonText1\" align=\"right\">if (A[i] &gt; A[i+1]){--&gt;Vergleich der Werte</p>";
        this.paragraph.innerHTML += "<p id=\"comparisonText2\" align=\"right\">Der aktuelle (".concat(list[currentStep], ") und der n\u00E4chste Wert (").concat(list[currentStep + 1], ") werden verglichen.</p>");
        this.paragraph.innerHTML += "<p id=\"comparisonText3\" align=\"right\">Das <mark background-color=\"aqua\">".concat((list[currentStep] > list[currentStep + 1]) ? "aktuelle" : "nächste", "</mark> Element ist gr\u00F6\u00DFer.</p>");
        this.paragraph.innerHTML += "<p id=\"comparisonText4\" align=\"right\">Es wird <mark background-color=\"aqua\">".concat((list[currentStep] > list[currentStep + 1]) ? "getauscht" : "nicht getauscht", "</mark>.</p>");
    };
    return BubbleSortVaraints;
}());
//this class contains the drawing / optical bits
var Canvas = /** @class */ (function () {
    function Canvas() {
        this.canvas = document.getElementById("canvas-bubblesort");
        this.canvasContext = this.canvas.getContext("2d");
        this.stickWidth = 20;
        this.stickBaseLength = 10;
        this.stickPadding = 2;
    }
    // shuffles the values in the default list
    Canvas.prototype.shuffleList = function (list) {
        var currentIndex = list.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = list[currentIndex];
            list[currentIndex] = list[randomIndex];
            list[randomIndex] = temporaryValue;
        }
    };
    // draws the canvas with the hightlighted sticks
    Canvas.prototype.drawSticks = function (list, sorted, unSorted) {
        if (this.canvasContext) {
            this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (var i = 0; i < list.length; i++) {
                // calculated dynamical from canvas width
                // ratio is optimal for stick width = 20 at 700
                var ratioStickWidth = this.stickWidth / 700;
                //similarly the padding
                var ratioPadding = this.stickPadding / 700;
                // calculated dynamical from canvas height
                // ratio is optimal for Base Length = 10 at 300 canvas height
                var ratioStickHeight = this.stickBaseLength / 300;
                // x coordinate for the stick; horizontal padding + base stick width multiplied by their ratios
                var stickX = (i * ((this.canvas.width * ratioStickWidth) + (this.canvas.width * ratioPadding)));
                // length of the stick; value of the stick + 1 for a base length * additional length
                var stickLength = (list[i] + 1) * this.canvas.height * ratioStickHeight;
                this.canvasContext.beginPath();
                // draw the stick
                // canvas 0,0 is top left so
                // y coordinate is canvas height - text height - height of the stick (text height is the same as the width)
                // ratios multiplied for different canvas sizes
                this.canvasContext.rect(stickX + (this.canvas.width * ratioPadding), this.canvas.height - stickLength - (ratioStickWidth * this.canvas.width), this.canvas.width * ratioStickWidth, stickLength);
                // decide on stick color
                // highlight the current step in red and the following stick in orange
                // everything else is gray
                // if its done sorting everything is green
                // the already sorted part  is green too
                //sorted parts in green
                var unsortedLength = (unSorted) ? list.length : currentLength;
                if ((sorted) || (i >= unsortedLength)) {
                    this.canvasContext.fillStyle = "#106010";
                    //stick at current position in orange if its currently the swap step
                }
                else if ((i == currentStep) && (bubbleSortVariants.nextSwap)) {
                    this.canvasContext.fillStyle = "#de6040";
                    // stick at next position in red if its currently the swap step
                }
                else if ((i - 1 == currentStep) && (bubbleSortVariants.nextSwap)) {
                    this.canvasContext.fillStyle = "#801010";
                    // stick at current position in red
                }
                else if (i == currentStep) {
                    this.canvasContext.fillStyle = "#801010";
                    // stick at next position in orange
                }
                else if (i - 1 == currentStep) {
                    this.canvasContext.fillStyle = "#de6040";
                    // if nothing special gray
                }
                else {
                    this.canvasContext.fillStyle = "#808080";
                }
                this.canvasContext.fill();
                this.canvasContext.closePath();
                // dynamical font size depending on canvas height
                // ratio is optimal 16px size at 300 canvas hight
                var ratioText = 16 / 300;
                this.canvasContext.font = (ratioText * this.canvas.height).toString() + "px Arial";
                this.canvasContext.textAlign = "center";
                this.canvasContext.fillText((list[i]).toString(), stickX + (this.canvas.width * ratioPadding) + (this.canvas.width * ratioStickWidth / 2), this.canvas.height);
            }
        }
        else {
            alert("You are calling this script from the wrong place");
        }
    };
    return Canvas;
}());
function checkPattern(input, pattern) {
    return pattern.test(input);
}
// switch PlayPauseButton and Step Button on and off
function switchPlayStepBtn(setActive) {
    var playPauseButton = document.getElementById("play_or_pause-sorting");
    if (playPauseButton)
        playPauseButton.disabled = !setActive;
    var stepForwardButton = document.getElementById("single-step");
    if (stepForwardButton)
        stepForwardButton.disabled = !setActive;
}
var bubbleSortVariants = new BubbleSortVaraints();
var canvasData = new Canvas();
var list = [];
var chosePredefindedList;
var myList;
var algorithmValue = "bubblesort-Full";
// Generate new shuffled default list (1-20)
var generateListButton = document.getElementById("generate-list");
if (generateListButton) {
    generateListButton.onclick = function () {
        bubbleSortVariants.sorting = false;
        currentStep = 0;
        list.length = 0;
        var inputNumber = document.getElementById("array_length");
        var listLength = parseInt(inputNumber.value);
        if (!checkPattern(listLength, new RegExp(/^(1[0-9]|[5-9]|20)$/))) {
            alert("Bitte geben Sie gültige Werte an!\nGültige Werte: Zahlen von 5 bis 20");
            return;
        }
        for (var i = 1; i <= listLength + 1; i++) {
            if (list.length < listLength) {
                list.push(i);
            }
        }
        currentLength = 0;
        amountPasses = 0;
        canvasData.shuffleList(list);
        chosePredefindedList = true;
        canvasData.drawSticks(list, false, true);
        // enable algorithm-select if not already
        var algorithm = document.getElementById("algorithm-select_select");
        if (algorithm) {
            if (algorithm.disabled == true) {
                algorithm.disabled = false;
            }
        }
        else {
            alert("You are calling this script from the wrong place");
            return;
        }
        switchPlayStepBtn(true);
    };
}
// get new list from Input
var createListButton = document.getElementById("create-list");
if (createListButton) {
    createListButton.onclick = function () {
        var inputElement = document.getElementById("own-list");
        // replace/remove all whitespaces, split at "," , parse the input into array of floats
        myList = (inputElement.value.replace(/\s/g, '').split(",").map(function (numStr) { return parseFloat(numStr); }));
        for (var i = myList.length - 1; i >= 0; i--) {
            if (isNaN(myList[i])) {
                myList.splice(i, 1);
            }
            // TODO list length begrenzen
        }
        // old regex string ([1-9]|[1][0-9])(,\s*[1-9]|[1][0-9])*
        if (!checkPattern(myList, new RegExp(/^(?:[1-9]|(1[0-9])|20)(?:,(?:[1-9]|(1[0-9])|20))*$/))) {
            // TODO alert if had to clean list
            alert("Bitte geben Sie gültige Werte an!\nGültige Werte: Zahlen von 1 bis 20");
            return;
        }
        bubbleSortVariants.sorting = false;
        chosePredefindedList = false;
        currentStep = 0;
        currentLength = 0;
        amountPasses = 0;
        canvasData.drawSticks(myList, false, true);
        // enable algorithm-select if not already
        var algorithm = document.getElementById("algorithm-select_select");
        if (algorithm) {
            if (algorithm.disabled == true) {
                algorithm.disabled = false;
            }
        }
        else {
            alert("You are calling this script from the wrong place");
            return;
        }
        switchPlayStepBtn(true);
    };
}
// play/pause button
var playPauseButton = document.getElementById("play_or_pause-sorting");
if (playPauseButton) {
    playPauseButton.onclick = function () {
        playPauseButton.innerHTML = bubbleSortVariants.sorting ? "<i class=\"fas fa-play\"></i>" : "<i class=\"fas fa-pause\"></i>";
        // select the right list
        var chosenList = chosePredefindedList ? list : myList;
        // switch the sorting state
        bubbleSortVariants.sorting = !bubbleSortVariants.sorting;
        // get the selected algorithm and disable the select so it cant be changed mid-sorting
        var algorithm = document.getElementById("algorithm-select_select");
        if (algorithm) {
            if (algorithm.disabled == false) {
                algorithmValue = algorithm.value;
                algorithm.disabled = true;
            }
        }
        else {
            alert("You are calling this script from the wrong place");
            return;
        }
        // if in state play, disable step button, else enable
        var stepForwardButton = document.getElementById("single-step");
        if (stepForwardButton) {
            stepForwardButton.disabled = bubbleSortVariants.sorting;
        }
        else {
            alert("how did you get here?");
            return;
        }
        // if the button was in state play, start sorting with the selected algorithm
        if (bubbleSortVariants.sorting) {
            // clear text if there still was some
            bubbleSortVariants.drawTextBubblesortFull(chosenList, true);
            if (algorithmValue == "bubblesort-Full") {
                bubbleSortVariants.bubbleSortFull(chosenList, currentLength);
            }
            else if (algorithmValue == "bubblesort-Short") {
                bubbleSortVariants.bubbleSortShort(chosenList, currentLength);
            }
            else {
                alert("how?");
                return;
            }
        }
    };
}
// single step forward button
var stepForwardButton = document.getElementById("single-step");
if (stepForwardButton) {
    stepForwardButton.onclick = function () {
        var chosenList = chosePredefindedList ? list : myList;
        // get the selected algorithm and disable the select so it cant be changed mid-sorting
        var algorithm = document.getElementById("algorithm-select_select");
        if (algorithm) {
            if (algorithm.disabled == false) {
                algorithmValue = algorithm.value;
                algorithm.disabled = true;
            }
        }
        else {
            alert("You are calling this script from the wrong place");
            return;
        }
        if (algorithmValue == "bubblesort-Full") {
            bubbleSortVariants.bubbleSortFullStep(chosenList, currentLength);
        }
        else if (algorithmValue == "bubblesort-Short") {
            bubbleSortVariants.bubbleSortShortStep(chosenList, currentLength);
        }
        else {
            alert("how?");
            return;
        }
    };
}
// TODO drawing the switch on slow motion
// TODO the button with the switch pseudo
// TODO the optimised pseudo
// TODO optics
