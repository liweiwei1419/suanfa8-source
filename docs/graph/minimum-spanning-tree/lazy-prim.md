---
title: 7.11 Prim 算法
icon: yongyan
category: 图论
tags:
  - 最小生成树
---

::: danger Prim 算法的思想
基于切分定理，可以从任意一个顶点开始，一点一点扩散，在扩散的过程中形成不同的切分，从不同的切分里选出横切边最短的边，直至找到了所有的顶点（或者说直到找到了「顶点数 - 1」条边），最小生成树就找到了。
:::

我们来看一个具体的例子：

最开始的图是这样的。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9g6820wj31440hyab6.jpg)

从任意一个顶点开始，我们这里选择编号为 0 的顶点。形成如下切分，边「0-1」和边「0-5」为当前切分的横切边。 

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9g4uoevj311e0ha75e.jpg)

选出最短的横切边「0-1」（长度为 $4$），加入集合 `S`，然后将 1 纳入红色阵营，形成新的切分。此时考虑顶点 1 的所有邻边，它们都是横切边，加入集合 `S`。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9g9hssdj31560hkwfn.jpg)

选出最短的横切边，此时有 2 条长度相等的横切边，任意选出一条即可，这里我们选边「1-2」。此时考虑顶点 2 的所有邻边，它们都是横切边，加入集合 `S`。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9xerxiyj311o0iiab8.jpg)

选出最短的横切边「2-6」， 把顶点 2 的所有邻边加入 `S`，它们都是横切边。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9ztwd1rj311i0j4gmt.jpg)


选出最短的横切边「2-3」， 把顶点 3 的所有邻边加入 `S`，它们都是横切边。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9gg567gj312i0iegmv.jpg)

选出最短的横切边「3-4」， 把虑顶点 4 的所有邻边加入 `S`，请注意：**此时，以前是横切边的边「4-6」不再是横切边**，我们虽然发现了这件事情，但是程序此时还看不到。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9glt1inj31480jmwfs.jpg)

接下来选出集合 `S` 中最短的边「4-6」，此时程序才会去检查，边「4-6」是不是横切边。因此程序总是在拿出边的时候，检查是不是横切边，不是的话，丢弃。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9gmdxpbj30zc0i23zr.jpg)

接下来，从集合 `S` 中最短的边「5-6」，此时我们找出了 6 条边。「7 个顶点 6 条边」，组成了最小生成树。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9hevl0ej31180hqt9x.jpg)

Prim 算法寻找「最小生成树」是这样的：从没有切分开始，逐渐形成切分，到最后回到了没有切分。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9hg3chij31340hsdgv.jpg)

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