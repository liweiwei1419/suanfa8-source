---
title: 「力扣」第 188 题：买卖股票的最佳时机 IV（困难）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

- 题目链接：[188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv//)；
- 题解链接：[动态规划（「力扣」更新过用例，只有优化空间的版本可以 AC）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/solution/dong-tai-gui-hua-by-liweiwei1419-4/)。

## 题目描述

给定一个整数数组 `prices` ，它的第 `i` 个元素 `prices[i]` 是一支给定的股票在第 `i` 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 **k** 笔交易。

**注意：**你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

**示例 1：**

```
输入：k = 2, prices = [2,4,1]
输出：2
解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
```

**示例 2：**

```
输入：k = 2, prices = [3,2,6,5,0,3]
输出：7
解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
```

**提示：**

- `0 <= k <= 100`
- `0 <= prices.length <= 1000`
- `0 <= prices[i] <= 1000`

---

- 本题解于 2020 年 10 月 22 日重写；
- 「力扣」后台增加了测试用例，只有 空间优化 以后的版本可以通过；
- 推荐阅读 [@stormsunshine](/u/stormsunshine/) 编写的文章《[股票问题系列通解（转载翻译）](https://leetcode-cn.com/circle/article/qiAgHn/)》。

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

思路：最多可以完成 $k$ 笔交易，是一个限制条件，因此需要把这个限制条件作为状态的一维设计到状态数组中。

## 方法一：动态规划（最原始版本，超出内存限制）

为了避免大段文字影响阅读，先给出代码以及代码注释。

**参考代码 1**：（超出内存限制）

```Java []
public class Solution {

    // 超出内存限制

    public int maxProfit(int k, int[] prices) {
        int len = prices.length;
        // 特殊判断
        if (k == 0 || len < 2) {
            return 0;
        }
        // 特殊判断，因为交易一次需要 2 天，如果 k >= len / 2，相当于没有限制
        // 转换为「力扣」第 122 题，使用贪心算法
        if (k >= len / 2) {
            return greedy(prices, len);
        }

        // 状态转移方程里下标有 -1 的时候，为了防止数组下标越界，多开一行，因此第一维的长度是 len + 1
        // 第二维表示交易次数，从 0 开始，因此第二维的长度是 k + 1
        // 第三维表示是否持股，0：不持股，1：持股
        int[][][] dp = new int[len + 1][k + 1][2];

        // 初始化：把持股的部分都设置为一个较小的负值
        // 注意：如果使用默认值 0，状态转移的过程中会做出错误的决策
        for (int i = 0; i <= len; i++) {
            for (int j = 0; j <= k; j++) {
                dp[i][j][1] = Integer.MIN_VALUE;
            }
        }

        // 注意：i 和 j 都有 1 个位置的偏移
        for (int i = 1; i <= len; i++) {
            for (int j = 1; j <= k; j++) {
                dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i - 1]);
                dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i - 1]);
            }
        }
        // 说明：第一维和第二维状态都具有前缀性质的，输出最后一个状态即可
        return dp[len][k][0];
    }

    private int greedy(int[] prices, int len) {
        // 转换为股票系列的第 2 题，使用贪心算法完成，思路是只要有利润，就交易
        int res = 0;
        for (int i = 1; i < len; i++) {
            if (prices[i] > prices[i - 1]) {
                res += prices[i] - prices[i - 1];
            }
        }
        return res;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(NK)$，这里 $N$ 表示股价数组的长度，$K$ 是最多可以完成交易的次数；
- 空间复杂度：$O(NK)$，三维 `dp` 数组的大小，第 $3$ 维是常数，故忽略。

**理解状态转移方程**：

- **人为规定**：如果当天买入股票的时候记录「交易发生一次」，如果当天卖出股票，不增加交易次数；
- 买入股票，手上持有的现金数减少（减去当天股价），相应地，卖出股票，手上持有的现金数增加（加上当天股价）；
- **难点**：还没发生的交易，并且还规定了当天必须持股的状态值应该设置为负无穷。

![image.png](https://pic.leetcode-cn.com/1603381708-lQNMqp-image.png)

「超出内存限制」是「力扣」少见的错误，点击「显示详情」。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2u7mxv9p6j21z00gqafn.jpg)

会看到 $N = 1000$ 的时候，不能通过测试。为此尝试优化空间。

## 方法二：动态规划（优化空间，可以通过）

由于今天的状态值只参考了昨天的状态值，可以直接把第一维去掉。

```Java []
public class Solution {

    public int maxProfit(int k, int[] prices) {
        int len = prices.length;
        if (k == 0 || len < 2) {
            return 0;
        }
        if (k >= len / 2) {
            return greedy(prices);
        }

        int[][] dp = new int[k + 1][2];
        for (int i = 0; i <= k; i++) {
            dp[i][1] = Integer.MIN_VALUE;
        }
        for (int price : prices) {
            for (int j = 1; j <= k; j++) {
                dp[j][1] = Math.max(dp[j][1], dp[j - 1][0] - price);
                dp[j][0] = Math.max(dp[j][0], dp[j][1] + price);
            }
        }
        return dp[k][0];
    }

    private int greedy(int[] prices) {
        int res = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                res += prices[i] - prices[i - 1];
            }
        }
        return res;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(NK)$，这里 $N$ 表示股价数组的长度，$K$ 是最多可以完成交易的次数；
- 空间复杂度：$O(NK)$，二维 `dp` 数组的大小，第 $2$ 维是常数，故忽略。
