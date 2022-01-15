---
title: 「力扣」第 105 题：从前序与中序遍历序列构造二叉树（中等）
icon: shipin
category: 二叉树
tags:
  - 二叉树
  - 递归
---

> 抓住「前序遍历序列」与「中序遍历序列」的定义，递归构建二叉树。并且通过画图计算出需要使用的子区间的下标。最后看一眼复杂度，使用「空间换时间」的思路优化。

- 题目链接：[105. 从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal)；
- 题解链接：
  - [官方题解（含视频题解）](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)；
  - [分治法（Python 代码、Java 代码）（含视频讲解）](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/qian-xu-bian-li-python-dai-ma-java-dai-ma-by-liwei/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) 和 [B 站](https://www.bilibili.com/video/BV14A411q7Nv) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=328329319&bvid=BV14A411q7Nv&cid=193804974&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

给定一棵树的前序遍历 `preorder` 与中序遍历 `inorder`。请构造二叉树并返回其根节点。

**示例 1:**

![img](https://assets.leetcode.com/uploads/2021/02/19/tree.jpg)

```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

**示例 2:**

```
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

**提示:**

- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder` 和 `inorder` 均无重复元素
- `inorder` 均出现在 `preorder`
- `preorder` 保证为二叉树的前序遍历序列
- `inorder` 保证为二叉树的中序遍历序列

## 解题思路

建议点击右下角倍速观看，录制视频的时候嗓子不舒服，声音有点奇怪，请大家谅解。或者直接观看 [官方题解](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/cong-qian-xu-yu-zhong-xu-bian-li-xu-lie-gou-zao-9/)。

**思路分析**：

二叉树相关的很多问题的解决思路都有分治法的思想在里面。我们复习一下分治法的思想：**把原问题拆解成若干个与原问题结构相同但规模更小的子问题，待子问题解决以后，原问题就得以解决**，“归并排序”和“快速排序”都是分治法思想的应用，其中“归并排序”先无脑地“分”，在“合”的时候就麻烦一些；“快速排序”开始在 partition 上花了很多时间，即在“分”上使了很多劲，然后就递归处理下去就好了，没有在“合”上再花时间。

抓住“前序遍历的第 1 个元素一定是二叉树的根结点”，不难写出代码。关键还是拿 LeetCode 上面的例子画一个图，思路就很清晰了。

前序遍历数组的第 $1$ 个数（索引为 $0$）的数一定是二叉树的根结点，于是可以在中序遍历中找这个根结点的索引，然后把“前序遍历数组”和“中序遍历数组”分为两个部分，就分别对应二叉树的左子树和右子树，分别递归完成就可以了。

![105-1.png](https://pic.leetcode-cn.com/fe215cdc993b06a2eeca7939ac04d370f3fe725e7e568e6ced17d1757020be9f-105-1.png)

下面是一个具体的例子，演示了如何计算数组子区间的边界：

![image.png](https://pic.leetcode-cn.com/1c96c49acdd0e51b195dd5916526291f23897f77cea700ea89aa81a4a900a6d7-image.png)

这道题完成了以后可以顺便把 [「力扣」 第 106 题：从中序与后序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)也一起做了。

可以将中序遍历的值和索引存在一个哈希表中，这样就可以一下子找到根结点在中序遍历数组中的索引。

**参考代码**：

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

    private int[] preorder;
    private Map<Integer, Integer> hash;

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        int preLen = preorder.length;
        int inLen = inorder.length;
        if (preLen != inLen) {
            throw new RuntimeException("Incorrect input data.");
        }
        this.preorder = preorder;
        this.hash = new HashMap<>();
        for (int i = 0; i < inLen; i++) {
            hash.put(inorder[i], i);
        }

        return buildTree(0, preLen - 1, 0, inLen - 1);
    }


    private TreeNode buildTree(int preLeft, int preRight, int inLeft, int inRight) {
        // 因为是递归调用的方法，按照国际惯例，先写递归终止条件
        if (preLeft > preRight || inLeft > inRight) {
            return null;
        }
        // 先序遍历的起点元素很重要
        int pivot = preorder[preLeft];
        TreeNode root = new TreeNode(pivot);
        int pivotIndex = hash.get(pivot);
        root.left = buildTree(preLeft + 1, pivotIndex - inLeft + preLeft,
                inLeft, pivotIndex - 1);
        root.right = buildTree(pivotIndex - inLeft + preLeft + 1, preRight,
                pivotIndex + 1, inRight);
        return root;
    }
}
```

**复杂度分析：**

- 时间复杂度：$O(N)$，这里 $N$ 是二叉树的结点个数，每调用一次递归方法创建一个结点，一共创建 $N$ 个结点，这里不计算递归方法占用的时间；
- 空间复杂度：$O(N)$，这里忽略递归方法占用的空间，因为是对数级别的，比 $N$ 小。
