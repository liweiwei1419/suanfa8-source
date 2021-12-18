---
title: 「力扣」第 494 题：目标和
date: 2018-05-09 08:00:00
author: liweiwei419
top: false
mathjax: true
categories: 专题 15：动态规划
tags:
  - 动态规划
permalink: leetcode-algo/0494-target-sum
---

## 「力扣」第 494 题：目标和

+ [链接](https://leetcode-cn.com/problems/combination-sum/)
+ [题解链接](https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-2/)

给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 `+` 和 `-`对于数组中的任意一个整数，你都可以从 `+` 或 `-`中选择一个符号添加在前面。

返回可以使最终数组和为目标数 S 的所有添加符号的方法数。

**示例 1:**

```
输入: nums: [1, 1, 1, 1, 1], S: 3
输出: 5
解释: 

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

一共有5种方法让最终目标和为3。
```

**注意:**

1. 数组的长度不会超过20，并且数组中的值全为正数。
2. 初始的数组的和不会超过1000。
3. 保证返回的最终结果为32位整数。

### 方法一：回溯算法

Java 代码：

```java
class Solution {

    public int findTargetSumWays(int[] nums, int S) {
        return findTargetSumWays(nums, 0, S, 0);
    }

    private int findTargetSumWays(int[] nums, int index, int S, int sum) {
        int res = 0;
        if (index == nums.length) {
            return sum == S ? ++res : res;
        }
        res += findTargetSumWays(nums, index + 1, S, sum + nums[index]);
        res += findTargetSumWays(nums, index + 1, S, sum - nums[index]);
        return res;
    }
}
```

Python 代码：提交到 LeetCode 上会超时

```python
class Solution:

    def __init__(self):
        self.res = 0

    def findTargetSumWays(self, nums, S):
        """
        :type nums: List[int]
        :type S: int
        :rtype: int
        """
        size = len(nums)

        self.__dfs(nums, size, 0, 0, S)
        return self.res

    def __dfs(self, nums, size, start, cur_sum, S):
        if start == size:
            # 到尾巴了，看看累积和是不是达到 S 了
            if cur_sum == S:
                self.res += 1
                return
        else:
            self.__dfs(nums, size, start + 1, cur_sum + nums[start], S)
            self.__dfs(nums, size, start + 1, cur_sum - nums[start], S)


if __name__ == '__main__':
    solution = Solution()
    nums = [35, 25, 24, 23, 2, 47, 39, 22, 3, 7, 11, 26, 6, 30, 5, 34, 10, 43, 41, 28]
    S = 49
    result = solution.findTargetSumWays(nums, S)
    print(result)

```

C++ 代码：

```c++
class Solution {
    int res=0;
    int sum=0;
    int len=0;
    
public:
    int findTargetSumWays(vector<int>& nums, int S) {
        len=nums.size();
        dfs(nums,0,S);
        return res;
        
    }
    
    void dfs(vector<int>& nums,int p,int s){
        if(p==len){
            if(s==sum)++res;
            return;
        }
        sum+=nums[p];
        dfs(nums,p+1,s);
        sum-=2*nums[p];
        dfs(nums,p+1,s);
        sum+=nums[p];
    }
};
```

### 方法二：动态规划

其实是一个 01 背包问题。原问题等价于： 找到 `nums` 的两个子集，对这个两个子集分解求和，然后作差等于 `target`。我们假设 `P` 是其中一个子集，`N` 是剩下的元素组成的子集。

例如： 假设 `nums = [1, 2, 3, 4, 5]`，`target = 3`，一个可能的解决方案是 `+1 - 2 + 3 - 4 + 5 = 3`，这里子集`P = [1, 3, 5]`，子集 `N = [2, 4]`。

那么让我们看看如何将其转换 0-1 背包问题：

因为 `sum(P) - sum(N) = target`，等式两边都加上 `sum(nums)`，得：

`2 * sum(P) = target + sum(nums)  `。

因此，原来的问题已转化为一个求子集的和问题： 找到 `nums` 的一个子集 `P`，使得 `sum(P) = (target + sum(nums)) / 2`。

请注意，上面的公式已经证明 `target + sum(nums)` 必须是偶数，否则输出为 `0`。

Python 代码：

```python
class Solution:
    def findTargetSumWays(self, nums, S):
        """
        :type nums: List[int]
        :type S: int
        :rtype: int
        """
        size = len(nums)
        ss = sum(nums)
        target = ss + S
        if size == 0 or target & 1:
            return 0

        # 除以 2
        target >>= 1
        # 因为题目中给出的是非负整数，因此这一步可以提前判断是否有解
        if target > ss:
            return 0

        dp = [[0 for _ in range(target + 1)] for _ in range(size)]

        # 这一步不要忘记了
        dp[0][0] = 1
        for j in range(target + 1):
            if nums[0] == j:
                dp[0][j] += 1

        for i in range(1, size):
            for j in range(target + 1):
                # 至少是不选这个物品时候的种数
                dp[i][j] += dp[i - 1][j]
                if j >= nums[i]:
                    dp[i][j] += dp[i - 1][j - nums[i]]
        return dp[-1][-1]


if __name__ == '__main__':
    solution = Solution()
    # nums = [1, 1, 1, 1, 1]
    # S = 3
    nums = [35, 25, 24, 23, 2, 47, 39, 22, 3, 7, 11, 26, 6, 30, 5, 34, 10, 43, 41, 28]
    S = 49
    result = solution.findTargetSumWays(nums, S)
    print(result)
```

---


Java 代码：
```java
public class Solution {

    public int findTargetSumWays(int[] nums, int S) {
        int len = nums.length;

        if (len == 0) {
            return 0;
        }

        int sum = 0;
        for (int num : nums) {
            sum += num;
        }

        if (S > sum) {
            return 0;
        }

        int target = sum + S;
        if ((target & 1) != 0) {
            return 0;
        }

        target >>>= 1;

        int[][] dp = new int[len][target + 1];
        dp[0][0] = 1;
        for (int j = 0; j < target + 1; j++) {
            if (nums[0] == j) {
                dp[0][j] += 1;
            }
        }

        for (int i = 1; i < len; i++) {
            for (int j = 0; j < target + 1; j++) {
                // 至少是不选这个物品时候的种数
                dp[i][j] += dp[i - 1][j];
                if (j >= nums[i]) {
                    dp[i][j] += dp[i - 1][j - nums[i]];
                }
            }
        }
        return dp[len - 1][target];
    }
}
```

状态压缩的写法：

Java 代码：

```java
public class Solution3 {

    public int findTargetSumWays(int[] nums, int S) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }

        int sum = 0;
        for (int num : nums) {
            sum += num;
        }

        if (S > sum) {
            return 0;
        }

        int target = sum + S;
        if ((target & 1) != 0) {
            return 0;
        }

        target >>>= 1;

        int[] dp = new int[target + 1];
        dp[0] = 1;

        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        return dp[target];
    }
}
```