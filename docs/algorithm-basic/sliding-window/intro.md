---
title: 8.1 滑动窗口是什么
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

![](https://tva1.sinaimg.cn/large/008i3skNgy1gwyeqkv8npj31120gmwfz.jpg)

这一部分我们要和大家分享的内容是「滑动窗口」。翻开《算法（第 4 版）》《算法导论》，都没有看到「滑动窗口」的定义。唯一有点儿沾边的是《算法导论》讲到「滚动哈希」，其实就是固定长度的滑动窗口。

在我看来「滑动窗口」更像是一种 **技巧**，还不是编程思想，它的应用没有那么广泛，也就是说：使用「滑动窗口」解决的问题很有局限性，并不像分治思想、减治思想、（深度优先、广度优先）遍历、枚举那样具有普遍意义。

> 如果大家感兴趣，可以在网上搜索「算法思想」「编程思想」，或者平时在做题的过程中，自己思考和总结一些算法思想，相信是比做算法问题更有意义的事情。

知道「滑动窗口」这个名词还是在「力扣」上刷题，刷到了「Sliding Window」标签的问题。

解决这一类问题的特点是：
+ 用于解决在 **数组** 上的问题；
+ 使用两个变量，称为左指针、右指针（或者快指针、慢指针）；
+ 右指针先向右移动、左指针再向右边移动，**交替进行**；
+ 直到右指针移动到数组的末尾。

下面的动画展示了这样的过程，它像极了一个窗口在数组上滑动，因此称为「滑动窗口」。

![图片](https://tva1.sinaimg.cn/large/008i3skNgy1gwyercvpv3g30pj04ek2u.gif)

## 理解「滑动窗口」需要先理解「暴力解法」

下面这 2 道问题是使用「滑动窗口」解决的基本问题，它们非常重要。

+ 「力扣」第 3 题：无重复字符的最长子串（中等）
+ 「力扣」第 209 题：长度最小的子数组（中等）

掌握这些问题的方式就是先思考暴力解法，然后再思考如何优化。

「滑动窗口」问题是典型的应用「循环不变量」解决的问题，比较考验我们编码和调试的能力。

| 题目链接                                                     | 力扣                                                         | B 站                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| [76. 最小覆盖子串（困难）](https://leetcode-cn.com/problems/minimum-window-substring/) | [力扣](https://leetcode-cn.com/problems/minimum-window-substring/solution/zui-xiao-fu-gai-zi-chuan-by-leetcode-solution/) | [B 站](https://www.bilibili.com/video/BV1aK4y1t7Qd) |
| [424. 替换后的最长重复字符（中等）](https://leetcode-cn.com/problems/longest-repeating-character-replacement/) | [力扣](https://leetcode-cn.com/problems/longest-repeating-character-replacement/solution/ti-huan-hou-de-zui-chang-zhong-fu-zi-fu-eaacp/) | [B 站](https://www.bilibili.com/video/BV14r4y1K7rN) |
| [567. 字符串的排列（中等）](https://leetcode-cn.com/problems/permutation-in-string/) | [力扣](https://leetcode-cn.com/problems/permutation-in-string/solution/zi-fu-chuan-de-pai-lie-by-leetcode-q6tp/) | [B 站](https://www.bilibili.com/video/BV175411E761) |
| [978. 最长湍流子数组（中等）](https://leetcode-cn.com/problems/longest-turbulent-subarray/) | [力扣](https://leetcode-cn.com/problems/longest-turbulent-subarray/solution/zui-chang-tuan-liu-zi-shu-zu-by-leetcode-zqoq/) | [B 站](https://www.bilibili.com/video/BV1PV411i73Y) |
| [992. K 个不同整数的子数组（困难）](https://leetcode-cn.com/problems/subarrays-with-k-different-integers/) | [力扣](https://leetcode-cn.com/problems/subarrays-with-k-different-integers/solution/k-ge-bu-tong-zheng-shu-de-zi-shu-zu-by-l-ud34/) | [B 站](https://www.bilibili.com/video/BV1xy4y1Y7GL) |

滑动窗口与双指针是基于暴力解法的优化，少考虑很多暴力解法要考虑的子问题，将时间复杂度降到线性。解题时需要考虑的细节较多，定义好「循环不变量」是关键。

---

+ 思想简单，但是代码比较难一次写对；
+ 滑动窗口的思想是：**先向右移动右指针、再向右移动左指针**，这样左右指针交替执行（ **不回头** ），可以完成一些问题；
+ 滑动窗口是 **暴力解法的优化** ，如何 **根据目标函数把暴力解法的一系列解排除掉，是使用滑动窗口的前提** ，一定要分析清楚；
+ 下面提供的是一种参考的写法，请**不要照搬**，应该 **先理解滑动窗口的思想（暴力解法的剪枝）** ，然后多加练习，掌握编写代码的技巧和细节。

滑动窗口的参考写法（不是模板，**请不要原样照搬**，仅供参考，理解算法设计思想是更重要的）：

```java
public class Solution {

    public String slidingWindow(String s, String t) {
        // 起始的时候，都位于 0，同方向移动
        int left = 0;
        int right = 0;
        while (right < sLen) {
            if ( 在右移的过程中检测是否满足条件 ) {
                // 对状态做修改，好让程序在后面检测到满足条件
            }
            // 右边界右移 1 格
            right++;
            while ( 满足条件 ) {
                // 走到这里是满足条件的，左边界逐渐逐渐左移，可以取最小值
                if ( 在左移的过程中检测是否不满足条件 ) {
                    // 对状态做修改，好让程序在后面检测到不满足条件
                }
                // 左边界左移 1 格
                left++;
            }
            // 走到这里是不满足条件的，右边界逐渐右移，可以取最大值
        }
        return 需要的结果变量;
    }
}
```







