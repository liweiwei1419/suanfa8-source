---
title: 「力扣」第 34 题：在排序数组中查找元素的第一个和最后一个位置（中等）
icon: shipin
category: 二分查找
tags:
  - 二分查找
---

![0034](https://tva1.sinaimg.cn/large/008i3skNgy1gx928a7ukhj30p00anq3g.jpg)

::: warning 温馨提示
查找第一个元素和最后一个元素的代码不是背出来的，仔细分析就不难写出代码，关键是要认真。二分查找不是难点，也不是重点。
:::

- 题目链接：[34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)。

## :tv: **「力扣」第 34 题视频题解**

建议使用 1.5 倍速观看。

- [B 站](https://www.bilibili.com/video/BV147411i7zu?p=3)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/zai-pai-xu-shu-zu-zhong-cha-zhao-yuan-su-de-di-3-4/) 和 [B 站](https://www.bilibili.com/video/BV147411i7zu?p=3) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=83911694&bvid=BV147411i7zu&cid=143800242&page=3" frameborder="no" scrolling="no"></iframe>
</div>

## :notebook_with_decorative_cover: 「力扣」第 34 题文字题解

- 题解链接：[两次二分查找（Java）](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/si-lu-hen-jian-dan-xi-jie-fei-mo-gui-de-er-fen-cha/)。

## 题目描述

给定一个按照升序排列的整数数组 `nums`，和一个目标值 `target`。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 `target`，返回 `[-1, -1]`。

**进阶：**

- 你可以设计并实现时间复杂度为 `O(log n)` 的算法解决此问题吗？

**示例 1：**

```
输入: nums = [5, 7, 7, 8, 8, 10], target = 8
输出: [3, 4]
```

**示例 2：**

```
输入: nums = [5, 7, 7, 8, 8, 10], target = 6
输出: [-1, -1]
```

**示例 3：**

```
输入：nums = [], target = 0
输出：[-1,-1]
```

**提示：**

- $0 \le nums.length \le 10^5$
- $-10^9 \le nums[i] \le 10^9$
- `nums` 是一个非递减数组
- $-10^9 \le target \le 10^9$

## 思路分析

- 不可以找到 `target` 以后，然后向两边扩散（线性查找），这样的话时间复杂度为 $O(N)$，这里 $N$ 是输入数组的长度；
- 找 `target` 第一次出现的位置和最后一次出现的位置的时候，都只能用「二分查找」才符合题目的意思，注意分类讨论，并且把分类讨论的结果合并。

**参考代码**：

```java
public class Solution {
    public int[] searchRange(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return new int[]{-1, -1};
        }

        int firstPosition = findFirstPosition(nums, target);
        if (firstPosition == -1) {
            return new int[]{-1, -1};
        }

        int lastPosition = findLastPosition(nums, target);
        return new int[]{firstPosition, lastPosition};
    }

    private int findFirstPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            // 小于一定不是解
            if (nums[mid] < target) {
                // 下一轮搜索区间是 [mid + 1..right]
                left = mid + 1;
            } else {
                // nums[mid] > target，下一轮搜索区间是 [left..mid]
                right = mid;
            }
        }

        // 退出循环以后不能确定 nums[left] 是否等于 target，因此需要再判断一次
        if (nums[left] == target) {
            return left;
        }
        return -1;
    }

    private int findLastPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left + 1) / 2;
            if (nums[mid] > target) {
                // 下一轮搜索区间是 [left..mid - 1]
                right = mid - 1;
            } else
                // 下一轮搜索区间是 [mid..right]
                left = mid;
            }
        }
        // 主程序先执行 findFirstPosition，能执行到 findLastPosition 说明数组中一定存在等于 target 的元素，因此这里不用判断 nums[left] 是否等于 target
        return left;
    }
}
```

## 对参考代码的说明

`findFirstPosition()`，分成三种情况。

::: danger 温馨提示
下面的描述有一点啰嗦，只是为了说清楚，读者了解思路就可以了，不必全部看完。
:::

**情况 1** ：当 `nums[mid] < target` 时

- `mid` 一定不是 `target` 第一次出现的位置；
- 由于数组有序，`mid` 的左边一定比 `nums[mid]` 还小，因此 `mid` 的左边一定不是 `target` 第一次出现的位置；
- `mid` 的右边比 `nums[mid]` 还大，因此 `mid` 的右边 **有可能** 存在 `target` 第一次出现的位置。

因此下一轮搜索区间是 `[mid + 1..right]`，此时设置 `left = mid + 1`；

**情况 2** ：当 `nums[mid] == target` 时

- `mid` 有可能是 `target` 第一次出现的位置；
- `mid` 的左边也有可能是 `target` 第一次出现的位置；
- `mid` 的右边一定不是 `target` 第一次出现的位置。

因此下一轮搜索区间在 `[left..mid]`，此时设置 `right = mid`。

**情况 3** ：当 `nums[mid] > target` 时

- `mid` 一定不是 `target` 第一次出现的位置；
- `mid` 的右边也一定不是 `target` 第一次出现的位置；
- `mid` 的左边有可能是 `target` 第一次出现的位置，因此下一轮搜索区间在 `[left..mid - 1]`，此时设置 `right = mid - 1`。

::: info 重点
把情况 ② 和情况 ③ 合并，即当 `nums[mid] >= target` 的时候，下一轮搜索区间是 `[left..mid]`，此时设置 `right = mid`。这样做是因为：**只有当区间分割是 `[left..mid]` 和 `[mid + 1..right]` 的时候，`while(left < right)` 退出循环以后才有 `left == right` 成立**。
:::

> 这里感谢 [@dynamite-z](/u/dynamite-z/) 朋友纠正了一处笔误。

`findLastPosition()` 也可以类似分析，这里省略。

在本题解中，`while(left < right)` 只表示退出循环以后有 `left == right` 成立，**不表示搜索区间为左闭右开区间**，本题解以及我的其它题解中，对循环不变量的定义均为：在 `nums[left..right]` 中查找目标元素。

**复杂度分析**：

- 时间复杂度：$O(\log N)$，这里 $N$ 是数组的长度，两个子问题都是二分查找，因此时间复杂度为对数级别；
- 空间复杂度：$O(1)$，只使用了常数个数的辅助变量。
