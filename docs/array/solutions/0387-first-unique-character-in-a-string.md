---
title: 「力扣」第 387 题：字符串中的第一个唯一字符（简单）
icon: yongyan
category: 数组
tags:
  - 数组
---


+ 题目链接：[387. 字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string)。



## 题目描述

> 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
>
> 案例：
>
> ```
> s = "leetcode"
> 返回 0.
> 
> s = "loveleetcode",
> 返回 2.
> ```
>
> 注意事项：您可以假定该字符串只包含小写字母。

知识点：把数组当做哈希表用。

Java 代码：

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








