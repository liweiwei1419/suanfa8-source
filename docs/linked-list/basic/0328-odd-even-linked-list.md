---
title: 「力扣」第 328 题：奇偶链表（中等）
icon: yongyan
categories: 链表
tags:
  - 链表
---

+ 中文网址：[328. 奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list/description/)；
+ 英文网址：[328. Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/description/)。

## 题目描述

给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。

请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

示例 1:

```
输入: 1->2->3->4->5->NULL
输出: 1->3->5->2->4->NULL
```


示例 2:

```
输入: 2->1->3->5->6->4->7->NULL 
输出: 2->3->6->7->1->5->4->NULL
```


说明：

+ 应当保持奇数节点和偶数节点的相对顺序。
+ 链表的第一个节点视为奇数节点，第二个节点视为偶数节点，以此类推。

---

思路：题目要求**原地算法**完成，那么就一定得「穿针引线」了。

- 方法1：可以使用 [LeetCode 第 86 题题解思路 2 ](https://liweiwei1419.github.io/leetcode-solution/leetcode-0086-partition-list/)完成。
- 方法2：同样使用两个指针，一次跳过一个节点完成“穿针引线”，特别注意要一些边界情况的判断。

![LeetCode 第 328 题：奇数（Odd）偶数（Even）链表](https://liweiwei1419.github.io/images/leetcode-solution/328-1.jpg)

Python 代码：

```python
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def oddEvenList(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """

        if head is None or head.next is None:
            return head

        # odd 奇数
        odd_head = head
        even_head = head.next

        odd_cur = odd_head
        even_cur = even_head

        while even_cur and even_cur.next:
            odd_cur.next = odd_cur.next.next
            even_cur.next = even_cur.next.next

            odd_cur = odd_cur.next
            even_cur = even_cur.next

        odd_cur.next = even_head
        return odd_head
```

我还写过一个题解在[这里](https://liweiwei1419.github.io/leetcode-solution/leetcode-0328-odd-even-linked-list/)，可以参考一下。