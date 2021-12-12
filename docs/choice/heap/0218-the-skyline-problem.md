---
title: 「力扣」第 218 题：天际线问题（困难）
icon: jingxuan
category: 优先队列
tags: 
  - 优先队列
  - 堆
  - 二叉搜索树
---


![0218](https://tva1.sinaimg.cn/large/008i3skNgy1gx93q006ujj30p00anjs2.jpg)

+ 题目链接：[218. 天际线问题](https://leetcode-cn.com/problems/the-skyline-problem/)
+ 题解链接：[优先队列 + 延迟删除技巧（Java）](https://leetcode-cn.com/problems/the-skyline-problem/solution/you-xian-dui-lie-java-by-liweiwei1419-jdb5/)

## 题目描述

城市的天际线是从远处观看该城市中所有建筑物形成的轮廓的外部轮廓。给你所有建筑物的位置和高度，请返回由这些建筑物形成的 **天际线** 。

每个建筑物的几何信息由数组 `buildings` 表示，其中三元组 `buildings[i] = [lefti, righti, heighti]` 表示：

- `lefti` 是第 `i` 座建筑物左边缘的 `x` 坐标。
- `righti` 是第 `i` 座建筑物右边缘的 `x` 坐标。
- `heighti` 是第 `i` 座建筑物的高度。

**天际线** 应该表示为由 “关键点” 组成的列表，格式 `[[x1,y1],[x2,y2],...]` ，并按 **x 坐标** 进行 **排序** 。**关键点是水平线段的左端点**。列表中最后一个点是最右侧建筑物的终点，`y` 坐标始终为 `0` ，仅用于标记天际线的终点。此外，任何两个相邻建筑物之间的地面都应被视为天际线轮廓的一部分。

**注意：**输出天际线中不得有连续的相同高度的水平线。例如 `[...[2 3], [4 5], [7 5], [11 5], [12 7]...]` 是不正确的答案；三条高度为 5 的线应该在最终输出中合并为一个：`[...[2 3], [4 5], [12 7], ...]`

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/12/01/merged.jpg)

```
输入：buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
输出：[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
解释：
图 A 显示输入的所有建筑物的位置和高度，
图 B 显示由这些建筑物形成的天际线。图 B 中的红点表示输出列表中的关键点。
```

**示例 2：**

```
输入：buildings = [[0,2,3],[2,5,3]]
输出：[[0,3],[5,0]]
```

 **提示：**

- $1 <= buildings.length <= 10^4$
- $0 <= left_i < right_i <= 2^{31} - 1$
- $1 <= height_i <= 2^{31} - 1$
- `buildings` 按 $left_i$ 非递减排序



---


# 题解 | 「力扣」第 218 题：天际线问题（困难、优先队列）

**摘要**：这道题首先需要仔细审题，选择最合适的数据结构。题目需要动态选取最值，可以想到可以使用「优先队列」和「二分搜索树」。因为需要支持「动态删除」操作，使用「优先队列」的时候，需要使用到「 延迟删除技巧」。

+ [题目链接](https://leetcode-cn.com/problems/the-skyline-problem/)
+ [题解链接](https://leetcode-cn.com/problems/the-skyline-problem/solution/you-xian-dui-lie-java-by-liweiwei1419-jdb5/)


**说明**：

这是一篇综述，参考资料为「力扣」题解区的所有题解和评论。这题放在收藏夹里很久了，一直没有弄得很明白，今天有时间就又把以前找到的代码拿出来看复习了一下，把自己思考的结果记录一下，希望能对大家有用。

这里给出的代码是网上最常见的代码的改进版本，因为在 Java 的优先队列中移除一个元素（`remove()` 方法），是个耗时的操作（先线性找到这个元素 $O(N)$ ，再移除 $O(\log N)$）。

这里引入「延迟删除」技巧，设计一个哈希表 `delayed`，记录删除元素，以及被删除的次数。规则是：一旦堆顶元素在延迟删除集合中：

+ 删除堆顶元素；
+ 延迟删除的哈希表里，对应的次数 -1。

反复这样做下去，直到堆顶元素不在延迟删除的集合中。优先队列的「延迟删除」技巧请见「力扣」第 480 题：[滑动窗口中位数](https://leetcode-cn.com/problems/sliding-window-median/) 的 [官方题解](https://leetcode-cn.com/problems/sliding-window-median/solution/hua-dong-chuang-kou-zhong-wei-shu-by-lee-7ai6/)。


---


### 理解题意

题目中说：「关键点是水平线段的左端点」。我们把关键点的特点再说得具体一点：如果把天际线「从左到右」一笔画出来（如下图黄色线的运动轨迹所示），「关键点」是转折点，「关键点」不会在线段「中间」的部分。

![0281-1.gif](https://pic.leetcode-cn.com/1626155133-ZtdJzv-0281-1.gif)

**说明**：下面的描述中「从上到下」「从下到上」「竖直」「水平」都指的是上图中黄色线的运动轨迹。

「关键点」出现在 **从「竖直方向」转向「水平方向」的地方**，从「水平方向」到「竖直方向」不产生关键点，因此 **有竖直方向移动产生高度差的地方，就会出现「关键点」**。
这里「关键点」按照「竖直方向」是「从下到上」还是「从上到下」，可以分为两种情况，我们分别命名成「规则 1」和「规则 2」：
+ **规则 1**：如果是「从下到上」转向「水平方向」，纵坐标最大的点是关键点；
+ **规则 2**：如果是「从上到下」转向「水平方向」，纵坐标第二大的点是关键点。

![image.png](https://pic.leetcode-cn.com/1626155944-lnUpFm-image.png)

选最值可以使用「优先队列」和「二分搜索树」，选「第二大」，可以在「优先队列」的基础上把最值拿掉，剩下的部分最大的就是「第二大」的值。

因此这道题可以用两种数据结构：

+ 优先队列 + 哈希表：哈希表的作用是延迟删除，需要删除的时候现在哈希表里做一个记录，等到它上浮到堆顶的时候才删除；
+ 二分搜索树：得使用映射，Java 中是 `TreeMap`，相当于上面「优先队列 + 哈希表」的组合（这里感谢 [@verygoodlee](/u/verygoodlee/) 朋友的提示）。

### 方法一：优先队列

先说重点：优先队列中保存的是已经扫描过的点的 **纵坐标**。

+ 先把输入数组处理成点的样子，也就是处理成「(横坐标, 纵坐标)」的格式；
+ 由于要区分点是位于「从下到上」还是「从上到下」的地方，可以把左端点的纵坐标处理成负数：
  + 如果当前是「从下到上」，这个负数的纵坐标先要变成正数，然后参与最大的点的选拔（见「规则 1」）；
  + 如果当前是「从上到下」，它就是正数，它不可以参与最大点的选拔，需要将它从优先队列中删除（见「规则 2」）。

+ 把输入数组按照左端点升序排序，表示我们是 **从左到右** 依次扫描这些矩形。如果遇到左端点重合的情况，让纵坐标大的排在前面，因此左端点一定都是「从下到上」，由「规则 1」让纵坐标大的先出现，纵坐标小的就没有出头之日，就不会被选中。

![image.png](https://pic.leetcode-cn.com/1626161440-CVWfkF-image.png)


其余没有讲到的部分，请见「参考代码 1」的注释。

**参考代码**：

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class Solution {

    public List<List<Integer>> getSkyline(int[][] buildings) {
        // 第 1 步：预处理
        List<int[]> buildingPoints = new ArrayList<>();
        for (int[] b : buildings) {
            // 负号表示左边高度的转折点
            buildingPoints.add(new int[]{b[0], -b[2]});
            buildingPoints.add(new int[]{b[1], b[2]});
        }

        // 第 2 步：按照横坐标排序，横坐标相同的时候，高度高的在前面
        buildingPoints.sort((a, b) -> {
            if (a[0] != b[0]) {
                return a[0] - b[0];
            } else {
                // 注意：这里因为左端点传进去的时候，数值是负的，在比较的时候还按照升序排序
                return a[1] - b[1];
            }
        });

        // 第 3 步：扫描一遍动态计算出结果
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        // 哈希表，记录「延迟删除」的元素，key 为元素，value 为需要删除的次数
        Map<Integer, Integer> delayed = new HashMap<>();

        // 最开始的时候，需要产生高度差，所以需要加上一个高度为 0，宽度为 0 的矩形
        maxHeap.offer(0);
        // 为了计算高度差，需要保存之前最高的高度
        int lastHeight = 0;
        List<List<Integer>> res = new ArrayList<>();
        for (int[] buildingPoint : buildingPoints) {
            if (buildingPoint[1] < 0) {
                // 说明此时是「从下到上」，纵坐标参与选拔最大值，请见「规则 1」
                maxHeap.offer(-buildingPoint[1]);
            } else {
                // 不是真的删除 buildingPoint[1]，把它放进 delayed，等到堆顶元素是 buildingPoint[1] 的时候，才真的删除
                delayed.put(buildingPoint[1], delayed.getOrDefault(buildingPoint[1], 0) + 1);
            }

            // 如果堆顶元素在延迟删除集合中，才真正删除，这一步可能执行多次，所以放在 while 中
            // while (true) 都是可以的，因为 maxHeap 一定不会为空
            while (!maxHeap.isEmpty()) {
                int curHeight = maxHeap.peek();
                if (delayed.containsKey(curHeight)) {
                    delayed.put(curHeight, delayed.get(curHeight) - 1);
                    if (delayed.get(curHeight) == 0) {
                        delayed.remove(curHeight);
                    }
                    maxHeap.poll();
                } else {
                    break;
                }
            }

            int curHeight = maxHeap.peek();
            // 有高度差，才有关键点出现
            if (curHeight != lastHeight) {
                // 正在扫过的左端点的值
                res.add(Arrays.asList(buildingPoint[0], curHeight));
                // 当前高度成为计算高度差的标准
                lastHeight = curHeight;
            }
        }
        return res;
    }
}
```

**时间复杂度**：$O(N \log N)$，这里 $N$ 是输入数组的长度。



### 方法二：二分搜索树

**基本思想**：二分搜索树中记录高度和高度出现的次数，如果查找高度最大值的时候，高度出现的次数恰好为 $0$，那么这个高度就应该丢弃。

代码结构同「参考代码 1」。


**参考代码 2**：

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.TreeMap;

public class Solution {

    public List<List<Integer>> getSkyline(int[][] buildings) {
        List<int[]> buildingPoints = new ArrayList<>();
        for (int[] b : buildings) {
            buildingPoints.add(new int[]{b[0], -b[2]});
            buildingPoints.add(new int[]{b[1], b[2]});
        }

        buildingPoints.sort((a, b) -> {
            if (a[0] != b[0]) {
                return a[0] - b[0];
            } else {
                return a[1] - b[1];
            }
        });

        // key 为元素，value 为高度出现的次数
        TreeMap<Integer, Integer> treeMap = new TreeMap<>();
        treeMap.put(0, 1);
        int lastHeight = 0;
        List<List<Integer>> res = new ArrayList<>();
        for (int[] buildingPoint : buildingPoints) {
            if (buildingPoint[1] < 0) {
                treeMap.put(-buildingPoint[1], treeMap.getOrDefault(-buildingPoint[1], 0) + 1);
            } else {
                treeMap.put(buildingPoint[1], treeMap.get(buildingPoint[1]) - 1);
            }

            while (true) {
                int curHeight = treeMap.lastEntry().getKey();
                int times = treeMap.lastEntry().getValue();
                if (times == 0) {
                    treeMap.remove(curHeight);
                } else {
                    break;
                }
            }

            int curHeight = treeMap.lastKey();
            if (curHeight != lastHeight) {
                res.add(Arrays.asList(buildingPoint[0], curHeight));
                lastHeight = curHeight;
            }
        }
        return res;
    }
}
```


如果需要研究线段树解法的朋友们，可以参考 liuyubobobo 老师写的 [代码](https://github.com/liuyubobobo/Play-Leetcode/blob/master/0001-0500/0218-The-Skyline-Problem/cpp-0218/main.cpp)。


补充：

图是 keynote 画的，用 PPT 也可以画哦。

![image.png](https://pic.leetcode-cn.com/1626177470-wxNWFu-image.png)


---

我讲解的算法特别适合新手朋友。欢迎大家关注我的公众号「算法不好玩」，B 站关注「liweiwei1419」。
