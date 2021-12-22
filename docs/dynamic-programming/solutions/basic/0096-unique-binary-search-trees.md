---
title: 「力扣」第 96 题：不同的二叉搜索树（中等）
icon: yongyan
categories: 动态规划
tags:
  - 动态规划
---

+ 题目链接：[96. 不同的二叉搜索树](https://leetcode-cn.com/problems/unique-binary-search-trees/)。

## 题目描述

给你一个整数 `n` ，求恰由 `n` 个节点组成且节点值从 `1` 到 `n` 互不相同的 **二叉搜索树** 有多少种？返回满足题意的二叉搜索树的种数。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/01/18/uniquebstn3.jpg)

```
输入：n = 3
输出：5
```

**示例 2：**

```
输入：n = 1
输出：1
```

**提示：**

- `1 <= n <= 19`

## 方法一：动态规划

![image-20191125044218390](https://tva1.sinaimg.cn/large/007S8ZIlly1geh02s7r7mj31c40d640d.jpg)

这里 `j` 表示左子树的元素个数，最小是 `0` ，最大是 `i - 1`。

注意：这里 $0$ 个结点构成的子树的个数为 $1$，这个值是我们需要的，因此需要多开 $1$ 个空间。

**参考代码 1**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        // 想清楚这个值很关键
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            // 这里 j 表示左子树的元素个数，最小是 0 ，最大是 i - 1
            // 左边子树 + 右边子树 = i - 1
            // i - j - 1 表示的是右边子树元素个数
            for (int j = 0; j < i; j++) {
                // 使用 * 是因为乘法计数原理
                dp[i] += dp[j] * dp[i - j - 1];
            }
        }
        return dp[n];
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def numTrees(self, n: int) -> int:
        if n == 0 or n == 1:
            return 1
        dp = [0] * (n + 1)
        dp[0] = 1
        dp[1] = 1
        for i in range(2, n + 1):
            for j in range(i):
                dp[i] += dp[j] * dp[i - j - 1]
        return dp[n]
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def numTrees(self, n: int) -> int:
        # 因为需要 0 ，所以多开 1 个空间
        dp = [0 for _ in range(n + 1)]
        dp[0] = 1
        dp[1] = 1

        for i in range(2, n + 1):
            for j in range(i):
                dp[i] += dp[j] * dp[i - j - 1]

        return dp[n]
```
</CodeGroupItem>
</CodeGroup>



## 方法二：动态规划的优化

**参考代码 2**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        // 乘法因子的单位是 1
        dp[0] = 1;
        dp[1] = 1;

        for (int i = 2; i < n + 1; i++) {
            for (int j = 0; j < i / 2; j++) {
                dp[i] += 2 * (dp[j] * dp[i - j - 1]);
            }
            if ((i & 1) == 1) {
                dp[i] += dp[i / 2] * dp[i / 2];
            }
        }
        return dp[n];
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
</CodeGroupItem>
</CodeGroup>