---
title: 第 2 节 冒泡排序
icon: shipin
category: 排序算法
tags:
  - 减治思想
---

# 冒泡排序

## :tv: **视频教程**

建议使用 1.5 倍速观看。

+ [2-6 冒泡排序（06:26）](https://www.bilibili.com/video/BV1y44y1q7MJ?p=6)

## 冒泡排序的基本思想

+ **两两** 比较 **相邻** 两个位置的元素，把较大的元素 **交换** 到上方；
+ 每一轮都会把当前最大的元素冒泡到数组的末尾。

为了方便大家观察「冒泡排序」的执行过程，我们把数组竖着摆放。可以看到：值越大的越先冒泡上来。

![bubble-sort](https://tva1.sinaimg.cn/large/008i3skNgy1gwza47cpyyg30u00gw7o8.gif)

::: tip 重点概括
冒泡排序：每一轮将一个「未排定部分」最大的元素「冒泡」到「未排定部分」的末尾，直至整个数组有序。
::: 

::: danger 注意
我看到有一些朋友，把「选择排序」和「冒泡排序」搞混了。
+ 「冒泡排序」每一轮的确是选出最值，但它是通过两两比较和交换，把最值元素渐渐地交换到数组的末尾；
+ 「选择排序」每一轮选出最小值，交换到数组的前面，**每一轮只交换一次**。
::: 

**说明**：

- 相邻的两个元素进行比较，把比较大的元素排在后面，这样遍历一轮下来，就可以找到这一轮循环中最大的那个元素，我们把这个过程形象地称之为「冒泡」；
- 由于每一轮循环都「冒泡」出一个这一轮循环最大的元素，所以上一轮循环的最后一个元素，不应该参加下一轮循环的比较了，这就是为什么内层循环的结束条件是 `j < arr.length - i -1`  的原因。

**参考代码**：

```java
public class Solution {

    // 冒泡排序（基础版）：超时

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        for (int i = len - 1; i >= 0; i--) {
            // 只要发生一次交换，就必须进行下一轮比较，
            for (int j = 0; j < i; j++) {
                if (nums[j] > nums[j + 1]) {
                    swap(nums, j, j + 1);
                }
            }
        }
        return nums;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```


**复杂度分析**：

- 时间复杂度：$O(N^2)$，这里 $N$ 是输入数组的长度；
- 空间复杂度：$O(1)$。