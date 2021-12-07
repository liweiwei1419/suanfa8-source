---
title: 12.2 队列的问题
icon: yongyan
category: 队列
tags:
  - 队列
---

## 题型一：基本的使用队列解决的问题

所有的使用广度优先遍历解决的问题，都使用了队列。

| 题号 | 题目序号                                                     | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 622  | [设计循环队列](https://leetcode-cn.com/problems/design-circular-queue)（中等） | [数组实现的循环队列](https://leetcode-cn.com/problems/design-circular-queue/solution/shu-zu-shi-xian-de-xun-huan-dui-lie-by-liweiwei141/) |
| 641  | [设计循环双端队列](https://leetcode-cn.com/problems/design-circular-deque)（中等） | [数组实现的循环双端队列](https://leetcode-cn.com/problems/design-circular-deque/solution/shu-zu-shi-xian-de-xun-huan-shuang-duan-dui-lie-by/) |
| 621  | [任务调度器](https://leetcode-cn.com/problems/task-scheduler)（中等） |                                                              |
| 1306 | [跳跃游戏 III（中等）](https://leetcode-cn.com/problems/jump-game-iii)（中等） |                                                              |

## 题型二：单调队列

单调队列就是普通的队列。「力扣」上的单调队列目前就发现这一个问题，关键分析清楚为什么设计的算法恰好使得单调队列。另外，「背包问题」中有使用单调队列进行优化的例子，感兴趣的朋友可以了解一下，是竞赛方面的知识。

经验：单调队列中一般存下标。

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 239  | [滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum)（中等） | [文字题解](https://leetcode-cn.com/problems/sliding-window-maximum/solution/zui-da-suo-yin-dui-shuang-duan-dui-lie-cun-suo-yin/) |