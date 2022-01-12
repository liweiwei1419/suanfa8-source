---
title: 「力扣」第 150 题：逆波兰表达式求值（中等）
icon: yongyan
category: 栈
tags:
  - 栈
---

- 题目链接：[150. 逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)。

## 题目描述

根据[逆波兰表示法](https://baike.baidu.com/item/%E9%80%86%E6%B3%A2%E5%85%B0%E5%BC%8F/128437)，求表达式的值。

有效的运算符包括 `+`, `-`, `*`, `/` 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

**说明：**

- 整数除法只保留整数部分。
- 给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。

**示例 1：**

```
输入: ["2", "1", "+", "3", "*"]
输出: 9
解释: ((2 + 1) * 3) = 9
```

**示例 2：**

```
输入: ["4", "13", "5", "/", "+"]
输出: 6
解释: (4 + (13 / 5)) = 6
```

**示例 3：**

```
输入: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
输出: 22
解释:
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```

**提示：**

- `1 <= tokens.length <= 10^4`
- `tokens[i]` 要么是一个算符（`"+"`、`"-"`、`"*"` 或 `"/"`），要么是一个在范围 `[-200, 200]` 内的整数

**逆波兰表达式：**

逆波兰表达式是一种后缀表达式，所谓后缀就是指算符写在后面。

- 平常使用的算式则是一种中缀表达式，如 `( 1 + 2 ) * ( 3 + 4 )` 。
- 该算式的逆波兰表达式写法为 `( ( 1 2 + ) ( 3 4 + ) * )` 。

逆波兰表达式主要有以下两个优点：

- 去掉括号后表达式无歧义，上式即便写成 `1 2 + 3 4 + * `也可以依据次序计算出正确结果。
- 适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中。

---

逆波兰表达式求值。运算符放在两个数后面进行运算的表达式。

**参考代码**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    // 思路：数字就加入栈，运算符就计算

    public int evalRPN(String[] tokens) {
        int len = tokens.length;
        if (len == 0) {
            return 0;
        }
        Deque<Integer> stack = new ArrayDeque<>();
        // 第 2 个数
        int a;
        // 第 1 个数
        int b;
        int c = 0;
        String operators = "+-*/";
        for (int i = 0; i < len; i++) {
            // 是运算符，问题 contains 这个方法好不好？
            if (operators.contains(tokens[i])) {
                // 第 2 个数
                a = stack.removeLast();
                // 第 1 个数
                b = stack.removeLast();
                if ("+".equals(tokens[i])) {
                    c = b + a;
                }
                if ("-".equals(tokens[i])) {
                    c = b - a;
                }
                if ("*".equals(tokens[i])) {
                    c = b * a;
                }
                if ("/".equals(tokens[i])) {
                    c = b / a;
                }
                stack.addLast(c);
            } else {
                // 是数字
                stack.addLast(Integer.parseInt(tokens[i]));
            }
        }
        return stack.removeLast();
    }
}
```
