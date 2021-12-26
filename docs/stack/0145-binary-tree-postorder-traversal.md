---
title: 「力扣」第 145 题：二叉树的后序遍历
icon: yongyan
category: 栈
tags:
  - 栈
---

+ 题目链接：[145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/) 。


## 题目描述




> 给定一个整数 *n*，生成所有由 1 ... *n* 为节点所组成的**二叉搜索树**。
>
> **示例:**
>
> ```
> 输入: 3
> 输出:
> [
> [1,null,3,2],
> [3,2,null,1],
> [3,1,null,null,2],
> [2,1,3],
> [1,null,2,null,3]
> ]
> 解释:
> 以上的输出对应以下 5 种不同结构的二叉搜索树：
> 
> 1         3     3      2      1
>  \       /     /      / \      \
>   3     2     1      1   3      2
>  /     /       \                 \
> 2     1         2                 3
> ```

Python 代码：

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def postorderTraversal(self, root):
        if not root:
            return []
        stack = [(1, root)]
        res = []
        while stack:
            command, node = stack.pop()
            if command == 0:
                res.append(node.val)
            else:
                # 后序遍历：先左右子树，再自己
                # 入栈顺序：自己、右子树、左子树
                stack.append((0, node))
                if node.right:
                    stack.append((1, node.right))
                if node.left:
                    stack.append((1, node.left))
        return res
```

上面的过程更好地体现了递归过程中系统栈的作用，按照这种方式，所有的递归的代码都可以改造成非递归的代码。

（本节完）