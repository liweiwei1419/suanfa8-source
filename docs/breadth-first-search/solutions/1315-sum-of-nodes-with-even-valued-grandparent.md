---
title: 「力扣」第 1315 题：祖父节点值为偶数的节点和（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
---


+ 题目链接：[1315. 祖父节点值为偶数的节点和](https://leetcode-cn.com/problems/sum-of-nodes-with-even-valued-grandparent/)；
+ 题解链接：[层序遍历](https://leetcode-cn.com/problems/sum-of-nodes-with-even-valued-grandparent/solution/ceng-xu-bian-li-by-liweiwei1419/)。



思路：层序遍历。如果当前结点的值是偶数，给它的子节点一个标记。队首元素出队的时候收到这个标记，则表示当前队首的孩子结点的值（如果有的话）都要收集起来。

具体做法是：

+ 如果当前结点的值是偶数，给它的孩子结点一个标记（注意到每个结点的值都是正数，如果有一个 `0`，这种办法都不可行，于是将孩子结点的值修改为负数，即它的相反数）。
+ 出队的时候，检测结点的值。如果结点的值是负数，它的孩子节点（是将当前队首结点赋值为负数的那个结点的孙子节点）入队的时候就顺便把值全部加起来。
+ 因为值在修改之前就已经加入了结果，在遍历完成以后不需要把结点值修改回去。

**参考代码**：

```Java []
import java.util.LinkedList;
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

    public int sumEvenGrandparent(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        int res = 0;
        while (!queue.isEmpty()) {
            TreeNode top = queue.poll();
            
            boolean flag = false;
            if ((top.val & 1) == 0) {
                // 表示它的孩子节点要收集它的孙子节点的值
                flag = true;
            }

            if (top.left != null) {
                if (top.val < 0) {
                    res += top.left.val;
                }

                if (flag) {
                    top.left.val *= -1;
                }
                queue.add(top.left);
            }

            if (top.right != null) {
                if (top.val < 0) {
                    res += top.right.val;
                }

                if (flag) {
                    top.right.val *= -1;
                }
                queue.add(top.right);
            }
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是树的结点个数。
+ 空间复杂度：队列的长度不会超过每一层结点总数的最大值。
