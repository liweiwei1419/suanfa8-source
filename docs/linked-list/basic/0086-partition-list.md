---
title: 「力扣」第 86 题：分隔链表（中等）
icon: yongyan
category: 链表
tags:
  - 链表
---

+ 题目链接：[86. 分隔链表](https://leetcode-cn.com/problems/partition-list/description/)。

## 题目描述

给你一个链表的头节点 `head` 和一个特定值 `x` ，请你对链表进行分隔，使得所有 **小于** `x` 的节点都出现在 **大于或等于** `x` 的节点之前。

你应当 **保留** 两个分区中每个节点的初始相对位置。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/04/partition.jpg)

```
输入：head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5]
```

**示例 2：**

```
输入：head = [2,1], x = 2
输出：[1,2]
```

**提示：**

- 链表中节点的数目在范围 `[0, 200]` 内
- `-100 <= Node.val <= 100`
- `-200 <= x <= 200`

## 思路分析

分别拿两个虚拟头结点，最后拼在一起。空间复杂度为 $O(1)$ 的解法：穿针引线。

**参考代码**：

```java
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
}
```

下面给一个反例，Python 代码：

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


---

补充：

用于测试的结点类（这部分代码不用提交给「力扣」）。

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
```


用于测试的主方法（这部分代码不用提交给「力扣」）。

```java
public static void main(String[] args) {
    int[] nums = {1, 4, 3, 2, 5, 2};
    int x = 3;
    ListNode head = new ListNode(nums);
    Solution solution = new Solution();
    System.out.println("分隔链表之后：");
    ListNode partition = solution2.partition(head, x);
    System.out.println(partition);
}
```
