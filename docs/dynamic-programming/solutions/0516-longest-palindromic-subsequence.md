---
title: 「力扣」第 516 题：最长回文子序列（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

+ 题目链接：[516. 最长回文子序列](https://leetcode-cn.com/problems/longest-palindromic-subsequence/)
+ 题解链接：[动态规划（Java）](https://leetcode-cn.com/problems/longest-palindromic-subsequence/solution/dong-tai-gui-hua-java-by-liweiwei1419-yz55/)

## 题目描述

给你一个字符串 `s` ，找出其中最长的回文子序列，并返回该序列的长度。

子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。

**示例 1：**

```
输入：s = "bbbab"
输出：4
解释：一个可能的最长回文子序列为 "bbbb" 。
```

**示例 2：**

```
输入：s = "cbbd"
输出：2
解释：一个可能的最长回文子序列为 "bb" 。
```

 **提示：**

- `1 <= s.length <= 1000`
- `s` 仅由小写英文字母组成

## 理解题意

+ 「子序列」不要求连续，但要求 **保持原始字符的相对顺序**；
+ 只返回最长的长度，不要求具体回文子序列是谁，一般而言使用「动态规划」。

## 思路分析

知道了小区间的最长回文子序列的长度，可以得到大区间的回文子序列的长度，根据这一点定义「子问题」，接下来需要考虑如何分类讨论。如何定义子问题（定义状态）和找到子问题的结果之间的联系（状态转移方程），需要有一定的做题的经验，类似的问题还有 [664. 奇怪的打印机](/problems/strange-printer/)，这一类「动态规划」问题有个名称叫「区间 DP」 。

**状态定义**：`dp[i][j]` 表示：字符区间 `s[i..j]` 里最长回文子序列的长度。

**分类讨论**：

+ 情况 1：当 `s[left] == s[right]` ，字符区间 `s[i..j]` 里最长回文子序列的长度，看去掉头和尾以后的区间的最长子序列的长度。

$$
dp[left][right] = dp[left + 1][right - 1] + 2
$$

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxh4pcubl1j30r606uwei.jpg" alt="image.png" style="zoom:50%;" />

+ 情况 2：当 `s[left] != s[right]` ，字符区间 `s[i..j]` 里最长回文子序列的长度，看「去掉头以后的区间的最长子序列的长度」和「去掉尾以后的区间的最长子序列的长度」，二者取最大值。

$$
dp[left][right] = \max(dp[left + 1][right], dp[left][right - 1])
$$

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxh4pd6xj5j30qa08w74j.jpg" alt="image.png" style="zoom:50%;" />

**输出**：$dp[0][N - 1]$，这里 $N$ 是字符串 `s` 的长度。

「动态规划」的计算过程像是在填写一张「二维表格」的上半部分，`dp[left][right]` 取决于：

+ `dp[left + 1][right - 1]`，左下角单元格；
+ `dp[left][right - 1]`，左边一格单元格；
+ `dp[left + 1][right]`，下边一格单元格。

下图中用 `l` 表示 `left`，用 `r` 表示 `right`，蓝色部分需要先计算出来，才可以保证红色部分计算出的结果是正确的（这一点由状态转移方程决定）。

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxh4pfooqqj30jc0g874p.jpg" alt="image.png" style="zoom:50%;" />

因此填表就需要注意：以上三个单元格的数值必须先计算出来，也就是需要满足小区间的状态值先计算出来，然后才能得到大区间的状态值。这一点在纸上画一个表格，稍微仔细一点，就不难写对代码。下面给出三种代码，状态转移方程的部分是一样的，区别只在于填表顺序，只在「参考代码 1」给出图例和复杂度分析，其它相同。

根据这种状态转移方程，聪明的你肯定可以想到，可以把空间复杂度优化到线性级别，但是没有必要了。做算法问题，空间够用，做到时间复杂度到最优即可。还有一条普遍适用的算法思想，就是「空间换时间」，**绝大部分情况下** 空间少了可能导致的后果是时间增加、思考的难度增加。这一点可以参考零神的分享 [刷题交流｜面试向的刷题小技巧](https://leetcode-cn.com/circle/discuss/9iLkc2/)。

**参考代码 1**：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxh4pis5vsj30mq0sctaf.jpg" alt="image.png" style="zoom:50%;" />

**说明**：

`int[][] dp = new int[len][len];` 这一行代码初始化的值都为 $0$，使用其它语言的朋友应该显式初始化，理由可见本题解下方第一条评论。这里感谢 [@yi-xiao-guo](/u/yi-xiao-guo/) 朋友的提醒。


```java
public class Solution {

    public int longestPalindromeSubseq(String s) {
        int len = s.length();
        if (len < 2) {
            return len;
        }

        // dp[i][j] 表示：字符区间 s[i..j] 里最长回文子序列的长度
        int[][] dp = new int[len][len];
        // 初始化：对角线上都是 1
        for (int i = 0; i < len; i++) {
            dp[i][i] = 1;
        }
        char[] charArray = s.toCharArray();
        for (int left = len - 2; left >= 0; left--) {
            for (int right = left + 1; right < len; right++) {
                if (charArray[left] == charArray[right]) {
                    dp[left][right] = dp[left + 1][right - 1] + 2;
                } else {
                    dp[left][right] = Math.max(dp[left][right - 1], dp[left + 1][right]);
                }
            }
        }
        return dp[0][len - 1];
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N^2)$，这里 $N$ 是字符串 `s` 的长度；
+ 空间复杂度：$O(N^2)$。

**参考代码 2**：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxh4pmk71tj30j80ict9g.jpg" alt="image.png" style="zoom:50%;" />

```java
public class Solution {

    public int longestPalindromeSubseq(String s) {
        int len = s.length();
        if (len < 2) {
            return len;
        }

        // dp[i][j] 表示：字符区间 s[i..j] 里最长回文子序列的长度
        int[][] dp = new int[len][len];
        // 初始化：对角线上都是 1
        for (int i = 0; i < len; i++) {
            dp[i][i] = 1;
        }
        char[] charArray = s.toCharArray();
        for (int right = 1; right < len; right++) {
            for (int left = right - 1; left >= 0; left--) {
                if (charArray[left] == charArray[right]) {
                    dp[left][right] = dp[left + 1][right - 1] + 2;
                } else {
                    dp[left][right] = Math.max(dp[left][right - 1], dp[left + 1][right]);
                }
            }
        }
        return dp[0][len - 1];
    }
}
```

**参考代码 3**：

这一版代码先计算出所有长度为 $2$ 的子区间的状态值、再计算出所有长度为 $3$ 的子区间的状态值、……。

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxh4ppjtbyj30k20iu3z9.jpg" alt="image.png" style="zoom: 50%;" />

```java
public class Solution {

    public int longestPalindromeSubseq(String s) {
        int len = s.length();
        if (len < 2) {
            return len;
        }

        // dp[i][j] 表示：字符区间 s[i..j] 里最长回文子序列的长度
        int[][] dp = new int[len][len];
        // 初始化：对角线上都是 1
        for (int i = 0; i < len; i++) {
            dp[i][i] = 1;
        }
        char[] charArray = s.toCharArray();
        // 先枚举区间的长度 L
        for (int L = 2; L <= len; L++) {
            // 固定左端点 left
            for (int left = 0; left < len; left++) {
                // 固定左端点 left 和区间长度 L 的情况下，可以计算出右端点，根据 L = right - left + 1 得
                int right = L + left - 1;
                // 如果越界，跳出内层循环
                if (right >= len) {
                    break;
                }
                if (charArray[left] == charArray[right]) {
                    dp[left][right] = dp[left + 1][right - 1] + 2;
                } else {
                    dp[left][right] = Math.max(dp[left + 1][right], dp[left][right - 1]);
                }
            }
        }
        return dp[0][len - 1];
    }
}
```

感谢大家的收看！