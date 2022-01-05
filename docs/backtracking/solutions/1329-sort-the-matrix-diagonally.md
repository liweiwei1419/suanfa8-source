---
title: 「力扣」第 1329 题：将矩阵按对角线排序（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
---


+ 题目链接：[1329. 将矩阵按对角线排序](https://leetcode-cn.com/problems/sort-the-matrix-diagonally/)；
+ 题解链接：[暴力解法](https://leetcode-cn.com/problems/sort-the-matrix-diagonally/solution/bao-li-jie-fa-by-liweiwei1419/)。


大家新年好。

思路：

+ 使用的是 [N皇后](https://leetcode-cn.com/problems/n-queens) 问题的编码技巧：主对角线上元素的特点是：纵坐标 - 横坐标 = 定值
+ 为了能够放进数组中，加上偏移 `m - 1` 。
+ 两次遍历：第一次遍历把数据拷贝到对角线数组中，然后排序；第二次遍历把对角线数组写回原始数组（或者新开一个数组）均可。

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

+ 时间复杂度：$O((M + N ) M \log (M))$，有 $M + N - 1$ 条对角线，每条对角线上的元素最多为行数 $M$。
+ 空间复杂度：$O((M + N) * M)$，保存记录的结果集需要空间 $MN$，如果是原地修改，对角线数组占用空间是 $(M + N - 1) * M$。




