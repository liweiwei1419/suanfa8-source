---
title: 「力扣」第 322 题：零钱兑换（中等）
icon: yongyan
categories: 动态规划
tags:
  - 动态规划
  - 背包问题
  - 完全背包
---

满足「完全背包问题」的背景。

1. 每个硬币可以使用多次；
2. 不计算顺序；
3. 并且有「最优子结构」。

**要求的是恰好填满「背包」**，所以初始化的时候需要赋值为一个不可能的值： `amount + 1`。只有在有「正常值」的时候，「状态转移」才可以正常发生。

+ 题目链接：[322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)；
+ 题解链接：[动态规划、完全背包、BFS（包含完全背包问题公式推导）](https://leetcode-cn.com/problems/coin-change/solution/dong-tai-gui-hua-shi-yong-wan-quan-bei-bao-wen-ti-/)

## 题目描述

给你一个整数数组 `coins` ，表示不同面额的硬币；以及一个整数 `amount` ，表示总金额。

计算并返回可以凑成总金额所需的 **最少的硬币个数** 。如果没有任何一种硬币组合能组成总金额，返回 `-1` 。

你可以认为每种硬币的数量是无限的。

**示例 1：**

```
输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1
```

**示例 2：**

```
输入：coins = [2], amount = 3
输出：-1
```

**示例 3：**

```
输入：coins = [1], amount = 0
输出：0
```

**示例 4：**

```
输入：coins = [1], amount = 1
输出：1
```

**示例 5：**

```
输入：coins = [1], amount = 2
输出：2
```

**提示：**

- $1 \le coins.length \le 12$
- $1 \le coins[i] \le 2^{31} - 1$
- $0 \le amount \le 104$

---

看题目的问法，只问最优值是多少，没有要我们求最优解，一般情况下可以用「动态规划」解决。

![image.png](https://pic.leetcode-cn.com/1603723743-vFAFXG-image.png)


---

### 方法一：动态规划与记忆化递归

**思路**：分析最优子结构。根据示例 1：

```
输入: coins = [1, 2, 5], amount = 11
```

凑成面值为 $11$ 的最少硬币个数可以由以下三者的最小值得到：

+ 凑成面值为 $10$ 的最少硬币个数 + 面值为 `1` 的这一枚硬币；
+ 凑成面值为 $9$ 的最少硬币个数 + 面值为 `2` 的这一枚硬币；
+ 凑成面值为 $6$ 的最少硬币个数 + 面值为 `5` 的这一枚硬币。

即 `dp[11] = min (dp[10] + 1, dp[9] + 1, dp[6] + 1)`。

可以直接把问题的问法设计成状态。

+ 第 1 步：定义「状态」。`dp[i] `：凑齐总价值 `i ` 需要的最少硬币个数；
+ 第 2 步：写出「状态转移方程」。根据对示例 1 的分析：

```
dp[amount] = min(dp[amount], 1 + dp[amount - coins[i]]) for i in [0, len - 1] if coins[i] <= amount
```

**说明**：感谢 [@paau](/u/paau/) 朋友纠正状态转移方程。

**注意**：

+ **单枚硬币的面值首先要小于等于** 当前要凑出来的面值；
+ 剩余的那个面值也要能够凑出来，例如：求 `dp[11]` 需要参考 `dp[10]`。如果不能凑出 `dp[10]`，则 `dp[10]` 应该等于一个不可能的值，可以设计为 `11 + 1`，也可以设计为 `-1` ，它们的区别只是在编码的细节上不一样。

**再次强调**：新状态的值要参考的值以前计算出来的「有效」状态值。因此，不妨先假设凑不出来，因为求的是小，所以设置一个不可能的数。


**参考代码 1**：

**注意**：要求的是「恰好凑出面值」，所以初始化的时候需要赋值为一个不可能的值：`amount + 1`。只有在有「正常值」的时候，「状态转移」才可以正常发生。

```Java []
import java.util.Arrays;

public class Solution {

    public int coinChange(int[] coins, int amount) {
        // 给 0 占位
        int[] dp = new int[amount + 1];

        // 注意：因为要比较的是最小值，这个不可能的值就得赋值成为一个最大值
        Arrays.fill(dp, amount + 1);

        // 理解 dp[0] = 0 的合理性，单独一枚硬币如果能够凑出面值，符合最优子结构
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0 && dp[i - coin] != amount + 1) {
                    dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
                }
            }
        }

        if (dp[amount] == amount + 1) {
            dp[amount] = -1;
        }
        return dp[amount];
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N \times amount)$，这里 $N$ 是可选硬币的种类数，$amount$ 是题目输入的面值；
+ 空间复杂度：$O(amount)$，状态数组的大小为 $amount$。

「动态规划」是「自底向上」求解。事实上，可以 **直接面对问题求解** ，即「自顶向下」，但是这样的问题有 **重复子问题**，需要缓存已经求解过的答案，这叫 **记忆化递归**。


**参考代码 2**：

**注意**：由于 $-1$ 是一个特殊的、有意义状态值（题目要求不能使用给出硬币面值凑出的时候，返回 $-1$），因此初值赋值为 $-2$，表示还未计算出结果。

```Java []
import java.util.Arrays;

public class Solution {

    public int coinChange(int[] coins, int amount) {
        int[] memo = new int[amount + 1];
        Arrays.fill(memo, -2);
        Arrays.sort(coins);
        return dfs(coins, amount, memo);
    }

    private int dfs(int[] coins, int amount, int[] memo) {
        int res = Integer.MAX_VALUE;
        if (amount == 0) {
            return 0;
        }

        if (memo[amount] != -2) {
            return memo[amount];
        }

        for (int coin : coins) {
            if (amount - coin < 0) {
                break;
            }

            int subRes = dfs(coins, amount - coin, memo);
            if (subRes == -1) {
                continue;
            }
            res = Math.min(res, subRes + 1);
        }
        return memo[amount] = (res == Integer.MAX_VALUE) ? -1 : res;
    }
}
```
```Python []
from typing import List


class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:

        def dfs(coins, amount, memo):
            res = 9999
            if amount == 0:
                return 0

            if memo[amount] != -2:
                return memo[amount]

            for coin in coins:

                if amount - coin < 0:
                    break
                sub_res = dfs(coins, amount - coin, memo)
                if sub_res == -1:
                    continue
                res = min(res, sub_res + 1)

            if res == 9999:
                memo[amount] = -1
                return -1
            memo[amount] = res
            return res

        # 由于 -1 是一个特殊的、有意义状态值，因此初值赋值为 -2，表示还未计算
        memo = [-2 for _ in range(amount + 1)]
        # 剪枝方便
        coins.sort()
        return dfs(coins, amount, memo)
```

**复杂度分析**：

+ 时间复杂度：$O(N \times amount)$，这里 $N$ 是可选硬币的种类数，$amount$ 是题目输入的面值；
+ 空间复杂度：$O(amount)$，状态数组的大小为 $amount$。

---

### 方法二：广度优先遍历

具体在纸上画一下，就知道这其实是一个在「图」上的最短路径问题，「广度优先遍历」是求解这一类问题的算法。广度优先遍历借助「队列」实现。

![image.png](https://pic.leetcode-cn.com/144770504b1560d414b9cbcb69ad4203e40b868f51b8c95de1106d1eac7d1e0a-image.png)

**注意**：
+ 由于是「图」，有回路，所以需要一个 `visited` 数组，记录哪一些结点已经访问过。
+ 在添加到队列的时候，就得将 `visited` 数组对应的值设置为 `true`，否则可能会出现同一个元素多次入队的情况。

**参考代码 3**：

```Java []
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    public int coinChange(int[] coins, int amount) {
        if (amount == 0) {
            return 0;
        }

        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[amount + 1];

        visited[amount] = true;
        queue.offer(amount);

        // 排序是为了加快广度优先遍历过程中，对硬币面值的遍历，起到剪枝的效果
        Arrays.sort(coins);

        int step = 1;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                Integer head = queue.poll();
                for (int coin : coins) {
                    int next = head - coin;
                    // 只要遇到 0，就找到了一个最短路径
                    if (next == 0) {
                        return step;
                    }

                    if (next < 0) {
                        // 由于 coins 升序排序，后面的面值会越来越大，剪枝
                        break;
                    }

                    if (!visited[next]) {
                        queue.offer(next);
                        // 添加到队列的时候，就应该立即设置为 true
                        // 否则还会发生重复访问
                        visited[next] = true;
                    }
                }
            }
            step++;
        }
        // 进入队列的顶点都出队，都没有看到 0 ，就表示凑不出当前面值
        return -1;
    }
}
```

**复杂度分析**：（待纠正）

+ 时间复杂度：$O(amount)$，这里 $amount$ 是题目输入的面值；
+ 空间复杂度：$O(amount)$，队列的大小为 $amount$。

---


### 方法三：套「完全背包」问题的公式

为什么是「完全背包」问题：

+ 每个硬币可以使用无限次；
+ 硬币总额有限制；
+ 并且具体组合是顺序无关的，还以示例 1 为例：面值总额为 `11`，方案 `[1, 5, 5]` 和方案 `[5, 1, 5]` 视为同一种方案。

但是与「完全」背包问题不一样的地方是：

+ 要求恰好填满容积为 `amount` 的背包，重点是「恰好」、「刚刚好」，而原始的「完全背包」问题只是要求「不超过」；
+ 题目问的是总的硬币数最少，原始的「完全背包」问题让我们求的是总价值最多。

这一点可以认为是：每一个硬币有一个「占用空间」属性，并且值是固定的，固定值为 $1$；作为「占用空间」而言，考虑的最小化是有意义的。等价于把「完全背包」问题的「体积」和「价值」属性调换了一下。因此，这个问题的背景是「完全背包」问题。

可以使用「完全背包」问题的解题思路（「0-1 背包」问题也是这个思路）：

一个一个硬币去看，一点点扩大考虑的价值的范围（自底向上考虑问题的思想）。其实就是在不断地做尝试和比较，实际生活中，人也是这么干的，「盗贼」拿东西也是这样的，看到一个体积小，价值大的东西，就会从背包里把占用地方大，廉价的物品换出来。

所以在代码里：外层循环先遍历的是硬币面值，内层循环遍历的是面值总和。

**说明**：以下代码提供的是「完全背包」问题「最终版本」的代码。建议读者按照以下路径进行学习，相信就不难理解这个代码为什么这样写了。

+ 「0-1 背包」问题，二维表格的写法；
+ 「0-1 背包」问题，滚动数组的写法；
+ 「0-1 背包」问题只用一行，从后向前覆盖赋值的写法（因为只关心最后一行最后一格数值，每个单元格只参考它上一行，并且是正上方以及正上方左边的单元格数值）；
+ 「完全背包」问题，二维表格的写法（最朴素的解法，枚举每个硬币可以选用的个数）；
+ 「完全背包」问题，优化了「状态转移方程」的二维表格的写法（每一行只参考了上一行正上方的数值，和当前行左边的数值）；
+ 「完全背包」问题压缩成一行的写法，正好与「0-1 背包」问题相反，「0-1 背包」问题倒着写，「完全背包」问题正着写（看看填表顺序，就明白了）。

（这里省略了 2 版代码，请读者自己学习背包问题的知识，将它们补上。）

**参考代码 4**：

```Java []
import java.util.Arrays;

public class Solution {

    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }

        if (dp[amount] == amount + 1) {
            dp[amount] = -1;
        }
        return dp[amount];
    }
}
```

**复杂度分析**：（待纠正）

+ 时间复杂度：$O(N \times amount)$，这里 $N$ 是可选硬币的种类数，$amount$ 是题目输入的面值；
+ 空间复杂度：$O(amount)$，状态数组的大小为 $amount$。

