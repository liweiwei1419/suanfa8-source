---
title: 「力扣」第 92 题：反转链表 II
date: 2017-08-11 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 6：链表
tags:
  - 单链表
  - 递归
permalink: leetcode-algo/0092-reverse-linked-list-ii
---

## 「力扣」第 92 题：反转链表 II

+ [链接](https://leetcode-cn.com/problems/reverse-linked-list-ii)
+ [题解链接](https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/4-ge-zhi-zhen-3-ge-zhi-zhen-by-liweiwei1419/)

> 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
>
> 说明：
> 1 ≤ m ≤ n ≤ 链表长度。
>
> 示例：
>
> ```
> 输入: 1->2->3->4->5->NULL, m = 2, n = 4
> 输出: 1->4->3->2->5->NULL
> ```
>

### 方法一：使用 4 个指针变量

1、利用第 206 题的做法：把介于 `m` 和 `n` 的链表截取出来，反转一下，再接回去。

注意：因为涉及第 1 个结点的操作，为了避免分类讨论，常见的做法是引入虚拟头结点。

![image-20191129104224767](https://tva1.sinaimg.cn/large/006y8mN6ly1g9epy68exjj314u08cmxj.jpg)



2、为此，我们需要一些指针变量，它们是 `m` 和 `n` 的边界，`m` 的前一个结点，`n` 的后一个结点。

![image-20191129104329202](https://tva1.sinaimg.cn/large/006y8mN6ly1g9epy7krv6j315g0dg0ta.jpg)

3、因此，首先要遍历分别得到 `p1` 和 `p2`，然后 `p3` 和  `p4` 就可以确定了。

![image-20191129104638461](https://tva1.sinaimg.cn/large/006y8mN6ly1g9epyatz7wj315g0f0mxw.jpg)Java 代码：

```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }

    public ListNode(int[] nums) {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("arr can not be empty");
        }
        this.val = nums[0];
        ListNode curr = this;
        for (int i = 1; i < nums.length; i++) {
            curr.next = new ListNode(nums[i]);
            curr = curr.next;
        }
    }

    @Override
    public String toString() {
        StringBuilder s = new StringBuilder();
        ListNode cur = this;
        while (cur != null) {
            s.append(cur.val);
            s.append(" -> ");
            cur = cur.next;
        }
        s.append("NULL");
        return s.toString();
    }
}


// 利用第 206 题：穿针引线

public class Solution {

    // 使用 4 个指针变量

    public ListNode reverseBetween(ListNode head, int m, int n) {
        // 因为有头结点有可能发生变化，使用虚拟头结点可以避免复杂的分类讨论
        ListNode dummyNode = new ListNode(-1);
        dummyNode.next = head;

        ListNode p1 = dummyNode;
        // 第 1 步：从虚拟头结点走 m - 1 步，来到 m 结点的前一个结点
        // 建议写在 for 循环里，语义清晰
        for (int i = 0; i < m - 1; i++) {
            p1 = p1.next;
        }

        // 第 2 步：从 p1 再走 n - m + 1 步，来到 n 结点
        ListNode p2 = p1;
        for (int i = 0; i < n - m + 1; i++) {
            p2 = p2.next;
        }

        // 第 3 步：切断出一个子链表（截取链表）
        ListNode p3 = p1.next;
        ListNode p4 = p2.next;

        p1.next = null;
        p2.next = null;

        // 第 4 步：反转子链表
        reverseLinkedList(p3);

        // 第 5 步：接回到原来的链表中
        p1.next = p2;
        p3.next = p4;
        return dummyNode.next;

    }

    private void reverseLinkedList(ListNode head) {
        // 也可以使用递归反转一个链表
        ListNode pre = null;
        ListNode cur = head;
        // 在循环开始之前声明，可以避免在循环中反复声明新变量
        ListNode next;

        while (cur != null) {
            next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
    }
}
```

### 方法二：使用 3个指针变量

---

以前写的笔记

### 练习1：LeetCode 第 92 题：反转从位置 m 到 n 的链表，k 个组进行一次反转

传送门：英文网址：[92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/description/)  ，中文网址：[92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/description/)  。

> 反转一个单链表。
>
> **示例:**
>
> ```
> 输入: 1->2->3->4->5->NULL
> 输出: 5->4->3->2->1->NULL
> ```
>
> **进阶:**
> 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

![LeetCode 第 92 题：反转从位置 m 到 n 的链表，k 个组进行一次反转-1](http://upload-images.jianshu.io/upload_images/414598-f83685e15724a1d7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/600)

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
    public ListNode reverseBetween(ListNode head, int m, int n) {
        // 创建一个虚拟的结点（dummy）
        ListNode dummy = new ListNode(-1);
        dummy.next = head;

        ListNode pre = dummy;
        int k = 0;

        while (++k < m) {
            if (pre != null) {
                pre = pre.next;
            }
        }

        // tail 是尾巴的意思
        ListNode tail = pre.next;
        while (++k <= n) {
            ListNode temp = pre.next;

            pre.next = tail.next;
            tail.next = tail.next.next;
            pre.next.next = temp;
        }
        return dummy.next;
    } 
}
```

Java 代码：

```java
public class Solution2 {

    public ListNode reverseBetween(ListNode head, int m, int n) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode pre = dummy;
        for (int i = 0; i < m - 1; i++) {
            // pre 指针向后移动
            pre = pre.next;
        }
        // System.out.println(pre.val);

        ListNode p = pre.next;
        ListNode curNode;
        for (int i = 0; i < n - m; i++) {
            curNode = p.next;
            p.next = curNode.next;
            curNode.next = pre.next;
            pre.next = curNode;
        }
        return dummy.next;
    }
}
```

Java 代码：

```java
public ListNode reverseBetween(ListNode head, int m, int n) {
    // 设置 dummyNode 是这一类问题的一般做法
    ListNode dummyNode = new ListNode(-1);
    dummyNode.next = head;
    ListNode pre = dummyNode;
    for (int i = 0; i < m - 1; i++) {
        pre = pre.next;
    }
    ListNode cur = pre.next;
    ListNode next;
    for (int i = 0; i < n - m; i++) {
        next = cur.next;
        cur.next = next.next;
        next.next = pre.next;
        pre.next = next;
    }
    return dummyNode.next;
}
```

另一种解法：来自“小吴”的动图，比较自然，但是代码写起来不够简洁。

图示：

![LeetCode 第 92 题：反转从位置 m 到 n 的链表，k 个组进行一次反转-2](https://liweiwei1419.gitee.io/images/leetcode-solution/0092.gif)

Python 代码：
![LeetCode 第 92 题：反转从位置 m 到 n 的链表，k 个组进行一次反转-3](https://liweiwei1419.gitee.io/images/leetcode-solution/0092.png)



