---
title: 「力扣」第 523 题：连续的子数组（中等）
icon: yongyan
category: 前缀和
tags: 
  - 前缀和
  - 哈希表
---


+ 题目链接：[523. 连续的子数组和](https://leetcode-cn.com/problems/continuous-subarray-sum/)。

**说明**：本题解修改自原始的官方题解，现在的官方题解已经被官方题解团队修改过。


## 思路分析

**概述**：

+ 这道问题我们使用三种方法，层层递进介绍了这个问题的解法，基本的思路是 **空间换时间**；
+ 如果空间使用恰当，可以减少遍历的次数；
+ 这道问题的方法二和方法三都很有代表性，大家需要仔细体会。

---

### 方法一：暴力解法（超时）

考虑所有长度 **大于等于** $2$ 的连续子数组，将各个子数组遍历一遍求和，并判断和是否是给定整数 $k$ 的倍数。

**参考代码 1**：

```Java []
public class Solution {

    public boolean checkSubarraySum(int[] nums, int k) {
        int len = nums.length;
        for (int left = 0; left < len - 1; left++) {
            for (int right = left + 1; right < len; right++) {
                int sum = 0;
                for (int i = left; i <= right; i++) {
                    sum += nums[i];
                }
                if (sum == k || (k != 0 && sum % k == 0)) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N^3)$ 。三重嵌套的 `for` 循环遍历数组；
+ 空间复杂度：$O(1)$ ，只用了常数个额外变量。

---

### 方法 2：前缀和（超时）

**基本思想**：空间换时间。

+ 注意到题目中我们求连续子数组的区间和；
+ 求区间和的一个基本的技巧是：根据前缀和的差，求出区间和。

**参考代码 2**：

```Java []
public class Solution {

    public boolean checkSubarraySum(int[] nums, int k) {
        int len = nums.length;

        // preSum[i] 表示：区间 [0..i) 的前缀和
        int[] preSum = new int[len + 1];
        preSum[0] = 0;
        for (int i = 0; i < len; i++) {
            preSum[i + 1] = preSum[i] + nums[i];
        }


        for (int left = 0; left < len - 1; left++) {
            for (int right = left + 1; right < len; right++) {
                int sum = preSum[right + 1] - preSum[left];
                if (sum == k || (k != 0 && sum % k == 0)) {
                    return true;
                }
            }
        }
        return false;
    }
}
```
**复杂度分析**

+ 时间复杂度： $O(n^2)$ 。为了考虑每一个子数组，我们需要一个 2 重嵌套的循环。
+ 空间复杂度： $O(n)$ 。 使用了长度为 $n$ 的 $sum$ 数组。



> 事实上，当前问题是一个计数问题，根据求解 [1. 两数之和](/problems/two-sum/) 的经验，我们可以在遍历的过程当中记录已经出现的信息，这样就可以通过一次遍历完成计算。已经遍历过的信息就需要记录下来，我们使用 **哈希表**。

---

### 方法 3：前缀与哈希表

使用哈希表保存到下标 $i$ 个止的元素的和，并且 **对这个前缀和除以 $k$ 取余数（请大家思考这是为什么？）**。

原因如下：遍历输入数组，记录到当前位置为止的 $sum\%k$，一旦我们找到新的 $sum\%k$ 的值（即在哈希表中没有这个值），我们就 **往哈希表中插入一条记录 key：`sum % k`，value：`i`**。

假设第 $i$ 个位置的 $sum % k$ 的值为 $rem$。如果以 $i$ 为左端点的任何子数组的和是 $k$ 的倍数，假设该位置为 $j$ ，那么哈希表中第 $j$ 个元素保存的值为 $(rem + n*k)\%k$ ，其中 $n > 0$ 整数。发现 $(rem + n*k)\%k = rem$ ，也就是跟第 $i$ 个元素保存到哈希表 中的值相同。

基于这一观察，可以得出结论：

无论何时，只要 $sum\%k$ 的值已经被放入哈希表，代表着有两个下标 $i$ 和 $j$ ，它们之间元素的和是 $k$ 的整数倍。因此只要哈希表中有相同的 $sum\%k$ ，就可以直接返回 $\teat{True}$ 。

下面的幻灯片描述了数组 `nums = [2, 5, 33, 6, 7, 25, 15]` 且 `k = 13` 的求解过程。


@slidestart

![image.png](https://pic.leetcode-cn.com/fff44f1a5a0d964210afb0dc29eccb594838ac5c042f383e63ffa2c9f1f337e0-image.png)

---

![image.png](https://pic.leetcode-cn.com/e4c4cdbd7f678e580a0c4b98bcb7d5ce34f0165012acdbcd332b8cc425a58eb5-image.png)

---

![image.png](https://pic.leetcode-cn.com/758b7f8f4ea5af1d91802792699591c435832f6e63c63d5a0deec701b368839e-image.png)

---

![image.png](https://pic.leetcode-cn.com/07cb8e8d956cc2d3a2d18df59d537d2e8ba75bbddde7f9de4f233663b70b8ff4-image.png)

---

![image.png](https://pic.leetcode-cn.com/2a09f77a87eee9396bba1b41a98eb5ef0ef5d64d126414b5c4bd63d1c16b54a4-image.png)

---

![image.png](https://pic.leetcode-cn.com/0a3a37abed5345ce6b70f877774674a8ccd3e31681f50d3b3917f0ea055c766c-image.png)


@slideend


```Java []
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public boolean checkSubarraySum(int[] nums, int k) {
        int sum = 0;

        // key：区间 [0..i] 里所有元素的和 % k
        // value：下标 i
        Map<Integer, Integer> map = new HashMap<>();
        // 理解初始化的意义
        map.put(0, -1);
        int len = nums.length;
        for (int i = 0; i < len; i++) {
            sum += nums[i];
            if (k != 0) {
                sum = sum % k;
            }
            
            if (map.containsKey(sum)) {
                if (i - map.get(sum) > 1) {
                    return true;
                }
            } else {
                map.put(sum, i);
            }

        }
        return false;
    }
}
```

**复杂度分析**

+ 时间复杂度：$O(N)$，仅需要遍历输入数组一遍；
+ 空间复杂度：$O(min(n,k))$。哈希表最多包含 $min(n,k)$ 个不同的元素。

