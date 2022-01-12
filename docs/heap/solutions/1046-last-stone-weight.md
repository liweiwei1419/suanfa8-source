---
title: 「力扣」第 1046 题：最后一块石头的重量（中等）
icon: yongyan
category: 优先队列
tags:
  - 优先队列
---

- 题目链接：[1046. 最后一块石头的重量](https://leetcode-cn.com/problems/last-stone-weight/)；
- 题解链接：[使用优先队列模拟问题（Java）](https://leetcode-cn.com/problems/last-stone-weight/solution/shi-yong-you-xian-dui-lie-mo-ni-wen-ti-java-by-liw/)。

## 题目描述

有一堆石头，每块石头的重量都是正整数。

每一回合，从中选出两块 **最重的** 石头，然后将它们一起粉碎。假设石头的重量分别为 `x` 和 `y`，且 `x <= y`。那么粉碎的可能结果如下：

- 如果 `x == y`，那么两块石头都会被完全粉碎；
- 如果 `x != y`，那么重量为 `x` 的石头将会完全粉碎，而重量为 `y` 的石头新重量为 `y-x`。

最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 `0`。

**示例：**

```
输入：[2,7,4,1,8,1]
输出：1
解释：
先选出 7 和 8，得到 1，所以数组转换为 [2,4,1,1,1]，
再选出 2 和 4，得到 2，所以数组转换为 [2,1,1,1]，
接着是 2 和 1，得到 1，所以数组转换为 [1,1,1]，
最后选出 1 和 1，得到 0，最终数组转换为 [1]，这就是最后剩下那块石头的重量。
```

**提示：**

- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 1000`

## 思路分析

由于需要**动态维护数据的有序性**（支持增加、删除），这里使用优先队列是最合适的数据结构。知道了这一点以后，根据题目意思模拟就好了。

**参考代码**：

```java
import java.util.PriorityQueue;

public class Solution {

    public int lastStoneWeight(int[] stones) {
        int len = stones.length;
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(len, (o1, o2) -> -o1 + o2);
        for (int stone : stones) {
            maxHeap.offer(stone);
        }

        while (maxHeap.size() >= 2) {
            Integer head1 = maxHeap.poll();
            Integer head2 = maxHeap.poll();
            if (head1.equals(head2)) {
                continue;
            }
            maxHeap.offer(head1 - head2);
        }

        if (maxHeap.isEmpty()) {
            return 0;
        }
        return maxHeap.poll();
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N \log N)$，（粗略计算，忽略常数倍数和常数项）每个元素入队一次，出队和入队调整堆的复杂度是 $O(\log N)$；
- 空间复杂度：$O(N)$，优先队列的大小。
