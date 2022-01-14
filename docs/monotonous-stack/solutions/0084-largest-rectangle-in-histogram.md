---
title: 「力扣」第 84 题：柱状图中最大的矩形（困难）
icon: shipin
category: 栈
tags:
  - 栈
  - 单调栈
---

![0084](https://tva1.sinaimg.cn/large/008i3skNgy1gx91bijwzvj30p00anwf9.jpg)

- 题目链接：[84. 柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)；
- 题解链接：[暴力解法、栈（单调栈、哨兵技巧）](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/bao-li-jie-fa-zhan-by-liweiwei1419/)。

::: info 阅读提示
本题刚刚接触的时候会觉得有一点复杂，所以我在「视频讲解」和「文字题解」的部分用了一些例子来讲解为什么 **可以使用「栈」（因为解决这个问题恰好符合了「后进先出」的顺序）**。内容有一些多，但是讲解是层层递进的，稍微有点耐心就可以看完。
:::

::: danger 视频讲解

:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/zhu-zhuang-tu-zhong-zui-da-de-ju-xing-by-leetcode-/) 和 [B 站](https://www.bilibili.com/video/BV16D4y1D7ed?from=search&seid=10193465856501349147&spm_id_from=333.337.0.0) 可以收看视频讲解。

:::

## 题目描述

给定 _n_ 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

**示例 1:**

![img](https://assets.leetcode.com/uploads/2021/01/04/histogram.jpg)

```
输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/01/04/histogram-1.jpg)

```
输入： heights = [2,4]
输出： 4
```

**提示：**

- `1 <= heights.length <=105`
- `0 <= heights[i] <= 104`

## 方法一：暴力解法（超时）

这道问题的暴力解法比「接雨水」那道题要其实好想得多：可以枚举以每个柱形为高度的最大矩形的面积。

具体来说是：依次遍历柱形的高度，对于每一个高度分别向两边扩散，求出以当前高度为矩形的最大宽度多少。

![image.png](https://pic.leetcode-cn.com/b4125f95419bc2306c7f16d1679c32e538b0b087bd9d0f70658c1a8528afca6b-image.png)

为此，我们需要：

- 左边看一下，看最多能向左延伸多长，找到大于等于当前柱形高度的最左边元素的下标；
- 右边看一下，看最多能向右延伸多长；找到大于等于当前柱形高度的最右边元素的下标。

对于每一个位置，我们都这样操作，得到一个矩形面积，求出它们的最大值。

**参考代码 1**：Java 和 Python 代码都超时。

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int largestRectangleArea(int[] heights) {
        int len = heights.length;
        // 特判
        if (len == 0) {
            return 0;
        }

        int res = 0;
        for (int i = 0; i < len; i++) {

            // 找左边最后 1 个大于等于 heights[i] 的下标
            int left = i;
            int curHeight = heights[i];
            while (left > 0 && heights[left - 1] >= curHeight) {
                left--;
            }

            // 找右边最后 1 个大于等于 heights[i] 的索引
            int right = i;
            while (right < len - 1 && heights[right + 1] >= curHeight) {
                right++;
            }

            int width = right - left + 1;
            res = Math.max(res, width * curHeight);
        }
        return res;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        size = len(heights)
        res = 0

        for i in range(size):
            left = i
            cur_height = heights[i]
            while left > 0 and heights[left - 1] >= cur_height:
                left -= 1

            right = i
            while right < size - 1 and heights[right + 1] >= cur_height:
                right += 1

            max_width = right - left + 1
            res = max(res, max_width * cur_height)
        return res
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(N^2)$，这里 $N$ 是输入数组的长度。
- 空间复杂度：$O(1)$。

看到时间复杂度为 $O(N^2)$ 和空间复杂度为 $O(1)$ 的组合，那么我们是不是可以一次遍历，不需要中心扩散就能够计算出每一个高度所对应的那个最大面积矩形的面积呢？

很容易想到的优化的思路就是「以空间换时间」。我们需要在遍历的过程中记录一些信息。

## 方法二：以空间换时间，可以使用的数据结构是栈

说明：下面文字有点长，大家可以直接收看 [官方题解](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/zhu-zhuang-tu-zhong-zui-da-de-ju-xing-by-leetcode-/)。

要搞清楚这个过程，请大家**一定要在纸上画图**，搞清楚一些细节，这样在编码的时候就不容易出错了。

记录什么信息呢？记录高度是不是可以呢？其实是不够的，因为计算矩形还需要计算宽度，很容易知道宽度是由下标确定的，记录了下标其实对应的高度就可以直接从输入数组中得出，因此，应该记录的是下标。

我们就拿示例的数组 `[2, 1, 5, 6, 2, 3]` 为例：

1、一开始看到的柱形高度为 `2` ，这个时候以这个 `2` 为高度的最大面积的矩形还不能确定，我们需要继续向右遍历，如下图。

![image.png](https://pic.leetcode-cn.com/414a06bad966eba25ef6c1281e5780381205d1c76c70b7a2561969bfe859eb01-image.png)

2、然后看到到高度为 `1` 的柱形，这个时候以这个柱形为高度的矩形的最大面积还是不知道的。但是**它之前的以 `2` 为高度的最大面积的矩形是可以确定的**，这是因为这个 `1` 比 `2` 小 ，因为这个 `1` 卡在了这里 `2` 不能再向右边扩展了，如下图。

![image.png](https://pic.leetcode-cn.com/dcbed1d0cba33c059f3833a0da2e78e5e0a96370a415930acbdb126b44b398c8-image.png)

我们计算一下以 `2` 为高度的最大矩形的面积是 `2`。其实这个时候，求解这个问题的思路其实已经慢慢打开了。如果已经确定了一个柱形的高度，我们可以无视它，将它以虚框表示，如下图。

![image.png](https://pic.leetcode-cn.com/da72cf520eb05a42725a8982bb27e507f9213b257b6f32bd6ef4a49e1d416a1f-image.png)

3、遍历到高度为 `5` 的柱形，同样的以当前看到柱形为高度的矩形的最大面积也是不知道的，因为我们还要看右边高度的情况。那么它的左右有没有可以确定的柱形呢？没有，这是因为 `5` 比 `1` 大，我们看后面马上就出现了 `6`，不管是 `1` 这个柱形还是 `5` 这个柱形，都还可以向右边扩展；

![image.png](https://pic.leetcode-cn.com/1bc87193557ab8c2a0bc2319aef66a12c4514aa45e9aa823eefa0e536289f0ed-image.png)

4、接下来，遍历到高度为 `6` 的柱形，同样的，以柱形 `1`、`5`、`6` 为高度的最大矩形面积还是不能确定下来；

![image.png](https://pic.leetcode-cn.com/c34663bee2af70da626134a0426e7ac8e8e305a039abb43862a807fc1a7183a8-image.png)

5、再接下来，遍历到高度为 `2` 的柱形。

![image.png](https://pic.leetcode-cn.com/180d06d75a6480c649d0d4ad6c31e755a4e9c03294d23b7fb28bbac3fb0c006a-image.png)

发现了一件很神奇的事情，**高度为 `6` 的柱形对应的最大矩形的面积的宽度可以确定下来**，它就是夹在高度为 `5` 的柱形和高度为 `2` 的柱形之间的距离，它的高度是 `6`，宽度是 `1`。

![image.png](https://pic.leetcode-cn.com/5a60100c86cacd620424c807b6c062dd8f9990538da27420de81822557f8c782-image.png)

将可以确定的柱形设置为虚线。

![image.png](https://pic.leetcode-cn.com/5cc53fec12ab6a3c790c30c47ac183e5fd0426a50a7cd46d813cac6718f658cc-image.png)

接下来柱形 `5` 对应的最大面积的矩形的宽度也可以确定下来，它是夹在高度为 `1` 和高度为 `2` 的两个柱形之间的距离；

![image.png](https://pic.leetcode-cn.com/c4ae9e65efe6247d63b1ac2834015bf1be6270e0d323e6f02d7e1bb4ab6644ed-image.png)

确定好以后，我们将它标成虚线。

![image.png](https://pic.leetcode-cn.com/973788fa2d6407c9db41c100e9fa9b9ef00e4891343089773b716316c6f3e7f2-image.png)

> 我们发现了，只要是遇到了当前柱形的高度比它上一个柱形的高度严格小的时候，一定可以确定它之前的某些柱形的最大宽度，并且确定的柱形宽度的顺序是从右边向左边。
> 这个现象告诉我们，在遍历的时候需要记录的信息就是遍历到的柱形的下标，它一左一右的两个柱形的下标的差就是这个面积最大的矩形对应的最大宽度。

这个时候，还需要考虑的一个细节是，在确定一个柱形的面积的时候，**除了右边要比当前严格小**，其实还蕴含了一个条件，那就是**左边也要比当前高度严格小**。

那如果是左边的高度和自己相等怎么办呢？我们想一想，我们之前是只要比当前严格小，我们才可以确定一些柱形的最大宽度。只要是大于或者等于之前看到的那一个柱形的高度的时候，我们其实都不能确定。

因此我们确定当前柱形对应的宽度的左边界的时候，往回头看的时候，一定要找到第一个严格小于我们要确定的那个柱形的高度的下标。这个时候 **中间那些相等的柱形其实就可以当做不存在一样**。因为它对应的最大矩形和它对应的最大矩形其实是一样的。

说到这里，其实我们的思路已经慢慢清晰了。

我们在遍历的时候，需要记录的是下标，如果当前的高度比它之前的高度严格小于的时候，就可以直接确定之前的那个高的柱形的最大矩形的面积，为了确定这个最大矩形的左边界，我们还要找到第一个严格小于它的高度的矩形，向左回退的时候，其实就可以当中间这些柱形不存在一样。

这是因为我们就是想确定 6 的宽度，6 的宽度确定完了，其实我们就不需要它了，这个 5 的高度和这个 5 的高度确定完了，我们也不需要它了。

**我们在缓存数据的时候，是从左向右缓存的，我们计算出一个结果的顺序是从右向左的，并且计算完成以后我们就不再需要了，符合后进先出的特点**。因此，我们需要的这个作为缓存的数据结构就是**栈**。

当确定了一个柱形的高度的时候，我们就将它从栈顶移出，所有的柱形在栈中进栈一次，出栈一次，一开始栈为空，最后也一定要让栈为空，表示这个高度数组里所有的元素都考虑完了。

6、最后遍历到最后一个柱形，即高度为 3 的柱形。

![image.png](https://pic.leetcode-cn.com/cbf2d3a441a980d68578c3e0a682a3df196e6d2e4fdab7395868a7128620baa9-image.png)

---

（一次遍历完成以后。接下来考虑栈里的元素全部出栈。）

接下来我们就要依次考虑还在栈里的柱形的高度。和刚才的方法一样，只不过这个时候右边没有比它高度还小的柱形了，这个时候计算宽度应该假设最右边还有一个下标为 `len` （这里等于 6） 的高度为 0 （或者 0.5，只要比 1 小）的柱形。

![image.png](https://pic.leetcode-cn.com/724e5cacfd2bd0aa2a748604678fab4027b4c519ecf802b6f766de7774ea6e48-image.png)

7、下标为 5 ，即高度为 3 的柱形，左边的下标是 4 ，右边的下标是 6 ，因此宽度是 6 - 4 - 1 = 1（两边都不算，只算中间的距离，所以减 1）；算完以后，将它标为虚线。

![image.png](https://pic.leetcode-cn.com/8e75c4e46ea625f62a62c9696e3e1879c67ae2268e8bfdfe54e2e59178778bce-image.png)

8、下标为 4 ，高度为 2 的柱形，左边的下标是 1 ，右边的下标是 6 ，因此宽度是 6 - 1 - 1 = 4；算完以后，将它标为虚线。

![image.png](https://pic.leetcode-cn.com/5eb739ec3bd0fe474dedd5a4aaefaf9a42b483df7c551ab19bd5e0535df4bcc3-image.png)

9、最后看下标为 1，高度为 1 的矩形，它的左边和右边其实都没有元素了，它就是整个柱形数组里高度最低的柱形，计算它的宽度，就是整个柱形数组的长度。

![image.png](https://pic.leetcode-cn.com/9013859355b9a39e6ff23f00c5046f35d322f18b8aa0fc3b7db14a4bfeac3dc1-image.png)

到此为止，所有的柱形高度对应的最大矩形的面积就都计算出来了。

![image.png](https://pic.leetcode-cn.com/d8ec198e242fdf7edf23a1aa04a21dbde2d9e09b0c8d771d7e5c621c3321945d-image.png)

这个算法经过一次遍历，在每一次计算最大宽度的时候，没有去遍历，而是使用了栈里存放的下标信息，以 $O(1)$ 的时间复杂度计算最大宽度。

大家可以直接看到参考代码 3。

---

**参考代码 2**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public int largestRectangleArea(int[] heights) {
        int len = heights.length;
        if (len == 0) {
            return 0;
        }
        if (len == 1) {
            return heights[0];
        }

        int res = 0;
        Deque<Integer> stack = new ArrayDeque<>(len);
        for (int i = 0; i < len; i++) {
            // 这个 while 很关键，因为有可能不止一个柱形的最大宽度可以被计算出来
            while (!stack.isEmpty() && heights[i] < heights[stack.peekLast()]) {
                int curHeight = heights[stack.pollLast()];
                while (!stack.isEmpty() && heights[stack.peekLast()] == curHeight) {
                    stack.pollLast();
                }

                int curWidth;
                if (stack.isEmpty()) {
                    curWidth = i;
                } else {
                    curWidth = i - stack.peekLast() - 1;
                }

                // System.out.println("curIndex = " + curIndex + " " + curHeight * curWidth);
                res = Math.max(res, curHeight * curWidth);
            }
            stack.addLast(i);
        }

        while (!stack.isEmpty()) {
            int curHeight = heights[stack.pollLast()];
            while (!stack.isEmpty() && heights[stack.peekLast()] == curHeight) {
                stack.pollLast();
            }
            int curWidth;
            if (stack.isEmpty()) {
                curWidth = len;
            } else {
                curWidth = len - stack.peekLast() - 1;
            }
            res = Math.max(res, curHeight * curWidth);
        }
        return res;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        size = len(heights)
        res = 0

        stack = []

        for i in range(size):
            while len(stack) > 0 and heights[i] < heights[stack[-1]]:
                cur_height = heights[stack.pop()]

                while len(stack) > 0 and cur_height == heights[stack[-1]]:
                    stack.pop()

                if len(stack) > 0:
                    cur_width = i - stack[-1] - 1
                else:
                    cur_width = i

                res = max(res, cur_height * cur_width)
            stack.append(i)

        while len(stack) > 0 is not None:
            cur_height = heights[stack.pop()]
            while len(stack) > 0 and cur_height == heights[stack[-1]]:
                stack.pop()

            if len(stack) > 0:
                cur_width = size - stack[-1] - 1
            else:
                cur_width = size
            res = max(res, cur_height * cur_width)

        return res
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(N)$，输入数组里的每一个元素入栈一次，出栈一次。
- 空间复杂度：$O(N)$，栈的空间最多为 $N$。

以上参考代码 2 需要考虑两种特殊的情况：

1. 弹栈的时候，栈为空；
2. 遍历完成以后，栈中还有元素；

为此可以我们可以在输入数组的两端加上两个高度为 0 （或者是 0.5，只要比 1 严格小都行）的柱形，可以回避上面这两种分类讨论。

这两个站在两边的柱形有一个很形象的名词，叫做**哨兵（Sentinel）**。

有了这两个柱形：

1. 左边的柱形（第 1 个柱形）由于它一定比输入数组里任何一个元素小，它肯定不会出栈，因此栈一定不会为空；

2. 右边的柱形（第 2 个柱形）也正是因为它一定比输入数组里任何一个元素小，它会让所有输入数组里的元素出栈（第 1 个哨兵元素除外）。

这里栈对应到高度，呈单调增加不减的形态，因此称为**单调栈（Monotone Stack）**。它是暴力解法的优化，计算每个柱形的高度对应的最大矩形的顺序由出栈顺序决定。

**参考代码 3**：加了哨兵的写法。

以下代码是在 [@an-di-xiao-hei](/u/an-di-xiao-hei/) 和 [@peerless1007](/u/peerless1007/) 两位朋友的提醒下精简的，感谢他们的帮助。

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public int largestRectangleArea(int[] heights) {
        int len = heights.length;
        if (len == 0) {
            return 0;
        }

        if (len == 1) {
            return heights[0];
        }

        int res = 0;

        int[] newHeights = new int[len + 2];
        newHeights[0] = 0;
        System.arraycopy(heights, 0, newHeights, 1, len);
        newHeights[len + 1] = 0;
        len += 2;
        heights = newHeights;

        Deque<Integer> stack = new ArrayDeque<>(len);
        // 先放入哨兵，在循环里就不用做非空判断
        stack.addLast(0);

        for (int i = 1; i < len; i++) {
            while (heights[i] < heights[stack.peekLast()]) {
                int curHeight = heights[stack.pollLast()];
                int curWidth = i - stack.peekLast() - 1;
                res = Math.max(res, curHeight * curWidth);
            }
            stack.addLast(i);
        }
        return res;
    }

    public static void main(String[] args) {
        // int[] heights = {2, 1, 5, 6, 2, 3};
        int[] heights = {1, 1};
        Solution solution = new Solution();
        int res = solution.largestRectangleArea(heights);
        System.out.println(res);
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        size = len(heights)
        res = 0
        heights = [0] + heights + [0]
        # 先放入哨兵结点，在循环中就不用做非空判断
        stack = [0]
        size += 2

        for i in range(1, size):
            while heights[i] < heights[stack[-1]]:
                cur_height = heights[stack.pop()]
                cur_width = i - stack[-1] - 1
                res = max(res, cur_height * cur_width)
            stack.append(i)
        return res


if __name__ == '__main__':
    heights = [2, 1, 5, 6, 2, 3]

    solution = Solution()
    res = solution.largestRectangleArea(heights)
    print(res)
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：（同上）

以下列出了单调栈的问题，供大家参考。

| 序号 | 题目                                                                                               | 题解                                                                                                                                                |
| ---- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | [42. 接雨水（困难）](https://leetcode-cn.com/problems/trapping-rain-water/)                        | [暴力解法、优化、双指针、单调栈](https://leetcode-cn.com/problems/trapping-rain-water/solution/bao-li-jie-fa-yi-kong-jian-huan-shi-jian-zhi-zhen-/) |
| 2    | [739. 每日温度（中等）](https://leetcode-cn.com/problems/daily-temperatures/)                      | [暴力解法 + 单调栈](https://leetcode-cn.com/problems/daily-temperatures/solution/bao-li-jie-fa-dan-diao-zhan-by-liweiwei1419/)                      |
| 3    | [496. 下一个更大元素 I（简单）](https://leetcode-cn.com/problems/next-greater-element-i/)          | [暴力解法、单调栈](https://leetcode-cn.com/problems/next-greater-element-i/solution/bao-li-jie-fa-dan-diao-zhan-by-liweiwei1419-2/)                 |
| 4    | [316. 去除重复字母（困难）](https://leetcode-cn.com/problems/remove-duplicate-letters/)            | [栈 + 哨兵技巧（Java、C++、Python）](https://leetcode-cn.com/problems/remove-duplicate-letters/solution/zhan-by-liweiwei1419/)                      |
| 5    | [901. 股票价格跨度（中等）](https://leetcode-cn.com/problems/online-stock-span/)                   | [「力扣」第 901 题：股票价格跨度（单调栈）](https://blog.csdn.net/lw_power/article/details/103957702)                                               |
| 6    | [402. 移掉 K 位数字](https://leetcode-cn.com/problems/remove-k-digits/)                            |                                                                                                                                                     |
| 7    | [581. 最短无序连续子数组](https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/) |                                                                                                                                                     |

这里感谢 [@chwma](/u/chwma/) 朋友提供资料。
