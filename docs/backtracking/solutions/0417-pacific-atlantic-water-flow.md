---
title: 「力扣」第 417 题：太平洋大西洋水流问题（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
---

+ 题目链接：[417. 太平洋大西洋水流问题](https://leetcode-cn.com/problems/pacific-atlantic-water-flow/)。

## 题目描述

给定一个 `m x n` 的非负整数矩阵来表示一片大陆上各个单元格的高度。“太平洋”处于大陆的左边界和上边界，而“大西洋于大陆的右边界和下边界。

规定水流只能按照上、下、左、右四个方向流动，且只能从高到低或者在同等高度上流动。

请找出那些水流既可以流动到“太平洋”，又能流动到“大西洋”的陆地单元的坐标。

**提示：**

1. 输出坐标的顺序不重要
2. *m* 和 *n* 都小于150

**示例 1：** 

![img](https://assets.leetcode.com/uploads/2021/06/08/waterflow-grid.jpg)

```
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
```

**Example 2:**

```
Input: heights = [[2,1],[1,2]]
Output: [[0,0],[0,1],[1,0],[1,1]]
```

 **Constraints:**

- `m == heights.length`
- `n == heights[r].length`
- `1 <= m, n <= 200`
- $0 <= heights[r][c] <= 10^5$

## 深度优先遍历

**参考代码**：

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {

    private int[][] directions = new int[][]{{1, 0}, {0, -1}, {0, 1}, {-1, 0}};
    private int rows;
    private int cols;

    public List<List<Integer>> pacificAtlantic(int[][] matrix) {
        List<List<Integer>> res = new ArrayList<>();
        this.rows = matrix.length;
        if (rows == 0) {
            return res;
        }
        this.cols = matrix[0].length;
        // 太平洋 Pacific
        boolean[][] canReachP = new boolean[rows][cols];
        // 大西洋 Atlantic
        boolean[][] canReachA = new boolean[rows][cols];

        // 四周执行 dfs，注意：看图区分行和列、太平洋和大西洋
        for (int j = 0; j < cols; j++) {
            dfs(matrix, canReachP, 0, j);
        }
        for (int i = 1; i < rows; i++) {
            dfs(matrix, canReachP, i, 0);
        }
        for (int i = 0; i < rows; i++) {
            dfs(matrix, canReachA, i, cols - 1);
        }
        for (int j = 0; j < cols - 1; j++) {
            dfs(matrix, canReachA, rows - 1, j);
        }

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (canReachP[i][j] && canReachA[i][j]) {
                    List<Integer> point = new ArrayList<>();
                    point.add(i);
                    point.add(j);
                    res.add(point);
                }
            }
        }
        return res;
    }

    private void dfs(int[][] matrix, boolean[][] canReach, int x, int y) {
        canReach[x][y] = true;
        for (int[] direction : directions) {
            int newX = x + direction[0];
            int newY = y + direction[1];
            if (inArea(newX, newY) && !canReach[newX][newY] && matrix[x][y] <= matrix[newX][newY]) {
                dfs(matrix, canReach, newX, newY);
            }
        }

    }

    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

