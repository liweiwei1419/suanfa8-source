---
title: 25.1 最小生成树简介
icon: yongyan
category: 图论
tags:
  - 最小生成树
---

### 第 20 章 图论算法（最小生成树）

+ 文章：[最小生成树算法（Prim、Kruskal）](https://juejin.im/post/6858481283715039240)；


最小生成树算法（Minimum Spanning Tree，MST）。

## 最小生成树算法的应用场景与前提

+ 连通图：在完全连通的情况下，拥有最小生成树；
+ 无向图：最小生成树算法解决的是这样一类问题，从任意一个顶点能到达这个图的其它顶点，且耗费最少，故单向图不适用于这个场景；
+ 带权图：如果无权，可以认为权值是 $1$，带权的情况应用范围更广。

在不连通的情况下，每个极大连通子图拥有最小生成树，则形成最小生成森林。为了简化问题，我们这里只谈完全连通情况下的最小生成树。

## 应用

布线设计：使得边能够连通所有顶点，并且耗费最少。

## 两个算法的理论基础：切分定理

###  什么是切分

把图中的结点分为两个部分，称为一个切分（Cut）。如果一个边的两个端点，属于切分（Cut）不同的两边，这个边称为横切边（Crossing Edge）。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7bb44c5eb8704bd58ba4d5ab7dd6e895~tplv-k3u1fbpfcp-zoom-1.image)

### 切分定理告诉我们：对于任意切分，最短的横切边一定属于最小生成树

切分定理：在一幅加权图中，给定**任意**切分，所有横切边中权重**最小**的边一定属于图的最小生成树。

切分定理的关键字是「任意」。

说明：
+ 对给定的任意切分都成立，这一点非常重要；
+ 有了切分定理，就可以从一个顶点开始，一点一点扩散，直至找到了所有的顶点，最小生成树就找到了。

### 理解切分定理

理解切分定理的关键是关于树的两条性质：
+ 性质1：一棵树任意连接两个顶点，会形成环；
+ 性质2：一棵树任意删除一条边，就会分裂成两棵树。

补充说明：

+ 把树看成图，树是一个连通图，从一个顶点可以到达图中任意一个顶点；
+ 连接不同的树的任意两个顶点，会形成一棵更大的树。

### 证明切分定理

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b08b8f02af9e4ffc9415f04516e68de4~tplv-k3u1fbpfcp-zoom-1.image)

证明切分定理可以使用「反证法」，这个证明看起来就跟什么都没说一样。

证明：

+ 假设我们选择了横切边中不是最短的那条边（e1），此时得到最小生成树；
+ 由于存在最短的横切边（e2），把最短的横切边加进来，**就形成了一个环**；
+ 此时我们去掉最开始选择的边（e1），环有变成了一棵树，并且由于 e2 < e1，我们就找到了权值之和更小的生成树，与一开始的「最小生成树」的最小性矛盾，故对于任意切分，横切边中最短的那条边一定属于「最小生成树」。

我们先说 Kruskal 算法，因为它的描述很简单，Kruskal 算法的实现需要用到并查集。然后介绍 Prim 算法，Prim 算法的实现需要用到优先队列。

## Kruskal 算法

> 基于切分定理，把边按照权值从小到大的顺序排好，一条一条拿出来，如果构成了环，就将当前边舍弃，知道找到了「顶点数 -1」 条边，最小生成树就找到了。

我们从下面这张图开始。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcbc8e8c80e1499993d33825a29b15b0~tplv-k3u1fbpfcp-zoom-1.image)

边「2-6」是此时最短的边，我们选出这条边以后，把这条边的两个顶点标注为红色，此时出现了一个切分。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60dbecb35ac3473cabd3ba731495d124~tplv-k3u1fbpfcp-zoom-1.image)

然后我们在黑色部分的边中选出最短的边「2-3」，把顶点 3 标注为红色，此时又出现了一个切分。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75acf182047348eda7cf3fb36ce30fbd~tplv-k3u1fbpfcp-zoom-1.image)

然后我们在黑色部分的边中选出最短的边「3-4」，把顶点 4 标注为红色，此时又出现了一个切分。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cbbf2ba36f041ae9e64de8b6ba2f754~tplv-k3u1fbpfcp-zoom-1.image)

然后我们在黑色部分的边中选出最短的边「0-1」，把这条边的两个顶点标注为红色，此时又出现了一个切分。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a8a83cc2d464313b88ad23587aa7711~tplv-k3u1fbpfcp-zoom-1.image)

此时最短的边是边「4-6」由于顶点  4 和顶点 6 都在红色阵营里，它不是横切边，将它舍弃，考虑剩下黑色部分的边中选出最短的边「5-6」。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19777e2b5e6644c1a95c66182ebca05f~tplv-k3u1fbpfcp-zoom-1.image)

此时虽然所有的顶点都是红色的，但是它们目前是分开的，所以整体可以看出是一个切分。选出最短的边，此时最短的边有两条，任意选出一条即可。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ea9cd6c6c34450786bb030ee2644890~tplv-k3u1fbpfcp-zoom-1.image)

最小生成树如下图：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bcbfb2bba9e409ea016a3d463ba8ace~tplv-k3u1fbpfcp-zoom-1.image)

下面是代码实现，为了突出算法思想，我们简化了编码，省去了很多判断。

**参考代码 1**：
```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Kruskal {

    /**
     * 最小生成树的权值之和
     */
    private int mstCost;

    public int getMstCost() {
        return mstCost;
    }

    /**
     * 最小生成树的边的列表
     */
    private List<int[]> mst;

    public List<int[]> getMst() {
        return mst;
    }

    /**
     * @param V
     * @param edges 每条边的定义：[起始点, 终点, 权值]
     */
    public Kruskal(int V, int[][] edges) {
        int E = edges.length;
        if (E < V - 1) {
            throw new IllegalArgumentException("参数错误");
        }
        mst = new ArrayList<>(E - 1);

        // 体现了贪心的思想，从权值最小的边开始考虑
        Arrays.sort(edges, Comparator.comparingInt(o -> o[2]));

        UnionFind unionFind = new UnionFind(V);
        // 当前找到了多少条边
        int count = 0;
        for (int[] edge : edges) {
            // 如果形成了环，就继续考虑下一条边
            if (unionFind.isConnected(edge[0], edge[1])) {
                continue;
            }

            unionFind.union(edge[0], edge[1]);

            this.mstCost += edge[2];
            mst.add(new int[]{edge[0], edge[1], edge[2]});
            count++;
            if (count == V - 1) {
                break;
            }
        }
    }

    private class UnionFind {

        private int[] parent;

        private int count;
        private int N;

        public UnionFind(int N) {
            this.N = N;
            this.count = N;
            this.parent = new int[N];
            for (int i = 0; i < N; i++) {
                parent[i] = i;
            }
        }

        public int find(int x) {
            while (x != parent[x]) {
                x = parent[x];
            }
            return x;
        }

        public void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX == rootY) {
                return;
            }

            parent[rootX] = rootY;
            count--;
        }

        public int getCount() {
            return count;
        }

        public boolean isConnected(int x, int y) {
            return find(x) == find(y);
        }
    }

    public static void main(String[] args) {
        int N = 7;
        int[][] edges = {{0, 1, 4},
                {0, 5, 8},
                {1, 2, 8},
                {1, 5, 11},
                {2, 3, 3},
                {2, 6, 2},
                {3, 4, 3},
                {4, 5, 8},
                {4, 6, 6},
                {5, 6, 7},
        };
        Kruskal kruskal = new Kruskal(N, edges);
        int mstCost = kruskal.getMstCost();
        System.out.println("最小生成树的权值之和：" + mstCost);
        List<int[]> mst = kruskal.getMst();
        System.out.println("最小生成树的边的列表：");
        for (int[] edge : mst) {
            System.out.println("[" + edge[0] + "-" + edge[1] + "]" + "，权值：" + edge[2]);
        }
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(E \log E)$，这里 $E$ 是图的边数；
+ 空间复杂度：$O(V)$，这里 $V$ 是图的顶点数，并查集需要 $V$ 长度的数组空间。

## Prim 算法

> 基于切分定理，可以从任意一个顶点开始，一点一点扩散，在扩散的过程中形成不同的切分，从不同的切分里选出横切边最短的边，直至找到了所有的顶点（或者说直到找到了「顶点数 - 1」条边），最小生成树就找到了。

我们来看一个具体的例子：

最开始的图是这样的。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9863e2b208c245429f6d939155acee78~tplv-k3u1fbpfcp-zoom-1.image)

从任意一个顶点开始，我们这里选择编号为 0 的顶点。形成如下切分，边「0-1」和边「0-5」为当前切分的横切边。 

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab61cb748d384f66b78a26b96ca2999e~tplv-k3u1fbpfcp-zoom-1.image)

选出最短的横切边「0-1」（长度为 $4$），加入集合 `S`，然后将 1 纳入红色阵营，形成新的切分。此时考虑顶点 1 的所有邻边，它们都是横切边，加入集合 `S`。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca8d4975ba3141f7846905d01450200b~tplv-k3u1fbpfcp-zoom-1.image)

选出最短的横切边，此时有 2 条长度相等的横切边，任意选出一条即可，这里我们选边「1-2」。此时考虑顶点 2 的所有邻边，它们都是横切边，加入集合 `S`。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/339bc38742914448975a85214b9da76f~tplv-k3u1fbpfcp-zoom-1.image)

选出最短的横切边「2-6」， 把顶点 2 的所有邻边加入 `S`，它们都是横切边。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b04ac3514dd04041b14d2d6ec10103af~tplv-k3u1fbpfcp-zoom-1.image)


选出最短的横切边「2-3」， 把顶点 3 的所有邻边加入 `S`，它们都是横切边。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b157630c1c943b7bb5077874ce731b8~tplv-k3u1fbpfcp-zoom-1.image)

选出最短的横切边「3-4」， 把虑顶点 4 的所有邻边加入 `S`，请注意：**此时，以前是横切边的边「4-6」不再是横切边**，我们虽然发现了这件事情，但是程序此时还看不到。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc7cad9ab50947de9e4f9c8af18ac0de~tplv-k3u1fbpfcp-zoom-1.image)

接下来选出集合 `S` 中最短的边「4-6」，此时程序才会去检查，边「4-6」是不是横切边。因此程序总是在拿出边的时候，检查是不是横切边，不是的话，丢弃。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fc738d2184f422fb48ef2491b5d5be3~tplv-k3u1fbpfcp-zoom-1.image)

接下来，从集合 `S` 中最短的边「5-6」，此时我们找出了 6 条边。「7 个顶点 6 条边」，组成了最小生成树。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dffebb8e44a6496783c722f2104a5899~tplv-k3u1fbpfcp-zoom-1.image)

Prim 算法寻找「最小生成树」是这样的：从没有切分开始，逐渐形成切分，到最后回到了没有切分。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f99d0b03ba4f41afa091c176be02459f~tplv-k3u1fbpfcp-zoom-1.image)

**参考代码 2**：

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Set;

public class Prim {

    private int mstCost;

    public int getMstCost() {
        return mstCost;
    }

    private List<int[]> mst;

    public List<int[]> getMst() {
        return mst;
    }

    public Prim(int V, int[][] edges) {
        int len = edges.length;
        if (len < V - 1) {
            throw new IllegalArgumentException("参数错误");
        }
        mst = new ArrayList<>(len - 1);

        Set<int[]>[] adj = new HashSet[V];
        for (int i = 0; i < V; i++) {
            adj[i] = new HashSet<>();
        }

        for (int[] edge : edges) {
            // [from, to, weight]
            adj[edge[0]].add(new int[]{edge[0], edge[1], edge[2]});
            adj[edge[1]].add(new int[]{edge[1], edge[0], edge[2]});
        }

        boolean[] visited = new boolean[V];
        visited[0] = true;

        // PriorityQueue<int[]> minHeap = new PriorityQueue<>(len, (o1, o2) -> o1[2] - o2[2]);
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(len, Comparator.comparingInt(o -> o[2]));
        minHeap.addAll(adj[1]);

        int count = 0;
        while (!minHeap.isEmpty()) {
            int[] edge = minHeap.poll();

            if (visited[edge[0]] && visited[edge[1]]) {
                continue;
            }

            this.mstCost += edge[2];
            mst.add(new int[]{edge[0], edge[1], edge[2]});
            count++;
            if (count == (V - 1)) {
                break;
            }

            int newV;
            if (visited[edge[0]]) {
                newV = edge[1];
            } else {
                newV = edge[0];
            }

            visited[newV] = true;
            for (int[] successor : adj[newV]) {
                if (!visited[successor[1]]) {
                    minHeap.add(successor);
                }
            }
        }
    }

    public static void main(String[] args) {
        int V = 7;
        int[][] edges = {{0, 1, 4},
                {0, 5, 8},
                {1, 2, 8},
                {1, 5, 11},
                {2, 3, 3},
                {2, 6, 2},
                {3, 4, 3},
                {4, 5, 8},
                {4, 6, 6},
                {5, 6, 7},
        };
        Prim prim = new Prim(V, edges);
        int mstCost = prim.getMstCost();
        System.out.println("最小生成树的权值之和：" + mstCost);
        List<int[]> mst = prim.getMst();
        System.out.println("最小生成树的边的列表：");
        for (int[] edge : mst) {
            System.out.println("[" + edge[0] + "-" + edge[1] + "]" + "，权值：" + edge[2]);
        }
    }
}
```


**复杂度分析**：

+ 时间复杂度：$O(E \log E)$，这里 $E$ 是图的边数；
+ 空间复杂度：$O(E)$，最坏情况下，所有的边都要进入优先队列。

我们这里介绍的 Prim 算法也叫做 lazy Prim。事实上，并查集的时间复杂度还可以优化到 $E \log V$（一般来说，$V < E$），需要借助索引堆这个数据结构。

索引堆其实就是堆（优先队列）这个数据结构不直接操作数据，而是操作数据的索引，可以达到的额外功效是：

+ 可以方便定位到顶点所在的边的权值；
+ 可以执行修改操作，索引堆会自动调整结构。

索引堆相关的知识点可以在《算法（第 4 版）》这本书里找到，我们这里就不做介绍了。

## 总结

最小生成树的 Kruskal 算法和 Prim 算法都基于「切分定理」，我们再回顾一下：「任意横切边的最短边一定数据最小生成树」。

+ Kruskal 算法从最短的边，一条一条开始考虑，如果新考虑的边与已经考虑的边形成环，就抛弃，进而考虑下一条边。
+ Prim 算法可以从任意一个顶点开始，形成切分，考虑最短的横切边，将还未考虑进来的边依次考虑进来，最后切分消失的时候，就找到了最小生成树。

「力扣」上关于「最小生成树」的练习。

+ 「力扣」第 1135 题：最低成本联通所有城市；
+ 「力扣」第 1168 题：水资源分配优化；
+ 「力扣」第 1489 题：[找到最小生成树里的关键边和伪关键边](https://leetcode-cn.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/)






