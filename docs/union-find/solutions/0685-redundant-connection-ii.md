---
title: 「力扣」第 685 题：冗余连接 II（困难）
icon: yongyan
categories: 并查集
tags:
  - 并查集
---

## 「力扣」第 685 题：冗余连接 II（困难）

> 注意细节的调试。

+ [链接](https://leetcode-cn.com/problems/redundant-connection-ii/)

> 在本问题中，有根树指满足以下条件的**有向**图。该树只有一个根节点，所有其他节点都是该根节点的后继。每一个节点只有一个父节点，除了根节点没有父节点。
>
> 输入一个有向图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。
>
> 结果图是一个以`边`组成的二维数组。 每一个`边` 的元素是一对 `[u, v]`，用以表示**有向**图中连接顶点 `u` and `v`和顶点的边，其中父节点`u`是子节点`v`的一个父节点。
>
> 返回一条能删除的边，使得剩下的图是有N个节点的有根树。若有多个答案，返回最后出现在给定二维数组的答案。
>
> **示例 1:**
>
> ```
> 输入: [[1,2], [1,3], [2,3]]
> 输出: [2,3]
> 解释: 给定的有向图如下:
>   1
>  / \
> v   v
> 2-->3
> ```
>
> **示例 2:**
>
> ```
> 输入: [[1,2], [2,3], [3,4], [4,1], [1,5]]
> 输出: [4,1]
> 解释: 给定的有向图如下:
> 5 <- 1 -> 2
>      ^    |
>      |    v
>      4 <- 3
> ```
>
> **注意:**
>
> - 二维数组大小的在3到1000范围内。
> - 二维数组中的每个整数在1到N之间，其中 N 是二维数组的大小。
>

Java 代码：

```java
import java.util.Arrays;

public class Solution {

    public int[] findRedundantDirectedConnection(int[][] edges) {
        int len = edges.length;

        // 入度数组，记录指向某个结点的边的条数
        int[] inDegree = new int[len + 1];
        for (int[] edge : edges) {
            inDegree[edge[1]]++;
        }

        // 从后向前看，如果某个顶点的入度为 2，尝试把它去掉，看看会不会构成环
        for (int i = len - 1; i >= 0; i--) {
            if (inDegree[edges[i][1]] == 2) {
                // 如果不构成环，这条边就是要去掉的那条边
                if (!judgeCircle(edges, len, i)) {
                    return edges[i];
                }
            }
        }

        // 从后向前看，如果某个顶点的入度为 1，尝试把它去掉，看看会不会构成环
        for (int i = len - 1; i >= 0; i--) {
            if (inDegree[edges[i][1]] == 1) {
                // 如果不构成环，这条边就是要去掉的那条边
                if (!judgeCircle(edges, len, i)) {
                    return edges[i];
                }
            }
        }
        throw new IllegalArgumentException("输入不符合要求。");
    }

    /**
     * 将 remove 去掉以后，剩下的有向边是否构成环
     *
     * @param edges
     * @param len
     * @param remove
     * @return 构成环，返回 true
     */
    private boolean judgeCircle(int[][] edges, int len, int remove) {
        UnionFind unionFind = new UnionFind(len + 1);
        for (int i = 0; i < len; i++) {
            if (i == remove) {
                continue;
            }
            if (!unionFind.union(edges[i][0], edges[i][1])) {
                // 合并失败，表示 edges[i][0] 和 edges[i][1] 在一个连通分量里，即构成了环
                return true;
            }
        }
        return false;
    }

    private class UnionFind {
        private int[] parent;

        public UnionFind(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        public int find(int x) {
            while (x != parent[x]) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        /**
         * @param x
         * @param y
         * @return 如果合并成功返回 true
         */
        public boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX == rootY) {
                return false;
            }
            parent[rootX] = rootY;
            return true;
        }
    }
}
```

