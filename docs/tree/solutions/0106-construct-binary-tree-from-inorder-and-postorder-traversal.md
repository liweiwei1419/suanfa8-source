---
title: 「力扣」第 106 题：从中序与后序遍历序列构造二叉树（中等）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
  - 递归
---


+ 题目链接：[106. 从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal)；
+ 题解链接：[分治法（Python、Java）](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/solution/hou-xu-bian-li-python-dai-ma-java-dai-ma-by-liwe-2/)。

## 题目描述

Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return *the binary tree*.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/02/19/tree.jpg)

```
Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]
```

**Example 2:**

```
Input: inorder = [-1], postorder = [-1]
Output: [-1]
```



**Constraints:**

- `1 <= inorder.length <= 3000`
- `postorder.length == inorder.length`
- `-3000 <= inorder[i], postorder[i] <= 3000`
- `inorder` and `postorder` consist of **unique** values.
- Each value of `postorder` also appears in `inorder`.
- `inorder` is **guaranteed** to be the inorder traversal of the tree.
- `postorder` is **guaranteed** to be the postorder traversal of the tree.

## 一句话题解

+ 二叉树后序遍历的最后一个元素一定是根结点；
+ 二叉树的根结点把中序遍历序列分成两个区间：
  + 左边区间的 **所有** 结点构成根结点的左子树；
  + 右边区间的 **所有** 结点构成根结点的右子树。

递归构建二叉树即可。

大家可以直接看「方法二」和「参考代码 3」。

---

## 思路分析

解决二叉树的问题通常会用到分治思想，分治思想一般通过递归方法实现。


复习分治法的思想：把原问题分解（Divide）成若干个与原问题结构相同但规模更小的子问题，待子问题解决（Conquer）以后，再合并（Combine）它们，原问题就得以解决。

归并排序和快速排序是典型的分治法思想的应用，其中：
+ 归并排序先无脑地「分」，在「合」的时候就麻烦一些；
+ 快速排序在 partition 上花了很多时间，即在「分」上花了很多时间，然后就递归处理下去就好了，没有在「合」的过程。

以题目中给出的例子为例，讲解如何构建二叉树。

> 中序遍历 `inorder = [9,3,15,20,7] `  
后序遍历 `postorder = [9,15,7,20,3]`

![106-1.png](https://pic.leetcode-cn.com/40c56ab66dc7288be11bc93fe9e31fd05daf6d6377fae8d1aa11054a67b4d62f-106-1.png)

图画完以后才发现这个例子不太好，数组长度多一些就能把思路展现得更清楚了。大家可以参考我在「力扣」第 105 题写的题解 [《分治法（Python 代码、Java 代码）》](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/qian-xu-bian-li-python-dai-ma-java-dai-ma-by-liwei/)，两道问题的解法是一样的。

**注意**：这道问题其实并不难，我们在草稿纸上写写画画，就能把思路想清楚，但是在编码上会有一些小陷阱，在计算索引边界值要认真一些。

下面给出两种写法，区别在于空间复杂度：

## 方法一：在递归方法中，传入数组的拷贝（不推荐、复杂度较高）

该方法在计算索引的时候会稍微容易一些。

**参考代码 1**：

```Java []
import java.util.Arrays;


public class Solution {
    /**
     * @param inorder   中序遍历序列
     * @param postorder 后序遍历序列
     * @return
     */
    public TreeNode buildTree(int[] inorder, int[] postorder) {

        int inlen = inorder.length;
        int postlen = postorder.length;

        assert inlen == postlen;

        if (inlen == 0) {
            return null;
        }
        if (inlen == 1) {
            return new TreeNode(inorder[0]);
        }

        // 后序遍历的最后一个结点就是根结点
        int rootVal = postorder[postlen - 1];
        // 在中序遍历中找到根结点的索引，得到左右子树的一个划分
        int dividePoint = 0;
        for (int i = 0; i < inlen; i++) {
            if (inorder[i] == rootVal) {
                dividePoint = i;
                break;
            }
        }
        TreeNode rootNode = new TreeNode(rootVal);
        // Arrays.copyOfRange() 方法的第 1 个参数是源数组
        // 第 2 个参数是源数组的起始位置（可以取到）
        // 第 3 个参数是源数组的起始位置（不可以取到）
        // 这里复制了数组，使用了一些空间，因此空间复杂度是 O(N)
        rootNode.left = buildTree(Arrays.copyOfRange(inorder, 0, dividePoint), Arrays.copyOfRange(postorder, 0, dividePoint));
        rootNode.right = buildTree(Arrays.copyOfRange(inorder, dividePoint + 1, inlen), Arrays.copyOfRange(postorder, dividePoint, postlen - 1));
        return rootNode;
    }
}
```
```Python []
from typing import List


class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        assert len(inorder) == len(postorder)

        if len(inorder) == 0:
            return None
        if len(inorder) == 1:
            # 这里要返回结点，而不是返回具体的数
            return TreeNode(inorder[0])
        # 后序遍历的最后一个结点就是根结点
        root = TreeNode(postorder[-1])
        # 在中序遍历中找到根结点的索引，得到左右子树的一个划分
        pos = inorder.index(postorder[-1])
        # 这里的列表切片使用的是复制值，使用了一些空间，因此空间复杂度是 O(N)
        root.left = self.buildTree(inorder[:pos], postorder[:pos])
        root.right = self.buildTree(inorder[pos + 1:], postorder[pos:-1])
        return root
```

**复杂度分析：**

+ 时间复杂度：$O(N^2)$，这里 $N$ 是二叉树的结点个数，算法中每个结点都会被看到一次，而查找根结点在中序遍历序列中的位置，又需要遍历一次，递归的深度是对数级别的，因此时间复杂度是 $O(N^2)$。
+ 空间复杂度：$O(N)$，构造一棵树需要 $N$ 个结点。

## 方法二：在递归方法中，传入子数组的边界下标

**注意**：在递归方法中，有一个数组的边界下标。

计算的依据是递归方法传入的 **中序遍历数组（的子数组）和后序遍历数组（的子数组）的长度相等**。我的办法是解方程计算未知数，具体需要计算哪个参数我在下面的代码中已经注明了。

下面展示了一个计算边界的方法。

![image.png](https://pic.leetcode-cn.com/f8b283be14a147ea32837d91acc7df7cd11a03b678a9989b17975f65cd341c93-image.png)

**参考代码 2**：

```Java []
public class Solution {

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        int inLen = inorder.length;
        int postLen = postorder.length;
        // 特判
        if (inLen != postLen) {
            throw new RuntimeException("输入错误");
        }
        return buildTree(inorder, 0, inLen - 1, postorder, 0, postLen - 1);
    }

    /**
     * 使用中序遍历序列 inorder 的子区间 [inLeft, inRight]
     * 与后序遍历序列 postorder 的子区间 [postLeft, postRight] 构建二叉树
     *
     * @param inorder   中序遍历序列
     * @param inLeft    中序遍历序列的左边界
     * @param inRight   中序遍历序列的右边界
     * @param postorder 后序遍历序列
     * @param postLeft  后序遍历序列的左边界
     * @param postRight 后序遍历序列的右边界
     * @return 二叉树的根结点
     */
    private TreeNode buildTree(int[] inorder, int inLeft, int inRight,
                               int[] postorder, int postLeft, int postRight) {
        if (inLeft > inRight || postLeft > postRight) {
            return null;
        }

        int pivot = postorder[postRight];
        int pivotIndex = inLeft;

        // 注意这里如果编写不当，有数组下标越界的风险
        while (inorder[pivotIndex] != pivot) {
            pivotIndex++;
        }
        TreeNode root = new TreeNode(pivot);
        root.left = buildTree(inorder, inLeft, pivotIndex - 1,
                postorder, postLeft, postRight - inRight + pivotIndex - 1);

        root.right = buildTree(inorder, pivotIndex + 1, inRight,
                postorder, postRight - inRight + pivotIndex, postRight - 1);
        return root;
    }
}
```
```Python []
from typing import List


class Solution:

    def __init__(self):
        self.inorder = None
        self.postorder = None

    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        assert len(inorder) == len(postorder)
        size = len(inorder)

        self.inorder = inorder
        self.postorder = postorder
        return self.__dfs(0, size - 1, 0, size - 1)

    def __dfs(self, in_l, in_r, post_l, post_r):
        if in_l > in_r or post_l > post_r:
            return None

        val = self.postorder[post_r]
        # 后序遍历的最后一个结点就是根结点
        root = TreeNode(val)
        # 在中序遍历中找到根结点的索引，得到左右子树的一个划分
        pos = self.inorder.index(val)

        # 注意：第 4 个参数是计算出来的，依据：两边区间长度相等
        root.left = self.__dfs(in_l, pos - 1, post_l, pos - 1 - in_l + post_l)
        # 注意：第 3 个参数是计算出来的，依据：两边区间长度相等
        root.right = self.__dfs(pos + 1, in_r, post_r - in_r + pos, post_r - 1)
        return root
```

**复杂度分析：**（同参考代码 1）

可以在递归构造前，把中序遍历的值和下标放在哈希表中，就不需要通过遍历得到当前根结点在中序遍历中的位置了。

**参考代码 3**：


```Java []
import java.util.HashMap;
import java.util.Map;


public class Solution {

    /**
     * 让 postorder 成为全局变量，以免在递归方法中一直传递
     */
    private int[] postorder;
    private Map<Integer, Integer> hash;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        int inLen = inorder.length;
        int postLen = postorder.length;

        if (inLen != postLen) {
            throw new RuntimeException("输入错误");
        }

        this.postorder = postorder;
        hash = new HashMap<>();
        for (int i = 0; i < inLen; i++) {
            hash.put(inorder[i], i);
        }

        return buildTree(0, inLen - 1, 0, postLen - 1);
    }

    /**
     * 使用中序遍历序列 inorder 的子区间 [inLeft, inRight]
     * 与后序遍历序列 postorder 的子区间 [postLeft, postRight] 构建二叉树
     *
     * @param inLeft    中序遍历序列的左边界
     * @param inRight   中序遍历序列的右边界
     * @param postLeft  后序遍历序列的左边界
     * @param postRight 后序遍历序列的右边界
     * @return 二叉树的根结点
     */
    private TreeNode buildTree(int inLeft, int inRight, int postLeft, int postRight) {
        if (inLeft > inRight || postLeft > postRight) {
            return null;
        }

        int pivot = postorder[postRight];
        int pivotIndex = hash.get(pivot);
        TreeNode root = new TreeNode(pivot);
        root.left = buildTree(inLeft, pivotIndex - 1, postLeft, postRight - inRight + pivotIndex - 1);
        root.right = buildTree(pivotIndex + 1, inRight, postRight - inRight + pivotIndex, postRight - 1);
        return root;
    }
}
```


**复杂度分析：**

+ 时间复杂度：$O(N)$，这里 $N$ 是二叉树的结点个数，二叉树的每个结点都遍历了 $2$ 次，第 1 次是扫描构建哈希表，第 2 次是递归构建二叉树；
+ 空间复杂度：$O(N)$。