---
title: 「力扣」第 239 题：滑动窗口的最大值（困难）
icon: yongyan
category: 队列
tags:
  - 滑动窗口
  - 队列
  - 单调队列
---

+ 题目地址：[239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)；
+ 题解地址：[最大索引堆 + 双端队列存索引值的思路分析（Python 代码、Java 代码）](https://leetcode-cn.com/problems/sliding-window-maximum/solution/zui-da-suo-yin-dui-shuang-duan-dui-lie-cun-suo-yin/)。


## 题目描述

给你一个整数数组 `nums`，有一个大小为 `k` 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 `k` 个数字。滑动窗口每次只向右移动一位。

返回滑动窗口中的最大值。

 

**示例 1：**

```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

**示例 2：**

```
输入：nums = [1], k = 1
输出：[1]
```

**示例 3：**

```
输入：nums = [1,-1], k = 1
输出：[1,-1]
```

**示例 4：**

```
输入：nums = [9,11], k = 2
输出：[11]
```

**示例 5：**

```
输入：nums = [4,-2], k = 2
输出：[4]
```

**提示：**

- `1 <= nums.length <= 10^5`
- `-104 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

---

文字题解和参考代码请见：[最大索引堆 + 双端队列存索引值的思路分析（Python 代码、Java 代码）](https://leetcode-cn.com/problems/sliding-window-maximum/solution/zui-da-suo-yin-dui-shuang-duan-dui-lie-cun-suo-yin/)。
