---
title: 平方数之和
icon: yongyan
category: 双指针
tags:
  - 双指针
  - 二分查找
---


## 题目描述

**前言**

由于 $a$ 、$b$ 均为整数，并且 $a^2 + b^2 = c$。可以枚举 $a$ 和 $b$ 所有可能的情况，时间复杂度为 $O(c^2)$。但是暴力枚举有一些情况是没有必要的。例如：当 $c = 20$ 时，当 $a = 1$ 的时候，枚举 $b$ 的时候，只需要枚举到 $b = 5$ 就可以结束了，这是因为 $1^2 + 5^2 = 25 > 20$。当 $b > 5$ 时，一定有 $1^2 + b^2 > 20$。

注意到这一点，可以使用「双指针」或者「二分查找」降低时间复杂度。

### 方法一：双指针

不失一般性，可以假设 $a \le b$，初始时 $a = 0$，$b = \sqrt{c}$。

+ 如果 $a^2 + b^2 = c$，我们找到了题目要求的一个解，返回 `true`；
+ 如果 $a^2 + b^2 < c$，此时需要将 $a + 1$，继续搜索；
+ 如果 $a^2 + b^2 > c$，此时需要将 $b - 1$，继续搜索。

直到 $a == b$ 的时候，程序终止。

**代码**

```Java [sol1-Java]
class Solution {
    public boolean judgeSquareSum(int c) {
        if (c == 0 || c == 1 || c == 2) {
            return true;
        }

        int left = 0;
        int right = (int) Math.sqrt(c);
        while (left <= right) {
            int sum = left * left + right * right;
            if (sum == c) {
                return true;
            } else if (sum > c) {
                right--;
            } else {
                left++;
            }
        }
        return false;
    }
}
```

**复杂度分析**

- 时间复杂度：$O(c)$，最差情况下 $a$ 和 $b$ 一共枚举了 $[0..c]$ 里的所有整数。

- 空间复杂度：$O(1)$。

### 方法二：二分查找

$a$ 和 $b$ 是两个待定的整数，我们可以枚举 $a$ 的值，通过二分查找的方式确定 $b$ 的值，可以参考 [69. x 的平方根](/problems/sqrtx/)。

需要注意的是：本题 $c$ 的取值范围在 $[0..2^{31} - 1]$。不同的编程语言声明的变量，以及在计算的过程中可能会发生的整型溢出的情况。

**代码**

```Java [sol1-Java]
class Solution {

    public boolean judgeSquareSum(int c) {
        if (c == 0 || c == 1 || c == 2) {
            return true;
        }

        // 固定 a ，问题转化为找是否存在一个整数的平方等于 b
        for (long a = 0; a * a <= c; a++) {
            long bSquare = c - a * a;

            long left = 0;
            long right = bSquare;
            while (left <= right) {
                long mid = left + (right - left) / 2;
                if (mid * mid == bSquare) {
                    return true;
                } else if (mid * mid < bSquare) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return false;
    }
}
```

**复杂度分析**

- 时间复杂度：$O(\sqrt{c}\log c)$，其中枚举 $a$ 的时间复杂度为 $O(\sqrt{c})$，二分查找的时间复杂度为 $O(\log c)$。

- 空间复杂度：$O(1)$。

