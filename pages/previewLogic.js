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
    return SortingAlgorithms;
}());
document.getElementById("start-comparing-algorithms").addEventListener("click", function () {
    var list = [];
    var listLength = document.getElementById("array_length");
    for (var i = 1; i < parseInt(listLength.value) + 1; i++) {
        list.push(i);
    }
    console.log(list);
    var simpleBubblesortCheckbox = document.getElementById("simple-bubblesort");
    if (simpleBubblesortCheckbox.checked) {
        //alert(1)
    }
    var optimiedBubblesortCheckbox = document.getElementById("optimized-bubblesort");
    if (optimiedBubblesortCheckbox.checked) {
        //alert(2)
    }
    var insertionSortCheckbox = document.getElementById("insertionsort");
    if (insertionSortCheckbox.checked) {
        //alert(3)
    }
});
