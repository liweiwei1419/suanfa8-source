---
title: 「力扣」第 19 题：删除链表的倒数第 N 个节点（中等）
icon: yongyan
category: 链表
tags:
  - 链表
  - 快慢指针
---


+ 题目链接：[19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)；
+ 题解链接：[快慢指针](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/solution/kuai-man-zhi-zhen-by-liweiwei1419/)。

## 题目描述

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**示例 2：**

```
输入：head = [1], n = 1
输出：[]
```

**示例 3：**

```
输入：head = [1,2], n = 1
输出：[1]
```

 

**提示：**

- 链表中结点的数目为 `sz`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

**进阶：**你能尝试使用一趟扫描实现吗？

## 思路分析

重点：1、设置虚拟头结点；2、快慢指针。

## 方法一：先数出有多少个结点，然后走 `len - n` 步

**参考代码**：

```java
public class Solution {

    public ListNode removeNthFromEnd(ListNode head, int n) {
        int len = getLenOfNode(head);

        // 删除索引为 len - n 的结点
        // 有了虚拟头结点以后，就走 len - n 步，来到要删除的结点之前
        ListNode dummyNode = new ListNode(-1);
        dummyNode.next = head;
        ListNode curNode = dummyNode;
        for (int i = 0; i < len - n; i++) {
            curNode = curNode.next;
        }

        ListNode deleteNode = curNode.next;
        curNode.next = deleteNode.next;
        deleteNode.next = null;
        return dummyNode.next;
    }

    private int getLenOfNode(ListNode head) {
        int len = 0;
        while (head != null) {
            len++;
            head = head.next;
        }
        return len;
    }
}
```

## 方法二：快慢指针

其实只要掌握了如何找到距离末尾 $n$ 个元素的位置，就很容易了。还要注意的就是边界值的选取，其实往往我们认为的值与正确值无非就是 $+1$ 或者 $-1$ ，为了避免粗心出错，我们可以拿一个具体的例子。另外，涉及链表头结点的操作，一般都会引入虚拟结点，以减少讨论的可能，这是一个常见的技巧。

![image-20191019123938705](https://tva1.sinaimg.cn/large/006y8mN6gy1g83eo97mocj310y0d60tk.jpg)

![image-20191019123954924](https://tva1.sinaimg.cn/large/006y8mN6gy1g83eoivq2gj30vz0u0acd.jpg)

**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    /**
     * 快慢指针：给定的 n 保证是有效的。
     *
     * @param head
     * @param n
     * @return
     */
    public ListNode removeNthFromEnd(ListNode head, int n) {

        ListNode dummyNode = new ListNode(-1);
        dummyNode.next = head;

        // 来到倒数第 N + 1 个结点的位置
        ListNode fastNode = dummyNode;
        for (int i = 0; i < n + 1; i++) {
            fastNode = fastNode.next;
        }

        ListNode slowNode = dummyNode;
        while (fastNode != null) {
            fastNode = fastNode.next;
            slowNode = slowNode.next;
        }

        // 此时 slowNode 来到了待删除的结点的上一个结点
        ListNode deleteNode = slowNode.next;
        slowNode.next = deleteNode.next;
        deleteNode.next = null;
        return dummyNode.next;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution(object):
    def findKthToTail(self, pListHead, k):
        if pListHead is None:
            return None
        fast = pListHead
        # 要注意的临界点1：
        for _ in range(k - 1):
            fast = fast.next
            if fast is None:
                return None
        slow = pListHead
        # 要注意的临界点2：
        while fast.next:
            slow = slow.next
            fast = fast.next
        return slow
```
</CodeGroupItem>
</CodeGroup>