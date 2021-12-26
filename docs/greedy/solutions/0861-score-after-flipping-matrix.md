---
title: 「力扣」第 861 题：翻转矩阵后的得分（中等）
icon: yongyan
category: 贪心算法
tags:
  - 贪心算法
---

+ 题目链接：[861. 翻转矩阵后的得分](https://leetcode-cn.com/problems/score-after-flipping-matrix/)；
+ 题解链接：[]()。


## 题目描述

## 例 7：「力扣」第 861 题：翻转矩阵后的得分（中等）

有一个二维矩阵 `A` 其中每个元素的值为 `0` 或 `1` 。

移动是指选择任一行或列，并转换该行或列中的每一个值：将所有 `0` 都更改为 `1`，将所有 `1` 都更改为 `0`。

在做出任意次数的移动后，将该矩阵的每一行都按照二进制数来解释，矩阵的得分就是这些数字的总和。

返回尽可能高的分数。

**示例：**

```
输入：[[0,0,1,1],[1,0,1,0],[1,1,0,0]]
输出：39
解释：
转换为 [[1,1,1,1],[1,0,0,1],[1,1,1,1]]
0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39
```

**提示：**

1. `1 <= A.length <= 20`
2. ` 1<= A[0].length <= 20`

3. `A[i][j]` 是 `0` 或 `1`

**参考代码**：

```Java []
public class Solution {

    public int matrixScore(int[][] A) {
        int rows = A.length;
        int cols = A[0].length;
        
        int res = rows * (1 << (cols - 1));

        // 注意：从 1 开始
        for (int j = 1; j < cols; j++) {
            int nOnes = 0;
            for (int i = 0; i < rows; i++) {
                if (A[i][0] == 1) {
                    nOnes += A[i][j];
                } else {
                    // 如果这一行进行了行反转，则该元素的实际取值为 1 - A[i][j]
                    nOnes += (1 - A[i][j]); 
                }
            }
            int k = Math.max(nOnes, rows - nOnes);
            res += k * (1 << (cols - j - 1));
        }
        return res;
    }
}
```


**复杂度分析**

- 时间复杂度：$O(rows \times cols)$，其中 $rows$ 为矩阵行数，$cols$ 为矩阵列数。
- 空间复杂度：$O(1)$。
