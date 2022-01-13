---
title: 「力扣」第 95 题：不同的二叉搜索树 II（中等）
icon: yongyan
category: 二叉搜索树
tags:
  - 分治算法
---

- 题目链接：[95. 不同的二叉搜索树 II](https://leetcode-cn.com/problems/unique-binary-search-trees-ii)。

## 题目描述

给你一个整数 `n` ，请你生成并返回所有由 `n` 个节点组成且节点值从 `1` 到 `n` 互不相同的不同 **二叉搜索树** 。可以按 **任意顺序** 返回答案。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/18/uniquebstn3.jpg)

```
输入：n = 3
输出：[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
```

**示例 2：**

```
输入：n = 1
输出：[[1]]
```

**提示：**

- `1 <= n <= 8`

## 方法一：递归（分治法）

**参考代码 1**：

```java
import java.util.ArrayList;
import java.util.List;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}


public class Solution {

    // 递归（分支）

    public List<TreeNode> generateTrees(int n) {
        if (n == 0) {
            return new ArrayList<>();
        }
        return generateTrees(1, n);
    }

    private List<TreeNode> generateTrees(int left, int right) {
        List<TreeNode> res = new ArrayList<>();
        if (left > right) {
            // 上层调用的方法须要这个空结点作为其左结点或者右节点
            res.add(null);
            return res;
        }
        if (left == right) {
            // 只有一个结点，这个结点作为根结点返回即可
            // 这一步可以包括到下面一个情况中
            res.add(new TreeNode(left));
            return res;
        }
        for (int i = left; i <= right; i++) {
            List<TreeNode> leftList = generateTrees(left, i - 1);
            List<TreeNode> rightList = generateTrees(i + 1, right);
            for (TreeNode leftTree : leftList) {
                for (TreeNode rightTree : rightList) {
                    TreeNode root = new TreeNode(i);
                    root.left = leftTree;
                    root.right = rightTree;
                    res.add(root);
                }
            }
        }
        return res;
    }
}
```

可以把 `left == right` 的情况去掉。

**参考代码 2**：

```java
import java.util.ArrayList;
import java.util.List;

public class Solution2 {

    public List<TreeNode> generateTrees(int n) {
        if (n == 0) {
            return new ArrayList<>();
        }
        return generateTrees(1, n);
    }

    private List<TreeNode> generateTrees(int left, int right) {
        List<TreeNode> res = new ArrayList<>();
        if (left > right) {
            // 这个位置要占住
            res.add(null);
            return res;
        }
        for (int i = left; i <= right; i++) {
            for (TreeNode leftTree : generateTrees(left, i - 1)) {
                for (TreeNode rightTree : generateTrees(i + 1, right)) {
                    TreeNode root = new TreeNode(i);
                    root.left = leftTree;
                    root.right = rightTree;
                    res.add(root);
                }
            }
        }
        return res;
    }
}
```

## 方法二：动态规划

**参考代码 3**：

```java
import java.util.ArrayList;
import java.util.List;

/**
 * 动态规划的解法
 */
public class Solution4 {

    public List<TreeNode> generateTrees(int n) {
        List<TreeNode>[] res = new ArrayList[n + 1];
        res[0] = new ArrayList<>();
        if (n <= 0) {
            return res[0];
        }
        // 注意这个位置
        res[0].add(null);
        for (int i = 1; i <= n; i++) {
            // 先将对象数组初始化
            res[i] = new ArrayList<>();
            for (int j = 0; j < i; j++) {
                for (TreeNode left : res[j]) {
                    for (TreeNode right : res[i - j - 1]) {
                        TreeNode root = new TreeNode(j + 1);
                        root.left = left;
                        root.right = clone(right, j + 1);
                        res[i].add(root);
                    }
                }
            }
        }
        return res[n];
    }

    private TreeNode clone(TreeNode root, int k) {
        if (root == null) {
            return root;
        }
        TreeNode curNode = new TreeNode(root.val + k);
        curNode.left = clone(root.left, k);
        curNode.right = clone(root.right, k);
        return curNode;
    }
}
```
