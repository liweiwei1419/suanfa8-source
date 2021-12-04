# 「力扣」第 345 题：反转字符串中的元音字母（简单）

+ 中文网址：[345. 反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/description/)；
+ 英文网址：[345. Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/description/) 。

> 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。
>
> **示例 1:**
>
> ```
> 输入: "hello"
> 输出: "holle"
> ```
>
> **示例 2:**
>
> ```
> 输入: "leetcode"
> 输出: "leotcede"
> ```
>
> **说明:**
> 元音字母不包含字母"y"。

Python 代码：

```python
class Solution(object):
    def reverseVowels(self, s):
        """
        :type s: str
        :rtype: str
        """
        vowels = set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
        s = list(s)
        left = 0
        right = len(s) - 1
        while left < right:
            if s[left] not in vowels:
                left += 1
            elif s[right] not in vowels:
                right -= 1
            else:
                s[left], s[right] = s[right], s[left]
                left += 1
                right -= 1
        return ''.join(s)
```





---
title: 「力扣」第 26 题：删除排序数组中的重复项
date: 2017-06-15 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 3：数组
tags:
  - 数组
  - 循环不变量
permalink: leetcode-algo/0345-reverse-vowels-of-a-string
---

## 「力扣」第 345 题：反转字符串中的元音字母

+ 中文网址：[345. 反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/description/) ；

+ 英文网址：[345. Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/description/) 。

> 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。
>
> 示例 1：
>
> ```
> 输入: "hello"
> 输出: "holle"
> ```
>
>
> 示例 2：
>
> ```
> 输入: "leetcode"
> 输出: "leotcede"
> ```
>
> 说明：
> 元音字母不包含字母"y"。

分析：

- 使用指针对撞，遇到元音字符的时候就听下来交换，交换以后指针继续向前；
- 这样的代码其实是套路，多写几遍就不会忘记了，我们在基础算法的学习中，曾经也有遇到过。

Java 代码：

```java
public class Solution {
    /**
     * 写多了就知道，这是套路了
     *
     * @param s
     * @return
     */
    public String reverseVowels(String s) {
        if (s.length() == 0) return "";
        char[] chars = s.toCharArray();
        int i = 0;
        int j = chars.length - 1;
        while (true) {
            // 如果走到最后一位都不符号要求的话，就不能再前进了。代码实现如下
            while (i < chars.length && !checkVowels(chars[i])) {
                i++;
            }
            while (j >= 0 && !checkVowels(chars[j])) {
                j--;
            }
            if (i < j) {
                swap(chars, i, j);
                i++;
                j--;
            } else {
                break;
            }
        }
        return new String(chars);
    }

    private void swap(char[] chars, int index1, int index2) {
        if (index1 == index2) return;
        char temp = chars[index1];
        chars[index1] = chars[index2];
        chars[index2] = temp;
    }

    private boolean checkVowels(char c) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
                c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U'   ) {
            return true;
        } else {
            return false;
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        //String result1 = solution.reverseVowels("hello");
        //System.out.println(result1);
        //String result2 = solution.reverseVowels("leetcode");
        //System.out.println(result2);

        String result3 = solution.reverseVowels(" ");
        System.out.println(result3);

    }
}
```

Python 代码：

```python
class Solution(object):
    def reverseVowels(self, s):
        """
        :type s: str
        :rtype: str
        """
        vowels = set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
        s = list(s)
        left = 0
        right = len(s) - 1
        while left < right:
            if s[left] not in vowels:
                left += 1
            elif s[right] not in vowels:
                right -= 1
            else:
                s[left], s[right] = s[right], s[left]
                left += 1
                right -= 1
        return ''.join(s)
```

### 要注意的地方

- 极端的情况要考虑到：`if (s.length() == 0) return "";`；
- 还有一种极端的情况要考虑到，就是 i 和 j 可以一直走到底的情况，翻译成大白话就是：如果走到最后一位都不符号要求的话，就不能再前进了。代码实现如下：

```java
while (i < chars.length && !checkVowels(chars[i])) {
    i++;
}
while (j >= 0 && !checkVowels(chars[j])) {
    j--;
}
```

上述代码特别容易忽略掉：`i < chars.length` 和 `j >= 0` 这两个前提条件。

（本节完）

### Leetcode 第 345 题：[反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string)

传送门：英文网址：[345. Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/description/) ，中文网址：[345. 反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/description/) 。

> 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。
>
> **示例 1:**
>
> ```
> 输入: "hello"
> 输出: "holle"
> ```
>
> **示例 2:**
>
> ```
> 输入: "leetcode"
> 输出: "leotcede"
> ```
>
> **说明:**
> 元音字母不包含字母"y"。

Python 代码：

```python
class Solution(object):
    def reverseVowels(self, s):
        """
        :type s: str
        :rtype: str
        """
        vowels = set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'])
        s = list(s)
        left = 0
        right = len(s) - 1
        while left < right:
            if s[left] not in vowels:
                left += 1
            elif s[right] not in vowels:
                right -= 1
            else:
                s[left], s[right] = s[right], s[left]
                left += 1
                right -= 1
        return ''.join(s)
```

### 