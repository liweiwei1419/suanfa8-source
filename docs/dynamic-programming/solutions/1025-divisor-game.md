---
title: 「力扣」第 1025 题：除数博弈（简单）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

+ 题目链接：[1025. 除数博弈](https://leetcode-cn.com/problems/divisor-game/)；
+ 题解链接：[记忆化递归、动态规划、数学方法（Java）](https://leetcode-cn.com/problems/divisor-game/solution/ji-yi-hua-di-gui-dong-tai-gui-hua-shu-xue-fang-fa-/)。

## 题目描述

爱丽丝和鲍勃一起玩游戏，他们轮流行动。爱丽丝先手开局。

最初，黑板上有一个数字 `N` 。在每个玩家的回合，玩家需要执行以下操作：

- 选出任一 `x`，满足 `0 < x < N` 且 `N % x == 0` 。
- 用 `N - x` 替换黑板上的数字 `N` 。

如果玩家无法执行这些操作，就会输掉游戏。

只有在爱丽丝在游戏中取得胜利时才返回 `True`，否则返回 `False`。假设两个玩家都以最佳状态参与游戏。

**示例 1：**

```
输入：2
输出：true
解释：爱丽丝选择 1，鲍勃无法进行操作。
```

**示例 2：**

```
输入：3
输出：false
解释：爱丽丝选择 1，鲍勃也选择 1，然后爱丽丝无法进行操作。
```

 **提示：**

1. `1 <= N <= 1000`

## 思路分析

拿一个具体的数值，根据题意分析下去。


![image.png](https://pic.leetcode-cn.com/3dcd82b4b436e2630873de4fd5f7535ddd4afbd9d33a0eb256ea3a9ff1dc61b7-image.png)



得出结论：

+ 这是一个树形问题，并且有很多重复子问题；
+ 最基本的情况是：当前数是 $1$ 的时候，游戏进行不下去了（根据题意）；
+ 当前数是 $2$ 的时候，我们只能选择 $1$，而留给对方的是 $2 - 1 = 1$，根据上一点，对方一定输；
+ 从这棵树的底部向上看，只要是枝叶里有出现「输」的，说明在上一步，可以选择这条路，让对方「输」，自己就会「赢」；
+ 由于有 $1$ 这个很特殊的数字存在，从叶子结点到根结点的路径是「输」、「赢」交替进行的。

我们这里给出 3 种写法：记忆化递归、动态规划、数学解法。 

博弈类动态规划问题的特点：

+ 两个人的操作交替进行；
+ 假设每一个人都「足够聪明」，我的理解是：**每一步都假设他们使用了「动态规划」考虑了所有可能的情况，走出了最有利于自己的那一步**。

解决博弈类动态规划问题的方法：

+ 多见一些问题；
+ 画图分析，通常都是由一个最基本的情况导致了全局的情况，所以博弈类动态规划问题有这样的特点，其实输入的数据就决定了结果；
+ 每一步通常有多种选择，所以先用「记忆化递归」，然后再改成「动态规划」可能是一个相对比较好的学习路径；
+ 还有一类博弈类问题的思路是这样的：考虑「自己受益最大化」等价于「自己的选择可以让对方的受益最小」，所以「对方获得」这件事情就相当于「自己失去」，因此在设计状态和设计递归函数的时候，最大化的目标值是「相对分数」，「力扣」上有一类问题叫做「极小化极大」大概是这个思路。


### 方法一：记忆化递归

由于这个树形问题有重复子问题，因此可以使用记忆化递归。

```Java []
public class Solution {

    public boolean divisorGame(int N) {
        if (N == 1) {
            return false;
        }
        // 使用包装类型的布尔数组是利用了包装类型的一个特殊的状态 null，表示当前状态还没计算出来
        Boolean[] memo = new Boolean[N + 1];
        return dfs(N, memo);
    }

    private boolean dfs(int n, Boolean[] memo) {
        if (n == 1) {
            return false;
        }
        if (n == 2) {
            return true;
        }

        if (memo[n] != null) {
            return memo[n];
        }

        boolean canWin = false;
        // n / 2 是下取整，所以可以取等号
        for (int i = 1; i <= n / 2; i++) {
            if (n % i == 0 && !dfs(n - i, memo)) {
                // 当前先手，如果对手的下一个状态值有 false，就说明我们可以赢
                canWin = true;
                // 由于假设两边都足够聪明，因此我们赢了以后，就可以退出循环了
                break;
            }
        }
        memo[n] = canWin;
        return canWin;
    }
}
```

### 方法二：动态规划


```Java []
public class Solution {

    public boolean divisorGame(int N) {
        if (N == 1) {
            return false;
        }

        // 为了不处理下标偏移，多设置 1 格
        // dp[i]：黑板上的数字为 i 时，当前做出选择的人是否会赢
        boolean[] dp = new boolean[N + 1];
        // 最基本情况（如图所示）
        dp[1] = false;
        dp[2] = true;

        // 以线性的方式逐步递推得到结果
        for (int i = 3; i <= N; i++) {
            for (int j = 1; j <= i / 2; j++) {
                // 只要做出的选择的其中之一，能让对方输，在当前这一步我们就可以赢
                if ((i % j == 0) && !dp[i - j]) {
                    dp[i] = true;
                    break;
                }
            }
        }
        // 根据题意：输出是 dp[N]
        return dp[N];
    }
}
```

### 方法三：数学方法

根据上面的画图分析，归纳出来的，不是严格证明。

```Java []
public class Solution {

    public boolean divisorGame(int N) {
        return N % 2 == 0;
    }
}
```


### 参考资料

+ [官方题解](https://leetcode-cn.com/problems/divisor-game/solution/chu-shu-bo-yi-by-leetcode-solution/)