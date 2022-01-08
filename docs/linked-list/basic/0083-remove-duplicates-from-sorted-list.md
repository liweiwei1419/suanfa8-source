---
title: 「力扣」第 83 题：删除排序链表中的重复元素（简单）
icon: yongyan
category: 链表
tags:
  - 链表
---

+ 题目链接：[删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list)。

## 题目描述

存在一个按升序排列的链表，给你这个链表的头节点 `head` ，请你删除所有重复的元素，使每个元素 **只出现一次** 。

返回同样按升序排列的结果链表。



**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/04/list1.jpg)

```
输入：head = [1,1,2]
输出：[1,2]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/01/04/list2.jpg)





```
输入：head = [1,1,2,3,3]
输出：[1,2,3]
```



**提示：**

- 链表中节点数目在范围 `[0, 300]` 内
- `-100 <= Node.val <= 100`
- 题目数据保证链表已经按升序排列

## 方法一：穿针引线

```
// 我觉得就是细心一点，把穿针引线的细节考虑到
// 因为第 1 个结点不会被删除，因此，不用设置虚拟结点
// 1 -> 1 -> 1 -> 1 -> 2
// cur  del       del
```

**参考代码**：



<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public ListNode deleteDuplicates(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode cur = head;
        while (cur.next != null) {
            if (cur.next.val == cur.val) {
                ListNode deleteNode = cur.next;
                cur.next = deleteNode.next;
                deleteNode.next = null;
            } else {
                cur = cur.next;
            }
        }
        return head;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None

# 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
# 【判断的条件是"下一个结点"】


class Solution(object):
    def deleteDuplicates(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        # 先判断极端条件
        if head is None or head.next is None:
            return head
        cur = head
        while cur.next:
            next = cur.next
            if next.val == cur.val:
                # q 向后挪动一位
                cur.next = next.next
                next.next = None
            else:
                cur = cur.next
        return head
```
</CodeGroupItem>
</CodeGroup>

## 方法二：依旧是穿针引线（用于参考、留作备份）

**思路**：有序链表，相同元素最多保留 $1$ 个。

**参考代码 2**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public ListNode deleteDuplicates(ListNode head) {
        ListNode curNode = head;
        // 当前和下一个结点都非空的时候才删除
        while (curNode != null && curNode.next != null) {
            // 值相同的时候考虑删除
            if (curNode.val == curNode.next.val) {
                ListNode deleteNode = curNode.next;
                // 看看是否还可以删除
                while (deleteNode.next != null && deleteNode.val == deleteNode.next.val) {
                    deleteNode = deleteNode.next;
                }
                // 穿针引线
                curNode.next = deleteNode.next;
                deleteNode.next = null;
            } else {
                curNode = curNode.next;
            }
        }
        return head;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None

# 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
# 【判断的条件是"下一个结点"】


class Solution(object):
    def deleteDuplicates(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        # 先判断极端条件
        if head is None or head.next is None:
            return head
        cur = head
        while cur.next:
            next = cur.next
            if next.val == cur.val:
                # q 向后挪动一位
                cur.next = next.next
                next.next = None
            else:
                cur = cur.next
        return head
```
</CodeGroupItem>
</CodeGroup>

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

    ListNode(int[] nums) {
        ListNode currNode = this;
        currNode.val = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currNode.next = new ListNode(nums[i]);
            currNode = currNode.next;
        }
    }

    @Override
    public String toString() {
        ListNode currNode = this;
        StringBuilder s = new StringBuilder();
        while (currNode != null) {
            s.append(currNode.val);
            s.append(" -> ");
            currNode = currNode.next;
        }
        // 最后添加一个 NULL 标志表示添加到末尾了
        s.append("NULL");
        return s.toString();
    }
}
```



