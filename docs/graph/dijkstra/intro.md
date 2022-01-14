---
title: 7.1 单源最短路径简介与参考资料
icon: yongyan
category: 图论
tags:
  - Dijkstra
---

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa95zwh7pj30w60eajs1.jpg)

E. W. Dijkstra（1930/05/11-2002/08/06），杰出的计算机科学家，1972 年图灵奖得主。

## 参考资料

- 《算法（第 4 版）》：这本书上的给出的是「索引堆」（时间复杂度：$O(E \log V)$）的解法，由于「索引堆」理解起来有一定难度，因此我们使用「优先队列」（可以认为就是「堆」）作为代码实现，并且直接给出了「堆优化」的版本（时间复杂度：$O(E\log E)$）；
- 《算法导论》第 24.3 节：Dijkstra 算法
- 我学习的时候写在掘金的笔记：[Dijkstra 算法（解决没有负权边的单源最短路径问题）](https://juejin.im/post/6857030974631313422)，[公众号地址](https://mp.weixin.qq.com/s/Gzm00enOVtyMZe_Qc-UIaw)。
