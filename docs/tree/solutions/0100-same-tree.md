---
title: 「力扣」第 100 题：相同的树（简单）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

## 「力扣」第 100 题：相同的树（简单）

+ 中文网址：[100. 相同的树](https://leetcode-cn.com/problems/same-tree/description/) ；

+ 英文网址：[100. Same Tree](https://leetcode.com/problems/same-tree/description/) ，

> 给定两个二叉树，编写一个函数来检验它们是否相同。
>
> 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
>
> **示例 1:**
>
> ```
> 输入:       1         1
>        / \       / \
>       2   3     2   3
> 
>      [1,2,3],   [1,2,3]
> 
> 输出: true
> ```
>
> **示例 2:**
>
> ```
> 输入:      1          1
>        /           \
>       2             2
> 
>      [1,2],     [1,null,2]
> 
> 输出: false
> ```
>
> **示例 3:**
>
> ```
> 输入:       1         1
>        / \       / \
>       2   1     1   2
> 
>      [1,2,1],   [1,1,2]
> 
> 输出: false
> ```

分析：判断两棵二叉树是否一样。这是典型的使用递归解决的问题。

Python 代码：

```python
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def isSameTree(self, p, q):
        if p is None and q is None:
            return True

        if p is None:
            return False

        if q is None:
            return False

        return p.val == q.val and self.isSameTree(
            p.left, q.left) and self.isSameTree(p.right, q.right)
```

![image-20181214103315065](http://upload-images.jianshu.io/upload_images/414598-cdec5589bde48aad.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)