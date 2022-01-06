---
title: 「力扣」第 136 题：只出现一次的数字（简单）
icon: yongyan
category: 数组
tags:
  - 数组
---

## 「力扣」第 136 题： 只出现一次的数字 

+ 链接：https://leetcode-cn.com/problems/single-number


## 题目描述

> 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
>
> 说明：
>
> 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
>
> 示例 1：
>
> ```
> 输入: [2,2,1]
> 输出: 1
> ```
>
> 示例 2：
>
> ```
> 输入: [4,1,2,1,2]
> 输出: 4
> ```

Java 代码：

```java
public class Solution {

    public int singleNumber(int[] nums) {
        int res = 0;
        for (int num : nums) {
            res ^= num;
        }
        return res;
    }

    public static void main(String[] args) {
        int[] nums = {2, 2, 1};
        Solution solution = new Solution();
        int singleNumber = solution.singleNumber(nums);
        System.out.println(singleNumber);
    }
}
```

Java 代码：

```java
public class Solution2 {

    public int singleNumber(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            throw new RuntimeException("数组元素为空，没有只出现一次的数字");
        }
        
        int res = nums[0];
        for (int i = 1; i < len; i++) {
            res ^= nums[i];
        }
        return res;
    }
}
```



（本节完）



