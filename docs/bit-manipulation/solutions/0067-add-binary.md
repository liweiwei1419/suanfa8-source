---
title: 「力扣」第 67 题：二进制求和（简单）
icon: yongyan
category: 位运算
tags:
  - 位运算
---



+ 题目链接：[67. 二进制求和](https://leetcode-cn.com/problems/add-binary/)；
+ 题解链接：[模拟「二进制」竖式加法](https://leetcode-cn.com/problems/add-binary/solution/mo-shi-er-jin-zhi-shu-shi-jia-fa-by-liweiwei1419/)。



**思路分析**：

思路很简单，就是模拟一个「二进制」的竖式加法。

![image.png](https://pic.leetcode-cn.com/88f7d604ccd835f27b37fe5672a8c022ce2545f1bd5923f7ca066ef1e5f7e191-image.png){:width=400}
{:align=center}



我个人觉得这道题单纯是为了考察了我们对于所使用语言的字符串 API 的熟悉程度。写法不唯一，下面以 Java 为例编写参考代码。

在 Java 语言中，如果需要频繁地针对字符串进行操作，应该使用可变的字符序列对象 `StringBuilder`（这里有一个常见的面试问题：`StringBuilder` 与 `StringBuffer` 的区别），并且 `StringBuilder` 对象也为我们提供了一些好用的操作字符序列的方法（反转，删除、在某一个位置插入一个字符）。

编码中要注意的一点是：如果两个字符的长度不等，需要在短的那个字符串的**左边**补“0”。


**参考代码 1**：


```Java []
public class Solution {

    public String addBinary(String a, String b) {
        int aLen = a.length();
        int bLen = b.length();
        int maxLen = Math.max(aLen, bLen);

        // 从个位开始加，个位在字符串的右边
        // 代码访问从左到右，因此先反转一下
        StringBuilder sbA = new StringBuilder(a).reverse();
        StringBuilder sbB = new StringBuilder(b).reverse();

        // 让两个字符补齐成一样的长度
        while (sbA.length() < maxLen) {
            sbA.append("0");
        }
        while (sbB.length() < maxLen) {
            sbB.append("0");
        }

        StringBuilder res = new StringBuilder();
        // 进位，初始时进位为 0
        int carry = 0;
        // 当前字符的 ASCII 值减去 '0' 的 ASCII 值，相当于将这个字符转换成数值
        int num1;
        int num2;
        for (int i = 0; i < maxLen; i++) {
            num1 = sbA.charAt(i) - '0';
            num2 = sbB.charAt(i) - '0';
            if (carry + num1 + num2 > 1) {
                // 因为是二进制，所以多余 2 的部分要减去
                res.append(carry + num1 + num2 - 2);
                // 表示要进位
                carry = 1;
            } else {
                res.append(carry + num1 + num2);
                carry = 0;
            }
        }
        // 对于最高位还要进位的情况，需要单独判断
        if (carry == 1) {
            res.append("1");
        }
        // 最后不要忘记再反转一次
        return res.reverse().toString();
    }

    public static void main(String[] args) {
        String a = "1010";
        String b = "1011";
        Solution solution = new Solution();
        String addBinary = solution.addBinary(a, b);
        System.out.println(addBinary);
    }
}
```
**复杂度分析**：
+ 时间复杂度：$O(\max(M,N))$，这里 $M$ 是字符串 `a` 的长度，$N$ 是字符串 `b` 的长度。
+ 空间复杂度：$O(\max(M,N))$，保存结果需要 $\max(M,N)$ 长度的可变字符序列对象，如果最高位需要进位，还需要加 $1$，不过在复杂度计算中忽略这个 $1$。


上面的代码“翻转”了两次，显得有点啰嗦，我们可以使用两个指针，分别从字符串的末尾开始向前遍历，同时在借用 `StringBuilder` 对象的 `insert` 方法，从右向左依次得出计算结果，就真的非常接近我们手写“竖式加法”的过程了。下面是参考代码。


**参考代码 2**：

```Java []
public class Solution {

    public String addBinary(String a, String b) {
        int i = a.length() - 1;
        int j = b.length() - 1;

        // 保存结果的可变的字符序列对象
        StringBuilder res = new StringBuilder();
        // 当前和
        int curSum;
        int carry = 0;
        while (i >= 0 || j >= 0) {
            // 当前和至少是那个进位
            curSum = carry;
            if (i >= 0) {
                curSum += a.charAt(i) - '0';
                i--;
            }
            if (j >= 0) {
                curSum += b.charAt(j) - '0';
                j--;
            }

            // 判断是否需要进位，即确定 carry 的值
            if (curSum > 1) {
                curSum -= 2;
                carry = 1;
            } else {
                carry = 0;
            }

            // 只写结果的值，进位作为下一轮的初始值
            res.insert(0, curSum);
        }

        // 这里不要忘记如果全部加完以后还要进位，要把最高位加上 1
        if (carry == 1) {
            res.insert(0, 1);
        }
        return res.toString();
    }

    public static void main(String[] args) {
        String a = "1010";
        String b = "1011";
        Solution2 solution2 = new Solution2();
        String addBinary = solution2.addBinary(a, b);
        System.out.println(addBinary);
    }
}
```

**复杂度分析**：
+ 时间复杂度：$O(\max(M,N))$，这里 $M$ 是字符串 `a` 的长度，$N$ 是字符串 `b` 的长度。
+ 空间复杂度：$O(\max(M,N))$，保存结果需要 $\max(M,N)$ 长度的可变字符序列对象，如果最高位需要进位，还需要加 $1$，不过在复杂度计算中忽略这个 $1$。