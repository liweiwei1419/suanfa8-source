---
title: 「力扣」第 994 题：腐烂的橘子（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
---

+ 题目链接：[994. 腐烂的橘子](https://leetcode-cn.com/problems/rotting-oranges/)。

## 题目描述

在给定的网格中，每个单元格可以有以下三个值之一：

- 值 `0` 代表空单元格；

- 值 `1` 代表新鲜橘子；

- 值 `2` 代表腐烂的橘子。

每分钟，任何与腐烂的橘子（在 4 个正方向上）相邻的新鲜橘子都会腐烂。

返回直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 `-1`。

**示例 1：**

**![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/16/oranges.png)**

```
输入：[[2,1,1],[1,1,0],[0,1,1]]
输出：4
```

**示例 2：**

```
输入：[[2,1,1],[0,1,1],[1,0,1]]
输出：-1
解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个正向上。
```

**示例 3：**

```
输入：[[0,2]]
输出：0
解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
```



**提示：**

1. `1 <= grid.length <= 10`
2. `1 <= grid[0].length <= 10`
3. `grid[i][j]` 仅为 `0`、`1` 或 `2`

**参考代码**：

```java
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    public int orangesRotting(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;

        int[][] directions = {{-1, 0}, {0, -1}, {1, 0}, {0, 1}};
        Queue<int[]> queue = new LinkedList<>();
        boolean[][] visited = new boolean[rows][cols];
        // 新鲜橘子的个数
        int count = 0;
        // 初始化的时候，把腐烂的橘子加入队列
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == 2) {
                    queue.offer(new int[]{i, j});
                    visited[i][j] = true;
                } else if (grid[i][j] == 1) {
                    count++;
                }
            }
        }

        int step = 0;
        while (!queue.isEmpty()) {
            // 如果当前没有新鲜的橘子，就没有可以扩散的区域了
            if (count == 0) {
                break;
            }
            step++;
            int curSize = queue.size();
            for (int i = 0; i < curSize; i++) {
                int[] front = queue.poll();
                int x = front[0];
                int y = front[1];
                for (int[] direction : directions) {
                    int newX = x + direction[0];
                    int newY = y + direction[1];
                    if (inArea(newX, newY, rows, cols) && !visited[newX][newY] && grid[newX][newY] == 1) {
                        count--;
                        queue.offer(new int[]{newX, newY});
                        visited[newX][newY] = true;
                    }
                }
            }
        }

        if (count > 0) {
            // 此时说明，好的橘子是一个「孤岛」，不会被坏橘子污染到
            return -1;
        }
        return step;
    }


    private boolean inArea(int i, int j, int rows, int cols) {
        return 0 <= i && i < rows && 0 <= j && j < cols;
    }
}
```

