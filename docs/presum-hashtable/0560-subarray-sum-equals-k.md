---
title: 「力扣」第 560 题：和为 K 的子数组（中等）
icon: yongyan
category: 前缀和
tags: 
  - 前缀和
  - 哈希表
---


::: danger 说明
分享一下，没有会员的朋友可以做类似 352 题的 560 题。
:::

+ 题目链接：[560. 和为 K 的子数组](https://leetcode-cn.com/problems/subarray-sum-equals-k/)；
- 题解链接：[暴力解法、前缀和、前缀和优化（Java）](https://leetcode-cn.com/problems/subarray-sum-equals-k/solution/bao-li-jie-fa-qian-zhui-he-qian-zhui-he-you-hua-ja/)。
## 方法一：暴力解法（超时）

- 枚举左右边界（超时）。

Java 代码：
```java
public class Solution {

    public int subarraySum(int[] nums, int k) {
        int len = nums.length;
        int count = 0;
        for (int left = 0; left < len; left++) {
            for (int right = left; right < len; right++) {

                int sum = 0;
                for (int i = left; i <= right; i++) {
                    sum += nums[i];
                }
                if (sum == k) {
                    count++;
                }
            }
        }
        return count;
    }
}
```
**复杂度分析**：

- 时间复杂度：![](https://cdn.nlark.com/yuque/__latex/9074405a1aeb2b91c003db60608401ef.svg#card=math&code=O%28N%5E3%29&height=23&width=49)，这里 ![](https://cdn.nlark.com/yuque/__latex/8d9c307cb7f3c4a32822a51922d1ceaa.svg#card=math&code=N&height=16&width=15) 是数组的长度；
- 空间复杂度：![](https://cdn.nlark.com/yuque/__latex/5e079a28737d5dd019a3b8f6133ee55e.svg#card=math&code=O%281%29&height=20&width=34)。
## 方法二：暴力解法的优化
固定了起点，即枚举左边界，时间复杂度降了一维。
Java 代码：
```java
public class Solution {

    public int subarraySum(int[] nums, int k) {
        int count = 0;
        int len = nums.length;
        for (int left = 0; left < len; left++) {
            int sum = 0;
            // 区间里可能会有一些互相抵销的元素
            for (int right = left; right < len; right++) {
                sum += nums[right];
                if (sum == k) {
                    count++;
                }
            }
        }
        return count;
    }
}
```
**复杂度分析**：

- 时间复杂度：![](https://cdn.nlark.com/yuque/__latex/8e9c5fee65a4f32abccd0e83ff203e39.svg#card=math&code=O%28N%5E2%29&height=23&width=49)，这里 ![](https://cdn.nlark.com/yuque/__latex/8d9c307cb7f3c4a32822a51922d1ceaa.svg#card=math&code=N&height=16&width=15) 是数组的长度；
- 空间复杂度：![](https://cdn.nlark.com/yuque/__latex/5e079a28737d5dd019a3b8f6133ee55e.svg#card=math&code=O%281%29&height=20&width=34)。
## 方法三：前缀和

- 构建前缀和数组，以便快速计算区间和；
- 注意在计算区间和的时候，下标有偏移。

Java 代码：
```java
public class Solution {

    public int subarraySum(int[] nums, int k) {
        int len = nums.length;
        // 计算前缀和数组
        int[] preSum = new int[len + 1];
        preSum[0] = 0;
        for (int i = 0; i < len; i++) {
            preSum[i + 1] = preSum[i] + nums[i];
        }

        int count = 0;
        for (int left = 0; left < len; left++) {
            for (int right = left; right < len; right++) {
                // 区间和 [left..right]，注意下标偏移
                if (preSum[right + 1] - preSum[left] == k) {
                    count++;
                }
            }
        }
        return count;
    }
}
```
**复杂度分析**：

- 时间复杂度：![](https://cdn.nlark.com/yuque/__latex/8e9c5fee65a4f32abccd0e83ff203e39.svg#card=math&code=O%28N%5E2%29&height=23&width=49)，这里 ![](https://cdn.nlark.com/yuque/__latex/8d9c307cb7f3c4a32822a51922d1ceaa.svg#card=math&code=N&height=16&width=15) 是数组的长度；
- 空间复杂度：![](https://cdn.nlark.com/yuque/__latex/33697ce7dfa48ba80980d298c8089378.svg#card=math&code=O%28N%29&height=20&width=41)。
## 方法四：前缀和 + 哈希表优化

- 使用哈希表加速运算；

这个思路不是很容易想到，需要多做一些类似的问题慢慢培养感觉。

- 同类问题有：
   - [「力扣」第 1 题：两数之和](https://leetcode-cn.com/problems/two-sum/)；
   - [「力扣」第 1248 题： 统计「优美子数组」](https://leetcode-cn.com/problems/count-number-of-nice-subarrays/)；
   - [「力扣」第 454 题：四数相加 II](https://leetcode-cn.com/problems/4sum-ii/)。

Java 代码：
```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int subarraySum(int[] nums, int k) {
        // key：前缀和，value：key 对应的前缀和的个数
        Map<Integer, Integer> preSumFreq = new HashMap<>();
        // 对于下标为 0 的元素，前缀和为 0
        preSumFreq.put(0, 1);

        int preSum = 0;
        int count = 0;
        for (int num : nums) {
            preSum += num;

            // 先获得前缀和为 preSum - k 的个数，加到计数变量里
            if (preSumFreq.containsKey(preSum - k)) {
                count += preSumFreq.get(preSum - k);
            }

            // 然后维护 preSumFreq 的定义
            preSumFreq.put(preSum, preSumFreq.getOrDefault(preSum, 0) + 1);
        }
        return count;
    }
}
```
**复杂度分析**：

- 时间复杂度：![](https://cdn.nlark.com/yuque/__latex/33697ce7dfa48ba80980d298c8089378.svg#card=math&code=O%28N%29&height=20&width=41)，这里 ![](https://cdn.nlark.com/yuque/__latex/8d9c307cb7f3c4a32822a51922d1ceaa.svg#card=math&code=N&height=16&width=15) 是数组的长度；
- 空间复杂度：![](https://cdn.nlark.com/yuque/__latex/33697ce7dfa48ba80980d298c8089378.svg#card=math&code=O%28N%29&height=20&width=41)。
