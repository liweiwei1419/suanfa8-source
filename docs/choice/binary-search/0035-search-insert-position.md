---
title: 「力扣」第 35 题：搜索插入位置（简单）
icon: jingxuan
category: 二分查找
tags: 
  - 二分查找
---

![0035](https://tva1.sinaimg.cn/large/008i3skNgy1gx8jfpbcuxj30p00ant9b.jpg)

+ [链接](https://leetcode-cn.com/problems/search-insert-position)
+ [题解链接](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)



## 题目描述

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

**示例 1：**

```
输入: [1, 3, 5, 6], 5
输出: 2
```

**示例 2：**

```
输入: [1, 3, 5, 6], 2
输出: 1
```

**示例 3：**

```
输入: [1, 3, 5, 6], 7
输出: 4
```

**示例 4：**

```
输入: [1, 3, 5, 6], 0
输出: 0
```

**示例 5:**

```
输入: nums = [1], target = 0
输出: 0
```

::: danger 关键
写对「二分查找」的重点，从来不在于「二分查找」我们用的是哪一个模板，我们设置的区间是「左闭右闭」还是「左开右闭」，而在于 **分析题意**，根据题目的条件和要求思考如何缩减区间，清楚地知道每一轮在什么样的情况下，搜索的范围是什么，进而设置左右边界。

我的理由很简单，如果我们都没有看清题目的意思，不清楚要找的答案需要满足什么性质，代码是不可能写对的。

在学习「二分查找」以及其它算法和数据结构的过程中，我们可能会有各种各样的疑问，把它们记录下来，一旦思考得多了，很多问题自然而然就有答案。

:::

## 思路分析

在有序数组中查找，可以使用「二分查找」。

根据「题意分析」中对示例的描述：

+ 情况 1：**如果当前 `mid` 看到的数值严格小于 `target`，那么 `mid` 以及 `mid` 左边的所有元素就一定不是「插入元素的位置」**，因此下一轮搜索区间是 `[mid + 1..right]`，下一轮把 `left` 移动到 `mid + 1` 位置，因此设置 `left = mid + 1`；
+ 情况 2：否则，如果 `mid` 看到的数值大于等于 `target`，那么 `mid` **可能是「插入元素的位置」**，`mid` 的右边一定不存在「插入元素的位置」。如果 `mid` 的左边不存在「插入元素的位置」，我们才可以说 `mid` 是「插入元素的位置」。因此下一轮搜索区间是 `[left..mid]`，下一轮把 `right` 移动到 `mid` 位置，因此设置 `right = mid`。

**说明**：上面的两点中，「情况 2」其实不用分析得那么细致， 因为只要「情况 1」的分析正确，「情况 2」一定是「情况 1」的反面区间。

**参考代码 1**：

```Java []
public class Solution {

    public int searchInsert(int[] nums, int target) {
        int len = nums.length;
        // 特殊判断
        if (nums[len - 1] < target) {
            return len;
        }

        // 程序走到这里一定有 nums[len - 1] >= target
        int left = 0;
        int right = len - 1;
        // 在区间 nums[left..right] 里查找第 1 个大于等于 target 的元素的下标
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target){
                // 下一轮搜索的区间是 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索的区间是 [left..mid]
                right = mid;
            }
        }
        return left;
    }
}
```

**说明**：`while (left < right)` 表示当 `left` 与 `right` 重合的时候，搜索终止。根据题意，区间 `nums[left..right]` 里一定存在「插入元素的位置」，所以退出循环的时候一定有 `left == right` 成立，因此返回 `left` 或者 `right` 都可以。

**复杂度分析**：

+ 时间复杂度：$O(\log N)$，这里 $N$ 是输入数组的长度；
+ 空间复杂度：$O(1)$。

既然 `len` 也有可能是答案，可以在初始化的时候，把 `right` 设置成 `len`，在一开始的时候就不需要特殊判断了。

**参考代码 2**：

```Java []
public class Solution {

    public int searchInsert(int[] nums, int target) {
        int len = nums.length;
        int left = 0;
        int right = len;
        // 在区间 nums[left..right] 里查找第 1 个大于等于 target 的元素的下标
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target){
                // 下一轮搜索的区间是 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索的区间是 [left..mid]
                right = mid;
            }
        }
        return left;
    }
}
```

**复杂度分析**：（同参考代码 1）

---


我讲解的算法特别适合新手朋友。欢迎大家关注我的公众号「算法不好玩」，B 站关注「liweiwei1419」。

