---
title: 「力扣」第 739 题：每日温度（中等）
icon: yongyan
category: 栈
tags:
  - 栈
  - 单调栈
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

- `1 <= temperatures.length <= 10^5`
- `30 <= temperatures[i] <= 100`

## 方法一：暴力解法（Brute Force）

关键是：**找出右边第 1 个严格大于自己的元素的下标**。

问题是：就像选择排序一样，上一轮的操作并没有为下一轮的操作留下什么有用的信息。

**参考代码 1**：

```Java []
import java.util.Arrays;

public class Solution {

    public int[] dailyTemperatures(int[] T) {
        int len = T.length;
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

    public static void main(String[] args) {
        int[] T = {73, 74, 75, 71, 69, 72, 76, 73};
        Solution solution = new Solution();
        int[] res = solution.dailyTemperatures(T);
        System.out.println(Arrays.toString(res));
    }
}
```

**复杂度分析**：
+ 时间复杂度：$O(N^2)$，这里 $N$ 表示 `T` 数组的长度。
+ 空间复杂度：$O(1)$

## 方法二：栈（单调栈）


+ 根据经验「找出右边第 1 个严格大于自己的元素的下标」，这件事情可以通过「栈」完成计算，并且维护这个栈的单调性；
+ 这里**需要分析出「后进先出」的规律**：栈顶元素出栈，表示栈顶元素找到了「右边第 1 个严格大于自己的元素」（就是当前遍历到的元素 `i`）。

总结：

+ 单调栈专门解决「找左边（或者右边）第 1 个严格大于自己的元素」；
+ 这里的单调栈从栈底到栈顶是一个单调不增栈，遇到值相同的元素的时候，仍然要入栈；
+ 存的是下标，拿出来以后，还要从 `T` 中取值；
+ 以下两点是始终保持的：
  + 因为一个元素对应的结果，要靠还没有入栈的元素的值确定，因此在遍历的时候，一定有一个元素入栈；
  + 出栈的时候，出栈元素的结果可以确定。 

**参考代码 2**：

```Java []
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.Stack;

public class Solution {

    public int[] dailyTemperatures(int[] T) {
        int len = T.length;
        if (len < 2) {
            return new int[len];
        }

        int[] res = new int[len];
        // 栈里存下标；对应的值的特点，单调不增；出栈的时候，记录 res
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < len; i++) {
            while (!stack.isEmpty() && T[stack.peekLast()] < T[i]) {
                int index = stack.removeLast();
                res[index] = i - index;
            }
            stack.addLast(i);
        }

        // 最后在栈里的元素保持单调不增，因此下面这三行代码可以省略
        while (!stack.isEmpty()) {
            res[stack.pop()] = 0;
        }
        return res;
    }
}
```

**复杂度分析**：
+ 时间复杂度：$O(N)$，扫描一次 `T` 数组就可以得到答案，可以认为是以空间换时间；
+ 空间复杂度：$O(N)$。


**参考代码 3**：

+ 由于维护单调不减栈，可以在一开始放置一个很大的数值，使得站内元素永远非空。

```Java []
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class Solution {

    public int[] dailyTemperatures(int[] T) {
        int len = T.length;

        int[] newT = new int[len + 1];
        newT[0] = Integer.MAX_VALUE;
        for (int i = 0; i < len; i++) {
            newT[i + 1] = T[i];
        }

        int[] res = new int[len];
        T = newT;

        Deque<Integer> stack = new ArrayDeque<>();
        stack.addLast(0);

        // 注意有效位置从 1 开始
        for (int i = 1; i <= len; i++) {
            // 由于有哨兵结点在，查看栈顶元素的时候不用判空
            while (T[stack.peekLast()] < T[i]) {
                Integer top = stack.removeLast();
                res[top - 1] = i - top;
            }
            stack.addLast(i);
        }
        return res;
    }
}
```

**复杂度分析**：（同上）

