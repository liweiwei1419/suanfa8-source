---
title: 「力扣」第 962 题：最大宽度坡（中等）
icon: yongyan
category: 栈
tags:
  - 单调栈
---

- 题目描述：[962. 最大宽度坡](https://leetcode-cn.com/problems/maximum-width-ramp/)。

## 题目描述

给定一个整数数组 `A`，*坡*是元组 `(i, j)`，其中 `i < j` 且 `A[i] <= A[j]`。这样的坡的宽度为 `j - i`。

找出 `A` 中的坡的最大宽度，如果不存在，返回 0 。

**示例 1：**

```
输入：[6,0,8,2,1,5]
输出：4
解释：
最大宽度的坡为 (i, j) = (1, 5): A[1] = 0 且 A[5] = 5.
```

**示例 2：**

```
输入：[9,8,1,0,1,9,4,0,4,1]
输出：7
解释：
最大宽度的坡为 (i, j) = (2, 9): A[2] = 1 且 A[9] = 1.
```

**提示：**

1. `2 <= A.length <= 50000`
2. `0 <= A[i] <= 50000`

::: warning 说明
因时间和个人精力关系，本题没有写详解，只给出了参考代码。

读者可以在「力扣」这道题的评论区和题解区找到适合自己的思路分析和代码。

如果确实需要我编写具体的解题思路，可以发邮件到 liweiwei1419@gmail.com 或者给本项目的 [issue](https://github.com/liweiwei1419/liweiwei1419.github.io/issues) 留言。
:::

**参考代码**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public int maxWidthRamp(int[] nums) {
        Deque<Integer> stacks = new ArrayDeque<>();
        stacks.addLast(0);
        int len = nums.length;
        for (int i = 1; i < len; i++) {
            if (nums[i] <= nums[stacks.peekLast()]) {
                stacks.addLast(i);
            }
        }

        int res = 0;
        for (int i = len - 1; i >= 0; i--) {
            while (!stacks.isEmpty() && nums[i] >= nums[stacks.peekLast()]) {
                res = Math.max(res, i - stacks.removeLast());
            }
        }
        return res;
    }
}
```
