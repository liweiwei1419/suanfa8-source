---
title: 「力扣」第 677 题：键值映射（中等）
icon: yongyan
category: 前缀树
tags:
  - 前缀树
---

- 题目链接：[677. 键值映射](https://leetcode-cn.com/problems/map-sum-pairs/description/)。

## 题目描述

实现一个 `MapSum` 类，支持两个方法，`insert` 和 `sum`：

- `MapSum()` 初始化 `MapSum` 对象
- `void insert(String key, int val)` 插入 `key-val` 键值对，字符串表示键 `key` ，整数表示值 `val` 。如果键 `key` 已经存在，那么原来的键值对将被替代成新的键值对。
- `int sum(string prefix)` 返回所有以该前缀 `prefix` 开头的键 `key` 的值的总和。

**示例：**

```
输入：
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
输出：
[null, null, 3, null, 5]

解释：
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)
```

**提示：**

- `1 <= key.length, prefix.length <= 50`
- `key` 和 `prefix` 仅由小写英文字母组成
- `1 <= val <= 1000`
- 最多调用 `50` 次 `insert` 和 `sum`

## 思路分析

- 使用 `Trie` 单词查找树这个数据结构来完成，将原来的 `isWord` 设计成 `value` 它不但可以表达原来 `isWord` 的含义，还能表示题目中一个单词携带的整数的含义；
- 首先先把前缀遍历完，如果前缀都不能遍历完成，就说明单词查找树中不存在以这个单词为前缀的单词，应该返回 0，否则以一个结点为根，循环遍历到所有叶子节点，途径的所有 value 值都应该加和到最终的结果里；
- 计算 sum 设计成一个递归方法，递归方法几行就完成了计算，虽然没有显式地写出递归终止条件，但递归终止条件已经包含在方法体中了。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.HashMap;

public class MapSum {

    private Node root;

    private class Node {
        private int value;
        private HashMap<Character, Node> next;

        public Node() {
            this(0);
        }

        public Node(int value) {
            this.value = value;
            this.next = new HashMap<>();
        }
    }

    /**
     * Initialize your data structure here.
     */
    public MapSum() {
        root = new Node();
    }

    public void insert(String key, int val) {
        Node curNode = root;
        for (int i = 0; i < key.length(); i++) {
            Character c = key.charAt(i);
            if (!curNode.next.containsKey(c)) {
                curNode.next.put(c, new Node());
            }
            curNode = curNode.next.get(c);
        }
        curNode.value = val;
    }

    // 设计一个递归函数去完成它
    public int sum(String prefix) {
        Node curNode = root;
        for (int i = 0; i < prefix.length(); i++) {
            Character c = prefix.charAt(i);
            if (curNode.next.containsKey(c)) {
                curNode = curNode.next.get(c);
            } else {
                return 0;
            }
        }
        return sum(curNode);
    }

    // 计算以 node 为根节点的所有 value 值的和
    private int sum(Node node) {
        int res = node.value;
        for (Character key : node.next.keySet()) {
            // 一直找到根节点
            res += sum(node.next.get(key));
        }
        return res;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class MapSum(object):
    class Node:
        def __init__(self):
            self.val = 0
            self.dict = dict()

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.root = MapSum.Node()

    def insert(self, key, val):
        """
        :type key: str
        :type val: int
        :rtype: void
        """
        cur_node = self.root
        for aplha in key:
            if aplha not in cur_node.dict:
                cur_node.dict[aplha] = MapSum.Node()
            cur_node = cur_node.dict[aplha]
        cur_node.val = val

    def sum(self, prefix):
        """
        :type prefix: str
        :rtype: int
        """
        cur_node = self.root
        for alpha in prefix:
            if alpha not in cur_node.dict:
                return 0
            cur_node = cur_node.dict[alpha]
        return self.presum(cur_node)

    def presum(self, node):
        """
        计算以 node 为根结点的所有字符串的和
        :param node:
        :return:
        """
        s = node.val
        for next in node.dict:
            s += self.presum(node.dict[next])
        return s
````

</CodeGroupItem>
</CodeGroup>
