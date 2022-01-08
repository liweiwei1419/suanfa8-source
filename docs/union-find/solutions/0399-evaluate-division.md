---
title: 「力扣」第 399 题：除法求值（中等）
icon: yongyan
category: 并查集
tags:
  - 并查集
---

+ 题目链接：[399. 除法求值](https://leetcode-cn.com/problems/longest-consecutive-sequence/)。

这一节的视频讲解有很多知识点，不熟悉的朋友强烈建议观看。


:tv: 视频讲解

+ [视频题解](https://leetcode-cn.com/problems/evaluate-division/solution/399-chu-fa-qiu-zhi-nan-du-zhong-deng-286-w45d/)


> 带权值的「并查集」，搞清楚方向。

## 题目描述

给出方程式 `A / B = k`, 其中 `A` 和 `B` 均为代表字符串的变量， `k` 是一个浮点型数字。根据已知方程式求解问题，并返回计算结果。如果结果不存在，则返回 `-1.0`。

**示例 :**
给定 `a / b = 2.0, b / c = 3.0`
问题: `a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? `
返回 `[6.0, 0.5, -1.0, 1.0, -1.0 ]`

输入为: `vector> equations, vector& values, vector> queries`(方程式，方程式结果，问题方程式)， 其中 `equations.size() == values.size()`，即方程式的长度与方程式结果长度相等（程式与结果一一对应），并且结果值均为正数。以上为方程式的描述。 返回`vector`类型。

基于上述例子，输入如下：

```
equations(方程式) = [ ["a", "b"], ["b", "c"] ],
values(方程式结果) = [2.0, 3.0],
queries(问题方程式) = [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ]. 
```

输入总是有效的。你可以假设除法运算中不会出现除数为0的情况，且不存在任何矛盾的结果。





