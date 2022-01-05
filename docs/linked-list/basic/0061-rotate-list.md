---
title: 「力扣」第 61 题：旋转链表（中等）
icon: yongyan
category: 链表
tags:
  - 链表
---

+ 题目链接：[61. 旋转链表](https://leetcode-cn.com/problems/rotate-list/)；
+ 题解链接：[穿针引线](https://leetcode-cn.com/problems/rotate-list/solution/chuan-zhen-yin-xian-by-liweiwei1419/)。

## 题目描述

给你一个链表的头节点 `head` ，旋转链表，将链表每个节点向右移动 `k` 个位置。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg)



```
输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/11/13/roate2.jpg)



```
输入：head = [0,1,2], k = 4
输出：[2,0,1]
```

 **提示：**

- 链表中节点的数目在范围 `[0, 500]` 内
- `-100 <= Node.val <= 100`
- $0 \le k \le 2 * 10^9$

## 思路分析

问题本身不难，但是要处理一些细节。

1. 一定要先求出链表的总长度；


2. 求得总长度的时候，顺便标记好末尾结点，并且把末尾结点的 next 指针指到头结点去，形成环，否则容易出现空指针异常；

3. 到底多少 `pre` 指针还要走多少步，举 1 到 2 个具体的例子带进去就知道了。

关键：画图分析穿针引线的步骤。这道题的难度定为「简单」会更合适一点。

![image.png](https://pic.leetcode-cn.com/0d3f7795cfae2afa8d4145f66216ba837f72ca08d86ecbc010ad1ae9e66696c2-image.png)

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
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
            s.append(cur.val ).append(" -> ");
            cur = cur.next;
        }
        s.append("NULL");
        return s.toString();
    }
}


// 关键在于边界条件的讨论，和代码调试

public class Solution {

    public ListNode rotateRight(ListNode head, int k) {
        // 特判
        if (head == null || head.next == null || k == 0) {
            return head;
        }

        // 第 1 步：先要知道链表有多少个结点
        int n = 1;
        ListNode fastNode = head;
        while (fastNode.next != null) {
            fastNode = fastNode.next;
            n++;
        }
        // 此时 fastNode 到末尾结点

        k = k % n;
        if (k == 0) {
            return head;
        }
        // 第 2 步：找到倒数第 k 个结点，走 n - k - 1 步
        ListNode slowNode = head;
        for (int i = 0; i < n - k - 1; i++) {
            slowNode = slowNode.next;
        }

        // 第 3 步：穿针引线
        ListNode newHead = slowNode.next;
        // 先把尾部接到开头
        fastNode.next = head;
        // 再切断原来的连接
        slowNode.next = null;
        return newHead;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        # 特判
        if head is None or head.next is None or k <= 0:
            return head

        # 先看链表有多少元素
        node = head
        # 先数这个链表的长度
        counter = 1
        while node.next:
            node = node.next
            counter += 1

        k = k % counter
        if k == 0:
            return head

        node.next = head
        node = head
        # 可以取一些极端的例子找到规律
        # counter - k - 1
        for _ in range(counter - k - 1):
            node = node.next
        new_head = node.next
        node.next = None
        return new_head
```
</CodeGroupItem>
</CodeGroup>







