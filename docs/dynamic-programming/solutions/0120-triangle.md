---
title: 「力扣」第 120 题： 三角形最小路径和（中等）
icon: yongyan
category: 动态规划
tags:
  - 动态规划
---

掌握如何定义「状态」和写出「状态转移方程」。

- 题目链接：[120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/)。

## 题目描述

给定一个三角形 `triangle` ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。**相邻的结点** 在这里指的是 **下标** 与 **上一层结点下标** 相同或者等于 **上一层结点下标 + 1** 的两个结点。也就是说，如果正位于当前行的下标 `i` ，那么下一步可以移动到下一行的下标 `i` 或 `i + 1` 。

**示例 1：**

```
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
```

**示例 2：**

```
输入：triangle = [[-10]]
输出：-10
```

**提示：**

- `1 <= triangle.length <= 200`
- `triangle[0].length == 1`
- `triangle[i].length == triangle[i - 1].length + 1`
- `-10^4 <= triangle[i][j] <= 10^4`

**进阶：**

- 你可以只使用 `O(n)` 的额外空间（`n` 为三角形的总行数）来解决这个问题吗？

## 思路分析

关键的地方在于三角形「从上到下」和「从下到上」思考的方向的不同。

1、**从下到上**（推荐）：

![image-20200714101322790](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggqa51dsbdj319w0q840q.jpg)

**状态定义**：`dp[i][j]` 表示「自底向上」的最小路径和。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public int minimumTotal(List<List<Integer>> triangle) {
        int len = triangle.size();
        if (len == 0) {
            return 0;
        }
        // 注意：这里 len + 1 是为了防止越界
        int[] dp = new int[len + 1];
        for (int i = len - 1; i >= 0; i--) {
            for (int j = 0; j < i + 1; j++) {
                dp[j] = Math.min(dp[j], dp[j + 1]) + triangle.get(i).get(j);
            }
            // 每一步观察是不是我们想要的，这是调试的重要方法
            // System.out.println(Arrays.toString(dp));
        }
        return dp[0];
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        List<Integer> step1 = generateIntegerList(new int[]{2});
        List<Integer> step2 = generateIntegerList(new int[]{3, 4});
        List<Integer> step3 = generateIntegerList(new int[]{6, 5, 7});
        List<Integer> step4 = generateIntegerList(new int[]{4, 1, 8, 3});


        List<List<Integer>> triangle = new ArrayList<>();
        triangle.add(step1);
        triangle.add(step2);
        triangle.add(step3);
        triangle.add(step4);
        int minimumTotal = solution.minimumTotal(triangle);
        System.out.println(minimumTotal);
    }

    private static List<Integer> generateIntegerList(int[] nums) {
        List<Integer> arr = new ArrayList<>();
        for (int num : nums) {
            arr.add(num);
        }
        return arr;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
from typing import List


class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        size = len(triangle)
        if size == 0:
            return 0
        dp = [0] * size
        for i in range(size):
            dp[i] = triangle[size - 1][i]
        for i in range(size - 2, - 1, -1):
            for j in range(i + 1):
                dp[j] = min(dp[j], dp[j + 1]) + triangle[i][j]
        return dp[0]

````

</CodeGroupItem>
</CodeGroup>

**参考代码**：（原地修改，不建议这么做）

```python
from typing import List


class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        size = len(triangle)
        if size == 0:
            return 0
        dp = triangle[-1]
        for i in range(size - 2, -1, -1):
            for j in range(len(triangle[i])):
                dp[j] = min(dp[j], dp[j + 1]) + triangle[i][j]
        return dp[0]
```

2、从上到下：

![image-20200714101445905](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggqa6f1notj317c0o8jti.jpg)

---

CSDN 版本

## 「力扣」第 120 题： 三角形最小路径和（中等）

> 掌握如何定义「状态」和写出「状态转移方程」。

- [链接](https://leetcode-cn.com/problems/triangle)

> 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。
>
> 例如，给定三角形：
>
> ```
> [
>   [2],
>  [3,4],
> [6,5,7],
> [4,1,8,3]
> ]
> ```
>
> 自顶向下的最小路径和为 `11`（即，**2** + **3** + **5** + **1** = 11）。
>
> **说明：**
>
> 如果你可以只使用 _O_(_n_) 的额外空间（_n_ 为三角形的总行数）来解决这个问题，那么你的算法会很加分。

**思路分析**：

关键的地方在于三角形「从上到下」和「从下到上」思考的方向的不同。

1、**从下到上**（推荐）：

![image-20200714101322790](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA3UzhaSWxneTFnZ3FhNTFkc2JkajMxOXcwcTg0MHEuanBn?x-oss-process=image/format,png)

**状态定义**：`dp[i][j]` 表示「自底向上」的最小路径和。

Java 代码：

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public int minimumTotal(List<List<Integer>> triangle) {
        int len = triangle.size();
        if (len == 0) {
            return 0;
        }
        // 注意：这里 len + 1 是为了防止越界
        int[] dp = new int[len + 1];
        for (int i = len - 1; i >= 0; i--) {
            for (int j = 0; j < i + 1; j++) {
                dp[j] = Math.min(dp[j], dp[j + 1]) + triangle.get(i).get(j);
            }
            // 每一步观察是不是我们想要的，这是调试的重要方法
            // System.out.println(Arrays.toString(dp));
        }
        return dp[0];
    }

    public static void main(String[] args) {
        Solution solution = new Solution();

        List<Integer> step1 = generateIntegerList(new int[]{2});
        List<Integer> step2 = generateIntegerList(new int[]{3, 4});
        List<Integer> step3 = generateIntegerList(new int[]{6, 5, 7});
        List<Integer> step4 = generateIntegerList(new int[]{4, 1, 8, 3});


        List<List<Integer>> triangle = new ArrayList<>();
        triangle.add(step1);
        triangle.add(step2);
        triangle.add(step3);
        triangle.add(step4);
        int minimumTotal = solution.minimumTotal(triangle);
        System.out.println(minimumTotal);
    }

    private static List<Integer> generateIntegerList(int[] nums) {
        List<Integer> arr = new ArrayList<>();
        for (int num : nums) {
            arr.add(num);
        }
        return arr;
    }
}
```

Python 代码：

```python
from typing import List


class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        size = len(triangle)
        if size == 0:
            return 0
        dp = [0] * size
        for i in range(size):
            dp[i] = triangle[size - 1][i]
        for i in range(size - 2, - 1, -1):
            for j in range(i + 1):
                dp[j] = min(dp[j], dp[j + 1]) + triangle[i][j]
        return dp[0]

```

Python 代码：（原地修改，不建议这么做）

```python
from typing import List


class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        size = len(triangle)
        if size == 0:
            return 0
        dp = triangle[-1]
        for i in range(size - 2, -1, -1):
            for j in range(len(triangle[i])):
                dp[j] = min(dp[j], dp[j + 1]) + triangle[i][j]
        return dp[0]
```

2、从上到下：

![image-20200714101445905](https://imgconvert.csdnimg.cn/aHR0cHM6Ly90dmExLnNpbmFpbWcuY24vbGFyZ2UvMDA3UzhaSWxneTFnZ3FhNmYxbm90ajMxN2MwbzhqdGkuanBn?x-oss-process=image/format,png)
