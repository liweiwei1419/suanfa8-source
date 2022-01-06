---
title: 「力扣」第 477 题：汉明距离总和（中等）
icon: yongyan
category: 位运算
tags:
  - 位运算
---


+ 题目链接：[477. 汉明距离总和](https://leetcode-cn.com/problems/total-hamming-distance/)。


## 

传送门：

> 两个整数的 [汉明距离](https://baike.baidu.com/item/%E6%B1%89%E6%98%8E%E8%B7%9D%E7%A6%BB/475174?fr=aladdin) 指的是这两个数字的二进制数对应位不同的数量。
>
> 计算一个数组中，任意两个数之间汉明距离的总和。
>
> **示例:**
>
> ```
> 输入: 4, 14, 2
> 
> 输出: 6
> 
> 解释: 在二进制表示中，4表示为0100，14表示为1110，2表示为0010。（这样表示是为了体现后四位之间关系）
> 所以答案为：
> HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.
> ```
>
> **注意:**
>
> 1. 数组中元素的范围为从 `0`到 `10^9`。
> 2. 数组的长度不超过 `10^4`。

Java 代码：某一位上 $1$ 的数量乘上 $0$ 的数量就是这一位对结果的贡献，当某一位上全是 $0$ 时就没有继续计算下去的必要了。

```java
/**
 * 计算任意汉明距离总和
 */
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

    public static void main(String[] args) {
        int[] nums = new int[]{4, 14, 2};
        Solution solution = new Solution();
        int totalHammingDistance = solution.totalHammingDistance(nums);
        System.out.println(totalHammingDistance);
    }
}
```

### 