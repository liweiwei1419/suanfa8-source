---
title: 3 明确循环不变量写出「快速排序」
icon: yongyan
category: 循环不变量
tags:
  - 数组
  - 循环不变量
---


我写「快速排序」不是靠背的。每次写「快速排序」我都会在脑子里或者在草稿纸上写写画画。

随机一个元素作为基准元素 `pivot`，可以选择区间里的第一个元素或者最后一个元素，我们这里选择第一个元素 `nums[left]`。遍历一次待排序的区间 `nums[left..right]`，使得：


```
nums[left + 1..lt] < pivot
nums[lt + 1..i) == pivot
nums[gt..right] >= pivot
```

这样的一句话就是循环不变量。

将 `nums[i]` 的值和 `pivot` 进行比较，有 3 种情况，应该先交换还是先右移，就很清楚了。

接着继续对 `nums[left..lt - 1]` 和 `nums[gt..right]` 执行同样的过程。为什么第 1 个区间到 `lt - 1`，第二个区间的开头是 `gt` 这一点完全由上面的定义决定。

（这里只是举例，不花篇幅和大家详细讲解快速排序了。）

**参考代码**：

```java
import java.util.Random;

public class Solution {

    private static final Random RANDOM = new Random();

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        quickSort(nums, 0, len - 1);
        return nums;
    }

    private void quickSort(int[] nums, int left, int right) {
        // 小区间改成插入排序
        if (right - left + 1 <= 16) {
            insertionSort(nums, left, right);
            return;
        }

        // 为了避免递归树偏斜，随机选择元素作为 pivot
        int randomIndex = left + RANDOM.nextInt(right - left + 1);
        swap(nums, left, randomIndex);

        int pivot = nums[left];
        // 循环不变量：把等于 pivot 的元素「挤」到中间
        // nums[left + 1..lt] < pivot
        // nums[lt + 1..i) == pivot
        // nums[gt..right] >= pivot
        int lt = left;
        int gt = right + 1;
        int i = left + 1;
        while (i < gt) {
            if (nums[i] < pivot) {
                lt++;
                swap(nums, lt, i);
                i++;
            } else if (nums[i] == pivot) {
                i++;
            } else {
                gt--;
                swap(nums, i, gt);
            }
        }
        swap(nums, left, lt);
        quickSort(nums, left, lt - 1);
        quickSort(nums, gt, right);
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
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
}
```