---
title: 「力扣」第 104 题：求一棵二叉树的最大深度（简单）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

## 「力扣」第 112 题：Path Sum

传送门：[112. 路径总和](https://leetcode-cn.com/problems/path-sum/)。

> 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
>
> **说明:** 叶子节点是指没有子节点的节点。
>
> **示例:** 
> 给定如下二叉树，以及目标和 `sum = 22`，
>
> ```
>            5
>           / \
>          4   8
>         /   / \
>        11  13  4
>       /  \      \
>      7    2      1
> ```
>
> 返回 `true`, 因为存在目标和为 22 的根节点到叶子节点的路径 `5->4->11->2`。

分析：给出一棵二叉树以及一个数组 sum，判断在这棵二叉树上是否存在一条从根到**叶子结点**的路径，这条路径上所有的结点的和为 sum。


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

### 



112 . 路径总和



https://leetcode-cn.com/problems/path-sum/



我写的题解地址：

> 给定一个二叉树和一个目标和，判断该树中是否存在根结点到**叶子结点**的路径，这条路径上所有结点值相加等于目标和。

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

### 