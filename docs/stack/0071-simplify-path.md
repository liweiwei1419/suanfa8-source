---
title: 「力扣」第 71 题：简化路径（中等）
icon: yongyan
category: 栈
tags:
  - 栈
---

+ 题目链接：[]()；
+ 题解链接：[]()。


## 题目描述


# 

传送门：[71. 简化路径](https://leetcode-cn.com/problems/simplify-path/)。

以 Unix 风格给出一个文件的**绝对路径**，你需要简化它。或者换句话说，将其转换为规范路径。
在 Unix 风格的文件系统中，一个点（`.`）表示当前目录本身；此外，两个点 （`..`） 目录切换到上一级（指向父目录）；两者都可以是复杂相对路径的组成部分。更多信息请参阅：[Linux / Unix中的绝对路径 vs 相对路径](ps://blog.csdn.net/u011327334/article/details/50355600)
请注意，返回的规范路径必须始终以斜杠 `/` 开头，并且两个目录名之间必须只有一个斜杠 `/`。最后一个目录名（如果存在）**不能**以 `/`此外，规范路径必须是表示绝对路径的**最短**字符串。

**示例 1：**
```
输入："/home/"
输出："/home"
解释：注意，最后一个目录名后面没有斜杠。
```
**示例 2：**
```
输入："/../"
输出："/"
解释：从根目录向上一级是不可行的，因为根是你可以到达的最高级。
```
**示例 3：**
```
输入："/home//foo/"
输出："/home/foo"
解释：在规范路径中，多个连续斜杠需要用一个斜杠替换。
```
**示例 4：**
```
输入："/a/./b/../../c/"
输出："/c"
```
**示例 5：**
```
输入："/a/../../b/../c//.//"
输出："/c"
```
**示例 6：**
```
输入："/a//b////c/d//././/.."
输出："/a/b/c"
```

参考了如下的文章：http://blog.csdn.net/u012249528/article/details/46705867

这道题给出一个“字符串”，这个字符串中是有一些斜杠的，这些斜杠的含义是目录或者操作的分隔符。

+ 如果是英文字母，就表示一个目录。
+ 如果是一个点 `.` 表示停留在当前目录，如果是两个点 `..` 表示返回上一级目录。

那么为什么需要我们简化它呢？原因是有 `..` 表示返回上一级目录这种操作的存在。

例如：`/a/b/../..` 这个表示路径的字符串，表示先进入目录 `a` 再进入目录 `b` ，然后遇到两个`..` 回到它的父目录，也就是回到了目录 `a` ，然后又遇到两个`..` 回到它的父目录，也就是回到了根目录 `/` ，那么这个路径就被简化为一个斜杠 `/`。题目就是要我们返回这个斜杠。

另外我们注意到示例 3 ，有两个斜杠连在一起的情况，我们认为此时这两个斜杠中间是一个空字符，它等价于一个点 `.` ，即什么都不做。

解决这道问题的思路是：

1、需要先对字符串根据斜杠 `/`进行分割，得到一个字符串数组，这个字符串数组的字符串可能有以下几种：`.`、`..`、`''`、和表示目录的字母； 

2、我们读取目录，一定是从根目录 `/` 一层一层往下读的，因此**从左到右**遍历分割以后得到的字符串数组；

3、特别注意到两个点 `..` 这个字符串的含义，根据我们刚刚举出的例子，它其实是我们主要想要要简化的对象，要回到上一层目录，因此我们就需要知道上一层目录是什么，因此需要一个变量记住上一层目录是什么。从刚刚那个例子我们还可以看出，有时候我们还需要知道上上级目录是什么，因此，记录上级目录、上上级目录的变量就应该是一个列表或者说容器对象。

这和我们之前说栈和队列都是储存数据的容器是一致的，我们需要把读到的数据暂时存起来，栈和队列就是两种常见的存储数据的容器。

因为 `..` 这个字符回退到上一级目录，上一级目录相对于上上级目录是后读出的，后读的数据要先被返回，显然栈就是我们所需要的储存读取目录的容器对象。

考虑清楚这个问题以后，实际上思路就已经有了。

4、算法是：从左向右遍历字符串数组，如果遇到字母就直接入栈，如果遇到一个点 `.` 或者空格的时候，就什么都不做。如果遇到两个点 `..` ，就将栈顶元素从栈中弹出。

在这里要特别注意一点，我们看一眼题目中给出的示例 5：`"/a/../../b/../c//.//"`，先读到目录 `a`，然后做了两次回退操作，第 1 次回退的时候，就退到了根目录，事实上已经不能再回退了，此时 `..` 这个操作无效。

在编码的时候，一定要注意：只有在栈顶元素非空的时候，我们才能进行弹栈的操作。

Java 代码：

```java
import java.util.Stack;

public class Solution {

    public String simplifyPath(String path) {
        String[] dirs = path.split("/");
        if (dirs.length == 0) {
            return "/";
        }

        Stack<String> stack = new Stack<>();
        for (String dir : dirs) {
            if ("".equals(dir) || ".".equals(dir)) {
                continue;
            }

            if ("..".equals(dir)) {
                if (!stack.empty()) {
                    stack.pop();
                }
                continue;
            }

            stack.push(dir);
        }

        StringBuilder stringBuilder = new StringBuilder();
        if (stack.empty()) {
            stringBuilder.insert(0, "/");
        }

        while (!stack.empty()) {
            stringBuilder.insert(0, stack.pop());
            stringBuilder.insert(0, "/");
        }
        return stringBuilder.toString();
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是数组的长度，最坏情况下，每个字符串进栈一次，出栈一次，表示操作的字符串还不用进栈出栈，因此时间复杂度是线性的。
+ 空间复杂度：$O(N)$ ，最坏情况下，这个路径字符串本身就是化简过的，栈中就要存字符串长度这么多的字符串（近似，不包括那些斜杠）。







![image-20191213103833899](/Users/liwei/Library/Application Support/typora-user-images/image-20191213103833899.png)



>1、其实没有想象中那么难，完全可以独立完成，关键是很多情况要考虑到；
>
>2、但是代码写成这样，这么多 `if` 也是觉得看着很不舒服；
>
>3、出栈之前一定要判断一下当前的栈是不是空，否则会抛 `java.util.EmptyStackException`。

Java 代码：

```java
import java.util.Stack;

public class Solution {

    public String simplifyPath(String path) {
        String[] paths = path.split("/");
        Stack<String> stack = new Stack<>();
        for (String p : paths) {
            if (!stack.isEmpty() && "..".equals(p)) {
                stack.pop();
            }
            if (!"".equals(p) && !".".equals(p) && !"..".equals(p)) {
                stack.push(p);
            }
        }
        // 输出路径字符串
        StringBuilder s = new StringBuilder();
        if (stack.isEmpty()) {
            return "/";
        }
        while (!stack.empty()) {
            s.insert(0, "/" + stack.pop());
        }
        return s.toString();
    }

    public static void main(String[] args) {
        // String s = "/a/.////b/../../c/";
        String s = "/../";
        String simplifyPath = new Solution().simplifyPath(s);
        System.out.println(simplifyPath);
    }
}
```





 



Java 代码实现：

```java
public class Solution {

    public String simplifyPath(String path) {
        String result = "";
        String[] pathList = path.split("/");
        if (pathList.length == 0) {
            return "/";
        }

        Stack<String> stack = new Stack<>();
        for (String p : pathList) {
            if ("".equals(p) || ".".equals(p)) {
                continue;
            }
            if ("..".equals(p)) {
                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else { // 是正常的路径字符串的时候，入栈
                stack.push(p);
            }
        }


        // 现在考虑输出字符串
        while (!stack.isEmpty()) {
            result = "/" + stack.pop() + result;
        }
        if ("".equals(result)) {
            result = "/";
        }
        return result;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        String path1 = "/home/";
        String result1 = solution.simplifyPath(path1);
        System.out.println(result1);


        String path2 = "/a/./b/../../c/";
        String result2 = solution.simplifyPath(path2);
        System.out.println(result2);


        String path3 = "/..";
        String result3 = solution.simplifyPath(path3);
        System.out.println(result3);

        String path4 = "/..";
        String result4 = solution.simplifyPath(path4);
        System.out.println(result4);

        String path5 = "/abc/def/.";
        String result5 = solution.simplifyPath(path5);
        System.out.println(result5);
    }
}
```

---

### LeetCode 第 71 题：Simplify Path

传送门：https://leetcode.com/problems/simplify-path/description/。

第 2 种情况下，要求我们的程序能够有一定的容错处理的能力。



我的解答参考了如下的文章：
http://blog.csdn.net/u012249528/article/details/46705867

Java 代码实现：

```java
public class Solution {

    public String simplifyPath(String path) {
        String result = "";
        String[] pathList = path.split("/");
        if (pathList.length == 0) {
            return "/";
        }

        Stack<String> stack = new Stack<>();
        for (String p : pathList) {
            if ("".equals(p) || ".".equals(p)) {
                continue;
            }
            if ("..".equals(p)) {
                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else { // 是正常的路径字符串的时候，入栈
                stack.push(p);
            }
        }


        // 现在考虑输出字符串
        while (!stack.isEmpty()) {
            result = "/" + stack.pop() + result;
        }
        if ("".equals(result)) {
            result = "/";
        }
        return result;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        String path1 = "/home/";
        String result1 = solution.simplifyPath(path1);
        System.out.println(result1);


        String path2 = "/a/./b/../../c/";
        String result2 = solution.simplifyPath(path2);
        System.out.println(result2);


        String path3 = "/..";
        String result3 = solution.simplifyPath(path3);
        System.out.println(result3);

        String path4 = "/..";
        String result4 = solution.simplifyPath(path4);
        System.out.println(result4);

        String path5 = "/abc/def/.";
        String result5 = solution.simplifyPath(path5);
        System.out.println(result5);
    }
}
```

