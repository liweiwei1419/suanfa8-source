---
title: 「力扣」第 648 题：单词替换（中等）
icon: yongyan
category: 前缀树
tags:
  - 前缀树
---






在英语中，我们有一个叫做 词根(root)的概念，它可以跟着其他一些词组成另一个较长的单词——我们称这个词为 继承词(successor)。例如，词根an，跟随着单词 other(其他)，可以形成新的单词 another(另一个)。

现在，给定一个由许多词根组成的词典和一个句子。你需要将句子中的所有继承词用词根替换掉。如果继承词有许多可以形成它的词根，则用最短的词根替换它。

你需要输出替换之后的句子。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/replace-words
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

**示例 1：**

```
输入：dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
输出："the cat was rat by the bat"
```



题意分析：

+ 需要将句子中的所有继承词用词根替换掉；
+ 需要输出替换之后的句子。



本思路需要对Trie有一定的了解。
1.首先将dict按照长度进行从小到大排序。
2.依次搜索sentence中的每个单词，结合上一点可以保证我们找到的结果是最短的词根。

作者：xuebuhui0729
链接：https://leetcode-cn.com/problems/replace-words/solution/java-dan-ci-ti-huan-zao-shang-xue-xi-de-triefang-f/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



提示：

+ `1 <= dictionary.length <= 1000`
+ `1 <= dictionary[i].length <= 100`
+ `dictionary[i]` 仅由小写字母组成。
+ `1 <= sentence.length <= 10^6`
+ `sentence` 仅由小写字母和空格组成。
+ `sentence` 中单词的总量在范围 `[1, 1000]` 内。
+ `sentence` 中每个单词的长度在范围 `[1, 1000]` 内。
+ `sentence` 中单词之间由一个空格隔开。
+ `sentence` 没有前导或尾随空格。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/replace-words
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。







```java
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Solution {

    public String replaceWords(List<String> dictionary, String sentence) {
        // 按照单词的长度从小到大排序（为什么）
        // Collections.sort(dictionary, (s1, s2) -> s1.length() - s2.length());
        Collections.sort(dictionary, Comparator.comparingInt(String::length));

        // 建树
        Trie trie = new Trie();
        for (String word : dictionary) {
            trie.insert(word);
        }

        String[] words = sentence.split(" ");
        StringBuilder stringBuilder = new StringBuilder();
        for (String word : words) {
            // 这句话是核心，搜到前缀停下
            stringBuilder.append(trie.search(word)).append(" ");
        }

        int len = stringBuilder.length();
        stringBuilder.deleteCharAt(len - 1);
        return stringBuilder.toString();
    }


    private class Trie {

        private class TrieNode {
            private boolean isWord;
            private TrieNode[] children = new TrieNode[26];

            public TrieNode() {
                this.isWord = false;
            }
        }

        private TrieNode root;

        public Trie() {
            root = new TrieNode();
        }

        public void insert(String s) {
            TrieNode currNode = root;
            for (char c : s.toCharArray()) {
                int index = c - 'a';
                if (currNode.children[index] == null) {
                    currNode.children[index] = new TrieNode();
                }
                currNode = currNode.children[index];
            }
            currNode.isWord = true;
        }

        public String search(String s) {
            TrieNode currNode = root;
            StringBuilder stringBuilder = new StringBuilder();
            char[] charArray = s.toCharArray();
            for (char c : charArray) {
                int index = c - 'a';
                if (currNode.children[index] == null) {
                    return s;
                }
                stringBuilder.append(c);
                currNode = currNode.children[index];
                if (currNode.isWord) {
                    return stringBuilder.toString();
                }
            }
            return s;
        }
    }
}
```



参考资料：

+ 官方题解：https://leetcode-cn.com/problems/replace-words/solution/dan-ci-ti-huan-by-leetcode/
+ 作者：xuebuhui0729
  链接：https://leetcode-cn.com/problems/replace-words/solution/java-dan-ci-ti-huan-zao-shang-xue-xi-de-triefang-f/