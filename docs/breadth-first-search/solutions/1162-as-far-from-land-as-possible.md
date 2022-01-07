---
title: 「力扣」第 1162 题：地图分析（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
---


+ 题目链接：[1162. 地图分析](https://leetcode-cn.com/problems/as-far-from-land-as-possible/)；
+ 题解链接：[广度优先遍历（Java）](https://leetcode-cn.com/problems/as-far-from-land-as-possible/solution/yan-du-you-xian-bian-li-java-by-liweiwei1419/)。

## 题目链接

你现在手里有一份大小为 N x N 的 网格 `grid`，上面的每个 单元格 都用 `0` 和 `1` 标记好了。其中 `0` 代表海洋，`1` 代表陆地，请你找出一个海洋单元格，这个海洋单元格到离它最近的陆地单元格的距离是最大的。

我们这里说的距离是「曼哈顿距离」（ Manhattan Distance）：(x0, y0) 和 (x1, y1) 这两个单元格之间的距离是 |x0 - x1| + |y0 - y1| 。

我们这里说的距离是「曼哈顿距离」（ Manhattan Distance）：`(x0, y0)` 和 `(x1, y1)` 这两个单元格之间的距离是 `|x0 - x1| + |y0 - y1|` 。

如果网格上只有陆地或者海洋，请返回 `-1`。

**示例 1：**

**![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/08/17/1336_ex1.jpeg)**

```
输入：[[1,0,1],[0,0,0],[1,0,1]]
输出：2
解释： 
海洋单元格 (1, 1) 和所有陆地单元格之间的距离都达到最大，最大距离为 2。
```

**示例 2：**

**![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/08/17/1336_ex2.jpeg)**

```
输入：[[1,0,0],[0,0,0],[0,0,0]]
输出：4
解释： 
海洋单元格 (2, 2) 和所有陆地单元格之间的距离都达到最大，最大距离为 4。
```

**提示：**

1. `1 <= grid.length == grid[0].length <= 100`
2. `grid[i][j]` 不是 `0` 就是 `1`

**Constraints:**

- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 100`
- `grid[i][j]` is `0` or `1`

## 思路分析

+ 把所有的 **陆地（`1`）** 添加到队列中，进行广度优先遍历，看看多少步可以扩散完成；
+ 「扩散完成」的意思是：没有海洋可以扩散。

---

## 解读题目中的「最远」和「最近」

+ 题目问的是「距离陆地区域最远的海洋区域」，其实就是从陆地 `1` 开始，要扩散多少次，才能把所有的海洋给覆盖掉。「最远」应该从这个角度来理解。
+ 而「该海洋区域到离它最近的陆地区域的距离」，「最近」是因为一定是距离这个最后才扩散到的海洋的最近的陆地才能扩散到它。


**分析**：

+ 二维表格上的问题，常用的算法是深度优先遍历、广度优先遍历和并查集，由于这里计算的结果和距离相关，显然使用广度优先遍历；
+ 但是题目问的是「距离陆地区域最远的海洋区域」，这和我们的经验稍微有点出入。一般而言，「广度优先遍历」求的是最短路径，但仔细一想，发现其实广度优先遍历也是适用的：
  + 求最短路径的时候，只要找到目标值，返回即可；
  + 求最长路径的时候，**所有目标值都看完以后，才返回**。 
+ 这道题「广度优先遍历」的起点有多个，但完全不影响算法的正确性，可以假想一个虚拟的起点，初始的起点就是由虚拟起点扩散开来的，示意图可以参考 [题解](https://leetcode-cn.com/problems/as-far-from-land-as-possible/solution/zhen-liang-yan-sou-huan-neng-duo-yuan-kan-wan-miao/) ，特别形象。

> 这里题目中介绍的「曼哈顿距离」，其实就是对广度优先遍历（BFS）**逐层向外扩散**的精准数学解释，**每扩散一次，曼哈顿距离就加 1**。


## 编写广度优先遍历算法的注意事项

+ 如果题目要求返回的结果和距离相关，需要在 `while` 循环内部一下子把当前列表的所有元素都依次取出来，这种「一下子」操作的次数就是我们需要的距离；
+ 如果一个单元格被添加到队列以后，**需要马上将它标记为已经访问**（根据情况，可以直接在原始输入数组上修改，也可以使用一个布尔数组 `visited` 进行标记），如果不这么做，很可能会出现死循环，这一点如果一开始没有注意到，也可以通过调试代码观察出。



在这里，我给出的是「常规写法」，大家可以参考[「官方题解」](https://leetcode-cn.com/problems/as-far-from-land-as-possible/solution/di-tu-fen-xi-by-leetcode-solution/) 学习这个问题的另外的思路。

## 使用「广度优先遍历」算法的问题

+ 「力扣」第 279 题：[完全平方数](https://leetcode-cn.com/problems/perfect-squares/)；
+ 「力扣」第 322 题：[零钱兑换](https://leetcode-cn.com/problems/coin-change/)。

这些问题虽然看起来和最短路径无关，但只要在纸上写写画画，不难发现依然是求：在树或者图上的最短路径。可以通过这一类问题熟悉 BFS 的写法。

二维表格上的搜索问题（寻找连通分量）还有：

+ 「力扣」第 200 题：[岛屿数量](https://leetcode-cn.com/problems/number-of-islands)；
+ 「力扣」第 994 题：[腐烂的橘子](https://leetcode-cn.com/problems/rotting-oranges/)；
+ 「力扣」第 130 题：[被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions)；
+ 「力扣」第 79 题：[单词搜索](https://leetcode-cn.com/problems/word-search)；
+ 「剑指 Offer 」第 13 题：[机器人的运动范围](https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof)。

大家可以通过做这些问题，熟悉在二维表格上编码代码的常用技巧：

+ 设置方向数组，使得向「四面八方」扩散的代码更加紧凑；
+ 设置是否越界的判断函数 `inArea()`；
+ 根据情况，使用二维坐标和一维坐标相互转换的操作，因为二维坐标传入队列的时候，需要封装成数组，创建和销毁数组有一定性能消耗，有些问题如果需要判重，还可能有一点点工作量；
+ 如果只是为了解决这个问题，不使用 `visited` 布尔数组是完全可以的。但是很多时候，我们会介意修改输入数组，因此标准的写法是使用 `visited` 布尔数组记录已经访问过的单元格，如果面试的时候对这一点拿捏不准，可以咨询面试官。



**参考代码**：



```Java []
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    public int maxDistance(int[][] grid) {
        // 方向向量
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        // 由于题目中给出了 grid 的范围，因此不用做输入检查
        int N = grid.length;
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (grid[i][j] == 1) {
                    // 把陆地添加到队列中
                    queue.add(getIndex(i, j, N));
                }
            }
        }

        int size = queue.size();
        if (size == 0 || size == N * N) {
            return -1;
        }

        boolean[][] visited = new boolean[N][N];
        int step = 0;
        while (!queue.isEmpty()) {
            // 注意：先把当前队列的长度保存下来
            int currentQueueSize = queue.size();
            for (int i = 0; i < currentQueueSize; i++) {
                Integer head = queue.poll();
                int currentX = head / N;
                int currentY = head % N;

                for (int[] direction : directions) {
                    int newX = currentX + direction[0];
                    int newY = currentY + direction[1];
                    if (inArea(newX, newY, N) && !visited[newX][newY] && grid[newX][newY] == 0) {
                        // 赋值成为一个不等于 0 的整数均可，因为后续逻辑只关心海洋（0）
                        visited[newX][newY] = true;
                        queue.add(getIndex(newX, newY, N));
                    }
                }
            }
            step++;
        }
        // 注意：由于最后一步，没有可以扩散的的区域，但是 step 加了 1，故在退出循环的时候应该减 1
        return step - 1;
    }

    /**
     * @param x    二维表格单元格横坐标
     * @param y    二维表格单元格纵坐标
     * @param cols 二维表格列数
     * @return
     */
    private int getIndex(int x, int y, int cols) {
        return x * cols + y;
    }

    /**
     * @param x 二维表格单元格横坐标
     * @param y 二维表格单元格纵坐标
     * @param N 二维表格行数（列数）
     * @return 是否在二维表格有效范围内
     */
    private boolean inArea(int x, int y, int N) {
        return 0 <= x && x < N && 0 <= y && y < N;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N^2)$，这里 $N$ 是方格的边长。二维表格里所有的元素都会被看一遍；
+ 空间复杂度：$O(N^2)$，最坏情况下，方格里全部是陆地（1）的时候，元素全部会进队列。