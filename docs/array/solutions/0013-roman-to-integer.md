---
title: 「力扣」第 13 题：罗马数字转整数（简单）
icon: yongyan
category: 数组
tags:
  - 数组
  - 字符串
---

+ 题目链接：[13. 罗马数字转整数](https://leetcode-cn.com/problems/roman-to-integer/)；
+ 题解链接：[通过哈希表查对应关系 + 特殊值处理（Python 代码、Java 代码）](https://leetcode-cn.com/problems/roman-to-integer/solution/tong-guo-ha-xi-biao-cha-dui-ying-guan-xi-te-shu-zh/)。




## 题目描述



**思路分析**：

注意到题目中说：

> 通常情况下，罗马数字中小的数字在大的数字的右边。

特例就是它的反面：**罗马数字中小的数字在大的数字的左边**。这种情况特殊处理即可。

**参考代码**：


```Java []
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int romanToInt(String s) {
        int len = s.length();
        if (len == 0) {
            return 0;
        }

        Map<Character, Integer> map = new HashMap<>(7);
        map.put('I', 1);
        map.put('V', 5);
        map.put('X', 10);
        map.put('L', 50);
        map.put('C', 100);
        map.put('D', 500);
        map.put('M', 1000);
        char[] charArray = s.toCharArray();
        int res = map.get(charArray[0]);
        for (int i = 1; i < len; i++) {
            int pre = map.get(charArray[i - 1]);
            int cur = map.get(charArray[i]);

            if (pre < cur) {
                // 这是唯一的一种需要注意的特殊情况，当前面的数字比当前数字要小的时候
                // 要用：当前数字 - 前面数字，因为前面数字加过了，所以要减去 2 倍
                res += (cur - 2 * pre);
            } else {
                res += cur;
            }
        }
        return res;
    }
}
```
```Python3 []
class Solution:
    def romanToInt(self, s: str) -> int:

        size = len(s)
        if size == 0:
            return 0
        map = {
            'I': 1,
            'V': 5,
            'X': 10,
            'L': 50,
            'C': 100,
            'D': 500,
            'M': 1000
        }

        res = map[s[0]]
        for i in range(1, size):

            pre = map[s[i - 1]]
            cur = map[s[i]]
            # 这是唯一的一种需要注意的特殊情况，当前面的数字比当前数字要小的时候
            # 要用：当前数字 - 前面数字，因为前面数字加过了，所以要减去 2 倍
            if pre < cur:
                res += (cur - 2 * pre)
            else:
                res += cur
        return res
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是罗马数字的字符个数，全部看过一遍以后，就得得到数字，故是线性时间复杂度。
+ 空间复杂度：$O(1)$，这里哈希表的长度是固定的，且算法使用到的临时变量的个数也是常数，故空间复杂度是 $O(1)$。

