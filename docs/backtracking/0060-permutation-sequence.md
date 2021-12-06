---
title: 「力扣」第 60 题：第 k 个排列（中等）
date: 2018-02-23 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 14：回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 字符串
permalink: leetcode-solution/0060-permutation-sequence
---

## 「力扣」第 60 题：第 k 个排列（中等）

+ [链接](https://leetcode-cn.com/problems/permutation-sequence/)
+ [题解链接](https://leetcode-cn.com/problems/permutation-sequence/solution/hui-su-jian-zhi-python-dai-ma-java-dai-ma-by-liwei/)

> 给出集合 `[1, 2, 3, …, n]`，其所有元素共有 $n!$ 种排列。
>
> 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
>
> 1. `"123"`
> 2. `"132"`
> 3. `"213"`
> 4. `"231"`
> 5. `"312"`
> 6. `"321"`
>
> 给定 `n` 和 `k`，返回第 `k` 个排列。
>
> 说明：
>
> 给定 `n` 的范围是 $[1, 9]$。
> 给定 `k` 的范围是$[1,  n!]$。
>
> 示例 1：
>
> ```
> 输入: n = 3, k = 3
> 输出: "213"
> ```
>
>
> 示例 2：
>
> ```
> 输入: n = 4, k = 9
> 输出: "2314"
> ```

**参考代码 1**：阶乘值直接查表得到。

Java 代码：

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public String getPermutation(int n, int k) {
        int[] nums = new int[n];
        boolean[] used = new boolean[n];
        for (int i = 0; i < n; i++) {
            nums[i] = i + 1;
            used[i] = false;
        }
        int[] factorial = {1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880};
        List<String> pre = new ArrayList<>();
        return dfs(nums, used, n, k, 0, pre, factorial);
    }

    private String dfs(int[] nums, boolean[] used, int n, int k, int depth, List<String> pre, int[] factorial) {
        if (depth == n) {
            StringBuilder sb = new StringBuilder();
            for (String c : pre) {
                sb.append(c);
            }
            return sb.toString();
        }
        int ps = factorial[n - 1 - depth];
        for (int i = 0; i < n; i++) {
            if (used[i]) {
                continue;
            }
            if (ps < k) {
                k -= ps;
                continue;
            }
            pre.add(nums[i] + "");
            used[i] = true;
            return dfs(nums, used, n, k, depth + 1, pre, factorial);
        }
        // 如果参数正确的话，代码不会走到这里
        throw new RuntimeException("参数错误");
    }
}
```

Python 代码：

```python
class Solution:

    def getPermutation(self, n: int, k: int) -> str:
        if n == 0:
            return []
        nums = [i + 1 for i in range(n)]
        used = [False for _ in range(n)]
        factorial = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]
        return self.__dfs(nums, used, n, k, 0, [], factorial)

    def __dfs(self, nums, used, n, k, depth, pre, factorial):
        if depth == n:
            # 在叶子结点处结算
            return ''.join(pre)
        # 后面的数的全排列的个数
        ps = factorial[n - 1 - depth]
        for i in range(n):
            # 如果这个数用过，就不再考虑
            if used[i]:
                continue
            # 后面的数的全排列的个数小于 k 的时候，执行剪枝操作
            if ps < k:
                k -= ps
                continue
            pre.append(str(nums[i]))
            # 因为直接走到叶子结点，因此状态不用恢复
            used[i] = True
            return self.__dfs(nums, used, n, k, depth + 1, pre, factorial)
```

**复杂度分析：**

+ 时间复杂度：$O({N^2})$，回溯算法的时间复杂度是指数级别的，因为我们使用了大量的剪枝操作，故对于解这道问题是可以接受的。
+ 空间复杂度：$O(N)$，`nums`、`used`、`pre` 都与 $N$ 等长，`factorial` 数组就 $10$ 个数，是常数级别的。

### 方法二：双链表模拟

事实上，上面的过程也可以循环实现，只不过需要借助一个列表，每次选出一个数，就将这个数从列表里面拿出。因为这个列表要支持频繁的删除操作，因此使用双链表，在 Java 中 `LinkedList` 就是使用双链表实现的。

Java 代码：

```java
import java.util.LinkedList;
import java.util.List;

public class Solution {

    public String getPermutation(int n, int k) {
        // 注意：相当于在 n 个数字的全排列中找到索引为 k - 1 的那个数，因此 k 先减 1
        k --;

        int[] factorial = new int[n];
        factorial[0] = 1;
        // 先算出所有的阶乘值
        for (int i = 1; i < n; i++) {
            factorial[i] = factorial[i - 1] * i;
        }

        // 因为要频繁做删除，使用链表
        List<Integer> nums = new LinkedList<>();
        for (int i = 1; i <= n; i++) {
            nums.add(i);
        }

        StringBuilder stringBuilder = new StringBuilder();

        // i 表示剩余的数字个数，初始化为 n - 1
        for (int i = n - 1; i >= 0; i--) {
            int index = k / factorial[i] ;
            stringBuilder.append(nums.remove(index));
            k -= index * factorial[i];
        }
        return stringBuilder.toString();
    }
}
```





