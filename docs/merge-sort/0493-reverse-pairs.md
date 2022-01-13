---
title: 「力扣」第 493 题：计算翻转对（困难）
icon: yongyan
category: 归并排序
tags:
  - 分而治之
---

- 题目链接：[493. 翻转对](https://leetcode-cn.com/problems/reverse-pairs/)。

## 题目描述

给定一个数组 `nums` ，如果 `i < j` 且 `nums[i] > 2*nums[j]` 我们就将 `(i, j)` 称作一个**\*重要翻转对\***。

你需要返回给定数组中的重要翻转对的数量。

**示例 1:**

```
输入: [1,3,2,3,1]
输出: 2
```

**示例 2:**

```
输入: [2,4,3,5,1]
输出: 3
```

**注意:**

1. 给定数组的长度不会超过`50000`。
2. 输入数组中的所有数字都在 32 位整数的表示范围内。

::: warning 说明
因时间和精力关系，本题没有写详解，只给出了参考代码。读者可以在「力扣」这道题的评论区和题解区找到适合自己的思路分析和代码。如果确实需要我编写具体的解题思路，可以发邮件到 liweiwei1419@gmail.com。
:::

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int reversePairs(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return 0;
        }

        int[] copy = new int[len];
        for (int i = 0; i < len; i++) {
            copy[i] = nums[i];
        }
        int[] temp = new int[len];
        return reversePairs(copy, 0, len - 1, temp);
    }

    private int reversePairs(int[] nums, int left, int right, int[] temp) {
        if (left == right) {
            return 0;
        }

        int mid = (left + right) / 2;
        int leftPairs = reversePairs(nums, left, mid, temp);
        int rightPairs = reversePairs(nums, mid + 1, right, temp);
        int crossPairs = mergeAndCount(nums, left, mid, right, temp);
        return leftPairs + rightPairs + crossPairs;
    }

    private int mergeAndCount(int[] nums, int left, int mid, int right, int[] temp) {
        for (int i = left; i <= right; i++) {
            temp[i] = nums[i];
        }

        // 第 1 步：计算超级逆序数，j 归并回去的时候计算逆序关系
        int i = left;
        int j = mid + 1;
        int count = 0;
        while (i <= mid && j <= right) {
            // nums[i] > 2 * nums[j] 防止乘 2 溢出，所以进行类型转换
            if ((long) temp[i] > 2 * (long) temp[j]) {
                // 右边归并回去的时候计算逆序数
                count += (mid - i + 1);
                j++;
            } else {
                i++;
            }
        }

        // 第 2 步：这一步让 nums[left..right] 有序
        i = left;
        j = mid + 1;
        for (int k = left; k <= right; k++) {
            if (i == mid + 1) {
                nums[k] = temp[j];
                j++;
            } else if (j == right + 1) {
                nums[k] = temp[i];
                i++;
            } else if (temp[i] <= temp[j]) {
                nums[k] = temp[i];
                i++;
            } else {
                nums[k] = temp[j];
                j++;
            }
        }
        return count;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public int reversePairs(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return 0;
        }

        int[] copy = new int[len];
        for (int i = 0; i < len; i++) {
            copy[i] = nums[i];
        }
        int[] temp = new int[len];
        return reversePairs(copy, 0, len - 1, temp);
    }

    private int reversePairs(int[] nums, int left, int right, int[] temp) {
        if (left == right) {
            return 0;
        }

        int mid = (left + right) / 2;
        int leftPairs = reversePairs(nums, left, mid, temp);
        int rightPairs = reversePairs(nums, mid + 1, right, temp);
        int crossPairs = mergeAndCount(nums, left, mid, right, temp);
        return leftPairs + rightPairs + crossPairs;
    }

    private int mergeAndCount(int[] nums, int left, int mid, int right, int[] temp) {
        for (int i = left; i <= right; i++) {
            temp[i] = nums[i];
        }

        // 第 1 步：计算超级逆序数，j 归并回去的时候计算逆序关系
        int i = left;
        int j = mid + 1;
        int count = 0;
        while (i <= mid && j <= right) {
            // nums[i] > 2 * nums[j] 防止乘 2 溢出，所以进行类型转换
            if ((long) temp[i] > 2 * (long) temp[j]) {
                // 右边归并回去的时候计算逆序数
                count += (mid - i + 1);
                j++;
            } else {
                i++;
            }
        }

        // 第 2 步：这一步让 nums[left..right] 有序
        i = left;
        j = mid + 1;
        for (int k = left; k <= right; k++) {
            if (i == mid + 1) {
                nums[k] = temp[j];
                j++;
            } else if (j == right + 1) {
                nums[k] = temp[i];
                i++;
            } else if (temp[i] <= temp[j]) {
                nums[k] = temp[i];
                i++;
            } else {
                nums[k] = temp[j];
                j++;
            }
        }
        return count;
    }
}
````

</CodeGroupItem>
</CodeGroup>
