---
title: 「力扣」第 1283 题：使结果不超过阈值的最小除数（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

- 题目链接：[1283. 使结果不超过阈值的最小除数](https://leetcode-cn.com/problems/find-the-smallest-divisor-given-a-threshold/)；
- 题解链接：[二分查找定位除数](https://leetcode-cn.com/problems/find-the-smallest-divisor-given-a-threshold/solution/er-fen-cha-zhao-ding-wei-chu-shu-by-liweiwei1419/)。

## 题目描述

给你一个整数数组 `nums` 和一个正整数 `threshold` ，你需要选择一个正整数作为除数，然后将数组里每个数都除以它，并对除法结果求和。

请你找出能够使上述结果小于等于阈值 threshold 的除数中 最小 的那个。

每个数除以除数后都向上取整，比方说 7/3 = 3 ， 10/2 = 5 。

题目保证一定有解。

**示例 1：**

```
输入：nums = [1,2,5,9], threshold = 6
输出：5
解释：如果除数为 1 ，我们可以得到和为 17 （1+2+5+9）。
如果除数为 4 ，我们可以得到和为 7 (1+1+2+3) 。如果除数为 5 ，和为 5 (1+1+1+2)。
```

**示例 2：**

```
输入：nums = [2,3,5,7,11], threshold = 11
输出：3
```

**示例 3：**

```
输入：nums = [19], threshold = 5
输出：4
```

**提示：**

- `1 <= nums.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^6`
- `nums.length <= threshold <= 10^6`

## 思路分析

首先要读题，读懂题意是关键。题目要我们求的是**除数**。

1、根据题目说明：

> 请你找出能够使上述结果小于等于阈值 `threshold` 的除数中 **最小** 的那个。

再观察数据范围：

> - `1 <= nums.length <= 5 * 10^4`
> - `1 <= nums[i] <= 10^6`
> - `nums.length <= threshold <= 10^6`

明显可以使用**二分查找**。

2、于是思考除数最大是多少，最小是多少。

- 最大是数组中最大的那个数，因为除数如果再大，整除以后每个数都得 1（上取整的缘故）；
- 最小可以是 1。

我一开始以为最小就是数组中最小的那个数字，后来提交以后，发现测试用例：

```java
int[] nums = {91, 41, 78, 86, 8};
int threshold = 114;
```

不能通过。于是才知道，原来 `threshold` 可以很大，因此除数的最小值可以让它是 $1$ 。因为二分查找很快，除数的下限小一点是可以的，只要包含目标值就行。

3、写 `if` 分支的时候，就根据题目的意思写即可。

> 选择一个正整数作为除数，然后将数组里每个数都除以它，并对除法结果求和。

思考的关键是：什么时候不是解？

题目说：

> 找出能够使上述结果小于等于阈值 `threshold` 的除数中 **最小** 的那个。

因此：和**严格**大于阈值 `threshold` 的除数，一定不是解。根据“减而治之”的策略，定位这个除数。

**参考代码 1**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int smallestDivisor(int[] nums, int threshold) {
        // 先找数组中的最大值，用最大值作为除数，除完以后和最小
        int maxVal = 1;
        for (int num : nums) {
            maxVal = Math.max(maxVal, num);
        }

        // 注意：最小值是 1，因为 threshold 可以很大
        int left = 1;
        int right = maxVal;

        while (left < right) {
            int mid = (left + right) >>> 1;

            if (calculateSum(nums, mid) > threshold) {
                // sum 大于阈值一定不是解，说明除数选得太小了
                // 下一轮搜索区间是 [mid + 1, right]
                // （把下一轮搜索区间写出来，边界选择就不会错）
                left = mid + 1;
                // 边界是 left = mid + 1 ，中间数不用上取整
            } else {
                right = mid;
            }
        }
        return left;
    }

    /**
     * @param nums
     * @param divisor
     * @return 数组中各个元素与 divisor 相除的结果（向上取整）之和
     */
    private int calculateSum(int[] nums, int divisor) {
        int sum = 0;

        for (int num : nums) {
            sum += num / divisor;

            // 注意：不能整除的时候，需要向上取整
            if (num % divisor != 0) {
                sum++;
            }
        }
        return sum;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
from typing import List


class Solution:
    def smallestDivisor(self, nums: List[int], threshold: int) -> int:
        left = 1
        right = max(nums)

        while left < right:
            mid = (left + right) >> 1
            if sum([(num + mid - 1) // mid for num in nums]) > threshold:
                left = mid + 1
            else:
                right = mid
        return left
````

</CodeGroupItem>
</CodeGroup>






**说明**：上取整还可以这样写，这是个小技巧，记住就可以了。

```java
sum += (num + divisor - 1) / divisor;
````

**复杂度分析**：

- 时间复杂度：$O(N \log \max(nums))$，这里 $N$ 是数组的长度，每一次二分都执行了边界判断函数，都得遍历一遍数组；

这里感谢 [@copyreadmachine](/u/copyreadmachine/) 朋友帮我纠正了时间复杂度。

- 空间复杂度：$O(1)$。
