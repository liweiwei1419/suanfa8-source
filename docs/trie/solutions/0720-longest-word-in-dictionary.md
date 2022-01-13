---
title: 「力扣」第 720 题：词典中最长的单词（简单）
icon: yongyan
category: 前缀树
tags:
  - 前缀树
---

- 题目链接：[720. 词典中最长的单词]()；
- 题解链接：[]()。

前缀树：https://leetcode-cn.com/problems/longest-word-in-dictionary/solution/qian-zhui-shu-dfsbao-li-sou-suo-by-boille/

给出一个字符串数组 `words` 组成的一本英语词典。从中找出最长的一个单词，该单词是由 `words` 词典中其他单词逐步添加一个字母组成。若其中有多个可行的答案，则 **返回答案中字典序最小** 的单词。

若无答案，则返回空字符串。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-word-in-dictionary
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

**提示：**

- 所有输入的字符串都只包含小写字母。
- `words`数组长度范围为`[1,1000]`。
- `words[i]`的长度范围为`[1,30]`。

说明：这道题 DFS 可以用栈实现。

## 方法二：字典树

```java
public class Solution {

    private int longestLen = 0;
    private String ansLongerWord = "";

    public String longestWord(String[] words) {
        TrieNode root = new TrieNode();
        for (String s : words) {
            TrieNode cur = root;
            for (char c : s.toCharArray()) {
                if (cur.children[c - 'a'] == null) {
                    cur.children[c - 'a'] = new TrieNode();
                }
                cur = cur.children[c - 'a'];
            }
            cur.isEnd = true;
            cur.word = s;
        }

        dfs(root, 0);
        return ansLongerWord;
    }

    public void dfs(TrieNode root, int depth) {
        // 当前节点为空，或者当前节点（非根节点）不是单词的结尾时，return 剪枝
        if (root == null || (depth > 0 && !root.isEnd)) {
            return;
        }

        // 每次搜索更新最大深度和最长单词
        if (depth > longestLen) {
            longestLen = depth;
            ansLongerWord = root.word;
        }

        for (TrieNode node : root.children) {
            if (node != null) {
                dfs(node, depth + 1);
            }
        }
    }

    private class TrieNode {
        String word;
        TrieNode[] children;
        boolean isEnd;

        public TrieNode() {
            children = new TrieNode[26];
            isEnd = false;
        }
    }
}
```
