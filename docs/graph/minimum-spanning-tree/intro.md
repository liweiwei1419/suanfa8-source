---
title: 7.7 最小生成树简介与参考资料
icon: yongyan
category: 图论
tags:
  - 最小生成树
---

最小生成树算法（Minimum Spanning Tree，MST）。

## 最小生成树算法的应用场景与前提

- 连通图：在完全连通的情况下，拥有最小生成树；
- 无向图：最小生成树算法解决的是这样一类问题，从任意一个顶点能到达这个图的其它顶点，且耗费最少，故单向图不适用于这个场景；
- 带权图：如果无权，可以认为权值是 $1$，带权的情况应用范围更广。

在不连通的情况下，每个极大连通子图拥有最小生成树，则形成最小生成森林。为了简化问题，我们这里只谈完全连通情况下的最小生成树。

## 本章参考资料

- 《算法（第 4 版）》第 4.3 节 最小生成树（中文版在第 390 页）；
- 我以前学习的时候写在掘金的笔记：[最小生成树算法（Prim、Kruskal）](https://juejin.im/post/6858481283715039240)；
