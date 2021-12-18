---
title: 「力扣」第 376 题：摆动序列
date: 2018-05-05 08:00:00
author: liweiwei419
top: false
mathjax: true
categories: 专题 15：动态规划
tags:
  - 动态规划
  - 滑动窗口
  - 哈希表
permalink: leetcode-algo/0376-wiggle-subsequence
---

## 「力扣」第 376 题：摆动序列

> 提示：1、状态机；2、贪心。

+ [链接](https://leetcode-cn.com/problems/combination-sum/)
+ [题解链接](https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-2/)

> 一个序列，它的相邻数字的大小关系是升序降序轮流交替的（最初可以是升序，也可以是降序），就称为wiggle sequence。比如[1, 7, 4, 9, 2, 5] 就是一个wiggle sequence。但是[1, 4, 7, 2, 5] 和 [1, 7, 4, 5, 5] 就不是。给出一个数组，求出他的最长 wiggle sequence 子序列。
>
> 如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为**摆动序列。**第一个差（如果存在的话）可能是正数或负数。少于两个元素的序列也是摆动序列。
>
> 例如， `[1,7,4,9,2,5]` 是一个摆动序列，因为差值 `(6,-3,5,-7,3)` 是正负交替出现的。相反, `[1,4,7,2,5]` 和 `[1,7,4,5,5]` 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。
>
> 给定一个整数序列，返回作为摆动序列的最长子序列的长度。 通过从原始序列中删除一些（也可以不删除）元素来获得子序列，剩下的元素保持其原始顺序。
>
> **示例 1:**
>
> ```
> 输入: [1,7,4,9,2,5]
> 输出: 6 
> 解释: 整个序列均为摆动序列。
> ```
>
> **示例 2:**
>
> ```
> 输入: [1,17,5,10,13,15,10,5,16,8]
> 输出: 7
> 解释: 这个序列包含几个长度为 7 摆动序列，其中一个可为[1,17,10,13,10,16,8]。
> ```
>
> **示例 3:**
>
> ```
> 输入: [1,2,3,4,5,6,7,8,9]
> 输出: 2
> ```
>
> **进阶:**
> 你能否用 O(*n*) 时间复杂度完成此题?


#### 第 1 步：定义状态
思路：子序列问题的模板问题是“最长上升子序列”，解这个问题的经验告诉我们：**结尾的那个数字很重要**。注意：最长子序列，不要求连续。

`dp[i][0]`：表示以 `i` 结尾的数字是严格上升的子序列的长度；
`dp[i][1]`：表示以 `i` 结尾的数字是严格下降的子序列的长度。

#### 第 2 步：状态转移方程
```
dp[i][0] = dp[i - 1][1] + 1, if nums[i] - nums[i - 1] > 0
```

```
dp[i][1] = dp[i - 1][0] + 1, if nums[i] - nums[i - 1] < 0
```

这是最简单的两种情况，由此可知需要分类讨论：

1、`nums[i] - nums[i - 1] > 0`
2、`nums[i] - nums[i - 1] < 0`
3、`nums[i] - nums[i - 1] = 0`

不是严格上升或者下降的时候 状态直接从上一个阶段直接复制过来就可以了。

#### 第 3 步： 思考初始化
初始化：`dp[0][0] = 1，dp[0][1] = 1`。

#### 第 4 步： 思考输出
输出的时候，是最后一个阶段的两个状态值中的最大者。

Java 代码：
```java
import java.util.Arrays;

public class Solution {

    public int wiggleMaxLength(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }

        int[][] dp = new int[len][2];
        dp[0][0] = 1;
        dp[0][1] = 1;

        for (int i = 1; i < len; i++) {
            if (nums[i - 1] < nums[i]) {
                // 结尾时候的状态是严格上升的
                dp[i][0] = dp[i - 1][1] + 1;
                dp[i][1] = dp[i - 1][1];

            } else if (nums[i - 1] > nums[i]) {
                // 结尾时候的状态是严格下降的
                dp[i][1] = dp[i - 1][0] + 1;
                dp[i][0] = dp[i - 1][0];

            } else {
                dp[i][0] = dp[i - 1][0];
                dp[i][1] = dp[i - 1][1];
            }
        }
        return Math.max(dp[len - 1][0], dp[len - 1][1]);
    }
}
```

#### 第 5 步： 思考状态压缩
当前行参考前一行的值，因此可以使用滚动数组。

直接降到一维，也是可以的。这样还省去了复制的操作。

Java 代码：

```java
class Solution {
    public int wiggleMaxLength(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }

        int[] dp = new int[2];
        dp[0] = 1;
        dp[1] = 1;

        for (int i = 1; i < len; i++) {
            if (nums[i - 1] < nums[i]) {
                // 结尾时候的状态是严格上升的
                dp[0] = dp[1] + 1;
            } else if (nums[i - 1] > nums[i]) {
                // 结尾时候的状态是严格下降的
                dp[1] = dp[0] + 1;
            }
        }
        return Math.max(dp[0], dp[1]);
    }
}
```
（本节完）


