---
title: 26.4 Kruskal 算法
icon: yongyan
category: 图论
tags:
  - 最小生成树
---

::: danger Kruskal 算法的思想
基于切分定理，把边按照权值从小到大的顺序排好，一条一条拿出来，如果构成了环，就将当前边舍弃，知道找到了「顶点数 -1」 条边，最小生成树就找到了。
:::


我们从下面这张图开始。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9cgbmf1j310s0hu3zm.jpg)

边「2-6」是此时最短的边，我们选出这条边以后，把这条边的两个顶点标注为红色，此时出现了一个切分。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9clwounj311g0hy3zn.jpg)

然后我们在黑色部分的边中选出最短的边「2-3」，把顶点 3 标注为红色，此时又出现了一个切分。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9cn8me6j31320j83zp.jpg)

然后我们在黑色部分的边中选出最短的边「3-4」，把顶点 4 标注为红色，此时又出现了一个切分。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9cp5y3kj311u0iimyc.jpg)

然后我们在黑色部分的边中选出最短的边「0-1」，把这条边的两个顶点标注为红色，此时又出现了一个切分。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9daaoodj313e0is3zq.jpg)

此时最短的边是边「4-6」由于顶点  4 和顶点 6 都在红色阵营里，它不是横切边，将它舍弃，考虑剩下黑色部分的边中选出最短的边「5-6」。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9f8fr2nj31640kqmyi.jpg)

此时虽然所有的顶点都是红色的，但是它们目前是分开的，所以整体可以看出是一个切分。选出最短的边，此时最短的边有两条，任意选出一条即可。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9fhuqfxj31140i075i.jpg)

最小生成树如下图：

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa9fz0p0yj311y0i4jsf.jpg)

下面是代码实现，为了突出算法思想，我们简化了编码，省去了很多判断。

**参考代码**：

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