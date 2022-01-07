---
title: 「力扣」第 836 题：矩形重叠（简单）
icon: yongyan
category: 数组
tags:
  - 数组
---

+ 题目链接：[836. 矩形重叠](https://leetcode-cn.com/problems/rectangle-overlap/)。


## 题目描述

矩形以列表 `[x1, y1, x2, y2]` 的形式表示，其中 `(x1, y1)` 为左下角的坐标，`(x2, y2)` 是右上角的坐标。矩形的上下边平行于 x 轴，左右边平行于 y 轴。

如果相交的面积为 **正** ，则称两矩形重叠。需要明确的是，只在角或边接触的两个矩形不构成重叠。

给出两个矩形 `rec1` 和 `rec2` 。如果它们重叠，返回 `true`；否则，返回 `false` 。



**示例 1：**

```
输入：rec1 = [0,0,2,2], rec2 = [1,1,3,3]
输出：true
```

**示例 2：**

```
输入：rec1 = [0,0,1,1], rec2 = [1,0,2,1]
输出：false
```

**示例 3：**

```
输入：rec1 = [0,0,1,1], rec2 = [2,2,3,3]
输出：false
```



**提示：**

- `rect1.length == 4`
- `rect2.length == 4`
- `-10^9 <= rec1[i], rec2[i] <= 10^9`
- `rec1` 和 `rec2` 表示一个面积不为零的有效矩形

## 思路分析

不是这种坐标系：

```
（0,0）（0,1）（0,2）（0,3）

（1,0）（1,1）（1,2）（1,3）

（2,0）（2,1）（2,2）（2,3）

（3,0）（3,1）（3,2）（3,3）
```

而是直角坐标系

```
（3,0）（3,1）（3,2）（3,3）

（2,0）（2,1）（2,2）（2,3）

（1,0）（1,1）（1,2）（1,3）

（0,0）（0,1）（0,2）（0,3）
```

思路：从判断两条线段是否有交点推广开来。


**参考代码**：



```java
public class Solution {

    public boolean isRectangleOverlap(int[] rec1, int[] rec2) {
        boolean rowsOk = Math.max(rec1[0], rec2[0]) < Math.min(rec1[2], rec2[2]);
        boolean colsOk = Math.max(rec1[1], rec2[1]) < Math.min(rec1[3], rec2[3]);
        return rowsOk && colsOk;
    }
}
```







