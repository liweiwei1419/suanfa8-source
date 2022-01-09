---
title: 「力扣」第 221 题：最大正方形（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

+ 题目链接：[221. 最大正方形](https://leetcode-cn.com/problems/maximal-square/)。

## 题目描述

在一个由 `'0'` 和 `'1'` 组成的二维矩阵内，找到只包含 `'1'` 的最大正方形，并返回其面积。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/11/26/max1grid.jpg)

```
输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
输出：4
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/11/26/max2grid.jpg)



```
输入：matrix = [["0","1"],["1","0"]]
输出：1
```

**示例 3：**

```
输入：matrix = [["0"]]
输出：0
```

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 300`
- `matrix[i][j]` 为 `'0'` 或 `'1'`

## 思路分析

+ 状态定义：`dp[i][j]` 以 `matrix[i][j] ` 为右下角的正方形的最大边长；
+ 「状态转移方程」见代码。

Java 代码 1：（不推荐的写法，直接看 Java 代码 2）

```java
public class Solution {

    // 不使用哨兵的写法

    public int maximalSquare(char[][] matrix) {
        int rows = matrix.length;
        if (rows == 0) {
            return 0;
        }

        int cols = matrix[0].length;
        if (cols == 0) {
            return 0;
        }

        int maxSide = 0;
        int[][] dp = new int[rows][cols];
        // 先填第 1 行
        for (int j = 0; j < cols; j++) {
            if (matrix[0][j] == '1') {
                dp[0][j] = 1;
                maxSide = 1;
            }
        }

        // 再填第 1 列
        for (int i = 1; i < rows; i++) {
            if (matrix[i][0] == '1') {
                dp[i][0] = 1;
                maxSide = 1;
            }
        }

        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {
                if (matrix[i][j] == '1') {
                    dp[i][j] = Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1])) + 1;
                    maxSide = Math.max(maxSide, dp[i][j]);
                }
            }
        }
        return maxSide * maxSide;
    }
}

```

**复杂度分析**：

+ 时间复杂度：$O(MN)$，其中 $M$ 和 $N$ 是矩阵的行数和列数；
+ 空间复杂度：$O(MN)$。


注意：多设置一行，多设置一列，这样不用讨论特殊情况。

Java 代码 2：多设置一行、一列，减少讨论

```java
public class Solution {

    public int maximalSquare(char[][] matrix) {
        int rows = matrix.length;
        if (rows == 0) {
            return 0;
        }

        int cols = matrix[0].length;
        if (cols == 0) {
            return 0;
        }


        int[][] dp = new int[rows + 1][cols + 1];

        int res = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {

                // 注意：是字符 1
                if (matrix[i][j] == '1') {
                    dp[i + 1][j + 1] = Math.min(dp[i][j], Math.min(dp[i + 1][j], dp[i][j + 1])) + 1;
                    res = Math.max(res, dp[i + 1][j + 1]);
                }

            }
        }
        return res * res;
    }
}
```

Java 代码 3：

+ 重复使用了之前使用过的行和列；
+ 状态多一个单位的偏移，这样不用讨论特殊情况。

```java
public class Solution {

    public int maximalSquare(char[][] matrix) {
        int rows = matrix.length;
        if (rows == 0) {
            return 0;
        }

        int cols = matrix[0].length;
        if (cols == 0) {
            return 0;
        }

        int[] dp = new int[cols + 1];
        int res = 0;
        int leftUp = 0;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                // 把下一个需要的状态值保存起来
                int nextLeftUp = dp[j + 1];
                // 注意：是字符 1
                if (matrix[i][j] == '1') {
                    dp[j + 1] = Math.min(leftUp, Math.min(dp[j], dp[j + 1])) + 1;
                    res = Math.max(res, dp[j + 1]);
                } else {
                    // 注意：这里要重置一下
                    dp[j + 1] = 0;
                }
                leftUp = nextLeftUp;
            }
        }
        return res * res;
    }
}
```

