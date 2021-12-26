---
title: 「力扣」第 974 题：和可被 K 整除的子数组（中等）
icon: yongyan
category: 前缀和
tags: 
  - 前缀和
  - 哈希表
---

::: danger 说明
时间有限，未能详细编写，请大家理解，可以前往该题的题解区与评论区查看适合自己的题解。
:::


+ 题目链接：[974. 和可被 K 整除的子数组](https://leetcode-cn.com/problems/subarray-sums-divisible-by-k/)。

## 题目描述

给定一个整数数组 `A`，返回其中元素之和可被 `K` 整除的（连续、非空）子数组的数目。

**示例**：

```
输入：A = [4,5,0,-2,-3,1], K = 5
输出：7
解释：
有 7 个子数组满足其元素之和可被 K = 5 整除：
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
```

**提示：**

1. `1 <= A.length <= 30000`
2. `-10000 <= A[i] <= 10000`
3. `2 <= K <= 10000`


**参考代码**：

```java
public class Solution {

    public int subarraysDivByK(int[] A, int K) {
        int len = A.length;

        // 前缀和出现的次数
        // key: i 之前的前缀和，value：出现的次数
        int[] preSumCount = new int[K];
        preSumCount[0] = 1;

        int preSum = 0;
        int res = 0;
        for (int value : A) {
            preSum += value;

            int remainder = (preSum % K + K) % K;
            int count = preSumCount[remainder];
            res += count;

            preSumCount[remainder]++;

        }
        return res;
    }
}
```

Java 代码：
```java
public class Solution3 {

    // 哈希表

    public int subarraysDivByK(int[] A, int K) {
        int len = A.length;

        // 前缀和出现的次数
        // key: i 之前的前缀和，value：出现的次数
        int[] preSumCount = new int[K];
        preSumCount[0] = 1;

        int preSum = 0;
        int res = 0;
        for (int value : A) {
            preSum += value;

            // (preSum % K + K) % K 这句话要解释清楚
            int remainder = (preSum % K + K) % K;
            int count = preSumCount[remainder];
            res += count;

            preSumCount[remainder]++;

        }
        return res;
    }


    public static void main(String[] args) {

        int[] A = new int[]{4, 5, 0, -2, -3, 1};
        int K = 5;

//        int[] A = new int[]{-5};
//        int K = 5;
        Solution3 solution = new Solution3();
        int res = solution.subarraysDivByK(A, K);
        System.out.println(res);
    }
}
```
