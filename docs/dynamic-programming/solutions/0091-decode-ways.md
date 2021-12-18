---
title: 「力扣」第 91 题：解码方法（中等）
icon: yongyan
categories: 动态规划
tags:
  - 动态规划
  - 字符串
---

## 「力扣」第 91 题：解码方法（中等）

> 1、画图；2、分类（用加法）、分步（用乘法）

+ [链接](https://leetcode-cn.com/problems/decode-ways)
+ [题解链接](https://leetcode-cn.com/problems/decode-ways/solution/dong-tai-gui-hua-java-python-by-liweiwei1419/)

要求：一条包含字母 `A-Z` 的消息通过以下方式进行了编码：

```
'A' -> 1
'B' -> 2
...
'Z' -> 26
```

给定一个只包含数字的**非空**字符串，请计算解码方法的总数。

**示例 1**：

```
输入: "12"
输出: 2
解释: 它可以解码为 "AB"（1 2）或者 "L"（12）。
```

**示例 2**：

```
输入: "226"
输出: 3
解释: 它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
```


思路：拿具体的例子分析，比如：$12321$。假设我们已经解决了 `dp[0]` 和 `dp[1]` ，从 `dp[2]` 开始考虑，分析 `num[2]`：

1、如果 `num[2]` 不等于 $0$，那么 `dp[2]` 的情况和 `dp[1]` 是一样的，完成编码，这是一种情况；

2、如果 `num[2]` 跟前面的 `num[1]` 合起来能够组成一个字母，那么 `dp[2]` 和 `dp[0]` 是一样的，完成编码，这是一种情况。

两种情况都能完成编码，求总数，其实就是他们的和，这里其实是加法计数原理的应用。

提示：注意数组下标越界问题。

Java 代码：

```java
public class Solution {

    public int numDecodings(String s) {
        int len = s.length();
        if (len == 0) {
            return 0;
        }
        int[] dp = new int[len];
        dp[0] = s.charAt(0) == '0' ? 0 : 1;
        for (int i = 1; i < len; i++) {
            int res = 0;
            char cur = s.charAt(i);
            if (cur != '0') {
                res += dp[i - 1];
            }
            int pre = Integer.parseInt(s.substring(i - 1, i + 1));
            if (pre <= 26 && pre >= 10) {
                if (i - 2 < 0) {
                    res++;
                } else {
                    res += dp[i - 2];
                }
            }
            dp[i] = res;
            // System.out.println(Arrays.toString(dp));
        }
        return dp[len - 1];
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String s = "12";
        int numDecodings = solution.numDecodings(s);
        System.out.println(numDecodings);
    }
}
```

Python 代码：

```python
class Solution:

    def numDecodings(self, s):
        l = len(s)
        if l == 0:
            return 0

        if l == 1:
            return 1 if s[0] != '0' else 0
        dp = [0 for _ in range(l)]
        dp[0] = 1 if s[0] != '0' else 0
        for i in range(1, l):
            if s[i] != '0':
                # 如果不是 '0' ，那么 s[i] 就可以编码，所以 cur 就至少是 dp[i-1]
                dp[i] += dp[i - 1]
            if 9 < int(s[i - 1:i + 1]) < 27:
                # 可以和前面的数字组成一个编码
                if i - 2 < 0:
                    # 12
                    dp[i] += 1
                else:
                    dp[i] += dp[i - 2]
        return dp[l - 1]
```

Python 代码：

```python
class Solution:
    def numDecodings(self, s: str) -> int:

        l = len(s)
        if l == 0:
            return 0

        if l == 1:
            return 1 if s[0] != '0' else 0
        dp = [0 for _ in range(l)]
        dp[0] = 1 if s[0] != '0' else 0
        for i in range(1, l):
            if s[i] != '0':
                # 如果不是 '0' ，那么 s[i] 就可以编码，所以 cur 就至少是  dp[i-1]
                dp[i] += dp[i - 1]
            if 9 < int(s[i - 1:i + 1]) < 27:
                # 可以和前面的数字组成一个编码
                # 这个判断是在写出 dp[i] += dp[i - 2] 以后，看出数组下标会越界，而增加的讨论
                if i - 2 < 0:
                    # 12
                    dp[i] += 1
                else:
                    dp[i] += dp[i - 2]
        return dp[l - 1]
```

Python 代码：

```python
class Solution:
    def numDecodings(self, s: str) -> int:
        l = len(s)
        if l == 0:
            return 0
        dp = [1] + [0] * l
        if s[0] == '0':
            dp[1] = 0
        else:
            dp[1] = 1
        for i in range(1, l):
            if s[i] != '0':
                dp[i + 1] += dp[i]
            if s[i - 1] != '0' and int(s[i - 1:i + 1]) < 27:
                dp[i + 1] += dp[i - 1]
        return dp[-1]
```

说明：上面这段代码 `dp[0] = 1` 是故意这么定义的，为了防止像上一版代码那样的讨论。



