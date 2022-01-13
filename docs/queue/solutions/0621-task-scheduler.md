---
title: 「力扣」第 621 题：任务调度器（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
  - 队列
---

- 题目链接：[621. 任务调度器](https://leetcode-cn.com/problems/task-scheduler/)。

## 题目描述

给你一个用字符数组 `tasks` 表示的 CPU 需要执行的任务列表。其中每个字母表示一种不同种类的任务。任务可以以任意顺序执行，并且每个任务都可以在 1 个单位时间内执行完。在任何一个单位时间，CPU 可以完成一个任务，或者处于待命状态。

然而，两个 **相同种类** 的任务之间必须有长度为整数 `n` 的冷却时间，因此至少有连续 `n` 个单位时间内 CPU 在执行不同的任务，或者在待命状态。

你需要计算完成所有任务所需要的 **最短时间** 。

**示例 1：**

```
输入：tasks = ["A","A","A","B","B","B"], n = 2
输出：8
解释：A -> B -> (待命) -> A -> B -> (待命) -> A -> B
     在本示例中，两个相同类型任务之间必须间隔长度为 n = 2 的冷却时间，而执行一个任务只需要一个单位时间，所以中间出现了（待命）状态。
```

**示例 2：**

```
输入：tasks = ["A","A","A","B","B","B"], n = 0
输出：6
解释：在这种情况下，任何大小为 6 的排列都可以满足要求，因为 n = 0
["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...
诸如此类
```

**示例 3：**

```
输入：tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
输出：16
解释：一种可能的解决方案是：
     A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> (待命) -> (待命) -> A -> (待命) -> (待命) -> A
```

**提示：**

- `1 <= task.length <= 104`
- `tasks[i]` 是大写英文字母
- `n` 的取值范围为 `[0, 100]`

**参考代码**：

```java
import java.util.Comparator;
import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Queue;

public class Solution {

    public int leastInterval(char[] tasks, int n) {
        int[] count = new int[26];
        for (char task : tasks) {
            count[task - 'A']++;
        }

        // 最大堆
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(26, Comparator.reverseOrder());
        for (int i = 0; i < 26; i++) {
            // 把次数大于 0 的任务加入最大堆
            if (count[i] > 0) {
                maxHeap.offer(count[i]);
            }
        }

        // 依次拿出执行次数最多的任务
        int res = 0;
        // 临时队列，用于存放需要冷却的任务
        Queue<Integer> queue = new LinkedList<>();
        while (!maxHeap.isEmpty()) {
            // 注意：这里是 n + 1，即在 n + 1 个时间单位内，不能有重复任务
            for (int i = 0; i < n + 1; i++) {
                if (!maxHeap.isEmpty()) {
                    int front = maxHeap.poll();
                    if (front > 1) {
                        // 因为完成了一个任务，接下来还有 front - 1 次任务
                        queue.add(front - 1);
                    }
                }
                res++;
                if (maxHeap.isEmpty() && queue.isEmpty()) {
                    break;
                }
            }

            while (!queue.isEmpty()) {
                maxHeap.offer(queue.poll());
            }
        }
        return res;
    }
}
```
