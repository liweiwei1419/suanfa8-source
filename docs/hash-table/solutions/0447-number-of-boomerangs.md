---
title: 「力扣」第 447 题：回旋镖的数量（中等）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

+ 题目链接：[477. 汉明距离总和](https://leetcode-cn.com/problems/total-hamming-distance/)。

## 题目描述

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

## 方法一：使用乘法

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

## 方法二：使用加法

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





