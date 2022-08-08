---
title: 「力扣」第 39 题：组合总和（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 剪枝
---

- 题目链接：[39. 组合总和](https://leetcode-cn.com/problems/combination-sum/)；
- 题解链接：[回溯算法 + 剪枝（回溯经典例题详解）](https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-2/)。

## 题目描述

给你一个 **无重复元素** 的整数数组 `candidates` 和一个目标整数 `target` ，找出 `candidates` 中可以使数字和为目标数 `target` 的 **所有不同组合** ，并以列表形式返回。你可以按 **任意顺序** 返回这些组合。

`candidates` 中的 **同一个** 数字可以 **无限制重复被选取** 。如果至少一个数字的被选数量不同，则两种组合是不同的。

对于给定的输入，保证和为 `target` 的不同组合数少于 `150` 个。

**示例 1：**

```
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
```

**示例 2：**

```
输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
```

**示例 3：**

```
输入: candidates = [2], target = 1
输出: []
```

**示例 4：**

```
输入: candidates = [1], target = 1
输出: [[1]]
```

**示例 5：**

```
输入: candidates = [1], target = 2
输出: [[1,1]]
```

**提示：**

- `1 <= candidates.length <= 30`
- `1 <= candidates[i] <= 200`
- `candidate` 中的每个元素都是独一无二的。
- `1 <= target <= 500`

## 思路分析

根据示例 1：输入: `candidates = [2, 3, 6, 7]`，`target = 7`。

- 候选数组里有 `2`，如果找到了组合总和为 `7 - 2 = 5` 的所有组合，再在之前加上 `2` ，就是 `7` 的所有组合；
- 同理考虑 `3`，如果找到了组合总和为 `7 - 3 = 4` 的所有组合，再在之前加上 `3` ，就是 `7` 的所有组合，依次这样找下去。

基于以上的想法，可以画出如下的树形图。建议大家自己在纸上画出这棵树，**这一类问题都需要先画出树形图，然后编码实现**。

编码通过 **深度优先遍历** 实现，使用一个列表，在 **深度优先遍历** 变化的过程中，遍历所有可能的列表并判断当前列表是否符合题目的要求，成为「回溯算法」（个人理解，非形式化定义）。

回溯算法的总结我写在了「力扣」第 46 题（全排列）的题解 《[回溯算法入门级详解 + 经典例题列表（持续更新）](https://leetcode-cn.com/problems/permutations/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liweiw/)》 中，如有需要请前往观看。

## 画出树形图

2020 年 9 月 9 日补充：以下给出的是一种树形图的画法。对于组合来说，还可以根据一个数选和不选画树形图，请参考 [官方题解](https://leetcode-cn.com/problems/combination-sum/solution/zu-he-zong-he-by-leetcode-solution/) 或者 [@elegant-pike](/u/elegant-pike/) 的 [评论](https://leetcode-cn.com/problems/combination-sum/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-m-2/583297)。

以输入：`candidates = [2, 3, 6, 7]`, `target = 7` 为例：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h2toe1lvu4j21ez0u0taw.jpg){:width=500}
{:align=center}

**说明**：

- 以 `target = 7` 为 **根结点** ，创建一个分支的时 **做减法** ；
- 每一个箭头表示：从父亲结点的数值减去边上的数值，得到孩子结点的数值。边的值就是题目中给出的 `candidate` 数组的每个元素的值；
- 减到 $0$ 或者负数的时候停止，即：结点 $0$ 和负数结点成为叶子结点；
- 所有从根结点到结点 $0$ 的路径（只能从上往下，没有回路）就是题目要找的一个结果。

这棵树有 $4$ 个叶子结点的值 $0$，对应的路径列表是 `[[2, 2, 3], [2, 3, 2], [3, 2, 2], [7]]`，而示例中给出的输出只有 `[[7], [2, 2, 3]]`。即：题目中要求每一个符合要求的解是 **不计算顺序** 的。下面我们分析为什么会产生重复。

### 针对具体例子分析重复路径产生的原因（难点）

> 友情提示：这一部分我的描述是晦涩难懂的，建议大家先自己观察出现重复的原因，进而思考如何解决。

产生重复的原因是：在每一个结点，做减法，展开分支的时候，由于题目中说 **每一个元素可以重复使用**，我们考虑了 **所有的** 候选数，因此出现了重复的列表。

一种简单的去重方案是借助哈希表的天然去重的功能，但实际操作一下，就会发现并没有那么容易。

可不可以在搜索的时候就去重呢？答案是可以的。遇到这一类相同元素不计算顺序的问题，我们在搜索的时候就需要 **按某种顺序搜索**。具体的做法是：每一次搜索的时候设置 **下一轮搜索的起点** `begin`，请看下图。

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h2toe3hc1ej21ah0u0mzu.jpg)

即：从每一层的第 $2$ 个结点开始，都不能再搜索产生同一层结点已经使用过的 `candidate` 里的元素。

> 友情提示：如果题目要求，结果集不计算顺序，此时需要按顺序搜索，才能做到不重不漏。「力扣」第 47 题（ [全排列 II](https://leetcode-cn.com/problems/permutations-ii) ）、「力扣」第 15 题（ [三数之和](https://leetcode-cn.com/problems/3sum) ）也使用了类似的思想，使得结果集没有重复。

**参考代码 1**：

**补充**：参考代码 1 和参考代码 2 的 Python 部分，没有严格按照回溯算法来写，这里需要了解的知识点是：

- Python3 的 `[1, 2] + [3]` 语法生成了新的列表，一层一层传到根结点以后，直接 `res.append(path)` 就可以了；
- 基本类型变量在传参的时候，是复制，因此变量值的变化在参数里体现就行，所以 Python3 的代码看起来没有「回溯」这个步骤。

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        int len = candidates.length;
        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        Deque<Integer> path = new ArrayDeque<>();
        dfs(candidates, 0, len, target, path, res);
        return res;
    }

    /**
     * @param candidates 候选数组
     * @param begin      搜索起点
     * @param len        冗余变量，是 candidates 里的属性，可以不传
     * @param target     每减去一个元素，目标值变小
     * @param path       从根结点到叶子结点的路径，是一个栈
     * @param res        结果集列表
     */
    private void dfs(int[] candidates, int begin, int len, int target, Deque<Integer> path, List<List<Integer>> res) {
        // target 为负数和 0 的时候不再产生新的孩子结点
        if (target < 0) {
            return;
        }
        if (target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        // 重点理解这里从 begin 开始搜索的语意
        for (int i = begin; i < len; i++) {
            path.addLast(candidates[i]);

            // 注意：由于每一个元素可以重复使用，下一轮搜索的起点依然是 i，这里非常容易弄错
            dfs(candidates, i, len, target - candidates[i], path, res);

            // 状态重置
            path.removeLast();
        }
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:

        def dfs(candidates, begin, size, path, res, target):
            if target < 0:
                return
            if target == 0:
                res.append(path)
                return

            for index in range(begin, size):
                dfs(candidates, index, size, path + [candidates[index]], res, target - candidates[index])

        size = len(candidates)
        if size == 0:
            return []
        path = []
        res = []
        dfs(candidates, 0, size, path, res, target)
        return res
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

这个问题的复杂度分析是在我的能力之外的，这里给出我的思考。

我的结论是：时间复杂度与 `candidate` 数组的值有关：

- 如果 `candidate` 数组的值都很大，`target` 的值很小，那么树上的结点就比较少；
- 如果 `candidate` 数组的值都很小，`target` 的值很大，那么树上的结点就比较多。

所以时间复杂度与空间复杂度不确定。

### 剪枝提速

- 根据上面画树形图的经验，如果 `target` 减去一个数得到负数，那么减去一个更大的树依然是负数，同样搜索不到结果。基于这个想法，我们可以对输入数组进行排序，添加相关逻辑达到进一步剪枝的目的；
- 排序是为了提高搜索速度，对于解决这个问题来说非必要。但是搜索问题一般复杂度较高，能剪枝就尽量剪枝。实际工作中如果遇到两种方案拿捏不准的情况，都试一下。

**参考代码 2**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        int len = candidates.length;
        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        // 排序是剪枝的前提
        Arrays.sort(candidates);
        Deque<Integer> path = new ArrayDeque<>();
        dfs(candidates, 0, len, target, path, res);
        return res;
    }

    private void dfs(int[] candidates, int begin, int len, int target, Deque<Integer> path, List<List<Integer>> res) {
        // 由于进入更深层的时候，小于 0 的部分被剪枝，因此递归终止条件值只判断等于 0 的情况
        if (target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = begin; i < len; i++) {
            // 重点理解这里剪枝，前提是候选数组已经有序，
            if (target - candidates[i] < 0) {
                break;
            }

            path.addLast(candidates[i]);
            dfs(candidates, i, len, target - candidates[i], path, res);
            path.removeLast();
        }
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:

        def dfs(candidates, begin, size, path, res, target):
            if target == 0:
                res.append(path)
                return

            for index in range(begin, size):
                residue = target - candidates[index]
                if residue < 0:
                    break

                dfs(candidates, index, size, path + [candidates[index]], res, residue)

        size = len(candidates)
        if size == 0:
            return []
        candidates.sort()
        path = []
        res = []
        dfs(candidates, 0, size, path, res, target)
        return res
````

</CodeGroupItem>
</CodeGroup>

## 总结

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2toeku2m4j221m0pw0x2.jpg)

### 什么时候使用 `used` 数组，什么时候使用 `begin` 变量

有些朋友可能会疑惑什么时候使用 `used` 数组，什么时候使用 `begin` 变量。这里为大家简单总结一下：

- 排列问题，讲究顺序（即 `[2, 2, 3]` 与 `[2, 3, 2]` 视为不同列表时），需要记录哪些数字已经使用过，此时用 `used` 数组；
- 组合问题，不讲究顺序（即 `[2, 2, 3]` 与 `[2, 3, 2]` 视为相同列表时），需要按照某种顺序搜索，此时使用 `begin` 变量。

注意：具体问题应该具体分析， **理解算法的设计思想** 是至关重要的，请不要死记硬背。

### 补充说明

如果对于「回溯算法」的理解还很模糊的朋友，建议在「递归」之前和「递归」之后，把 `path` 变量的值打印出来看一下，以加深对于程序执行流程的理解。

针对参考代码 1 添加打印输出：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;


public class Solution {

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        int len = candidates.length;
        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        Deque<Integer> path = new ArrayDeque<>();
        dfs(candidates, 0, len, target, path, res);
        return res;
    }

    private void dfs(int[] candidates, int begin, int len, int target, Deque<Integer> path, List<List<Integer>> res) {
        if (target < 0) {
            return;
        }
        if (target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = begin; i < len; i++) {
            path.addLast(candidates[i]);
            System.out.println("递归之前 => " + path + "，剩余 = " + (target - candidates[i]));

            dfs(candidates, i, len, target - candidates[i], path, res);

            path.removeLast();
            System.out.println("递归之后 => " + path);

        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] candidates = new int[]{2, 3, 6, 7};
        int target = 7;
        List<List<Integer>> res = solution.combinationSum(candidates, target);
        System.out.println("输出 => " + res);
    }
}
```

打印输出：

```
递归之前 => [2]，剩余 = 5
递归之前 => [2, 2]，剩余 = 3
递归之前 => [2, 2, 2]，剩余 = 1
递归之前 => [2, 2, 2, 2]，剩余 = -1
递归之后 => [2, 2, 2]
递归之前 => [2, 2, 2, 3]，剩余 = -2
递归之后 => [2, 2, 2]
递归之前 => [2, 2, 2, 6]，剩余 = -5
递归之后 => [2, 2, 2]
递归之前 => [2, 2, 2, 7]，剩余 = -6
递归之后 => [2, 2, 2]
递归之后 => [2, 2]
递归之前 => [2, 2, 3]，剩余 = 0
递归之后 => [2, 2]
递归之前 => [2, 2, 6]，剩余 = -3
递归之后 => [2, 2]
递归之前 => [2, 2, 7]，剩余 = -4
递归之后 => [2, 2]
递归之后 => [2]
递归之前 => [2, 3]，剩余 = 2
递归之前 => [2, 3, 3]，剩余 = -1
递归之后 => [2, 3]
递归之前 => [2, 3, 6]，剩余 = -4
递归之后 => [2, 3]
递归之前 => [2, 3, 7]，剩余 = -5
递归之后 => [2, 3]
递归之后 => [2]
递归之前 => [2, 6]，剩余 = -1
递归之后 => [2]
递归之前 => [2, 7]，剩余 = -2
递归之后 => [2]
递归之后 => []
递归之前 => [3]，剩余 = 4
递归之前 => [3, 3]，剩余 = 1
递归之前 => [3, 3, 3]，剩余 = -2
递归之后 => [3, 3]
递归之前 => [3, 3, 6]，剩余 = -5
递归之后 => [3, 3]
递归之前 => [3, 3, 7]，剩余 = -6
递归之后 => [3, 3]
递归之后 => [3]
递归之前 => [3, 6]，剩余 = -2
递归之后 => [3]
递归之前 => [3, 7]，剩余 = -3
递归之后 => [3]
递归之后 => []
递归之前 => [6]，剩余 = 1
递归之前 => [6, 6]，剩余 = -5
递归之后 => [6]
递归之前 => [6, 7]，剩余 = -6
递归之后 => [6]
递归之后 => []
递归之前 => [7]，剩余 = 0
递归之后 => []
输出 => [[2, 2, 3], [7]]
```

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2toep14y3j20u0105q78.jpg){:width="500px"}

针对参考代码 2 添加打印输出：

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        int len = candidates.length;
        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        Arrays.sort(candidates);
        Deque<Integer> path = new ArrayDeque<>();
        dfs(candidates, 0, len, target, path, res);
        return res;
    }

    private void dfs(int[] candidates, int begin, int len, int target, Deque<Integer> path, List<List<Integer>> res) {
        if (target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = begin; i < len; i++) {
            if (target - candidates[i] < 0) {
                break;
            }

            path.addLast(candidates[i]);
            System.out.println("递归之前 => " + path + "，剩余 = " + (target - candidates[i]));

            dfs(candidates, i, len, target - candidates[i], path, res);
            path.removeLast();
            System.out.println("递归之后 => " + path);
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] candidates = new int[]{2, 3, 6, 7};
        int target = 7;
        List<List<Integer>> res = solution.combinationSum(candidates, target);
        System.out.println("输出 => " + res);
    }
}
```

打印输出：

```
递归之前 => [2]，剩余 = 5
递归之前 => [2, 2]，剩余 = 3
递归之前 => [2, 2, 2]，剩余 = 1
递归之后 => [2, 2]
递归之前 => [2, 2, 3]，剩余 = 0
递归之后 => [2, 2]
递归之后 => [2]
递归之前 => [2, 3]，剩余 = 2
递归之后 => [2]
递归之后 => []
递归之前 => [3]，剩余 = 4
递归之前 => [3, 3]，剩余 = 1
递归之后 => [3]
递归之后 => []
递归之前 => [6]，剩余 = 1
递归之后 => []
递归之前 => [7]，剩余 = 0
递归之后 => []
输出 => [[2, 2, 3], [7]]
```

可以很清楚地看到有「剪枝」的代码考虑的路径数会更少一些。
