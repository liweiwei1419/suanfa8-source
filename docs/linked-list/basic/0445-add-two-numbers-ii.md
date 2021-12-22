---
title: 「力扣」第 445 题：两数相加 II（中等）
icon: yongyan
categories: 链表
tags:
  - 链表
  - 递归
---

+ 题目地址：[445. 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/description/) ；
+ 题解地址：[两个栈、使用头插法生成结果链表](https://leetcode-cn.com/problems/add-two-numbers-ii/solution/liang-ge-zhan-shi-yong-tou-cha-fa-sheng-cheng-jie-/)。

## 题目描述

给你两个 **非空** 链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

你可以假设除了数字 0 之外，这两个数字都不会以零开头。

**示例1：**

![img](https://pic.leetcode-cn.com/1626420025-fZfzMX-image.png)



```
输入：l1 = [7,2,4,3], l2 = [5,6,4]
输出：[7,8,0,7]
```

**示例2：**

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[8,0,7]
```

**示例3：**

```
输入：l1 = [0], l2 = [0]
输出：[0]
```

 

**提示：**

- 链表的长度范围为` [1, 100]`
- `0 <= node.val <= 9`
- 输入数据保证链表代表的数字无前导 0

查考知识点：在链表的头结点插入新结点。

**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
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
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
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
</CodeGroupItem>
</CodeGroup>



补充：

用于测试的结点类（这部分代码不用提交给「力扣」）。

```java
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


```

