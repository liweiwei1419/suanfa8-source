---
title: （会员题）「力扣」第 159 题：至多包含两个不同字符的最长子串（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

- 题目链接：（会员题）「力扣」第 159 题：[至多包含两个不同字符的最长子串](https://leetcode-cn.com/problems/longest-substring-with-at-most-two-distinct-characters/)。

## 题目描述

给定一个字符串 **_s_** ，找出 **至多** 包含两个不同字符的最长子串 **_t_** ，并返回该子串的长度。

示例 1：

```
输入: "eceba"

输出: 3

解释: t 是 "ece"，长度为 3。
```

示例 2:

```
输入: "ccaabbb"

输出: 5

解释: t 是 "aabbb"，长度为 5。
```

**Constraints:**

- `1 <= s.length <= 10^4`
- `s` consists of English letters.

## 思路分析

> 如果刚好包含 **3 种不同字符**，右边界不需要继续向右边扩展，此时应该把左边界向右边扩展。

> 因为题目只问 **至多** 包含 2 种不同字符，还得找最长的。

```java
public class Solution {

    public int lengthOfLongestSubstringTwoDistinct(String s) {
        int len = s.length();
        char[] charArray = s.toCharArray();

        int[] freq = new int[128];
        int res = 0;
        int count = 0;
        int left = 0;
        int right = 0;
        while (right < len) {
            if (freq[charArray[right]] == 0) {
                count++;
            }
            freq[charArray[right]]++;
            right++;
            while (count > 2) {
                freq[charArray[left]]--;
                if (freq[charArray[left]] == 0) {
                    count--;
                }
                left++;
            }
            res = Math.max(res, right - left);
        }
        return res;
    }
}
```
