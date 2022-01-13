---
title: 「力扣」第 1457 题： 二叉树中的伪回文路径（中等）
icon: yongyan
category: 位运算
tags:
  - 位运算
---

- 题目地址：[1457. 二叉树中的伪回文路径](https://leetcode-cn.com/problems/pseudo-palindromic-paths-in-a-binary-tree/)。

## 题目描述

给你一棵二叉树，每个节点的值为 1 到 9 。我们称二叉树中的一条路径是 「伪回文」的，当它满足：路径经过的所有节点值的排列中，存在一个回文序列。

请你返回从根到叶子节点的所有路径中 伪回文 路径的数目。

**示例 1**：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/23/palindromic_paths_1.png)

```
输入：root = [2,3,1,3,1,null,1]
输出：2
解释：上图为给定的二叉树。总共有 3 条从根到叶子的路径：红色路径 [2,3,3] ，绿色路径 [2,1,1] 和路径 [2,3,1] 。
     在这些路径中，只有红色和绿色的路径是伪回文路径，因为红色路径 [2,3,3] 存在回文排列 [3,2,3] ，绿色路径 [2,1,1] 存在回文排列 [1,2,1] 。
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/23/palindromic_paths_2.png)

```
输入：root = [2,1,1,1,3,null,null,null,null,null,1]
输出：1
解释：上图为给定二叉树。总共有 3 条从根到叶子的路径：绿色路径 [2,1,1] ，路径 [2,1,3,1] 和路径 [2,1] 。
     这些路径中只有绿色路径是伪回文路径，因为 [2,1,1] 存在回文排列 [1,2,1] 。
```

**示例 3：**

```
输入：root = [9]
输出：1
```

**提示：**

- 给定二叉树的节点数目在 `1` 到 `10^5` 之间。
- 节点值在 `1` 到 `9` 之间。

### 思路分析

- 伪回文的意思是：要么出现的字母都能两两配对，要么除了两两配对的字符以外，还有一个字符是「落单」的；
- 题目说的是从根结点到叶子结点的一个路径，因此我们使用「先序遍历」；
- 异或有这样的特点：异或两次以后为 $0$；
- 状态压缩的好处是：易于复制，像这道问题，可以作为参数传递下去，Java 中参数的传递是「值传递」；
- `(status & (status - 1))` 是位运算的一个性质，需要记住的，表示把二进制表示下最低位的 $1$ 变成 $0$。

**参考代码 1**：

Java 代码：

```java
import java.util.ArrayDeque;
import java.util.Deque;


class Solution {

    private int count = 0;

    public int pseudoPalindromicPaths(TreeNode root) {
        dfs(root, 0);
        return count;
    }

    private void dfs(TreeNode node, int status) {
        if (node == null) {
            return;
        }

        status ^= (1 << node.val);

        if (node.left == null && node.right == null) {
            if (status == 0 || (status & (status - 1)) == 0) {
                count++;
            }
            return;
        }

        if (node.left != null) {
            dfs(node.left, status);

        }

        if (node.right != null) {
            dfs(node.right, status);
        }
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是二叉树的结点的个数；
- 空间复杂度：$O(\log N)$，这里需要的空间是递归树的高度。
