---
title: 「力扣」第 344 题：反转字符串（简单）
icon: yongyan
category: 双指针
tags:
  - 双指针
---

- 题目链接：[344. 反转字符串](https://leetcode-cn.com/problems/reverse-string/description/) 。

## 题目描述

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 `char[]` 的形式给出。

不要给另外的数组分配额外的空间，你必须**原地修改输入数组**、使用 O(1) 的额外空间解决这一问题。

**示例 1：**

```
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

**示例 2：**

```
输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

**提示：**

- `1 <= s.length <= 10^5`
- `s[i]` 都是 [ASCII](https://baike.baidu.com/item/ASCII) 码表中的可打印字符

## 方法一：使用 Java 语言提供的反转 API 完成

**参考代码 1**：

```java
public class Solution {
    public String reverseString(String s) {
        StringBuilder reverse = new StringBuilder();
        for (int i = s.length()-1; i >=0 ; i--) {
            reverse.append(s.charAt(i));
        }
        return reverse.toString();
    }

    // Given s = "hello", return "olleh".
    public static void main(String[] args) {
        String s = "hello";
        Solution solution = new Solution();
        String reverseString = solution.reverseString(s);
        System.out.println(reverseString);
    }
}
```

## 方法二：使用指针对撞

**参考代码 2**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {
    public String reverseString(String s) {
        char[] cArray = s.toCharArray();
        int i = 0;
        int j = cArray.length - 1;
        while (i < j) {
            swap(cArray, i, j);
            i++;
            j--;
        }
        return new String(cArray);
    }

    private void swap(char[] s, int index1, int index2) {
        if (index1 == index2) return;
        char temp = s[index1];
        s[index1] = s[index2];
        s[index2] = temp;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String result = solution.reverseString("hello world");
        System.out.println(result);
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution(object):

    def reverseString(self, s):
        """
        :type s: str
        :rtype: str
        """
        if len(s) < 2:
            return s

        left = 0
        right = len(s) - 1
        l = list(s)
        # 重合在一个就没有交换的必要了，因此是 left < right
        while left < right:
            l[left], l[right] = l[right], l[left]
            left += 1
            right -= 1
        return ''.join(l)

````

</CodeGroupItem>
</CodeGroup>
