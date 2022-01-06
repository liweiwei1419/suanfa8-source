---
title: 「力扣」第 123 题：买卖股票的最佳时机 III（困难）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

+ [题目链接](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/)
+ [题解链接](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/solution/dong-tai-gui-hua-by-liweiwei1419-7/)

## 题目描述

给定一个数组，它的第 `i` 个元素是一支给定的股票在第 `i` 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 **两笔** 交易。

**注意：**你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

**示例 1:**

```
输入：prices = [3,3,5,0,0,3,1,4]
输出：6
解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
```

**示例 2：**

```
输入：prices = [1,2,3,4,5]
输出：4
解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```

**示例 3：**

```
输入：prices = [7,6,4,3,1] 
输出：0 
解释：在这个情况下, 没有交易完成, 所以最大利润为 0。
```

**示例 4：**

```
输入：prices = [1]
输出：0
```

 **提示：**

- $1 \le prices.length \le 10^5$
- $0 \le prices[i] \le 10^5$

---

+ 本题解于 2020 年 10 月 22 日重写；

+ 推荐阅读 [@stormsunshine](/u/stormsunshine/) 编写的文章《[股票问题系列通解（转载翻译）](https://leetcode-cn.com/circle/article/qiAgHn/)》。
+ **思路**：这一题「最多可以完成两笔交易」是题目中给出的约束信息，因此 **需要把已经交易了多少次设置成为一个状态的维度**。
+ **难点**：理解初始化的时候设置 `dp[0][2][1] = 负无穷`。


这一系列问题的目录：

| 题号                                                         | 题解                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [121. 买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock) | [暴力解法、动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/bao-li-mei-ju-dong-tai-gui-hua-chai-fen-si-xiang-b/) |
| [122. 买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii) | [暴力搜索、贪心算法、动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution/tan-xin-suan-fa-by-liweiwei1419-2/) |
| [123. 买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii) | [动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/solution/dong-tai-gui-hua-by-liweiwei1419-7/) |
| [188. 买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv) | [动态规划（「力扣」更新过用例，只有优化空间的版本可以 AC）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/solution/dong-tai-gui-hua-by-liweiwei1419-4/) |
| [309. 最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown) | [动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution/dong-tai-gui-hua-by-liweiwei1419-5/) |
| [714. 买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee) | [动态规划（Java）](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solution/dong-tai-gui-hua-by-liweiwei1419-6/) |

---

### 方法一：动态规划


**状态定义**：`dp[i][j][k]` 表示在 `[0, i]` 区间里（状态具有前缀性质），交易进行了 `j` 次，并且状态为 `k` 时我们拥有的现金数。其中 `j` 和 `k` 的含义如下：

`j = 0` 表示没有交易发生； 
`j = 1` 表示此时已经发生了 $1$ 次买入股票的行为； 
`j = 2` 表示此时已经发生了 $2$ 次买入股票的行为。

即我们 **人为规定** 记录一次交易产生是在 **买入股票** 的时候。

`k = 0` 表示当前不持股；
`k = 1` 表示当前持股。

**推导状态转移方程**：

「状态转移方程」可以用下面的图表示，它的特点是：状态要么什么都不做，要么向后面走，即：状态不能回退。

![image.png](https://pic.leetcode-cn.com/1603352180-PivnHK-image.png)


具体表示式请见代码注释。



**思考初始化**：

下标为 $0$ 这一天，交易次数为 $0$、$1$、$2$ 并且状态为 $0$ 和 $1$ 的初值应该如下设置：

+ `dp[0][0][0] = 0`：这是显然的；
+ `dp[0][0][1]`：表示一次交易都没有发生，但是持股，这是不可能的，也不会有后序的决策要用到这个状态值，可以不用管；
+ `dp[0][1][0] = 0`：表示发生了 $1$ 次交易，但是不持股，这是不可能的。**虽然没有意义，但是设置成 $0$ 不会影响最优值**；
+ `dp[0][1][1] = -prices[0]`：表示发生了一次交易，并且持股，所以我们持有的现金数就是当天股价的相反数；
+ `dp[0][2][0] = 0`：表示发生了 $2$ 次交易，但是不持股，这是不可能的。**虽然没有意义，但是设置成 $0$ 不会影响最优值**；
+ `dp[0][2][1] = 负无穷`：表示发生了 $2$ 次交易，并且持股，这是不可能的。注意：**虽然没有意义，但是不能设置成 $0$**，这是因为交易还没有发生，必须规定当天 `k` 状态为 $1$（持股），需要参考以往的状态转移，一种很有可能的情况是没有交易是最好的情况。

**说明**：`dp[0][2][1]` 设置成为负无穷这件事情我可能没有说清楚。大家可以通过特殊测试用例 `[1, 2, 3, 4, 5]`，对比 `dp[0][2][1] = 0` 与 `dp[0][2][1] = 负无穷` 的状态转移的差异去理解。

注意：**只有在之前的状态有被赋值的时候，才可能有当前状态**。

**思考输出**：最后一天不持股的状态都可能成为最大利润。


**参考代码 1**：

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        // 第 2 维的 0 没有意义，1 表示交易进行了 1 次，2 表示交易进行了 2 次
        // 为了使得第 2 维的数值 1 和 2 有意义，这里将第 2 维的长度设置为 3
        int[][][] dp = new int[len][3][2];

        // 理解如下初始化
        // 第 3 维规定了必须持股，因此是 -prices[0]
        dp[0][1][1] = -prices[0];
        // 还没发生的交易，持股的时候应该初始化为负无穷
        dp[0][2][1] = Integer.MIN_VALUE;

        for (int i = 1; i < len; i++) {
            // 转移顺序先持股，再卖出
            dp[i][1][1] = Math.max(dp[i - 1][1][1], -prices[i]) ;
            dp[i][1][0] = Math.max(dp[i - 1][1][0], dp[i - 1][1][1] + prices[i]);
            dp[i][2][1] = Math.max(dp[i - 1][2][1], dp[i - 1][1][0] - prices[i]);
            dp[i][2][0] = Math.max(dp[i - 1][2][0], dp[i - 1][2][1] + prices[i]);
        }
        return Math.max(dp[len - 1][1][0], dp[len - 1][2][0]);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 表示股价数组的长度；
+ 空间复杂度：$O(N)$，虽然是三维数组，但是第二维、第三维是常数，与问题规模无关。

以下是空间优化的代码。

---

**参考代码 2**：（使用滚动数组）

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        int[][][] dp = new int[2][3][2];
        dp[0][1][1] = -prices[0];
        dp[0][2][1] = Integer.MIN_VALUE;
        for (int i = 1; i < len; i++) {
            dp[i % 2][1][1] = Math.max(dp[(i - 1) % 2][1][1], -prices[i]);
            dp[i % 2][1][0] = Math.max(dp[(i - 1) % 2][1][0], dp[(i - 1) % 2][1][1] + prices[i]);
            dp[i % 2][2][1] = Math.max(dp[(i - 1) % 2][2][1], dp[(i - 1) % 2][1][0] - prices[i]);
            dp[i % 2][2][0] = Math.max(dp[(i - 1) % 2][2][0], dp[(i - 1) % 2][2][1] + prices[i]);
        }
        return Math.max(dp[(len - 1) % 2][1][0], dp[(len - 1) % 2][2][0]);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 表示股价数组的长度；
+ 空间复杂度：$O(1)$，分别使用两个滚动变量，将一维数组状态优化到常数大小。

**参考代码 3**：（由于今天只参考了昨天的状态，所以直接去掉第一维不会影响状态转移的正确性）

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        int[][] dp = new int[3][2];
        dp[1][1] = -prices[0];
        dp[2][1] = Integer.MIN_VALUE;
        for (int i = 1; i < len; i++) {
            dp[1][1] = Math.max(dp[1][1], -prices[i]);
            dp[1][0] = Math.max(dp[1][0], dp[1][1] + prices[i]);
            dp[2][1] = Math.max(dp[2][1], dp[1][0] - prices[i]);
            dp[2][0] = Math.max(dp[2][0], dp[2][1] + prices[i]);
        }
        return Math.max(dp[1][0], dp[2][0]);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 表示股价数组的长度；
+ 空间复杂度：$O(1)$，状态数组的大小为常数。
