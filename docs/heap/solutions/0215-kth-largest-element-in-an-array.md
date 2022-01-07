---
title: 「力扣」第 215 题：数组第 k 大的元素（中等）
icon: yongyan
category: 优先队列
tags:
  - 优先队列
---

+ 中文网址：[215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/) ；
+ 题解地址：[通过 partition 减治 + 优先队列（Java）](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/partitionfen-er-zhi-zhi-you-xian-dui-lie-java-dai-/)。

## 题目描述

给定整数数组 `nums` 和整数 `k`，请返回数组中第 `k` 个最大的元素。

请注意，你需要找的是数组排序后的第 `k` 个最大的元素，而不是第 `k` 个不同的元素。

**示例 1:**

```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

**示例 2:**

```
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

**提示：**

- `1 <= k <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`

---

## 思路分析

优先队列的思路是很朴素的。由于找第 `K` 大元素，其实就是整个数组排序以后后半部分最小的那个元素。因此，我们可以维护一个有 `K` 个元素的最小堆：

+ 如果当前堆不满，直接添加；
+ 堆满的时候，如果新读到的数小于等于堆顶，肯定不是我们要找的元素，只有新遍历到的数大于堆顶的时候，才将堆顶拿出，然后放入新读到的数，进而让堆自己去调整内部结构。

说明：这里最合适的操作其实是 `replace()`，即直接把新读进来的元素放在堆顶，然后执行下沉（`siftDown()`）操作。Java 当中的 `PriorityQueue` 没有提供这个操作，只好先 `poll()` 再 `offer()`。 

优先队列的写法就很多了，这里只例举一个有代表性的，其它的写法大同小异，没有本质差别。

**参考代码**：

```Java []
import java.util.Comparator;
import java.util.PriorityQueue;

public class Solution {

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        // 使用一个含有 k 个元素的最小堆，PriorityQueue 底层是动态数组，为了防止数组扩容产生消耗，可以先指定数组的长度
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k, Comparator.comparingInt(a -> a));
        // Java 里没有 heapify ，因此我们逐个将前 k 个元素添加到 minHeap 里
        for (int i = 0; i < k; i++) {
            minHeap.offer(nums[i]);
        }

        for (int i = k; i < len; i++) {
            // 看一眼，不拿出，因为有可能没有必要替换
            Integer topElement = minHeap.peek();
            // 只要当前遍历的元素比堆顶元素大，堆顶弹出，遍历的元素进去
            if (nums[i] > topElement) {
                // Java 没有 replace()，所以得先 poll() 出来，然后再放回去
                minHeap.poll();
                minHeap.offer(nums[i]);
            }
        }
        return minHeap.peek();
    }
}
```

**复杂度分析**：
+ 时间复杂度：$O(N \log K)$，遍历数据 $O(N)$，堆内元素调整 $O(K)$；
+ 空间复杂度：$O(K)$。

