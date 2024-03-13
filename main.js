var BubbleSortVaraints = /** @class */ (function () {
    function BubbleSortVaraints() {
        /*let listLength = list.length;
    for (let i = listLength; i > 1; i--) {
        for (let j = 0; j < listLength - 1; j++) {
            if (list[j] > list[j + 1]) {
                [list[j], list[j + 1]] = [list[j + 1], list[j]];
                canvasData.drawSticks(list);
            }
        }
    }*/
        this.sorting = false;
    }
    BubbleSortVaraints.prototype.bubbleSortFull = function (list) {
        if (!this.sorting)
            return;
        function bubbleSortPass(i) {
            if (list[i] > list[i + 1]) {
                var tempPos = list[i];
                list[i] = list[i + 1];
                list[i + 1] = tempPos;
                canvasData.drawSticks(list);
            }
            if (i < list.length) {
                setTimeout(function () {
                    bubbleSortPass(i + 1);
                }, 50);
            }
            else if (i >= list.length) {
                setTimeout(function () {
                    bubbleSortVariants.bubbleSortFull(list);
                }, 50);
            }
        }
        bubbleSortPass(0);
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
            this.canvasContext.fillStyle = "#808080";
            this.canvasContext.fill();
            this.canvasContext.closePath();
        }
    };
    return Canvas;
}());
var bubbleSortVariants = new BubbleSortVaraints();
var canvasData = new Canvas();
var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
document.getElementById("generate-list").onclick = function () {
    canvasData.shuffleList(list);
    canvasData.drawSticks(list);
};
document.getElementById("play_or_pause-sorting").onclick = function () {
    bubbleSortVariants.sorting = !bubbleSortVariants.sorting;
    if (bubbleSortVariants.sorting) {
        bubbleSortVariants.bubbleSortFull(list);
    }
};
