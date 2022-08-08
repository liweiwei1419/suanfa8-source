---
title: 「力扣」第 121 题：买卖股票的最佳时机（简单）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

- 题目链接：[121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)；
- 题解链接：[暴力解法、动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/bao-li-mei-ju-dong-tai-gui-hua-chai-fen-si-xiang-b/)。

## 题目描述

给定一个数组 `prices` ，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。

你只能选择 **某一天** 买入这只股票，并选择在 **未来的某一个不同的日子** 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0` 。

**示例 1：**

```
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
```

**示例 2：**

```
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
```

**提示：**

- $1 \le prices.length \le 10^5$
- $0 \le prices[i] \le 10^4$

---

**说明**：

- 本题解于 2020 年 10 月 21 日重写；
- 推荐阅读 [@stormsunshine](/u/stormsunshine/) 编写的文章《[股票问题系列通解（转载翻译）](https://leetcode-cn.com/circle/article/qiAgHn/)》；
- 这一题的知识点：
  - 动态规划用于求解 **多阶段决策问题** ；
  - 动态规划问题的问法：**只问最优解，不问具体的解**；
  - 掌握 **无后效性** 解决动态规划问题：把约束条件设置成为状态。

这一系列问题的目录：

| 题号                                                                                                                     | 题解                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock)                              | [暴力解法、动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/bao-li-mei-ju-dong-tai-gui-hua-chai-fen-si-xiang-b/)                   |
| [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii)                        | [暴力搜索、贪心算法、动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution/tan-xin-suan-fa-by-liweiwei1419-2/)                       |
| [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii)                      | [动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/solution/dong-tai-gui-hua-by-liweiwei1419-7/)                                         |
| [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv)                        | [动态规划（「力扣」更新过用例，只有优化空间的版本可以 AC）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/solution/dong-tai-gui-hua-by-liweiwei1419-4/) |
| [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown)          | [动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution/dong-tai-gui-hua-by-liweiwei1419-5/)                               |
| [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee) | [动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solution/dong-tai-gui-hua-by-liweiwei1419-6/)                        |

### 方法一：暴力解法

**思路**：枚举所有发生一次交易的股价差。

**参考代码 1**：

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        // 有可能不发生交易，因此结果集的初始值设置为 0
        int res = 0;

        // 枚举所有发生一次交易的股价差
        for (int i = 0; i < len - 1; i++) {
            for (int j = i + 1; j < len; j++) {
                res = Math.max(res, prices[j] - prices[i]);
            }
        }
        return res;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N^2)$，这里 $N$ 是股价数组的长度；
- 空间复杂度：$O(1)$。

### 方法二：动态规划

**思路**：题目只问最大利润，没有问这几天具体哪一天买、哪一天卖，因此可以考虑使用 **动态规划** 的方法来解决。

买卖股票有约束，根据题目意思，有以下两个约束条件：

- 条件 1：你不能在买入股票前卖出股票；
- 条件 2：最多只允许完成一笔交易。

因此 **当天是否持股** 是一个很重要的因素，而当前是否持股和昨天是否持股有关系，为此我们需要把 **是否持股** 设计到状态数组中。

**状态定义**：

`dp[i][j]`：下标为 `i` 这一天结束的时候，手上持股状态为 `j` 时，我们持有的现金数。换种说法：`dp[i][j]` 表示天数 `[0, i]` 区间里，下标 `i` 这一天状态为 `j` 的时候能够获得的最大利润。其中：

- `j = 0`，表示当前不持股；
- `j = 1`，表示当前持股。

**注意**：下标为 `i` 的这一天的计算结果包含了区间 `[0, i]` 所有的信息，因此最后输出 `dp[len - 1][0]`。

**说明**：

- 使用「现金数」这个说法主要是为了体现 **买入股票手上的现金数减少，卖出股票手上的现金数增加** 这个事实；
- 「现金数」等价于题目中说的「利润」，即先买入这只股票，后买入这只股票的差价；
- 因此在刚开始的时候，我们的手上肯定是有一定现金数能够买入这只股票，即刚开始的时候现金数肯定不为 $0$，但是写代码的时候可以设置为 `0`。极端情况下（股价数组为 `[5, 4, 3, 2, 1]`），此时不发生交易是最好的（这一点是补充说明，限于我的表达，希望不要给大家造成迷惑）。

**推导状态转移方程**：

`dp[i][0]`：规定了今天不持股，有以下两种情况：

- 昨天不持股，今天什么都不做；
- 昨天持股，今天卖出股票（现金数增加），

`dp[i][1]`：规定了今天持股，有以下两种情况：

- 昨天持股，今天什么都不做（现金数与昨天一样）；
- 昨天不持股，今天买入股票（**注意**：只允许交易一次，因此手上的现金数就是当天的股价的相反数）。

状态转移方程请见 **参考代码 2**。

**知识点**：

- 多阶段决策问题：动态规划常常用于求解多阶段决策问题；
- **无后效性**：每一天是否持股设计成状态变量的一维。状态设置具体，推导状态转移方程方便。

**参考代码 2**：

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        // 特殊判断
        if (len < 2) {
            return 0;
        }
        int[][] dp = new int[len][2];

        // dp[i][0] 下标为 i 这天结束的时候，不持股，手上拥有的现金数
        // dp[i][1] 下标为 i 这天结束的时候，持股，手上拥有的现金数

        // 初始化：不持股显然为 0，持股就需要减去第 1 天（下标为 0）的股价
        dp[0][0] = 0;
        dp[0][1] = -prices[0];

        // 从第 2 天开始遍历
        for (int i = 1; i < len; i++) {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
        }
        return dp[len - 1][0];
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N)$，遍历股价数组可以得到最优解；
- 空间复杂度：$O(N)$，状态数组的长度为 $N$。

---

说明：**参考代码 3** 与 **参考代码 4** 是空间优化，思路来自「0-1」背包问题。

**参考代码 3**：（滚动数组）

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        int[][] dp = new int[2][2];
        dp[0][0] = 0;
        dp[0][1] = -prices[0];
        for (int i = 1; i < len; i++) {
            dp[i % 2][0] = Math.max(dp[(i - 1) % 2][0], dp[(i - 1) % 2][1] + prices[i]);
            dp[i % 2][1] = Math.max(dp[(i - 1) % 2][1], -prices[i]);
        }
        return dp[(len - 1) & 1][0];
    }
}
```

**说明**：`% 2` 还可以写成 `& 1`，这里为了保证可读性，选用 `% 2`。

**复杂度分析**：

- 时间复杂度：$O(N)$，遍历股价数组可以得到最优解；
- 空间复杂度：$O(1)$，状态数组的长度为 $4$。

**参考代码 4**：（空间优化）

**说明**：空间优化只看状态转移方程。

状态转移方程里下标为 `i` 的行只参考下标为 `i - 1` 的行（即只参考上一行），并且：

- 下标为 `i` 的行并且状态为 `0` 的行参考了上一行状态为 `0` 和 `1` 的行；
- 下标为 `i` 的行并且状态为 `1` 的行只参考了上一行状态为 `1` 的行。

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        int[] dp = new int[2];
        dp[0] = 0;
        dp[1] = -prices[0];
        for (int i = 1; i < len; i++) {
            dp[0] = Math.max(dp[0], dp[1] + prices[i]);
            dp[1] = Math.max(dp[1], -prices[i]);
        }
        return dp[0];
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N)$，遍历股价数组可以得到最优解；
- 空间复杂度：$O(1)$，状态数组的长度为 $2$。

---

## 无后效性的解释

以下截图来自《算法导论》中文版第 15 章第 1 节的描述，这里借用它的图说明动态规划求解过程需要满足无后效性的意思。还可以参考 [讨论](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/bao-li-mei-ju-dong-tai-gui-hua-chai-fen-si-xiang-b/700676)。

一个问题的递归结构如下图所示（这里忽略问题场景）。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2u7j5nr4fj21n40koq6c.jpg)

可以发现有重复求解的部分，需要添加缓存，这是「记忆化递归」。

另外还可以从通过发现一个问题最开始的样子，通过「递推」一步一步求得原始问题的解，此时求解的过程如下图所示：

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2u7j7t2gzj21ao0u0tga.jpg)

箭头指向的地方表示当前求解的过程中参考了以前求解过的问题的结果，这个过程不能形成回路，**形成回路就无法求解**。

**总结**：动态规划有两种求解形式：

- 自顶向下：也就是记忆化递归，求解过程会遇到重复子问题，所以需要记录每一个子问题的结果；
- 自底向上：通过发现一个问题最开始的样子，通过「递推」一步一步求得原始问题的解。

在「力扣」上的绝大多数问题都可以通过「自底向上」递推的方式去做。
