---
title: 「力扣」第 206 题：反转链表（简单）
icon: yongyan
category: 链表
tags:
  - 链表
  - 递归
---

- 题目链接：[206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)；
- 题解链接：[穿针引线 + 递归（Java）](https://leetcode-cn.com/problems/reverse-linked-list/solution/chuan-zhen-yin-xian-di-gui-by-liweiwei1419/)。

## 题目描述

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

```
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

```
输入：head = [1,2]
输出：[2,1]
```

**示例 3：**

```
输入：head = []
输出：[]
```

**提示：**

- 链表中节点的数目范围是 `[0, 5000]`
- `-5000 <= Node.val <= 5000`

**进阶：** 链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？

## 方法一：穿针引线

![206-1.jpg](https://pic.leetcode-cn.com/2e044f2ccb55bbbe3ef599eb580e4197fa5f06fb3ee7aabbe0d3a3bd20473514-206-1.jpg)

很常规的一道问题，关键在于画图分析。

- 在画图的过程中，我们就可以分析出完成翻转链表这件事情，一共要用 3 个指针 `pre`、`cur`、`next`；

- 当前遍历的 `cur` 指针是一定有的；
- 当前结点的 `next` 结点要指到它前一个结点，所以 `pre` 也必须有；
- 迭代要继续下去，`cur` 结点的下一个结点也得使用一个指针 `next` 保存一下，其中 `next` 可以在 `cur` 确定以后初始化。
- 画图分析 `next` 指针的指向，我们注意到我们分析出来的指针指向的先后顺序，通常跟数组的元素交换操作一样，程序写出来是“头尾相连”的；
- 最后一定不要忘记，返回的是 `pre` 节点。

::: danger 「穿针引线」法一般有 2 个步骤

- 步骤 1：更新结点的 `next` 指针的指向；
- 步骤 2：更新循环变量，通常在循环一开始的时候，会预先保存下一轮要更新的结点，在循环结束的时候，直接赋值为这些变量即可。
  :::

**参考代码 1**：

```java
public class Solution {
    public ListNode reverseList(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return head;
        }

        // 初始化上一个指针
        ListNode pre = null;
        // 初始化当前指针
        ListNode cur = head;
        ListNode next;
        while (cur != null) {
            // 第 1 步：先把下一轮的循环变量保存一下，为了第 3 步方便
            next = cur.next;
            // 第 2 步：实现当前节点的 next 指针的反转
            cur.next = pre;
            // 第 3 步：更新下一轮迭代的循环变量
            pre = cur;
            cur = next;
        }
        // 遍历完成以后，原来的最后一个节点就成为了 pre
        // 这个 pre 就是反转以后的新的链表的头指针
        return pre;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N)$，仅仅遍历了一次链表；
- 空间复杂度：$O(1)$，仅仅遍历了一次链表，这里只使用了有限个的“指针”，帮助我们完成了链表的反转操作。

如果你觉得「穿针引线」麻烦，还可以交给「递归」来完成这件事情。

## 方法二：递归

**参考代码 2**：

```java
public class Solution {

    public ListNode reverseList(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return head;
        }

        ListNode nextNode = head.next;
        ListNode newHead = reverseList(nextNode);
        nextNode.next = head;
        head.next = null;
        return newHead;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N)$，仅仅遍历了一次链表；
- 空间复杂度：$O(N)$，递归需要消耗递归栈。

---

补充：

用于测试的结点类（这部分代码不用提交给「力扣」）。

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
            s.append(cur.val);
            s.append(" -> ");
            cur = cur.next;
        }
        s.append("NULL");
        return s.toString();
    }
}
```
