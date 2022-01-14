---
title: 「力扣」第 13 题：罗马数字转整数（简单）
icon: yongyan
category: 数组
tags:
  - 数组
  - 字符串
---

- 题目链接：[13. 罗马数字转整数](https://leetcode-cn.com/problems/roman-to-integer/)；
- 题解链接：[通过哈希表查对应关系 + 特殊值处理（Python 代码、Java 代码）](https://leetcode-cn.com/problems/roman-to-integer/solution/tong-guo-ha-xi-biao-cha-dui-ying-guan-xi-te-shu-zh/)。

## 题目描述

罗马数字包含以下七种字符: `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。

```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

例如， 罗马数字 `2` 写做 `II` ，即为两个并列的 1 。`12` 写做 `XII` ，即为 `X` + `II` 。 `27` 写做 `XXVII`, 即为 `XX` + `V` + `II` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX`。这个特殊的规则只适用于以下六种情况：

- `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。
- `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。

**示例 1:**

```
输入: s = "III"
输出: 3
```

**示例 2:**

```
输入: s = "IV"
输出: 4
```

**示例 3:**

```
输入: s = "IX"
输出: 9
```

**示例 4:**

```
输入: s = "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
```

**示例 5:**

```
输入: s = "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

**提示：**

- `1 <= s.length <= 15`
- `s` 仅含字符 `('I', 'V', 'X', 'L', 'C', 'D', 'M')`
- 题目数据保证 `s` 是一个有效的罗马数字，且表示整数在范围 `[1, 3999]` 内
- 题目所给测试用例皆符合罗马数字书写规则，不会出现跨位等情况。
- IL 和 IM 这样的例子并不符合题目要求，49 应该写作 XLIX，999 应该写作 CMXCIX 。
- 关于罗马数字的详尽书写规则，可以参考 [罗马数字 - Mathematics ](https://b2b.partcommunity.com/community/knowledge/zh_CN/detail/10753/罗马数字#knowledge_article)。

## 思路分析

注意到题目中说：

> 通常情况下，罗马数字中小的数字在大的数字的右边。

特例就是它的反面：**罗马数字中小的数字在大的数字的左边**。这种情况特殊处理即可。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
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

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
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
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是罗马数字的字符个数，全部看过一遍以后，就得得到数字，故是线性时间复杂度；
- 空间复杂度：$O(1)$，这里哈希表的长度是固定的，且算法使用到的临时变量的个数也是常数，故空间复杂度是 $O(1)$。
