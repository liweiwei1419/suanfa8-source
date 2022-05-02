---
title: 「剑指 Offer」第 40 题：最小的 k 个数（中等）
icon: yongyan
category:
tags:
  - 快速排序
  - 优先队列
  - 减而治之
---

- 题目链接：[剑指 Offer 40. 最小的 k 个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)。

## 题目描述

输入整数数组 `arr` ，找出其中最小的 `k` 个数。例如，输入 4、5、1、6、2、7、3、8 这 8 个数字，则最小的 4 个数字是 1、2、3、4。

**示例 1：**

```
输入：arr = [3,2,1], k = 2
输出：[1,2] 或者 [2,1]
```

**示例 2：**

```
输入：arr = [0,1,2,1], k = 1
输出：[0]
```

**限制：**

- `0 <= k <= arr.length <= 10000`
- `0 <= arr[i] <= 10000`

## 方法一：减而治之

- 知识点：快速排序；
- 最小的 `k` 个数的：即下标区间为 `[0..k - 1]` 的这些数，使用 `partition` 过程找到下标为 k - 1 的那个数即可；

- 缺点：一次性得将所有元素读入内存。

**参考代码 1**：

```java
import java.util.Arrays;

public class Solution {

    public int[] getLeastNumbers(int[] arr, int k) {
        int len = arr.length;
        if (k == 0 || k > len) {
            return new int[0];
        }

        int target = k - 1;
        int left = 0;
        int right = len - 1;

        while (true) {
            int pIndex = partition(arr, left, right);

            if (pIndex == target) {
                int[] res = new int[k];
                System.arraycopy(arr, 0, res, 0, k);
                return res;
            } else if (pIndex < target) {
                // 下一轮搜索区间在 [pIndex + 1..right]
                left = pIndex + 1;
            } else {
                // pIndex > target
                // 下一轮搜索区间在 [left..pIndex - 1]
                right = pIndex - 1;
            }
        }
    }

    private int partition(int[] arr, int left, int right) {
        // 这里最好随机化

        // 循环不变量定义
        // [left + 1..lt] < pivot
        // (lt..i) >= pivot
        int pivot = arr[left];
        int lt = left;

        for (int i = left + 1; i <= right; i++) {
            if (arr[i] < pivot) {
                lt++;
                swap(arr, lt, i);
            }
        }
        swap(arr, left, lt);
        return lt;
    }

    private void swap(int[] arr, int index1, int index2) {
        int temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

    public static void main(String[] args) {
        int[] arr = {0, 0, 0, 2, 0, 5};
        int k = 0;

        Solution solution = new Solution();
        int[] res = solution.getLeastNumbers(arr, k);
        System.out.println(Arrays.toString(res));
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N \log N)$；
- 空间复杂度：$O(1)$。

## 方法二：优先队列

使用最大堆。

**参考代码 2**：

```java
import java.util.Arrays;
import java.util.PriorityQueue;

public class Solution {

    public int[] getLeastNumbers(int[] arr, int k) {

        int len = arr.length;
        if (k == 0 || k > len) {
            return new int[0];
        }

        // 应该使用大顶堆，传入 k 是为了防止扩容
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(k, (o1, o2) -> -o1 + o2);
        for (int i = 0; i < k; i++) {
            maxHeap.add(arr[i]);
        }

        for (int i = k; i < len; i++) {
            Integer head = maxHeap.peek();
            if (head > arr[i]) {
                // 这里应该使用 replace ，但是 Java 不提供
                maxHeap.poll();
                maxHeap.add(arr[i]);
            }
        }

        // 这样写一行太长，目前没找到更好的写法，意思就是直接读取最大堆里面的数组，而不去 poll
        return Arrays.stream(maxHeap.toArray(new Integer[0])).mapToInt(Integer::valueOf).toArray();
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] arr = {3, 2, 1};
        int k = 2;
        int[] res = solution.getLeastNumbers(arr, k);
        System.out.println(Arrays.toString(res));
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N \log K)$;
- 空间复杂度：$O(K)$。
