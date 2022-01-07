---
title: 「力扣」第 199 题：二叉树的右视图（中等）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---


+ 题目链接：[199. 二叉树的右视图](https://leetcode-cn.com/problems/binary-tree-right-side-view/)；
+ 题解链接：[DFS 和 BFS（Python 代码）](https://leetcode-cn.com/problems/binary-tree-right-side-view/solution/dfs-he-bfspython-dai-ma-by-liweiwei1419/)。

## 题目描述

给定一个二叉树的 **根节点** `root`，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

**示例 1:**

![img](https://tva1.sinaimg.cn/large/008i3skNgy1gy1whpz40sj30b508d74c.jpg)

```
输入: [1,2,3,null,5,null,4]
输出: [1,3,4]
```

**示例 2:**

```
输入: [1,null,3]
输出: [1,3]
```

**示例 3:**

```
输入: []
输出: []
```



**提示:**

- 二叉树的节点个数的范围是 `[0,100]`
- `-100 <= Node.val <= 100` 

### 方法一：DFS

实际上就是改良了“前序遍历”，“前序遍历”是“先自己，再左子树（如果有的话），再右子树（如果有的话）”。

而我们改过以后是：“先自己，再右子树（如果有的话），再左子树（如果有的话）”。

Python 代码：

```python []
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

### 方法二：BFS

使用层序遍历的思想完成本题思路不难想到，关键是在细节。自己根据题目中的示例，或者你出错的那个测试用例，就很容易看出问题在哪里。

Python 代码：

```Python []
from typing import List


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
        queue = [root]
        while queue:
            cur_size = len(queue)
            res.append(queue[-1].val)
            # 这里要注意，上一层的结点要全部出列
            for _ in range(cur_size):
                top = queue.pop(0)
                if top.left:
                    queue.append(top.left)
                if top.right:
                    queue.append(top.right)
        return res
```
