---
title: 「力扣」第 946 题：验证栈序列（中等）
icon: yongyan
category: 栈
tags:
  - 栈
---

+ 题目链接：[946. 验证栈序列](https://leetcode-cn.com/problems/validate-stack-sequences)。



## 题目描述




+ 链接：

> 给定 pushed 和 popped 两个序列，每个序列中的 值都不重复，只有当它们可能是在最初空栈上进行的推入 push 和弹出 pop 操作序列的结果时，返回 true；否则，返回 false 。
>
> 示例 1：
>
> ```
> 输入：pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
> 输出：true
> 解释：我们可以按以下顺序执行：
> push(1), push(2), push(3), push(4), pop() -> 4,
> push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
> ```
>
> 
>
>
> 示例 2：
>
> ```
> 输入：pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
> 输出：false
> 解释：1 不能在 2 之前弹出。
> ```
>
>
> 提示：
>
> 1、0 <= pushed.length == popped.length <= 1000
> 2、0 <= pushed[i], popped[i] < 1000
> 3、pushed 是 popped 的排列。

说明：使用栈模拟。

Java 代码：

```java
import java.util.Stack;

public class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        int len1 = pushed.length;
        int len2 = popped.length;

        if (len1 == 0 && len2 == 0){
            return true;
        }

        if (len2 == 0 || len1 != len2) {
            return false;
        }

        int index = 0;
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < len1; i++) {
            stack.push(pushed[i]);

            while (!stack.isEmpty() && stack.peek() == popped[index]) {
                stack.pop();
                index++;
            }

            // 调试代码
            // System.out.println(stack);
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        int[] pushed = {1, 2, 3, 4, 5};
        int[] popped = {4, 5, 3, 2, 1};
        Solution solution = new Solution();
        boolean res = solution.validateStackSequences(pushed, popped);
        System.out.println(res);
    }
}
```


