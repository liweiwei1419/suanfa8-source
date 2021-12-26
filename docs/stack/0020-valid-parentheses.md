---
title: 「力扣」第 20 题：有效的括号（简单）
icon: yongyan
category: 栈
tags:
  - 栈
---

+ 题目链接：[20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/description/)。


## 题目描述


给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。

**示例 1:**

```
输入: "()"
输出: true
```

**示例 2:**

```
输入: "()[]{}"
输出: true
```

**示例 3:**

```
输入: "(]"
输出: false
```

**示例 4:**

```
输入: "([)]"
输出: false
```

**示例 5:**

```
输入: "{[]}"
输出: true
```

**提示：**

- `1 <= s.length <= 104`
- `s` 仅由括号 `'()[]{}'` 组成

## 解题思路

典型应用，检查括号匹配，是文本编辑器常见的功能。

问题本身非常容易。判断字符串中的括号匹配是否合法。遍历一遍这个字符串，使用一个「栈」作为辅助空间。

+ 一旦遇到左方向的符号，就把这个符号推入栈；
+ 一旦遇到右方向的符号，将栈的栈顶元素出栈，就须要判断是否对应匹配；
+ `Stack` 中只是存放左方向的符号：`{`、`[`、`(`，在整个方法返回之前，一定要判断一下 `Stack` 是否为空。因为 `Stack` 有可能出现全是左括号的情况。即：在栈中还有元素的情况下，待检测的字符串一定是不符合题意的。

**参考代码 1**：

```java
public class Solution {

    public boolean isValid(String s) {
        int len = s.length();
        if (len == 0) {
            return true;
        }
        if ((len % 2) == 1) {
            return false;
        }

        char[] charArray = s.toCharArray();
        Deque&lt;Character&gt; stack = new ArrayDeque&lt;&gt;();
        for (char c:charArray) {
            switch (c) {
                case '(':
                    stack.addLast(')');
                    break;
                case '[':
                    stack.addLast(']');
                    break;
                case '{':
                    stack.addLast('}');
                    break;
                default:
                    if (stack.isEmpty() || stack.removeLast() != c) {
                        return false;
                    }
                    break;
            }
        }
        return stack.isEmpty();
    }
}
```

**复杂度分析：**

- 时间复杂度：$O(N)$，$N$是字符串 `s` 的长度；

- 空间复杂度：$O(N)$，最差情况下，字符串的一半字符字符要进入栈中。

还可以把左右括号的匹配关系存在一个哈希表中，增加扩展性。

**参考代码 2**：

```java
public class Solution {

    public boolean isValid(String s) {
        int len = s.length();
        if (len == 0) {
            return true;
        }
        // 奇数长度一定不是有效括号
        if ((len % 2) == 1) {
            return false;
        }

        char[] charArray = s.toCharArray();
        Map&lt;Character, Character&gt; hashMap = new HashMap&lt;&gt;();
        hashMap.put(')', '(');
        hashMap.put(']', '[');
        hashMap.put('}', '{');

        Deque&lt;Character&gt; stack = new ArrayDeque&lt;&gt;();
        for (char c : charArray) {
            // 如果遍历到右括号，检查是否匹配
            if (hashMap.containsKey(c)) {
                // 栈为空和栈顶与当前不匹配都不能称之为"有效"
                if (stack.isEmpty() || !hashMap.get(c).equals(stack.removeLast())) {
                    return false;
                }
            } else {
                // 遍历到左括号就加入栈
                stack.addLast(c);
            }
        }
        return stack.isEmpty();
    }
}
```

**复杂度分析**（同上）

---


我的解答（看起来有些繁琐）：

下面我按照老师的解法，写了一个不是优化了很多的解法：







Java 代码：

```java
public class Solution {

    public boolean isValid(String s) {
        boolean isValid = false;
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '{' || c == '(' || c == '[') {
                stack.push(c);
            }
            if (c == '}' || c == ')' || c == ']') {
                // 出栈之前，应该先检查一下栈中是否还有元素
                if (stack.isEmpty()) {
                    return isValid;
                }
                Character popElement = stack.pop();
                Character match = null;
                if (c == '}') {
                    match = '{';
                }
                if (c == ']') {
                    match = '[';
                }
                if (c == ')') {
                    match = '(';
                }

                if (popElement != match) {
                    return isValid;
                }
            }
        }
        if (stack.isEmpty()) {
            isValid = true;
        }
        return isValid;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        boolean result = solution.isValid("8{90[s(d)f]44}33");
        System.out.println(result);
    }

}
```

说明：最后的这一步：

```java
if (stack.isEmpty()) {
    isValid = true;
}
```

很容易忽略，请留意。


学到栈的时候，也学习了一些经典的使用栈解决问题，我们要思考一下为什么使用栈？
使用栈的原因：在一个嵌套的关系中，通过栈顶元素来获得最近的那个我们须要处理的元素。

栈顶元素反映了在嵌套的层次关系中，最近的需要匹配的元素。

Python 代码：

```python
# 20. 有效的括号
# 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
class Solution:
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        stack = []
        d = ["()", "[]", "{}"]
        for i in range(0, len(s)):
            stack.append(s[i])
            if len(stack) >= 2 and stack[-2] + stack[-1] in d:
                stack.pop()
                stack.pop()
        return len(stack) == 0
```





Java 代码：

```java
import java.util.Stack;


public class Solution {

    public boolean isValid(String s) {
        int len = s.length();
        if (len == 0) {
            return true;
        }

        if ((len & 1) == 1) {
            return false;
        }
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < len; i++) {
            char c = s.charAt(i);

            switch (c) {
                case '(':
                    stack.push(')');
                    break;
                case '[':
                    stack.push(']');
                    break;
                case '{':
                    stack.push('}');
                    break;
                default:
                    if (stack.isEmpty() || stack.pop() != c) {
                        return false;
                    }
                    break;
            }
        }
        return stack.isEmpty();
    }
}
```