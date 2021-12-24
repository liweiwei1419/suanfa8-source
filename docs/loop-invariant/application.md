---
title: 2 循环不变量有什么用
icon: yongyan
category: 循环不变量
tags:
  - 数组
  - 循环不变量
---



循环不变量用于证明算法的正确性。

在我看来，学习循环不变量这个概念，在于让我们自己 **明确在循环的过程中我们在做什么**，在维护了一件什么事情。这样别人在阅读我们的代码的时候也能够清楚我们在做什么。

我们编写代码的工程师很多时候不需要像写论文那样必需要给出「初始化」「保持」和「终止」三个步骤。而是用一句话表示循环的过程中在做什么事情就可以。

明确循环不变量，可以帮助我们 **理清楚变量的含义**、变量的初始化的值、在循环的过程中操作的先后顺序以及在循环完成以后实现了怎样的效果，返回的变量的值是多少。

我做一些算法问题的时候，就会写出循环不变量，例如：

+ 二分查找问题：在 `nums[left..right]` 里查找目标元素，最终区间 `[left..right]` 里只剩下一个元素，或者区间为空；
+ 滑动窗口问题：在 `nums[left..right)` 里的元素满足题目要求的某种性质，`right` 先向右走，直到不满足的时候停下，`right` 的左边，`left` 的右边（包括 `left`） 的元素保持某种性质，然后接着让 `left` 向右走。

::: danger 提示
在滑动窗口问题里，`right` 不包含，在这里表示 `right` 之前的数据我们已经看过，并且 `right - left` 的值等于滑动窗口的长度。

有一些问题完全可以定义成 `nums[left..right]` 里的元素满足题目要求的某种性质，此时滑动窗口的长度等于 `right - left + 1`。

定义是人为定义的，很多时候并不一定要都一样，只要能够正确得出结论。
:::

::: info 说明
循环不变量的定义不唯一的，上面只是举了个例子，**不同问题很可能不一样**。
:::



写出循环不变量是为了让我自己清楚和检查变量的初值设置是否合理。**有一些时候，循环不变量的定义是通过我们自己修改逐渐而清晰起来的**。