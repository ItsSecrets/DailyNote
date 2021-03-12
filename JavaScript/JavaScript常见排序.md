> 原文[出处](https://www.cnblogs.com/onepixel/articles/7674659.html)
# 1. 冒泡排序（Bubble Sort）O(n2)
冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。
## 1. 算法描述
- 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
- 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
- 针对所有的元素重复以上的步骤，除了最后一个；
- 重复步骤1~3，直到排序完成。
## 2. 展示
![](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015223238449-2146169197.gif)

## 3. 代码：

注意两点，第二层循环从`j < len - 1 - i`结束， 比较两个数的大小是`arr[j] > arr[j+1]`比较的 `j和j+1`
```
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
```

# 2.选择排序（Selection Sort） O(n2)
选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中`找到最小（大）元素`，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到`已排序序列`的末尾。以此类推，直到所有元素均排序完毕。 
## 1. 算法描述
n个记录的直接选择排序可经过n-1趟直接选择排序得到有序结果。具体算法描述如下：
 - 初始状态：无序区为R[1..n]，有序区为空；
 - 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
 - n-1趟结束，数组有序化了。

## 2. 动图展示
![](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015224719590-1433219824.gif)

## 3. 代码
注意点：第一趟开始，认为第一个元素就是最小元素，然后去跟后面比对，有必他小的就记录下来，这一趟比对完了交换位置。然后只有一个元素的有序队列就形成了，然后从第二个开始进行上面的操作，只到所有的元素都完成排序
```
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
```

## 3. 插入排序（Insertion Sort）
插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
### 1. 算法描述
一般来说，插入排序都采用in-place在数组上实现。具体算法描述如下：

 - 从第一个元素开始，该元素可以认为已经被排序；
 - 取出下一个元素，在已经排序的元素序列中从后向前扫描；
 - 如果该元素（已排序）大于新元素，将该元素移到下一位置；
 - 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
 - 将新元素插入到该位置后；
 - 重复步骤2~5。

### 2. 动图演示
![](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015225645277-1151100000.gif)

### 3. 代码实现
 * 插入排序, 默认选择第一个元素为有序队列，然后从index = 1 开始取元素去有序队列找对应位置插入
 * index 从 1 开始 preIndex >= 0 && arr[preIndex] > current成立说明还没找到对应的位置，
 * 需要继续找，找到对应位置之后arr[preIndex+1] = current;插入
```
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

```

## 4. [快速排序](https://blog.csdn.net/zhao529670074/article/details/80776253)（Quick Sort）
快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。

### 1. 算法描述
快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）。具体算法描述如下：
 - 从数列中挑出一个元素，称为 “基准”（pivot）；
 - 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
 - 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。