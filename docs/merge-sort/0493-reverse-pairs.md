---
title: 「力扣」第 493 题：计算翻转对（困难）
icon: yongyan
category: 归并排序
tags:
  - 分而治之
---




**参考代码**：

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
```