---
title: 「力扣」第 290 题：单词规律（简单）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

- 题目链接：[290. 单词规律](https://leetcode-cn.com/problems/word-pattern/)。

## 题目描述

给定一种规律 `pattern` 和一个字符串 `str` ，判断 `str` 是否遵循相同的规律。

这里的 **遵循** 指完全匹配，例如， `pattern` 里的每个字母和字符串 `str` 中的每个非空单词之间存在着双向连接的对应规律。

**示例 1:**

```
输入: pattern = "abba", str = "dog cat cat dog"
输出: true
```

**示例 2:**

```
输入:pattern = "abba", str = "dog cat cat fish"
输出: false
```

**示例 3:**

```
输入: pattern = "aaaa", str = "dog cat cat dog"
输出: false
```

**示例 4:**

```
输入: pattern = "abba", str = "dog dog dog dog"
输出: false
```

**说明:**
你可以假设 `pattern` 只包含小写字母， `str` 包含了由单个空格分隔的小写字母。

**Constraints:**

- `1 <= pattern.length <= 300`
- `pattern` contains only lower-case English letters.
- `1 <= s.length <= 3000`
- `s` contains only lowercase English letters and spaces `' '`.
- `s` **does not contain** any leading or trailing spaces.
- All the words in `s` are separated by a **single space**.

## 思路分析

这里有一个小小的坑，就是当测试用例是：`String pattern = "abba";String str = "dog dog dog dog";`的时候，我们须要判断出结果是 `false`。

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Solution {

    public boolean wordPattern(String pattern, String str) {
        int patternLength = pattern.length();
        String[] strArray = str.split(" ");
        if (patternLength != strArray.length) {
            return false;
        }

        Map<Character, String> map1 = new HashMap<>();
        Set<String> uniqueValue = new HashSet<>();
        char[] patternArray = pattern.toCharArray();
        for (int i = 0; i < patternLength; i++) {
            if (map1.containsKey(patternArray[i])) {
                if (!map1.get(patternArray[i]).equals(strArray[i])) {
                    return false;
                }
            } else {
                if (uniqueValue.contains(strArray[i])) {
                    return false;
                }
                uniqueValue.add(strArray[i]);
                map1.put(patternArray[i], strArray[i]);
            }
        }
        return true;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        s = str.split()
        p = list(pattern)
        hash_map = {}
        if len(pattern) != len(s):
            return False
        for i in set(p):
            hash_map[s[p.index(i)]] = i
        for i in range(len(s)):
            if s[i] in hash_map: s[i] = hash_map[s[i]]
        return s == p
````

</CodeGroupItem>
</CodeGroup>
