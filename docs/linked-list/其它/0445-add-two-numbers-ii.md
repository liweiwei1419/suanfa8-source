---
title: 「力扣」第 445 题：两数相加 II（中等）
date: 2017-08-25 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 6：链表
tags:
  - 单链表
permalink: leetcode-algo/0445-add-two-numbers-ii
---

## 「力扣」第 445 题：两数相加 II（中等）

+ 英文网址：[445. Add Two Numbers II](https://leetcode.com/problems/add-two-numbers-ii/description/)  ；
+ 中文网址：[445. 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/description/) ；

+ [题解地址](https://leetcode-cn.com/problems/add-two-numbers-ii/solution/liang-ge-zhan-shi-yong-tou-cha-fa-sheng-cheng-jie-/)

> 给定两个**非空**链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储单个数字。将这两数相加会返回一个新的链表。
>
> 你可以假设除了数字 0 之外，这两个数字都不会以零开头。
>
> **进阶:**如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。
>
> **示例**：
>
> ```
> 输入: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
> 输出: 7 -> 8 -> 0 -> 7
> ```
>


查考知识点：在链表的头结点插入新结点。

**参考代码**：

Java 代码：

```Java []
import java.util.Stack;

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

public class Solution {

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // 特判
        if (l1 == null) {
            return l2;
        }
        if (l2 == null) {
            return l1;
        }

        // 为了保证从低位开始计算，因此使用两个栈
        Stack<Integer> stack1 = new Stack<>();
        Stack<Integer> stack2 = new Stack<>();

        while (l1 != null) {
            stack1.push(l1.val);
            l1 = l1.next;
        }
        while (l2 != null) {
            stack2.push(l2.val);
            l2 = l2.next;
        }

        ListNode nextNode = null;
        ListNode curNode;

        int carry = 0;
        while (!stack1.empty() || !stack2.empty()) {
            if (!stack1.empty()) {
                carry += stack1.pop();
            }
            if (!stack2.empty()) {
                carry += stack2.pop();
            }

            // 头插法
            curNode = new ListNode(carry % 10);
            curNode.next = nextNode;
            nextNode = curNode;
            carry /= 10;
        }
        if (carry == 1) {
            ListNode head = new ListNode(carry);
            head.next = nextNode;
            return head;
        }
        return nextNode;
    }
}
```

参考资料：

反转以后，再相加。

Java 代码：

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

/**
 * pre cur next
 */
public class Solution {

    private ListNode reverseListNode(ListNode head) {
        ListNode pre = null;
        ListNode cur = head;
        ListNode next;
        while (cur != null) {
            next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        return pre;
    }

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode rL1 = reverseListNode(l1);
        ListNode rL2 = reverseListNode(l2);

        ListNode dummyNode = new ListNode(-1);
        ListNode curr = dummyNode;
        int sum = 0;
        while (rL1 != null || rL2 != null) {
            if (rL1 != null) {
                sum += rL1.val;
                rL1 = rL1.next;
            }
            if (rL2 != null) {
                sum += rL2.val;
                rL2 = rL2.next;
            }
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
            sum /= 10;
        }
        if (sum == 1) {
            curr.next = new ListNode(1);
        }
        return reverseListNode(dummyNode.next);
    }
}
```

比较不好理解的写法：

```java
public class Solution {

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Stack<Integer> stack1 = new Stack<>();
        Stack<Integer> stack2 = new Stack<>();
        ListNode p1 = l1;
        ListNode p2 = l2;
        while (p1 != null) {
            stack1.push(p1.val);
            p1 = p1.next;
        }
        while (p2 != null) {
            stack2.push(p2.val);
            p2 = p2.next;
        }
        ListNode cur = new ListNode(0);
        ListNode head;
        int sum = 0;
        while (!stack1.isEmpty() || !stack2.isEmpty()) {
            if (!stack1.isEmpty()) {
                sum += stack1.pop();
            }
            if (!stack2.isEmpty()) {
                sum += stack2.pop();
            }
            cur.val = sum % 10;
            // 下一个节点存的值是：是否进位
            head = new ListNode(sum / 10);
            head.next = cur;
            cur = head;
            sum /= 10;
        }
        return cur.val == 0 ? cur.next : cur;
    }
}
```

思路：需要考虑的问题是如果不允许修改输入的链表该怎么办；使用一个辅助的数据结构来完成。

Python 代码：

```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        stack1 = []
        stack2 = []
        p1 = l1
        p2 = l2
        while p1:
            stack1.append(p1.val)
            p1 = p1.next
        while p2:
            stack2.append(p2.val)
            p2 = p2.next
        res = []
        s = 0
        while stack1 or stack2:
            if stack1:
                s += stack1.pop()
            if stack2:
                s += stack2.pop()
            res.append(s % 10)
            s //= 10
        if s == 1:
            res.append(1)
        head = ListNode(res.pop())
        cur_node = head
        while len(res):
            cur_node.next = ListNode(res.pop())
            cur_node = cur_node.next
        return head
```





