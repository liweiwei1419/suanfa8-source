---
title: 第 1 节 回溯算法简介
icon: yongyan
author: liweiwei1419
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
---

# 第 1 节 回溯算法简介

「回溯算法」其实就是对题目中所隐含的「树形结构」执行一次 **深度优先遍历**。做这一类问题，在草稿纸上画出树形结构图很重要。

| 题目链接                                                     | 力扣                                                         | B 站                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [46. 全排列（中等）](https://leetcode-cn.com/problems/permutations/) | [力扣](https://leetcode-cn.com/problems/permutations/solution/quan-pai-lie-by-leetcode-solution-2/) | [B 站](https://www.bilibili.com/video/BV1oa4y1v7Kz?from=search&seid=14615048896751357901) |
| [47. 全排列 II（中等）](https://leetcode-cn.com/problems/permutations-ii/) | [力扣]()                                                     | [B 站](https://www.bilibili.com/video/BV147411A7Yq?p=1)      |
| [78. 子集（中等）](https://leetcode-cn.com/problems/subsets/) | [力扣](https://leetcode-cn.com/problems/subsets/solution/hui-su-python-dai-ma-by-liweiwei1419/) | [B 站](https://www.bilibili.com/video/BV147411A7Yq?p=2)      |
| [90. 子集 II（中等）](https://leetcode-cn.com/problems/subsets-ii/) | （空缺）                                                     | [B 站](https://www.bilibili.com/video/BV147411A7Yq?p=3)      |

#### 题型一：基本回溯问题

通过这些问题理解回溯算法的思想，回溯算法的知识点讲解在「力扣」第 46 题的视频题解和文字题解。

回溯就是用深度优先遍历的方式去搜索 树（图）的所有解。深度优先遍历有很明显的递归结构。

做对下面这些问题的技巧：① **画图、画图、画图**；② 理解深度优先遍历与递归；③ 多调试、多调试。

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

#### 题型二：字符串上的回溯问题

重点理解：由于字符串每次都生成新字符，无须状态重置。

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 17   | [电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)（中等） | [文字题解](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/solution/hui-su-sou-suo-wu-xian-shi-hui-su-yan-du-you-xian-/) |
| 22   | [括号生成](https://leetcode-cn.com/problems/generate-parentheses/)（中等） | [文字题解](https://leetcode-cn.com/problems/generate-parentheses/solution/hui-su-suan-fa-by-liweiwei1419/) |
| 93   | [复原IP地址](https://leetcode-cn.com/problems/restore-ip-addresses/)（中等） | [文字题解](https://leetcode-cn.com/problems/restore-ip-addresses/solution/hui-su-suan-fa-hua-tu-fen-xi-jian-zhi-tiao-jian-by/) |
| 784  | [字母大小写全排列](https://leetcode-cn.com/problems/letter-case-permutation/)（中等） | [文字题解](https://leetcode-cn.com/problems/letter-case-permutation/solution/shen-du-you-xian-bian-li-hui-su-suan-fa-python-dai/) |

#### 题型三：Flood Fill

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 79   | [单词搜索](https://leetcode-cn.com/problems/word-search/)（中等） | [文字题解](https://leetcode-cn.com/problems/word-search/solution/zai-er-wei-ping-mian-shang-shi-yong-hui-su-fa-pyth/) |
| 200  | [被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)（中等） |                                                              |
| 130  | [被围绕的区域](https://leetcode-cn.com/problems/surrounded-regions/)（中等） |                                                              |

#### **题型四**：一些游戏问题

| 序号 | 题目序号                                                     | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 51   | [N皇后](https://leetcode-cn.com/problems/n-queens/)（困难）  | [文字题解](https://leetcode-cn.com/problems/n-queens/solution/gen-ju-di-46-ti-quan-pai-lie-de-hui-su-suan-fa-si-/) |
| 37   | [解数独](https://leetcode-cn.com/problems/sudoku-solver/)（困难） |                                                              |
| 529  | [扫雷游戏](https://leetcode-cn.com/problems/minesweeper/)（中等） | [文字题解](https://blog.csdn.net/lw_power/article/details/109314152) |

说明：

+ 第 51 题：经典问题，掌握「空间换时间」技巧；
+ 第 529 题：寻找连通分量。DFS 和 BFS 均可。

