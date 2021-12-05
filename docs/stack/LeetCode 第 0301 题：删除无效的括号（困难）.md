# 「力扣」第 301 题：删除无效的括号（困难）

+ 链接：https://leetcode-cn.com/problems/remove-invalid-parentheses

> 删除最小数量的无效括号，使得输入的字符串有效，返回所有可能的结果。
>
> 说明: 输入可能包含了除 ( 和 ) 以外的字符。
>
> 示例 1:
>
> ```
> 输入: "()())()"
> 输出: ["()()()", "(())()"]
> ```
>
>
> 示例 2:
>
> ```
> 输入: "(a)())()"
> 输出: ["(a)()()", "(a())()"]
> ```
>
>
> 示例 3:
>
> ```
> 输入: ")("
> 输出: [""]
> ```

题意分析：删除 **最小数量** 的无效括号。

## 方法：DFS

![image-20191125141350031](/Users/liwei/Library/Application Support/typora-user-images/image-20191125141350031.png)

![image-20191125141458412](/Users/liwei/Library/Application Support/typora-user-images/image-20191125141458412.png)

![image-20191125141827891](/Users/liwei/Library/Application Support/typora-user-images/image-20191125141827891.png)



![image-20191125141950391](/Users/liwei/Library/Application Support/typora-user-images/image-20191125141950391.png)

![image-20191125142006330](/Users/liwei/Library/Application Support/typora-user-images/image-20191125142006330.png)

![image-20191125142028651](/Users/liwei/Library/Application Support/typora-user-images/image-20191125142028651.png)