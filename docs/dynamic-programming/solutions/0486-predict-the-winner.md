---
title: 「力扣」第 486 题：预测赢家（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---


+ 题目链接：[486. 预测赢家](https://leetcode-cn.com/problems/predict-the-winner/)；
+ 题解链接：[记忆化递归、动态规划（Java）](https://leetcode-cn.com/problems/predict-the-winner/solution/ji-yi-hua-di-gui-dong-tai-gui-hua-java-by-liweiwei/)。

## 题目描述

给你一个整数数组 `nums` 。玩家 1 和玩家 2 基于这个数组设计了一个游戏。玩家 1 和玩家 2 轮流进行自己的回合，玩家 1 先手。开始时，两个玩家的初始分值都是 `0` 。每一回合，玩家从数组的任意一端取一个数字（即，`nums[0]` 或 `nums[nums.length - 1]`），取到的数字将会从数组中移除（数组长度减 `1` ）。玩家选中的数字将会加到他的得分上。当数组中没有剩余数字可取时，游戏结束。

如果玩家 1 能成为赢家，返回 `true` 。如果两个玩家得分相等，同样认为玩家 1 是游戏的赢家，也返回 `true` 。你可以假设每个玩家的玩法都会使他的分数最大化。

**示例 1：**

```
输入：nums = [1,5,2]
输出：false
解释：一开始，玩家 1 可以从 1 和 2 中进行选择。
如果他选择 2（或者 1 ），那么玩家 2 可以从 1（或者 2 ）和 5 中进行选择。如果玩家 2 选择了 5 ，那么玩家 1 则只剩下 1（或者 2 ）可选。 
所以，玩家 1 的最终分数为 1 + 2 = 3，而玩家 2 为 5 。
因此，玩家 1 永远不会成为赢家，返回 false 。
```

**示例 2：**

```
输入：nums = [1,5,233,7]
输出：true
解释：玩家 1 一开始选择 1 。然后玩家 2 必须从 5 和 7 中进行选择。无论玩家 2 选择了哪个，玩家 1 都可以选择 233 。
最终，玩家 1（234 分）比玩家 2（12 分）获得更多的分数，所以返回 true，表示玩家 1 可以成为赢家。
```



**提示：**

- `1 <= nums.length <= 20`
- `0 <= nums[i] <= 10^7`

## 思路分析

可以先看一下本题解的置顶评论，他的 **净胜分** 的定义和 **状态转移方程的解释** 是更清楚的。（2020 年 9 月 1 日补充）

---

特别提示：这里定义 `dp[i][j]` 表示作为先手，在区间 `nums[i..j]` 里进行选择可以获得的**相对分数**。相对分数的意思是：**当前自己的选择得分为正，对手的选择得分为负**。「记忆化递归」里递归函数的返回值也类似地去理解。这种定义是比较常见的，也是符合当前这个问题的直接的定义。

在这个定义下，只需要判断输出 `>= 0` 即可。

大家在看其他朋友的题解的时候，要 **注意看清楚他们的定义**，不同定义下，状态转移方程和输出是不一样的。

---


这一题和「力扣」第 877 题：[石子游戏](https://leetcode-cn.com/problems/stone-game/) 很像。不同的地方在于：

+ 这一题的分数为非负整数，也就是说可以为 $0$；
+ 这一题可能会出现平局；
+ 这一题没有限制数组的长度一定为偶数，并且分数总和为奇数，在这两个条件下，先手必胜。

因此只能使用「动态规划」（包括「记忆化递归」）去做。画图的过程和解释请参考 [题解](https://leetcode-cn.com/problems/stone-game/solution/ji-yi-hua-di-gui-dong-tai-gui-hua-shu-xue-jie-java/) ，由于我是先做了石子问题，所以在那道问题的里的题解会写得比较详细一点。


## 方法一：记忆化递归

```Java []
import java.util.Arrays;

public class Solution {

    public boolean PredictTheWinner(int[] nums) {
        int len = nums.length;
        int[][] memo = new int[len][len];

        for (int i = 0; i < len; i++) {
            Arrays.fill(memo[i], Integer.MIN_VALUE);
        }
        return dfs(nums, 0, len - 1, memo) >= 0;
    }

    private int dfs(int[] nums, int i, int j, int[][] memo) {
        if (i > j) {
            return 0;
        }

        if (memo[i][j] != Integer.MIN_VALUE) {
            return memo[i][j];
        }
        int chooseLeft = nums[i] - dfs(nums, i + 1, j, memo);
        int chooseRight = nums[j] - dfs(nums, i, j - 1, memo);
        memo[i][j] = Math.max(chooseLeft, chooseRight);
        return memo[i][j];
    }
}
```

## 方法二：动态规划

状态定义：`dp[i][j]` 表示作为先手，在区间 `nums[i..j]` 里进行选择可以获得的 **相对分数**。相对分数的意思是：**当前自己的选择得分为正，对手的选择得分为负**。

![image.png](https://pic.leetcode-cn.com/2c83432526cd010aa5014ee6b900d1dcd1dc1e01085f4d26f85cd500543c9239-image.png)


**填表方式 1**：


![image.png](https://pic.leetcode-cn.com/e755b22fed079f160524fb0cc8433cde7afc5af2841fbdd58159c63a952f6118-image.png)



```Java []
public class Solution {

    // 状态转移方程：dp[i][j] = max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1])

    public boolean PredictTheWinner(int[] nums) {
        int len = nums.length;
        int[][] dp = new int[len][len];

        // dp[i][j]：作为先手，在区间 nums[i..j] 里进行选择可以获得的相对分数
        for (int i = 0; i < len; i++) {
            dp[i][i] = nums[i];
        }
        
        for (int i = len - 2; i >= 0; i--) {
            for (int j = i + 1; j < len; j++) {
                dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
            }
        }
        return dp[0][len - 1] >= 0;
    }
}
```

**填表方式 2**：

![image.png](https://pic.leetcode-cn.com/774b88e4332e5f93ebba7b1dd66aad35dcd2f7cd6c5680c2225f479be0947cfa-image.png)

```Java []
public class Solution {

    // 状态转移方程：dp[i][j] = max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1])

    public boolean PredictTheWinner(int[] nums) {
        int len = nums.length;
        int[][] dp = new int[len][len];
        
        // dp[i][j]：作为先手，在区间 nums[i..j] 里进行选择可以获得的相对分数
        for (int i = 0; i < len; i++) {
            dp[i][i] = nums[i];
        }

        for (int j = 1; j < len; j++) {
            for (int i = j - 1; i >= 0; i--) {
                dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
            }
        }
        return dp[0][len - 1] >= 0;
    }
}
```

