---
title: 「力扣」第 745 题：前缀和后缀搜索（困难）
icon: yongyan
category: 前缀树
tags:
  - 前缀树
---


+ 题目链接：[745. 前缀和后缀搜索](https://leetcode-cn.com/problems/prefix-and-suffix-search/description/)。


### LeetCode 第 745 题：

传送门：[前缀和后缀搜索](https://leetcode-cn.com/problems/prefix-and-suffix-search/description/)

> 给定多个 `words`，`words[i]` 的权重为 `i` 。
>
> 设计一个类 `WordFilter` 实现函数`WordFilter.f(String prefix, String suffix)`。这个函数将返回具有前缀 `prefix` 和后缀`suffix` 的词的最大权重。如果没有这样的词，返回 -1。
>
> **例子:**
>
> ```
> 输入:
> WordFilter(["apple"])
> WordFilter.f("a", "e") // 返回 0
> WordFilter.f("b", "") // 返回 -1
> ```
>
> **注意:**
>
> 1. `words`的长度在`[1, 15000]`之间。
> 2. 对于每个测试用例，最多会有`words.length`次对`WordFilter.f`的调用。
> 3. `words[i]`的长度在`[1, 10]`之间。
> 4. `prefix, suffix`的长度在`[0, 10]`之前。
> 5. `words[i]`和`prefix, suffix`只包含小写字母。

### 