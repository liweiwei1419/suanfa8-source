---
title: 「力扣」第 67 题：二进制求和（简单）
icon: yongyan
category: 数组
tags:
  - 数组
---


+ 题目链接：[67. 二进制求和](https://leetcode-cn.com/problems/add-binary)；
+ 题解链接：[模拟「二进制」竖式加法](https://leetcode-cn.com/problems/add-binary/solution/mo-shi-er-jin-zhi-shu-shi-jia-fa-by-liweiwei1419/)。

## 题目描述

给你两个二进制字符串，返回它们的和（用二进制表示）。

输入为 **非空** 字符串且只包含数字 `1` 和 `0`。

**示例 1:**

```
输入: a = "11", b = "1"
输出: "100"
```

**示例 2:**

```
输入: a = "1010", b = "1011"
输出: "10101"
```

**提示：**

- 每个字符串仅由字符 `'0'` 或 `'1'` 组成。
- $1 \le a.length, b.length \le 10^4$
- 字符串如果不是 `"0"` ，就都不含前导零。

## 解题思路

从尾巴开始加。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public String addBinary(String a, String b) {
        int aLen = a.length();
        int bLen = b.length();
        int maxLen = Math.max(aLen, bLen);

        // 从个位开始加，个位在字符串的右边
        // 代码访问从左到右，因此先反转一下
        StringBuilder sbA = new StringBuilder(a).reverse();
        StringBuilder sbB = new StringBuilder(b).reverse();

        // 让两个字符补齐成一样的长度
        while (sbA.length() < maxLen) {
            sbA.append("0");
        }
        while (sbB.length() < maxLen) {
            sbB.append("0");
        }

        StringBuilder res = new StringBuilder();
        // 进位，初始时进位为 0
        int carry = 0;
        // 当前字符的 ASCII 值减去 '0' 的 ASCII 值，相当于将这个字符转换成数值
        int num1;
        int num2;
        for (int i = 0; i < maxLen; i++) {
            num1 = sbA.charAt(i) - '0';
            num2 = sbB.charAt(i) - '0';
            if (carry + num1 + num2 > 1) {
                // 因为是二进制，所以多余 2 的部分要减去
                res.append(carry + num1 + num2 - 2);
                // 表示要进位
                carry = 1;
            } else {
                res.append(carry + num1 + num2);
                carry = 0;
            }
        }
        // 对于最高位还要进位的情况，需要单独判断
        if (carry == 1) {
            res.append("1");
        }
        // 最后不要忘记再反转一次
        return res.reverse().toString();
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution(object):
    def addBinary(self, a, b):
        """
        :type a: str
        :type b: str
        :rtype: str
        """
        res = ''
        # 分别表示两个数从后向前的索引，后对齐
        i = len(a) - 1
        j = len(b) - 1
        # 表示进位标志
        carry = 0
        while i >= 0 or j >= 0:
            s = carry
            if i >= 0:
                s += ord(a[i]) - ord('0')
                i -= 1
            if j >= 0:
                s += ord(b[j]) - ord('0')
                j -= 1

            res = str(s % 2) + res
            carry = s // 2
        if carry == 1:
            return '1' + res
        return res
```
</CodeGroupItem>
</CodeGroup>