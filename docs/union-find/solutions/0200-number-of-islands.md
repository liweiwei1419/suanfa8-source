---
title: 「力扣」第 200 题：岛屿的个数（中等）
icon: yongyan
category: 并查集
tags:
  - 并查集
---

::: danger 提示
这是一道典型的使用「并查集」解决的问题，其中二维坐标向一位坐标的转换技巧，非常常见。
:::

+ [题目链接](https://leetcode-cn.com/problems/number-of-islands)

给定一个由 `'1'`（陆地）和 `'0'`（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。

**示例 1:**

```
输入:
11110
11010
11000
00000

输出: 1
```

**示例 2:**

```
输入:
11000
11000
00100
00011

输出: 3
```

### 方法一：深度优先遍历

在二维平面上的深度优先遍历，也叫 floorfill，可以在[这里](https://github.com/liweiwei1419/LeetCode-Solution-Python/blob/master/08-%E9%80%92%E5%BD%92%E5%92%8C%E5%9B%9E%E6%BA%AF%E6%B3%95/0200-%E5%B2%9B%E5%B1%BF%E7%9A%84%E4%B8%AA%E6%95%B0.py)看到这个思路的代码。

### 方法二：并查集

思路：使用并查集，把所有的 `0` 都合并到一个虚拟的结点上，然后扫描整个二维矩阵。

这道题给我们一个矩阵，表示一个二维平面，问我们，被海水包围的陆地一共有多少个。

注意到所有的用字符 `1` 表示的陆地在这个问题中是连成一片的，而字符 `0` 表示的海水也是连成一片的，因此很自然想到使用「并查集」解决这个问题。

为此设计算法如下：

1. 如果当前是「陆地」，尝试与周围合并一下；
2. 如果当前是「水域」，就把所有的「水域」合并在一起。请注意，这里应该是「所有的」水域为一个整体。因此，需要设置了一个虚拟的结点，表示「所有的水域都和这个虚拟结点是连接的」。

**注意**：

1. 针对上面的第 1 点：如果当前是 「陆地」，尝试与周围合并一下，此时「周围」 并不需要像 「深度优先遍历」和 「广度优先遍历」 一样，方向是四周。事实上，只要 「向右」「向下」 两个方向就可以了，原因很简单，你可以在脑子里想象一个 「4 个方向」 和 「2 个方向」 的算法执行流程（或者看我下面展示的动画），就知道 「4 个方向」 没有必要；
2. 针对上面的第 2 点：由于我设置了「虚拟结点」，最后返回「岛屿个数」的时候，应该是连通分量个数 $- 1$，不要忘记将 「虚拟结点」 代表的 「水域」 分量去掉，剩下的连通分量个数就是 「岛屿个数」。

**参考代码**：


```java
public class Solution {

    public int numIslands(char[][] grid) {
        int rows = grid.length;
        if (rows == 0) {
            return 0;
        }
        int cols = grid[0].length;
        if (cols == 0) {
            return 0;
        }

        int[][] directions = new int[][]{{0, 1}, {1, 0}};
        int size = rows * cols;
        // 多开一个结点，把 '0' 都与最后这个结点连在一起
        UnionFind unionFind = new UnionFind(size + 1);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '1') {
                    for (int[] direction : directions) {
                        int newX = i + direction[0];
                        int newY = j + direction[1];
                        if (inArea(newX, newY, rows, cols) && grid[newX][newY] == '1') {
                            unionFind.union(getIndex(i, j, cols), getIndex(newX, newY, cols));
                        }
                    }
                } else {
                    unionFind.union(getIndex(i, j, cols), size);
                }
            }
        }
        return unionFind.getCount() - 1;
    }


    private class UnionFind {

        private int[] parent;
        /**
         * 连通分量个数
         */
        private int count;

        public UnionFind(int n) {
            count = n;
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        public int find(int x) {
            while (x != parent[x]) {
                // 只实现了路径压缩，并且是隔代压缩
                parent[x] = parent[parent[x]];
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
    }

    private boolean inArea(int x, int y, int rows, int cols) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }

    private int getIndex(int x, int y, int cols) {
        return x * cols + y;
    }
}
```

需要掌握的技巧：

1、把所有的方向，设置在一个二维数组里，是一个二维平面问题常用的技巧；

2、二维坐标与一维索引的转换需要特别熟练，如果实在想不清楚，举几个具体的例子，在纸上计算一下便不难分析出来。



