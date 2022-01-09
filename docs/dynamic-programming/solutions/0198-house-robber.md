---
title: 「力扣」第 198 题：打家劫舍（简单）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

熟悉定义状态和状态转移，掌握「动态规划」的「自底向上」，递推去求解问题的方法。不是直接针对问题求解，而是把小规模的问题都解决了，再解决大问题。

+ 题目链接：[198. 打家劫舍](https://leetcode-cn.com/problems/house-robber)；
+ 题解链接：[回溯算法 + 剪枝（回溯经典例题详解）](https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-2/)。

## 题目描述

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警**。

给定一个代表每个房屋存放金额的非负整数数组，计算你**在不触动警报装置的情况下，**能够偷窃到的最高金额。

**示例 1:**

```
输入: [1,2,3,1]
输出: 4
解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
  偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 2:**

```
输入: [2,7,9,3,1]
输出: 12
解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
  偷窃到的最高金额 = 2 + 9 + 1 = 12 。
```


这一节我们讲解求线性规划问题的一般步骤：状态的定义和状态的转移。这里所说的一般步骤不是套路，而是求解这类问题必须要经历的两个步骤，动态规划的问题在算法问题中是比较具有艺术性的，一般而言没有固定的规律。


## 方法：动态规划（掌握「自底向上」思考问题的过程）

+ 定义成二维表格的动态规划
+ 技巧：增加哨兵，避免分类讨论

**参考代码**：

```java
public class Solution {

    public int rob(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }

        if (len == 1) {
            return nums[0];
        }

        // 0 表示不偷
        // 1 表示投
        // 多加 1 天表示哨兵，相应地要做一些偏移
        int[][] dp = new int[len + 1][2];
        for (int i = 1; i <= len; i++) {
            // 不偷由：昨天不偷，昨天偷转换而来
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] );

            // 偷由：只能由昨天不偷转换来
            // 注意这里有个偏移
            dp[i][1] =  dp[i - 1][0] + nums[i - 1];
        }
        
        return Math.max(dp[len][0],dp[len][1]);
    }
}
```



+ 定义成一维表格的动态规划

状态定义：`dp[i]` 表示子区间 `[0, i]` 在不触动警报装置的情况下，能够偷窃到的最高金额；

状态转移方程：分类讨论：（1）偷 `nums[i]`； （2）不偷 `nums[i]`。

**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int rob(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }
        if (len == 1) {
            return nums[0];
        }
        
        int[] dp = new int[len];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        for (int i = 2; i < len; i++) {
            // 在偷 nums[i] 与不偷 nums[i] 中选择一个最大值
            dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
        }
        return dp[len - 1];
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:

    def rob(self, nums):
        n = len(nums)
        if n == 0:
            return 0
        dp = [-1] * n

        # 前面这 4 行都是特判
        if n <= 2:
            return max(nums)
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])

        # 状态的定义 dp[i]，考虑 [0,i] （包括物品 i 在内），能够偷取的物品的最大价值
        for i in range(2, n):
            # num[i] 偷和不偷，在这两种情况中选择一种
            dp[i] = max(nums[i] + dp[i - 2], dp[i - 1])
        return dp[-1]
```
</CodeGroupItem>
</CodeGroup>

+ 不同的状态定义（这个状态定义不太自然，仅供参考）

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    // dp[i]：区间 [i, len - 1] 偷取的最大价值

    public int rob(int[] nums) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }

        if (len == 1) {
            return nums[0];
        }

        int[] dp = new int[len];
        dp[len - 1] = nums[len - 1];
        dp[len - 2] = Math.max(nums[len - 1], nums[len - 2]);

        for (int i = len - 3; i >= 0; i--) {
            dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
        }
        return dp[0];
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        size = len(nums)
        
        if size == 0:
            return 0

        if size <= 2:
            return max(nums)
        
        pre = nums[0]
        cur = max(nums[0], nums[1])
        
        for i in range(2, size):
            temp = cur # 因为 cur 会被覆盖，所以先把 cur 存一下，最后再赋值给 pre
            cur = max(cur, pre + nums[i])
            pre = temp
        return cur
```
</CodeGroupItem>
</CodeGroup>



+ 技巧：状态压缩（不用掌握，仅供参考，个人觉得这样的写法理解起来很费劲，不容易维护）

提示：状态转移，如果使用滚动变量的写法，可以把空间复杂度降到 $O(1)$。













