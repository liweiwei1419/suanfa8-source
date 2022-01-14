---
title: 「力扣」第 1593 题：拆分字符串使唯一子字符串的数目最大（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
---

- 题目链接：[1593. 拆分字符串使唯一子字符串的数目最大](https://leetcode-cn.com/problems/split-a-string-into-the-max-number-of-unique-substrings/)。

## 题目描述

给你一个字符串 `s` ，请你拆分该字符串，并返回拆分后唯一子字符串的最大数目。

字符串 `s` 拆分后可以得到若干 **非空子字符串** ，这些子字符串连接后应当能够还原为原字符串。但是拆分出来的每个子字符串都必须是 **唯一的** 。

注意：**子字符串** 是字符串中的一个连续字符序列。

**示例 1：**

```
输入：s = "ababccc"
输出：5
解释：一种最大拆分方法为 ['a', 'b', 'ab', 'c', 'cc'] 。像 ['a', 'b', 'a', 'b', 'c', 'cc'] 这样拆分不满足题目要求，因为其中的 'a' 和 'b' 都出现了不止一次。
```

**示例 2：**

```
输入：s = "aba"
输出：2
解释：一种最大拆分方法为 ['a', 'ba'] 。
```

**示例 3：**

```
输入：s = "aa"
输出：1
解释：无法进一步拆分字符串。
```

**提示：**

- `1 <= s.length <= 16`
- `s` 仅包含小写英文字母

---

**参考代码**：

```java
import java.util.HashSet;
import java.util.Set;

public class Solution {

    private int maxLen;

    public int maxUniqueSplit(String s) {
        char[] charArray = s.toCharArray();
        int len = charArray.length;
        Set<String> hashSet = new HashSet<>();
        dfs(charArray, 0, len, hashSet);
        return maxLen;
    }

    private void dfs(char[] charArray, int index, int len, Set<String> hashSet) {
        // 剪枝想法来自 Ikaruga：https://leetcode-cn.com/problems/split-a-string-into-the-max-number-of-unique-substrings/solution/split-a-string-by-ikaruga/
        if (len - index + hashSet.size() <= maxLen) {
            return;
        }

        if (index == len) {
            maxLen = Math.max(maxLen, hashSet.size());
            // System.out.println(hashSet);
            return;
        }

        for (int i = index; i < len; i++) {
            // 截取字符串
            StringBuilder subStr = new StringBuilder();
            for (int j = index; j <= i; j++) {
                subStr.append(charArray[j]);
            }
            String s = subStr.toString();
            if (hashSet.contains(s)) {
                continue;
            }
            hashSet.add(s);
            dfs(charArray, i + 1, len, hashSet);
            hashSet.remove(s);
        }
    }
}
```
