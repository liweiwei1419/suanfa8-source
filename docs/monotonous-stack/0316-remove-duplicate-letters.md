---
title: 「力扣」第 316 题：去除重复字母（中等）
icon: shipin
categories: 栈
tags:
  - 栈
---

![0316](https://tva1.sinaimg.cn/large/008i3skNgy1gx91kwzpu1j30p00anwex.jpg)

---


可以观看 [视频题解](https://leetcode-cn.com/problems/remove-duplicate-letters/solution/qu-chu-zhong-fu-zi-mu-by-leetcode-soluti-vuso/)。：

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

（反证）如果接下来还会遍历到 `d` 那么按照之前设计的算法逻辑，我们会丢弃第 1 个 `d` 而让 `b` 靠前，这样得到的字典序的子段 `bd` 更小。

再接着例 2 的第 ⑧ 步说，既然已经出现在栈中的元素，不可能是 **某个单调递增段的最后一个元素**，因此如果丢弃之前遇到的那个相同字符，它紧挨着的下一个字符的 ASCII 值更大。ASCII 值更大的字符靠前一位，整体字典序更大。因此应该丢弃当前遇到的相同字符。




**参考代码 1**：

**说明**：

```Java []
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

```Java []
while (!stack.empty() && stack.peek() > currentChar && lastAppearIndex[stack.peek() - 'a'] >= i) {
    char top = stack.pop();
    set[top - 'a'] = false;
}
```

里面的判断语句每一次都得判断栈是否为空。这里使用一个哨兵的技巧，一开始就在栈里放一个最小的字符 `a`。因为后面的语句判断的是 `stack.peek() > currentChar` 这里是严格符号，因此这个 `a` 一定不会被弹出。

**参考代码 2**：

```Java []
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



## 

我写的题解地址：

> 给定一个仅包含小写字母的字符串，去除字符串中重复的字母，使得每个字母只出现一次。需保证返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
>
> 示例 1:
>
> ```
> 输入: "bcabc"
> 输出: "abc"
> ```
>
>
> 示例 2:
>
> ```
> 输入: "cbacdcbc"
> 输出: "acdb"
> ```
>
> 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicate-letters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

同「力扣」第 1081 题：[1081. 不同字符的最小子序列](https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters/)。

### 方法：使用栈

> 1、栈里永远存放的是目前看到的字典序最小的子序列；
>
> 2、什么时候栈顶出栈？（1）非空；（2）字典序：栈顶 > 新来的字符；（3）栈顶元素在以后还会看到。
>
> 此时，可以得到一个字典序更小的子序列。
>
> 3、如果新来的字符，栈里没有，并且以后也不会看到，就必须添加；
>
> 如果新来的字符，栈里有，就不用管了，因为如果抛弃了栈里的，得到的字典序更大。

![image-20191207212106043](/Users/liwei/Library/Application Support/typora-user-images/image-20191207212106043.png)

Java 代码：

```java
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.Stack;

public class Solution {

    public String removeDuplicateLetters(String s) {
        int len = s.length();
        // 预处理，我把一个字符出现的最后一个位置记录下来
        Map<Character, Integer> map = new HashMap<>();
        for (int i = 0; i < len; i++) {
            map.put(s.charAt(i), i);
        }

        // 保存已经出现过的
        Set<Character> set = new HashSet<>();
        Stack<Character> stack = new Stack<>();

        for (int i = 0; i < len; i++) {

            Character curChar = s.charAt(i);
            if (set.contains(curChar)) {
                continue;
            }

            // 注意：这里条件判断语句很长，map.get(stack.peek()) 不要写成了 map.get(curChar)
            while (!stack.isEmpty() && map.get(stack.peek()) > i && curChar < stack.peek()) {
                // 出栈的同时，也要从哈希表中移除
                set.remove(stack.pop());
            }

            stack.push(curChar);
            set.add(curChar);
        }

        StringBuilder stringBuilder = new StringBuilder();
        while (!stack.isEmpty()) {
            stringBuilder.insert(0, stack.pop());
        }

        return stringBuilder.toString();
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String res = solution.removeDuplicateLetters("cbacdcbc");
        System.out.println(res);
    }
}
```





## 参考资料

1、https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters/solution/mei-you-qi-ji-yin-qiao-zhi-you-chun-cui-de-tan-xin/



Java 代码：

```java
import java.util.Stack;

public class Solution {

    // 贪心算法

    public String removeDuplicateLetters(String s) {
        // 计算 26 字母数量
        int[] charsCount = new int[26];
        // 标记字母是否已经入栈
        boolean[] visited = new boolean[26];
        int len = s.length();
        char[] sChars = s.toCharArray();
        for (char c : sChars) {
            charsCount[c - 'a']++;
        }
        Stack<Character> stack = new Stack<>();
        // 最终字符的长度
        int index = 0;
        for (int count : charsCount) {
            if (count > 0) {
                index++;
            }
        }

        char[] res = new char[index];
        // len 是字符串的长度
        for (int i = 0; i < len; i++) {
            char c = s.charAt(i);
            // 有小字符的且满足其前面的字符在小字符后还有同样字符的，则出栈
            while (!stack.isEmpty() && c < stack.peek() && charsCount[stack.peek() - 'a'] > 1 && !visited[c - 'a']) {
                Character pop = stack.pop();
                visited[pop - 'a'] = false;
                charsCount[pop - 'a']--;
            }
            if (visited[c - 'a']) {
                //重复的字符根据游标往后移动，数量减一
                charsCount[c - 'a']--;
                continue;
            }
            stack.push(c);
            visited[c - 'a'] = true;
        }

        while (!stack.isEmpty()) {
            res[--index] = stack.pop();
        }
        return String.valueOf(res);
    }
}
```

Java 代码：

```java
import java.util.Stack;

public class Solution {

    public String removeDuplicateLetters(String s) {
        int len = s.length();
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < len; i++) {
            if (stack.contains(s.charAt(i))) {
                continue;
            }
            while (!stack.isEmpty() && s.charAt(i) < stack.peek() && s.indexOf(stack.peek(), i) != -1) {
                stack.pop();
            }
            stack.add(s.charAt(i));
        }

        StringBuilder sb = new StringBuilder();
        for (Character c : stack) {
            sb.append(c);
        }
        return sb.toString();
    }
}

```



# LeetCode 第 316 题：去除重复字母（困难）

传送门：[LeetCode 第 316 题：去除重复字母](https://leetcode-cn.com/problems/remove-duplicate-letters/)。

同  [LeetCode 第 1081 题：不同字符的最小子序列](https://leetcode-cn.com/problems/smallest-subsequence-of-distinct-characters/)。

> 给定一个仅包含小写字母的字符串，去除字符串中重复的字母，使得每个字母只出现一次。需保证返回结果的字典序最小（要求不能打乱其他字符的相对位置）。

示例 1:

```
输入: "bcabc"
输出: "abc"
```


示例 2:

```
输入: "cbacdcbc"
输出: "acdb"
```

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicate-letters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。





**思路分析：**

首先解释一下字典序是什么。

**字典序**

字典序是指从前到后比较两个字符串大小的方法。

+ 首先比较第 1 个字符，如果不同则第 1 个字符较小的字符串更小；
+ 如果相同则继续比较第 2 个字符 …… 如此继续，比较整个字符串的大小。

整理题目要求：

1、去除字符串中重复的字母，使得每个字母只出现一次；

2、保证返回结果的字典序最小；

3、不能打乱其他字符的相对位置。


观察示例 1：`bcabc`。

+ 如果某个字符在字符串中只出现一次，那么这个字符串必须被选取，这里 `a` 必须被选取；
+ 字符 `b` 出现了两次，显然选择 `a`后面的那个，因为字典序 `ab` 在 `ba` 前面。同理，有两个相同的字符 `c` ，我们选择后一个。因此，输出就是 `abc`。


再观察示例 2：`cbacdcbc`。

+ 有 4 个字符：`a`、`b`、`c`、`d`。其中 `a` 和 `d` 只出现一次，必须被选取；
+ `b` 出现 2 次，一个在 `a` 前面，一个在 `a` 后面，显然保留在 `a` 后面的；
+ `c` 出现 4 次，我们把几种可能都列出来一下：

情况 1：`cadb`
情况 2：`acdb`（字典序最小）
情况 3：`adcb`
情况 4：`adbc`

一种最理想的情况是：`abcd`，在遍历的时候，遇到的字符串的 ASCII 值逐渐增大。下面我们就思考，当遍历到的字符的 ASCII 值减少的时候，应该如何处理。

还看示例 1：已经遍历读到了 `bc`，即将读到的 `a` 比 `c` 的ASCII 值小。这时候看字符 `c` 在后面还会不会出现，`c` 会出现，那么 `a` 之前的 `c` 我们舍弃。同理，我们舍弃之前的 `b`，因为 `b` 在将来还会出现，构成的字典序更小。

到此为止，应该想到我们需要借助栈帮助我们完成这题。


然后，根据这个思路，走一下示例 2：`cbacdcbc`。

第 1 步：读到 `c`，入栈，此时栈中元素 `[c]`；

第 2 步：读到 `b`，`b` 比之前 `a` 小，`c` 在以后还会出现，因此 `c` 出栈，`b` 入栈，此时栈中元素 `[b]`；

第 3 步：读到 `a`，`a` 比之前 `b` 小，`b` 在以后还会出现，因此 `b` 出栈，`a` 入栈，此时栈中元素 `[a]`；

第 4 步：读到 `c`，`c` 比之前 `a` 大，直接让 `c` 入栈，此时栈中元素 `[a, c]`；

第 5 步：读到 `d`，`d` 比之前 `d` 大，直接让 `d` 入栈，此时栈中元素 `[a, c, d]`；

第 6 步：读到 `c`，这里要注意：**此时栈中已经有 `c` 了，此时栈中元素构成的字符顺序就是最小的字典序，不可能舍弃之前的 c，而用现在的读到的 `c`**，因此这个 `c` 不需要，直接跳过；

第 7 步：读到 `b`，`b` 比之前的 `c` 小，但是，后面不会再出现 `b` 了，因此 `b` 就应该放在这个位置，因此让 `b` 入栈，此时栈中元素 `[a, c, d, b]`；

第 8 步：读到 `c`，同第 6 步，这个 `c` 我们不需要。

于是，我们可以设计如下算法：


> 1、遍历字符串里的字符，如果读到的字符的 ASCII 值是升序，依次存到一个栈中；
> 2、如果读到的字符在栈中已经存在，这个字符我们不需要；
> 3、如果读到的 ASCII 值比栈顶元素严格小，看看栈顶元素在后面是否还会出现，如果还会出现，则舍弃栈顶元素，而选择后出现的那个字符，这样得到的字典序更小。

因为需要判断读到的字符在栈中是否已经存在，因此可以使用哈希表，又因为题目中说，字符只会出现小写字母，用一个布尔数组也是可以的，注意在出栈入栈的时候，需要同步更新一下这个布尔数组。
又因为要判断栈顶元素在后面是否会被遍历到，因此我们需要先遍历一次字符，存一下这个字符最后出现的位置，就能判断栈顶元素在后面是否会被遍历到。

**参考代码 1**：

```Java []
import java.util.Stack;

public class Solution {

    public String removeDuplicateLetters(String s) {
        int len = s.length();
        // 特判
        if (len < 2) {
            return s;
        }

        // 记录是否在已经得到的字符串中
        boolean[] set = new boolean[26];

        // 记录每个字符出现的最后一个位置
        int[] indexes = new int[26];
        for (int i = 0; i < len; i++) {
            indexes[s.charAt(i) - 'a'] = i;
        }

        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < len; i++) {
            char currentChar = s.charAt(i);
            if (set[currentChar - 'a']) {
                continue;
            }

            while (!stack.empty() && stack.peek() > currentChar && indexes[stack.peek() - 'a'] >= i) {
                char top = stack.pop();
                set[top - 'a'] = false;
            }

            stack.push(currentChar);
            set[currentChar - 'a'] = true;
        }

        StringBuilder stringBuilder = new StringBuilder();
        while (!stack.empty()) {
            stringBuilder.insert(0, stack.pop());
        }
        return stringBuilder.toString();
    }
}
```

```Python []

```









Java 代码：

```Java
import java.util.Stack;

/**
 * @author liwei
 * @date 2019/6/27 10:26 AM
 */
public class Solution2 {

    public String removeDuplicateLetters(String s) {
        int len = s.length();
        Stack<Character> stack = new Stack<>();
        for (int i = 0; i < len; i++) {
            if (stack.contains(s.charAt(i))) {
                continue;
            }
            while (!stack.isEmpty() && s.charAt(i) < stack.peek() && s.indexOf(stack.peek(), i) != -1) {
                stack.pop();
            }
            stack.add(s.charAt(i));
        }

        StringBuilder sb = new StringBuilder();
        for (Character c : stack) {
            sb.append(c);
        }
        return sb.toString();
    }
}
```

Java 代码：

```java
import java.util.Stack;

public class Solution {

    // 贪心算法

    public String removeDuplicateLetters(String s) {
        // 计算 26 字母数量
        int[] charsCount = new int[26];
        // 标记字母是否已经入栈
        boolean[] visited = new boolean[26];
        int len = s.length();
        char[] sChars = s.toCharArray();
        for (char c : sChars) {
            charsCount[c - 'a']++;
        }
        Stack<Character> stack = new Stack<>();
        // 最终字符的长度
        int index = 0;
        for (int count : charsCount) {
            if (count > 0) {
                index++;
            }
        }

        char[] res = new char[index];
        // len 是字符串的长度
        for (int i = 0; i < len; i++) {
            char c = s.charAt(i);
            // 有小字符的且满足其前面的字符在小字符后还有同样字符的，则出栈
            while (!stack.isEmpty() && c < stack.peek() && charsCount[stack.peek() - 'a'] > 1 && !visited[c - 'a']) {
                Character pop = stack.pop();
                visited[pop - 'a'] = false;
                charsCount[pop - 'a']--;
            }
            if (visited[c - 'a']) {
                //重复的字符根据游标往后移动，数量减一
                charsCount[c - 'a']--;
                continue;
            }
            stack.push(c);
            visited[c - 'a'] = true;
        }

        while (!stack.isEmpty()) {
            res[--index] = stack.pop();
        }
        return String.valueOf(res);
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String res =solution.removeDuplicateLetters("bcabc");
        System.out.println(res);
    }
}
```

Python 代码：

```python
class Solution:
    def removeDuplicateLetters(self, s: str) -> str:
        size = len(s)
        stack = []

        for i in range(size):
            if stack.count(s[i]) > 0:
                continue
            while stack and ord(s[i]) < ord(stack[-1]) \
                    and s.find(stack[-1], i) != -1:
                stack.pop()

            

            stack.append(s[i])
        return ''.join(stack)
```





---



