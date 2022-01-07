---
title: 「力扣」第 104 题：求一棵二叉树的最大深度（简单）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

+ 题目描述：[112. 路径总和](https://leetcode-cn.com/problems/path-sum/)。

## 题目描述

给你二叉树的根节点 `root` 和一个表示目标和的整数 `targetSum` 。判断该树中是否存在 **根节点到叶子节点** 的路径，这条路径上所有节点值相加等于目标和 `targetSum` 。如果存在，返回 `true` ；否则，返回 `false` 。

**叶子节点** 是指没有子节点的节点。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg)

```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
解释：等于目标和的根节点到叶节点路径如上图所示。
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg)

```
输入：root = [1,2,3], targetSum = 5
输出：false
解释：树中存在两条根节点到叶子节点的路径：
(1 --> 2): 和为 3
(1 --> 3): 和为 4
不存在 sum = 5 的根节点到叶子节点的路径。
```

**示例 3：**

```
输入：root = [], targetSum = 0
输出：false
解释：由于树是空的，所以不存在根节点到叶子节点的路径。
```

 

**提示：**

- 树中节点的数目在范围 `[0, 5000]` 内
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

## 思路分析

给出一棵二叉树以及一个数组 sum，判断在这棵二叉树上是否存在一条从根到**叶子结点**的路径，这条路径上所有的结点的和为 sum。


下面给出一个很容易想到，但是是个错误的解答。

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
    public boolean hasPathSum(TreeNode root, int sum) {
        if (root == null) {
            return sum == 0;
        }
        if (root.left != null) {
            return hasPathSum(root.left, sum - root.val);
        }
        if (root.right != null) {
            return hasPathSum(root.right, sum - root.val);
        }
        return false;
    }
}
```

这样的写法，之所以是错误的，是因为我们没有注意到所求的路径是从根结点到叶子结点的路径，忽略了叶子结点这个条件，为此，我们改写方法如下：

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
    public boolean hasPathSum(TreeNode root, int sum) {
        if (root == null) {
            return false;
        }
        // 是叶子结点，这就是递归到底的情况了
        if (root.left == null && root.right == null) {
            return root.val == sum;
        }
        if (hasPathSum(root.left, sum - root.val)) {
            return true;
        }
        if (hasPathSum(root.right, sum - root.val)) {
            return true;
        }
        return false;
    }
}
```


Python 代码：

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
# 112. 路径总和
# 给定一个二叉树和一个目标和，判断该树中是否存在根结点到叶子结点的路径，这条路径上所有结点值相加等于目标和。
#
# 说明: 叶子结点是指没有子结点的结点。


class Solution:
    def hasPathSum(self, root, sum):
        """
        :type root: TreeNode
        :type sum: int
        :rtype: bool
        """
        if root is None:
            return False
        # 此时 root 不为空
        # 左边看一看，右边看一看
        # 【重点】一定要记得判断，左边子树和右边子树同时为空，说明走到底了
        if root.left is None and root.right is None and root.val == sum:
            return True
        left_has = self.hasPathSum(root.left, sum - root.val)
        right_has = self.hasPathSum(root.right, sum - root.val)
        return left_has or right_has

```

> 

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
    public boolean hasPathSum(TreeNode root, int sum) {
        if (root == null) {
            return false;
        }
        // 是叶子结点，这就是递归到底的情况了
        if (root.left == null && root.right == null) {
            return root.val == sum;
        }
        if (hasPathSum(root.left, sum - root.val)) {
            return true;
        }
        if (hasPathSum(root.right, sum - root.val)) {
            return true;
        }
        return false;
    }
}
```

Python 代码：

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def hasPathSum(self, root, sum):
        if root is None:
            return False
        # 此时 root 不为空
        # 左边看一看，右边看一看
        # 【重点】一定要记得判断，左边子树和右边子树同时为空，说明走到底了
        if root.left is None and root.right is None and root.val == sum:
            return True
        left_has = self.hasPathSum(root.left, sum - root.val)
        right_has = self.hasPathSum(root.right, sum - root.val)
        return left_has or right_has

```

### LeetCode 第 112 题：Path Sum

Python 代码：

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def hasPathSum(self, root, sum):
        """
        :type root: TreeNode
        :type sum: int
        :rtype: bool
        """

        if root is None:
            return False

        # 此时 root 不为空
        # 左边看一看，右边看一看
        # 【重点】一定要记得判断，左边子树和右边子树同时为空，说明走到底了
        if root.left is None and root.right is None and root.val == sum:
            return True

        left_has = self.hasPathSum(root.left, sum - root.val)
        right_has = self.hasPathSum(root.right, sum - root.val)
        return left_has or right_has
```

