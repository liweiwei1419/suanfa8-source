---
title: 「力扣」第 347 题：前 K 个高频元素（中等）
icon: yongyan
category: 优先队列
tags:
  - 优先队列
---

- 题目链接：[347. 前 K 个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)。

## 题目描述

给你一个整数数组 `nums` 和一个整数 `k` ，请你返回其中出现频率前 `k` 高的元素。你可以按 **任意顺序** 返回答案。

**示例 1:**

```
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
```

**示例 2:**

```
输入: nums = [1], k = 1
输出: [1]
```

**提示：**

- `1 <= nums.length <= 10^5`
- `k` 的取值范围是 `[1, 数组中不相同的元素的个数]`
- 题目数据保证答案唯一，换句话说，数组中前 `k` 个高频元素的集合是唯一的

**进阶：**你所设计算法的时间复杂度 **必须** 优于 `O(n log n)` ，其中 `n` 是数组大小。

## 题意分析

+ 题目中说「出现频率前 `k` 高的元素」，因此我们需要计算频率，按照频率从高到低找出这些元素；

+ 题目中还说「可以按 **任意顺序** 返回答案」，这是典型的 TopK 问题解决的问题，因此有两种方法：

  + 方法一：使用优先队列找出 **频率** 最大的前 K 个元素；
  + 方法二：使用快速排序的子过程找出前 K 个元素。

+ 再看到数据的范围：

  + `k` 的取值范围是 `[1, 数组中不相同的元素的个数]`
  + 题目数据保证答案唯一，换句话说，数组中前 `k` 个高频元素的集合是唯一的

  说明 `k` 的值不会给负数，也不会超过数组中不相同的元素的个数，一些特殊的情况不用考虑。

## 方法一：优先队列（堆）

思路：找前 `k` 大，所以用小顶堆，堆里的所有元素都小于等于堆顶元素，比堆顶还小的丢弃。

**参考代码 1**：

```Java []
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class Solution {

    public int[] topKFrequent(int[] nums, int k) {
        int len = nums.length;

        Map<Integer, Integer> freq = new HashMap<>();
        for (int num : nums) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }

        // 按照频数升序排序
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(len, Comparator.comparingInt(o -> o[1]));
        for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {
            Integer num = entry.getKey();
            Integer count = entry.getValue();

            if (minHeap.size() < k) {
                minHeap.add(new int[]{num, count});
            } else {
                if (count > minHeap.peek()[1]) {
                    // 把堆顶元素弹出，然后放入新的元素
                    minHeap.poll();
                    minHeap.add(new int[]{num, count});
                }
            }
        }

        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = minHeap.poll()[0];
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N \log k)$，这里 $N$ 是数组的长度；
+ 空间复杂度：$O(N)$，记录频数的哈希表的长度为 $N$，优先队列（堆）的长度为 $k$，$O(N + k)=O(N)$。

## 方法二：快速排序的子过程

思路：

+ 步骤 1：统计每一个元素出现的次数；
+ 步骤 2：把元素的值和频数绑定，放在一个数组中；
+ 步骤 3：在 `values` 上执行 `partition` 找到下标 `k - 1` 的位置，当 `left` 与 `right` 重合的时候，前 k 个元素就是题目要求的结果

**参考代码 2**：

```Java []
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {

    public int[] topKFrequent(int[] nums, int k) {
        // 步骤 1：统计每一个元素出现的次数
        Map<Integer, Integer> freq = new HashMap<>();
        for (int num : nums) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }

        // 步骤 2：把元素的值和频数绑定，放在一个数组中
        // 因为不知道有多少个不同元素，所以用动态数组
        List<int[]> values = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {
            int num = entry.getKey();
            int count = entry.getValue();
            values.add(new int[]{num, count});
        }

        // 步骤 3：在 values 上执行 partition 找到下标 k - 1 的位置，当 left 与 right 重合的时候，前 k 个元素就是题目要求的结果
        int left = 0;
        int right = values.size() - 1;
        int target = k - 1;
        while (left <= right) {
            int pIndex = partition(values, left, right);
            if (pIndex < target) {
                left = pIndex + 1;
            } else if (pIndex > target) {
                right = pIndex - 1;
            } else {
                break;
            }
        }

        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = values.get(i)[0];
        }
        return res;
    }

    public int partition(List<int[]> values, int left, int right) {
        int randomIndex = (int) (Math.random() * (right - left + 1)) + left;
        Collections.swap(values, randomIndex, left);

        int pivot = values.get(left)[1];
        int j = left;
      	// 循环不变量定义：
        // [left + 1.. j] >= pivot
        // (j, i) < pivot
        // 出现频率前 k 高的元素，降序排序，下标是 k - 1
        for (int i = left + 1; i <= right; i++) {
            if (values.get(i)[1] >= pivot) {
                j++;
                Collections.swap(values, j, i);
            }
        }
        Collections.swap(values, left, j);
        return j;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N \log k)$，这里 $N$ 是数组的长度。最坏情况下，时间复杂度为 $O(N^2)$，由于随机选择切分元素，这种最坏的情况出现的概率很低很低；
+ 空间复杂度：$O(N)$，记录频数的哈希表的长度为 $N$，优先队列（堆）的长度为 $k$，$O(N + k)=O(N)$。

