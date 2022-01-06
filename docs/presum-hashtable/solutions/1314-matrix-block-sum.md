---
title: 「力扣」第 1314 题：矩阵区域和（简单）
icon: yongyan
category: 前缀和
tags:
  - 前缀和
---


+ 题目链接：[1314. 矩阵区域和](https://leetcode-cn.com/problems/matrix-block-sum/)；
+ 题解链接：[前缀和矩阵](https://leetcode-cn.com/problems/matrix-block-sum/solution/qian-zhui-he-ju-zhen-by-liweiwei1419/)。


参考「力扣」第 304 题：[“二维区域和检索 - 矩阵不可变”](https://leetcode-cn.com/problems/range-sum-query-2d-immutable/) 的做法。

思路：

+ 先计算前缀和矩阵；
+ 再计算有效区域的左上角以及右下角的坐标；
+ 再使用前缀和矩阵以 $O(1)$ 复杂度计算区域之和。

**参考代码**：

```Java []
import java.util.Arrays;

public class Solution {

    /**
     * 前缀和矩阵
     */
    private int[][] preSum;

    public int[][] matrixBlockSum(int[][] mat, int K) {
        // 行数和列数不用特判，因为题目已经说了不为 0
        int rows = mat.length;
        int cols = mat[0].length;

        // 初始化的时候多设置一行，多设置一列
        preSum = new int[rows + 1][cols + 1];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                preSum[i + 1][j + 1] = preSum[i + 1][j] + preSum[i][j + 1] - preSum[i][j] + mat[i][j];
            }
        }

        int[][] res = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                // 左上角横纵坐标
                int row1 = Math.max(i - K, 0);
                int col1 = Math.max(j - K, 0);

                // 右下角横纵坐标
                int row2 = Math.min(i + K, rows - 1);
                int col2 = Math.min(j + K, cols - 1);
                res[i][j] = sumRegion(row1, col1, row2, col2);
            }
        }
        return res;
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        return preSum[row2 + 1][col2 + 1]
                - preSum[row1][col2 + 1]
                - preSum[row2 + 1][col1]
                + preSum[row1][col1];
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(MN)$，这里 $M$ 是矩阵的行数，$N$ 是矩阵的列数；
+ 空间复杂度：$O(MN)$。