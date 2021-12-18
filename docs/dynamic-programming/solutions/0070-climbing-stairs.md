---
title: 「力扣」第 70 题：爬楼梯
icon: yongyan
categories: 动态规划
tags:
  - 动态规划
---

斐波拉契数列，画出树形结构，发现大量重叠子问题。「动态规划」告诉我们「自顶向上」求解问题的思路。

+ [题目链接](https://leetcode-cn.com/problems/climbing-stairs)
+ [英文地址](https://leetcode.com/problems/climbing-stairs/description/) 

## 题目描述

假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例 1：

```
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。

1.  1 阶 + 1 阶
2.  2 阶
```

示例 2：

```
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。

1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```


## 方法一：使用记忆化递归

**参考代码**：

加入「缓存」的递归实现

```java
public class Solution {

    private int[] memory;

    public int climbingStairs(int n) {
        if (n <= 0) {
            return 1;
        }
        memory = new int[n + 1];
        for (int i = 0; i < n + 1; i++) {
            memory[i] = -1;
        }
        int res = climbinng(n);
        return res;
    }

    private int climbinng(int n) {
        if (n == 1) {
            return 1;
        }
        if (n == 2) { // 方法1：一个台阶，一个台阶；方法2：一次上两个台阶
            return 2;
        }
        // 接下来就是看图说话了(乘法计数原理)
        if (memory[n] == -1) {
            memory[n] = climbinng(n - 1) * 1 + climbinng(n - 2) * 1;
        }
        return memory[n];
    }
}
```


说明：递归的代码写起来比较繁琐，我们可以用于思考。另一种写法就是「自底向上」，即「动态规划」。

## 方法二：动态规划（理解「自底向上」，不是直接面对问题求解的思路）

在「记忆化搜索」的基础上，写出的动态规划版本。

思考过程：

+ 爬 $0$ 个台阶，有 $1$ 种爬法；
+ 爬 $1$ 个台阶，有 $1$ 种爬法；
+ 爬 $2$ 个台阶，有 $2$ 种爬法；
+ 爬 $3$ 个台阶，$(2，1) + (1，2)$；
+ 爬 $4$ 个台阶，$(3，1) + (2，2)$；
+ 爬 $5$ 个台阶，$(4，1) + (3，2)$；
+ 爬 $6$ 个台阶，$(5，1) + (4，2)$，以此类推。

其中，$(i，j)$ 表示先爬 $i$ 个台阶的所有不同爬法，然后再爬  $j$ 个台阶的所有不同爬法。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int climbingStairs(int n) {
        if (n <= 0) {
            return 1;
        }
        if (n == 1) {
            return 2;
        }
        int[] memory = new int[n + 1];
        for (int i = 0; i < n + 1; i++) {
            memory[i] = -1;
        }
        for (int i = 2; i < n + 1; i++) {
            memory[i] = memory[i - 1] + memory[i - 2];
        }
        return memory[n + 1];
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:

    def climbStairs(self, n):
        if n == 0:
            return 1
        memo = [-1] * (n + 1)
        memo[0] = 1
        memo[1] = 1
        for i in range(2, n + 1):
            memo[i] = memo[i - 1] + memo[i - 2]
        return memo[n]


if __name__ == '__main__':
    s = Solution()
    res = s.climbStairs(2)
    print(res)
```
</CodeGroupItem>
</CodeGroup>