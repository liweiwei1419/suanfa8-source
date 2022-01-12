---
title: 「力扣」第 1438 题：绝对差不超过限制的最长连续子数组（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

- 题目链接：[1438. 绝对差不超过限制的最长连续子数组](https://leetcode-cn.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/)。

## 题目描述

给你一个整数数组 `nums` ，和一个表示限制的整数 `limit`，请你返回最长连续子数组的长度，该子数组中的任意两个元素之间的绝对差必须小于或者等于 `limit` 。

如果不存在满足条件的子数组，则返回 `0` 。

**示例 1：**

```
输入：nums = [8,2,4,7], limit = 4

输出：2

解释：所有子数组如下：

[8] 最大绝对差 |8-8| = 0 &lt;= 4.

[8,2] 最大绝对差 |8-2| = 6 &gt; 4.

[8,2,4] 最大绝对差 |8-2| = 6 &gt; 4.

[8,2,4,7] 最大绝对差 |8-2| = 6 &gt; 4.

[2] 最大绝对差 |2-2| = 0 &lt;= 4.

[2,4] 最大绝对差 |2-4| = 2 &lt;= 4.

[2,4,7] 最大绝对差 |2-7| = 5 &gt; 4.

[4] 最大绝对差 |4-4| = 0 &lt;= 4.

[4,7] 最大绝对差 |4-7| = 3 &lt;= 4.

[7] 最大绝对差 |7-7| = 0 &lt;= 4.

因此，满足题意的最长子数组的长度为 2 。
```

**示例 2：**

```
输入：nums = [10,1,2,4,7,2], limit = 5

输出：4

解释：满足题意的最长子数组是 [2,4,7,2]，其最大绝对差 |2-7| = 5 &lt;= 5 。
```

**示例 3：**

```
输入：nums = [4,2,2,2,4,4,2,2], limit = 0

输出：3
```

**提示：**

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^9`

- `0 <= limit <= 10^9`

关键词：**任意两个元素之间的绝对差**

---

## 方法一：使用数据结构维护滑动窗口的最大值和最小值

**参考代码 1**：

```java
import java.util.TreeMap;

public class Solution {

    public int longestSubarray(int[] nums, int limit) {
        int len = nums.length;
        int left = 0;
        int right = 0;

        int res = 0;
        // 思考这里为什么需要记录出现的次数
        TreeMap<Integer, Integer> treeMap = new TreeMap<>();
        while (right < len) {
            treeMap.put(nums[right], treeMap.getOrDefault(nums[right], 0) + 1);
            right++;
            while (treeMap.lastKey() - treeMap.firstKey() > limit) {
                treeMap.put(nums[left], treeMap.get(nums[left]) - 1);

                if (treeMap.get(nums[left]) == 0) {
                    treeMap.remove(nums[left]);
                }
                left++;
            }
            res = Math.max(res, right - left);
        }
        return res;
    }
}
```

## 方法二：使用单调队列维护滑动窗口的最大值和最小值

**参考代码 2**：

```java
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.TreeMap;

public class Solution {

    public int longestSubarray(int[] nums, int limit) {
        int len = nums.length;
        int left = 0;
        int right = 0;

        int res = 0;
        Deque<Integer> maxD = new ArrayDeque<>();
        Deque<Integer> minD = new ArrayDeque<>();


        while (right < len) {
            while (!maxD.isEmpty() && nums[right] > maxD.peekLast()){
                maxD.removeLast();
            }
            while (!minD.isEmpty() && nums[right] < minD.peekLast()){
                minD.removeLast();
            }
            minD.addLast(nums[right]);
            maxD.addLast(nums[right]);
            right++;
            while (maxD.peekFirst() - minD.peekFirst() > limit){
                if (maxD.peekFirst() == nums[left]){
                    maxD.removeFirst();
                }
                if (minD.peekFirst() == nums[left]){
                    minD.removeFirst();
                }
                left++;
            }
            res = Math.max(res, right - left);
        }
        return res;
    }
}
```
