---
title: 「力扣」第 47 题：全排列 II（中等）
icon: shipin
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
---

- 题目链接：[47. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)；
- 题解链接：[回溯搜索 + 剪枝（Java、Python）（含视频讲解）](https://leetcode-cn.com/problems/permutations-ii/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liwe-2/)。

::: danger 视频讲解
:tv: 这道题在 [题解](https://leetcode-cn.com/problems/permutations-ii/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liwe-2) 和 [B 站](https://www.bilibili.com/video/BV147411A7Yq?p=1) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=90222159&bvid=BV147411A7Yq&cid=154085652&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

给定一个可包含重复数字的序列 `nums` ，**按任意顺序** 返回所有不重复的全排列。

**示例 1：**

```
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**示例 2：**

```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**提示：**

- `1 <= nums.length <= 8`
- `-10 <= nums[i] <= 10`

## 解题思路

这一题在「力扣」第 46 题： [全排列](https://leetcode-cn.com/problems/permutations/) 的基础上增加了 **序列中的元素可重复** 这一条件，但要求：返回的结果又不能有重复元素。

思路是：在遍历的过程中，一边遍历一遍检测，**在一定会产生重复结果集的地方剪枝**。

---

一个比较容易想到的办法是在结果集中去重。但是问题来了，这些结果集的元素是一个又一个列表，对列表去重不像用哈希表对基本元素去重那样容易。

如果要比较两个列表是否一样，一个容易想到的办法是对列表分别排序，然后逐个比对。既然要排序，我们就可以 **在搜索之前就对候选数组排序**，一旦发现某个分支搜索下去可能搜索到重复的元素就停止搜索，这样结果集中不会包含重复列表。

画出树形结构如下：重点想象深度优先遍历在这棵树上执行的过程，哪些地方遍历下去一定会产生重复，这些地方的状态的特点是什么？
对比图中标注 ① 和 ② 的地方。相同点是：这一次搜索的起点和上一次搜索的起点一样。不同点是：

- 标注 ① 的地方上一次搜索的相同的数刚刚被撤销；
- 标注 ② 的地方上一次搜索的相同的数刚刚被使用。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2toflruy3j219w0ogdkc.jpg)

产生重复结点的地方，正是图中标注了「剪刀」，且被绿色框框住的地方。

大家也可以把第 2 个 `1` 加上 `'` ，即 `[1, 1', 2]` 去想象这个搜索的过程。只要遇到起点一样，就有可能产生重复。这里还有一个很细节的地方：

- 在图中 ② 处，搜索的数也和上一次一样，但是上一次的 `1` 还在使用中；
- **在图中 ① 处，搜索的数也和上一次一样，但是上一次的 `1` 刚刚被撤销，正是因为刚被撤销，下面的搜索中还会使用到，因此会产生重复，剪掉的就应该是这样的分支**。

代码实现方面，在第 46 题的基础上，要加上这样一段代码：

```java
if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
    continue;
}
```

这段代码就能检测到标注为 ① 的两个结点，跳过它们。注意：这里 `used[i - 1]` 不加 `!`，测评也能通过。有兴趣的朋友可以想一想这是为什么。建议大家做这样几个对比实验：

- 干脆就不写 `!used[i - 1]` 结果是什么样？
- 写 `used[i - 1]` 结果是什么，代码又是怎样执行的。这里给出的结论是：`!used[i - 1]` 这样的剪枝更彻底。附录会分析原因。

**参考代码 1**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

public class Solution {

    public List<List<Integer>> permuteUnique(int[] nums) {
        int len = nums.length;
        List<List<Integer>> res = new ArrayList<>();
        if (len == 0) {
            return res;
        }

        // 排序（升序或者降序都可以），排序是剪枝的前提
        Arrays.sort(nums);

        boolean[] used = new boolean[len];
        // 使用 Deque 是 Java 官方 Stack 类的建议
        Deque<Integer> path = new ArrayDeque<>(len);
        dfs(nums, len, 0, used, path, res);
        return res;
    }

    private void dfs(int[] nums, int len, int depth, boolean[] used, Deque<Integer> path, List<List<Integer>> res) {
        if (depth == len) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < len; ++i) {
            if (used[i]) {
                continue;
            }

            // 剪枝条件：i > 0 是为了保证 nums[i - 1] 有意义
            // 写 !used[i - 1] 是因为 nums[i - 1] 在深度优先遍历的过程中刚刚被撤销选择
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
                continue;
            }

            path.addLast(nums[i]);
            used[i] = true;

            dfs(nums, len, depth + 1, used, path, res);
            // 回溯部分的代码，和 dfs 之前的代码是对称的
            used[i] = false;
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

    def permuteUnique(self, nums: List[int]) -> List[List[int]]:

        def dfs(nums, size, depth, path, used, res):
            if depth == size:
                res.append(path.copy())
                return
            for i in range(size):
                if not used[i]:

                    if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                        continue

                    used[i] = True
                    path.append(nums[i])
                    dfs(nums, size, depth + 1, path, used, res)
                    used[i] = False
                    path.pop()

        size = len(nums)
        if size == 0:
            return []

        nums.sort()

        used = [False] * len(nums)
        res = []
        dfs(nums, size, 0, [], used, res)
        return res
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：（理由同第 46 题，重复元素越多，剪枝越多。但是计算复杂度的时候需要考虑最差情况。）

- 时间复杂度：$O(N \times N!)$，这里 $N$ 为数组的长度；
- 空间复杂度：$O(N \times N!)$。

## 补充说明

::: danger 提示

这部分内容不太重要，只要理解上面深搜是怎么剪枝的就行）

:::

**写 `used[i - 1]` 代码正确，但是不推荐的原因。**

思路是根据深度优先遍历的执行流程，看一看那些状态变量（布尔数组 `used`）的值。

1、如果剪枝写的是：

```Java []
if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
    continue;
}
```

那么，对于数组 `[1, 1’, 1’’, 2]`，回溯的过程如下：

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tofp117ej20xw0hudin.jpg)

得到的全排列是：`[[1, 1', 1'', 2], [1, 1', 2, 1''], [1, 2, 1', 1''], [2, 1, 1', 1'']]`。特点是：`1`、`1'`、`1''` 出现的顺序只能是 `1`、`1'`、`1''`。

2、如果剪枝写的是：

```Java []
if (i > 0 && nums[i] == nums[i - 1] && used[i - 1]) {
    continue;
}
```

那么，对于数组 `[1, 1’, 1’’, 2]`，回溯的过程如下（因为过程稍显繁琐，所以没有画在一张图里）：

（1）先选第 1 个数字，有 4 种取法。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tofs73i0j21ey0d4gnt.jpg)

（2）对第 1 步的第 1 个分支，可以继续搜索，但是发现，没有搜索到合适的叶子结点。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tofvvvhzj21h00u0ae9.jpg)

（3）对第 1 步的第 2 个分支，可以继续搜索，但是同样发现，没有搜索到合适的叶子结点。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tog0qke6j21mm0scq71.jpg)

（4）对第 1 步的第 3 个分支，继续搜索发现搜索到合适的叶子结点。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tog5g76tj218l0u0n16.jpg)

（5）对第 1 步的第 4 个分支，继续搜索发现搜索到合适的叶子结点。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tog8nevpj21m00rktd8.jpg)

因此，`used[i - 1]` 前面加不加感叹号的区别仅在于保留的是相同元素的顺序索引，还是倒序索引。**很明显，顺序索引（即使用 `!used[i - 1]` 作为剪枝判定条件得到）的递归树剪枝更彻底，思路也相对较自然**。
