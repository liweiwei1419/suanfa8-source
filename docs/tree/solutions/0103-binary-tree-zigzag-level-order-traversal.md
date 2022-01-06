---
title: 「力扣」第 103 题：二叉树的锯齿形层次遍历（中等）
icon: yongyan
category: 二叉树
tags:
  - 二叉树
---


## 「力扣」第 103 题：二叉树的锯齿形层次遍历（中等）

传送门：[103. 二叉树的锯齿形层次遍历](https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/)。

> 给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
>
> 例如：
> 给定二叉树 `[3,9,20,null,null,15,7]`,
>
> ```
>  3
> / \
> 9  20
>  /  \
> 15   7
> ```
>
> 返回锯齿形层次遍历如下：
>
> ```
> [
> [3],
> [20,9],
> [15,7]
> ]
> ```

Java 代码：

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

    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            return res;
        }
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        boolean direction = true;
        while (!queue.isEmpty()) {
            // 当前这一层遍历的节点集合
            List<Integer> curList = new ArrayList<>();

            // 特别注意：每一次只能处理上一轮入队列的的元素，
            // 所以要将上一轮入队列的元素个数先存一下
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode curNode = queue.poll();
                if (direction) {
                    curList.add(curNode.val);
                } else {
                    curList.add(0, curNode.val);
                }
                // 处理每一个元素都一样，都要考虑一下左右子树
                if (curNode.left != null) {
                    queue.add(curNode.left);
                }
                if (curNode.right != null) {
                    queue.add(curNode.right);
                }
            }
            // 改换方向
            direction = !direction;
            res.add(curList);
        }
        return res;
    }

    public static void main(String[] args) {
        TreeNode node1 = new TreeNode(1);
        TreeNode node2 = new TreeNode(2);
        TreeNode node3 = new TreeNode(3);
        TreeNode node4 = new TreeNode(4);
        TreeNode node5 = new TreeNode(5);
        TreeNode node6 = new TreeNode(6);
        TreeNode node7 = new TreeNode(7);

        node1.left = node2;
        node1.right = node3;

        node2.left = node4;
        node2.right = node5;

        node3.left = node6;
        node3.right = node7;

        Solution solution = new Solution();
        List<List<Integer>> zigzagLevelOrder = solution.zigzagLevelOrder(node1);
        zigzagLevelOrder.forEach(System.out::println);
    }
}
```



Python 代码：

```python

```

