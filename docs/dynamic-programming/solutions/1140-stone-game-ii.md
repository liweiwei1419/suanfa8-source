---
title: 「力扣」第 1140 题：石子游戏 II（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---


+ 题目链接：[1140. 石子游戏 II](https://leetcode-cn.com/problems/stone-game-ii/)；
+ 题解链接：[记忆化递归（Java）](https://leetcode-cn.com/problems/stone-game-ii/solution/ji-yi-hua-di-gui-java-by-liweiwei1419/)。



对博弈类问题比较生疏的时候，可以画图去理解「博弈」的过程，我在下面这张图上没有办法很详细地展示整个思维过程，因此简单说一下思路。

**思路分析**：
+ 我们是这样设计状态的（很重要，这样的状态设计会给转移带来一定方便）：当前做决策的人，拿石子的时候得分为正，留给下一轮队手选择的时候，得分为负，因此定义的分数是 **相对分数**；
+ 这一轮可以选择的石子堆数，与上一轮相关，因此需要设置一个参数 $M$（和题目中的 $M$ 意思一样），表示当前可以选择的石子堆数；
+ **从叶子结点开始向上每一步进行选择和比较**，这样的做法才叫做「假设亚历克斯和李都发挥出最佳水平」，即每个人都让自己的利益最大化，等价于「让他人利益最小化」，这是因为石子的总数是固定的。

![image.png](https://pic.leetcode-cn.com/fc85a9f3b4e932e2d5b80ed5c570e414aa541a92a6924068ecdac974cdf6a586-image.png)


### 方法一：记忆化递归

一些细节：

+ 由于拿的都是左边的连续的石子堆，需要先计算一下前缀和，然后计算区间和；
+ 当前区间（或者说由左边界 `begin` 决定的剩下的区间，右边界一定是 `len - 1`）里的石子堆数小于等于 $2M$ 的时候，全部拿走，是使得自己获利最多的做法；
+ 否则的话，就需要枚举拿 1 堆、2 堆、3 堆的时候，选出一个**当对手利益最大化的时候**，自己利益最大化的选择；
+ 由于 `memo` 或者说 `dfs` 定义的是「相对分数」，因此输出的时候，还要做一个小的转化。


```Java []
public class Solution {

    // 一开始把这道题和区间 dp 联系在一起，是不对的

    public int stoneGameII(int[] piles) {
        int len = piles.length;
        int[][] memo = new int[len][len + 1];

        // [i, j] 的前缀和 preSum[j + 1] - preSum[i]
        int[] preSum = new int[len + 1];
        for (int i = 0; i < len; i++) {
            preSum[i + 1] = preSum[i] + piles[i];
        }
//        x + y = preSum[len];
//        x - y = res;
        int res = dfs(piles, 0, 1, preSum, memo);
        // 由于得到的是相对分数，需要转换成为绝对分数
        return (preSum[len] + res) / 2;
    }

    /**
     * @param piles
     * @param begin 定义石子堆的起始下标，即在 [start, len - 1] 这个区间里取石子
     * @param M     当前先手可以拿 [1, 2 * M] 堆石子（如果石子数够的话）
     * @param memo
     * @return 当前玩家在区间 [start, len - 1] 这个区间里取石子，得到的「相对分数」
     */
    private int dfs(int[] piles, int begin, int M, int[] preSum, int[][] memo) {
        int len = piles.length;
        if (begin >= len) {
            return 0;
        }

        if (memo[begin][M] != 0) {
            return memo[begin][M];
        }
        // 当前区间 [begin, len - 1] 的元素个数 len - begin <= 2M 的时候，
        // 全部拿走是利益最大的，这是因为 1 <= piles[i] <= 10 ^ 4
        if (len - begin <= 2 * M) {
            memo[begin][M] = preSum[len] - preSum[begin];
            return preSum[len] - preSum[begin];
        }

        // 走到这里，可以取的石子堆数 1 <= X <= 2M
        // 区间 [begin, j] 的长度 j - begin + 1 >= 2 * M
        int minLen = Math.min(2 * M, len - begin);
        // 这个初始化很重要，因为有可能是负分，所以不能初始化为 0
        int res = Integer.MIN_VALUE;
        for (int X = 1; X <= minLen; X++) {
            // 区间 [begin, begin + X - 1] 的前缀和 = preSum[begin + X] - preSum[begin - 1]
            int chooseLeft = preSum[begin + X] - preSum[begin];
            res = Math.max(res, chooseLeft - dfs(piles, begin + X, Math.max(M, X), preSum, memo));
        }
        memo[begin][M] = res;
        return res;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] piles = new int[]{2, 7, 9, 4, 4};
        int res = solution.stoneGameII(piles);
        System.out.println(res);
    }
}
```

### 方法二：动态规划

「自底向上」填表格。因为题目中说，只能拿前面 `X` 堆。这里要注意：**从后向前推，才能保证无后效性**。

这道题要转换成为「动态规划」，高赞 [题解](https://leetcode-cn.com/problems/stone-game-ii/solution/java-dong-tai-gui-hua-qing-xi-yi-dong-17xing-by-lg/) 已经解释得很详细了。

由于我们总是先计算小的后缀区间的值，然后再计算大的后缀区间的值，因此在遍历的时候，`i` 需要倒着遍历。

他的 dp 数组的定义和我的方法一的 memo 不一样，他的 `dp[i][j]` 是指区间 `[i, len - 1]` 里先手能够获得的最大石子数（不是相对分数）。


我做了一点修改，使用了后缀数组计算区间和（和原作者的思想是一样的）。

```Java []
import java.util.Arrays;

public class Solution {

    // 动态规划（后缀数组）

    public int stoneGameII(int[] piles) {
        int len = piles.length;

        // 后缀和
        int[] suffixSum = new int[len + 1];
        suffixSum[len] = 0;

        // 区间 [i..len - 1] 的后缀和 = suffixSum[i]
        // 区间 [i..j] 的后缀和 suffixSum[i] - suffixSum[j - 1]
        for (int i = len - 1; i >= 0; i--) {
            suffixSum[i] = suffixSum[i + 1] + piles[i];
        }

        // dp[i][j] 表示：区间 piles[i..len - 1] 里取出 j 堆石子，当前先手能够获得的分数（注意：不是相对分数）
        int[][] dp = new int[len][len + 1];
        for (int i = len - 1; i >= 0; i--) {
            // 枚举 M：从取左边 1 堆石头，到 len 堆石头
            for (int M = 1; M <= len; M++) {
                // 至少要取 1 堆，i + 2 * M >= len 说明 [i, len - 1] 这个区间里所有的石头都可以拿走
                if (i + 2 * M >= len) {
                    dp[i][M] = suffixSum[i];
                    continue;
                }
                
                // 枚举 X，此时 i + 2 * M < len，X <= 2 * M 保证了 i + X < len
                for (int X = 1; X <= 2 * M; X++) {
                    // 这里 X 可以理解为下标偏移，也可以理解为选取的石子堆数量
                    dp[i][M] = Math.max(dp[i][M], suffixSum[i] - dp[i + X][Math.max(X, M)]);
                }
            }
        }
        return dp[0][1];
    }
}
```
