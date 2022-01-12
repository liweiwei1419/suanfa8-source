---
title: 「力扣」第 82 题：删除排序链表中的重复元素 II（中等）
icon: yongyan
category: 链表
tags:
  - 链表
---

- 题目链接：[82. 删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)。

## 题目描述

存在一个按升序排列的链表，给你这个链表的头节点 `head` ，请你删除链表中所有存在数字重复情况的节点，只保留原始链表中 **没有重复出现** 的数字。

返回同样按升序排列的结果链表。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/04/linkedlist1.jpg)

```
输入：head = [1,2,3,3,4,4,5]
输出：[1,2,5]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/01/04/linkedlist2.jpg)

```
输入：head = [1,1,1,2,3]
输出：[2,3]
```

**提示：**

- 链表中节点数目在范围 `[0, 300]` 内
- `-100 <= Node.val <= 100`
- 题目数据保证链表已经按升序排列

## 方法：穿针引线

**参考代码**：

关键：要两个两个一起判断。

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public ListNode deleteDuplicates(ListNode head) {
        if (head == null) {
            return null;
        }
        // 只要涉及头结点的操作，设置虚拟头结点避免对链表第 1 个结点的分类讨论
        ListNode dummyNode = new ListNode(-1);
        dummyNode.next = head;
        ListNode curNode = dummyNode;
        while (curNode.next != null && curNode.next.next != null) {
            // 如果接连两个结点的 val 相等，至少要把它们都删掉
            if (curNode.next.val == curNode.next.next.val) {
                // 要删除的起点至少应该是当前判断相同的结点的第 2 个
                ListNode delNode = curNode.next.next;
                // 如果后面还有相同的结点，delNode 后移一位，即 delNode 应该是指向相同的结点的最后一个
                while (delNode.next != null && delNode.next.val == delNode.val) {
                    delNode = delNode.next;
                }
                curNode.next = delNode.next;
                delNode.next = null;
            } else {
                curNode = curNode.next;
            }
        }
        return dummyNode.next;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public ListNode deleteDuplicates(ListNode head) {
        if (head == null) {
            return null;
        }

        // 这里我们要清楚，例如 1 1 2 3 ,头结点也是有可能被删除的，所以要设置虚拟头结点
        // 只要涉及头结点的操作，我们都设立虚拟头结点
        ListNode dummyNode = new ListNode(-1);
        dummyNode.next = head;

        ListNode curNode = dummyNode;
        // 题目要求的删除结点这个操作是站在被删除结点前面的
        // 所以循环可以继续的条件应该这样写
        while (curNode.next != null && curNode.next.next != null) {
            // 如果接连两个结点的 val 相等，至少要把它们都删掉
            if (curNode.next.val == curNode.next.next.val) {
                // 要删除的起点至少应该是当前判断相同的结点的第 2 个
                ListNode delNode = curNode.next.next;
                // 如果后面还有相同的结点，delNode 后移一位，即 delNode 应该是指向相同的结点的最后一个
                // 注意：这里得用循环，例如： 1 2 2 2 2 2 2 2 2 3 3 3
                // 得让 delNode 结点挪到最后一个 2 上
                while (delNode.next != null && delNode.next.val == delNode.val) {
                    delNode = delNode.next;
                }

                // 接下来把有重复的链表段删除就可以了
                // 1        2   2   2         3
                // curNode          delNode
                curNode.next = delNode.next;
                delNode.next = null;
            } else {
                // 否则向前走一步
                curNode = curNode.next;
            }
        }
        return dummyNode.next;
    }
}
````

</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def deleteDuplicates(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """

        if head is None or head.next is None:
            return head

        dummy = ListNode(-1)
        dummy.next = head
        cur = dummy

        while cur.next and cur.next.next:
            if cur.next.val == cur.next.next.val:
                # 继续往后看，有没有相等的元素
                # del_node 至少删掉它
                del_node = cur.next.next
                while del_node.next and del_node.val == del_node.next.val:
                    del_node = del_node.next
                # 开始删除操作
                cur.next = del_node.next
                del_node.next = None
            else:
                cur = cur.next
        return dummy.next

````
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
````

用于测试的主方法（这部分代码不用提交给「力扣」）。

```java
public static void main(String[] args) {
    int[] nums = {1, 1, 1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 8, 8, 9};
    ListNode head = new ListNode(nums);
    Solution solution = new Solution();
    ListNode deleteDuplicates = solution.deleteDuplicates(head);
    System.out.println(deleteDuplicates);
}
```
