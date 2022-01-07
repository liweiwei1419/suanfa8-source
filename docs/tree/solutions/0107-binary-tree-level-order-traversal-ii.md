---
title: 「力扣」第 107 题：二叉树的层次遍历 II（中等）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
---

+ 题目描述：[107. 二叉树的层次遍历 II](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)。

## 题目描述

Given the `root` of a binary tree, return *the bottom-up level order* *traversal of its nodes' values*. (i.e., from left  to right, level by level from leaf to root).

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

```
Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]
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
    
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        List<List<Integer>> res = new LinkedList<>();
        if (root == null) {
            return res;
        }
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> curLevel = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                curLevel.add(node.val);
                if (node.left != null) {
                    queue.add(node.left);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
            }
            res.add(0, curLevel);
        }
        return res;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
from typing import List
from collections import deque


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:

    def levelOrderBottom(self, root: TreeNode) -> List[List[int]]:
        res = []
        if root is None:
            return res
        queue = deque()
        queue.append(root)
        while queue:
            size = len(queue)
            cur = []
            for _ in range(size):
                top = queue.popleft()
                cur.append(top.val)
                if top.left:
                    queue.append(top.left)
                if top.right:
                    queue.append(top.right)
            res.insert(0, cur)
        return res
```
</CodeGroupItem>
</CodeGroup>