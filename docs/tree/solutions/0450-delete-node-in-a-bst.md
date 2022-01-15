---
title: 「力扣」第 450 题：删除二叉搜索树中的节点（中等）
icon: yongyan
category: 二叉搜索树
tags:
  - 二叉搜索树
  - 递归
---

- 题目链接：[450. 删除二叉搜索树中的节点](https://leetcode-cn.com/problems/delete-node-in-a-bst/)；
- 题解链接：[用前驱或者后继结点代替被删除结点（Python、Java 代码）](https://leetcode-cn.com/problems/delete-node-in-a-bst/solution/yong-qian-qu-huo-zhe-hou-ji-jie-dian-zi-shu-dai-ti/)。

## 题目描述

给定一个二叉搜索树的根节点 **root** 和一个值 **key**，删除二叉搜索树中的 **key** 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

一般来说，删除节点可分为两个步骤：

1. 首先找到需要删除的节点；
2. 如果找到了，删除它。

**示例 1:**

![img](https://assets.leetcode.com/uploads/2020/09/04/del_node_1.jpg)

```
输入：root = [5,3,6,2,4,null,7], key = 3
输出：[5,4,6,2,null,null,7]
解释：给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
另一个正确答案是 [5,2,6,null,4,null,7]。
```

![img](https://assets.leetcode.com/uploads/2020/09/04/del_node_supp.jpg)

**示例 2:**

```
输入: root = [5,3,6,2,4,null,7], key = 0
输出: [5,3,6,2,4,null,7]
解释: 二叉树不包含值为 0 的节点
```

**示例 3:**

```
输入: root = [], key = 0
输出: []
```

**提示:**

- 节点数的范围 `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- 节点值唯一
- `root` 是合法的二叉搜索树
- `-10^5 <= key <= 10^5`

## 用前驱或者后继结点代替被删除结点（Python、Java 代码）

“二分搜索树删除结点”这一操作在《数据结构与算法》这一类的教科书上均有介绍，虽然这个操作是计算机科学家 [Hibbard](https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%85%83%E6%90%9C%E5%B0%8B%E6%A8%B9) 发明的，但其实这个操作非常简单且直观。

掌握递归删除二分搜索树结点的方法，注意递归函数的定义，有的时候需要返回一个新的二分搜索树的根。

## 思路分析

删除结点是一个比较复杂的操作，一定要会。给定一棵二分搜索树，删除其中的一个结点。若删除的结点不存在？是否可能有多个需要删除的结点，删除的结点是否需要返回？

这个问题我以前专门写了题解，请点击[这里](https://liweiwei1419.github.io/leetcode-solution/leetcode-0450-delete-node-in-a-bst/)。

理解这个算法的关键在于保持 BST 中序遍历的顺序性，当待删除结点的左右结点都不为空的时候，让待删除结点的前驱结点或者后继结点代替被删除结点，这样就能成为一棵树，并且还是 BST，否则就变成森林，或者不保持 BST 中序遍历的顺序性了。

![](https://pic.leetcode-cn.com/65820431b5bc15336391c8445bb22d8d6de3bd428a660413b9bd20fe5933ed72.png)

![](https://pic.leetcode-cn.com/0e4d4f0a47608586e810a898f30900eaab3a81b49e6ebe237c415651bcc8c181.png)

![](https://pic.leetcode-cn.com/33dc518fa189e9df2f2a7b1239489008da1d4306eeec8b80456962839a99a6b2.png)

![](https://pic.leetcode-cn.com/2fc9bbc19b20dcf017f794824c36ac0bef8115b4d888454b0977a1a9fdc1308e.png)

在草稿纸上很容易画出 BST 删除结点操作的这 3 种情况。

![](https://pic.leetcode-cn.com/60d185c859470a8118a6d5319300749a1b504c18935d2b0a28d45d58afd248aa.png)

![](https://pic.leetcode-cn.com/f8d57d74649c7f1737f64fdeaf92ad78f9e8a40794ac5409b60844ad28ff3ec2.png)

## 方法一：用前驱结点（左子树中最大结点）代替被删除结点

**参考代码 1**：

Python 代码：

```Python []
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


# 方法1：用左子树中最大结点的代替被删除结点


class Solution:
    def deleteNode(self, root, key):
        if root is None:
            return None

        if key < root.val:
            root.left = self.deleteNode(root.left, key)
            return root

        if key > root.val:
            root.right = self.deleteNode(root.right, key)
            return root

        if root.left is None:
            new_root = root.right
            root.right = None
            return new_root

        if root.right is None:
            new_root = root.left
            root.left = None
            return new_root

        # 找到左子树中最大的
        predecessor = self.__maximum(root.left)
        predecessor_copy = TreeNode(predecessor.val)
        predecessor_copy.left = self.__remove_max(root.left)
        predecessor_copy.right = root.right
        root.left = None
        root.right = None
        return predecessor_copy

    def __remove_max(self, node):
        if node.right is None:
            new_root = node.left
            node.left = None
            return new_root
        node.right = self.__remove_max(node.right)
        return node

    def __maximum(self, node):
        while node.right:
            node = node.right
        return node
```

Java 代码：

```Java []
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) {
            return null;
        }

        if (key < root.val) {
            root.left = deleteNode(root.left, key);
            return root;
        }
        if (key > root.val) {
            root.right = deleteNode(root.right, key);
            return root;
        }

        assert key == root.val;

        if (root.left == null) {
            TreeNode right = root.right;
            root.right = null;
            return right;
        }

        if (root.right == null) {
            TreeNode left = root.left;
            root.left = null;
            return left;
        }
        TreeNode predecessor = maximum(root.left);
        TreeNode predecessorCopy = new TreeNode(predecessor.val);
        predecessorCopy.left = removeMax(root.left);
        predecessorCopy.right = root.right;
        root.left = null;
        root.right = null;
        return predecessorCopy;
    }

    private TreeNode removeMax(TreeNode node) {
        if (node.right == null) {
            TreeNode left = node.left;
            node.left = null;
            return left;
        }
        node.right = removeMax(node.right);
        return node;
    }

    private TreeNode maximum(TreeNode node) {
        if (node.right == null) {
            return node;
        }
        return maximum(node.right);
    }
}
```

## 方法二：用后继结点（右子树中最小结点）代替被删除结点

**参考代码 2**：

Python 代码：

```Python []
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


# 方法2：用右子树中最小结点的代替被删除结点


class Solution:
    def deleteNode(self, root, key):
        if root is None:
            return None

        if key < root.val:
            root.left = self.deleteNode(root.left, key)
            return root

        if key > root.val:
            root.right = self.deleteNode(root.right, key)
            return root

        if root.left is None:
            new_root = root.right
            root.right = None
            return new_root

        if root.right is None:
            new_root = root.left
            root.left = None
            return new_root

        # 找到右子树中最小的结点，复制它的值
        successor = self.__minimum(root.right)
        successor_copy = TreeNode(successor.val)
        successor_copy.left = root.left
        successor_copy.right = self.__remove_min(root.right)
        root.left = None
        root.right = None
        return successor_copy

    def __remove_min(self, node):
        if node.left is None:
            new_root = node.right
            node.right = None
            return new_root
        node.left = self.__remove_min(node.left)
        return node

    def __minimum(self, node):
        while node.left:
            node = node.left
        return node
```

Java 代码：

```Java []
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {

    private TreeNode minNode(TreeNode node) {
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    /**
     * 删除一个二分搜索树中最小的节点，把新的二分搜索树的根返回回去
     * 使用递归，要特别注意，定义的递归函数，返回的是，删除了最小值节点以后的新的二分搜索树的根
     *
     * @param node
     * @return
     */
    private TreeNode removeMin(TreeNode node) {
        if (node.left == null) {
            // 就是那个我们要删除的节点
            TreeNode rightNode = node.right;
            node.right = null;
            return rightNode;
        }
        node.left = removeMin(node.left);
        return node;
    }

    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) {
            return null;
        }
        if (root.val < key) {
            root.right = deleteNode(root.right, key);
            return root;
        } else if (root.val > key) {
            root.left = deleteNode(root.left, key);
            return root;
        } else {
            // 如果待删除的节点左孩子为空
            if (root.left == null) {
                TreeNode rightNode = root.right;
                root.right = null;
                return rightNode;
            }
            // 如果待删除的节点只有右孩子
            if (root.right == null) {
                TreeNode leftNode = root.left;
                root.left = null;
                return leftNode;
            }
            // 从它的右子树中拿到最小的
            TreeNode successor = new TreeNode(minNode(root.right).val);
            successor.left = root.left;
            successor.right = removeMin(root.right);
            root.left = null;
            root.right = null;
            return successor;
        }
    }
}
```
