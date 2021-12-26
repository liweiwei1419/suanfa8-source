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
title: 「力扣」第 739 题：每日温度（单调栈）（单调栈）
date: 2017-09-23 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 8：单调栈
tags:
  - 栈
  - 单调栈
permalink: leetcode-algo/0739-daily-temperatures
---

## 「力扣」第 739 题：每日温度（单调栈）

链接：https://leetcode-cn.com/problems/daily-temperatures

题解链接：https://leetcode-cn.com/problems/daily-temperatures/solution/bao-li-jie-fa-dan-diao-zhan-by-liweiwei1419/

难易程度：中等。

> 根据每日 `气温` 列表，请重新生成一个列表，对应位置的输入是你需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
>
> 例如，给定一个列表 `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`，你的输出应该是 `[1, 1, 4, 2, 1, 1, 0, 0]`。
>
> 提示：气温 列表长度的范围是 `[1, 30000]`。每个气温的值的均为华氏度，都是在 `[30, 100]` 范围内的整数。

### 方法一：暴力解法（Brute Force）

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

### 方法二：单调栈

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

