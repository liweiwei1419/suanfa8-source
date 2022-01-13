---
title: 「力扣」第 235 题：二叉搜索树的最近公共祖先（中等）
icon: yongyan
category: 二叉搜索树
tags:
  - 二叉树
  - 递归
---

- 题目链接：[235. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)。

## 题目描述

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

[百度百科](https://baike.baidu.com/item/%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88/8918834?fr=aladdin)中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（**一个节点也可以是它自己的祖先**）。”

例如，给定如下二叉搜索树: root = [6,2,8,0,4,7,9,null,null,3,5]

![LeetCode 第 235 题（寻找二分搜索树中指定两个结点的最近公共祖先）](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/binarysearchtree_improved.png)

**示例 1:**

```
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6
解释: 节点 2 和节点 8 的最近公共祖先是 6。
```

**示例 2:**

```
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
```

**说明:**

- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉搜索树中。

## 思路分析

这道题只要我们分析清楚递归关系，其实是非常简单的。就是利用了我们在本文开头部分所叙述的“二分搜索树的重要性质”来进行分类讨论。

1. 如果 p、q 结点位于 root 结点的同一侧，如果位于左侧，则递归地调用左孩子，如果位于右侧，则递归地调用右孩子；
2. 如果 p、q 结点位于 root 结点的两侧，则所求的最近的公共祖先就是 root 自己；
3. 如果 p、q 其中之一位于 root 结点，则 root 结点即为所求的结点。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }

}

public class Solution {
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
if (root == null){
return null;
}
if(p.val < root.val && q.val < root.val){
return lowestCommonAncestor(root.left,p,q);
}
if(p.val > root.val && q.val > root.val){
return lowestCommonAncestor(root.right,p,q);
}
return root;
}
}

````
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // 其实这一步判断可以不用
        if (root == null || root == p || root == q) {
            return root;
        }
        if (p.val < root.val && q.val < root.val) {
            return lowestCommonAncestor1(root.left, p, q);
        } else if (p.val > root.val && q.val > root.val) {
            return lowestCommonAncestor1(root.right, p, q);
        }
        return root;
    }
}
````

</CodeGroupItem>
</CodeGroup>

## 总结

这道问题的实现有赖于我们对二分搜索树的深刻的理解以及我们对整个问题的逻辑分析。
