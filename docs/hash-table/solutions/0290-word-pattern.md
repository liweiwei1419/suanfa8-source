---
title: 「力扣」第 290 题：单词规律（简单）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

+ 题目链接：[]()；
+ 题解链接：[]()。

## 题目描述


思路：这里有一个小小的坑，就是当测试用例是：`String pattern = "abba";String str = "dog dog dog dog";`的时候，我们须要判断出结果是 `false`。

Java 代码：

```java
public class Solution {
    public boolean wordPattern(String pattern, String str) {
        boolean wordPattern = false;
        int patternLength = pattern.length();
        String[] strArray = str.split(" ");
        if (patternLength == strArray.length) {

            Map<Character, String> map1 = new HashMap<>();
            Set<String> uniqueValue = new HashSet<>();
            char[] patternArray = pattern.toCharArray();
            for (int i = 0; i < patternLength; i++) {
                if (map1.containsKey(patternArray[i])) {
                    if (!map1.get(patternArray[i]).equals(strArray[i])) {
                        return wordPattern;
                    }
                } else {
                    if (uniqueValue.contains(strArray[i])) {
                        return wordPattern;
                    }
                    uniqueValue.add(strArray[i]);
                    map1.put(patternArray[i], strArray[i]);
                }
            }
            wordPattern = true;
        }
        return wordPattern;
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        String pattern = "abba";
        String str = "dog dog dog dog";
        boolean wordPattern = solution.wordPattern(pattern, str);
        System.out.println(wordPattern);
    }
}
```

### 



```java
class Solution {
    public boolean wordPattern(String pattern, String str) {
        boolean wordPattern = false;
        int patternLength = pattern.length();
        String[] strArray = str.split(" ");
        if (patternLength == strArray.length) {

            Map<Character, String> map1 = new HashMap<>();
            Set<String> uniqueValue = new HashSet<>();
            char[] patternArray = pattern.toCharArray();
            for (int i = 0; i < patternLength; i++) {
                if (map1.containsKey(patternArray[i])) {
                    if (!map1.get(patternArray[i]).equals(strArray[i])) {
                        return wordPattern;
                    }
                } else {
                    if (uniqueValue.contains(strArray[i])) {
                        return wordPattern;
                    }
                    uniqueValue.add(strArray[i]);
                    map1.put(patternArray[i], strArray[i]);
                }
            }
            wordPattern = true;
        }
        return wordPattern;
    }
}
```



```python
class Solution:
    def wordPattern(self, pattern: str, str: str) -> bool:
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
```



