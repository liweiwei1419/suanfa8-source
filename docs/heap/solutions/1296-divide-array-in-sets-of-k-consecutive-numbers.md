---
title: 「力扣」第 1296 题：划分数组为连续数字的集合（中等）
icon: yongyan
category: 优先队列
tags:
  - 优先队列
---

- 题目链接：[1296. 划分数组为连续数字的集合](https://leetcode-cn.com/problems/divide-array-in-sets-of-k-consecutive-numbers/)；
- 题解链接：[优先队列（适合 Java 代码，C++ 和 Python 不支持 remove 操作，故不适用）](https://leetcode-cn.com/problems/divide-array-in-sets-of-k-consecutive-numbers/solution/you-xian-dui-lie-by-liweiwei1419-2/)。

## 题目描述

给你一个整数数组 `nums` 和一个正整数 `k`，请你判断是否可以把这个数组划分成一些由 `k` 个连续数字组成的集合。

如果可以，请返回 `true`；否则，返回 `false`。

**示例 1：**

```java
输入：nums = [1,2,3,3,4,4,5,6], k = 4
输出：true
解释：数组可以分成 [1,2,3,4] 和 [3,4,5,6]。
```

**示例 2：**

```
输入：nums = [3,2,1,2,3,4,3,4,5,9,10,11], k = 3
输出：true
解释：数组可以分成 [1,2,3] , [2,3,4] , [3,4,5] 和 [9,10,11]。
```

**示例 3：**

```
输入：nums = [3,3,2,2,1,1], k = 3
输出：true
```

**示例 4：**

```
输入：nums = [1,2,3,4], k = 3
输出：false
解释：数组不能分成几个大小为 3 的子数组。
```

**提示：**

- $1 \le k \le nums.length \le 10^5$
- $1 \le nums[i] \le 10^9$

**注意：**此题目与 846 重复：https://leetcode-cn.com/problems/hand-of-straights/

---

说明：我这种写法 C++ 和 Python 的优先队列因为不支持 `remove` 操作（`remove` 操作是 $O(N)$ 复杂度），因此需要考虑使用二分搜索树 + 计数方法去做，具体方法请参考 [@Victor](/u/happy_yuxuan/) 写的 [[WeeklyContest]168 Q2 划分数组为连续数字的集合](https://leetcode-cn.com/problems/divide-array-in-sets-of-k-consecutive-numbers/solution/weeklycontest168-q2-hua-fen-shu-zu-wei-lian-xu-shu/)。

首先，很容易判断，如果数组的长度不是 `k` 的倍数，一定不会有符合题意的集合。

其次，注意到这 `k` 个数一定是连续的数，因此，如果存在符合题意，任意拿出一个集合，如果这个集合里最小的数是 `i` ，那么集合里剩下的数依次是 `i + 1, i + 2, ..., i + (k - 1)` 。

为此，需要一个数据结构，能够帮助我们动态删除元素。

一开始想到使用哈希表。因为还需要有序性，因此用二分搜索树或者优先队列都是可以的。但如果使用二分搜索树，相同元素放入集合里就会被认为只有一个，因此**优先队列**是最合适的数据结构。

先把数组中所有的数放入优先队列（最小堆）中。

- 每次从队首**出队**一个数 `i`，就需要依次从堆中再移除 `i + 1, i + 2, ..., i + (k - 1)` ，只要移除失败，就可以直接返回 `false`；
- 如果每次都能移除成功，最后优先队列就会为空，直接返回 `true` 即可。

**参考代码**：

```Java []
import java.util.PriorityQueue;

public class Solution {

    public boolean isPossibleDivide(int[] nums, int k) {
        int len = nums.length;
        if (len % k != 0) {
            return false;
        }

        PriorityQueue<Integer> minHeap = new PriorityQueue<>(len);
        for (int num : nums) {
            minHeap.offer(num);
        }

        while (!minHeap.isEmpty()) {
            Integer top = minHeap.poll();

            for (int i = 1; i < k; i++) {
                // 从 1 开始，正好需要移除 k - 1 个元素
                // i 正好就是相对于 top 的偏移
                // 注意：这个 remove 操作会线性去扫 top + i 的索引，时间复杂度是 O(N)
                if (!minHeap.remove(top + i)) {
                    // 如果移除失败，说明划分不存在，直接返回 false 即可
                    return false;
                }
            }
        }
        return true;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N^2)$，这里 $N$ 是数组的长度，如果是 `heapify` 建堆，时间复杂度可以达到 $O(N)$ ，只不过 Java 的优先队列不支持 `heapify`。（这里感谢 [@Victor](/u/happy_yuxuan/) 指出我原来的错误）。另外 `remove` 操作是 $O(N)$ 复杂度，因此总的时间复杂度是 $O(N^2)$；

- 空间复杂度：$O(N)$，优先队列的长度是 $N$。
