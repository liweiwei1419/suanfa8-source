---
title: 「力扣」第 131 题：分割回文串（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
---

- 题目链接：[131. 分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)；
- 题解链接：[回溯算法、优化（使用动态规划预处理数组）](https://leetcode-cn.com/problems/palindrome-partitioning/solution/hui-su-you-hua-jia-liao-dong-tai-gui-hua-by-liweiw/)。

## 题目描述

给你一个字符串 `s`，请你将 `s` 分割成一些子串，使每个子串都是 **回文串** 。返回 `s` 所有可能的分割方案。

**回文串** 是正着读和反着读都一样的字符串。

**示例 1：**

```
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
```

**示例 2：**

```
输入：s = "a"
输出：[["a"]]
```

**提示：**

- `1 <= s.length <= 16`
- `s` 仅由小写英文字母组成

## 思路分析

找到所有可能的解，提示我们可以使用「回溯算法」（采用深度优先遍历的方式遍历一棵隐式树结构）。

对回溯算法还不太熟悉的朋友，可以参考：[回溯算法入门级详解 + 练习（持续更新）](https://leetcode-cn.com/problems/permutations/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liweiw/)。

### 方法一：回溯算法

回溯算法思考的步骤：

1. 画出树型结构，**本题的递归树模型是一棵多叉树**；

> 友情提示：强烈建议大家根据一个具体例子画出树形图。

![image.png](https://pic.leetcode-cn.com/298a80282ac3505fec3710abdc1e656c591cf7acaa3ba976151480729244b649-image.png){:width=500}

2. 编码。

- 每一个结点表示剩余没有扫描到的字符串，产生分支是截取了剩余字符串的前缀；
- 产生前缀字符串的时候，判断前缀字符串是否是回文。
  - 如果前缀字符串是回文，则可以产生分支和结点；
  - 如果前缀字符串不是回文，则不产生分支和结点，这一步是剪枝操作。
- 在叶子结点是空字符串的时候结算，此时 **从根结点到叶子结点的路径，就是结果集里的一个结果，使用深度优先遍历，记录下所有可能的结果**。
- 使用一个路径变量 `path` 搜索，`path` 全局使用一个（注意结算的时候，要生成一个拷贝），因此在递归执行方法结束以后需要回溯，即将递归之前添加进来的元素拿出去；
- `path` 的操作只在列表的末端，因此合适的数据结构是栈。

**参考代码 1**：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<String>> partition(String s) {
        int len = s.length();
        List<List<String>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        // Stack 这个类 Java 的文档里推荐写成 Deque<Integer> stack = new ArrayDeque<Integer>();
        // 注意：只使用 stack 相关的接口
        Deque<String> stack = new ArrayDeque<>();
        char[] charArray = s.toCharArray();
        dfs(charArray, 0, len, stack, res);
        return res;
    }

    /**
     * @param charArray
     * @param index     起始字符的索引
     * @param len       字符串 s 的长度，可以设置为全局变量
     * @param path      记录从根结点到叶子结点的路径
     * @param res       记录所有的结果
     */
    private void dfs(char[] charArray, int index, int len, Deque<String> path, List<List<String>> res) {
        if (index == len) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = index; i < len; i++) {
            // 因为截取字符串是消耗性能的，因此，采用传子串下标的方式判断一个子串是否是回文子串
            if (!checkPalindrome(charArray, index, i)) {
                continue;
            }
            path.addLast(new String(charArray, index, i + 1 - index));
            dfs(charArray, i + 1, len, path, res);
            path.removeLast();
        }
    }

    /**
     * 这一步的时间复杂度是 O(N)，优化的解法是，先采用动态规划，把回文子串的结果记录在一个表格里
     *
     * @param charArray
     * @param left      子串的左边界，可以取到
     * @param right     子串的右边界，可以取到
     * @return
     */
    private boolean checkPalindrome(char[] charArray, int left, int right) {
        while (left < right) {
            if (charArray[left] != charArray[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N \cdot  2^N)$；这里 $N$ 为输入字符串的长度，每一个位置可拆分，也可不拆分，尝试是否可以拆分的时间复杂度为 $O(2^N)$，判断每一个子串是否是回文子串，时间复杂度为 $O(N)$；
- 空间复杂度：
  - 如果不计算保存结果的空间，空间复杂度为$O(N)$，递归调用栈的高度为 $N$；
  - 如果计算保存答案需要空间 $2^N \times N$，这里 $2^N$ 为保守估计，实际情况不会这么多。空间复杂度为 $O(2^N \times N)$。

验证回文串的时候，每一次都得使用「双指针」的方式验证子串是否是回文子串。利用「力扣」第 5 题：[最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring) 的思路，可以先用动态规划把结果算出来，这样就可以以 $O(1)$ 的时间复杂度直接得到一个子串是否是回文。

---

### 方法二：回溯的优化（使用动态规划得到所有子串是否是回文）

**参考代码 2**：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<String>> partition(String s) {
        int len = s.length();
        List<List<String>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        char[] charArray = s.toCharArray();
        // 预处理
        // 状态：dp[i][j] 表示 s[i][j] 是否是回文
        boolean[][] dp = new boolean[len][len];
        // 状态转移方程：在 s[i] == s[j] 的时候，dp[i][j] 参考 dp[i + 1][j - 1]
        for (int right = 0; right < len; right++) {
            // 注意：left <= right 取等号表示 1 个字符的时候也需要判断
            for (int left = 0; left <= right; left++) {
                if (charArray[left] == charArray[right] && (right - left <= 2 || dp[left + 1][right - 1])) {
                    dp[left][right] = true;
                }
            }
        }

        Deque<String> stack = new ArrayDeque<>();
        dfs(s, 0, len, dp, stack, res);
        return res;
    }

    private void dfs(String s, int index, int len, boolean[][] dp, Deque<String> path, List<List<String>> res) {
        if (index == len) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = index; i < len; i++) {
            if (dp[index][i]) {
                path.addLast(s.substring(index, i + 1));
                dfs(s, i + 1, len, dp, path, res);
                path.removeLast();
            }
        }
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(2^N)$；这里 $N$ 为输入字符串的长度，每一个位置可拆分，也可不拆分，尝试是否可以拆分的时间复杂度为 $O(2^N)$，动态规划得到所有子串是否为回文子串的时间复杂度为 $O(N^2)$，所以总的时间复杂度为 $O(N^2 + 2^N) = O(2^N)$；
- 空间复杂度：
  - 如果不计算保存结果的空间，动态规划表格的大小为 $N^2$，递归调用栈的高度为 $N$，空间复杂度为 $O(N^2 + N) = O(N)$。
  - 如果计算保存答案需要空间 $2^N \times N$，这里 $2^N$ 为保守估计，实际情况不会这么多。空间复杂度为 $O(2^N \times N + N^2 + N) = O(2^N \times N)$。

**补充**：

事实上，还可以使用中心扩散的方法得到所有子串是否是回文，可以参考 [评论](https://leetcode-cn.com/problems/palindrome-partitioning/solution/hui-su-you-hua-jia-liao-dong-tai-gui-hua-by-liweiw/249294)。
