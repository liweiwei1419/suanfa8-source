---
title: 「力扣」第 543 题：二叉树的直径（简单）
icon: yongyan
categories: 动态规划
tags:
  - 动态规划
  - 树形 DP
---

## 题目描述

给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

**示例 :**
给定二叉树

```
          1
         / \
        2   3
       / \     
      4   5    
```

返回 **3**, 它的长度是路径 `[4, 2, 1, 3]` 或者 `[5, 2, 1, 3]`。



**注意：**两结点之间的路径长度是以它们之间边的数目表示。

---

## 理解题意

这里直径的定义为：路径上的边数。

**参考代码**：

```java
public class Solution {

    private int res;
    
    public int diameterOfBinaryTree(TreeNode root) {
        res = 0;
        dfs(root);
        return res;
    }
    
    /**
     * 只选一边
     *
     * @param node
     * @return
     */
    private int dfs(TreeNode node) {
        if (node == null) {
            return 0;
        }
    
        int left = dfs(node.left);
        int right = dfs(node.right);
    
        res = Math.max(res, left + right);
        return Math.max(left, right) + 1;
    }
}
```

