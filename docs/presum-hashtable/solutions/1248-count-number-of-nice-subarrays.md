---
title: 「力扣」第 1248 题：统计「优美子数组」（中等）
icon: yongyan
category: 前缀和
tags:
  - 前缀和
  - 哈希表
---

- 题目链接：[1248. 统计「优美子数组」](https://leetcode-cn.com/problems/count-number-of-nice-subarrays/)。

## 题目描述

给你一个整数数组 nums 和一个整数 k。

如果某个 连续 子数组中恰好有 k 个奇数数字，我们就认为这个子数组是「优美子数组」。

请返回这个数组中「优美子数组」的数目。

示例 1：

```
输入：nums = [1,1,2,1,1], k = 3
输出：2
解释：包含 3 个奇数的子数组是 [1,1,2,1] 和 [1,2,1,1] 。
```

示例 2：

```
输入：nums = [2,4,6], k = 1
输出：0
解释：数列中不包含任何奇数，所以不存在优美子数组。
```

示例 3：

```
输入：nums = [2,2,2,1,2,2,1,2,2,2], k = 2
输出：16
```

**提示**：

- `1 <= nums.length <= 50000`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= nums.length`

## 方法：前缀和

+ `count` 是哈希表，它记录了：`key` ：前缀里包含的奇数个数，`value` ：出现了多少次。

**参考代码**：

```java
public class Solution {

    public int numberOfSubarrays(int[] nums, int k) {
        int len = nums.length;
        int[] count = new int[len + 1];
        count[0] = 1;
        int res = 0;
        int preSum = 0;
        for (int num : nums) {
            // preSum += (num % 2 == 1 ? 1 : 0);
            preSum += (num & 1);
            count[preSum]++;
            if (preSum >= k) {
                res += count[preSum - k];
            }
        }
        return res;
    }
}
```

**复杂度分析**：

- 时间复杂度：
- 空间复杂度：。

