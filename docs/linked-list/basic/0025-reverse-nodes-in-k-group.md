---
title: 「力扣」第 25 题：K 个一组翻转链表（困难）
icon: yongyan
category: 链表
tags:
  - 链表
  - 递归
---

+ 题目链接：[25. k个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/description/)；
+ 英文链接：[25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/description/)。

## 题目描述

给你一个链表，每 *k* 个节点一组进行翻转，请你返回翻转后的链表。

*k* 是一个正整数，它的值小于或等于链表的长度。

如果节点总数不是 *k* 的整数倍，那么请将最后剩余的节点保持原有顺序。

**进阶：**

- 你可以设计一个只使用常数额外空间的算法来解决此问题吗？
- **你不能只是单纯的改变节点内部的值**，而是需要实际进行节点交换。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg)



```
输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]
```

**示例 2：**

```
输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]
```

**示例 3：**

```
输入：head = [1,2,3,4,5], k = 1
输出：[1,2,3,4,5]
```

**示例 4：**

```
输入：head = [1], k = 1
输出：[1]
```

**提示：**

- 列表中节点的数量在范围 `sz` 内
- `1 <= sz <= 5000`
- `0 <= Node.val <= 1000`
- `1 <= k <= sz`


::: warning 说明
因时间和精力关系，本题没有写详解，只给出了参考代码。读者可以在「力扣」这道题的评论区和题解区找到适合自己的思路分析和代码。如果确实需要我编写具体的解题思路，可以发邮件到 liweiwei1419@gmail.com。
:::

**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        // 使用递归写法的话，先考虑特殊情况
        if (head == null || head.next == null || k <= 1) {
            return head;
        }
        // 探测长度的结点
        ListNode tempNode = head;
        int curK = k;
        while (tempNode != null && curK != 0) {
            curK--;
            tempNode = tempNode.next;
        }

        if (curK == 0) {
            // 下面开始反转
            ListNode pre = null;
            ListNode curNode = head;
            for (int i = 0; i < k; i++) {
                ListNode nextNode = curNode.next;
                curNode.next = pre;
                pre = curNode;
                curNode = nextNode;
            }
            head.next = reverseKGroup(tempNode, k);
            return pre;
        }
        return head;
    }
}
```
</CodeGroupItem>

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
            s.append(cur.val + " -> ");
            cur = cur.next;
        }
        s.append("NULL");
        return s.toString();
    }
}

// 参考资料：https://blog.csdn.net/weiyongle1996/article/details/78473055

public class Solution {

    public ListNode reverseKGroup(ListNode head, int k) {
        // 使用递归写法的话，先考虑特殊情况
        if (head == null || head.next == null || k <= 1) {
            return head;
        }
        // 探测长度的结点
        ListNode tempNode = head;
        int curK = k;
        while (tempNode != null && curK != 0) {
            curK--;
            tempNode = tempNode.next;
        }
        // 如果够数了，先考虑反转
        if (curK == 0) {
            // 下面开始反转
            ListNode pre = null;
            ListNode curNode = head;
            for (int i = 0; i < k; i++) {
                ListNode nextNode = curNode.next;
                curNode.next = pre;
                pre = curNode;
                curNode = nextNode;
            }
            head.next = reverseKGroup(tempNode, k);
            return pre;
        }
        return head;
    }

    public static void main(String[] args) {
        int[] nums = new int[]{1, 2};
        ListNode head = new ListNode(nums);
        Solution solution = new Solution();
        ListNode reverseKGroup = solution.reverseKGroup(head, 2);
        System.out.println(reverseKGroup);
    }
}
```
</CodeGroupItem>
</CodeGroup>











