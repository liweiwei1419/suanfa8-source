---
title: 「力扣」第 51 题：N 皇后（困难）
icon: yongyan
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 剪枝
---

+ 题目链接：[51. N 皇后](https://leetcode-cn.com/problems/n-queens/)；
+ 题解链接：[回溯算法（转换成全排列问题 + 剪枝）- 题解后有相关问题](https://leetcode-cn.com/problems/n-queens/solution/gen-ju-di-46-ti-quan-pai-lie-de-hui-su-suan-fa-si-/)。



## 题目描述

传送门：英文网址：[51. N-Queens](https://leetcode.com/problems/n-queens/description/) ，中文网址：[51. N皇后](https://leetcode-cn.com/problems/n-queens/description/) 。

> *n* 皇后问题研究的是如何将 *n* 个皇后放置在 *n*×*n* 的棋盘上，并且使皇后彼此之间不能相互攻击。
>
> ![LeetCode 第 51 题：N 皇后](https://leetcode.com/static/images/problemset/8-queens.png)
>
> 上图为 8 皇后问题的一种解法。
>
> 给定一个整数 *n*，返回所有不同的 *n* 皇后问题的解决方案。
>
> 每一种解法包含一个明确的 *n* 皇后问题的棋子放置方案，该方案中 `'Q'` 和 `'.'` 分别代表了皇后和空位。
>
> **示例:**
>
> ```
> 输入: 4
> 输出: [
> [".Q..",  // 解法 1
> "...Q",
> "Q...",
> "..Q."],
> 
> ["..Q.",  // 解法 2
> "Q...",
> "...Q",
> ".Q.."]
> ]
> 解释: 4 皇后问题存在两个不同的解法。
> ```


---



### 解题思路：
一句话题解：回溯算法是一种遍历算法，以 **深度优先遍历** 的方式尝试所有的可能性。有些教程上也叫「暴力搜索」。回溯算法是 **有方向地** 搜索，区别于多层循环实现的暴力法。

> 许多复杂的、规模较大的问题都可以使用回溯法，有「通用解题方法」的美称。（来自 [百度百科](https://baike.baidu.com/item/%E5%9B%9E%E6%BA%AF%E7%AE%97%E6%B3%95/9258495?fr=aladdin)）

说明：
+ N 皇后问题很多时候作为例题出现在教科书中，可以当做理解回溯算法的例题进行学习；
+ 对于回溯算法还比较陌生的朋友，可以参考我的题解 《[回溯算法入门级详解 + 练习（持续更新）](https://leetcode-cn.com/problems/permutations/solution/hui-su-suan-fa-python-dai-ma-java-dai-ma-by-liweiw/)》。

<br>

---

**思路分析**：以 $4$ 皇后问题为例，它的「搜索」过程如下。大家可以在纸上模拟下面这个过程：

<![幻灯片1.png](https://pic.leetcode-cn.com/1597914538-JMqrTI-%E5%B9%BB%E7%81%AF%E7%89%871.png),![幻灯片2.png](https://pic.leetcode-cn.com/1597914538-ZjQXmZ-%E5%B9%BB%E7%81%AF%E7%89%872.png),![幻灯片3.png](https://pic.leetcode-cn.com/1597914538-tmYgmS-%E5%B9%BB%E7%81%AF%E7%89%873.png),![幻灯片4.png](https://pic.leetcode-cn.com/1597914538-wBTCML-%E5%B9%BB%E7%81%AF%E7%89%874.png),![幻灯片5.png](https://pic.leetcode-cn.com/1597914538-EREunU-%E5%B9%BB%E7%81%AF%E7%89%875.png),![幻灯片6.png](https://pic.leetcode-cn.com/1597914538-OtaRLU-%E5%B9%BB%E7%81%AF%E7%89%876.png),![幻灯片7.png](https://pic.leetcode-cn.com/1597914538-rucjiO-%E5%B9%BB%E7%81%AF%E7%89%877.png),![幻灯片8.png](https://pic.leetcode-cn.com/1597914538-fgPyCK-%E5%B9%BB%E7%81%AF%E7%89%878.png),![幻灯片9.png](https://pic.leetcode-cn.com/1597914538-DMbNDR-%E5%B9%BB%E7%81%AF%E7%89%879.png),![幻灯片10.png](https://pic.leetcode-cn.com/1597914538-frDGXq-%E5%B9%BB%E7%81%AF%E7%89%8710.png),![幻灯片11.png](https://pic.leetcode-cn.com/1597914538-yfroRO-%E5%B9%BB%E7%81%AF%E7%89%8711.png),![幻灯片12.png](https://pic.leetcode-cn.com/1597914538-wpzwVG-%E5%B9%BB%E7%81%AF%E7%89%8712.png),![幻灯片13.png](https://pic.leetcode-cn.com/1597914538-eTNDtj-%E5%B9%BB%E7%81%AF%E7%89%8713.png),![幻灯片14.png](https://pic.leetcode-cn.com/1597914538-AyRRDe-%E5%B9%BB%E7%81%AF%E7%89%8714.png),![幻灯片15.png](https://pic.leetcode-cn.com/1597914538-CTojIY-%E5%B9%BB%E7%81%AF%E7%89%8715.png),![幻灯片16.png](https://pic.leetcode-cn.com/1597914538-mxIubY-%E5%B9%BB%E7%81%AF%E7%89%8716.png),![幻灯片17.png](https://pic.leetcode-cn.com/1597914538-ZnPNRW-%E5%B9%BB%E7%81%AF%E7%89%8717.png),![幻灯片18.png](https://pic.leetcode-cn.com/1597914538-voxIfs-%E5%B9%BB%E7%81%AF%E7%89%8718.png),![幻灯片19.png](https://pic.leetcode-cn.com/1597914538-xyeSxZ-%E5%B9%BB%E7%81%AF%E7%89%8719.png),![幻灯片20.png](https://pic.leetcode-cn.com/1597914538-Gcnqba-%E5%B9%BB%E7%81%AF%E7%89%8720.png),![幻灯片21.png](https://pic.leetcode-cn.com/1597914538-VYBADD-%E5%B9%BB%E7%81%AF%E7%89%8721.png),![幻灯片22.png](https://pic.leetcode-cn.com/1597914538-wfFbbG-%E5%B9%BB%E7%81%AF%E7%89%8722.png),![幻灯片23.png](https://pic.leetcode-cn.com/1597914538-gjhYeV-%E5%B9%BB%E7%81%AF%E7%89%8723.png),![幻灯片24.png](https://pic.leetcode-cn.com/1597914538-dMiyLp-%E5%B9%BB%E7%81%AF%E7%89%8724.png),![幻灯片25.png](https://pic.leetcode-cn.com/1597914538-tJmHAY-%E5%B9%BB%E7%81%AF%E7%89%8725.png),![幻灯片26.png](https://pic.leetcode-cn.com/1597914538-CJPMHD-%E5%B9%BB%E7%81%AF%E7%89%8726.png),![幻灯片27.png](https://pic.leetcode-cn.com/1597914538-zHblmY-%E5%B9%BB%E7%81%AF%E7%89%8727.png),![幻灯片28.png](https://pic.leetcode-cn.com/1597914538-MApsVg-%E5%B9%BB%E7%81%AF%E7%89%8728.png),![幻灯片29.png](https://pic.leetcode-cn.com/1597914538-YtEjVg-%E5%B9%BB%E7%81%AF%E7%89%8729.png),![幻灯片30.png](https://pic.leetcode-cn.com/1597914538-ORsUfU-%E5%B9%BB%E7%81%AF%E7%89%8730.png)>

（早期写的题解配色较差，请大家谅解。）


#### 理解树形结构

先尝试画出递归树，以 $4$ 皇后问题为例，画出的递归树如下：

![image.png](https://pic.leetcode-cn.com/1598117469-RXhjxi-image.png)

搜索的过程蕴含了 **剪枝** 的思想。「剪枝」的依据是：题目中给出的 「N 皇后」 的摆放规则：1、不在同一行；2、不在同一列；3、不在同一主对角线方向上；4、不在同一副对角线方向上。

#### 小技巧：记住已经摆放的皇后的位置

这里记住已经摆放的位置不能像 Flood Fill 一样，简单地使用 `visited` 布尔数组。放置的规则是：一行一行考虑皇后可以放置在哪一个位置上，某一行在考虑某一列是否可以放置皇后的时候，需要根据前面已经放置的皇后的位置。

由于是一行一行考虑放置皇后，摆放的这些皇后肯定不在同一行，为了避免它们在同一列，需要一个长度为 $N$ 的布尔数组 `cols`，已经放置的皇后占据的列，就需要在对应的列的位置标注为 `True`。

#### 考虑对角线（找规律）

下面我们研究一下主对角线或者副对角线上的元素有什么特性。在每一个单元格里写下行和列的 **下标**。

![image.png](https://pic.leetcode-cn.com/1599142979-VEuEDb-image.png)


为了保证至少两个皇后不同时出现在 **同一主对角线方向** 或者 **同一副对角线方向**。检查策略是，只要「检测」到新摆放的「皇后」与已经摆放好的「皇后」冲突，就尝试摆放同一行的下一个位置，到行尾还不能放置皇后，**就退回到上一行**。

可以像全排列 `used` 数组那样，再为 「主对角线（Main diagonal）」 和 「副对角线（Sub diagonal）」 设置相应的 **布尔数组变量**，只要排定一个 「皇后」 的位置，就需要占住对应的位置。

#### 编码

我们使用一个 $1$ 到 $4$ 的排列表示一个 $4 \times 4$ 的棋盘，例如：

![image.png](https://pic.leetcode-cn.com/1599142434-RjIWEI-image.png){:width="500px"}

得到一个符合要求的全排列以后，生成棋盘的代码就很简单了。

**说明**：

+ 将「行状态」、「主对角线状态」、「副对角线状态」 设置为成员变量，以避免递归方法参数冗长（参考代码 2、参考代码 3 类似看待）。至于是否有必要这样做，以后在项目开发中需要遵守项目文档的规定；
+ Java 中 `Stack` 已经废弃，推荐使用 `ArrayDeque`，可以查阅文档。

#### 方法：回溯搜索算法（深度优先遍历）

下面虽然给出了 3 版代码，但都只是在如何记住已经摆放的皇后的位置上做文章，代码结构都一样，大家只看不同的部分就可以了。

**参考代码 1**：
```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    private int n;
    /**
     * 记录某一列是否放置了皇后
     */
    private boolean[] col;
    /**
     * 记录主对角线上的单元格是否放置了皇后
     */
    private boolean[] main;
    /**
     * 记录了副对角线上的单元格是否放置了皇后
     */
    private boolean[] sub;
    private List<List<String>> res;

    public List<List<String>> solveNQueens(int n) {
        res = new ArrayList<>();
        if (n == 0) {
            return res;
        }

        // 设置成员变量，减少参数传递，具体作为方法参数还是作为成员变量，请参考团队开发规范
        this.n = n;
        this.col = new boolean[n];
        this.main = new boolean[2 * n - 1];
        this.sub = new boolean[2 * n - 1];
        Deque<Integer> path = new ArrayDeque<>();
        dfs(0, path);
        return res;
    }

    private void dfs(int row, Deque<Integer> path) {
        if (row == n) {
            // 深度优先遍历到下标为 n，表示 [0.. n - 1] 已经填完，得到了一个结果
            List<String> board = convert2board(path);
            res.add(board);
            return;
        }

        // 针对下标为 row 的每一列，尝试是否可以放置
        for (int j = 0; j < n; j++) {
            if (!col[j] && !main[row - j + n - 1] && !sub[row + j]) {
                path.addLast(j);
                col[j] = true;
                main[row - j + n - 1] = true;
                sub[row + j] = true;


                dfs(row + 1, path);
                sub[row + j] = false;
                main[row - j + n - 1] = false;
                col[j] = false;
                path.removeLast();
            }
        }
    }

    private List<String> convert2board(Deque<Integer> path) {
        List<String> board = new ArrayList<>();
        for (Integer num : path) {
            StringBuilder row = new StringBuilder();
            row.append(".".repeat(Math.max(0, n)));
            row.replace(num, num + 1, "Q");
            board.add(row.toString());
        }
        return board;
    }
}
```

**参考代码 2**：其实已经摆放皇后的列下标、占据了哪一条主对角线、哪一条副对角线也可以使用哈希表来记录。

实际上哈希表底层也是数组，使用哈希表可以不用处理已经占据位置的皇后的主对角线、副对角线的下标偏移问题。

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {

    private Set<Integer> col;
    private Set<Integer> main;
    private Set<Integer> sub;
    private int n;
    private List<List<String>> res;

    public List<List<String>> solveNQueens(int n) {
        this.n = n;
        res = new ArrayList<>();
        if (n == 0) {
            return res;
        }

        col = new HashSet<>();
        main = new HashSet<>();
        sub = new HashSet<>();

        Deque<Integer> path = new ArrayDeque<>();
        dfs(0, path);
        return res;
    }

    private void dfs(int row, Deque<Integer> path) {
        if (row == n) {
            List<String> board = convert2board(path);
            res.add(board);
            return;
        }

        // 针对每一列，尝试是否可以放置
        for (int i = 0; i < n; i++) {
            if (!col.contains(i) && !main.contains(row - i) && !sub.contains(row + i)) {
                path.addLast(i);
                col.add(i);
                main.add(row - i);
                sub.add(row + i);

                dfs(row + 1, path);

                sub.remove(row + i);
                main.remove(row - i);
                col.remove(i);
                path.removeLast();
            }
        }
    }

    private List<String> convert2board(Deque<Integer> path) {
        List<String> board = new ArrayList<>();
        for (Integer num : path) {
            StringBuilder row = new StringBuilder();
            row.append(".".repeat(Math.max(0, n)));
            row.replace(num, num + 1, "Q");
            board.add(row.toString());
        }
        return board;
    }
}
```

**参考代码 3**：搜索问题一般来说复杂度很高，因此在线测评系统的后台测试数据不会很大。因此布尔数组可以只用一个整数来代替（`int` 或者 `long` 根据情况决定），`int` 类型整数等价于一个 $32$ 位布尔数组，`long` 类型整数等价于一个 $64$ 位布尔数组。

使用一个整数代表一个布尔数组，在比较布尔数组所有的位的值是否相等时，只需要 $O(1)$，并且传递参数、复制也是相对方便的。这样的技巧叫做「状态压缩」，动态规划问题里有一类问题就叫做状态压缩 dp（我学不过来了，以后学会了再向大家介绍，请谅解）。

状态压缩的缺点是：编码得很细心，不容易调试。

「力扣」第 1371 题：[每个元音包含偶数次的最长子字符串](https://leetcode-cn.com/problems/find-the-longest-substring-containing-vowels-in-even-counts/)，是每日一题出现过的状态压缩的经典问题，综合使用了很多算法思想和技巧，感兴趣的朋友可以复习一下。


说明：使用 **状态压缩** 技巧，可以完成 「力扣」第 52 题：[「N皇后 II」](https://leetcode-cn.com/problems/n-queens-ii/)。

```Java []
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Solution {

    private List<List<String>> res;
    private int n;

    public List<List<String>> solveNQueens(int n) {
        this.n = n;
        res = new ArrayList<>();
        if (n == 0) {
            return res;
        }

        int col = 0;
        int main = 0;
        int sub = 0;
        Deque<Integer> path = new ArrayDeque<>();

        dfs(0, col, main, sub, path);
        return res;
    }

    private void dfs(int row, int col, int sub, int main, Deque<Integer> path) {
        if (row == n) {
            List<String> board = convert2board(path);
            res.add(board);
            return;
        }

        // 针对每一列，尝试是否可以放置
        for (int i = 0; i < n; i++) {
            if (((col >> i) & 1) == 0 
                    && ((main >> (row - i + n - 1)) & 1) == 0 
                    && ((sub >> (row + i)) & 1) == 0) {
                path.addLast(i);
                col ^= (1 << i);
                main ^= (1 << (row - i + n - 1));
                sub ^= (1 << (row + i));

                dfs(row + 1, col, sub, main, path);

                sub ^= (1 << (row + i));
                main ^= (1 << (row - i + n - 1));
                col ^= (1 << i);
                path.removeLast();
            }
        }
    }

    private List<String> convert2board(Deque<Integer> path) {
        List<String> board = new ArrayList<>();
        for (Integer num : path) {
            StringBuilder row = new StringBuilder();
            row.append(".".repeat(Math.max(0, n)));
            row.replace(num, num + 1, "Q");
            board.add(row.toString());
        }
        return board;
    }
}
```

#### 同类问题

+ [37. 解数独](https://leetcode-cn.com/problems/sudoku-solver/)
+ [679. 24 点游戏](https://leetcode-cn.com/problems/24-game/)
+ [529. 扫雷游戏](https://leetcode-cn.com/problems/minesweeper/)
+ [488. 祖玛游戏](https://leetcode-cn.com/problems/zuma-game/)


#### 参考资料

+ liuyubobobo 老师在慕课网上开设的课程《玩转算法面试》[代码仓库](https://github.com/liuyubobobo/Play-with-Algorithm-Interview/blob/master/08-Recurion-and-Backstracking/Course%20Code%20(Java)/08-N-Queens/src/Solution.java)；
+ 《剑指 Offer（第 2 版）》面试题 38 ：字符串的排列，相关题目 2。


#### 一个回溯算法可视化的小项目

通过可视化帮助理解回溯算法的思想。写 Java 的朋友可以看看，这是我写的一个练习的项目，学习的价值不大，不用点赞。

+ GitHub 地址：[Backtracking-Visualization](https://github.com/liweiwei1419/Backtracking-Visualization)

![...-09-03 上午3.20.54.mov](a10557e6-3ce9-4215-b8f0-8b445ade9992)

![...-09-03 上午3.22.16.mov](166f7cd6-ccef-430b-a575-57c02876ec53)



---


分析：虽然看起来，这是一个人工智能的问题，但是我们的代码实现方式完全可以理解为暴力解法，只不过我们使用“递归回溯”方式的暴力解法，可以很快地判断暴力的过程中产生的结果是否符合条件，而不是把所有的暴力解都的出来以后再去掉不符合条件的；
例如：我们在第 1 行第 1 列已经放置了元素，那么很显然，在第 2 行第 1 列和第 2 列放置元素的情况就已经被排除掉了，第 2 行的第 3 列我们发现可以放置元素，于是继续遍历下去；

从上面的分析中，我们可以看到“递归”、“回溯”与“暴力解法”、“深度优先遍历”有着千丝万缕的联系；

其实这道问题，很像我们前面介绍的排列问题。我们想想，是不是每一层的一开始其实我们都有 $n$ 种摆放的方法，但是因为游戏规则，在每一层我们会排除掉一些可能，在每一层我们都会记录之前的状态，回溯以后，状态还要恢复；

在解题思路上，我们采用还是一行一行去思考皇后位置的摆放，因此外层只要用一层循环。

Java 实现：

```java
public class Solution {

    private boolean[] col; // 记录在列上第几列已经放置了元素
    private boolean[] dia1; // 记录在主对角线上哪些位置已经放置了元素
    private boolean[] dia2; // 记录在副对角线上哪些位置已经放置了元素
    private List<List<String>> res = new ArrayList<>();

    public List<List<String>> solveNQueens(int n) {
        col = new boolean[n];
        dia1 = new boolean[2 * n - 1]; // 可以用归纳法得到对角线上的元素个数
        dia2 = new boolean[2 * n - 1]; // 可以用归纳法得到对角线上的元素个数
        putQueue(n, 0, new ArrayList<Integer>());
        return res;
    }

    /**
     * 尝试在一个 n 皇后的问题中，摆放第 index 行的皇后的位置
     *
     * @param n
     * @param index
     * @param row
     */
    private void putQueue(int n, int index, List<Integer> row) {
        if (index == n) {
            res.add(generateBoard(n, row));
            return;
        }
        // i 表示第几列，循环的过程就是在尝试给每一行的每一列放置皇后，看看在列上能不能放，看看在对角线上能不能放
        // 其实 n 皇后问题和使用回溯解决排列问题的思路是一致的：暴力遍历，使用额外数组记录状态，一层层减少，递归到底以后回溯，回溯的过程中，一层一层地恢复状态
        for (int i = 0; i < n; i++) {
            if (!col[i] && !dia1[index + i] && !dia2[index - i + n - 1]) {
                row.add(i);
                col[i] = true;
                dia1[index + i] = true;
                dia2[index - i + n - 1] = true;
                putQueue(n, index + 1, row);
                col[i] = false;
                dia1[index + i] = false;
                dia2[index - i + n - 1] = false;
                row.remove(row.size() - 1);
            }
        }
    }


    private List<String> generateBoard(int n, List<Integer> row) {
        List<String> res = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            sb.append(".");
        }
        StringBuilder cur = null;
        for (int i = 0; i < n; i++) {
            cur = new StringBuilder(sb);
            int queueLoc = row.get(i);
            cur.replace(queueLoc, queueLoc + 1, "Q");
            res.add(cur.toString());
        }
        return res;
    }

    // 测试用例
    public static void main(String[] args) {
        Solution solution = new Solution();
        List<List<String>> solveNQueens = solution.solveNQueens(8);
        for (int i = 0; i < solveNQueens.size(); i++) {
            System.out.println("第 " + (i + 1) + " 种解法：");
            List<String> sloveOne = solveNQueens.get(i);
            printList(sloveOne);
            System.out.println("********");
        }
    }

    private static void printList(List<String> sloveOne) {
        for (int i = 0; i < sloveOne.size(); i++) {
            System.out.println(sloveOne.get(i));

        }
    }
}
```

知识补充：n 皇后问题有很多优化的思路，可以加快搜索的过程。（因为时间关系，以后我们再关注）