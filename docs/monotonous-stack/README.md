---
title: 单调栈
icon: yongyan
category: 栈
tags:
  - 栈
  - 单调栈
---

::: info 重点概括
「单调栈」就是普通的栈，可以使用「单调栈」的问题都需要符合「后进先出」的规律，分析出「后进先出」是关键的，「单调」只是题目设计恰好符合的规律。
:::

「力扣」单调栈：[题单](https://leetcode-cn.com/tag/monotonic-stack/problemset/)。

## 分析「单调栈」问题的思路

1. 暴力解法，暴力解法的缺点是通常都是时间复杂度很高，空间复杂度很低，每一次计算都没有记住什么，暴力解法做了很多重复工作；

2. 分析出后进先出，所以用「栈」；

   说明：栈是一种缓存，恰恰好有些场景就是后进先出。分析出后进先出，一般都是从暴力解法来的。

3. 分析出维护站内单调性的原因；
4. 栈内一般存下标；
5. 多做题、思考、总结。

单调栈的问题很有局限性，如果看到求左边第 1 个，右边第 1 个，大概就是单调栈。可以认为这一类问题其实就是人为设计出来的，让你维护栈内元素的单调性去做。

## 利用「单调栈」的单调性

利用「单调栈」的单调性能找到：

- 出栈元素左边第一个大于（等于）当前元素的位置；
- 出栈元素左边第一个小于（等于）当前元素的位置；
- 找右边第一个大于（等于）当前；如果看到解决问题需要有这种需求的，试试看，用栈，往保持栈单调那个方向去思考，或许就能解决了。

## 单调栈典型问题

| 序号 | 题目                                                                                               | 题解                                                                                                                                                                                                                                                                                                                  |
| ---- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | [739. 每日温度（中等）](https://leetcode-cn.com/problems/daily-temperatures/)                      | [【程序员的自我修养】739. Daily Temperatures](https://leetcode-cn.com/problems/daily-temperatures/solution/cheng-xu-yuan-de-zi-wo-xiu-yang-739-daily-temperat/)（我看这篇题解学会的）、[暴力解法 + 单调栈](https://leetcode-cn.com/problems/daily-temperatures/solution/bao-li-jie-fa-dan-diao-zhan-by-liweiwei1419/) |
| 2    | [496. 下一个更大元素 I（简单）](https://leetcode-cn.com/problems/next-greater-element-i/)          | [暴力解法、单调栈](https://leetcode-cn.com/problems/next-greater-element-i/solution/bao-li-jie-fa-dan-diao-zhan-by-liweiwei1419-2/)                                                                                                                                                                                   |
| 3    | [503. 下一个更大元素 II（中等）](https://leetcode-cn.com/problems/next-greater-element-ii/)        | （我暂时没有写）                                                                                                                                                                                                                                                                                                      |
| 4    | [901. 股票价格跨度（中等）](https://leetcode-cn.com/problems/online-stock-span/)                   | [LeetCode 第 901 题：股票价格跨度（单调栈）](https://blog.csdn.net/lw_power/article/details/103957702)                                                                                                                                                                                                                |
| 5    | [84. 柱状图中最大的矩形（困难）](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/) | [暴力解法、栈（哨兵技巧）](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/bao-li-jie-fa-zhan-by-liweiwei1419/)                                                                                                                                                                              |
| 6    | [42. 接雨水（困难）](https://leetcode-cn.com/problems/trapping-rain-water/)                        | [暴力解法、栈（哨兵技巧）](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/bao-li-jie-fa-zhan-by-liweiwei1419/)                                                                                                                                                                              |
| 7    | [402. 移掉 K 位数字](https://leetcode-cn.com/problems/remove-k-digits/)                            |                                                                                                                                                                                                                                                                                                                       |

「力扣」第 84、42、739、496、316、901、402、581 题。还有 962 和 1124（不知名网友提供）。
下面列出了我学习单调栈做过的问题，供大家参考。

## 数据结构是缓存

**数据结构可以认为是一种缓存**，是「空间换时间」思想的体现，恰当的数据结构可以帮助我们高效地处理数据，所谓恰当，是指「针对问题场景」，使用了合适的数据结构；

- 「栈」符合「后进先出」；
- 「队列」符合「先进先出」；
- 「哈希表」有快速存取数据的特点；
- 「二分搜索树」（红黑树、B 树系列）维护了数据的先后关系，还能得到一个数据的上下界；
- 「Trie」（字典树）专门用于处理字符串的问题；
- 「并查集」用于处理不相交集合的动态连接问题；
- 「线段树」用于处理区间和；
- 「树状数组」用于处理前缀和；
- 「优先队列」用于处理有动态添加数组且需要获得最值的场景；
- 「单调队列」「单调栈」。

## 学习建议

- 先理解「暴力解法」（Brute Force），暴力解法通常是不占空间的，挨个去算，每一个数据的计算都没有为下一个数据的计算留下些什么
- 学习这些数据结构，或者说使用这些数据结构的时候，要清楚，对数据的增删改查的意义是什么？
- **画图（拿起纸笔，把思路讲清楚）**：11、42、84，都是画图（物理现象）才能搞清楚思路和设计算法流程的问题；
- 拿一般化的例子（研究算法思路）和特殊例子研究（算法细节 base case、corner case）面对 corner case 可能得用哨兵优化（单链表问题）；
- 认真调试代码。

## 视频题解

使用「栈」解决的问题，需要我们通过具体例子，发现解决它们正好符合「后进先出」的规律：

- 把暂时还不能确定结果的数据放入栈，把可以确定结果的数据从栈中拿出；
- 很多数据结构恰好应用于这种「动态」处理问题的场景，而发挥出它们的应用价值。

掌握下面这两个问题，离不开对具体例子的研究，进而归纳出一般规律。

| 题目链接                                                                                           | 力扣                                                                                                                                 | B 站                                                |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| [84. 柱状图中最大的矩形（困难）](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/) | [力扣](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/zhu-zhuang-tu-zhong-zui-da-de-ju-xing-by-leetcode-/) | [B 站](https://www.bilibili.com/video/BV16D4y1D7ed) |
| [316. 去除重复字母（中等）](https://leetcode-cn.com/problems/remove-duplicate-letters/)            | [力扣](https://leetcode-cn.com/problems/remove-duplicate-letters/solution/qu-chu-zhong-fu-zi-mu-by-leetcode-soluti-vuso/)            | [B 站](https://www.bilibili.com/video/BV1Tz4y167pC) |

「栈」最为广泛的一种应用就是作为「递归」「深度优先遍历」「分治算法」的数据结构支持。
