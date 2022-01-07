---
title: 「力扣」第 345 题：反转字符串中的元音字母（简单）
icon: yongyan
category: 双指针
tags:
  - 双指针
---

+ 题目地址：[345. 反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/description/)。


## 题目描述

给你一个字符串 `s` ，仅反转字符串中的所有元音字母，并返回结果字符串。

元音字母包括 `'a'`、`'e'`、`'i'`、`'o'`、`'u'`，且可能以大小写两种形式出现。



**示例 1：**

```
输入：s = "hello"
输出："holle"
```

**示例 2：**

```
输入：s = "leetcode"
输出："leotcede"
```

 **提示：**

- $1 <= s.length <= 3 * 10^5$
- `s` 由 **可打印的 ASCII** 字符组成

## 思路分析

- 使用指针对撞，遇到元音字符的时候就听下来交换，交换以后指针继续向前；
- 这样的代码其实是套路，多写几遍就不会忘记了，我们在基础算法的学习中，曾经也有遇到过。

**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {
  
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
</CodeGroupItem>

<CodeGroupItem title="Python">
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
</CodeGroupItem>
</CodeGroup>


## 要注意的地方

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

