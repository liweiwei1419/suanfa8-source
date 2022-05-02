---
title: 第 3 节 快速排序（第 1 版代码）
icon: shipin
category: 排序算法
tags:
  - 排序算法
  - 分而治之
  - 快速排序
---

<video src="https://suanfa8.com/files/quick-sort/6-3.mp4" controls="controls" width="800" height="450">
Your browser does not support the video tag.
</video>



**参考代码 1**：

```java
class Solution {
    
    public int[] sortArray(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    private void quickSort(int[] nums, int left, int right) {
        if (left >= right) {
            return;
        }

        int pivotIndex = partition(nums, left, right);
        quickSort(nums, left, pivotIndex - 1);
        quickSort(nums, pivotIndex + 1, right);
    }

    private int partition(int[] nums, int left, int right) {
        int pivot = nums[left];

        int j = left;
        // all in nums[left + 1..j] <= pivot
        // all in nums(j..i) > pivot
        for (int i = left + 1; i <= right; i++){
            if (nums[i] <= pivot) {
                j++;
                swap(nums, i, j);
            }
        }
        swap(nums, left, j);
        return j;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }

}
```

修改定义。

**参考代码 2**：

```java
class Solution {
    
    public int[] sortArray(int[] nums) {
        quickSort(nums, 0, nums.length - 1);
        return nums;
    }

    private void quickSort(int[] nums, int left, int right) {
        if (left >= right) {
            return;
        }

        int pivotIndex = partition(nums, left, right);
        quickSort(nums, left, pivotIndex - 1);
        quickSort(nums, pivotIndex + 1, right);
    }

    private int partition(int[] nums, int left, int right) {
        int pivot = nums[left];

        int j = left + 1;
        // all in nums[left + 1..j) <= pivot
        // all in nums[j..i) > pivot
        for (int i = left + 1; i <= right; i++){
            if (nums[i] <= pivot) {
                swap(nums, i, j);
                j++;
            }
        }
        swap(nums, left, j - 1);
        return j - 1;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }

}
```