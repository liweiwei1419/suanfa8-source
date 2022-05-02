---
title: 「力扣」第 275 题：H 指数 II（中等）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

![0275](https://tva1.sinaimg.cn/large/008i3skNgy1gx93fac2tcj30p00an74m.jpg)

- 题目链接：[275. H 指数 II](https://leetcode-cn.com/problems/h-index-ii/)；
- 题解链接：[二分查找猜论文篇数（Java）](https://leetcode-cn.com/problems/h-index-ii/solution/jian-er-zhi-zhi-er-fen-cha-zhao-by-liweiwei1419-2/)。

## 题目描述

给你一个整数数组 `citations` ，其中 `citations[i]` 表示研究者的第 `i` 篇论文被引用的次数，`citations` 已经按照 **升序排列** 。计算并返回该研究者的 **`h` 指数**。

[h 指数的定义](https://baike.baidu.com/item/h-index/3991452?fr=aladdin)：h 代表“高引用次数”（high citations），一名科研人员的 h 指数是指他（她）的 （`n` 篇论文中）**总共**有 `h` 篇论文分别被引用了**至少** `h` 次。且其余的 _`n - h`_ 篇论文每篇被引用次数 **不超过** _`h`_ 次。

**提示：**如果 `h` 有多种可能的值，**`h` 指数** 是其中最大的那个。

请你设计并实现对数时间复杂度的算法解决此问题。

**示例 1：**

```
输入：citations = [0,1,3,5,6]
输出：3
解释：给定数组表示研究者总共有 5 篇论文，每篇论文相应的被引用了 0, 1, 3, 5, 6 次。
由于研究者有 3 篇论文每篇 至少 被引用了 3 次，其余两篇论文每篇被引用 不多于 3 次，所以她的 h 指数是 3 。
```

**示例 2：**

```
输入：citations = [1,2,100]
输出：2
```

**提示：**

- `n == citations.length`
- `1 <= n <= 105`
- `0 <= citations[i] <= 1000`
- `citations` 按 **升序排列**

::: danger 友情提示
这题题意比较难理解，本题解已经花了很多篇幅解释题意，请读者有一些耐心阅读。
:::

## 理解题意

这道问题理解题意要花很长时间，一个有效的办法就是仔细研究示例，然后去理解题目的意思。我真正明白题目的意思是看到这句描述：

> 例如：某人的 h 指数是 20，这表示他已发表的论文中，每篇被引用了至少 20 次的论文总共有 20 篇。

所以 h 指数是 20 表示：**引用次数大于等于 20 的文章数量最少是 20 篇**。

再来理解一下题目中给出的定义：

> 1. **`N` 篇论文中总共有 `h` 篇论文分别被引用了至少 `h` 次**；
> 2. **其余的 `N - h` 篇论文每篇被引用次数不超过 `h` 次**。

h 指数想说的是这样一件事情，一个人的论文根据被引用的次数，有一个阈值（分水岭，就是这里的 `h`），引用次数大于等于这个阈值的论文是「高引用论文」。所以可以把一个研究者的论文被引用的次数 **按照升序排序**（这一点是题目给出的前提，很重要）。题目其实要我们找的是一条分割线，这条分割线的含义是：分割线右边的所有论文的引用次数都很高。重要的事情说 3 遍：

- h 指数是 **论文数量**，不是引用次数。
- h 指数是 **论文数量**，不是引用次数。
- h 指数是 **论文数量**，不是引用次数。

所以分割线满足的条件是：**分割线右边的最少引用次数 >= 分割线右边的论文篇数**。**题目要求返回的是论文数量**。

再看看题目的示例：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxdr86nz0qj30ru0didgn.jpg" alt="image.png" style="zoom:50%;" />

这个例子有点儿特殊，论文被引用了 $3$ 次，篇数有 $3$ 篇。再来看一个更一般的例子：

<img src="https://tva1.sinaimg.cn/large/e6c9d24egy1h1a9l9ethhj20wg0by756.jpg" alt="image.png" style="zoom:50%;" />

**结论**：这条分割线越靠左边，说明被引用的次数很多，文章还很多，h 指数越高。

在有序数组中查找一个位置，可以使用二分查找。

---

上面着重号的部分：分割线右边的最少引用次数 >= 分割线右边的论文篇数。

二分查找就是在区间 `[left..right]` 任意猜测一个位置 `mid`，看看下一轮应该往左边找还是往右边找。

这一类问题做得多了，可以总结出一个规律，题目要找的是「分割线右边的最少引用次数 >= 分割线右边的论文篇数」，可以对这个条件取反，写 `if` 和 `else` 语句不容易出错（详细叙述可以参考 [题解](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)）。

**情况 1**：如果 「分割线右边的最少引用次数 < 分割线右边的论文篇数」，这一点可以看示例 `[0,| 1, 3, 5, 6]`，猜测有 4 篇论文最少引用次数为 4 ，但是分割线右边的最小引用次数才为 1，说明分割线太靠左了。下一轮应该往右边找，因此下一轮搜索区间为 `[mid + 1..right]` ，此时设置 `left = mid + 1`。

**情况 2**：剩下的部分就是「分割线右边的最少引用次数 >= 分割线右边的论文篇数」，它肯定在区间 `[left..mid]` 里，此时设置 `right = mid`。

**参考代码**：

```java
import java.util.Arrays;

public class Solution {

    public int hIndex(int[] citations) {
        int len = citations.length;
        Arrays.sort(citations);

        // 特殊判断
        if (citations[len - 1] == 0) {
            return 0;
        }
        // 二分查找猜测论文的数量，需要满足：分割线右边的最少引用次数 >= 分割线右边的论文篇数
        int left = 0;
        int right = len - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            // citations[mid] 表示分割线右边的文章的最少引用的次数
            if (citations[mid] < len - mid) {
                // 下一轮搜索区间 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索区间 [left..mid]
                right = mid;
            }
        }
        return len - left;
    }
}
```

**说明**：

- `while (left < right)` 与 ` left = mid + 1`、`right = mid;` 配合使用表示退出循环以后有 `left == right` 成立；
- `citations[mid]` 表示分割线右边的最少的被引用文章的引用次数；
- `len - mid` 表示分割线右边的文章数量；
- 退出循环以后，`mid` 就来到了合适的位置，题目要返回的是论文篇数，所以需要返回 `len - left`；
- 特殊判断 `citations[len - 1] == 0` 表示如果全部文章的引用次数都为 $0$，则 h 指数为 $0$；
- 初始化 `int right = len - 1;` 这是因为分割线最右也只能在 `len - 1` 的左边，如下图所示：

<img src="https://tva1.sinaimg.cn/large/008i3skNgy1gxdr90ug6ij31040bggm1.jpg" alt="image.png" style="zoom:50%;" />

或者从代码层面上理解，`citations[len]` 会越界。

- 可以翻到英文题面，最后有给数据范围，所以不单独判断数组是否为空，
- `int mid = (left + right) / 2;` 写成这样是因为题目给出的数据范围不会使得 `left + right` 越界。

**复杂度分析**：

- 时间复杂度：$O(N\log N)$，主要耗时在排序上；
- 空间复杂度：$O(1)$，只使用了常数个变量。
