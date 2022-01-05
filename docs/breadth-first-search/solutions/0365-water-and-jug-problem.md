---
title: 「力扣」第 365 题：水壶问题（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
---

+ 题目链接：[365. 水壶问题](https://leetcode-cn.com/problems/water-and-jug-problem/)；
+ 题解链接：[图的广度优先遍历（Java）](https://leetcode-cn.com/problems/water-and-jug-problem/solution/tu-de-yan-du-you-xian-bian-li-by-liweiwei1419/)。




对示例 1 的理解，感谢朋友 [@robotliu0327](/u/robotliu0327/) 提供的图例。

![](https://pic.leetcode-cn.com/2b1c1adb1a171741ee9a1358f07c0fe83a5afb5ac07a56af1709af143ecf4407-file_1584789499373)

这一类游戏相关的问题，用人脑去想，是很难穷尽所有的可能的情况的。因此很多时候需要用到「搜索算法」。

「搜索算法」一般情况下是在「树」或者「图」结构上的「深度优先遍历」或者「广度优先遍历」。因此，在脑子里，更建议动手在纸上画出问题抽象出来的「树」或者「图」的样子。

在「树」上的「深度优先遍历」就是「回溯算法」，在「图」上的「深度优先遍历」是「flood fill」 算法，深搜比较节约空间。这道题由于就是要找到一个符合题意的状态，我们用广搜就好了。这是因为广搜有个性质，一层一层像水波纹一样扩散，路径最短。

所谓「状态」，就是指当前的任务进行到哪个阶段了，可以用变量来表示，怎么定义状态有的时候需要一定技巧，这道题不难。这里分别定义两个水壶为 `A` 和 `B`，定义有序整数对 `(a, b)` 表示当前 `A` 和 `B` 两个水壶的水量，它就是一个状态。


题目说：


> 你允许：
> 
> + 装满任意一个水壶
> + 清空任意一个水壶
> + 从一个水壶向另外一个水壶倒水，直到装满或者倒空

为了方便说明，我们做如下定义：

装满任意一个水壶，定义为「操作一」，分为：
（1）装满 `A`，包括 `A` 为空和 `A` 非空的时候把 `A` 倒满的情况；
（2）装满 `B`，包括 `B` 为空和 `B` 非空的时候把 `B` 倒满的情况。

清空任意一个水壶，定义为「操作二」，分为
（1）清空 `A`；
（2）清空 `B`。

从一个水壶向另外一个水壶倒水，直到装满或者倒空，定义为「操作三」，其实根据描述「装满」或者「倒空」就知道可以分为 4 种情况：

（1）从 `A` 到 `B`，使得 `B` 满，`A` 还有剩；
（2）从 `A` 到 `B`，此时 `A` 的水太少，`A` 倒尽，`B` 没有满；
（3）从 `B` 到 `A`，使得 `A` 满，`B` 还有剩余；
（4）从 `B` 到 `A`，此时 `B` 的水太少，`B` 倒尽，`A` 没有满。

因此，从当前「状态」最多可以进行 8 种操作，得到 8 个新「状态」，对这 8 个新「状态」，依然可以扩展，一直做下去，直到某一个状态满足题目要求。

建议大家在草稿纸上做一个简单的计算，看一下这 8 种操作怎么写，需要注意哪些边界的情况，相信是一个不错的练习。

然后请大家自己尝试写一下代码，广度优先遍历常见的写法有 2 种，由于这里不用求路径最短的长度，在出队的时候不用读取队列的长度。

+ 从当前状态可以扩展出 8 种相邻的状态；
+ 因为状态有重复，因此是一个「有向」且「有环」的图，在遍历的时候，需要判断该结点设置是否访问过；
+ 有序整数对 `(a, b)` 可以自定义成一个私有的类；
+ 图的遍历，可以使用「深度优先遍历」和「广度优先遍历」，因为状态空间很大，广搜是相对较快；
+ 尽量「剪枝」，跳过不必要的搜索；
+ 当然最快的是数学方法。

![image.png](https://pic.leetcode-cn.com/daf59a74e2673090972df337a4bd42ae33fb0eab5be87df581f104c6548d2eb0-image.png)

我写的代码，由于把状态设置成有序数对，在哈希表里要判重，所以代码写出来特别不好看。

感谢评论区朋友 [@antonzhao](/u/antonzhao/) 的推荐，状态图比较有意思，是个网状的样子，让我想起来了「n 皇后」那个问题的状态图，有点类似哦。这位朋友推荐的这篇题解的「状态」设置就很不错，欢迎大家围观[题解](https://leetcode-cn.com/problems/water-and-jug-problem/solution/hu-dan-long-wei-liang-zhang-you-yi-si-de-tu-by-ant/)。



**参考代码**：

```Java []
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Queue;
import java.util.Set;

public class Solution {

    public boolean canMeasureWater(int x, int y, int z) {
        // 特判
        if (z == 0) {
            return true;
        }
        if (x + y < z) {
            return false;
        }

        State initState = new State(0, 0);

        // 广度优先遍历使用队列
        Queue<State> queue = new LinkedList<>();
        Set<State> visited = new HashSet<>();

        queue.offer(initState);
        visited.add(initState);

        while (!queue.isEmpty()) {
            State head = queue.poll();

            int curX = head.getX();
            int curY = head.getY();

            // curX + curY == z 比较容易忽略
            if (curX == z || curY == z || curX + curY == z) {
                return true;
            }

            // 从当前状态获得所有可能的下一步的状态
            List<State> nextStates = getNextStates(curX, curY, x, y);
            
            // 打开以便于观察，调试代码
            // System.out.println(head + " => " + nextStates);
            
            for (State nextState : nextStates) {
                if (!visited.contains(nextState)) {
                    queue.offer(nextState);
                    // 添加到队列以后，必须马上设置为已经访问，否则会出现死循环
                    visited.add(nextState);
                }
            }
        }
        return false;
    }

    private List<State> getNextStates(int curX, int curY, int x, int y) {
        // 最多 8 个对象，防止动态数组扩容，不过 Java 默认的初始化容量肯定大于 8 个
        List<State> nextStates = new ArrayList<>(8);

        // 按理说应该先判断状态是否存在，再生成「状态」对象，这里为了阅读方便，一次生成 8 个对象

        // 以下两个状态，对应操作 1
        // 外部加水，使得 A 满
        State nextState1 = new State(x, curY);
        // 外部加水，使得 B 满
        State nextState2 = new State(curX, y);

        // 以下两个状态，对应操作 2
        // 把 A 清空
        State nextState3 = new State(0, curY);
        // 把 B 清空
        State nextState4 = new State(curX, 0);

        // 以下四个状态，对应操作 3
        // 从 A 到 B，使得 B 满，A 还有剩
        State nextState5 = new State(curX - (y - curY), y);
        // 从 A 到 B，此时 A 的水太少，A 倒尽，B 没有满
        State nextState6 = new State(0, curX + curY);

        // 从 B 到 A，使得 A 满，B 还有剩余
        State nextState7 = new State(x, curY - (x - curX));
        // 从 B 到 A，此时 B 的水太少，B 倒尽，A 没有满
        State nextState8 = new State(curX + curY, 0);

        // 没有满的时候，才需要加水
        if (curX < x) {
            nextStates.add(nextState1);
        }
        if (curY < y) {
            nextStates.add(nextState2);
        }

        // 有水的时候，才需要倒掉
        if (curX > 0) {
            nextStates.add(nextState3);
        }
        if (curY > 0) {
            nextStates.add(nextState4);
        }

        // 有剩余才倒
        if (curX - (y - curY) > 0) {
            nextStates.add(nextState5);
        }
        if (curY - (x - curX) > 0) {
            nextStates.add(nextState7);
        }

        // 倒过去倒不满才倒
        if (curX + curY < y) {
            nextStates.add(nextState6);
        }
        if (curX + curY < x) {
            nextStates.add(nextState8);
        }
        return nextStates;
    }

    private class State {
        private int x;
        private int y;

        public State(int x, int y) {
            this.x = x;
            this.y = y;
        }

        public int getX() {
            return x;
        }

        public int getY() {
            return y;
        }

        @Override
        public String toString() {
            return "State{" +
                    "x=" + x +
                    ", y=" + y +
                    '}';
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) {
                return true;
            }
            if (o == null || getClass() != o.getClass()) {
                return false;
            }
            State state = (State) o;
            return x == state.x &&
                    y == state.y;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }
    }


    public static void main(String[] args) {
        Solution solution = new Solution();

        int x = 3;
        int y = 5;
        int z = 4;

//        int x = 2;
//        int y = 6;
//        int z = 5;

//        int x = 1;
//        int y = 2;
//        int z = 3;
        boolean res = solution.canMeasureWater(x, y, z);
        System.out.println(res);
    }
}
```

