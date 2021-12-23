---
title: 「力扣」第 36 题：有效的数独（中等）
date: 2020-08-07 10:00:00
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
permalink: leetcode-solution/0036-valid-sudoku
---

## 「力扣」第 36 题：有效的数独（中等、哈希表）

+ 链接：https://leetcode-cn.com/problems/valid-sudoku

> 判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。
>
> 1、数字 1-9 在每一行只能出现一次。
> 2、数字 1-9 在每一列只能出现一次。
> 3、数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
>
> ![img](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)
>
> 上图是一个部分填充的有效的数独。
>
> 数独部分空格内已填入了数字，空白格用 '.' 表示。
>
> 示例 1：
>
> ```
> 输入:
> [
>   ["5","3",".",".","7",".",".",".","."],
>   ["6",".",".","1","9","5",".",".","."],
>   [".","9","8",".",".",".",".","6","."],
>   ["8",".",".",".","6",".",".",".","3"],
>   ["4",".",".","8",".","3",".",".","1"],
>   ["7",".",".",".","2",".",".",".","6"],
>   [".","6",".",".",".",".","2","8","."],
>   [".",".",".","4","1","9",".",".","5"],
>   [".",".",".",".","8",".",".","7","9"]
> ]
> 输出: true
> ```
>
> 
>
>
> 示例 2：
>
> ```
> 输入:
> [
>   ["8","3",".",".","7",".",".",".","."],
>   ["6",".",".","1","9","5",".",".","."],
>   [".","9","8",".",".",".",".","6","."],
>   ["8",".",".",".","6",".",".",".","3"],
>   ["4",".",".","8",".","3",".",".","1"],
>   ["7",".",".",".","2",".",".",".","6"],
>   [".","6",".",".",".",".","2","8","."],
>   [".",".",".","4","1","9",".",".","5"],
>   [".",".",".",".","8",".",".","7","9"]
> ]
> 输出: false
> 解释: 除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。
>      但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
> ```
>
> 说明：
>
> + 一个有效的数独（部分已被填充）不一定是可解的。
> + 只需要根据以上规则，验证已经填入的数字是否有效即可。
> + 给定数独序列只包含数字 1-9 和字符 '.' 。
> + 给定数独永远是 9x9 形式的。

### 思路

在遍历的时候，只要遇到的是数字，就给对应的行、列、box 加上标记，表示已经占位。

![image.png](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghi1z7w3ehj30sw0so0v3.jpg)

图片来自 [官方题解](https://leetcode-cn.com/problems/valid-sudoku/solution/you-xiao-de-shu-du-by-leetcode/)。

### 方法：布尔数组（哈希表）

**参考代码 1**：box 二维表格，重点理解 `int boardIndex =  (i / 3) * 3 + j / 3;` 这行代码。

Java 代码：

```java
public class Solution {

    // 知识点：哈希表，空间换时间

    public boolean isValidSudoku(char[][] board) {
        // 设置成为 10 是为了照顾到数字 9 的情况（下标 9 数字需要到 10）
        // 第 1 维表示行的下标
        boolean[][] row = new boolean[9][10];
        // 第 1 维表示列的下标
        boolean[][] col = new boolean[9][10];
        // 第 1 维表示 board 的下标
        boolean[][] box = new boolean[9][10];

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                // 只验证数字，因此 . 跳过
                if (board[i][j] == '.') {
                    continue;
                }

                // 提取出数字
                int num = board[i][j] - '0';
                // 重点：计算在第几格
                int boardIndex =  (i / 3) * 3 + j / 3;

                // 如果发现冲突，直接返回 false
                if (row[i][num] || col[j][num] || box[boardIndex][num]) {
                    return false;
                }

                // 然后占住位置
                row[i][num] = true;
                col[j][num] = true;
                box[boardIndex][num] = true;
            }
        }
        return true;
    }
}
```

**参考代码 2**：

Java 代码：

```java
public class Solution {

    // 知识点：哈希表，空间换时间

    public boolean isValidSudoku(char[][] board) {
        // 设置成为 10 是为了照顾到数字 9 的情况（下标 9 数字需要到 10）
        // 第 1 维表示行的下标
        boolean[][] row = new boolean[9][10];
        // 第 1 维表示列的下标
        boolean[][] col = new boolean[9][10];
        // 第 1 维表示 board 的下标
        boolean[][][] box = new boolean[3][3][10];

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                // 只验证数字，因此 . 跳过
                if (board[i][j] == '.') {
                    continue;
                }

                // 提取出数字
                int num = board[i][j] - '0';
                // 重点：计算在第几格
                int boardIndex = (i / 3) * 3 + j / 3;

                // 如果发现冲突，直接返回 false
                if (row[i][num] || col[j][num] || box[i / 3][j / 3][num]) {
                    return false;
                }

                // 然后占住位置
                row[i][num] = true;
                col[j][num] = true;
                box[i / 3][j / 3][num] = true;
            }
        }
        return true;
    }
}
```

> 扩展，可以考虑使用位运算的相关技巧，代替布尔数组。