---
title: 「力扣」第 990 题：等式方程的可满足性（中等）
icon: yongyan
categories: 并查集
tags:
  - 并查集
---

## 「力扣」第 990 题：等式方程的可满足性（中等）

> 有些问题不以并查集为背景，但的确可以使用并查集的知识帮助我们解决问题。由于等式相等具有传递性，比较容易想到使用并查集。

+ [链接](https://leetcode-cn.com/problems/satisfiability-of-equality-equations/)
+ [题解链接](https://leetcode-cn.com/problems/satisfiability-of-equality-equations/solution/shi-yong-bing-cha-ji-chu-li-bu-xiang-jiao-ji-he-we/)



给定一个由表示变量之间关系的字符串方程组成的数组，每个字符串方程 `equations[i]` 的长度为 `4`，并采用两种不同的形式之一：`"a==b"` 或 `"a!=b"`。在这里，a 和 b 是小写字母（不一定不同），表示单字母变量名。

只有当可以将整数分配给变量名，以便满足所有给定的方程时才返回 `true`，否则返回 `false`。 

**示例 1：**

```
输入：["a==b","b!=a"]
输出：false
解释：如果我们指定，a = 1 且 b = 1，那么可以满足第一个方程，但无法满足第二个方程。没有办法分配变量同时满足这两个方程。
```

**示例 2：**

```
输出：["b==a","a==b"]
输入：true
解释：我们可以指定 a = 1 且 b = 1 以满足满足这两个方程。
```

**示例 3：**

```
输入：["a==b","b==c","a==c"]
输出：true
```

**示例 4：**

```
输入：["a==b","b!=c","c==a"]
输出：false
```

**示例 5：**

```
输入：["c==c","b==d","x!=z"]
输出：true
```

**提示：**

1. `1 <= equations.length <= 500`
2. `equations[i].length == 4`
3. `equations[i][0]` 和 `equations[i][3]` 是小写字母
4. `equations[i][1]` 要么是 `'='`，要么是 `'!'`
5. `equations[i][2]` 是 `'='`





由于等式相等具有传递性，比较容易想到使用并查集。

为此设计算法如下：

1、扫描所有等式，将等式两边的顶点进行合并；

2、再扫描所有不等式，**检查**每一个不等式的两个顶点是不是在一个连通分量里，如果在，则返回 `false` 表示等式方程有矛盾。如果所有检查都没有矛盾，返回 `true`。

并查集知识小结：

1、解决的是两个顶点是否连通的问题，可以用于检测图中是否存在环；

2、代表元法：采用 `parent` 数组实现，以每个结点的根结点作为代表元；

3、并查集的优化有两种策略：

（1）路径压缩；

有「隔代压缩」与「完全压缩」。

+ 「隔代压缩」性能比较高，虽然压缩不完全，不过多次执行「隔代压缩」也能达到「完全压缩」的效果，我本人比较偏向使用「隔代压缩」的写法。
+ 「完全压缩」需要借助系统栈，使用递归的写法。或者先找到当前结点的根结点，然后把沿途上所有的结点都指向根结点，得遍历两次。


（2）按秩合并。

秩也有两种含义：

+ 秩表示以当前结点为根结点的子树结点总数，即这里的「秩」表示 `size` 含义；
+ 秩表示以当前结点为根结点的子树的高度，即这里的「秩」表示 `rank` 含义（更合理，因为查询时候的时间性能主要决定于树的高度）。


4、如果同时使用「路径压缩」与「按秩合并」，这里的「秩」就失去了它的定义，但即使秩表示的含义不准确，也能够作为合并时候很好的「参考」。在这种情况下，并查集的查询与合并的时间复杂度可以达到接近 $O(1)$。

感兴趣的朋友可以在互联网上搜索关键字「并查集」、「反阿克曼函数」深入了解同时使用「路径压缩」与「按秩合并」时候的并查集的时间复杂度。

我使用的策略是这样的（仅供参考）：用「隔代压缩」，代码比较好写。不写「按秩合并」，除非题目有一些关于「秩」的信息需要讨论。一般来说，这样写也能得到不错的性能，如果性能不太好的话，再考虑「按秩合并」。

#### 并查集的时间复杂度分析

可以参考如下资料：


+ 《算法导论》第 21 章：用于不相交集合的数据结构；
+ 《算法》（第 4 版）第 1 章第 5 节：案例研究：union-find 算法；
+ 知乎问答：[为什么并查集在路径压缩之后的时间复杂度是阿克曼函数?](https://www.zhihu.com/question/35090745)

说明：内容超纲，知道结论就好。


**参考代码**：

Java 代码：

```Java []
public class Solution {

    public boolean equationsPossible(String[] equations) {
        UnionFind unionFind = new UnionFind(26);

        for (String equation : equations) {
            char[] charArray = equation.toCharArray();
            if (charArray[1] == '=') {
                int index1 = charArray[0] - 'a';
                int index2 = charArray[3] - 'a';
                unionFind.union(index1, index2);
            }
        }

        for (String equation : equations) {
            char[] charArray = equation.toCharArray();
            if (charArray[1] == '!') {
                int index1 = charArray[0] - 'a';
                int index2 = charArray[3] - 'a';
                if (unionFind.isConnected(index1, index2)) {
                    // 如果合并失败，表示等式有矛盾，根据题意，返回 false
                    return false;
                }
            }
        }
        // 如果检查了所有不等式，都没有发现矛盾，返回 true
        return true;
    }

    private class UnionFind {

        private int[] parent;

        public UnionFind(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        public int find(int x) {
            while (x != parent[x]) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        }

        /**
         * @param x
         * @param y
         * @return 如果合并成功，返回 true
         */
        public void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);
            parent[rootX] = rootY;
        }

        public boolean isConnected(int x, int y) {
            return find(x) == find(y);
        }
    }


    public static void main(String[] args) {
        // String[] equations = new String[]{"b==a", "a==b"};
        // String[] equations = new String[]{"a==b","b==c","a==c"};
        // String[] equations = new String[]{"a==b","b!=c","c==a"};
        String[] equations = new String[]{"c==c", "b==d", "x!=z"};

        Solution solution = new Solution();
        boolean res = solution.equationsPossible(equations);
        System.out.println(res);
    }
}
```

这道题我们为并查集设计了 `isConnected()` 方法，判断两个结点是否在一个连通分量中。
