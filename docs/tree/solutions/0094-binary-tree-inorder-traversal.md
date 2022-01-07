---
title: 「力扣」第 94 题：二叉树的中序遍历（简单）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---

+ 题目链接：[94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)；
+ 题解链接：[模拟系统栈完成非递归中序遍历，同理可以完成非递归的前序遍历和后序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/mo-ni-xi-tong-zhan-wan-cheng-fei-di-gui-zhong-xu-b/)。

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

```
输入：root = [1,null,2]
输出：[1,2]
```

**提示：**

- 树中节点数目在范围 `[0, 100]` 内
- `-100 <= Node.val <= 100`

## 方法一：递归

Java 代码实现：

```java
public class Solution {

    private List<Integer> result = new ArrayList<>();

    public List<Integer> inorderTraversal(TreeNode root) {
        inorder(root);
        return result;
    }

    private void inorder(TreeNode root) {
        if (root != null) {
            inorder(root.left);
            result.add(root.val);
            inorder(root.right);
        }
    }
}
```

## 方法二：非递归写法 1 

Java 代码：

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.Stack;

public class Solution {

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode currentNode = root;
        while (currentNode != null || !stack.isEmpty()) {
            while (currentNode != null) {
                stack.addLast(currentNode);
                currentNode = currentNode.left;
            }
            currentNode = stack.removeLast();
            res.add(currentNode.val);
            currentNode = currentNode.right;
        }
        return res;
    }
}
```

## 方法三：非递归写法 2

Java 代码实现：

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

enum UseType {
    RECURSION,
    ADD
}

class Command {
    UseType useType;
    TreeNode treeNode;

    Command(UseType useType, TreeNode treeNode) {
        this.useType = useType;
        this.treeNode = treeNode;
    }
}

/**
 * 什么是中序遍历，先递归遍历左子节点
 * 在处理自己
 * 然后再递归遍历右子节点
 */
public class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }
        Stack<Command> stack = new Stack<>();
        stack.push(new Command(UseType.RECURSION, root));

        while (!stack.isEmpty()) {
            Command command = stack.pop();
            if (UseType.ADD == command.useType) {
                result.add(command.treeNode.val);
            } else {
                assert UseType.RECURSION == command.useType;
                if (command.treeNode.right != null) {
                    stack.push(new Command(UseType.RECURSION, command.treeNode.right));
                }
                stack.push(new Command(UseType.ADD, command.treeNode));
                if (command.treeNode.left != null) {
                    stack.push(new Command(UseType.RECURSION, command.treeNode.left));
                }
            }

        }
        return result;
    }
}
```


---


## 方法：模拟系统栈

模拟系统栈的方法其实并不难理解，就是在栈中放入结点的同时，**同时传入一个指令，这个指令可以有 2 个含义**：

1、递归执行（就是继续放入栈里）；

2、马上执行。

**模拟系统栈的注意事项**：因为栈是先进后出的，当递归执行的时候，代码编写的顺序应该是相应遍历种类的倒序（具体可以参考下面的代码）。

**模拟系统栈的好处**：稍微改动一下代码，就可以完成非递归的前序遍历和后序遍历。

**参考代码**：

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

