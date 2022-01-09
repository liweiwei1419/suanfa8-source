---
title: 「力扣」第 52 题：N-Queens II（困难）
icon: yongyan
category: 位运算
tags:
  - 回溯算法
  - 位运算
---


+ 题目链接：[52. N皇后 II](https://leetcode-cn.com/problems/n-queens-ii/description/)；
+ 题解链接：[根据第 46 题“全排列”的“回溯算法”思路使用位图作为状态](https://leetcode-cn.com/problems/n-queens-ii/solution/gen-ju-di-46-ti-quan-pai-lie-de-hui-su-suan-fa-s-2/)。

## 题目描述

*n* 皇后问题研究的是如何将 *n* 个皇后放置在 *n*×*n* 的棋盘上，并且使皇后彼此之间不能相互攻击。

![LeetCode 第 52 题：N-Queens II](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/8-queens.png)



上图为 8 皇后问题的一种解法。

给定一个整数 *n*，返回 *n* 皇后不同的解决方案的数量。

**示例:**

```
输入: 4
输出: 2
解释: 4 皇后问题存在如下两个不同的解法。
[
[".Q..",  // 解法 1
"...Q",
"Q...",
"..Q."],

["..Q.",  // 解法 2
"Q...",
"...Q",
".Q.."]
]
```

---

## 方法一：根据第 46 题“全排列”的“回溯算法”思路使用位图作为状态

**思路分析**：

本思路是基于根据我为 [「力扣」第 51 题：“N皇后”](https://leetcode-cn.com/problems/n-queens/) 编写的题解 [《根据第 46 题“全排列”的“回溯算法”思路编写“N 皇后”问题（Java）》](https://leetcode-cn.com/problems/n-queens/solution/gen-ju-di-46-ti-quan-pai-lie-de-hui-su-suan-fa-si-/) ，该题解详细介绍了本思路的由来。如果没有看过的朋友建议看一下。

因为不需要生成棋盘，即不需要得到具体的 `[1, 2, ..., n]` 的一个全排列，因此我们可以舍去数组 `nums` 的生成，只使用行、主对角线、副对角线三个辅助变量完成 N 皇后问题所有可能性的计算。

**参考代码 1**：

```Java []
public class Solution {

    private int count = 0;

    public int totalNQueens(int n) {
        if (n == 0) {
            return 0;
        }

        int col = 0;
        int master = 0;
        int slave = 0;

        backtrack(0, n, col, master, slave);
        return this.count;
    }


    private void backtrack(int row, int n,
                           int col,
                           int master,
                           int slave) {

        if (row == n) {
            this.count++;
            return;
        }

        // 针对每一列，尝试是否可以放置
        for (int i = 0; i < n; i++) {
            if (((col >> i) & 1) == 0
                    && ((master >> (row + i)) & 1) == 0
                    && ((slave >> (row - i + n - 1)) & 1) == 0) {
                col ^= (1 << i);
                master ^= (1 << (row + i));
                slave ^= (1 << (row - i + n - 1));

                backtrack(row + 1, n, col, master, slave);

                slave ^= (1 << (row - i + n - 1));
                master ^= (1 << (row + i));
                col ^= (1 << i);
            }
        }
    }

}
```
```Python []
class Solution:
    count = 0

    def totalNQueens(self, n: int) -> int:
        if n == 0:
            return 0

        col = 0
        master = 0
        slave = 0

        self.__backtrack(0, n, col, master, slave)
        return self.count

    def __backtrack(self, row, n, col, master, slave):
        if row == n:
            self.count += 1
            return
        for i in range(n):
            if ((col >> i) & 1 == 0) \
                    and ((master >> (row + i)) & 1 == 0) \
                    and ((slave >> (row - i + n - 1)) & 1 == 0):
                col ^= (1 << i)
                master ^= (1 << (row + i))
                slave ^= (1 << (row - i + n - 1))
                self.__backtrack(row + 1, n, col, master, slave)
                slave ^= (1 << (row - i + n - 1))
                master ^= (1 << (row + i))
                col ^= (1 << i)
```

下面介绍一种我在网络上搜索到的方法（反正我是想不到的），该方法可以说把位图的性质应用得非常透彻了。

## 方法二：“不回溯”并且充分利用二进制位图的思想和二进制技巧


我们想一下，方法一还有哪些地方可以快一点？

+ 回溯：因为我们并不关心具体棋盘的生成，所以其实“回溯”是没有必要的，只要递归能走到第 n 层，就表示搜索到一个棋盘；
+ 在 `for` 循环中一个位置一个位置遍历探测可以放置的位置太慢了，既然我们用到二进制位图，有 [「力扣」第 191 题：“位 1 的个数”](https://leetcode-cn.com/problems/number-of-1-bits) 的经验，即使用 `n & (n - 1)` 可以很快消去一个数的二进制表示的最低位的那个 1，类似的技巧就可以应用在这一题；具体请看我在参考代码 2 中的注释。


**参考代码 2**：

注意 1：下面的写法中国 `master`、`slave` 的二进制表示中为 `1` 的数位表示“从左向右”的数的这个位置已经有“皇后”占位了。因此我们 只需要它们的低 n 位即可，不要和方法 1 的 `2 * n -1` 混淆，它们的意义不一样。 

注意 2：二进制数数位是“从右向左”，而我们数组的数位是“从左向右”，明确这一点，就能比较好地理解 `(master | p) << 1` 这个操作；

注意 3：`n & (-n)` 保留了一个数的二进制表示最低位的 1 和它右边的所有的 0，这一点可以在纸上举例理解；

注意 4：“状态”重置在这个方法里是“隐式”的，因为基本数值变量在方法传递的时候是“值传递”，因此传递到下一层都是“复制”，每一个方法的“状态”变量可以认为都是新的，因此没有必要“重置”；

注意 5：如果参考代码 2 当中还有没有解释清楚的地方，可以看下面这张图理解。

![image.png](https://pic.leetcode-cn.com/f1fde7f97a71b14dfba7dad44e07d3612f715427da86c792ef9a6e90da1360c9-image.png){:width=300}
{:align=center}


```Java []
public class Solution {

    private int count = 0;

    public int totalNQueens(int n) {
        if (n == 0) {
            return 0;
        }

        int col = 0;
        int master = 0;
        int slave = 0;

        backtrack(0, n, col, master, slave);
        return this.count;
    }


    private void backtrack(int row, int n,
                           int col,
                           int master,
                           int slave) {
        if (row == n) {
            // 已经排出了 n 个数，结算
            this.count++;
            return;
        }

        // 第 1 步：col | master | slave，将列、主对角线、副对角线上的已经放置的元素做一次合并
        // 很可能 col、master、slave 三个位置都被占（如上图），这不要紧，我们只关心没有被占的位置
        // 第 2 步：我们关心的是 0，但是探测 1 容易，因此，让 0 变 1 ， 1 变 0
        // 由此带来一个问题，高位 0 全变成 1 了，因此引入第 3 步
        // 第 3 步：& (1 << n) - 1) 是只取低 n 位，1 << n 表示第 n + 1 位是 1 ，低 n 位全是 0
        // 这里 mask 中 1 表示可以放置的位置，0 表示不能放置的位置
        int mask = (~(col | master | slave) & (1 << n) - 1);
        while (mask > 0) { // 只有有位置为 1 ，表示至少有 1 个元素可以放置
            // 找到从低位到高位（从右向左）第 1 个二进制位为 1 的数
            // 这个操作保留了 1 和后面的 0
            int p = mask & (-mask);

            // col | p 表示占住这一列
            // (master | p) << 1 表示下一行右边的那个位置（主对角线方向）被占，
            // 因为位运算占位的操作是从右边向左边，因此需要左移
            // 同理理解 (slave | p) >> 1)

            // 注意：该方法是隐式回溯，基本数值类型在方法传递的时候是值传递，相当于完成了状态重置
            backtrack(row + 1, n, col | p, (master | p) << 1, (slave | p) >> 1);
            
            // 把低位的第 1 个 1 变成 0 ，让下一层循环探测下一个 1
            mask &= (mask - 1);
        }
    }
}
```

---

**参考代码**：

Java 代码：

```java
import java.util.Stack;

public class Solution {

    private boolean[] marked;
    private int count;

    public int totalNQueens(int n) {
        if (n == 0 || n == 1) {
            return n;
        }
        int[] board = new int[n];
        for (int i = 0; i < n; i++) {
            board[i] = i;
        }
        permuta(board);
        return count;
    }

    // 生成一个 [0,1,...,n-1] 的全排列
    private void permuta(int[] board) {
        int len = board.length;
        marked = new boolean[len];
        Stack<Integer> pre = new Stack<>();
        findPermutation(board, 0, len, pre);
    }

    private void findPermutation(int[] board, int usedCount, int len, Stack<Integer> pre) {
        if (usedCount == len) {
            // 判断是否是符合要求的棋盘布局
            if (noDanger(pre, len)) {
                count++;
            }
            return;
        }

        for (int i = 0; i < len; i++) {
            if (!marked[i]) {
                marked[i] = true;
                pre.push(board[i]);
                findPermutation(board, usedCount + 1, len, pre);
                marked[i] = false;
                pre.pop();
            }

        }
    }

    private boolean noDanger(Stack<Integer> pre, int len) {
        int[] board = new int[len];
        for (int i = 0; i < len; i++) {
            board[i] = pre.get(i);
        }
        for (int i = 0; i < len - 1; i++) {
            for (int j = i + 1; j < len; j++) {
                // 得到所有不同的 i j 的组合，是一个组合问题，按顺序来就行
                // System.out.println(i + "\t" + j);
                if (i - j == board[i] - board[j]) {
                    return false;
                }
                if (i - j == -(board[i] - board[j])) {
                    return false;
                }
            }

        }
        // 走到这里表示通过检验
        // System.out.println(Arrays.toString(board));
        return true;
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int totalNQueens = solution.totalNQueens(8);
        System.out.println(totalNQueens);
    }
}
```

