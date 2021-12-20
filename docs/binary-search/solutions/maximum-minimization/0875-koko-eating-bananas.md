---
title: 「力扣」第 875 题：爱吃香蕉的珂珂
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

![0875](https://tva1.sinaimg.cn/large/008i3skNgy1gx8zi70sf1j30p00an3yr.jpg)

+ 题目链接：[875. 爱吃香蕉的珂珂](https://leetcode-cn.com/problems/koko-eating-bananas/)
+ 题解链接：[二分查找定位速度（最大值最小化问题，Java）](https://leetcode-cn.com/problems/koko-eating-bananas/solution/er-fen-cha-zhao-ding-wei-su-du-by-liweiwei1419/)

## 题目描述

珂珂喜欢吃香蕉。这里有 `N` 堆香蕉，第 `i` 堆中有 `piles[i]` 根香蕉。警卫已经离开了，将在 `H` 小时后回来。

珂珂可以决定她吃香蕉的速度 `K` （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 `K` 根。如果这堆香蕉少于 `K` 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。 

珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 `H` 小时内吃掉所有香蕉的最小速度 `K`（`K` 为整数）。

**示例 1：**

```
输入: piles = [3,6,7,11], H = 8
输出: 4
```

**示例 2：**

```
输入: piles = [30,11,23,4,20], H = 5
输出: 30
```

**示例 3：**

```
输入: piles = [30,11,23,4,20], H = 6
输出: 23
```

 **提示：**

- `1 <= piles.length <= 10^4`
- `piles.length <= H <= 10^9`
- `1 <= piles[i] <= 10^9`


**分析题意**：

## 题意分析

根据题意可以知道：珂珂吃香蕉的速度越小，耗时越多。反之，速度越大，耗时越少，这是根据题意得到的 **单调性**。

哪一堆香蕉先吃是无关紧要的，每一堆香蕉的根数是正数，符合「连续」「正整数」条件。

注意：如果目前尝试的速度恰好使得珂珂在规定的时间内吃完香蕉的时候，还应该去尝试更小的速度是不是还可以保证在规定的时间内吃完香蕉。

## 思路分析

+ 由于速度是一个有范围的整数，因此可以使用「二分查找法」找到这个有范围的整数。分析这个问题的具有的 **单调性** 是解题的关键；

+ 我们要找的是速度。因为题目限制了珂珂一个小时之内只能选择一堆香蕉吃，因此速度最大值就是这几堆香蕉中，数量最多的那一堆。速度的最小值是 $1$，其实还可以再分析一下下界是多少，由于二分搜索的时间复杂度很低，严格的分析不是很有必要；
+ 还是因为珂珂一个小时之内只能选择一堆香蕉吃，因此：**每堆香蕉吃完的耗时 = 这堆香蕉的数量 / 珂珂一小时吃香蕉的数量**。根据题意，这里的 `/` 在不能整除的时候，需要 **上取整**。

::: danger 注意
当「二分查找」算法猜测的速度恰好使得珂珂在规定的时间内吃完香蕉的时候，还应该去尝试更小的速度是不是还可以保证在规定的时间内吃完香蕉。这是因为题目问的是「最小速度 」。
:::


**参考代码**：

```Java []
public class Solution {

    public int minEatingSpeed(int[] piles, int H) {
        int maxVal = 1;
        for (int pile : piles) {
            maxVal = Math.max(maxVal, pile);
        }

        // 速度最小的时候，耗时最长
        int left = 1;
        // 速度最大的时候，耗时最短
        int right = maxVal;

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (calculateSum(piles, mid) > H) {
                // 耗时太多，说明速度太慢了，下一轮搜索区间是 [mid + 1..right]
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    /**
     * 如果返回的小时数严格大于 H，就不符合题意
     *
     * @param piles
     * @param speed
     * @return 需要的小时数
     */
    private int calculateSum(int[] piles, int speed) {
        int sum = 0;
        for (int pile : piles) {
            // 上取整可以这样写
            sum += (pile + speed - 1) / speed;
        }
        return sum;
    }
}
```

**补充**：上取整还可以这样写：`sum += (pile + speed - 1) / speed;`。

```Java []
/**
 * 如果返回的小时数严格大于 H，就不符合题意
 *
 * @param piles
 * @param speed
 * @return 需要的小时数
 */
private int function(int[] piles, int speed) {
    int sum = 0;
    for (int pile : piles) {
        // 上取整可以这样写
        sum += (pile + speed - 1) / speed;
    }
    return sum;
}
```

**复杂度分析**：

+ 时间复杂度：$O(N \log \max(piles))$，这里 $N$ 表示数组 `piles` 的长度。我们在 $[1, \max{piles}]$ 里使用二分查找定位最小速度，而每一次执行判别函数的时间复杂度是 $O(N)$；
+ 空间复杂度：$O(1)$，算法只使用了常数个临时变量。 
