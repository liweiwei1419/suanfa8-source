---
title: 「力扣」第 202 题：快乐数（简单）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

- 题目链接：[202. 快乐数](https://leetcode-cn.com/problems/happy-number/)。

> todo：官方题解的代码比我快很多，记得改一下。

## 题目描述

编写一个算法来判断一个数 `n` 是不是快乐数。

「快乐数」定义为：

- 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
- 然后重复这个过程直到这个数变为 1，也可能是 **无限循环** 但始终变不到 1。
- 如果 **可以变为** 1，那么这个数就是快乐数。

如果 `n` 是快乐数就返回 `true` ；不是，则返回 `false` 。

**示例 1：**

```
输入：n = 19
输出：true
解释：
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
```

**示例 2：**

```
输入：n = 2
输出：false
```

**提示：**

- $1 \le n \le 2^{31} - 1$

## 思路分析

用哈希表判断是否会遇到重复的数，遇到重复的数，就表示会死循环。

## 方法：哈希表

<CodeGroup>
<CodeGroupItem title="Java">
```java
class Solution {
    public boolean isHappy(int n) {
        boolean isHappy = false;
        Set<Integer> set1 = new HashSet<>();
        String numberStr = String.valueOf(n);
        while (true) {
            int sum = 0;
            for (int i = 0; i < numberStr.length(); i++) {
                sum += Math.pow(Integer.valueOf(String.valueOf(numberStr.charAt(i))), 2);
            }
            if (sum == 1) {
                isHappy = true;
                break;
            } else if (set1.contains(sum)) {
                break;
            } else {
                set1.add(sum);
                numberStr = String.valueOf(sum);
            }
        }
        return isHappy;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution:
    def isHappy(self, n):
        if n <= 0:
            return False
        # 得到一个数的每个数位
        s = set()
        while True:
            square_sum = 0
            while n != 0:
                mod = n % 10
                square_sum += mod ** 2
                n = n // 10
            if square_sum == 1:
                return True
            if square_sum in s:
                return False
            else:
                s.add(square_sum)
                n = square_sum
```
</CodeGroupItem>
</CodeGroup>
