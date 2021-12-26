---
title: 「力扣」第 199 题：二叉树的右视图（中等）
date: 2017-10-05 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 9：队列
tags:
  - 队列
permalink: leetcode-solution/0199-binary-tree-right-side-view
---

## 「力扣」第 199 题：二叉树的右视图（中等）

传送门：[199. 二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/)。

> 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
>
> **示例:**
>
> ```
> 输入: [1,2,3,null,5,null,4]
> 输出: [1, 3, 4]
> 解释:
> 
> 1            <---
> /   \
> 2     3         <---
> \     \
> 5     4       <---
> ```

分析：1、深度优先遍历；2、层序遍历（2种写法，本质上其实一样）。

### 方法一：广度优先遍历

Java 代码：

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;


public class Solution {

    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) {
            return res;
        }
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (i == 0) {
                    res.add(node.val);
                }
                if (node.right != null) {
                    queue.add(node.right);
                }
                if (node.left != null) {
                    queue.add(node.left);
                }
            }
        }
        return res;
    }
}
```

Python 代码：

```python
from typing import List
from collections import deque


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def rightSideView(self, root: TreeNode) -> List[int]:
        if root is None:
            return []

        res = []
        queue = deque()
        queue.append(root)
        while queue:
            cur_size = len(queue)
            res.append(queue[-1].val)
            # 这里要注意，上一层的结点要全部出列
            for _ in range(cur_size):
                top = queue.popleft()
                if top.left:
                    queue.append(top.left)
                if top.right:
                    queue.append(top.right)
        return res

```

### 方法二：深度优先遍历

Java 代码：

```java
import java.util.ArrayList;
import java.util.List;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {

    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) {
            return res;
        }
        dfs(root, 0, res);
        return res;
    }


    private void dfs(TreeNode node, int level, List<Integer> res) {
        // 如果 node 为空，就直接返回，一定要先写，以减少很多判断
        if (node == null) {
            return;
        }
        if (res.size() == level) {
            res.add(node.val);
        }
        // 如果交换下面两行的顺序，那么就得到二叉树的左视图
        dfs(node.right, level + 1, res);
        dfs(node.left, level + 1, res);
    }
}
```

Python 代码：

```python
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def rightSideView(self, root: TreeNode) -> List[int]:
        def dfs(node, res, depth):
            if node is None:
                return
            if len(res) == depth:
                res.append(node.val)
            dfs(node.right, res, depth + 1)
            dfs(node.left, res, depth + 1)

        res = []
        dfs(root, res, 0)
        return res
```



（本节完）