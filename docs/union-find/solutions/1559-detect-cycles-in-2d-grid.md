---
title: 「力扣」第 1559 题：二维网格图中探测环（中等）
icon: yongyan
categories: 并查集
tags:
  - 并查集
---

（这题我没有时间写题解了，大家直接看「力扣」的题解区吧。）

+ 题目链接： [1559. 二维网格图中探测环](https://leetcode-cn.com/problems/detect-cycles-in-2d-grid/)

### 方法一：并查集

**参考代码**：

```Java []
public class Solution {

    private int rows;
    private int cols;

    public boolean containsCycle(char[][] grid) {
        rows = grid.length;
        cols = grid[0].length;
        int[][] directions = new int[][]{{1, 0}, {0, 1}};
        UnionFind unionFind = new UnionFind(cols * rows);
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                char current = grid[i][j];
                for (int[] direction : directions) {
                    int newX = i + direction[0];
                    int newY = j + direction[1];
                    if (inArea(newX, newY) && current == grid[newX][newY]) {
                        if (unionFind.union(getIndex(i, j), getIndex(newX, newY))) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    private boolean inArea(int x, int y) {
        return 0 <= x && x < rows && 0 <= y && y < cols;
    }

    private int getIndex(int x, int y) {
        return x * cols + y;
    }

    private class UnionFind {

        private int[] parent;

        public UnionFind(int N) {
            parent = new int[N];
            for (int i = 0; i < N; ++i) {
                parent[i] = i;
            }
        }

        private int find(int x) {
            if (parent[x] != x) {
                // 完全压缩
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }

        /**
         * @param x
         * @param y
         * @return 如果在同一个集合中，返回 true
         */
        public boolean union(int x, int y) {
            int parentX = find(x);
            int parentY = find(y);
            if (parentX == parentY) {
                return true;
            }
            if (parentX < parentY) {
                parent[parentY] = parentX;
            } else {
                parent[parentX] = parentY;
            }
            return false;
        }
    }
}
```

### 方法二：深度优先遍历

**参考代码**：

```Java []
public class Solution {

    private char[][] grid;
    private int cols;
    private int rows;

    private boolean[][] visited;
    private int[][] directions = new int[][]{{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    // DFS 的写法
    
    public boolean containsCycle(char[][] grid) {
        if (grid.length == 0) {
            return false;
        }
        this.grid = grid;
        rows = grid.length;
        cols = grid[0].length;
        visited = new boolean[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (!visited[i][j] && dfs(new int[]{i, j}, null)) {
                    return true;
                }
            }
        }
        return false;
    }


    private boolean dfs(int[] current, int[] pre) {
        if (visited[current[0]][current[1]]) {
            return true;
        }

        boolean res = false;
        visited[current[0]][current[1]] = true;
        char target = grid[current[0]][current[1]];

        for (int[] dir : directions) {
            int nextX = current[0] + dir[0];
            int nextY = current[1] + dir[1];
            if (inArea(nextX, nextY)
                    && grid[nextX][nextY] == target
                    && (pre == null || nextX != pre[0] || nextY != pre[1])) {
                res = dfs(new int[]{nextX, nextY}, current);
            }
            if (res) {
                break;
            }
        }
        return res;
    }

    private boolean inArea(int x, int y) {
        return 0 <= x && x < rows && 0 <= y && y < cols;
    }

    private int getIndex(int x, int y) {
        return x * cols + y;
    }
}
```

