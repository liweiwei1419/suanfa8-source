---
title: 「力扣」第 109 题：有序链表转换二叉搜索树（中等）
icon: yongyan
category: 链表
tags:
  - 链表
  - 分治法
---

- 题目链接：[109. 有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/)；
- 题解链接：[分治法（Python 代码、Java 代码）](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/fen-zhi-fa-python-dai-ma-java-dai-ma-by-liweiwei14/)。

## 题目描述

给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树*每个节点* 的左右两个子树的高度差的绝对值不超过 1。

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/08/17/linked.jpg)

```
Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One possible answer is [0,-3,9,-10,null,5], which represents the shown height balanced BST.
```

**Example 2:**

```
Input: head = []
Output: []
```

**Example 3:**

```
Input: head = [0]
Output: [0]
```

**Example 4:**

```
Input: head = [1,3]
Output: [3,1]
```

**Constraints:**

- The number of nodes in `head` is in the range `[0, 2 * 10^4]`.
- $-10^5 \le Node.val \le 10^5$

## 思路分析

思路其实[官方题解](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/solution/you-xu-lian-biao-zhuan-huan-er-cha-sou-suo-shu-by-/)已经写得非常清楚了，建议看看其中的动画，展示得非常清楚了。

在这里主要想说二叉树的很多问题基本上都可以通过“分而治之”的策略完成。这里首先找到[单链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/submissions/)，然后递归构造左子树和右子树。还有一种做法是把单链表变成有序数组，这就是 [「力扣」第 108 题：将有序数组转换为二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)。

编码的细节已经体现在代码注释中。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
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

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
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
````

</CodeGroupItem>
</CodeGroup>

---

补充：

用于测试的结点类（这部分代码不用提交给「力扣」）。

<CodeGroup>
<CodeGroupItem title="Java">
```java
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

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
````

</CodeGroupItem>
</CodeGroup>

用于测试的主方法（这部分代码不用提交给「力扣」）。
