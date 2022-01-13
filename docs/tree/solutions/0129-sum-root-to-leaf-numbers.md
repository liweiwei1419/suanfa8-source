---
title: 「力扣」第 129 题：求根到叶子结点数字之和
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

- 题目链接：[129. 求根到叶子结点数字之和](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/description/)。

## 题目描述

给你一个二叉树的根节点 `root` ，树中每个节点都存放有一个 `0` 到 `9` 之间的数字。

每条从根节点到叶节点的路径都代表一个数字：

- 例如，从根节点到叶节点的路径 `1 -> 2 -> 3` 表示数字 `123` 。

计算从根节点到叶节点生成的 **所有数字之和** 。

**叶节点** 是指没有子节点的节点。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/19/num1tree.jpg)

```
输入：root = [1,2,3]
输出：25
解释：
从根到叶子节点路径 1->2 代表数字 12
从根到叶子节点路径 1->3 代表数字 13
因此，数字总和 = 12 + 13 = 25
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/02/19/num2tree.jpg)

```
输入：root = [4,9,0,5,1]
输出：1026
解释：
从根到叶子节点路径 4->9->5 代表数字 495
从根到叶子节点路径 4->9->1 代表数字 491
从根到叶子节点路径 4->0 代表数字 40
因此，数字总和 = 495 + 491 + 40 = 1026
```

**提示：**

- 树中节点的数目在范围 `[1, 1000]` 内
- `0 <= Node.val <= 9`
- 树的深度不超过 `10`

## 思路分析

Java 代码 1：使用 path，递归回溯的常规解法。

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

// 我的思路：使用深度优先遍历，遍历到根结点的时候，把数字加一加
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {

    private List<String> result = new ArrayList<>();

    private void sumNumbers(TreeNode node, String path) {
        if (node == null) {
            return;
        }

        path = path + node.val;
        if (node.left == null && node.right == null) {
            // 才是叶子结点，执行我们的逻辑
            result.add(path);
            return;
        }
        sumNumbers(node.left, path);
        sumNumbers(node.right, path);
    }

    private int convert() {
        int sum = 0;
        for (String s : result) {
            sum += Integer.parseInt(s);
        }
        return sum;
    }

    public int sumNumbers(TreeNode root) {
        if (root == null) {
            return 0;
        }
        sumNumbers(root, "");
        return convert();
    }

    public static void main(String[] args) {
        TreeNode n1 = new TreeNode(1);
        TreeNode n2 = new TreeNode(2);
        TreeNode n3 = new TreeNode(3);
        n1.left = n2;
        n1.right = n3;

        Solution solution = new Solution();
        int result = solution.sumNumbers(n1);
        System.out.println("得到的结果：" + result);
    }
}

```

Python 代码 2（推荐）：（使用递归）使用 cumsum 这个概念，即开始遍历到这个根结点的之前，已经有了 cumsum ，代码写出来也是非常简洁。

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


class Solution:
    def sumNumbers(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        res = []
        self.__dfs(root, 0, res)
        return sum(res)

    # Python 中对于基础的数据类型是值传递，即复制
    def __dfs(self, root, cum_sum, res):
        if root is None:
            return None
        if root.left is None and root.right is None:
            # 结算
            res.append(cum_sum * 10 + root.val)
            return
        self.__dfs(root.left, cum_sum * 10 + root.val, res)
        self.__dfs(root.right, cum_sum * 10 + root.val, res)
```

Java 代码 3：

```java
// https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/description/


import java.util.ArrayList;
import java.util.List;

// 我的思路：这个写法，画个图就非常清晰了，抓住二叉树的特点

public class Solution2 {

    private int sumNumbers(TreeNode node, int cumsum) {
        if (node == null) {
            return 0;
        }
        cumsum = 10 * cumsum + node.val;
        if (node.left == null && node.right == null) {
            return cumsum;
        }
        return sumNumbers(node.left, cumsum) + sumNumbers(node.right, cumsum);
    }


    public int sumNumbers(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return sumNumbers(root, 0);
    }

    public static void main(String[] args) {
        // write your code here
        TreeNode n1 = new TreeNode(1);
        TreeNode n2 = new TreeNode(2);
        TreeNode n3 = new TreeNode(3);
        n1.left = n2;
        n1.right = n3;

        Solution2 solution2 = new Solution2();
        int result = solution2.sumNumbers(n1);
        System.out.println("得到的结果：" + result);
    }
}
```

还有一种解法，修改了原二叉树的结点的值。

Python 代码：

```python
# 129. 求根到叶子结点数字之和
# 给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子结点的路径都代表一个数字。
# 例如，从根到叶子结点路径 1->2->3 代表数字 123。
# 计算从根到叶子结点生成的所有数字之和。
# 说明: 叶子结点是指没有子结点的结点。

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:

    def __init__(self):
        self.res = 0

    def sumNumbers(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if root is None:
            return 0
        if root.left:
            # 如果左边非空
            root.left.val += root.val * 10
        if root.right:
            # 如果右边非空
            root.right.val += root.val * 10
        # 如果左边右边都为空，就可以结算了
        if root.left is None and root.right is None:
            self.res += root.val
        # 前序遍历
        self.sumNumbers(root.left)
        self.sumNumbers(root.right)
        return self.res
```

（本节完）

# LeetCode 第 129 题：求根到叶子结点数字之和

Python 代码：使用递归，使用 cumsum 这个概念，即开始遍历到这个根结点的之前，已经有了 cumsum ，代码写出来也是非常简洁。

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def sumNumbers(self, root):
        res = []
        self.__dfs(root, 0, res)
        return sum(res)

    # Python 中对于基础的数据类型是值传递，即复制
    def __dfs(self, root, cum_sum, res):
        if root is None:
            return None
        if root.left is None and root.right is None:
            # 结算
            res.append(cum_sum * 10 + root.val)
            return
        self.__dfs(root.left, cum_sum * 10 + root.val, res)
        self.__dfs(root.right, cum_sum * 10 + root.val, res)
```

### LeetCode 第 129 题：给定一棵二叉树，每个节点只包含数字 0-9，从根节点到叶子节点的每条路径可以表示成一个数，求这些数的和

Python 代码：

```python
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None


class Solution:
    def sumNumbers(self, root):
        res = []
        self.__dfs(root, 0, res)
        return sum(res)

    # Python 中对于基础的数据类型是值传递，即复制
    def __dfs(self, root, cum_sum, res):
        if root is None:
            return None
        if root.left is None and root.right is None:
            # 结算
            res.append(cum_sum * 10 + root.val)
            return
        self.__dfs(root.left, cum_sum * 10 + root.val, res)
        self.__dfs(root.right, cum_sum * 10 + root.val, res)
```
