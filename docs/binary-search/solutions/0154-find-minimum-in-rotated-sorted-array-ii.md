---
title: 「力扣」第 154 题：旋转排序数组的最小值 II（困难）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

+ 题目地址：[154. 寻找旋转排序数组中的最小值 II](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)；
+ 题解地址：[二分法 + 分治法（Python 代码、Java 代码）](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/solution/er-fen-fa-fen-zhi-fa-python-dai-ma-by-liweiwei1419/)。

## 题目描述

已知一个长度为 `n` 的数组，预先按照升序排列，经由 `1` 到 `n` 次 **旋转** 后，得到输入数组。例如，原数组 `nums = [0,1,4,4,5,6,7]` 在变化后可能得到：

- 若旋转 `4` 次，则可以得到 `[4,5,6,7,0,1,4]`
- 若旋转 `7` 次，则可以得到 `[0,1,4,4,5,6,7]`

注意，数组 `[a[0], a[1], a[2], ..., a[n-1]]` **旋转一次** 的结果为数组 `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]` 。

给你一个可能存在 **重复** 元素值的数组 `nums` ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 **最小元素** 。

**示例 1：**

```
输入：nums = [1,3,5]
输出：1
```

**示例 2：**

```
输入：nums = [2,2,2,0,1]
输出：0
```

**提示：**

- `n == nums.length`
- `1 <= n <= 5000`

- `-5000 <= nums[i] <= 5000`
- `nums` 原来是一个升序排序的数组，并进行了 `1` 至 `n` 次旋转

**进阶：**

- 这道题是 [寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/description/) 的延伸题目。
- 允许重复会影响算法的时间复杂度吗？会如何影响，为什么？

## 理解题意

+ 其实重点和关键字题目已经标注出来了，有序数组「旋转一次」得到的数组是「旋转有序数组」；
+ 有序数组有可能存在 **重复** 值。

## 思路分析

虽然不是严格意义上的有序数组，但依然可以使用「二分查找」，可以认为「旋转有序数组」是 **部分有序**。只要是一次可以排除一半，都可以用「二分查找」。那么如何使用二分法呢？我们很自然会想到 **使用边界的值和中间位置的值进行比较**。

> 关键：解本题的关键在于举例，在尝试举例的过程中，考虑到不同的情况，得到解题思路。


### 方法一：二分法

**注意**：这里的说是「中间数」，即 **位于中间的那个数**，不是数学意义上的中位数。

可以分为以下两种情况：中间数与左边界比较、中间数与左边界比较。

**情况 1**：中间数与左边界比较


尝试在纸上写出几个例子：

+ 例 1：`[1, 2, 3, 4, 5]`；
+ 例 2：`[2, 3, 4, 5, 1]`。

以上这两个例子，中间数都比左边界大，但是旋转排序数组的最小值可能在中间数的左边（例 1），也可能在中间数的右边（例 2），因此 **不能使用「中间数」与「左边界」比较**。


**情况 2**：中间数与右边界比较

**结论 1**：当中间数比右边界表示的数大的时候，中间数一定不是目标数（旋转排序数组的最小值）。

举个例子：

例 3：`[7, 8, 9, 10, 11, 12, 1, 2, 3]`

中间数 `11` 比右边界 `3` 大，因此「中间数」以及「中间数左边的数」一定不存在旋转排序数组的最小值，下一轮搜索的区间是 `[mid + 1..right]`，因此 `left = mid + 1`。

**结论 2**：当中间数比右边界表示的数小的时候，中间数就可能是目标数（旋转排序数组的最小值）。

举个例子：

例 4：`[7, 8, 1, 2, 3]`

中间数 1 比右边界表示的数小的时候，说明，中间数到右边界是递增的（对于这道题是非递减），那么中间数右边的（不包括中间数）就一定不是目标数，可以把它们排除，不过中间数有可能是目标数，就如本例，因此，把右边界设置为 `right = mid`。

**结论 3**：当中间数与右边界表示的数相等的时候，看下面两个例子：

例 5：`[0, 1, 1, 1, 1, 1, 1]`

例 6：`[1, 1, 1, 1, 0, 1, 1]`

目标值可能在中间数的左边，也可能在中间数的右边，那么该怎么办呢？很简单，此时你看到的是右边界，就把只右边界排除掉就好了。正是因为右边界和中间数相等，你去掉了右边界，中间数还在，就让中间数在后面的循环中被发现吧。

因此，根据中间数和右边界的大小关系，可以使用二分法搜索到目标值。

**关键**：





**参考代码 1**：


```Java []
public class Solution {

    public int findMin(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else if (nums[mid] < nums[right]) {
                right = mid;
            } else {
                assert nums[mid] == nums[right];
                right--;
            }
        }
        return nums[left];
    }

}
```

### 方法二：分治法

分治法将原问题划分成若干与原问题同结构且规模更小的子问题，等到这些子问题解决了以后，原问题也得到了解决。

**参考代码 2**：

```Java []
public class Solution {

    public int findMin(int[] nums) {
        // 在 nums[left..right] 里查找目标元素
        return findMin(nums, 0, nums.length - 1);
    }

    private int findMin(int[] nums, int left, int right) {
        if (left == right) {
            return nums[left];
        }
        int mid = (left + right) / 2;
        if (nums[mid] == nums[right]) {
            return findMin(nums, left, right - 1);
        } else if (nums[mid] < nums[right]) {
            // 下一轮搜索区间是 [left..mid]
            return findMin(nums, left, mid);
        } else {
            // 下一轮搜索区间是 [mid + 1..right]
            return findMin(nums, mid + 1, right);
        }
    }
}
```

如果你愿意写得再细致一点，还可以这样写。


**参考代码 3**：

```Java []
public class Solution {

    public int findMin(int[] nums) {
        int len = nums.length;
        return findMin(nums, 0, len - 1);
    }

    private int findMin(int[] nums, int left, int right) {
        // 递归终止条件，区间里只有 1 个元素的时候，返回这个元素
        if (left == right) {
            return nums[left];
        }
        if (left + 1 == right) {
            return Math.min(nums[left], nums[right]);
        }

        if (nums[left] < nums[right]) {
            return nums[left];
        }

        // 分治：设置分治的界限
        int mid = left + (right - left) / 2;

        if (nums[mid] == nums[right]) {
            return findMin(nums, left, right - 1);
        } else if (nums[mid] < nums[right]) {
            return findMin(nums, left, mid);
        } else {
            return findMin(nums, mid + 1, right);
        }
    }
}
```

