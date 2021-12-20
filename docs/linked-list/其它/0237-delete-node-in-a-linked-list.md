---
title: 「力扣」第 237 题：删除链表中的节点（简单）
date: 2017-08-23 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 6：链表
tags:
  - 单链表
permalink: leetcode-algo/0237-delete-node-in-a-linked-list
---

## 「力扣」第 237 题：删除链表中的节点（简单）

+ 传送门：英文网址：[237. Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list/description/) ；
+ 中文网址：[237. 删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/description/) 。

> 请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点，你将只被给定要求被删除的节点。
>
> 现有一个链表 -- head = [4,5,1,9]，它可以表示为:
>
> ![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/01/19/237_example.png)
>
> 示例 1：
>
> ```
> 输入: head = [4,5,1,9], node = 5
> 输出: [4,1,9]
> 解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
> ```
>
> 示例 2：
>
> ```
> 输入: head = [4,5,1,9], node = 1
> 输出: [4,5,9]
> 解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
> ```
>

**说明:**

- 链表至少包含两个节点。
- 链表中所有节点的值都是唯一的。
- 给定的节点为非末尾节点并且一定是链表中的一个有效节点。
- 不要从你的函数中返回任何结果。

删除链表上的节点。（思考一下，我们原来学习的链表的删除是怎么删除的，通过索引来删除？）

Java 代码：

```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }

    ListNode(Integer[] nums) {
        ListNode currNode = this;
        currNode.val = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currNode.next = new ListNode(nums[i]);
            currNode = currNode.next;
        }
    }

    @Override
    public String toString() {
        ListNode currNode = this;
        StringBuilder s = new StringBuilder();
        while (currNode != null) {
            s.append(currNode.val);
            s.append(" -> ");
            currNode = currNode.next;
        }
        s.append("NULL");
        return s.toString();
    }
}

public class Solution {

    public void deleteNode(ListNode node) {
        // 第 1 步：把待删除结点的下一结点的值赋值给自己
        ListNode nextNode = node.next;
        node.val = nextNode.val;

        // 第 2 步：删除下一个结点
        node.next = nextNode.next;
        nextNode.next = null;
    }

    public static void main(String[] args) {
        ListNode node1 = new ListNode(0);
        ListNode node2 = new ListNode(1);
        node1.next = node2;
        Solution solution = new Solution();
        solution.deleteNode(node1);
    }
}
```

Java 代码：

```java
class ListNode {

    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }
}

public class Solution {

    /**
     * 这道题理解题意是关键，题目要求的是删除这个节点
     *
     * @param node
     */
    public void deleteNode(ListNode node) {
        if (node == null) {
            return;
        }

        if (node.next == null) {
            node = null;
            return;
        }
        ListNode deleteNode = node.next;
        node.val = deleteNode.val;
        node.next = deleteNode.next;
        deleteNode = null;
    }
}
```

