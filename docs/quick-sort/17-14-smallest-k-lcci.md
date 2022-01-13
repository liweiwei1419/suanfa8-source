---
title: 「程序员面试金典」17.14. 最小 K 个数（中等）
icon: yongyan
category:
tags:
  - 快速排序
  - 优先队列
  - 减而治之
---

![17.14 最小 k 个数](https://tva1.sinaimg.cn/large/008i3skNgy1gxpckzwdesj30p00anwf4.jpg)

- 题目链接：[面试题 17.14. 最小 K 个数](https://leetcode-cn.com/problems/smallest-k-lcci/)；
- 题解链接：[排序、优先队列、快速排序的子过程（Java）](https://leetcode-cn.com/problems/smallest-k-lcci/solution/pai-xu-you-xian-dui-lie-kuai-su-pai-xu-d-ryrd/)。

## 题目描述

设计一个算法，找出数组中最小的 k 个数。以任意顺序返回这 k 个数均可。

**示例：**

```
输入： arr = [1,3,5,7,2,4,6,8], k = 4
输出： [1,2,3,4]
```

**提示：**

- `0 <= len(arr) <= 100000`
- `0 <= k <= min(100000, len(arr))`

---

这题是典型的 TopK 问题，最原始的问题是 「力扣」第 215 题：[数组中的第 K 个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)。

### 方法一：排序

题目要求：找出数组中最小的 $k$ 个数。很容易想到的做法是先对数组升序排序，然后把前面 $k$ 个数返回回去就好。

**参考代码 1**：

```Java []
import java.util.Arrays;

public class Solution {

    public int[] smallestK(int[] arr, int k) {
        Arrays.sort(arr);
        int[] res = new int[k];
        System.arraycopy(arr, 0, res, 0, k);
        return res;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N \log N)$，这里 $N$ 是输入数组的长度；
- 空间复杂度：$O(k)$，这里 $k$ 是保存结果的数组的长度。

### 方法二：优先队列

可以 **动态得到最值** 的数据结构是「优先队列」（堆），我们当然可以把所有的数据都放入一个最小堆中，然后依次取出 $k$ 个元素（请见「参考代码 2」的选项卡 2 中的代码）。

使用「优先队列」的好处是可以 **动态选出** 最值元素，所以这个问题更常见的做法是：**只在「优先队列」中保存 $k$ 这个级别的数据**。这一点应用在：数组的长度特别长，相比之下 $k$ 很小的场景，这种情况也叫「在线」，也就是不用一下子把所有的元素都读入内存。

此时「优先队列」应该选择「最大堆」，堆顶元素是所有已经读到的数据里最大的元素。

- 如果读到的新元素 >= 堆顶元素，丢弃新读到的新元素；
- 如果读到的新元素 < 堆顶元素，丢弃堆顶元素，把新读到的新元素加入堆中。

把所有的数据都读完之后，最大堆里剩下的就是输入数组里最小的 $k$ 个元素。

**参考代码 2**：

```Java []
import java.util.Collections;
import java.util.PriorityQueue;

public class Solution {

    public int[] smallestK(int[] arr, int k) {
        if (k == 0) {
            return new int[0];
        }

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int i = 0; i < k; i++) {
            maxHeap.offer(arr[i]);
        }

        int len = arr.length;
        for (int i = k; i < len; i++) {
            if (arr[i] < maxHeap.peek()) {
                maxHeap.poll();
                maxHeap.offer(arr[i]);
            }
        }

        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = maxHeap.poll();
        }
        return res;
    }
}
```

```Java []
import java.util.PriorityQueue;

public class Solution {

    public int[] smallestK(int[] arr, int k) {
        // 默认就是最小堆
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : arr) {
            minHeap.offer(num);
        }

        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = minHeap.poll();
        }
        return res;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N \log k)$，这里 $N$ 是输入数组的长度，每一次调整堆的时间复杂度为 $O(\log k)$；
- 空间复杂度：$O(k)$，这里 $k$ 是保存结果的数组的长度。

### 方法三：快速排序的子过程

题目中说：**以任意顺序返回这 $k$ 个数均可**。

解决这个问题需要很熟悉「快速排序」中的 `partition` 过程。`partition` 过程简单描述如下：

- 选出一个基准元素（`pivot`），可以是区间里任意一个元素；
- 遍历一次输入数组，把数组分成两个部分：
  - 前半部分严格小于 `pivot`；
  - 后半部分大于等于 `pivot`。

**返回 `pivot` 所在位置的下标**（下图中 `pivot = 6`）。

![image.png](https://pic.leetcode-cn.com/1628219309-XjJtIn-image.png){:style="width:500px"}{:align=center}

假设数组区间为 `arr[left..right]`。刚开始的时候 `left = 0`，`right = len - 1`。

找最小的 $k$ 个数，如果 `partition` 过程的返回值 `index` 恰好是 $k - 1$（下标从 $0$ 开始），此时数组的前 $k$ 个元素就是输入数组里最小的 $k$ 个数，程序就可以终止了。

- 如果 `index < k - 1`，说明 `arr[left..index - 1] < arr[index]`，区间 `arr[left..index - 1]` 可以不用再看，它们一定在最小的 $k$ 个元素里面，此时应该继续 **向右** 找下标 $k - 1$：
- 如果 `index > k - 1`，说明 `arr[index] <= arr[index + 1..right]`，区间 `arr[index + 1..right]` 可以不用再看，它们一定不在最小的 $k$ 个元素里面，此时应该继续 **向左** 找下标 $k - 1$。

> 上面这部分向左走还是向右走如果不太清楚的话，我一般是用一两个具体的例子辅助思考，不容易出错。

在上面的过程中，区间 `arr[left..right]` 不断缩小，直到找到下标 $k - 1$。

`partition` 的写法不唯一，这里给出的代码仅供参考。

> 需要深入学习「快速排序」的朋友们可以看看经典的算法书籍《算法（第 4 版）》和《算法导论》。

**参考代码 3**：

```Java []
import java.util.Arrays;
import java.util.Random;

public class Solution {

    private static final Random random = new Random(System.currentTimeMillis());

    public int[] smallestK(int[] arr, int k) {
        if (k == 0) {
            return new int[0];
        }

        int len = arr.length;
        int left = 0;
        int right = len - 1;
        // 找下标是 k - 1 的那个数，由于在循环过程中 left <= right 一定成立，因此写 while (true)  就可以
        while (true) {
            int index = partition(arr, left, right);
            if (index == k - 1) {
                break;
            } else if (index < k - 1) {
                left = index + 1;
            } else {
                right = index - 1;
            }
        }

        int[] res = new int[k];
        System.arraycopy(arr, 0, res, 0, k);
        return res;
    }

    private int partition(int[] arr, int left, int right) {
        // 随机选择 arr[left..right] 中的元素作为 pivot，为什么传 right - left + 1 请见代码后的「说明」
        int randomIndex = left + random.nextInt(right - left + 1);
        swap(arr, left, randomIndex);

        // 保持循环不变的性质：lt 是 less than 的缩写
        // arr[left + 1..lt] < pivot
        // arr(lt..i) >= pivot
        int lt = left;
        int pivot = arr[left];
        for (int i = left + 1; i <= right; i++) {
            if (arr[i] < pivot) {
                lt++;
                swap(arr, i, lt);
            }
        }

        // 这一步比较容易忘掉，必须要交换以后返回 lt
        swap(arr, left, lt);
        return lt;
    }

    private void swap(int[] arr, int index1, int index2) {
        int temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }
}
```

**说明**：

- `random.nextInt(i)` 返回 `[0..i)` 里的一个随机整数，我们需要返回 `[left..right]` 里的随机整数，这个区间的长度为 `right - left + 1`，代入 `[0..i)` ，得 `[0..right - left + 1) = [0..right - left]`，再在前面加上 `left` 正好可以得到 `[left..right]`；
- 需要随机选择基准元素，是为了防止最坏的情况出现（顺序数组或者逆序数组），避免时间复杂度提升。

**复杂度分析**：

- 时间复杂度：$O(N)$，这部分由于切分元素是随机选择的，避免了最坏情况出现，具体的复杂度分析请见《算法导论》第 9.2 节《期望为线性的时间的选择算法》。我是这么理解的，并不严谨：
  - 重点在这里：由于切分元素是「随机选择」的，所以遇到递归树倾斜（第一次选到最小值、第二次选到第 2 小的值）的概率非常低；
  - 有一定概率头几次就能选到下标为 $k - 1$ 的元素；
  - 第 1 次虽然要遍历整个数组，时间复杂度为 $O(N)$，但是后面遍历的时候，遍历的范围在不断缩小（每一次大概可以砍掉一半），而且遍历的次数是 $O(\log N)$ 这个级别的；
  - $\log N$ 是个增长很缓慢的函数，所以综上，可以认为「快速选择算法」将数组看了常数次，这个常数不确定，但不会很大，所以时间复杂度为 $O(N)$。复杂度分析会用到「期望」这个数学概念。
- 空间复杂度：$O(k)$，这里 $k$ 是保存结果的数组的长度。

---

分享几个缩写 ^\_^，周末愉快！

| 缩写 | 全程                     | 翻译     |
| ---- | ------------------------ | -------- |
| lt   | less than                | 小于     |
| le   | less than or equal to    | 小于等于 |
| ge   | greater than or equal to | 大于等于 |
| gt   | greater than             | 大于     |
| eq   | equal to                 | 等于     |
| ne   | not equal to             | 不等于   |
