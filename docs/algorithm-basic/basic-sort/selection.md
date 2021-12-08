---
title: 第 1 节 选择排序
icon: shipin
category: 排序算法
tags:
  - 减治思想
  - 贪心算法
---

# 选择排序


算法的入门，从排序算法开始。可以打开这个 [网站](https://visualgo.net/zh/sorting)，体验一下各种排序算法。

## :tv: **视频教程**

建议使用 1.5 倍速观看。

+ [2-1 选择排序（03:53）](https://www.bilibili.com/video/BV1y44y1q7MJ?p=1)
+ [2-2 选择排序代码演示（03:27）](https://www.bilibili.com/video/BV1y44y1q7MJ?p=2)
+ [2-3 选择排序的时间复杂度（03:03）](https://www.bilibili.com/video/BV1y44y1q7MJ?p=3)
+ [2-4 数组具有随机访问的特性（05:08）](https://www.bilibili.com/video/BV1y44y1q7MJ?p=4)
+ [2-5 选择排序的特点和优化的方向（01:13）](https://www.bilibili.com/video/BV1y44y1q7MJ?p=5)

## 选择排序的基本思想

每一轮选取未排定的部分中 **最小** 的元素交换到未排定部分的最开头，经过若干个步骤，就能排定整个数组。

![selection-sort](https://tva1.sinaimg.cn/large/008i3skNgy1gwza3v3tr7g30u00gwk98.gif)

我以前专门找过从来没有学习过算法的朋友，问他怎么给一个数组排序，他给我的回答是：先选出最小的、再选出第 2 小的、再选出第 3 小的、……，他的描述无意中其实就回答了「选择排序」的做法。「选择」的含义是「每一次选最小的」。

遍历剩下的、还没有排好序的部分，选出最小元素有一个很形象的名词叫「打擂台算法」，即：可以通过一次遍历，选出最优者。

::: danger 重点概括
选择排序：先选出最小的，再选出第二小的，以此类推。
:::

**参考代码**：

```java
import java.util.Arrays;

public class Solution {

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        // 循环不变量：[0..i) 有序，且该区间里所有元素就是最终排定的样子
        for (int i = 0; i < len - 1; i++) {
            // 选择区间 [i..len - 1] 里最小的元素的索引，交换到下标 i
            int minIndex = i;
            for (int j = i + 1; j < len; j++) {
                if (nums[j] < nums[minIndex]) {
                    minIndex = j;
                }
            }
            swap(nums, i, minIndex);
        }
        return nums;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }

    public static void main(String[] args) {
        int[] nums = {5, 2, 3, 1};
        Solution solution = new Solution();
        int[] res = solution.sortArray(nums);
        System.out.println(Arrays.toString(res));
    }
}
```
**复杂度分析**：

- 时间复杂度：$O(N^2)$，这里 $N$ 是数组的长度；
- 空间复杂度：$O(1)$，使用到常数个临时变量。

## 选择排序的特点

这部分内容来自《算法（第 4 版）》第 2 章 《排序》之「2.1.2 选择排序」（中文版 P156）。

![image-20211202111004869](https://tva1.sinaimg.cn/large/008i3skNgy1gwzbbwqpuwj317m09kq5y.jpg)

### 交换次数最少

「选择排序」看起来好像最没有用，但是如果在交换成本较高的排序任务中，就可以使用「选择排序」（《算法 4》相关章节课后练习题）。


人都是想「偷懒」的，所以让人去做排序，一般不会去做那么多次交换。

### 交换次数与输入数组是否有序无关

典型例子：即使是顺序数组，选择排序无法减少比较次数（相比于「插入排序」而言）。

## 总结

### 算法思想：[减治思想](https://www.geeksforgeeks.org/decrease-and-conquer/)

减治，按照字面意思理解就行，即：逐渐缩小问题规模。

外层循环每一次都能排定一个元素，问题的规模逐渐减少，直到全部解决，即「大而化小，小而化了」。运用「减治思想」很典型的算法就是大名鼎鼎的「二分查找」。


## 练习

+ 使用「选择排序」完成「力扣」第 912 题：[排序数组](https://leetcode-cn.com/problems/sort-an-array/)。

## 参考资料

+ [《算法 4》英文网站](https://algs4.cs.princeton.edu/21elementary/)

+ [准备「选择排序」的时候制作的 PPT 和 keynote](https://www.yuque.com/liweiwei1419/algo/sfqelg) 

<Utterances />