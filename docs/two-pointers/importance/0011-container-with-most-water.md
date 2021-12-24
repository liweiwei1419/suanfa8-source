---
title: 「力扣」第 11 题：盛最多水的容器（中等）
icon: yongyan
category: 双指针
tags:
  - 双指针
---


+ 中文网址：[11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/description/) ；
+ 英文网址：[11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/description/) 。

给定 *n* 个非负整数 *a*1，*a*2，...，*a*n，每个数代表坐标中的一个点 (*i*, *ai*) 。在坐标内画 *n* 条垂直线，垂直线 *i* 的两个端点分别为 (*i*, *ai*) 和 (*i*, 0)。找出其中的两条线，使得它们与 *x* 轴共同构成的容器可以容纳最多的水。

**说明：**你不能倾斜容器，且 *n* 的值至少为 2。

![](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)

图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。


**示例:**

```
输入: [1,8,6,2,5,4,8,3,7]
 输出: 49
```

# 解题思路

木桶原理。短的那块木板的高度决定了盛水的容器的容积。

### 方法一：暴力解法

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



Python 代码：



**复杂度分析**：

+ 时间复杂度：$O(N^2)$；

+ 空间复杂度：$O(1)$。

### 方法二：双指针（贪心算法）

总是贪心先固定容器的宽度。根据木桶原理（盛水的高度由最短的那块木板决定），**高的那块木板往里面走，只可能让盛水越来越少，但是短板往里面走，却有可能让盛水越来越多**。  

> 双指针是暴力解法的优化，可以认为是剪枝。

参考代码：

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

+ 时间复杂度：$O(N)$，这里 $N$ 是输入数组；

+ 空间复杂度：$O(1)$ 。
