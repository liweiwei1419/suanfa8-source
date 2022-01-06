---
title: 「力扣」第 746 题：使用最小花费爬楼梯（简单）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---


+ 题目链接：[746. 使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)；
+ 题解链接：[动态规划](https://leetcode-cn.com/problems/min-cost-climbing-stairs/solution/dong-tai-gui-hua-by-liweiwei1419-3/)。


这道题不太好懂的是题意。

+ 每一个位置都有 2 个阶梯，1 个阶梯上一层楼，另 1 个阶梯上两层楼；
+ 上两个阶梯的体力值耗费是一样的，但是在不同位置消耗的体力值是不一样的；
+ 楼层顶部在数组之外。如果数组长度为 `len`，那么楼顶就在下标为 `len`，注意 `dp` 数组开 `len + 1` 个空间。 


**状态**：`dp[i]` 表示到索引为 `i` 位置再选择向上爬一共需要的体力开销。

**状态转移方程**：

```
dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i]
```

**输出**： `dp[len]`。



**参考代码 1**：


```Java []
public class Solution {

    public int minCostClimbingStairs(int[] cost) {
        int len = cost.length;
        int[] dp = new int[len + 1];
        dp[0] = 0;
        dp[1] = 0;
        for (int i = 2; i <= len; i++) {
            dp[i] = Math.min(cost[i - 1] + dp[i - 1], cost[i - 2] + dp[i - 2]);
        }
        return dp[len];
    }
}
```
```Python []
from typing import List


class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        size = len(cost)
        dp = [0 for _ in range(size)]

        dp[0] = cost[0]
        dp[1] = cost[1]

        for i in range(2, size):
            dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i]

        return min(dp[size - 1], dp[size - 2])
```
```C++ []
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int minCostClimbingStairs(vector<int> &cost) {
        size_t size = cost.size();

        vector<int> dp(size, 0);

        dp[0] = cost[0];
        dp[1] = cost[1];

        for (int i = 2; i < size; ++i) {
            dp[i] = min(dp[i - 1], dp[i - 2]) + cost[i];
        }
        return min(dp[size - 1], dp[size - 2]);
    }
};
```

**说明**：因为题目已经说了 `cost` 的长度将会在 `[2, 1000]`，因此，对数组 `cost` 的长度无需特判。

---

下面是空间优化的写法：由于当前状态只参考了前两个状态的值，因此可以将状态数组的长度设置为 $3$。

**参考代码 2**：


```Java []
public class Solution {

    public int minCostClimbingStairs(int[] cost) {
        int len = cost.length;
        int[] dp = new int[3];

        dp[0] = cost[0];
        dp[1] = cost[1];

        for (int i = 2; i < len; i++) {
            dp[i % 3] = Math.min(dp[(i - 1) % 3], dp[(i - 2) % 3]) + cost[i];
        }
        return Math.min(dp[(len - 1) % 3], dp[(len - 2) % 3]);
    }

}
```
```Python []
from typing import List


class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        size = len(cost)
        dp = [0, 0, 0]

        dp[0] = cost[0]
        dp[1] = cost[1]

        for i in range(2, size):
            dp[i % 3] = min(dp[(i - 1) % 3], dp[(i - 2) % 3]) + cost[i]

        return min(dp[(size - 1) % 3], dp[(size - 2) % 3])
```
```C++ []
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int minCostClimbingStairs(vector<int> &cost) {
        size_t size = cost.size();

        vector<int> dp(3, 0);

        dp[0] = cost[0];
        dp[1] = cost[1];

        for (int i = 2; i < size; ++i) {
            dp[i % 3] = min(dp[(i - 1) % 3], dp[(i - 2) % 3]) + cost[i];
        }
        return min(dp[(size - 1) % 3], dp[(size - 2) % 3]);
    }
};
```
