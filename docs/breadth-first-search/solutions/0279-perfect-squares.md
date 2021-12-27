---
title: 「力扣」第 279 题：完全平方式
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
---

+ 题目链接：[279. 完全平方数](https://leetcode-cn.com/problems/perfect-squares/)。

## 题目描述

给定正整数 *n*，找到若干个完全平方数（比如 `1, 4, 9, 16, ...`）使得它们的和等于 *n*。你需要让组成和的完全平方数的个数最少。

给你一个整数 `n` ，返回和为 `n` 的完全平方数的 **最少数量** 。

**完全平方数** 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，`1`、`4`、`9` 和 `16` 都是完全平方数，而 `3` 和 `11` 不是。

**示例 1：**

```
输入：n = 12
输出：3 
解释：12 = 4 + 4 + 4
```

**示例 2：**

```
输入：n = 13
输出：2
解释：13 = 4 + 9
```

**提示：**

- `1 <= n <= 104`

## 思路分析

Java 代码：

```java
import java.util.ArrayDeque;
import java.util.LinkedList;
import java.util.Queue;


public class Solution {

    public int numSquares(int n) {
        // 是否访问过
        boolean[] visited = new boolean[n + 1];
        
        Queue<Integer> queue = new LinkedList<>();
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

Python 代码：

```python
class Solution:
    def numSquares(self, n: int) -> int:

        if n == 1:
            return 1
        if n ** 0.5 == int(n ** 0.5):
            return 1

        # 加法因子的候选集
        square_set = set()

        for i in range(1, n // 2 + 1):
            square = i * i
            if square <= n:
                square_set.add(square)
            else:
                break
        depth = 1
        non_leaf_node = [n]
        while len(non_leaf_node) != 0:
            depth += 1
            current_plus_factor = []
            for element in non_leaf_node:
                for s in square_set:
                    if element - s in square_set:
                        return depth
                    else:
                        current_plus_factor.append(element - s)
            non_leaf_node = current_plus_factor


if __name__ == '__main__':
    s = Solution()
    res = s.numSquares(4)
    print('结果', res)

```

Python 代码：

```python
class Solution:
    def numSquares(self, n: int) -> int:
        marked = [False for _ in range(n)]
        queue = [(0, n)]
        while queue:
            level, top = queue.pop(0)
            level += 1
            start = 1
            while True:
                residue = top - start * start
                if residue == 0:
                    return level
                elif residue < 0:
                    break
                else:
                    if not marked[residue]:
                        queue.append((level, residue))
                        marked[residue] = True
                start += 1


if __name__ == '__main__':
    s = Solution()
    res = s.numSquares(4)
    print('结果', res)
```

Python 代码：

```python
from collections import deque

# 不知道用数组好还是用哈希表去重好

class Solution:
    def numSquares(self, n: int) -> int:
        square_root = int(n ** 0.5)
        # print(square_root)

        squares = [num ** 2 for num in range(1, square_root + 1)]
        # print(squares)

        queue = deque()
        queue.append((1, n))
        s = set()
        s.add(n)

        while queue:
            # print(queue)
            level, top = queue.popleft()
            for num in squares:
                residue = top - num
                if residue < 0:
                    break
                if residue == 0:
                    return level
                if residue not in s:
                    queue.append((level + 1, residue))
                    s.add(residue)


if __name__ == '__main__':
    n = 19
    solution = Solution()
    res = solution.numSquares(n)
    print(res)
```

### 方法二：动态规划

Java 代码：

```java
import java.util.Arrays;

class Solution {

    // 说明 dp[0] = 0; 的合理性
    // 表达式 1 + dp[i - j * j] = 1 ，表示它自己就是一个完全平方式，所以结果是 1

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

    public static void main(String[] args) {
        int n = 7168;
        Solution solution = new Solution();
        int numSquares = solution.numSquares(n);
        System.out.println(numSquares);
    }
}
```

