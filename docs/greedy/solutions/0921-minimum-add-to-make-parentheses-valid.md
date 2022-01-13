---
title: 「力扣」第 921 题：使括号有效的最少添加（中等）
icon: yongyan
category: 贪心算法
tags:
  - 贪心算法
---

## 题目描述

给定一个由 `'('` 和 `')'` 括号组成的字符串 `S`，我们需要添加最少的括号（ `'('` 或是 `')'`，可以在任何位置），以使得到的括号字符串有效。

从形式上讲，只有满足下面几点之一，括号字符串才是有效的：

- 它是一个空字符串，或者
- 它可以被写成 `AB` （`A` 与 `B` 连接）, 其中 `A` 和 `B` 都是有效字符串，或者
- 它可以被写作 `(A)`，其中 `A` 是有效字符串。

给定一个括号字符串，返回为使结果字符串有效而必须添加的最少括号数。

**示例 1：**

```
输入："())"
输出：1
```

**示例 2：**

```
输入："((("
输出：3
```

**示例 3：**

```
输入："()"
输出：0
```

**示例 4：**

```
输入："()))(("
输出：4
```

**提示：**

1. `S.length <= 1000`
2. `S` 只包含 `'('` 和 `')'` 字符。

**参考代码**：

```java
public class Solution {

    public int minAddToMakeValid(String S) {
        int len = S.length();

        int leftCount = 0;
        int rightCount = 0;
        char[] charArray = S.toCharArray();
        for (int i = 0; i < len; i++) {
            char c = charArray[i];

            if (c == '(') {
                rightCount++;
            } else {
                if (rightCount > 0) {
                    rightCount--;
                } else {
                    leftCount++;
                }
            }
        }
        return leftCount + rightCount;
    }
}
```

## 参考资料

https://leetcode-cn.com/problems/minimum-add-to-make-parentheses-valid/solution/tan-xin-by-hu-li-hu-wai-mnch/
