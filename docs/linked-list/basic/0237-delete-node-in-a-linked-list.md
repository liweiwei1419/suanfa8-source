---
title: 「力扣」第 237 题：删除链表中的节点（简单）
icon: yongyan
category: 链表
tags:
  - 链表
  - 递归
---

+ 题目链接：[237. 删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/description/) 。

## 题目描述

请编写一个函数，用于 **删除单链表中某个特定节点** 。在设计函数时需要注意，你无法访问链表的头节点 `head` ，只能直接访问 **要被删除的节点** 。

题目数据保证需要删除的节点 **不是末尾节点** 。



**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/09/01/node1.jpg)

```
输入：head = [4,5,1,9], node = 5
输出：[4,1,9]
解释：指定链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2020/09/01/node2.jpg)

```
输入：head = [4,5,1,9], node = 1
输出：[4,5,9]
解释：指定链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9
```

**示例 3：**

```
输入：head = [1,2,3,4], node = 3
输出：[1,2,4]
```

**示例 4：**

```
输入：head = [0,1], node = 0
输出：[1]
```

**示例 5：**

```
输入：head = [-3,5,-99], node = -3
输出：[5,-99]
```

 

**提示：**

- 链表中节点的数目范围是 `[2, 1000]`
- `-1000 <= Node.val <= 1000`
- 链表中每个节点的值都是唯一的
- 需要删除的节点 `node` 是 **链表中的一个有效节点** ，且 **不是末尾节点**

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public void deleteNode(ListNode node) {
        // 第 1 步：把待删除结点的下一结点的值赋值给自己
        ListNode nextNode = node.next;
        node.val = nextNode.val;

        // 第 2 步：删除下一个结点
        node.next = nextNode.next;
        nextNode.next = null;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    /**
     * 这道题理解题意是关键，题目要求的是删除这个节点
     *
     * @param node
     */
    public void deleteNode(ListNode node) {
        if (node == null) {
            return;
        }

        if (node.next == null) {
            node = null;
            return;
        }
        ListNode deleteNode = node.next;
        node.val = deleteNode.val;
        node.next = deleteNode.next;
        deleteNode = null;
    }
}
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

    ListNode(Integer[] nums) {
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
        s.append("NULL");
        return s.toString();
    }
}
```


用于测试的主方法（这部分代码不用提交给「力扣」）。

```java
public static void main(String[] args) {
    ListNode node1 = new ListNode(0);
    ListNode node2 = new ListNode(1);
    node1.next = node2;
    Solution solution = new Solution();
    solution.deleteNode(node1);
}
```

