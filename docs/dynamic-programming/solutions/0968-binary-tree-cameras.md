---
title: 「力扣」第 968 题：监控二叉树（困难）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
  - 树形 DP
---

+ 题目链接：[968. 监控二叉树](https://leetcode-cn.com/problems/binary-tree-cameras/)

## 题目描述

给定一个二叉树，我们在树的节点上安装摄像头。

节点上的每个摄影头都可以监视**其父对象、自身及其直接子对象。**

计算监控树的所有节点所需的最小摄像头数量。

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/29/bst_cameras_01.png)

```
输入：[0,0,null,0,0]
输出：1
解释：如图所示，一台摄像头足以监控所有节点。
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/29/bst_cameras_02.png)

```
输入：[0,0,null,0,null,0,null,null,0]
输出：2
解释：需要至少两个摄像头来监视树的所有节点。 上图显示了摄像头放置的有效位置之一。
```

**提示：**

1. 给定树的节点数的范围是 `[1, 1000]`。
2. 每个节点的值都是 0。

---

说明：这题很难，返回的状态有 3 个数值。设置 3 个状态：
1. 自己有灯
2. 自己无灯，孩子也无灯
3. 自己无灯，孩子有灯

**参考代码**：


```java
public class Solution {

    private int res;

    public int minCameraCover(TreeNode root) {
        res = 0;
        if (dfs(root) == 2) {
            return res + 1;
        }
        return res;
    }

    /**
     * @param node
     * @return
     */
    private int dfs(TreeNode node) {
        if (node == null) {
            // 当前结点没有相机，子节点有相机
            return 3;
        }

        int leftChild = dfs(node.left);
        int rightChild = dfs(node.right);

        // 孩子无灯、孙子也无灯，自己一定要有灯
        if (leftChild == 2 || rightChild == 2) {
            res++;
            // 当前结点有相机
            return 1;
        }

        // 孩子有灯
        if (leftChild == 1 || rightChild == 1) {
            return 3;
        }
        return 2;
    }
}
```