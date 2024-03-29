---
title: 「力扣」第 1276 题：不浪费原料的汉堡制作方案（简单）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

- 题目链接：[1276. 不浪费原料的汉堡制作方案](https://leetcode-cn.com/problems/number-of-burgers-with-no-waste-of-ingredients/)；
- 题解链接：[消元法解二元一次方程、二分查找（Java）](https://leetcode-cn.com/problems/number-of-burgers-with-no-waste-of-ingredients/solution/jie-er-yuan-yi-ci-fang-cheng-java-by-liweiwei1419/)。

## 题目描述

圣诞活动预热开始啦，汉堡店推出了全新的汉堡套餐。为了避免浪费原料，请你帮他们制定合适的制作计划。

给你两个整数 `tomatoSlices` 和 `cheeseSlices`，分别表示番茄片和奶酪片的数目。不同汉堡的原料搭配如下：

- **巨无霸汉堡：**4 片番茄和 1 片奶酪
- **小皇堡：**2 片番茄和 1 片奶酪

请你以 `[total_jumbo, total_small]`（[巨无霸汉堡总数，小皇堡总数]）的格式返回恰当的制作方案，使得剩下的番茄片 `tomatoSlices` 和奶酪片 `cheeseSlices` 的数量都是 `0`。

如果无法使剩下的番茄片 `tomatoSlices` 和奶酪片 `cheeseSlices` 的数量为 `0`，就请返回 `[]`。

**示例 1：**

```
输入：tomatoSlices = 16, cheeseSlices = 7
输出：[1,6]
解释：制作 1 个巨无霸汉堡和 6 个小皇堡需要 4*1 + 2*6 = 16 片番茄和 1 + 6 = 7 片奶酪。不会剩下原料。
```

**示例 2：**

```
输入：tomatoSlices = 17, cheeseSlices = 4
输出：[]
解释：只制作小皇堡和巨无霸汉堡无法用光全部原料。
```

**示例 3：**

```
输入：tomatoSlices = 4, cheeseSlices = 17
输出：[]
解释：制作 1 个巨无霸汉堡会剩下 16 片奶酪，制作 2 个小皇堡会剩下 15 片奶酪。
```

**示例 4：**

```
输入：tomatoSlices = 0, cheeseSlices = 0
输出：[0,0]
```

**示例 5：**

```
输入：tomatoSlices = 2, cheeseSlices = 1
输出：[0,1]
```

**提示：**

- `0 <= tomatoSlices <= 10^7`
- `0 <= cheeseSlices <= 10^7`

## 思路分析

本来想用二分查找去做，后来在表达式换算的过程中，发现完全可以通过**消元法解方程**做出这个问题，于是先做了解方程的方法，然后比赛完再试了试二分法。

## 方法一：消元法解二元一次方程

注意：

1、根据 `x` 的表达式，知道 `a / 2` 如果不能整除，方程没有整数解，因此先做判断；

2、不同于我们在纸上解方程，`x` 和 `y` 都要写成 `a` 和 `b` 的表达式，消去 `y` 以后，`x` 计算出来以后，可以通过 `x` 的值计算得到 `y` 。

![image.png](https://tva1.sinaimg.cn/large/e6c9d24egy1h2tp7w2wehj20yq0u0ae0.jpg)

**参考代码 1**：

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public List<Integer> numOfBurgers(int tomatoSlices, int cheeseSlices) {
        List<Integer> res = new ArrayList<>();
        if ((tomatoSlices & 1) != 0) {
            return res;
        }

        int x = tomatoSlices / 2 - cheeseSlices;
        int y = cheeseSlices - x;
        if (x >= 0 && y >= 0) {
            res.add(x);
            res.add(y);
            return res;
        }
        return res;
    }
}
```

下面搜索一下。

## 方法二：二分查找

因为 `x` 和 `y` 都是非负整数，可以使用二分查找定位 `x` ， `x` 知道以后 `y` 就确定了。

**参考代码 2**：

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {

    private int f(int x, int y) {
        return 4 * x + 2 * y;
    }

    public List<Integer> numOfBurgers(int tomatoSlices, int cheeseSlices) {
        // 两边夹，搜索 a 的值
        int left = 0;
        int right = tomatoSlices / 4;

        while (left < right) {
            int mid = (left + right) >>> 1;
            // 根据方程 x + y = b
            int y = cheeseSlices - mid;

            // f 函数计算了方程 4x + 2y = a 的左边
            if (f(mid, y) < tomatoSlices) {
                // 下一轮搜索区间在 [mid + 1, right]
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        List<Integer> res = new ArrayList<>(2);
        if (f(left, cheeseSlices - left) == tomatoSlices) {
            res.add(left);
            res.add(cheeseSlices - left);
        }
        return res;
    }
}
```
