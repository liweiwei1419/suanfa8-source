---
title: 7.2 Dijkstra 算法要解决的问题与几何直观
icon: yongyan
category: 图论
tags:
  - Dijkstra
---

## Dijkstra 算法要解决的问题

- 带权图的最短路径问题；
- 有向和无向均适用；
- 前提：没有负权边。

解决没有负权边的单源最短路径问题：即从一个顶点出发到其它顶点的最短路径。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa95yub99j31ma0pcaca.jpg)

说明：这个例子来自于 liuyubobobo 老师在慕课网上开设的课程 [算法与数据结构-综合提升 C++版](https://coding.imooc.com/class/71.html) ，选择这个例子是因为它足够简单，能够把 Dijkstra 算法的思想说清楚。

## 几何直观

- 理解源点，我们这里讲解的例子都认为 `0` 是源点；
- 把源点从水平平面上拉起来，形成下面的图形。

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxa96485fuj30n40vgjsb.jpg" style="zoom: 50%;" />

说明：这些弯曲的边，都是被「松弛操作」淘汰的边。
