---
title: 4.3 归并排序的优化
icon: shipin
category: 排序算法
tags:
  - 排序算法
  - 分而治之
  - 归并排序
---


## :tv: **视频教程**

建议使用 1.5 倍速观看。

+ [4-6 归并排序的优化（03:26）](https://www.bilibili.com/video/BV1D64y1B76c?p=6)
+ [4-7 归并排序总结（08:53）](https://www.bilibili.com/video/BV1D64y1B76c?p=7)


## 优化的方向

### 优化 1

在「小区间」里转向使用「插入排序」，Java 源码里面也有类似这种操作，「小区间」的长度是个超参数，需要测试决定，我这里参考了 JDK 源码，选择了 $7$。

### 优化 2

 在「两个数组」本身就是有序的情况下，无需合并。

### 优化 3

全程使用一份临时数组进行「合并两个有序数组」的操作，避免创建临时数组和销毁的消耗，避免计算下标偏移量。


「归并排序」比「快速排序」好的一点是，它借助了额外空间，可以实现「稳定排序」，Java 里对于「对象数组」的排序任务，就是使用归并排序（的升级版 TimSort，在这里就不多做介绍）。

「归并排序」也有「原地归并排序」和「不使用递归」的归并排序，但是我个人觉得不常用，编码、调试都有一定难度。

::: danger 注意

递归、分治处理问题的思想在基础算法领域是非常常见的，建议多练习编写「归并排序」学习递归思想，了解递归的细节，熟悉分治的思想。

::: 


根据上一节的的 3 个优化，写出代码。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int[] sortArray(int[] nums) {
        int len = nums.length;

        int[] temp = new int[len];
        mergeSort(nums, 0, len - 1, temp);
        return nums;
    }

    private void mergeSort(int[] nums, int left, int right, int[] temp) {
        // 优化 1 ：改成插入排序
        if (right - left + 1 <= 16) {
            insertionSort(nums, left, right);
            return;
        }

        int mid = (left + right) / 2;
        mergeSort(nums, left, mid, temp);
        mergeSort(nums, mid + 1, right, temp);

        // 优化 2：如果数组已经有序，无须再合并
        if (nums[mid] <= nums[mid + 1]) {
            return;
        }
        mergeOfTwoSortedArray(nums, left, right, temp, mid);
    }

    private void insertionSort(int[] nums, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int temp = nums[i];
            int j;
            for (j = i; j > left && nums[j - 1] > temp; j--) {
                nums[j] = nums[j - 1];
            }
            nums[j] = temp;
        }
    }


    private void mergeOfTwoSortedArray(int[] nums, int left, int right, int[] temp, int mid) {
        // nums[left..mid] 有序
        // nums[mid + 1..right] 有序

        for (int i = left; i <= right; i++) {
            temp[i] = nums[i];
        }
        int i = left;
        int j = mid + 1;
        int k = left;
        while (i <= mid && j <= right) {
            if (temp[i] <= temp[j]) {
                nums[k] = temp[i];
                k++;
                i++;
            } else {
                nums[k] = temp[j];
                k++;
                j++;
            }
        }

        while (i <= mid) {
            nums[k] = temp[i];
            k++;
            i++;
        }

        while (j <= right) {
            nums[k] = temp[j];
            k++;
            j++;
        }
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Java">

```java
public class Solution {

    /**
     * 列表大小等于或小于该大小，将优先于 mergeSort 使用插入排序
     */
    private static final int INSERTION_SORT_THRESHOLD = 7;

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        int[] temp = new int[len];
        mergeSort(nums, 0, len - 1, temp);
        return nums;
    }

    /**
     * 对数组 nums 的子区间 [left..right] 进行归并排序
     *
     * @param nums
     * @param left
     * @param right
     * @param temp  用于合并两个有序数组的辅助数组，全局使用一份，避免多次创建和销毁
     */
    private void mergeSort(int[] nums, int left, int right, int[] temp) {
        // 小区间使用插入排序
        if (right - left <= INSERTION_SORT_THRESHOLD) {
            insertionSort(nums, left, right);
            return;
        }

        int mid = left + (right - left) / 2;
        // Java 里有更优的写法，在 left 和 right 都是大整数时，即使溢出，结论依然正确
        // int mid = (left + right) >>> 1;

        mergeSort(nums, left, mid, temp);
        mergeSort(nums, mid + 1, right, temp);
        // 如果数组的这个子区间本身有序，无需合并
        if (nums[mid] <= nums[mid + 1]) {
            return;
        }
        mergeOfTwoSortedArray(nums, left, mid, right, temp);
    }

    /**
     * 对数组 arr 的子区间 [left..right] 使用插入排序
     *
     * @param arr   给定数组
     * @param left  左边界，能取到
     * @param right 右边界，能取到
     */
    private void insertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int temp = arr[i];
            int j = i;
            while (j > left && arr[j - 1] > temp) {
                arr[j] = arr[j - 1];
                j--;
            }
            arr[j] = temp;
        }
    }

    /**
     * 合并两个有序数组：先把值复制到临时数组，再合并回去
     *
     * @param nums
     * @param left
     * @param mid   [left..mid] 有序，[mid + 1..right] 有序
     * @param right
     * @param temp  全局使用的临时数组
     */
    private void mergeOfTwoSortedArray(int[] nums, int left, int mid, int right, int[] temp) {
        System.arraycopy(nums, left, temp, left, right + 1 - left);

        int i = left;
        int j = mid + 1;

        for (int k = left; k <= right; k++) {
            if (i == mid + 1) {
                nums[k] = temp[j];
                j++;
            } else if (j == right + 1) {
                nums[k] = temp[i];
                i++;
            } else if (temp[i] <= temp[j]) {
                // 注意写成 < 就丢失了稳定性（相同元素原来靠前的排序以后依然靠前）
                nums[k] = temp[i];
                i++;
            } else {
                // temp[i] > temp[j]
                nums[k] = temp[j];
                j++;
            }
        }
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python

class MergeSortOptimizer:

    def __str__(self):
        return "归并排序的优化"

    def __merge_of_two_sorted_array(self, arr, left, mid, right):
        # 将原数组 [left..right] 区间内的元素复制到辅助数组
        for index in range(left, right + 1):
            nums_for_compare[index] = arr[index]

        i = left
        j = mid + 1
        for k in range(left, right + 1):
            if i == mid + 1:
                # i 用完了，就拼命用 j
                arr[k] = nums_for_compare[j]
                j += 1
            elif j > right:
                # j 用完了，就拼命用 i
                arr[k] = nums_for_compare[i]
                i += 1
            elif nums_for_compare[i] <= nums_for_compare[j]:
                arr[k] = nums_for_compare[i]
                i += 1
            else:
                assert nums_for_compare[i] > nums_for_compare[j]
                arr[k] = nums_for_compare[j]
                j += 1

    def insert_sort_for_sub_interval(self, arr, left, right):
        """多次赋值的插入排序"""
        for i in range(left + 1, right + 1):
            temp = arr[i]
            j = i
            # 注意：这里 j 最多到 left
            while j > left and arr[j - 1] > temp:
                arr[j] = arr[j - 1]
                j -= 1
            arr[j] = temp

    def __merge_sort(self, arr, left, right):
        if right - left <= 15:
            self.insert_sort_for_sub_interval(arr, left, right)
            return
        mid = left + (right - left) // 2
        self.__merge_sort(arr, left, mid)
        self.__merge_sort(arr, mid + 1, right)
        if arr[mid] <= arr[mid + 1]:
            return
        self.__merge_of_two_sorted_array(arr, left, mid, right)

    @SortingUtil.cal_time
    def sort(self, arr):
        global nums_for_compare
        size = len(arr)
        nums_for_compare = list(range(size))
        self.__merge_sort(arr, 0, size - 1)
```

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

+ 时间复杂度：$O(N \log N)$，这里 $N$ 是数组的长度；
+ 空间复杂度：$O(N)$，辅助数组与输入数组的长度相同。

## 经典问题

+ 《剑指 Offer》第 51 题：[数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)，照着归并排序的思路就能写出来；
+ 「力扣」第 315 题：[计算右侧小于当前元素的个数](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/)，它们是一个问题。
