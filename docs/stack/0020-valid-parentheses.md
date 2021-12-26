## 「力扣」第 20 题：有效的括号（简单）

+ 中文网址：[20. 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/description/) ；
+ 英文网址：[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/description/) ，

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