---
title: 第 4 节 插入排序
icon: shipin
category: 排序算法
tags:
  - 减治思想
---

# 插入排序及其重要意义 <Badge text="视频" type="warning"/>

## :tv: **视频教程**

建议使用 1.5 倍速观看。

* [2-7 插入排序（05:57）](https://www.bilibili.com/video/BV1y44y1q7MJ?p=7)


## 插入排序的基本思想

插入排序每一次将一个元素 **插入** 到它前面的有序数组中。实际上有两种插入的方式：

+ 逐个交换：待插入元素逐个交换到前面

![](https://tva1.sinaimg.cn/large/008i3skNgy1gwyurfs2f8g30g003n19k.gif)

+ 先暂存再后移：先暂存待插入元素，然后前面比暂存元素严格大的后移

![](https://tva1.sinaimg.cn/large/008i3skNgy1gwyurgwqeng30af04odkr.gif)

其实这种插入方式更像插入排序本来的样子。《算法导论》上的图更形象。

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gwyuyr6mtqj30hc0gg0tr.jpg" alt="《算法导论》第 2.1 节 插入排序" style="zoom:50%;" />

插入排序有个特点非常重要：接近有序的时候，插入排序可以很快完成。「接近有序」的意思是：每个元素和它排序以后最终所在的位置不远。这一点需要和「选择排序」进行比较。

::: danger 重点
「插入排序」是稳定排序，在接近有序的情况下，表现优异。
:::

### 插入排序写法一：基于交换

**参考代码**：

```java
public class Solution {

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        for (int i = 1; i < len; i++) {
            for (int j = i; j > 0; j--) {
                // 注意：前面的数严格大于后面的数才交换
                if (nums[j - 1] > nums[j]) {
                    swap(nums, j, j - 1);
                } else {
                    break;
                }
            }
        }
        return nums;
    }

    private void swap(int[] arr, int index1, int index2) {
        int temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }
}
```

**注意**：「插入排序」可以提前终止内层循环，体现在 `nums[j - 1] > temp` 不满足时。


**复杂度分析**：

- 时间复杂度：$O(N^2)$，这里 $N$ 是数组的长度；
- 空间复杂度：$O(1)$，使用到常数个临时变量。

## 参考资料

+ [《算法 4》英文网站](https://algs4.cs.princeton.edu/21elementary/)


<Utterances />