---
title: 「力扣」第 69 题：x 的平方根（简单）
icon: jingxuan
category: 二分查找
tags: 
  - 二分查找
---

![0069](https://tva1.sinaimg.cn/large/008i3skNgy1gx8jg2mj5wj30p00angm2.jpg)

+ [链接](https://leetcode-cn.com/problems/sqrtx/)

## 题目描述

实现 `int sqrt(int x)` 函数。

计算并返回 `x` 的平方根，其中 `x` 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1：

```
输入：4
输出：2
```

示例 2：

```
输入：8
输出：2
说明：8 的平方根是 2.82842...，由于返回类型是整数，小数部分将被舍去。
```

## 解题思路

分析：根据题目中给出的示例，要我们找的是「边界值」，这个「边界值」的特点如下：

+ 平方以后小于 `x` 的有可能是解；
+ 平方以后等于 `x` 的一定是解；
+ 平方以后大于 `x` 的一定不是解。

根据以上 3 条性质写出代码。这里用「二分查找」的「思路 2」：在循环体内逐渐缩小目标元素的范围，在退出循环以后，剩下的那个元素一定就是目标值。具体解释请见 [题解链接](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/he-bing-yi-hou-zhao-gui-bing-guo-cheng-zhong-zhao-/)。

Java 代码：

```java
public class Solution {

    public int mySqrt(int x) {
        if (x == 0) {
            return 0;
        }
        if (x == 1) {
            return 1;
        }

        int left = 1;
        int right = x / 2;
        while (left < right) {
            int mid = left + (right - left + 1) / 2;
            // 平方以后大于 x 的一定不是解
            // 注意：写成除法，防止 mid * mid 溢出
            if (mid > x / mid) {
                // 下一轮搜索的区间是 [left..mid - 1]
                right = mid - 1;
            } else {
                // 下一轮搜索的区间是 [mid..right]
                left = mid;
            }
        }
        return left;
    }
}
```



