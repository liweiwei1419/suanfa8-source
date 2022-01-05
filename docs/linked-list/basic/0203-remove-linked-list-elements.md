---
title: 「力扣」第 203 题：移除链表元素（简单）
icon: yongyan
category: 链表
tags:
  - 单链表
---

+ 中文网址：[203. 删除链表中的结点](https://leetcode-cn.com/problems/remove-linked-list-elements/description/)；
+ 英文网址：[203. Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/description/)。

## 题目描述

给你一个链表的头节点 `head` 和一个整数 `val` ，请你删除链表中所有满足 `Node.val == val` 的节点，并返回 **新的头节点** 。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/03/06/removelinked-list.jpg)





```
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
```

**示例 2：**

```
输入：head = [], val = 1
输出：[]
```

**示例 3：**

```
输入：head = [7,7,7,7], val = 7
输出：[]
```

 **提示：**

- 列表中的节点数目在范围 $[0, 10^4]$ 内
- `1 <= Node.val <= 50`
- `0 <= val <= 50`

## 思路分析

1. 涉及第 $1$ 个结点的操作，因此需要设置「虚拟头结点」；
2. 两种方法：

+ 穿针引线；
+ 递归。

## 方法一：穿针引线

**参考代码 1**：

```java
public class Solution {

    public ListNode removeElements(ListNode head, int val) {
        ListNode dummyNode = new ListNode(-1);
        dummyNode.next = head;
        ListNode cur = dummyNode;
        while (cur.next != null) {
            if (cur.next.val == val) {
                // 待删除的结点
                ListNode deleteNode = cur.next;
                cur.next = deleteNode.next;
                deleteNode.next = null;
            } else {
                cur = cur.next;
            }
        }
        return dummyNode.next;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是链表的长度；
+ 空间复杂度：$O(1)$，只需要常数个变量。

## 方法二：递归

**参考代码 2**：

```java
public class Solution {

    public ListNode removeElements(ListNode head, int val) {
        if (head == null) {
            return head;
        }
        // 假设小一个规模的问题已经解决
        head.next = removeElements(head.next, val);
        if (head.val == val) {
            return head.next;
        } else {
            return head;
        }
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是链表的长度；
+ 空间复杂度：$O(N)$，递归调用栈的深度最多为 $N$。

