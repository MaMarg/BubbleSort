var BubbleSortVaraints = /** @class */ (function () {
    function BubbleSortVaraints() {
    }
    BubbleSortVaraints.prototype.bubleSortFull = function (list) {
        var _a;
        var listLength = list.length;
        for (var i = listLength; i > 1; i--) {
            for (var j = 0; j < listLength - 1; j++) {
                if (list[j] > list[j + 1]) {
                    _a = [list[j + 1], list[j]], list[j] = _a[0], list[j + 1] = _a[1];
                }
            }
        }
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
        this.stickWidth = 10;
        this.stickMaxLength = 10;
        this.stickPadding = 2;
        this.predefinedList = [3, 10, 4, 2, 9, 5, 6, 8, 7, 1];
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
    Canvas.prototype.drawSticks = function () {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.predefinedList.length; i++) {
            var stickX = (i * (this.stickWidth + this.stickPadding));
            var lengthExtender = this.predefinedList[i] * 20;
            var stickLength = (this.stickMaxLength + lengthExtender);
            this.canvasContext.beginPath();
            this.canvasContext.rect((stickX + this.stickPadding), (298 - stickLength), this.stickWidth, stickLength);
            this.canvasContext.fillStyle = "#808080";
            this.canvasContext.fill();
            this.canvasContext.closePath();
        }
        this.shuffleList(this.predefinedList);
    };
    return Canvas;
}());
var bubbleSortVariants = new BubbleSortVaraints();
var canvasData = new Canvas();
document.getElementById("generate-list").onclick = function () {
    canvasData.drawSticks();
};
document.getElementById("start-sorting").onclick = function () {
    bubbleSortVariants.bubleSortFull(canvasData.predefinedList);
    canvasData.drawSticks();
};
