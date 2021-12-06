---
title: 「力扣」第 51 题：N 皇后
date: 2018-02-21 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 14：回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 字符串
permalink: leetcode-solution/0051-n-queens
---

## 「力扣」第 51 题：N 皇后

传送门：英文网址：[51. N-Queens](https://leetcode.com/problems/n-queens/description/) ，中文网址：[51. N皇后](https://leetcode-cn.com/problems/n-queens/description/) 。

> *n* 皇后问题研究的是如何将 *n* 个皇后放置在 *n*×*n* 的棋盘上，并且使皇后彼此之间不能相互攻击。
>
> ![LeetCode 第 51 题：N 皇后](https://leetcode.com/static/images/problemset/8-queens.png)
>
> 上图为 8 皇后问题的一种解法。
>
> 给定一个整数 *n*，返回所有不同的 *n* 皇后问题的解决方案。
>
> 每一种解法包含一个明确的 *n* 皇后问题的棋子放置方案，该方案中 `'Q'` 和 `'.'` 分别代表了皇后和空位。
>
> **示例:**
>
> ```
> 输入: 4
> 输出: [
> [".Q..",  // 解法 1
> "...Q",
> "Q...",
> "..Q."],
> 
> ["..Q.",  // 解法 2
> "Q...",
> "...Q",
> ".Q.."]
> ]
> 解释: 4 皇后问题存在两个不同的解法。
> ```

分析：虽然看起来，这是一个人工智能的问题，但是我们的代码实现方式完全可以理解为暴力解法，只不过我们使用“递归回溯”方式的暴力解法，可以很快地判断暴力的过程中产生的结果是否符合条件，而不是把所有的暴力解都的出来以后再去掉不符合条件的；
例如：我们在第 1 行第 1 列已经放置了元素，那么很显然，在第 2 行第 1 列和第 2 列放置元素的情况就已经被排除掉了，第 2 行的第 3 列我们发现可以放置元素，于是继续遍历下去；

从上面的分析中，我们可以看到“递归”、“回溯”与“暴力解法”、“深度优先遍历”有着千丝万缕的联系；

其实这道问题，很像我们前面介绍的排列问题。我们想想，是不是每一层的一开始其实我们都有 $n$ 种摆放的方法，但是因为游戏规则，在每一层我们会排除掉一些可能，在每一层我们都会记录之前的状态，回溯以后，状态还要恢复；

在解题思路上，我们采用还是一行一行去思考皇后位置的摆放，因此外层只要用一层循环。

Java 实现：

```java
public class Solution {

    private boolean[] col; // 记录在列上第几列已经放置了元素
    private boolean[] dia1; // 记录在主对角线上哪些位置已经放置了元素
    private boolean[] dia2; // 记录在副对角线上哪些位置已经放置了元素
    private List<List<String>> res = new ArrayList<>();

    public List<List<String>> solveNQueens(int n) {
        col = new boolean[n];
        dia1 = new boolean[2 * n - 1]; // 可以用归纳法得到对角线上的元素个数
        dia2 = new boolean[2 * n - 1]; // 可以用归纳法得到对角线上的元素个数
        putQueue(n, 0, new ArrayList<Integer>());
        return res;
    }

    /**
     * 尝试在一个 n 皇后的问题中，摆放第 index 行的皇后的位置
     *
     * @param n
     * @param index
     * @param row
     */
    private void putQueue(int n, int index, List<Integer> row) {
        if (index == n) {
            res.add(generateBoard(n, row));
            return;
        }
        // i 表示第几列，循环的过程就是在尝试给每一行的每一列放置皇后，看看在列上能不能放，看看在对角线上能不能放
        // 其实 n 皇后问题和使用回溯解决排列问题的思路是一致的：暴力遍历，使用额外数组记录状态，一层层减少，递归到底以后回溯，回溯的过程中，一层一层地恢复状态
        for (int i = 0; i < n; i++) {
            if (!col[i] && !dia1[index + i] && !dia2[index - i + n - 1]) {
                row.add(i);
                col[i] = true;
                dia1[index + i] = true;
                dia2[index - i + n - 1] = true;
                putQueue(n, index + 1, row);
                col[i] = false;
                dia1[index + i] = false;
                dia2[index - i + n - 1] = false;
                row.remove(row.size() - 1);
            }
        }
    }


    private List<String> generateBoard(int n, List<Integer> row) {
        List<String> res = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(".");
        }
        StringBuilder cur = null;
        for (int i = 0; i < n; i++) {
            cur = new StringBuilder(sb);
            int queueLoc = row.get(i);
            cur.replace(queueLoc, queueLoc + 1, "Q");
            res.add(cur.toString());
        }
        return res;
    }

    // 测试用例
    public static void main(String[] args) {
        Solution solution = new Solution();
        List<List<String>> solveNQueens = solution.solveNQueens(8);
        for (int i = 0; i < solveNQueens.size(); i++) {
            System.out.println("第 " + (i + 1) + " 种解法：");
            List<String> sloveOne = solveNQueens.get(i);
            printList(sloveOne);
            System.out.println("********");
        }
    }

    private static void printList(List<String> sloveOne) {
        for (int i = 0; i < sloveOne.size(); i++) {
            System.out.println(sloveOne.get(i));

        }
    }
}
```

知识补充：n 皇后问题有很多优化的思路，可以加快搜索的过程。（因为时间关系，以后我们再关注）