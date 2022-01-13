---
title: 「力扣」第 1371 题：每个元音包含偶数次的最长子字符串（中等）
icon: yongyan
category: 位运算
tags:
  - 位运算
---

- 题目链接：[1371. 每个元音包含偶数次的最长子字符串](https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts)。

今天要和大家分享的是「状态压缩」的两道问题。我再准备一段时间，再和大家分享「动态规划」里「状压 dp」相关的问题，这两道问题是一个热身。

## 题目描述

给你一个字符串 `s` ，请你返回满足以下条件的最长子字符串的长度：每个元音字母，即 'a'，'e'，'i'，'o'，'u' ，在子字符串中都恰好出现了偶数次。

示例 1：

```
输入：s = "eleetminicoworoep"
输出：13
解释：最长子字符串是 "leetminicowor" ，它包含 e，i，o 各 2 个，以及 0 个 a，u 。
```

示例 2：

```
输入：s = "leetcodeisgreat"
输出：5
解释：最长子字符串是 "leetc" ，其中包含 2 个 e 。
```

示例 3：

```
输入：s = "bcbcbc"
输出：6
解释：这个示例中，字符串 "bcbcbc" 本身就是最长的，因为所有的元音 a，e，i，o，u 都出现了 0 次。
```

提示：

- `1 <= s.length <= 5 x 10^5`；
- `s 只包含小写英文字母`。

### 算法思想

前缀和 -> 区间和（对于异或也是类似的道理）、哈希表、动态规划、状态压缩。

### 思路分析：

1. 「出现两次」联想到异或和两次抵消；

2. 「子字符串」表示连续，连续的问题通常想到「滑动窗口」或者是「前缀和」，这里的和也指异或和；子串中 `a`、`e`、`i`、`o`、`u` 只出现偶数次，等价于：在这个子串里异或和为 $0$；

3. 由于要记录「最长的」符合要求的子串的长度，于是只需要记录第一次出现的「前缀异或和」，以后再次出现的相同的「异或前缀和」的时候，将下标相减（注意考虑边界情况）。

   因此把所有的「前缀异或和」信息保存在一个哈希表里，由于这里所有的前缀异或和状态有限（$2^5 = 32$），用数组或者哈希表均可；

4. 定义成「异或前缀和」是因为中间遍历的那些元音字符相同的，在异或运算下都抵消了，这是符合题目的要求的：「中间遍历的那些字符出现偶数次元音字符」；

5. 这个哈希表的 `key` 是前缀异或和对应的整数 `cur`， `value` 是当前遍历到的下标，初始化的时候赋值为一个特殊值，表示当前的前缀异或和没有出现；

6. `cur` 记录了遍历到当前下标 `i` 的 `a`、`e`、`i`、`o`、`u` 的情况，是一个「前缀和」的概念，并且是「异或前缀和」；

7. 把前缀异或和的信息表示在一个二进制只有 5 位的整数 `cur` 里，方便以后查找；

8. 把状态信息返回在一个整数里面的操作叫做「状态压缩」，状态压缩的好处是，便于查找和比对，不好的地方是调试相对困难。

以下两种写法一样：

**参考代码 1**：

Java 代码：

```java
import java.util.Arrays;

public class Solution {

    public int findTheLongestSubstring(String s) {
        // dp 定义：状态为 i 的前缀异或和第 1 次出现的
        int[] dp = new int[32];
        // -1 表示未赋值
        Arrays.fill(dp, -1);

        // 前缀异或和
        int bitMap = 0;
        dp[bitMap] = 0;

        int res = 0;
        int len = s.length();

        char[] charArray = s.toCharArray();

        for (int i = 0; i < len; i++) {
            char c = charArray[i];
            if (c == 'a') {
                bitMap ^= 1;
            }
            if (c == 'e') {
                bitMap ^= (1 << 1);
            }
            if (c == 'i') {
                bitMap ^= (1 << 2);
            }
            if (c == 'o') {
                bitMap ^= (1 << 3);
            }
            if (c == 'u') {
                bitMap ^= (1 << 4);
            }

            // 先记录信息，然后再计算长度的时候，就需要 + 1
            if (dp[bitMap] >= 0) {
                res = Math.max(res, i - dp[bitMap] + 1);
            } else {
                dp[bitMap] = i + 1;
            }
        }
        return res;
    }
}
```

**参考代码 2**：

Java 代码：

```java
import java.util.Arrays;

public class Solution2 {

    public int findTheLongestSubstring(String s) {
        int[] dp = new int[32];
        Arrays.fill(dp, -1);

        int bitMap = 0;
        dp[bitMap] = 0;

        int res = 0;
        int index = 0;

        char[] chars = s.toCharArray();
        for (char c : chars) {
            index++;
            if (c == 'a') {
                bitMap ^= 1;
            }
            if (c == 'e') {
                bitMap ^= (1 << 1);
            }
            if (c == 'i') {
                bitMap ^= (1 << 2);
            }
            if (c == 'o') {
                bitMap ^= (1 << 3);
            }
            if (c == 'u') {
                bitMap ^= (1 << 4);
            }

            if (dp[bitMap] >= 0) {
                // 由于此时 index 已经 ++，因此是 index - dp[bitMap]
                res = Math.max(res, index - dp[bitMap]);
            } else {
                dp[bitMap] = index;
            }
        }
        return res;
    }
}

```

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度，遍历一次得到结果；
- 空间复杂度：$O(N)$，状态数组的长度是 $N$。

参考资料：https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/solution/jian-dan-de-si-lu-by-mnizy/
