---
title: 4.1 简介
icon: yongyan
category: 排序算法
tags:
  - 分而治之
  - 归并排序
---

# 简介

### 第 4 章 高级排序算法（重要）

这一部分需要重点掌握三种高级排序算法：归并排序、快速排序、堆排序。

| 题号     | 链接                                                         | 题解                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 88       | [合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)（简单） | [从后向前归并](https://leetcode-cn.com/problems/merge-sorted-array/solution/si-xiang-mei-you-chuang-xin-de-di-fang-zhu-yao-ti-/) |
| 《剑》51 | [数组中的逆序对](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)（困难） | [【视频讲解】](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/shu-zu-zhong-de-ni-xu-dui-by-leetcode-solution/)、[文字题解](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/bao-li-jie-fa-fen-zhi-si-xiang-shu-zhuang-shu-zu-b/) |
| 75       | [颜色分类](https://leetcode-cn.com/problems/sort-colors/)（中等） | [文字题解](https://leetcode-cn.com/problems/sort-colors/solution/kuai-su-pai-xu-partition-guo-cheng-she-ji-xun-huan/) |
| 215      | [数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)（中等） | [文字题解](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/partitionfen-er-zhi-zhi-you-xian-dui-lie-java-dai-/) |
| 451      | [根据字符出现频率排序](https://leetcode-cn.com/problems/sort-characters-by-frequency)（中等） |                                                              |

**说明**：

+ 第 88 题：归并排序，注意这里从后向前归并；
+ 《剑指 Offer》第 51 题：归并排序、树状数组（选学）；
+ 第 75 题：著名的「荷兰国旗」问题、快排；
+ 第 215 题：快排、优先队列；
+ 第 451 题：快排、优先队列。



### 第 22 章 分治算法

> 分治思想（分而治之）把一个规模较大的问题拆分成为若干个规模较小的相同类型的子问题，然后对这些子问题递归求解，等待每一个子问题完成以后，再得到原问题的解。
>
> 分治算法可以并行执行，但是在基础算法领域，分治算法是以 **深度优先遍历** 的方式执行的。

应用分治思想的典型算法：归并排序、快速排序。

分治思想的典型问题：「剑指 Offer 第 51 题」：[《剑指 Offer》 51. 数组中的逆序对（视频讲解）](https://www.bilibili.com/video/BV1Qk4y1r7u5)。

| 题号 | 链接                                                  | 题解                                                         |
| ---- | ----------------------------------------------------- | ------------------------------------------------------------ |
| 50   | [Pow(x, n)](https://leetcode-cn.com/problems/powx-n/) | [文字题解](https://leetcode-cn.com/problems/powx-n/solution/ba-zhi-shu-bu-fen-kan-zuo-er-jin-zhi-shu-python-da/) |

其它典型问题（待添加）

| 题目                                                         | 题解                                                         | 知识点                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------ |
| [66. 加一（简单）](https://leetcode-cn.com/problems/plus-one/) |                                                              |                          |
| [189. 旋转数组](https://leetcode-cn.com/problems/rotate-array/) |                                                              | 记住这个旋转三次的操作。 |
| [8. 字符串转换整数 (atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/) | [尽量不使用库函数、一次遍历（Java）](https://leetcode-cn.com/problems/string-to-integer-atoi/solution/jin-liang-bu-shi-yong-ku-han-shu-nai-xin-diao-shi-/) |                          |
