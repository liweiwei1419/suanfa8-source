---
title: 「力扣」第 104 题：求一棵二叉树的最大深度（简单）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

## 「力扣」第 236 题：二叉树的最近公共祖先

+ 中文网址：[236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/description/) ；

+ 英文网址：[236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/) ，

> 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
>
> [百度百科](https://baike.baidu.com/item/%E6%9C%80%E8%BF%91%E5%85%AC%E5%85%B1%E7%A5%96%E5%85%88/8918834?fr=aladdin)中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（**一个节点也可以是它自己的祖先**）。”
>
> 例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]
>
> ![LeetCode 第 236 题：二叉树的最近公共祖先](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/15/binarytree.png)
>
> **示例 1:**
>
> ```
> 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
> 输出: 3
> 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
> ```
>
> **示例 2:**
>
> ```
> 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
> 输出: 5
> 解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
> ```
>
> 
>
> **说明:**
>
> - 所有节点的值都是唯一的。
> - p、q 为不同节点且均存在于给定的二叉树中。

分析：给定一棵二叉树和两个结点，寻找这两个结点的最近公共祖先。该问题是经典的 LCA 问题。在[这里](https://www.liwei.party/2018/05/12/leetcode-solution/lowest-common-ancestor/)我写了比较完整的分析过程。





我写的题解地址：






