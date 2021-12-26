---
title: 「力扣」第 455 题：分发饼干
icon: yongyan
category: 贪心算法
tags:
  - 贪心算法
---

+ 题目链接：[455. 分发饼干](https://leetcode-cn.com/problems/assign-cookies/)；
+ 题解链接：[贪心算法（两个方向） + 优先队列（Python 代码）](https://leetcode-cn.com/problems/assign-cookies/solution/tan-xin-suan-fa-you-xian-dui-lie-python-dai-ma-by-/)。

## 题目描述


说明：文本首发在力扣的题解版块，更新也会在第 1 时间在上面的网站中更新，这篇文章只是上面的文章的一个快照，您可以点击上面的链接看到其他网友对本文的评论。

传送门：

>假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。对每个孩子 i ，都有一个胃口值 gi ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，都有一个尺寸 sj 。如果 sj >= gi ，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。
>
>注意：
>
>你可以假设胃口值为正。
>一个小朋友最多只能拥有一块饼干。
>
>示例 1:
>
>输入: [1,2,3], [1,1]
>
>输出: 1
>
>解释: 
>你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
>虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
>所以你应该输出1。
>示例 2:
>
>输入: [1,2], [1,2,3]
>
>输出: 2
>
>解释: 
>你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
>你拥有的饼干数量和尺寸都足以让所有孩子满足。
>所以你应该输出2.

## 贪心算法（两个方向） + 优先队列（Python 代码）


![image.png](https://pic.leetcode-cn.com/a1b3c5a83448a19193a569bfbca1efc930d44140908ad9986dd40321d80e6827-image.png)


### 方法一：尽量用小的饼干满足贪心指数小的小朋友

如果小的饼干满足不了贪心指数小的小朋友，就放弃这个小的饼干。例如：`g=[2, 3], s=[1, 2, 3]`。

Python 代码：

```Python []
class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        g.sort()
        s.sort()

        gi = 0
        si = 0
        res = 0

        while gi < len(g) and si < len(s):
            if s[si] >= g[gi]:
                si += 1
                gi += 1
                res += 1
            else:
                si += 1
        return res
```

由于每一次都从数组 `g` 和数组 `s` 中取出最小者进行比较，因此比较容易想到使用小顶堆。

Python 代码：

```Python []
import heapq


class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:

        heapq.heapify(g)
        heapq.heapify(s)

        res = 0
        # 如果小的饼干满足不了贪心指数最小的小朋友，就放弃这个饼干
        while g and s:
            if s[0] >= g[0]:
                heapq.heappop(g)
                heapq.heappop(s)
                res += 1
            else:
                heapq.heappop(s)
        return res
```

### 方法二：尽量用大的饼干满足贪心指数大的小朋友

如果最大的饼干都满足不了这个最贪心的小朋友，就放弃这个小朋友。例如：`g=[4, 1], s=[3, 2, 1]`。

Python 代码：

```Python []
class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        g.sort(reverse=True)
        s.sort(reverse=True)

        gi = 0
        si = 0
        res = 0

        while gi < len(g) and si < len(s):
            if s[si] >= g[gi]:
                si += 1
                gi += 1
                res += 1
            else:
                gi += 1
        return res

```

由于每一次都从数组 `g` 和数组 `s` 中取出最大者进行比较，因此比较容易想到使用大顶堆。由于 Python 中默认的堆是小顶堆，因此在代码上要做一定的预处理，如下所示。

Python 代码：

```Python []
class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        g = [(-num, num) for num in g]
        s = [(-num, num) for num in s]
        heapq.heapify(g)
        heapq.heapify(s)

        # 如果最大的饼干都满足不了胃口最大的小朋友，就放弃这个小朋友
        res = 0
        while g and s:
            if s[0][1] >= g[0][1]:
                heapq.heappop(g)
                heapq.heappop(s)
                res += 1
            else:
                heapq.heappop(g)
        return res
```



