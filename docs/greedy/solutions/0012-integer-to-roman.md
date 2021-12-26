---
title: 「力扣」第 12 题：整数转罗马数字
icon: yongyan
category: 贪心算法
tags:
  - 贪心算法
---


+ 链接：[12. 整数转罗马数字](https://leetcode-cn.com/problems/integer-to-roman/)；
+ 题解：[贪心算法（贪心算法的有效性未证明））](https://leetcode-cn.com/problems/integer-to-roman/solution/tan-xin-suan-fa-by-liweiwei1419/)。


## 题目描述

>罗马数字包含以下七种字符： `I`，` V`， `X`， `L`，`C`，`D` 和 `M`。
>
>```
>字符          数值
>I             1
>V             5
>X             10
>L             50
>C             100
>D             500
>M             1000
>```
>
>例如， 罗马数字 2 写做 `II` ，即为两个并列的 1。12 写做 `XII` ，即为 `X + II` 。 27 写做  `XXVII`, 即为 `XX + V + II` 。
>
>通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
>
>+ `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
>
>+ `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。 
>
>+ `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。
>
>给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。
>
>示例 1：
>
>```
>输入: 3
>输出: "III"
>```
>
>示例 2：
>
>```
>输入: 4
>输出: "IV"
>```
>
>
>示例 3：
>
>```
>输入: 9
>输出: "IX"
>```
>
>示例 4：
>
>```
>输入: 58
>输出: "LVIII"
>解释: L = 50, V = 5, III = 3
>```
>
>
>示例 5：
>
>```
>输入: 1994
>输出: "MCMXCIV"
>解释: M = 1000, CM = 900, XC = 90, IV = 4
>```

### 方法一：贪心算法

**参考代码**：

把阿拉伯数字与罗马数字可能出现的所有情况和对应关系，放在两个数组中，并且按照阿拉伯数字的大小降序排列，这是贪心选择思想。

Java 代码：

```Java []
public class Solution {

    public String intToRoman(int num) {
        int[] nums = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] romans = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

        StringBuilder stringBuilder = new StringBuilder();
        int index = 0;
        while (index < 13) {
            // 特别注意：这里是等号
            while (num >= nums[index]) {
                // 注意：这里是等于号，表示尽量使用大的"面值"
                stringBuilder.append(romans[index] + " ");
                num -= nums[index];
            }
            index++;
        }
        return stringBuilder.toString();
    }
}
```
Python 代码：


```Python []
class Solution:
    def intToRoman(self, num: int) -> str:
        nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
        romans = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

        index = 0
        res = ''
        while index < 13:
            # 注意：这里是等于号，表示尽量使用大的"面值"
            while num >= nums[index]:
                res += romans[index]
                num -= nums[index]
            index += 1
        return res
```

**复杂度分析**：

+ 时间复杂度：$O(1)$，虽然看起来是两层循环，但是外层循环的次数最多 $12$，内层循环的此时其实也是有限次的，综合一下，时间复杂度是 $O(1)$；
+ 空间复杂度：$O(1)$，这里使用了两个辅助数字，空间都为 $13$，还有常数个变量，故空间复杂度是 $O(1)$。
