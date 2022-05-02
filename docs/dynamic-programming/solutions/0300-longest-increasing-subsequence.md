---
title: 「力扣」第 300 题：最长上升子序列（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

> 经典的「动态规划」问题，不同的定义状态的方式，可以得到不同复杂度的求解方法。

- 题目链接：[300. 最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)；
- 题解链接：[动态规划 （包含 O (N log N) 解法的状态定义以及解释）](https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/dong-tai-gui-hua-er-fen-cha-zhao-tan-xin-suan-fa-p/)。

## 题目描述

给你一个整数数组 `nums` ，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，`[3,6,2,7]` 是数组 `[0,3,1,6,2,2,7]` 的子序列。

**示例 1：**

```
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
```

**示例 2：**

```
输入：nums = [0,1,0,3,2,3]
输出：4
```

**示例 3：**

```
输入：nums = [7,7,7,7,7,7,7]
输出：1
```

**提示：**

- `1 <= nums.length <= 2500`
- `-10^4 <= nums[i] <= 10^4`

---

分析：首先仔细审题，明确题目中的条件。

1、子序列：不要求连续子序列，只要保证元素前后顺序一致即可；

2、上升：这里的“上升”是“严格上升”，类似于 `[2, 3, 3, 6, 7]` 这样的子序列是不符合要求的；

一个序列可能有多个最长上升子序列，题目中只要我们求这个最长的长度。如果使用回溯搜索，选择所有的子序列进行判断，时间复杂度为 $O( (2^n) * n )$。

思路 1：动态规划。这个问题具有“最优子结构”。

定义状态：`LIS(i)` 表示以第 `i` 个数字为结尾的最长上升子序列的长度。即在 `[0, ..., i]` 的范围内，选择以数字 `nums[i]` 结尾可以获得的最长上升子序列的长度。关键字是：以第 `i` 个数字为结尾，即我们要求 `nums[i]` 必须被选取。反正一个子序列一定要以一个数字结尾，那我就将状态这么定义，这一点是重要且常见的。

状态转移方程：遍历到索引是 `i` 的数的时候，我们应该把索引是 `[0, ... ,i - 1]` 的 `LIS` 都看一遍，如果当前的数 `nums[i]` 大于之前的某个数，那么 `nums[i]` 就可以接在这个数后面形成一个更长的 `LIS` 。把前面的 `i` 个数都看了， `LIS[i]` 就是它们的最大值加 $1$。即比当前数要小的那些里头，找最大的，然后加 $1$ 。

状态转移方程即：`LIS(i) = max( 1 + LIS(j) if j < i and nums[i] > nums[j])`

最后不要忘了，应该扫描一遍这个 `LIS[i]` 数组，其中最大的就是我们所求的。

我们以下面的数组为例进行说明：

例如：`[10，9，2，5，3，7，101，18]`。

填表：

| 原始数组       | 10  | 9   | 2   | 5     | 3     | 7     | 101   | 18    |
| -------------- | --- | --- | --- | ----- | ----- | ----- | ----- | ----- |
| LIS 刚开始的值 | 1   | 1   | 1   | 1     | 1     | 1     | 1     | 1     |
| LIS 最后的值   | 1   | 1   | 1   | **2** | **2** | **3** | **4** | **4** |

最关键的就是填这张表，其实并不难。最后，我们把整个数组扫描一遍，就找到了最大值。

又例如：`[10，15，20，11，9，101]`。

| 原始数组       | 10  | 15  | 20  | 11  | 9   | 101 |
| -------------- | --- | --- | --- | --- | --- | --- |
| LIS 刚开始的值 | 1   | 1   | 1   | 1   | 1   | 1   |
| LIS 最后的值   | 1   | 2   | 3   | 2   | 1   | 4   |

Java 代码：

```java
class Solution {
    public int lengthOfLIS(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }
        int[] dp = new int[len];
        // 自己一定是一个子序列
        Arrays.fill(dp, 1);
        for (int i = 1; i < len; i++) {
            // 看以前的，比它小的，说明可以接在后面形成一个更长的子序列
            // int curMax = Integer.MIN_VALUE; 不能这样写，万一前面没有比自己小的，
            // 这个值就得不到更新
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[j] + 1, dp[i]);
                }
            }
        }

        int res = dp[0];
        for (int i = 0; i < len; i++) {
            res = Math.max(res, dp[i]);
        }
        return res;
    }
}
```

Python 代码：关键：找它前面比他小的那些数中最大的

```python
class Solution:

    # 动态规划的思路：将 dp 数组定义为：以 nums[i] 结尾的最长上升子序列的长度
    # 那么题目要求的，就是这个 dp 数组中的最大者
    # 以数组  [10, 9, 2, 5, 3, 7, 101, 18] 为例：
    # dp 的值： 1  1  1  2  2  3  4    4

    def lengthOfLIS(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        size = len(nums)
        if size <= 1:
            return size
        dp = [1] * size
        for i in range(1, size):
            for j in range(i):
                if nums[i] > nums[j]:
                    # + 1 的位置不要加错了
                    dp[i] = max(dp[i], dp[j] + 1)
        # 最后要全部走一遍，看最大值
        return max(dp)
```

LIS 问题的 $O(nlogn)$ 解法请看 [这里](https://liweiwei1419.github.io/leetcode-solution/leetcode-0300-longest-increasing-subsequence/)。如果用二分法解决，其中含有贪心思想（因为在一个更小的数后面，才有可能接更大的数。规律：如果比最后一个大，直接接在后面，否则就要执行一次更新操作：找到第 1 个比它大的数，更新它）

例如：1 2 3 4 5 7（更新成 6） 7 7 7 7 7 8 9 来了一个 6。

记忆化递归的解法。有 $O(n \log n)$ 复杂度的解法。

思路：自己写一个辅助数组，用二分查找完成数组的覆盖或者插入，遍历完整个输入数组，辅助数组的长度就是所求。其实这道题的一个子过程就是 LeetCode 第 35 题：搜索插入位置。这个思路用到的策略是**贪心算法**，技巧和**二分查找**。

关键在于找大于等于“当前遍历的那个数”的第 1 个索引，将它替换成“当前遍历的那个数”，这样使得这个数变小，后面才有可能接一个更大的数。

![LeetCode 第 300 题：Longest Increasing Subsequence-1](https://liweiwei1419.gitee.io/images/leetcode-solution/300-1.jpg)

![LeetCode 第 300 题：Longest Increasing Subsequence-2](https://liweiwei1419.gitee.io/images/leetcode-solution/300-2.jpg)

![LeetCode 第 300 题：Longest Increasing Subsequence-3](https://liweiwei1419.gitee.io/images/leetcode-solution/300-3.jpg)

Python 代码：

```python
class Solution:
    def lengthOfLIS(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """

        size = len(nums)
        if size < 2:
            return size
        # 最长上升子序列
        lis = []
        for num in nums:
            # 找到大于等于 target 的第 1 个数
            l = 0
            r = len(lis)
            while l < r:
                mid = l + (r - l) // 2
                if lis[mid] >= num:
                    r = mid
                else:
                    l = mid + 1
            if l == len(lis):
                lis.append(num)
            else:
                lis[l] = num
        return len(lis)


if __name__ == '__main__':
    nums = [10, 9, 2, 5, 3, 7, 101, 18]
    solution = Solution()
    result = solution.lengthOfLIS(nums)
    print(result)
```

、
