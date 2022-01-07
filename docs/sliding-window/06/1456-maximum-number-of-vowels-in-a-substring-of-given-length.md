---
title: 「力扣」第 1456 题：定长子串中元音的最大数目（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---


+ 题目链接：[定长子串中元音的最大数目](https://leetcode-cn.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)。

## 题目描述

给你字符串 `s` 和整数 `k` 。

请返回字符串 `s` 中长度为 `k` 的单个子字符串中可能包含的最大元音字母数。

英文中的 **元音字母** 为（`a`, `e`, `i`, `o`, `u`）。

 

**示例 1：**

```
输入：s = "abciiidef", k = 3
输出：3
解释：子字符串 "iii" 包含 3 个元音字母。
```

**示例 2：**

```
输入：s = "aeiou", k = 2
输出：2
解释：任意长度为 2 的子字符串都包含 2 个元音字母。
```

**示例 3：**

```
输入：s = "leetcode", k = 3
输出：2
解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。
```

**示例 4：**

```
输入：s = "rhythms", k = 4
输出：0
解释：字符串 s 中不含任何元音字母。
```

**示例 5：**

```
输入：s = "tryhard", k = 4
输出：1
```

**提示：**

- `1 <= s.length <= 10^5`
- `s` 由小写英文字母组成
- `1 <= k <= s.length`

这是一道固定长度的滑动窗口问题。

**参考代码**：

```java
public class Solution {

    public int maxVowels(String s, int k) {
        char[] charArray = s.toCharArray();
        int len = s.length();
        int[] dict = new int[128];
        dict['a'] = 1;
        dict['e'] = 1;
        dict['i'] = 1;
        dict['o'] = 1;
        dict['u'] = 1;

        int count = 0;
        for (int i = 0; i < k; i++) {
            if (dict[charArray[i]] == 1) {
                count++;
            }
        }
        int res = count;


        for (int i = k; i < len; i++) {
            if (dict[charArray[i]] == 1) {
                count++;
            }
            if (dict[charArray[i - k]] == 1) {
                count--;
            }

            res = Math.max(res, count);
        }
        return res;
    }
}
```

