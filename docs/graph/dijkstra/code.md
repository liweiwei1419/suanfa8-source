---
title: 7.5 代码实现
icon: yongyan
category: 图论
tags:
  - Dijkstra
---

## 代码实现

我们直接写基于优先队列的版本，很多时候也叫「堆优化」的 Dijkstra 算法。

**参考代码 1**：

- 我们简化的图的构建，使用一个数组表示一条有向边：`[起点, 终点, 权值]`；
- 用布尔数组 `visited` 表示从源点出发，哪些顶点已经被访问过，相应的在优先队列里的逻辑是；把还没有访问过的顶点所在的边，权值最小的拿出来，做一次松弛操作；
- 松弛操作的代码在初学的时候可能很难理解，请大家多练习，加深体会。

Java 代码：

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashSet;
import java.util.PriorityQueue;
import java.util.Set;

public class Dijkstra {

    public int[] shortestPath(int[][] edges, int V, int source) {
        // key：结点编号（出度）value：[结点编号（被指向的顶点）,权值]
        Set<int[]>[] adj = new HashSet[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new HashSet<>();
        }
        // 初始化邻接表
        for (int[] time : edges) {
            adj[time[0]].add(new int[]{time[1], time[2]});
        }

        // 初始化 distance 数组和 visited 数组
        int[] distance = new int[V + 1];
        Arrays.fill(distance, 0x7fffffff);
        boolean[] visited = new boolean[V + 1];

        // 起点的 distance 为 0
        distance[source] = 0;
        // 注意：0 无意义，所以需要初始化成为 0
        distance[0] = 0;

        // 注意：这里有一个映射
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(Comparator.comparingInt(o -> distance[o]));
        minHeap.offer(source);

        // 核心思想：考虑的是边执行松弛操作
        while (!minHeap.isEmpty()) {
            // Dijkstra 算法第 1 步：从还没有确定最短路径的顶点所在的边里选出到目前为止最短的权值的边
            Integer v = minHeap.poll();
            if (visited[v]) {
                continue;
            }

            // Dijkstra 算法第 2 步：标记访问，表示这个顶点当前可以确定源点到它的最短路径
            visited[v] = true;

            // Dijkstra 算法第 3 步：从确定的顶点出发，对这些边执行松弛操作
            Set<int[]> successors = adj[v];
            for (int[] edge : successors) {
                int next = edge[0];
                if (visited[next]) {
                    continue;
                }

                // Dijkstra 的核心：松弛操作
                distance[next] = Math.min(distance[next], distance[v] + edge[1]);
                minHeap.offer(next);
            }
        }
        return distance;
    }

    public static void main(String[] args) {
        int[][] times = {
                {0, 1, 5},
                {0, 2, 2},
                {0, 3, 6},
                {1, 4, 1},
                {2, 1, 1},
                {2, 4, 5},
                {2, 3, 3},
                {3, 4, 2}};
        int N = 5;
        int K = 0;
        Dijkstra dijkstra = new Dijkstra();
        int[] distance = dijkstra.shortestPath(times, N, K);
        System.out.println(Arrays.toString(distance));
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(E \log E)$，这里 $E$ 是图中边的个数，最坏情况下每条边都会进入优先队列，从优先队列里选出当前还没有遍历到的顶点的最小权值的边，复杂度为 $O(\log E)$；
- 空间复杂度：$O(E + V)$，最短路径数组的长度是 $V$，这里 $V$ 是图中顶点的个数，优先队列的长度是 $E$。

（复杂度分析是我的薄弱项，如果大家觉得有问题，欢迎指正。）

以上给出的代码，稍作修改，可以直接运行在「力扣」第 743 题：[网络延迟时间](https://leetcode-cn.com/problems/network-delay-time)。
