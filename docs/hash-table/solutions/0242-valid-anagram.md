---
title: 「力扣」第 242 题：有效的字母异位词
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

+ 题目链接：[]()；
+ 题解链接：[]()。

## 题目描述

#### [242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)





### 「力扣」第 242 题：Valid Anagram

思路1：把两个字符串都转换成字符数组以后，进行排序，然后逐位进行比较。

Java 代码：

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

思路2：放入一个 Map 中，只要后面有一个元素不出现在 Map 中，就退出，最后应该使得这个 Map 里所有元素的 value 值都为 0。

Java 代码：

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

### 