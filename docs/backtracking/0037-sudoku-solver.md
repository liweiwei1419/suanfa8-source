---
title: 「力扣」第 37 题：求解数独（困难、回溯算法）
date: 2020-08-07 11:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 14：回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 字符串
permalink: leetcode-solution/0037-sudoku-solver
---

## 「力扣」第 37 题：求解数独（困难、回溯算法）

+ 题目链接：[37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)。

分析：这是比 n 皇后问题更酷的问题，典型的人工智能的问题，自动来解决，递归加上回溯，有效剪枝，人工智能的开始章节一般就将搜索问题。

> 编写一个程序，通过已填充的空格来解决数独问题。
>
> 一个数独的解法需**遵循如下规则**：
>
> 1. 数字 `1-9` 在每一行只能出现一次。
> 2. 数字 `1-9` 在每一列只能出现一次。
> 3. 数字 `1-9` 在每一个以粗实线分隔的 `3x3` 宫内只能出现一次。
>
> 空白格用 `'.'` 表示。
> ![LeetCode 第 37 题：求解数独-1](http://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)
> 一个数独。
> ![LeetCode 第 37 题：求解数独-2](http://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png)
>
> 答案被标成红色。
>
> **Note:**
>
> - 给定的数独序列只包含数字 `1-9` 和字符 `'.'` 。
> - 你可以假设给定的数独只有唯一解。
> - 给定数独永远是 `9x9` 形式的。

### 思路分析

需要先做「力扣」第 36 题：[有效的数独（中等、哈希表）](https://leetcode-cn.com/problems/valid-sudoku)，理解 `int boardIndex =  (i / 3) * 3 + j / 3;` 这行代码。

Java 代码：

```java
public class Solution {

    /**
     * 判断每一行是否被填上了数字，设置成 10 是为了让 '1' 落在下标 1 的位置，'9' 落在下标 9 的位置
     */
    private boolean[][] row = new boolean[9][10];
    private boolean[][] col = new boolean[9][10];

    /**
     * 注意：第 1 维变成了 2 维，cell 表示官方题解那样的单元格
     */
    private boolean[][][] cell = new boolean[3][3][10];

    public void solveSudoku(char[][] board) {
        // 题目说：给定数独永远是 9 x 9 形式的，因此不用做特殊判断
        // 步骤 1：先遍历棋盘一次，然后每一行，每一列在 row col cell 里占住位置
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != '.') {
                    // 减去 '0' 是有 1 个位置的偏移
                    int num = board[i][j] - '0';
                    row[i][num] = true;
                    col[j][num] = true;
                    cell[i / 3][j / 3][num] = true;
                }
            }
        }

        // 步骤 2：进行一次深度优先遍历，尝试所有的可能性
        dfs(board, 0, 0);
    }


    /**
     * @param board
     * @param x     横坐标
     * @param y     纵坐标
     * @return
     */
    private boolean dfs(char[][] board, int x, int y) {
        // 递归终止条件：一行填写完成以后，列数归 0，行数加 1
        // 注意：y == 9 和 x == 9 这两条判断语句不能交换
        if (y == 9) {
            x++;
            y = 0;
        }

        // 横坐标越界，即 x == 9 的时候找到了解
        if (x == 9) {
            return true;
        }

        if (board[x][y] != '.') {
            // 不是 '.' 的时候，右移一格继续检测
            return dfs(board, x, y + 1);
        }

        // 当 board[x][y] 是 '.' 的时候，从数字 1 到 9 去尝试
        for (int next = 1; next <= 9; next++) {
            // 注意：这里在剪枝
            if (row[x][next] || col[y][next] || cell[x / 3][y / 3][next]) {
                continue;
            }

            board[x][y] = (char) ('0' + next);

            row[x][next] = true;
            col[y][next] = true;
            cell[x / 3][y / 3][next] = true;

            if (dfs(board, x, y + 1)) {
                return true;
            }

            // 撤销选择，需要恢复成 '.' 以尝试下一个数字
            board[x][y] = '.';
            row[x][next] = false;
            col[y][next] = false;
            cell[x / 3][y / 3][next] = false;
        }
        return false;
    }
}
```

