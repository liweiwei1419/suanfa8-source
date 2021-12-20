---
title: 「力扣」第 143 题：重排链表（中等）
date: 2017-08-15 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 6：链表
tags:
  - 单链表
permalink: leetcode-algo/0143-reorder-list
---

## 「力扣」第 143 题：重排链表（中等）

链接：https://leetcode-cn.com/problems/reorder-list

> 给定一个单链表 *L*：*L*0→*L*1→…→*L**n*-1→*L*n ，
> 将其重新排列后变为： *L*0→*L**n*→*L*1→*L**n*-1→*L*2→*L**n*-2→…
>
> 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
>
> **示例 1:**
>
> ```
> 给定链表 1->2->3->4, 重新排列为 1->4->2->3.
> ```
>
> **示例 2:**
>
> ```
> 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
> ```

Java 代码：

```java
/**
 * @author liwei
 * @date 18/7/5 上午9:36
 */
public class Solution2 {

    public void reorderList(ListNode head) {
        if (head == null || head.next == null) {
            return;
        }
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode anotherHead = slow.next;
        // 步骤1：从中间截断链表
        slow.next = null;
        // 步骤2：反转链表的后半截
        ListNode reverseList = reverseList(anotherHead);
        // 步骤3：合并两个链表
        int k = 0;
        mergeTwoList(head, reverseList, k);
    }

    private ListNode mergeTwoList(ListNode head1, ListNode head2, int k) {
        if (head1 == null) {
            return head2;
        }
        if (head2 == null) {
            return head1;
        }
        // k % 2 == 0
        if ((k & 1) == 0) {
            head1.next = mergeTwoList(head1.next, head2, ++k);
            return head1;
        } else {
            head2.next = mergeTwoList(head1, head2.next, ++k);
            return head2;
        }
    }

    private ListNode reverseList(ListNode head) {
        ListNode preNode = null;
        ListNode curNode = head;
        while (curNode != null) {
            ListNode nextNode = curNode.next;
            curNode.next = preNode;
            preNode = curNode;
            curNode = nextNode;
        }
        return preNode;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        Solution2 solution2 = new Solution2();
        ListNode head = new ListNode(nums);
        solution2.reorderList(head);
        System.out.println(head);
    }
}
```


