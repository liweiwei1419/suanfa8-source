---
title: 循环不变量简介
icon: shipin
category: 循环不变量
tags:
  - 数组
  - 循环不变量
---


## :tv: **视频教程** <Badge text="视频" type="warning"/> <Badge text="重要" type=""/>

建议使用 1.5 倍速观看。

* [3-1 循环不变量（06:41）](https://www.bilibili.com/video/BV1Jg411M7Lp?p=1)


::: warning  闲话

很多时候不知道「循环不变量」照样可以把代码写对（有一些朋友不一定看过《算法导论》，但并不影响这些朋友能够顺利地解答算法问题），因为 **写代码的过程中遵守不变的性质是一件顺利成章、非常自然的事情**，这是我们大家心里都有的概念。把这种自然而然的事情起一个名字，叫做遵守了「循环不变量」。
::: 

重要的事情再强调一下：

::: danger 提示
「循环不变量」不是很难懂，不是很高深的概念，其实已经隐藏在我们编码的过程中。
:::

顾名思义，循环不变量是在循环的过程中保持不变的性质。

为了完成一件事情，我们需要设计若干个变量。在循环的过程中，**变量的值是变化的，在变化中保持不变的性质就称为循环不变量**。

这里的「量」指的是一些可以判断真假的语句，是我们根据问题的要求和目标人为定义的。定义了不同的循环不变量，对应了不同的算法细节。

《算法导论（第 3 版）》对于循环不变量的描述是这样的：

::: info 循环不变式

循环不变式主要用来帮助我们理解算法的正确性。关于循环不变式，我们必须证明三条性质：

**初始化**：循环的第一次迭代之前，它为真。

**保持**：如果循环的某次迭代之前它为真，那么下次迭代之前它仍为真。

**终止**：在循环终止时，不变式为我们提供一个有用的性质，该性质有助于证明算法是正确的。

::: right
来自 《算法导论》
:::

**我的解释**：

+ 「初始化」指的是循环开始前，我们什么都没有做的时候；
+ 「保持」指的是在循环的过程中，我们一点一点维护了一件事情；
+ 「终止」指的是循环结束的时候，由「初始化」和「保持」逐步递推，**循环不变的范围逐步扩大（排序，让有序排序范围逐步扩大）或者逐步缩小（查找，搜索范围逐渐减少）或者是变化（滑动窗口）的**，直到完成任务。

**「初始化」和「保持」是原因，「终止」是结果**。

在《算法导论（第 3 版）》里，很多地方都出现了「循环不变量」，例如：插入排序、归并排序、优先队列、最小生成树、单源最短路径。

## 循环不变量有什么用

循环不变量用于证明算法的正确性。

在我看来，学习循环不变量这个概念，在于让我们自己 **明确在循环的过程中我们在做什么**，在维护了一件什么事情。这样别人在阅读我们的代码的时候也能够清楚我们在做什么。

我们编写代码的工程师很多时候不需要像写论文那样必需要给出「初始化」「保持」和「终止」三个步骤。而是用一句话表示循环的过程中在做什么事情就可以。

明确循环不变量，可以帮助我们 **理清楚变量的含义**、变量的初始化的值、在循环的过程中操作的先后顺序以及在循环完成以后实现了怎样的效果，返回的变量的值是多少。

我做一些算法问题的时候，就会写出循环不变量，例如：

+ 二分查找问题：在 `nums[left..right]` 里查找目标元素，最终区间 `[left..right]` 里只剩下一个元素，或者区间为空；
+ 滑动窗口问题：在 `nums[left..right)` 里的元素满足题目要求的某种性质，`right` 先向右走，直到不满足的时候停下，`right` 的左边，`left` 的右边（包括 `left`） 的元素保持某种性质，然后接着让 `left` 向右走。

**说明**：循环不变量的定义不唯一的，上面只是举了个例子，**不同问题很可能不一样**。

写出循环不变量是为了让我自己清楚和检查变量的初值设置是否合理。**有一些时候，循环不变量的定义是通过我们自己修改逐渐而清晰起来的**。

## 明确循环不变量写出「快速排序」

我写「快速排序」不是靠背的。每次写「快速排序」我都会在脑子里或者在草稿纸上写写画画。

随机一个元素作为基准元素 `pivot`，可以选择区间里的第一个元素或者最后一个元素，我们这里选择第一个元素 `nums[left]`。遍历一次待排序的区间 `nums[left..right]`，使得：


```
nums[left + 1..lt] < pivot
nums[lt + 1..i) == pivot
nums[gt..right] >= pivot
```

这样的一句话就是循环不变量。

将 `nums[i]` 的值和 `pivot` 进行比较，有 3 种情况，应该先交换还是先右移，就很清楚了。

接着继续对 `nums[left..lt - 1]` 和 `nums[gt..right]` 执行同样的过程。为什么第 1 个区间到 `lt - 1`，第二个区间的开头是 `gt` 这一点完全由上面的定义决定。

（这里只是举例，不花篇幅和大家详细讲解快速排序了。）

**参考代码**：

```java
import java.util.Random;

public class Solution {

    private static final Random RANDOM = new Random();

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        quickSort(nums, 0, len - 1);
        return nums;
    }

    private void quickSort(int[] nums, int left, int right) {
        // 小区间改成插入排序
        if (right - left + 1 <= 16) {
            insertionSort(nums, left, right);
            return;
        }

        // 为了避免递归树偏斜，随机选择元素作为 pivot
        int randomIndex = left + RANDOM.nextInt(right - left + 1);
        swap(nums, left, randomIndex);

        int pivot = nums[left];
        // 循环不变量：把等于 pivot 的元素「挤」到中间
        // nums[left + 1..lt] < pivot
        // nums[lt + 1..i) == pivot
        // nums[gt..right] >= pivot
        int lt = left;
        int gt = right + 1;
        int i = left + 1;
        while (i < gt) {
            if (nums[i] < pivot) {
                lt++;
                swap(nums, lt, i);
                i++;
            } else if (nums[i] == pivot) {
                i++;
            } else {
                gt--;
                swap(nums, i, gt);
            }
        }
        swap(nums, left, lt);
        quickSort(nums, left, lt - 1);
        quickSort(nums, gt, right);
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }

    private void insertionSort(int[] nums, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int temp = nums[i];
            int j;
            for (j = i; j > left && nums[j - 1] > temp; j--) {
                nums[j] = nums[j - 1];
            }
            nums[j] = temp;
        }
    }
}
```


::: info 温馨提示
本节的 4 个视频均有视频讲解，在 :tv: 标注的地方。
:::


::: danger 循环不变量

+ 循环不变量用于证明算法的有效性，也是编码正确的理论依据；
+ 循环不变量定义帮助分清先加还是先赋值，还有一些边界条件。定义清楚循环不变量以后，代码的编写就会很轻松；
+ 建议把「循环不变量」作为注释写在代码里，以方便自己调试和他人阅读。
  :::

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 912  | [排序数组](https://leetcode-cn.com/problems/sort-an-array)（中等） | [文字题解](https://leetcode-cn.com/problems/sort-an-array/solution/fu-xi-ji-chu-pai-xu-suan-fa-java-by-liweiwei1419/) |
| 26   | [删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array)（简单） |                                                              |
| 283  | [移动零](https://leetcode-cn.com/problems/move-zeroes)（简单） | [文字题解](https://leetcode-cn.com/problems/move-zeroes/solution/zun-shou-xun-huan-bu-bian-shi-java-by-liweiwei1419/) |
| 27   | [移除元素](https://leetcode-cn.com/problems/remove-element/)（简单） |                                                              |
| 80   | [删除排序数组中的重复项 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/description/)（中等） |                                                              |



