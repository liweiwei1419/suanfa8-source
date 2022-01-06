---
title: 「力扣」第 10 题：正则表达式（困难）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
  - 递归
---

## 题目描述

给你一个字符串 `s` 和一个字符规律 `p`，请你来实现一个支持 `'.'` 和 `'*'` 的正则表达式匹配。

- `'.'` 匹配任意单个字符
- `'*'` 匹配零个或多个前面的那一个元素

所谓匹配，是要涵盖 **整个** 字符串 `s`的，而不是部分字符串。

**示例 1：**

```
输入：s = "aa" p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。
```

**示例 2:**

```
输入：s = "aa" p = "a*"
输出：true
解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```

**示例 3：**

```
输入：s = "ab" p = ".*"
输出：true
解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
```

**示例 4：**

```
输入：s = "aab" p = "c*a*b"
输出：true
解释：因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
```

**示例 5：**

```
输入：s = "mississippi" p = "mis*is*p*."
输出：false
```

**提示：**

- `1 <= s.length <= 20`
- `1 <= p.length <= 30`
- `s` 可能为空，且只包含从 `a-z` 的小写字母。

- `p` 可能为空，且只包含从 `a-z` 的小写字母，以及字符 `.` 和 `*`。
- 保证每次出现字符 `*` 时，前面都匹配到有效的字符

---

### 方法一：递归

**参考代码**：

```java
public class Solution {

    /**
     * 思想：递归，减而治之
     * '.' 匹配任意单个字符
     * '*' 匹配零个或多个前面的那一个元素
     *
     * @param s 文本串，有时候也用 t 表示
     * @param p 模式串
     * @return
     */
    public boolean isMatch(String s, String p) {
        // 先写递归终止条件，
        if (p.isEmpty()) {
            return s.isEmpty();
        }

        char[] sCharArray = s.toCharArray();
        char[] pCharArray = p.toCharArray();

        // 满足 firstMatch 就表示可以同时砍掉模式串 p 和文本串 s 的第 1 个字符
        // ① 第 1 个字符正正好相等
        // ② 模式串的第 1 个字符正正好是 '.'，因为可以匹配任意单个字符
        boolean firstMatch = !s.isEmpty() && (sCharArray[0] == pCharArray[0] || pCharArray[0] == '.');

        // 当模式串的下一个是 *
        // ① * 号的作用是 0 次：模式串与前面的都不匹配，例如：s = 'bb'，p = 'a*bb'，模式串直接砍掉 2 个（连同 * 一起砍掉），继续匹配
        // ② * 号的作用是 1 次或者更多次：在满足 firstMatch 的前提下，s 砍掉 1 个然后继续
        if (p.length() > 1 && pCharArray[1] == '*') {
            if (isMatch(s, p.substring(2))) {
                return true;
            }
            return firstMatch && isMatch(s.substring(1), p);
        }
        return firstMatch && isMatch(s.substring(1), p.substring(1));
    }
}
```


### 方法二：动态规划

**参考代码**：

```java
public class Solution {

    public boolean isMatch(String s, String p) {
        int sLen = s.length();
        int pLen = p.length();

        char[] sCharArray = s.toCharArray();
        char[] pCharArray = p.toCharArray();

        // 记录文本符串 s[0, i) 是否匹配模式字符串 p[0, j)
        boolean[][] dp = new boolean[sLen + 1][pLen + 1];

        // 初始化 begin
        dp[0][0] = true;
        for (int j = 1; j < pLen; j++) {
            // 如果当前 p 看到的是 * ，直接砍掉 2 个模式串
            dp[0][j + 1] = pCharArray[j] == '*' && dp[0][j - 1];
        }
        // 初始化 end

        for (int i = 0; i < sLen; i++) {
            for (int j = 0; j < pLen; j++) {

                if (pCharArray[j] == '*') {
                    // 下面开始分类讨论
                    // 把 '*' 当前面的字符使用 0 次，全程注意有 1 个偏移的量
                    if (dp[i + 1][j - 1]) {
                        dp[i + 1][j + 1] = true;
                    } else {
                        // 就这里巨难理解

                        // 砍去文本串的头一个
                        dp[i + 1][j + 1] = firstMatch(sCharArray, pCharArray, i, j - 1) && dp[i][j + 1];
                    }

                } else {
                    dp[i + 1][j + 1] = firstMatch(sCharArray, pCharArray, i, j) && dp[i][j];
                }
            }
        }
        return dp[sLen][pLen];
    }

    private boolean firstMatch(char[] sCharArray, char[] pCharArray, int i, int j) {
        return sCharArray[i] == pCharArray[j] || pCharArray[j] == '.';
    }
}
```

同样套路的问题还有：

1、编辑距离；

2、最长公共子串；

3、最长回文子串。

---

以下的写法是备份，可以不看。

+ 递归写法 1

Java 代码：
```java
public class Solution {

    // 递归 + 分类讨论
    // 使用递归的思想，第 1 个匹配了，后面的递归处理就可以了

    public boolean isMatch(String s, String p) {
        if (p.isEmpty()) {
            return s.isEmpty();
        }
        boolean firstMatch = !s.isEmpty() && (s.charAt(0) == p.charAt(0) || p.charAt(0) == '.');
        if (p.length() > 1 && p.charAt(1) == '*') {
            // '*' 匹配 0 次
            if (isMatch(s, p.substring(2))) {
                return true;
            }
            // '*' 至少匹配 1 次
            return firstMatch && isMatch(s.substring(1), p);
        }
        return firstMatch && isMatch(s.substring(1), p.substring(1));
    }

}
```

+ 递归写法 2

Java 代码：
```java
public class Solution {
    public boolean isMatch(String s, String p) {
        if (p.length() == 0){
            return s.length() == 0;
        }

        boolean firstMatch = s.length() >= 1 && (s.charAt(0) == p.charAt(0) || p.charAt(0) == '.');

        if (p.length() > 1 && p.charAt(1) == '*'){
            if (isMatch(s, p.substring(2))){
                return true;
            }
            return firstMatch && isMatch(s.substring(1), p);
        }
        return  firstMatch && isMatch(s.substring(1), p.substring(1));
    }
}
```