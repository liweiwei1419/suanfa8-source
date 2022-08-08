---
title: 「力扣」第 309 题：最佳买卖股票时机含冷冻期（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

- 题目理解：[309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/);
- 题解链接：[动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution/dong-tai-gui-hua-by-liweiwei1419-5/)。

## 题目描述

给定一个整数数组，其中第 _i_ 个元素代表了第 _i_ 天的股票价格 。

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

- 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
- 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。

**示例 1:**

```
输入: [1,2,3,0,2]
输出: 3
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
```

**Example 2:**

```
Input: prices = [1]
Output: 0
```

**Constraints:**

- `1 <= prices.length <= 5000`
- `0 <= prices[i] <= 1000`

**说明**：

1、本文对状态的定义和状态转移可能有一些别扭。

2、我对冷冻期的处理是：只要不持股过了一天，就一直处于冷冻期，直到再购入股票为止。

3、如果对这一点理解上有困难的朋友，不是你们的问题哈。不用纠结我的做法，我认为只要是状态定义准确，状态转移方程正确即可，具体细节上不一定跟我一样，以能通过系统测评为准。

---

- 本题解于 2020 年 10 月 24 日重写；
- 推荐阅读 [@stormsunshine](/u/stormsunshine/) 编写的文章《[股票问题系列通解（转载翻译）](https://leetcode-cn.com/circle/article/qiAgHn/)》；

这一系列问题的目录：

| 题号                                                                                                                     | 题解                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock)                              | [暴力解法、动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/bao-li-mei-ju-dong-tai-gui-hua-chai-fen-si-xiang-b/)                   |
| [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii)                        | [暴力搜索、贪心算法、动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution/tan-xin-suan-fa-by-liweiwei1419-2/)                       |
| [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii)                      | [动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/solution/dong-tai-gui-hua-by-liweiwei1419-7/)                                         |
| [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv)                        | [动态规划（「力扣」更新过用例，只有优化空间的版本可以 AC）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/solution/dong-tai-gui-hua-by-liweiwei1419-4/) |
| [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown)          | [动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution/dong-tai-gui-hua-by-liweiwei1419-5/)                               |
| [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee) | [动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solution/dong-tai-gui-hua-by-liweiwei1419-6/)                        |

---

**思路**：这道题增加了冷冻期这个限制条件。根据题意：卖出股票后的第 $2$ 天为冷冻期。即：

- 卖出股票的当天：不持股；
- 卖出股票的第 $2$ 天：冷冻期（不能买入股票，当然也不能卖出股票）；
- 卖出股票的第 $3$ 天：可以买入股票，也可以什么都不操作。

并没有限制多少笔交易。因此需要增加一个状态。

把「冷冻期」定义成一个状态，不太好推导状态转移方程，由于事实上就只有「持股」和「不持股」这两种情况，因此可以为不持股增加一种情况：

### 第 1 步：状态定义

`dp[i][j]` 表示 `[0, i]` 区间内，在下标为 `i` 这一天状态为 `j` 时，我们手上拥有的金钱数。

这里 `j` 可以取 $3$ 个值（**下面的定义非常重要**）：

- `0` 表示：今天 **不是** 卖出了股票的不持股状态；
- `1` 表示：持股；
- `2` 表示：今天由于卖出了股票的不持股状态；

### 第 2 步：推导状态转移方程

根据题意，从昨天到今天可能的状态变化分析如下：

- $0$ 的转移

| 昨天 | 今天 | 分析是否可以转移，可以转移的情况下今天的操作 |
| ---- | ---- | -------------------------------------------- |
| $0$  | $0$  | 可以转移，今天什么都不做。                   |
| $0$  | $1$  | 可以转移，今天买入股票。                     |
| $0$  | $2$  | 不可以转移，不持股的情况下，不能卖出股票。   |

- $1$ 的转移

| 昨天 | 今天 | 分析是否可以转移，可以转移的情况下今天的操作 |
| ---- | ---- | -------------------------------------------- |
| $1$  | $0$  | 不可以转移，根据题意，只能转移到 $2$。       |
| $1$  | $1$  | 可以转移，今天什么都不操作。                 |
| $1$  | $2$  | 根据题意可以转移。                           |

- $2$ 的转移

| 昨天 | 今天 | 分析是否可以转移，可以转移的情况下今天的操作                       |
| ---- | ---- | ------------------------------------------------------------------ |
| $2$  | $0$  | 可以转移，根据题意，今天就是冷冻期，什么都不能操作，进入状态 $0$。 |
| $2$  | $1$  | 不可以转移，根据题意，昨天刚刚卖出股票，今天不能执行买入操作。     |
| $2$  | $2$  | 不可以转移，不持股的情况下，不能卖出股票。                         |

可以画出状态转移的图如下：

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2u7peqqatj211e0n6jt3.jpg)

#### 第三步：思考初始化

在第 0 天，不持股的初始化值为 `0`，持股的初始化值为 `-prices[0]`（表示购买了一股），虽然不处于冷冻期，但是初始化的值可以为 `0`。

#### 第四步：思考输出

每一天都由前面几天的状态转换而来，最优值在最后一天。取不持股和冷冻期的最大者。

**参考代码 1**：

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        int[][] dp = new int[len][3];
        dp[0][0] = 0;
        dp[0][1] = -prices[0];
        dp[0][2] = 0;

        // dp[i][0]: 手上不持有股票，并且今天不是由于卖出股票而不持股，我们拥有的现金数
        // dp[i][1]: 手上持有股票时，我们拥有的现金数
        // dp[i][2]: 手上不持有股票，并且今天是由于卖出股票而不持股，我们拥有的现金数
        for (int i = 1; i < len; i++) {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2]);
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
            dp[i][2] = dp[i - 1][1] + prices[i];
        }
        return Math.max(dp[len - 1][0], dp[len - 1][2]);
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是股价数组的长度，只遍历了一次；
- 空间复杂度：$O(N)$。

---

以下是空间优化的代码。

#### 第五步：思考空间优化

由于当前天只参考了昨天的状态值，因此可以考虑使用「滚动数组」。

**参考代码 2**：

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        int[][] dp = new int[2][3];

        dp[0][0] = 0;
        dp[0][1] = -prices[0];
        dp[0][2] = 0;

        for (int i = 1; i < len; i++) {
            dp[i % 2][0] = Math.max(dp[(i - 1) % 2][0], dp[(i - 1) % 2][2]);
            dp[i % 2][1] = Math.max(dp[(i - 1) % 2][1], dp[(i - 1) % 2][0] - prices[i]);
            dp[i % 2][2] = dp[(i - 1) % 2][1] + prices[i];
        }
        return Math.max(dp[(len - 1) % 2][0], dp[(len - 1) % 2][2]);
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是股价数组的长度，只遍历了一次；
- 空间复杂度：$O(1)$，状态数组里元素的个数是常数。

由于状态值就 3 个，并且只关心最后 1 天的状态值，还可以使用滚动变量的方式把状态表格优化到一行。不过为了使得状态转移正确进行，需要声明两个变量，空间开销等价于 **参考代码 2**。

**参考代码 3**：

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        int[] dp = new int[3];

        dp[0] = 0;
        dp[1] = -prices[0];
        dp[2] = 0;

        int pre0 = dp[0];
        int pre2 = dp[2];

        for (int i = 1; i < len; i++) {
            dp[0] = Math.max(dp[0], pre2);
            dp[1] = Math.max(dp[1], pre0 - prices[i]);
            dp[2] = dp[1] + prices[i];

            pre0 = dp[0];
            pre2 = dp[2];
        }
        return Math.max(dp[0], dp[2]);
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是股价数组的长度，只遍历了一次；
- 空间复杂度：$O(1)$，状态数组里元素的个数是常数。
