---
title: 4.4 栈的练习
icon: yongyan
category: 栈
tags:
  - 栈
---

## 题型一：基本的使用栈解决的问题

下面的问题非常基础，一定需要掌握：

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 20   | [有效的括号](https://leetcode-cn.com/problems/valid-parentheses)（简单） |                                                              |
| 71   | [简化路径](https://leetcode-cn.com/problems/simplify-path)（中等） |                                                              |
| 155  | [最小栈](https://leetcode-cn.com/problems/min-stack)（简单） | [文字题解](https://leetcode-cn.com/problems/min-stack/solution/shi-yong-fu-zhu-zhan-tong-bu-he-bu-tong-bu-python-/) |
| 225  | [用队列实现栈](https://leetcode-cn.com/problems/implement-stack-using-queues/)（简单） | [文字题解](https://leetcode-cn.com/problems/implement-stack-using-queues/solution/peek-he-pop-shi-yi-ci-jiang-dui-shou-yuan-su-chu-d/) |
| 232  | [用栈实现队列](https://leetcode-cn.com/problems/implement-queue-using-stacks)（简单） | [文字题解](https://leetcode-cn.com/problems/implement-queue-using-stacks/solution/shi-yong-liang-ge-zhan-yi-ge-zhuan-men-ru-dui-yi-g/) |
| 946  | [946. 验证栈序列](https://leetcode-cn.com/problems/validate-stack-sequences)（中等） |                                                              |

### **练习**：

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 284  | [顶端迭代器](https://leetcode-cn.com/problems/peeking-iterator)（中等） |                                                              |
| 341  | [扁平化嵌套列表迭代器](https://leetcode-cn.com/problems/flatten-nested-list-iterator)（中等） |                                                              |
| 946  | [验证栈序列](https://leetcode-cn.com/problems/validate-stack-sequences)（中等） |                                                              |
| 1111 | [有效括号的嵌套深度](https://leetcode-cn.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/)（中等） | [文字题解](https://leetcode-cn.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/solution/qian-tao-shen-du-wan-cheng-gua-hao-pi-pei-wen-ti-s/) |

## 题型二：单调栈

单调栈就是普通的栈，在使用的过程中恰好符合了「后进先出」，栈内元素单调的特点。「单调栈」和「单调队列」的问题通常来说很特殊，掌握例题和一些练习就可以了。

经验：单调栈中一般存下标。

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 84   | [柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)（困难） | [视频题解](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/zhu-zhuang-tu-zhong-zui-da-de-ju-xing-by-leetcode-/)、[文字题解](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/bao-li-jie-fa-zhan-by-liweiwei1419/) |
| 42   | [接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)（困难） | [文字题解](https://leetcode-cn.com/problems/trapping-rain-water/solution/bao-li-jie-fa-yi-kong-jian-huan-shi-jian-zhi-zhen-/) |
| 739  | [每日温度](https://leetcode-cn.com/problems/daily-temperatures/)（中等） | [文字题解](https://leetcode-cn.com/problems/daily-temperatures/solution/bao-li-jie-fa-dan-diao-zhan-by-liweiwei1419/) |
| 316  | [去除重复字母](https://leetcode-cn.com/problems/remove-duplicate-letters/)（困难） | [文字题解](https://leetcode-cn.com/problems/remove-duplicate-letters/solution/zhan-by-liweiwei1419/) |

**说明**：

+ 第 739 题：推荐阅读 [程序员的自我修养：739. Daily Temperatures](https://leetcode-cn.com/problems/daily-temperatures/solution/cheng-xu-yuan-de-zi-wo-xiu-yang-739-daily-temperat/)；

### **练习**：

| 序号 | 题目                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 496  | [下一个更大元素 I（简单）](https://leetcode-cn.com/problems/next-greater-element-i/) | [暴力解法、单调栈](https://leetcode-cn.com/problems/next-greater-element-i/solution/bao-li-jie-fa-dan-diao-zhan-by-liweiwei1419-2/) |
| 503  | [下一个更大元素 II（中等）](https://leetcode-cn.com/problems/next-greater-element-ii/) |                                                              |
| 901  | [股票价格跨度（中等）](https://leetcode-cn.com/problems/online-stock-span/) | [LeetCode 第 901 题：股票价格跨度（单调栈）](https://blog.csdn.net/lw_power/article/details/103957702) |