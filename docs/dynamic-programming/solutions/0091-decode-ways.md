---
title: 「力扣」第 91 题：解码方法（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
  - 字符串
---

## 「力扣」第 91 题：解码方法（中等）

> 1、画图；2、分类（用加法）、分步（用乘法）

+ [链接](https://leetcode-cn.com/problems/decode-ways)
+ [动态规划（Java、Python）](https://leetcode-cn.com/problems/decode-ways/solution/dong-tai-gui-hua-java-python-by-liweiwei1419/)

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


---



一句话题解：根据一个字符串结尾的两个字符（暂不讨论特殊情况），推导状态转移方程（不同规模子问题的关系）。

+ 这一类问题，**问方案数**，但不问具体方案的，可以考虑使用「动态规划」完成；
+ 「动态规划」处理字符串问题的思想是：从一个空串开始，一点一点得到更大规模的问题的解。

说明：这个问题有点像 「力扣」第 70 题：[爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)，背后的思想是：**「分类计数加法原理」和「分步计数乘法原理」**。

### 方法一：动态规划

第 1 步：定义状态

既然结尾的字符很重要，在定义状态的时候可以这样定义：

`dp[i]`：以 `s[i]` **结尾**的**前缀子串**有多少种解码方法。

第 2 步：推导状态转移方程


根据题意：

+ 如果 `s[i] == '0'` ，字符 `s[i]` 就不能单独解码，所以当 `s[i] != '0'` 时，`dp[i] = dp[i - 1] * 1`。

说明：为了得到长度为 `i + 1` 的前缀子串的解码个数，需要先得到长度为 `i` 的解码个数，再对 `s[i]` 单独解码，这里分了两步，根据「分步计数原理」，用乘法。这里的 `1` 表示乘法单位，语义上表示 `s[i]` 只有 `1` 种编码。


+ 如果当前字符和它前一个字符，能够解码，即 `10 <= int(s[i - 1..i]) <= 26`，即 `dp[i] += dp[i - 2] * 1`；

说明：不同的解码方法，使用「加法」，理论依据是「分类计数的加法原理」，所以这里用 `+=`。
        

注意：状态转移方程里出现了下标 `i - 2`，需要单独处理（如何单独处理，需要耐心调试）。

第 3 步：初始化

+ 如果首字符为 `0` ，一定解码不了，可以直接返回 `0`，非零情况下，`dp[0] = 1`；

第 4 步：考虑输出

输出是 `dp[len - 1]`，符合原始问题。

第 5 步：考虑优化空间

这里当前状态值与前面两个状态有关，因此可以使用三个变量滚动计算。但空间资源一般来说不紧张，不是优化的方向，故不考虑。



**参考代码 1**：

```Java []
public class Solution {

    public int numDecodings(String s) {
        int len = s.length();
        if (len == 0) {
            return 0;
        }

        // dp[i] 以 s[i] 结尾的前缀子串有多少种解码方法
        // dp[i] = dp[i - 1] * 1 if s[i] != '0'
        // dp[i] += dp[i - 2] * 1 if  10 <= int(s[i - 1..i]) <= 26
        int[] dp = new int[len];

        char[] charArray = s.toCharArray();
        if (charArray[0] == '0') {
            return 0;
        }
        dp[0] = 1;

        for (int i = 1; i < len; i++) {
            if (charArray[i] != '0') {
                dp[i] = dp[i - 1];
            }

            int num = 10 * (charArray[i - 1] - '0') + (charArray[i] - '0');
            if (num >= 10 && num <= 26) {
                if (i == 1) {
                    dp[i]++;
                } else {
                    dp[i] += dp[i - 2];
                }
            }
        }
        return dp[len - 1];
    }
}
```
```Python []
class Solution:
    def numDecodings(self, s: str) -> int:
        size = len(s)
        if size == 0:
            return 0

        # dp[i]：以 s[i] 结尾的前缀字符串的解码个数

        # 分类讨论：
        # 1、s[i] != '0' 时，dp[i] = dp[i - 1]
        # 2、10 <= s[i - 1..i] <= 26 时，dp[i] += dp[i - 2]
        dp = [0 for _ in range(size)]

        if s[0] == '0':
            return 0
        dp[0] = 1

        for i in range(1, size):
            if s[i] != '0':
                dp[i] = dp[i - 1]

            num = 10 * (ord(s[i - 1]) - ord('0')) + (ord(s[i]) - ord('0'))

            if 10 <= num <= 26:
                if i == 1:
                    dp[i] += 1
                else:
                    dp[i] += dp[i - 2]
        return dp[size - 1]
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 `N` 是字符串的长度；
+ 空间复杂度：$O(N)$。


### 方法二：基于方法一修改状态定义

这里在 `i == 1` 的时候需要多做一次判断，而这种情况比较特殊，为了避免每次都做判断，可以把状态数组多设置一位。为此修改状态定义，与此同时，状态转移方程也需要做一点点调整。

`dp[i]` 定义成长度为 `i` 的前缀子串有多少种解码方法（以 `s[i - 1]` 结尾的前缀子串有多少种解法方法）；

状态转移方程：分类讨论，注意字符的下标和状态数组的有 1 个下标的偏移。

+ 当 `s[i] != '0'` 时，`dp[i + 1] = dp[i]`；
+ 当 `10 <= s[i - 1..i] <= 26` 时，`dp[i + 1] += dp[i - 1]`。

初始化：`dp[0] = 1`，意义：0 个字符的解码方法为 1 种。如果实在不想深究这里的语义，也没有关系，`dp[0]` 的值是用于后面状态值参考的，在 i == 1 的时候，`dp[i + 1] += dp[i - 1]` 即 `dp[2] += dp[0]` ，这里就需要 `dp[0] = 1` 。

输出：`dp[len]`

**参考代码 2**：

```Java []
public class Solution {

    public int numDecodings(String s) {
        int len = s.length();
        if (len == 0) {
            return 0;
        }

        // dp[i] 以 s[i - 1] 结尾的前缀子串有多少种解法方法
        // dp[i] = dp[i - 1] * 1 if nums[i - 1] != '0'
        // dp[i] += dp[i - 2] * 1 if  10 <= int(s[i - 2..i - 1]) <= 26

        int[] dp = new int[len + 1];
        dp[0] = 1;
        char[] charArray = s.toCharArray();
        if (charArray[0] == '0') {
            return 0;
        }
        dp[1] = 1;

        for (int i = 1; i < len; i++) {
            if (charArray[i] != '0') {
                dp[i + 1] = dp[i];
            }

            int num = 10 * (charArray[i - 1] - '0') + (charArray[i] - '0');
            if (num >= 10 && num <= 26) {
                dp[i + 1] += dp[i - 1];
            }
        }
        return dp[len];
    }
}
```
```Python []
class Solution:
    def numDecodings(self, s: str) -> int:
        size = len(s)
        if size == 0:
            return 0

        # dp[i]：以 s[i - 1] 结尾的前缀字符串的解码个数

        # 分类讨论：
        # 1、s[i] != '0' 时，dp[i + 1] = dp[i]
        # 2、10 <= s[i - 1..i] <= 26 时，dp[i + 1] += dp[i - 1]
        dp = [0 for _ in range(size + 1)]

        if s[0] == '0':
            return 0
        # 作为乘法因子，值为 1
        dp[0] = 1

        if s[0] == '0':
            return 0
        dp[1] = 1

        ord_zero = ord('0')
        for i in range(1, size):
            if s[i] != '0':
                dp[i + 1] = dp[i]

            num = 10 * (ord(s[i - 1]) - ord_zero) + (ord(s[i]) - ord_zero)
            if 10 <= num <= 26:
                dp[i + 1] += dp[i - 1]
        return dp[size]
```

**复杂度分析**：（同上）

