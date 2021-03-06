---
title: 「力扣」第 802 题：找到最终的安全状态（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
  - 拓扑排序
---

这是今天（2021 年 8 月 5 日）的每日一题，主要考察了图的遍历。在充分理解题意的基础上，如果有一定知识储备和题量积累，有思路其实并不难。然后就是编写代码、仔细调试。

## 题目描述

在有向图中，我们从某个节点和每个转向处开始，沿着图的有向边走。 如果我们到达的节点是终点 (即它没有连出的有向边)，我们停止。

现在，如果我们最后能走到终点，那么我们的起始节点是最终安全的。 更具体地说，存在一个自然数 `K`, 无论选择从哪里开始行走，我们走了不到 `K` 步后必能停止在一个终点。

哪些节点最终是安全的？ 结果返回一个有序的数组。

该有向图有 `N` 个节点，标签为 `0`, `1`, ..., `N - 1`, 其中 `N` 是 `graph` 的节点数. 图以以下的形式给出: `graph[i]` 是节点 `j` 的一个列表，满足 `(i, j)` 是图的一条有向边。

```
示例：
输入：graph = [[1, 2], [2, 3], [5], [0], [5], [], []]
输出：[2, 4, 5, 6]
这里是上图的示意图。
```

![](https://tva1.sinaimg.cn/large/008i3skNgy1gu5qjlozw4j615c0dmjs802.jpg)

**提示**：

- `n == graph.length`
- $1 \le n \le 10^4$
- $0 \le graph[i].length \le n$
- `graph[i]` 按严格递增顺序排列。
- 图中可能包含自环。
- 图中边的数目在范围 $[1, 4 * 10^4]$ 内。

## **理解题意**

- 该问题给出的图是「有向图」；
- 「安全终点」的意思是：它的所有前驱结点可以经过有限步来到一个 **没有后继结点的结点**。也就是，**如果结点在环里是不是安全的**；

![在「环」中的顶点不是「最终安全」的](https://tva1.sinaimg.cn/large/008i3skNgy1gt5kdwgocqj31dc0pujto.jpg)

## 思路分析

题目要求我们判断一个 **有向图** 是否存在环，可以使用「深度优先遍历」，也可以使用「广度优先遍历」。

## 方法一：深度优先遍历

- 由于有向图存在环，因此在深度优先遍历的时候需要使用一个布尔数组 `visited` 记录某个顶点是否被访问过；
- 由于还需要记录某个结点，在遍历以后是否处在环中，可以丰富布尔数组的含义，以及利用递归函数的返回值，因此定义：
  - 拓展布尔数组 `visited` 的含义，除了表示访问过还是未访问，还需要表示是否存在回路。因此，可以把布尔数组设置成包装类型 `Boolean`：`null` 表示当前还没有被访问过，`false` 表示从当前顶点出发不存在环，`true` 表示从当前顶点出发存在环；
  - 深度优先遍历的返回值，如果为 `true` ，表示从该顶点遍历，存在回路；如果为 `false` ，表示从该顶点遍历，不存在回路。

**参考代码 1**：

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {

    /**
     * 使用 Boolean 利用了 null 表示还未计算出结果
     * true 表示从当前顶点出发的所有路径存在环
     * false 表示从当前顶点出发的所有路径不存在环
     */
    private Boolean[] visited;

    private int[][] graph;

    public List<Integer> eventualSafeNodes(int[][] graph) {
        int len = graph.length;
        this.visited = new Boolean[len];
        this.graph = graph;

        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < len; i++) {
            // 如果从当前顶点出发的所有路径存在环，该顶点跳过
            if (dfs(i)) {
                continue;
            }
            res.add(i);
        }
        return res;

    }

    /**
     * @param u
     * @return 从顶点 u 出发的所有路径是不是有一条能够回到 u，有回路就返回 true
     */
    private boolean dfs(int u) {
        if (visited[u] != null) {
            return visited[u];
        }


        // 先假设从 u 出发的所有路径存在环
        visited[u] = true;
        // 结点 u 的所有后继结点都不能回到自己，才能认为结点 u 是安全的
        for (int successor : graph[u]) {
            if (dfs(successor)) {
                return true;
            }
        }
        // 程序能走到这里，说明从 u 出发的所有顶点都不存在环，因此 visited[u] = false
        visited[u] = false;
        return false;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(V + E)$，这里 $V$ 为图的顶点总数，$E$ 为图的边数；
- 空间复杂度：$O(V + E)$。

**说明**：在声明变量、设计递归函数的时候，**需要明确递归函数的变量的定义和递归函数的返回值**，写上必要的注释，这样在编写代码逻辑的时候，才不会乱。

## 方法二：广度优先遍历（拓扑排序）

广度优先遍历，从「终点」开始遍历，如何知道哪些顶点是终点呢？可以在建立邻接表的时候，把邻接表建立成逆邻接表，也就是把图中给出的有向图中的边 **反向**。从没有前驱结点（没有任何顶点指向它）的顶点开始广度优先遍历，遍历到的所有结点就是「最终安全」的。

在有向图中进行广度优先遍历，有一个典型的应用场景，称为「拓扑排序」，需要借助「入度数组」的概念。题目要求「答案数组中的元素应当按 **升序** 排列」，所以访问过的结点需要先记录下来，最后统一输出。

如果对「拓扑排序」不太熟悉的朋友，可以做一下「力扣」第 207 题和第 210 题，多写几次，就会发现其实是一个很简单的东西。

![建立「逆邻接表」](https://tva1.sinaimg.cn/large/008i3skNgy1gt5l7zb8h0j315i0n440n.jpg)

**参考代码 2**：

```java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

public class Solution {

    public List<Integer> eventualSafeNodes(int[][] graph) {
        int N = graph.length;
        // 第 1 步：建图，建立逆邻接表
        Set<Integer>[] reverses = new HashSet[N];
        for (int i = 0; i < N; i++) {
            reverses[i] = new HashSet();
        }

        int[] inDegree = new int[N];
        for (int i = 0; i < N; i++) {
            for (int j : graph[i]) {
                reverses[j].add(i);
                inDegree[i]++;
            }
        }

        // 第 2 步：拓扑排序，由于需要按顺序输出，把拓扑排序访问到的结点设置为 true
        // 把入度为 0 的点加入队列，从这些顶点开始广度优先遍历
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < N; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
            }
        }

        boolean[] visited = new boolean[N];
        List<Integer> res = new ArrayList<>();
        while (!queue.isEmpty()) {
            int front = queue.poll();
            // 重点理解：从没有入度的结点出发，访问到的所有的结点都是安全的
            visited[front] = true;
            for (int successor : reverses[front]) {
                inDegree[successor]--;
                if (inDegree[successor] == 0) {
                    queue.offer(successor);
                }
            }
        }

        // 第 3 步：已经访问过的结点就是「安全结点」
        for (int i = 0; i < N; i++) {
            if (visited[i]) {
                res.add(i);
            }
        }
        return res;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(V + E)$，这里 $V$ 为图的顶点总数，$E$ 为图的边数；
- 空间复杂度：$O(V + E)$。

## 总结

图的问题很多时候就是在图中做一次遍历，根据不同的要求，选择深度优先遍历或者广度优先遍历，或者两种遍历都可以。在学习的时候需要多练习，不同的问题需要注意的细节不一样。自己写过几遍，才算真正掌握了，其它算法为也是这样。

这就是今天的分享，感谢大家的收看。
