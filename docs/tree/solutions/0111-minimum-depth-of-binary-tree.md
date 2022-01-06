---
title: 「力扣」第 104 题：求一棵二叉树的最大深度（简单）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

## 「力扣」第 111 题：求一棵二叉树的最小深度

+ 中文网址：[111. 二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/) ；
+ 英文网址：[111. Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/description/) ，

> 给定一个二叉树，找出其最小深度。
>
> 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
>
> **说明:** 叶子节点是指没有子节点的节点。
>
> **示例:**
>
> 给定二叉树 `[3,9,20,null,null,15,7]`,
>
> ```
>  3
> / \
> 9  20
>  /  \
> 15   7
> ```
>
> 返回它的最小深度  2.

分析：即求一棵二叉树从根结点到叶子结点的最短路径的长度。

+ 这个问题里面有小的陷阱。

+ 我们在思考递归终止条件的时候，有的时候可能会存在陷阱。

![LeetCode 第 111 题：求一棵二叉树的最小深度](http://upload-images.jianshu.io/upload_images/414598-a2fe852f58cad7d6.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/1240)

这道题，我第一次做是想当然，顺着第 104 题把最大改成最小，但是要注意到上图 4 那个结点，4 的左孩子为空，返回 0 ，右孩子为 9，返回2，按照我们的逻辑就返回 0 ，显然是错误的，所以要针对左右孩子有一个为空的时候，做出分类判断。

Python 代码：

```python
# Definition for a binary tree node.
# 111. 二叉树的最小深度
# 给定一个二叉树，找出其最小深度。
#
# 最小深度是从根结点到最近叶子结点的最短路径上的结点数量。
#
# 说明: 叶子结点是指没有子结点的结点。


class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):
    def minDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """

        if root is None:
            return 0

        if root.left is None:
            return 1 + self.minDepth(root.right)

        if root.right is None:
            return 1 + self.minDepth(root.left)

        return 1 + min(self.minDepth(root.left), self.minDepth(root.right))
```

Python 代码：使用 BFS：**使用层序遍历，我感觉更直接一些，因为只要扫到叶子结点，就可以返回了**

```python
class Solution(object):
    def minDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """

        if root is None:
            return 0
        depth = 0
        queue = [root]
        while queue:
            depth += 1
            size = len(queue)
            for _ in range(size):
                first = queue.pop(0)
                if first.left is None and first.right is None:
                    return depth
                if first.left:
                    queue.append(first.left)
                if first.right:
                    queue.append(first.right)
```

Python 代码：使用 DFS

```python
# Definition for a binary tree node.
# 111. 二叉树的最小深度
# 给定一个二叉树，找出其最小深度。
#
# 最小深度是从根结点到最近叶子结点的最短路径上的结点数量。
#
# 说明: 叶子结点是指没有子结点的结点。


class TreeNode(object):

    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution(object):

    def __init__(self):
        self.min_depth = float("inf")

    def minDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """

        if root is None:
            return 0

        self.__dfs(root, 0)
        return self.min_depth

    def __dfs(self, node, depth):
        if node is None:
            return
        depth += 1
        if node.left is None and node.right is None:
            self.min_depth = min(self.min_depth, depth)
            return
        if node.left:
            self.__dfs(node.left, depth)
        if node.right:
            self.__dfs(node.right, depth)
```

（本节完）



# 111. 求一棵二叉树的最小深度（简单）



我写的题解地址：

## 深度优先遍历

## 广度优先遍历

Python 代码：使用 BFS，使用层序遍历，我感觉更直接一些，因为只要扫到叶子结点，就可以返回了。

```python
class Solution(object):
    def minDepth(self, root):
        if root is None:
            return 0
        depth = 0
        queue = [root]
        while queue:
            depth += 1
            size = len(queue)
            for _ in range(size):
                first = queue.pop(0)
                if first.left is None and first.right is None:
                    return depth
                if first.left:
                    queue.append(first.left)
                if first.right:
                    queue.append(first.right)
```



提示：思路1：BFS 就可以做，并且我觉得思路更直接一些。并且求二叉树的最小深度也是这个套路。

思路2：使用递归的话，注意只有左子树或者只有右子树的情况

Python 代码：

```python
class Solution(object):
    def minDepth(self, root):
        if root is None:
            return 0
        depth = 0
        queue = [root]
        while queue:
            depth += 1
            size = len(queue)
            for _ in range(size):
                first = queue.pop(0)
                if first.left is None and first.right is None:
                    return depth
                if first.left:
                    queue.append(first.left)
                if first.right:
                    queue.append(first.right)
```

### 