---
title: 3.1 二分查找习题分类
icon: shipin
category: 二分查找
tags:
  - 减治思想
---

这部分内容请见我在「导航栏」编写的「二分查找精讲」：

![image-20211212150658906](https://tva1.sinaimg.cn/large/008i3skNgy1gxb2dhagh1j31mc050wff.jpg)

这部分内容我把整个知识体系，二分查找的思想、细节、需要注意的地方，不同二分查找写法的比较都做了详细的讲解，并且逐步细化了每一节的内容，阅读起来不会很吃力。

+ 可以我的  LeetBook 收看二分查找的知识点 [讲解](https://leetcode-cn.com/leetbook/read/learning-algorithms-with-leetcode/xsq0b7/)，免费；
+ 知识点讲解：[写对二分查找不能靠模板，需要理解加练习 （附练习题，持续更新）](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)、[【视频讲解】](https://www.bilibili.com/video/av83911694?p=1)。

以下是练习（我写过很多「二分查找习题列表」，我暂时先把它们汇总在这里）。

**提示**：这些问题都不应该套模板去做，而应该在真正弄清楚题意（明确地知道题目要我们找的元素的性质）以后，对看到的元素进行合理的分支判断，进而清楚搜索的范围。

二分查找的基本思想是「减而治之」，即逐渐缩小问题规模。以下的二分查找问题，我们都不应该背下来，而应该在练习的过程中逐渐掌握分析问题、解决问题的方法。

可以采用的循环不变量是：总是在区间 `[left..right]` 里查找目标元素。采用左闭右开区间只会增加麻烦。

遇到问题的时候，一定需要仔细调试，使用最最基本的打印输出语句，针对错误测试用例，发现出错的原因。

二分查找算法没有那么难？已经有很多同学掌握二分查找算法了，我们加油！

## 题型一：二分求下标（在数组中查找符合条件的元素的下标）

**说明**：

+ 第 704 题：二分查找的最原始问题，使用两边夹的二分查找方法需要后处理（退出循环以后，还需要判断 `left` 或 `right` 位置的值是不是问题的答案）；

+ 第 34 题、第 35 题：需要明白这一类问题的共同特点，请见 [这里](https://suanfa8.com/binary-search/02/)；
+ 第 300 题：特别经典的一道「动态规划」，二分查找的思路基于「动态规划」的状态定义得到，代码很像第 35 题；
+ 第 658 题：这个问题二分的写法需要做复杂的分类讨论，可以放在以后做；
+ 第 4 题：二分查找里最难的问题，重点在于理解：① 为什么是在短数组里找边界；② 深刻理解搜索边界的意义。

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 704  | [二分查找](https://leetcode-cn.com/problems/binary-search/)（简单） |                                                              |
| 35   | [搜索插入位置](https://leetcode-cn.com/problems/search-insert-position/)（简单） | [【视频讲解】](https://www.bilibili.com/video/av83911694?p=2)、[文字题解](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/) |
| 300  | [最长上升子序列（中等）](https://leetcode-cn.com/problems/longest-increasing-subsequence/) | [文字题解](https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/dong-tai-gui-hua-er-fen-cha-zhao-tan-xin-suan-fa-p/) |
| 34   | [在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)（简单） | [【视频讲解】](https://www.bilibili.com/video/av83911694?p=3)、[文字题解](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/si-lu-hen-jian-dan-xi-jie-fei-mo-gui-de-er-fen-cha/) |
| 611  | [有效三角形的个数](https://leetcode-cn.com/problems/valid-triangle-number/) | [文字题解](https://leetcode-cn.com/problems/valid-triangle-number/solution/er-fen-cha-zhao-python-dai-ma-java-dai-ma-by-liwei/) |
| 658  | [找到 K 个最接近的元素（中等）](https://leetcode-cn.com/problems/find-k-closest-elements/) | [文字题解](https://leetcode-cn.com/problems/find-k-closest-elements/solution/pai-chu-fa-shuang-zhi-zhen-er-fen-fa-python-dai-ma/) |
| 436  | [寻找右区间](https://leetcode-cn.com/problems/find-right-interval/)（中等） | [文字题解](https://leetcode-cn.com/problems/find-right-interval/solution/er-fen-cha-zhao-hong-hei-shu-by-liweiwei1419/) |
| 1237 | [找出给定方程的正整数解](https://leetcode-cn.com/problems/find-positive-integer-solution-for-a-given-equation/)（中等） |                                                              |
| 1300 | [转变数组后最接近目标值的数组和](https://leetcode-cn.com/problems/sum-of-mutated-array-closest-to-target/)（中等） | [文字题解](https://leetcode-cn.com/problems/sum-of-mutated-array-closest-to-target/solution/er-fen-cha-zhao-by-liweiwei1419-2/) |
| 4    | [寻找两个有序数组的中位数](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)（困难） | [【视频讲解】](https://www.bilibili.com/video/BV1Xv411z76J)、[文字题解](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/he-bing-yi-hou-zhao-gui-bing-guo-cheng-zhong-zhao-/) |

使用二分查找的前提不一定非要是「有序数组」。旋转有序数组（下表前 4 题）、山脉数组（下表后 2 题）里的查找问题也可以使用「二分查找」。这些问题的解决思路是：利用 **局部单调性**，逐步缩小搜索区间。


| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 33   | [搜索旋转排序数组](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/)（中等） | [文字题解](https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/er-fen-fa-python-dai-ma-java-dai-ma-by-liweiwei141/) |
| 81   | [搜索旋转排序数组 II](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/)（中等） | [文字题解](https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/solution/er-fen-cha-zhao-by-liweiwei1419/) |
| 153  | [寻找旋转排序数组中的最小值](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/)（中等） | [文字题解](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/solution/er-fen-fa-fen-zhi-fa-python-dai-ma-java-dai-ma-by-/) |
| 154  | [寻找旋转排序数组中的最小值 II](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/)（困难） | [文字题解](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/solution/er-fen-fa-fen-zhi-fa-python-dai-ma-by-liweiwei1419/) |
| 852  | [山脉数组的峰顶索引（简单）](https://leetcode-cn.com/problems/peak-index-in-a-mountain-array/) |                                                              |
| 1095 | [山脉数组中查找目标值](https://leetcode-cn.com/problems/find-in-mountain-array/)（中等） | [【视频讲解】](https://www.bilibili.com/video/BV1GK4115778)、[文字题解](https://leetcode-cn.com/problems/find-in-mountain-array/solution/shi-yong-chao-hao-yong-de-er-fen-fa-mo-ban-python-/) |

## 题型二：二分答案（在一个有范围的区间里搜索一个整数）

如果题目要我们找一个整数，这个整数有确定的范围，可以通过二分查找逐渐缩小范围，最后逼近到一个数。

定位一个有范围的整数，这件事情也叫「二分答案」或者叫「二分结果」。如果题目要求的是一个整数，这个整数有明确的范围，可以考虑使用二分查找。

事实上，二分答案是我们最早接触的二分查找的场景。「幸运 52」里猜价格游戏，就是「二分查找」算法的典型应用：先随便猜一个数，如果猜中，游戏结束。如果猜大了，往小猜；如果猜小了，往大猜。

**说明**：

+ 第 69 题：在一个整数范围里查找一个整数，也是二分查找法的应用场景；
+ 第 275 题：这个问题题解题意得花很多时间，可以跳过不做；
+ 第 278 题：在一个整数范围里查找一个整数，**不是在输入数组里使用二分查找**。这个问题二分查找的解法很反常规（不应该用时间换空间），知道即可。

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 69   | [x 的平方根](https://leetcode-cn.com/problems/sqrtx/)（简单） | [文字题解](https://leetcode-cn.com/problems/sqrtx/solution/er-fen-cha-zhao-niu-dun-fa-python-dai-ma-by-liweiw/) |
| 287  | [寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/)（中等） | [文字题解](https://leetcode-cn.com/problems/find-the-duplicate-number/solution/er-fen-fa-si-lu-ji-dai-ma-python-by-liweiwei1419/) |
| 374  | [猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)（简单） | [文字题解](https://leetcode-cn.com/problems/guess-number-higher-or-lower/solution/shi-fen-hao-yong-de-er-fen-cha-zhao-fa-mo-ban-pyth/) |
| 275  | [H指数 II（中等）](https://leetcode-cn.com/problems/h-index-ii/) | [文字题解](https://leetcode-cn.com/problems/h-index-ii/solution/jian-er-zhi-zhi-er-fen-cha-zhao-by-liweiwei1419-2/) |
| 1283 | [使结果不超过阈值的最小除数](https://leetcode-cn.com/problems/find-the-smallest-divisor-given-a-threshold/)（中等） | [文字题解](https://leetcode-cn.com/problems/find-the-smallest-divisor-given-a-threshold/solution/er-fen-cha-zhao-ding-wei-chu-shu-by-liweiwei1419/) |
| 1292 | [元素和小于等于阈值的正方形的最大边长](https://leetcode-cn.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/)（中等） |                                                              |

## 题型三：二分答案的升级版（每一次缩小区间的时候都需要遍历数组）

**说明**：这一类问题本质上还是「题型二」（二分答案），但是初学的时候会觉得有一些绕。这一类问题的问法都差不多，**关键字是「连续」、「正整数」**，请大家注意捕捉题目中这样的关键信息。

这里给出的问题解法都一样，会一题等于会其它题。问题的场景会告诉我们：**目标变量和另一个变量有相关关系（一般是线性关系），目标变量的性质不好推测，但是另一个变量的性质相对容易推测（满足某种意义上的单调性）**。这样的问题的判别函数通常会写成一个函数的形式。

这一类问题可以统称为「 **最大值极小化** 」问题，最原始的问题场景是木棍切割问题，这道题的原始问题是「力扣」第 410 题（[分割数组的最大值（困难）](https://leetcode-cn.com/problems/split-array-largest-sum/)）。

思路是这样的：

+ 分析出题目要我们找一个整数，这个整数有范围，所以可以用二分查找；
+ 分析出 **单调性**，一般来说是一个变量 `a` 的值大了，另一个变量 `b` 的值就变小，而「另一个变量的值」 `b` 有限制，因此可以通过调整 `a` 的值达到控制 `b` 的效果；
+ 这一类问题的题目条件一定会给出 **连续**、**正整数** 这样的关键字。如果没有，问题场景也一定蕴含了这两个关键信息。

参考资料：

+ [二分查找之「最大值极小化」相关问题及解题步骤](https://juejin.im/post/6862249637161091085)
+ [二分查找之「最大值极小化」例题选讲](https://juejin.im/post/6864407058662457358/)

以下给出的问题无一例外。

| 题号   | 链接                                                         | 题解                                                         |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 875    | [爱吃香蕉的珂珂](https://leetcode-cn.com/problems/koko-eating-bananas/)（中等） | [文字题解](https://leetcode-cn.com/problems/koko-eating-bananas/solution/er-fen-cha-zhao-ding-wei-su-du-by-liweiwei1419/) |
| 410    | [分割数组的最大值](https://leetcode-cn.com/problems/split-array-largest-sum/)（困难） | [文字题解](https://leetcode-cn.com/problems/split-array-largest-sum/solution/er-fen-cha-zhao-by-liweiwei1419-4/) |
| LCP 12 | [小张刷题计划](https://leetcode-cn.com/problems/xiao-zhang-shua-ti-ji-hua/)（中等） | 题解在第 410 题题解里                                        |
| 1011   | [在 D 天内送达包裹的能力](https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days)（中等） |                                                              |
| 1482   | [制作 m 束花所需的最少天数](https://leetcode-cn.com/problems/minimum-number-of-days-to-make-m-bouquets/)（中等） | 题解在第 1300 题题解里                                       |
| 1552   | [两球之间的磁力](https://leetcode-cn.com/problems/magnetic-force-between-two-balls/)（中等） |                                                              |

补充：「力扣」第 209 题：长度最小的子数组（中等），这道题可以使用「前缀和 + 二分查找」或者「滑动窗口」来做，一定要想清楚，为什么可以使用这些方法。



