---
title: LeetCode 第 295 题：数据流的中位数
date: 2019-06-11 08:00:00
author: liwei
img: https://liweiwei1419.github.io/images/leetcode-solution/295-1.png
top: false
mathjax: true
categories: leetcode 题解（新）
tags:
  - 优先队列
permalink: leetcode-solution-new/find-median-from-data-stream
---

# LeetCode 第 295 题：数据流的中位数

| 题目地址                                                     | 题解                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [LeetCode 第 295 题：数据流的中位数](https://leetcode-cn.com/problems/find-median-from-data-stream/) | [优先队列（Python、Java）](https://leetcode-cn.com/problems/find-median-from-data-stream/solution/you-xian-dui-lie-python-dai-ma-java-dai-ma-by-liwe/) |

一种最容易想到的方法是，数据流新进来一个数，都进行一次排序，这样中位数就可以很快得到。

但是这种办法好像多做了一点事情，那就是：其实我们只需要排在中间的那两个数就可以了，其它数没有必要进行 “比较” 和 “交换” 的操作。

在我们学习过的数据结构里，堆就有类似的性质，每次都从堆里得到一个 “最值” 而其它元素无需排序，这样就可以以 $O(\log N)$ 的复杂度每次都从堆中取出最值。

对于这道问题，设置两个堆就好了，只不过这两个堆，一个是小顶堆，一个大顶堆。


![LeetCode 第 295 题：数据流的中位数-1](https://liweiwei1419.github.io/images/leetcode-solution/295-1.png)

 **在任何时刻，两个堆中应该始终保持的性质如下**：

1、大顶堆的堆顶元素，小于或者等于小顶堆的堆顶元素；

2、大顶堆的元素个数或者与小顶堆的元素个数相等，或者多 $1$ 。

具体可以进行如下操作：

**第 1 种情况：** 当两个堆的元素个数之和为偶数（例如一开始的时候），我们为了让大顶堆中多 $1$ 个元素，采用这样的流程：“大顶堆” -> “小顶堆” -> “大顶堆”；

**第 2 种情况：** 当两个堆的元素个数之和为奇数，此时小顶堆必须多 $1$ 个元素，这样大顶堆和小顶堆的元素个数才相等，采用这样的流程：“大顶堆” -> “小顶堆” 即可。

**总结一下：** 无论两个堆的元素个数之和为奇数还是偶数，都得先 “大顶堆” 再 “小顶堆” ，当加入一个元素之后，元素个数为奇数的时候，再把小顶堆的堆顶元素拿给大顶堆就可以了。

**注意：** 这道题使用 Java 编码看起来思路更清晰一些，在 Python 中的堆只有小顶堆，在构造大顶堆的时候，要绕一个弯子，具体请看编码。

Java 代码：


```Java
import java.util.PriorityQueue;

public class MedianFinder {

    /**
     * 当前大顶堆和小顶堆的元素个数之和
     */
    private int count;
    private PriorityQueue<Integer> maxheap;
    private PriorityQueue<Integer> minheap;

    /**
     * initialize your data structure here.
     */
    public MedianFinder() {
        count = 0;
        maxheap = new PriorityQueue<>((x, y) -> y - x);
        minheap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        count += 1;
        maxheap.offer(num);
        minheap.add(maxheap.poll());
        // 如果两个堆合起来的元素个数是奇数，小顶堆要拿出堆顶元素给大顶堆
        if ((count & 1) != 0) {
            maxheap.add(minheap.poll());
        }
    }

    public double findMedian() {
        if ((count & 1) == 0) {
            // 如果两个堆合起来的元素个数是偶数，数据流的中位数就是各自堆顶元素的平均值
            return (double) (maxheap.peek() + minheap.peek()) / 2;
        } else {
            // 如果两个堆合起来的元素个数是奇数，数据流的中位数大顶堆的堆顶元素
            return (double) maxheap.peek();
        }
    }
}
```

Python 代码：

```Python
import heapq


class MedianFinder:

    def __init__(self):
        """
        initialize your data structure here.
        """
        # 当前大顶堆和小顶堆的元素个数之和
        self.count = 0
        self.max_heap = []
        self.min_heap = []

    def addNum(self, num: int) -> None:
        self.count += 1
        # 因为 Python 中的堆默认是小顶堆，所以要传入一个 tuple，用于比较的元素需是相反数，
        # 才能模拟出大顶堆的效果
        heapq.heappush(self.max_heap, (-num, num))
        _, max_heap_top = heapq.heappop(self.max_heap)
        heapq.heappush(self.min_heap, max_heap_top)
        if self.count & 1:
            min_heap_top = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, (-min_heap_top, min_heap_top))

    def findMedian(self) -> float:
        if self.count & 1:
            # 如果两个堆合起来的元素个数是奇数，数据流的中位数大顶堆的堆顶元素
            return self.max_heap[0][1]
        else:
            # 如果两个堆合起来的元素个数是偶数，数据流的中位数就是各自堆顶元素的平均值
            return (self.min_heap[0] + self.max_heap[0][1]) / 2

# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()
```

**复杂度分析：**

+ 时间复杂度：$O(\log N)$，优先队列的出队入队操作都是对数级别的。

+ 空间复杂度：$O(N)$，使用了三个辅助空间，其中两个堆的空间复杂度是 $O(\cfrac{N}{2})$，一个表示数据流元素个数的计数器 `count`，占用空间 $O(1)$，故空间复杂度为 $O(N)$。

---

（以下内容仅供参考，我就是这会儿比较闲才写的。）

下面给出一个使用 Python 自己造轮子写的 “大顶堆” 和 “小顶堆” 的示例代码，目的其实就是为了验证自己写的 “大顶堆” 和 “小顶堆” 是否正确，供大家参考：

Python 代码：

```Python
class MaxHeap:
    def __init__(self, capacity):
        # 我们这个版本的实现中，0 号索引是不存数据的，这一点一定要注意
        # 因为数组从索引 1 开始存放数值
        # 所以开辟 capacity + 1 这么多大小的空间
        self.data = [None for _ in range(capacity + 1)]
        # 当前堆中存储的元素的个数
        self.count = 0
        # 堆中能够存储的元素的最大数量（为简化问题，不考虑动态扩展）
        self.capacity = capacity

    def size(self):
        """
        返回最大堆中的元素的个数
        :return:
        """
        return self.count

    def is_empty(self):
        """
        返回最大堆中的元素是否为空
        :return:
        """
        return self.count == 0

    def insert(self, item):
        if self.count + 1 > self.capacity:
            raise Exception('堆的容量不够了')
        self.count += 1
        self.data[self.count] = item
        # 考虑将它上移
        self.__swim(self.count)

    def __shift_up(self, k):
        # 有索引就要考虑索引越界的情况，已经在索引 1 的位置，就没有必要上移了
        while k > 1 and self.data[k // 2] < self.data[k]:
            self.data[k // 2], self.data[k] = self.data[k], self.data[k // 2]
            k //= 2

    def __swim(self, k):
        # 上浮，与父结点进行比较
        temp = self.data[k]
        # 有索引就要考虑索引越界的情况，已经在索引 1 的位置，就没有必要上移了
        while k > 1 and self.data[k // 2] < temp:
            self.data[k] = self.data[k // 2]
            k //= 2
        self.data[k] = temp

    def extract_max(self):
        if self.count == 0:
            raise Exception('堆里没有可以取出的元素')
        ret = self.data[1]
        self.data[1], self.data[self.count] = self.data[self.count], self.data[1]
        self.count -= 1
        self.__sink(1)
        return ret

    def __shift_down(self, k):
        # 只要有左右孩子，左右孩子只要比自己大，就交换
        while 2 * k <= self.count:
            # 如果这个元素有左边的孩子
            j = 2 * k
            # 如果有右边的孩子，大于左边的孩子，就好像左边的孩子不存在一样
            if j + 1 <= self.count and self.data[j + 1] > self.data[j]:
                j = j + 1
            if self.data[k] >= self.data[j]:
                break
            self.data[k], self.data[j] = self.data[j], self.data[k]
            k = j

    def __sink(self, k):
        # 下沉
        temp = self.data[k]
        # 只要它有孩子，注意，这里的等于号是十分关键的
        while 2 * k <= self.count:
            j = 2 * k
            # 如果它有右边的孩子，并且右边的孩子大于左边的孩子
            if j + 1 <= self.count and self.data[j + 1] > self.data[j]:
                # 右边的孩子胜出，此时可以认为没有左孩子
                j += 1
            # 如果当前的元素的值，比右边的孩子节点要大，则逐渐下落的过程到此结束
            if temp >= self.data[j]:
                break
            # 否则，交换位置，继续循环
            self.data[k] = self.data[j]
            k = j
        self.data[k] = temp


class MinHeap:

    # 把最大堆实现中不等号的方向反向就可以了

    def __init__(self, capacity):
        # 因为数组从索引 1 开始存放数值
        # 所以开辟 capacity + 1 这么多大小的空间
        self.data = [0 for _ in range(capacity + 1)]
        self.count = 0
        self.capacity = capacity

    def size(self):
        return self.count

    def is_empty(self):
        return self.count == 0

    def insert(self, item):
        if self.count + 1 > self.capacity:
            raise Exception('堆的容量不够了')
        self.count += 1
        self.data[self.count] = item
        self.__swim(self.count)

    def __swim(self, k):
        # 上浮，与父节点进行比较
        temp = self.data[k]
        while k > 1 and self.data[k // 2] > temp:
            self.data[k] = self.data[k // 2]
            k //= 2
        self.data[k] = temp

    def extract_min(self):
        if self.count == 0:
            raise Exception('堆里没有可以取出的元素')
        ret = self.data[1]
        self.data[1] = self.data[self.count]
        self.count -= 1
        self.__sink(1)
        return ret

    def __sink(self, k):
        # 下沉
        temp = self.data[k]
        while 2 * k <= self.count:
            j = 2 * k
            if j + 1 <= self.count and self.data[j + 1] < self.data[j]:
                j += 1
            if temp <= self.data[j]:
                break
            self.data[k] = self.data[j]
            k = j
        self.data[k] = temp


class MedianFinder:

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.max_heap = MaxHeap(10000)
        self.min_heap = MinHeap(10000)

    def addNum(self, num: 'int') -> 'None':
        # 大顶堆先进一个元素
        self.max_heap.insert(num);
        # 然后从大顶堆里出一个元素到小顶堆
        self.min_heap.insert(self.max_heap.extract_max())
        if self.max_heap.size() < self.min_heap.size():
            # 如果大顶堆的元素少于小顶堆
            # 就要从小顶堆出一个元素到大顶堆
            self.max_heap.insert(self.min_heap.extract_min())

    def findMedian(self) -> 'float':
        if self.max_heap.size() == self.min_heap.size():
            return (self.max_heap.data[1] + self.min_heap.data[1]) / 2
        else:
            return self.max_heap.data[1]

        


# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()
```





---



### 「力扣」第 23 题：合并K个排序链表

Python3 代码：

```python
class Solution:
    def mergeKLists(self, lists):
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

思路2：分治。**还可以采用归并排序的分治思想来解决，代码结构和归并排序可以说是同出一辙。**

1、先一分为二地解决了这个问题；

2、再考虑如何合并，这个合并的过程也是一个递归方法。 

Python 代码：

```python
class Solution:
    def mergeKLists(self, lists):
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