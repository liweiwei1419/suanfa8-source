---
title: 7.3 松弛操作
icon: yongyan
category: 图论
tags:
  - Dijkstra
---

::: info 提示
请注意松弛操作成立的前提是「没有负权边」。
:::

- 0 -> 2 这条路径，就是从顶点 0 到顶点 2 的最短路径。**由于没有负权边，因此不会有一条边，我们绕道走回到顶点 2，路径之和更小**。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96kq086j31dy0bkq3q.jpg)

事实上，从 0 到 1 ，我们经过 2 再来到 1 ，路径之和 $2 + 1 < 5$，这就是松弛操作的意义。就像我们坐飞机，有的时候经停，费用可能更低。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96nvc68j31n20dwdho.jpg)

再次理解松弛操作：$5$ 比 $2$ 大，$5$ 加上一个**非负整数**不可能比 $2$ 还小。
