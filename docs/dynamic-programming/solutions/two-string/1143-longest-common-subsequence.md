---
title: 「力扣」第 1145 题：最长公共子序列（中等）
icon: shipin
categories: 动态规划
tags:
  - 动态规划
---

+ 题目链接： [1143. 最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)

## 题目描述

给定两个字符串 `text1` 和 `text2`，返回这两个字符串的最长 **公共子序列** 的长度。如果不存在 **公共子序列** ，返回 `0` 。

一个字符串的 **子序列** 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

- 例如，`"ace"` 是 `"abcde"` 的子序列，但 `"aec"` 不是 `"abcde"` 的子序列。

两个字符串的 **公共子序列** 是这两个字符串所共同拥有的子序列。

**示例 1：**

```
输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace" ，它的长度为 3 。
```

**示例 2：**

```
输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc" ，它的长度为 3 。
```

**示例 3：**

```
输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0 。
```

**提示：**

- `1 <= text1.length, text2.length <= 1000`
- `text1` 和 `text2` 仅由小写英文字符组成。

---

这里要为了考虑清楚边界问题，需要设置一个特殊的状态 `0`，这是基于特殊用例一个非空字符串与空字符串而来的。

+ 状态定义：`dp[i][j]` 表示长度为 `i` 的 `text1` 的**前缀**子串与长度为 `j` 的 `text2` 的前缀子串的“最长公共子串”的长度。

（类似的定义方式还有「力扣」第 10 题：正则表达式。）

+ 状态转移方程：

$$
\text{dp}[i][j] = 
\begin{cases}
\text{dp}[i - 1][j - 1]  &\text{if} \ \text{text1}[i] = \text{text2}[j] \\
\text{dp}[i][j - 1] \\
\text{dp}[i - 1][j]
\end{cases}
$$

+ 初始化：表格 `dp` 的第 1 行和第 1 列均为 0。
+ 输出：`dp[len1][len2]`。


Java 代码：

```java
public class Solution {

    public int longestCommonSubsequence(String text1, String text2) {
        int len1 = text1.length();
        int len2 = text2.length();

        int[][] dp = new int[len1 + 1][len2 + 1];
        for (int i = 0; i <= len1; i++) {
            dp[i][0] = 0;
        }
        for (int j = 0; j <= len2; j++) {
            dp[0][j] = 0;
        }
        for (int i = 0; i < len1; i++) {
            for (int j = 0; j < len2; j++) {
                if (text1.charAt(i) == text2.charAt(j)) {
                    dp[i + 1][j + 1] = dp[i][j] + 1;
                } else {
                    dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
                }
            }
        }
        return dp[len1][len2];
    }
}
```


说明：如果不考虑边界，写出来的代码是这样的。可以对比一下，代码量会多一些，而且比较容易出错。

Java 代码：

```java
public class Solution {

    public int longestCommonSubsequence(String text1, String text2) {
        int len1 = text1.length();
        int len2 = text2.length();

        int[][] dp = new int[len1][len2];

        if (text1.charAt(0) == text2.charAt(0)) {
            dp[0][0] = 1;
        }

        // 写第 1 行
        for (int j = 1; j < len2; j++) {
            dp[0][j] = dp[0][j - 1];
            if (text1.charAt(0) == text2.charAt(j)) {
                dp[0][j] = 1;
            }
        }

        // 写第 1 列
        for (int i = 1; i < len1; i++) {
            dp[i][0] = dp[i - 1][0];
            if (text1.charAt(i) == text2.charAt(0)) {
                dp[i][0] = 1;
            }
        }

        for (int i = 1; i < len1; i++) {
            for (int j = 1; j < len2; j++) {
                if (text1.charAt(i) == text2.charAt(j)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[len1 - 1][len2 - 1];
    }
}
```

