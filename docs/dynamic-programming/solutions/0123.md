根据前两问，把状态定义得细致一点，就不难发现状态如何转移的了。

#### 第 1 步：状态定义

+ 状态定义：`dp[i][j]` 表示在 `[0, i]` 区间里（这个状态依然是前缀性质的），状态为 `j` 的最大收益。`j` 的含义如下：

1. `j = 0`：还未开始交易；
2. `j = 1`：第 1 次买入一支股票；
3. `j = 2`：第 1 次卖出一支股票；
4. `j = 3`：第 2 次买入一支股票；
5. `j = 4`：第 2 次卖出一支股票。

#### 第 2 步：状态转移方程

“状态转移方程”可以用下面的图表示，它的特点是：状态要么停留，要么向后面走，状态不能回退。

![image.png](https://pic.leetcode-cn.com/b5809a1e612083436bc97660e08d1eefece36c227a509569fdddf759777edb6c-image.png)


具体表示式请见代码注释。

#### 第 3 步：思考初始化

第 0 天的时候很容易初始化前两个状态，而状态 `3` （表示第 2 次持股）只能赋值为一个不可能的数。

注意：**只有在之前的状态有被赋值的时候，才可能有当前状态**。

#### 第 4 步：思考输出

最后一天不持股的状态都可能成为候选的最大利润。

**参考代码 1**：

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        // dp[i][j] ，表示 [0, i] 区间里，状态为 j 的最大收益
        // j = 0：什么都不操作
        // j = 1：第 1 次买入一支股票
        // j = 2：第 1 次卖出一支股票
        // j = 3：第 2 次买入一支股票
        // j = 4：第 2 次卖出一支股票

        // 初始化
        int[][] dp = new int[len][5];
        dp[0][0] = 0;
        dp[0][1] = -prices[0];

        // 3 状态都还没有发生，因此应该赋值为一个不可能的数
        for (int i = 0; i < len; i++) {
            dp[i][3] = Integer.MIN_VALUE;
        }

        // 状态转移只有 2 种情况：
        // 情况 1：什么都不做
        // 情况 2：由上一个状态转移过来
        for (int i = 1; i < len; i++) {
            // j = 0 的值永远是 0
            dp[i][0] = 0;
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
            dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i]);
            dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i]);
            dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i]);
        }
        // 最大值只发生在不持股的时候，因此来源有 3 个：j = 0 ,j = 2, j = 4
        return Math.max(0, Math.max(dp[len - 1][2], dp[len - 1][4]));
    }
}
```

#### 第 5 步： 思考状态压缩

+ 因为今天的值只参考了昨天的值，可以使用“滚动数组”技巧把行数压缩到 2 行（未写代码）。

+ 并且还注意到它参考的是其它状态昨天的值，因此直接去掉第 1 维即可（结论未确定，但可以通过测评）。
说明：我一开始怀疑这种状态压缩方法的合理性（评论去已经有朋友提出了同样的质疑）。不倒着写，正着写依然可以通过测评。然后思考可以通过的原因：恰好 `dp[i][0]` 对于任意的 `i` 都有 `dp[i][0] = 0`，起点都一样，因此可以这样压缩。后面的几道股票问题，在状态压缩的时候，我测试过，有时候，颠倒两个状态的赋值过程，依然可以通过测评，理由未知，属强行解释。

**参考代码 2**：

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        // dp[i][j] ，表示 [0, i] 区间里，状态为 j 的最大收益
        // j = 0：什么都不操作
        // j = 1：第 1 次买入一支股票
        // j = 2：第 1 次卖出一支股票
        // j = 3：第 2 次买入一支股票
        // j = 4：第 2 次卖出一支股票

        int[] dp = new int[5];
        dp[1] = -prices[0];
        // 3 状态都还没有发生，因此应该赋值为一个不可能的数
        dp[3] = Integer.MIN_VALUE;

        for (int i = 1; i < len; i++) {
            dp[0] = 0;
            dp[1] = Math.max(dp[1], dp[0] - prices[i]);
            dp[2] = Math.max(dp[2], dp[1] + prices[i]);
            dp[3] = Math.max(dp[3], dp[2] - prices[i]);
            dp[4] = Math.max(dp[4], dp[3] + prices[i]);
        }
        return Math.max(0, Math.max(dp[2], dp[4]));
    }
}
```
```Python []
from typing import List


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        size = len(prices)
        if size < 2:
            return 0

        dp = [0 for _ in range(5)]
        dp[0] = 0
        dp[1] = -prices[0]

        dp[3] = float('-inf')

        # dp[j]：i 表示 [0, i] 区间里，状态为 j 的最大收益
        # j = 0：什么都不操作
        # j = 1：第 1 次买入一支股票
        # j = 2：第 1 次卖出一支股票
        # j = 3：第 2 次买入一支股票
        # j = 4：第 2 次卖出一支股票

        for i in range(1, size):
            dp[0] = 0
            dp[1] = max(dp[1], - prices[i])
            dp[2] = max(dp[2], dp[1] + prices[i])
            dp[3] = max(dp[3], dp[2] - prices[i])
            dp[4] = max(dp[4], dp[3] + prices[i])
        return max(0, dp[2], dp[4])
```

---

事实上，这道题可以转化为两个阶段的股票问题的第 1 题，即第 121 题。


**参考代码 3**：

```Java []
public class Solution {

    public int maxProfit(int[] prices) {
        // 特判
        int len = prices.length;
        if (len < 2) {
            return 0;
        }

        // [0, left] 包括 left 这个区间完成一次交易能够获得的最大利润
        int[] left = new int[len];
        int minVal = prices[0];
        for (int i = 1; i < len; i++) {
            left[i] = Math.max(left[i - 1], prices[i] - minVal);
            minVal = Math.min(minVal, prices[i]);
        }

        // [right, len - 1] 包括 left 这个区间完成一次交易能够获得的最大利润
        int[] right = new int[len];
        int maxVal = prices[len - 1];
        for (int i = len - 2; i >= 0; i--) {
            right[i] = Math.max(right[i + 1], maxVal - prices[i]);
            maxVal = Math.max(maxVal, prices[i]);
        }

        // 枚举间隙
        // [0, 1[, 2, 3,] 4, 5]
        // 这里有一个坑，有可能是只交易一次的场景
        int res = Math.max(left[len - 1], right[0]);
        for (int i = 1; i < len - 2; i++) {
            res = Math.max(res, left[i] + right[i + 1]);
        }
        return res;
    }
}
```
```Python []
from typing import List


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        size = len(prices)
        if size < 2:
            return 0

        # [0, left] 区间里进行一次买卖的最大收益
        left = [0 for _ in range(size)]
        min_val = prices[0]

        for i in range(1, size):
            left[i] = max(left[i - 1], prices[i] - min_val)
            min_val = min(min_val, prices[i])

        # [right, len - 1] 区间里进行一次买卖的最大收益
        right = [0 for _ in range(size)]
        max_val = prices[size - 1]

        for i in range(size - 2, -1, -1):
            right[i] = max(right[i + 1], max_val - prices[i])
            max_val = max(max_val, prices[i])

        # 枚举间隙
        # [0, 1[, 2, 3,] 4, 5]
        #  这里有一个坑，有可能是只交易一次的场景
        res = max(left[size - 1], right[0])
        for i in range(1, size - 2):
            res = max(res, left[i] + right[i + 1])
        return res
```
```C++ []
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int maxProfit(vector<int> &prices) {
        // 特判
        int size = prices.size();
        if (size < 2) {
            return 0;
        }

        // [0, left] 区间里进行一次买卖的最大收益
        vector<int> left(size, 0);
        int minVal = prices[0];
        for (int i = 1; i < size - 1; ++i) {
            left[i] = max(left[i - 1], prices[i] - minVal);
            minVal = min(minVal, prices[i]);
        }

        // [right, len - 1] 区间里进行一次买卖的最大收益
        vector<int> right(size, 0);
        int maxVal = prices[size - 1];
        for (int i = size - 2; i >= 0; --i) {
            right[i] = max(right[i + 1], maxVal - prices[i]);
            maxVal = max(maxVal, prices[i]);
        }

        // 枚举间隙
        // [0, 1[, 2, 3,] 4, 5]
        // 这里有一个坑，有可能是只交易一次的场景
        int res = max(left[size - 1], right[0]);
        for (int i = 1; i < size - 2; ++i) {
            res = max(res, left[i] + right[i + 1]);
        }
        return res;
    }
};
```
