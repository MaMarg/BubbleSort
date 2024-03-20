class SortingAlgorithms {
    simpleBubbleSort(list: number[]) {
        let listLength = list.length
        for (let i = listLength; i > 1; i--) {
            for (let j = 0; j < listLength - 1; j++) {
                if (list[j] > list[j + 1]) {
                    [list[j], list[j + 1]] = [list[j + 1], list[j]]
                }
            }
        }
    }

    optimizedBubblesort(list: number[]) {
        let listLength: number = list.length
        let swapped: boolean
        do {
            swapped = false;
            for (let i: number = 0; i < listLength - 1; i = i + 1) {
                if (list[i] > list[i + 1]) {
                    [list[i], list[i + 1]] = [list[i + 1], list[i]]
                    swapped = true;
                }
            }
            listLength = listLength - 1;
        } while (swapped);
    }

    insertionSort(list: number[]) {
        let length = list.length;
        for (let i = 1; i < length; i++) {
            let current = list[i];
            let j = i - 1;
            while (j >= 0 && list[j] > current) {
                list[j + 1] = list[j];
                j--;
            }
            list[j + 1] = current;
        }
        return list;
    }

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
}

let sortingMethods = new SortingAlgorithms()

document.getElementById("start-comparing-algorithms").addEventListener("click", () => {
    let list = []
    let listLength = document.getElementById("array_length") as HTMLInputElement
    for (let i = 1; i < parseInt(listLength.value) + 1; i++) {
        list.push(i)
    }
    console.log(list)

    let simpleBubblesortCheckbox = document.getElementById("simple-bubblesort") as HTMLInputElement
    if (simpleBubblesortCheckbox.checked) {
        //alert(1)
    }

    let optimiedBubblesortCheckbox = document.getElementById("optimized-bubblesort") as HTMLInputElement
    if (optimiedBubblesortCheckbox.checked) {
        //alert(2)
    }

    let insertionSortCheckbox = document.getElementById("insertionsort") as HTMLInputElement
    if (insertionSortCheckbox.checked) {
        //alert(3)
    }
})