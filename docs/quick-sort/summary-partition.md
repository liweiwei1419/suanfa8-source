---
title: 第 7 节 三种划分方式总结
icon: shipin
category: 排序算法
tags:
  - 排序算法
  - 分而治之
  - 快速排序
---

<video src="https://suanfa8.com/files/quick-sort/6-7.mp4" controls="controls" width="800" height="450">
Your browser does not support the video tag.
</video>

以下是针对特殊测试用例（有很多重复元素的输入数组）有 3 种版本的快排：

- 版本 1：基本快排：把等于切分元素的所有元素分到了数组的同一侧，可能会造成递归树倾斜；
- 版本 2：双指针快排：把等于切分元素的所有元素 **等概率** 地分到了数组的两侧，避免了递归树倾斜，递归树相对平衡；
- 版本 3：三指针快排：把等于切分元素的所有元素挤到了数组的中间，在有很多元素和切分元素相等的情况下，递归区间大大减少。

::: danger 经验总结

之所以快排有这些优化，起因都是来自「递归树」的高度。**关于「树」的算法的优化，绝大部分都是在和树的「高度」较劲**。类似的通过减少树高度、使得树更平衡的数据结构还有「二叉搜索树」优化成「AVL 树」或者「红黑树」、「并查集」的「按秩合并」与「路径压缩」。
:::

- 写对「快速排序」的技巧：保持「循环不变量」，即定义的变量在循环开始前、循环过程中、循环结束以后，都保持不变的性质，这个性质是人为根据问题特点定义的。
- 「循环不变量」的内容在《算法导论》这本书里有介绍。我个人觉得非常有用。**「循环不变量」是证明算法有效性的基础，更是写对代码的保证，遵守循环不变量，是不是该写等于号，先交换还是先 `++` ，就会特别清楚，绝对不会写错，我在编码的时候，会将遵守的「循环不变量」作为注释写在代码中**。

快速排序丢失了稳定性，如果需要稳定的快速排序，需要具体定义比较函数，这个过程叫「稳定化」，在这里就不展开了。

使用「快速排序」解决的经典问题（非常重要）：

- TopK 问题：「力扣」第 215 题：[数组中的第 K 个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)；
- 荷兰国旗问题：「力扣」第 75 题：[颜色分类](https://leetcode-cn.com/problems/sort-colors/)。

