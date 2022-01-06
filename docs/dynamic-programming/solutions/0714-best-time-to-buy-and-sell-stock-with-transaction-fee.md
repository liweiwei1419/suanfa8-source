---
title: 「力扣」第 714 题：买卖股票的最佳时机含手续费（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

+ [题目链接](https://leetcode-cn.com/problems/combination-sum/)
+ [题解链接](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solution/dong-tai-gui-hua-by-liweiwei1419-6/)

## 题目描述

给定一个整数数组 `prices`，其中第 `i` 个元素代表了第 `i` 天的股票价格 ；整数 `fee` 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

**注意：**这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

**示例 1：**

```
输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
输出：8
解释：能够达到的最大利润:  
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8
```

**示例 2：**

```
输入：prices = [1,3,7,5,10,3], fee = 3
输出：6
```

 **提示：**

- $1 \le prices.length \le 5 * 104$
- $1 \le prices[i] < 5 * 104$
- $0 \le fee < 5 * 10^4$

---

+ 本题解于 2020 年 10 月 23 日重写；


+ 推荐阅读 [@stormsunshine](/u/stormsunshine/) 编写的文章《[股票问题系列通解（转载翻译）](https://leetcode-cn.com/circle/article/qiAgHn/)》。


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


**思路**：这道题虽然增加了「手续费」这件事情，但是并没有给决策阶段造成什么影响，动态规划依然可以用，状态定义和之前的 121、122、123、188、309 号问题是一样的。

**人为规定**：

这部分内容是题目中没有的，但是可以人为规定，在定义状态和推导状态转移方程的过程中，要保持这个定义：

+ 规定在买入股票的时候扣除手续费；
+ 如果规定在卖出股票的时候扣除手续费也可以，相应地初始化的时候做一些调整。

也就是说，不可以在买入股票和卖出股票的时候同时扣除手续费，不能扣两次手续费。

### 第 1 步：状态定义

+ `dp[i][j]` 表示：`[0, i]` 区间内，到下标为 `i` 这一天天（从 $0$ 开始）状态为 `j` 时的我们手上拥有的现金数；
+ 其中 `j` 取两个值：`0` 表示不持股，`1` 表示持股。


### 第 2 步：推导状态转移方程：

`dp[i][0]`：当天不持股，可以由昨天不持股和昨天持股转换而来。

+ 如果昨天不持股，今天仍然不持股，则说明今天什么都没做。
+ 如果昨天持股，今天不持股，则说明今天卖出了一股，当前的 `dp` 应该加上当天的股价。

因此：`dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + prices[i]);`


`dp[i][1]`：当天持股，也可以由昨天不持股和昨天持股转换而来。

+ 如果昨天不持股，今天持股，则说明今天买入股票，根据我们之前的规定，需要扣除手续费。
+ 如果昨天持股，今天仍然持股，则说明今天什么都没做。

因此：`dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee);`。

### 第 3 步：思考初始化

在下标为 $0$ 这一天，不持股的初始化值为 $0$，持股的初始化值为 `-prices[0] - fee`（规定在买入股票的时候扣除手续费）。

### 第 4 步：思考输出

每一天都由前面几天的状态转换而来，最优值在最后一天，并且是不持股的状态。

**参考代码 1**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int maxProfit(int[] prices, int fee) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        // dp[i][j] 表示 [0, i] 区间内，到第 i 天（从 0 开始）状态为 j 时的最大收益'
        // j = 0 表示不持股，j = 1 表示持股
        // 并且规定在买入股票的时候，扣除手续费
        int[][] dp = new int[len][2];
        dp[0][0] = 0;
        dp[0][1] = -prices[0] - fee;
        for (int i = 1; i < len; i++) {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee);
        }
        return dp[len - 1][0];
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        size = len(prices)
        if size < 2:
            return 0

        # dp[i][j] 表示 [0, i] 区间内，到第 i 天（从 0 开始）状态为 j 时的最大收益
        # j = 0 表示不持股，j = 1 表示持股
        # 并且规定在买入股票的时候，扣除手续费
        dp = [[0, 0] for _ in range(size)]
        dp[0][0] = 0
        dp[0][1] = -prices[0] - fee
        for i in range(1, size):
            dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + prices[i])
            dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - prices[i] - fee)
        return dp[-1][0]
```
</CodeGroupItem>
</CodeGroup>




**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是股价数组的长度；
+ 空间复杂度：$O(N)$，状态数组有 $N$ 行，$2$ 列。$2$ 为常数，在计算复杂度的时候视为 $1$。

以下是空间优化的写法：

---


### 第 5 步：思考空间优化

因为当前行总是参考上一行的值，可以使用滚动数组优化。

并且还注意到当前行是参考另一张表格上一行的值，因此直接把第 $1$ 维砍掉都可以。并且计算状态的时候，因为是「螺旋」计算的，在状态转移的时候，这两行的顺序可以互换（这是我测试出来的，也没有想清楚是为什么，是测试数据比较弱，还是它真的就是这个道理呢？留个疑问给自己慢慢想）。

**参考代码 2**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int maxProfit(int[] prices, int fee) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        // j = 0 表示不持股，j = 1 表示持股
        // 并且规定在买入股票的时候，扣除手续费
        int[] dp = new int[2];
        dp[0] = 0;
        dp[1] = -prices[0] - fee;
        for (int i = 1; i < len; i++) {
            dp[0] = Math.max(dp[0], dp[1] + prices[i]);
            dp[1] = Math.max(dp[1], dp[0] - prices[i] - fee);
        }
        return dp[0];
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List

class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        size = len(prices)
        if size < 2:
            return 0

        # dp[j] 表示 [0, i] 区间内，到第 i 天（从 0 开始）状态为 j 时的最大收益
        # j = 0 表示不持股，j = 1 表示持股
        # 并且规定在买入股票的时候，扣除手续费
        dp = [0, 0]
        dp[0] = 0
        dp[1] = -prices[0] - fee
        for i in range(1, size):
            dp[0] = max(dp[0], dp[1] + prices[i])
            dp[1] = max(dp[1], dp[0] - prices[i] - fee)
        return dp[0]
```
</CodeGroupItem>
</CodeGroup>





**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是股价数组的长度；
+ 空间复杂度：$O(1)$，第一维被省去，只维护了 $2$ 个变量。

