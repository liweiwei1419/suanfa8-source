---
title: 「力扣」第 66 题：加 1（简单）
icon: yongyan
category: 数组
tags:
  - 数组
---

- 题目链接：[66. 加一](https://leetcode-cn.com/problems/plus-one)。

## 题目描述

给定一个由 **整数** 组成的 **非空** 数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储**单个**数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

**示例 1：**

```
输入：digits = [1,2,3]
输出：[1,2,4]
解释：输入数组表示数字 123。
```

**示例 2：**

```
输入：digits = [4,3,2,1]
输出：[4,3,2,2]
解释：输入数组表示数字 4321。
```

**示例 3：**

```
输入：digits = [0]
输出：[1]
```

**提示：**

- `1 <= digits.length <= 100`
- `0 <= digits[i] <= 9`

## 解题思路

注意可以**提前终止**。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
class Solution {
    public int[] plusOne(int[] digits) {
        int len = digits.length;
        if (len == 0) {
            return new int[0];
        }
        int carry = 1;
        for (int i = len - 1; i >= 0; i--) {
            int sum = digits[i] + carry;
            digits[i] = sum % 10;
            carry = sum / 10;
            // 如果不产生进位，马上就可以返回了
            if (carry == 0) {
                return digits;
            }
        }
        if (carry == 1) {
            int[] res = new int[len + 1];
            res[0] = 1;
            for (int i = 1; i < len + 1; i++) {
                res[i] = digits[i - 1];
            }
            return res;
        }
        return digits;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution(object):
    def plusOne(self, digits):
        """
        :type digits: List[int]
        :rtype: List[int]
        """

        n = len(digits)
        if n == 0:
            return None
        # 从后向前
        for index in range(n - 1, -1, -1):
            if digits[index] < 9:
                digits[index] += 1
                return digits
            else:
                digits[index] = 0
        return [1] + digits

```
</CodeGroupItem>
</CodeGroup>
```
