---
title: 「力扣」第 343 题：整数拆分（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
  - 贪心算法
---

+ 题目链接：[343. 整数拆分](https://leetcode-cn.com/problems/integer-break/)；
+ 题解链接：[记忆化递归、动态规划 、贪心算法（Java、Python）](https://leetcode-cn.com/problems/integer-break/solution/tan-xin-xuan-ze-xing-zhi-de-jian-dan-zheng-ming-py/)。

## 题目描述

给定一个正整数 *n*，将其拆分为**至少**两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

**示例 1:**

```
输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1。
```

**示例 2:**

```
输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
```

**说明:** 你可以假设 *n* 不小于 2 且不大于 58。

**Constraints:**

- `2 <= n <= 58`

## 思路分析

关键在「将其拆分为**至少**两个正整数的和」，还可以使用「贪心算法」。

## 方法一：回溯（暴力搜索）

遍历将一个数做分割的所有可能性，时间复杂度是 $O(2^n)$。

首先我们来看 LeetCode 第 343 题，其实动态规划也包含了暴力求解，只不过我们按照一定规律，并且是在假设规模更小的问题已经得到解决的情况下，得到了我们原先要解决的那个规模的问题的解，我个人认为技巧在于「分类讨论」，而「分类讨论」的关键就在于「不重不漏」。

## 方法二：记忆化递归

这道题解题的关键在于「至少分割成两个正整数」，从这个角度出发，就能够得到我们「自顶向下」思考这个问题的路径，进而使用「记忆化搜索」或者「动态规划」得到原问题的解。

分析这个问题的递归结构：「至少分割成两个正整数」 = 「一个正整数」 + 「另一个还没有分割的正整数」。

画出如下树形结构：

![LeetCode 第 343 号问题：Integer Break](https://liweiwei1419.gitee.io/images/leetcode-notes/dp/dynamic-programming-3-1.jpg)

发现有大量重叠子问题。

定义状态：$F(i)$ 表示正整数 $i$ 经过分割以后得到的数字乘积的最大值。

则状态转移方程是：

$$
F(i) = \max( 1 \times (i-1),1 \times F(i-1) ,2\times F(i-2) ,2 \times (i-2),...,(n-1)\times F(1) , n-1 \times 1 )
$$

从这个过程中体会：1、原问题的解是规模更小的子问题的解的组合；2、「状态」定义好了，上面的那个等式，其实就是「状态转移方程」。

对于每一个状态而言，还要再比较「不再继续分割」和「继续分割」，取当中的最大值。由上面的思路，我们可以写一个递归方法。

下面，我们给出 3 个解答，这 3 种方式的解答体现了我们思考“线性规划”问题的一般步骤。

Java 代码：不含记忆化搜索的递归

```java
public class Solution {

    public int integerBreak(int n) {
        int res = breakInteger(n);
        return res;
    }

    /**
     * 将 n 进行分割（至少分割成两个部分），可以获得乘积的最大值
     * @param num
     * @return 将 n 进行分割得到的乘积最大值
     */
    private int breakInteger(int num) {
        if (num == 1) {
            return 1;
        }
        int res = 0; // 这个初始值可以设置为 0 吗，1 行不行？
        for (int i = 1; i < num; i++) {
            // 关键之处：状态转移方程，其中 i * (num - i) 这一步很关键，千万不能漏掉
            // 这里有一个陷阱，就是不能忽略能不能继续分割的情况
            res = max3(res, i * (num - i), i * breakInteger(num - i));
        }
        return res;
    }

    private int max3(int num1, int num2, int num3) {
        int temp = Integer.max(num1, num2);
        return Integer.max(temp, num3);
    }


    // 对于 2 和 3 这种分解之后乘积不超过自己的怎么办？
    public static void main(String[] args) {
        Solution solution = new Solution();
        int max = solution.integerBreak(3);
        System.out.println(max);
    }
}
```

Java 代码：加入了记忆化搜索的递归


```java
/**
 * 加入了记忆化搜索的递归解法
 * Created by liwei on 17/10/3.
 */
public class Solution2 {

    private int[] memory;

    public int integerBreak(int n) {
        assert n >= 2;
        memory = new int[n + 1];
        memory[0] = 0;
        memory[1] = 1;
        for (int i = 2; i < n + 1; i++) {
            memory[i] = -1;
        }
        int res = breakInteger(n);
        return res;
    }


    // 将 n 进行分割得到的乘积最大值
    private int breakInteger(int num) {
        if (num == 1) {
            return 1;
        }
        if (memory[num] == -1) {
            int res = 0; // 这个初始值可以设置为 0 吗，1 行不行？
            for (int i = 1; i < num; i++) {
                // 关键之处：状态转移方程，其中 i * (num - i) 这一步很关键，千万不能漏掉
                res = max3(res, i * (num - i), i * breakInteger(num - i));
            }
            memory[num] = res;
        }
        return memory[num];
    }

    private int max3(int num1, int num2, int num3) {
        int temp = Integer.max(num1, num2);
        return Integer.max(temp, num3);
    }

    public static void main(String[] args) {
        Solution2 solution = new Solution2();
        int max = solution.integerBreak(9);
        System.out.println(max);
    }
}
```

## 方法三：动态规划

总结：先研究递归结构，再记忆化搜索，最后实现使用「动态规划」。即先「自顶向下」思考，再「自底向上」实现。

Java 代码：


```java
public class Solution3 {

    private int[] memory;

    public int integerBreak(int n) {
        memory = new int[n + 1];
        memory[0] = 0;
        memory[1] = 1;
        for (int i = 2; i <= n; i++) {
            int maxValue = -1;
            for (int j = 1; j <= i - 1; j++) {
                maxValue = max3(maxValue, j * (i - j), j * memory[i - j]);
            }
            memory[i] = maxValue;
        }
        return memory[n];
    }

    private int max3(int num1, int num2, int num3) {
        int temp = Integer.max(num1, num2);
        return Integer.max(temp, num3);
    }

    public static void main(String[] args) {
        Solution3 solution = new Solution3();
        int max = solution.integerBreak(9);
        System.out.println(max);
    }
}
```

Python 代码：动态规划，注意：将 $n$ 进行分解的时候，以 $8$ 为例：$1$ 与 $7$ 是一个解，$1$ 与 $7$ 的分解的结果也是一个解。

```python
class Solution:
    def integerBreak(self, n):
        """
        :type n: int
        :rtype: int
        """
        product = [0] * (n + 1)
        product[1] = 1
        for i in range(2, n + 1):
            product_max = 0
            for j in range(1, i):
                product_max = max(j * product[i - j], product_max, j * (i - j))
            product[i] = product_max
        return product[n]
```

Python 代码：动态规划，注意：将 $n$ 进行分解的时候，以 $8$ 为例：$1$ 与 $7$ 是一个解，$1$ 与 $7$ 的分解的结果也是一个解。

```python
class Solution(object):
    def integerBreak(self, n):
        dp = [1] * (n + 1)
        for i in range(2, n + 1):
            for j in range(1, i):
                dp[i] = max(dp[i], j * (i - j), j * dp[i-j])
        return dp[-1]
```

Python 代码：

```python
class Solution:
    def integerBreak(self, n):
        """
        :type n: int
        :rtype: int
        """
        product = [0] * (n + 1)
        product[1] = 1
        for i in range(2, n + 1):
            product_max = 0
            for j in range(1, i):
                product_max = max(j * product[i - j], product_max, j * (i - j))
            product[i] = product_max
        return product[n]
```

## 方法四：贪心算法

这个规律要写到 $10$ 左右才能看清楚。

![LeetCode 第 343 号问题：Integer Break-2](https://liweiwei1419.gitee.io/images/leetcode-notes/dp/dynamic-programming-3-2.jpg)

Python 代码：

```python
class Solution:
    def integerBreak(self, n):
        if n == 2:
            return 1
        if n == 3:
            return 2
        if n == 4:
            return 4
        res = 1
        while n > 4:
            res *= 3
            n -= 3

        res *= n
        return res


if __name__ == '__main__':
    n = 10
    s = Solution()
    res = s.integerBreak(n)
    print(res)
```

Python 代码：贪心算法：1、能拆出 3 ，就尽量拆出 3；2、最多拆出 2 个 2。

![LeetCode 第 343 号问题：Integer Break-3](https://liweiwei1419.gitee.io/images/leetcode-notes/dp/dynamic-programming-3-3.jpg)

