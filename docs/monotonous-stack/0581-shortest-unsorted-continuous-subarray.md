---
title: 「力扣」第 581 题：最短无序连续子数组（中等）
icon: yongyan
category: 栈
tags:
  - 栈
  - 单调栈
---


+ 题目链接：[581. 最短无序连续子数组](https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/)；
+ 题解链接：[题解链接](https://blog.csdn.net/lw_power/article/details/106386048)。

## 题目描述

给你一个整数数组 `nums` ，你需要找出一个 **连续子数组** ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。

请你找出符合题意的 **最短** 子数组，并输出它的长度。

**示例 1：**

```
输入：nums = [2,6,4,8,10,9,15]
输出：5
解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
```

**示例 2：**

```
输入：nums = [1,2,3,4]
输出：0
```

**示例 3：**

```
输入：nums = [1]
输出：0
```

**提示：**

- $1 \le nums.length \le 10^4$
- $-10^5 \le nums[i] \le 10^5$

**进阶：** 你可以设计一个时间复杂度为 `O(n)` 的解决方案吗？

---

**摘要**：这道问题关键在于审题，题目只要求我们返回「最短的连续子区间」的长度。还可以借助「栈」的结论，通过 **出栈元素的下标** 找到需要修改的左边界最小值和右边界最大值。

**思路分析**：

+ 从左到右找比最大值，如果当前位置比最大值小，这个位置就要参与排序，找到 `rightBound`；
+ 从左到右找比最小值，如果当前位置比最小值大，这个位置就要参与排序，找到 `leftBound`。

**参考代码 1**：

```java
public class Solution {

    public int findUnsortedSubarray(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return 0;
        }

        int maxVal = nums[0];
        int rightBound = 0;
        for (int i = 1; i < len; i++) {
            maxVal = Math.max(maxVal, nums[i]);
            if (nums[i] < maxVal) {
                rightBound = i;
            }
        }

        int leftBound = len - 1;
        int minValue = nums[len - 1];
        for (int i = len - 2; i >= 0; i--) {
            minValue = Math.min(minValue, nums[i]);
            if (nums[i] > minValue) {
                leftBound = i;
            }
        }

        // 区间 [leftBound..rightBound] 需要参与排序
        if (rightBound > leftBound) {
            return rightBound - leftBound + 1;
        }
        return 0;
    }
}
```

**时间复杂度**：$O(N)$，这里 $N$ 是输入输入的长度。

如果熟悉「栈」的应用，就会知道，「栈」可以用于找左边第一个比自己大（或者小）的元素的位置。例如：

`[2, 6, 7, 8]` 后面来一个 `3` ，可以把前面的 `8`、`7`、`6` 依次拿掉。

**关键**：**出栈的时候记录下标**。

**参考代码 2**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public int findUnsortedSubarray(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return 0;
        }

        int leftBound = len - 1;
        int rightBound = 0;

        // 重点：栈用于找最近比 nums[i] 严格大的元素的下标
        Deque<Integer> stack = new ArrayDeque<>(len);
        for (int i = 0; i < len; i++) {
            // 这里有点绕：找右边比它严格小的元素
            // 保留的是最左边的下标
            // 这里的 while 不要忘记
            while (!stack.isEmpty() && nums[i] < nums[stack.peekLast()]) {
                leftBound = Math.min(leftBound, stack.removeLast());
            }
            stack.addLast(i);
        }

        stack.clear();
        for (int i = len - 1; i >= 0; i--) {
            while (!stack.isEmpty() && nums[i] > nums[stack.peekLast()]) {
                rightBound = Math.max(rightBound, stack.removeLast());
            }
            stack.addLast(i);
        }

        if (rightBound > leftBound) {
            return rightBound - leftBound + 1;
        }
        return 0;
    }
}
```

**时间复杂度**：$O(N)$，这里 $N$ 是输入输入的长度。所有的元素最多进栈一次、出栈一次。




## 题目描述

给你一个整数数组 `nums` ，你需要找出一个 **连续子数组** ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。

请你找出符合题意的 **最短** 子数组，并输出它的长度。

**示例 1：**

```
输入：nums = [2,6,4,8,10,9,15]
输出：5
解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
```

**示例 2：**

```
输入：nums = [1,2,3,4]
输出：0
```

**示例 3：**

```
输入：nums = [1]
输出：0
```

**提示：**

- $1 \le nums.length \le 10^4$
- $-10^5 \le nums[i] \le 10^5$


## 方法一：暴力解法

要归纳出：

+ 找到每个数左边第 1 个严格大于它的值的下标（构成逆序关系）；
+ 找到每个数右边第 1 个严格小于它的值的下标（也构成逆序关系）。

二者之差就是题目要找的「最短无序连续子数组」。

![在这里插入图片描述](https://tva1.sinaimg.cn/large/008i3skNgy1gxqotplgc9j30s20g6gn4.jpg)

**参考代码 1**：


```java
public class Solution {

    public int findUnsortedSubarray(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return 0;
        }

        // 从左到右找出最后一个单调不减的下标
        // 从右到左找出最后一个单调不增的下标
        int max = nums[0];
        int right = 0;
        for (int i = 1; i < len; i++) {
            max = Math.max(max, nums[i]);
            if (nums[i] < max) {
                right = i;
            }
        }
        // System.out.println(right);
        int left = len - 1;
        int min = nums[len - 1];
        for (int i = len - 2; i >= 0; i--) {
            min = Math.min(min, nums[i]);
            if (nums[i] > min) {
                left = i;
            }
        }
        // System.out.println(left);
        if (right > left) {
            return right - left + 1;
        }
        return 0;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {2, 6, 4, 8, 10, 9, 15};
        int res = solution.findUnsortedSubarray(nums);
        System.out.println(res);
    }
}
```

### 方法二：栈（单调栈）

**参考代码 2**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public int findUnsortedSubarray(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return 0;
        }

        int leftBound = len - 1;
        int rightBound = 0;

        Deque<Integer> stack = new ArrayDeque<>(len);
        for (int i = 0; i < len; i++) {
            // 这里的 while 不要忘记
            while (!stack.isEmpty() && nums[i] < nums[stack.peekLast()]) {
                leftBound = Math.min(leftBound, stack.removeLast());
            }
            stack.addLast(i);
        }
        
        stack.clear();

        for (int i = len - 1; i >= 0; i--) {
            while (!stack.isEmpty() && nums[i] > nums[stack.peekLast()]) {
                rightBound = Math.max(rightBound, stack.removeLast());
            }
            stack.addLast(i);
        }

        if (rightBound > leftBound) {
            return rightBound - leftBound + 1;
        }
        return 0;
    }
}
```

