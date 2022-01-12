---
title: （会员题）「力扣」第 340 题：至多包含 K 个不同字符的最长子串（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

+ 题目链接：（会员题）「力扣」第 340 题：[至多包含 K 个不同字符的最长子串](https://leetcode-cn.com/problems/longest-substring-with-at-most-k-distinct-characters/)（中等）


## 题目描述

给定一个字符串 ***s*** ，找出 **至多** 包含 *k* 个不同字符的最长子串 ***T***。

**示例 1：**

```
输入: s = "eceba", k = 2

输出: 3

解释: 则 T 为 "ece"，所以长度为 3。
```

**示例 2：**

```
输入: s = "aa", k = 1

输出: 2

解释: 则 T 为 "aa"，所以长度为 2。
```

**Constraints:**

- `1 <= s.length <= 5 * 10^4`

- `0 <= k <= 50`

## 思路分析

左端点固定的情况下，如果已经包含 k + 1 个字符，右端点更长的字符串一定也包含 k + 1 个字符，所以一定不是我们要找的目标字符串。

并且题目只问长度，不问是什么。

**如果题目只要求问「最大值是多少」，没有必要去研究最大值是哪个。**

> 将左右指针都设置为 `0`

> 然后向右移动 `right` 指针保证区间内含有不超过 `k` 个不同字符（题目要找「至多」）

> 当移动到含有 `k + 1` 个不同字符的时候

> 移动 `left` 指针直到区间内不含有超过 `k + 1` 个不同字符

**参考代码**：

```java
public class Solution {

    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        int len = s.length();
        char[] charArray = s.toCharArray();
        int[] freq = new int[128];

        int count = 0;
        int res = 0;

        int left = 0;
        int right = 0;
        while (right < len) {
            if (freq[charArray[right]] == 0) {
                count++;
            }
            freq[charArray[right]]++;
            right++;
            while (count > k) {
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

