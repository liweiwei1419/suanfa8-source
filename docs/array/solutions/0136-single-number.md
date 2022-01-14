---
title: 「力扣」第 136 题：只出现一次的数字（简单）
icon: yongyan
category: 数组
tags:
  - 数组
---

- 题目链接：[136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/)。

## 题目描述

给定一个**非空**整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

**说明：**

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

**示例 1:**

```
输入: [2,2,1]
输出: 1
```

**示例 2:**

```
输入: [4,1,2,1,2]
输出: 4
```

**Example 3:**

```
Input: nums = [1]
Output: 1
```

**Constraints:**

- `1 <= nums.length <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`
- Each element in the array appears twice except for one element which appears only once.

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int singleNumber(int[] nums) {
        int res = 0;
        for (int num : nums) {
            res ^= num;
        }
        return res;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public int singleNumber(int[] nums) {
        int len = nums.length;
        int res = nums[0];
        for (int i = 1; i < len; i++) {
            res ^= nums[i];
        }
        return res;
    }
}
````

</CodeGroupItem>
</CodeGroup>
