---
title: 7.4 通过一个例子理解 Dijkstra 算法的执行步骤
icon: yongyan
category: 图论
tags:
  - Dijkstra
---

## 通过一个例子理解 Dijkstra 算法的执行步骤

最开始的样子，0 到自己路径最短，最短路径为 0，到其它顶点暂时认为是负无穷。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96qs14gj319o0lsq4r.jpg)

从 0 出发的所有边中，到 2 的距离最短，因此我们就可以说 0 -> 2 这条边的长度，是从 0 开始到 2 的最短路径。
同时更新从 0 出发到它的相邻顶点的距离。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96s83fyj31fw0k6jtm.jpg)

接下来考察，从 2 出发到其相邻顶点的距离有没有可能更短。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96tjyh8j319a0hu75r.jpg)

这个时候还没确定的顶点中，最短距离的顶点是 1 （距离是 3），因此源点 0 到顶点 1 的最短距离就是 3。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96wrorrj317y0hq3zw.jpg)

现在我们更新出 3 出发的顶点，只有 3 -> 4 这条边（长度为 2）。现在到 3 的距离是 5，$5 + 2 > 4$，因此不更新 4 的距离。松弛操作没有找到更优的解。

现在没有确定的顶点中，距离最短的是 4 ，从 4 出发没有相邻的顶点。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa96zl5mwj31700hemyf.jpg)

剩下的一个顶点就是 3 ，因此最后我们确定了 3 的距离。

![](https://tva1.sinaimg.cn/large/008i3skNgy1gxa97402odj316u0hm0u1.jpg)

现在我们再来看一下 Dijkstra 最初的想法，就很容易理解了。松弛操作没有选择的边，就是这个图例弯曲的边，它们一定不会是组成单源最短路径的边。

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5579e54bce14d2697685ec34d686e25~tplv-k3u1fbpfcp-zoom-1.image" style="zoom:50%;" />

##
