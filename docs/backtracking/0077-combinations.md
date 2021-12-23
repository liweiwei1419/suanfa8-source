---
title: 「力扣」第 77 题：组合（中等）
icon: yongyan
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 剪枝
---

+ 题目链接：[77. 组合](https://leetcode-cn.com/problems/combinations/)；

+ 题解链接：[回溯算法 + 剪枝（Java）](https://leetcode-cn.com/problems/combinations/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-ma-/)。

## 题目描述

给定两个整数 `n` 和 `k`，返回范围 `[1, n]` 中所有可能的 `k` 个数的组合。

你可以按 **任何顺序** 返回答案。



**示例 1：**

```
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

**示例 2：**

```
输入：n = 1, k = 1
输出：[[1]]
```



 **提示：**

- `1 <= n <= 20`
- `1 <= k <= n`

---

**重点概括**：

+ 如果解决一个问题有多个步骤，每一个步骤有多种方法，题目又要我们找出所有的方法，可以使用回溯算法；
+ 回溯算法是在一棵树上的 **深度优先遍历**（**因为要找所有的解，所以需要遍历**）；
+ 组合问题，相对于排列问题而言，不计较一个组合内元素的顺序性（即 `[1, 2, 3]` 与 `[1, 3, 2]` 认为是同一个组合），因此很多时候需要按某种顺序展开搜索，这样才能做到不重不漏。

---

回溯算法首先需要画出递归树，不同的树决定了不同的代码实现。下面给出了两种画树的思路。


### 方法一：根据搜索起点画出二叉树

既然是树形问题上的 深度优先遍历，因此首先画出树形结构。例如输入：`n = 4, k = 2`，我们可以发现如下递归结构：

1. 如果组合里有 `1` ，那么需要在 `[2, 3, 4]` 里再找 $1$ 个数；
2. 如果组合里有 `2` ，那么需要在 `[3, 4]` 里再找 $1$数。注意：这里不能再考虑 $1$，因为包含 $1$ 的组合，在第 1 种情况中已经包含。

依次类推（后面部分省略），以上描述体现的 **递归** 结构是：在以 $n$ 结尾的候选数组里，选出若干个元素。画出递归结构如下图：

![image.png](https://pic.leetcode-cn.com/1599488203-TzmCXb-image.png)

**说明**：

+ 叶子结点的信息体现在从根结点到叶子结点的路径上，因此需要一个表示路径的变量 `path`，它是一个列表，特别地，`path` 是一个栈；
+ 每一个结点递归地在做同样的事情，区别在于搜索起点，因此需要一个变量 `start` ，表示在区间 `[begin, n]` 里选出若干个数的组合；
+ 可能有一些分支没有必要执行，我们放在优化中介绍。


友情提示：对于这一类问题，**画图帮助分析**是非常重要的解题方法。


**参考代码 1**：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        if (k <= 0 || n < k) {
            return res;
        }
        // 从 1 开始是题目的设定
        Deque<Integer> path = new ArrayDeque<>();
        dfs(n, k, 1, path, res);
        return res;
    }

    private void dfs(int n, int k, int begin, Deque<Integer> path, List<List<Integer>> res) {
        // 递归终止条件是：path 的长度等于 k
        if (path.size() == k) {
            res.add(new ArrayList<>(path));
            return;
        }

        // 遍历可能的搜索起点
        for (int i = begin; i <= n; i++) {
            // 向路径变量里添加一个数
            path.addLast(i);
            // 下一轮搜索，设置的搜索起点要加 1，因为组合数理不允许出现重复的元素
            dfs(n, k, i + 1, path, res);
            // 重点理解这里：深度优先遍历有回头的过程，因此递归之前做了什么，递归之后需要做相同操作的逆向操作
            path.removeLast();
        }
    }
}
```

提交结果：

![image.png](https://pic.leetcode-cn.com/1599521293-vIfJMM-image.png){:width="500px"}


如果对于回溯算法还理解不太透彻的朋友，可以在递归方法的前后，把 `path` 变量打印出来看一下，并结合上面画出的树形图进行理解。

**参考代码 2**：（调试代码）

注意：带 `System.out.println` 的调试语句不可以提交给力扣测评系统，会拖慢我们的程序执行时间。

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        if (k <= 0 || n < k) {
            return res;
        }
        Deque<Integer> path = new ArrayDeque<>();
        dfs(n, k, 1, path, res);
        return res;
    }

    private void dfs(int n, int k, int begin, Deque<Integer> path, List<List<Integer>> res) {
        if (path.size() == k) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = begin; i <= n; i++) {
            path.addLast(i);
            System.out.println("递归之前 => " + path);
            dfs(n, k, i + 1, path, res);
            path.removeLast();
            System.out.println("递归之后 => " + path);
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int n = 5;
        int k = 3;
        List<List<Integer>> res = solution.combine(n, k);
        System.out.println(res);
    }
}
```

控制台输出：
```
递归之前 => [1]
递归之前 => [1, 2]
递归之前 => [1, 2, 3]
递归之后 => [1, 2]
递归之前 => [1, 2, 4]
递归之后 => [1, 2]
递归之前 => [1, 2, 5]
递归之后 => [1, 2]
递归之后 => [1]
递归之前 => [1, 3]
递归之前 => [1, 3, 4]
递归之后 => [1, 3]
递归之前 => [1, 3, 5]
递归之后 => [1, 3]
递归之后 => [1]
递归之前 => [1, 4]
递归之前 => [1, 4, 5]
递归之后 => [1, 4]
递归之后 => [1]
递归之前 => [1, 5]
递归之后 => [1]
递归之后 => []
递归之前 => [2]
递归之前 => [2, 3]
递归之前 => [2, 3, 4]
递归之后 => [2, 3]
递归之前 => [2, 3, 5]
递归之后 => [2, 3]
递归之后 => [2]
递归之前 => [2, 4]
递归之前 => [2, 4, 5]
递归之后 => [2, 4]
递归之后 => [2]
递归之前 => [2, 5]
递归之后 => [2]
递归之后 => []
递归之前 => [3]
递归之前 => [3, 4]
递归之前 => [3, 4, 5]
递归之后 => [3, 4]
递归之后 => [3]
递归之前 => [3, 5]
递归之后 => [3]
递归之后 => []
递归之前 => [4]
递归之前 => [4, 5]
递归之后 => [4]
递归之后 => []
递归之前 => [5]
递归之后 => []
[[1, 2, 3], [1, 2, 4], [1, 2, 5], [1, 3, 4], [1, 3, 5], [1, 4, 5], [2, 3, 4], [2, 3, 5], [2, 4, 5], [3, 4, 5]]
```

说明：对于回溯算法还比较陌生的朋友，可以参考我的题解 《[回溯算法入门级详解 + 练习（持续更新）](https://leetcode-cn.com/problems/permutations/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liweiw/)》。


---

### 优化：分析搜索起点的上界进行剪枝

我们上面的代码，搜索起点遍历到 `n`，即：递归函数中有下面的代码片段：

```Java []
// 从当前搜索起点 begin 遍历到 n
for (int i = begin; i <= n; i++) {
    path.addLast(i);
    dfs(n, k, i + 1, path, res);
    path.removeLast();
}
```

事实上，如果 `n = 7, k = 4`，**从 $5$ 开始搜索就已经没有意义了**，这是因为：即使把 $5$ 选上，后面的数只有 $6$ 和 $7$，一共就 $3$ 个候选数，凑不出 $4$ 个数的组合。因此，**搜索起点有上界**，这个上界是多少，可以举几个例子分析。

分析搜索起点的上界，其实是在深度优先遍历的过程中剪枝，剪枝可以避免不必要的遍历，剪枝剪得好，可以大幅度节约算法的执行时间。


下面的图片绿色部分是剪掉的枝叶，当 `n` 很大的时候，能少遍历很多结点，节约了时间。

（温馨提示：右键，在弹出的下拉列表框中选择「在新标签页中打开图片」，可以查看大图。）

![image.png](https://pic.leetcode-cn.com/3ddd55697423b5831cbbd42f4b901ebbade0daa456c651a70c758fe359d8a0d1-image.png)




容易知道：搜索起点和当前还需要选几个数有关，而当前还需要选几个数与已经选了几个数有关，即与 `path` 的长度相关。我们举几个例子分析：


例如：`n = 6 ，k = 4`。

`path.size() == 1` 的时候，接下来要选择 $3$ 个数，搜索起点最大是 $4$，最后一个被选的组合是 `[4, 5, 6]`；  
`path.size() == 2` 的时候，接下来要选择 $2$ 个数，搜索起点最大是 $5$，最后一个被选的组合是 `[5, 6]`；  
`path.size() == 3` 的时候，接下来要选择 $1$ 个数，搜索起点最大是 $6$，最后一个被选的组合是 `[6]`；  

再如：`n = 15` ，`k = 4`。 
`path.size() == 1` 的时候，接下来要选择 $3$ 个数，搜索起点最大是 $13$，最后一个被选的是 `[13, 14, 15]`；  
`path.size() == 2` 的时候，接下来要选择 $2$ 个数，搜索起点最大是 $14$，最后一个被选的是 `[14, 15]`；  
`path.size() == 3` 的时候，接下来要选择 $1$ 个数，搜索起点最大是 $15$，最后一个被选的是 `[15]`；  

可以归纳出：

```
搜索起点的上界 + 接下来要选择的元素个数 - 1 = n
```

其中，接下来要选择的元素个数 `= k - path.size()`，整理得到：

```
搜索起点的上界 = n - (k - path.size()) + 1
```

所以，我们的剪枝过程就是：把 `i <= n` 改成  `i <= n - (k - path.size()) + 1` ： 

**参考代码 3**：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        if (k <= 0 || n < k) {
            return res;
        }
        Deque<Integer> path = new ArrayDeque<>();
        dfs(n, k, 1, path, res);
        return res;
    }

    private void dfs(int n, int k, int index, Deque<Integer> path, List<List<Integer>> res) {
        if (path.size() == k) {
            res.add(new ArrayList<>(path));
            return;
        }

        // 只有这里 i <= n - (k - path.size()) + 1 与参考代码 1 不同
        for (int i = index; i <= n - (k - path.size()) + 1; i++) {
            path.addLast(i);
            dfs(n, k, i + 1, path, res);
            path.removeLast();
        }
    }
}
```

提交结果：

![image.png](https://pic.leetcode-cn.com/1599521361-EnIUyy-image.png){:width="500px"}



**说明**：

+ 一些边界条件比较绕的，用具体的例子分析就不容易出错，主要考察的是细心，没有太多技巧；
+ 为参考代码 3 添加 `path` 的打印输出语句，可以看到输出语句会更少。

```
递归之前 => [1]
递归之前 => [1, 2]
递归之前 => [1, 2, 3]
递归之后 => [1, 2]
递归之前 => [1, 2, 4]
递归之后 => [1, 2]
递归之前 => [1, 2, 5]
递归之后 => [1, 2]
递归之后 => [1]
递归之前 => [1, 3]
递归之前 => [1, 3, 4]
递归之后 => [1, 3]
递归之前 => [1, 3, 5]
递归之后 => [1, 3]
递归之后 => [1]
递归之前 => [1, 4]
递归之前 => [1, 4, 5]
递归之后 => [1, 4]
递归之后 => [1]
递归之后 => []
递归之前 => [2]
递归之前 => [2, 3]
递归之前 => [2, 3, 4]
递归之后 => [2, 3]
递归之前 => [2, 3, 5]
递归之后 => [2, 3]
递归之后 => [2]
递归之前 => [2, 4]
递归之前 => [2, 4, 5]
递归之后 => [2, 4]
递归之后 => [2]
递归之后 => []
递归之前 => [3]
递归之前 => [3, 4]
递归之前 => [3, 4, 5]
递归之后 => [3, 4]
递归之后 => [3]
递归之后 => []
[[1, 2, 3], [1, 2, 4], [1, 2, 5], [1, 3, 4], [1, 3, 5], [1, 4, 5], [2, 3, 4], [2, 3, 5], [2, 4, 5], [3, 4, 5]]
```

---

## 方法二：按照每一个数选与不选画出二叉树


受 [@elegant-pike](/u/elegant-pike/) 朋友的启发，代码请见 [这里](https://leetcode-cn.com/problems/combinations/solution/hui-su-suan-fa-jian-zhi-python-dai-ma-java-dai-ma-/581687)。

可以按照每一个数选与不选画出二叉树，二叉树最多 `n` 层。同样可以剪枝。剪枝的思路请见下图「剪枝条件 ② 的加强」。


![image.png](https://pic.leetcode-cn.com/1599529810-ZFNnoz-image.png){:width="600px"}


画一个表格更容易看出边界条件。

![image.png](https://pic.leetcode-cn.com/1599608961-nfzexs-image.png){:width="500px"}





**参考代码 4**：

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> res = new ArrayList<>();
        if (k <= 0 || n < k) {
            return res;
        }

        // 为了防止底层动态数组扩容，初始化的时候传入最大长度
        Deque<Integer> path = new ArrayDeque<>(k);
        dfs(1, n, k, path, res);
        return res;
    }

    private void dfs(int begin, int n, int k, Deque<Integer> path, List<List<Integer>> res) {
        if (k == 0) {
            res.add(new ArrayList<>(path));
            return;
        }

        // 基础版本的递归终止条件：if (begin == n + 1) {
        if (begin > n - k + 1) {
            return;
        }
        // 不选当前考虑的数 begin，直接递归到下一层
        dfs(begin + 1, n, k, path, res);

        // 不选当前考虑的数 begin，递归到下一层的时候 k - 1，这里 k 表示还需要选多少个数
        path.addLast(begin);
        dfs(begin + 1, n, k - 1, path, res);
        // 深度优先遍历有回头的过程，因此需要撤销选择
        path.removeLast();
    }
}
```





