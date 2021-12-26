---
title: 「优先队列」专题 4：典型问题
date: 2017-10-04 08:00:00
author: liwei
top: false
mathjax: true
categories: 专题 10：优先队列
tags:
  - 队列
  - 优先队列
permalink: leetcode-solution/priority-queue
---

## 「优先队列」专题 4：典型问题


### 例题：「力扣」第 347 题：前K个高频元素

+ 链接：[347. 前K个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)。

> 给定一个非空的整数数组，返回其中出现频率前 **k** 高的元素。
>
> **示例 1:**
>
> ```
> 输入: nums = [1,1,1,2,2,3], k = 2
> 输出: [1,2]
> ```
>
> **示例 2:**
>
> ```
> 输入: nums = [1], k = 1
> 输出: [1]
> ```
>
> **说明：**
>
> - 你可以假设给定的 *k* 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
> - 你的算法的时间复杂度**必须**优于 O(*n* log *n*) , *n* 是数组的大小。

分析：“**你的算法的时间复杂度必须优于** **O(n log n) , n 是数组的大小**”。这是题目对我们的要求，我们很容易想到的一种思路是将 counter 以后的数据对 value 进行排序，但即使是最好的排序算法，时间复杂度也是 $O(n \log n)$，换言之，题目限制了我们不能使用排序算法。那么，对于前 k 这样的问题，一个很自然的思路就是使用优先队列，想到这一点，这道问题就是一个常规问题了。

Python 代码：

```python
class Solution:
    def topKFrequent(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: List[int]
        """
        import heapq
        import collections

        # 堆有序数组
        l = []

        wordcount = collections.defaultdict(int)
        for num in nums:
            wordcount[num] += 1

        for key, val in wordcount.items():
            heapq.heappush(l, (-val, key))
        res = []
        for _ in range(k):
            _, key = heapq.heappop(l)
            res.append(key)
        return res
```

### 「力扣」第 23 题：合并 K 个排序链表

传送门：[23. 合并K个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)。

>合并 *k* 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
>
>**示例:**
>
>```
>输入:
>[
>  1->4->5,
>  1->3->4,
>  2->6
>]
>输出: 1->1->2->3->4->4->5->6
>```

### 方法一：贪心算法（使用优先队列）

这是一道类似于教科书上例题的问题。这里我们举生活中的例子来理解求解思路，其实一点都不难。

假设有如下生活情境：假设你是一名体育老师，**有** **3** **个班的学生，他们已经按照身高从矮到高排好成了** **3** **列纵队**，现在要把这 3 个班的学生也按照身高从矮到高排列一列纵队。

我们可以这么做：

1、让 3 个班的学生按列站在你的面前，这时你能看到站在队首的学生的全身，其余同学只能看到比前面同学脑袋高出的那部分；

2、每一次队首的 3 名同学，请出最矮的同学出列到“队伍4”（即我们最终认为排好序的队列），出列的这一列的后一名同学向前走一步；

3、重复第 2 步，直到 3 个班的同学全部出列完毕。

Python2 代码：

注意：以下代码在 Python2 中可以通过，Python3 中的 heapq 不支持传入自定义对象，不过可以绕一个弯子，把索引号传进去就可以了

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

Python3 代码：

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

### 方法二：分治算法

**还可以采用归并排序的分治思想来解决，代码结构和归并排序可以说是同出一辙。**

1、先一分为二地解决了这个问题；

2、再考虑如何合并，这个合并的过程也是一个递归方法。 

Python 代码：

```python
class Solution:
    def mergeKLists(self, lists):
        """
        :type lists: List[ListNode]
        :rtype: ListNode
        """

        size = len(lists)
        if size == 0:
            return None
        return self.__merge_k_lists(lists, 0, size - 1)

    def __merge_k_lists(self, lists, left, right):
        if left >= right:
            return lists[left]
        mid = left + (right - left) // 2
        listnode1 = self.__merge_k_lists(lists, left, mid)
        listnode2 = self.__merge_k_lists(lists, mid + 1, right)
        return self.__merge_two_sorted_list_node(listnode1, listnode2)

    def __merge_two_sorted_list_node(self, list1, list2):
        if list1 is None:
            return list2
        if list2 is None:
            return list1

        if list1.val < list2.val:
            list1.next = self.__merge_two_sorted_list_node(list1.next, list2)
            return list1
        else:
            list2.next = self.__merge_two_sorted_list_node(list1, list2.next)
            return list2
```

（本节完）



