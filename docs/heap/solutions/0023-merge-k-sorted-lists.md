---
title: 「力扣」第 23 题：合并 K 个排序链表
icon: yongyan
category: 优先队列
tags:
  - 优先队列
---

+ 题目链接：[23. 合并K个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)；
+ 题解链接：[贪心算法、优先队列 + 分治法（Python 代码、Java 代码）](https://leetcode-cn.com/problems/merge-k-sorted-lists/solution/tan-xin-suan-fa-you-xian-dui-lie-fen-zhi-fa-python/)

## 题目描述

给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。

**示例 1：**

```
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
```

**示例 2：**

```
输入：lists = []
输出：[]
```

**示例 3：**

```
输入：lists = [[]]
输出：[]
```

 **提示：**

- `k == lists.length`
- `0 <= k <= 10^4`
- `0 <= lists[i].length <= 500`
- `-10^4 <= lists[i][j] <= 10^4`
- `lists[i]` 按 **升序** 排列
- `lists[i].length` 的总和不超过 `10^4`


## 思路分析

## 方法：优先队列

这是一道类似于教科书上例题的问题。这里我们举生活中的例子来理解求解思路，其实一点都不难。

假设有如下生活情境：假设你是一名体育老师，有 3 个班的学生，他们已经按照身高从矮到高排好成了 3 列纵队，现在要把这 3 个班的学生也按照身高从矮到高排列一列纵队。

我们可以这么做：

1. 让 3 个班的学生按列站在你的面前，这时你能看到站在队首的学生的全身，其余同学只能看到比前面同学脑袋高出的那部分；

2. 每一次队首的 3 名同学，请出最矮的同学出列到“队伍4”（即我们最终认为排好序的队列），出列的这一列的后一名同学向前走一步；

3. 重复第 2 步，直到 3 个班的同学全部出列完毕。

Python2 代码：

注意：以下代码在 Python2 中可以通过，Python3 中的 heapq 不支持传入自定义对象，不过可以绕一个弯子，把索引号传进去就可以了

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.Comparator;
import java.util.PriorityQueue;

public class Solution {

    public ListNode mergeKLists(ListNode[] lists) {
        int len = lists.length;
        if (len == 0) {
            return null;
        }

        PriorityQueue<ListNode> minHeap = new PriorityQueue<>(len, Comparator.comparingInt(o -> o.val));
        for (ListNode head : lists) {
            if (head != null) {
                minHeap.offer(head);
            }
        }

        ListNode dummyNode = new ListNode(-1);
        ListNode curNode = dummyNode;
        while (!minHeap.isEmpty()) {
            // 注意：这里我们选择的操作是先从优先队列里拿出最小的元素，然后再添加
            // 事实上，如果优先队列有提供 replace 操作，应该优先选择 replace
            ListNode top = minHeap.poll();
            curNode.next = top;

            curNode = curNode.next;

            if (top.next != null) {
                minHeap.offer(top.next);
            }
        }
        return dummyNode.next;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution:
    def mergeKLists(self, lists):
        """
        :type lists: List[ListNode]
        :rtype: ListNode
        """
        import heapq
        l = []
        size = len(lists)

        for index in range(size):
            if lists[index]:
                heapq.heappush(l, (lists[index].val, index))

        dummy_node = ListNode(-1)
        cur = dummy_node

        while l:
            _, index = heapq.heappop(l)

            head = lists[index]

            cur.next = head
            cur = cur.next
            if head.next:
                heapq.heappush(l, (head.next.val, index))
                lists[index] = head.next
                head.next = None

        return dummy_node.next
```
</CodeGroupItem>
<CodeGroupItem title="Python2">
```python
class Solution:
    def mergeKLists(self, lists):
        """
        :type lists: List[ListNode]
        :rtype: ListNode
        """
        import heapq
        l = []
        for head in lists:
            if head:
                heapq.heappush(l, (head.val, head))
        dummy_node = ListNode(-1)
        cur = dummy_node

        while l:
            _, head = heapq.heappop(l)
            cur.next = head
            cur = cur.next
            if head.next:
                heapq.heappush(l, (head.next.val, head.next))

        return dummy_node.next
```
</CodeGroupItem>
</CodeGroup>



