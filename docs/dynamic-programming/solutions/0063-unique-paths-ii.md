---
title: 「力扣」第 63 题：不同路径 II（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

这题是动态规划的经典问题：理解「无后效性」。

1、状态压缩：具体讲解一下，状态行是如何压缩的；

2、哨兵技巧，回避边界条件的讨论；

3、数学方法；

4、只能向下和只能向右，说明符合动态规划的无后效性。

+ [题目链接](https://leetcode-cn.com/problems/unique-paths-ii)
+ [英文地址](https://leetcode.com/problems/unique-paths-ii/description/) 

## 题目描述

一个机器人位于一个 `m x n` 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

**现在考虑网格中有障碍物**。那么从左上角到右下角将会有多少条不同的路径？

![](https://liweiwei1419.gitee.io/images/leetcode-notes/dp/dynamic-programming-3-12.jpg)

网格中的障碍物和空位置分别用 `1` 和 `0` 来表示。

说明：`m` 和 `n` 的值均不超过 `100`。

示例 1：

```
输入:
[
[0,0,0],
[0,1,0],
[0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：

1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
```

## 方法一：动态规划


**参考代码**：

```python
from typing import List


class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m = len(obstacleGrid)
        if m == 0:
            return 0
        n = len(obstacleGrid[0])
        dp = [[0 for _ in range(n)] for _ in range(m)]

        if obstacleGrid[0][0] == 1:
            return 0
        else:
            dp[0][0] = 1

        for i in range(m):
            for j in range(n):
                if obstacleGrid[i][j] == 1:
                    dp[i][j] = 0
                    continue
                if i == 0:
                    if j == 0:
                        continue
                    dp[0][j] = dp[0][j - 1]
                elif j == 0:
                    dp[i][0] = dp[i - 1][0]
                else:
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        return dp[-1][-1]


if __name__ == '__main__':
    obstacleGrid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    s = Solution()
    res = s.uniquePathsWithObstacles(obstacleGrid)
    print(res)
```

+ 表格复用技巧：使用一维数组记录状态值。

+ 一维数组 + 哨兵

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    // 空间复杂度：O(N)，N 是矩阵的列数

    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int m = obstacleGrid.length;
        if (m == 0) {
            return 0;
        }
        int n = obstacleGrid[0].length;
        int[] dp = new int[n + 1];

        // 技巧：回避了对边界条件的判断
        dp[1] = 1;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (obstacleGrid[i][j] == 1) {
                    dp[j + 1] = 0;
                } else {
                    dp[j + 1] += dp[j];
                }
            }
        }
        return dp[n];
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:

        m = len(obstacleGrid)
        if m == 0:
            return 0
        n = len(obstacleGrid[0])

        if obstacleGrid[0][0] == 1:
            return 0

        dp = [0] * n
        # 这一步不要忘记了
        dp[0] = 1
        # 再写后面几行
        for row in range(m):
            for col in range(n):
                # 【就分下面这两种情况就可以了】
                if obstacleGrid[row][col] == 1:
                    dp[col] = 0
                elif col > 0:
                    dp[col] += dp[col - 1]
                else:
                    # 第 0 列不是 0 就是 1
                    # 0 的情况首先判断了
                    # 什么都不做
                    pass
        return dp[-1]
```
</CodeGroupItem>
</CodeGroup>

## 方法二：记忆化递归

**参考代码**：

```python
class Solution:

    def __init__(self):
        self.cached = []
        self.obstacleGrid = None

    def _path_ways(self, i, j):
        if self.cached[i][j] != 0:
            return self.cached[i][j]
        if self.obstacleGrid[i][j] == 1:
            return 0
        if i == 0 and j == 0:
            return 1
        if i == 0:
            ways = self._path_ways(0, j - 1)
        elif j == 0:
            ways = self._path_ways(i - 1, 0)
        else:
            ways = self._path_ways(i, j - 1) + self._path_ways(i - 1, j)
        self.cached[i][j] = ways
        return ways

    def uniquePathsWithObstacles(self, obstacleGrid):
        """
        :type obstacleGrid: List[List[int]]
        :rtype: int
        """
        m = len(obstacleGrid)
        if m == 0:
            return 0
        n = len(obstacleGrid[0])
        self.cached = [[0 for _ in range(n)] for _ in range(m)]
        self.obstacleGrid = obstacleGrid
        return self._path_ways(m - 1, n - 1)
```

