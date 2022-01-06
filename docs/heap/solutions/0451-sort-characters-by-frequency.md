---
title: 「力扣」第 451 题：根据字符出现频率排序（中等）
icon: yongyan
category: 优先队列
tags: 
  - 优先队列
---

+ 题目链接：[451. 根据字符出现频率排序](https://leetcode-cn.com/problems/sort-characters-by-frequency/)

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

