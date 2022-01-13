---
title: 例 3：「力扣」第 27 题：移除元素（简单）
icon: shipin
category: 循环不变量
tags:
  - 数组
  - 循环不变量
---

- 题目链接：[27. 移除元素](https://leetcode-cn.com/problems/remove-element/description/) <Badge text="简单" type="info"/>。

### :tv: **视频教程**

建议使用 1.5 倍速观看。

- [3-4 例 3：「力扣」第 27 题：移除元素（03:17）](https://www.bilibili.com/video/BV1Jg411M7Lp?p=4)。

::: danger 视频讲解
:tv: 这道题在 [B 站](https://www.bilibili.com/video/BV1Jg411M7Lp?p=4) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=504293075&bvid=BV1Jg411M7Lp&cid=375382765&page=4" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

给定一个数组 _nums_ 和一个值 _val_，你需要**原地**移除所有数值等于 _val_ 的元素，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在**原地修改输入数组**并在使用 O(1) 额外空间的条件下完成。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

**示例 1:**

```
给定 nums = [3,2,2,3], val = 3,

函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。

你不需要考虑数组中超出新长度后面的元素。
```

**示例 2:**

```
给定 nums = [0,1,2,2,3,0,4,2], val = 2,

函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。

注意这五个元素可为任意顺序。

你不需要考虑数组中超出新长度后面的元素。
```

**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以**“引用”**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

（思路分析在「视频教程」，在这里只给出「参考代码」。）

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int removeElement(int[] nums, int val) {
        int len = nums.length;
        if (len == 0) {
            return len;
        }

        // 循环不变量：nums[0..j) != val
        // j 指向了下一个要赋值的元素的位置
        int j = 0;
        for (int i = 0; i < len; i++) {
            if (nums[i] != val) {
                nums[j] = nums[i];
                j++;
            }
        }
        return j;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution {

    public int removeElement(int[] nums, int val) {
        int len = nums.length;
        if (len == 0) {
            return 0;
        }

        // 循环不变量：nums[0..j] != val
        // 等于 val 的时候跳过
        // 不等于 val 的时候赋值
        int j = -1;
        for (int i = 0; i < len; i++) {
            if (nums[i] != val) {
                j++;
                nums[j] = nums[i];
            }
        }
        return j + 1;
    }
}
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

- 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
- 空间复杂度：$O(1)$，只使用了常数个变量。
