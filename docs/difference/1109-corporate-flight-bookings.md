---
title: 「力扣」第 1109 题：航班预订统计（中等）
icon: yongyan
category: 差分
tags:
  - 差分
---

- [题目链接](https://leetcode-cn.com/problems/corporate-flight-bookings/)。

## 题目描述

这里有 `n` 个航班，它们分别从 `1` 到 `n` 进行编号。

有一份航班预订表 `bookings` ，表中第 `i` 条预订记录 `bookings[i] = [firsti, lasti, seatsi]` 意味着在从 `firsti` 到 `lasti` （**包含** `firsti` 和 `lasti` ）的 **每个航班** 上预订了 `seatsi` 个座位。

请你返回一个长度为 `n` 的数组 `answer`，里面的元素是每个航班预定的座位总数。

**示例 1：**

```
输入：bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
输出：[10,55,45,25,25]
解释：
航班编号        1   2   3   4   5
预订记录 1 ：   10  10
预订记录 2 ：       20  20
预订记录 3 ：       25  25  25  25
总座位数：      10  55  45  25  25
因此，answer = [10,55,45,25,25]
```

**示例 2：**

```
输入：bookings = [[1,2,10],[2,2,15]], n = 2
输出：[10,25]
解释：
航班编号        1   2
预订记录 1 ：   10  10
预订记录 2 ：       15
总座位数：      10  25
因此，answer = [10,25]
```

**提示：**

- `1 <= n <= 2 * 104`
- `1 <= bookings.length <= 2 * 104`
- `bookings[i].length == 3`
- `1 <= firsti <= lasti <= n`
- `1 <= seatsi <= 104`

## 差分知识点

**输入数组**：$a_0,a_1,\cdots,a_{n-1}$

定义「差分数组」：$b_0 = a_0,b_1 = a_1 - a_0,\cdots,b_{n-1} = a_{n-1}$，数组 $b$ 的前缀和就是数组 $a$。

给数组 $a$ 的区间 `[left..right]` 每个数都加上 $x$ ，数组 $b$ 的数值发生变化的只有：$b_{left}$ 和 $b_{right}$。这是因为：

- $b_{left} = a_{left} + x - a_{left - 1}$ ，有变化。
- $b_{right + 1} = a_{right + 1} - (a_{right} + x)$ ，有变化。

其余 $b_i$ ，$i \in [left + 1..right]$ 的元素都没有变化，这是因为

$b_{i} = a_{i} + x - (a_{i - 1} + x)$，都没有变化。

注意：**差分数组的最后一个数不能要**。

**摘要**：对数组执行前缀和操作得到「前缀和」数组，对「前缀和」数组执行「差分」操作得到「原始数组」。本题通过「输入数据」在「差分数组」上的操作，进而求解「前缀和」数组，得到「原始数组」。

**理解题意**：

输入数组和输出数组可以通过下面的图来理解题意。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c06183cc85ce4f77aefd3ddbcf1eff59~tplv-k3u1fbpfcp-watermark.image)

**解题思路**：

> 本题通过「输入数据」在「差分数组」上的操作，进而求解「前缀和」数组，得到「原始数组」。

**参考代码**：

```java
public class Solution {

    public int[] corpFlightBookings(int[][] bookings, int n) {
        int[] nums = new int[n];
        for (int[] booking : bookings) {
            nums[booking[0] - 1] += booking[2];
            if (booking[1] < n) {
                nums[booking[1]] -= booking[2];
            }
        }
        for (int i = 1; i < n; i++) {
            nums[i] += nums[i - 1];
        }
        return nums;
    }
}
```

这里要注意两个细节：

- **细节 1**：处理左边界的时候，下标有一个偏移，所以是 `nums[booking[0] - 1] += booking[2];`
- **细节 2**：处理右边界的时候，由于处理的是 `right + 1`，所以不用减 $1$（这里没有说得很清楚，相信大家可以明白意思）。

---

我讲解的算法特别适合新手朋友。欢迎大家关注我的公众号「算法不好玩」，B 站关注「liweiwei1419」。
