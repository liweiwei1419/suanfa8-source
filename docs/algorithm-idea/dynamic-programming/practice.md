---
title: 5.11 动态规划练习
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

**说明**：下面给出的典型问题还会添加（2020 年 12 月 2 日）。

## 一、入门问题

了解「自顶向下」记忆化递归与「自底向上」递推两种动态规划的方式。

| 题号 | 链接                                                         | 题解 |
| ---- | ------------------------------------------------------------ | ---- |
| 509  | [斐波那契数](https://leetcode-cn.com/problems/fibonacci-number/)（简单） |      |

+ 第 509 题：斐波拉契数列递归做一定要加缓存，记忆化递归。

## 二、重复子问题

这部分需要用到「分步计数乘法原理」、「分类计数加法原理」。

| 题号     | 链接                                                         | 题解                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 70       | [ 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)（简单） | [CSDN](https://blog.csdn.net/lw_power/article/details/103799112) |
| 91       | [解码方法](https://leetcode-cn.com/problems/decode-ways/)（中等） | [文字题解](https://leetcode-cn.com/problems/decode-ways/solution/dong-tai-gui-hua-java-python-by-liweiwei1419/) |
| 《剑》46 | [把数字翻译成字符串](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)（中等） | [视频题解](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/solution/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-by-leetcode-sol/) |

第 70 题：和斐波拉契数是同一道问题。计数类问题会用到分类计数原理、分步计数原理。

## 三、最优子结构


| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 279  | [完全平方数](https://leetcode-cn.com/problems/perfect-squares/)（中等） |                                                              |
| 322  | [零钱兑换](https://leetcode-cn.com/problems/coin-change/)（中等） | [文字题解](https://leetcode-cn.com/problems/coin-change/solution/dong-tai-gui-hua-shi-yong-wan-quan-bei-bao-wen-ti-/) |
| 343  | [整数拆分](https://leetcode-cn.com/problems/integer-break/)（中等） | [文字题解](https://leetcode-cn.com/problems/integer-break/solution/tan-xin-xuan-ze-xing-zhi-de-jian-dan-zheng-ming-py/) |
| 377  | [组合总和 Ⅳ](https://leetcode-cn.com/problems/combination-sum-iv/)（中等） | [动态规划](https://leetcode-cn.com/problems/combination-sum-iv/solution/dong-tai-gui-hua-python-dai-ma-by-liweiwei1419/) |

**说明**：

第 377 题注意甄别不是背包问题。

## 四、无后效性


| 序号 | 链接                                                         | 题解                                                         |      |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| 198  | [打家劫舍](https://leetcode-cn.com/problems/house-robber/)（简单） | [文字题解](https://leetcode-cn.com/problems/the-masseuse-lcci/solution/dong-tai-gui-hua-by-liweiwei1419-8/) |      |
| 120  | [三角形最小路径和](https://leetcode-cn.com/problems/triangle/)（中等） |                                                              |      |
| 62   | [不同路径](https://leetcode-cn.com/problems/unique-paths/)（中等） |                                                              |      |
| 63   | [不同路径 II](https://leetcode-cn.com/problems/unique-paths-ii/)（中等） |                                                              |      |
| 64   | [最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)（中等） |                                                              |      |

练习：

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 121  | [买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)（简单） | [暴力枚举 + 动态规划 + 差分思想](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/bao-li-mei-ju-dong-tai-gui-hua-chai-fen-si-xiang-b/)、[CSDN](https://blog.csdn.net/lw_power/article/details/103772951) |
| 122  | [买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)（简单） | [暴力搜索 + 贪心算法 + 动态规划](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution/tan-xin-suan-fa-by-liweiwei1419-2/)、[CSDN](https://blog.csdn.net/lw_power/article/details/103773246) |
| 123  | [买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)（困难） | [动态规划](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/solution/dong-tai-gui-hua-by-liweiwei1419-7/)、[CSDN](https://blog.csdn.net/lw_power/article/details/103773822) |
| 188  | [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/)（困难） | [动态规划](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/solution/dong-tai-gui-hua-by-liweiwei1419-4/) |
| 309  | [最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/)（中等） | [动态规划](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution/dong-tai-gui-hua-by-liweiwei1419-5/) |
| 714  | [买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)（中等） | [动态规划](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solution/dong-tai-gui-hua-by-liweiwei1419-6/) |

以下是一些「动态规划」经典问题。因为这些问题很重要，所以单独作为一个分类。

## 五、最大子段和


| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 53   | [最大子序和](https://leetcode-cn.com/problems/maximum-subarray)（中等） | [文字题解](https://leetcode-cn.com/problems/maximum-subarray/solution/dong-tai-gui-hua-fen-zhi-fa-python-dai-ma-java-dai/)、[CSDN](https://blog.csdn.net/lw_power/article/details/104062895) |

练习：


| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 152  | [乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray/)（中等） | [动态规划（理解无后效性）](https://leetcode-cn.com/problems/maximum-product-subarray/solution/dong-tai-gui-hua-li-jie-wu-hou-xiao-xing-by-liweiw/) |

## 六、最长上升子序列


| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 300  | [最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)（中等） | [动态规划 （包含O (N log N) 解法的状态定义以及解释）](https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/dong-tai-gui-hua-er-fen-cha-zhao-tan-xin-suan-fa-p/) |

**说明**：第 300 题是非常经典的动态规划问题。$O(N \log N)$ 的解法，针对问题本身的特点进行状态定义，并证明状态数组是有序数组，降低了时间复杂度。

练习：

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 354  | [俄罗斯套娃信封问题](https://leetcode-cn.com/problems/russian-doll-envelopes/) | [文字题解](https://leetcode-cn.com/problems/russian-doll-envelopes/solution/tan-xin-suan-fa-er-fen-cha-zhao-python-dai-ma-java/) |
| 646  | [最长数对链](https://leetcode-cn.com/problems/maximum-length-of-pair-chain/)（中等） |                                                              |

## 七、最长公共子串

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1143 | [最长公共子序列](https://leetcode-cn.com/problems/longest-common-subsequence/)（中等） | [文字题解](https://suanfa8.com/dynamic-programming/solutions/two-string/1143-longest-common-subsequence/) |
| 72   | [ 编辑距离](https://leetcode-cn.com/problems/edit-distance/)（困难） | [文字题解](https://leetcode-cn.com/problems/edit-distance/solution/dong-tai-gui-hua-java-by-liweiwei1419/)、[CDSN](https://blog.csdn.net/lw_power/article/details/103818533) |
| 10   | [正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching/)（困难） |                                                              |

## 八、区间 DP 与划分型 DP

区间 DP：

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 5    | [最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)（中等） | [文字题解](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zhong-xin-kuo-san-dong-tai-gui-hua-by-liweiwei1419/) |
| 312  | [戳气球](https://leetcode-cn.com/problems/burst-balloons/)（困难） |                                                              |

划分型 DP：

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 410  | [分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum/)（困难） | [文字题解](https://leetcode-cn.com/problems/split-array-largest-sum/solution/er-fen-cha-zhao-by-liweiwei1419-4/) |

## 九、树形 DP


| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 337  | [打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii/)（中等） | [文字题解](https://leetcode-cn.com/problems/house-robber-iii/solution/shu-xing-dp-ru-men-wen-ti-by-liweiwei1419/) |
| 124  | [二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)（困难） |                                                              |

## 十、背包问题

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gxn0p7jvn0j31hc0u00vq.jpg)

背包九讲：https://github.com/tianyicui/pack

| 题目序号                                                     | 题解                                                         | 知识点                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| [416. 分割等和子集](https://leetcode-cn.com/problems/partition-equal-subset-sum/) | [动态规划（0-1 背包问题）](https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/0-1-bei-bao-wen-ti-xiang-jie-zhen-dui-ben-ti-de-yo/) | 很重要的动态规划模型，必须掌握 |
| [518. 零钱兑换 II](https://leetcode-cn.com/problems/coin-change-2/) | [动态规划（套用完全背包问题模型）](https://leetcode-cn.com/problems/coin-change-2/solution/dong-tai-gui-hua-wan-quan-bei-bao-wen-ti-by-liweiw/) |                                |
| [322. 零钱兑换（中等）](https://leetcode-cn.com/problems/coin-change/) | [动态规划、使用「完全背包」问题思路、图的广度优先遍历](https://leetcode-cn.com/problems/coin-change/solution/dong-tai-gui-hua-shi-yong-wan-quan-bei-bao-wen-ti-/) |                                |
| [494. 目标和](https://leetcode-cn.com/problems/target-sum/)  |                                                              | 0-1 背包问题                   |
| [474. 一和零](https://leetcode-cn.com/problems/ones-and-zeroes/) | [动态规划（转换为 0-1 背包问题）](https://leetcode-cn.com/problems/ones-and-zeroes/solution/dong-tai-gui-hua-zhuan-huan-wei-0-1-bei-bao-wen-ti/) |                                |

（会补充「博弈类型 DP」、「状态压缩 DP」、「数位 DP」等。）

#### 其它问题

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 746  | [使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)（简单） | [文字题解](https://leetcode-cn.com/problems/min-cost-climbing-stairs/solution/dong-tai-gui-hua-by-liweiwei1419-3/) |
| 887  | [鸡蛋掉落](https://leetcode-cn.com/problems/super-egg-drop/)（困难） | [动态规划（只解释官方题解方法一）（Java）](https://leetcode-cn.com/problems/super-egg-drop/solution/dong-tai-gui-hua-zhi-jie-shi-guan-fang-ti-jie-fang/) |
| 32   | [最长有效括号](https://leetcode-cn.com/problems/longest-valid-parentheses/)（困难） | [CSDN](https://blog.csdn.net/lw_power/article/details/103939326) |

