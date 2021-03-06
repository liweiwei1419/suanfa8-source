---
title: 1.5 递归
icon: shipin
---

与递归相关的话题有：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxdgspjq3hj30xg0isgn4.jpg" alt="image-20211214165706179" style="zoom:50%;" />

::: danger 温馨提示
我们需要在大量的练习中渐渐地理解递归，学习是一个循序渐进的过程，在编写了大量的「动态规划（记忆化递归）」「回溯算法」「深度优先遍历」「分治算法」的问题以后，相信我们一定会对递归有更深的理解。
:::

## 算法基础：递归

- 初学的时候可以先有个印象，不用急于马上掌握，理解并熟练掌握「递归」需要一定时间；
- 「递归」与「分治算法」（请见「归并排序」）「深度优先遍历」「回溯算法」密不可分，可以在学习这些章节的过程中慢慢理解「递归」。

::: danger 重点概括

- 「递归」体现的是一种「自上而下」（自顶向下）解决问题的编程思想，是编程中特有的一种语法现象；
- 使用「递归」解决问题，有「拆分问题」与「组合问题的解」两个部分。
  :::

::: info 「递归」与「遍历」
如果一个问题需要「遍历」，很多时候也可以使用「递归」实现。特别地，在树形问题中执行「深度优先遍历」，在代码层面上，我们看到的就是「递归（自己调用自己）」。
:::

## :tv: **视频教程**

建议使用 1.5 倍速观看。

- [1-1 初识递归](https://www.bilibili.com/video/BV11h411h7nT?p=1)；

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=206484628&bvid=BV11h411h7nT&cid=362102911&page=1" frameborder="no" scrolling="no"></iframe>
</div>

- [1-2 栈与深度优先遍历](https://www.bilibili.com/video/BV11h411h7nT?p=2)；

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=206484628&bvid=BV11h411h7nT&cid=362102911&page=2" frameborder="no" scrolling="no"></iframe>
</div>

- [1-3 分治算法](https://www.bilibili.com/video/BV11h411h7nT?p=3)。

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=206484628&bvid=BV11h411h7nT&cid=362102911&page=3" frameborder="no" scrolling="no"></iframe>
</div>

## :notebook_with_decorative_cover: 文字教程

- [LeetBook 之「递归」专题：第 1 节 递归与分治](https://leetcode-cn.com/leetbook/read/recursion-and-divide-and-conquer/r24abc/)
- [LeetBook 之「递归」专题：第 2 节 递归函数的设计思想：分而治之（减而治之）](https://leetcode-cn.com/leetbook/read/recursion-and-divide-and-conquer/r21rci/)

::: danger 注意
学习「递归」需要在应用中学习，一开始模仿是很正常的。「递归」贯穿了整个算法与数据结构学习的始终，因此可以在算法与数据结构的学习过程中慢慢学习「递归」，没有必要一开始就要求自己深刻理解「递归」。
:::

视频教程和文字教程中已经介绍得很详细了，因此本节不再过多讲述。

::: danger 温馨提示
一边做题，一边总结，「深度优先遍历」「回溯算法」「动态规划」都学完以后，题目做多了以后，「递归」就自然而然学会了。即：先模仿，再学习。
:::

## 总结

- 「递归」是一种先「自上而下」，再「自下而上」的求解问题的过程；
- 「递归」体现的算法思想是「分而治之」；
- 「递归」（「分治算法」）的两个过程：「拆分问题」与「组合子问题」的解；
- 「递归」的执行流程：深度优先遍历。
