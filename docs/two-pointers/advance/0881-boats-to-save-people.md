---
title: 「力扣」第 881 题：救生艇（中等）
icon: yongyan
category: 双指针
tags:
  - 双指针
---

+ 题目链接：[881. 救生艇](https://leetcode-cn.com/problems/boats-to-save-people/)。

## 题目描述

**摘要**：重点理解可以使用「双指针」算法的原因，「双指针」算法是「暴力解法」的优化，这样的算法往往需要一定的经验和尝试。

![0881](https://tva1.sinaimg.cn/large/008i3skNgy1gx1p4x1zscj30p00ant92.jpg)

+ [题目链接](https://leetcode-cn.com/problems/boats-to-save-people/)

第 `i` 个人的体重为 `people[i]`，每艘船可以承载的最大重量为 `limit`。

每艘船最多可同时载两人，但条件是这些人的重量之和最多为 `limit`。

返回载到每一个人所需的最小船数。(保证每个人都能被船载)。

**示例 1：**

```
输入：people = [1,2], limit = 3
输出：1
解释：1 艘船载 (1, 2)
```

**示例 2：**

```
输入：people = [3,2,2,1], limit = 3
输出：3
解释：3 艘船分别载 (1, 2), (2) 和 (3)
```

**示例 3：**

```
输入：people = [3,5,3,4], limit = 5
输出：4
解释：4 艘船分别载 (3), (3), (4), (5)
```

**提示：**

- `1 <= people.length <= 50000`
- `1 <= people[i] <= limit <= 30000`

---

## 理解题意

+ 题目当中很重要的信息是：每艘船最多可同时载两人；
+ 保证每个人都能被船载，题目最后给出的提示也告诉我们： `people[i] <= limit`。

## 解题思路

让当前体重最轻的人能够与当前体重最重的人配对（乘坐同一艘船）：

+ 如果不能配对，说明 **当前体重最重的人** 需要单独配一艘船；
+ 如果可以配对，则将他们配对（乘坐同一艘船）。

因此，可以将输入数组升序排序，在数组的头和尾分别设置一个变量 `left` 和 `right` （双指针算法）：

+ 如果 `people[left] + people[right] <= limit` ：说明 `left` 和 `right` 指向的人可以配对（乘坐同一艘船），此时 `left` 和 `right` 各向中间走一步；
+ 如果 `people[left] + people[right] > limit` ：说明 `right` 指向的人太重了，他应该单独乘坐一艘船。即 `right` 向中间走一步（`right--`）。

按照上面的方式，直到 `left` 与 `right` 重合，这样就可以完成任务。

**参考代码**：

```java
import java.util.Arrays;

public class Solution {

    public int numRescueBoats(int[] people, int limit) {
        Arrays.sort(people);

        int len = people.length;
        int res = 0;

        int left = 0;
        int right = len - 1;
        while (left <= right) {
            if (people[left] + people[right] <= limit) {
                left++;
            }
            right--;
            res++;
        }
        return res;
    }
}
```

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度，` left` 和 `right` 一起遍历了数组的长度；
+ 空间复杂度：$O(1)$，只使用了常数个变量。

## 总结

讨论当前 **最轻的人** 是不是可以和当前最重的人配对（乘坐同一艘船），这样可以使得每艘船的利用率最大。这其实是「贪心算法」的思想。

---

欢迎大家关注我的公众号「算法不好玩」，B 站搜索「liweiwei1419」，我讲解的算法知识特别好懂。