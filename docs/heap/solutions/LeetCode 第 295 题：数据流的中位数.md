---
title:  LeetCode 第 295 题：数据流的中位数
date: 2018-05-15 08:00:00
author: liwei
top: false
mathjax: true
categories: leetcode 题解
tags:
  - 优先队列
permalink: leetcode-solution/find-the-duplicate-number
---


# LeetCode 第 295 题：数据流的中位数

标签（空格分隔）： 堆

---

传送门：[295. 数据流的中位数](https://leetcode-cn.com/problems/find-median-from-data-stream/)。

同《剑指 Offer》（第 2 版）第 41 题：数据流中的中位数。

> 中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。
>
> 例如，
>
> [2,3,4] 的中位数是 3
>
> [2,3] 的中位数是 (2 + 3) / 2 = 2.5
>
> 设计一个支持以下两种操作的数据结构：
>
> - void addNum(int num) - 从数据流中添加一个整数到数据结构中。
> - double findMedian() - 返回目前所有元素的中位数。
>
> **示例：**
>
> ```
> addNum(1)
> addNum(2)
> findMedian() -> 1.5
> addNum(3) 
> findMedian() -> 2
> ```
>
> **进阶:**
>
> 1. 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
> 2. 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？

---

分析：

![image-20190122162732419](https://ws4.sinaimg.cn/large/006tNc79ly1fzfg26sln4j30wu0huq5b.jpg)


借助两个堆，任何时刻，两个堆中应该始终保持的性质：

1、小顶堆中最小的元素，都不会小于大顶堆中的元素；

2、小顶堆的元素数目或者与大顶堆的元素数组相等，或者多 $1$ 。

因此，我们可以针对当前元素的个数进行分类讨论：

1、当前元素个数为偶数的时候，比如一开始的时候，读入一个元素（最终应该是小顶堆中多一个元素），此时元素个数是奇数，我们应该返回小顶堆中的堆顶元素；

如何保持性质：因为最终应该是小顶堆中多一个元素，所以先经过大顶堆，然后再到小顶堆。

2、当前元素个数为奇数的时候，此时再读入一个元素（最终应该是大顶堆中多一个元素），元素个数是偶数，我们应该返回大顶堆中的堆顶元素和小顶堆中的堆顶元素的平均数。

如何保持性质：因为最终应该是大顶堆中多一个元素，所以先经过小顶堆，然后再到大顶堆。

注意：Python 中的 heap 只有小顶堆，在构造大顶堆的时候，要绕一个弯子，把相反数 push 进去，pop 出来的时候也要取相反数。


Python 代码：第 1 版
```python
import heapq


class Solution:

    def __init__(self):
        self.min_heap = []
        self.max_heap = []
        self.count = 0

    def insert(self, num):
        """
        :type num: int
        :rtype: void
        """
        self.count += 1
        if self.count % 2 == 1:
            heapq.heappush(self.max_heap, -num)
            temp = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, temp)
        else:
            heapq.heappush(self.min_heap, num)
            temp = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, -temp)

        # print(self.min_heap)
        # print(self.max_heap)

    def getMedian(self):
        """
        :rtype: float
        """
        if self.count % 2 == 1:
            return self.min_heap[0]
        else:
            return (self.min_heap[0] + (-self.max_heap[0])) / 2


if __name__ == '__main__':
    solution = Solution()
    solution.insert(1)
    result = solution.getMedian()
    print(result)
    solution.insert(2)
    result = solution.getMedian()
    print(result)

    solution.insert(3)
    result = solution.getMedian()
    print(result)

    solution.insert(4)
    result = solution.getMedian()
    print(result)
```

说明：这版代码的问题是，有分支。这两个分支其实我们可以合并。

1、奇数偶数的判断可以使用位运算：count & 1 == 1 可以判断 count 是不是奇数；

2、上面的代码写得有一些烦琐，我们注意到，反正小顶堆中的元素一定 >= 大顶堆中的元素，我们可以把顺序统一一下，如果当前是奇数的话，新来的一个数，先进入小顶堆，然后小顶堆中出一个数再进入大顶堆，这样小顶堆和大顶堆元素数目就一样了。那如果当前是偶数，最终效果是小顶堆多一个元素，还按照刚刚那个流程，我们从大顶堆再拿一个元素放回小顶堆就可以了。


> 这里要介绍一个计算机处理多分支问题的思路：
> 1、先随机（任意）找一个分支运行下去，同时再判断应该走哪个分支；
> 2、如果之前随便走的那个分支是对的，那没问题；
> 3、如果之前走的那个分支是错的，再运行那个正确的分支。

于是，我们可以再写一版代码：

Python 代码：

```python
import heapq


class Solution:

    def __init__(self):
        self.min_heap = []
        self.max_heap = []
        self.count = 0

    def insert(self, num):
        """
        :type num: int
        :rtype: void
        """
        # 当前是奇数的时候，直接"最小堆" -> "最大堆"，就可以了
        # 此时"最小堆" 与 "最大堆" 的元素数组是相等的

        # 当前是偶数的时候，"最小堆" -> "最大堆"以后，最终我们要让"最小堆"多一个元素
        # 所以应该让 "最大堆" 拿出一个元素给 "最小堆"

        heapq.heappush(self.min_heap, num)
        temp = heapq.heappop(self.min_heap)
        heapq.heappush(self.max_heap, -temp)
        if self.count & 1 == 0:
            temp = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, temp)
        self.count += 1
        # print(self.min_heap)
        # print(self.max_heap)

    def getMedian(self):
        """
        :rtype: float
        """
        if self.count & 1 == 1:
            return self.min_heap[0]
        else:
            return (self.min_heap[0] + (-self.max_heap[0])) / 2
```

总结：1、小顶堆的值都大于或者等于大顶堆的值；

2、具体的操作可以是：先进入一个元素个数保持不变的堆，再从这个堆里出一个元素。

如果语言带的库函数里就有直接的大顶堆，代码写出来就比较工整了，例如下面的 Java 语言版本：

Java 代码：

```java
class Solution {
    PriorityQueue<Integer> maxheap = new PriorityQueue<>((x,y)->y-x);
    PriorityQueue<Integer> minheap = new PriorityQueue<>();
    public void insert(Integer num) {
        // 大顶堆先进一个元素
        maxheap.offer(num);
        // 然后从大顶堆里出一个元素到小顶堆
        minheap.offer(maxheap.poll());
        if(maxheap.size() < minheap.size()){
            // 如果大顶堆的元素少于小顶堆
            // 就要从小顶堆出一个元素到大顶堆
            maxheap.offer(minheap.poll());
        }
    }

    public Double getMedian() {
        if (maxheap.size() == minheap.size()){
            return (double)(maxheap.peek() + minheap.peek())/2;
        }else{
            return (double) maxheap.peek();
        }
    }

}
```
我在 LeetCode 中文版上写的题解：

https://leetcode-cn.com/problems/find-median-from-data-stream/solution/you-xian-dui-lie-python-dai-ma-java-dai-ma-by-liwe/。

（本节完）