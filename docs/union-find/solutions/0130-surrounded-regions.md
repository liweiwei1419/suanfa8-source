---
title: 「力扣」第 130 题：被围绕的区域（中等）
icon: yongyan
categories: 并查集
tags:
  - 并查集
---

+ 题目链接：[200. 岛屿的个数](https://leetcode-cn.com/problems/number-of-islands/)。

## 题目描述

给定一个二维的矩阵，包含 `'X'` 和 `'O'`（**字母 O**）。

找到所有被 `'X'` 围绕的区域，并将这些区域里所有的 `'O'` 用 `'X'` 填充。

**示例:**

```
X X X X
X O O X
X X O X
X O X X
```

运行你的函数后，矩阵变为：

```
X X X X
X X X X
X X X X
X O X X
```

**解释:**

被围绕的区间不会存在于边界上，换句话说，任何边界上的 `'O'` 都不会被填充为 `'X'`。 任何不在边界上，或不与边界上的 `'O'` 相连的 `'O'` 最终都会被填充为 `'X'`。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。

分析：其实就是将不与边上的  `'O'` 相连的 `'O'` 改成  `'X'`，可以使用并查集完成。

### 方法一：深度优先遍历

**关键**：与边界相连 `O` 不能被替换成 `X`。

+ 把四周有 `O`的地方都替换成为 `-`，在四周进行 `floodfill` 算法（染色）；
+ 然后经过一次遍历，把 `O` 换成 `X`，把 `-` 换成 `O`。

**参考代码**：

```java
public class Solution {

    public void solve(char[][] board) {
        int rows = board.length;
        if (rows == 0) {
            return;
        }
        int cols = board[0].length;
        if (cols == 0) {
            return;
        }

        int[][] directions = new int[][]{{-1, 0}, {0, -1}, {1, 0}, {0, 1}};
        // 第 1 列和最后 1 列
        for (int i = 0; i < rows; i++) {
            dfs(i, 0, rows, cols, board, directions);
            dfs(i, cols - 1, rows, cols, board, directions);
        }
        // 第 1 行和最后 1 行
        for (int i = 1; i < cols - 1; i++) {
            dfs(0, i, rows, cols, board, directions);
            dfs(rows - 1, i, rows, cols, board, directions);
        }

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                }
                if (board[i][j] == '-') {
                    board[i][j] = 'O';
                }
            }
        }
    }

    private boolean inArea(int x, int y, int rows, int cols) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }

    private void dfs(int i, int j, int rows, int cols, char[][] board, int[][] directions) {
        if (inArea(i, j, rows, cols) && board[i][j] == 'O') {
            board[i][j] = '-';
            for (int k = 0; k < 4; k++) {
                int newX = i + directions[k][0];
                int newY = j + directions[k][1];
                dfs(newX, newY, rows, cols, board, directions);
            }
        }
    }
}
```

### 方法二：并查集

+ 把四周的 `O` 都和一个虚拟结点合并起来；
+ 在内部，只看两个方向，把 `O` 都合并起来；
+ 最后再扫一次数组，不和「虚拟结点」连接的 `O` 都标记成 `X`。

并查集的写法容易受 `floorfill` 的影响，用并查集的时候，其实只用每一行的右边和下面都看一下，只针对 `O`，能合并就合并一下。

**参考代码**：

```java
import java.util.Arrays;

public class Solution {

    public void solve(char[][] board) {
        int rows = board.length;
        if (rows == 0) {
            return;
        }
        int cols = board[0].length;
        if (cols == 0) {
            return;
        }

        UnionFind unionFind = new UnionFind(rows * cols + 1);
        int dummyNode = rows * cols;

        // 填写第 1 行和最后一行
        for (int j = 0; j < cols; j++) {
            if (board[0][j] == 'O') {
                unionFind.union(getIndex(0, j, cols), dummyNode);
            }
            if (board[rows - 1][j] == 'O') {
                unionFind.union(getIndex(rows - 1, j, cols), dummyNode);
            }
        }

        // 填写第 1 列和最后一列
        for (int i = 1; i < rows - 1; i++) {
            if (board[i][0] == 'O') {
                unionFind.union(getIndex(i, 0, cols), dummyNode);
            }
            if (board[i][cols - 1] == 'O') {
                unionFind.union(getIndex(i, cols - 1, cols), dummyNode);
            }
        }


        int[][] directions = new int[][]{{0, 1}, {1, 0}};
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (board[i][j] == 'O') {
                    for (int[] direction : directions) {
                        int newX = i + direction[0];
                        int newY = j + direction[1];
                        if (newX < rows && newY < cols && board[newX][newY] == 'O') {
                            unionFind.union(getIndex(i, j, cols), getIndex(newX, newY, cols));
                        }
                    }
                }
            }
        }

        for (int i = 1; i < rows - 1; i++) {
            for (int j = 0; j < cols - 1; j++) {
                if (board[i][j] == 'O') {
                    if (!unionFind.isConnected(getIndex(i, j, cols), dummyNode)) {
                        board[i][j] = 'X';
                    }
                }
            }
        }
    }

    private int getIndex(int x, int y, int cols) {
        return x * cols + y;
    }

    class UnionFind {

        private int[] parent;

        public UnionFind(int n) {
            this.parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        public boolean isConnected(int x, int y) {
            return find(x) == find(y);
        }

        public int find(int x) {
            while (x != parent[x]) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        public void union(int x, int y) {
            int xRoot = find(x);
            int yRoot = find(y);
            if (xRoot == yRoot) {
                return;
            }
            parent[xRoot] = yRoot;
        }
    }
}
```

