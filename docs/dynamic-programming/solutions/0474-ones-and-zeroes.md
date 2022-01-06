---
title: 「力扣」第 474 题：一和零（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

二维背包问题，数组有三维，可以降到一维。

+ [474. 一和零](https://leetcode-cn.com/problems/ones-and-zeroes/)

## 题目链接

在计算机界中，我们总是追求用有限的资源获取最大的收益。

现在，假设你分别支配着 **m** 个 `0` 和 **n** 个 `1`。另外，还有一个仅包含 `0` 和 `1` 字符串的数组。

你的任务是使用给定的 **m** 个 `0` 和 **n** 个 `1` ，找到能拼出存在于数组中的字符串的最大数量。每个 `0` `1` 至多被使用**一次**。

**注意:**

1. 给定 `0` 和 `1` 的数量都不会超过 `100`。
2. 给定字符串数组的长度不会超过 `600`。

**示例 1:**

```
输入: Array = {"10", "0001", "111001", "1", "0"}, m = 5, n = 3
输出: 4

解释: 总共 4 个字符串可以通过 5 个 0 和 3 个 1 拼出，即 "10","0001","1","0" 。
```

**示例 2:**

```
输入: Array = {"10", "0", "1"}, m = 1, n = 1
输出: 2

解释: 你可以拼出 "10"，但之后就没有剩余数字了。更好的选择是拼出 "0" 和 "1" 。
```

注意：什么叫组成？必须用完？还是有剩余就可以？

**参考代码**：

```java
public class Solution {

    private int[] countZeroAndOne(String str) {
        int[] cnt = new int[2];
        for (char c : str.toCharArray()) {
            cnt[c - '0']++;
        }
        return cnt;
    }

    public int findMaxForm(String[] strs, int m, int n) {
        int len = strs.length;
        int[][][] dp = new int[len + 1][m + 1][n + 1];

        for (int i = 1; i <= len; i++) {
            int[] cnt = countZeroAndOne(strs[i - 1]);
            for (int j = 0; j <= m; j++) {
                for (int k = 0; k <= n; k++) {
                    // 先把上一行抄下来
                    dp[i][j][k] = dp[i - 1][j][k];

                    int zeros = cnt[0];
                    int ones = cnt[1];

                    if (j >= zeros && k >= ones) {
                        dp[i][j][k] = Math.max(dp[i - 1][j][k], dp[i - 1][j - zeros][k - ones] + 1);
                    }
                }
            }
        }
        return dp[len][m][n];
    }
}
```

