---
title: 「力扣」第 1034 题：边界着色（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 广度优先遍历
---

- 题目链接：[1034. 边界着色](https://leetcode-cn.com/problems/coloring-a-border/)。

## 题目描述

给你一个大小为 `m x n` 的整数矩阵 `grid` ，表示一个网格。另给你三个整数 `row`、`col` 和 `color` 。网格中的每个值表示该位置处的网格块的颜色。

两个网格块属于同一 **连通分量** 需满足下述全部条件：

- 两个网格块颜色相同
- 在上、下、左、右任意一个方向上相邻

**连通分量的边界** 是指连通分量中满足下述条件之一的所有网格块：

- 在上、下、左、右任意一个方向上与不属于同一连通分量的网格块相邻
- 在网格的边界上（第一行/列或最后一行/列）

请你使用指定颜色 `color` 为所有包含网格块 `grid[row][col]` 的 **连通分量的边界** 进行着色，并返回最终的网格 `grid` 。

**示例 1：**

```
输入：grid = [[1,1],[1,2]], row = 0, col = 0, color = 3
输出：[[3,3],[3,2]]
```

**示例 2：**

```
输入：grid = [[1,2,2],[2,3,2]], row = 0, col = 1, color = 3
输出：[[1,3,3],[2,3,3]]
```

**示例 3：**

```
输入：grid = [[1,1,1],[1,1,1],[1,1,1]], row = 1, col = 1, color = 2
输出：[[2,2,2],[2,1,2],[2,2,2]]
```

**提示：**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `1 <= grid[i][j], color <= 1000`
- `0 <= row < m`
- `0 <= col < n`

## 方法一：深度优先遍历

**参考代码 1**：

```java
public class Solution {

    private int rows;
    private int cols;
    private int[][] grid;
    private int origin;
    public static final int[][] DIRECTIONS = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

    public int[][] colorBorder(int[][] grid, int r0, int c0, int color) {
        this.rows = grid.length;
        this.cols = grid[0].length;
        this.grid = grid;
        if (grid[r0][c0] == color) {
            return grid;
        }

        this.origin = grid[r0][c0];
        boolean[][] visited = new boolean[rows][cols];
        dfs(r0, c0, color, visited);
        return grid;
    }

    private void dfs(int x, int y, int color, boolean[][] visited) {
        visited[x][y] = true;
        // 注意区分：x、y 表示当前坐标，newX 、newY 表示扩散了一步以后的新坐标
        for (int[] direction : DIRECTIONS) {
            int newX = x + direction[0];
            int newY = y + direction[1];
            if (inArea(newX, newY)) {
                if (visited[newX][newY]) {
                    continue;
                }
                // 情况 2：如果扩散了一步以后还是 origin ，继续递归求解
                if (grid[newX][newY] == origin) {
                    dfs(newX, newY, color, visited);
                } else {
                    // 情况 3：如果扩散了一步以后还是不是 origin，当前单元格变色
                    grid[x][y] = color;
                }
            } else {
                // 情况 1：如果向四个方向走一步越界了，说明当前单元格是边界，当前颜色修改
                grid[x][y] = color;
            }
        }
    }

    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

## 方法二：广度优先遍历

**参考代码 2**：

```java
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private int rows;
    private int cols;
    private int[][] grid;
    private int origin;
    public static final int[][] DIRECTIONS = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

    public int[][] colorBorder(int[][] grid, int r0, int c0, int color) {
        this.rows = grid.length;
        this.cols = grid[0].length;
        this.grid = grid;
        if (grid[r0][c0] == color) {
            return grid;
        }

        this.origin = grid[r0][c0];
        boolean[][] visited = new boolean[rows][cols];
        visited[r0][c0] = true;
        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{r0, c0});

        while (!queue.isEmpty()) {
            int[] top = queue.poll();

            // 注意区分：x、y 表示当前坐标，newX 、newY 表示扩散了一步以后的新坐标
            int x = top[0];
            int y = top[1];
            for (int[] direction : DIRECTIONS) {
                int newX = x + direction[0];
                int newY = y + direction[1];
                if (inArea(newX, newY)) {
                    if (visited[newX][newY]) {
                        continue;
                    }
                    // 情况 2：如果扩散了一步以后还是 origin ，继续递归求解
                    if (grid[newX][newY] == origin) {
                        queue.add(new int[]{newX, newY});
                        visited[newX][newY] = true;
                    } else {
                        // 情况 3：如果扩散了一步以后还是不是 origin，当前单元格变色
                        grid[x][y] = color;
                    }
                } else {
                    // 情况 1：如果向四个方向走一步越界了，说明当前单元格是边界，当前颜色修改
                    grid[x][y] = color;
                }
            }
        }
        return grid;
    }

    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```
