---
title: 「力扣」第 56 题：合并区间（中等）
icon: yongyan
category: 贪心算法
tags:
  - 贪心算法
---

+ 题目链接：[56. 合并区间](https://leetcode-cn.com/problems/merge-intervals/)；
+ 题解链接：[贪心算法（Java）](https://leetcode-cn.com/problems/merge-intervals/solution/tan-xin-suan-fa-java-by-liweiwei1419-3/)。

## 题目描述

以数组 `intervals` 表示若干个区间的集合，其中单个区间为 `intervals[i] = [starti, endi]` 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

**示例 1：**

```
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```

**示例 2：**

```
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

**提示：**

- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= starti <= endi <= 10^4`

分析：

+ 首先画图理解题意；

![image.png](https://pic.leetcode-cn.com/d9b6e38ae17e4eace9e66acf904d89e34ee4b7895eb317613c9d26e222bab636-image.png)


![image.png](https://pic.leetcode-cn.com/aad882924ce7167c740886d25e0a5e6580f3e0e691340ada79f98aea04a3aad5-image.png)


经验：区间类的问题，一般而言是需要画图思考的。因为只有建立直观的感觉，才能更有效的去思考解决问题的方案。

还有需要画图思考的相关算法问题有（其实绝大部分都需要打草稿，大神除外）：

+ 和物理现象相关的：第 42 题：接雨水问题、第 11 题：盛最多水的容器、第 218 题：天际线问题；
+ 本身问题描述就和图形相关的问题：第 84 题：柱状图中最大的矩形；
+ 链表问题：穿针引线如果不画图容易把自己绕晕；
+ 回溯算法问题：根据示例画图发现每一步的选择和剪枝的条件；
+ 动态规划问题：画示意图发现最优子结构。



得出结论：**可以被合并的区间一定是有交集的区间**，前提是区间按照左端点排好序，这里的交集可以是一个点（例如例 2）。

至于为什么按照左端点升序排序，这里要靠一点直觉猜想，我没有办法说清楚是怎么想到的，有些问题的策略是按照右端点升序排序（也有可能是降序排序，具体问题具体分析）。

接着说，直觉上，只需要对所有的区间**按照左端点升序排序**，然后遍历。

+ 如果当前遍历到的区间的左端点 > 结果集中最后一个区间的右端点，说明它们没有交集，此时把区间添加到结果集；
+ 如果当前遍历到的区间的左端点 <= 结果集中最后一个区间的右端点，说明它们有交集，此时产生合并操作，即：对结果集中最后一个区间的右端点更新（取两个区间的最大值）。

**参考代码**：

```Java []
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Stack;


public class Solution {

    public int[][] merge(int[][] intervals) {
        int len = intervals.length;
        if (len < 2) {
            return intervals;
        }

        // 按照起点排序
        Arrays.sort(intervals, Comparator.comparingInt(o -> o[0]));

        // 也可以使用 Stack，因为我们只关心结果集的最后一个区间
        List<int[]> res = new ArrayList<>();
        res.add(intervals[0]);

        for (int i = 1; i < len; i++) {
            int[] curInterval = intervals[i];

            // 每次新遍历到的列表与当前结果集中的最后一个区间的末尾端点进行比较
            int[] peek = res.get(res.size() - 1);

            if (curInterval[0] > peek[1]) {
                res.add(curInterval);
            } else {
                // 注意，这里应该取最大
                peek[1] = Math.max(curInterval[1], peek[1]);
            }
        }
        return res.toArray(new int[res.size()][]);
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[][] intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
        int[][] res = solution.merge(intervals);
        for (int i = 0; i < res.length; i++) {
            System.out.println(Arrays.toString(res[i]));
        }
    }
}
```

**复杂度分析**：
+ 时间复杂度：$O(N \log N)$，这里 $N$ 是区间的长度；
+ 空间复杂度：$O(N)$，保存结果集需要的空间，这里计算的是最坏情况，也就是所有的区间都没有交点的时候。

说明：`Arrays.sort(intervals, Comparator.comparingInt(o -> o[0]));` 是 Java8 以后提供的一种函数式编程语法，在这里就不展开叙述了。


---


这里用到的算法思想是：贪心算法。

在具体的算法描述中：

+ 前提：区间按照左端点排序；
+ 贪心策略：在右端点的选择中，如果产生交集，总是将右端点的数值更新成为最大的，这样就可以合并更多的区间，这种做法是符合题意的。

这道题的证明请见 [「官方题解」](https://leetcode-cn.com/problems/merge-intervals/solution/he-bing-qu-jian-by-leetcode-solution/)。

这里用到的算法是「贪心算法」，「贪心算法」是在基础算法领域真正很「玄」的算法。很难也很简单。它简单在只要能想到，就不难写出来，且代码一般来说逻辑都比较简单，难在证明的算法的合理性，好在绝大多数情况下不要求证明。

贪心算法就像这个世界上的很多定理和猜想一样，需要人先猜测，然后做实验去验证。贪心这个名字有一定「短视」的意味在里面，就是只注重眼前利益，就能达到全局最优。如果用于形容人的话，有一定讽刺意味，但是在算法领域里面，这种思路的确可以解决特定的一类问题。

贪心算法（Greedy Algorithm）是指：在对问题求解时，总是做出在当前看来是最好的选择。也就是不从整体最优上加以考虑，贪心算法所做出决策是在某种意义上的局部最优解。

贪心策略适用的前提是：局部最优策略能导致产生全局最优解。

> 可以适用贪心的问题就是每一步局部最优，最后导致结果全局最优。

重点：贪心策略可以使用的前提是和要解决的问题相关的。不是所有的问题都适合使用贪心算法。而判断一个问题是否可以应用贪心算法，可以从以下两个角度：

+ 直觉，根据直觉描述出来的算法，具备「只考虑当前，不考虑全局」的特点，那可能就是「贪心算法」；
+ 如果不能举出反例，那多半这个问题就具有「贪心算法性质」，可以使用贪心算法去做。

要严格证明「贪心算法」有效，必须使用数学相关的理论，常见的方法有：
+ 数学归纳法；
+ 反证法。

贪心算法的证明比较难，并且就算看证明也会给人一头雾水的感觉，就像是让你证明 $\sqrt{2}$ 是无理数一样，但是推翻「贪心算法」很简单。在这里不展开。

经验：由于贪心算法适用的场景一般都是在一组决策里选择最大或者最小值，因此常常在使用贪心算法之前，需要先对数据按照某种规则排序。

一个最简单的理解贪心算法的例子就是「选择排序」，算法描述是：每一轮选择未排定部分里最小的元素交换到未排定部分的开头。

> 说明：对于「选择排序」是否是贪心算法，我查过资料，这一点有争议。我个人认为「选择排序」的算法描述符合「局部最优，则整体最优」，即每一步的决策并不考虑全局，只考虑当下，选这个例子的愿意只是因为它足够简单。
> 证明「贪心算法」在「选择排序」上有效需要使用「循环不变量」，在这里不展开。


贪心算法不是对所有问题都能够每一步只看当下，选择最好的策略，就得到整体最优解，关键是贪心策略的选择。选择的贪心策略必须具备无后效性，即某个状态以前的过程不会影响以后的状态，只与当前状态有关。

具备「无后效性」其实在「动态规划」这一类问题里体现得特别明显，大家可以通过贪心算法的学习在具体去理解「无后效性」的意思。

+ 当前决策对后面的决策不产生影响；
+ 当前决策只需要记录一个结果，而这个决策是怎么来的不重要。

一旦贪心选择性质不成立，可以考虑的另一种算法思想就是「动态规划」。「动态规划」在每一步做决策的时候，就不只考虑当前步骤的最优解。


### 贪心算法的应用
+ 对数据压缩编码的霍夫曼编码（Huffman Coding）
+ 求最小生成树的 Prim 算法和 Kruskal 算法
+ 求单源最短路径的Dijkstra算法

### 贪心算法典型问题
说明：如果是准备普通公司算法面试的朋友，不建议画太多时间去研究「贪心算法」有效性的证明，有可以使用「贪心算法」的直觉，举不出反例，并且编码可以通过所有测试用例即可。


+ 「力扣」第 12 题：[整数转罗马数字](https://leetcode-cn.com/problems/integer-to-roman/)，贪心思想更多来源于直觉；
+ 「力扣」第 452 题：[用最少数量的箭引爆气球](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/)，画图发现贪心策略；
+ 「力扣」第 122 题：[买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)，需要简单推导了；
+ 「力扣」第 55 题： [跳跃游戏](https://leetcode-cn.com/problems/jump-game/)，画图思考；
+ 「力扣」第 435 题： [无重叠区间](https://leetcode-cn.com/problems/non-overlapping-intervals/)，画图思考；
+ 「力扣」第 455 题：[分发饼干](https://leetcode-cn.com/problems/assign-cookies/)；
+ 「力扣」第 343 题： [整数拆分](https://leetcode-cn.com/problems/integer-break/)，需要简单推导。
+ 「力扣」第 300 题：[最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)，本质上还是动态规划，只不过在推导的过程中发现决策的过程可以贪心进行（具有贪心选择性质）。





---

### 例：「力扣」第 56 题：跳跃游戏（中等）


#### 方法一：排序

**思路**

如果我们按照区间的左端点排序，那么在排完序的列表中，可以合并的区间一定是连续的。如下图所示，标记为蓝色、黄色和绿色的区间分别可以合并成一个大区间，它们在排完序的列表中是连续的：

![56-2.png](https://pic.leetcode-cn.com/50417462969bd13230276c0847726c0909873d22135775ef4022e806475d763e-56-2.png)
{:align="center"}

**算法**

我们用数组 `merged` 存储最终的答案。

首先，我们将列表中的区间按照左端点升序排序。然后我们将第一个区间加入 `merged` 数组中，并按顺序依次考虑之后的每个区间：

- 如果当前区间的左端点在数组 `merged` 中最后一个区间的右端点之后，那么它们不会重合，我们可以直接将这个区间加入数组 `merged` 的末尾；

- 否则，它们重合，我们需要用当前区间的右端点更新数组 `merged` 中最后一个区间的右端点，将其置为二者的较大值。

**正确性证明**

上述算法的正确性可以用反证法来证明：在排完序后的数组中，两个本应合并的区间没能被合并，那么说明存在这样的三元组 $(i, j, k)$ 以及数组中的三个区间 $a[i], a[j], a[k]$ 满足 $i < j < k$ 并且 $(a[i], a[k])$ 可以合并，但 $(a[i], a[j])$ 和 $(a[j], a[k])$ 不能合并。这说明它们满足下面的不等式：

$$
a[i].end < a[j].start \quad (a[i] \text{ 和 } a[j] \text{ 不能合并}) \\
a[j].end < a[k].start \quad (a[j] \text{ 和 } a[k] \text{ 不能合并}) \\
a[i].end \geq a[k].start \quad (a[i] \text{ 和 } a[k] \text{ 可以合并}) \\
$$

我们联立这些不等式（注意还有一个显然的不等式 $a[j].start \leq a[j].end$），可以得到：

$$
a[i].end < a[j].start \leq a[j].end < a[k].start
$$

产生了矛盾！这说明假设是不成立的。因此，所有能够合并的区间都必然是连续的。

```Python [sol1-Python3]
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda x: x[0])

        merged = []
        for interval in intervals:
            # 如果列表为空，或者当前区间与上一区间不重合，直接添加
            if not merged or merged[-1][1] < interval[0]:
                merged.append(interval)
            else:
                # 否则的话，我们就可以与上一区间进行合并
                merged[-1][1] = max(merged[-1][1], interval[1])

        return merged
```

```C++ [sol1-C++]
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.size() == 0) {
            return {};
        }
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        for (int i = 0; i < intervals.size(); ++i) {
            int L = intervals[i][0], R = intervals[i][1];
            if (!merged.size() || merged.back()[1] < L) {
                merged.push_back({L, R});
            }
            else {
                merged.back()[1] = max(merged.back()[1], R);
            }
        }
        return merged;
    }
};
```

```Java [sol1-Java]
class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length == 0) {
            return new int[0][2];
        }
        Arrays.sort(intervals, new Comparator<int[]>() {
            public int compare(int[] interval1, int[] interval2) {
                return interval1[0] - interval2[0];
            }
        });
        List<int[]> merged = new ArrayList<int[]>();
        for (int i = 0; i < intervals.length; ++i) {
            int L = intervals[i][0], R = intervals[i][1];
            if (merged.size() == 0 || merged.get(merged.size() - 1)[1] < L) {
                merged.add(new int[]{L, R});
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], R);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}
```

**复杂度分析**

- 时间复杂度：$O(n\log n)$，其中 $n$ 为区间的数量。除去排序的开销，我们只需要一次线性扫描，所以主要的时间开销是排序的 $O(n\log n)$。

- 空间复杂度：$O(\log n)$，其中 $n$ 为区间的数量。这里计算的是存储答案之外，使用的额外空间。$O(\log n)$ 即为排序所需要的空间复杂度。