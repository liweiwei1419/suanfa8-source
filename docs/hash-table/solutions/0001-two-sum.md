---
title: 「力扣」第 1 题：两数之和（简单）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

- 题目链接：[1. 两数之和](https://leetcode-cn.com/problems/two-sum/)；
- 题解链接：[:tv: 官方题解（有视频讲解）](https://leetcode-cn.com/problems/two-sum/solution/liang-shu-zhi-he-by-leetcode-solution/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](https://leetcode-cn.com/problems/two-sum/solution/liang-shu-zhi-he-by-leetcode-solution/) 和 [B 站](https://www.bilibili.com/video/BV1rv411k7VY) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=245005025&bvid=BV1rv411k7VY&cid=247884205&page=1" frameborder="no" scrolling="no"></iframe>
</div>

发布在「算法吧」的视频（带字幕和进度条）：

<video src="https://suanfa8.com/files/hash-table/lc-0001.mp4" controls="controls" width="800" height="500">
Your browser does not support the video tag.
</video>

## 题目描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** _`target`_ 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**示例 1：**

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

**示例 2：**

```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

**示例 3：**

```
输入：nums = [3,3], target = 6
输出：[0,1]
```

**提示：**

- $2 \le nums.length \le 10^4$
- $-10^9 \le nums[i] \le 10^9$
- $-10^9 \le target \le 10^9$
- **只会存在一个有效答案**

**进阶：** 你可以想出一个时间复杂度小于 $O(n^2)$ 的算法吗？

## 方法一：暴力解法

**参考代码 1**：

```java
public class Solution {

    public int[] twoSum(int[] nums, int target) {
        int len = nums.length;
        for (int i = 0; i < len - 1; i++) {
            for (int j = i + 1; j < len; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        throw new RuntimeException("没有找到和为 target 的两个数。");
    }
}
```

**复杂度分析**：

- 时间复杂度：$O(N^2)$，其中 $N$ 是输入数组的长度；
- 空间复杂度：$O(1)$。

## 方法二：哈希表

::: danger 思路来源
在遍历的过程中记住已经遍历过的元素的值和下标，因此使用「哈希表」记录看到的元素的「值」和「下标」的对应关系。
:::

**参考代码 2**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int[] twoSum(int[] nums, int target) {
        int len = nums.length;

        Map<Integer, Integer> hashMap = new HashMap<>(len - 1);
        hashMap.put(nums[0], 0);
        for (int i = 1; i < len; i++) {
            int another = target - nums[i];
            if (hashMap.containsKey(another)) {
                return new int[]{i, hashMap.get(another)};
            }
            hashMap.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        map = dict()
        for index, num in enumerate(nums):
            if target - num in map:
                return [index, map[target - num]]
            else:
                map[num] = index
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(N)$，其中 $N$ 是输入数组的长度；
- 空间复杂度：$O(N)$。

<!--

思路：用集合 Set 做差补来完成（推荐）

Python 代码：

```python
class Solution(object):
    def findNumbersWithSum(self, nums, target):
        s = set()
        for num in nums:
            if target - num not in s:
                s.add(num)
            else:
                return [num, target - num]
```

 -->
