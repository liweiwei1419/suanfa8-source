---
title: 「力扣」第 150 题：逆波兰表达式求值（中等）
icon: yongyan
category: 栈
tags:
  - 栈
---

+ 题目链接：[150. 逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)。


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

逆波兰表达式求值。运算符放在两个数后面进行运算的表达式。


Java 代码：

```java
public class Solution {

    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < tokens.length; i++) {
            String token = tokens[i];
            String pattern = "-?[0-9]+|[\\+\\-\\*/]";
            if (!token.matches(pattern)) {
                throw new RuntimeException("非法的表达式");
            }
            if (token.matches("-?[0-9]+")) {
                int num = Integer.valueOf(token);
                System.out.println(num);
                stack.push(num);
            }
            if (token.matches("[\\+\\-\\*/]")) {
                System.out.println("加减乘除" + token);
                if (stack.size() >= 2) {
                    int num1 = stack.pop();
                    int num2 = stack.pop();
                    int result = 0;
                    switch (token){
                        case "+":
                            result = num2 +num1;
                            break;
                        case "-":
                            result = num2 -num1;
                            break;
                        case "*":
                            result = num2 *num1;
                            break;
                        case "/":
                            result = num2 /num1;
                            break;
                    }
                    stack.push(result);
                }
            }
        }

        return stack.pop();
    }


    public static void main(String[] args) {
        String[] tokens = new String[]{"3", "-4", "+"};

        Solution solution = new Solution();
        int result = solution.evalRPN(tokens);
        System.out.println(result);
    }
}
```

是有问题的：Time Limit Exceeded 。然后我把上面的两个 System.out.println() 语句删除就 A 过了，好神奇，所以做题还是要规范啊。

我的解答：

```java
public class Solution {

    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < tokens.length; i++) {
            String token = tokens[i];
            String pattern = "-?[0-9]+|[\\+\\-\\*/]";
            if (!token.matches(pattern)) {
                throw new RuntimeException("非法的表达式");
            }
            if (token.matches("-?[0-9]+")) {
                int num = Integer.valueOf(token);
                System.out.println(num);
                stack.push(num);
            }
            if (token.matches("[\\+\\-\\*/]")) {
                System.out.println("加减乘除" + token);
                if (stack.size() >= 2) {
                    int num1 = stack.pop();
                    int num2 = stack.pop();
                    int result = 0;
                    switch (token){
                        case "+":
                            result = num2 +num1;
                            break;
                        case "-":
                            result = num2 -num1;
                            break;
                        case "*":
                            result = num2 *num1;
                            break;
                        case "/":
                            result = num2 /num1;
                            break;
                    }
                    stack.push(result);
                }
            }
        }

        return stack.pop();
    }


    public static void main(String[] args) {
        String[] tokens = new String[]{"3", "-4", "+"};

        Solution solution = new Solution();
        int result = solution.evalRPN(tokens);
        System.out.println(result);
    }
}
```

是有问题的：Time Limit Exceeded 。然后我把上面的两个 System.out.println() 语句删除就 A 过了，好神奇，所以做题还是要规范啊。

Java 代码：

```java
import java.util.Stack;

/**
 * @author liweiwei1419
 * @date 2019/9/20 11:04 下午
 */
public class Solution {

    public int evalRPN(String[] tokens) {
        int len = tokens.length;
        if (len == 0) {
            return 0;
        }
        Stack<Integer> stack = new Stack<>();
        // 第 2 个数
        int a;
        // 第 1 个数
        int b;
        int c = 0;
        String operators = "+-*/";
        for (int i = 0; i < len; i++) {
            // 是运算符
            if (operators.contains(tokens[i])) {
                // 第 2 个数
                a = stack.pop();
                // 第 1 个数
                b = stack.pop();
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
                stack.push(c);
            } else {
                // 是数字
                stack.push(Integer.parseInt(tokens[i]));
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        String[] tokens = new String[]{"10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"};
        int res = new Solution().evalRPN(tokens);
        System.out.println(res);
    }
}
```






