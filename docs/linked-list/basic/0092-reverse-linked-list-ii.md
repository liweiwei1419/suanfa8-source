---
title: 「力扣」第 92 题：反转链表 II（中等）
icon: yongyan
categories: 链表
tags:
  - 链表
---

+ 题目链接：[92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii)
+ 题解链接：[4 个指针、3 个指针](https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/4-ge-zhi-zhen-3-ge-zhi-zhen-by-liweiwei1419/)

## 题目描述

给你单链表的头指针 `head` 和两个整数 `left` 和 `right` ，其中 `left <= right` 。请你反转从位置 `left` 到位置 `right` 的链表节点，返回 **反转后的链表** 。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/19/rev2ex2.jpg)



```
输入：head = [1,2,3,4,5], left = 2, right = 4
输出：[1,4,3,2,5]
```

**示例 2：**

```
输入：head = [5], left = 1, right = 1
输出：[5]
```

**提示：**

- 链表中节点数目为 `n`
- `1 <= n <= 500`
- `-500 <= Node.val <= 500`
- `1 <= left <= right <= n`

**进阶：** 你可以使用一趟扫描完成反转吗？

## 思路分析

使用若干个指针变量可以完成任务。


### 方法一：使用 4 个指针变量（复用「力扣」第 92 题结果）

1、利用第 206 题的做法：把介于 `m` 和 `n` 的链表截取出来，反转一下，再接回去。

注意：因为涉及第 1 个结点的操作，为了避免分类讨论，常见的做法是引入虚拟头结点。

![image-20191129104224767](https://pic.leetcode-cn.com/824b2faab034826f1343735a3873251f728ae8094f9cdd007078ba71f9197696.jpg)



2、为此，我们需要一些指针变量，它们是 `m` 和 `n` 的边界，`m` 的前一个结点，`n` 的后一个结点。

![image-20191129104329202](https://pic.leetcode-cn.com/66c273da59e61874db532a8c9127548dcc5d74eb0762b57284013382dc8441f1.jpg)

3、因此，首先要遍历分别得到 `p1` 和 `p2`，然后 `p3` 和  `p4` 就可以确定了。

![image-20191129104638461](https://pic.leetcode-cn.com/04cf821ff558c4aac72ffda125e003bde8d45cd2fbbeecb7c2ba954b57cbd000.jpg)


**参考代码 1**：

```java
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

### 方法二：使用 3 个指针变量

这里需要我们在纸上动态地去画一下“穿针引线”的过程。写出来的代码依然是“首尾相连”的。

下面是反转 `2 —> 3 —> 4` 这一部分为例。

![92-1.jpg](https://pic.leetcode-cn.com/cb45e041067f47c64c32e958cdaf7f88518a660c80ade5771d2772b00844af21-92-1.jpg)


![92-2.jpg](https://pic.leetcode-cn.com/daedbf172be2dadbd3cd89d0cac11fac9ef2afb475cc20f84f3060aab9d0b891-92-2.jpg)


**参考代码 2**：

```java
public class Solution {

    public ListNode reverseBetween(ListNode head, int m, int n) {
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
}
```

---

补充：

用于测试的结点类（这部分代码不用提交给「力扣」）。

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
```