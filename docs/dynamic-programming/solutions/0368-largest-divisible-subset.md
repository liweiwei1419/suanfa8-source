---
title: 「力扣」第 368 题：最大整除子集（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

+ 题目链接：[368. 最大整除子集](https://leetcode-cn.com/problems/largest-divisible-subset/)。

> 说明：本题我参与了官方题解的编写，所以本文内容与官方题解一致。

## 题目描述

给你一个由 **无重复** 正整数组成的集合 `nums` ，请你找出并返回其中最大的整除子集 `answer` ，子集中每一元素对 `(answer[i], answer[j])` 都应当满足：

- `answer[i] % answer[j] == 0` ，或
- `answer[j] % answer[i] == 0`

如果存在多个有效解子集，返回其中任何一个均可。

 

**示例 1：**

```
输入：nums = [1,2,3]
输出：[1,2]
解释：[1,3] 也会被视为正确答案。
```

**示例 2：**

```
输入：nums = [1,2,4,8]
输出：[1,2,4,8]
```

**提示：**

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 2 * 109`
- `nums` 中的所有整数 **互不相同**

---


首先需要理解什么叫「整除子集」。根据题目的描述，如果一个所有元素**互不相同**的集合中的**任意**元素存在整除关系，就称为整除子集。为了得到「最大整除子集」，我们需要考虑**如何从一个小的整除子集扩充成为更大的整除子集**。

根据整除关系具有传递性，即如果 $a\big|b$，并且 $b\big|c$，那么 $a\big|c$，可知：

- 如果整数 $a$ 是整除子集 $S_1$ 的最小整数 $b$ 的约数（即 $a\big|b$），那么可以将 $a$ 添加到 $S_1$ 中得到一个更大的整除子集；

- 如果整数 $c$ 是整除子集 $S_2$ 的最大整数 $d$ 的倍数（即 $d\big|c$），那么可以将 $c$ 添加到 $S_2$ 中得到一个更大的整除子集。

这两点揭示了当前问题状态转移的特点，因此可以使用动态规划的方法求解。题目只要求我们得到多个目标子集的其中一个，根据求解动态规划问题的经验，我们需要将子集的大小定义为状态，然后根据结果**倒推**得到一个目标子集。事实上，当前问题和使用动态规划解决的经典问题「[300. 最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence)」有相似之处。

#### 方法一：动态规划

根据前言的分析，我们需要将输入数组 $\textit{nums}$ 按照升序排序，以便获得一个子集的最小整数或者最大整数。又根据动态规划的「无后效性」状态设计准则，我们需要将状态定义成「某个元素必须选择」。

**状态定义**：$\textit{dp}[i]$ 表示在输入数组 $\textit{nums}$ 升序排列的前提下，以 $\textit{nums}[i]$ 为最大整数的「整除子集」的大小（在这种定义下 $\textit{nums}[i]$ 必须被选择）。

**状态转移方程**：枚举 $j = 0 \ldots i-1$ 的所有整数 $\textit{nums}[j]$，如果 $\textit{nums}[j]$ 能整除 $\textit{nums}[i]$，说明 $\textit{nums}[i]$ 可以扩充在以 $\textit{nums}[j]$ 为最大整数的整除子集里成为一个更大的整除子集。

**初始化**：由于 $\textit{nums}[i]$ 必须被选择，因此对于任意 $i = 0 \ldots n-1$，初始的时候 $\textit{dp}[i] = 1$，这里 $n$ 是输入数组的长度。

**输出**：由于最大整除子集不一定包含 $\textit{nums}$ 中最大的整数，所以我们需要枚举所有的 $\textit{dp}[i]$，选出最大整除子集的大小 $\textit{maxSize}$，以及该最大子集中的最大整数 $\textit{maxVal}$。按照如下方式倒推获得一个目标子集：

1. **倒序遍历**数组 $\textit{dp}$，直到找到 $\textit{dp}[i] = \textit{maxSize}$ 为止，把此时对应的 $\textit{nums}[i]$ 加入结果集，此时 $\textit{maxVal} = \textit{nums}[i]$；

2. 然后将 $\textit{maxSize}$ 的值减 $1$，继续倒序遍历找到 $\textit{dp}[i] = \textit{maxSize}$，且 $\textit{nums}[i]$ 能整除 $\textit{maxVal}$ 的 $i$ 为止，将此时的 $\textit{nums}[i]$ 加入结果集，$\textit{maxVal}$ 更新为此时的 $num[i]$；

3. 重复上述操作，直到 $\textit{maxSize}$ 的值变成 $0$，此时的结果集即为一个目标子集。

下面用一个例子说明如何得到最大整除子集。假设输入数组为 $[2,4,7,8,9,12,16,18]$（已经有序），得到的动态规划表格如下：

| $\textit{nums}$ | $2$ | $4$ | $7$ | $8$ | $9$ | $12$ | $16$ | $20$ |
| --------------- | --- | --- | --- | --- | --- | ---- | ---- | ---- |
| $\textit{dp}$   | $1$ | $2$ | $1$ | $3$ | $1$ | $3$  | $4$  | $3$  |

得到最大整除子集的做法如下：

1. 根据 $\textit{dp}$ 的计算结果，$\textit{maxSize}=4$，$\textit{maxVal}=16$，因此大小为 $4$ 的最大整除子集包含的最大整数为 $16$；

2. 然后查找大小为 $3$ 的最大整除子集，我们看到 $8$ 和 $12$ 对应的状态值都是 $3$，最大整除子集一定包含 $8$，这是因为 $8 \big| 16$；

3. 然后查找大小为 $2$ 的最大整除子集，我们看到 $4$ 对应的状态值是 $2$，最大整除子集一定包含 $4$；

4. 然后查找大小为 $1$ 的最大整除子集，我们看到 $2$ 对应的状态值是 $1$，最大整除子集一定包含 $2$。

通过这样的方式，我们就找到了满足条件的某个最大整除子集 $[16,8,4,2]$。

**代码**

```Java [sol1-Java]
class Solution {
    public List<Integer> largestDivisibleSubset(int[] nums) {
        int len = nums.length;
        Arrays.sort(nums);

        // 第 1 步：动态规划找出最大子集的个数、最大子集中的最大整数
        int[] dp = new int[len];
        Arrays.fill(dp, 1);
        int maxSize = 1;
        int maxVal = dp[0];
        for (int i = 1; i < len; i++) {
            for (int j = 0; j < i; j++) {
                // 题目中说「没有重复元素」很重要
                if (nums[i] % nums[j] == 0) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }

            if (dp[i] > maxSize) {
                maxSize = dp[i];
                maxVal = nums[i];
            }
        }

        // 第 2 步：倒推获得最大子集
        List<Integer> res = new ArrayList<Integer>();
        if (maxSize == 1) {
            res.add(nums[0]);
            return res;
        }
        
        for (int i = len - 1; i >= 0 && maxSize > 0; i--) {
            if (dp[i] == maxSize && maxVal % nums[i] == 0) {
                res.add(nums[i]);
                maxVal = nums[i];
                maxSize--;
            }
        }
        return res;
    }
}
```

```JavaScript [sol1-JavaScript]
var largestDivisibleSubset = function(nums) {
    const len = nums.length;
    nums.sort((a, b) => a - b);

    // 第 1 步：动态规划找出最大子集的个数、最大子集中的最大整数
    const dp = new Array(len).fill(1);
    let maxSize = 1;
    let maxVal = dp[0];
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            // 题目中说「没有重复元素」很重要
            if (nums[i] % nums[j] === 0) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }

        if (dp[i] > maxSize) {
            maxSize = dp[i];
            maxVal = nums[i];
        }
    }

    // 第 2 步：倒推获得最大子集
    const res = [];
    if (maxSize === 1) {
        res.push(nums[0]);
        return res;
    }
    
    for (let i = len - 1; i >= 0 && maxSize > 0; i--) {
        if (dp[i] === maxSize && maxVal % nums[i] === 0) {
            res.push(nums[i]);
            maxVal = nums[i];
            maxSize--;
        }
    }
    return res;
};
```

```go [sol1-Golang]
func largestDivisibleSubset(nums []int) (res []int) {
    sort.Ints(nums)

    // 第 1 步：动态规划找出最大子集的个数、最大子集中的最大整数
    n := len(nums)
    dp := make([]int, n)
    for i := range dp {
        dp[i] = 1
    }
    maxSize, maxVal := 1, 1
    for i := 1; i < n; i++ {
        for j, v := range nums[:i] {
            if nums[i]%v == 0 && dp[j]+1 > dp[i] {
                dp[i] = dp[j] + 1
            }
        }
        if dp[i] > maxSize {
            maxSize, maxVal = dp[i], nums[i]
        }
    }

    if maxSize == 1 {
        return []int{nums[0]}
    }

    // 第 2 步：倒推获得最大子集
    for i := n - 1; i >= 0 && maxSize > 0; i-- {
        if dp[i] == maxSize && maxVal%nums[i] == 0 {
            res = append(res, nums[i])
            maxVal = nums[i]
            maxSize--
        }
    }
    return
}
```

```C++ [sol1-C++]
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int len = nums.size();
        sort(nums.begin(), nums.end());

        // 第 1 步：动态规划找出最大子集的个数、最大子集中的最大整数
        vector<int> dp(len, 1);
        int maxSize = 1;
        int maxVal = dp[0];
        for (int i = 1; i < len; i++) {
            for (int j = 0; j < i; j++) {
                // 题目中说「没有重复元素」很重要
                if (nums[i] % nums[j] == 0) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }

            if (dp[i] > maxSize) {
                maxSize = dp[i];
                maxVal = nums[i];
            }
        }

        // 第 2 步：倒推获得最大子集
        vector<int> res;
        if (maxSize == 1) {
            res.push_back(nums[0]);
            return res;
        }

        for (int i = len - 1; i >= 0 && maxSize > 0; i--) {
            if (dp[i] == maxSize && maxVal % nums[i] == 0) {
                res.push_back(nums[i]);
                maxVal = nums[i];
                maxSize--;
            }
        }
        return res;
    }
};
```

```C [sol1-C]
int cmp(int* a, int* b) {
    return *a - *b;
}

int* largestDivisibleSubset(int* nums, int numsSize, int* returnSize) {
    int len = numsSize;
    qsort(nums, numsSize, sizeof(int), cmp);

    // 第 1 步：动态规划找出最大子集的个数、最大子集中的最大整数
    int dp[len];
    for (int i = 0; i < len; i++) {
        dp[i] = 1;
    }
    int maxSize = 1;
    int maxVal = dp[0];
    for (int i = 1; i < len; i++) {
        for (int j = 0; j < i; j++) {
            // 题目中说「没有重复元素」很重要
            if (nums[i] % nums[j] == 0) {
                dp[i] = fmax(dp[i], dp[j] + 1);
            }
        }

        if (dp[i] > maxSize) {
            maxSize = dp[i];
            maxVal = nums[i];
        }
    }

    // 第 2 步：倒推获得最大子集
    int* res = malloc(sizeof(int) * len);
    *returnSize = 0;
    if (maxSize == 1) {
        res[(*returnSize)++] = nums[0];
        return res;
    }

    for (int i = len - 1; i >= 0 && maxSize > 0; i--) {
        if (dp[i] == maxSize && maxVal % nums[i] == 0) {
            res[(*returnSize)++] = nums[i];
            maxVal = nums[i];
            maxSize--;
        }
    }
    return res;
}
```

**复杂度分析**

- 时间复杂度：$O(n^2)$，其中 $n$ 为输入数组的长度。对数组 $\textit{nums}$ 排序的时间复杂度为 $O(n \log n)$，计算数组 $\textit{dp}$ 元素的时间复杂度为 $O(n^2)$，倒序遍历得到一个目标子集，时间复杂度为 $O(n)$。

- 空间复杂度：$O(n)$，其中 $n$ 为输入数组的长度。需要创建长度为 $n$ 的数组 $\textit{dp}$。