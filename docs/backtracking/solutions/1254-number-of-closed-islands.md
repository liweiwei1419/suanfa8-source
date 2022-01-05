---
title: 「力扣」第 1254 题：统计封闭岛屿的数目（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 广度优先遍历
---

+ 题目链接：[1254. 统计封闭岛屿的数目](https://leetcode-cn.com/problems/number-of-closed-islands/)。

## 题目描述

有一个二维矩阵 `grid` ，每个位置要么是陆地（记号为 `0` ）要么是水域（记号为 `1` ）。

我们从一块陆地出发，每次可以往上下左右 4 个方向相邻区域走，能走到的所有陆地区域，我们将其称为一座「**岛屿**」。

如果一座岛屿 **完全** 由水域包围，即陆地边缘上下左右所有相邻区域都是水域，那么我们将其称为 「**封闭岛屿**」。

请返回封闭岛屿的数目。

 

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/11/07/sample_3_1610.png)

```
输入：grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
输出：2
解释：
灰色区域的岛屿是封闭岛屿，因为这座岛屿完全被水域包围（即被 1 区域包围）。
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/11/07/sample_4_1610.png)

```
输入：grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
输出：1
```

**示例 3：**

```
输入：grid = [[1,1,1,1,1,1,1],
             [1,0,0,0,0,0,1],
             [1,0,1,1,1,0,1],
             [1,0,1,0,1,0,1],
             [1,0,1,1,1,0,1],
             [1,0,0,0,0,0,1],
             [1,1,1,1,1,1,1]]
输出：2
```

**提示：**

- `1 <= grid.length, grid[0].length <= 100`
- `0 <= grid[i][j] <=1`



## 方法一：深度优先遍历

**参考代码 1**：

```java
public class Solution {

    // 0 表示陆地，1 表示海洋
    
    private int rows;
    private int cols;
    private final static int[][] DIRECTIONS = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
    private int[][] grid;
    private boolean[][] visited;

    public int closedIsland(int[][] grid) {
        this.rows = grid.length;
        this.cols = grid[0].length;
        this.grid = grid;

        visited = new boolean[rows][cols];
        // 第 1 步：先把四周的 0 全部改成 1
        for (int j = 0; j < cols; j++) {
            if (grid[0][j] == 0) {
                dfs(0, j);
            }
            if (grid[rows - 1][j] == 0) {
                dfs(rows - 1, j);
            }
        }
        for (int i = 1; i < rows - 1; i++) {
            if (grid[i][0] == 0) {
                dfs(i, 0);
            }
            if (grid[i][cols - 1] == 0) {
                dfs(i, cols - 1);
            }
        }

        // 第 2 步：然后对有 0 的地方执行一次 flood fill
        int count = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 0 && !visited[i][j]) {
                    dfs(i, j);
                    count++;
                }
            }
        }
        return count;
    }

    private void dfs(int x, int y) {
        visited[x][y] = true;
        for (int[] direction : DIRECTIONS) {
            int newX = x + direction[0];
            int newY = y + direction[1];
            if (inArea(newX, newY) && !visited[newX][newY] && grid[newX][newY] == 0) {
                dfs(newX, newY);
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

    // 0 表示陆地，1 表示海洋

    private int rows;
    private int cols;
    private final static int[][] DIRECTIONS = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
    private int[][] grid;
    private boolean[][] visited;

    public int closedIsland(int[][] grid) {
        this.rows = grid.length;
        this.cols = grid[0].length;
        this.grid = grid;

        visited = new boolean[rows][cols];
        Queue<int[]> queue = new LinkedList<>();
        // 第 1 步：先把四周的 0 全部改成 1
        for (int j = 0; j < cols; j++) {
            if (grid[0][j] == 0) {
                queue.offer(new int[]{0, j});
                visited[0][j] = true;
            }
            if (grid[rows - 1][j] == 0) {
                queue.offer(new int[]{rows - 1, j});
                visited[rows - 1][j] = true;
            }
        }
        for (int i = 1; i < rows - 1; i++) {
            if (grid[i][0] == 0) {
                queue.offer(new int[]{i, 0});
                visited[i][0] = true;
            }
            if (grid[i][cols - 1] == 0) {
                queue.offer(new int[]{i, cols - 1});
                visited[i][cols - 1] = true;
            }
        }

        bfs(queue);
        // 第 2 步：然后对有 0 的地方执行一次 flood fill
        int count = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 0 && !visited[i][j]) {
                    queue.offer(new int[]{i, j});
                    visited[i][j] = true;
                    bfs(queue);
                    count++;
                }
            }
        }
        return count;
    }

    private void bfs(Queue<int[]> queue) {
        while (!queue.isEmpty()) {
            int[] top = queue.poll();
            int x = top[0];
            int y = top[1];
            visited[x][y] = true;
            for (int[] direction : DIRECTIONS) {
                int newX = x + direction[0];
                int newY = y + direction[1];
                if (inArea(newX, newY) && !visited[newX][newY] && grid[newX][newY] == 0) {
                    queue.offer(new int[]{newX, newY});
                    visited[newX][newY] = true;
                }
            }
        }
    }

    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

