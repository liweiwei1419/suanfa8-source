---
title: 「力扣」第 877 题：石子游戏（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

+ 题目链接：[877. 石子游戏](https://leetcode-cn.com/problems/stone-game/)；
+ 题解链接：[记忆化递归、动态规划、数学解（Java）](https://leetcode-cn.com/problems/stone-game/solution/ji-yi-hua-di-gui-dong-tai-gui-hua-shu-xue-jie-java/)。



这是一道博弈论的动态规划问题，同时也是一个区间 dp 问题。需要注意的是：不管是「动态规划」还是「记忆化递归」，我们这里定义的都是「相对分数」，这种定义是可以推广开来的。

「相对分数」的意思是，我作为先手，得分是正分，而队手得分与我而言是负分。动态规划在状态转移的过程中，每一步考虑「相对分数」最大，即综合了「正分」和「负分」的结果得出最佳选择。

---

**思路分析**：每一轮玩家从行的开始或结束处取走整堆石头，决定了这个问题的**无后效性**，因此可以使用「动态规划」求解。

**题目中很关键的信息或条件**：
+ 每一次的选择：每次只能取一堆石子，或者在开始处，或者在结尾处；
+ 游戏终止条件：最后一堆石子被取走；
+ 获胜条件：哪一个玩家获得的石子总数最多。

我们依然是画图分析：

说明：图中的 ①②③④ 在图后面中有说明是如何做出最优选择的。
+ 绿色框表示当前 Alex 做出选择；
+ 蓝色框表示当前 Lee 做出选择。 

我们采用这样一种计算的方式，**当前自己做出选择的时候，得分为正，留给对方做选择的时候，相对于自己而言，得分为负**。

![image.png](https://pic.leetcode-cn.com/ed27118aa0cecc5d1f8c5c64f12894422359140606b8618f7b0bfa514ea58ffd-image.png)

① 先从只有 2 堆石子的时候开始考虑，当前做出选择的人，一定会选一个较大的，好让对方拿较少的。

② 再考虑这里，Lee 不管是选择 5 还是 3 ，在下一轮 Alex 按照最优选择，都会让自己比 Lee 多 1，为了让 Lee 总分更多，Lee 会选 5。此时 Lee 得到的相对分数就是 4。

③ 再考虑这里，Lee 可以选择 5 或者 4：
+ Lee 选择 5 的时候，下一轮 Alex 会让自己多 1 分，因此选择 5 的时候，Lee 的相对分数是  5 - 1  = 4，
+ Lee 选择 4 的时候，下一轮 Alex 会让自己多 2 分，因此选择 4 的时候，Lee 的相对分数是  4 - 2  = 2，
Lee 为了得到最多的分数，会选择 5。

④ 再考虑这里，Alex 可以选择左边 5 或者右边 5
+ Alex 选择左边 5 的时候，下一轮 Alex 会让自己多 4 分，因此选择左边 5 的时候，Alex 的相对分数是  5 - 4  = 1，
+ Alex 选择右边 5 的时候，下一轮 Alex 会让自己多 4 分，因此选择右边 5 的时候，Alex 的相对分数是  5 - 4  = 1。
所以 Alex 一定会赢。

从上图中，我们发现两个 `[3, 4]`，出现重复子问题，因此，需要使用记忆化递归完成计算。


### 方法一：记忆化递归

**参考代码 1**：

```Java []
import java.util.Arrays;

public class Solution {

    public boolean stoneGame(int[] piles) {
        int len = piles.length;
        int[][] memo = new int[len][len];
        for (int i = 0; i < len; i++) {
            // 由于是相对分数，有可能是在负值里面选较大者，因此初始化的时候不能为 0
            Arrays.fill(memo[i], Integer.MIN_VALUE);
            memo[i][i] = piles[i];
        }
        return stoneGame(piles, 0, len - 1, memo) > 0;
    }


    /**
     * 计算子区间 [left, right] 里先手能够得到的分数
     *
     * @param piles
     * @param left
     * @param right
     * @return
     */
    private int stoneGame(int[] piles, int left, int right, int[][] memo) {
        if (left == right) {
            return piles[left];
        }

        if (memo[left][right] != Integer.MIN_VALUE) {
            return memo[left][right];
        }

        int chooseLeft = piles[left] - stoneGame(piles, left + 1, right, memo);
        int chooseRight = piles[right] - stoneGame(piles, left, right - 1, memo);
        int res = Math.max(chooseLeft, chooseRight);
        memo[left][right] = res;
        return res;
    }
}
```

### 方法二：动态规划

观察上面的记忆化数组 `memo`，是一个表格，并且状态转移方程比较容易看出：在拿左边石子堆和右边石子堆中做出对当前最好的选择。

+ 状态 `dp[i][j]` 定义：区间 `piles[i..j]` 内**先手**可以获得的**相对分数**；
+ 状态转移方程：`dp[i][j] = max(nums[i] - dp[i + 1, j] , nums[j] - dp[i, j - 1]) `。

因此，在计算状态的时候，**一定要保证左边一格和下边一格的值先计算出来**。

![image.png](https://pic.leetcode-cn.com/a4b7a4280083e5bacd4410508aa697f6a186129277c0912b6de311b8d2f6d64d-image.png)


说明：
+ `i` 是区间左边界的下标，`j` 是区间右边界的下标；
+ 图中黄色部分不填，没有意义。


于是有以下两种填表顺序：

**填表顺序 1**：

![image.png](https://pic.leetcode-cn.com/01d7823c519c17b7a9880544f438d7692a882077419d217bddc6d38f0cf0861e-image.png)


**参考代码 2**：

```Java []
public class Solution {

    // dp[i][j] 定义：区间 piles[i..j] 内先手可以获得的相对分数

    public boolean stoneGame(int[] piles) {
        int len = piles.length;
        int[][] dp = new int[len][len];
        for (int i = 0; i < len; i++) {
            dp[i][i] = piles[i];
        }

        for (int j = 1; j < len; j++) {
            for (int i = j - 1; i >= 0; i--) {
                dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
            }
        }
        return dp[0][len - 1] > 0;
    }
}
```

**填表顺序 2**：

![image.png](https://pic.leetcode-cn.com/f0328321e0a62510853c9605339e4a3e5107d5f48752e8dea15ab929f4223d34-image.png)



**参考代码 3**：

```Java []
public class Solution {

    // dp[i][j] 定义：区间 piles[i..j] 内先手可以获得的相对分数

    public boolean stoneGame(int[] piles) {
        int len = piles.length;
        int[][] dp = new int[len][len];
        for (int i = 0; i < len; i++) {
            dp[i][i] = piles[i];
        }

        for (int i = len - 2; i >= 0; i--) {
            for (int j = i + 1; j < len; j++) {
                dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
            }
        }
        return dp[0][len - 1] > 0;
    }
}
```

### 方法 3：数学方法

这里给出感性的理解，不是严谨的证明。

+ 题目说，Alex 总是先手，所以 Alex 总能赢得 2 堆石子时候的游戏。这是因为「石子的总数是奇数」，2 堆的时候，Alex 拿较多的那一堆石子让自己获胜；
+ 题目又说，石子堆的总数是偶数，所以可以得知 Alex 总可以赢得 4 堆石子时候的游戏。

总之，「为石子的总数是奇数」和「石子堆的总数是偶数」和 Alex 是先手，是 Alex 必胜（没有平局）的必要条件。




```Java []
public class Solution {

    public boolean stoneGame(int[] piles) {
        return true;
    }
}
```