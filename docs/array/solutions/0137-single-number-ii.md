---
title: 「力扣」第 137 题：只出现一次的数字 II（中等）
icon: yongyan
category: 数组
tags:
  - 数组
---

- 题目链接：[137. 只出现一次的数字 II](https://leetcode-cn.com/problems/single-number-ii)。

## 题目描述

给你一个整数数组 `nums` ，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次 。**请你找出并返回那个只出现了一次的元素。

**示例 1：**

```
输入：nums = [2,2,3,2]
输出：3
```

**示例 2：**

```
输入：nums = [0,1,0,1,0,1,99]
输出：99
```

**提示：**

- `1 <= nums.length <= 3 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `nums` 中，除某个元素仅出现 **一次** 外，其余每个元素都恰出现 **三次**

**进阶：**你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

**参考代码**：

```java
class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        int mask = 1;
        for (int i = 0; i < 32; i++) {
            int count = 0;
            for (int num : nums) {
                if ((num & mask) != 0) {
                    count++;
                }
            }
            if (count % 3 == 1) {
                res |= mask;
            }
            mask <<= 1;
        }
        return res;
    }
}
```
