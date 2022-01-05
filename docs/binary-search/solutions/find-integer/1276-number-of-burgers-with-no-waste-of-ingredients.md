---
title: 「力扣」第 1276 题：不浪费原料的汉堡制作方案（简单）
icon: yongyan
category: 二分查找
tags:
  - 二分查找
---

+ 题目链接：[1276. 不浪费原料的汉堡制作方案](https://leetcode-cn.com/problems/number-of-burgers-with-no-waste-of-ingredients/)；
+ 题解链接：[消元法解二元一次方程、二分查找（Java）](https://leetcode-cn.com/problems/number-of-burgers-with-no-waste-of-ingredients/solution/jie-er-yuan-yi-ci-fang-cheng-java-by-liweiwei1419/)。


本来想用二分查找去做，后来在表达式换算的过程中，发现完全可以通过**消元法解方程**做出这个问题，于是先做了解方程的方法，然后比赛完再试了试二分法。

### 方法一：消元法解二元一次方程

注意：

1、根据 `x` 的表达式，知道 `a / 2` 如果不能整除，方程没有整数解，因此先做判断；

2、不同于我们在纸上解方程，`x` 和 `y` 都要写成 `a` 和 `b` 的表达式，消去 `y` 以后，`x` 计算出来以后，可以通过 `x` 的值计算得到 `y` 。

![image.png](https://pic.leetcode-cn.com/e4cd3683589c41fcca649124a33923b5ddc0af280d02457f02f904d2aeda86ce-image.png)

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

### 方法二：二分查找

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