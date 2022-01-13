---
title: 例 2：「力扣」第 283 题：移动零（简单）
icon: shipin
category: 循环不变量
tags:
  - 数组
  - 循环不变量
---

- 题目链接：[283. 移动零](https://leetcode-cn.com/problems/move-zeroes/description/) <Badge text="简单" type="info"/> ；
- 题解链接：[遵守循环不变式（Java）](https://leetcode-cn.com/problems/move-zeroes/solution/zun-shou-xun-huan-bu-bian-shi-java-by-liweiwei1419/)。

### :tv: **视频教程**

建议使用 1.5 倍速观看。

- [3-3 例 2：「力扣」第 283 题：移动零（03:26）](https://www.bilibili.com/video/BV1Jg411M7Lp?p=3)。

::: danger 视频讲解
:tv: 这道题在 [B 站](https://www.bilibili.com/video/BV1Jg411M7Lp?p=3) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=504293075&bvid=BV1Jg411M7Lp&cid=375382369&page=3" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

**示例:**

```
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**说明**:

1. 必须在原数组上操作，不能拷贝额外的数组。
2. 尽量减少操作次数。

（思路分析在「视频教程」，在这里只给出「参考代码」。）

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public void moveZeroes(int[] nums) {
        int len = nums.length;

        // 循环不变量：nums[0..j) !=0, nums[j..i) = 0
        // j 指向了下一个要赋值的元素的位置
        int j = 0;
        for (int i = 0; i < len; i++) {
            if (nums[i] != 0) {
                nums[j] = nums[i];
                j++;
            }
        }

        for (int i = j; i < len; i++) {
            nums[i] = 0;
        }
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public void moveZeroes(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return;
        }
        // 循环不变式：nums[0..j] != 0，nums(j..i) == 0
        int j = -1;
        for (int i = 0; i < len; i++) {
            if (nums[i] != 0) {
                j++;
                swap(nums, j, i);
            }
        }
    }

    private void swap(int[] nums, int index1, int index2) {
        int temp = nums[index1];
        nums[index1] = nums[index2];
        nums[index2] = temp;
    }
}
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
- 空间复杂度：$O(1)$，只使用了常数个变量。
