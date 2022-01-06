---
title: 「力扣」第 337 题：打家劫舍 III（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
  - 树形 DP
---

+ 题目链接：[337. 打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii/)
+ 题解链接：[树形 dp 入门问题（理解「无后效性」和「后序遍历」）](https://leetcode-cn.com/problems/house-robber-iii/solution/shu-xing-dp-ru-men-wen-ti-by-liweiwei1419/)

## 题目描述

在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。

计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

**示例 1:**

![img](https://assets.leetcode.com/uploads/2021/03/10/rob1-tree.jpg)

```
输入: [3,2,3,null,3,null,1]
输出: 7 
解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.
```

**示例 2:**

![img](https://assets.leetcode.com/uploads/2021/03/10/rob2-tree.jpg)

```
输入: [3,4,5,1,3,null,1]
输出: 9
解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.
```

**Constraints:**

+ The number of nodes in the tree is in the range $[1, 10^4]$.
+ $0 \le Node.val \le 10^4$

---

先说重点：

+ 这里最关键的是理解：在设计状态的时候，**在后面加一维，消除后效性**，打家劫舍第 1 题，股票系列问题 6 个问题，都是这样的思路；
+ 树的问题，很多时候采用 **后序遍历（先处理左右孩子结点，再处理当前结点，整个过程看起来就像一层一层向上汇报信息）**。

---

很遗憾，《算法导论》里都没有看到「无后效性」的解释，因此结合我自己求解问题的经验总结如下，希望对大家有帮助。

「无后效性」是指：动态规划在解决子问题的过程中，**一旦某一个子问题的求解结果确定以后，就不会再被修改**。求解的过程形成了一张「有向无环图」。

因此，子问题如何定义就很关键。常见的方法是：在设计状态的时候，维度定得细一点，**通常表现为增加维度**。这样一来，新的子问题就可以比较容易参考以前计算出来的子问题的结果，以避免复杂的分类讨论。

---

我在下面这两篇题解里有详细叙述，解题过程中如何利用「无后效性」：

+ [152. 乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray/) 题解：[动态规划（理解无后效性）](https://leetcode-cn.com/problems/maximum-product-subarray/solution/dong-tai-gui-hua-li-jie-wu-hou-xiao-xing-by-liweiw/)
+ [面试题 17.16. 按摩师](https://leetcode-cn.com/problems/the-masseuse-lcci/) 题解：[动态规划（经典问题，掌握如何消除后效性）](https://leetcode-cn.com/problems/the-masseuse-lcci/solution/dong-tai-gui-hua-by-liweiwei1419-8/)。

---

分析：（这里略过暴力解法和记忆化递归。）

+ 根据打家劫舍 I 和 II，我们有了经验，这是一个动态规划问题；
+ 问题场景在「树」上，就要用到「树的遍历」，这里用「后序遍历」，这是因为：**我们的逻辑是子结点陆续汇报信息给父结点，一层一层向上汇报，最后在根结点汇总值**。

关键：当前结点「偷」或者「不偷」决定了孩子结点偷或者不偷，把这一点设计成状态，放在第 2 维，这一步叫「消除后效性」，这一点技巧非常常见。

### 第 1 步：状态定义

`dp[node][j]` ：这里 `node` 表示一个结点，以 `node` 为根结点的树，并且规定了 `node` 是否偷取能够获得的最大价值。

+ `j = 0` 表示 `node` 结点不偷取；
+ `j = 1` 表示 `node` 结点偷取。

### 第 2 步： 推导状态转移方程

根据当前结点偷或者不偷，就决定了需要从哪些**子结点**里的对应的状态转移过来。

+ 如果当前结点不偷，左右子结点偷或者不偷都行，选最大者；
+ 如果当前结点偷，左右子结点均不能偷。

（状态转移方程的表述有点复杂，请大家直接看代码。）

### 第 3 步： 初始化

一个结点都没有，空节点，返回 0，对应后序遍历时候的递归终止条件；

### 第 4 步： 输出

在根结点的时候，返回两个状态的较大者。

### 第 5 步： 思考优化空间

优化不了。

**参考代码**：

```java
public class Solution {

    // 树的后序遍历

    public int rob(TreeNode root) {
        int[] res = dfs(root);
        return Math.max(res[0], res[1]);
    }

    private int[] dfs(TreeNode node) {
        if (node == null) {
            return new int[]{0, 0};
        }

        // 分类讨论的标准是：当前结点偷或者不偷
        // 由于需要后序遍历，所以先计算左右子结点，然后计算当前结点的状态值
        int[] left = dfs(node.left);
        int[] right = dfs(node.right);

        // dp[0]：以当前 node 为根结点的子树能够偷取的最大价值，规定 node 结点不偷
        // dp[1]：以当前 node 为根结点的子树能够偷取的最大价值，规定 node 结点偷
        int[] dp = new int[2];

        dp[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        dp[1] = node.val + left[0] + right[0];
        return dp;
    }
}
```

### 同类问题

[124. 二叉树中的最大路径和](/problems/binary-tree-maximum-path-sum/)
[543. 二叉树的直径](/problems/diameter-of-binary-tree/)
[298. 二叉树最长连续序列](/problems/binary-tree-longest-consecutive-sequence/)
[549. 二叉树中最长的连续序列](/problems/binary-tree-longest-consecutive-sequence-ii/)
[687. 最长同值路径](/problems/longest-univalue-path/)
[1372. 二叉树中的最长交错路径](/problems/longest-zigzag-path-in-a-binary-tree/)
[865. 具有所有最深节点的最小子树](/problems/smallest-subtree-with-all-the-deepest-nodes/)









