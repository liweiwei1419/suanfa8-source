---
title: 「力扣」第 240 题：搜索二维矩阵 II（中等）
icon: yongyan
category: 分治算法
tags:
  - 分治算法
---

+ 题目链接：[240. 搜索二维矩阵 II](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)；
+ 题解链接：[排除法（不是什么新方法，就是你们最常看到的那个解法，从右下角、左上角开始）（Python 代码、Java 代码）](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/solution/er-fen-fa-pai-chu-fa-python-dai-ma-java-dai-ma-by-/)。

## 题目描述


传送门：

> 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
>
> 每行的元素从左到右升序排列。
> 每列的元素从上到下升序排列。
> 示例:
>
> 现有矩阵 matrix 如下：
>
> [
>   [1,   4,  7, 11, 15],
>   [2,   5,  8, 12, 19],
>   [3,   6,  9, 16, 22],
>   [10, 13, 14, 17, 24],
>   [18, 21, 23, 26, 30]
> ]
> 给定 target = 5，返回 true。
>
> 给定 target = 20，返回 false。
>
> 
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode-cn.com/problems/search-a-2d-matrix-ii
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 排除法（不是什么新方法，就是你们最常看到的那个解法，从右下角、左上角开始）（Python 代码、Java 代码）


**思路分析**：


这道题比较容易想到的是还继续利用矩阵中的行和列有序的特性，使用二分查找法。思路不止一种，我也尝试写过，后来发现：编写二分查找法要考虑的边界问题比较多，如果对二分查找掌握得不熟练，很可能会出错。

下面介绍的这个方法，我认为是最优解，虽然它的时间复杂度并不是最优。


+ 如果我们要用二分查找法，可以发现，如果一行的开头那个元素就比目标元素大，那么这一行的所有元素，以及行号大于这一行的元素都不在考虑的范围内。

+ 我们首先尝试从左上角开始走，发现横着走数值增大，竖着走数值也增大，目标数值这在两个方向上都有可能存在。那如果我们从右上角或者左下角除法，找目标元素，那就不一样了，于是有了下面的“排除法”。

### 方法：排除法

1、如果选择左下角为起点

可以绘图如下：

![0240-lower-left-corner.gif](https://pic.leetcode-cn.com/4510e2eb3e1c68f28040bc920f5ec3959a5ee89d012d7df5c21aa8a4f039e3e2-0240-lower-left-corner.gif)


总结出“搜索”的规律是：

如果当前数比目标元素小，当前列就不可能存在目标值，“指针”就向右移一格（纵坐标加 $1$）；  
如果当前数比目标元素大，当前行就不可能存在目标值，“指针”就向上移一格（横坐标减 $1$）。

在编码的过程中要注意数组下标越界的问题。

**参考代码**：

Python 代码：

```Python []
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
```

Java 代码：

```Java []
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

    public static void main(String[] args) {
        int[][] matrix = {
                {1, 4, 7, 11, 15},
                {2, 5, 8, 12, 19},
                {3, 6, 9, 16, 22},
                {10, 13, 14, 17, 24},
                {18, 21, 23, 26, 30}
        };
        int target = 12;
        Solution solution = new Solution();
        boolean searchMatrix = solution3.searchMatrix(matrix, target);
        System.out.println(searchMatrix);
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(M + N)$，$M$ 是这个矩阵的行数，$N$ 是这个矩阵的列数，我们看到，这种算法是“不回头”的，至多走 $M + N$ 步就能搜索到目标数值，或者判定目标数值在矩阵中不存子啊。
+ 空间复杂度：$O(1)，算法使用了常数个变量$。

2、如果选择右上角为起点

可以绘图如下：

![0240-top-right-corner.gif](https://pic.leetcode-cn.com/939fa5d769027cfd688b84423dbf93ec5696774dc576bf286c2267ea3c17a230-0240-top-right-corner.gif)

总结出“搜索”的规律是：

如果当前数比目标元素大，当前列就不可能存在目标值，“指针”就向左移一格（纵坐标减 $1$）；  
如果当前数比目标元素小，当前行就不可能存在目标值，“指针”就向下移一格（横坐标加 $1$）。

在编码的过程中同样要注意数组下标越界的问题。

**参考代码**：

```Python []
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
```
```Java []
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

    public static void main(String[] args) {
        int[][] matrix = {
                {1, 4, 7, 11, 15},
                {2, 5, 8, 12, 19},
                {3, 6, 9, 16, 22},
                {10, 13, 14, 17, 24},
                {18, 21, 23, 26, 30}
        };
        int target = 10;
        Solution solution = new Solution();
        boolean searchMatrix = solution2.searchMatrix(matrix, target);
        System.out.println(searchMatrix);
    }
}
```


**复杂度分析**：

（同上）。

说明：这个搜索的过程也可以使用二分查找法加快，时间复杂度收缩到 $O(\log M + long N) = O(\log MN)$，但是在编码的时候会稍显麻烦，还要考虑一些边界条件，我就不展示自己写的又臭又长的代码了。如果大家有更优雅的写法，欢迎分享出来。





