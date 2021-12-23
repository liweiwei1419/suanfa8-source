---
title: 「力扣」第 1020 题：飞地的数量（中等）
icon: yongyan
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 广度优先遍历
---

+ 题目链接：[1020. 飞地的数量](https://leetcode-cn.com/problems/number-of-enclaves/)。

## 题目描述

给出一个二维数组 A，每个单元格为 0（代表海）或 1（代表陆地）。

移动是指在陆地上从一个地方走到另一个地方（朝四个方向之一）或离开网格的边界。

返回网格中 **无法** 在任意次数的移动中离开网格边界的陆地单元格的数量。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/18/enclaves1.jpg)

```
输入：[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
输出：3
解释： 
有三个 1 被 0 包围。一个 1 没有被包围，因为它在边界上。
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/02/18/enclaves2.jpg)

```
输入：[[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
输出：0
解释：
所有 1 都在边界上或可以到达边界。
```

**提示：**

1. `1 <= A.length <= 500`
2. `1 <= A[i].length <= 500`
3. `0 <= A[i][j] <= 1`
4. 所有行的大小都相同

---

## 方法一：深度优先遍历

**参考代码 1**：

```java
public class Solution {

    private int rows;
    private int cols;
    private int[][] grid;
    private boolean[][] visited;
    private final static int[][] DIRECTIONS = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

    public int numEnclaves(int[][] A) {
        this.rows = A.length;
        this.cols = A[0].length;

        grid = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                grid[i][j] = A[i][j];
            }
        }


        this.visited = new boolean[rows][cols];
        // 把与边界相连的 1 改成 0

        for (int j = 0; j < cols; j++) {
            if (grid[0][j] == 1) {
                dfs(0, j);
            }
            if (grid[rows - 1][j] == 1) {
                dfs(rows - 1, j);
            }
        }
        for (int i = 1; i < rows - 1; i++) {
            if (grid[i][0] == 1) {
                dfs(i, 0);
            }
            if (grid[i][cols - 1] == 1) {
                dfs(i, cols - 1);
            }
        }

        int count = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1) {
                    count++;
                }
            }
        }
        return count;
    }

    private void dfs(int x, int y) {

        visited[x][y] = true;
        grid[x][y] = 0;
        for (int[] direction : DIRECTIONS) {
            int newX = x + direction[0];
            int newY = y + direction[1];
            if (inArea(newX, newY) && !visited[newX][newY] && grid[newX][newY] == 1) {
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

    private int rows;
    private int cols;
    private int[][] grid;
    private boolean[][] visited;
    private final static int[][] DIRECTIONS = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

    public int numEnclaves(int[][] A) {
        this.rows = A.length;
        this.cols = A[0].length;

        grid = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                grid[i][j] = A[i][j];
            }
        }

        this.visited = new boolean[rows][cols];
        Queue<int[]> queue = new LinkedList<>();

        // 把与边界相连的 1 改成 0
        for (int j = 0; j < cols; j++) {
            if (grid[0][j] == 1) {
                queue.offer(new int[]{0, j});
            }
            if (grid[rows - 1][j] == 1) {
                queue.offer(new int[]{rows - 1, j});
            }
        }
        for (int i = 1; i < rows - 1; i++) {
            if (grid[i][0] == 1) {
                queue.offer(new int[]{i, 0});
            }
            if (grid[i][cols - 1] == 1) {
                queue.offer(new int[]{i, cols - 1});
            }
        }

        while (!queue.isEmpty()) {
            int[] top = queue.poll();
            int x = top[0];
            int y = top[1];
            grid[x][y] = 0;
            for (int[] direction : DIRECTIONS) {
                int newX = x + direction[0];
                int newY = y + direction[1];
                if (inArea(newX, newY) && !visited[newX][newY] && grid[newX][newY] == 1) {
                    queue.offer(new int[]{newX, newY});
                    visited[newX][newY] = true;
                }
            }
        }

        int count = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 1) {
                    count++;
                }
            }
        }
        return count;
    }

    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```



