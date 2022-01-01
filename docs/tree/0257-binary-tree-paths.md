---
title: 「力扣」第 257 题：二叉树的所有路径（简单）
icon: yongyan
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 字符串
---

## 「力扣」第 257 题：二叉树的所有路径

+ 题目链接：[257. 二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)

+ [题解链接](https://leetcode-cn.com/problems/binary-tree-paths/solution/shen-du-you-xian-bian-li-python-dai-ma-by-liweiwei/)

## 题目描述

给你一个二叉树的根节点 `root` ，按 **任意顺序** ，返回所有从根节点到叶子节点的路径。

**叶子节点** 是指没有子节点的节点。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/03/12/paths-tree.jpg)



```
输入：root = [1,2,3,null,5]
输出：["1->2->5","1->3"]
```

**示例 2：**

```
输入：root = [1]
输出：["1"]
```

 

**提示：**

- 树中节点的数目在范围 `[1, 100]` 内
- `-100 <= Node.val <= 100`



### 回溯算法（Python 代码、Java 代码）

这是典型的使用回溯解决的问题，一般来说，都要使用一个栈或者列表（命名为 `path` 或者 `pre`）记录状态，在需要结算的时候，记录下当前的状态。

编码注意事项：回溯的时候状态要重置。


这道题的写法比较多，这里只介绍最基本的回溯、状态重置的写法，其它写法供大家参考。

**参考代码 1**：

Python 代码：

```Python []
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def binaryTreePaths(self, root: TreeNode) -> List[str]:
        res = []
        if root is None:
            return res
        path = []
        self.__helper(root, path, res)
        return res

    def __helper(self, node, path, res):
        """
        :param node:
        :param path: 沿途经过的结点值组成的列表
        :param res: 存放最终结果的变量
        :return:
        """
        if node is None:
            return
        path.append(str(node.val))
        if node.left is None and node.right is None:
            # 可以结算了
            res.append("->".join(path))
            return
        if node.left:
            self.__helper(node.left, path, res)
            # 【重点】：回溯的时候，要记得弹出
            # 左边结点都看过了，所以 path 要弹出
            path.pop()
        if node.right:
            self.__helper(node.right, path, res)
            # 【重点】：回溯的时候，要记得弹出
            # 右边结点都看过了，所以 path 要弹出
            path.pop()


if __name__ == '__main__':
    node1 = TreeNode(1)
    node2 = TreeNode(2)
    node3 = TreeNode(3)
    node5 = TreeNode(5)

    node1.left = node2
    node1.right = node3
    node2.right = node5

    solution = Solution()
    result = solution.binaryTreePaths(node1)
    print(result)
```

Java 代码：

```Java []
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

    public List<String> binaryTreePaths(TreeNode root) {
        List<String> res = new ArrayList<>();
        if (root == null) {
            return res;
        }
        List<String> path = new ArrayList<>();
        dfs(root, path, res);
        return res;
    }

    private void dfs(TreeNode node, List<String> path, List<String> res) {
        if (node == null) {
            return;
        }
        path.add("" + node.val);
        if (node.left == null && node.right == null) {
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 0; i < path.size(); i++) {
                stringBuilder.append(path.get(i));
                stringBuilder.append("->");
            }
            stringBuilder.delete(stringBuilder.lastIndexOf("->"), stringBuilder.length());
            res.add(stringBuilder.toString());
            return;
        }

        if (node.left != null) {
            dfs(node.left, path, res);
            path.remove(path.size() - 1);
        }
        if (node.right != null) {
            dfs(node.right, path, res);
            path.remove(path.size() - 1);
        }
    }

    public static void main(String[] args) {
        TreeNode node1 = new TreeNode(1);
        TreeNode node2 = new TreeNode(2);
        TreeNode node3 = new TreeNode(3);
        TreeNode node5 = new TreeNode(5);

        node1.left = node2;
        node1.right = node3;
        node2.right = node5;
        Solution solution = new Solution();
        List<String> binaryTreePaths = solution.binaryTreePaths(node1);
        binaryTreePaths.forEach(System.out::println);
    }
}
```

---

下面是其它参考代码：

**参考代码 2**：如果通过参数传递的方式，就没有显式的回溯和状态重置的过程了

说明：下面第 1 个选项卡的 Python 代码是 [@何去何从gw](/u/he-qu-he-cong-gw) 用户在评论区中提供的，并且指出了“隐式回溯”的概念，在此表示感谢。

Python 代码：

```Python []
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def binaryTreePaths(self, root: TreeNode) -> List[str]:
        res = []
        if root is None:
            return res
        # 注意：根结点的值要先放到 pre 变量中
        self.__helper(root, [str(root.val)], res)
        return res

    def __helper(self, node, pre, res):
        # 隐式回溯
        # pre 表示一组解
        if node is None:
            return
        if node.left is None and node.right is None:
            res.append('->'.join(pre))
        # 通过参数传递的方式，就没有显式的回溯和状态重置的过程了
        if node.left:
            self.__helper(node.left, pre + [str(node.left.val)], res)
        if node.right:
            self.__helper(node.right, pre + [str(node.right.val)], res)
```

Python 代码：

```Python []
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def binaryTreePaths(self, root: TreeNode) -> List[str]:
        res = []
        if root is None:
            return res
        self.__helper(root, '', res)
        return res

    def __helper(self, node, pre, res):
        if node.left is None and node.right is None:
            res.append(pre + str(node.val))
            return
        # 通过参数传递的方式，就没有显式的回溯和状态重置的过程了
        if node.left:
            self.__helper(node.left, pre + str(node.val) + '->', res)
        if node.right:
            self.__helper(node.right, pre + str(node.val) + '->', res)
```

Java 代码：

```Java []
public class Solution2 {
    
    private void dfs(TreeNode node, String pre, List<String> res) {
        // 递归终止条件：走到根节点的时候，就可以把沿途积累的字符串添加到结果集中
        if (node.left == null && node.right == null) {
            res.add(pre + node.val);
            return;
        }
        if (node.left != null) {
            dfs(node.left, pre + node.val + "->", res);
        }
        if (node.right != null) {
            dfs(node.right, pre + node.val + "->", res);
        }
    }

    public List<String> binaryTreePaths(TreeNode root) {
        // 将全局的结果保存在这里
        List<String> res = new ArrayList<>();
        if (root == null) {
            return res;
        }
        dfs(root, "", res);
        return res;
    }
}
```

**参考代码 3**：递归求解

Python 代码：

```Python []
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def binaryTreePaths(self, root: TreeNode) -> List[str]:
        res = []
        # 前面先讨论递归到底的情况情况
        if root is None:
            return res

        if root.left is None and root.right is None:
            res.append(str(root.val))
            return res

        # 字符串列表
        left_paths = self.binaryTreePaths(root.left)
        for path in left_paths:
            res.append(str(root.val) + '->' + path)
        # 字符串列表
        right_paths = self.binaryTreePaths(root.right)
        for path in right_paths:
            res.append(str(root.val) + '->' + path)

        return res
```

Python 代码：

```Python []
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def binaryTreePaths(self, root: TreeNode) -> List[str]:
        res = []

        if root is None:
            return []

        if root.left is None and root.right is None:
            res.append(str(root.val))
            return res

        left_paths = self.binaryTreePaths(root.left)
        for lpath in left_paths:
            res.append(str(root.val) + '->' + lpath)

        right_paths = self.binaryTreePaths(root.right)
        for rpath in right_paths:
            res.append(str(root.val) + '->' + rpath)

        return res
```

**参考代码 4**：

Python 代码：

```Python []
from typing import List


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def binaryTreePaths(self, root: TreeNode) -> List[str]:
        def helper(root, path, res):
            if root is None:
                return True
            path.append(str(root.val))
            left = helper(root.left, path, res)
            right = helper(root.right, path, res)
            if left and right:
                # 如果左边右边都为空，沿途的路径就要结算了
                res.append('->'.join(path))
            # 关键
            path.pop()
            # False 代表空集
            return False

        res = []
        helper(root, [], res)
        return res
```

