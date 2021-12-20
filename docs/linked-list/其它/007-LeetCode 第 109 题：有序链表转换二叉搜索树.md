---
title: LeetCode 第 109 题：有序链表转换二叉搜索树
date: 2019-06-07 08:00:00
author: liwei
top: false
mathjax: true
categories: leetcode 题解（新）
tags:
  - 分治法
permalink: leetcode-solution-new/convert-sorted-list-to-binary-search-tree
---

# LeetCode 第 109 题：有序链表转换二叉搜索树

| 题目地址                                                     | 题解                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [LeetCode 第 109 题：有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/) | [分治法（Python 代码、Java 代码）](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/fen-zhi-fa-python-dai-ma-java-dai-ma-by-liweiwei14/) |

思路其实[官方题解](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/you-xu-lian-biao-zhuan-huan-er-cha-sou-suo-shu-by-/)已经写得非常清楚了，建议看看其中的动画，展示得非常清楚了。

在这里主要想说二叉树的很多问题基本上都可以通过“分而治之”的策略完成。这里首先找到[单链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/submissions/)，然后递归构造左子树和右子树。还有一种做法是把单链表变成有序数组，这就是 [「力扣」第 108 题：将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)。

编码的细节已经体现在代码注释中。

Python 代码：

```Python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        # 特判：当结点为空，或者单结点的时候的简单逻辑
        if head is None:
            return None

        if head.next is None:
            return TreeNode(head.val)

        # 设置 pre 指针是为了切断单链表 mid 的前半部分
        pre = None
        slow = head
        fast = head

        # 如果写 while fast and fast.next: 后面的代码稍有不同
        while fast.next and fast.next.next:
            pre = slow
            slow = slow.next
            fast = fast.next.next

        # 此时 slow 结点就位于链表的中部，
        # 它的值就作为 BST 的根结点返回
        root = TreeNode(slow.val)

        # 因为要传入下一个递归方法，所以得先保存索引
        new_head = slow.next
        slow.next = None

        # 当链表只有 2 个结点的时候，pre 指针此时为 None，不用递归构造左子树
        if pre:
            pre.next = None
            root.left = self.sortedListToBST(head)
        root.right = self.sortedListToBST(new_head)
        return root
```

Java 代码：

```Java
class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

public class Solution {

    public TreeNode sortedListToBST(ListNode head) {
        // 特判：当结点为空，或者单结点的时候的简单逻辑
        if (head == null) {
            return null;
        }
        if (head.next == null) {
            return new TreeNode(head.val);
        }

        // 设置 pre 指针是为了切断单链表 mid 的前半部分
        ListNode pre = null;
        ListNode slow = head;
        ListNode fast = head;

        // 如果写 while fast and fast.next: 后面的代码稍有不同
        while (fast.next != null && fast.next.next != null) {
            pre = slow;
            slow = slow.next;
            fast = fast.next.next;
        }

        // 此时 slow 结点就位于链表的中部，
        // 它的值就作为 BST 的根结点返回
        TreeNode root = new TreeNode(slow.val);
        // 因为要传入下一个递归方法，所以得先保存索引
        ListNode newHead = slow.next;
        slow.next = null;

        // 当链表只有 2 个结点的时候，pre 指针此时为 null，不用递归构造左子树
        if(pre != null){
            pre.next = null;
            root.left = sortedListToBST(head);
        }
        root.right = sortedListToBST(newHead);
        return root;
    }
}
```