---
title: 「力扣」第 69 题：x 的平方根（简单）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

![0069](https://tva1.sinaimg.cn/large/008i3skNgy1gx8jg2mj5wj30p00angm2.jpg)

- 题目链接：[69. Sqrt(x)](https://leetcode-cn.com/problems/sqrtx/)
- 题解链接：[二分查找（Java）](https://leetcode-cn.com/problems/sqrtx/solution/er-fen-cha-zhao-niu-dun-fa-python-dai-ma-by-liweiw/)。

## 题目描述

实现 `int sqrt(int x)` 函数。

计算并返回 `x` 的平方根，其中 `x` 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

**示例 1**：

```
输入：4
输出：2
```

**示例 2**：

```
输入：8
输出：2
说明：8 的平方根是 2.82842...，由于返回类型是整数，小数部分将被舍去。
```

**提示：**

- $0 \le x \le 2^{31} - 1$

## 题意分析

- 这道题要求我们实现平方根函数，输入是一个非负整数，输出也是一个整数；
- 但是题目当中说：结果只保留整数的部分，小数部分将被舍去。这是什么意思呢？我们分析一下示例。

示例 1：

```
输入: 4
输出: 2
```

这是显然的，$4$ 本身是一个完全平方数，$2^2 = 4$。虽然在数学上一个数的平方根有正有负，但是这个题目只要求我们返回算术平方根。

示例 2 ：

```
输入: 8
输出: 2
```

因为 $8$ 的平方根实际上是 $2.82842$，题目要求我们将小数部分舍去。因此输出 $2$。于是我们知道：由于输出结果的时候，需要将小数部分舍去，因此问题的答案，平方以后一定不会严格大于输入的整数。这里返回 $3$ 就不对了，这是因为 $3^2 = 9 > 8$。

## 思路分析

从题目的要求和示例我们可以看出，这其实是一个查找整数的问题，并且这个整数是有范围的。

- 如果这个整数的平方 **恰好等于** 输入整数，那么我们就找到了这个整数；
- 如果这个整数的平方 **严格大于** 输入整数，那么这个整数肯定不是我们要找的那个数；
- 如果这个整数的平方 **严格小于** 输入整数，那么这个整数 **可能** 是我们要找的那个数（重点理解这句话）。

因此我们可以使用「二分查找」来查找这个整数，不断缩小范围去猜。

- 猜的数平方以后大了就往小了猜；
- 猜的数平方以后恰恰好等于输入的数就找到了；
- 猜的数平方以后小了，可能猜的数就是，也可能不是。

很容易知道，题目要我们返回的整数是有范围的，直觉上一个整数的平方根肯定不会超过它自己的一半，但是 $0$ 和 $1$ 除外，因此我们可以在 $1$ 到输入整数除以 $2$ 这个范围里查找我们要找的平方根整数。$0$ 单独判断一下就好。

**参考代码**：

```java
public class Solution {

    public int mySqrt(int x) {
        // 特殊值判断
        if (x == 0) {
            return 0;
        }
        if (x == 1) {
            return 1;
        }

        int left = 1;
        int right = x / 2;
        // 在区间 [left..right] 查找目标元素
        while (left < right) {
            int mid = left + (right - left + 1) / 2;
            // 注意：这里为了避免乘法溢出，改用除法
            if (mid > x / mid) {
                // 下一轮搜索区间是 [left..mid - 1]
                right = mid - 1;
            } else {
                // 下一轮搜索区间是 [mid..right]
                left = mid;
            }
        }
        return left;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(\log x)$，每一次搜索的区间大小约为原来的 $\cfrac{1}{2}$，时间复杂度为 $O(\log_2 x) = O(\log x)$；
- 空间复杂度：$O(1)$。

**对代码编写逻辑的解释**：

一、写 `if` 和 `else` 的原因：

- 猜的数是 `mid` ，根据上面的分析，如果 `mid` 的平方 **严格大于** `x`，`mid` 肯定不是解，比 `mid` 大的整数也肯定不是解，因此问题的答案只可能存在区间 `[left..mid - 1]`，此时设置 `right = mid - 1`；
- `else` 的情况就是 `if` 的反面，只要 `if` 的分支和对应的区间分析对了，`else` 的区间是 `[left..mid - 1]` 的反面区间，即 ` [mid..right]` ，此时设置 `left = mid`。

二、为什么最后返回 `left`。

- 退出 `while (left < right)` 循环的时候，由于边界搜索是 `left = mid` 与 `right = mid - 1`，因此退出循环的时候一定有 `left` 与 `right` 重合，返回 `right` 也可以。

---

## 问题：`mid` 为什么要加 `1`？

对着错误的测试用例打印出变量 `left` 、`right` 和 `mid` 的值看一下就很清楚了。

**`mid` 不加 `1` 会造成死循环的代码**：

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
        // 在区间 [left..right] 查找目标元素
        while (left < right) {
            // 取中间数 mid 下取整时
            int mid = left + (right - left) / 2;

            // 调试语句开始
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("left = " + left + ", right = " + right + ", mid = " + mid);
            // 调试语句结束

            // 注意：这里为了避免乘法溢出，改用除法
            if (mid > x / mid) {
                // 下一轮搜索区间是 [left..mid - 1]
                right = mid - 1;
            } else {
                // 下一轮搜索区间是 [mid..right]
                left = mid;
            }
        }
        return left;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int x = 9;
        int res = solution.mySqrt(x);
        System.out.println(res);
    }
}
```

控制台输出：

```
left = 1, right = 4, mid = 2
left = 2, right = 4, mid = 3
left = 3, right = 4, mid = 3
left = 3, right = 4, mid = 3
left = 3, right = 4, mid = 3
left = 3, right = 4, mid = 3
```

**在区间只有 $2$ 个数的时候**，本题 `if`、`else` 的逻辑区间的划分方式是：`[left..mid - 1]` 与 `[mid..right]`。如果 `mid` 下取整，在区间只有 $2$ 个数的时候有 `mid` 的值等于 `left`，一旦进入分支 `[mid..right]` 区间不会再缩小，出现死循环。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2towzutmnj21hc0u041o.jpg)

**解决办法**：把取中间数的方式改成上取整。
