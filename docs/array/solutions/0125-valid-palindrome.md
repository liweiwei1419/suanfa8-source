---
title: 「力扣」第 125 题：验证回文串（简单）
icon: yongyan
category: 数组
tags:
  - 数组
---

+ 题目链接：[125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome)。

## 题目描述


> 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
>
> 说明：本题中，我们将空字符串定义为有效的回文串。
>
> 示例 1：
>
> ```
> 输入: "A man, a plan, a canal: Panama"
> 输出: true
> ```
>
>
> 示例 2：
>
> ```
> 输入: "race a car"
> 输出: false
> ```

思路：使用指针对撞的思想：

```java
public class Solution {

    /**
     * "A man, a plan, a canal: Panama"
     *
     * @param s
     * @return
     */
    public boolean isPalindrome(String s) {
        int index_i = 0;
        int index_j = s.length() - 1;

        while (index_i <= index_j) {
            String i = s.charAt(index_i) + "";
            String j = s.charAt(index_j) + "";
            if (!i.matches("[0-9a-zA-Z]")) {
                index_i++;
                continue;
            }
            if (!j.matches("[0-9a-zA-Z]")) {
                index_j--;
                continue;
            }
            if (!j.equalsIgnoreCase(i)) {
                return false;
            } else {
                index_i++;
                index_j--;
            }
        }
        return true;
    }
}
```

提交以后发现，才击败了 0.85% 的 Java 开发者。
下面改了一版，击败了 19.22% 的 Java 开发者。

Java 代码：

```java
public class Solution {

    /**
     * "A man, a plan, a canal: Panama"
     *
     * @param s
     * @return
     */
    public boolean isPalindrome(String s) {
        // 去掉非数字和字母
        // 全部转换为小写
        s = s.replaceAll("[^0-9a-zA-Z]", "");
        StringBuilder reverse = new StringBuilder();
        for (int i = s.length() - 1; i >= 0; i--) {
            reverse.append(s.charAt(i));
        }
        return s.equalsIgnoreCase(reverse.toString());
    }

    public static void main(String[] args) {
        String s = "A man, a plan, a canal: Panama";
        Solution solution = new Solution();
        boolean palindrome = solution.isPalindrome(s);
        System.out.println(palindrome);
    }
}
```

