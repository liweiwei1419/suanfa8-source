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

## 方法一：滑动窗口（数学）

## 方法二：前缀和、哈希表、差分

注意：这里比较难讲清楚。

```java
public class Solution {

    // 前缀和

    public int numberOfSubarrays(int[] nums, int k) {
        int len = nums.length;
        // preSum[i] 表示区间 [0..i) 的所有元素的和
        int[] preSum = new int[len + 1];
        // 表示前缀和为 0 的个数为 1，1 是乘法单位元
        preSum[0] = 1;

        // 目前为止看到的奇数的个数
        int odd = 0;
        int res = 0;
        for (int num : nums) {
            odd += num & 1;
            if (odd >= k) {
                // 注意：有一个单位的偏移
                res += preSum[odd - k];
            }
            preSum[odd] += 1;
        }
        return res;
    }
}
```

甜姨的题解：

```java
class Solution {
    public int numberOfSubarrays(int[] nums, int k) {
        // 数组 prefixCnt 的下标是前缀和（即当前奇数的个数），值是前缀和的个数。
        int[] prefixCnt = new int[nums.length + 1];
        prefixCnt[0] = 1;
        // 遍历原数组，计算当前的前缀和，统计到 prefixCnt 数组中，
        // 并且在 res 中累加上与当前前缀和差值为 k 的前缀和的个数。
        int res = 0, sum = 0;
        for (int num: nums) {
            sum += num & 1;
            prefixCnt[sum]++;
            if (sum >= k) {
                res += prefixCnt[sum - k];
            }
        }
        return res;
    }
}
```

**复杂度分析**：

- 时间复杂度：
- 空间复杂度：。

**参考代码**：

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int numberOfSubarrays(int[] nums, int k) {
        int len = nums.length;
        if (k <= 0 || len == 0 || len < k) {
            return 0;
        }

        int[] preSum = new int[len + 1];
        for (int i = 0; i < len; i++) {
            preSum[i + 1] = preSum[i] + (nums[i] & 1);
        }
        // 最多只需要 len 个，因此最后一个位置不用记录
        // 创建哈希表的时候，不用指定哈希表的大小，但编码规范建议在知道的情况下指定
        Map<Integer, Integer> map = new HashMap<>(len);
        map.put(0, 1);
        int res = 0;
        for (int i = 1; i < len + 1; i++) {
            // 如果 preSum[i] - k 是负值，也不会包含在 map 中
            if (map.containsKey(preSum[i] - k)) {
                res += map.get(preSum[i] - k);
            }
            map.put(preSum[i], map.getOrDefault(preSum[i], 0) + 1);
        }
        return res;
    }

    public static void main(String[] args) {
        int[] nums = {2, 2, 2, 1, 2, 2, 1, 2, 2, 2};
        Solution solution = new Solution();
        int k = 2;
        int res = solution.numberOfSubarrays(nums, k);
        System.out.println(res);
    }
}
```
