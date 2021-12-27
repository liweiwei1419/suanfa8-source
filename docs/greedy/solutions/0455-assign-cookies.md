---
title: 「力扣」第 455 题：分发饼干（中等）
icon: yongyan
category: 贪心算法
tags:
  - 贪心算法
---

+ 题目链接：[455. 分发饼干](https://leetcode-cn.com/problems/assign-cookies/)；
+ 题解链接：[贪心算法（两个方向） + 优先队列（Python 代码）](https://leetcode-cn.com/problems/assign-cookies/solution/tan-xin-suan-fa-you-xian-dui-lie-python-dai-ma-by-/)。

## 题目描述

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

对每个孩子 `i`，都有一个胃口值 `g[i]`，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 `j`，都有一个尺寸 `s[j]` 。如果 `s[j] >= g[i]`，我们可以将这个饼干 `j` 分配给孩子 `i` ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

**示例 1:**

```
输入: g = [1,2,3], s = [1,1]
输出: 1
解释: 
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。
```

**示例 2:**

```
输入: g = [1,2], s = [1,2,3]
输出: 2
解释: 
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
```

**提示：**

- $1 \le g.length \le 3 * 10^4$
- $0 \le s.length \le 3 * 10^4$
- $1 \le g[i], s[j] \le 2^31 - 1$


**「贪心算法」的直觉 1**：

如果最小的饼干都不能满足胃口最小的小朋友，那么这块最小的饼干一定也不能满足比他（她）还贪心的小朋友。此时我们舍弃这块饼干。

因此当前问题贪心的点是：如果一个小朋友的胃口大小是 `a` ，我们在分配饼干的时候，给能他（她）大小为 `a` 的饼干，绝对不会给大小为 `a + 1` 的饼干，因此「贪心算法」应用在这个问题里，是一种「吝啬」的策略。

**参考代码 1**：

```Java []
import java.util.Arrays;

public class Solution {

    public int findContentChildren(int[] g, int[] s) {
        int gLen = g.length;
        int sLen = s.length;
        if (sLen == 0) {
            return 0;
        }

        Arrays.sort(g);
        Arrays.sort(s);

        int gIndex = 0;
        int sIndex = 0;
        while (gIndex < gLen && sIndex < sLen) {
            // 用最小的饼干去满足贪心程度最低的小朋友
            if (g[gIndex] <= s[sIndex]) {
                gIndex++;
                sIndex++;
            } else {
                sIndex++;
            }
        }
        return gIndex;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(|g| \log |g| + |s| \log |s|)$，其中 $|g|$ 和 $|s|$ 分别是数组 `g` 和 `s` 的长度；
- 空间复杂度：$O(\log |g| + \log |s|)$。

「直觉 1」的「吝啬」的策略相比，我们还可以想出一种「大方」的策略。

**「贪心算法」的直觉 2**：

给最贪心的小朋友最大的饼干。如果最大的这块饼干都不能满足最贪心的小朋友，此时我们需要放弃最贪心的小朋友，进而考虑次贪心的小朋友。

**参考代码 2**：

```Java []
import java.util.Arrays;


public class Solution {

    public int findContentChildren(int[] g, int[] s) {
        int gLen = g.length;
        int sLen = s.length;
        if (sLen == 0) {
            return 0;
        }

        Arrays.sort(g);
        Arrays.sort(s);

        int gIndex = gLen - 1;
        int sIndex = sLen - 1;
        int res = 0;
        while (gIndex >= 0 && sIndex >= 0) {
            if (s[sIndex] >= g[gIndex]) {
                sIndex--;
                gIndex--;
                res++;
            } else {
                gIndex--;
            }
        }
        return res;
    }
}
```

**复杂度分析**：（同参考代码 1）。


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



