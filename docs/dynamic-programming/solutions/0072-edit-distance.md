---
title: 「力扣」第 72 题：编辑距离（困难）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

- 题目链接：[72. 编辑距离](https://leetcode-cn.com/problems/edit-distance)；
- 题解链接：[动态规划（Java，最后有同类问题列表）](https://leetcode-cn.com/problems/edit-distance/solution/dong-tai-gui-hua-java-by-liweiwei1419/)。

## 题目描述

给你两个单词 `word1` 和 `word2`，请你计算出将 `word1` 转换成 `word2` 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

1. 插入一个字符
2. 删除一个字符
3. 替换一个字符

**示例 1：**

```
输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
```

**示例 2：**

```
输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
```

**提示：**

- `0 <= word1.length, word2.length <= 500`
- `word1` 和 `word2` 由小写英文字母组成

**写在前面**：

- 「编辑距离」是经典的两个字符串的动态规划问题，**最基本的问题以及状态设计的想法来自「力扣」第 1143 题**：[最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)；
- 思路：先分析递归结构，然后「**自底向上**」递推计算。

---

**分析递归结构**：根据最长公共子序列问题的学习经验，比较两个字符串的差异可以 **根据它们最后一个字符串的差异进行穷举**，因此状态定义如下：

### 第 1 步：定义状态

`dp[i][j]` 表示：将 `word1[0..i)` 转换成为 `word2[0..j)` 的方案数。

**说明**：由于要考虑空字符串，这里的下标 `i` 不包括 `word[i]`，同理下标 `j` 不包括 `word[j]`。

### 第 2 步：推导状态转移方程

**注意**：由于要考虑空字符串，针对 `word1` 和 `word2` 的讨论需要将下标减 $1$，这一点可以通过如下描述或者参考代码进行理解。

**情况 1**：如果 `word1[i - 1] == word2[j - 1]`，即当前考虑的两个字符串的最后一个字符相等，此时它们的编辑距离就等于它们去掉了最后一个字符以后的编辑距离，`dp[i][j] = dp[i - 1][j - 1]`；

![image.png](https://pic.leetcode-cn.com/1605176793-iBlYLs-image.png)

**情况 2**：如果 `word1[i - 1] != word2[j - 1]`，此时编辑距离是以下三种情况的最小者（根据题目的定义，编辑距离的定义取最小者）。

---

**情况 2.1**：在当前 `word1` 后面加上与当前 `word2` 最后一个字符相等的字符（操作次数 + 1），此时编辑距离 `dp[i][j] = dp[i][j - 1] + 1`；

![image.png](https://pic.leetcode-cn.com/1605176968-bZYGKX-image.png)

---

**情况 2.2** ：去掉当前 `word1` 后面最后一个字符（操作次数 + 1），此时编辑距离 `dp[i][j] = dp[i - 1][j] + 1`；

![image.png](https://pic.leetcode-cn.com/1605177200-tABKeo-image.png)

---

**情况 2.3**：将当前 `word1` 后面最后一个字符替换成当前 `word2`最后一个字符（操作次数 + 1），此时编辑距离 `dp[i][j] = dp[i - 1][j - 1] + 1`。

![image.png](https://pic.leetcode-cn.com/1605177227-VoqJSl-image.png)

---

**综上所述**：`dp[i][j]` 等于以上 $4$ 者的最小值。即：

```java
dp[i][j] = min(dp[i - 1][j - 1], dp[i][j - 1] + 1, dp[i - 1][j] + 1, dp[i - 1][j - 1] + 1)
```

观察右边 `min` 后面的 $4$ 个表达式，`dp[i][j - 1]` 、`dp[i][j - 1]` 它们分别比 `dp[i - 1][j - 1]` 多考虑了 $1$ 个字符，但是后面再加 $1$，值肯定不会比 `dp[i - 1][j - 1]` 更小。

因此，当 `word1[i - 1] == word2[j - 1]` 成立的时候，可以不用再比较后面三者。

### 第 3 步：考虑初始化

从一个字符串变成空字符串，非空字符串的长度就是编辑距离。因此初始化逻辑如下：

```java
for (int i = 0; i <= len1; i++) {
    dp[i][0] = i;
}

for (int j = 0; j <= len2; j++) {
    dp[0][j] = j;
}
```

### 第 4 步：考虑输出

输出：`dp[len1][len2]` 符合语义，即 `word1[0..len)` 转换成 `word2[0..len2)` 的最小操作数。

### 第 5 步：思考空间优化

根据状态转移方程，当前要填写的单元格的数值，完全取决于它的左边一格、上边一格，左上边主对角线上一个的数值。如下图：

![image.png](https://pic.leetcode-cn.com/1605022296-HVNvpX-image.png){:width="200px"}

因此，有两种经典的空间优化方案：① 滚动数组；② 把主对角线上要参考的数值使用一个新变量记录下来，然后在一维表格上循环赋值。由于空间问题不是这道题的瓶颈，可以不做这样的空间优化。

下面我们通过一组动画来理解「动态规划」的执行流程，大家可以在纸上手写模拟这个过程，体会「动态规划」递推的思想：在解决一个新问题的时候，所有的子问题都已经被解决且被记录下来。

@slidestart

![0072.001.jpeg](https://pic.leetcode-cn.com/1605177274-NOvdXa-0072.001.jpeg)

---

![0072.002.jpeg](https://pic.leetcode-cn.com/1605177274-OGvYtD-0072.002.jpeg)

---

![0072.003.jpeg](https://pic.leetcode-cn.com/1605177274-ItnMkp-0072.003.jpeg)

---

![0072.004.jpeg](https://pic.leetcode-cn.com/1605177274-mDfhOv-0072.004.jpeg)

---

![0072.005.jpeg](https://pic.leetcode-cn.com/1605177274-jGFoOt-0072.005.jpeg)

---

![0072.006.jpeg](https://pic.leetcode-cn.com/1605177274-oZgVEZ-0072.006.jpeg)

---

![0072.007.jpeg](https://pic.leetcode-cn.com/1605177274-UdJzNz-0072.007.jpeg)

---

![0072.008.jpeg](https://pic.leetcode-cn.com/1605177274-buHPhl-0072.008.jpeg)

---

![0072.009.jpeg](https://pic.leetcode-cn.com/1605177274-FzSgLW-0072.009.jpeg)

---

![0072.010.jpeg](https://pic.leetcode-cn.com/1605177274-mgLmsW-0072.010.jpeg)

---

![0072.011.jpeg](https://pic.leetcode-cn.com/1605177274-jIFCgZ-0072.011.jpeg)

---

![0072.012.jpeg](https://pic.leetcode-cn.com/1605177274-CqZnQi-0072.012.jpeg)

---

![0072.013.jpeg](https://pic.leetcode-cn.com/1605177274-zkwCTA-0072.013.jpeg)

---

![0072.014.jpeg](https://pic.leetcode-cn.com/1605177274-uVXVUd-0072.014.jpeg)

---

![0072.015.jpeg](https://pic.leetcode-cn.com/1605177274-kCEVLR-0072.015.jpeg)

---

![0072.016.jpeg](https://pic.leetcode-cn.com/1605177274-aENvio-0072.016.jpeg)

---

![0072.017.jpeg](https://pic.leetcode-cn.com/1605177274-EXjkbv-0072.017.jpeg)>

@slideend

**参考代码**：

```Java []
public class Solution {

    // 只讨论 word1 → word2

    public int minDistance(String word1, String word2) {
        int len1 = word1.length();
        int len2 = word2.length();

        // 多开一行一列是为了保存边界条件，即字符长度为 0 的情况，这一点在字符串的动态规划问题中比较常见
        int[][] dp = new int[len1 + 1][len2 + 1];
        // 初始化：当 word2 长度为 0 时，将 word1 的全部删除即可
        for (int i = 1; i <= len1; i++) {
            dp[i][0] = i;
        }
        // 当 word1 长度为 0 时，插入所有 word2 的字符即可
        for (int j = 1; j <= len2; j++) {
            dp[0][j] = j;
        }

        // 由于 word1.charAt(i) 操作会去检查下标是否越界，因此在 Java 里，将字符串转换成字符数组是常见额操作
        char[] word1Array = word1.toCharArray();
        char[] word2Array = word2.toCharArray();
        // 递推开始，注意：填写 dp 数组的时候，由于初始化多设置了一行一列，横纵坐标有个偏移
        for (int i = 1; i <= len1; i++) {
            for (int j = 1; j <= len2; j++) {
                // 这是最佳情况
                if (word1Array[i - 1] == word2Array[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                    continue;
                }
                // 否则在以下三种情况中选出步骤最少的，这是「动态规划」的「最优子结构」
                // 1、在下标 i 处插入一个字符
                int insert = dp[i][j - 1] + 1;
                // 2、替换一个字符
                int replace = dp[i - 1][j - 1] + 1;
                // 3、删除一个字符
                int delete = dp[i - 1][j] + 1;
                dp[i][j] = Math.min(Math.min(insert, replace), delete);

            }
        }
        return dp[len1][len2];
    }
}
```

**复杂度分析**：

- 时间复杂度 ：$O(MN)$，其中 $M$ 为 `word1` 的长度，$N$ 为 `word2` 的长度；
- 空间复杂度 ：$O(MN)$，状态表格的大小。

---

## 同类问题

- 「力扣」第 1143 题：[最长公共子串](https://leetcode-cn.com/problems/longest-common-subsequence/)（中等）；
- 「力扣」第 10 题：[正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching/)（困难）；
- 「力扣」第 44 题：[通配符匹配](https://leetcode-cn.com/problems/wildcard-matching/)（困难）；
- 「力扣」第 97 题：[交错字符串](https://leetcode-cn.com/problems/interleaving-string/)（困难）；
- 「力扣」第 115 题：[ 不同的子序列](https://leetcode-cn.com/problems/distinct-subsequences/)（困难）；
- 「力扣」第 583 题：[两个字符串的删除操作](https://leetcode-cn.com/problems/delete-operation-for-two-strings/)（中等）；
- 「力扣」第 718 题：[最长重复子数组](https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/)（中等）；
- 「力扣」第 1035 题：[不相交的线](https://leetcode-cn.com/problems/uncrossed-lines/)（中等）；
- 「力扣」第 1092 题：[ 最短公共超序列](https://leetcode-cn.com/problems/shortest-common-supersequence/)（困难）。

本题解于 2020 年 11 月 12 日重写，并增加了同类问题。
