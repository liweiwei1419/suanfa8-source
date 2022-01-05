---
title: 「力扣」第 367 题：有效的完全平方数（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

+ 题目链接：[367. 有效的完全平方数](https://leetcode-cn.com/problems/valid-perfect-square/)。

## 题目描述

给定一个 **正整数** `num` ，编写一个函数，如果 `num` 是一个完全平方数，则返回 `true` ，否则返回 `false` 。

**进阶：不要** 使用任何内置的库函数，如 `sqrt` 。

**示例 1：**

```
输入：num = 16
输出：true
```

**示例 2：**

```
输入：num = 14
输出：false
```

**提示：**

- $1 \le num \le 2^{31} - 1$

## 思路分析

这是一个简单的问题，只存在一个正整数，它的平方为 `num`，因此使用「把区间分成三个部分」来解决。

**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public boolean isPerfectSquare(int num) {
        if (num < 2) {
            return true;
        }

        int left = 1;
        int right = num / 2;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (num % mid == 0 && num / mid == mid) {
                return true;
            } else if (num / mid > mid) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        if num < 2:
            return True

        left = 1
        right = num / 2
        while left <= right:
            mid = left + (right - left) // 2
            if num % mid == 0 and num // mid == mid:
                return True
            elif num // mid > mid:
                left = mid + 1
            else:
                right = mid - 1
        return False
```
</CodeGroupItem>
</CodeGroup>