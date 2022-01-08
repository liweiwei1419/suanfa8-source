---
title: 「力扣」第 684 题：冗余连接（中等）
icon: yongyan
category: 并查集
tags:
  - 并查集
---

这是一道考察「并查集」很基础的问题。

+ 题目链接：[684. 冗余连接](https://leetcode-cn.com/problems/redundant-connection/)。

## 题目描述

在本问题中, 树指的是一个连通且无环的**无向**图。

输入一个图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。

结果图是一个以`边`组成的二维数组。每一个`边`的元素是一对`[u, v]` ，满足 `u < v`，表示连接顶点`u` 和`v`的**无向**图的边。

返回一条可以删去的边，使得结果图是一个有着N个节点的树。如果有多个答案，则返回二维数组中最后出现的边。答案边 `[u, v]` 应满足相同的格式 `u < v`。

**示例 1：**

```
输入: [[1,2], [1,3], [2,3]]
输出: [2,3]
解释: 给定的无向图为:
1
/ \
2 - 3
```

**示例 2：**

```
输入: [[1,2], [2,3], [3,4], [1,4], [1,5]]
输出: [1,4]
解释: 给定的无向图为:
5 - 1 - 2
 |   |
 4 - 3
```

**注意:**

- 输入的二维数组大小在 3 到 1000。
- 二维数组中的整数在1到N之间，其中N是输入数组的大小。

**更新(2017-09-26):**
我们已经重新检查了问题描述及测试用例，明确图是***无向*** 图。对于有向图详见**[冗余连接II](https://leetcodechina.com/problems/redundant-connection-ii/description/)。**对于造成任何不便，我们深感歉意。

**参考代码**：

```java
import java.util.Arrays;

public class Solution {

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

    public static void main(String[] args) {
        int[][] edges = {{1, 2}, {2, 3}, {3, 1}, {1, 4}};
        Solution solution = new Solution();
        int[] res = solution.findRedundantDirectedConnection(edges);
        System.out.println(Arrays.toString(res));
    }
}

```

