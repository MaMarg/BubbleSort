var currentStep = 0;
var amountPasses = 0;
var BubbleSortVaraints = /** @class */ (function () {
    function BubbleSortVaraints() {
        this.sorting = false;
    }
    BubbleSortVaraints.prototype.bubbleSortFull = function (list) {
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
                console.log("stopped");
                // clear collected Timeouts
                for (var j = 0; j < nextTaskList.length; j++) {
                    console.log("killing tasks now");
                    var nextTask = nextTaskList[j];
                    clearTimeout(nextTask[0]);
                }
                return;
            }
            /* der eigentliche algorithmus
            wenn der aktuelle größer ist als der folgende wird gewechselt
            dadurch ist ganz rechts am ende der größte*/
            currentStep = i;
            if (list[i] > list[i + 1]) {
                var tempPos = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tempPos;
            }
            //draw the canvas anew with the highlight on the current step
            canvasData.drawSticks(list);
            //if not at the end of list yet -> call function with the next position
            if (i < list.length - 1) {
                var timer = setTimeout(function () {
                    bubbleSortPass(i + 1);
                }, 100);
                // collect reference to kill later
                nextTaskList.push(timer);
                //if at the end of the list -> start a new pass
                //dont make a new one if you already made list.length - 1 amount of passes
            }
            else if ((i >= list.length - 1) && (amountPasses < list.length - 1)) {
                setTimeout(function () {
                    bubbleSortVariants.bubbleSortFull(list);
                }, 50);
                currentStep = 0;
                amountPasses = amountPasses + 1;
            }
            else {
                currentStep = 0;
                canvasData.drawSticks(list);
            }
        }
        bubbleSortPass(currentStep);
    };
    BubbleSortVaraints.prototype.bubbleSortShort = function (list) {
        var _a;
        var listLength = list.length;
        var swapped;
        do {
            swapped = false;
            for (var i = 0; i < listLength - 1; i = i + 1) {
                if (list[i] > list[i + 1]) {
                    _a = [list[i + 1], list[i]], list[i] = _a[0], list[i + 1] = _a[1];
                    swapped = true;
                }
            }
            listLength = listLength - 1;
        } while (swapped);
    };
    return BubbleSortVaraints;
}());
var Canvas = /** @class */ (function () {
    function Canvas() {
        this.canvas = document.getElementById("canvas-bubblesort");
        this.canvasContext = this.canvas.getContext("2d");
        this.stickWidth = 20;
        this.stickMaxLength = 10;
        this.stickPadding = 2;
    }
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
    Canvas.prototype.drawSticks = function (list) {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < list.length; i++) {
            var stickX = (i * (this.stickWidth + this.stickPadding));
            var lengthExtender = list[i] * 10;
            var stickLength = (this.stickMaxLength + lengthExtender);
            this.canvasContext.beginPath();
            this.canvasContext.rect((stickX + this.stickPadding), (298 - stickLength), this.stickWidth, stickLength);
            if (i == currentStep || i - 1 == currentStep) {
                this.canvasContext.fillStyle = "#801010";
            }
            else {
                this.canvasContext.fillStyle = "#808080";
            }
            this.canvasContext.fill();
            this.canvasContext.closePath();
        }
    };
    return Canvas;
}());
var bubbleSortVariants = new BubbleSortVaraints();
var canvasData = new Canvas();
var list = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
var chosePredefindedList;
var myList;
document.getElementById("generate-list").onclick = function () {
    bubbleSortVariants.sorting = false;
    currentStep = 0;
    canvasData.shuffleList(list);
    canvasData.drawSticks(list);
};
document.getElementById("create-list").onclick = function () {
    bubbleSortVariants.sorting = false;
    chosePredefindedList = false;
    var inputElement = document.getElementById("own-list");
    myList = (inputElement.value.split(",").map(function (numStr) { return parseFloat(numStr); }));
    canvasData.drawSticks(myList);
};
document.getElementById("play_or_pause-sorting").onclick = function () {
    var chosenList = chosePredefindedList ? list : myList;
    bubbleSortVariants.sorting = !bubbleSortVariants.sorting;
    if (bubbleSortVariants.sorting) {
        bubbleSortVariants.bubbleSortFull(chosenList);
    }
};
