---
title: 「力扣」第 77 题：组合（中等）
date: 2018-02-14 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 14：回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
permalink: leetcode-solution/0077-combinations
---

## 「力扣」第 77 题：组合（中等）

+ [链接](https://leetcode-cn.com/problems/combinations/)
+ [题解链接](https://leetcode-cn.com/problems/combinations/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-ma-/)

> 给定两个整数 `n` 和 `k`，返回 `1 ... n` 中所有可能的 `k` 个数的组合。
>
> 示例：
>
> ```
> 输入: n = 4, k = 2
> 输出:
> [
>   [2, 4],
>   [3, 4],
>   [2, 3],
>   [1, 2],
>   [1, 3],
>   [1, 4],
> ]
> ```

Java 代码：

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution3 {

    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        if (k <= 0 || n < k) {
            return res;
        }
        Deque<Integer> path = new ArrayDeque<>(k);
        dfs(n, k, 1, path, res);
        return res;
    }

    // i 的极限值满足： n - i + 1 = (k - pre.size())
    // n - i + 1 是闭区间 [i, n] 的长度
    // k - pre.size() 是剩下还要寻找的数的个数
    private void dfs(int n, int k, int index, Deque<Integer> path, List<List<Integer>> res) {
        if (path.size() == k) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = index; i <= n - (k - path.size()) + 1; i++) {
            path.addLast(i);
            dfs(n, k, i + 1, path, res);
            path.removeLast();
        }
    }
}
```

