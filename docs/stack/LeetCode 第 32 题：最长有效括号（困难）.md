# LeetCode 第 32 题：最长有效括号（困难）

> 给定一个只包含 `'('` 和 `')'` 的字符串，找出最长的包含有效括号的子串的长度。
>
> 示例 1：
>
> ```
> 输入: "(()"
> 输出: 2
> 解释: 最长有效括号子串为 "()"
> ```
>
>
> 示例 2：
>
> ```
> 输入: ")()())"
> 输出: 4
> 解释: 最长有效括号子串为 "()()"
> ```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



分析：

![image-20191125102409843](/Users/liwei/Library/Application Support/typora-user-images/image-20191125102409843.png)

![image-20191125102824991](/Users/liwei/Library/Application Support/typora-user-images/image-20191125102824991.png)



> 难点：
>
> 1、正着做一遍；
>
> 2、反着做一遍。
>
> 3、查看 ASCII ，`(` 和 `)` 的差别，可以使用异或 1 操作互换。



![image-20191125103149866](/Users/liwei/Library/Application Support/typora-user-images/image-20191125103149866.png)