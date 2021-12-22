---
title: 「力扣」第 147 题：对链表进行插入排序（中等）
icon: yongyan
categories: 链表
tags:
  - 链表
---


+ 中文网址：[147. 对链表进行插入排序](https://leetcode-cn.com/problems/insertion-sort-list/description/) 。
+ 题解地址：[穿针引线](https://leetcode-cn.com/problems/insertion-sort-list/solution/chuan-zhen-yin-xian-by-liweiwei1419-2/)。

## 题目描述

对链表进行插入排序。

![img](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif)

插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。
每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。



插入排序算法：

1. 插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
2. 每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
3. 重复直到所有输入数据插入完为止。

示例 1：

```
输入: 4->2->1->3
输出: 1->2->3->4
```

示例 2：

```
输入: -1->5->3->4->0
输出: -1->0->3->4->5
```

## 思路分析

这道题的题意我们感觉有那么些误导我们的意思，我们能想到从头开始找结点应该插入的位置，但感觉这种做法又不像插入排序。解决这个问题不要太死板，不要怕麻烦我觉得是解这道问题的关键（这句话感觉跟没说一个样，^_^）。

1. 插入排序每次会将遍历到的一个元素插入到已经排序的部分；
2. 熟悉插入排序的朋友们都知道，这种插入过程是从后向前的，但是对于单链表来说，只保存了当前结点到下一个结点的 next 指针，并没有保存从当前结点到上一个节点的 pre 指针；
3. 我们就要变换思路了，每次都要从链表的第 1 个元素开始，找到新遍历的节点适合插入的位置，进行穿针引线；
4. 具体来说对于单链表的第 1 个元素，涉及到头结点的操作的时候，我们的做法往往是设计一个虚拟头结点，以简化编码。
   综上所述，想清楚上面的问题，写出正确的代码应该不是难事。

为一个链表实现插入排序。

![LeetCode 第 147 题：单链表的插入排序-1](https://liweiwei1419.gitee.io/images/leetcode-solution/147-1.jpg)

![LeetCode 第 147 题：单链表的插入排序-2](https://liweiwei1419.gitee.io/images/leetcode-solution/147-2.jpg)


**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">

```java
public class Solution {

    public ListNode insertionSortList(ListNode head) {
        ListNode dummyNode = new ListNode(-1);

        ListNode curNode = head;
        while (curNode != null) {
            // 第 1 步：先把下一个结点存一下，下一次遍历就从 nextNode 开始
            ListNode nextNode = curNode.next;

            // 第 2 步：需要找到要插入的位置的前一个结点的位置，这需要从前向后找，这一点非常不一样
            // 每一次 preNode 都得从头开始
            ListNode preNode = dummyNode;

            // 因为有 preNode.next ，所以应该先判断非空
            while (preNode.next != null && preNode.next.val < curNode.val) {
                // 严格小于就可以了，没有必要移到小于等于的最后一个，不用保证稳定性
                preNode = preNode.next;
            }
            // 退出循环的时候，preNode.next.val >= curNode.val
            // 第 3 步：穿针引线
            curNode.next = preNode.next;
            preNode.next = curNode;

            // 第 4 步：循环变量更新
            curNode = nextNode;
        }
        return dummyNode.next;
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public ListNode insertionSortList(ListNode head) {
        // 先写最特殊的情况
        if (head == null) {
            return null;
        }
        ListNode dummyNode = new ListNode(-1);
        dummyNode.next = head;
        ListNode curNode = head;
        ListNode pre;
        ListNode next;
        while (true) {
            // 如果遍历下去，是顺序排列的话，那最简单了，curNode 指针向前就行了
            // 这一步是一个循环的过程
            // 暂存当前结点的下一结点
            while (curNode.next != null && curNode.val <= curNode.next.val) {
                curNode = curNode.next;
            }
            // 下面针对上一步跳出循环的两个条件进行特殊处理
            if (curNode.next == null) {
                // 如果后面没有元素了，那就说明，此时链表已经有序，可以结束我们的排序逻辑了
                break;
            } else {
                // 否则就一定满足 curNode.val > curNode.next.val; 为真
                // pre 打回到起点
                pre = dummyNode;
                next = curNode.next;
                // 把 pre 挪到可以放置 next 结点的上一个位置
                while (pre.next.val < next.val) {
                    pre = pre.next;
                }
                // 穿针引线的 3 个步骤，请见图 https://liweiwei1419.github.io/images/leetcode-solution/147-1.jpg
                // 穿针引线步骤 1
                curNode.next = next.next;
                // 穿针引线步骤 2
                next.next = pre.next;
                // 穿针引线步骤 2
                pre.next = next;
            }
        }
        return dummyNode.next;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public ListNode insertionSortList(ListNode head) {
        if (head == null) {
            return null;
        }
        // 虚拟头结点
        ListNode dummyNode = new ListNode(-1);
        ListNode preNode = dummyNode;
        // 用于遍历的指针
        ListNode curNode = head;
        ListNode next = null;
        // 没有这一步：dummyNode.next = head;
        while (curNode != null) {
            next = curNode.next;
            // 这一步是找到一个正确的位置插入，只要比 curNode 的值小，都应该跳过
            // 直到遇到第 1 个大于等于它的元素
            while (preNode.next != null && preNode.next.val < curNode.val) {
                preNode = preNode.next;
            }
            // 应该把 node 放在 pre 的下一个
            curNode.next = preNode.next;
            preNode.next = curNode;
            preNode = dummyNode;
            curNode = next;
        }
        return dummyNode.next;
    }
}
```
</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

+ 时间复杂度： $O(N^2)$ ，这里 $N$ 表示链表结点的个数，对于每个结点找合适位置时，最多需要遍历 $O(N)$ 次；
+ 空间复杂度：$O(1)$。




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
            s.append(cur.val + " -> ");
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
    int[] nums = new int[]{3, 7, 9, 10, 8};
    ListNode head = new ListNode(nums);
    Solution3 solution3 = new Solution3();
    ListNode insertionSortList = solution3.insertionSortList(head);
    System.out.println(insertionSortList);
}
```





