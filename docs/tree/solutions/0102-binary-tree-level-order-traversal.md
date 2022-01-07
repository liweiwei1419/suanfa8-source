---
title: 「力扣」第 102 题：二叉树的层次遍历
icon: yongyan
category: 二叉树
tags:
  - 二叉树
---

求解关键：非常标准的层序遍历的做法，使用队列作为辅助的数据结构。

+ 题目描述：[102. 二叉树的层次遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)。

## 题目描述

给你一个二叉树，请你返回其按 **层序遍历** 得到的节点值。 （即逐层地，从左到右访问所有节点）。



**示例 1：**
二叉树：`[3,9,20,null,null,15,7]`,

![img](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层序遍历结果：

```
[
  [3],
  [9,20],
  [15,7]
]
```



**Example 2:**

```
Input: root = [1]
Output: [[1]]
```

**Example 3:**

```
Input: root = []
Output: []
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

## 思路分析

非常标准的层序遍历的做法，使用队列作为辅助的数据结构。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {

    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            return res;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> currentLevel = new ArrayList<>(size);
            for (int i = 0; i < size; i++) {
                TreeNode head = queue.poll();
                currentLevel.add(head.val);

                if (head.left != null) {
                    queue.offer(head.left);
                }
                if (head.right != null) {
                    queue.offer(head.right);
                }
            }
            res.add(currentLevel);
        }
        return res;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:

    def levelOrder(self, root: TreeNode) -> List[List[int]]:

        res = []
        if root is None:
            return res
        queue = [root]
        while queue:
            size = len(queue)
            cur = []
            for _ in range(size):
                top = queue.pop(0)
                cur.append(top.val)

                if top.left:
                    queue.append(top.left)
                if top.right:
                    queue.append(top.right)

            res.append(cur)
        return res
```
</CodeGroupItem>
</CodeGroup>