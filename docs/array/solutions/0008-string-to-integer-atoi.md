---
title: 「力扣」第 8 题：字符串转换整数 (atoi)（中等）
icon: yongyan
category: 数组
tags:
  - 字符串
  - 数组
---


+ 题目链接：[8. 字符串转换整数 (atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/)；
+ 题解链接：[尽量不使用库函数、一次遍历（Java）](https://leetcode-cn.com/problems/string-to-integer-atoi/solution/jin-liang-bu-shi-yong-ku-han-shu-nai-xin-diao-shi-/)。

## 题目描述

请你来实现一个 `myAtoi(string s)` 函数，使其能将字符串转换成一个 32 位有符号整数（类似 C/C++ 中的 `atoi` 函数）。

函数 `myAtoi(string s)` 的算法如下：

- 读入字符串并丢弃无用的前导空格
- 检查下一个字符（假设还未到字符末尾）为正还是负号，读取该字符（如果有）。 确定最终结果是负数还是正数。 如果两者都不存在，则假定结果为正。
- 读入下一个字符，直到到达下一个非数字字符或到达输入的结尾。字符串的其余部分将被忽略。
- 将前面步骤读入的这些数字转换为整数（即，"123" -> 123， "0032" -> 32）。如果没有读入数字，则整数为 0 。必要时更改符号（从步骤 2 开始）。
- 如果整数数超过 32 位有符号整数范围 $[−2^{31}, 2^{31} − 1]$ ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 $−2^{31}$ 的整数应该被固定为 $−2^{31}$ ，大于 $2^{31} − 1$ 的整数应该被固定为 $2^{31} − 1$ 。
- 返回整数作为最终结果。

**注意：**

- 本题中的空白字符只包括空格字符 `' '` 。
- 除前导空格或数字后的其余字符串外，**请勿忽略** 任何其他字符。

**示例 1：**

```
输入：s = "42"
输出：42
解释：加粗的字符串为已经读入的字符，插入符号是当前读取的字符。
第 1 步："42"（当前没有读入字符，因为没有前导空格）
         ^
第 2 步："42"（当前没有读入字符，因为这里不存在 '-' 或者 '+'）
         ^
第 3 步："42"（读入 "42"）
           ^
解析得到整数 42 。
由于 "42" 在范围 [-2^31, 2^31 - 1] 内，最终结果为 42 。
```

**示例 2：**

```
输入：s = "   -42"
输出：-42
解释：
第 1 步："   -42"（读入前导空格，但忽视掉）
            ^
第 2 步："   -42"（读入 '-' 字符，所以结果应该是负数）
             ^
第 3 步："   -42"（读入 "42"）
               ^
解析得到整数 -42 。
由于 "-42" 在范围 [-231, 231 - 1] 内，最终结果为 -42 。
```

**示例 3：**

```
输入：s = "4193 with words"
输出：4193
解释：
第 1 步："4193 with words"（当前没有读入字符，因为没有前导空格）
         ^
第 2 步："4193 with words"（当前没有读入字符，因为这里不存在 '-' 或者 '+'）
         ^
第 3 步："4193 with words"（读入 "4193"；由于下一个字符不是一个数字，所以读入停止）
             ^
解析得到整数 4193 。
由于 "4193" 在范围 [-2^31, 2^31 - 1] 内，最终结果为 4193 。
```

**示例 4：**

```
输入：s = "words and 987"
输出：0
解释：
第 1 步："words and 987"（当前没有读入字符，因为没有前导空格）
         ^
第 2 步："words and 987"（当前没有读入字符，因为这里不存在 '-' 或者 '+'）
         ^
第 3 步："words and 987"（由于当前字符 'w' 不是一个数字，所以读入停止）
         ^
解析得到整数 0 ，因为没有读入任何数字。
由于 0 在范围 [-2^31, 2^31 - 1] 内，最终结果为 0 。
```

**示例 5：**

```
输入：s = "-91283472332"
输出：-2147483648
解释：
第 1 步："-91283472332"（当前没有读入字符，因为没有前导空格）
         ^
第 2 步："-91283472332"（读入 '-' 字符，所以结果应该是负数）
          ^
第 3 步："-91283472332"（读入 "91283472332"）
                     ^
解析得到整数 -91283472332 。
由于 -91283472332 小于范围 [-2^31, 2^31 - 1] 的下界，最终结果被截断为 -2^31 = -2147483648 。
```



**提示：**

- `0 <= s.length <= 200`
- `s` 由英文字母（大写和小写）、数字（`0-9`）、`' '`、`'+'`、`'-'` 和 `'.'` 组成

## 思路分析

这个问题其实没有考察算法的知识，模拟的是日常开发中对于原始数据的处理（例如「参数校验」等场景），如果面试中遇到类似的问题，应先仔细阅读题目文字说明和示例，有疑惑的地方和需要和面试官确认，在编码的时候需要耐心和细心地调试。

其实很多时候，业务需求就是类似这样的问题，工作中如果遇到：

1、有现成的工具和类库需尽量使用，因为它们是性能更优，且经过更严格测试，是相对可靠的；
2、能抽取成工具类、工具方法的尽量抽取，以突出主干逻辑、方便以后代码复用；
3、不得不写得比较繁琐、冗长的时候，需要写清楚注释、体现逻辑层次，以便上线以后排查问题和后续维护。

在这里我罗列几个要点：

+ 根据示例 1，需要去掉前导空格；
+ 根据示例 2，需要判断第 1 个字符为 `+` 和 `-` 的情况，因此，可以设计一个变量 `sign`，初始化的时候为 `1`，如果遇到 `-` ，将 `sign` 修正为 `-1`；
+ 判断是否是数字，可以使用字符的 ASCII 码数值进行比较，即 `0 <= c <= '9'`；
+ 根据示例 3 和示例 4 ，在遇到第 1 个不是数字的字符的情况下，转换停止，退出循环；
+ 根据示例 5，如果转换以后的数字超过了 `int` 类型的范围，需要截取。这里不能将结果 `res` 变量设计为 `long` 类型，**注意**：由于输入的字符串转换以后也有可能超过 `long` 类型，因此需要在循环内部就判断是否越界，只要越界就退出循环，这样也可以减少不必要的计算；
+ 由于涉及下标访问，因此全程需要考虑数组下标是否越界的情况。

**特别注意**：

1、由于题目中说「环境只能保存 32 位整数」，因此这里在每一轮循环之前先要检查乘以 $10$ 以后是否溢出，具体细节请见编码。

2、Java 、Python 和 C++ 字符串的设计都是不可变的，即使用 `trim()` 会产生新的变量，因此我们**尽量不使用库函数，使用一个变量 `index` 去做遍历，这样遍历完成以后就得到转换以后的数值**。

**参考代码 1**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int myAtoi(String str) {
        int len = str.length();
        // str.charAt(i) 方法回去检查下标的合法性，一般先转换成字符数组
        char[] charArray = str.toCharArray();

        // 1、去除前导空格
        int index = 0;
        while (index < len && charArray[index] == ' ') {
            index++;
        }

        // 2、如果已经遍历完成（针对极端用例 "      "）
        if (index == len) {
            return 0;
        }

        // 3、如果出现符号字符，仅第 1 个有效，并记录正负
        int sign = 1;
        char firstChar = charArray[index];
        if (firstChar == '+') {
            index++;
        } else if (firstChar == '-') {
            index++;
            sign = -1;
        }

        // 4、将后续出现的数字字符进行转换
        // 不能使用 long 类型，这是题目说的
        int res = 0;
        while (index < len) {
            char currChar = charArray[index];
            // 4.1 先判断不合法的情况
            if (currChar > '9' || currChar < '0') {
                break;
            }

            // 题目中说：环境只能存储 32 位大小的有符号整数，因此，需要提前判：断乘以 10 以后是否越界
            if (res > Integer.MAX_VALUE / 10 || (res == Integer.MAX_VALUE / 10 && (currChar - '0') > Integer.MAX_VALUE % 10)) {
                return Integer.MAX_VALUE;
            }
            if (res < Integer.MIN_VALUE / 10 || (res == Integer.MIN_VALUE / 10 && (currChar - '0') > -(Integer.MIN_VALUE % 10))) {
                return Integer.MIN_VALUE;
            }

            // 4.2 合法的情况下，才考虑转换，每一步都把符号位乘进去
            res = res * 10 + sign * (currChar - '0');
            index++;
        }
        return res;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String str = "2147483646";
        int res = solution.myAtoi(str);
        System.out.println(res);

        System.out.println(Integer.MAX_VALUE);
        System.out.println(Integer.MIN_VALUE);
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="C++">
```cpp
#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    int myAtoi(string str) {
        unsigned long len = str.length();

        // 去除前导空格
        int index = 0;
        while (index < len) {
            if (str[index] != ' ') {
                break;
            }
            index++;
        }

        if (index == len) {
            return 0;
        }

        int sign = 1;
        // 处理第 1 个非空字符为正负符号，这两个判断需要写在一起
        if (str[index] == '+') {
            index++;
        } else if (str[index] == '-') {
            sign = -1;
            index++;
        }

        // 根据题目限制，只能使用 int 类型
        int res = 0;
        while (index < len) {
            char curChar = str[index];
            if (curChar < '0' || curChar > '9') {
                break;
            }

            if (res > INT_MAX / 10 || (res == INT_MAX / 10 && (curChar - '0') > INT_MAX % 10)) {
                return INT_MAX;
            }
            if (res < INT_MIN / 10 || (res == INT_MIN / 10 && (curChar - '0') > -(INT_MIN % 10))) {
                return INT_MIN;
            }

            res = res * 10 + sign * (curChar - '0');
            index++;
        }
        return res;
    }
};
```
</CodeGroupItem>
</CodeGroup>


**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 为字符串的长度；
+ 空间复杂度：$O(1)$。

