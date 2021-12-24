---
title: TopK 问题：「力扣」第 215 题：数组第 k 大的元素
icon: yongyan
category: 排序算法
tags:
  - 排序算法
  - 减而治之
  - 快速排序
  - 优先队列
---

+ 中文网址：[215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/) ；
+ 英文网址：[215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/description/) 。
+ 题解地址：https://leetcode-cn.com/problems/kth-largest-element-in-an-array/solution/partitionfen-er-zhi-zhi-you-xian-dui-lie-java-dai-/

在未排序的数组中找到第 **k** 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

**示例 1:**

```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

**示例 2:**

```
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

**说明:**

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。



**说明**：本题解于 2021 年 8 月 6 日重写。

这道题据说是面试的高频考题，同时也是基础排序算法的应用。因为篇幅的原因，没有办法把每一个知识点都介绍得很详细，大家可以自行学习相关知识点以理解题解中的内容。

本题解分为四个部分：

+ 理解题意，做任何一道算法问题都需要搞清楚题目的意思，这部分是很重要的，只有搞清楚题目的意思，才能找到解决问题的算法与数据结构；
+ 方法一：暴力解法，这是根据题目意思能得到的最直接的解法，时间复杂度较高；
+ 方法二：通过 `partition` 减治，这是快速排序 `partition` 的应用；
+ 方法三：动态求出最值元素，是「优先队列」的应用。

方法二必须把所有的数据读入内存中，方法三在数据量很大的时候，可以实现「在线算法」，不用一下子把所有数据读入内存。


![image.png](https://pic.leetcode-cn.com/97186c31a9c3a4af8654c52e5e15e1073d623a57fb4d7fc04b32cc914b906c12-image.png)




---


**题意分析**：

题目要求我们找到「数组排序后的第 $k$ 个最大的元素，而不是第 $k$ 个不同的元素」。「数组排序后的第 $k$ 个最大的元素」换句话说：从右边往左边数第 $k$ 个元素（从 $1$ 开始），那么从左向右数是第几个呢，我们列出几个找找规律就好了。

+ 一共 $6$ 个元素，找第 $2$ 大，下标是 $4$；
+ 一共 $6$ 个元素，找第 $4$ 大，下标是 $2$。

因此升序排序以后，**目标元素的下标是 $N - k$**，这里 $N$ 是输入数组的长度。

---

### 方法一：暴力解法

**参考代码 1**：

```Java []
import java.util.Arrays;

public class Solution {

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        Arrays.sort(nums);
        return nums[len - k];
    }
}
```
```C++ []
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int findKthLargest(vector<int> &nums, int k) {
        int size = nums.size();
        sort(begin(nums), end(nums));
        return nums[size - k];
    }
};
```
```Python []
from typing import List


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        size = len(nums)
        nums.sort()
        return nums[size - k]
```


**复杂度分析**：
+ 时间复杂度：$O(N \log N)$，这里 $N$ 是数组的长度，算法的性能消耗主要在排序，JDK 默认使用快速排序，因此时间复杂度为 $O(N \log N)$；
+ 空间复杂度：$O(\log N)$，这里认为编程语言使用的排序方法是「快速排序」，空间复杂度为递归调用栈的高度，为 $\log N$。

其实这道问题考察了「快速排序」的 `partition` 操作和数据结构「堆」的应用，方法二和方法三分别介绍了这两种方法。

---

### 方法二：减而治之（逐渐缩小问题规模）

**注意**：随机化切分元素。快速排序虽然快，但是在遇到特殊测试用例（顺序数组或者逆序数组）的时候，递归树会退化成链表，时间复杂度会变成 $O(N^2)$。


我们在学习「快速排序」的时候，会学到 `partition`（切分），通过 `partition` 操作使得：对于某个下标 `j`，`nums[j]` 已经排定，即 `nums[j]` 经过 partition（切分）操作以后会放置在它「最终应该放置的地方」。而且：
+ `nums[left]` 到 `nums[j - 1]` 中的所有元素都不大于 `nums[j]`；
+ `nums[j + 1]` 到 `nums[right]` 中的所有元素都不小于 `nums[j]`。

![image.png](https://pic.leetcode-cn.com/1628219309-XjJtIn-image.png){:style="width:500px"}{:align=center}



**参考代码 2**：

```Java []
public class Solution {

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        int left = 0;
        int right = len - 1;

        // 转换一下，第 k 大元素的下标是 len - k
        int target = len - k;

        while (true) {
            int index = partition(nums, left, right);
            if (index == target) {
                return nums[index];
            } else if (index < target) {
                left = index + 1;
            } else {
                right = index - 1;
            }
        }
    }

    /**
     * 对数组 nums 的子区间 [left..right] 执行 partition 操作，返回 nums[left] 排序以后应该在的位置
     * 在遍历过程中保持循环不变量的定义：
     * nums[left + 1..j] < nums[left]
     * nums(j..i) >= nums[left]
     *
     * @param nums
     * @param left
     * @param right
     * @return
     */
    public int partition(int[] nums, int left, int right) {
        int pivot = nums[left];
        int j = left;
        for (int i = left + 1; i <= right; i++) {
            if (nums[i] < pivot) {
                // j 的初值为 left，先右移，再交换，小于 pivot 的元素都被交换到前面
                j++;
                swap(nums, j, i);
            }
        }
        // 在之前遍历的过程中，满足 nums[left + 1..j] < pivot，并且 nums(j..i) >= pivot
        swap(nums, j, left);
        // 交换以后 nums[left..j - 1] < pivot, nums[j] = pivot, nums[j + 1..right] >= pivot
        return j;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
```

> **注意**：本题必须随机初始化 `pivot` 元素，否则通过时间会很慢，因为测试用例中有极端测试用例。为了应对极端测试用例，使得递归树加深，可以在循环一开始的时候，随机交换第 $1$ 个元素与它后面的任意 $1$ 个元素的位置；

**参考代码 3**：

```Java []
import java.util.Random;

public class Solution {

    private static Random random = new Random(System.currentTimeMillis());

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        int target = len - k;
        int left = 0;
        int right = len - 1;
        while (true) {
            int index = partition(nums, left, right);
            if (index < target) {
                left = index + 1;
            } else if (index > target) {
                right = index - 1;
            } else {
                return nums[index];
            }
        }
    }

    // 在区间 nums[left..right] 区间执行 partition 操作
    private int partition(int[] nums, int left, int right) {
        // 在区间随机选择一个元素作为标定点
        if (right > left) {
            int randomIndex = left + 1 + random.nextInt(right - left);
            swap(nums, left, randomIndex);
        }

        int pivot = nums[left];
        int j = left;
        for (int i = left + 1; i <= right; i++) {
            if (nums[i] < pivot) {
                j++;
                swap(nums, j, i);
            }
        }
        swap(nums, left, j);
        return j;
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
} 
```

**复杂度分析**：
+ 时间复杂度：$O(N)$，这里 $N$ 是数组的长度，理由可以参考本题解下用户 @ZLW 的评论，需要使用主定理进行分析；
+ 空间复杂度：$O(1)$，在逐渐缩小搜索区间的过程中只使用到常数个变量。

> **说明**：可能有一部分朋友看到这道题有「递归」的写法，但是本题解采用的是在 `while (true)` 循环中，通过 `left` 与 `right` 向中间靠拢的方式逐步缩小搜索区间，因此没有使用递归调用栈（也无须使用递归调用栈），因此空间复杂度是 $O(1)$。


---

### 方法三：优先队列

优先队列的思路是很朴素的。由于找第 `K` 大元素，其实就是整个数组排序以后后半部分最小的那个元素。因此，我们可以维护一个有 `K` 个元素的最小堆：

+ 如果当前堆不满，直接添加；
+ 堆满的时候，如果新读到的数小于等于堆顶，肯定不是我们要找的元素，只有新遍历到的数大于堆顶的时候，才将堆顶拿出，然后放入新读到的数，进而让堆自己去调整内部结构。

说明：这里最合适的操作其实是 `replace()`，即直接把新读进来的元素放在堆顶，然后执行下沉（`siftDown()`）操作。Java 当中的 `PriorityQueue` 没有提供这个操作，只好先 `poll()` 再 `offer()`。 

优先队列的写法就很多了，这里只例举一个有代表性的，其它的写法大同小异，没有本质差别。

**参考代码 4**：

```Java []
import java.util.Comparator;
import java.util.PriorityQueue;

public class Solution {

    public int findKthLargest(int[] nums, int k) {
        int len = nums.length;
        // 使用一个含有 k 个元素的最小堆，PriorityQueue 底层是动态数组，为了防止数组扩容产生消耗，可以先指定数组的长度
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k, Comparator.comparingInt(a -> a));
        // Java 里没有 heapify ，因此我们逐个将前 k 个元素添加到 minHeap 里
        for (int i = 0; i < k; i++) {
            minHeap.offer(nums[i]);
        }

        for (int i = k; i < len; i++) {
            // 看一眼，不拿出，因为有可能没有必要替换
            Integer topElement = minHeap.peek();
            // 只要当前遍历的元素比堆顶元素大，堆顶弹出，遍历的元素进去
            if (nums[i] > topElement) {
                // Java 没有 replace()，所以得先 poll() 出来，然后再放回去
                minHeap.poll();
                minHeap.offer(nums[i]);
            }
        }
        return minHeap.peek();
    }
}
```

**复杂度分析**：
+ 时间复杂度：$O(N \log K)$，遍历数据 $O(N)$，堆内元素调整 $O(K)$；
+ 空间复杂度：$O(K)$。