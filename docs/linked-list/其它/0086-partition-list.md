---
title: 「力扣」第 86 题：分隔链表（中等）
date: 2017-08-10 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 6：链表
tags:
  - 单链表
permalink: leetcode-algo/0086-partition-list
---

## 「力扣」第 86 题：分隔链表（中等）

+ 英文网址：[86. Partition List](https://leetcode.com/problems/partition-list/description/) ；
+ 中文网址：[86. 分隔链表](https://leetcode-cn.com/problems/partition-list/description/)。

链接：https://leetcode-cn.com/problems/partition-list

> 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。
>
> 你应当保留两个分区中每个节点的初始相对位置。
>
> 示例：
>
> ```
> 输入: head = 1->4->3->2->5->2, x = 3
> 输出: 1->2->2->4->3->5
> ```
>



思路：分别拿两个虚拟头结点，最后拼在一起。

![image-20191204142152454](/Users/liwei/Library/Application Support/typora-user-images/image-20191204142152454.png)Java 代码：

```java
class ListNode {
    int val;
    ListNode next;

    // 空间复杂度为常数的解法：穿针引线

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

    // 空间复杂度为常数的解法：穿针引线

    public ListNode partition(ListNode head, int x) {
        // 比 x 小的虚拟头结点
        ListNode dummyNodeL = new ListNode(-1);
        // 大于等于 x 的虚拟头结点
        ListNode dummyNodeR = new ListNode(-1);
        // 用于遍历
        ListNode curL = dummyNodeL;
        // 用于遍历
        ListNode curR = dummyNodeR;
        int val;
        while (head != null) {
            val = head.val;
            // 接在 L 的后面
            if (val < x) {
                curL.next = head;
                curL = curL.next;
            } else {
                // 接在 R 的后面
                curR.next = new ListNode(val);
                curR = curR.next;
            }
            head = head.next;
        }
        curL.next = dummyNodeR.next;
        // 特别注意：最后这一步不能忘记，否则会产生一个循环链表
        curR.next = null;
        return dummyNodeL.next;
    }

    public static void main(String[] args) {
        int[] nums = {1, 4, 3, 2, 5, 2};
        int x = 3;
        ListNode head = new ListNode(nums);
        Solution solution = new Solution();
        System.out.println("分隔链表之后：");
        ListNode partition = solution2.partition(head, x);
        System.out.println(partition);
    }
}
```

Python 代码：（反例）

```python
# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution(object):

    # 不是穿针引线，缺点：partition 的时候复制了结点

    def partition(self, head, x):
        """
        :type head: ListNode
        :type x: int
        :rtype: ListNode
        """

        dummy_node_l = ListNode(-1)
        dummy_node_r = ListNode(-1)

        cur_l = dummy_node_l
        cur_r = dummy_node_r

        while head is not None:
            val = head.val

            if val < x:
                cur_l.next = ListNode(val)
                cur_l = cur_l.next
            else:
                cur_r.next = ListNode(val)
                cur_r = cur_r.next

            head = head.next
        # 把较小的链表接在较大的链表后面，这一步容易忘记
        cur_l.next = dummy_node_r.next
        return dummy_node_l.next
```
