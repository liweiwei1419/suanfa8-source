---
title: 「力扣」第 22 题：括号生成（中等）
date: 2018-02-18 08:00:00
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
permalink: leetcode-solution/0022-generate-parentheses
---

## 「力扣」第 22 题：括号生成（中等）

+ [链接](https://leetcode-cn.com/problems/generate-parentheses/)

+ [题解链接](https://leetcode-cn.com/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/)

> 给出 `n` 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
>
> 例如，给出 `n = 3`，生成结果为：
>
> ```
> [
> "((()))",
> "(()())",
> "(())()",
> "()(())",
> "()()()"
> ]
> ```
>





 思路：

+ 左右都有可以使用的括号数量，即严格大于 $0$ 的时候，才产生分支；
+ 左边不受右边的限制，它只受自己的约束；
+ 右边除了自己的限制以外，还收到左边的限制，即右边剩余的数量一定得在严格大于左边剩余的数量的时候，才可以“节外生枝”；
+ 在左边和右边剩余的括号数都等于 $0$ 的时候结算。



![image-20191019103840560](https://tva1.sinaimg.cn/large/006y8mN6gy1g83b6e3vnzj318b0u0td0.jpg)

![image-20191019102109661](https://tva1.sinaimg.cn/large/006y8mN6gy1g83ao6ft0gj30xy0i8tx1.jpg)

注意：由于字符串在传参的时候，每一次都生成新的字符串，因此没有显式「回溯」的过程。



