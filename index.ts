class BubbleSortVaraints {
    bubleSortFull(list: Array<number>) {
        let listLength: number = list.length
        for (let i: number = listLength; i > 1; i--) {
            for (let j: number = 0; j < listLength - 1; j++) {
                if (list[j] > list[j + 1]) {
                    [list[j], list[j + 1]] = [list[j + 1], list[j]]
                }
            }
        }
    }

    bubbleSortShort(list: Array<number>) {
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
}