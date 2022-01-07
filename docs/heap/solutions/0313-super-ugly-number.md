---
title: 「力扣」第 313 题：超级丑数（中等）
icon: yongyan
category: 优先队列
tags:
  - 优先队列
---

+ 题目链接：[313. 超级丑数](https://leetcode-cn.com/problems/super-ugly-number/)；
+ 题解链接：[动态规划（Java）](https://leetcode-cn.com/problems/super-ugly-number/solution/dong-tai-gui-hua-java-by-liweiwei1419-1yna/)。


## 题目描述

**超级丑数** 是一个正整数，并满足其所有质因数都出现在质数数组 `primes` 中。

给你一个整数 `n` 和一个整数数组 `primes` ，返回第 `n` 个 **超级丑数** 。

题目数据保证第 `n` 个 **超级丑数** 在 **32-bit** 带符号整数范围内。

**示例 1：**

```
输入：n = 12, primes = [2,7,13,19]
输出：32 
解释：给定长度为 4 的质数数组 primes = [2,7,13,19]，前 12 个超级丑数序列为：[1,2,4,7,8,13,14,16,19,26,28,32] 。
```

**示例 2：**

```
输入：n = 1, primes = [2,3,5]
输出：1
解释：1 不含质因数，因此它的所有质因数都在质数数组 primes = [2,3,5] 中。
```

**提示：**

- `1 <= n <= 106`
- `1 <= primes.length <= 100`
- `2 <= primes[i] <= 1000`
- 题目数据 **保证** `primes[i]` 是一个质数
- `primes` 中的所有值都 **互不相同** ，且按 **递增顺序** 排列

---

## 理解题意

+ 这里 `1` 是丑数，在 [264. 丑数 II](/problems/ugly-number-ii/) 的「示例 2」里有说「`1` 通常被视为丑数」，本题的两个示例也都告诉我们 `1` 是丑数；
+ 「超级」这两个字是相对 [264. 丑数 II](/problems/ugly-number-ii/) 而言的，本题质因数来自某个长度不确定的整数列表，所以叫「超级」，除此之外「超级」没有特别的含义；
+ 第 `n` 个 **超级丑数** 是指第 `n` 小的超级丑数。


**思路分析**：

第 `n` 个超级丑数是基于 **前面某一个超级丑数乘以某一个 `primes[i]`** 得到的（注意：只需要乘以某一个质数），基于这一点（递推关系），可以使用「动态规划」。

## 方法：动态规划

**状态定义**：`dp[i]` 表示第 `i + 1` 个超级丑数，第 1 个超级丑数是 `dp[0]`，第 2 个超级丑数是 `dp[1]`，……

以「示例 1」为例，`primes = [2, 7, 13, 19]`。

+ 第 1 个超级丑数是 $2^0 \cdot 7^0 \cdot 13^0 \cdot 19^0$，因此 `dp[0] = 1`；
+ 第 2 个超级丑数是基于第 1 个超级丑数 `dp[0]`「乘以 2」或者「乘以 7」或者「乘以 13」或者「乘以 19」得到，选出最小者为 `dp[0]` 「乘以 2」，即 `dp[1] = dp[0] * 2 = 2`。那么 

> **下一个丑数如果是因为「乘以 2」得到，一定不是基于 `dp[0]` 而是基于 `dp[1]`**，这一点很重要。

+ 第 3 个超级丑数，比较这四个数：`dp[1] * 2 = 4`，`dp[0] * 7 = 7`、`dp[0] * 13 = 13`、`dp[0] * 19 = 19`，选出最小的是 `dp[2] = dp[1] * 2 = 4`，那么下一个丑数如果是因为「乘以 2」得到，一定是基于 `dp[2]`。

以此类推选下去，直到选出第 `n` 个丑数 `dp[n - 1]`。基于哪一个超级丑数，可以使用一个长度和 `primes` 相等的数组 `indexes` 记录下来，**`indexes[i]` 表示下一个丑数如果选择了 `primes[i]` 是基于哪一个下标的超级丑数得到的**。

选超级丑数的过程就相当于有 `primes.length` 这么多指针，在超级丑数列表上前进，一开始都在下标 `0`，然后 **每一次可能选出多干个指针（注意这个细节，代码中有注释）**，让它们各前进一步，不回头。

**参考代码**：

```Java []
public class Solution {

    public int nthSuperUglyNumber(int n, int[] primes) {
        int pLen = primes.length;
        int[] indexes = new int[pLen];
        
        int[] dp = new int[n];
        dp[0] = 1;
        for (int i = 1; i < n; i++) {
            // 因为选最小值，先假设一个最大值
            dp[i] = Integer.MAX_VALUE;
            for (int j = 0; j < pLen; j++) {
                dp[i] = Math.min(dp[i], dp[indexes[j]] * primes[j]);
            }

            // dp[i] 是之前的哪个丑数乘以对应的 primes[j] 选出来的，给它加 1
            for (int j = 0; j < pLen; j++) {
                if (dp[i] == dp[indexes[j]] * primes[j]) {
                    // 注意：这里不止执行一次，例如选出 14 的时候，2 和 7 对应的最小丑数下标都要加 1，大家可以打印 indexes 和 dp 的值加以验证
                    indexes[j]++;
                }
            }
        }
        return dp[n - 1];
    }
}
```

**解释**：`indexes` 数组的含义：如果下一个超级丑数要选择 `primes[j]` 作为质因数，基于之前的哪一个丑数，**选过之后就移到下一个丑数**（不能移到下下一个，因为下下一个肯定更大）。可以打印数组 `indexes` 和 `dp` 看一下。


**复杂度分析**：

+ 时间复杂度：$O(nm)$，这里 $n$ 就是题目中的 $n$，$m$ 是质数数组的长度，外层循环次 $n$，内层循环遍历了 2 次质数数组，$O(n \times 2 \times m) = O(nm)$；
+ 空间复杂度：$O(n + m)$。

**补充**：

这里比较烦的是内层循环的第 2 个 `for` 循环：

```java
// dp[i] 是之前的哪个丑数乘以对应的 primes[j] 选出来的，给它加 1
for (int j = 0; j < pLen; j++) {
    if (dp[i] == dp[indexes[j]] * primes[j]) {
        indexes[j]++;
    }
}
```

题目中说 `1 <= primes.length <= 100`，是一个很小的整数。所以用遍历选出之前对应的丑数的下标问题不大。如果要优化的话可以使用「堆（绑定一个下标）」或者「索引堆」来做。绝大多数语言的库函数中没有「索引堆」，面试也不会考。

更好的优化的解法（在遍历的时候记录需要自增的指数对应的最小丑数下标）可以参考 [@ryaninnerpeace](/u/ryaninnerpeace/) 的 [评论](https://leetcode-cn.com/problems/super-ugly-number/solution/dong-tai-gui-hua-java-by-liweiwei1419-1yna/1070728) 或者 [题解](https://leetcode-cn.com/problems/super-ugly-number/solution/dong-tai-gui-hua-by-ryaninnerpeace-07cj/)。