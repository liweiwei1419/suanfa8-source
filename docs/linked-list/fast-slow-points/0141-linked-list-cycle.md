---
title: 「力扣」第 141 题：环形链表（简单）
icon: yongyan
categories: 链表
tags:
  - 链表
  - 快慢指针
---

+ 题目链接：[141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

## 题目描述

给你一个链表的头节点 `head` ，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 `pos` 是 `-1`，则在该链表中没有环。**注意：`pos` 不作为参数进行传递**，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 `true` 。 否则，返回 `false` 。

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)

```
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例 3：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

```
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

**提示：**

- 链表中节点的数目范围是 `[0, 104]`
- $-10^5 \le  Node.val \le 10^5$

- `pos` 为 `-1` 或者链表中的一个 **有效索引** 。

**进阶：**

你能用 $O(1)$（即，常量）内存解决此问题吗？

---

### 方法一：暴力解法

**参考代码 1**：

```java
public class Solution4 {

    public boolean hasCycle(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return false;
        }

        ListNode curNode = head;
        int count = 0;
        while (curNode != null) {
            curNode = curNode.next;
            if (count == 10000){
                return true;
            }
            count++;
        }
        return false;
    }
}
```

### 方法二：使用哈希表

**参考代码 2**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.HashSet;
import java.util.Set;

public class Solution2 {

    public boolean hasCycle(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return false;
        }

        Set<ListNode> hashSet = new HashSet<>();

        ListNode curNode = head;
        while (curNode != null) {
            if (hashSet.contains(curNode)) {
                return true;
            } else {
                hashSet.add(curNode);
            }
            curNode = curNode.next;
        }
        return false;
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


class Solution(object):

    # 使用哈希表的方法查重肯定是可以的，但并不推荐

    def hasCycle(self, head):
        """
        :type head: ListNode
        :rtype: bool
        """
        if head is None:
            return False
        s = set()
        point = head
        while point:
            if point in s:
                return True
            else:
                s.add(point)
            point = point.next
        return False

```
</CodeGroupItem>
</CodeGroup>






### 方法三：并查集思想

把遍历过的结点都指向一个「虚拟结点」。

**参考代码 3**：

```java
public class Solution {

    public boolean hasCycle(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return false;
        }

        ListNode dummyNode = new ListNode(-1);

        ListNode curNode = head;
        while (curNode != null) {
            ListNode nextNode = curNode.next;

            if (curNode != dummyNode) {
                curNode.next = dummyNode;
            } else {
                return true;
            }

            curNode = nextNode;
        }
        return false;
    }
}
```

### 方法四：快慢指针

+ 慢指针一次走一步、快指针一次走两步；
+ **注意**：快指针可以走的条件 `fast != null && fast.next != null`。


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public boolean hasCycle(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return false;
        }

        ListNode slow = head;
        ListNode fast = head;

        // 慢指针一次走一步、快指针一次走两步
        // 注意：快指针可以走的条件 fast != null && fast.next != null

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    // 快慢指针

    public boolean hasCycle(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return false;
        }

        ListNode slow = head;
        ListNode fast = head;

        // 慢指针一次走一步、快指针一次走两步
        // 注意：快指针可以走的条件 fast != null && fast.next != null

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
    }
}
```
</CodeGroupItem>
<CodeGroupItem title="Python">
```python
class Solution(object):

    def hasCycle(self, head):
        """
        :type head: ListNode
        :rtype: bool
        """
        if head is None or head.next is None:
            return False
    
        slow = head
        # 快指针先走一步
        fast = head.next
        while slow != fast:
            if fast is None or fast.next is None:
                return False
            slow = slow.next
            fast = fast.next.next
        return True
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution(object):

    # 这一版代码比较费解，不推荐

    def hasCycle(self, head):
        """
        :type head: ListNode
        :rtype: bool
        """
        if head is None:
            return False
        slow = head
        fast = head
        # 快指针每走一步，都做了判断
        while fast:
            fast = fast.next

            if fast:
                fast = fast.next
                slow = slow.next
            else:
                return False
            if fast == slow:
                return True
        return False
```
</CodeGroupItem>
</CodeGroup>

