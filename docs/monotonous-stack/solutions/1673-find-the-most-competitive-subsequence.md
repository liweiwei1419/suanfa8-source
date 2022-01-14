---
title: 「力扣」第 1673 题：找出最具竞争力的子序列（中等）
icon: yongyan
category: 栈
tags:
  - 栈
  - 单调栈
---

![1673](https://tva1.sinaimg.cn/large/008i3skNgy1gx91o0sonqj30p00an3z5.jpg)

- 题目链接：[1673. 找出最具竞争力的子序列](https://leetcode-cn.com/problems/find-the-most-competitive-subsequence/)；
- 题解链接：[栈（Java）](https://leetcode-cn.com/problems/find-the-most-competitive-subsequence/solution/zhan-java-by-liweiwei1419-rkac/)。

## 题目描述

给你一个整数数组 `nums` 和一个正整数 `k` ，返回长度为 `k` 且最具 **竞争力** 的 `nums` 子序列。

数组的子序列是从数组中删除一些元素（可能不删除元素）得到的序列。

在子序列 `a` 和子序列 `b` 第一个不相同的位置上，如果 `a` 中的数字小于 `b` 中对应的数字，那么我们称子序列 `a` 比子序列 `b`（相同长度下）更具 **竞争力** 。例如，`[1,3,4]` 比 `[1,3,5]` 更具竞争力，在第一个不相同的位置，也就是最后一个位置上， `4` 小于 `5` 。

**示例 1：**

```
输入：nums = [3,5,2,6], k = 2
输出：[2,6]
解释：在所有可能的子序列集合 {[3,5], [3,2], [3,6], [5,2], [5,6], [2,6]} 中，[2,6] 最具竞争力。
```

**示例 2：**

```
输入：nums = [2,4,3,3,5,4,9,6], k = 4
输出：[2,3,3,4]
```

**提示：**

- `1 <= nums.length <= 105`
- `0 <= nums[i] <= 109`
- `1 <= k <= nums.length`

## 理解题意

- **子序列的定义**：数组的子序列是从数组中删除一些元素（可能不删除元素）得到的序列。**注意**：「子序列」的定义要求这些元素保持在原数组中的相对位置；
- 题目中「最小竞争力」的定义类似于「字典序最小」。如果做过 [316. 去除重复字母](/problems/remove-duplicate-letters/) 、 [402. 移掉 K 位数字](/problems/remove-k-digits/) 和 [456. 132 模式](/problems/132-pattern/) 就会知道这道问题可能需要用到「栈」。因此我们需要分许为什么解决这道问题可以用「栈」。

## 为什么想到用「栈」

看「示例 1」

```
输入：nums = [3, 5, 2, 6], k = 2
```

保留 2 个元素，需要移除 2 个元素。依次读入输入数组到一个线性数据结构：

- 读到 3，加入 3，此时 `[3]`；
- 读到 5，加入 5，此时 `[3, 5]`；
- 读到 2，此时 2 比之前的 5 要小，因此可以舍弃 5，**这是因为** `[3, 2, ...]` 比 `[3, 5, ...]` 更具竞争力。同样地，2 比之前的 3 要小，因此可以舍弃 3，此时线性数据结构为空，加入 2。5 比 3 后加入线性数据结构，先出，**恰好符合「后进先出」的规律**，因此使用「栈」。
- 读到 6，加入 6，此时 `[2, 6]` 为所求。

::: danger 需要注意的地方

- 根据数组的长度和 `k` 计算可以移除的元素的个数，需要移除的时候才可以移除；
- 如果遍历完成以后还有可以删除的元素，应该从栈的末尾删除元素。这是因为「栈」中的元素恰好符合单调不减的特点，从末尾删除元素可以保证最具竞争力。
  :::

**参考代码 1**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public int[] mostCompetitive(int[] nums, int k) {
        int len = nums.length;
        if (k == len) {
            return nums;
        }

        // 需要移除的元素的个数
        int removeCount = len - k;
        Deque<Integer> stack = new ArrayDeque<>();
        for (int num : nums) {
            // 注意：只有在有元素可以移除的时候才可以移除
            while (removeCount > 0 && !stack.isEmpty() && num < stack.peekLast()) {
                stack.removeLast();
                removeCount--;
            }
            stack.addLast(num);
        }

        // 如果还有可以删除的元素，从末尾删除
        for (int i = 0; i < removeCount; i++) {
            stack.removeLast();
        }

        // 此时栈中的元素就是最具竞争力的数组，遍历栈赋值到数组上即可
        int[] res = new int[k];
        int index = k - 1;
        for (int i = 0; i < k; i++) {
            res[index] = stack.removeLast();
            index--;
        }
        return res;
    }
}
```

**说明**：这里用 `ArrayDeque` 是 Java 的文档 `Stack` 类里推荐的，使用带 `Last` 后缀的 API 是因为 `Array` 实现操作末尾复杂度为 $O(1)$，而 `Deque` 实现是循环数组，其实操作头尾都可以。只要当作栈来用，API 不必和我一样。

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是输入数组的大小，所有元素进栈一次、出栈一次；
- 空间复杂度：$O(N)$，栈的大小为 $N$。

这一类问题通常而言都可以在栈里先放入一个永远不可能被移除的元素，这样在循环的时候可以省去判断栈是否为空。根据题目给出的数据范围，这里放入小于等于 0 的整数就可以。

**参考代码 2**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public int[] mostCompetitive(int[] nums, int k) {
        int len = nums.length;
        if (k == len) {
            return nums;
        }

        int removeCount = len - k;
        Deque<Integer> stack = new ArrayDeque<>();
        // 哨兵
        stack.addLast(0);
        for (int num : nums) {
            // 因为有 0 的存在，栈一定非空，所以无需判断栈为空
            while (removeCount > 0 && num < stack.peekLast()) {
                stack.removeLast();
                removeCount--;
            }
            stack.addLast(num);
        }

        for (int i = 0; i < removeCount; i++) {
            stack.removeLast();
        }

        int[] res = new int[k];
        int index = k - 1;
        for (int i = 0; i < k; i++) {
            res[index] = stack.removeLast();
            index--;
        }
        return res;
    }
}
```

**复杂度分析**：(同「参考代码 1」)。

## 总结

子序列保持元素相对顺序，以及「最具竞争力」的定义决定了，解决这道问题恰好符合了「后进先出」的规律，因此可以使用「栈」，栈内的元素恰好保持了单调不减的特点。
