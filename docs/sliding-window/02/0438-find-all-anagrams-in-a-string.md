---
title: 「力扣」第 438 题：找到字符串中所有字母异位词（中等）
icon: yongyan
categories: 滑动窗口
tags:
  - 滑动窗口
---

+ 题目链接：[438. 找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)；
+ 题解链接：[滑动窗口（Java）](https://leetcode-cn.com/problems/VabMRr/solution/hua-dong-chuang-kou-java-by-liweiwei1419-r567/)。

## 题目描述

给定一个字符串 **s** 和一个非空字符串 **p**，找到 **s** 中所有是 **p** 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 **s** 和 **p** 的长度都不超过 20100。

**说明：**

- 字母异位词指字母相同，但排列不同的字符串。
- 不考虑答案输出的顺序。

**示例 1:**

```
输入:
s: "cbaebabacd" p: "abc"

输出:
[0, 6]

解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
```

**示例 2:**

```Java []
输入:
s: "abab" p: "ab"

输出:
[0, 1, 2]

解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
```



**提示:**

- `1 <= s.length, p.length <= 3 * 104`
- `s` 和 `p` 仅包含小写字母

---

这道题是「力扣」第 76 题（[最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)）的同类问题，可以参考 [官方题解](https://leetcode-cn.com/problems/minimum-window-substring/solution/zui-xiao-fu-gai-zi-chuan-by-leetcode-solution/) 中的视频题解。

写出来有点麻烦而已，其实没有什么技巧。

**参考代码**：

```Java []
public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int sLen = s.length();
        List<Integer> res = new ArrayList<>();
        if (sLen == 0) {
            return res;
        }
        int pLen = p.length();

        int[] window = new int[128];
        int[] pattern = new int[128];

        // 如果 s 中某个字符的频率与 p 中一样，sCount 加 1
        int sCount = 0;
        // pCount：p 中不同字符的个数
        int pCount = 0;
        for (char pChar : p.toCharArray()) {
            pattern[pChar]++;
        }
        for (int i = 0; i < 128; i++) {
            if (pattern[i] > 0) {
                pCount++;
            }
        }

        int left = 0;
        int right = 0;
        while (right < sLen) {
            if (pattern[s.charAt(right)] > 0) {
                window[s.charAt(right)]++;
                if (pattern[s.charAt(right)] == window[s.charAt(right)]) {
                    sCount++;
                }
            }
            right++;

            while (pCount == sCount) {
                // 此时滑动窗口是 [left..right)，长度是 right - left
                if (right - left == pLen){
                    res.add(left);
                }
                if (pattern[s.charAt(left)] > 0) {
                    window[s.charAt(left)]--;
                    if (window[s.charAt(left)] < pattern[s.charAt(left)]) {
                        sCount--;
                    }
                }
                left++;
            }
        }
        return res;
    }
}
```