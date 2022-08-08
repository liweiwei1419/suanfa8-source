---
title: 「力扣」第 200 题：岛屿的个数（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
---

- 题目链接：[200. 岛屿数量](https://leetcode-cn.com/problems/number-of-islands)；
- 题解链接：[深度优先遍历、广度优先遍历、并查集（Java 代码）](https://leetcode-cn.com/problems/number-of-islands/solution/dfs-bfs-bing-cha-ji-python-dai-ma-java-dai-ma-by-l/)。

## 题目描述

> 给定一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算岛屿的数量。一个岛被水包围，并且它是通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设网格的四个边均被水包围。
>
> 示例 1:
>
> ```
> 输入:
> 11110
> 11010
> 11000
> 00000
>
> 输出: 1
> ```
>
> 示例 2:
>
> ```
> 输入:
> 11000
> 11000
> 00100
> 00011
>
> 输出: 3
> ```

---

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2toly6q98j21fi0dqq44.jpg){:width=600}{:align=center}

**说明**：以下介绍的算法，除了并查集以外，DFS 和 BFS 都属于很常见的算法知识，也非常好理解，写法也相对固定，读者需要多写，发现并记录自己的问题。我也是在写了几遍甚至是在写本题解的过程中，才发现出自己的问题。

这道题是可以使用一个经典的算法来解决的，那就是 Flood fill，以下的定义来自 [维基百科：Flood fill 词条](https://zh.wikipedia.org/wiki/Flood_fill)。

> **Flood fill 算法**是从一个区域中提取若干个连通的点与其他相邻区域区分开（或分别染成不同颜色）的经典 [算法](https://zh.wikipedia.org/wiki/算法)。因为其思路类似洪水从一个区域扩散到所有能到达的区域而得名。在 [GNU Go](https://zh.wikipedia.org/wiki/GNU_Go) 和 [扫雷](https://zh.wikipedia.org/wiki/扫雷) 中，Flood Fill 算法被用来计算需要被清除的区域。

以下示意图来自维基百科（上面有地址）。

<![Flood Fill-DFS.001.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tom10n20j21hc0u0t9y.jpg),![Flood Fill-DFS.002.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tom4qvcwj21hc0u075k.jpg),![Flood Fill-DFS.003.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tom5sgg7j21hc0u0jso.jpg),![Flood Fill-DFS.004.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tom7keyxj21hc0u0gmx.jpg),![Flood Fill-DFS.005.jpeg](https://pic.leetcode-cn.com/1603870451-pEgqPm-Flood%20Fill-DFS.005.jpeg),![Flood Fill-DFS.006.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tomb9o7bj21hc0u0dh6.jpg),![Flood Fill-DFS.007.jpeg](https://pic.leetcode-cn.com/1603870451-avOkCS-Flood%20Fill-DFS.007.jpeg),![Flood Fill-DFS.008.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tomdaa0aj21hc0u0ta3.jpg),![Flood Fill-DFS.009.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tomg2ef2j21hc0u0dh8.jpg),![Flood Fill-DFS.010.jpeg](https://pic.leetcode-cn.com/1603870451-RRtwjk-Flood%20Fill-DFS.010.jpeg),![Flood Fill-DFS.011.jpeg](https://pic.leetcode-cn.com/1603870451-RxBfrt-Flood%20Fill-DFS.011.jpeg),![Flood Fill-DFS.012.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tomhug62j21hc0u0abg.jpg),![Flood Fill-DFS.013.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tomkr4s7j21hc0u0abg.jpg),![Flood Fill-DFS.014.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tomo03ojj21hc0u0q4c.jpg),![Flood Fill-DFS.015.jpeg](https://pic.leetcode-cn.com/1603870451-vmfAHg-Flood%20Fill-DFS.015.jpeg),![Flood Fill-DFS.016.jpeg](https://pic.leetcode-cn.com/1603870451-LnPSkF-Flood%20Fill-DFS.016.jpeg),![Flood Fill-DFS.017.jpeg](https://pic.leetcode-cn.com/1603870451-LDJmiV-Flood%20Fill-DFS.017.jpeg),![Flood Fill-DFS.018.jpeg](https://pic.leetcode-cn.com/1603870451-rqUWMN-Flood%20Fill-DFS.018.jpeg),![Flood Fill-DFS.019.jpeg](https://pic.leetcode-cn.com/1603870451-CrkqqD-Flood%20Fill-DFS.019.jpeg),![Flood Fill-DFS.020.jpeg](https://pic.leetcode-cn.com/1603870451-QGHLVE-Flood%20Fill-DFS.020.jpeg),![Flood Fill-DFS.021.jpeg](https://pic.leetcode-cn.com/1603870451-dGTuor-Flood%20Fill-DFS.021.jpeg),![Flood Fill-DFS.022.jpeg](https://pic.leetcode-cn.com/1603870451-AIJmUd-Flood%20Fill-DFS.022.jpeg),![Flood Fill-DFS.023.jpeg](https://pic.leetcode-cn.com/1603870451-jShLzX-Flood%20Fill-DFS.023.jpeg),![Flood Fill-DFS.024.jpeg](https://pic.leetcode-cn.com/1603870451-nSogYJ-Flood%20Fill-DFS.024.jpeg)>

<![Flood Fill-BFS.001.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tonc9ju7j21hc0u0gmm.jpg),![Flood Fill-BFS.002.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2ton85pvxj21hc0u0q3z.jpg),![Flood Fill-BFS.003.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2ton5q3cvj21hc0u0wfl.jpg),![Flood Fill-BFS.004.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2ton126iwj21hc0u0gmq.jpg),![Flood Fill-BFS.005.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tomz5ndsj21hc0u075h.jpg),![Flood Fill-BFS.006.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tomvw7pjj21hc0u0q47.jpg),![Flood Fill-BFS.007.jpeg](https://pic.leetcode-cn.com/1603870602-lhuDqz-Flood%20Fill-BFS.007.jpeg),![Flood Fill-BFS.008.jpeg](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tomsliyyj21hc0u0wfr.jpg)>

Flood，作为动词是「淹没；充满」 的意思，作为名词是「洪水」 的意思。下面我们简单解释一下这个算法：从一个区域中提取若干个连通的点与其他相邻区域区分开。

从一个点扩散开，找到与其连通的点，其实就是从一个点开始，进行一次「深度优先遍历」 或者「广度优先遍历」，发现一片连着的区域。
对于这道题来说，就是从一个是「陆地」 的格子开始进行一次「深度优先遍历」 或者「广度优先遍历」，把与之相连的所有的格子都标记上，视为发现了一个「岛屿」。

**说明**：这里做「标记」 的意思是，通过「深度优先遍历」 或者「广度优先遍历」 操作，发现了一个新的格子，与起始点的那个格子是连通的，我们视为「标记」 过，也可以说「被访问过」。

那么每一次进行「深度优先遍历」 或者「广度优先遍历」 的条件就是：

- 这个格子是陆地 `1`；
- 这个格子不能是之前发现「岛屿」 的过程中执行了「深度优先遍历」 或者「广度优先遍历」 操作，而被标记的格子。

### 方法一：深度优先遍历

深度优先遍历符合后进先出的规律，需要借助栈实现。一般而言，可以通过递归方法，借助编程语言提供的方法栈实现。

**参考代码 1**：

```Java []
public class Solution {

    private static final int[][] DIRECTIONS = {{-1, 0}, {0, -1}, {1, 0}, {0, 1}};
    private boolean[][] visited;
    private int rows;
    private int cols;
    private char[][] grid;

    public int numIslands(char[][] grid) {
        rows = grid.length;
        if (rows == 0) {
            return 0;
        }
        cols = grid[0].length;

        this.grid = grid;
        visited = new boolean[rows][cols];
        int count = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                // 如果是岛屿中的一个点，并且没有被访问过，就进行深度优先遍历
                if (!visited[i][j] && grid[i][j] == '1') {
                    dfs(i, j);
                    count++;
                }
            }
        }
        return count;
    }

    /**
     * 从坐标为 (i, j) 的点开始进行深度优先遍历
     *
     * @param i
     * @param j
     */
    private void dfs(int i, int j) {
        visited[i][j] = true;
        for (int k = 0; k < 4; k++) {
            int newX = i + DIRECTIONS[k][0];
            int newY = j + DIRECTIONS[k][1];
            // 如果不越界、还是陆地、没有被访问过
            if (inArea(newX, newY) && grid[newX][newY] == '1' && !visited[newX][newY]) {
                dfs(newX, newY);
            }
        }
    }

    /**
     * 封装成 inArea 方法语义更清晰
     *
     * @param x
     * @param y
     * @return
     */
    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

**复杂度分析**：（未添加）

### 方法二：广度优先遍历

除了「深度优先遍历」，还可以使用「广度优先遍历」，此时就不用回溯了。广度优先遍历需要队列帮助实现。

**参考代码 2**：

```Java []
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private final static int[][] DIRECTIONS = {{-1, 0}, {0, -1}, {1, 0}, {0, 1}};
    private int rows;
    private int cols;
    private char[][] grid;
    private boolean[][] visited;

    public int numIslands(char[][] grid) {
        rows = grid.length;
        if (rows == 0) {
            return 0;
        }
        cols = grid[0].length;
        this.grid = grid;
        visited = new boolean[rows][cols];

        int count = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (!visited[i][j] && grid[i][j] == '1') {
                    bfs(i, j);
                    count++;
                }
            }
        }
        return count;
    }

    private void bfs(int i, int j) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(i * cols + j);
        // 注意：这里要标记上已经访问过
        visited[i][j] = true;
        while (!queue.isEmpty()) {
            int cur = queue.poll();
            int curX = cur / cols;
            int curY = cur % cols;
            for (int k = 0; k < 4; k++) {
                int newX = curX + DIRECTIONS[k][0];
                int newY = curY + DIRECTIONS[k][1];
                if (inArea(newX, newY) && grid[newX][newY] == '1' && !visited[newX][newY]) {
                    queue.offer(newX * cols + newY);
                    // 特别注意：在放入队列以后，要马上标记成已经访问过，语义也是十分清楚的：反正只要进入了队列，迟早都会遍历到它
                    // 而不是在出队列的时候再标记，如果是出队列的时候再标记，会造成很多重复的结点进入队列，造成重复的操作，这句话如果你没有写对地方，代码会严重超时的
                    visited[newX][newY] = true;
                }
            }
        }
    }

    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

**复杂度分析**：（未添加）

### 方法三：并查集

关于连通性问题，并查集也是常用的数据结构。

**思路**：

并查集中维护连通分量的个数，在遍历的过程中：

- 相邻的陆地（只需要向右看和向下看）合并，只要发生过合并，岛屿的数量就减少 $1$；
- 在遍历的过程中，同时记录空地的数量；
- 并查集中连通分量的个数 - 空地的个数，就是岛屿数量。

**参考代码 3**：

```Java []
public class Solution {

    private int rows;
    private int cols;

    public int numIslands(char[][] grid) {
        rows = grid.length;
        if (rows == 0) {
            return 0;
        }
        cols = grid[0].length;

        // 空地的数量
        int spaces = 0;
        UnionFind unionFind = new UnionFind(rows * cols);
        int[][] directions = {{1, 0}, {0, 1}};
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '0') {
                    spaces++;
                } else {
                    // 此时 grid[i][j] == '1'
                    for (int[] direction : directions) {
                        int newX = i + direction[0];
                        int newY = j + direction[1];
                        // 先判断坐标合法，再检查右边一格和下边一格是否是陆地
                        if (newX < rows && newY < cols && grid[newX][newY] == '1') {
                            unionFind.union(getIndex(i, j), getIndex(newX, newY));
                        }
                    }
                }
            }
        }
        return unionFind.getCount() - spaces;
    }

    private int getIndex(int i, int j) {
        return i * cols + j;
    }

    private class UnionFind {
        /**
         * 连通分量的个数
         */
        private int count;
        private int[] parent;

        public int getCount() {
            return count;
        }

        public UnionFind(int n) {
            this.count = n;
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        private int find(int x) {
            while (x != parent[x]) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        public void union(int x, int y) {
            int xRoot = find(x);
            int yRoot = find(y);
            if (xRoot == yRoot) {
                return;
            }

            parent[xRoot] = yRoot;
            count--;
        }
    }
}
```

**复杂度分析**：（未添加）

---

### 方法一：深度优先遍历（回溯算法）

Java 代码：

```java
public class Solution {

    private static final int[][] directions = {{-1, 0}, {0, -1}, {1, 0}, {0, 1}};
    private boolean[][] visited;
    private int rows;
    private int cols;
    private char[][] grid;

    public int numIslands(char[][] grid) {
        rows = grid.length;
        if (rows == 0) {
            return 0;
        }
        cols = grid[0].length;

        this.grid = grid;
        visited = new boolean[rows][cols];
        int count = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                // 如果是岛屿中的一个点，并且没有被访问过，就进行深度优先遍历
                if (!visited[i][j] && grid[i][j] == '1') {
                    count++;
                    dfs(i, j);
                }
            }
        }
        return count;
    }

    /**
     * 从坐标为 (i, j) 的点开始进行深度优先遍历
     *
     * @param i
     * @param j
     */
    private void dfs(int i, int j) {
        visited[i][j] = true;
        for (int k = 0; k < 4; k++) {
            int newX = i + directions[k][0];
            int newY = j + directions[k][1];
            // 如果不越界、还是陆地、没有被访问过
            if (inArea(newX, newY) && grid[newX][newY] == '1' && !visited[newX][newY]) {
                dfs(newX, newY);
            }
        }
    }

    /**
     * 封装成 inArea 方法语义更清晰
     *
     * @param x
     * @param y
     * @return
     */
    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

### 方法二：广度优先遍历

Java 代码：

```java
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private final int[][] directions = {{-1, 0}, {0, -1}, {1, 0}, {0, 1}};
    private int rows;
    private int cols;
    private char[][] grid;
    private boolean[][] visited;

    public int numIslands(char[][] grid) {
        rows = grid.length;
        if (rows == 0) {
            return 0;
        }
        cols = grid[0].length;
        this.grid = grid;
        visited = new boolean[rows][cols];

        int count = 0;
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (!visited[i][j] && grid[i][j] == '1') {
                    bfs(i, j);
                    count++;
                }
            }
        }
        return count;
    }

    private void bfs(int i, int j) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(i * cols + j);
        // 注意：这里要标记上已经访问过
        visited[i][j] = true;
        while (!queue.isEmpty()) {
            int cur = queue.poll();
            int curX = cur / cols;
            int curY = cur % cols;
            for (int k = 0; k < 4; k++) {
                int newX = curX + directions[k][0];
                int newY = curY + directions[k][1];
                if (inArea(newX, newY) && grid[newX][newY] == '1' && !visited[newX][newY]) {
                    queue.offer(newX * cols + newY);
                    // 特别注意：在放入队列以后，要马上标记成已经访问过，语义也是十分清楚的：反正只要进入了队列，迟早都会遍历到它
                    // 而不是在出队列的时候再标记，如果是出队列的时候再标记，会造成很多重复的结点进入队列，造成重复的操作，这句话如果你没有写对地方，代码会严重超时的
                    visited[newX][newY] = true;
                }
            }
        }
    }

    private boolean inArea(int x, int y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }
}
```

### 方法三：并查集

Java 代码：

```java
public class Solution {

    private int rows;
    private int cols;

    public int numIslands(char[][] grid) {
        rows = grid.length;
        if (rows == 0) {
            return 0;
        }
        cols = grid[0].length;

        // 空地的数量
        int spaces = 0;
        UnionFind unionFind = new UnionFind(rows * cols);
        int[][] directions = {{1, 0}, {0, 1}};
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '0') {
                    spaces++;
                } else {
                    // 此时 grid[i][j] == '1'
                    for (int[] direction : directions) {
                        int newX = i + direction[0];
                        int newY = j + direction[1];
                        // 先判断坐标合法，再检查右边一格和下边一格是否是陆地
                        if (newX < rows && newY < cols && grid[newX][newY] == '1') {
                            unionFind.union(getIndex(i, j), getIndex(newX, newY));
                        }
                    }
                }
            }
        }
        return unionFind.getCount() - spaces;
    }

    private int getIndex(int i, int j) {
        return i * cols + j;
    }

    private class UnionFind {
        /**
         * 连通分量的个数
         */
        private int count;
        private int[] parent;

        public int getCount() {
            return count;
        }

        public UnionFind(int n) {
            this.count = n;
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        private int find(int x) {
            while (x != parent[x]) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        public void union(int x, int y) {
            int xRoot = find(x);
            int yRoot = find(y);
            if (xRoot == yRoot) {
                return;
            }

            parent[xRoot] = yRoot;
            count--;
        }
    }
}
```
