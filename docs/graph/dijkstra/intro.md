---
title: 24.1 图论算法-单源最短路径
icon: yongyan
category: 图论
tags:
  - Dijkstra
---



+ 掘金地址：[Dijkstra 算法（解决没有负权边的单源最短路径问题）](https://juejin.im/post/6857030974631313422)；
+ [公众号地址](https://mp.weixin.qq.com/s/Gzm00enOVtyMZe_Qc-UIaw)。


封面：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa95zwh7pj30w60eajs1.jpg)

E. W. Dijkstra（1930/05/11-2002/08/06），杰出的计算机科学家，1972 年图灵奖得主。

## 参考资料

+ 《算法（第 4 版）》：这本书上的给出的是「索引堆」（时间复杂度：$O(E \log V)$）的解法，由于「索引堆」理解起来有一定难度，因此我们使用「优先队列」（可以认为就是「堆」）作为代码实现，并且直接给出了「堆优化」的版本（时间复杂度：$O(E\log E)$）；
+ 《算法导论》第 24.3 节：Dijkstra 算法

## Dijkstra 算法要解决的问题

+ 带权图的最短路径问题；
+ 有向和无向均适用；
+ 前提：没有负权边。

解决没有负权边的单源最短路径问题：即从一个顶点出发到其它顶点的最短路径。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa95yub99j31ma0pcaca.jpg)

说明：这个例子来自于 liuyubobobo 老师在慕课网上开设的课程 [算法与数据结构-综合提升 C++版](https://coding.imooc.com/class/71.html) ，选择这个例子是因为它足够简单，能够把 Dijkstra 算法的思想说清楚。

## 几何直观

+ 理解源点，我们这里讲解的例子都认为 `0` 是源点；
+ 把源点从水平平面上拉起来，形成下面的图形。

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxa96485fuj30n40vgjsb.jpg" style="zoom: 50%;" />

说明：这些弯曲的边，都是被「松弛操作」淘汰的边。

## 松弛操作（重点理解「没有负权边」）

+ 0 -> 2 这条路径，就是从顶点 0 到顶点 2 的最短路径。**由于没有负权边，因此不会有一条边，我们绕道走回到 顶点 2，路径之和更小**。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96kq086j31dy0bkq3q.jpg)

事实上，从 0 到 1 ，我们经过 2 再来到 1 ，路径之和 $2 + 1 < 5$，这就是松弛操作的意义。就像我们坐飞机，有的时候经停，费用可能更低。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96nvc68j31n20dwdho.jpg)

再次理解松弛操作：$5$ 比 $2$ 大，$5$ 加上一个**非负整数**不可能比 $2$ 还小。

## Dijkstra 算法的执行步骤

最开始的样子，0 到自己路径最短，最短路径为 0，到其它顶点暂时认为是负无穷。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96qs14gj319o0lsq4r.jpg)

从 0 出发的所有边中，到 2 的距离最短，因此我们就可以说 0 -> 2 这条边的长度，是从 0 开始到 2 的最短路径。
同时更新从 0 出发到它的相邻顶点的距离。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96s83fyj31fw0k6jtm.jpg)

接下来考察，从 2 出发到其相邻顶点的距离有没有可能更短。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96tjyh8j319a0hu75r.jpg)

这个时候还没确定的顶点中，最短距离的顶点是 1 （距离是 3），因此源点 0 到顶点 1 的最短距离就是 3。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96wrorrj317y0hq3zw.jpg)

现在我们更新出 3 出发的顶点，只有 3 -> 4 这条边（长度为 2）。现在到 3 的距离是 5，$5 + 2 > 4$，因此不更新 4 的距离。松弛操作没有找到更优的解。

现在没有确定的顶点中，距离最短的是 4 ，从 4 出发没有相邻的顶点。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96zl5mwj31700hemyf.jpg)

剩下的一个顶点就是 3 ，因此最后我们确定了 3 的距离。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa97402odj316u0hm0u1.jpg)


现在我们再来看一下 Dijkstra 最初的想法，就很容易理解了。松弛操作没有选择的边，就是这个图例弯曲的边，它们一定不会是组成单源最短路径的边。


<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5579e54bce14d2697685ec34d686e25~tplv-k3u1fbpfcp-zoom-1.image" style="zoom:50%;" />


## 代码实现

我们直接写基于优先队列的版本，很多时候也叫「堆优化」的 Dijkstra 算法。

**参考代码 1**：

+ 我们简化的图的构建，使用一个数组表示一条有向边：$[起点, 终点, 权值]$；
+ 用布尔数组 `visited` 表示从源点出发，哪些顶点已经被访问过，相应的在优先队列里的逻辑是；把还没有访问过的顶点所在的边，权值最小的拿出来，做一次松弛操作；
+ 松弛操作的代码在初学的时候可能很难理解，希望多练习，加深体会。


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

+ 时间复杂度：$O(E \log E)$，这里 $E$ 是图中边的个数，最坏情况下每条边都会进入优先队列，从优先队列里选出当前还没有遍历到的顶点的最小权值的边，复杂度为 $O(\log E)$；
+ 空间复杂度：$O(E + V)$，最短路径数组的长度是 $V$，这里 $V$ 是图中顶点的个数，优先队列的长度是 $E$。

（复杂度分析是我的薄弱项，如果大家觉得有问题，欢迎指正。）


以上给出的代码，稍作修改，可以直接运行在「力扣」第 743 题：[网络延迟时间](https://leetcode-cn.com/problems/network-delay-time)。


## 有负权边的情况

有负权边的情况需要使用 Bellman-Ford 算法，Bellman-Ford 算法有一个基于队列的优化算法，叫 Shortest Path Faster Algorithm（SPFA），在《算法（第 4 版）》这本书上有介绍。

以后我们有机会再和大家做总结。

## 图论知识体系阶段总结（不全面）

### 最小生成树算法

|         | 理论基础 | 算法思想 | 数据结构 | 步骤                                                     |
| ------- | -------- | -------- | -------- | -------------------------------------------------------- |
| Prim    | 切分定理 | 动态规划 | 优先队列 | 从 1 个点开始，找到 v - 1 条边，不能形成环（不在树中）。 |
| Kruskal | 切分定理 | 贪心     | 并查集   | 从最短的边开始，一条一条添加，如果形成环，就丢弃。       |

### 最短路径算法


|              | 理论基础 | 用途                                   | 要求         | 算法思想 | 步骤                                          |
| :----------- | -------- | -------------------------------------- | ------------ | -------- | --------------------------------------------- |
| Dijkstra     | 松弛操作 | 求单源最短路径                         | 不能有负权边 | 动态规划 | 1、找最短；2、确定一个解；3、更新。           |
| Bellman-Ford | 松弛操作 | 可以检测负权环，跑一遍可以得到负权环。 |              | 动态规划 | 对所有的边进行 v - 1 轮（最坏情况）松弛操作。 |
| Floyd        | 松弛操作 | 求多源最短路径。                       |              | 动态规划 |                                               |

说明：有负权环，对于求单源最短路径问题是没有意义的。