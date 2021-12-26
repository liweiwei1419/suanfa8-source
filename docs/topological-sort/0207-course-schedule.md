---
title: 「力扣」第 207 题：课程表（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历  
  - 拓扑排序
---

+ 题目链接：[207. 课程表](https://leetcode-cn.com/problems/course-schedule/)；
+ 题解链接：[拓扑排序、深度优先遍历](https://leetcode-cn.com/problems/course-schedule/solution/tuo-bu-pai-xu-by-liweiwei1419/)。

## 题目描述

你这个学期必须选修 `numCourses` 门课程，记为 `0` 到 `numCourses - 1` 。

在选修某些课程之前需要一些先修课程。 先修课程按数组 `prerequisites` 给出，其中 `prerequisites[i] = [ai, bi]`，表示如果要学习课程 `ai` 则 **必须** 先学习课程 `bi` 。

- 例如，先修课程对 `[0, 1]` 表示：想要学习课程 `0` ，你需要先完成课程 `1` 。

请你判断是否可能完成所有课程的学习？如果可以，返回 `true` ；否则，返回 `false` 。

**示例 1：**

```
输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
```

示例 2：

```
输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
输出：false
解释：总共有 2 门课程。学习课程 1 之前，你需要先完成课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
```

**提示：**

- `1 <= numCourses <= 105`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `prerequisites[i]` 中的所有课程对 **互不相同**

---

::: danger 提示
这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。
:::


这道题的做法同样适用于第 210 题。

### 方法一：拓扑排序（Kahn 算法，其实就是广度优先遍历的思路）


@slidestart

![207-1.png](https://pic.leetcode-cn.com/1c2294cf156a56b90a5d750b6cded3b80e92ab8821abbcb47296cc20845d162a-207-1.png)

---

![207-2.png](https://pic.leetcode-cn.com/e2dee0b287ce8f27ec17b97f0ff9b937a5f1117dac526507cf7368f387e84dea-207-2.png)

---

![207-3.png](https://pic.leetcode-cn.com/56b1fbe4024efb04a0a36b40d8da65f8f726a71e09b274050100a0c7c41bc352-207-3.png)

---

![207-4.png](https://pic.leetcode-cn.com/0256b4b045ec7e1f835a6b419c54f1c14701d567d99f182194634eb00bf67782-207-4.png)

---

![207-5.png](https://pic.leetcode-cn.com/deddd19ff3ce401f93e4f01e4fed732f35875f1430b34833b4045961c3181eb2-207-5.png)

---

![207-6.png](https://pic.leetcode-cn.com/37ebca02fc73ff19455f9a3d63fe830c739527b4598df94e8c8fd3f9fc0ad629-207-6.png)

---

![207-7.png](https://pic.leetcode-cn.com/79e50d9a93bc6a53601ee6cb752ad1192bb9d8b2a42919ea4b27efd22e06ff99-207-7.png)

---

![207-8.png](https://pic.leetcode-cn.com/ff4a83824f20a76a91ba55c7c856521d959d8b85391c2aac819ca8adbddbb730-207-8.png)

---

![207-9.png](https://pic.leetcode-cn.com/768d83755ad94c1967b8cfd17feef41bb08085374771203dcb12fbc2c3109af1-207-9.png)

---

![207-10.png](https://pic.leetcode-cn.com/9bfab9cd56b2541c7c310a5ee054c98ef7d4b5188ad8ff606098903a1b2aa5d5-207-10.png)

---

![207-11.png](https://pic.leetcode-cn.com/e91ef7c5d01de19f3ef7126e3503430867f897d01f81b7a7607dd551a8743786-207-11.png)

---

![207-12.png](https://pic.leetcode-cn.com/7fcc5454f1562a1b231aa1fba29bd023c719730257776a10a64c5f5282660fb8-207-12.png)

---

![207-13.png](https://pic.leetcode-cn.com/e580001fca6eeed32f3c44ce0840ed67dfdca47bd88910d7f8fa19f040529d08-207-13.png)


@slideend



拓扑排序实际上应用的是**贪心算法**。贪心算法简而言之：每一步最优，全局就最优。

具体到拓扑排序，每一次都从图中删除没有前驱的顶点，这里并不需要真正的做删除操作，我们可以设置一个入度数组，每一轮都输出入度为 $0$ 的结点，并移除它、修改它指向的结点的入度（$-1$即可），依次得到的结点序列就是拓扑排序的结点序列。如果图中还有结点没有被移除，则说明“不能完成所有课程的学习”。

拓扑排序保证了每个活动（在这题中是“课程”）的所有前驱活动都排在该活动的前面，并且可以完成所有活动。拓扑排序的结果不唯一。拓扑排序还可以用于检测一个有向图是否有环。相关的概念还有 AOV 网，这里就不展开了。

**算法流程**：

1、在开始排序前，扫描对应的存储空间（使用邻接表），将入度为 $0$ 的结点放入队列。

2、只要队列非空，就从队首取出入度为 $0$ 的结点，将这个结点输出到结果集中，并且将这个结点的所有邻接结点（它指向的结点）的入度减 $1$，在减 $1$ 以后，如果这个被减 $1$ 的结点的入度为  $0$ ，就继续入队。

3、当队列为空的时候，检查结果集中的顶点个数是否和课程数相等即可。

思考这里为什么要使用队列？（马上就会给出答案。）

在代码具体实现的时候，除了保存入度为 0 的队列，我们还需要两个辅助的数据结构：

1、邻接表：通过结点的索引，我们能够得到这个结点的后继结点；

2、入度数组：通过结点的索引，我们能够得到指向这个结点的结点个数。

这个两个数据结构在遍历题目给出的邻边以后就可以很方便地得到。

**参考代码 1**：

这里感谢 [@johnny_mu-yun](/u/johnny_mu-yun/) 朋友的提醒，其实之前也有多位朋友提醒过我 Java 代码写得有问题，我现在才把它改对（2020 年 1 月 22 日）。


<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    public boolean canFinish(int numCourses, int[][] prerequisites) {
        if (numCourses <= 0) {
            return false;
        }

        // 特判
        int pLen = prerequisites.length;
        if (pLen == 0) {
            return true;
        }

        int[] inDegree = new int[numCourses];
        HashSet<Integer>[] adj = new HashSet[numCourses];
        for (int i = 0; i < numCourses; i++) {
            adj[i] = new HashSet<>();
        }

        for (int[] p : prerequisites) {
            inDegree[p[0]]++;
            adj[p[1]].add(p[0]);
        }

        Queue<Integer> queue = new LinkedList<>();

        // 首先加入入度为 0 的结点
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }

        // 记录已经出队的课程数量
        int cnt = 0;
        while (!queue.isEmpty()) {
            Integer top = queue.poll();
            cnt += 1;
            // 遍历当前出队结点的所有后继结点
            for (int successor : adj[top]) {
                inDegree[successor]--;
                if (inDegree[successor] == 0) {
                    queue.add(successor);
                }
            }
        }
        return cnt == numCourses;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List
from collections import deque

class Solution:

    # 思想：该方法的每一步总是输出当前无前趋（即入度为零）的顶点

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        """
        :type numCourses: int 课程门数
        :type prerequisites: List[List[int]] 课程与课程之间的关系
        :rtype: bool
        """
        # 课程的长度
        clen = len(prerequisites)
        if clen == 0:
            # 没有课程，当然可以完成课程的学习
            return True

        # 步骤1：统计每个顶点的入度
        # 入度数组，记录了指向它的结点的个数，一开始全部为 0
        in_degrees = [0 for _ in range(numCourses)]
        # 邻接表，使用散列表是为了去重
        adj = [set() for _ in range(numCourses)]

        # 想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]
        # [0, 1] 表示 1 在先，0 在后
        # 注意：邻接表存放的是后继 successor 结点的集合
        for second, first in prerequisites:
            in_degrees[second] += 1
            adj[first].add(second)

        # 步骤2：拓扑排序开始之前，先把所有入度为 0 的结点加入到一个队列中
        # 首先遍历一遍，把所有入度为 0 的结点都加入队列
        queue = deque()
        for i in range(numCourses):
            if in_degrees[i] == 0:
                queue.append(i)

        counter = 0
        while queue:
            top = queue.popleft()
            counter += 1
            # 步骤3：把这个结点的所有后继结点的入度减去 1，如果发现入度为 0 ，就马上添加到队列中
            for successor in adj[top]:
                in_degrees[successor] -= 1
                if in_degrees[successor] == 0:
                    queue.append(successor)

        return counter == numCourses
```
</CodeGroupItem>
</CodeGroup>





**复杂度分析：**

+ 时间复杂度：$O(E + V)$。这里 $E$ 表示邻边的条数，$V$ 表示结点的个数。初始化入度为 $0$ 的集合需要遍历整张图，具体做法是检查每个结点和每条边，因此复杂度为 $O(E+V)$，然后对该集合进行操作，又需要遍历整张图中的每个结点和每条边，复杂度也为 $O(E+V)$；
+ 空间复杂度：$O(E + V)$：邻接表长度是 $V$，每个课程里又保存了它所有的边。

这里回答一下使用队列的问题，如果不使用队列，要想得到当前入度为 $0$ 的结点，就得遍历一遍入度数组。使用队列即用空间换时间。

### 方法二：深度优先遍历（参考）

提示：这部分内容不重要，掌握上面的「广度优先遍历 + 贪心」的思想是常考的，重要的知识点。


说明：深度优先遍历的思路有 2 个。

1. 首先检测是否存在环，然后使用「深度优先遍历」，在「后序」的部分把课程添加到结果集，然后再逆序，就是「拓扑排序」的结果（没有提供参考代码）；
2. 在深度优先遍历的过程中，设置个别有特殊意义的变量，通过这些变量得到「拓扑排序」的结果（下面提供了参考代码）。


这里要使用逆邻接表。其实就是检测这个有向图中有没有环，只要存在环，这些课程就不能按要求学完。

具体方法是：

第 1 步：构建逆邻接表；

第 2 步：递归处理每一个还没有被访问的结点，具体做法很简单：对于一个结点来说，**先输出指向它的所有顶点，再输出自己**。

第 3 步：如果这个顶点还没有被遍历过，就递归遍历它，把所有指向它的结点都输出了，再输出自己。注意：**当访问一个结点的时候，应当先递归访问它的前驱结点，直至前驱结点没有前驱结点为止**。

**参考代码 2**：


<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.HashSet;

public class Solution {

    public boolean canFinish(int numCourses, int[][] prerequisites) {
        if (numCourses <= 0) {
            return false;
        }
        int plen = prerequisites.length;
        if (plen == 0) {
            return true;
        }
        int[] marked = new int[numCourses];

        // 初始化有向图 begin
        HashSet<Integer>[] graph = new HashSet[numCourses];
        for (int i = 0; i < numCourses; i++) {
            graph[i] = new HashSet<>();
        }
        // 初始化有向图 end
        // 有向图的 key 是前驱结点，value 是后继结点的集合
        for (int[] p : prerequisites) {
            graph[p[1]].add(p[0]);
        }

        for (int i = 0; i < numCourses; i++) {
            if (dfs(i, graph, marked)) {
                // 注意方法的语义，如果图中存在环，表示课程任务不能完成，应该返回 false
                return false;
            }
        }
        // 在遍历的过程中，一直 dfs 都没有遇到已经重复访问的结点，就表示有向图中没有环
        // 所有课程任务可以完成，应该返回 true
        return true;
    }

    /**
     * 注意这个 dfs 方法的语义
     * @param i      当前访问的课程结点
     * @param graph
     * @param marked 如果 == 1 表示正在访问中，如果 == 2 表示已经访问完了
     * @return true 表示图中存在环，false 表示访问过了，不用再访问了
     */
    private boolean dfs(int i,
                        HashSet<Integer>[] graph,
                        int[] marked) {
        // 如果访问过了，就不用再访问了
        if (marked[i] == 1) {
            // 从正在访问中，到正在访问中，表示遇到了环
            return true;
        }

        if (marked[i] == 2) {
            // 表示在访问的过程中没有遇到环，这个节点访问过了
            return false;
        }
        // 走到这里，是因为初始化呢，此时 marked[i] == 0
        // 表示正在访问中
        marked[i] = 1;
        // 后继结点的集合
        HashSet<Integer> successorNodes = graph[i];

        for (Integer successor : successorNodes) {
            if (dfs(successor, graph, marked)) {
                // 层层递归返回 true ，表示图中存在环
                return true;
            }
        }
        // i 的所有后继结点都访问完了，都没有存在环，则这个结点就可以被标记为已经访问结束
        // 状态设置为 2
        marked[i] = 2;
        // false 表示图中不存在环
        return false;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution(object):

    # 这里使用逆邻接表

    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        """
        :type numCourses: int 课程门数
        :type prerequisites: List[List[int]] 课程与课程之间的关系
        :rtype: bool
        """
        # 课程的长度
        clen = len(prerequisites)
        if clen == 0:
            # 没有课程，当然可以完成课程的学习
            return True
        # 深度优先遍历，判断结点是否访问过
        # 这里要设置 3 个状态
        # 0 就对应 False ，表示结点没有访问过
        # 1 就对应 True ，表示结点已经访问过，在深度优先遍历结束以后才置为 1
        # 2 表示当前正在遍历的结点，如果在深度优先遍历的过程中，
        # 有遇到状态为 2 的结点，就表示这个图中存在环
        visited = [0 for _ in range(numCourses)]

        # 逆邻接表，存的是每个结点的前驱结点的集合
        # 想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]
        # 1 在前，0 在后
        inverse_adj = [set() for _ in range(numCourses)]
        for second, first in prerequisites:
            inverse_adj[second].add(first)

        for i in range(numCourses):
            # 在遍历的过程中，如果发现有环，就退出
            if self.__dfs(i, inverse_adj, visited):
                return False
        return True

    def __dfs(self, vertex, inverse_adj, visited):
        """
        注意：这个递归方法的返回值是返回是否有环
        :param vertex: 结点的索引
        :param inverse_adj: 逆邻接表，记录的是当前结点的前驱结点的集合
        :param visited: 记录了结点是否被访问过，2 表示当前正在 DFS 这个结点
        :return: 是否有环，返回 True 表示这个有向图有环
        """
        # 2 表示这个结点正在访问
        if visited[vertex] == 2:
            # 表示遇到环
            return True
        if visited[vertex] == 1:
            return False

        visited[vertex] = 2
        for precursor in inverse_adj[vertex]:
            # 如果有环，就返回 True 表示有环
            if self.__dfs(precursor, inverse_adj, visited):
                return True

        # 1 表示访问结束
        # 先把 vertex 这个结点的所有前驱结点都输出之后，再输出自己
        visited[vertex] = 1
        return False
```
</CodeGroupItem>
</CodeGroup>




**复杂度分析：**

- 时间复杂度：$O(E + V)$；
- 空间复杂度：$O(E + V)$。

