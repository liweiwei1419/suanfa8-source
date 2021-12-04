---
title: 插入排序的优化 📺 
---

# 插入排序的优化 <Badge text="视频" type="warning"/>

很 ==重要== 的 内容。

## :tv: **视频教程**

建议使用 1.5 倍速观看。

* [2-9 插入排序的优化（06:25）](https://www.bilibili.com/video/BV1y44y1q7MJ?p=9)


**说明**：

本节内容来自《算法（第 4 版）》第 2 章 《排序》之「实验题 2.1.25」（中文版 P168）。

![image-20211202105353656](https://tva1.sinaimg.cn/large/008i3skNgy1gwzav2evuej317m02g3yz.jpg)


## 先暂存再后移

「将一个数字插入一个有序的数组」这一步，可以不使用逐步交换，使用先赋值给「临时变量」，然后「适当的元素」后移，空出一个位置，最后把「临时变量」赋值给这个空位。


![](https://tva1.sinaimg.cn/large/008i3skNgy1gwyurgwqeng30af04odkr.gif)


其实这种插入方式更像插入排序本来的样子。《算法导论》上的图更形象。

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gwyuyr6mtqj30hc0gg0tr.jpg" alt="《算法导论》第 2.1 节 插入排序" style="zoom:50%;" />

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">

``` java {7,8}
public class Solution {

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        // 循环不变量：将 nums[i] 插入到区间 [0, i) 使之成为有序数组
        for (int i = 1; i < len; i++) {
            // 先暂存这个元素，然后之前元素逐个后移，留出空位
            int temp = nums[i];
            int j = i;
            // 注意边界 j > 0
            while (j > 0 && nums[j - 1] > temp) {
                nums[j] = nums[j - 1];
                j--;
            }
            nums[j] = temp;
        }
        return nums;
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Python">

``` python
from sorting.sorting_util import SortingUtil
from sorting.examples import GenerateRandomArrayStrategy
from sorting.examples import GenerateNearlySortedArrayStrategy

from sorting.selecting_sort import SelectionSort


class InsertionSort:

    def __str__(self):
        return "插入排序"

    @SortingUtil.cal_time
    def sort(self, arr):
        """
        插入排序第 1 版：相比选择排序而言，插入排序的内层循环可以提前终止。
        但是这个版本有个缺点，交换次数太多，每一次交换做了 3 次赋值。
        """
        size = len(arr)
        for i in range(1, size):
            for j in range(i, 0, -1):
                # 只要前面的比后面的“严格”大，就要交换它们的位置
                if arr[j - 1] > arr[j]:
                    arr[j], arr[j - 1] = arr[j - 1], arr[j]
                else:
                    break


class InsertionSortOptimizer:

    def __str__(self):
        return "插入排序（优化）"

    @SortingUtil.cal_time
    def sort(self, arr):
        size = len(arr)
        for i in range(1, size):
            # 每一轮先让这个元素去别的地方休息一下
            temp = arr[i]
            # 从 i 的前一个元素开始看
            j = i
            while j > 0 and arr[j - 1] > temp:
                arr[j] = arr[j - 1]
                j -= 1
            # 因为已经看到索引 j 的值小于等于 temp 了
            # 因此空出来的位置是 j，要把 temp 放在这里
            arr[j] = temp


if __name__ == '__main__':
    # 测试插入排序算法的正确性
    # SortingUtil.test_sorting_algorithm(InsertionSort(), GenerateRandomArrayStrategy(5000))

    # 比较插入排序算法与选择排序
    # SortingUtil.compare_sorting_algorithms(GenerateRandomArrayStrategy(5000),
    #                                        SelectionSort(),
    #                                        InsertionSort())

    # 验证插入排序算法对于几乎有序的数组，越有序越好
    SortingUtil.test_sorting_algorithm(InsertionSortOptimizer(), GenerateRandomArrayStrategy(5000))

    SortingUtil.compare_sorting_algorithms(GenerateRandomArrayStrategy(5000),
                                           SelectionSort(),
                                           InsertionSort(),
                                           InsertionSortOptimizer())

    SortingUtil.compare_sorting_algorithms(GenerateNearlySortedArrayStrategy(5000),
                                           SelectionSort(),
                                           InsertionSort(),
                                           InsertionSortOptimizer())
```

</CodeGroupItem>
</CodeGroup>

::: danger 注意

编码的时候如果不小心，可能会把数组的值修改，建议多调试。

:::

## 参考资料

+ [《算法 4》英文网站](https://algs4.cs.princeton.edu/21elementary/)

<Utterances />