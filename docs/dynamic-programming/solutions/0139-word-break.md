---
title: 「力扣」第 139 题：单词拆分
icon: yongyan
categories: 动态规划
tags:
  - 动态规划
---

## 「力扣」第 139 题：单词拆分

+ [链接](https://leetcode-cn.com/problems/word-break/)
+ [题解链接](https://leetcode-cn.com/problems/word-break/solution/dong-tai-gui-hua-python-dai-ma-by-liweiwei1419-2/)

给定一个**非空**字符串 *s* 和一个包含**非空**单词列表的字典 *wordDict*，判定 *s* 否可以被空格拆分为一个或多个在字典中出现的单词。

**说明：**

- 拆分时可以重复使用字典中的单词。
- 你可以假设字典中没有重复的单词。

**示例 1：**

```
输入: s = "leetcode", wordDict = ["leet", "code"]
输出: true
解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
```

**示例 2：**

```
输入: s = "applepenapple", wordDict = ["apple", "pen"]
输出: true
解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
注意你可以重复使用字典中的单词。
```

**示例 3：**

```
输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
输出: false
```

提示：用「记忆化递归」和「动态规划」都做一下。先把单词列表放到哈希表里，然后先判处。



