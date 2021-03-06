---
title: 「力扣」第 1206 题：设计跳表（困难）
icon: yongyan
category: 链表
tags:
  - 链表
---

- 题目链接：[1206. 设计跳表](https://leetcode-cn.com/problems/design-skiplist/)。

## 题目描述

不使用任何库函数，设计一个跳表。

跳表是在 O(log(n)) 时间内完成增加、删除、搜索操作的数据结构。跳表相比于树堆与红黑树，其功能与性能相当，并且跳表的代码长度相较下更短，其设计思想与链表相似。

例如，一个跳表包含 [30, 40, 50, 60, 70, 90]，然后增加 80、45 到跳表中，以下图的方式操作：

![img](https://assets.leetcode.com/uploads/2019/09/27/1506_skiplist.gif)

Artyom Kalinin [CC BY-SA 3.0], via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Skip_list_add_element-en.gif)

跳表中有很多层，每一层是一个短的链表。在第一层的作用下，增加、删除和搜索操作的时间复杂度不超过 O(n)。跳表的每一个操作的平均时间复杂度是 O(log(n))，空间复杂度是 O(n)。

在本题中，你的设计应该要包含这些函数：

- `bool search(int target)` : 返回 target 是否存在于跳表中。
- `void add(int num)`: 插入一个元素到跳表。
- `bool erase(int num)`: 在跳表中删除一个值，如果 `num` 不存在，直接返回 false. 如果存在多个 `num` ，删除其中任意一个即可。

了解更多 : https://en.wikipedia.org/wiki/Skip_list

注意，跳表中可能存在多个相同的值，你的代码需要处理这种情况。

**样例:**

```
Skiplist skiplist = new Skiplist();

skiplist.add(1);
skiplist.add(2);
skiplist.add(3);
skiplist.search(0);   // 返回 false
skiplist.add(4);
skiplist.search(1);   // 返回 true
skiplist.erase(0);    // 返回 false，0 不在跳表中
skiplist.erase(1);    // 返回 true
skiplist.search(1);   // 返回 false，1 已被擦除
```

**约束条件:**

- `0 <= num, target <= 20000`
- 最多调用 `50000` 次 `search`, `add`, 以及 `erase`操作。

---

这是我见过的讲解最好的跳表 [视频](https://www.bilibili.com/video/BV1tK4y1X7de/?spm_id_from=333.788.recommend_more_video.-1)，大家可以观看完，理解了跳表的设计思想以后，到「力扣」的评论区，参考适合自己的代码完成这道问题。
