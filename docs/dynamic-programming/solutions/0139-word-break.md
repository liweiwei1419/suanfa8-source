---
title: 「力扣」第 139 题：单词拆分（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

+ 题目链接：[139. 单词拆分](https://leetcode-cn.com/problems/word-break/)；
+ [题解链接](https://leetcode-cn.com/problems/word-break/solution/dong-tai-gui-hua-python-dai-ma-by-liweiwei1419-2/)

## 题目描述

给你一个字符串 `s` 和一个字符串列表 `wordDict` 作为字典。请你判断是否可以利用字典中出现的单词拼接出 `s` 。

**注意：**不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

**示例 1：**

```
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
```

**示例 2：**

```
输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
     注意，你可以重复使用字典中的单词。
```

**示例 3：**

```
输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
```



**提示：**

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` 和 `wordDict[i]` 仅有小写英文字母组成
- `wordDict` 中的所有字符串 **互不相同**

## 思路分析

+ 题目问可不可以拆分，**没有问具体怎么拆分**，通常考虑使用动态规划解决；
+ 题目给出的关键信息是：**拆分时可以重复使用字典中的单词**。这个条件像极了 **完全背包问题**：在往一个有限制的背包中，装入物品，物品的个数不限制。

## 分析最优子结构

+ 动态规划的思想是：利用已经求出的结果，一点一点推导还未得出的结果。对于这个问题而言，就是依次计算 `dp[0]`、`dp[1]`、……、`dp[len]`；
+ 在计算 `dp[i]` 的过程中，利用了 `dp[0]`、`dp[1]`、……、`dp[i - 1]` 的结果。


![image.png](https://pic.leetcode-cn.com/1604148066-dhONQD-image.png)

**分析细节**：

+ 判断一个单词是不是在单词集合中，单词集合应该先放入哈希表，这样就能以 $O(1)$ 的时间复杂度完成判定；
+ 注意一种特殊情况，如果整个前缀不拆分的时候，恰好在单词集合中，`dp` 值为 `true`，就不用再做拆分；因此分类讨论的依据是：是否可以拆分；
+ 只要得到可以拆分，就可以继续计算下一个 `dp` 值；
+ 注意题目中给出的信息：拆分时可以重复使用字典中的单词。以上分析利用了这个条件。

## 方法一：动态规划

下面是动态规划解题的基本步骤：

+ 定义状态：`dp[i]` 表示以 `s[i]` 结尾的子字符串是否符合题意；
+ 状态转移方程：

分类讨论：

+ 如果整个单词恰好在单词集合中，`dp[i] = true`；
+ 尝试拆分单词：

```
dp[i] = s[j + 1:i] in wordDict && dp[j] for j in [0, i - 1]
```
**注意**：如果字符串很长，`j` 从 $0$ 开始一点一点判断，会拖慢程序运行的时间。因此采用 **从后向前遍历** 的方式，如果截取的后缀单词恰好在单词集合中，并且前缀的 `dp` 值为 `true`，就可以判定当前的 `dp` 值为 `true`。

下面的代码使用 `left` 和 `right` 代替 `i` 和 `j`。

**参考代码 1**：

```Java []
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {

    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        int len = s.length();

        // 状态定义：以 s[i] 结尾的子字符串是否符合题意
        boolean[] dp = new boolean[len];
        for (int right = 0; right < len; right++) {
            // 分类讨论 1：不拆分，substring 右端点不包含，所以是 right + 1
            if (wordSet.contains(s.substring(0, right + 1))) {
                dp[right] = true;
                continue;
            }
            // 分类讨论 2：拆分
            for (int left = right - 1; left >= 0; left--) {
                if (wordSet.contains(s.substring(left + 1, right + 1)) && dp[left]) {
                    dp[right] = true;
                    // 这个 break 很重要，一旦得到 dp[right] = True ，循环不必再继续
                    break;
                }
            }
        }
        return dp[len - 1];
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N^2)$，这里 $N$ 是输入数组的长度；
+ 空间复杂度：$O(N)$。

---

下面修改状态定义，注意一些细节上的处理。

## 方法二：动态规划（与方法一只是状态定义与初始化不一样）

+ 状态：`dp[i]` 表示子串 `s[0:i)` （即长度为 $i$ 的前缀子串）可以被空格拆分，并且拆分以后的单词是否落在单词集合中；

**注意**：`i` 这个时候不包括，是开区间。所以 `j` 可以遍历的范围就在 `[0, i)`。

![image.png](https://pic.leetcode-cn.com/1604150448-CzNRnf-image.png)


+ 状态转移方程：`dp[i] = s[j:i) in wordDict and dp[j] for j in [0, i)`；
+ 需要长度为 $0$ 的状态，且定义为 `True`，因为如果字符串本身就在 `wordDict` 中，就不必看 `dp` 了，可以直接判断为 `True`，因此 `dp[0] = True`；
+ **注意边界条件**：后数组的起始下标，表示了前数组的长度；
+ 一旦得到 `dp[i] = True` 就可以退出循环了，`j` 就无须遍历下去。

**参考代码 2**：

```Java []
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {

    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        int len = s.length();
        // 状态定义：长度为 i 的子字符串是否符合题意
        boolean[] dp = new boolean[len + 1];
        // 这个状态的设置非常关键，说明前部分的字符串已经在 wordSet 中
        dp[0] = true;
        for (int right = 1; right <= len; right++) {
            for (int left = right - 1; left >= 0; left--) {
                // dp[left] 写在前面会更快一点，否则还要去切片，然后再放入 hash 表判重
                if (wordSet.contains(s.substring(left, right)) && dp[left]) {
                    dp[right] = true;
                    // 这个 break 很重要，一旦得到 dp[right] = True ，循环不必再继续
                    break;
                }
            }
        }
        return dp[len];
    }
}
```

**复杂度分析**：（同参考代码 1）。



