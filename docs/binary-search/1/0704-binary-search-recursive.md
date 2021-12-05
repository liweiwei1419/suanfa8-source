---
title: 1.3 二分查找递归写法
icon: yongyan
category: 二分查找
tags:
  - 减治思想
---

# 二分查找递归写法

::: danger 提示
递归写法仅供参考，实际做题的过程中几乎不会用递归实现二分查找。
:::

**「力扣」第 704 题参考代码**：

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return -1;
        }
        return binarySearch(nums, target, 0, len - 1);
    }
  
	/**
     * 在数组 arr 的子区间 [left..right] 里搜索目标元素
     *
     * @param arr    数组
     * @param target 目标元素
     * @param left   左边界下标，包括 left
     * @param right  右边界下标，包括 right
     * @return
     */
    private static int binarySearch(int[] arr, int target, int left, int right) {
        // 先处理递归到底的情况
        if (left > right) {
            // 不能形成区间，返回 -1 表示没有找到
            return -1;
        }
        int mid = (left + right) / 2;
        if (target == arr[mid]) {
            // 找到了，就将目标元素的索引返回
            return mid;
        } else if (target < arr[mid]) {
            // 既然是有序数组，目标元素的值比中间元素还要小，就应该在中间元素的左边去找
            return binarySearch(arr, target, left, mid - 1);
        } else {
            // 既然是有序数组，目标元素的值比中间元素还要大，就应该在中间元素的右边去找
            return binarySearch(arr, target, mid + 1, right);
        }
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(\log N)$，这里 $N$ 是数组的元素个数，每次排除当前候选区间一半以上的元素，因此是对数级别的时间复杂度；
+ 空间复杂度：$O(\log N)$，这里用到了「递归」，递归需要借助「栈」，「栈」的高度为 $O(\log N)$。

<Utterances />