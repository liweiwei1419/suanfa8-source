---
title: 「力扣」第 94 题：二叉树的中序遍历（中等）
icon: yongyan
category: 栈
tags:
  - 栈
---

+ 题目链接：[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)；
+ 题解地址：[模拟系统栈完成非递归中序遍历，同理可以完成非递归的前序遍历和后序遍历（Python 代码、Java 代码）](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/mo-ni-xi-tong-zhan-wan-cheng-fei-di-gui-zhong-xu-b/)。


## 题目描述

给定一个二叉树的根节点 `root` ，返回它的 **中序** 遍历。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

```
输入：root = [1,null,2,3]
输出：[1,3,2]
```

**示例 2：**

```
输入：root = []
输出：[]
```

**示例 3：**

```
输入：root = [1]
输出：[1]
```

**示例 4：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_5.jpg)

```
输入：root = [1,2]
输出：[2,1]
```



**示例 5：**

![img](https://assets.leetcode.com/uploads/2020/09/15/inorder_4.jpg)

**提示：**

- 树中节点数目在范围 `[0, 100]` 内
- `-100 <= Node.val <= 100`

## 思路分析

### 方法：模拟系统栈

模拟系统栈的方法其实并不难理解，就是在栈中放入结点的同时，**同时传入一个指令，这个指令可以有 2 个含义**：

1、递归执行（就是继续放入栈里）；

2、马上执行。

**模拟系统栈的注意事项**：因为栈是先进后出的，当递归执行的时候，代码编写的顺序应该是相应遍历种类的倒序（具体可以参考下面的代码）。

**模拟系统栈的好处**：稍微改动一下代码，就可以完成非递归的前序遍历和后序遍历。

**参考代码**：

Python 代码：

```Python []
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:

    def inorderTraversal(self, root: TreeNode) -> List[int]:
        if not root:
            return []
        # 1 表示递归处理
        stack = [(1, root)]
        res = []
        while stack:
            command, node = stack.pop()
            if command == 0:
                # 0 表示当前马上执行将结点的值添加到结果集中
                res.append(node.val)
            else:
                # 关键在这里：因为是模拟系统栈，应该把中序遍历的顺序倒过来写
                # 调整一下顺序就可以完成前序遍历和后序遍历
                if node.right:
                    stack.append((1, node.right))
                stack.append((0, node))
                if node.left:
                    stack.append((1, node.left))
        return res
```

Java 代码：

```Java []
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {

    private enum Action {
        // GO 表示递归处理
        // ADDTORESULT 表示当前马上执行将结点的值添加到结果集中
        GO, ADDTORESULT
    }

    private class Command {
        private Action action;
        private TreeNode node;

        public Command(Action action, TreeNode node) {
            this.action = action;
            this.node = node;
        }
    }

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) {
            return res;
        }
        Stack<Command> stack = new Stack<>();
        stack.add(new Command(Action.GO, root));
        while (!stack.isEmpty()) {
            Command command = stack.pop();
            if (command.action == Action.ADDTORESULT) {
                res.add(command.node.val);
            } else {
                assert command.action == Action.GO;
                // 关键在这里：因为是模拟系统栈，应该把中序遍历的顺序倒过来写
                // 调整一下顺序就可以完成前序遍历和后序遍历
                if (command.node.right != null) {
                    stack.add(new Command(Action.GO, command.node.right));
                }
                stack.add(new Command(Action.ADDTORESULT, command.node));
                if (command.node.left != null) {
                    stack.add(new Command(Action.GO, command.node.left));
                }
            }
        }
        return res;
    }
}
```



---

### LeetCode 第 94 题：[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

传送门：英文网址：[94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/description/) ，中文网址：[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/) 。

> 给定一个二叉树，返回它的*中序* 遍历。
>
> **示例:**
>
> ```
> 输入: [1,null,2,3]
> 1
>  \
>   2
>  /
> 3
> 
> 输出: [1,3,2]
> ```
>
> **进阶:** 递归算法很简单，你可以通过迭代算法完成吗？

Python 代码：

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def inorderTraversal(self, root):
        if not root:
            return []
        stack = [(1, root)]
        res = []
        while stack:
            command, node = stack.pop()
            if command == 0:
                res.append(node.val)
            else:
                if node.right:
                    stack.append((1, node.right))
                stack.append((0, node))
                if node.left:
                    stack.append((1, node.left))
        return res
```

