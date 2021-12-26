---
title: 「力扣」第 456 题：132 模式（中等）
icon: yongyan
category: 栈
tags:
  - 栈
---

+ 题目链接：[]()；
+ 题解链接：[]()。


## 题目描述

---
title: 「力扣」第 496 题：下一个更大元素 I（简单）
date: 2017-09-21 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 8：单调栈
tags:
  - 栈
  - 单调栈
permalink: leetcode-algo/0496-next-greater-element-i
---

## 「力扣」第 496 题：下一个更大元素 I（简单）

题解：https://leetcode-cn.com/problems/next-greater-element-i/solution/bao-li-jie-fa-dan-diao-zhan-by-liweiwei1419-2/

> 给定两个 没有重复元素 的数组 `nums1` 和 `nums2` ，其中`nums1` 是 `nums2` 的子集。找到 `nums1` 中每个元素在 `nums2` 中的下一个比其大的值。
>
> `nums1` 中数字 `x` 的下一个更大元素是指 `x` 在 `nums2` 中对应位置的右边的第一个比 `x` 大的元素。如果不存在，对应位置输出 -1 。
>
> 示例 1:
>
> ```
> 输入: nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2].
> 输出: [-1, 3, -1]
> 解释:
>  对于 num1 中的数字 4，你无法在第二个数组中找到下一个更大的数字，因此输出 -1。
>  对于 num1 中的数字 1，第二个数组中数字 1 右边的下一个较大数字是 3。
>  对于 num1 中的数字 2，第二个数组中没有下一个更大的数字，因此输出 -1。
> ```
>
> 
>
>
> 示例 2:
>
> ```
> 输入: nums1 = [2, 4], nums2 = [1, 2, 3, 4].
> 输出: [3, -1]
> 解释:
>  对于 num1 中的数字 2，第二个数组中的下一个较大数字是 3。
>  对于 num1 中的数字 4，第二个数组中没有下一个更大的数字，因此输出 -1。
> ```
>
> 注意:
>
> 1、`nums1` 和 `nums2` 中所有元素是唯一的。
> 2、`nums1` 和 `nums2`  的数组大小都不超过1000。 

单调栈技巧：画图。

### 方法一：暴力解法（Brute Force）

就根据题目意思来写。

Java 代码：

```java
import java.util.Arrays;

public class Solution {

    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        int len1 = nums1.length;
        int len2 = nums2.length;

        int[] res = new int[len1];
        if (len1 < 1) {
            return res;
        }

        for (int i = 0; i < len1; i++) {
            int curVal = nums1[i];
            int j = 0;
            while (j < len2 && nums2[j] != curVal) {
                j++;
            }

            // 此时 nums[j] = nums[i]
            j++;
            while (j < len2 && nums2[j] < curVal) {
                j++;
            }

            if (j == len2) {
                res[i] = -1;
                continue;
            }
            res[i] = nums2[j];
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(NM)$，这里 $N$ 是数组 `nums1` 的长度， $M$ 是数组 `nums2` 的长度
+ 空间复杂度：$O(N)$。

### 方法二：单调栈

1、找右边第 1 个大于自己的元素，这种问题的套路就是使用栈，并且这个栈的特点是：从栈底到栈顶是单调不增的；

2、编码技巧：画图模拟栈是如何工作的，帮助编码和思考细节。

（1）这里要预处理数组 `nums2` ，每一次弹栈的操作，弹出的那个元素是较小的元素，入栈的那个元素是第 1 个比弹出的那个元素大的元素，于是我们可以建立对应关系：

```
key：弹出元素，value：入栈元素。
```

放置在一个哈希表中。

（2）最后遍历一次数组 `nums1` 从哈希表中获得结果。

![image-20191203165042581](/Users/liwei/Library/Application Support/typora-user-images/image-20191203165042581.png)

Java 代码：

```java
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        int len1 = nums1.length;
        int len2 = nums2.length;

        Stack<Integer> stack = new Stack<>();
        Map<Integer, Integer> map = new HashMap<>();
        // 对 nums2 先预处理
        for (int i = 0; i < len2; i++) {
            while (!stack.isEmpty() && stack.peek() < nums2[i]) {
                map.put(stack.pop(), nums2[i]);
            }
            stack.push(nums2[i]);
        }
        
        // 遍历 nums1 得到结果集
        int[] res = new int[len1];
        for (int i = 0; i < len1; i++) {
            res[i] = map.getOrDefault(nums1[i], -1);
        }
        return res;
    }
}
```

+ 时间复杂度：$O(N + M)$，分别遍历数组 `nums1` 和数组 `nums2` 各一次即可。
+ 空间复杂度：$O(N)$。


