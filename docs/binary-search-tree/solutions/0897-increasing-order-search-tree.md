---
title: 「力扣」第 987 题：递增顺序查找树（中等）
icon: yongyan
category: 二叉搜索树
tags:
  - 二叉搜索树
---


说明：本题官方题解我参与了编写，因此内容与官方题解有重合的地方。

#### 方法一：先中序遍历，再生成新的树

**算法**

题目要求我们返回按照中序遍历的结果改造而成的、只有右节点的 **等价** 二叉查找树。提示中说：每个节点具有唯一值。因此我们可以：

+ 先对输入的二叉查找树执行中序遍历，将结果保存到一个列表中；
+ 然后根据列表中的节点值，创建等价的，只含有右节点的二叉查找树，其过程等价于：根据数组创建一个链表。

**代码**

```Java []
class Solution {

    public TreeNode increasingBST(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        inorder(root, res);

        TreeNode dummyNode = new TreeNode(-1);
        TreeNode currNode = dummyNode;
        for (int value: res) {
            currNode.right = new TreeNode(value);
            currNode = currNode.right;
        }
        return dummyNode.right;
    }

    public void inorder(TreeNode node, List<Integer> res) {
        if (node == null) {
            return;
        }
        inorder(node.left, res);
        res.add(node.val);
        inorder(node.right, res);
    }
}
```

**复杂度分析**

- 时间复杂度：$O(N)$。其中 $N$ 是二叉查找树的节点总数。
- 空间复杂度：$O(N)$，保存二叉查找树的所有节点的值需要长度为 $N$ 的列表。

#### 方法二：在中序遍历的过程中改变节点指向

方法一需要遍历一次二叉查找树以后，然后再创建新的等价的二叉查找树。事实上，还可以遍历一次输入二叉查找树，在遍历的过程中改变结点指向以满足题目的要求。

具体来说，在中序遍历的时候，修改结点指向就可以实现。具体地，当我们遍历到一个节点时，把它的左孩子设为空，并将其本身作为上一个遍历到的节点的右孩子。这里需要有一些想象能力。递归遍历的过程中，由于递归函数的调用栈保存了节点的引用，使得上述操作可以实现。下面的幻灯片展示了这样的过程。



<![1.png](https://pic.leetcode-cn.com/1617605893-CYccaw-1.png),![2.png](https://pic.leetcode-cn.com/1617605893-wVIkEe-2.png),![3.png](https://pic.leetcode-cn.com/1617605893-wVNSxo-3.png),![4.png](https://pic.leetcode-cn.com/1617605893-MRrcNu-4.png),![5.png](https://pic.leetcode-cn.com/1617605893-ZaLISJ-5.png),![6.png](https://pic.leetcode-cn.com/1617605893-tdVhEG-6.png),![7.png](https://pic.leetcode-cn.com/1617605893-ljGMbE-7.png),![8.png](https://pic.leetcode-cn.com/1617605893-ObVBhn-8.png),![9.png](https://pic.leetcode-cn.com/1617605893-alyIKA-9.png),![10.png](https://pic.leetcode-cn.com/1617605893-hRHcnK-10.png),![11.png](https://pic.leetcode-cn.com/1617605893-AZbrbl-11.png),![12.png](https://pic.leetcode-cn.com/1617605893-aAIrLT-12.png),![13.png](https://pic.leetcode-cn.com/1617605893-IrZyWz-13.png),![14.png](https://pic.leetcode-cn.com/1617605893-EzRWkT-14.png),![15.png](https://pic.leetcode-cn.com/1617605893-INQjIh-15.png),![16.png](https://pic.leetcode-cn.com/1617605893-XUkntJ-16.png),![17.png](https://pic.leetcode-cn.com/1617605893-SNRECU-17.png),![18.png](https://pic.leetcode-cn.com/1617605893-MJNEuw-18.png),![19.png](https://pic.leetcode-cn.com/1617605893-APxVgX-19.png),![20.png](https://pic.leetcode-cn.com/1617605893-kncxnf-20.png),![21.png](https://pic.leetcode-cn.com/1617605893-AfojZp-21.png),![22.png](https://pic.leetcode-cn.com/1617605893-arlRwv-22.png),![23.png](https://pic.leetcode-cn.com/1617605893-dRsEXD-23.png),![24.png](https://pic.leetcode-cn.com/1617605893-mmcVcf-24.png),![25.png](https://pic.leetcode-cn.com/1617605893-PlYUtg-25.png),![26.png](https://pic.leetcode-cn.com/1617605893-oowOmh-26.png),![27.png](https://pic.leetcode-cn.com/1617605893-uzfpip-27.png)>

**代码**

```Java []
class Solution {

    private TreeNode resNode;

    public TreeNode increasingBST(TreeNode root) {
        TreeNode dummyNode = new TreeNode(-1);
        resNode = dummyNode;
        inorder(root);
        return dummyNode.right;

    }

    public void inorder(TreeNode node) {
        if (node == null) {
            return;
        }
        inorder(node.left);

        // 在中序遍历的过程中修改结点指向
        resNode.right = node;
        node.left = null;
        resNode = node;

        inorder(node.right);
    }
}
```

**复杂度分析**

- 时间复杂度：$O(N)$。其中 $N$ 是二叉查找树的节点总数。
- 空间复杂度：$O(1)$，保存二叉查找树的所有节点的值需要长度为 $N$ 的列表。

