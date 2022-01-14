---
title: 「力扣」第 507 题：完美数（简单）
icon: yongyan
category: 数学
tags:
  - 数学
---

- 题目链接：[507. 完美数](https://leetcode-cn.com/problems/perfect-number/)

## 题目描述

对于一个 **正整数**，如果它和除了它自身以外的所有 **正因子** 之和相等，我们称它为 「完美数」。

给定一个 **整数** `n`， 如果是完美数，返回 `true`，否则返回 `false`。

**示例 1：**

```
输入：num = 28
输出：true
解释：28 = 1 + 2 + 4 + 7 + 14
1, 2, 4, 7, 和 14 是 28 的所有正因子。
```

**示例 2：**

```
输入：num = 6
输出：true
```

**示例 3：**

```
输入：num = 496
输出：true
```

**示例 4：**

```
输入：num = 8128
输出：true
```

**示例 5：**

```
输入：num = 2
输出：false
```

**提示：**

- `1 <= num <= 10^8`

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public boolean checkPerfectNumber(int num) {
        if (num == 1) {
            return false;
        }
        // 所有乘法因子的和存在这里
        int res = 1;
        // 可能的乘法因子，从 2 开始
        int factor = 2;
        while (factor * factor < num) {
            if (num % factor == 0 ) {
                res += factor;
                res += (num / factor);
            }
            factor += 1;
        }
        // 把中间那个数单独拿出来
        if (factor * factor == num) {
            res += factor;
        }
        return res == num;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution:
    def checkPerfectNumber(self, num: int) -> bool:

        # 特判
        if num == 1:
            return False
        # 所有乘法因子的和存在这里
        res = 1
        # 可能的乘法因子，从 2 开始
        factor = 2
        while factor * factor < num:
            if num % factor == 0:
                res += factor
                res += (num // factor)
            factor += 1
        # 把中间那个数单独拿出来
        if factor * factor == num:
            res += factor
        return res == num
````

</CodeGroupItem>
</CodeGroup>
