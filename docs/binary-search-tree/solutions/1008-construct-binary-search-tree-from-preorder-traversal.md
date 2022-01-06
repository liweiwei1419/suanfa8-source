---
title: 「力扣」第 1008 题：前序遍历构造二叉搜索树（中等）
icon: yongyan
category: 二叉搜索树
tags:
  - 二叉搜索树
---


+ 题目链接：[1008. 前序遍历构造二叉搜索树](https://leetcode-cn.com/problems/construct-binary-search-tree-from-preorder-traversal/)；
+ 题解链接：[分治思想（Java）](https://leetcode-cn.com/problems/construct-binary-search-tree-from-preorder-traversal/solution/fen-zhi-si-xiang-java-by-liweiwei1419/)。



这道题如果做过 「力扣」第 105 题：[从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)，就会容易很多。

二叉树的很多问题都可以根据分治来做。


**编码要点**：

+ 前序遍历的第 1 个结点一定是二叉树的根结点；
+ 由于构造出来的是 BST，第 1 个结点后面被分成了两个子区间：
  + 第 1 个子区间里所有的元素都严格小于根结点 -> 递归构建成根结点的左子树；
  + 第 2 个子区间里所有的元素都严格大于根结点 -> 递归构建成根结点的右子树。

在这里递归函数里面一定会有一次遍历，不可以像 「力扣」第 105 题：[从前序与中序遍历序列构造二叉树](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) 一样，先用哈希表记住一些关系，然后递归的时候一下子得到左右分界线。

+ 但是可以发现，后面那一段其实是一个有「谷底」的数组，我们可以使用「二分查找」找到那个谷底，这里要注意边界条件。

（如果知道优化解法的朋友，欢迎指正。）


**参考代码 1**：

```Java []
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {

    public TreeNode bstFromPreorder(int[] preorder) {
        int len = preorder.length;
        if (len == 0) {
            return null;
        }

        return buildBST(preorder, 0, len - 1);
    }

    /**
     * 使用 preorder 的子区间 [left, right] 构建二叉树
     *
     * @param preorder
     * @param left
     * @param right
     * @return
     */
    private TreeNode buildBST(int[] preorder, int left, int right) {
        if (left > right) {
            return null;
        }

        TreeNode root = new TreeNode(preorder[left]);
        if (left == right) {
            return root;
        }

        int i = left;
        while (i + 1 <= right && preorder[i + 1] < preorder[left]) {
            i++;
        }

        // 此时子区间 [left + 1..i] 所有元素都 < preorder[left]
        //  [i + 1..right] 所有元素都 > preorder[left]

        TreeNode leftTree = buildBST(preorder, left + 1, i);
        TreeNode rightTree = buildBST(preorder, i + 1, right);

        root.left = leftTree;
        root.right = rightTree;
        return root;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N^2)$，最差情况就是顺序数组和倒序数组，这种情况相当于构建一个链表；
+ 空间复杂度：$O(N)$，递归调用的方法栈的高度是 $O(\log N)$，被忽略。


**参考代码 2**：

```Java []
public class Solution2 {

    // 889. Construct Binary Tree from Preorder and Postorder Traversal
    // 1028 就是更难点的题目了

    public TreeNode bstFromPreorder(int[] preorder) {
        int len = preorder.length;
        if (len == 0) {
            return null;
        }

        return buildBST(preorder, 0, len - 1);
    }

    /**
     * 使用 preorder 的子区间 [left, right] 构建二叉树
     *
     * @param preorder
     * @param left
     * @param right
     * @return
     */
    private TreeNode buildBST(int[] preorder, int left, int right) {
        if (left > right) {
            return null;
        }

        TreeNode root = new TreeNode(preorder[left]);
        if (left == right) {
            return root;
        }

        // 重点逻辑：在区间 [left, right] 里找最后一个小于等于 preorder[left] 的下标
        // 注意这里设置区间的左边界为 left ，不能是 left + 1
        int leftPoint = left;
        int rightPoint = right;

        while (leftPoint < rightPoint) {
            int mid = leftPoint + (rightPoint - leftPoint + 1) / 2;
            if (preorder[mid] < preorder[left]) {
                // 下一轮搜索区间是 [mid, rightPoint]
                leftPoint = mid;
            } else {
                // 下一轮搜索区间是 [left, mid - 1]
                rightPoint = mid - 1;
            }
        }

        TreeNode leftTree = buildBST(preorder, left + 1, leftPoint);
        TreeNode rightTree = buildBST(preorder, leftPoint + 1, right);

        root.left = leftTree;
        root.right = rightTree;
        return root;


    }
}
```


**复杂度分析**：

+ 时间复杂度：$O(N \log N)$，二分查找优化了线性查找的时间复杂度；
+ 空间复杂度：$O(N)$，同上。

