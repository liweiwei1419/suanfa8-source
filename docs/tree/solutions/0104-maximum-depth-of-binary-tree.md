---
title: 「力扣」第 104 题：求一棵二叉树的最大深度（简单）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

+ 题目链接：[104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/)。

## 题目描述

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明:** 叶子节点是指没有子节点的节点。

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg)



```
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

**Example 2:**

```
Input: root = [1,null,2]
Output: 2
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-100 <= Node.val <= 100`

## 方法一：深度优先遍历

关键：要能看出这道题考查二叉树的后序遍历。

提示：思路1：后序遍历：看完左右子树，才能计算自己；

思路2：使用 BFS。

Java 代码：

```java
public class Solution {

    // 求一棵二叉树的最大深度，后序遍历

    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int leftMaxDepth = maxDepth(root.left);
        int rightMaxDepth = maxDepth(root.right);
        return Math.max(leftMaxDepth, rightMaxDepth) + 1;
    }
}
```

Python 代码：

```python
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


class Solution(object):
    def maxDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if root is None:
            return 0
        # 先计算左右子树，然后再计算自己，这是后序遍历
        l_sub_tree_depth = self.maxDepth(root.left)
        r_sub_tree_depth = self.maxDepth(root.right)
        return max(l_sub_tree_depth, r_sub_tree_depth) + 1
```

Python 代码：把上面的递归改成循环

```python
class Solution(object):
    def maxDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if root is None:
            return 0
        depth = 0
        stack = [(1, root)]
        while stack:
            cur_depth, node = stack.pop()
            depth = max(depth, cur_depth)
            if node.left:
                stack.append((cur_depth + 1, node.left))
            if node.right:
                stack.append((cur_depth + 1, node.right))
        return depth
```

说明：这个写法看一看就好，感觉没啥意思。

感觉递归调用就像什么都没有做一样。通过这个例子，我们来理解一下（1）（2）这两个步骤的具体应用。这让我想起了八皇后问题。

还可以使用 DFS  和 BFS 完成这个问题。首先  BFS  我觉得思路更直接一些，代码也是有套路的。

Python 代码：

```python
class Solution(object):
    def maxDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if root is None:
            return 0
        depth = 0
        queue = [root]
        while queue:
            size = len(queue)
            depth += 1
            for _ in range(size):
                first = queue.pop(0)
                if first.left:
                    queue.append(first.left)
                if first.right:
                    queue.append(first.right)
        return depth
```

Python 代码：使用 DFS

```python
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

# 求一棵二叉树的最大深度。
# 要能看出这道题本质上是二叉树的后序遍历。


class Solution(object):

    def __init__(self):
        self.max_depth = 0

    def maxDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if root is None:
            return 0
        self.__dfs(root, 0)
        return self.max_depth

    def __dfs(self, node, depth):
        if node is None:
            return
        depth += 1
        if node.left is None and node.right is None:
            # 到叶子结点了，可以结算了
            self.max_depth = max(self.max_depth, depth)
            return
        if node.left:
            self.__dfs(node.left, depth)
        if node.right:
            self.__dfs(node.right, depth)
```

+ 复习和二叉树相关的所有操作。

## 方法二：广度优先遍历

Python 代码：

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        if root is None:
            return 0
        depth = 0
        queue = [root]
        while queue:
            size = len(queue)
            depth += 1
            for _ in range(size):
                first = queue.pop(0)
                if first.left:
                    queue.append(first.left)
                if first.right:
                    queue.append(first.right)
        return depth
```



