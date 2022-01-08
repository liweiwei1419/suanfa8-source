---
title: 「力扣」第 451 题：根据字符出现频率排序（中等）
icon: yongyan
category: 优先队列
tags: 
  - 优先队列
---

+ 题目链接：[451. 根据字符出现频率排序](https://leetcode-cn.com/problems/sort-characters-by-frequency/)。

## 题目描述

给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

**示例 1:**

```
输入:
"tree"

输出:
"eert"

解释:
'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
```

**示例 2:**

```
输入:
"cccaaa"

输出:
"cccaaa"


解释:
'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
```

**示例 3:**

```
输入:
"Aabb"

输出:
"bbAa"

解释:
此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
```

**Constraints:**

- `1 <= s.length <= 5 * 10^5`
- `s` consists of uppercase and lowercase English letters and digits.

## 方法一：排序 + 哈希表

**参考代码 1**：

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public String frequencySort(String s) {
        int len = s.length();
        if (len == 0) {
            return s;
        }
        Map<Character, Integer> map = new HashMap<>();
        for (Character c : s.toCharArray()) {
            map.put(c, map.get(c) == null ? 1 : map.get(c) + 1);
        }
        Comparator<Character> comparator = (o1, o2) -> {
            if (map.get(o2) - map.get(o1) == 0) {
                // 要注意：如果出现频次相同，要按字母顺序排序， "loveleetcode" 就是一个很好的测试用例
                return o1.compareTo(o2);
            }
            // 注意顺序
            return map.get(o2) - map.get(o1);
        };
        Character[] cArr = new Character[len];
        for (int i = 0; i < len; i++) {
            cArr[i] = s.charAt(i);
        }
        Arrays.sort(cArr, comparator);

        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < len; i++) {
            stringBuilder.append(cArr[i]);
        }
        return stringBuilder.toString();
    }
}
```

## 方法二：优先队列

**参考代码 2**：

```python
class Solution:
    def frequencySort(self, s: str) -> str:
        size = len(s)
        if size <= 1:
            return s

        hash = dict()
        for alpha in s:
            hash[alpha] = hash.setdefault(alpha, 0) + 1

        import heapq
        h = []
        for alpha, counter in hash.items():
            heapq.heappush(h, (-counter, alpha))

        res = ''
        hash_table_len = len(hash.items())

        for _ in range(hash_table_len):
            counter, alpha = heapq.heappop(h)
            res += alpha * (-counter)
        return res
```

说明：Python 提供的 `heapq` 是最小堆。

