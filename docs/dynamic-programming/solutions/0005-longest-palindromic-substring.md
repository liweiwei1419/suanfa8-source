---
title: 「力扣」第 5 题：最长回文子串（中等）
icon: shipin
category: 动态规划
tags:
  - 动态规划
  - 区间 DP
---

通过这道题体会「动态规划」问题「自底向上」「填表」的思路和一些细节。

- 题目链接：[5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)；
- 题解链接：[动态规划、中心扩散、Manacher 算法](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zhong-xin-kuo-san-dong-tai-gui-hua-by-liweiwei1419/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-zi-chuan-by-leetcode-solution/) 和 [B 站](https://www.bilibili.com/video/BV1L54y1D7pa) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=840714948&bvid=BV1L54y1D7pa&cid=193442819&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

给你一个字符串 `s`，找到 `s` 中最长的回文子串。

**示例 1：**

```
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```

**示例 2：**

```
输入：s = "cbbd"
输出："bb"
```

**示例 3：**

```
输入：s = "a"
输出："a"
```

**示例 4：**

```
输入：s = "ac"
输出："a"
```

**提示：**

- `1 <= s.length <= 1000`
- `s` 仅由数字和英文字母（大写和/或小写）组成

## 思路分析

回文天然具有「状态转移」性质：一个长度严格大于 $2$ 的回文去掉头尾字符以后，剩下的部分依然是回文。反之，如果一个字符串头尾两个字符都不相等，那么这个字符串一定不是回文。「动态规划」的方法根据这样的性质得到。

#### 第 1 步：定义状态

`dp[i][j]` 表示：子串 `s[i..j]` 是否为回文子串，这里子串 `s[i..j]` 定义为左闭右闭区间，即可以取到 `s[i]` 和 `s[j]`。

#### 第 2 步：思考状态转移方程

根据头尾字符是否相等，需要分类讨论：

```java
dp[i][j] = (s[i] == s[j]) and dp[i + 1][j - 1]
```

**说明**：

- 「动态规划」的「自底向上」求解问题的思路，很多时候是在填写一张二维表格。由于 `s[i..j]` 表示 `s` 的一个子串，因此 `i` 和 `j` 的关系是 `i <= j`，只需要填这张表格对角线以上的部分；
- 看到 `dp[i + 1][j - 1]` 就需要考虑特殊情况：如果去掉 `s[i..j]` 头尾两个字符子串 `s[i + 1..j - 1]` 的长度严格小于 $2$（不构成区间），即 $j - 1 - (i + 1) + 1 < 2$ 时，整理得 $j - i < 3$，此时 `s[i..j]` 是否是回文只取决于 `s[i]` 与 `s[j]` 是否相等。结论也比较直观：$j - i < 3$ 等价于 $j - i + 1 < 4$，即当子串 $s[i..j]$ 的长度等于 $2$ 或者等于 $3$ 的时候，`s[i..j]` 是否是回文由 `s[i]` 与 `s[j]` 是否相等决定。

#### 第 3 步：考虑初始化

单个字符一定是回文串，因此把对角线先初始化为 `true`，即 `dp[i][i] = true`。根据第 2 步的说明：当 `s[i..j]` 的长度为 $2$ 时，只需要判断 `s[i]` 是否等于 `s[j]`，所以二维表格对角线上的数值不会被参考。所以不设置 `dp[i][i] = true` 也能得到正确结论。

#### 第 4 步：考虑输出

一旦得到 `dp[i][j] = true`，就记录子串的「长度」和「起始位置」。没有必要截取，这是因为截取字符串也有性能消耗。

#### 第 5 步：考虑优化空间

- 下面给出的「参考代码」，在填表的过程中，只参考了左下方的数值。事实上可以优化，但是增加了代码编写和理解的难度，丢失了可读性和可解释性。在这里不做优化空间；
- 填表应该遵守这样的原则：总是先得到小子串是否是回文的结果，然后大子串才能参考小子串的判断结果，所以填表顺序很重要；
- 建议自己动手，画一下表格，相信会对「动态规划」作为一种「表格法」有更好的理解。

**参考代码 2**：

```Java []
public class Solution {

    public String longestPalindrome(String s) {
        // 特殊用例判断
        int len = s.length();
        if (len < 2) {
            return s;
        }

        int maxLen = 1;
        int begin = 0;

        // dp[i][j] 表示 s[i, j] 是否是回文串
        boolean[][] dp = new boolean[len][len];
        char[] charArray = s.toCharArray();

        for (int i = 0; i < len; i++) {
            dp[i][i] = true;
        }
        for (int j = 1; j < len; j++) {
            for (int i = 0; i < j; i++) {
                if (charArray[i] != charArray[j]) {
                    dp[i][j] = false;
                } else {
                    if (j - i < 3) {
                        dp[i][j] = true;
                    } else {
                        dp[i][j] = dp[i + 1][j - 1];
                    }
                }

                // 只要 dp[i][j] == true 成立，就表示子串 s[i..j] 是回文，此时记录回文长度和起始位置
                if (dp[i][j] && j - i + 1 > maxLen) {
                    maxLen = j - i + 1;
                    begin = i;
                }
            }
        }
        return s.substring(begin, begin + maxLen);
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N^{2})$，这里 $N$ 是字符串的长度；
- 空间复杂度：$O(N^{2})$，使用了一张二维表格记录所有可能的情况，因此空间复杂度是 $O(N^{2})$。
