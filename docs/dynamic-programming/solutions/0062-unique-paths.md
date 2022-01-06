---
title: 「力扣」第 62 题：不同路径（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---


二维动态规划的基础问题，可以当做例题来学习。

重点理解「无后效性」的两层含义：

1. 即后面的状态参考了前面的结果，而不管前面的状态是怎么来的；
2. 后面阶段的选择不会影响到前面阶段的选择。

+ [题目链接](https://leetcode-cn.com/problems/unique-paths/)
+ [英文链接](https://leetcode.com/problems/unique-paths/description/) 

## 题目描述

一个机器人位于一个 `m x n` 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？



![](https://liweiwei1419.gitee.io/images/leetcode-notes/dp/dynamic-programming-3-11.jpg)

例如，上图是一个7 x 3 的网格。有多少可能的路径？

示例 1：

```
输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。

1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右
```

示例 2：

```
输入: m = 7, n = 3
输出: 28
```


提示：

+ `1 <= m, n <= 100`
+ 题目数据保证答案小于等于 `2 * 10 ^ 9`

## 方法一：动态规划

其实就是填写二维表格。

+ 状态：`dp[i][j]` 表示走到坐标 `(i, j)` 的路径总数；


+ 状态转移方程：思路依然是分类讨论，走到坐标 `(i, j)`  可以从上方下来，也可以从左边过来，路径总数是二者之和；

```java
dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
```

当前 `dp[i][j]` 值的来源：上面和前面的值之和。

+ 初始化：数组 `dp` 的第 1 行和第 1 列都得显示赋值为 1；
+ 输出：`dp[m - 1][n - 1]`。
+ 表格复用：可以滚动数组，也可以只压缩到一维。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    // 语义清晰，但是空间可以只用一行

    public int uniquePaths(int m, int n) {
        if (m < 0 || n < 0) {
            return 0;
        }
        int[][] dp = new int[m][n];
        // 第 1 行（行索引为 0）只能沿着边缘走
        for (int i = 0; i < n; i++) {
            dp[0][i] = 1;
        }
        // 第 1 列（列索引为 0）只能沿着边缘走
        for (int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }

    public static void main(String[] args) {
        // 输入: m = 7, n = 3
        // 输出: 28
        Solution solution = new Solution();
        int m = 7;
        int n = 3;
        int uniquePaths = solution.uniquePaths(m, n);
        System.out.println(uniquePaths);
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[0 for _ in range(n)] for _ in range(m)]
        dp[0][0] = 1

        for i in range(m):
            for j in range(n):
                if i == 0:
                    if j == 0:
                        continue
                    dp[0][j] = dp[0][j - 1]
                elif j == 0:

                    dp[i][0] = dp[i - 1][0]
                else:
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        return dp[- 1][- 1]


if __name__ == '__main__':
    s = Solution()
    res = s.uniquePaths(7, 3)
    print(res)
```
</CodeGroupItem>
</CodeGroup>



动态规划得到的 `dp` 数组：`[[1, 1, 1, 1], [1, 2, 3, 4], [1, 3, 6, 10], [1, 4, 10, 20], [1, 5, 15, 35]]`。




* 增加「哨兵」的写法，少写一些特殊判断，这个技巧比较常见。

如何想到的：把状态表格抄一遍，或者自己把矩阵画出来，就能知道这个数组怎么来的。每一行，只依赖上一行的结果，我们完全可以用一行来逐步更新。第 1 个元素肯定是 `1`，并且第 1 行元素肯定全是 `1`。

初始化的时候比较麻烦，因此可以考虑「哨兵」写法，将数组 `dp` 多写一行，多写一列。

**参考代码**：

```java
public class Solution {

    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m + 1][n + 1];
        // 初始化的时候 dp[0][1] = 1; 或者 dp[1][0] = 1; 均可
        dp[1][0] = 1;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dp[i + 1][j + 1] = dp[i][j + 1] + dp[i + 1][j];
            }
        }
        return dp[m][n];
    }

    public static void main(String[] args) {
        // 输入: m = 7, n = 3
        // 输出: 28
        Solution2 solution = new Solution2();
        int m = 7;
        int n = 3;
        int uniquePaths = solution.uniquePaths(m, n);
        System.out.println(uniquePaths);
    }
}
```

Python 代码：

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [[0 for _ in range(n + 1)] for _ in range(m + 1)]
        dp[1][0] = 1
        for i in range(m):
            for j in range(n):
                dp[i + 1][j + 1] = dp[i][j + 1] + dp[i + 1][j]
        return dp[m][n]


if __name__ == '__main__':
    s = Solution()
    res = s.uniquePaths(7, 3)
    print(res)
```

+ 一维动态规划表格

注意到其实在左边第一行和上边第一行，肯定都为 $1$，还有就是新一行的值只与上一行有关，所以我们完全可以只设置一维数组，将这道题完成。其实使用 $2$ 个变量也可以完成，但是这样的代码可读性比较差，在这里就不写了。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        dp[0] = 1;

        for (int i = 0; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }

    public static void main(String[] args) {
        // 输入: m = 7, n = 3
        // 输出: 28
        Solution3 solution = new Solution3();
        int m = 7;
        int n = 3;
        int uniquePaths = solution.uniquePaths(m, n);
        System.out.println(uniquePaths);
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for i in range(1, m):
            # 从下标 2 开始走就行了
            for j in range(1, n):
                dp[j] = dp[j] + dp[j - 1]
        return dp[-1]


if __name__ == '__main__':
    m = 3
    n = 4
    solution = Solution()
    result = solution.uniquePaths(m, n)
    print(result)
```
</CodeGroupItem>
</CodeGroup>





## 方法二：数学方法（用组合数公式）

用组合数来求解，走到坐标为 `(m, n)` 的地方，向下走 `m - 1` 格，向右边走 `n - 1` 格。一共走 `m + n - 2` 格。

即：机器人一定会走 $m+n-2$ 步，即从 $m+n-2$ 中挑出 $m-1$ 步向下走即可，即 $C_{m+n-2}^{m-1}$ 为所求。

**参考代码**：

```python
class Solution:
    

    def __factorial(self, n):
        res = 1
        while n > 1:
            res *= n
            n -= 1
        return res

    def __combination(self, m, n):
        """
        从 n 个物品里选出 m 个物品的组合数
        :param m:
        :param n:
        :return:
        """
        return self.__factorial(n) // (self.__factorial(m) * self.__factorial(n - m))

   def uniquePaths(self, m: int, n: int) -> int:
        return self.__combination(m - 1, m + n - 2)


if __name__ == '__main__':
    m = 7
    n = 3
    solution = Solution()
    result = solution.uniquePaths(m, n)
    print(result)
```

### 方法三：记忆化递归

**参考代码**：

```python
class Solution:

    def __init__(self):
        self.cached = None

    def __path(self, i, j):
        if self.cached[i][j] != 0:
            return self.cached[i][j]

        if i == 0 and j == 0:
            return 1
        path_ways = 0
        if i == 0:
            path_ways = self.__path(0, j - 1)
        elif j == 0:
            path_ways = self.__path(i - 1, 0)
        else:
            path_ways = self.__path(i, j - 1) + self.__path(i - 1, j)
        self.cached[i][j] = path_ways
        return path_ways

    def uniquePaths(self, m, n):
        """
        :type m: int
        :type n: int
        :rtype: int
        """
        self.cached = [[0 for _ in range(n)] for _ in range(m)]

        return self.__path(m - 1, n - 1)
```

用测试用例得到的缓存数组：`[[0, 1, 1, 1], [1, 2, 3, 4], [1, 3, 6, 10], [1, 4, 10, 20], [1, 5, 15, 35]]`。





