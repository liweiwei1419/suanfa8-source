---
title: 1.8 循环不变量练习（4 题）
icon: shipin
category: 循环不变量
tags:
  - 数组
  - 循环不变量
---

::: info 温馨提示
本节的 4 个视频均有视频讲解，在 :tv: 标注的地方。
:::


::: danger 循环不变量
+ 循环不变量用于证明算法的有效性，也是编码正确的理论依据；
+ 循环不变量定义帮助分清先加还是先赋值，还有一些边界条件。定义清楚循环不变量以后，代码的编写就会很轻松；
+ 建议把「循环不变量」作为注释写在代码里，以方便自己调试和他人阅读。
:::

| 题号 | 链接                                                         | 题解                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 912  | [排序数组](https://leetcode-cn.com/problems/sort-an-array)（中等） | [文字题解](https://leetcode-cn.com/problems/sort-an-array/solution/fu-xi-ji-chu-pai-xu-suan-fa-java-by-liweiwei1419/) |
| 26   | [删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array)（简单） |                                                              |
| 283  | [移动零](https://leetcode-cn.com/problems/move-zeroes)（简单） | [文字题解](https://leetcode-cn.com/problems/move-zeroes/solution/zun-shou-xun-huan-bu-bian-shi-java-by-liweiwei1419/) |
| 27   | [移除元素](https://leetcode-cn.com/problems/remove-element/)（简单） |                                                              |
| 80   | [删除排序数组中的重复项 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/description/)（中等） |                                                              |


## 例 1：「力扣」第 26 题：删除排序数组中的重复项 <Badge text="简单" type="info"/>

+ 中文：[26. 删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/description/)；
+ 英文：[26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/) 。

### :tv: **视频教程**

建议使用 1.5 倍速观看。

* [3-2 例 1：「力扣」第 26 题：删除数组中重复的元素（06:20）](https://www.bilibili.com/video/BV1Jg411M7Lp?p=2) 

### 题目描述

给定一个排序数组，你需要在 **原地** 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在 **原地修改输入数组** 并在使用 $O(1)$ 额外空间的条件下完成。

**示例 1:**

```
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。
```

**示例 2:**

```
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```

**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以 **“引用”** 方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下：

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
        if (len < 2) {
            return len;
        }
        // 循环不变量：nums[0..j）是移除重复元素以后的数组
        int j = 1;
        for (int i = 1; i < len; i++) {
            if (nums[i] != nums[j - 1]) {
                // 注意顺序：先更新值，再递增下标
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
public class Solution {

    public int removeDuplicates(int[] nums) {
        int len = nums.length;
        if (len < 2) {
            return len;
        }
        // 循环不变量：nums[0..j] 是移除重复元素以后的数组
        int j = 0;
        for (int i = 1; i < len; i++) {
            if (nums[i] != nums[j]) {
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

## 例 2：「力扣」第 283 题：移动零 <Badge text="简单" type="info"/>



+ 中文：[283. 移动零](https://leetcode-cn.com/problems/move-zeroes/description/)；
+ 英文：[283. Move Zeroes](https://leetcode.com/problems/move-zeroes/description/)；
+ 题解链接：[遵守循环不变式（Java）](https://leetcode-cn.com/problems/move-zeroes/solution/zun-shou-xun-huan-bu-bian-shi-java-by-liweiwei1419/)。

### :tv: **视频教程**

建议使用 1.5 倍速观看。

* [3-3 例 2：「力扣」第 283 题：移动零（03:26）](https://www.bilibili.com/video/BV1Jg411M7Lp?p=3)


### 题目描述

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
```
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
```
</CodeGroupItem>
</CodeGroup>


**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
+ 空间复杂度：$O(1)$，只使用了常数个变量。

## 例 3：「力扣」第 27 题：移除元素 <Badge text="简单" type="info"/>


+ 中文：[27. 移除元素](https://leetcode-cn.com/problems/remove-element/description/)；
+ 英文：[27. Remove Element](https://leetcode.com/problems/remove-element/description/) 。


### :tv: **视频教程**

建议使用 1.5 倍速观看。


* [3-4 例 3：「力扣」第 27 题：移除元素（03:17）](https://www.bilibili.com/video/BV1Jg411M7Lp?p=4)



### 题目描述

给定一个数组 *nums* 和一个值 *val*，你需要**原地**移除所有数值等于 *val* 的元素，返回移除后数组的新长度。

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

```
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
```
</CodeGroupItem>
</CodeGroup>

**复杂度分析**：

+ 时间复杂度：$O(N)$，这里 $N$ 是输入数组的长度；
+ 空间复杂度：$O(1)$，只使用了常数个变量。

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