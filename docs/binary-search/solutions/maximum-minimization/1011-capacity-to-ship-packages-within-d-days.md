---
title: 「力扣」第 1011 题：在 D 天内送达包裹的能力（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

- 题目链接：[1011. 在 D 天内送达包裹的能力](https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days/)。

## 题目描述

传送带上的包裹必须在 `days` 天内从一个港口运送到另一个港口。

传送带上的第 `i` 个包裹的重量为 `weights[i]`。每一天，我们都会按给出重量（`weights`）的顺序往传送带上装载包裹。我们装载的重量不会超过船的最大运载重量。

返回能在 `days` 天内将传送带上的所有包裹送达的船的最低运载能力。

**示例 1：**

```
输入：weights = [1,2,3,4,5,6,7,8,9,10], days = 5
输出：15
解释：
船舶最低载重 15 就能够在 5 天内送达所有包裹，如下所示：
第 1 天：1, 2, 3, 4, 5
第 2 天：6, 7
第 3 天：8
第 4 天：9
第 5 天：10

请注意，货物必须按照给定的顺序装运，因此使用载重能力为 14 的船舶并将包装分成 (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) 是不允许的。
```

**示例 2：**

```
输入：weights = [3,2,2,4,1,4], days = 3
输出：6
解释：
船舶最低载重 6 就能够在 3 天内送达所有包裹，如下所示：
第 1 天：3, 2
第 2 天：2, 4
第 3 天：1, 4
```

**示例 3：**

```
输入：weights = [1,2,3,1,1], D = 4
输出：3
解释：
第 1 天：1
第 2 天：2
第 3 天：3
第 4 天：1, 1
```

**提示：**

- `1 <= days <= weights.length <= 5 * 10^4`
- `1 <= weights[i] <= 500`

## 分析题意

我们装载的重量不会超过船的最大运载重量（找一个有范围的整数），返回能在 D 天内将传送带上的所有包裹送达的船的最低运载能力（最大值最小化）。

题目中 **按给出重量的顺序** 这个条件非常重要，保证连续性。运输重量是正数。

- 重点 1：货物必须按照给定的顺序装运；
- 重点 2：最低运载能力：表示超过了就要另外起一艘航船。

运载能力最低是数组 `weights` 中的最大值，至少得拉走一个。最高是数组 `weights` 中的和。

::: danger 单调性
运载能力越低，需要的天数越多；运载能力越高，需要的天数越少。如果目前尝试的 **最低运载能力** 恰好使得传送带上的包裹在 D 天（注意：恰好是 D 天）从一个港口运送到另一个港口，还应该继续尝试减少 **最低运载能力** 。
:::

**参考代码**：

```java
public class Solution {

    public int shipWithinDays(int[] weights, int D) {
        int maxVal = 0;
        int sum = 0;

        for (int weight : weights) {
            maxVal = Math.max(maxVal, weight);
            sum += weight;
        }

        int left = maxVal;
        int right = sum;
        while (left < right) {
            // 运载能力
            int mid = left + (right - left ) / 2;
            // 运载能力越大，天数越少
            // 运载能力越小，天数越多
            // 负相关
            if (calculateDays(weights, mid) > D) {
                // 太多，下一轮搜索区间 [mid + 1, right]
                left = mid + 1;
            } else {
                // 下一轮搜索区间 [left, mid]
                right = mid;
            }
        }
        return left;
    }

    /**
     * 返回多少天
     *
     * @param weights
     * @param capacity
     * @return
     */
    private int calculateDays(int[] weights, int capacity) {
        int days = 1;
        int currentWeightSum = 0;
        for (int weight : weights) {
            if (currentWeightSum + weight > capacity) {
                currentWeightSum = 0;
                days++;
            }
            currentWeightSum += weight;
        }
        return days;
    }
}
```


（时间复杂度与空间复杂度省略。）