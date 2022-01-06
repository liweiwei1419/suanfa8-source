---
title: 「力扣」第 1282 题：用户分组（中等）
icon: yongyan
category: 优先队列
tags: 
  - 优先队列
---


+ 题目链接：[1282. 用户分组](https://leetcode-cn.com/problems/group-the-people-given-the-group-size-they-belong-to/)。

## 题目描述

有 `n` 位用户参加活动，他们的 **ID** 从 `0` 到 `n - 1`，每位用户都 **恰好** 属于某一用户组。给你一个长度为 `n` 的数组 `groupSizes`，其中包含每位用户所处的用户组的大小，请你返回用户分组情况（存在的用户组以及每个组中用户的 ID）。

你可以任何顺序返回解决方案，ID 的顺序也不受限制。此外，题目给出的数据保证至少存在一种解决方案。

**示例 1：**

```
输入：groupSizes = [3,3,3,3,3,1,3]
输出：[[5],[0,1,2],[3,4,6]]
解释： 
其他可能的解决方案有 [[2,1,6],[5],[0,4,3]] 和 [[5],[0,6,2],[4,3,1]]。
```

**示例 2：**

```
输入：groupSizes = [2,1,3,3,3,2]
输出：[[1],[0,5],[2,3,4]]
```

**提示：**

- `groupSizes.length == n`
- `1 <= n <= 500`
- `1 <= groupSizes[i] <= n`

## 思路分析

+ 观察示例 1 和示例 2，如果 `size = 1` ，这个用户一定单独为一组，因此我们可以把有相同 `size` 的用户分为一类；
+ 我们观察到：数组 `groupSizes` 里的元素的值的特点：**相同值的个数一定是这个相同值的倍数**：
  + 观察示例 1：有 $6$ 个 `3`；
  + 观察示例 2：有 $1$ 个 `1`，有 $2$ 个 `2`，有 $3$ 个 `3`。


从上面的分析中，可以归纳出算法：

+ 如果 `size = 1`，这个用户单独为 1 组，接着可以找到 `size` 等于 $2$、$3$、$4$ 等等，只要凑够数就可以分出来成为一组；
+ 需要对 `groupSizes` 数组预处理，排个序即可。**不过又要从小到大依次取出元素，因此优先队列是一个可选择的数据结构**；
+ 因为要输出 `ID`， 因此，放入优先队列的时候，需要绑定 `ID`。

**参考代码**：

```Java []
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.PriorityQueue;

public class Solution {

    public List<List<Integer>> groupThePeople(int[] groupSizes) {
        int len = groupSizes.length;
        List<List<Integer>> res = new ArrayList<>();

        // 特判
        if (len == 0) {
            return res;
        }

        // 默认就是最小堆，int[] 的长度为 2，第 1 个数是数组元素，第 2 个数是数组索引
        // 其实就是把数和索引绑定在了一起，在堆中参与比较的是数，索引是依附于数的
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(len, Comparator.comparingInt(o -> o[0]));
        for (int i = 0; i < len; i++) {
            minHeap.add(new int[]{groupSizes[i], i});
        }

        while (!minHeap.isEmpty()) {
            int curSize = minHeap.peek()[0];

            List<Integer> current = new ArrayList<>();
            for (int i = 0; i < curSize; i++) {
                current.add(Objects.requireNonNull(minHeap.poll())[1]);
            }

            res.add(current);
        }
        return res;
    }
}
```
```Python []
from typing import List
import heapq


class Solution:
    def groupThePeople(self, groupSizes: List[int]) -> List[List[int]]:
        size = len(groupSizes)

        res = []

        # 特判
        if size == 0:
            return res

        # Python 的 heapq 的用法：https://docs.python.org/3.8/library/heapq.html
        h = []

        for i in range(size):
            # 传入的是 tuple
            heapq.heappush(h, (groupSizes[i], i))

        # 单独的 h 放在 while 里面，表示 h 非空的时候，才执行 while 循环体
        while h:
            # h 是被 heapq 模块维护的列表结构，是堆有序的
            cur_size = h[0][0]

            cur_res = []
            for _ in range(cur_size):
                cur_res.append(heapq.heappop(h)[1])

            res.append(cur_res)
        return res
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是数组 `groupSizes` 的大小。（1）放入最小堆，需要一次遍历；（2）从最小堆取出，$O(1)$；（3）最小堆内元素调整：$O(\log N)$；
+ 空间复杂度：$O(N)$，最小堆里最多需要存放 $N$ 个元素。



---

```java

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.PriorityQueue;

public class Solution {

    public List<List<Integer>> groupThePeople(int[] groupSizes) {
        int len = groupSizes.length;
        List<List<Integer>> res = new ArrayList<>();
        // 特判
        if (len == 0) {
            return res;
        }

        // 使用最小堆，int[] 的长度为 2，第 1 个数是数组元素，第 2 个数是数组下标，把数和下标绑定在了一起，在堆中参与比较的是数，下标是依附于数的
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(len, Comparator.comparingInt(o -> o[0]));
        for (int i = 0; i < len; i++) {
            minHeap.add(new int[]{groupSizes[i], i});
        }

        while (!minHeap.isEmpty()) {
            int curSize = minHeap.peek()[0];

            List<Integer> currList = new ArrayList<>();
            for (int i = 0; i < curSize; i++) {
                currList.add(minHeap.poll()[1]);
            }

            res.add(currList);
        }
        return res;
    }
}
```

