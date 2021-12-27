---
title: 「力扣」第 525 题：连续数组（中等）
icon: yongyan
category: 前缀和
tags: 
  - 前缀和
  - 哈希表
---

- 题目链接：[525. 连续数组](https://leetcode-cn.com/problems/contiguous-array/)；
- 题解链接：[前缀和与哈希表（Java）、相关问题推荐](https://leetcode-cn.com/problems/contiguous-array/solution/qian-zhui-he-chai-fen-ha-xi-biao-java-by-liweiwei1/)。


## 题目描述

给定一个二进制数组, 找到含有相同数量的 0 和 1 的最长连续子数组（的长度）。

**示例 1:**

```
输入: [0,1]
输出: 2
说明: [0, 1] 是具有相同数量0和1的最长连续子数组。
```

**示例 2:**

```
输入: [0,1,0]
输出: 2
说明: [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。
```

**数据范围**：

- $1 \le \text{nums.length} \le 10^5$
- 输入数组的值只包含 $0$ 和 $1$

## 思路分析

首先想到的是「暴力解法」，使用两个 `for` 循环枚举所有可能的区间，然后判断区间是否符合题意，进而计算区间的长度。

这道题如果之前没有做过相关的问题，很难想到比较好的思路。这里我的思路来自「力扣」第 1371 题：[每个元音包含偶数次的最长子字符串](https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/)，周赛的时候没有做出来。学习了 [题解](https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/solution/jian-dan-de-si-lu-by-mnizy/) 以后知道了「前缀和」与「哈希表」经常配合使用。

## 为什么不是滑动窗口

求 **连续** 区间里的性质，一种思路是「滑动窗口」。但是本题，如果我们找到了一个连续子区间里有相同个数的 $0$ 和 $1$ ，左端点相同且更长的连续子区间很可能也有相同个数的 $0$ 和 $1$。

## 通过前缀和求区间和

**注意**：只记录某个前缀和数字第 1 次出现的下标，因为我们要求的是最长。

+ 这里引入一个概念，叫做「不变量」，题目要我们找的「不变量」是「区间里」 `0` 的个数和 `1` 的个数相等的区间的长度；
+ 但是发现很难下手，另一种思路就是「前缀和之差」，这一点在学习「线段树」的时候，是作为例子引入的；
+ **重点思路**：要利用到「前缀和」还有希望能够通过一次遍历记住结果，多半要使用到哈希表，这里做的一个处理是把所有的 `0` 都看成 `-1`，如此一来：**如果一个区间的和是 `0` ，就说明这个区间里的 `0`（被视为 `-1`） 和 1 的数量相同**；
+ 由于求的是最长区间，因此就需要记录前缀和的数值第 1 次出现的下标，相同的前缀再次出现，就说明这一段区间的和为 `0`（把 `0` 看成 `-1` 以后），在遍历的过程中，记录最长的区间的长度；
+ 区间的问题几个思路供参考：滑动窗口（双指针）；前缀和的差；线段树（树状数组）。

## 总结

+ 一开始介绍的「不变量」是比较繁琐的，把它转换成一个等价的表示，就使得解决问题变得简单；
+ 在编码的过程中，还需要注意一些细节，这里放在代码注释里说明；
+ 有相关问题的经验还是比较重要的，在平常刷题的过程中需要多总结。

可以做一下相似的问题，「力扣」第 352 题：[和等于 k 的最长子数组长度](https://leetcode-cn.com/problems/maximum-size-subarray-sum-equals-k/)。

**参考代码 1**：

```Java []
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int findMaxLength(int[] nums) {
        int len = nums.length;
        Map<Integer, Integer> map = new HashMap<>(len);
        // 下标 0 之前的位置是 -1，注意：可以理解为哨兵
        map.put(0, -1);

        int res = 0;
        int preSum = 0;

        // 把数组中的 0 都看成 -1
        for (int i = 0; i < len; i++) {
            // pre 是先加了，所以后面计算的时候是 i - map.get(preSum)
            if (nums[i] == 1) {
                preSum += 1;
            } else {
                preSum += -1;
            }

            if (map.containsKey(preSum)) {
                res = Math.max(res, i - map.get(preSum));
            } else {
                // 注意：只记录这个数字第 1 次出现的下标
                map.put(preSum, i);
            }
        }
        return res;
    }
}
```


**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是数组的长度，算法遍历了一次数组，每一个元素的操作都是常数次的，因此整体时间复杂度是 $O(N)$；
+ 空间复杂度：$O(N)$。





