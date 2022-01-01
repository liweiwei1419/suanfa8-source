---
title: 「力扣」第 52 题：N-Queens II（困难）
icon: yongyan
categories: 位运算
tags:
  - 回溯算法
  - 位运算
---

+ 中文网址：[52. N皇后 II](https://leetcode-cn.com/problems/n-queens-ii/description/)。

## 题目描述

*n* 皇后问题研究的是如何将 *n* 个皇后放置在 *n*×*n* 的棋盘上，并且使皇后彼此之间不能相互攻击。

![LeetCode 第 52 题：N-Queens II](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/8-queens.png)



上图为 8 皇后问题的一种解法。

给定一个整数 *n*，返回 *n* 皇后不同的解决方案的数量。

**示例:**

```
输入: 4
输出: 2
解释: 4 皇后问题存在如下两个不同的解法。
[
[".Q..",  // 解法 1
"...Q",
"Q...",
"..Q."],

["..Q.",  // 解法 2
"Q...",
"...Q",
".Q.."]
]
```



**参考代码**：

Java 代码：

```java
import java.util.Stack;

public class Solution {

    private boolean[] marked;
    private int count;

    public int totalNQueens(int n) {
        if (n == 0 || n == 1) {
            return n;
        }
        int[] board = new int[n];
        for (int i = 0; i < n; i++) {
            board[i] = i;
        }
        permuta(board);
        return count;
    }

    // 生成一个 [0,1,...,n-1] 的全排列
    private void permuta(int[] board) {
        int len = board.length;
        marked = new boolean[len];
        Stack<Integer> pre = new Stack<>();
        findPermutation(board, 0, len, pre);
    }

    private void findPermutation(int[] board, int usedCount, int len, Stack<Integer> pre) {
        if (usedCount == len) {
            // 判断是否是符合要求的棋盘布局
            if (noDanger(pre, len)) {
                count++;
            }
            return;
        }

        for (int i = 0; i < len; i++) {
            if (!marked[i]) {
                marked[i] = true;
                pre.push(board[i]);
                findPermutation(board, usedCount + 1, len, pre);
                marked[i] = false;
                pre.pop();
            }

        }
    }

    private boolean noDanger(Stack<Integer> pre, int len) {
        int[] board = new int[len];
        for (int i = 0; i < len; i++) {
            board[i] = pre.get(i);
        }
        for (int i = 0; i < len - 1; i++) {
            for (int j = i + 1; j < len; j++) {
                // 得到所有不同的 i j 的组合，是一个组合问题，按顺序来就行
                // System.out.println(i + "\t" + j);
                if (i - j == board[i] - board[j]) {
                    return false;
                }
                if (i - j == -(board[i] - board[j])) {
                    return false;
                }
            }

        }
        // 走到这里表示通过检验
        // System.out.println(Arrays.toString(board));
        return true;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int totalNQueens = solution.totalNQueens(8);
        System.out.println(totalNQueens);
    }
}
```

