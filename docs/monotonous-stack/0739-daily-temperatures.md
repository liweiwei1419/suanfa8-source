---
title: 「力扣」第 739 题：每日温度（中等）
icon: yongyan
category: 栈
tags:
  - 栈
---

+ 题目链接：[739. 每日温度](https://leetcode-cn.com/problems/daily-temperatures/)；
+ 题解链接：[暴力解法 + 栈（单调栈）](https://leetcode-cn.com/problems/daily-temperatures/solution/bao-li-jie-fa-dan-diao-zhan-by-liweiwei1419/)。

## 题目描述

请根据每日 `气温` 列表 `temperatures` ，请计算在每一天需要等几天才会有更高的温度。如果气温在这之后都不会升高，请在该位置用 `0` 来代替。

**示例 1:**

```
输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]
```

**示例 2:**

```
输入: temperatures = [30,40,50,60]
输出: [1,1,1,0]
```

**示例 3:**

```
输入: temperatures = [30,60,90]
输出: [1,1,0]
```



**提示：**

- `1 <= temperatures.length <= 105`
- `30 <= temperatures[i] <= 100`

## 方法一：暴力解法（Brute Force）

关键是：**找出右边第 1 个严格大于自己的元素的索引**。

问题是：就像选择排序一样，上一轮的操作并没有为下一轮的操作留下什么有用的信息。

> 这件事情就是**单调栈**能做的事情，记住这个结论。

Java 代码：

```java
import java.util.Arrays;

public class Solution {

    public int[] dailyTemperatures(int[] T) {
        int len = T.length;
        // 特判
        if (len < 2) {
            return new int[len];
        }
        int[] res = new int[len];
        res[len - 1] = 0;
        for (int i = 0; i < len - 1; i++) {
            int curVal = T[i];
            for (int j = i + 1; j < len; j++) {
                if (T[j] > curVal) {
                    res[i] = j - i;
                    break;
                }
            }
        }
        return res;
    }
}
```

![image-20191203111906535](https://tva1.sinaimg.cn/large/006tNbRwly1g9jd8e10k2j30sk06ogmg.jpg)

## 方法二：单调栈

> 要点：
>
> 1、单调栈里面存的是索引；
>
> 2、比较的是元素的值。

Java 代码：

```java
import java.util.Arrays;
import java.util.Stack;

public class Solution {

    // 时间复杂度：O(N)
    // 空间复杂度：O(N)

    public int[] dailyTemperatures(int[] T) {
        int len = T.length;
        // 特判
        if (len < 2) {
            return new int[len];
        }
        int[] res = new int[len];

        // 1、存的是索引
        // 2、对应的值的特点，单调不减
        // 3、出栈的时候，记录 res
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < len; i++) {
            // 注意 1：根据题意，这里要写等于号
            // 注意 2：不能把 while 写成 if
            while (!stack.isEmpty() && T[stack.peek()] < T[i]) {
                int index = stack.pop();
                res[index] = i - index;
            }
            stack.push(i);
        }
        while (!stack.isEmpty()) {
            res[stack.pop()] = 0;
        }
        return res;
    }
}
```

