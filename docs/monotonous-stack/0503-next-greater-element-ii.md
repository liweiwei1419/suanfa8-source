---
title: 「力扣」第 503 题：下一个更大元素 II（单调栈）
date: 2017-09-22 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 8：单调栈
tags:
  - 栈
  - 单调栈
permalink: leetcode-algo/0503-next-greater-element-ii
---

### 「力扣」第 503 题：下一个更大元素 II

+ 链接：https://leetcode-cn.com/problems/next-greater-element-ii

> 给定一个循环数组（最后一个元素的下一个元素是数组的第一个元素），输出每个元素的下一个更大元素。数字 `x` 的下一个更大的元素是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1。
>
> 示例 1：
>
> ```
> 输入: [1,2,1]
> 输出: [2,-1,2]
> 解释: 第一个 1 的下一个更大的数是 2；
> 数字 2 找不到下一个更大的数； 
> 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
> ```
>
> 注意：输入数组的长度不会超过 10000。

思路：接着第 496 题做。

技巧：

1. 处理循环问题的套路是在后面再拼上一个相同的数组；
2. 因为得建议弹出元素和当前看到的元素对应关系，因此栈中存的是索引；

Java 代码：

```java
class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int len = nums.length;
        int[] res = new int[len];
        Arrays.fill(res, -1);
        // 存的应该是索引
        // 如果新来的数小于等于栈顶，就添加，如果严格大于，就弹栈
        Stack<Integer> stack = new Stack<>();
        int len2 = len << 1;
        for (int i = 0; i < len2; i++) {
            // 不能直接对 i 取模，否则会影响遍历，进入死循环
            int j = i % len;
            while (!stack.isEmpty() && nums[stack.peek()] < nums[j]) {
                int index = stack.pop();
                res[index] = nums[j];
            }
            if (i < len) {
                stack.push(i);
            }
            
            // 栈中元素为空的时候，后面的元素就没有必要看了
            if (stack.isEmpty()) {
                break;
            }
        }
        return res;
    }
}
```

Java 代码：

```java
import java.util.Arrays;
import java.util.Stack;

public class Solution {

    public int[] nextGreaterElements(int[] nums) {
        int len1 = nums.length;

        // 拼接循环数组，这是常用技巧
        int len2 = len1 << 1;
        int[] numsCirculate = new int[len2];
        System.arraycopy(nums, 0, numsCirculate, 0, len1);
        System.arraycopy(nums, 0, numsCirculate, len1, len1);

        // 初始化为 -1 的原因：在遍历终止的时候，栈中还存在的那些元素表示它们的右边没有比它大的元素
        int[] res = new int[len2];
        Arrays.fill(res, -1);

        // 存的应该是索引
        // 如果新来的数小于等于栈顶，就添加，如果严格大于，就弹栈
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < len2; i++) {

            while (!stack.isEmpty() && numsCirculate[stack.peek()] < numsCirculate[i]) {
                int index = stack.pop();
                res[index] = numsCirculate[i];
            }
            stack.push(i);
        }

        // 只要前一半即可
        int[] newRes = new int[len1];
        System.arraycopy(res, 0, newRes, 0, len1);
        return newRes;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 1};
        Solution solution = new Solution();
        int[] res = solution.nextGreaterElements(nums);
        System.out.println(Arrays.toString(res));
    }
}

```

Java 代码：

```java
import java.util.Arrays;
import java.util.Stack;

public class Solution {

    public int[] nextGreaterElements(int[] nums) {
        int len = nums.length;

        // 初始化为 -1 的原因：在遍历终止的时候，栈中还存在的那些元素表示它们的右边没有比它大的元素
        int[] res = new int[len];
        Arrays.fill(res, -1);

        // 存的应该是索引
        // 如果新来的数小于等于栈顶，就添加，如果严格大于，就弹栈
        Stack<Integer> stack = new Stack<>();

        int len2 = len << 1;
        for (int i = 0; i < len2; i++) {

            // 不能直接对 i 取模，否则会影响遍历，进入死循环
            int j = i % len;
            while (!stack.isEmpty() && nums[stack.peek()] < nums[j]) {
                int index = stack.pop();
                res[index] = nums[j];
            }

            // 超出 len 的那部分，是虚拟的，因此没有比较计算结果
            // 遍历第 2 遍，是为了让栈弹出为空
            if (i < len) {
                stack.push(i);
            }
            // 栈中元素为空的时候，后面的元素就没有必要看了
            if (stack.isEmpty()) {
                break;
            }
        }
        return res;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 1};
        Solution solution = new Solution();
        int[] res = solution.nextGreaterElements(nums);
        System.out.println(Arrays.toString(res));
    }
}
```



