---
title: 「力扣」第 279 题：完全平方数（中等）
icon: yongyan
categories: 动态规划
tags:
  - 动态规划
---



+ [链接](https://leetcode-cn.com/problems/perfect-squares/)

给定正整数 *n*，找到若干个完全平方数（比如 `1, 4, 9, 16, ...`）使得它们的和等于 *n*你需要让组成和的完全平方数的个数最少。

**示例 1:**

```
输入: n = 12
输出: 3 
解释: 12 = 4 + 4 + 4.
```

**示例 2:**

```
输入: n = 13
输出: 2
解释: 13 = 4 + 9.
```


### 方法一：动态规划

状态就是题目中要问的问题。

分析：这个问题的关键就在于“拆”，既然可以“拆”成多个的情况，那么最基本的情况就是“拆”成两个，这两个中，有一个是“干净”的完全平方数，还有一个是没有被“拆”干净的数（对于小的数我们人可以一眼看出，计算机看不出），所以还要继续“拆”。所以递归结构是这样的：

![LeetCode 第 279 题：完全平方数-1](https://liweiwei1419.gitee.io/images/leetcode-notes/dp/dynamic-programming-3-5.jpg)

例如：如果自己是完全平方数，就返回 $1$。否则就是如下所有情况的最小值，我们以 $13$ 为例进行说明：

![LeetCode 第 279 题：完全平方数-2](https://liweiwei1419.gitee.io/images/leetcode-notes/dp/dynamic-programming-3-6.jpg)

$13$ 得到的解为 $2$，其实就是 第 2 行和第 3 行的情况。

再以 $17$ 为例：

![LeetCode 第 279 题：完全平方数-3](https://liweiwei1419.gitee.io/images/leetcode-notes/dp/dynamic-programming-3-7.jpg)

$17$ 得到的解也为 $2$，看第 $1$ 行就知道了。

特别注意：剩余的那个数如果等于 $0$ 是完全可以的。我们定义这个问题中 $0$ 和小于 $0$ 的时候，解全部为 $0$。这一点也是非常合理的，因为小于等于 $0$ 的数，都不能表示成“正整数”的完全平方数的和。此时当前考虑的这个数，就一定是完全平方数，直接返回 $1$ 就可以了。例如：

![LeetCode 第 279 题：完全平方数-4](https://liweiwei1419.gitee.io/images/leetcode-notes/dp/dynamic-programming-3-8.jpg)

Java 代码：

代码实现要注意的地方：

1、因为大的值要依赖小的值，所以求解 $25$ 会依赖比它小的值，这是设立外层循环的原因；

2、内层循环的终止条件是 `i - j * j >= 0`，体会这里 `= 0` 是为什么；

3、既然是求最小值，默认值就应该是一个很大的值，但其实，最大的值不会超过 $4$。

注意到，结果最多是 4。

Java 代码：

```java
import java.util.Arrays;

class Solution {
    public int numSquares(int n) {
        // 0 要占用一个位置
        int[] dp = new int[n + 1];
        
        // 赋初值，设置成为 4 是数学定理保证
        Arrays.fill(dp, 4);
        // 该值被参考，设置成 0
        dp[0] = 0;
        
        // 一个一个求，自底向上
        for (int i = 1; i <= n; i++) {
            for (int k = 0; k * k <= i; k++) {
                dp[i] = Math.min(dp[i], dp[i - k * k] + 1);
            }
        }
        return dp[n];
    }
}
```

Python 代码：（超时）

```python
class Solution:
  
    def numSquares(self, n: int) -> int:
        dp = [n] * (n + 1)
        for i in range(n):
            if i * i <= n:
                dp[i * i] = 1

        for i in range(1, n + 1):
            for j in range(i):
                if i + j * j <= n:
                    dp[i + j * j] = min(dp[i] + 1, dp[i + j * j])
        return dp[-1]
```

### 方法二：广度优先遍历

建模成一个图论问题，转换成图论上的最短路径屋内。

还可以使用广度优先遍历完成：

下面这篇文章中的动画清晰地展示了使用“广度优先遍历”的方法。传送门：[图解LeetCode第 279 号问题： 完全平方数](https://mp.weixin.qq.com/s/53AlHe29fJF1hEwj0cj7ZA)。



<img src="https://tva1.sinaimg.cn/large/00831rSTly1gczk8b3qbej30n80gsmz9.jpg" alt="image-20200319213108554" style="zoom:67%;" />





注意：BFS 的写法。

1、使用队列；

2、使用一个数组，表示是否访问过。

Java 代码：

```java
import java.util.ArrayDeque;
import java.util.Queue;


public class Solution {

    public int numSquares(int n) {
        // 如果访问过，就应该设置为 false
        boolean[] visited = new boolean[n + 1];
        Queue<Integer> queue = new ArrayDeque<>();
        queue.add(n);
        int step = 1;
        while (!queue.isEmpty()) {

            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int head = queue.poll();
                for (int k = 1; k * k <= head; k++) {
                    if (k * k == head) {
                        return step;
                    }

                    int next = head - k * k;
                    if (!visited[next]) {
                        queue.offer(next);
                        visited[next] = true;
                    }
                }
            }
            step ++;
        }

        // 正常情况下是不会走到这句的
        throw new IllegalArgumentException("参数错误");
    }

    public static void main(String[] args) {
        int n = 7168;
        Solution s = new Solution();
        int numSquares = s.numSquares(n);
        System.out.println(numSquares);
    }
}
```



