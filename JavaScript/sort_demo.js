
/**
 * 冒泡排序是一种简单的排序算法。
 * 它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。
 * 走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。
 * 这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
 * @param {*} arr 
 */
function bubbleSort(arr) {
    var len = arr.length;
    for(var i = 0; i < len - 1; i++) {
        for(var j = 0; j < len - 1 - i; j++) {
            if(arr[j] > arr[j+1]) {       // 相邻元素两两对比
                var temp = arr[j+1];       // 元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// console.log(bubbleSort([3,1,2,4,10,6,5]));

/**
 * 选择排序
 * @param {*} arr 
 */
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for(var i = 0; i < len - 1; i++) {
        minIndex = i;
        for(var j = i + 1; j < len; j++) {
            if(arr[j] < arr[minIndex]) {    // 寻找最小的数
                minIndex = j;                // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
} 

// console.log(selectionSort([3,1,2,4,10,6,5]));

/**
 * 插入排序, 默认选择第一个元素为有序队列，然后从index = 1 开始取元素去有序队列找对应位置插入
 * index 从 1 开始 preIndex >= 0 && arr[preIndex] > current成立说明还没找到对应的位置，
 * 需要继续找，找到对应位置之后arr[preIndex+1] = current;插入
 * @param {*} arr 
 */
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var index = 1; index < len; index++) {
        preIndex = index - 1;
        current = arr[index];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex = preIndex - 1;
        }

        arr[preIndex+1] = current;
    }
    return arr;
}

// console.log(insertionSort([3,1,2,4,10,6,5]));


function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }

    }
    return items;
}

// first call
let items = [3,1,2,4,10,6,5];
var result = quickSort(items, 0, items.length - 1);
// insertionSort([3,1,2,4,10,6,5])
console.log(result);
