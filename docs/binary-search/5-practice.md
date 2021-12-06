---
title: 7.5 例题和练习
icon: shipin
category: 二分查找
tags:
  - 减治思想
---


+ 可以我的  LeetBook 收看二分查找的知识点 [讲解](https://leetcode-cn.com/leetbook/read/learning-algorithms-with-leetcode/xsq0b7/)，免费；
+ 知识点讲解：[写对二分查找不能靠模板，需要理解加练习 （附练习题，持续更新）](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)、[【视频讲解】](https://www.bilibili.com/video/av83911694?p=1)。

## 题型一：二分求下标

+ 重点问题

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 704  | [二分查找](https://leetcode-cn.com/problems/binary-search/)（简单） |                                                              |
| 35   | [搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/)（简单） | [【视频讲解】](https://www.bilibili.com/video/av83911694?p=2)、[文字题解](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/) |
| 34   | [在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)（简单） | [【视频讲解】](https://www.bilibili.com/video/av83911694?p=3)、[文字题解](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/si-lu-hen-jian-dan-xi-jie-fei-mo-gui-de-er-fen-cha/) |
| 1095 | [ 山脉数组中查找目标值](https://leetcode-cn.com/problems/find-in-mountain-array/)（中等） | [【视频讲解】](https://www.bilibili.com/video/BV1GK4115778)、[文字题解](https://leetcode-cn.com/problems/find-in-mountain-array/solution/shi-yong-chao-hao-yong-de-er-fen-fa-mo-ban-python-/) |
| 4    | [寻找两个有序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)（困难） | [【视频讲解】](https://www.bilibili.com/video/BV1Xv411z76J)、[文字题解](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/he-bing-yi-hou-zhao-gui-bing-guo-cheng-zhong-zhao-/) |


**说明**：

+ 第 34 题：二分查找找边界问题、[CSDN](https://blog.csdn.net/lw_power/article/details/104066739)、[庸才顾子汐：关于 while (left <= right) 写法返回值的详细讨论](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/da-jia-bu-yao-kan-labuladong-de-jie-fa-fei-chang-2/)；
+ 第 4 题：二分查找里最难的问题，重点在于理解：① 为什么是在短数组里找边界；② 边界条件的判断。

---

**练习**：


| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 33   | [搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)（中等） | [文字题解](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/er-fen-fa-python-dai-ma-java-dai-ma-by-liweiwei141/) |
| 81   | [搜索旋转排序数组 II](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)（中等） | [文字题解](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/solution/er-fen-cha-zhao-by-liweiwei1419/) |
| 153  | [153. 寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)（中等） | [文字题解](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/solution/er-fen-fa-fen-zhi-fa-python-dai-ma-java-dai-ma-by-/) |
| 154  | [154. 寻找旋转排序数组中的最小值 II](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)（困难） | [文字题解](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/solution/er-fen-fa-fen-zhi-fa-python-dai-ma-by-liweiwei1419/) |
| 275  | [ H指数 II](https://leetcode-cn.com/problems/h-index-ii/)（中等） | [文字题解](https://leetcode-cn.com/problems/h-index-ii/solution/jian-er-zhi-zhi-er-fen-cha-zhao-by-liweiwei1419-2/) |
| 436  | [寻找右区间](https://leetcode-cn.com/problems/find-right-interval/)（中等） | [文字题解](https://leetcode-cn.com/problems/find-right-interval/solution/er-fen-cha-zhao-hong-hei-shu-by-liweiwei1419/) |
| 1237 | [找出给定方程的正整数解](https://leetcode-cn.com/problems/find-positive-integer-solution-for-a-given-equation/)（中等） |                                                              |
| 1300 | [转变数组后最接近目标值的数组和](https://leetcode-cn.com/problems/sum-of-mutated-array-closest-to-target/)（中等） | [文字题解](https://leetcode-cn.com/problems/sum-of-mutated-array-closest-to-target/solution/er-fen-cha-zhao-by-liweiwei1419-2/) |

## 题型二：二分确定一个有范围的整数（二分答案）

**算法思想**：减而治之。如果题目要我们找一个整数，这个整数有确定的范围，可以通过二分查找逐渐缩小范围，最后逼近到一个数。

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 69   | [x 的平方根](https://leetcode-cn.com/problems/sqrtx/)（简单） | [文字题解](https://leetcode-cn.com/problems/sqrtx/solution/er-fen-cha-zhao-niu-dun-fa-python-dai-ma-by-liweiw/) |
| 287  | [寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/)（中等） | [文字题解](https://leetcode-cn.com/problems/find-the-duplicate-number/solution/er-fen-fa-si-lu-ji-dai-ma-python-by-liweiwei1419/) |
| 374  | [猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)（简单） | [文字题解](https://leetcode-cn.com/problems/guess-number-higher-or-lower/solution/shi-fen-hao-yong-de-er-fen-cha-zhao-fa-mo-ban-pyth/) |
| 1283 | [使结果不超过阈值的最小除数](https://leetcode-cn.com/problems/find-the-smallest-divisor-given-a-threshold/)（中等） | [文字题解](https://leetcode-cn.com/problems/find-the-smallest-divisor-given-a-threshold/solution/er-fen-cha-zhao-ding-wei-chu-shu-by-liweiwei1419/) |
| 1292 | [元素和小于等于阈值的正方形的最大边长](https://leetcode-cn.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/)（中等） |                                                              |

## 题型三：复杂的判别函数（最大值极小化问题）

**说明**：这一类问题本质上还是「题型二」（二分答案），但是初学的时候会觉得有一些绕。这一类问题的问法都差不多，**关键字是「连续」、「正整数」**，请大家注意捕捉题目中这样的关键信息。

+ [二分查找之「最大值极小化」相关问题及解题步骤](https://juejin.im/post/6862249637161091085)
+ [二分查找之「最大值极小化」例题选讲](https://juejin.im/post/6864407058662457358/)

| 题号   | 链接                                                         | 题解                                                         |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 875    | [爱吃香蕉的珂珂](https://leetcode-cn.com/problems/koko-eating-bananas/)（中等） | [文字题解](https://leetcode-cn.com/problems/koko-eating-bananas/solution/er-fen-cha-zhao-ding-wei-su-du-by-liweiwei1419/) |
| 410    | [分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum/)（困难） | [文字题解](https://leetcode-cn.com/problems/split-array-largest-sum/solution/er-fen-cha-zhao-by-liweiwei1419-4/) |
| LCP 12 | [小张刷题计划](https://leetcode-cn.com/problems/xiao-zhang-shua-ti-ji-hua/)（中等） |                                                              |
| 1011   | [在 D 天内送达包裹的能力](https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days)（中等） |                                                              |
| 1482   | [制作 m 束花所需的最少天数](https://leetcode-cn.com/problems/minimum-number-of-days-to-make-m-bouquets/)（中等） |                                                              |
| 1552   | [两球之间的磁力](https://leetcode-cn.com/problems/magnetic-force-between-two-balls/)（中等） |                                                              |