# 基础排序算法

::: danger 提示
我学习算法是从排序算法开始的，通过一遍又一遍地编写、调试，理解排序算法的思想和细节。

通过「归并排序」和「快速排序」的学习，深入理解递归。
:::



和排序相关的问题

「归并排序」和「快速排序」是非常重要的排序算法，**深刻理解它们对于理解「递归」函数的运行机制有着非常大的帮助**，同时它们也是「分治思想」的典型应用。「逆序对」和「荷兰国旗问题（颜色分类）」也是非常经典的算法问题。

| 题目链接                                                     | 力扣                                                         | B 站                                                    |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------- |
| [《剑指 Offer》 51. 数组中的逆序对（困难）](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/) | [力扣](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/shu-zu-zhong-de-ni-xu-dui-by-leetcode-solution/) | [B 站](https://www.bilibili.com/video/BV1Qk4y1r7u5)     |
| [315. 计算右侧小于当前元素的个数（困难）](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/) | [力扣](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/solution/gui-bing-pai-xu-suo-yin-shu-zu-python-dai-ma-java-/) | [B 站](https://www.bilibili.com/video/BV1Hz411v7XC?p=1) |

计算「逆序对」完全就是按照「归并排序」的思路而来。

| 题目链接                                                     | 力扣                                                         | B 站                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| [75. 颜色分类（中等）](https://leetcode-cn.com/problems/sort-colors/) | [力扣](https://leetcode-cn.com/problems/sort-colors/solution/yan-se-fen-lei-by-leetcode-solution/) | [B 站](https://www.bilibili.com/video/BV1tz4y1o7n5) |

在「颜色分类」问题的讲解中，我们向大家介绍了「循环不变量」，在编写代码的过程中，我们应该一直遵守所使用的变量的语义，在「程序执行前」「执行过程中」「执行结束」以后保持不变。遵守我们自己定义「循环不变量」是我们写对正确代码的重要方法。

| 题目链接                                                     | 力扣                                                         | B 站                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| [41. 缺失的第一个正数（困难）](https://leetcode-cn.com/problems/first-missing-positive/) | [力扣](https://leetcode-cn.com/problems/first-missing-positive/solution/tong-pai-xu-python-dai-ma-by-liweiwei1419/) | [B 站](https://www.bilibili.com/video/BV167411N7vd) |

「缺失的第一个正数」是一个经典的算法问题，用到的思想是「原地哈希」，可以理解为是「桶排序」算法的特殊应用：一个萝卜一个坑，一个桶里只存放一个元素。要和大家强调的是，可以这样做是和输入数组的元素的数值密切相关。

### 