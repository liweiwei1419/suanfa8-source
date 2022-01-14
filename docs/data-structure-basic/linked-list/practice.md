---
title: 4.2 链表的练习
icon: yongyan
category: 链表
tags:
  - 链表
---

## 题型一：基本的链表指针指向问题

注意：有一些问题需要使用「虚拟头结点」，以避免对链表第一个结点的复杂的分类讨论逻辑。这个思想在数组里我们见过，叫「哨兵」。

使用递归函数，避免复杂的更改指针变量指向操作，使得求解问题变得简单。

| 题号 | 链接                                                                                                   | 题解                                                                                                                |
| ---- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| 2    | [两数相加](https://leetcode-cn.com/problems/add-two-numbers)                                           |                                                                                                                     |
| 82   | [删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/) |                                                                                                                     |
| 206  | [反转链表](https://leetcode-cn.com/problems/reverse-linked-list)                                       |                                                                                                                     |
| 24   | [两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs)                           |                                                                                                                     |
| 25   | [K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group)                          |                                                                                                                     |
| 328  | [奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list)                                      |                                                                                                                     |
| 203  | [移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)                          |                                                                                                                     |
| 21   | [合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)（简单）                   |                                                                                                                     |
| 876  | [链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)（简单）                  | [文字题解](https://leetcode-cn.com/problems/middle-of-the-linked-list/solution/)                                    |
| 148  | [排序链表](https://leetcode-cn.com/problems/sort-list/)                                                | [文字题解](https://leetcode-cn.com/problems/sort-list/solution/zi-di-xiang-shang-de-gui-bing-pai-xu-java-dai-ma-b/) |

说明：

- 这些问题使用递归和迭代都可以完成：206、24、25、328、203、21；
- 第 148 题需要知道如何使用递归函数实现链表排序，迭代的写法仅供参考。

## 题型二：快慢指针技巧

确切地说，叫「同步指针」可能更好一些。

使用两个指针变量，刚开始都位于链表的第一个结点，一个永远一次只走一步，另一个永远一次只走两步，一个在前，一个在后，**同时走**。这样当快指针走完的时候，慢指针就来到了链表的中间位置。

解决这些问题的共同特点就是使用两个指针变量同步移动。快慢指针的前进方向相同，且它们步伐的「差」是恒定的，根据这种确定性去解决链表中的一些问题。使用这种思想还可以解决链表的以下问题：

| 题号 | 链接                                                                                  | 题解 |
| ---- | ------------------------------------------------------------------------------------- | ---- |
| 19   | [倒数第 k 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/) |      |
| 141  | [环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)                       |      |
| 142  | [环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)                 |      |
| 160  | [相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)        |      |

**说明**：

- 第 19 题：，快指针先走几步，不是靠猜的，要在纸上画图模拟一下，就清楚了；
- 第 141 题：，在环中的时候可以想象，A 同学开始有存款 100 元，每天赚 1 元，B 同学开始有存款 50 元，每天赚 2 元，B 同学一定会在某一天和 A 同学的存款一样；
- 第 161 题：起点不同，构造相同长度让它们相遇，同样是利用了同步走这个等量关系。

## 题型三：设计数据结构

| 题号 | 链接                                                                    | 题解                                                                                                                                                                 |
| ---- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 707  | [设计链表](https://leetcode-cn.com/problems/design-linked-list)（中等） |                                                                                                                                                                      |
| 355  | [设计推特](https://leetcode-cn.com/problems/design-twitter)（中等）     | [哈希表 + 链表 + 优先队列（经典多路归并问题）（Java）](https://leetcode-cn.com/problems/design-twitter/solution/ha-xi-biao-lian-biao-you-xian-dui-lie-java-by-liwe/) |
| 146  | [LRU 缓存机制](https://leetcode-cn.com/problems/lru-cache)（中等）      | [哈希表 + 双向链表（Java）](https://leetcode-cn.com/problems/lru-cache/solution/ha-xi-biao-shuang-xiang-lian-biao-java-by-liweiw-2/)                                 |
| 460  | [LFU 缓存](https://leetcode-cn.com/problems/lfu-cache)（困难）          | [哈希表 + 双向链表（Java）](https://leetcode-cn.com/problems/lfu-cache/solution/ha-xi-biao-shuang-xiang-lian-biao-java-by-liweiwei/)                                 |
| 1206 | [设计跳表](https://leetcode-cn.com/problems/design-skiplist)（困难）    |                                                                                                                                                                      |
