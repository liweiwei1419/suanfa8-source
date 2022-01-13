---
title: 「力扣」第 477 题：汉明距离总和（中等）
icon: yongyan
category: 位运算
tags:
  - 位运算
---

- 题目链接：[477. 汉明距离总和](https://leetcode-cn.com/problems/total-hamming-distance/)。

## 题目描述

两个整数的 [汉明距离](https://baike.baidu.com/item/汉明距离/475174?fr=aladdin) 指的是这两个数字的二进制数对应位不同的数量。

给你一个整数数组 `nums`，请你计算并返回 `nums` 中任意两个数之间 **汉明距离的总和** 。

**示例 1：**

```
输入：nums = [4,14,2]
输出：6
解释：在二进制表示中，4 表示为 0100 ，14 表示为 1110 ，2表示为 0010 。（这样表示是为了体现后四位之间关系）
所以答案为：
HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6
```

**示例 2：**

```
输入：nums = [4,14,4]
输出：4
```

**提示：**

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^9`
- 给定输入的对应答案符合 **32-bit** 整数范围

**参考代码**：

某一位上 $1$ 的数量乘上 $0$ 的数量就是这一位对结果的贡献，当某一位上全是 $0$ 时就没有继续计算下去的必要了。

```java
public class Solution {

    public int totalHammingDistance(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }
        int mask = 1;
        int total = 0;
        for (int i = 0; i < 32; i++) {
            // 在这个数位上有多少个 1
            int oneCount = 0;
            for (int num : nums) {
                if ((num & mask) > 0) {
                    oneCount++;
                }
            }
            total += ((len - oneCount) * oneCount);
            mask <<= 1;
        }
        return total;
    }
}
```
