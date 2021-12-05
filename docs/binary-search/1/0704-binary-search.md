---
title: 1.2 例题 ：二分查找
icon: yongyan
category: 二分查找
tags:
  - 减治思想
---

# 「力扣」第 704 题：二分查找（简单）

+ [题目链接](https://leetcode-cn.com/problems/binary-search)

给定一个 `n` 个元素有序的（升序）整型数组 `nums` 和一个目标值 `target` ，写一个函数搜索 `nums` 中的 `target`，如果目标值存在返回下标，否则返回 -1。

示例 1：

```
输入: nums = [-1, 0, 3, 5, 9, 12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
```


示例 2：

```
输入: nums = [-1, 0, 3, 5, 9, 12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
```


提示：

1. 你可以假设 `nums` 中的所有元素是不重复的。
2. `n` 将在 `[1, 10000]` 之间。
3. `nums` 的每个元素都将在 `[-9999, 9999]` 之间。

## 解题思路

::: danger 基本想法

在循环中做判断，每一轮通过目标元素与中间元素的大小将搜索区间分为 3 个部分。根据看到的中间元素的数值，想清楚下一次搜索的区间是什么，进而设置 `left` 或者 `right` 的值。

:::

具体做法：

+ 先看中间的数与目标元素的关系，如果等于目标元素，就直接返回中间的数的索引；
+ 如果中间的数比目标元素大，那么中间位置右边的数也一定比目标元素大，即中间位置右边的数也一定不是目标元素，目标元素只可能在中间位置的左边出现，因此把右边界设置为 `mid - 1` ，即 `right = mid - 1`；（同理看待另一边）
+ 如果中间的数比目标元素小，那么中间位置左边的数也一定比目标元素小，即中间位置左边的数也一定不是目标元素，目标元素只可能在中间位置的右边出现，因此把左边界设置为 `mid + 1` ，即 `left = mid + 1`。

## 参考代码

### 循环写法：

```java
public class Solution {

    public int search(int[] nums, int target) {
        int len = nums.length;
        if (len == 0) {
            return -1;
        }
        // 在 [left..right] 区间里查找 target
        int left = 0;
        int right = len - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] > target) {
                // 下一轮搜索区间：[left..mid - 1]
                right = mid - 1;
            } else {
                // 此时 nums[mid] < target
                // 下一轮搜索区间：[mid + 1..right]
                left = mid + 1;
            }
        }
        // 走到这里，就可以判定输入数组里不存在目标元素，返回 -1
        return -1;
    }
}
```

在 `while` 里面要写 `left <= right` ，这是因为当 `left == right` 成立的时候，搜索区间里仍然有一个数，就是 `nums[left]` 还没有看，因此这个思路的二分查找算法要写等于号。


**复杂度分析**：

+ 时间复杂度：$O(\log N)$，这里 $N$ 是数组的元素个数，每次排除当前候选区间一半以上的元素，因此是对数级别的时间复杂度；
+ 空间复杂度：$O(1)$，只使用了常数个的临时变量。

<Utterances />

<!-- 


---
title: 「力扣」第 704 题：二分查找（简单）
date: 2017-05-28 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 2：二分查找
tags:

  - 二分查找
  - 减治算法
permalink: leetcode-algo/0704-binary-search

--- -->