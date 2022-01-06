---
title: 「力扣」第 951 题：翻转等价二叉树（中等）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 深度优先遍历
---

+ 题目链接：[951. 翻转等价二叉树](https://leetcode-cn.com/problems/flip-equivalent-binary-trees/)（中等）

我们可以为二叉树 T 定义一个翻转操作，如下所示：选择任意节点，然后交换它的左子树和右子树。

只要经过一定次数的翻转操作后，能使 X 等于 Y，我们就称二叉树 X *翻转等价*于二叉树 Y。

编写一个判断两个二叉树是否是*翻转等价*的函数。这些树由根节点 `root1` 和 `root2` 给出。

**示例：**

```
输入：root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
输出：true
解释：我们翻转值为 1，3 以及 5 的三个节点。
```

![Flipped Trees Diagram](https://assets.leetcode.com/uploads/2018/11/29/tree_ex.png)

**提示：**

1. 每棵树最多有 `100` 个节点。
2. 每棵树中的每个值都是唯一的、在 `[0, 99]` 范围内的整数。

## 方法：深度优先遍历

+ 先写 **递归终止条件**；

**参考代码**：

```Java []
public class Solution {

    public boolean flipEquiv(TreeNode root1, TreeNode root2) {
        if (root1 == null && root2 == null) {
            return true;
        }
        // 走到这里是因为 root1 和 root2 至少有一样非空
        if (root1 == null || root2 == null || root1.val != root2.val) {
            return false;
        }
        return flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left) ||
                flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right);
    }
}
```

