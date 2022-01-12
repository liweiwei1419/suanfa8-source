---
title: 「力扣」第 1493 题：删掉一个元素以后全为 1 的最长子数组（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

- 题目链接：[1493. 删掉一个元素以后全为 1 的最长子数组](https://leetcode-cn.com/problems/longest-subarray-of-1s-after-deleting-one-element/)。

## 题目描述

给你一个二进制数组 `nums` ，你需要从中删掉一个元素。

请你在删掉元素的结果数组中，返回最长的且只包含 1 的非空子数组的长度。

如果不存在这样的子数组，请返回 0 。

**提示 1：**

```
输入：nums = [1,1,0,1]
输出：3
解释：删掉位置 2 的数后，[1,1,1] 包含 3 个 1 。
```

**示例 2：**

```
输入：nums = [0,1,1,1,0,1,1,0,1]
输出：5
解释：删掉位置 4 的数字后，[0,1,1,1,1,1,0,1] 的最长全 1 子数组为 [1,1,1,1,1] 。
```

**示例 3：**

```
输入：nums = [1,1,1]
输出：2
解释：你必须要删除一个元素。
```

**示例 4：**

```
输入：nums = [1,1,0,0,1,1,1,0,1]
输出：4
```

**示例 5：**

```
输入：nums = [0,0,0]
输出：0
```

**提示：**

- `1 <= nums.length <= 10^5`
- `nums[i]` 要么是 `0` 要么是 `1` 。

---

## 思路分析

因为题目说：请你在删掉元素的结果数组中，返回最长的且只包含 1 的非空子数组的长度。所以最后返回的滑动窗口的长度要减 1。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int longestSubarray(int[] nums) {

        int len = nums.length;
        int left = 0;
        int right = 0;

        int ones = 0;

        int maxCount = 0;
        int res = 0;

        while (right < len) {
            if (nums[right] == 1) {
                ones++;
            }
            maxCount = Math.max(maxCount, ones);
            right++;
            // System.out.println(maxCount);
            while (right - left > maxCount + 1) {
                if (nums[left] == 1) {
                    ones--;
                }
                left++;
            }
            res = Math.max(res, right - left);
        }
        return res - 1;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        // int[] nums = {1, 1, 0, 1};
        // int[] nums = {0, 1, 1, 1, 0, 1, 1, 0, 1};
        // int[] nums = {1, 1, 1};
        // int[] nums = {1, 1, 0, 0, 1, 1, 1, 0, 1};
        int[] nums = {0, 0, 0};
        int res = solution.longestSubarray(nums);
        System.out.println(res);
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public int longestSubarray(int[] nums) {
        int len = nums.length;
        int left = 0;
        int right = 0;

        // 连续的 1 的个数
        int ones = 0;

        // 删除一个元素以后全为 1 的最长的子串的长度
        int maxCount = 0;
        int res = 0;

        while (right < len) {
            if (nums[right] == 1) {
                ones++;
            }
            maxCount = Math.max(maxCount, ones);
            right++;
            // maxCount + 1 里的 1 就表示删除的那个元素
            if (right - left > maxCount + 1) {
                if (nums[left] == 1) {
                    ones--;
                }
                left++;
            }
        }
        // 注意：这里返回 res 要减 1
        return right - left - 1;
    }
}
````

</CodeGroupItem>
</CodeGroup>
