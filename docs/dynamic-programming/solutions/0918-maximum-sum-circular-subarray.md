---
title: 「力扣」第 918 题：环形子数组的最大和（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---


+ 题目链接：[918. 环形子数组的最大和](https://leetcode-cn.com/problems/maximum-sum-circular-subarray/)；
+ 题解链接：[动态规划（最大子段和） + 分治思想](https://leetcode-cn.com/problems/maximum-sum-circular-subarray/solution/dong-tai-gui-hua-zui-da-zi-duan-he-fen-zhi-si-xian/)。




首先先说明：

+ 这里给出的代码不是最优解，仅提供思路，但在理解了思路的基础上，相信大家能写出最优解；
+ 我个人认为「动态规划」问题，很多时候不优化空间，问题不大；
+ 在面对一个复杂问题的时候，先把思路搞清楚，先写出一版正确的代码是更重要的；
+ 写正确代码的前提是：
  + 不过早考虑优化的问题（这是一位计算机大牛说的，我个人很认同）；
  + 方法名、变量名语义清晰，保证代码可读性强。

> premature optimization is the root of all evil. （过早优化是万恶之源，「欧路词典」翻译）
>                                               —— Donald Knuth

分析：

+ 做这道题要基于 [「力扣」第 53 题：最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)；
+ 只是加了一个条件：子序和是「环形」的，也就是说「头尾相连」。

思路：

环形问题两种通常的思路：

1. 在原始数组后面再拼接一个同样的数组（这个思路我失败了，欢迎大家给意见）；
2. 分类讨论。

分类讨论的思路是，最优解来自以下两种情况：

+ 1、不考虑环形；
+ 2、考虑跨越两个相同数组交接部分的区域的最大字段和，等价于考虑「两个相同数组交接部分的区域的最小字段和」。
  + 这里注意一个细节：**求子区间的最小字段和，是不包括头尾的，因为包括了头尾结点的情况就与「不考虑环形」的情况有重复的部分**，分治应该保证「不重不漏」。

解释：「中间部分」最小，等价于「两头最大」。「两头最大」等价于「两个相同数组交接部分的区域和最大」。

以上两部分考虑最大值，因此这是分治的思想，分别考虑不同的情况，然后综合得出结论。


理解这个思路可以参考「国际版」讨论区的题解：[One Pass](https://leetcode.com/problems/maximum-sum-circular-subarray/discuss/178422/One-Pass) 。

![image.png](https://pic.leetcode-cn.com/db5a2b3733b878ffd26b12c079db767a61d92423b8bd0e3fcf0a6443894842d8-image.png)

说明：图片来自「国际版」讨论区的网友 motorix。




**参考代码**：

说明：

+ 下面的代码遍历了输入数组 4 遍，事实上完全可以只遍历 1 遍完成计算。感兴趣的朋友可以做一下，我个人觉得优化成看数组 2 遍就可以了，参考代码在上面给出的「国际版」讨论区里。



```Java []
import java.util.Arrays;

public class Solution {

    public int maxSubarraySumCircular(int[] A) {
        int len = A.length;
        // 特例判断
        if (len == 0) {
            return 0;
        }
        if (len == 1) {
            return A[0];
        }

        int maxSubArray = maxSubArray(A);
        int minSubArrayExcludeHeadAndTail = minSubArray(A);

        int sum = 0;
        for (int value : A) {
            sum += value;
        }
        return Math.max(maxSubArray, sum - minSubArrayExcludeHeadAndTail);
    }

    public int maxSubArray(int[] nums) {
        int len = nums.length;
        // dp[i]：以 nums[i] 结尾的「连续」子区间的最大和
        int[] dp = new int[len];
        dp[0] = nums[0];

        for (int i = 1; i < len; i++) {
            if (dp[i - 1] >= 0) {
                dp[i] = dp[i - 1] + nums[i];
            } else {
                // dp[i - 1] < 0 的时候，前面的部分丢弃
                dp[i] = nums[i];
            }
        }

        // 全局扫一遍，找到最大值
        int res = dp[0];
        for (int i = 1; i < len; i++) {
            res = Math.max(res, dp[i]);
        }
        return res;
    }

    public int minSubArray(int[] nums) {
        // 思路和 maxSubArray 完全一致，求最大的地方改成最小
        // 但这里求的区间和不包括头和尾
        int len = nums.length;

        // dp[i]：以 nums[i] 结尾的「连续」子区间的最小和
        int[] dp = new int[len];
        dp[0] = nums[0];

        // 注意 i 的下标
        for (int i = 1; i < len - 1; i++) {
            if (dp[i - 1] >= 0) {
                // 加上前面的数，会使得结果更大，因此前面的部分丢弃
                dp[i] = nums[i];
            } else {
                dp[i] = dp[i - 1] + nums[i];
            }
        }

        // 全局扫一遍，找到最小值
        int res = dp[0];
        for (int i = 1; i < len; i++) {
            res = Math.min(res, dp[i]);
        }
        return res;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        // int[] A = {1, -2, 3, -2};
        // int[] A = {5, -3, 5};
        int[] A = {3, -1, 2, -1};
        int res = solution.maxSubarraySumCircular(A);
        System.out.println(res);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是数组的长度，看了数组 4 遍，可以优化成看数组 2 遍，甚至 1 遍；
+ 空间复杂度：$O(N)$，保存 dp 数组使用 $2N$ 空间，可以优化到只使用常数空间。


