---
title: 「力扣」第 993 题：二叉树的堂兄弟节点（简单）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
  - 深度优先遍历
---

+ 题目链接：[993. 二叉树的堂兄弟节点](https://leetcode-cn.com/problems/cousins-in-binary-tree/)；
+ 题解链接：[深度优先遍历、广度优先遍历](https://leetcode-cn.com/problems/cousins-in-binary-tree/solution/yan-du-you-xian-bian-li-python-dai-ma-by-liweiwei1/)。

## 题目描述

在二叉树中，根节点位于深度 `0` 处，每个深度为 `k` 的节点的子节点位于深度 `k+1` 处。

如果二叉树的两个节点深度相同，但 **父节点不同** ，则它们是一对*堂兄弟节点*。

我们给出了具有唯一值的二叉树的根节点 `root` ，以及树中两个不同节点的值 `x` 和 `y` 。

只有与值 `x` 和 `y` 对应的节点是堂兄弟节点时，才返回 `true` 。否则，返回 `false`。

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/16/q1248-01.png)

```
输入：root = [1,2,3,4], x = 4, y = 3
输出：false
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/16/q1248-02.png)

```
输入：root = [1,2,3,null,4,null,5], x = 5, y = 4
输出：true
```

**示例 3：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/16/q1248-03.png)



```
输入：root = [1,2,3,null,4], x = 2, y = 3
输出：false
```

 

**提示：**

- 二叉树的节点数介于 `2` 到 `100` 之间。
- 每个节点的值都是唯一的、范围为 `1` 到 `100` 的整数。

## 思路分析

+ 依据定义，只要两个结点的层数相同，并且父结点不一样，它们就是堂兄弟结点。为此我们可以通过遍历获得这棵树的所有结点的信息；
+ 这里记住这棵树里结点的信息很重要，为此我们要利用好「哈希表」这个数据结构；
+ 注意题目中说「每个结点的值唯一」。

下面提供「深度优先遍历」和「广度优先遍历」的参考代码。


## 方法一：深度优先遍历

第 2 个选项卡的代码是按照官方题解的思路写出来的。

```Java []
import java.util.HashMap;
import java.util.Map;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {

    // 深度优先遍历

    public boolean isCousins(TreeNode root, int x, int y) {
        Map<Integer, Integer> depth = new HashMap<>();
        Map<Integer, TreeNode> parent = new HashMap<>();

        // 结点 0 是一个特殊值，表示根结点
        dfs(root, 0, depth, parent);
        return depth.get(x).equals(depth.get(y)) && parent.get(x) != parent.get(y);

    }

    private void dfs(TreeNode currentNode,
                     int currentDepth,
                     Map<Integer, Integer> depth,
                     Map<Integer, TreeNode> parent) {

        depth.put(currentNode.val, currentDepth);

        if (currentNode.left != null) {
            dfs(currentNode.left, currentDepth + 1, depth, parent);
            parent.put(currentNode.left.val, currentNode);
        }

        if (currentNode.right != null) {
            dfs(currentNode.right, currentDepth + 1, depth, parent);
            parent.put(currentNode.right.val, currentNode);

        }
    }
}
```
```Java []
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {

    // 深度优先遍历

    public boolean isCousins(TreeNode root, int x, int y) {
        Map<Integer, Integer> depth = new HashMap<>();
        Map<Integer, TreeNode> parent = new HashMap<>();

        dfs(root, null, depth, parent);
        return depth.get(x).equals(depth.get(y)) && parent.get(x) != parent.get(y);

    }

    private void dfs(TreeNode node,
                     TreeNode parentNode,
                     Map<Integer, Integer> depth,
                     Map<Integer, TreeNode> parent) {

        if (node == null) {
            return;
        }

        if (parentNode == null) {
            // 结点 0 是一个特殊值，表示根结点
            depth.put(node.val, 0);
        } else {
            depth.put(node.val, depth.get(parentNode.val) + 1);
        }

        parent.put(node.val, parentNode);
        dfs(node.left, node, depth, parent);
        dfs(node.right, node, depth, parent);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，其中 $N$ 是给定树中结点的数量；
+ 空间复杂度：$O(N)$。


## 方法二：广度优先遍历


1、紧抓堂兄弟结点的定义：如果二叉树的两个节点深度相同，但**父节点不同**，则它们是一对*堂兄弟节点*。很显然，可以使用层序优先遍历（广度优先遍历）。

2、二叉树的两个节点深度相同，这里的“深度”，即经过层序优先遍历以后，两个结点在同一层；

3、满足在同一层的前提下，如何判断“父节点不同”呢？我们把父节点相同这件事情排除掉就好啦。具体做法是：如果子结点为空时，设置一个占位的数值。因为题目中说“每个结点的值都是唯一的、范围为 $1$ 到 $100$ 的整数”。因此可以把空结点设置为一个不在 $1$ 到 $100$ 中间的数，例如 $0$。这样在层序遍历中检查，**如果两个索引序号相邻，并且索引序号小的索引序号是偶数，索引序号大的索引序号是奇数**，那么就表示它们的父结点相同，遇到这种情况，直接返回 `False`，也不用往下看了。不是这种情况的话，可以返回 `True`。

下面看几个具体的例子：


![image.png](https://pic.leetcode-cn.com/955b34af638c12e9ea52fe03bfa9dcea7eac61da493e9c5cbba2f9d540114f3f-image.png)


![image.png](https://pic.leetcode-cn.com/f6c510b14b90bbe4a9fcd3019d417bdd8200b09a59c22a730cab4351dddfcf93-image.png)


```Java []
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

public class Solution {

    public boolean isCousins(TreeNode root, int x, int y) {
        if (root == null) {
            return false;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        // key：当前层结点值，value：当前层结点输出的下标
        // 这个 currentLevel 每次使用完都得清空
        Map<Integer, Integer> currentLevel = new HashMap<>();

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode head = queue.poll();
                if (head != null) {
                    currentLevel.put(head.val, i);
                    queue.add(head.left);
                    queue.add(head.right);
                }
            }

            if (currentLevel.containsKey(x) && currentLevel.containsKey(y)) {
                int index1 = currentLevel.get(x);
                int index2 = currentLevel.get(y);

                if (index1 > index2) {
                    int temp = index1;
                    index1 = index2;
                    index2 = temp;
                }

                if (index1 + 1 == index2 && (index1 % 2) == 0) {
                    return false;
                }
                return true;
            }

            if (currentLevel.containsKey(x) || currentLevel.containsKey(y)) {
                return false;
            }

            currentLevel.clear();
        }
        return false;
    }
}
```

**复杂度分析：**

+ 时间复杂度：$O(N)$；
+ 空间复杂度：$O(N)$。