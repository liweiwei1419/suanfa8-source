---
title: 「力扣」第 220 题： 存在重复元素 III（中等）
icon: yongyan
category: 二分搜索树
tags:
  - 二分搜索树
  - 滑动窗口
---


+ 题目地址：[220. 存在重复元素 III](https://leetcode-cn.com/problems/contains-duplicate-iii/)；
+ 题解地址：[暴力解法、滑动窗口（二叉搜索树）](https://leetcode-cn.com/problems/contains-duplicate-iii/solution/hua-dong-chuang-kou-er-fen-sou-suo-shu-zhao-shang-/)。

## 题目描述

给你一个整数数组 `nums` 和两个整数 `k` 和 `t` 。请你判断是否存在 **两个不同下标** `i` 和 `j`，使得 `abs(nums[i] - nums[j]) <= t` ，同时又满足 `abs(i - j) <= k` 。

如果存在则返回 `true`，不存在返回 `false`。

**示例 1：**

```
输入：nums = [1,2,3,1], k = 3, t = 0
输出：true
```

**示例 2：**

```
输入：nums = [1,0,1,1], k = 1, t = 2
输出：true
```

**示例 3：**

```
输入：nums = [1,5,9,1,5,9], k = 2, t = 3
输出：false
```



**提示：**

- $0 \le nums.length \le 2 * 10^4$
- $-2^{31} \le nums[i] \le 2^{31} - 1$
- $0 \le k \le 10^4$
- $0 \le t \le 2^{31} - 1$

## 题意分析

题目让我们找出：**在数组 `nums[i]` 中，在任意有效区间 `[i..i + k]` 里是否存在两个数的绝对值小于等于 `t`**，存在则返回 `true`，不存在返回 `false`。存在性问题，找到符合题意的「数据对」即可返回 `true`，所有可能的情况都看完以后，都没有找到才返回 `false`。

### 方法一：暴力解法（超时）

枚举所有长度小于等于 `k + 1` 的「下标对」 `（i, j）`，只要发现 `nums[i] - nums[j]` 的绝对值小于 `t` ，就返回 `true`。

**参考代码 1**：

```Java []
public class Solution {

    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        int len = nums.length;
        if (len == 0 || k <= 0 || t < 0) {
            return false;
        }

        for (int i = 0; i < len; i++) {
            for (int j = i + 1; j < len; j++) {
                // 注意：nums[j] - nums[i] 的结果可能会整型溢出，因此运算之前需要转换成 long 类型
                if (Math.abs(j - i) <= k && Math.abs((long) nums[j] - (long) nums[i]) <= t) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N^2)$，这里数组的长度为 $N$，枚举可能的数对 $(i, j)$ 。
+ 空间复杂度：$O(1)$。

优化的思路是：**空间换时间**，这里的空间还需要有比较大小的功能，比较容易想到的数据结构是二叉搜索树（方法二会说理由）。

---

### 方法二：滑动窗口 + 二叉搜索树

题目有两个不确定的因素：

+ 两个不同位置下标的差的绝对值小于等于 $k$；
+ 两个不同位置的数值的差的绝对值小于等于 $t$。

暴力解法同时考虑了两个因素，在遍历数组的过程中没有记录下有用的信息。相比于两个不同位置的数值，下标的值是容易掌握的。于是我们可以 **维护长度为 $k + 1$ 的滑动窗口**，把滑动窗口滑过的元素加入一个数据结构，把滑动窗口滑出的元素移出数据结构。（滑动窗口的长度是 `k + 1`，但是真正数据结构里保存的元素个数可能是 `k` 也可能是 `k + 1`，取决于先插入新元素，还是先移除旧元素，这里不展开叙述了。）


我们把题目意思翻译一下：在数组 `nums[i]` 中，在任意长度大于等于 $2$ 的区间 `[i..i + k]` 里是否存在两个数的绝对值小于等于 `t`，即 

$$
|nums[i] - nums[j] | <= t
$$

去掉绝对值符号 

$nums[i] - nums[j] <= t$ （不等式 1）

并且 

$nums[i] - nums[j] >= -t$ （不等式 2）。

可以把 `nums[i]` 看作新遍历到的元素，把 `nums[j]` 看作当前在滑动窗口中的元素。


根据（不等式 1）得：

$$
nums[i] - t \le nums[j]
$$

根据（不等式 2）得：

$$
nums[i] + t \ge nums[j]
$$

由此我们可以得到：如果在滑动窗口中能够找到一个元素 $nums[j]$，它的值大于等于 $nums[i] - t$（条件 1），并且还要小于等于 $nums[i] + t$（条件 2）。

滑动窗口中可以有很多个元素的值满足「条件 1」，为了能够找同时满足两个条件的合适的 $nums[j]$，由于「条件 2」中 $nums[i] - t$ 的值是固定的，为了让「条件 2」有更多的可能性成立，「条件 1」找到的 $nums[j]$ 需要尽可能小，这件事情等价于找到大于等于 $nums[i] - t$ 的最小的值，即找到 $nums[i] - t$ 的最小上界。

---

### 为什么使用二分搜索树

**理由 1**：由于维护的是固定长度的一系列数，除了最开始的几个数添加进数据结构以外。

+ 当程序看到下标为 $k + 1$ 的元素的时候，就需要移除下标为 $0$ 的元素；
+ 当程序看到下标为 $k + 2$ 的元素的时候，就需要移除下标为 $1$ 的元素。


频繁的删除和添加元素，符合条件的数据结构是「查找表」，「查找表」的两种实现分别是「哈希表」和「二分搜索树（红黑树）」。

**理由 2**：根据上面的分析，我们需要找到 $nums[i] - t$ 的最小上界，「哈希表」是不维护元素顺序性的，而「二分搜索树」恰好维护了顺序性，是当前场景下合适的数据结构。

Java 的 `ceiling(key)` 函数提供了这样的功能：返回大于等于 `key` 的最小元素，如果不存在，返回空。下面的是这个函数的文档（通过 Intellij IDEA 查看）。

```Java
/**
  * Returns the least key greater than or equal to the given key,
  * or {@code null} if there is no such key.
  *
  * @param key the key
  * @return the least key greater than or equal to {@code key},
  *         or {@code null} if there is no such key
  * @throws ClassCastException if the specified key cannot be compared
  *         with the keys currently in the map
  * @throws NullPointerException if the specified key is null
  *         and this map does not permit null keys
  */
K ceilingKey(K key);
```

**参考代码 2**：

```Java []
import java.util.TreeSet;

public class Solution {

    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        // 滑动窗口结合查找表，此时滑动窗口即为查找表本身（控制查找表的大小即可控制窗口大小）
        TreeSet<Long> set = new TreeSet<>();
        for (int i = 0; i < nums.length; i++) {
            // 边添加边查找，查找表中是否有大于等于 nums[i] - t 且小于等于 nums[i] + t 的值
            Long ceiling = set.ceiling((long) nums[i] - (long) t);
            if (ceiling != null && ceiling <= ((long) nums[i] + (long) t)) {
                return true;
            }
            // 添加后，控制查找表（窗口）大小，移除窗口最左边元素
            set.add((long) nums[i]);
            if (set.size() == k + 1) {
                set.remove((long) nums[i - k]);
            }
        }
        return false;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N\log K)$，遍历数组使用 $O(N)$，在遍历的同时向二叉搜索树中插入元素和移除元素的时间复杂度是 $O(\log K)$。
+ 空间复杂度：$O(K)$。

另一种写法：在一开始就把滑动窗口左边的元素删除。

**参考代码 3**：

```Java []
import java.util.TreeSet;

public class Solution {

    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        int len = nums.length;
        // 特判
        if (len == 0 || k <= 0 || t < 0) {
            return false;
        }

        TreeSet<Long> set = new TreeSet<>();

        for (int i = 0; i < len; i++) {
            if (i > k) {
                set.remove((long) nums[i - k - 1]);
            }

            Long ceiling = set.ceiling((long) nums[i] - (long) t);
            if (ceiling != null && ceiling <= (long) nums[i] + (long) t) {
                return true;
            }

            set.add((long) nums[i]);
        }
        return false;
    }
}
```


**复杂度分析**：（同上）

---

备份：

### 「力扣」第 220 题：Contains Duplicate |||

提示：滑动窗口 + 查找表，这里的查找表是能查询上界和下界的 BST。

Java 代码：滑动窗口 + 查找表，这里的查找表是能查询上界和下界的 BST。

```java
class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        // 特判
        int len = nums.length;
        if (len == 0 || k <= 0 || t < 0) {
            return false;
        }
        TreeSet<Integer> treeSet = new TreeSet<>();
        for (int i = 0; i < len; i++) {
            // 大于等于 nums[i] 的最小数
            Integer ceiling = treeSet.ceiling(nums[i]);
            if (ceiling != null && (long) ceiling - (long) nums[i] <= t) {
                return true;
            }
            // 小于等于 nums[i] 的最大数
            Integer floor = treeSet.floor(nums[i]);
            if (floor != null && (long) nums[i] - (long) floor <= t) {
                return true;
            }
            treeSet.add(nums[i]);
            if (i >= k) {
                treeSet.remove(nums[i - k]);
            }
        }
        return false;
    }
}
```

### LeetCode 第 220 题：存在重复元素 III    

传送门：[220. 存在重复元素 III](https://leetcode-cn.com/problems/contains-duplicate-iii/)。

> 给定一个整数数组，判断数组中是否有两个不同的索引 *i* 和 *j*，使得 **nums [i]** 和 **nums [j]** 的差的绝对值最大为 *t*，并且 *i* 和 *j* 之间的差的绝对值最大为 *ķ*。
>
> **示例 1:**
>
> ```
> 输入: nums = [1,2,3,1], k = 3, t = 0
> 输出: true
> ```
>
> **示例 2:**
>
> ```
> 输入: nums = [1,0,1,1], k = 1, t = 2
> 输出: true
> ```
>
> **示例 3:**
>
> ```
> 输入: nums = [1,5,9,1,5,9], k = 2, t = 3
> 输出: false
> ```

Java 代码：滑动窗口 + 查找表，这里的查找表是能查询上界和下界的 BST。

```java
class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        int len = nums.length;
        if (len == 0 || k <= 0 || t < 0) {
            return false;
        }
        TreeSet<Integer> treeSet = new TreeSet<>();
        for (int i = 0; i < len; i++) {
            // 大于等于 nums[i] 的最小数
            Integer ceiling = treeSet.ceiling(nums[i]);
            if (ceiling != null && (long) ceiling - (long) nums[i] <= t) {
                return true;
            }
            // 小于等于 nums[i] 的最大数
            Integer floor = treeSet.floor(nums[i]);
            if (floor != null && (long) nums[i] - (long) floor <= t) {
                return true;
            }
            treeSet.add(nums[i]);
            if (i >= k) {
                treeSet.remove(nums[i - k]);
            }
        }
        return false;
    }
}
```

参考资料：

1、https://blog.csdn.net/qq_20141867/article/details/82024222

使用有序字典。

2、Python 代码，使用自己实现的 BST：https://leetcode.com/problems/contains-duplicate-iii/discuss/174416/Python-balanced-BST-solution

（本节完）



