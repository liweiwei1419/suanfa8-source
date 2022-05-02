---
title: 「力扣」第 310 题：最小高度树（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 拓扑排序
---

- 题目链接：[310. 最小高度树](https://leetcode-cn.com/problems/minimum-height-trees/)；
- 题解链接：[拓扑排序（广度优先遍历，Java、Python）](https://leetcode-cn.com/problems/minimum-height-trees/solution/tan-xin-fa-gen-ju-tuo-bu-pai-xu-de-si-lu-python-da/)。

## 题目描述

树是一个无向图，其中任何两个顶点只通过一条路径连接。 换句话说，一个任何没有简单环路的连通图都是一棵树。

给你一棵包含 `n` 个节点的树，标记为 `0` 到 `n - 1` 。给定数字 `n` 和一个有 `n - 1` 条无向边的 `edges` 列表（每一个边都是一对标签），其中 `edges[i] = [ai, bi]` 表示树中节点 `ai` 和 `bi` 之间存在一条无向边。

可选择树中任何一个节点作为根。当选择节点 `x` 作为根节点时，设结果树的高度为 `h` 。在所有可能的树中，具有最小高度的树（即，`min(h)`）被称为 **最小高度树** 。

请你找到所有的 **最小高度树** 并按 **任意顺序** 返回它们的根节点标签列表。

树的 **高度** 是指根节点和叶子节点之间最长向下路径上边的数量。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/09/01/e1.jpg)

```
输入：n = 4, edges = [[1,0],[1,2],[1,3]]
输出：[1]
解释：如图所示，当根是标签为 1 的节点时，树的高度是 1 ，这是唯一的最小高度树。
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/09/01/e2.jpg)

```
输入：n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
输出：[3,4]
```

**示例 3：**

```
输入：n = 1, edges = []
输出：[0]
```

**示例 4：**

```
输入：n = 2, edges = [[0,1]]
输出：[0,1]
```

**提示：**

- $1 \le n \le 2 * 10^4$
- `edges.length == n - 1`
- $0 \le a_i, b_i < n$
- $a_i != b_i$
- 所有 $(a_i, b_i)$ 互不相同
- 给定的输入 **保证** 是一棵树，并且 **不会有重复的边**

## 思路分析

直觉上，**一棵树越靠「外面」的结点，我们越不可能把它作为根结点**，这一点是解决这道问题的关键。我们可以画几张图感受一下：

![image.png](https://pic.leetcode-cn.com/63f5a0f0118b4314b03c2e97264fd12af14c9f104fe96583239e486c324450bd-image.png)

因此，我们使用「剔除边缘结点」的策略，类似于「拓扑排序」的方式，把外面的结点一点一点拿掉，剩下的结点就是产生「最小高度树」的结点。

下面要解决的问题是：结点最后只会剩下 1 个或者 2 个。

> 有的时候分析问题，自己动手，比看别人的思路的理解要深刻。

![image.png](https://pic.leetcode-cn.com/53e7c6f6854eda2dadf4b37ddcb3161b5e141fe7dbb4268fd213cf7d97561a56-image.png)


**画完这张图，我们能归纳出，结点最后只会剩下 1 个或者 2 个**。如果对这个结论还不确定的朋友，不妨多画几张图，把结点个数为 6 个 、7 个时候的情况也考虑一下。

综上所述，总结一下我们的算法：每次总是删除「**出度为 1**」的结点（因为是从叶子开始删），因为树是无向无环图，删除了它们以后，与之相连的结点的出度也相应地减少 1，直到最后剩下 1 个结点或者 2 个结点。

在编码的时候，使用「邻接表」表示图，使用了「出度数组」。关于拓扑排序的知识和代码实现，可以参考[「力扣」第 207 题：课程表](https://leetcode-cn.com/problems/course-schedule/) 和[「力扣」第 210 题：课程表 II](https://leetcode-cn.com/problems/course-schedule-ii/)。

**注意**：


与标准的「拓扑排序」代码不同的地方在于：这个问题是无向图。

+ 「拓扑排序」应用于有向无环图，找到没有指向它的结点，找的是「入度为 $0$」的结点；
+ 当前这个问题，因为是无向图，就不能找「入度为 $0$」的结点了，无向图的「叶子」的特点是，「出度为 $1$」。


**参考代码**：

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class Solution {

    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        // 特判
        if (n < 3) {
            List<Integer> res = new ArrayList<>();
            for (int i = 0; i < n; i++) {
                res.add(i);
            }
            return res;
        }

        // 步骤 1：创建邻接表（无向图）
        // 出度数组，每一次要把入度为 1 的结点剔除
        int[] outDegree = new int[n];
        // 因为是无向图，所以邻接表拿出一条边，两个结点都要存一下
        List<Integer>[] adjs = new ArrayList[n];
        // 初始化
        for (int i = 0; i < n; i++) {
            adjs[i] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            adjs[edge[0]].add(edge[1]);
            adjs[edge[1]].add(edge[0]);
            outDegree[edge[0]] += 1;
            outDegree[edge[1]] += 1;
        }

        // 步骤 2：拓扑排序
        Queue<Integer> queue = new LinkedList<>();
        // 出度为 1 的结点入队
        for (int i = 0; i < n; i++) {
            // 注意：这里是出度为 1
            if (outDegree[i] == 1) {
                queue.offer(i);
            }
        }
        // 注意边界条件 n = 2 和 n = 1 是如何分析出来的
        while (n > 2) {
            int size = queue.size();
            // 一次减去这么多
            n -= size;
            for (int i = 0; i < size; i++) {
                int front = queue.poll();
                // 把它和它的邻接结点的出度全部减 1
                for (Integer successor : adjs[front]) {
                    outDegree[successor]--;
                    if (outDegree[successor] == 1) {
                        queue.offer(successor);
                    }
                }
            }
        }

        List<Integer> res = new ArrayList<>();
        while (!queue.isEmpty()) {
            res.add(queue.poll());
        }
        return res;
    }
}
```



