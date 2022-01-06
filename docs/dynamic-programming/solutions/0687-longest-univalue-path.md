---
title: 「力扣」第 687 题：最长同值路径（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
  - 树形 DP
---

+ 题目链接：[687. 最长同值路径](https://leetcode-cn.com/problems/longest-univalue-path/)

## 题目描述

给定一个二叉树，找到最长的路径，这个路径中的每个节点具有相同值。 这条路径可以经过也可以不经过根节点。

**注意**：两个节点之间的路径长度由它们之间的边数表示。

**示例 1:**

输入:

```
              5
             / \
            4   5
           / \   \
          1   1   5
```

输出:

```
2
```

**示例 2:**

输入:

```
              1
             / \
            4   5
           / \   \
          4   4   5
```

输出:

```
2
```

**注意:** 给定的二叉树不超过10000个结点。 树的高度不超过1000。

---

注意：两个节点之间的路径长度由它们之间的边数表示。初始值需要设置为 0。

**参考代码**：

```java
public class Solution {

    private int res;
    
    public int longestUnivaluePath(TreeNode root) {
        res = 0;
        dfs(root);
        return res;
    }
    
    /**
     * 与 node 的值相等的单边路径的长度
     *
     * @param node
     * @return
     */
    private int dfs(TreeNode node) {
        if (node == null) {
            return 0;
        }
    
        int left = dfs(node.left);
        int right = dfs(node.right);
    
        int leftPath = 0;
        if (node.left != null && node.left.val == node.val) {
            // 这里加上的 1 是边数
            leftPath = left + 1;
        }
    
        int rightPath = 0;
        if (node.right != null && node.right.val == node.val) {
            // 这里加上的 1 是边数
            rightPath += right + 1;
        }
    
        // 注意：两个节点之间的路径长度由它们之间的边数表示
        res = Math.max(res, leftPath + rightPath);
        return Math.max(leftPath, rightPath);
    }
}
```