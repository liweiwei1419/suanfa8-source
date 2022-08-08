---
title: 「力扣」第 733 题：图像渲染（简单）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 广度优先遍历
  - 并查集
  - flood fill
---

- 题目链接：[733. 图像渲染](https://leetcode-cn.com/problems/flood-fill/)。

## 题目描述

有一幅以二维整数数组表示的图画，每一个整数表示该图画的像素值大小，数值在 0 到 65535 之间。

给你一个坐标 `(sr, sc)` 表示图像渲染开始的像素值（行 ，列）和一个新的颜色值 `newColor`，让你重新上色这幅图像。

为了完成上色工作，从初始坐标开始，记录初始坐标的上下左右四个方向上像素值与初始坐标相同的相连像素点，接着再记录这四个方向上符合条件的像素点与他们对应四个方向上像素值与初始坐标相同的相连像素点，……，重复该过程。将所有有记录的像素点的颜色值改为新的颜色值。

最后返回经过上色渲染后的图像。

**示例 1:**

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tooa0re3j20h1071q32.jpg)

```
输入:
image = [[1,1,1],[1,1,0],[1,0,1]]
sr = 1, sc = 1, newColor = 2
输出: [[2,2,2],[2,2,0],[2,0,1]]
解析:
在图像的正中间，(坐标(sr,sc)=(1,1)),
在路径上所有符合条件的像素点的颜色都被更改成2。
注意，右下角的像素没有更改为2，
因为它不是在上下左右四个方向上与初始点相连的像素点。
```

**Example 2:**

```
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2
Output: [[2,2,2],[2,2,2]]
```

**Constraints:**

- `m == image.length`
- `n == image[i].length`
- `1 <= m, n <= 50`

- `0 <= image[i][j], newColor < 216`
- `0 <= sr < m`
- `0 <= sc < n`

## 方法一：深度优先遍历

**参考代码 1**：

```java
public class Solution {

    private static final int[][] DIRECTIONS = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    private int rows;
    private int cols;
    private int[][] image;

    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        // 前面这个特殊的判断很重要
        int originColor = image[sr][sc];
        if (originColor == newColor) {
            return image;
        }

        this.rows = image.length;
        this.cols = image[0].length;
        this.image = image;
        // 从一个结点开始进行深度优先遍历
        dfs(sr, sc, originColor, newColor);
        return image;
    }

    private void dfs(int i, int j, int originColor, int newColor) {
        image[i][j] = newColor;
        for (int[] direction : DIRECTIONS) {
            int newX = i + direction[0];
            int newY = j + direction[1];
            if (inArea(newX, newY, rows, cols) && image[newX][newY] == originColor) {
                dfs(newX, newY, originColor, newColor);
            }
        }
    }

    private boolean inArea(int x, int y, int rows, int cols) {
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

    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        int originColor = image[sr][sc];
        if (originColor == newColor) {
            return image;
        }
        int rows = image.length;
        int cols = image[0].length;

        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        boolean[][] visited = new boolean[rows][cols];
        Queue<int[]> queue = new LinkedList<>();
        // 从一个结点开始进行深度优先遍历
        queue.offer(new int[]{sr, sc});
        visited[sr][sc] = true;
        while (!queue.isEmpty()) {
            int[] head = queue.poll();
            image[head[0]][head[1]] = newColor;
            for (int[] direction : directions) {
                int newX = head[0] + direction[0];
                int newY = head[1] + direction[1];
                if (inArea(newX, newY, rows, cols) && !visited[newX][newY] && image[newX][newY] == originColor) {
                    queue.offer(new int[]{newX, newY});
                    // 特别注意：添加到队列以后，需要马上标记为已经访问，否则相同结点会重复入队
                    visited[newX][newY] = true;
                }
            }
        }
        return image;
    }

    private boolean inArea(int x, int y, int rows, int cols) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

## 方法三：并查集

**参考代码 3**：

```java
public class Solution {

    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        int originColor = image[sr][sc];
        if (originColor == newColor) {
            return image;
        }

        // 注意：这里只有两个方向向量
        int[][] directions = new int[][]{{1, 0}, {0, 1}};
        int rows = image.length;
        int cols = image[0].length;

        // 步骤 1：把与当前单元格在两个方向相邻、且颜色等于 (sr, sc) 单元格颜色的单元格进行合并
        UnionFind unionFind = new UnionFind(rows * cols);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                // 如果不是要染色的单元格，跳过
                if (image[i][j] != originColor) {
                    continue;
                }

                for (int[] direction : directions) {
                    int newX = i + direction[0];
                    int newY = j + direction[1];
                    if (inArea(newX, newY, rows, cols) && image[newX][newY] == originColor) {
                        unionFind.union(getIndex(newX, newY, cols), getIndex(i, j, cols));
                    }
                }
            }
        }

        // 步骤 2：把与 (sr, sc) 在同一个集合中的元素进行染色
        // 源点坐标转换成一维坐标
        int sourceIndex = getIndex(sr, sc, cols);
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (unionFind.isConnected(getIndex(i, j, cols), sourceIndex)) {
                    image[i][j] = newColor;
                }
            }
        }
        return image;
    }

    private boolean inArea(int x, int y, int rows, int cols) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }

    private int getIndex(int x, int y, int cols) {
        return x * cols + y;
    }

    private class UnionFind {
        private int[] parent;
        private int N;

        public UnionFind(int N) {
            this.N = N;
            this.parent = new int[N];
            for (int i = 0; i < N; i++) {
                parent[i] = i;
            }
        }

        public int find(int x) {
            while (x != parent[x]) {
                // 路径压缩：隔代压缩
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        public void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX == rootY) {
                return;
            }
            parent[rootX] = rootY;
        }

        public boolean isConnected(int x, int y) {
            return find(x) == find(y);
        }
    }
}
```
