---
title: 视频题解合集
icon: shipin
category: 视频题解
tags:
  - 视频题解
---

我从 2019 年 9 月开始录制视频题解。最开始的时候，我会对着要讲的材料录好几遍。现在讲解知识点的时候写逐字稿。已经沉淀了很多视频，其实也算是一个小小的体系课程，现在罗列在这里，希望能够对大家有所帮助。

## 自我介绍

<video src="https://suanfa8.com/files/self-introduction.mp4" controls="controls" width="800" height="450">
Your browser does not support the video tag.
</video>

**说明**：上传日期：2022 年 3 月 23 日（星期三）。

## 0. 算法新手如何刷力扣（LeetCode）？【干货分享】

- [视频：算法新手如何刷力扣（LeetCode）？【干货分享】](https://www.bilibili.com/video/BV17K411J7yR)

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=498920820&bvid=BV17K411J7yR&cid=215380991&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 1. 时间复杂度与空间复杂度

- [视频：时间复杂度与空间复杂度](https://leetcode-cn.com/leetbook/read/learning-algorithms-with-leetcode/553v4h/)

这个视频提到了时间复杂度是一个渐进概念，需要用动态的角度去理解。并且讲解了时间复杂度的严格定义（极限形式），以便大家理解时间复杂度的计算规则。并且还指出了：时间复杂度不是程序的运行时间；应该使用「空间换时间」，更多关注在优化「时间复杂度」。

- [B 站：《算法不好玩》专题一：递归与时间复杂度](https://www.bilibili.com/video/BV11h411h7nT?spm_id_from=333.999.0.0)

## 2. 二分查找

- [视频：用「排除法」（减治思想）写二分查找问题](https://www.bilibili.com/video/BV147411i7zu?p=1)

这个视频介绍了如何写对二分查找算法，二分查找的细节虽然多，但只要我们掌握了正确的解题思路，并且多加练习、勤于思考、多做总结，写对二分查找的问题就不再困难。

下面的视频讲解了几道二分查找的例题，我们重点分析了题意和如何利用题目中给出的条件逐渐缩小搜索区间。

| 题目链接                                                                                                                                               | 力扣                                                                                                                                                          | B 站                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [35. 搜索插入位置（简单）](https://leetcode-cn.com/problems/search-insert-position/)                                                                   | （空缺）                                                                                                                                                      | [B 站](https://www.bilibili.com/video/BV147411i7zu?p=2)                     |
| [34. 在排序数组中查找元素的第一个和最后一个位置（简单）](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)    | [力扣](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/zai-pai-xu-shu-zu-zhong-cha-zhao-yuan-su-de-di-3-4/) | [B 站](https://www.bilibili.com/video/BV147411i7zu?p=3)                     |
| [《剑指 Offer》 53 - I. 在排序数组中查找数字 I （同「力扣」第 34 题）](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/) | [力扣](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/solution/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-wl6kr/)                 | [B 站](https://www.bilibili.com/video/BV1UV411H7ek?spm_id_from=333.999.0.0) |
| [1095. 山脉数组中查找目标值（中等）](https://leetcode-cn.com/problems/find-in-mountain-array/)                                                         | [力扣](https://leetcode-cn.com/problems/find-in-mountain-array/solution/shan-mai-shu-zu-zhong-cha-zhao-mu-biao-zhi-by-leet/)                                  | [B 站](https://www.bilibili.com/video/BV1GK4115778)                         |
| [4. 寻找两个正序数组的中位数（困难）](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/)                                                   | [力扣](https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/xun-zhao-liang-ge-you-xu-shu-zu-de-zhong-wei-s-114/)                             | [B 站](https://www.bilibili.com/video/BV1Xv411z76J)                         |

我们通过「力扣」第 4 题（寻找两个正序数组的中位数）的分析，向大家介绍了这样的技巧：如果要找的目标元素的性质比较复杂，可以对这条性质取反，进而写出可以简单的可以缩减问题区间的逻辑语句。

## 3. 和排序相关的问题

- [B 站：《算法不好玩》专题二：基础排序算法](https://www.bilibili.com/video/BV1y44y1q7MJ?spm_id_from=333.999.0.0)
- [B 站：《算法不好玩》专题三：循环不变量](https://www.bilibili.com/video/BV1Jg411M7Lp?spm_id_from=333.999.0.0)
- [B 站：《算法不好玩》专题四：归并排序](https://www.bilibili.com/video/BV1D64y1B76c?spm_id_from=333.999.0.0)

「归并排序」和「快速排序」是非常重要的排序算法，**深刻理解它们对于理解「递归」函数的运行机制有着非常大的帮助**，同时它们也是「分治思想」的典型应用。「逆序对」和「荷兰国旗问题（颜色分类）」也是非常经典的算法问题。

| 题目链接                                                                                                         | 力扣                                                                                                                                      | B 站                                                    |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [《剑指 Offer》 51. 数组中的逆序对（困难）](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)    | [力扣](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/shu-zu-zhong-de-ni-xu-dui-by-leetcode-solution/)          | [B 站](https://www.bilibili.com/video/BV1Qk4y1r7u5)     |
| [315. 计算右侧小于当前元素的个数（困难）](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/) | [力扣](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/solution/gui-bing-pai-xu-suo-yin-shu-zu-python-dai-ma-java-/) | [B 站](https://www.bilibili.com/video/BV1Hz411v7XC?p=1) |

计算「逆序对」完全就是按照「归并排序」的思路而来。

| 题目链接                                                              | 力扣                                                                                               | B 站                                                |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [75. 颜色分类（中等）](https://leetcode-cn.com/problems/sort-colors/) | [力扣](https://leetcode-cn.com/problems/sort-colors/solution/yan-se-fen-lei-by-leetcode-solution/) | [B 站](https://www.bilibili.com/video/BV1tz4y1o7n5) |

在「颜色分类」问题的讲解中，我们向大家介绍了「循环不变量」，在编写代码的过程中，我们应该一直遵守所使用的变量的语义，在「程序执行前」「执行过程中」「执行结束」以后保持不变。遵守我们自己定义「循环不变量」是我们写对正确代码的重要方法。

| 题目链接                                                                                 | 力扣                                                                                                                | B 站                                                |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [41. 缺失的第一个正数（困难）](https://leetcode-cn.com/problems/first-missing-positive/) | [力扣](https://leetcode-cn.com/problems/first-missing-positive/solution/tong-pai-xu-python-dai-ma-by-liweiwei1419/) | [B 站](https://www.bilibili.com/video/BV167411N7vd) |

「缺失的第一个正数」是一个经典的算法问题，用到的思想是「原地哈希」，可以理解为是「桶排序」算法的特殊应用：一个萝卜一个坑，一个桶里只存放一个元素。要和大家强调的是，可以这样做是和输入数组的元素的数值密切相关。

## 4. 滑动窗口

「滑动窗口」问题是典型的应用「循环不变量」解决的问题，比较考验我们编码和调试的能力。

| 题目链接                                                                                                       | 力扣                                                                                                                                     | B 站                                                |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [76. 最小覆盖子串（困难）](https://leetcode-cn.com/problems/minimum-window-substring/)                         | [力扣](https://leetcode-cn.com/problems/minimum-window-substring/solution/zui-xiao-fu-gai-zi-chuan-by-leetcode-solution/)                | [B 站](https://www.bilibili.com/video/BV1aK4y1t7Qd) |
| [424. 替换后的最长重复字符（中等）](https://leetcode-cn.com/problems/longest-repeating-character-replacement/) | [力扣](https://leetcode-cn.com/problems/longest-repeating-character-replacement/solution/ti-huan-hou-de-zui-chang-zhong-fu-zi-fu-eaacp/) | [B 站](https://www.bilibili.com/video/BV14r4y1K7rN) |
| [567. 字符串的排列（中等）](https://leetcode-cn.com/problems/permutation-in-string/)                           | [力扣](https://leetcode-cn.com/problems/permutation-in-string/solution/zi-fu-chuan-de-pai-lie-by-leetcode-q6tp/)                         | [B 站](https://www.bilibili.com/video/BV175411E761) |
| [978. 最长湍流子数组（中等）](https://leetcode-cn.com/problems/longest-turbulent-subarray/)                    | [力扣](https://leetcode-cn.com/problems/longest-turbulent-subarray/solution/zui-chang-tuan-liu-zi-shu-zu-by-leetcode-zqoq/)              | [B 站](https://www.bilibili.com/video/BV1PV411i73Y) |
| [992. K 个不同整数的子数组（困难）](https://leetcode-cn.com/problems/subarrays-with-k-different-integers/)     | [力扣](https://leetcode-cn.com/problems/subarrays-with-k-different-integers/solution/k-ge-bu-tong-zheng-shu-de-zi-shu-zu-by-l-ud34/)     | [B 站](https://www.bilibili.com/video/BV1xy4y1Y7GL) |

## 5. 栈相关的问题

使用「栈」解决的问题，需要我们通过具体例子，发现解决它们正好符合「后进先出」的规律：

- 把暂时还不能确定结果的数据放入栈，把可以确定结果的数据从栈中拿出；
- 很多数据结构恰好应用于这种「动态」处理问题的场景，而发挥出它们的应用价值。

掌握下面这两个问题，离不开对具体例子的研究，进而归纳出一般规律。

| 题目链接                                                                                           | 力扣                                                                                                                                 | B 站                                                |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| [84. 柱状图中最大的矩形（困难）](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/) | [力扣](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/zhu-zhuang-tu-zhong-zui-da-de-ju-xing-by-leetcode-/) | [B 站](https://www.bilibili.com/video/BV16D4y1D7ed) |
| [316. 去除重复字母（中等）](https://leetcode-cn.com/problems/remove-duplicate-letters/)            | [力扣](https://leetcode-cn.com/problems/remove-duplicate-letters/solution/qu-chu-zhong-fu-zi-mu-by-leetcode-soluti-vuso/)            | [B 站](https://www.bilibili.com/video/BV1Tz4y167pC) |

「栈」最为广泛的一种应用就是作为「递归」「深度优先遍历」「分治算法」的数据结构支持。

## 6. 并查集

「并查集」这个数据结构目前来说在面试中出现比较少，如果是准备算法面试的朋友，可以跳过。

| 题目链接                                                                                                               | 力扣                                                                                                                                         | B 站                                                |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [990. 等式方程的可满足性（中等）](https://leetcode-cn.com/problems/satisfiability-of-equality-equations/)              | [力扣](https://leetcode-cn.com/problems/satisfiability-of-equality-equations/solution/deng-shi-fang-cheng-de-ke-man-zu-xing-by-leetcode-/)   | [B 站](https://www.bilibili.com/video/BV1gz411i7kD) |
| [399. 除法求值（中等）](https://leetcode-cn.com/problems/evaluate-division/)                                           | [力扣](https://leetcode-cn.com/problems/evaluate-division/solution/399-chu-fa-qiu-zhi-nan-du-zhong-deng-286-w45d/)                           | [B 站](https://www.bilibili.com/video/BV1Ko4y1f7eK) |
| [959. 由斜杠划分区域（中等）](https://leetcode-cn.com/problems/regions-cut-by-slashes/)                                | [力扣](https://leetcode-cn.com/problems/regions-cut-by-slashes/solution/you-xie-gang-hua-fen-qu-yu-by-leetcode-67xb/)                        | [B 站](https://www.bilibili.com/video/BV1Ry4y117HD) |
| [765. 情侣牵手（困难）](https://leetcode-cn.com/problems/couples-holding-hands/)                                       | [力扣](https://leetcode-cn.com/problems/couples-holding-hands/solution/qing-lu-qian-shou-by-leetcode-gl1c/)                                  | [B 站](https://www.bilibili.com/video/BV1pv411Y7wX) |
| [947. 移除最多的同行或同列石头（中等）](https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/) | [力扣](https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/solution/947-yi-chu-zui-duo-de-tong-xing-huo-tong-ezha/) | [B 站](https://www.bilibili.com/video/BV1Nr4y1K7Gj) |
| [803. 打砖块（困难）](https://leetcode-cn.com/problems/bricks-falling-when-hit/)                                       | [力扣](https://leetcode-cn.com/problems/bricks-falling-when-hit/solution/803-da-zhuan-kuai-by-leetcode-r5kf/)                                | [B 站](https://www.bilibili.com/video/BV1Xv411W74B) |
| [1202. 交换字符串中的元素（中等）](https://leetcode-cn.com/problems/smallest-string-with-swaps/)                       | [力扣](https://leetcode-cn.com/problems/smallest-string-with-swaps/solution/1202-jiao-huan-zi-fu-chuan-zhong-de-yuan-wgab/)                  | [B 站](https://www.bilibili.com/video/BV1Yh41127VH) |
| [778. 水位上升的泳池中游泳（困难）](https://leetcode-cn.com/problems/swim-in-rising-water/)                            | [力扣](https://leetcode-cn.com/problems/swim-in-rising-water/solution/shui-wei-shang-sheng-de-yong-chi-zhong-y-862o/)                        | [B 站](https://www.bilibili.com/video/BV1kv4y1f7to) |

## 7. 树

树的问题很多都可以使用「深度优先遍历」或者「广度优先遍历」去做。

| 题目链接                                                                                                                                   | 力扣                                                                                                                                                           | B 站                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [105. 从前序与中序遍历序列构造二叉树（中等）](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | [力扣](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/cong-qian-xu-yu-zhong-xu-bian-li-xu-lie-gou-zao-9/) | [B 站](https://www.bilibili.com/video/BV14A411q7Nv) |

## 8. 回溯算法

「回溯算法」其实就是对题目中所蕴含的「树形结构」执行一次 **深度优先遍历**。做这一类问题，在草稿纸上画出树形结构图很重要。

| 题目链接                                                                   | 力扣                                                                                                | B 站                                                                                      |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [46. 全排列（中等）](https://leetcode-cn.com/problems/permutations/)       | [力扣](https://leetcode-cn.com/problems/permutations/solution/quan-pai-lie-by-leetcode-solution-2/) | [B 站](https://www.bilibili.com/video/BV1oa4y1v7Kz?from=search&seid=14615048896751357901) |
| [47. 全排列 II（中等）](https://leetcode-cn.com/problems/permutations-ii/) | [力扣]()                                                                                            | [B 站](https://www.bilibili.com/video/BV147411A7Yq?p=1)                                   |
| [78. 子集（中等）](https://leetcode-cn.com/problems/subsets/)              | [力扣](https://leetcode-cn.com/problems/subsets/solution/hui-su-python-dai-ma-by-liweiwei1419/)     | [B 站](https://www.bilibili.com/video/BV147411A7Yq?p=2)                                   |
| [90. 子集 II（中等）](https://leetcode-cn.com/problems/subsets-ii/)        |                                                                                                     | [B 站](https://www.bilibili.com/video/BV147411A7Yq?p=3)                                   |

## 9. 动态规划

| 题目链接                                                                                                                         | 力扣                                                                                                                                          | B 站                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [剑指 Offer 42. 连续子数组的最大和（同「力扣」第 53 题）](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/) | [力扣](https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/solution/lian-xu-zi-shu-zu-de-zui-da-he-by-leetco-tiui/)          | [B 站](https://www.bilibili.com/video/BV1Lq4y1X7oF?spm_id_from=333.999.0.0) |
| [5. 最长回文子串（中等）](https://leetcode-cn.com/problems/longest-palindromic-substring/)                                       | [力扣](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-zi-chuan-by-leetcode-solution/)              | [B 站](https://www.bilibili.com/video/BV1L54y1D7pa)                         |
| [416. 分割等和子集（中等）](https://leetcode-cn.com/problems/partition-equal-subset-sum/)                                        | [力扣](https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/fen-ge-deng-he-zi-ji-by-leetcode-solution/)                       | [B 站](https://www.bilibili.com/video/BV1oZ4y1G7QY)                         |
| [《剑指 Offer》46. 把数字翻译成字符串（中等）](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/)        | [力扣](https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/solution/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-by-leetcode-sol/) | [B 站](https://www.bilibili.com/video/BV125411W7eC)                         |

## 10. 广度优先遍历与拓扑排序

| 题目链接                                                                                                 | 力扣                                                                                                                                   | B 站                                                |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [127. 单词接龙（困难）](https://leetcode-cn.com/problems/word-ladder/)                                   | [力扣](https://leetcode-cn.com/problems/word-ladder/solution/yan-du-you-xian-bian-li-shuang-xiang-yan-du-you-2/)                       | [B 站](https://www.bilibili.com/video/BV1og4y1i7DL) |
| [1203. 项目管理（困难）](https://leetcode-cn.com/problems/sort-items-by-groups-respecting-dependencies/) | [力扣](https://leetcode-cn.com/problems/sort-items-by-groups-respecting-dependencies/solution/1203-xiang-mu-guan-li-by-leetcode-t63b/) | [B 站](https://www.bilibili.com/video/BV1iy4y1m7ye) |

## 11. 哈希表

| 题目链接                                                                                                        | 力扣                                                                                                            | B 站                                                                        |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [1. 两数之和（简单）](https://leetcode-cn.com/problems/two-sum/)                                                | [力扣](https://leetcode-cn.com/problems/two-sum/solution/liang-shu-zhi-he-by-leetcode-solution/)                | [B 站](https://www.bilibili.com/video/BV1rv411k7VY)                         |
| [面试题 10.02. 变位词组（同「力扣」第 49 题：变位词组）](https://leetcode-cn.com/problems/group-anagrams-lcci/) | [力扣](https://leetcode-cn.com/problems/group-anagrams-lcci/solution/bian-wei-ci-zu-by-leetcode-solution-g2a8/) | [B 站](https://www.bilibili.com/video/BV1eU4y1J7Ti?spm_id_from=333.999.0.0) |

## 12. 位运算相关

| 题目链接                                                                                                    | 力扣                                                                                                                               | B 站                                                |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [1128. 等价多米诺骨牌对的数量（简单）](https://leetcode-cn.com/problems/number-of-equivalent-domino-pairs/) | [力扣](https://leetcode-cn.com/problems/number-of-equivalent-domino-pairs/solution/deng-jie-duo-mi-nuo-gu-pai-dui-de-shu-li-08z8/) | [B 站](https://www.bilibili.com/video/BV1fV411q7ZY) |
