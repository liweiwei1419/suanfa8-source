---
title: 「力扣」第 143 题：重排链表（中等）
icon: yongyan
category: 链表
tags:
  - 链表
---

+  题目链接：[143. 重排链表](https://leetcode-cn.com/problems/reorder-list/)

## 题目描述

给定一个单链表 `L` 的头节点 `head` ，单链表 `L` 表示为：

```
L0 → L1 → … → Ln - 1 → Ln
```

请将其重新排列后变为：

```
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
```

不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

**示例 1：**

![img](https://pic.leetcode-cn.com/1626420311-PkUiGI-image.png)



```
输入：head = [1,2,3,4]
输出：[1,4,2,3]
```

**示例 2：**

![img](https://pic.leetcode-cn.com/1626420320-YUiulT-image.png)

```
输入：head = [1,2,3,4,5]
输出：[1,5,2,4,3]
```

 **提示：**

- 链表的长度范围为 $[1, 5 * 10^4]$
- $1 \le node.val \le 1000$

### 方法一：递归

**参考代码 1**：

```java
public class Solution {

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
        // 步骤 1：从中间截断链表
        slow.next = null;
        // 步骤 2：反转链表的后半截
        ListNode reverseList = reverseList(anotherHead);
        // 步骤 3：合并两个链表
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
        if (k % 2 == 0) {
            k++;
            head1.next = mergeTwoList(head1.next, head2, k);
            return head1;
        } else {
            k++;
            head2.next = mergeTwoList(head1, head2.next, k);
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
}
```

### 方法二：穿针引线

```java
public class Solution {

    public void reorderList(ListNode head) {
        if (head == null || head.next == null || head.next.next == null) {
            return;
        }
        // 第 1 步：先找到中点
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // 此时 slow 的位置就在中点，即分成 [0..slow] [slow + 1..end]

        ListNode curNode = slow.next;
        slow.next = null;
        // 第 2 步：翻转链表
        ListNode pre = null;
        ListNode next;
        while (curNode != null) {
            next = curNode.next;
            curNode.next = pre;
            pre = curNode;
            curNode = next;
        }
        // 此时 pre 是翻转以后的链表头
        // 第 3 步：合并两个链表
        ListNode p1 = head;
        ListNode p2 = pre;

        while (p2 != null) {
            slow = p1.next;
            fast = p2.next;
            p1.next = p2;
            if (slow == null) {
                break;
            }
            p2.next = slow;
            p1 = slow;
            p2 = fast;
        }
    }
}
```
