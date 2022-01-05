---
title: 「力扣」第 547 题：朋友圈（中等）
icon: yongyan
category: 并查集
tags:
  - 并查集
---

这道题是并查集的典型问题，题目也非常接地气，现在改名叫「省份数量」了。

+ 题目链接：[547. 省份数量](https://leetcode-cn.com/problems/number-of-provinces/)
+ 题解链接：[并查集（Python 代码、Java 代码）](https://leetcode-cn.com/problems/number-of-provinces/solution/bing-cha-ji-python-dai-ma-java-dai-ma-by-liweiwei1/)

班上有 **N** 名学生。其中有些人是朋友，有些则不是。他们的友谊具有是传递性。如果已知 A 是 B 的朋友，B 是 C 的朋友，那么我们可以认为 A 也是 C 的朋友。所谓的朋友圈，是指所有朋友的集合。

给定一个 **N \* N** 的矩阵 **M**，表示班级中学生之间的朋友关系。如果M[i][j] = 1，表示已知第 i 个和 j 个学生**互为**朋友关系，否则为不知道。你必须输出所有学生中的已知的朋友圈总数。

**示例 1:**

```
输入: 
[[1,1,0],
[1,1,0],
[0,0,1]]
输出: 2 
说明：已知学生0和学生1互为朋友，他们在一个朋友圈。
第2个学生自己在一个朋友圈。所以返回2。
```

**示例 2:**

```
输入: 
[[1,1,0],
[1,1,1],
[0,1,1]]
输出: 1
说明：已知学生0和学生1互为朋友，学生1和学生2互为朋友，所以学生0和学生2也是朋友，所以他们三个在一个朋友圈，返回1。
```

**注意：**

1. `N` 在 `[1, 200]` 的范围内。
2. 对于所有学生，有 `M[i][i] = 1`。
3. 如果有 `M[i][j] = 1`，则有 `M[j][i] = 1`。

### 方法一：并查集

好友关系是双向关系，因此题目中给出的矩阵其实是一个邻接矩阵，所以问题就转化为求图中有几个连通分量的问题了。

我们还可以用并查集来解决它。由于是对称矩阵，我们其实只要看这个矩阵的下三角形部分就可以了。又因为自己肯定是自己的好友，所以还可以不看对角线元素。

并查集的特点是**孩子结点指向父亲结点，两个结点连接在一起即它们有相同的根结点**。下面是对编码的两点说明：

1、这里使用了基于 `rank` 的结点指向策略，`rank` 的含义是以自己为根结点的树的高度。

2、在 `find` 的过程中，实现了路径压缩算法，简而言之就在查询的过程中，修改结点的指向，将原本指向父亲结点修改成指向爷爷结点，以压缩这个多叉树的高度。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int findCircleNum(int[][] M) {
        int len = M.length;
        UnionFind uf = new UnionFind(len);
        for (int i = 0; i < len; i++) {
            for (int j = 0; j < i; j++) {
                if (M[i][j] == 1) {
                    uf.union(i, j);
                }
            }
        }
        return uf.getCount();
    }

    private class UnionFind {
        /**
         * 连通分量的个数
         */
        private int count;
        private int[] parent;
        /**
         * 以索引为 i 的元素为根结点的树的深度（最深的那个深度）
         */
        private int[] rank;

        public UnionFind(int n) {
            this.count = n;
            this.parent = new int[n];
            this.rank = new int[n];
            for (int i = 0; i < n; i++) {
                this.parent[i] = i;
                // 初始化时，所有的元素只包含它自己，只有一个元素，所以 rank[i] = 1
                this.rank[i] = 1;
            }
        }

        public int getCount() {
            return this.count;
        }

        public int find(int p) {
            // 在 find 的时候执行路径压缩
            while (p != this.parent[p]) {
                // 两步一跳完成路径压缩
                this.parent[p] = this.parent[this.parent[p]];
                p = this.parent[p];
            }
            return p;
        }

        public boolean isConnected(int p, int q) {
            return find(p) == find(q);
        }

        public void union(int p, int q) {
            int pRoot = find(p);
            int qRoot = find(q);
            if (pRoot == qRoot) {
                return;
            }
            // 这一步是与第 3 版不同的地方
            if (rank[pRoot] > rank[qRoot]) {
                parent[qRoot] = pRoot;
            } else if (rank[pRoot] < rank[qRoot]) {
                parent[pRoot] = qRoot;
            } else {
                parent[qRoot] = pRoot;
                rank[pRoot]++;
            }
            // 每次 union 以后，连通分量减 1
            count--;
        }
    }

    public static void main(String[] args) {
        int[][] M = {{1, 1, 0},
                {1, 1, 0},
                {0, 0, 1}};
        Solution solution = new Solution();
        int res = solution.findCircleNum(M);
        System.out.println(res);
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution(object):

    def findCircleNum(self, M):
        """
        :type M: List[List[int]]
        :rtype: int
        """
        class UnionFind:
            def __init__(self, n):
                self.parent = [i for i in range(n)]

            def find(self, p):
                root = p
                # 只要不是最上层的那个结点，就不停向上找
                while root != self.parent[root]:
                    root = self.parent[root]
                # 此时 root 就是大 boss
                # 接下来把 p 到 root 沿途所有的结点都指向 root
                while p != self.parent[p]:
                    temp = self.parent[p]
                    self.parent[p] = root
                    p = temp
                return root

            def is_connected(self, p, q):
                return self.find(p) == self.find(q)

            def union(self, p, q):
                p_id = self.find(p)
                q_id = self.find(q)
                if p_id == q_id:
                    return
                self.parent[p_id] = q_id

        m = len(M)
        union_find_set = UnionFind(m)
        # 只看下三角矩阵(不包括对角线)
        for i in range(m):
            for j in range(i):
                if M[i][j] == 1:
                    union_find_set.union(j, i)
        counter = 0
        # print(union_find_set.parent)
        # 自己的父亲是自己的话，这个结点就是根结点，是老大，是 boss
        # boss 的特点就是，他上面没有人，例如：李彦宏、马云
        # 数一数有几个老大，就有几个朋友圈
        for index, parent in enumerate(union_find_set.parent):
            if index == parent:
                counter += 1
        return counter


if __name__ == '__main__':
    M = [[1, 1, 0],
         [1, 1, 0],
         [0, 0, 1]]

    solution = Solution()
    result = solution.findCircleNum(M)
    print(result)
```
</CodeGroupItem>
</CodeGroup>


### 方法二：深度优先遍历


以后再补上 Java 代码。

C++ 代码：

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
private:
    /**
     * 记录是否被访问过
     */
    vector<int> visited;

    /**
     * 一共 N 名学生
     */
    int N;

    void dfs(int u, vector<vector<int>> &M) {
        if (visited[u]) {
            return;
        }
        visited[u] = 1;
        for (int i = 0; i < N; ++i) {
            // 如果是朋友关系，就继续遍历下去，这是深度优先遍历
            if (M[u][i]) {
                dfs(i, M);
            }
        }
    }

public:
    int findCircleNum(vector<vector<int>> &M) {
        N = M.size();
        if (N == 0) {
            return 0;
        }

        // 连通分量
        int res = 0;
        visited.assign(N, 0);

        for (int i = 0; i < N; ++i) {
            if (visited[i]) {
                continue;
            }

            dfs(i, M);
            res++;
        }
        return res;
    }
};
```

