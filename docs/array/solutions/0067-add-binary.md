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

> 给你两个二进制字符串，返回它们的和（用二进制表示）。
>
> 输入为 **非空** 字符串且只包含数字 `1` 和 `0`。
>
> 示例 1：
>
> ```
> 输入: a = "11", b = "1"
> 输出: "100"
> ```
>
>
> 示例 2：
>
> ```
> 输入: a = "1010", b = "1011"
> 输出: "10101"
> ```
>
> 提示：
>
> + 每个字符串仅由字符 '0' 或 '1' 组成。
> + 1 <= a.length, b.length <= 10^4
> + 字符串如果不是 "0" ，就都不含前导零。

思路：从尾巴开始加。

Python 代码：

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

（本节完）



