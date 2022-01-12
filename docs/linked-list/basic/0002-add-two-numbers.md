---
title: 「力扣」第 2 题：两个数相加（中等）
icon: yongyan
category: 链表
tags:
  - 链表
---

- 题目链接：[2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/description/)；
- 题解链接：[穿针引线](https://leetcode-cn.com/problems/add-two-numbers/solution/chuan-zhen-yin-xian-by-liweiwei1419-3/)。

## 题目描述

给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg)

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```

**示例 2：**

```
输入：l1 = [0], l2 = [0]
输出：[0]
```

**示例 3：**

```
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```

**提示：**

- 每个链表中的节点数在范围 `[1, 100]` 内
- `0 <= Node.val <= 9`
- 题目数据保证列表表示的数字不含前导零

---

编码不难，注意体会以下两种写法的区别。

考查知识点：

1、虚拟结点的设置；

2、穿针引线；

3、链表调试。

### 方法一：在两个链表的结点都到达末尾时结束遍历

**参考代码 1**：

```Java []
class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }

    public ListNode(int[] nums) {
        this.val = nums[0];
        ListNode curNode = this;
        for (int i = 1; i < nums.length; i++) {
            curNode.next = new ListNode(nums[i]);
            curNode = curNode.next;
        }
    }

    @Override
    public String toString() {
        ListNode curNode = this;
        StringBuilder stringBuilder = new StringBuilder();
        while (curNode != null) {
            stringBuilder.append(curNode.val);
            stringBuilder.append(" -> ");
            curNode = curNode.next;
        }
        stringBuilder.append("NULL");
        return stringBuilder.toString();
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

        ListNode dummyNode = new ListNode(-1);
        ListNode curNode = dummyNode;

        // carry 是进位的意思，一开始不进位
        int carry = 0;

        // 注意：这里是或者
        while (l1 != null || l2 != null) {
            if (l1 != null) {
                carry += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                carry += l2.val;
                l2 = l2.next;
            }
            curNode.next = new ListNode(carry % 10);
            carry /= 10;
            curNode = curNode.next;
        }
        if (carry == 1) {
            curNode.next = new ListNode(1);
        }
        return dummyNode.next;
    }
}
```

### 方法二：在两个链表的结点其中有一个到达末尾时结束遍历

**参考代码 2**：

```Java []
public class Solution {

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // 特判
        if (l1 == null) {
            return l2;
        }
        if (l2 == null) {
            return l1;
        }

        ListNode dummyNode = new ListNode(-1);
        ListNode curNode = dummyNode;

        int carry = 0;
        // 注意：这里是并且
        while (l1 != null && l2 != null) {
            int val = l1.val + l2.val + carry;
            curNode.next = new ListNode(val % 10);
            carry = val / 10;
            curNode = curNode.next;
            l1 = l1.next;
            l2 = l2.next;
        }

        if (l1 == null) {
            curNode.next = l2;
        } else {
            curNode.next = l1;
        }

        if (carry == 1) {
            curNode.next = new ListNode(1);
        }
        return dummyNode.next;
    }
}
```

---

## 思路分析

需要考虑的问题：

1. 数字中是否有前置的 $0$（除了 $0$ 以外，没有前置的 $0$）；
2. 负数是否考虑。

::: danger 提示
题目最后的「提示」已经给出了答案，如果面试的时候，数据范围不确定的时候，一定要和面试官确认清楚。

不同的数据范围决定了采用的不同的方法。
:::

编码过程中需要思考的问题：

1. 如何分别获得这个数组的个位、十位、百位、千位；
2. 分别相加，如果大于 $10$，进一。

## 方法：穿针引线

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">

```java
public class Solution {

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // 特殊判断
        if (l1 == null) {
            return l2;
        }
        if (l2 == null) {
            return l1;
        }
        ListNode dummyNode = new ListNode(-1);
        ListNode curNode = dummyNode;
        int sum = 0;
        while (l1 != null || l2 != null) {
            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }
            curNode.next = new ListNode(sum % 10);
            sum /= 10;
            curNode = curNode.next;
        }
        if (sum == 1) {
            curNode.next = new ListNode(1);
        }
        return dummyNode.next;
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummyNode = new ListNode(-1);
        ListNode curNode = dummyNode;
        int carry = 0;
        while (l1 != null && l2 != null) {
            int val = l1.val + l2.val + carry;
            curNode.next = new ListNode(val % 10);
            carry = val / 10;
            curNode = curNode.next;
            l1 = l1.next;
            l2 = l2.next;
        }

        if (l1 == null) {
            curNode.next = l2;
        } else {
            curNode.next = l1;
        }

        if (carry == 1) {
            curNode.next = new ListNode(1);
        }
        return dummyNode.next;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        if l1 is None:
            return l2

        if l2 is None:
            return l1

        dummy_node = ListNode(-1)
        cur_node = dummy_node
        s = 0

        # 只要二者之一非空，就加下去
        while l1 or l2:
            if l1:
                s += l1.val
                l1 = l1.next
            if l2:
                s += l2.val
                l2 = l2.next
            cur_node.next = ListNode(s % 10)
            s //= 10
            cur_node = cur_node.next
        if s == 1:
            cur_node.next = ListNode(1)
        return dummy_node.next
````

</CodeGroupItem>
</CodeGroup>

---

补充：

用于测试的结点类（这部分代码不用提交给「力扣」）。

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
        this.val = nums[0];
        ListNode curNode = this;
        for (int i = 1; i < nums.length; i++) {
            curNode.next = new ListNode(nums[i]);
            curNode = curNode.next;
        }
    }

    @Override
    public String toString() {
        ListNode curNode = this;
        StringBuilder stringBuilder = new StringBuilder();
        while (curNode != null) {
            stringBuilder.append(curNode.val);
            stringBuilder.append(" -> ");
            curNode = curNode.next;
        }
        stringBuilder.append("NULL");
        return stringBuilder.toString();
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None
````

</CodeGroupItem>
</CodeGroup>

用于测试的主方法（这部分代码不用提交给「力扣」）。

```java
public static void main(String[] args) {
    int[] nums1 = new int[]{5};
    int[] nums2 = new int[]{5};
    ListNode l1 = new ListNode(nums1);
    ListNode l2 = new ListNode(nums2);
    Solution solution = new Solution();
    ListNode addTwoNumbers = solution.addTwoNumbers(l1, l2);
    System.out.println(addTwoNumbers);
}
```
