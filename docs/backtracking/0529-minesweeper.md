---
title: 「力扣」第 529 题：扫雷问题（中等）
icon: yongyan
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 广度优先遍历
---

+ 题目链接：[529. 扫雷游戏](https://leetcode-cn.com/problems/minesweeper/)。

## 题目描述

让我们一起来玩扫雷游戏！

给你一个大小为 `m x n` 二维字符矩阵 `board` ，表示扫雷游戏的盘面，其中：

- `'M'` 代表一个 **未挖出的** 地雷，
- `'E'` 代表一个 **未挖出的** 空方块，
- `'B'` 代表没有相邻（上，下，左，右，和所有4个对角线）地雷的 **已挖出的** 空白方块，
- **数字**（`'1'` 到 `'8'`）表示有多少地雷与这块 **已挖出的** 方块相邻，
- `'X'` 则表示一个 **已挖出的** 地雷。

给你一个整数数组 `click` ，其中 `click = [clickr, clickc]` 表示在所有 **未挖出的** 方块（`'M'` 或者 `'E'`）中的下一个点击位置（`clickr` 是行下标，`clickc` 是列下标）。

根据以下规则，返回相应位置被点击后对应的盘面：

1. 如果一个地雷（`'M'`）被挖出，游戏就结束了- 把它改为 `'X'` 。
2. 如果一个 **没有相邻地雷** 的空方块（`'E'`）被挖出，修改它为（`'B'`），并且所有和其相邻的 **未挖出** 方块都应该被递归地揭露。
3. 如果一个 **至少与一个地雷相邻** 的空方块（`'E'`）被挖出，修改它为数字（`'1'` 到 `'8'` ），表示相邻地雷的数量。
4. 如果在此次点击中，若无更多方块可被揭露，则返回盘面。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2018/10/12/minesweeper_example_1.png)

```
输入：board = [["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], click = [3,0]
输出：[["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2018/10/12/minesweeper_example_2.png)

```
输入：board = [["B","1","E","1","B"],["B","1","M","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]], click = [1,2]
输出：[["B","1","E","1","B"],["B","1","X","1","B"],["B","1","1","1","B"],["B","B","B","B","B"]]
```

**提示：**

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 50`
- `board[i][j]` 为 `'M'`、`'E'`、`'B'` 或数字 `'1'` 到 `'8'` 中的一个
- `click.length == 2`
- `0 <= clickr < m`
- `0 <= clickc < n`
- `board[clickr][clickc]` 为 `'M'` 或 `'E'`

## 方法一：深度优先遍历

**参考代码 1**：


```java
public class Solution {

    // M 地雷
    // E 还未挖出的空方块
    // B 已经挖出的空方块

    /**
     * 相邻关系规定为：8 个方向
     */
    private int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}, {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};
    private int rows;
    private int cols;

    public char[][] updateBoard(char[][] board, int[] click) {
        this.rows = board.length;
        this.cols = board[0].length;

        int x = click[0];
        int y = click[1];
        if (board[x][y] == 'M') {
            // 规则 1
            board[x][y] = 'X';
            return board;
        }
        dfs(board, x, y);
        return board;
    }

    public void dfs(char[][] board, int x, int y) {
        // 相邻地雷的数量
        int count = 0;
        for (int[] direction : directions) {
            int newX = x + direction[0];
            int newY = y + direction[1];
            if (inArea(newX, newY) && board[newX][newY] == 'M') {
                count++;
            }
        }
        if (count > 0) {
            // 规则 3
            board[x][y] = (char) (count + '0');
        } else {
            // 规则 2：如果当前位置没有地雷，将它修改为 B
            board[x][y] = 'B';
            for (int[] direction : directions) {
                int newX = x + direction[0];
                int newY = y + direction[1];
                if (inArea(newX, newY) && board[newX][newY] == 'E') {
                    dfs(board, newX, newY);
                }
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

    private int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}, {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};
    private int rows;
    private int cols;

    public char[][] updateBoard(char[][] board, int[] click) {
        int x = click[0];
        int y = click[1];
        if (board[x][y] == 'M') {
            board[x][y] = 'X';
            return board;
        }

        this.rows = board.length;
        this.cols = board[0].length;
        boolean[][] visited = new boolean[rows][cols];
        visited[x][y] = true;

        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[] {x, y});
        while (!queue.isEmpty()) {
            int[] point = queue.poll();
            int i = point[0];
            int j = point[1];
            int count = 0;
            for (int[] direction:directions) {
                int newX = i + direction[0];
                int newY = j + direction[1];
                if (inArea(newX,newY) &&board[newX][newY] == 'M') {
                    count++;
                }
            }

            if (count > 0) {
                board[i][j] = (char)(count + '0');
            } else {
                board[i][j] = 'B';
                for (int[] direction:directions) {
                    int newX = i + direction[0];
                    int newY = j + direction[1];
                    if (inArea(newX,newY) && !visited[newX][newY] && board[newX][newY] == 'E') {
                        visited[newX][newY] = true;
                        queue.offer(new int[] {newX, newY});
                    }
                }
            }
        }
        return board;
    }

    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

