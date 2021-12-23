---
title: 2 归并排序的基本实现
icon: shipin
category: 排序算法
tags:
  - 排序算法
  - 分而治之
  - 归并排序
---

## :tv: **视频教程**

建议使用 1.5 倍速观看。

+ [4-1 排序算法的稳定性（04:18）](https://www.bilibili.com/video/BV1D64y1B76c?p=1)
+ [4-2 归并排序的基本思想（03:53）](https://www.bilibili.com/video/BV1D64y1B76c?p=2)
+ [4-3 归并排序与深度优先遍历（03:59）](https://www.bilibili.com/video/BV1D64y1B76c?p=3)
+ [4-4 归并排序与栈（04:15）](https://www.bilibili.com/video/BV1D64y1B76c?p=4)
+ [4-5 归并排序的代码演示与复杂度分析（06:35）](https://www.bilibili.com/video/BV1D64y1B76c?p=5)


::: danger 提示

「归并排序」和「快速排序」是理解「递归」思想的非常好的学习材料。在学习的过程中，可以重点理解：递归完成以后，合并两个有序数组的这一步骤，想清楚程序的执行流程。即：递归函数执行完成以后，我们还可以做点事情。因此，「归并排序」和「快速排序」非常重要，一定要掌握。

:::

## 归并排序的基本思想

归并排序的基本思想是「分治算法」，「分治算法」我通常是用「曹冲称象」的故事来理解的。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gwzfno6a71g30h709017j.gif)

合并两个有序数组。类似把两个已经按照身高排好序的队伍合并成一队，每次看队伍最前面的同学，选出身高较矮的同学。合并两个有序数组需要借助额外空间，得到更长的有序数组。例如：「力扣」第 88 题：[合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gwzfnr7j9rg30g0054458.gif)



这是我们首次接触 **递归算法**。下面我将一步一步展示如何编写递归函数实现归并排序。
## 第 1 步：先写出最顶层函数

我们对下标在 `[0..len - 1]` ，左闭且右闭的这个区间里的元素使用递归的「归并排序」算法。

```java
/**
 * 第 1 步：写出归并排序的外层框架
 */
@Test
public void test05() {
    int[] arr = {8, 7, 6, 5, 4, 3, 2, 1};
    int length = arr.length;
    /**
     * 我们对于归并排序的定义是左闭右闭的，所以第 3 个参数应该使用数组的长度 -1
     */
    mergeSort(arr, 0, length - 1);
    System.out.println(Arrays.toString(arr));
}
```
## 第 2 步：写出递归函数

注意应该先考虑递归终止的条件。

```java
/**
 * 第 2 步：实现归并排序算法（内层框架）这是顶向下的归并排序实现
 * 递归调用的函数的定义是：对 arr 在 [left..right] 这个区间范围内使用归并排序
 * 即对 arr 数组在索引 [left..right] 这个区间内的元素进行归并排序
 * 特别注意：区间的边界 left 和 right 都是可以取到的
 * @param arr   待排序数组
 * @param left  闭区间端点
 * @param right 闭区间端点
 */
private void mergeSort(int[] arr, int left, int right) {
    // 当带排序的部分只有 1 个元素甚至更少的时候，归并排序就终止了，这一步很关键
    // 使用递归进行代码实现的时候，递归到底的情况一定要考虑进来，否则递归就会无限进行下去，在逻辑上一定是错误的
    // 先处理递归到底的情况，即递归终止条件：
    // 1、不形成区间：left > right;
    // 2、形成的区间长度为 1 ：left = right，此时没有必要去"分"，也无法"分"
    if (left >= right) {
        // 只有一个元素的时候，无需任何操作
        return;
    }
    // 使用一分为二的思路，一直递归下去
    // int mid = (left + right) / 2; 这种写法在 left 和 right 是大整数的时候，会发生溢出
    int mid = left + (right - left) / 2;
    
    // 下面这几行代码关于边界值的处理要特别小心，要紧扣自己定义的变量的含义进行逻辑的编写
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    mergeTwoSortedArray(arr, left, mid, right);
}
```

**注意 1**：

首先处理递归到底的情况，这是很关键的：

```java
if (left >= right) {
    return;
}
```

**注意 2**：

取中间值使用 `int mid = left + (right - left) / 2;` 这样可以避免使用 `int mid = (left + right) / 2;` 这种方式导致 `left + right` 越界的情况。

**注意 3**：

下面两段代码第 3 行与第 1、2 两行的关系。

```java
mergeSort(arr, left, mid);
mergeSort(arr, mid + 1, right);
mergeTwoSortedArray(arr, left, mid, right);
```

还可以这样写：

```java
mergeSort(arr, left, mid - 1);
mergeSort(arr, mid , right);
mergeTwoSortedArray(arr, left, mid - 1, right);
```

注意：应该准确理解 `mergeTwoSortedArray` 这个方法的含义，**对于边界值的选择一定要紧扣我们设置的变量的含义**。

## 第 3 步：编写 `mergeTwoSortedArray` 方法

我们要维护归并排序的定义，注意边界值。下图展示了位移的偏移，大家可以自己在草稿纸上用一个小的测试用例找找规律。

![image-20211223042619781](https://tva1.sinaimg.cn/large/008i3skNgy1gxn9o9ocmfj311s0oqabe.jpg)

<CodeGroup>
<CodeGroupItem title="Java">

```java {39}
/**
 * 把两个已经排好序的数组进行合并
 * 第 1 个数组：arr[left..mid]，是排好序的
 * 第 2 个数组：arr[mid + 1..right]，是排好序的
 *
 * @param arr   待排序数组
 * @param left  arr[left..mid] 已经是排好序的
 * @param mid
 * @param right arr[mid + 1..right] 已经是排好序的
 */
private void mergeTwoSortedArray(int[] arr, int left, int mid, int right) {
    // 首先计算出这个数组的长度
    // 因为是左边闭区间，右边闭区间，所以元素的个数就是：右边界 - 左边界 + 1
    int length = right - left + 1;
    // 新建一个数组，赋值，用于比较
    // 这里每进行一次比较，都要 new 一个数组，开销很大
    int[] temp = new int[length];
    // 为新数组赋值
    for (int i = 0; i < length; i++) {
        temp[i] = arr[left + i];
    }
    // 左边数组的起始位置
    int l = 0;
    // 右边数组的起始位置
    int r = mid - left + 1;
    
    // 循环遍历把 arr 在 [left..right] 这个区间重新赋值
    // temp 数组中的元素不动，只是拿来做比较，然后我们一直修改的是 arr 数组在 [left..right] 的值
    for (int i = 0; i < length; i++) {
        // 先考虑如果左边数组用完（越界）的情况
        if (l > mid - left) {
            // 此时 l 遍历完成，就去拼命遍历 r 就好了
            arr[i + left] = temp[r];
            r++;
        } else if (r > length - 1) {
            // 此时 r 遍历完成，就去拼命遍历 l 就好了
            arr[i + left] = temp[l];
            l++;
        } else if (temp[l] <= temp[r]) {
            arr[i + left] = temp[l];
            l++;
        } else {
            arr[i + left] = temp[r];
            r++;
        }
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python {29}
from sorting.examples import GenerateRandomArrayStrategy
from sorting.sorting_util import SortingUtil


class MergeSort:

    def __str__(self):
        return "归并排序"

    def __merge_of_two_sorted_array(self, arr, left, mid, right):
        # Python 中切片即复制，复制到一个临时数组中
        nums_for_compare = arr[left:right + 1]
        i = 0
        j = mid - left + 1
        # 通过 nums_for_compare 数组中设置两个指针 i、j 分别表示两个有序数组的开始
        # 覆盖原始数组
        for k in range(left, right + 1):
            if i > mid - left:
                arr[k] = nums_for_compare[j]
                j += 1
            elif j > right - left:
                arr[k] = nums_for_compare[i]
                i += 1
            elif nums_for_compare[i] <= nums_for_compare[j]:
                # 注意：这里使用 <= 是为了保证归并排序算法的稳定性
                arr[k] = nums_for_compare[i]
                i += 1
            else:
                assert nums_for_compare[i] >= nums_for_compare[j]
                arr[k] = nums_for_compare[j]
                j += 1

    def __merge_sort(self, arr, left, right):
        if left >= right:
            return
        # 这是一个陷阱，如果 left 和 right 都很大的话，left + right 容易越界
        # Python 中整除使用 // 2
        mid = (left + right) // 2
        self.__merge_sort(arr, left, mid)
        self.__merge_sort(arr, mid + 1, right)
        self.__merge_of_two_sorted_array(arr, left, mid, right)

    @SortingUtil.cal_time
    def sort(self, arr):
        """
        归并排序的入口函数
        """
        size = len(arr)
        self.__merge_sort(arr, 0, size - 1)


if __name__ == '__main__':
    # 测试基本的归并排序算法正确
    # SortingUtil.test_sorting_algorithm(MergeSort())

    # 比较插入排序与归并排序，可以看出归并排序快很多
    # SortingUtil.compare_sorting_algorithms(GenerateRandomArrayStrategy(),
    #                                        InsertionSortOptimizer(),
    #                                        MergeSort())

    # 比较归并排序与归并排序的优化
    # SortingUtil.compare_sorting_algorithms(GenerateRandomArrayStrategy(),
    #                                        MergeSort(),
    #                                        MergeSortOptimizer())

    # 测试自底向上的归并排序
    # SortingUtil.test_sorting_algorithm(MergeSortBU())

    # 比较自顶向下的归并排序（递归实现）与自底向上的归并排序（循环实现）
    # 自底向上的归并排序更耗时，因为分割不均匀
    SortingUtil.compare_sorting_algorithms(GenerateRandomArrayStrategy(),
                                           MergeSortOptimizer(),
                                           MergeSortBU())
```

</CodeGroupItem>
</CodeGroup>


::: danger 注意

实现归并排序的时候，要特别注意，不要把这个算法实现成非稳定排序，区别就在 `<=` 和 `<` ，在上面的代码中已经加上了着重号。写 `<=` 表示值相同的时候，位于前面的有序数组里的数先归并回去，保证了稳定性。

:::


## 总结

基本的归并排序的思路其实并不难，可以使用规模较小的数组测试。
