---
title: 「力扣」第 387 题：字符串中的第一个唯一字符（简单）
icon: yongyan
category: 数组
tags:
  - 数组
---

- 题目链接：[387. 字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string)。

## 题目描述

给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

**Example 1:**

```
Input: s = "leetcode"
Output: 0
```

**Example 2:**

```
Input: s = "loveleetcode"
Output: 2
```

**Example 3:**

```
Input: s = "aabb"
Output: -1
```

**Constraints:**

- `1 <= s.length <= 10^5`
- `s` consists of only lowercase English letters.

## 思路分析

把数组当做哈希表用。

**参考代码**：

```java
public class Solution {

    public int firstUniqChar(String s) {
        int[] hashMap = new int[26];
        char[] charArray = s.toCharArray();

        for (char c : charArray) {
            hashMap[c - 'a']++;
        }

        int len = s.length();
        for (int i = 0; i < len; i++) {
            if (hashMap[charArray[i] - 'a'] == 1) {
                return i;
            }
        }
        return -1;
    }
}
```
