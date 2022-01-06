---
title: 「力扣」第 64 题：最小路径和（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

很简单的「动态规划」问题，熟悉「自底向上」求解问题的思路。

+ [题目链接](https://leetcode-cn.com/problems/minimum-path-sum/description/)

## 题目描述

给定一个包含非负整数的 *m* x *n* 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明**：每次只能向下或者向右移动一步。

**示例**：

```
输入:
[
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
]
输出: 7
解释: 因为路径 1 → 3 → 1 → 1 → 1 的总和最小。
```


## 方法：动态规划

每一步只能左移或者下移。题目中给出了 `grid` 非负整数，可以保证走得越长，sum 的值越大；只能向右走或者向下走，保证了在非负整数矩阵的情况下，sum 的最小值存在。在分析清楚以后，我们可以直接在 grid 矩阵上原地修改，直接给出动态规划的解法，十分简单，逻辑也很清晰，核心代码不超过 10 行。

状态很好定义，题目中问什么，状态就定义成什么：`dp[i][j]`。


**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {
  
        // 直接在 grid 数组上操作

    public int minPathSum(int[][] grid) {
        if (grid == null) {
            return 0;
        }
        
        int m = grid.length;
        int n = grid[0].length;
        for (int i = 1; i < n; i++) {
            grid[0][i] = grid[0][i] + grid[0][i - 1];
        }
        for (int i = 1; i < m; i++) {
            grid[i][0] = grid[i][0] + grid[i - 1][0];
        }
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
            }
        }
        return grid[m - 1][n - 1];
    }

    public static void main(String[] args) {
        int[][] grid = {{1, 2, 5}, {3, 2, 1}};
        Solution solution = new Solution();
        int minPathSum = solution.minPathSum(grid);
        System.out.println(minPathSum);
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:

        m = len(grid)
        if m == 0:
            return 0
        n = len(grid[0])

        for col in range(1, n):
            # 第 0 行特殊处理，不要忘记了
            grid[0][col] += grid[0][col - 1]
        for row in range(1, m):
            grid[row][0] += grid[row - 1][0]
            for col in range(1, n):
                grid[row][col] += min(grid[row - 1][col], grid[row][col - 1])
        return grid[-1][-1]


if __name__ == '__main__':
    grid = [[1, 3, 1],
            [1, 5, 1],
            [4, 2, 1]]

    s = Solution()
    res = s.minPathSum(grid)
    print(res)
```
</CodeGroupItem>
</CodeGroup>



技巧：表格复用

**参考代码**：

```java
public class Solution {

    public int minPathSum(int[][] grid) {
        if (grid == null) {
            return 0;
        }
        int m = grid.length;
        int n = grid[0].length;

        int[] dp = new int[n];
        dp[0] = grid[0][0];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j > 0) {
                    dp[j] = grid[0][j] + dp[j - 1];
                } else if (j == 0 && i > 0) {
                    dp[j] = dp[j] + grid[i][0];
                } else if (i != 0) {
                    dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
                }
            }
        }
        return dp[n - 1];
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(MN)$，这里 $M$ 和 $N$ 分别是矩阵的长和宽；
+ 空间复杂度：$O(N)$。

