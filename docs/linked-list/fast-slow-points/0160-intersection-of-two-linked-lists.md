---
title: 「力扣」第 160 题：相交链表（简单）
icon: yongyan
categories: 链表
tags:
  - 链表
  - 快慢指针
---

+ 题目链接：https://leetcode-cn.com/problems/intersection-of-two-linked-lists

## 题目描述

编写一个程序，找到两个单链表相交的起始节点。

如下面的两个链表**：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_statement.png)

在节点 c1 开始相交。



**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_1.png)

```
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Reference of the node with value = 8
输入解释：相交节点的值为 8 （注意，如果两个列表相交则不能为 0）。从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_2.png)





**示例 3：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/14/160_example_3.png)

```
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：null
输入解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
解释：这两个链表不相交，因此返回 null。
```

**注意：**

+ 如果两个链表没有交点，返回 null.
+ 在返回结果后，两个链表仍须保持原有的结构。
+ 可假定整个链表结构中没有循环。
+ 程序尽量满足 $O(n)$ 时间复杂度，且仅用 $O(1)$ 内存。

---

这一节我们再来看一个比较常见的问题：相交链表。这道题是力扣上第 160 号问题，要我们编写一个程序，找到两个单链表相交的起始节点。

### 方法一：使用哈希表（空间复杂度不符合要求）

Java 代码：

```java
import java.util.HashSet;
import java.util.Set;

public class Solution {

    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        Set<ListNode> hashSet = new HashSet<>();

        ListNode curNode = headA;
        while (curNode != null) {
            hashSet.add(curNode);
            curNode = curNode.next;
        }

        curNode = headB;
        while (curNode != null) {
            if(hashSet.contains(curNode)){
                return curNode;
            }
            curNode = curNode.next;
        }
        return null;
    }
}
```

### 方法二 ：需要先遍历得到两个链表的长度

Java 代码：

```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
        next = null;
    }
}

public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        // 特判
        if (headA == null || headB == null) {
            return null;
        }

        int aLen = getLenOfListNode(headA);
        int bLen = getLenOfListNode(headB);

        // 总是让 A 链表是短链表
        if (aLen > bLen) {
            ListNode temp = headA;
            headA = headB;
            headB = temp;
        }

        // 注意：这里要取绝对值
        int distance = Math.abs(aLen - bLen);
        for (int i = 0; i < distance; i++) {
            headB = headB.next;
        }

        while (headA != headB) {
            headA = headA.next;
            headB = headB.next;
        }
        return headA;
    }

    private int getLenOfListNode(ListNode head) {
        int len = 0;
        while (head != null) {
            head = head.next;
            len++;
        }
        return len;
    }
}
```

### 方法三：让 A、B 链表等长

Java 代码：

```java
public class Solution {

    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        // 特判
        if (headA == null || headB == null) {
            return null;
        }

        ListNode head1 = headA;
        ListNode head2 = headB;

        while (head1 != head2) {
            if (head1 != null) {
                head1 = head1.next;
            } else {
                head1 = headB;
            }

            if (head2 != null) {
                head2 = head2.next;
            } else {
                head2 = headA;
            }
        }
        return head1;
    }
}
```

