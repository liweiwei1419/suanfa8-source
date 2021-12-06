---
title: 「力扣」第 113 题：路径总和 II
date: 2018-02-09 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 14：回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
permalink: leetcode-solution/0113-path-sum-ii
---

## 「力扣」第 113 题：路径总和 II

+ 中文网址：[113. 路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/description/) ；
+ 英文网址：[113. Path Sum II](https://leetcode.com/problems/path-sum-ii/description/) ；
+ 题解链接：[回溯算法（深度优先遍历 + 状态重置）](https://leetcode-cn.com/problems/path-sum-ii/solution/hui-su-suan-fa-shen-du-you-xian-bian-li-zhuang-tai/)

> 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
>
> **说明:** 叶子节点是指没有子节点的节点。
>
> **示例:**
> 给定如下二叉树，以及目标和 `sum = 22`，
>
> ```
>            5
>           / \
>          4   8
>         /   / \
>        11  13  4
>       /  \    / \
>      7    2  5   1
> ```
>
> 返回:
>
> ```
> [
> [5,4,11,2],
> [5,8,4,5]
> ]
> ```

分析：使用递归的方法解决问题，很多时候，并不是让我们真正地去做这个问题，而是须要我们发现递归关系，寻找递归终止条件。历史上类似的经典问题有汉诺塔问题和八皇后问题。

下面给出一种简介的解法：这种解法显得更自然一些，遍历了从根节点到叶子节点的每一个节点，然后累加计算加到了多少，这是与老师的思路不同的一种思路。

Java 代码：

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> pathSum(TreeNode root, int sum) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            return res;
        }

        Deque<Integer> path = new ArrayDeque<>();
        dfs(root, sum, path, res);
        return res;
    }

    public void dfs(TreeNode node, int sum, Deque<Integer> path, List<List<Integer>> res) {
        if (node == null) {
            return;
        }

        sum -= node.val;
        path.addLast(node.val);

        if (node.left == null && node.right == null && sum == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        if (node.left != null) {
            dfs(node.left, sum, path, res);
            path.removeLast();
        }

        if (node.right != null) {
            dfs(node.right, sum, path, res);
            path.removeLast();
        }
    }
}

```

Python 代码：

```python
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:

    def pathSum(self, root: TreeNode, sum: int) -> List[List[int]]:
        def dfs(node, path, sum, res):
            if node is None:
                return

            if node.left is None and node.right is None and node.val == sum:
                res.append(path + [node.val])
                return

            path.append(node.val)

            if node.left:
                dfs(node.left, path, sum - node.val, res)
            if node.right:
                dfs(node.right, path, sum - node.val, res)
            path.pop()

        res = []
        dfs(root, [], sum, res)
        return res
```

