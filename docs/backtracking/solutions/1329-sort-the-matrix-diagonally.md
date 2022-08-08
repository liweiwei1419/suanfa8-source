---
title: 「力扣」第 1329 题：将矩阵按对角线排序（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
---

- 题目链接：[1329. 将矩阵按对角线排序](https://leetcode-cn.com/problems/sort-the-matrix-diagonally/)；
- 题解链接：[暴力解法](https://leetcode-cn.com/problems/sort-the-matrix-diagonally/solution/bao-li-jie-fa-by-liweiwei1419/)。

## 题目描述

**矩阵对角线** 是一条从矩阵最上面行或者最左侧列中的某个元素开始的对角线，沿右下方向一直到矩阵末尾的元素。例如，矩阵 `mat` 有 `6` 行 `3` 列，从 `mat[2][0]` 开始的 **矩阵对角线** 将会经过 `mat[2][0]`、`mat[3][1]` 和 `mat[4][2]` 。

给你一个 `m * n` 的整数矩阵 `mat` ，请你将同一条 **矩阵对角线** 上的元素按升序排序后，返回排好序的矩阵。

**示例 1：**

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2topa4ms0j20ag045aa5.jpg)

```
输入：mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
输出：[[1,1,1,1],[1,2,2,2],[1,2,3,3]]
```

**示例 2：**

```
输入：mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]
输出：[[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]
```

**提示：**

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 100`
- `1 <= mat[i][j] <= 100`

## 思路分析

- 使用的是 [N 皇后](https://leetcode-cn.com/problems/n-queens) 问题的编码技巧：主对角线上元素的特点是：纵坐标 - 横坐标 = 定值
- 为了能够放进数组中，加上偏移 `m - 1` 。
- 两次遍历：第一次遍历把数据拷贝到对角线数组中，然后排序；第二次遍历把对角线数组写回原始数组（或者新开一个数组）均可。

**参考代码**：

```Java []
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class Solution {

    public int[][] diagonalSort(int[][] mat) {
        // 行数
        int m = mat.length;
        // 列数
        int n = mat[0].length;
        // 主对角线的条数
        int dLen = m + n - 1;

        // 每一条对角线都创建一个动态数组
        ArrayList<Integer>[] diagonal = new ArrayList[dLen];
        for (int i = 0; i < dLen; i++) {
            diagonal[i] = new ArrayList<>(m);
        }

        // 遍历原始矩阵，把原始矩阵中的元素放进对应的动态数组中
        // 主对角线上元素的特点是：纵坐标 - 横坐标 = 定值
        // 加上偏移 m - 1 是为了能够放进数组中
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                diagonal[j - i + (m - 1)].add(mat[i][j]);
            }
        }

        // 对每一个对角线上的动态数组分别进行升序排序
        for (int i = 0; i < dLen; i++) {
            Collections.sort(diagonal[i]);
        }

        int[][] res = new int[m][n];

        // 对角线数组上还未取出的元素的下标，初始化的时候均为 0
        int[] next = new int[dLen];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                // 对角线的坐标
                int index = j - i + (m - 1);
                // 记录结果
                res[i][j] = diagonal[index].get(next[index]);
                // 维护 next 数组的值
                next[index]++;
            }
        }
        return res;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O((M + N ) M \log (M))$，有 $M + N - 1$ 条对角线，每条对角线上的元素最多为行数 $M$。
- 空间复杂度：$O((M + N) * M)$，保存记录的结果集需要空间 $MN$，如果是原地修改，对角线数组占用空间是 $(M + N - 1) * M$。
