---
title: 「力扣」第 316 题：去除重复字母（中等）
icon: shipin
category: 栈
tags:
  - 栈
---

![0316](https://tva1.sinaimg.cn/large/008i3skNgy1gx91kwzpu1j30p00anwex.jpg)


可以观看 [视频题解](https://leetcode-cn.com/problems/remove-duplicate-letters/solution/qu-chu-zhong-fu-zi-mu-by-leetcode-soluti-vuso/)：

视频讲解勘误：

+ 02:00 正确应为：`c` 出现了 $3$ 次；
+ 09:30 正确应为：记录每一个字符最后一次出现的下标，可以使用整形数组或者哈希表。

---

+ 题目链接：[316. 去除重复字母](https://leetcode-cn.com/problems/remove-duplicate-letters/)；
+ 题解链接：[栈 + 哨兵技巧（Java）](https://leetcode-cn.com/problems/remove-duplicate-letters/solution/zhan-by-liweiwei1419/)。


## 题目描述

给你一个字符串 `s` ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 **返回结果的字典序最小**（要求不能打乱其他字符的相对位置）。

**注意：**该题与 1081 https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters 相同

**示例 1：**

```
输入：s = "bcabc"
输出："abc"
```

**示例 2：**

```
输入：s = "cbacdcbc"
输出："acdb"
```

**提示：**

- `1 <= s.length <= 104`
- `s` 由小写英文字母组成

## 思路分析

::: danger 一句话题解

分析出解决这个问题需要 **后进先出** 的 **线性** 数据结构，因此使用 **栈**。
:::


**字典序**：字典序是 **按照单词出现在字典中的顺序** 比较两个字符串的方法。
首先比较第 1 个字符的 ASCII 码：

  + 如果不同，则第 1 个字符 ASCII 码较小的字符，整体字典序更靠前；
  + 如果相同，则继续比较第 2 个字符，…… 
    如此继续，比较整个字符串的大小。

---

**分析示例**：观察示例 1：`bcabc`。

+ 字符 `a` 在字符串中只出现一次，根据题目要求，字符 `a` 必须被选取；
+ 字符 `b` 出现了两次，显然选择 `a`后面的那个 `b`。因为 **字典序 `ab` 靠前，`ba` 靠后**。同理，相同的字符 `c` ，我们选择后一个 `c`。因此，输出是 `abc`。

选出 `abc` 可以从左到右遍历一次字符串：

第 ① 步：看到 `b`，只有一个字符，暂时保存起来；
第 ② 步：看到 `c`，`bc` 是单调递增的，已经是字典序最小的，暂时保存起来；
第 ③ 步：看到 `a`，`a` 的字典序比之前看到的 `b` 和 `c` 都靠前，因此应该 **想办法让 `a` 的位置往前靠，ASCII 值越小的字母越靠前，整体字符串的字典序就更靠前**，这件事情等价于，先看看最近看到的 `c` 以后会不会出现，`c` 以后还会出现，因此可以舍弃 `c` ，再看看最早看到的 `b` 在以后会不会出现，`b` 以后还会出现，因此可以舍弃 `b`，此时 `a` 前面没有读到的字典了。**`b` 比 `c` 先读到，而比 `c` 后丢弃**，因此解决这个问题可以使用 「后进先出」的数据结构：栈。 

---

## 方法：栈


再观察示例 2：`cbacdcbc`。

+ 一共出现 $4$ 种字符：`a`、`b`、`c`、`d`。其中 **`a` 和 `d` 只出现一次，必须被选取**；
+ `b` 出现 $2$ 次，一个在 `a` 前面，一个在 `a` 后面，显然保留在 `a` 后面的；
+ `c` 出现 $4$ 次。

下面的示意图展示了程序的执行流程，请大家注意第 ⑥ 步和第 ⑧ 步的分析。

![image.png](https://pic.leetcode-cn.com/1603768499-DmVdis-image.png)

+ 第 ① 步：读到 `c`，入栈，此时栈中元素 `[c]`；
+ 第 ② 步：读到 `b`，`b` 的字典序比之前的 `c` 小，`c` 在以后还会出现，因此 `c` 出栈，`b` 入栈，此时栈中元素 `[b]`；
+ 第 ③ 步：读到 `a`，`a` 的字典序比之前的 `b` 小，`b` 在以后还会出现，因此 `b` 出栈，`a` 入栈，此时栈中元素 `[a]`；
+ 第 ④ 步：读到 `c`，`c` 的字典序比之前的 `a` 大，直接让 `c` 入栈，此时栈中元素 `[a, c]`；
+ 第 ⑤ 步：读到 `d`，`d` 的字典序比之前的 `d` 大，直接让 `d` 入栈，此时栈中元素 `[a, c, d]`；
+ 第 ⑥ 步：读到 `c`，此时栈中已经有 `c`，题目要求不能有重复字符，所以舍弃当前看到的 `c` ，**注意**：如果当前遍历到栈中已经有的字符，可以舍弃当前遍历到的重复字符。原因放在第 ⑧ 步说；
+ 第 ⑦ 步：读到 `b`，`b` 的字典序比之前的 `d` 小，但是后面不会再出现 `d` ，因此 `b` 就应该放在这个位置，因此让 `b` 入栈，此时栈中元素 `[a, c, d, b]`；
+ 第 ⑧ 步：读到 `c`，下面我们证明：如果遍历到当前栈中已经有的字符，可以舍弃当前遍历到的字符。

### 如果遍历到当前栈中已经有的字符，可以舍弃当前遍历到的字符

在例 2 分析的第 ⑧ 步，此时栈中元素为 `[a, c, d, b]`，可以看成两个部分，第一个部分是 `[a, c, d]` ，第二个部分是 `[b]`，这两个部分分别是按照字典序升序排列的。

之所以会造成 **分段单调递增** 的现象，是因为 **某个单调递增段的最后一个元素，在以后不会再遍历到**，而题目又要求我们保持选取字母的相对顺序，因此 **某个单调递增段的最后一个元素** 必需被放置在现在放置的位置。

**反证**：如果接下来还会遍历到 `d` 那么按照之前设计的算法逻辑，我们会丢弃第 1 个 `d` 而让 `b` 靠前，这样得到的字典序的子段 `bd` 更小。

再接着例 2 的第 ⑧ 步说，既然已经出现在栈中的元素，不可能是 **某个单调递增段的最后一个元素**，因此如果丢弃之前遇到的那个相同字符，它紧挨着的下一个字符的 ASCII 值更大。ASCII 值更大的字符靠前一位，整体字典序更大。因此应该丢弃当前遇到的相同字符。


**参考代码 1**：

**说明**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public String removeDuplicateLetters(String s) {
        int len = s.length();
        if (len < 2) {
            return s;
        }

        // 转成字符数组是因为，s.charAt(i) 会检查字符串的下标是否越界，事实上没有必要
        // 遍历字符串之前，先转换成字符数组是常见的做饭
        char[] charArray = s.toCharArray();

        // 第 1 步：记录每个字符出现的最后一个位置
        int[] lastIndex = new int[26];
        for (int i = 0; i < len; i++) {
            lastIndex[charArray[i] - 'a'] = i;
        }

        // 第 2 步：使用栈得到题目要求字典序最小的字符串
        Deque<Character> stack = new ArrayDeque<>(len);
        // 栈中有的字符记录在这里
        boolean[] visited = new boolean[26];
        for (int i = 0; i < len; i++) {
            char currentChar = charArray[i];
            if (visited[currentChar - 'a']) {
                continue;
            }

            while (!stack.isEmpty() && currentChar < stack.peekLast() && lastIndex[stack.peekLast() - 'a'] > i) {
                char top = stack.removeLast();
                // 在出栈、入栈的时候，都需要维护 visited 数组的定义
                visited[top - 'a'] = false;
            }

            stack.addLast(currentChar);
            visited[currentChar - 'a'] = true;
        }

        // 第 3 步：此时 stack 就是题目要求字典序最小的字符串
        StringBuilder stringBuilder = new StringBuilder();
        for (char c : stack) {
            stringBuilder.append(c);
        }
        return stringBuilder.toString();
    }
}
```

**说明**：

+ 为了突出使用栈作为数据结构，使用了 `Deque` 的实现类 `ArrayDeque`，这是 Java 官方推荐的做法。事实上，这个栈里存的是字符，因此可以直接使用 `StringBuilder`，这样最后就不用最好把栈里的元素依次弹出。之所以没有这么做，是因为栈的 `pop()` 、`peek()`、`push()` 的功能体现不出来。

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是字符的长度；
+ 空间复杂度：$O(N)$ ，最坏情况下，这个字符串本身就是字典序最小的字符串，栈中就要存字符串长度这么多的字符串。

### 方法二：栈 + 哨兵


这里注意到

```java
while (!stack.empty() && stack.peek() > currentChar && lastAppearIndex[stack.peek() - 'a'] >= i) {
    char top = stack.pop();
    set[top - 'a'] = false;
}
```

里面的判断语句每一次都得判断栈是否为空。这里使用一个哨兵的技巧，一开始就在栈里放一个最小的字符 `a`。因为后面的语句判断的是 `stack.peek() > currentChar` 这里是严格符号，因此这个 `a` 一定不会被弹出。

**参考代码 2**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public String removeDuplicateLetters(String s) {
        int len = s.length();
        if (len < 2) {
            return s;
        }

        char[] charArray = s.toCharArray();
        // 记录每个字符出现的最后一个位置
        int[] lastIndex = new int[26];
        for (int i = 0; i < len; i++) {
            lastIndex[charArray[i] - 'a'] = i;
        }

        Deque<Character> stack = new ArrayDeque<>(len);
        stack.addLast('a');
        // 栈中有的字符记录在这里
        boolean[] visited = new boolean[26];
        for (int i = 0; i < len; i++) {
            char currentChar = charArray[i];
            // 如果栈中已经存在，就跳过
            if (visited[currentChar - 'a']) {
                continue;
            }

            // 在 ① 栈非空，② 当前元素字典序 < 栈顶元素，并且 ③ 栈顶元素在以后还会出现，弹出栈元素
            while (currentChar < stack.peekLast() && lastIndex[stack.peekLast() - 'a'] > i) {
                char top = stack.removeLast();
                visited[top - 'a'] = false;
            }

            stack.addLast(currentChar);
            visited[currentChar - 'a'] = true;
        }

        StringBuilder stringBuilder = new StringBuilder();
        int size = stack.size();
        for (int i = 0; i < size -1 ; i++) {
            stringBuilder.insert(0, stack.removeLast());
        }
        return stringBuilder.toString();
    }
}
```

**复杂度分析**：（同上）

---

## 练习


+ 「力扣」第 20 题：[有效的括号](https://leetcode-cn.com/problems/valid-parentheses)（简单）
+ 「力扣」第 71 题：[简化路径](https://leetcode-cn.com/problems/simplify-path)（中等）
+ 「力扣」第 150 题：[逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation)（中等）
+ 「力扣」第 32 题：[最长有效括号](https://leetcode-cn.com/problems/longest-valid-parentheses)（困难）

---

+ 「力扣」第 739 题：[每日温度](https://leetcode-cn.com/problems/daily-temperatures)（中等）
+ 「力扣」第 496 题：[下一个更大元素 I](https://leetcode-cn.com/problems/next-greater-element-i)（简单）
+ 「力扣」第 84 题：[柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram)（困难）
+ 「力扣」第 42 题：[接雨水](https://leetcode-cn.com/problems/trapping-rain-water)（困难）
+ 「力扣」第 901 题：[股票价格跨度](https://leetcode-cn.com/problems/online-stock-span)（中等）
+ 「力扣」第 581 题：[最短无序连续子数组](https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray)（中等）
+ 「力扣」第 402 题：[移掉K位数字](https://leetcode-cn.com/problems/remove-k-digits)（中等）
+ 「力扣」第 321 题：[拼接最大数](https://leetcode-cn.com/problems/create-maximum-number)（困难）
+ 「力扣」第 1673 题：[找出最具竞争力的子序列](https://leetcode-cn.com/problems/find-the-most-competitive-subsequence)（中等）


---



