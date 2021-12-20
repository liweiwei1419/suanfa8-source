---
title: 「力扣」第 24 题：两两交换链表中的结点（中等）
icon: yongyan
categories: 链表
tags:
  - 链表
  - 递归
---

+ 题目链接：[24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/description/) ；
+ 题解链接：[穿针引线、递归](https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/chuan-zhen-yin-xian-di-gui-by-liweiwei1419-2/)。

## 题目描述

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。



**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg)

```
输入：head = [1,2,3,4]
输出：[2,1,4,3]
```

**示例 2：**

```
输入：head = []
输出：[]
```

**示例 3：**

```
输入：head = [1]
输出：[1]
```

 **提示：**

- 链表中节点的数目在范围 `[0, 100]` 内
- `0 <= Node.val <= 100`

---

单链表的问题，画图帮助分析是非常关键的。

这种问题一般有两种解法：

1. 递归：递归的时候紧扣递归函数的语义，一般来说不是很难；

2. 非递归，即「穿针引线」。这里建议一定要画图，否则不太好想。

这道题因为涉及第 1 个结点的操作，为了避免分类讨论，我们引入虚拟头结点（这是套路了）。


### 方法一：穿针引线

![image.png](https://pic.leetcode-cn.com/d106387437a1ef4e598b3e660a1fdff4922060d4e544007e9327c3ef72b017bf-image.png)


**参考代码 1**：

```Java []
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

    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        // 这里设置 dummyNode 是为了处理头结点的特殊情况
        // 使得头结点和非头结点可以统一处理
        ListNode dummyNode = new ListNode(-1);
        dummyNode.next = head;
        ListNode curNode = dummyNode;

        while (curNode.next != null && curNode.next.next != null) {
            // 重新初始化 p1 和 p2
            ListNode p1 = curNode.next;
            ListNode p2 = p1.next;

            // "穿针引线"的步骤就 3 步
            p1.next = p2.next;
            p2.next = p1;
            curNode.next = p2;

            // 循环变量更新
            curNode = p1;
        }
        return dummyNode.next;
    }

    public static void main(String[] args) {
        // 给定 1->2->3->4, 你应该返回 2->1->4->3.
        int[] nums = {1, 2, 3, 4, 5};
        ListNode head = new ListNode(nums);
        Solution solution = new Solution();
        ListNode swapPairs = solution.swapPairs(head);
        System.out.println(swapPairs);
    }
}
```



如果你觉得穿针引线很麻烦，不妨尝试使用递归来做。因为在递归的过程中，系统栈会帮我们记录一些信息，所以要简单一些。

### 方法二：递归

**参考代码 2**：

```Java []
public class Solution {

    public ListNode swapPairs(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return head;
        }

        // 没有必要设置虚拟头结点了
        ListNode p1 = head;
        ListNode p2 = head.next;

        p1.next = swapPairs(p2.next);
        p2.next = p1;
        return p2;
    }
}
```