---
title: 「力扣」第 11 题：盛最多水的容器（中等）
icon: yongyan
category: 双指针
tags:
  - 双指针
---

- 中文网址：[11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/description/) 。

## 题目描述

给你 `n` 个非负整数 ` a1，a2，...，a``n `，每个数代表坐标中的一个点 `(i, ai)` 。在坐标内画 `n` 条垂直线，垂直线 `i` 的两个端点分别为 `(i, ai)` 和 `(i, 0)` 。找找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

**说明：** 你不能倾斜容器。

**示例 1：**

![](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)

```
输入：[1,8,6,2,5,4,8,3,7]
输出：49
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

**示例 2：**

```
输入：height = [1,1]
输出：1
```

**示例 3：**

```
输入：height = [4,3,2,1,4]
输出：16
```

**示例 4：**

```
输入：height = [1,2,1]
输出：2
```

**提示：**

- `n == height.length`
- $2 \le n \le 10^5$
- $0 \le height[i] \le 10^4$

## 解题思路

木桶原理。短的那块木板的高度决定了盛水的容器的容积。

## 方法一：暴力解法

枚举所有的容器的两个内壁的下标，计算水的容量，选出最大值。

使用双层 `for` 循环枚举所有可能的区间。暴力解法的时间复杂度太高，我们使用指针对撞的方法。

参考代码：

<CodeGroup>
<CodeGroupItem title="Java">

```java
public class Solution {

    public int maxArea(int[] height) {
        int len = height.length;
        if (len < 2) {
            return 0;
        }
        int res = 0;
        for (int i = 0; i < len - 1; i++) {
            for (int j = i + 1; j < len; j++) {
                res = Math.max(res, Math.min(height[i], height[j]) * (j - i));
            }
        }
        return res;
    }

    public static void main(String[] args) {
        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        Solution solution = new Solution();
        int res = solution.maxArea(height);
        System.out.println(res);
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python
from typing import List


class Solution:

    # 该解法超时

    def maxArea(self, height: List[int]) -> int:
        size = len(height)
        if size < 2:
            return 0

        res = 0
        for left in range(0, size - 1):
            for right in range(left + 1, size):
                res = max(res, min(height[left], height[right]) * (right - left))
        return res


if __name__ == '__main__':
    height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    solution = Solution()
    result = solution.maxArea(height)
    print(result)
```

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(N^2)$，这里 $N$ 是输入数组的长度；

- 空间复杂度：$O(1)$。

## 方法二：双指针（贪心算法）

总是贪心先固定容器的宽度。根据木桶原理（盛水的高度由最短的那块木板决定），**高的那块木板往里面走，只可能让盛水越来越少，但是短板往里面走，却有可能让盛水越来越多**。

::: danger 提示
双指针是暴力解法的优化，可以认为是剪枝。
:::

**参考代码 2：**

```java
public class Solution {

    public int maxArea(int[] height) {
        int len = height.length;
        if (len < 2) {
            return 0;
        }

        int left = 0;
        int right = len - 1;

        int res = 0;
        while (left < right) {
            int minHeight = Math.min(height[left], height[right]);
            res = Math.max(res, minHeight * (right - left));

            if (height[left] == minHeight) {
                left++;
            } else {
                right--;
            }
        }
        return res;
    }
}
```

<CodeGroup>
<CodeGroupItem title="Java">

```java
public class Solution {

    public int maxArea(int[] height) {
        int len = height.length;
        if (len < 2) {
            // 0 或者 1 的时候，不能形成区间，所以不能形成容器
            return 0;
        }

        int left = 0;
        int right = len - 1;
        int res = 0;
        while (left < right) {
            // 木桶原理，取决于最短的那根木板
            // [1, 2, 3] 3 和 1 之间的长度就是 (3 - 1 = )2
            int area = (right - left) * Math.min(height[left], height[right]);

            res = Math.max(res, area);
            if (height[left] < height[right]) {
                left++;
            } else {
                // height[l] >= height[r]
                right--;
            }
        }
        return res;
    }
}
```

</CodeGroupItem>

<CodeGroupItem title="Python">

```python
from typing import List


class Solution:
    def maxArea(self, height: List[int]) -> int:
        size = len(height)
        if size < 2:
            return 0

        left = 0
        right = size - 1
        res = 0
        while left < right:
            min_h = min(height[left], height[right])
            res = max(res, (right - left) * min_h)
            if min_h == height[left]:
                left += 1
            else:
                right -= 1
        return res


if __name__ == '__main__':
    height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    solution = Solution()
    result = solution.maxArea(height)
    print(result)
```

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
- 空间复杂度：$O(1)$ 。

使用双指针的原因是根据这个问题的特点，存水的高度取决于两边较短的那个内壁的高度。

使用指针对撞的方式不会错过最优解。

经验：双指针、滑动窗口的问题，一般先从暴力枚举开始思考，然后更改枚举的顺序，以达到剪枝加快计算的效果。

可以参考 [盛最多水的容器（双指针法，易懂解析，图解）](https://leetcode-cn.com/problems/container-with-most-water/solution/container-with-most-water-shuang-zhi-zhen-fa-yi-do/)，写题解的同学 @Krahets 非常用心，且很热心解答朋友的疑问。我写题解的结构也参考了他的思路，希望对大家有帮助。
