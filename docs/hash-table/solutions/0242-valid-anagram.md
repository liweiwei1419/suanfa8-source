---
title: 「力扣」第 242 题：有效的字母异位词（简单）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

+ 题目链接：[242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)。

## 题目描述

给定两个字符串 `s` 和 `t` ，编写一个函数来判断 `t` 是否是 `s` 的字母异位词。

**注意：**若 `s` 和 `t` 中每个字符出现的次数都相同，则称 `s` 和 `t` 互为字母异位词。

**示例 1:**

```
输入: s = "anagram", t = "nagaram"
输出: true
```

**示例 2:**

```
输入: s = "rat", t = "car"
输出: false
```

 **提示:**

- `1 <= s.length, t.length <= 5 * 104`
- `s` 和 `t` 仅包含小写字母

**Constraints:**

- `1 <= s.length, t.length <= 5 * 104`
- `s` and `t` consist of lowercase English letters.

**Follow up:** What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

## 方法一


把两个字符串都转换成字符数组以后，进行排序，然后逐位进行比较。

**参考代码 1**：

```java
public class Solution {
    public boolean isAnagram(String s, String t) {
        boolean isAnagram = true;
        if (s.length() != t.length()) {
            isAnagram = false;
        } else {
            char[] sArray = s.toCharArray();
            Arrays.sort(sArray);
            char[] tArray = t.toCharArray();
            Arrays.sort(tArray);
            for (int i = 0; i < sArray.length; i++) {
                if (sArray[i] != tArray[i]) {
                    isAnagram = false;
                    break;
                }
            }
        }
        return isAnagram;
    }
}
```

## 方法二

放入一个 `Map` 中，只要后面有一个元素不出现在 `Map` 中，就退出，最后应该使得这个 `Map` 里所有元素的 `value` 值都为 `0`。

**参考代码 2**：

```java
public class Solution2 {
    public boolean isAnagram(String s, String t) {
        boolean isAnagram = true;
        if (s.length() != t.length()) {
            isAnagram = false;
        } else {
            char[] sArray = s.toCharArray();
            Map<Character, Integer> map1 = new HashMap<>();
            for (char c : sArray) {
                if (map1.containsKey(c)) {
                    map1.put(c, map1.get(c) + 1);
                } else {
                    map1.put(c, 1);
                }
            }
    
            char[] tArray = t.toCharArray();
            for (char c : tArray) {
                if (map1.containsKey(c) && map1.get(c) >= 1) {
                    map1.put(c, map1.get(c) - 1);
                } else {
                    isAnagram = false;
                    break;
                }
            }
        }
        return isAnagram;
    }
}
```
