---
title: 「力扣」第 137 题：只出现一次的数字 II（中等）
icon: yongyan
category: 数组
tags:
  - 数组
---

+ 题目链接：[137. 只出现一次的数字 II](https://leetcode-cn.com/problems/single-number-ii)。


## 题目描述

> 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。
>
> 说明：
>
> 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
>
> 示例 1：
>
> ```
> 输入: [2,2,3,2]
> 输出: 3
> ```
>
>
> 示例 2：
>
> ```
> 输入: [0,1,0,1,0,1,99]
> 输出: 99
> ```

Java 代码：

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

（本节完）