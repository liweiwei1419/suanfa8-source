---
title: 「力扣」第 572 题：另一个树的子树
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

## 「力扣」第 572 题：另一个树的子树

+ 链接：https://leetcode-cn.com/problems/subtree-of-another-tree

> 给定两个非空二叉树 s 和 t，检验 s 中是否包含和 t 具有相同结构和节点值的子树。s 的一个子树包括 s 的一个节点和这个节点的所有子孙。s 也可以看做它自身的一棵子树。
>
> 示例 1：
> 给定的树 `s`：
>
> ```
>      3
>     / \
>    4   5
>   / \
>  1   2
> ```
>
>
> 给定的树 `t`：
>
> ```
>    4 
>   / \
>  1   2
> ```
>
> 返回 `true`，因为 `t` 与 `s` 的一个子树拥有相同的结构和节点值。
>
> 示例 2：
> 给定的树 `s`：
>
> ```
>      3
>     / \
>    4   5
>   / \
>  1   2
>     /
>    0
> ```
>
> 给定的树 `t`：
>
> ```
>    4
>   / \
>  1   2
> ```
>
> 返回 `false`。
>

思路：递归结构照着抄一遍就好了。

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

    public boolean isSubtree(TreeNode s, TreeNode t) {
        if (s == null && t == null) {
            return true;
        }

        if (s == null || t == null) {
            return false;
        }
        return isSameTree(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t);
    }

    private boolean isSameTree(TreeNode s, TreeNode t) {
        if (s == null && t == null) {
            return true;
        }

        if (s == null || t == null) {
            return false;
        }

        return s.val == t.val && isSameTree(s.left, t.left) && isSameTree(s.right, t.right);
    }
}
```

（本节完）