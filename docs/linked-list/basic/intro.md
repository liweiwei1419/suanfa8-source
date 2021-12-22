---
title: 链表问题简介
icon: yongyan
category: 链表
tags:
  - 链表
---

解决链表的问题常见的技巧有：

+ 1、使用递归函数，避免复杂的更改指针变量指向操作，使得求解问题变得简单。
    - 「力扣」第 206 题：[反转链表](https://leetcode-cn.com/problems/reverse-linked-list)；
    - 「力扣」第 24 题：[两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs)；
    - 「力扣」第 25 题：[K 个一组翻转链表](https://leetcode-cn.com/problems/reverse-nodes-in-k-group)；
    - 「力扣」第 328 题：[奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list)；
    - 「力扣」第 203 题：[移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)；
    - 「力扣」第 21 题：[合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)。
+ 2、设置「虚拟头结点」，避免对链表第 1 个结点做单独讨论，这个思想在数组里我们见过，叫「哨兵」；
    - 「力扣」第 2 题：[两数相加](https://leetcode-cn.com/problems/add-two-numbers)；
    - 「力扣」第 82 题：[删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/)。
+ 3、使用「快慢指针」，本题就是。确切地说，叫「同步指针」可能更好一些；
+ 4、为链表编写测试函数，进行调试（在下面的参考代码中有），主要是：
    - 从数组得到一个链表；
    - 根据当前结点打印当前结点以及后面的结点。
    这两个方法可以非常方便地帮助我们调试关于链表的程序。

大家还可以在「力扣」的新手场：[「探索」](https://leetcode-cn.com/explore/learn/card/linked-list/) 板块里，学习链表的相关知识和问题。「力扣」上的链表问题，和我们在教科书里学习的链表是有一点点不一样的，「力扣」的链表是以结点类 `ListNode` 为中心进行编程。而一般教科书上则是将 `ListNode` 作为链表的内部类进行编程，差别就是这些。其它处理链表问题的技巧是完全一样的。

**打草稿很重要**：链表问题在「力扣」上是相对较少，**并且题目类型和解题技巧相对固定的问题**，相信通过刷题和总结，我们是可以把链表问题全部掌握的。

并且思考链表问题的第 1 步，和「回溯算法」一样，绝大多数时候在草稿纸上写写画画就能得到解决链表问题的办法，特别是在链表中做一些更改指针变量指向操作的问题。

**注意**：这里要注意一个细节：题目要求：「两个中间结点的时候，返回第二个中间结点」。此时可以在草稿纸上写写画画，就拿自己的左右手的两根指头同步移动，可以得出：快指针可以前进的条件是：**当前快指针和当前快指针的下一个结点都非空**。

在有些问题，例如「力扣」第 148 题：[排序链表](https://leetcode-cn.com/problems/sort-list/)，是需要来到链表的第一个中间结点，然后切断链表，这时代码就得做小的调整。具体是怎么写的，不能靠猜，依然是要在纸上模拟一下这个「快慢指针同步走」的过程，就很清楚了（不过第 148 题的本来意思不是让我们从中间二分递归去做）。
