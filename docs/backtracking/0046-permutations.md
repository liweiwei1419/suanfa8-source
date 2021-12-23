---
title: 「力扣」第 46 题：全排列（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 深度优先遍历
  - 递归
  - 树形问题
---

+ 题目链接：[46. 全排列](https://leetcode-cn.com/problems/permutations/)

## 题目描述

给定一个不含重复数字的数组 `nums` ，返回其 **所有可能的全排列** 。你可以 **按任意顺序** 返回答案。

**示例 1：**

```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**示例 2：**

```
输入：nums = [0,1]
输出：[[0,1],[1,0]]
```

**示例 3：**

```
输入：nums = [1]
输出：[[1]]
```

 **提示：**

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有整数 **互不相同**

## 思路分析

体会回溯的方法在求解排列问题中的应用，掌握使用数组记录每次走过的路的技巧，体会在这样的过程中状态重置的意义。

首先画出这个问题的树形结构。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200219095002354.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x3X3Bvd2Vy,size_16,color_FFFFFF,t_70)

+ 所有符合条件的结点在这棵递归树的叶子结点；
+ 使用深度优先遍历（DFS）或者广度优先遍历（BFS）遍历这棵递归树，在叶子结点处添加符合题意的一个结果，发现使用 BFS 编码较难。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200219095026148.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x3X3Bvd2Vy,size_16,color_FFFFFF,t_70)

+ 使用 DFS 可以使用递归方法，借助方法栈完成，即**传递的参数通过递归方法的方法栈进行传递，而不用手动编写栈和结点类，把结点类需要的变量通过递归方法的参数进行传递即可**；
+ **树的每一个结点表示解决这个问题处在了哪一个阶段，我们使用不同的变量进行区分**，这些变量叫做“状态变量”；
+ 而**深度优先遍历有一个回退的过程**，在回退的时候，所有的“状态”需要和第一次来到这个结点的时候相同，因此这里需要做“状态重置”（或者称“恢复变量”、“撤销选择”），这是深搜称之为“回溯算法”的原因。

::: danger 注意

深度优先遍历作为搜索遍历的方法，其思想也是很朴素且深刻的，深搜表现出一种“不撞南墙不回头”的特点。具体的行为是：完成一件事情有多个阶段，在每一个阶段有多种选择，先走其中一个，然后实在走不下去了，再回退到上一个结点继续下一个选择；

回到上一个结点的步骤就称之为“回溯”，在“回溯”的时候必须保证回到之前刚来到这个结点的状态，这叫做“状态重置”；

大家想一想在电影《大话西游》里月光宝盒的作用，正是因为月光宝盒有“回到过去”，将所有的一切恢复到之前的样子的功能，至尊宝才能做出最正确的选择；

在人类的世界里没有“月光宝盒”，但是**在计算机的世界里，“状态重置”是很容易实现的，因此我们可以使用一份状态变量完成所有状态的搜索，只把符合特定条件的“状态”保存下来，作为结果集，这就是“回溯算法”能成为强大的搜索算法的原因**。

:::

需要设计的状态变量有：递归树到了第几层（已经使用了几个数），从根结点到叶子结点的路径（即一个全排列），哪些数是否使用过。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> permute(int[] nums) {
        int len = nums.length;

        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        boolean[] used = new boolean[len];

        // 由于只在结尾操作，因此是一个栈，Java 的 Stack 类建议使用 Deque 作为栈的实现
        Deque<Integer> path = new ArrayDeque<>(len);
        
        // 由于是深搜，深搜需要使用栈，而写递归方法就可以把状态变量设计成递归方法参数
        dfs(nums, len, 0, path, used, res);
        return res;
    }


    /**
     * @param nums  候选数组
     * @param len   冗余变量，作为参数传递不用每次都从 nums 中读取 length 属性值
     * @param depth 冗余变量，作为参数传递不用每次都从 path 中调用 size() 方法
     * @param path  从根结点到叶子结点的路径
     * @param used  记录当前结点已经使用了哪些元素，这些元素都在 path 变量中
     * @param res   结果集
     */
    private void dfs(int[] nums, int len, int depth,
                     Deque<Integer> path, boolean[] used,
                     List<List<Integer>> res) {
        if (depth == len) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < len; i++) {
            if (used[i]) {
                continue;
            }

            used[i] = true;
            path.addLast(nums[i]);

            dfs(nums, len, depth + 1, path, used, res);
            // 此处是回退的过程，发生状态重置（撤销选择），代码与 dfs 是对称出现的

            path.removeLast();
            used[i] = false;
        }
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        def dfs(nums, size, depth, path, state, res):
            if depth == size:
                res.append(path)
                return

            for i in range(size):
                if ((state >> i) & 1) == 0:
                    dfs(nums, size, depth + 1, path + [nums[i]], state ^ (1 << i), res)

        size = len(nums)
        if size == 0:
            return []

        state = 0
        res = []
        dfs(nums, size, 0, [], state, res)
        return res
```
</CodeGroupItem>
</CodeGroup>

**说明**：即使是这样一个简单的回溯搜索算法，这里面也有比较多的细节需要注意。

## 思考以下问题：

1、为什么需要状态重置，不重置是否可以？

2、在最后 `if (depth == len) ` 这一步，为什么要套一层 `new ArrayList<>(path)`，这与 Java 和 Python 的方法传递机制相关，**请读者一定要搞清楚这里的细节**；

3、广搜能不能实现，可以尝试写一下广搜（知道广搜不好写的原因即可，不一定真的写出来），对比与深搜算法的不同；

4、为什么要设计 `used` 数组，不使用 `used` 数组会带来什么变化，搜索会更快吗？

5、如果会 Python 的朋友，比较一下在给出的 Python 代码与 Java 代码的不同之处。

在这里为了节约篇幅，突出重点和思想，就不展开叙述了。更多的细节（包括复杂度分析）可以参考我在「力扣」第 46 题：“全排列”问题下写的题解：[从全排列问题开始理解“回溯搜索”算法](https://leetcode-cn.com/problems/permutations/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liweiw/)。

::: danger 提示
+ 回溯算法本质上得通过遍历，因此复杂度一般不低，但是再一些问题我们可以通过在搜索中判断哪些结点一定不会得到符合题意的结果，而跳过某一个分支的遍历，这样的操作犹如在一棵树上剪去一个枝叶，因此称之为「剪枝」；
+ 「剪枝」的思想其实也很朴素、常见。就像我们在人生道路上，如果能够知道当前某个选择不能达到目标，应该及时停止，不继续投入时间和精力，这就是「剪枝」操作。
:::

第 46 题的扩展问题就是一个运用到剪枝操作的问题。