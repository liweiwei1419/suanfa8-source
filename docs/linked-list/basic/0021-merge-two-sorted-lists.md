---
title: 「力扣」第 21 题：合并两个有序链表（简单）
icon: yongyan
categories: 链表
tags:
  - 链表
  - 递归
---

+ 中文网址：[21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/description/) ；
+ 题解地址：[穿针引线（Java 代码）](https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/chuan-zhen-yin-xian-java-dai-ma-by-liweiwei1419/)。

## 题目描述

将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

```
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

**示例 2：**

```
输入：l1 = [], l2 = []
输出：[]
```

**示例 3：**

```
输入：l1 = [], l2 = [0]
输出：[0]
```

**提示：**

- 两个链表的节点数目范围是 `[0, 50]`
- `-100 <= Node.val <= 100`
- `l1` 和 `l2` 均按 **非递减顺序** 排列

## 思路分析

掌握以下两种方法：

1、穿针引线（非递归）；

2、递归。

### 方法一：穿针引线（非递归）

![image.png](https://pic.leetcode-cn.com/12b00e35459dc32405363e0f641653b5e926b7be94cfd063bd3b10943f3b84d1-image.png)

![image.png](https://pic.leetcode-cn.com/ffba6fb487a62746149227b81ff6e948f13b96e7cfdb77a50d0fc80c59f750a6-image.png)

**参考代码 1**：


```Java []
public class Solution {

    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummyNode = new ListNode(-1);
        ListNode p1 = l1;
        ListNode p2 = l2;
        ListNode curNode = dummyNode;
        // 两者都不为空的时候，才有必要进行比较
        while (p1 != null && p2 != null) {
            if (p1.val < p2.val) {
                // 指针修改发生在这里
                curNode.next = p1;
                p1 = p1.next;
            } else {
                // 指针修改发生在这里
                curNode.next = p2;
                p2 = p2.next;
            }
            curNode = curNode.next;
        }
        // 跳出循环是因为 p1 == null 或者 p2 == null
        if (p1 == null) {
            curNode.next = p2;
        }
        if (p2 == null) {
            curNode.next = p1;
        }
        return dummyNode.next;
    }
}
```

**复杂度分析：**

+ 时间复杂度：$O(N)$，这里 $N$ 为两个链表的结点个数之和；
+ 空间复杂度：$O(1)$，这里需要的指针和辅助结点的个数都是常数。

### 方法二：递归

**参考代码 2**：

```java
public class Solution {

    /**
     * 使用递归
     *
     * @param l1 有序链表
     * @param l2 有序链表
     * @return 有序链表
     */
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) {
            return l2;
        }
        if (l2 == null) {
            return l1;
        }
        if (l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }

}
```

**复杂度分析：**

+ 时间复杂度：$O(N)$，这里 $N$ 为两个链表的结点个数之和；
+ 空间复杂度：$O(N)$，递归调用栈的深度为 $N$。

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

用于测试的主方法（这部分代码不用提交给「力扣」）。

```java
public static void main(String[] args) {
    int[] nums1 = {1, 3, 5, 7};
    int[] nums2 = {2, 4, 6};

    ListNode l1 = new ListNode(nums1);
    ListNode l2 = new ListNode(nums2);

    Solution solution = new Solution();
    ListNode mergeTwoLists = solution.mergeTwoLists(l1, l2);
    System.out.println(mergeTwoLists);
}
```

