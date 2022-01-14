---
title: 2.6 插入排序的意义
icon: shipin
category: 排序算法
tags:
  - 排序算法
  - 减治思想
---

## :tv: **视频教程** <Badge text="视频" type="warning"/> <Badge text="重要" type=""/>

建议使用 1.5 倍速观看。

- [2-8 插入排序的重要意义（05:37）](https://www.bilibili.com/video/BV1y44y1q7MJ?p=8)

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=974034772&bvid=BV1y44y1q7MJ&cid=365418477&page=8" frameborder="no" scrolling="no"></iframe>
</div>

插入排序有个特点非常重要：数据接近有序的时候，插入排序可以很快完成。「接近有序」的意思是：每个元素和它排序以后最终所在的位置不远。这一点需要和「选择排序」进行比较。

::: danger 重点
「插入排序」是稳定排序，在数组的值 **接近有序** 的情况下，表现优异。
:::

在数组「几乎有序」的前提下，「插入排序」的时间复杂度可以达到 $O(N)$，因此「插入排序」可以作为高级排序算法的一个子过程（后面在「归并排序」和「快速排序」算法里我们会看到）。

由于「插入排序」在「几乎有序」的数组上表现良好，特别地，在「短数组」上的表现也很好。因为「短数组」的特点是：每个元素离它最终排定的位置都不会太远。

::: danger 重点

在小区间内执行排序任务的时候，可以转向使用「插入排序」。

:::

## 参考资料

- [《算法 4》英文网站](https://algs4.cs.princeton.edu/21elementary/)
