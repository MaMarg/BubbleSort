var SortingAlgorithms = /** @class */ (function () {
    function SortingAlgorithms() {
    }
    SortingAlgorithms.prototype.simpleBubbleSort = function (list) {
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
    SortingAlgorithms.prototype.optimizedBubblesort = function (list) {
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
    SortingAlgorithms.prototype.insertionSort = function (list) {
        var length = list.length;
        for (var i = 1; i < length; i++) {
            var current = list[i];
            var j = i - 1;
            while (j >= 0 && list[j] > current) {
                list[j + 1] = list[j];
                j--;
            }
            list[j + 1] = current;
        }
        return list;
    };
    SortingAlgorithms.prototype.shuffleList = function (list) {
        var currentIndex = list.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = list[currentIndex];
            list[currentIndex] = list[randomIndex];
            list[randomIndex] = temporaryValue;
        }
    };
    return SortingAlgorithms;
}());
var sortingMethods = new SortingAlgorithms();
function dateFormatter(milliseconds) {
    return milliseconds / 1000;
}
function performSortAndDisplayDuration(list, htmlId, sortingMethod, sortingName) {
    sortingMethods.shuffleList(list);
    var paragraph = document.getElementById(htmlId);
    if (!paragraph) {
        console.error('Paragraph-Element nicht gefunden');
        return;
    }
    var startTime = performance.now();
    sortingMethod(list);
    var endTime = performance.now();
    paragraph.innerHTML = "Dauer " + sortingName + ": " + dateFormatter(endTime - startTime) + " Sekunden";
    paragraph.style.display = "block";
}
document.getElementById("start-comparing-algorithms").addEventListener("click", function () {
    var list = [];
    var listLength = document.getElementById("array_length");
    for (var i = 1; i < parseInt(listLength.value) + 1; i++) {
        list.push(i);
    }
    var simpleBubblesortCheckbox = document.getElementById("simple-bubblesort");
    if (simpleBubblesortCheckbox.checked) {
        performSortAndDisplayDuration(list, "duration-simple-bubblesort", sortingMethods.simpleBubbleSort, "einfacher Bubblesort");
    }
    var optimiedBubblesortCheckbox = document.getElementById("optimized-bubblesort");
    if (optimiedBubblesortCheckbox.checked) {
        performSortAndDisplayDuration(list, "duration-optimized-bubblesort", sortingMethods.optimizedBubblesort, "optimierter Bubblesort");
    }
    var insertionSortCheckbox = document.getElementById("insertionsort");
    if (insertionSortCheckbox.checked) {
        performSortAndDisplayDuration(list, "duration-insertion-sort", sortingMethods.insertionSort, "Insertion-Sort");
    }
});
