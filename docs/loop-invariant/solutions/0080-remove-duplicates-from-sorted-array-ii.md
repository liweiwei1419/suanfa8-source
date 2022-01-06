---
title: 例 4：「力扣」第 80 题：删除排序数组中的重复项 II（中等）
icon: shipin
category: 循环不变量
tags:
  - 数组
  - 循环不变量
---


## 例 4：「力扣」第 80 题：删除排序数组中的重复项 II <Badge text="中等" type="warn"/>

+ 中文网址：[80. 删除排序数组中的重复项 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/description/)；
+ 英文网址：[80. Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/) 。

### :tv: **视频教程**

建议使用 1.5 倍速观看。

* [3-5 例 4：「力扣」第 80 题：删除数组中重复的元素 II（07:30）](https://www.bilibili.com/video/BV1Jg411M7Lp?p=5)



### 题目描述

给定一个排序数组，你需要在 **原地** 删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 **原地修改输入数组** 并在使用 O(1) 额外空间的条件下完成。

**示例 1:**

```
给定 nums = [1,1,1,2,2,3],

函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3 。

你不需要考虑数组中超出新长度后面的元素。
```

**示例 2:**

```
给定 nums = [0,0,1,1,1,1,2,3,3],

函数应返回新长度 length = 7, 并且原数组的前五个元素被修改为 0, 0, 1, 1, 2, 3, 3 。

你不需要考虑数组中超出新长度后面的元素。
```

**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以 **“引用”** 方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

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

    public int removeDuplicates(int[] nums) {
        int len = nums.length;
        if (len < 2){
            return len;
        }

        // 循环不变量：nums[0..j) 是有序的，并且相同元素最多保留 2 次
        // j 指向下一个要赋值的元素的位置
        int j = 2;
        for (int i = 2; i < len; i++) {
            if (nums[i] != nums[j - 2]){
                nums[j] = nums[i];
                j++;
            }
        }
        return j;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
public class Solution2 {

    public int removeDuplicates(int[] nums) {
        int len = nums.length;
        if (len < 2){
            return len;
        }

        // 循环不变量：nums[0..j] 是有序的，并且相同元素最多保留 2 次
        // j 已经赋值过的元素的最后一个位置
        int j = 1;
        for (int i = 2; i < len; i++) {
            if (nums[i] != nums[j - 1]){
                j++;
                nums[j] = nums[i];
            }
        }
        return j + 1;
    }
}
```
</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
+ 空间复杂度：$O(1)$，只使用了常数个变量。