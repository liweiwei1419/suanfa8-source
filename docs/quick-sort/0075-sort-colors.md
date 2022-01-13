---
title: 「力扣」第 75 题：颜色分类（中等）
icon: shipin
category: 排序算法
tags:
  - 排序算法
  - 分而治之
  - 快速排序
---

- 题目链接：[75. 颜色分类](https://leetcode-cn.com/problems/sort-colors/)；
- 题解链接：[快速排序的子过程 partition（重点在设计循环不变量）](https://leetcode-cn.com/problems/sort-colors/solution/kuai-su-pai-xu-partition-guo-cheng-she-ji-xun-huan/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/sort-colors/solution/yan-se-fen-lei-by-leetcode-solution/) 和 [B 站](https://www.bilibili.com/video/BV1tz4y1o7n5) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=585037153&bvid=BV1tz4y1o7n5&cid=247889920&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

给定一个包含红色、白色和蓝色，一共 `n` 个元素的数组，**[原地](https://baike.baidu.com/item/原地算法)**对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 `0`、 `1` 和 `2` 分别表示红色、白色和蓝色。

**示例 1：**

```
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
```

**示例 2：**

```
输入：nums = [2,0,1]
输出：[0,1,2]
```

**示例 3：**

```
输入：nums = [0]
输出：[0]
```

**示例 4：**

```
输入：nums = [1]
输出：[1]
```

**提示：**

- `n == nums.length`
- `1 <= n <= 300`
- `nums[i]` 为 `0`、`1` 或 `2`

**进阶：**

- 你可以不使用代码库中的排序函数来解决这道题吗？
- 你能想出一个仅使用常数空间的一趟扫描算法吗？

## 方法一：排序

数组里只包含 0、1、2，因此可以对数组排序，排序以后，所有的 0 就被摆放在了一起，所有的 1 就被摆放在了一起，所有的 2 就被摆放在了一起。

如果排序方法使用的是快速排序、归并排序，时间复杂度为 $O(N \log N)$。

又由于数组里只包含 0、1、2，还可以使用计数排序，时间复杂度为 $O(N)$。

（代码省略）

## 方法二：快速排序的子过程 partition

题目最后给出的「进阶」要求，其实考察的是「快速排序」的子过程 partition，即：通过一次遍历，把数组分成三个部分。

写代码的时候需要注意到设置的变量以及区间的定义，也就是 **循环不变量**。**循环不变量** 简单说就是在循环的过程中保持不变的性质，这个性质是人为根据需要解决的任务定义的。

对 **循环不变量** 的简单认识：

- 变量的值是变化的，但是保持不变的性质，就是循环不变量；
- 这里的「量」是一些人为定义的、可以判断真假的语句，在循环开始前、循环的过程中、循环结束以后，都为真；
- 这里的「循环」是广义上的，并不一定指「循环」，也有可能是在「递归」的过程中。

下面给出两版代码，循环不变量我们作为注释写在代码中。不同的定义决定了：初始化时变量的取值、循环的过程中操作的先后顺序、循环结束的条件。

在本题视频题解：[75. 颜色分类（官方题解）](https://leetcode-cn.com/problems/sort-colors/solution/yan-se-fen-lei-by-leetcode-solution/) 里，我有详细讲解每一行代码的意思。

**参考代码 1**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.Arrays;

public class Solution {

    public void sortColors(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return;
        }

        // all in [0..zero) = 0
        // all in [zero..i) = 1
        // all in [two..len - 1] = 2

        // 循环终止条件是 i == two，那么循环可以继续的条件是 i < two
        // 为了保证初始化的时候 [0..zero) 为空，设置 zero = 0，
        // 所以下面遍历到 0 的时候，先交换，再加
        int zero = 0;

        // 为了保证初始化的时候 [two..len - 1] 为空，设置 two = len
        // 所以下面遍历到 2 的时候，先减，再交换
        int two = len;
        int i = 0;
        // 当 i == two 上面的三个子区间正好覆盖了全部数组
        // 因此，循环可以继续的条件是 i < two
        while (i < two) {
            if (nums[i] == 0) {
                swap(nums, i, zero);
                zero++;
                i++;
            } else if (nums[i] == 1) {
                i++;
            } else {
                two--;
                swap(nums, i, two);
            }
        }
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """

        # all in [0..zero) = 0
        # all in [zero..i) = 1
        # all in [two..len - 1] = 2

        def swap(nums, index1, index2):
            nums[index1], nums[index2] = nums[index2], nums[index1]

        size = len(nums)
        if size < 2:
            return

        zero = 0
        two = size

        i = 0

        while i < two:
            if nums[i] == 0:
                swap(nums, i, zero)
                i += 1
                zero += 1
            elif nums[i] == 1:
                i += 1
            else:
                two -= 1
                swap(nums, i, two)
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
- 空间复杂度：$O(1)$。

**参考代码 2**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public void sortColors(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return;
        }
        // all in [0..zero] = 0
        // all in (zero..i) = 1
        // all in (two..len - 1] = 2

        // 为了保证初始化的时候 [0..zero] 为空，设置 zero = -1，
        // 所以下面遍历到 0 的时候，先加，再交换
        int zero = -1;

        // 为了保证初始化的时候 (two..len - 1] 为空，设置 two = len - 1
        // 所以下面遍历到 2 的时候，先交换，再减
        int two = len - 1;
        int i = 0;
        // 当 i == two 的时候，还有一个元素还没有看，
        // 因此，循环可以继续的条件是 i <= two
        while (i <= two) {
            if (nums[i] == 0) {
                zero++;
                swap(nums, i, zero);
                i++;
            } else if (nums[i] == 1) {
                i++;
            } else {
                swap(nums, i, two);
                two--;
            }
        }
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """

        # all in [0..zero] = 0
        # all in (zero..i) = 1
        # all in (two..len - 1] = 2

        def swap(nums, index1, index2):
            nums[index1], nums[index2] = nums[index2], nums[index1]

        size = len(nums)
        if size < 2:
            return

        zero = -1
        two = size - 1

        i = 0

        while i <= two:
            if nums[i] == 0:
                zero += 1
                swap(nums, i, zero)
                i += 1
            elif nums[i] == 1:
                i += 1
            else:
                swap(nums, i, two)
                two -= 1
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：（同参考代码 1）

## 总结

「循环不变量」主要用于证明算法的正确性，在《算法导论》里大量使用了「循环不变量」这个工具。

- 第 2.1 节 插入排序
- 第 2.3.1 节 分治法
- 第 6.3 节 建堆
- 第 7.1 节 快速排序的描述

其实「循环不变量」并不是一个很高深的概念，其实我们很多时候，在编写代码的过程中都在不自觉地维护了变量的定义。「循环不变量」只是一个学术化的名字而已，设计清楚「循环不变量」，可以帮助我们写出正确的代码。

大家可以在《[循环不变量精讲]()》专栏里收看视频讲解。
