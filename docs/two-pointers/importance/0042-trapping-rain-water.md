---
title: 「力扣」第 42 题：接雨水（困难）
icon: yongyan
category: 双指针
tags:
  - 双指针
  - 动态规划
  - 栈
  - 单调栈
---

+ 题目链接：[42. 接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)；
+ 题解链接：[暴力解法、优化、双指针、单调栈](https://leetcode-cn.com/problems/trapping-rain-water/solution/bao-li-jie-fa-yi-kong-jian-huan-shi-jian-zhi-zhen-/)。

## 题目描述

给定 `n` 个非负整数表示每个宽度为 `1` 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)



```
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
```

**示例 2：**

```
输入：height = [4,2,0,3,2,5]
输出：9
```

 **提示：**

- `n == height.length`
- $1 \le n \le 2 * 10^4$
- $0 \le height[i] \le 10^5$

## 思路分析

如果对于一个问题暂时没有好的解决方案，应该先尝试使用最简单的方法得到一个正确答案，即使这样的方法看起来并不高效。

接雨水是经典的算法问题，有以下四种解法。

![image.png](https://pic.leetcode-cn.com/e6853420d65885b8f2c186765a7d863463c46ef6559bc2b5db53555447d1c2b4-image.png)

对暴力解法的思考是很重要的，暴力解法是优化解法的基础。通过对暴力解法的思考、分析，可以帮助我们得到优化解法的细节和思路。


### 方法一：暴力解法

比较容易想到的是，**能存水的条件是形成凹槽**，每一格的存水的体积与它两侧的柱形的高度有关，但并不准确。**每一格的存水的体积与它两侧最高的那个柱形的高度有关**。


@slidestart


![22.png](https://pic.leetcode-cn.com/a53fb3e285eff0f7bedf1a67e12082807e353e215d5abeef7def900749d859b3-22.png)

---

![04.png](https://pic.leetcode-cn.com/6244cc79ca889d0ca9bb693a7fad64c2a73bdb3ee458a8478520a61df86c940d-04.png)

---

![05.png](https://pic.leetcode-cn.com/72cb930568f9ec46dbbef980120cb93834a4709b9c7e589a6ca5556abd3d4d6c-05.png)


@slideend


如图，下标为 $5$ 的位置的存水体积由以下三者决定：

+ 它左边最高的柱子的高度：`leftHighest`；
+ 它右边最高的柱子的高度：`rightHighest`；

根据木桶原理，下标为 $5$ 的位置的存水体积由它们二者之中的较小者决定；

+ 它自己的高度：`height[i]`，如果它自己的高度特别高，高到大于等于 `leftHighest` 和 `rightHighest` 的最小者，就不能存雨水了。

可以按照如下方法计算存水量：枚举每一个位置的存水体积，把它们加起来，其中下标为 $0$ 和下标为 $len - 1$ 的位置不存水（`len` 是输入数组的长度）。

**参考代码 1**：

```java
public class Solution {

    // 暴力解法：找到两边最高的那个高度，还要减去自己的高度

    public int trap(int[] height) {
        int len = height.length;
        // 特判
        if (len < 3) {
            return 0;
        }

        int res = 0;
        // 对区间 [1, len - 2] 的每个位置，分别计算可以存水的单位体积
        for (int i = 1; i < len - 1; i++) {
            int leftHighest = max(height, 0, i - 1);
            int rightHighest = max(height, i + 1, len - 1);

            // 木桶原理，存水的高度取决于二者之中的较矮者
            int curHeight = Math.min(leftHighest, rightHighest);
            if (curHeight > height[i]) {
                res += (curHeight - height[i]);
            }
        }
        return res;
    }

    private int max(int[] height, int left, int right) {
        int res = height[left];
        for (int i = left + 1; i <= right; i++) {
            res = Math.max(res, height[i]);
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N^2)$，这里 $N$ 是高度数组的长度；
+ 空间复杂度：$O(1)$，算法中使用到的变量个数是常数个。

看到这种时间复杂度与空间复杂度的组合，一般的优化思路是「空间换时间」。

---


事实上，不难发现，每一次计算左边和右边的最高高度的时候，有重复的操作：

```java
int leftHighest = max(height, 0, i - 1);
int rightHighest = max(height, i + 1, len - 1);
```


为此我们可以通过一次遍历，把已经扫过的柱形高度的最大值记录下来，具体如下：

+ 从左向右：记录当前遍历位置左侧（不包括当前位置的）最高高度；
+ 从右向左：记录当前遍历位置右侧（不包括当前位置的）的最高高度。

这种在计算的同时记录下上一步结果，这一步参考了之前结果的方法，叫做「表格法」，也叫「动态规划」。「动态规划」的基本思想是：「空间换时间」，只不过在思考顺序上，动态规划的思想很多时候让我们去思考这个问题最开始的样子，一点一点递推，得到最终的问题规模的答案（一些特殊问题除外，在这里不多展开）。



### 方法二：动态规划（针对暴力解法的优化，以空间换时间）

#### 第 1 步：定义状态数组

创建数组 `leftHighest` 和 `rightHighest`，它们的定义如下：

+ `leftHighest[i]`：数组 `height` 在区间 `[0, i - 1]` 中的最大值；
+ `rightHighest[i]`：数组 `height` 在区间 `[i + 1, len - 1]` 中的最大值。

#### 第 2 步：推导状态转移方程

状态转移方程：

根据定义，`leftHighest[i]` 不包括 `height[i]`，但包括 `height[i - 1]`、`height[i - 2]`、……、`height[1]`、`height[0]`。

而 `max(height[i - 2], ……, height[1], height[0])` 就是 `leftHighest[i - 1]` 的定义，为此状态转移方程是：

```java
leftHighest[i] = max(height[i - 1], leftHighest[i - 1])
```

同理：

```java
rightHighest[i] = max(height[i + 1], leftHighest[i + 1])
```

**参考代码 2**：

```java
public class Solution {

    public int trap(int[] height) {
        int len = height.length;
        if (len < 3) {
            return 0;
        }

        // leftHighest[i] 定义：区间 [0, i - 1] 中的最大值
        int[] leftHighest = new int[len];
        // 下标为 0 和 下标为 len - 1 的位置不用计算，下面同理
        for (int i = 1; i < len - 1; i++) {
            leftHighest[i] = Math.max(height[i - 1], leftHighest[i - 1]);
        }
        // rightHighest[i] 定义：区间 [i + 1, len - 1] 中的最大值
        int[] rightHighest = new int[len];
        for (int i = len - 2; i > 0; i--) {
            rightHighest[i] = Math.max(height[i + 1], rightHighest[i + 1]);
        }

        int res = 0;
        for (int i = 1; i < len - 1; i++) {
            int minHeight = Math.min(leftHighest[i], rightHighest[i]);
            if (height[i] < minHeight) {
                res += minHeight - height[i];
            }
        }
        return res;
    }
}
```


**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是高度数组的长度，程序扫描了三次数组；
+ 空间复杂度：$O(N)$，我们创建了两个和高度数组长度一样的数组。

---



下面考虑一下空间可以不可以再优化，事实上是可以的，利用木桶原理（思路类似「力扣」第 11 题（[盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water)）。就是下面的双指针（指针对撞）写法。


### 方法三：指针对撞（双指针）

注意到：

+ 每个位置得左边看一下最大值，右边看一下最大值；
+ 有两种情况最特殊，就是最左边（下标为 `1`，只用看右边）和最右边（下标为 `len - 1`，只用看左边），它们只用看一边就够了，事实上连扫描都不用扫，就能确定一个位置的存水量（作图看出来的）。

![06.png](https://pic.leetcode-cn.com/259f2089162754c18876acd1315eb188f4a1922a794cf11a902bf2844a8664a7-06.png)

![07.png](https://pic.leetcode-cn.com/5914ecf309bcbc2a08f3d4519965a3d45f84042dfd5c0f7d64e62f579ed08c59-07.png)

可以看出：「双指针」的思路，只不过是在「暴力解法」的基础之上，只使用了两个变量记录了一些重要的信息，思路依然是「计算每个位置能够存水」的总量，区别在于 **计算顺序不同**，先计算两边，再计算中间。


---



**参考代码 3**：

说明：下面给出了两种「双指针」（指针对撞）的写法，区别仅在与对双指针变量的定义不同，为此造成了代码细节上有一些细微的不同。


<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int trap(int[] height) {
        int len = height.length;
        // 特判
        if (len < 3) {
            return 0;
        }

        // 注意初值的选取，前面做了特判，下标 0 和 len - 1 位置都不存雨水，因此这里有效
        // 在区间 [1, len - 2] 里计算存水量
        int left = 1;
        int right = len - 2;
        
        // 记录区间 [0, left - 1] 的最大高度
        int curLeftHighest = height[0];
        // 记录区间 [right + 1, len - 1] 的最大高度
        int curRightHighest = height[len - 1];

        int res = 0;
        // 这里是等于，因为当 left == right 的时候，left(right) 这个位置的存水量还需要计算一下
        while (left <= right) {
            // 调试代码
            // System.out.println("left = " + left + " right = " + right + " curLeftHighest = " + curLeftHighest + " curRightHighest = " + curRightHighest+ " res = " + res );
            int minHeight = Math.min(curLeftHighest, curRightHighest);

            // 存水单位体积取决于较短的那个柱形的高度
            if (minHeight == curLeftHighest) {
                if (minHeight > height[left]) {
                    // 大于当前，才可以存水
                    res += minHeight - height[left];
                }
                // 更新左边的柱形的最高高度
                curLeftHighest = Math.max(curLeftHighest, height[left]);
                // 指针右移
                left++;
            } else {
                if (minHeight > height[right]) {
                    res += minHeight - height[right];
                }
                curRightHighest = Math.max(curRightHighest, height[right]);
                right--;
            }
        }
        return res;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public int trap(int[] height) {
        int len = height.length;
        // 特判
        if (len < 3) {
            return 0;
        }

        // 注意初值的选取
        int left = 0;
        int right = len - 1;

        // 下面这种定义考虑了当前指针位置的高度，在后面计算的时候不用和当前高度作比较
        // 记录区间 [0, left] 的最大高度
        int curLeftHighest = height[0];
        // 记录区间 [right, len - 1] 的最大高度
        int curRightHighest = height[len - 1];

        int res = 0;
        // 当 left == right 的时候，[1, len - 2] 区间里的所有位置的下标都已经计算出来
        while (left < right) {
            curLeftHighest = Math.max(curLeftHighest, height[left]);
            curRightHighest = Math.max(curRightHighest, height[right]);

            if (curLeftHighest < curRightHighest) {
                res += curLeftHighest - height[left];
                left++;
            } else {
                res += curRightHighest - height[right];
                right--;
            }
        }
        return res;
    }
}
```
</CodeGroupItem>
</CodeGroup>




**复杂度分析**：

+ 时间复杂度：$O(N)$，使用指针对撞的方式，只扫描了一次数组；
+ 空间复杂度：$O(1)$，只使用了有限个变量。


---


### 方法四：栈（单调栈）

栈的解法就很难想到了，我也是在看了 「[官方题解](https://leetcode-cn.com/problems/trapping-rain-water/solution/jie-yu-shui-by-leetcode/)」 之后并查阅资料，才知道这一类问题的解法叫「单调栈」。





下面解释一下这个解法是怎么思考的：

+ 来源于一种 **增量** 的思想，就是从左到右一点一点画出柱形，只要遇到当前柱形（下标为 `i`）比之前的柱形（下标为 `i - 1`）的高度 **严格** 高的时候，就会形成凹槽，这个时候，就可以计算凹槽能存水的单位体积；
+ 而这种存水的体积的计算是一层一层计算出来的（注意考虑清楚一些极端的情况）；
+ 还未计算出来的柱形的高度，得先存起来，但是已经计算出来的柱形可以暂时不管了（我们在 PPT 中画成了虚线），这样存起来，在适当时候取出来的顺序，恰恰好符合「后进先出」的顺序，因此，可以使用「栈」作为存储数据的缓存；
+ 由于在一层一层计算存水的单位体积的时候，宽度由下标的差，因此这个栈里应该存储的是下标，高度可以通过下标去查数组 `height` 得到；
+ 在这个栈里的元素的特点（替换成高度以后）呈现单调不增的状态，因此称为「单调栈」，单调栈首先是一个栈，这个问题需要一个后进先出的数据结构，然后根据这个问题的特殊性，才是单调栈。单调栈的问题一般很有局限性，即只适用于一些特定的问题，例如「力扣」第 84 题（[柱状图中最大的矩形](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)）；
+ 思考这样的问题，并且正确解答，一定需要在纸上画图，帮助思考，然后在一些细节计算的时候，`+ 1` 和 `- 1` 在纸上的具体示例中才好看出来。

因此可以借助栈，一层一层把雨水计算出来。


@slidestart

![06.png](https://pic.leetcode-cn.com/590bcb9969c78b9aedb3f635f976cccb4fb830d5ac97296bcd98bb2fb282d558-06.png)

---


![07.png](https://pic.leetcode-cn.com/6fba3786100a5db102407dc52dad50891e608784e231539d0a02247cd69097ad-07.png)

---


![08.png](https://pic.leetcode-cn.com/6077b0d3748027cb5bd0b2434c08c9556877dd0253c2c4e91b4bcd867c7d58c5-08.png)

---


![09.png](https://pic.leetcode-cn.com/a52f321c3e782eb1da5acaa7b0406978d04357c8b7220bf12707c9ad2c445e15-09.png)

---


![010.png](https://pic.leetcode-cn.com/633214d77ff90b9f579f64279b3cfdec0431f3d52f45b38263e5de2c267b5425-010.png)

---


![011.png](https://pic.leetcode-cn.com/c53df0e2b88f0ad75cb12466b5214161616acbbd6eae00262fecdd08b21e7bf4-011.png)

---


![012.png](https://pic.leetcode-cn.com/6cb8f92faf647e1a3f3070290a925697a44e29aaeb22819ba550f9dafc67b11d-012.png)

---


![013.png](https://pic.leetcode-cn.com/ede4c350c460a85231cf04df6b17ad8a73fdf94b51672eb226193678ace5c7ff-013.png)

---


![014.png](https://pic.leetcode-cn.com/8be0cfecd154bc70f36e16b15e65b5a4731a12b2a365733691a906392dde20df-014.png)

---


![015.png](https://pic.leetcode-cn.com/38f54af3b66ff046e6e839989aa9f4ec0797b25a1ca8bdee3bb82b4c6970132f-015.png)

---


![016.png](https://pic.leetcode-cn.com/2566c580d7b45e4ed81e64b07a2a82b0f645ff70880b0599955ac6c85f7fdc79-016.png)

---


![017.png](https://pic.leetcode-cn.com/45aa1179fca4843027806dd2d50e3ef57c66290993e403cdd3d40d76494cede7-017.png)


@slideend


2020 年 8 月 30 日复习的时候写的草稿：

**重点**：

+ 计算顺序恰好符合「后进先出」的规律，所以使用栈；
+ 每一次出栈，都可以计算出一层对应的存水量。

![草稿 1](https://pic.leetcode-cn.com/1598795068-TOfPfa-image.png)
![草稿 2](https://pic.leetcode-cn.com/1598795052-BawXKP-image.png)



**参考代码 4**：

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Solution {

    public int trap(int[] height) {
        int len = height.length;
        // 特判
        if (len < 3) {
            return 0;
        }

        int res = 0;

        // 单调栈里面存的是索引
        // 根据官方对 Stack 的使用建议，这里将 Deque 对象当做 stack 使用，注意只使用关于栈的接口
        // 由于实现类是数组 `ArrayDeque`，因此只能在末尾添加和删除元素
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < len; i++) {
            while (!stack.isEmpty() && height[stack.peek()] < height[i]) {
                int top = stack.pop();

                // 特殊情况，当栈为空的时候，跳出循环，直接增加当前下标 i 到栈里
                if (stack.isEmpty()) {
                    break;
                }

                int currentWidth = i - stack.peek() - 1;
                int currentHeight = Math.min(height[i], height[stack.peek()]) - height[top];

                res += currentWidth * currentHeight;
            }
            stack.push(i);
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，每个元素进栈、出栈一次；
+ 空间复杂度：$O(N)$，栈的大小最多为 $N$。


**总结**：

这道问题「双指针」的方法时间复杂度和空间复杂度是最优的，「单调栈」的做法比较难描述清楚。面试的时候，可以回答「动态规划」或者「双指针」。

