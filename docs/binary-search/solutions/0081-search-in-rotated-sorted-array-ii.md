---
title: 「力扣」第 81 题：搜索旋转排序数组 II（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

+ 题目链接：[81. 搜索旋转排序数组 II](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)。

+ 题解地址：[二分查找（Python 代码、Java 代码）](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/solution/er-fen-cha-zhao-by-liweiwei1419/)。

## 题目描述

已知存在一个按非降序排列的整数数组 `nums` ，数组中的值不必互不相同。

在传递给函数之前，`nums` 在预先未知的某个下标 `k`（`0 <= k < nums.length`）上进行了 **旋转** ，使数组变为 `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` （下标 **从 0 开始** 计数）。例如， `[0,1,2,4,4,4,5,6,6,7]` 在下标 `5` 处经旋转后可能变为 `[4,5,6,6,7,0,1,2,4,4]` 。

给你 **旋转后** 的数组 `nums` 和一个整数 `target` ，请你编写一个函数来判断给定的目标值是否存在于数组中。如果 `nums` 中存在这个目标值 `target` ，则返回 `true` ，否则返回 `false` 。

 **示例 1：**

```
输入：nums = [2,5,6,0,0,1,2], target = 0
输出：true
```

**示例 2：**

```
输入：nums = [2,5,6,0,0,1,2], target = 3
输出：false
```

**提示：**

- `1 <= nums.length <= 5000`
- `-104 <= nums[i] <= 104`

- 题目数据保证 `nums` 在预先未知的某个下标上进行了旋转
- `-104 <= target <= 104`

**进阶：**

- 这是 [搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/description/) 的延伸题目，本题中的 `nums` 可能包含重复元素。
- 这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？

## 思路分析

「旋转有序数组」是「部分有序」的数组，二分查找算法同样可以通过看到的某个元素的值，推测它的左右两侧的元素的值，进而达到缩减问题规模的目的。

明确了思路以后，我们就需要确定「有序数组」存在于「原始数组」的哪个子区间里，下面提供了两个比较标准：

+ 二分查找算法看到的中间元素 `nums[mid]` 的值和左边界 `nums[left]` 的值比较；
+ 二分查找算法看到的中间元素 `nums[mid]` 的值和右边界 `nums[right]` 的值比较。

由这两个比较标准就能写出两版不同的代码。

**情况 1**：二分查找算法看到的中间元素 `nums[mid]` 的值和左边界 `nums[left]` 的值比较

**参考代码 1**：


```Java []
public class Solution {

    // 中间的数与左边界比较

    public boolean search(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return false;
        }

        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[left]) {
                if (nums[left] <= target && target <= nums[mid]) {
                    // 落在前有序数组里
                    right = mid;
                } else {
                    left = mid + 1;
                }
            } else if (nums[mid] < nums[left]) {
                // 让分支和上面分支一样
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            } else {
                // 要排除掉左边界之前，先看一看左边界可以不可以排除
                if (nums[left] == target) {
                    return true;
                } else {
                    left = left + 1;
                }
            }

        }
        // 后处理，夹逼以后，还要判断一下，是不是 target
        return nums[left] == target;
    }
}
```

**情况 2**：二分查找算法看到的中间元素 `nums[mid]` 的值和右边界 `nums[left]` 的值比较；

**参考代码 2**：


```Java []
public class Solution {

    // 中间的数与右边界比较

    public boolean search(int[] nums, int target) {
        int len = nums.length;

        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = left + (right - left + 1) / 2;
            if (nums[mid] < nums[right]) {
                // 具体例子：[10, 11, 4, 5, 6, 7, 8, 9]，mid 右边的一定是顺序数组，包括 nums[mid]
                if (nums[mid] <= target && target <= nums[right]) {
                    left = mid;
                } else {
                    right = mid - 1;
                }
            } else if (nums[mid] > nums[right]) {
                // 具体例子：[4, 5, 9, 2]，mid 左边是一定是顺序数组，包括 nums[mid]
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid;
                }
            } else {
                if (nums[right] == target) {
                    return true;
                }
                right = right - 1;
            }
        }
        return nums[left] == target;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，其中 $N$ 是输入数组的长度。最坏情况下，数组元素均相等且不为 `target`；

+ 空间复杂度：$O(1)$，只使用了常数个变量。
