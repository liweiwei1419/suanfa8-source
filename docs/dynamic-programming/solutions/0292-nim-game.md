---
title: 「力扣」第 292 题：Nim 游戏（简单）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---


+ 题目链接：[292. Nim 游戏](https://leetcode-cn.com/problems/nim-game/)；
+ 题解链接：[记忆化递归、动态规划、观察规律（Java）](https://leetcode-cn.com/problems/nim-game/solution/ji-yi-hua-di-gui-dong-tai-gui-hua-guan-cha-gui-lu-/)。




思路分析：画图找出规律，想一想：

+ 为什么在两个人「足够聪明」（你们是聪明人，每一步都是最优解）这个前提下，比赛的结果是「由输入数据确定的」；
+ 什么叫「足够聪明」。

这两个问题是我最初做这道问题的时候产生的疑惑，在题解的最后我写了我的答案，供大家参考，欢迎讨论。

![image.png](https://pic.leetcode-cn.com/390f34dab8160e1f689da057d3a5666396be6dcbfb9a08a3c0e3e96c44423246-image.png)


用具体的例子 8 进行分析可以得出结论：
+ 当 $N = 3$ 的时候，当前做出选择的人可以拿掉最后一块石头，获得胜利；
+ 然后我们逐层向上分析，当 $N = 4$ 的时候，无论当前做出哪一种选择，对方都会赢，所以当前只能输掉比赛；
+ 如果当前这一层的结点里「有输有赢」，因为我们「足够聪明」，所以**必须选择可以让对方输掉的分支，好让自己赢**；
+ 对于这个问题的特点是，当 $N$ 不是 $4$ 的倍数的时候，先手（当前做出选择的人），或者说游戏一开始做出选择的玩家一定会输。


### 方法一：记忆化递归（超出内存限制）

```Java []
public class Solution {

    public boolean canWinNim(int n) {
        // 使用包装类型的布尔数组，可以用 null 这个状态，表示当前 n 的结果还没有被计算出来
        Boolean[] memo = new Boolean[n + 1];
        return dfs(n, memo);
    }

    private boolean dfs(int n, Boolean[] memo) {
        if (n <= 3) {
            return true;
        }

        if (memo[n] != null) {
            return memo[n];
        }

        // 如果 3 种选择，只要有一种对方输掉，自己就可以赢
        if (!dfs(n - 1, memo) || !dfs(n - 2, memo) || !dfs(n - 3, memo)) {
            memo[n] = true;
            return true;
        }
        // 否则自己输
        memo[n] = false;
        return false;
    }
}
```

![image.png](https://pic.leetcode-cn.com/f7397e22104799f63701e0b95db08ed6cef33f6cdda6a488abac859da1eca5e7-image.png)


### 方法二：动态规划（超出内存限制）

```java []
public class Solution {

    public boolean canWinNim(int n) {
        if (n <= 3) {
            return true;
        }

        boolean[] dp = new boolean[n + 1];

        // dp[0] 的值可以不管，没有意义
        dp[1] = true;
        dp[2] = true;
        dp[3] = true;
        for (int i = 4; i <= n; i++) {
            dp[i] = !dp[i - 1] || !dp[i - 2] || !dp[i - 3];
        }
        return dp[n];
    }
}
```

![image.png](https://pic.leetcode-cn.com/b1dd96863027d2ecfeec03b44029ed26ac8e69e4110378ea8b5cace72465db00-image.png)


采用「滚动数组」优化，这回是「超时」。

```Java []
public class Solution {

    public boolean canWinNim(int n) {
        if (n <= 3) {
            return true;
        }

        boolean[] dp = new boolean[4];
        dp[0] = false;
        dp[1] = true;
        dp[2] = true;
        dp[3] = true;
        for (int i = 4; i <= n; i++) {
            dp[i % 4] = !dp[(i - 1) % 4] || !dp[(i - 2) % 4] || !dp[(i - 3) % 4];
        }
        return dp[n % 4];
    }
}
```

![image.png](https://pic.leetcode-cn.com/81d841f043ce0ee0e72e9d51e5c2254afd9b176f8027c0c942337a9e8a75af1c-image.png)


### 方法三：数学方法（观察规律得到，可以通过）

```Java []
public class Solution {

    public boolean canWinNim(int n) {
        return (n % 4) != 0;
    }
}
```

回答开头的两个问题：

+ 因为一定会遇到一个特殊情况，或者说基线情况，「没得选」导致结果确定，而每一步两个人都「足够聪明」，都做出对自己最有利，让对方最不利的那个选择，不会有一个人让步，所以比赛的结果完全由输入数据决定；
+ 「足够聪明」体现的思想是「你的对手是最懂你的人」，双方都考虑了所有可能的选择（包括自己的和对手的），有可能是用了「动态规划」或者是「数学方法」，一般情况下不可能是「贪心」，或者说不可能只考虑了当前的情况。
