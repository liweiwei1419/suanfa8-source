---
title: 21.1 并查集基础问题
icon: yongyan
category: 并查集
tags:
  - 并查集
---

**说明**：并查集属于高级数据结构，本身很有意思，但是并不是绝大多数公司面试和笔试的考点，如果时间有限，且对算法与数据结构不感兴趣，完全可以跳过。但不排除少数面试官和公司会考这个数据结构。


并查集知识点的【视频讲解】在第 990 题和第 399 题的视频题解里。

基础且常见的问题有：

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 990  | [等式方程的可满足性](https://leetcode-cn.com/problems/satisfiability-of-equality-equations)（中等） | [视频题解](https://leetcode-cn.com/problems/satisfiability-of-equality-equations/solution/deng-shi-fang-cheng-de-ke-man-zu-xing-by-leetcode-/)、[文字题解](https://leetcode-cn.com/problems/satisfiability-of-equality-equations/solution/shi-yong-bing-cha-ji-chu-li-bu-xiang-jiao-ji-he-we/) |
| 547  | [朋友圈（中等）](https://leetcode-cn.com/problems/friend-circles)（中等） | [文字题解](https://leetcode-cn.com/problems/friend-circles/solution/bing-cha-ji-python-dai-ma-java-dai-ma-by-liweiwei1/) |
| 200  | [岛屿数量（中等）](https://leetcode-cn.com/problems/number-of-islands)（中等） | [文字题解](https://leetcode-cn.com/problems/number-of-islands/solution/dfs-bfs-bing-cha-ji-python-dai-ma-java-dai-ma-by-l/) |
| 684  | [冗余连接](https://leetcode-cn.com/problems/redundant-connection/)（中等） |                                                              |
| 1319 | [连通网络的操作次数](https://leetcode-cn.com/problems/number-of-operations-to-make-network-connected)（中等） | [文字题解](https://leetcode-cn.com/problems/number-of-operations-to-make-network-connected/solution/bing-cha-ji-by-liweiwei1419/) |
| 128  | [最长连续序列（困难）](https://leetcode-cn.com/problems/longest-consecutive-sequence)（中等） |                                                              |


## 参考资料


**基础部分**：

+ 《算法》（第 4 版）第 1 章第 5 节：案例研究：union-find 算法（有关于复杂度的证明）
+ 《算法导论》第 21 章：用于不相交集合的数据结构（有关于复杂度的证明）
+ AlgoWiki 关于[「并查集」](https://ojeveryday.github.io/AlgoWiki/#/)的章节

**进阶部分**：

+ 《算法竞赛进阶指南》（李煜东著）
+ 知乎问答：为什么并查集在路径压缩之后的时间复杂度是阿克曼函数?（有论文）
+ OI Wiki 关于[「并查集」](https://oi-wiki.org/ds/dsu/)的章节（有关于复杂度的证明）