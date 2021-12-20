---
title: 「力扣」第 876 题：链表的中间结点（简单）
icon: yongyan
categories: 链表
tags:
  - 链表
---

+ 中文地址：[「力扣」第 876 题：链表的中间结点（简单）](https://leetcode-cn.com/problems/middle-of-the-linked-list/)；
+ 题解地址：[快慢指针（Python 代码、Java 代码）](https://leetcode-cn.com/problems/middle-of-the-linked-list/solution/kuai-man-zhi-zhen-zhu-yao-zai-yu-diao-shi-by-liwei/)。

## 题目描述

给定一个带有头结点 head 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。



示例 1：

输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
示例 2：

输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。


提示：

给定链表的结点数介于 1 和 100 之间。

### 方法：快慢指针（Python 代码、Java 代码）

使用快慢指针是求单链表中间结点，以及 [倒数第 k 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/) 的常用方法。

题目要求：如果有两个中间结点，则返回第二个中间结点。此时快指针可以前进的条件是：当前快指针和当前快指针的下一个结点都非空。

+ 如果题目要求：如果有两个中间结点，则返回第一个中间结点，此时快指针可以前进的条件是：当前快指针的下一个结点和当前快指针的下下一个结点都非空。

注意体会以上二者的不同之处，其实画一个图就很清楚了。

![876-1.png](https://pic.leetcode-cn.com/2b7a4130111600cf615b5584b3cc7f863d289a9a7d43b90147c79f51f68a5aa6-876-1.png)
![876-2.png](https://pic.leetcode-cn.com/5c3f88cc6b312b7193a6e071cef93ec5eb3070005af23cad22a11e10ea0aca3e-876-2.png)

**参考代码**：

Java 代码：

```Java []
class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }
}

public class Solution {

    public ListNode middleNode(ListNode head) {
        if (head == null) {
            return null;
        }
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}
```

Python 代码：

```Python []
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def middleNode(self, head: ListNode) -> ListNode:
        if head is None:
            return None

        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow
```

