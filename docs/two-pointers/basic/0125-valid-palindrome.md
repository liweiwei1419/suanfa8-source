# 「力扣」第 125 题：验证回文串（简单）

+ 中文网址：[125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome/description/) ；
+ 英文网址：[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/description/) ，

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

**说明：**本题中，我们将空字符串定义为有效的回文串。

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

**参考代码**：

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



### 

