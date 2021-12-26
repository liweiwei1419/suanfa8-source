---
title: 「力扣」第 202 题：同构字符串（简单）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---


+ 题目链接：[205. 同构字符串](https://leetcode-cn.com/problems/isomorphic-strings/)。

## 题目描述

给定两个字符串 `s` 和 `t`，判断它们是否是同构的。

如果 `s` 中的字符可以按某种映射关系替换得到 `t`，那么这两个字符串是同构的。

> Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。

> All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.



**示例 1:**

```
输入：s = "egg", t = "add"
输出：true
```

**示例 2：**

```
输入：s = "foo", t = "bar"
输出：false
```

**示例 3：**

```
输入：s = "paper", t = "title"
输出：true
```

**提示：**

+ `1 <= s.length <= 5 * 104`；

- 可以假设 `s` 和 `t` 长度相同（`t.length == s.length`）；
- `s` and `t` consist of any valid ascii character.

## 思路分析

重点：建立映射关系的时候，要检查两个 `key` 是否对应到同一个 `value` 上了。

越是简单的问题，越有小陷阱。

测试用例：输入："ab"、"aa"，输出：`false`。

**参考代码**：

```java
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Solution {

    public boolean isIsomorphic(String s, String t) {
        int n = s.length();
        if (n != t.length()) {
            return false;
        }
        Set<Character> set = new HashSet<>();
        Map<Character, Character> map = new HashMap<>();
        Character curS;
        Character curT;
        for (int i = 0; i < n; i++) {
            curS = s.charAt(i);
            curT = t.charAt(i);
            if (map.containsKey(curS)) {
                if (!curT.equals(map.get(curS))) {
                    return false;
                }
            } else {
                if (set.contains(curT)) {
                    return false;
                } else {
                    set.add(curT);
                    map.put(curS, curT);
                }
            }
        }
        return true;
    }
}
```

