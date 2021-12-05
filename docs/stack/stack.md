使用「栈」解决的问题，需要我们通过具体例子，发现解决它们正好符合「后进先出」的规律：

+ 把暂时还不能确定结果的数据放入栈，把可以确定结果的数据从栈中拿出；
+ 很多数据结构恰好应用于这种「动态」处理问题的场景，而发挥出它们的应用价值。

掌握下面这两个问题，离不开对具体例子的研究，进而归纳出一般规律。

| 题目链接                                                     | 力扣                                                         | B 站                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| [84. 柱状图中最大的矩形（困难）](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/) | [力扣](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/zhu-zhuang-tu-zhong-zui-da-de-ju-xing-by-leetcode-/) | [B 站](https://www.bilibili.com/video/BV16D4y1D7ed) |
| [316. 去除重复字母（中等）](https://leetcode-cn.com/problems/remove-duplicate-letters/) | [力扣](https://leetcode-cn.com/problems/remove-duplicate-letters/solution/qu-chu-zhong-fu-zi-mu-by-leetcode-soluti-vuso/) | [B 站](https://www.bilibili.com/video/BV1Tz4y167pC) |

「栈」最为广泛的一种应用就是作为「递归」「深度优先遍历」「分治算法」的数据结构支持。