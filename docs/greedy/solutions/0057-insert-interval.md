---
title: 「力扣」第 57 题：插入区间（中等）
icon: yongyan
category: 贪心算法
tags:
  - 贪心算法
---

## 题目描述

给你一个 **无重叠的** *，*按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

**示例 1：**

```
输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
输出：[[1,5],[6,9]]
```

**示例 2：**

```
输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
```

**示例 3：**

```
输入：intervals = [], newInterval = [5,7]
输出：[[5,7]]
```

**示例 4：**

```
输入：intervals = [[1,5]], newInterval = [2,3]
输出：[[1,5]]
```

**示例 5：**

```
输入：intervals = [[1,5]], newInterval = [2,7]
输出：[[1,7]]
```

**提示：**

- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= intervals[i][0] <= intervals[i][1] <= 10^5`
- `intervals` 根据 `intervals[i][0]` 按 **升序** 排列
- `newInterval.length == 2`
- `0 <= newInterval[0] <= newInterval[1] <= 10^5`

* [参考资料](https://www.bilibili.com/video/BV1Qa4y1h7Zp?from=search&seid=12301546449614247781)；
* 说明：甜姨有资料汇总。

**最一般情况**：横跨几个区间。

![image.png](https://pic.leetcode-cn.com/1604474760-UIDbbp-image.png)

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public int[][] insert(int[][] intervals, int[] newInterval) {
        // 由于不能确定结果集有多少区间，使用动态数组
        List<int[]> res = new ArrayList<>();
        // 遍历输入 intervals 的下标
        int index = 0;
        int len = intervals.length;
        // 第 1 步：先把结束在 newInterval[0] 之前的加入结果集
        while (index < len && intervals[index][1] < newInterval[0]) {
            res.add(new int[]{intervals[index][0], intervals[index][1]});
            index++;
        }

        // 第 2 步：和 newInterval 覆盖的区间进行合并（更新 newInterval 的起始端点）
        // 注意：这里需要画图理解
        while (index < len && intervals[index][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[index][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[index][1]);
            index++;
        }
        res.add(new int[]{newInterval[0], newInterval[1]});

        // 第 3 步：把剩下的与 newInterval 不重合的区间加入 res
        while (index < len) {
            res.add(new int[]{intervals[index][0], intervals[index][1]});
            index++;
        }

        // 第 4 步：动态数组转换成数组 Array
        int size = res.size();
        int[][] resArray = new int[size][2];
        for (int i = 0; i < size; i++) {
            resArray[i] = res.get(i);

        }
        return resArray;
    }
}
```
