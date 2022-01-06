---
title: 「力扣」第 865 题：具有所有最深节点的最小子树（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
  - 树形 DP
---

+ 题目链接：[865. 具有所有最深节点的最小子树](https://leetcode-cn.com/problems/smallest-subtree-with-all-the-deepest-nodes/)

## 题目描述

给定一个根为 `root` 的二叉树，每个节点的深度是 **该节点到根的最短距离** 。

如果一个节点在 **整个树** 的任意节点之间具有最大的深度，则该节点是 **最深的** 。

一个节点的 **子树** 是该节点加上它的所有后代的集合。

返回能满足 **以该节点为根的子树中包含所有最深的节点** 这一条件的具有最大深度的节点。

**注意：**本题与力扣 1123 重复：https://leetcode-cn.com/problems/lowest-common-ancestor-of-deepest-leaves/

**示例 1：**

![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/01/sketch1.png)

```
输入：root = [3,5,1,6,2,0,8,null,null,7,4]
输出：[2,7,4]
解释：
我们返回值为 2 的节点，在图中用黄色标记。
在图中用蓝色标记的是树的最深的节点。
注意，节点 5、3 和 2 包含树中最深的节点，但节点 2 的子树最小，因此我们返回它。
```

**示例 2：**

```
输入：root = [1]
输出：[1]
解释：根节点是树中最深的节点。
```

**示例 3：**

```
输入：root = [0,1,3,null,2]
输出：[2]
解释：树中最深的节点为 2 ，有效子树为节点 2、1 和 0 的子树，但节点 2 的子树最小。
```

**提示：**

- 树中节点的数量介于 1 和 500 之间。
- `0 <= Node.val <= 500`
- 每个节点的值都是独一无二的。

---

**参考代码**：

```java
public class Solution {

    public TreeNode subtreeWithAllDeepest(TreeNode root) {
        return dfs(root).node;
    }

    /**
     * Return the result of the subtree at this node.
     *
     * @param node
     * @return
     */
    public Result dfs(TreeNode node) {
        if (node == null) {
            return new Result(null, 0);
        }
        Result L = dfs(node.left);
        Result R = dfs(node.right);
        if (L.dist > R.dist) {
            return new Result(L.node, L.dist + 1);
        }
        if (L.dist < R.dist) {
            return new Result(R.node, R.dist + 1);
        }
        return new Result(node, L.dist + 1);
    }


    private class Result {
        /**
         * 该子树的所有最深节点的最大深度节点或该祖先
         */
        TreeNode node;
        /**
         * 从此子树的根到此子树中最深节点的路径中的节点数
         */
        int dist;

        Result(TreeNode n, int d) {
            node = n;
            dist = d;
        }
    }
}
```

