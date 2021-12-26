---
title: 「力扣」第 477 题：回旋镖的数量
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

+ 题目链接：[477. 汉明距离总和](https://leetcode-cn.com/problems/total-hamming-distance/)。

## 题目描述

给定平面上 *n* 对不同的点，“回旋镖” 是由点表示的元组 `(i, j, k)` ，其中 `i` 和 `j` 之间的距离和 `i` 和 `k` 之间的距离相等（**需要考虑元组的顺序**）。

找到所有回旋镖的数量。你可以假设 *n* 最大为 **500**，所有点的坐标在闭区间 **[-10000, 10000]** 中。

**示例:**

```
输入:
[[0,0],[1,0],[2,0]]

输出:
2

解释:
两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
```





Python 代码：

```python
class Solution:
    def numberOfBoomerangs(self, points):
        import math
        res = 0
        size = len(points)
        d = dict()

        for i in range(size):
            for j in range(size):
                if i != j:
                    distance = math.pow(points[i][0] - points[j][0], 2) + math.pow(points[i][1] - points[j][1], 2)
                    if distance in d:
                        n = d[distance]
                        res += 2 * n
                        d[distance] = (n + 1)
                    else:
                        d[distance] = 1
            d.clear()
        return res
```





---
title: 「力扣」第 1 题：两数之和（简单）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

+ 题目链接：[]()；
+ 题解链接：[]()。

## 题目描述

# 「力扣」第 447 题：回旋镖的数量

+ [题目链接](https://leetcode-cn.com/problems/number-of-boomerangs/)

给定平面上 `n` 对 **互不相同** 的点 `points` ，其中 `points[i] = [xi, yi]` 。**回旋镖** 是由点 `(i, j, k)` 表示的元组 ，其中 `i` 和 `j` 之间的距离和 `i` 和 `k` 之间的距离相等（**需要考虑元组的顺序**）。

返回平面上所有回旋镖的数量。

**示例 1：**

```
输入：points = [[0,0],[1,0],[2,0]]
输出：2
解释：两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
```

**示例 2：**

```
输入：points = [[1,1],[2,2],[3,3]]
输出：2
```

**示例 3：**

```
输入：points = [[1,1]]
输出：0
```

**提示：**

- `n == points.length`
- `1 <= n <= 500`
- `points[i].length == 2`
- $-10^4 \le x_i, y_i \le 10^4$
- 所有点都 **互不相同**

### 方法一：使用乘法

**参考代码 1**：

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int numberOfBoomerangs(int[][] points) {
        int res = 0;
        Map<Integer, Integer> map = new HashMap<>();
        for (int[] point : points) {
            for (int[] other : points) {
                int distance = distance(point, other);
                map.put(distance, map.getOrDefault(distance, 0) + 1);
            }

            for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
                Integer count = entry.getValue();
                res += count * (count - 1);
            }
            map.clear();
        }
        return res;
    }

    private int distance(int[] point1, int[] point2) {
        int diffX = point1[0] - point2[0];
        int diffY = point1[1] - point2[1];
        return diffX * diffX + diffY * diffY;
    }
}
```



### 方法二：使用加法

**参考代码 2**：

```java
import java.util.HashMap;
import java.util.Map;


public class Solution {

    public int numberOfBoomerangs(int[][] points) {
        int res = 0;
        for (int[] point : points) {
            Map<Integer, Integer> map = new HashMap<>();
            for (int[] other : points) {
                int distance = distance(point, other);
                if (map.containsKey(distance)) {
                    Integer count = map.get(distance);
                    res += count;
                    map.put(distance, count + 1);
                } else {
                    map.put(distance, 1);
                }
            }
        }
        return res * 2;
    }

    private int distance(int[] point1, int[] point2) {
        int diffX = point1[0] - point2[0];
        int diffY = point1[1] - point2[1];
        return diffX * diffX + diffY * diffY;
    }
}
```



第 454 题：四数相加 II（乘法的思路没说清楚）

链接：[454. 四数相加 II](https://leetcode-cn.com/problems/4sum-ii/)



知识点：哈希表。



思路分析：其实思路只要清楚了，是个很简单的问题。

把 A、B、C、D 分成两组，在 A、B 之和中找与 C、D 的相反数之和相同的组合数，要使用哈希表这个数据结构。考察了组合数，乘法计数原理。代码编写有一定技巧。



方法一：用加法

用加法，下面这种写法省下一个 map，不过在计算的时候，就不能用乘法了，只能用加法，就这点区别。

```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int fourSumCount(int[] A, int[] B, int[] C, int[] D) {
        // key 是 A 和 B 数组分别取一个数可能的和，value 是这个和可能由几个不同的组合
        Map<Integer, Integer> map = new HashMap<>();
        // 第 1 步：把 A 和 B 所有的组合存入哈希表
        for (int a : A) {
            for (int b : B) {
                int sum = a + b;
                map.put(sum , map.getOrDefault(sum, 0) + 1);
            }
        }

        // 第 2 步：计算 C 和 D 的所有组合的相反数
        // 计数器
        int count = 0;
        for (int c : C) {
            for (int d : D) {
                int target = -c - d;
                if (map.containsKey(target)) {
                    count += map.get(target);
                }
            }
        }
        return count;
    }
}
```



```python
from typing import List


class Solution:
    def fourSumCount(self, A: List[int], B: List[int], C: List[int], D: List[int]) -> int:
        map = dict()
        for num3 in C:
            for num4 in D:
                map[num3 + num4] = (map.setdefault(num3 + num4, 0) + 1)

        res = 0

        for num1 in A:
            for num2 in B:
                s = num1 + num2
                if -s in map:
                    res += map[-s]
        return res
```



方法二：用乘法





```python
from typing import List


class Solution:
    def fourSumCount(self, A: List[int], B: List[int], C: List[int], D: List[int]) -> int:
        map1 = self.__get_map(A, B)
        map2 = self.__get_map(C, D)
        res = 0

        for key1 in map1:
            if -key1 in map2:
                res += map1[key1] * map2[-key1]
        return res

    def __get_map(self, tuple1, tuple2):
        map = dict()
        for num1 in tuple1:
            for num2 in tuple2:
                map[num1 + num2] = (map.setdefault(num1 + num2, 0) + 1)
        return map
```



