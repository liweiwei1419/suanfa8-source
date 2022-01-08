---
title: 「力扣」第 208 题：实现 Trie (前缀树)（中等）
icon: yongyan
category: 前缀树
tags:
  - 前缀树
---

- 题目地址：[208. 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/description/) 。

## 题目描述

**[Trie](https://baike.baidu.com/item/字典树/9825209?fr=aladdin)**（发音类似 "try"）或者说 **前缀树** 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

请你实现 Trie 类：

- `Trie()` 初始化前缀树对象。
- `void insert(String word)` 向前缀树中插入字符串 `word` 。
- `boolean search(String word)` 如果字符串 `word` 在前缀树中，返回 `true`（即，在检索之前已经插入）；否则，返回 `false` 。
- `boolean startsWith(String prefix)` 如果之前已经插入的字符串 `word` 的前缀之一为 `prefix` ，返回 `true` ；否则，返回 `false` 。

**示例：**

```
输入
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
输出
[null, null, true, false, true, null, true]

解释
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // 返回 True
trie.search("app");     // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app");     // 返回 True
```

**提示：**

- `1 <= word.length, prefix.length <= 2000`
- `word` 和 `prefix` 仅由小写英文字母组成
- `insert`、`search` 和 `startsWith` 调用次数 **总计** 不超过 `3 * 10^4` 次

## 思路分析

这道问题要求我们实现一个 Trie (前缀树)，包含 `insert`, `search` 和 `startsWith` 这三个操作。其实就是我们上面列出的「添加」「查询」「前缀查询」操作。

**参考代码**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Trie {

    private Node root;

    private class Node {
        private Node[] dict;
        private boolean isWord;

        // 你可以假设所有的输入都是由小写字母 a-z 构成的。
        public Node() {
            dict = new Node[26];
            this.isWord = false;
        }
    }

    /**
     * Initialize your data structure here.
     */
    public Trie() {
        root = new Node();
    }

    /**
     * Inserts a word into the trie.
     */
    public void insert(String word) {
        int len = word.length();
        Node curNode = root;
        for (int i = 0; i < len; i++) {
            char curChar = word.charAt(i);
            Node next = curNode.dict[curChar - 'a'];
            if (next == null) {
                curNode.dict[curChar - 'a'] = new Node();
            }
            curNode = curNode.dict[curChar - 'a'];
        }
        if (!curNode.isWord) {
            curNode.isWord = true;
        }
    }

    /**
     * Returns if the word is in the trie.
     */
    public boolean search(String word) {
        int len = word.length();
        Node curNode = root;

        for (int i = 0; i < len; i++) {
            char curC = word.charAt(i);
            Node next = curNode.dict[curC - 'a'];
            if (next == null) {
                return false;
            } else {
                curNode = next;
            }
        }
        return curNode.isWord;
    }

    /**
     * Returns if there is any word in the trie that starts with the given prefix.
     */
    public boolean startsWith(String prefix) {
        int len = prefix.length();
        Node curNode = root;
        for (int i = 0; i < len; i++) {
            char curC = prefix.charAt(i);
            Node next = curNode.dict[curC - 'a'];
            if (next == null) {
                return false;
            } else {
                curNode = next;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("helloworld");
        boolean startsWith = trie.startsWith("hello");
        System.out.println(startsWith);
        boolean search1 = trie.search("helloworld");
        System.out.println(search1);

        boolean search2 = trie.search("hello");
        System.out.println(search2);
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">

```python
class Trie(object):
    class Node:
        def __init__(self):
            self.is_word = False
            self.dict = dict()

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.root = Trie.Node()

    def insert(self, word):
        """
        Inserts a word into the trie.
        :type word: str
        :rtype: void
        """
        cur_node = self.root
        for alpha in word:
            if alpha not in cur_node.dict:
                cur_node.dict[alpha] = Trie.Node()
            # 这里不要写成 else ，那就大错特错了
            cur_node = cur_node.dict[alpha]
        if not cur_node.is_word:
            cur_node.is_word = True

    def search(self, word):
        """
        Returns if the word is in the trie.
        :type word: str
        :rtype: bool
        """
        cur_node = self.root
        for alpha in word:
            if alpha not in cur_node.dict:
                return False
            else:
                cur_node = cur_node.dict[alpha]
        return cur_node.is_word

    def startsWith(self, prefix):
        """
        Returns if there is any word in the trie that starts with the given prefix.
        :type prefix: str
        :rtype: bool
        """
        cur_node = self.root
        for alpha in prefix:
            if alpha not in cur_node.dict:
                return False
            else:
                cur_node = cur_node.dict[alpha]
        return True
```
</CodeGroupItem>
</CodeGroup>

其实并不难，多写几遍也就熟悉了。


实现一个 Trie (前缀树)，包含 `insert`, `search`, 和 `startsWith` 这三个操作。

> **示例:**
>
> ```
> Trie trie = new Trie();
> 
> trie.insert("apple");
> trie.search("apple");   // 返回 true
> trie.search("app");     // 返回 false
> trie.startsWith("app"); // 返回 true
> trie.insert("app");   
> trie.search("app");     // 返回 true
> ```
> **说明:**
>
> - 你可以假设所有的输入都是由小写字母 `a-z` 构成的。
> - 保证所有输入均为非空字符串。