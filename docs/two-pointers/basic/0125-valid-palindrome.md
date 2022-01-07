---
title: 「力扣」第 125 题：验证回文串（简单）
icon: yongyan
category: 双指针
tags:
  - 双指针
---

+ 题目地址：[125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome/description/)。


## 题目描述

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

**说明：** 本题中，我们将空字符串定义为有效的回文串。

**示例 1:**

```
输入: "A man, a plan, a canal: Panama"
输出: true
```

**示例 2:**

```
输入: "race a car"
输出: false
```

**提示：**

- $1 <= s.length <= 2 * 10^5$
- 字符串 `s` 由 ASCII 字符组成

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public boolean isPalindrome(String s) {
        int len = s.length();
        // 如果字符只有 1 个字母，那么也一定是回文数
        if (len < 2) {
            return true;
        }

        // 只考虑字母和数字字符，可以忽略字母的大小写。
        s = s.toLowerCase();
        // 只保留小写字母和数字
        s = s.replaceAll("[^0-9a-z]", "");
        char[] charArray = s.toCharArray();
        int left = 0;
        int right = charArray.length - 1;
        while (left < right) {
            char leftChar = charArray[left];
            char rightChar = charArray[right];
            if (leftChar != rightChar) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution(object):
    def isPalindrome(self, s):
        """
        :type s: str
        :rtype: bool
        """
        left = 0
        right = len(s) - 1
        while left < right:
            if not s[left].isalnum():
                left += 1
                continue
            if not s[right].isalnum():
                right -= 1
                continue

            if s[left].lower() != s[right].lower():
                return False

            left += 1
            right -= 1
        return True
```
</CodeGroupItem>
</CodeGroup>
