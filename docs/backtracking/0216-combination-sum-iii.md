---
title: 「力扣」第 216 题：组合总和 III
date: 2018-03-02 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 14：回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 字符串
permalink: leetcode-solution/0216-combination-sum-iii
---

## 「力扣」第 216 题：组合总和 III

+ [链接](https://leetcode-cn.com/problems/combination-sum-iii)

+ [题解链接](https://leetcode-cn.com/problems/combination-sum-iii/solution/hui-su-jian-zhi-by-liweiwei1419/)

> 找出所有相加之和为 ***n*** 的 **k** 个数的组合**。**组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。
>
> **示例 1**：
>
> ```
> 输入: k = 3, n = 7
> 输出: [[1,2,4]]
> ```
>
> **示例 2**：
>
> ```
> 输入: k = 3, n = 9
> 输出: [[1,2,6], [1,3,5], [2,3,4]]
> ```
>
> 说明：
>
> + 所有数字都是正整数。
> + 解集不能包含重复的组合。 
>
> 

分析：

1、组合不考虑顺序，那么我们就按照顺序取，就不会出现重复；

2、值传递的变量不需要重置，因为每一次向下传递都是复制；

引用传递的变量需要重置，因为全局只使用一个变量。

