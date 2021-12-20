---
title: 「力扣」第 1095 题：山脉数组中查找目标值（ 中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---


![1095](https://tva1.sinaimg.cn/large/008i3skNgy1gx8zka1oo4j30p00ant9c.jpg)

+ 题目地址：[1095. 山脉数组中查找目标值](https://leetcode-cn.com/problems/find-in-mountain-array/)；
+ 题解地址：[二分查找（Java）](https://leetcode-cn.com/problems/find-in-mountain-array/solution/shi-yong-chao-hao-yong-de-er-fen-fa-mo-ban-python-/)。

::: danger 视频讲解

:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/find-in-mountain-array/solution/shan-mai-shu-zu-zhong-cha-zhao-mu-biao-zhi-by-leet/) 和 [B 站](https://www.bilibili.com/video/BV1GK4115778) 可以收看视频讲解。

:::

## 题目描述

（这是一个 交互式问题 ）

给你一个 山脉数组 `mountainArr`，请你返回能够使得 `mountainArr.get(index)` 等于 target 最小 的下标 index 值。

如果不存在这样的下标 `index`，就请返回 `-1`。



所谓山脉数组，即数组 `A` 假如是一个山脉数组的话，需要满足如下条件：

首先，`A.length >= 3`

其次，在 `0 < i < A.length - 1` 条件下，存在 i 使得：

+ `A[0] < A[1] < ... A[i-1] < A[i]`
+ `A[i] > A[i+1] > ... > A[A.length - 1]`

你将 不能直接访问该山脉数组，必须通过 MountainArray 接口来获取数据：

+ `MountainArray.get(k)` - 会返回数组中索引为k 的元素（下标从 0 开始）
+ `MountainArray.length()` - 会返回该数组的长度

**注意**：

对 `MountainArray.get` 发起超过 `100` 次调用的提交将被视为错误答案。此外，任何试图规避判题系统的解决方案都将会导致比赛资格被取消。

为了帮助大家更好地理解交互式问题，我们准备了一个样例 “答案”：https://leetcode-cn.com/playground/RKhe3ave，请注意这 不是一个正确答案。

**示例 1：**

```
输入：array = [1,2,3,4,5,3,1], target = 3
输出：2
解释：3 在数组中出现了两次，下标分别为 2 和 5，我们返回最小的下标 2。
```

**示例 2：**

```
输入：array = [0,1,2,4,2,1], target = 3
输出：-1
解释：3 在数组中没有出现，返回 -1。
```

提示：

+ `3 <= mountain_arr.length() <= 10000`
+ `0 <= target <= 10^9`
+ `0 <= mountain_arr.get(index) <= 10^9`

## 题解题意

### 什么是「山脉数组」？

「山脉数组」可以分为两部分，一部分是「前有序数组」，另一部分是「后有序数组」。「前有序数组」是升序数组，「后有序数组」是降序数组。

题目还告诉我们「对 `MountainArray.get` 发起超过 `100` 次调用的提交将被视为错误答案」，提示我们使用时间复杂度低的算法，对于有序数组很容易想到可以使用「二分查找」。

## 方法：二分查找法

求解这道题可以分为 3 步：

+ 第 1 步：先找到山顶元素 mountaintop 所在的下标；
+ 第 2 步：在前有序且升序数组中找 `target` 所在的下标，如果找到了，就返回，如果没有找到，才执行第 3 步；
+ 第 3 步：如果步骤 2 找不到，就在后有序且降序数组中找 `target` 所在的下标。

具体编码实现的时候，每一步写一个辅助方法就可以了。这 3 个辅助方法都是二分查找法。

下面给出的参考代码包括了抽象类（接口）和我的简单实现类，还有一些调试的代码。

**参考代码**：

```java
public class Solution {

    public int findInMountainArray(int target, MountainArray mountainArr) {
        int len = mountainArr.length();

        int peakIndex = findMountainTop(mountainArr, 0, len - 1);
        int res = findSortedArray(mountainArr, 0, peakIndex, target);
        if (res != -1) {
            return res;
        }
        return findReverseArray(mountainArr, peakIndex + 1, len - 1, target);
    }

    /**
     * 在 [left..right] 查找 target 的下标
     *
     * @param mountainArr
     * @param left
     * @param right
     * @param target
     * @return
     */
    private int findReverseArray(MountainArray mountainArr, int left, int right, int target) {
        while (left < right) {
            int mid = left + (right - left + 1) / 2;
            if (mountainArr.get(mid) < target) {
                // 下一轮搜索区间 [left..mid - 1]
                right = mid - 1;
            } else {
                // 下一轮搜索区间 [mid..right]
                // [left..right(mid)]
                left = mid;
            }
        }

        if (mountainArr.get(left) == target) {
            return left;
        }
        return -1;
    }

    /**
     * 在 [left..right] 查找 target 的下标
     *
     * @param mountainArr
     * @param left
     * @param right
     * @param target
     * @return
     */
    private int findSortedArray(MountainArray mountainArr, int left, int right, int target) {
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (mountainArr.get(mid) < target) {
                // 下一轮搜索区间 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索区间 [left..mid]
                right = mid;
            }
        }

        if (mountainArr.get(left) == target) {
            return left;
        }
        return -1;
    }

    /**
     * 在 [left..right] 查找山顶元素的下标
     *
     * @param mountainArr
     * @param left
     * @param right
     * @return
     */
    private int findMountainTop(MountainArray mountainArr, int left, int right) {
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (mountainArr.get(mid) < mountainArr.get(mid + 1)) {
                // 下一轮搜索区间 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索区间 [left..mid]
                right = mid;
            }
        }
        // left == right
        return left;
    }
}
```


**复杂度分析：**

+ 时间复杂度：$O(\log N)$，二分查找法的时间复杂度是对数级别的，这里使用了 3 次二分查找法，是常数倍数，因此可以忽略这个常数系数；
+ 空间复杂度：$O(1)$，这里使用的额外的辅助空间是常数，因此空间复杂度为 $O(1)$。