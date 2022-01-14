---
title: 「力扣」第 436 题：寻找右区间（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

- 题目链接：[436. 寻找右区间](https://leetcode-cn.com/problems/find-right-interval/)；
- 题解链接：[二分查找、二分搜索树](https://leetcode-cn.com/problems/find-right-interval/solution/er-fen-cha-zhao-hong-hei-shu-by-liweiwei1419/)。

## 题目描述

给你一个区间数组 `intervals` ，其中 `intervals[i] = [starti, endi]` ，且每个 `starti` 都 **不同** 。

区间 `i` 的 **右侧区间** 可以记作区间 `j` ，并满足 ` startj`` >= endi ` ，且 `startj` **最小化** 。

返回一个由每个区间 `i` 的 **右侧区间** 的最小起始位置组成的数组。如果某个区间 `i` 不存在对应的 **右侧区间** ，则下标 `i` 处的值设为 `-1` 。

**示例 1：**

```
输入：intervals = [[1,2]]
输出：[-1]
解释：集合中只有一个区间，所以输出-1。
```

**示例 2：**

```
输入：intervals = [[3,4],[2,3],[1,2]]
输出：[-1,0,1]
解释：对于 [3,4] ，没有满足条件的“右侧”区间。
对于 [2,3] ，区间[3,4]具有最小的“右”起点;
对于 [1,2] ，区间[2,3]具有最小的“右”起点。
```

**示例 3：**

```
输入：intervals = [[1,4],[2,3],[3,4]]
输出：[-1,2,-1]
解释：对于区间 [1,4] 和 [3,4] ，没有满足条件的“右侧”区间。
对于 [2,3] ，区间 [3,4] 有最小的“右”起点。
```

**提示：**

- `1 <= intervals.length <= 2 * 104`
- `intervals[i].length == 2`
- `-106 <= starti <= endi <= 106`
- 每个间隔的起点都 **不相同**

## 解题思路

- 题目中的关键字是找「大于等于」，最小的那个区间的下标，很显然需使用二分查找算法；
- 要使用二分查找，需要在有序的环境中进行，因此，需要对区间排序（可将这一步称之为预处理）；
- 题目要求返回索引，但是排序以后，索引信息丢失。因此在预处理的时候，就得把「起点」和「下标」的关系存起来。

- 刚刚好题目中说道：「你可以假定这些区间都不具有相同的起始点」，用「哈希表」正合适；
- 排序的时候，只需要对起点进行排序即可；
- 在二分查找的时候，传入的是区间的右端点，查找的是大于等于区间的右端点的第 1 个值，因此它的反面就是：**小于一定不是解**。根据这个「逐渐缩小搜索区间」的策略，编写二分查找算法；

**注意**：一种特殊的情况，如果有序的最后一个元素都小于传入的区间的右端点，那么直接返回 $-1$。类似的问题还有「力扣」第 35 题：返回插入元素的位置。

## 方法一：排序预处理 + 二分查找

**参考代码 1**：

```java
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int[] findRightInterval(int[][] intervals) {
        int len = intervals.length;
        if (len == 0) {
            return new int[0];
        }

        // 对原始区间进行预处理，key：起点，value：索引
        // 题目中说：你可以假定这些区间都不具有相同的起始点
        Map<Integer, Integer> hashMap = new HashMap<>(len);

        int[] arr = new int[len];
        int[] res = new int[len];
        for (int i = 0; i < len; i++) {
            hashMap.put(intervals[i][0], i);
            arr[i] = intervals[i][0];
        }

        Arrays.sort(arr);

        for (int i = 0; i < len; i++) {
            int index = binarySearch(arr, intervals[i][1]);
            if (index == -1) {
                res[i] = -1;
            } else {
                res[i] = hashMap.get(arr[index]);
            }
        }
        return res;
    }

    /**
     * 查找第 1 个大于等于 target 的元素的索引
     *
     * @param arr
     * @param target
     * @return
     */
    private int binarySearch(int[] arr, int target) {
        int len = arr.length;
        // 特判
        if (arr[len - 1] < target) {
            return -1;
        }

        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) >>> 1;
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
}
```

## 方法二：使用二分搜索树

因为需要绑定对应关系，还须要排序，查找大于等于的第 1 个元素，恰好就是「天花板函数」 `ceiling` 的功能，一种数据结构「红黑树」就正好同时满足了这些需求，即：

> **红黑树 = 哈希表 + 排序**

说明：上面这个等式说的知识在这道题上的作用，红黑树和哈希表是查找表的不同实现，底层机制有很大差别，在这里就不详细展开了。

把「参考代码 1」稍作修改即得「参考代码 2」。

**参考代码 2**：

```java
import java.util.Arrays;
import java.util.Map;
import java.util.TreeMap;

public class Solution {

    public int[] findRightInterval(int[][] intervals) {
        int len = intervals.length;
        if (len == 0) {
            return new int[0];
        }

        TreeMap<Integer, Integer> treeMap = new TreeMap<>();
        int[] res = new int[len];
        for (int i = 0; i < len; i++) {
            treeMap.put(intervals[i][0], i);
        }
        for (int i = 0; i < len; i++) {
            Map.Entry<Integer, Integer> entry = treeMap.ceilingEntry(intervals[i][1]);
            if (entry == null) {
                res[i] = -1;
            } else {
                res[i] = entry.getValue();
            }
        }
        return res;
    }
}
```
