---
title: 5.7 回溯算法视频讲解以及练习列表
icon: shipin
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
---

下面提供一些我做过的「回溯」算法的问题，以便大家学习和理解「回溯」算法。


## 视频题解列表

| 题目链接                                                     | 力扣                                                         | B 站                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [46. 全排列（中等）](https://leetcode-cn.com/problems/permutations/) | [力扣](https://leetcode-cn.com/problems/permutations/solution/quan-pai-lie-by-leetcode-solution-2/) | [B 站](https://www.bilibili.com/video/BV1oa4y1v7Kz?from=search&seid=14615048896751357901) |
| [47. 全排列 II（中等）](https://leetcode-cn.com/problems/permutations-ii/) | [力扣]()                                                     | [B 站](https://www.bilibili.com/video/BV147411A7Yq?p=1)      |
| [78. 子集（中等）](https://leetcode-cn.com/problems/subsets/) | [力扣](https://leetcode-cn.com/problems/subsets/solution/hui-su-python-dai-ma-by-liweiwei1419/) | [B 站](https://www.bilibili.com/video/BV147411A7Yq?p=2)      |
| [90. 子集 II（中等）](https://leetcode-cn.com/problems/subsets-ii/) | （空缺）                                                     | [B 站](https://www.bilibili.com/video/BV147411A7Yq?p=3)      |

## 题型一：排列、组合、子集相关问题

通过这些问题理解回溯算法的思想，回溯算法的知识点讲解在「力扣」第 46 题的视频题解和文字题解。

回溯就是用深度优先遍历的方式去搜索 树（图）的所有解。深度优先遍历有很明显的递归结构。

::: danger 提示

这部分练习可以帮助我们熟悉「回溯算法」的一些概念和通用的解题思路。解题的步骤是：先画图，再编码。去思考可以剪枝的条件， **为什么有的时候用 `used` 数组，有的时候设置搜索起点 `begin` 变量**，理解状态变量设计的想法。

:::

做对下面这些问题的技巧：

+ **画图**；
+ 理解深度优先遍历与递归；
+ 多调试。

| 题号 | 题目序号                                                     | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 46   | [全排列](https://leetcode-cn.com/problems/permutations/)（中等） | [视频题解](https://leetcode-cn.com/problems/permutations/solution/quan-pai-lie-by-leetcode-solution-2/)、[文字题解](https://leetcode-cn.com/problems/permutations/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liweiw/) |
| 47   | [全排列 II](https://leetcode-cn.com/problems/permutations-ii/)（中等） | [视频题解](https://www.bilibili.com/video/BV147411A7Yq?p=1)、[文字题解](https://leetcode-cn.com/problems/permutations-ii/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liwe-2/) |
| 78   | [子集](https://leetcode-cn.com/problems/subsets/)（中等）    | [视频题解](https://www.bilibili.com/video/BV147411A7Yq?p=2)、[文字题解](https://leetcode-cn.com/problems/subsets/solution/hui-su-python-dai-ma-by-liweiwei1419/) |
| 90   | [子集 II](https://leetcode-cn.com/problems/subsets-ii/)（中等） | [视频题解](https://www.bilibili.com/video/BV147411A7Yq?p=3)  |
| 77   | [组合](https://leetcode-cn.com/problems/combinations/)（中等） | [文字题解](https://leetcode-cn.com/problems/combinations/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-ma-/) |
| 39   | [组合总和](https://leetcode-cn.com/problems/combination-sum/)（中等） | [文字题解](https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-2/) |
| 40   | [组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)（中等） | [文字题解](https://leetcode-cn.com/problems/combination-sum-ii/solution/) |
| 113  | [路径总和 II](https://leetcode-cn.com/problems/path-sum-ii/)（中等） | [文字题解](https://leetcode-cn.com/problems/path-sum-ii/solution/hui-su-suan-fa-shen-du-you-xian-bian-li-zhuang-tai/) |
| 60   | [第 k 个排列](https://leetcode-cn.com/problems/permutation-sequence/)（中等） | [文字题解](https://leetcode-cn.com/problems/permutation-sequence/solution/hui-su-jian-zhi-python-dai-ma-java-dai-ma-by-liwei/) |
| 257  | [二叉树的所有路径](https://leetcode-cn.com/problems/binary-tree-paths/)（中等） | [文字题解](https://leetcode-cn.com/problems/binary-tree-paths/solution/shen-du-you-xian-bian-li-python-dai-ma-by-liweiwei/) |
| 491  | [递增子序列](https://leetcode-cn.com/problems/increasing-subsequences/)（中等） |                                                              |
| 1593 | [拆分字符串使唯一子字符串的数目最大](https://leetcode-cn.com/problems/split-a-string-into-the-max-number-of-unique-substrings/)（中等） |                                                              |
| 1071 | [活字印刷](https://leetcode-cn.com/problems/letter-tile-possibilities/)（中等） | [设计递归函数返回值](https://leetcode-cn.com/problems/letter-tile-possibilities/solution/hui-su-suan-fa-python-dai-ma-by-liweiwei1419/) |

+ 第 47 题提示：思考为什么造成了重复，如何在搜索之前就判断这一支会产生重复；
+ 第 60 题提示：利用了剪枝的思想，减去了大量枝叶，直接来到需要的叶子结点；
+ 第 90 题提示：剪枝技巧同 47 题、39 题、40 题。

## 题型二：字符串上的回溯问题

重点理解：由于字符串每次都生成新字符，无须状态重置。

::: danger 提示

字符串的问题的特殊之处在于，字符串的拼接生成新对象，因此在这一类问题上没有显示「回溯」的过程，但是如果使用 `StringBuilder` 拼接字符串就另当别论。
在这里把它们单独作为一个题型，是希望朋友们能够注意到这个非常细节的地方。

:::

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 17   | [电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)（中等） | [文字题解](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/solution/hui-su-sou-suo-wu-xian-shi-hui-su-yan-du-you-xian-/) |
| 22   | [括号生成](https://leetcode-cn.com/problems/generate-parentheses/)（中等） | [文字题解](https://leetcode-cn.com/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/) |
| 93   | [复原IP地址](https://leetcode-cn.com/problems/restore-ip-addresses/)（中等） | [文字题解](https://leetcode-cn.com/problems/restore-ip-addresses/solution/hui-su-suan-fa-hua-tu-fen-xi-jian-zhi-tiao-jian-by/) |
| 784  | [字母大小写全排列](https://leetcode-cn.com/problems/letter-case-permutation/)（中等） | [文字题解](https://leetcode-cn.com/problems/letter-case-permutation/solution/shen-du-you-xian-bian-li-hui-su-suan-fa-python-dai/) |

第 22 题提示：这道题广度优先遍历也很好写，可以通过这个问题理解一下为什么回溯算法都是深度优先遍历，并且都用递归来写。

## 题型三：Flood Fill

Flood 是「洪水」的意思，Flood Fill 直译是「泛洪填充」的意思，体现了洪水能够从一点开始，迅速填满当前位置附近的地势低的区域。类似的应用还有：PS 软件中的「点一下把这一片区域的颜色都替换掉」，扫雷游戏「点一下打开一大片没有雷的区域」。

下面这几个问题，思想不难，但是初学的时候代码很不容易写对，并且也很难调试。我们的建议是多写几遍，忘记了就再写一次，参考规范的编写实现（设置 `visited` 数组，设置方向数组，抽取私有方法），把代码写对。

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 79   | [单词搜索](https://leetcode-cn.com/problems/word-search/)（中等） | [文字题解](https://leetcode-cn.com/problems/word-search/solution/zai-er-wei-ping-mian-shang-shi-yong-hui-su-fa-pyth/) |
| 200  | [被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)（中等） |                                                              |
| 130  | [被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)（中等） |                                                              |
| 733  | [733. 图像渲染（Flood Fill，中等）](https://leetcode-cn.com/problems/flood-fill/) |                                                              |

**说明**：以上问题都不建议修改输入数据，设置 `visited` 数组是标准的做法。可能会遇到参数很多，是不是都可以写成成员变量的问题，面试中拿不准的记得问一下面试官

## **题型四**：一些游戏问题

回溯算法是早期简单的人工智能，有些教程把回溯叫做暴力搜索，但回溯没有那么暴力，回溯是有方向地搜索。「力扣」上有一些简单的游戏类问题，解决它们有一定的难度，大家可以尝试一下。

| 序号 | 题目序号                                                     | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 51   | [N皇后](https://leetcode-cn.com/problems/n-queens/)（困难）  | [文字题解](https://leetcode-cn.com/problems/n-queens/solution/gen-ju-di-46-ti-quan-pai-lie-de-hui-su-suan-fa-si-/) |
| 37   | [解数独](https://leetcode-cn.com/problems/sudoku-solver/)（困难） |                                                              |
| 529  | [扫雷游戏](https://leetcode-cn.com/problems/minesweeper/)（中等） | [文字题解](https://blog.csdn.net/lw_power/article/details/109314152) |
| 488  | [488. 祖玛游戏（困难）](https://leetcode-cn.com/problems/zuma-game/) |                                                              |

**说明**：

+ 第 51 题：经典问题，掌握「空间换时间」技巧；
+ 第 529 题：寻找连通分量。DFS 和 BFS 均可；
+ 第 488 题：很难，可以不做。

请大家做了一些回溯算法的问题以后顺便思考一下：深度优先遍历、递归、栈，它们三者的关系，我个人以为它们背后统一的逻辑都是「后进先出」。完成练习有助于我们深刻理解算法思想，我们加油！

