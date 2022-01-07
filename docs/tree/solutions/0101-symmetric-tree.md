---
title: 「力扣」第 101 题：判断两棵二叉树是否左右对称
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

+ 题目链接：[101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/description/)。

## 题目描述

给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 `[1,2,2,3,4,4,3]` 是对称的。

```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 `[1,2,2,null,3,null,3]` 则不是镜像对称的:

```
    1
   / \
  2   2
   \   \
   3    3
```

**进阶：**

你可以运用递归和迭代两种方法解决这个问题吗？

## 方法一：递归

需要引入辅助函数。

Python 代码1：

```python
# Definition for a binary tree node.
# 判断一棵二叉树是否镜面对称。
# 设置辅助函数是关键。


class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


# 还可以使用队列去完成
# https://leetcode.com/problems/symmetric-tree/solution/

class Solution(object):
    def isSymmetric(self, root):
        """
        :type root: TreeNode
        :rtype: bool
        """
        if root is None:
            return True
        return self.__helper(root.left, root.right)

    def __helper(self, left_node, right_node):
        if left_node is None and right_node is None:
            return True
        if left_node is None or right_node is None or left_node.val != right_node.val:
            return False
        return self.__helper(left_node.left, right_node.right) and self.__helper(
            left_node.right, right_node.left)

```

## 方法二：非递归

借助双端队列辅助判断。自己画一个图，就好理解了。

![LeetCode 第 101 题：判断两棵二叉树是否左右对称](https://liweiwei1419.gitee.io/images/leetcode-solution/101-1.jpg)

Python 代码：

```python
# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


# 非递归写法：借助双端队列辅助判断

class Solution(object):
    def isSymmetric(self, root):
        """
        :type root: TreeNode
        :rtype: bool
        """
        # 先写递归终止条件
        if root is None:
            return True

        # 其实应该用 from collections import deque
        deque = []

        deque.insert(0, root.left)
        deque.append(root.right)

        while deque:
            l_node = deque.pop(0)
            r_node = deque.pop()

            if l_node is None and r_node is None:
                continue
            if l_node is None or r_node is None:
                return False
            # 代码走到这里一定有 l_node 和 r_node 非空
            # 因此可以取出 val 进行判断了
            if l_node.val != r_node.val:
                return False
            deque.insert(0, l_node.right)
            deque.insert(0, l_node.left)
            deque.append(r_node.left)
            deque.append(r_node.right)
        return True
```

之前在刷这道题的时候，写过一个解法：先拷贝一棵二叉树，再反转，将反转以后的二叉树和自己比较，看看是否相等，这个思路就转化成了以前我们解决过的问题。另外复制的时候，我们可以反着复制，然后比较。

Java 代码：

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
    public boolean isSymmetric(TreeNode root) {
        if (root == null) {
            return true;
        }
        TreeNode copyBinaryTree = copyBinaryTree(root);
        TreeNode invertBinaryTree = invertBinaryTree(copyBinaryTree);
        return isSameTree(root, invertBinaryTree);
    }

    private boolean isSameTree(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) {
            return true;
        }
        if (t1 == null || t2 == null || t1.val != t2.val) {
            return false;
        }
        return isSameTree(t1.left, t2.left) && isSameTree(t1.right, t2.right);
    }

    private TreeNode invertBinaryTree(TreeNode node) {
        if (node == null) {
            return node;
        }
        invertBinaryTree(node.left);
        invertBinaryTree(node.right);
        TreeNode temp = node.left;
        node.left = node.right;
        node.right = temp;
        return node;
    }

    // 也使用递归的方式完成（熟悉一下如何完成二叉树的复制）
    private TreeNode copyBinaryTree(TreeNode node) {
        if (node == null) {
            return null;
        }
        TreeNode newTreeNode = new TreeNode(node.val);
        newTreeNode.left = copyBinaryTree(node.left);
        newTreeNode.right = copyBinaryTree(node.right);
        return newTreeNode;
    }
}
```

提示：首先理解什么是镜面对称。**两个结点的根结点的值必须相等，并且1、左边的左结点=右边的右结点；2、左边的右结点=右边的左结点**。我觉得没有什么技巧，记住就可以了。使用下面这张图思考这个问题。

思路1：递归。

![image-20181214103655847](http://upload-images.jianshu.io/upload_images/414598-e1711449c7543447.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

思路2：双端队列。

![image-20181214104909130](http://upload-images.jianshu.io/upload_images/414598-9fe70de9914851db.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Python 代码：

```python
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution(object):
    def isSymmetric(self, root):
        # 先写递归终止条件
        if root is None:
            return True

        # 其实应该用 from collections import deque
        deque = []

        deque.insert(0, root.left)
        deque.append(root.right)

        while deque:
            l_node = deque.pop(0)
            r_node = deque.pop()

            if l_node is None and r_node is None:
                continue
                
            if l_node is None or r_node is None:
                return False

            if l_node.val != r_node.val:
                return False
            deque.insert(0, l_node.right)
            deque.insert(0, l_node.left)
            deque.append(r_node.left)
            deque.append(r_node.right)
        return True
```
