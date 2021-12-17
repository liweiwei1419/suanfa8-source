---
title: 「力扣」第 378 题：有序矩阵中第 K 小的元素
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

+  [题目链接](https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/) （中等）


## 题目描述

给你一个 `n x n` 矩阵 `matrix` ，其中每行和每列元素均按升序排序，找到矩阵中第 `k` 小的元素。

请注意，它是 **排序后** 的第 `k` 小元素，而不是第 `k` 个 **不同** 的元素。

**示例 1：**

```
输入：matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
输出：13
解释：矩阵中的元素为 [1,5,9,10,11,12,13,13,15]，第 8 小元素是 13
```

**示例 2：**

```
输入：matrix = [[-5]], k = 1
输出：-5
```

**提示：**

- `n == matrix.length`
- `n == matrix[i].length`
- `1 <= n <= 300`
- $-10^9 \le matrix[i][j] \le  10^9$
- 题目数据 **保证** `matrix` 中的所有行和列都按 **非递减顺序** 排列
- `1 <= k <= n^2`

::: danger 提示
解决这道问题需要解决「力扣」 [240. 搜索二维矩阵 II](/problems/search-a-2d-matrix-ii/) 和二分查找算法的「二分答案」的经验。
:::



## 思路分析

如果要找一个 **有确定范围** 的 **整数**，可以考虑使用二分查找算法。

二分查找先猜一个数 `a` ，然后遍历整个矩阵：

+ 如果小于等于 `a` 的元素的个数严格小于（`<`）`k` 个，说明猜的这个数太小了，正确的答案比 `a` 大；
+ 如果小于等于 `a` 的元素的个数恰好等于（`=`）`k` 个，说明猜的这个数有可能是正确的答案，但是也有可能不是。**如果不是，正确答案只可能比 `a` 小，但是一定不会比 `a` 大（这一点大家可以举例说明，我们放在题解的最后说）**；
+ 如果小于等于 `a` 的元素的个数严格大于（`>`）`k` 个，说明猜的这个数太大了，正确的答案比 `a` 小。

事实上「遍历」整个数组没有利用到题目中给出的「每行和每列元素均按升序排序」这个条件，根据「力扣」 [240. 搜索二维矩阵 II](/problems/search-a-2d-matrix-ii/) 的经验，我们可以 **从矩阵的「左下角」或者「右上角」开始遍历，以线性的时间复杂度计算出矩阵中小于等于某个数的元素的个数**。


**参考代码 1**：从矩阵的右下角开始找


```java
public class Solution {

    public int kthSmallest(int[][] matrix, int k) {
        int n = matrix.length;
        int left = matrix[0][0];
        int right = matrix[n - 1][n - 1];
        while (left < right) {
            int mid = (left + right) / 2;
            int count = lessEquals(matrix, mid);
            if (count < k) {
                // 下一轮搜索区间在 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索区间在 [left..mid]
                right = mid;
            }
        }
        return left;
    }

    /**
     * 计算小于等于 target 的元素的个数，从矩阵的右下角开始找
     *
     * @param matrix
     * @param target
     * @return
     */
    private int lessEquals(int[][] matrix, int target) {
        int n = matrix.length;
        int i = n - 1;
        int j = 0;
        int count = 0;
        while (i >= 0 && j < n) {
            if (matrix[i][j] <= target) {
                count += i + 1;
                j++;
            } else {
                i--;
            }
        }
        return count;
    }
}
```

**时间复杂度**：$O((matrix[n-1][n-1] - matrix[0][0]) \log n)$。  
这里 $matrix[n-1][n-1] - matrix[0][0]$ 表示二分查找需要猜测的数的范围，每一次猜测需要「看一下矩阵」，「看一下矩阵」的时间复杂度为 $O(n)$。


**参考代码 2**：从矩阵的左上角开始找

```java
public class Solution {

    public int kthSmallest(int[][] matrix, int k) {
        int n = matrix.length;
        int left = matrix[0][0];
        int right = matrix[n - 1][n - 1];
        while (left < right) {
            int mid = (left + right) / 2;
            int count = lessEquals(matrix, mid);
            if (count < k) {
                // 下一轮搜索区间在 [mid + 1..right]
                left = mid + 1;
            } else {
                // 下一轮搜索区间在 [left..mid]
                right = mid;
            }
        }
        return left;
    }

    /**
     * 计算小于等于 target 的元素的个数，从矩阵的左上角开始找
     *
     * @param matrix
     * @param target
     * @return
     */
    private int lessEquals(int[][] matrix, int target) {
        int n = matrix.length;
        int i = 0;
        int j = n - 1;
        int count = 0;
        while (i < n && j >= 0) {
            if (matrix[i][j] <= target) {
                count += j + 1;
                i++;
            } else {
                j--;
            }
        }
        return count;
    }
}
```

**时间复杂度**：（同「参考代码 1」）。



::: info 为什么二分查找得到的结果一定在矩阵中

下面我们解释这句话：如果小于等于 `a` 的元素的个数恰好等于（`=`）`k` 个，说明猜的这个数有可能是正确的答案，但是也有可能不是。如果不是，正确答案只可能比 `a` 小，但是一定不会比 `a` 大。


我们用具体的例子向大家解释：

```
[[1,5,9],[10,11,13],[12,13,15]] 8
```

如果猜到的数字是 $14$，整个数组里小于等于 $14$ 的元素有 $8$ 个，$14$ 有可能是正确答案，有可能不是正确答案（当前这个例子就不是），因此我们不可以直接返回 $14$。

**如果整个数组里小于等于 $13$ 的元素也有 $8$ 个，那么 $13$ 就是正确答案**。接下来我们数一下整个数组里小于等于 $13$ 的元素真的有 $8$ 个，所以 $13$ 才是正确答案。

所以当整个数组里的元素恰好小于等于 $k$ 的时候，至多答案是 `mid`，下一轮搜索区间在 `[left..mid]` ，此时设置 `right = mid`。
:::


