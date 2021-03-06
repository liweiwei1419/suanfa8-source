---
title: 「力扣」第 201 题：数字范围按位与
icon: yongyan
category: 位运算
tags:
  - 位运算
---

- 题目链接：[201. 数字范围按位与](https://leetcode-cn.com/problems/bitwise-and-of-numbers-range/)。

## 题目描述

给你两个整数 `left` 和 `right` ，表示区间 `[left, right]` ，返回此区间内所有数字 **按位与** 的结果（包含 `left` 、`right` 端点）。

**示例 1：**

```
输入：left = 5, right = 7
输出：4
```

**示例 2：**

```
输入：left = 0, right = 0
输出：0
```

**示例 3：**

```
输入：left = 1, right = 2147483647
输出：0
```

**提示：**

- $0 \le left \le right \le 2^{31} - 1$

分析：位运算的问题，干脆就把它记住。

思路：相邻的两个数末尾相与一定等于 $0$。于是就有如下写法：

Java 代码：

```java
public class Solution2 {
    /**
     * 真的是很酷！
     *
     * @param m
     * @param n
     * @return
     */
    public int rangeBitwiseAnd(int m, int n) {
        int count = 0;
        while (m != n) {
            m >>= 1;
            n >>= 1;
            count++;
        }
        return m << count;
    }
}
```

于是我们可以一步到位，利用 `n &= (n - 1)` 运算依次消去“大于” `m` 的部分的 $1$。

Java 代码：

```java
/**
 * https://blog.csdn.net/DERRANTCM/article/details/47997613
 *
 * @author liwei
 * @date 18/6/29 下午9:37
 */
public class Solution3 {

    /**
     * 利用了 n &= (n - 1) 一下能消死一大片
     *
     * @param m
     * @param n
     * @return
     */
    public int rangeBitwiseAnd(int m, int n) {
        while (n > m) {
            n &= (n - 1);
        }
        return n;
    }
}
```
