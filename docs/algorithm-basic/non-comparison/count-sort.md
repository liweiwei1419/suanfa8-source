---
title: 2.26 计数排序（不重要，不用仔细看）
icon: yongyan
category: 排序算法
tags:
  - 计数排序
---

## 3 种「非比较」的排序算法（了解，如果是面向笔试，不要花时间去研究）

特别说明：**这部分算法不建议花太多去仔细研究它们的细节**。如果是面向面试，了解思想即可，用到了再学。

直接放弃我个人觉得完全可以。

学习资料是《算法导论》。下面是我根据《算法导论》上介绍的内容整理出来的。

这三种排序的区别与上面的排序的特点是：一个数该放在哪里，是由这个数本身的大小决定的，它不需要经过比较。也可以认为是哈希的思想：由数值映射地址。

因此这三种算法一定需要额外的空间才能完成排序任务，时间复杂度可以提升到 $O(N)$，但适用场景不多，主要是因为**使用这三种排序一定要保证输入数组的每个元素都在一个合理的范围内**（例如本题）。

这三种算法还有一个特点是：都可以实现成稳定排序，无需稳定化。

我在这里只是给出了可以通过测评的代码，没有具体展开介绍了。具体想知道细节的朋友可以参考《算法导论》。

## 计数排序（了解）

「计数排序」是这三种排序算法里最好理解的，从名字就可以看出。把每个出现的数值都做一个计数，然后根据计数从小到大输出得到有序数组。

这种做法丢失了稳定性，如果是本题这种基本数据类型的话没有关系。如果是对象类型，就不能这么做了。

保持稳定性的做法是：先对计数数组做前缀和，在第 2 步往回赋值的时候，根据原始输入数组的数据从后向前赋值，前缀和数组保存了每个元素存放的下标信息（这里没有说得太细，本来这一点就不重要，也不难理解）。

**参考代码**：

```java
public class Solution {

    // 计数排序

    private static final int OFFSET = 50000;

    public int[] sortArray(int[] nums) {
        int len = nums.length;
        // 由于 -50000 <= A[i] <= 50000
        // 因此"桶" 的大小为 50000 - (-50000) = 10_0000
        // 并且设置偏移 OFFSET = 50000，目的是让每一个数都能够大于等于 0
        // 这样就可以作为 count 数组的下标，查询这个数的计数
        int size = 10_0000;

        // 计数数组
        int[] count = new int[size];
        // 计算计数数组
        for (int num : nums) {
            count[num + OFFSET]++;
        }

        // 把 count 数组变成前缀和数组
        for (int i = 1; i < size; i++) {
            count[i] += count[i - 1];
        }

        // 先把原始数组赋值到一个临时数组里，然后回写数据
        int[] temp = new int[len];
        System.arraycopy(nums, 0, temp, 0, len);

        // 为了保证稳定性，从后向前赋值
        for (int i = len - 1; i >= 0; i--) {
            int index = count[temp[i] + OFFSET] - 1;
            nums[index] = temp[i];
            count[temp[i] + OFFSET]--;
        }
        return nums;
    }
}
```

**复杂度分析**：（略，这部分内容不太重要，增加学习负担）

（本节完）