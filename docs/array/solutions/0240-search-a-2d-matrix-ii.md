---
title: 「力扣」第 240 题：搜索二维矩阵 II（中等）
icon: yongyan
category: 分治算法
tags:
  - 分治算法
---

- 题目链接：[240. 搜索二维矩阵 II](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)；
- 题解链接：[减而治之、二分查找](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/solution/er-fen-fa-pai-chu-fa-python-dai-ma-java-dai-ma-by-/)。

## 题目描述

编写一个高效的算法来搜索 `*m* x *n*` 矩阵 `matrix` 中的一个目标值 `target` 。该矩阵具有以下特性：

- 每行的元素从左到右升序排列。
- 每列的元素从上到下升序排列。

**示例 1：**

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2toatyu0bj20b60b63yu.jpg)

```
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
输出：true
```

**示例 2：**

![img](https://tva1.sinaimg.cn/large/e6c9d24egy1h2toaw5ilij20b60b6wet.jpg)

```
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
输出：false
```

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= n, m <= 300`
- $-10^9 \le matrix[i][j] \le 10^9$
- 每行的所有元素从左到右升序排列
- 每列的所有元素从上到下升序排列
- $-10^9 \le target \le 10^9$

## 思路分析

这道题比较容易想到的是还继续利用矩阵中的行和列有序的特性，使用二分查找法。下面介绍的这个方法，我认为是最优解，虽然它的时间复杂度并不是最优。

- 如果我们要用二分查找法，可以发现，如果一行的开头那个元素就比目标元素大，那么这一行的所有元素，以及行号大于这一行的元素都不在考虑的范围内。

- 我们首先尝试从左上角开始走，发现横着走数值增大，竖着走数值也增大，目标数值这在两个方向上都有可能存在。那如果我们从右上角或者左下角除法，找目标元素，那就不一样了，于是有了下面的“排除法”。

## 方法一：减而治之

1、如果选择左下角为起点，以下展示了「减治」的过程。

![0240-lower-left-corner.gif](https://tva1.sinaimg.cn/large/e6c9d24egy1h2toazbe5pg21hc0u0jvw.gif)

总结出搜索的规律是：

- 如果当前数比目标元素小，当前列就不可能存在目标值，「指针」就向右移一格（纵坐标加 $1$）；
- 如果当前数比目标元素大，当前行就不可能存在目标值，「指针」就向上移一格（横坐标减 $1$）。

在编码的过程中要注意数组下标越界的问题。

**参考代码 1**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public boolean searchMatrix(int[][] matrix, int target) {
        int rows = matrix.length;
        if (rows == 0) {
            return false;
        }
        int cols = matrix[0].length;
        if (cols == 0) {
            return false;
        }


        // 起点：左下角
        int x = rows - 1;
        int y = 0;
        // 不越界的条件是：行大于等于 0，列小于等于 cols - 1
        while (x >= 0 && y < cols) {
            // 打开注释，可以用于调试的代码
            // System.out.println("沿途走过的数字：" + matrix[x][y]);
            if (matrix[x][y] > target) {
                x--;
            } else if (matrix[x][y] < target) {
                y++;
            } else {
                return true;
            }
        }
        return false;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution:
    def searchMatrix(self, matrix, target):
        # 特判
        rows = len(matrix)
        if rows == 0:
            return False

        cols = len(matrix[0])
        if cols == 0:
            return False

        # 起点：左下角
        x = rows - 1
        y = 0
        # 不越界的条件是：行大于等于 0，列小于等于 cols - 1

        while x >= 0 and y < cols:
            if matrix[x][y] > target:
                x -= 1
            elif matrix[x][y] < target:
                y += 1
            else:
                return True
        return False
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(M + N)$，$M$ 是这个矩阵的行数，$N$ 是这个矩阵的列数，我们看到，这种算法是 **不回头** 的，至多走 $M + N$ 步就能搜索到目标数值，或者判定目标数值在矩阵中不存在；
- 空间复杂度：$O(1)$，算法使用了常数个变量。

2、如果选择右上角为起点，以下展示了「减治」的过程。

![0240-top-right-corner.gif](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tob25z2hg21hc0u0aei.gif)

总结出「搜索」的规律是：

- 如果当前数比目标元素大，当前列就不可能存在目标值，「指针』就向左移一格（纵坐标减 $1$）；
- 如果当前数比目标元素小，当前行就不可能存在目标值，「指针」就向下移一格（横坐标加 $1$）。

在编码的过程中同样要注意数组下标越界的问题。

**参考代码 2**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public boolean searchMatrix(int[][] matrix, int target) {
        // 特判
        int rows = matrix.length;
        if (rows == 0) {
            return false;
        }
        int cols = matrix[0].length;
        if (cols == 0) {
            return false;
        }

        // 起点：右上角
        int x = 0;
        int y = cols - 1;

        // 不越界的条件是：行小于等于 rows - 1，列大于等于 0
        while (x < rows && y >= 0) {
            // 打开注释，可以用于调试的代码
            // System.out.println("沿途走过的数字：" + matrix[x][y]);
            if (matrix[x][y] > target) {
                y--;
            } else if (matrix[x][y] < target) {
                x++;
            } else {
                return true;
            }
        }
        return false;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution:
    def searchMatrix(self, matrix, target):
        # 特判
        rows = len(matrix)
        if rows == 0:
            return False

        cols = len(matrix[0])
        if cols == 0:
            return False

        # 起点：右上
        x = 0
        y = cols -1

        # 不越界的条件是：行小于等于 rows - 1，列大于等于 0
        while x < rows and y >= 0:
            if matrix[x][y] > target:
                y -= 1
            elif matrix[x][y] < target:
                x += 1
            else:
                return True
        return False
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

（同上）。

说明：这个搜索的过程也可以使用二分查找法加快，时间复杂度优化到 $O(\log M + long N) = O(\log MN)$，但是在编码的时候会稍显麻烦。

## 方法二：二分查找

二分查找的思想是沿着对角线，行查找一下，列查找一下，如下图。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tob5lii0j20we0lcmzk.jpg)

事实上，因为对角线元素的右下方（包括对角线所在的那一行和那一列）的元素都大于等于对角线元素，因此对角线元素也存在一个最大索引，也可以用二分查找定位。

**参考代码 3**：
<br>

```Java []
public class Solution {

    private int diagonalBinarySearch(int[][] matrix, int diagonal, int target) {
        int left = 0;
        int right = diagonal;
        while (left < right) {
            int mid = (left + right) >>> 1;
            if (matrix[mid][mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }

    // 下面两个二分查找没有使用模板，因为只是找一个数，而不是找这个数的边界
    // 用教科书上的二分查找法更简单

    private boolean rowBinarySearch(int[][] matrix, int begin, int cols, int target) {
        int left = begin;
        int right = cols;

        while (left <= right) {
            int mid = (left + right) / 2;
            if (matrix[begin][mid] == target) {
                return true;
            } else if (matrix[begin][mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }

    private boolean colBinarySearch(int[][] matrix, int begin, int rows, int target) {
        // 这里可以 + 1
        int left = begin + 1;
        int right = rows;

        while (left <= right) {
            int mid = (left + right) / 2;
            if (matrix[mid][begin] == target) {
                return true;
            } else if (matrix[mid][begin] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }

    public boolean searchMatrix(int[][] matrix, int target) {
        // 特判
        int rows = matrix.length;
        if (rows == 0) {
            return false;
        }
        int cols = matrix[0].length;
        if (cols == 0) {
            return false;
        }


        int minVal = Math.min(rows, cols);
        // 沿着对角线搜索第 1 个大于等于 target 的数的索引
        int index = diagonalBinarySearch(matrix, minVal - 1, target);
        if (matrix[index][index] == target) {
            return true;
        }

        // 沿着对角线朝两边搜索
        for (int i = 0; i <= index; i++) {
            // 行搜索传入列总数 - 1
            boolean rowSearch = rowBinarySearch(matrix, i, cols - 1, target);
            // 列搜索传入行总数 - 1
            boolean colSearch = colBinarySearch(matrix, i, rows - 1, target);

            if (rowSearch || colSearch) {
                return true;
            }
        }
        return false;
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(\min(M, N)(\log M + \log N))$，$M$ 是这个矩阵的行数，$N$ 是这个矩阵的列数。$\min(M, N)$ 是主对角线上元素的个数。
- 空间复杂度：$O(1)$，算法使用了常数个变量。
