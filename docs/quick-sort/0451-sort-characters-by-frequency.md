---
title: 「力扣」第 451 题：根据字符出现频率排序（中等）
icon: yongyan
category: 排序算法
tags:
  - 排序算法
  - 分而治之
  - 快速排序
---

- 题目链接：[451. 根据字符出现频率排序](https://leetcode-cn.com/problems/sort-characters-by-frequency/)。

## 题目描述

给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

**示例 1:**

```
输入:
"tree"

输出:
"eert"

解释:
'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
```

**示例 2:**

```
输入:
"cccaaa"

输出:
"cccaaa"


解释:
'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。
```

**示例 3:**

```
输入:
"Aabb"

输出:
"bbAa"

解释:
此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
```

**Constraints:**

- `1 <= s.length <= 5 * 10^5`
- `s` consists of uppercase and lowercase English letters and digits.

解释题意：给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

### 方法一：排序

### 方法二：三路快排

注意到有大量重复键值。

**参考代码 1**：

```java
import java.util.Random;


class Solution {
    
    private final static Random random = new Random(System.currentTimeMillis());
    
    private int[] freq;
    
    public String frequencySort(String s) {
        freq = new int[128];
        char[] charArray = s.toCharArray();
        for (char c : charArray) {
            freq[c]++;
        }
        
        quickSort(charArray, 0, s.length() - 1);
        return new String(charArray);
    }
    
    private void quickSort(char[] charArray, int left, int right) {
        if (left >= right) {
            return;
        }

        // [left..right]
        int randomIndex = left + random.nextInt(right - left + 1); 
        swap(charArray, left, randomIndex);
        
        int pivot = charArray[left];

        int lt = left + 1; // lt: less than
        int gt = right; // ge: greater than
        // all in nums[left + 1..lt) < pivot
        // all in nums[lt..i) = pivot
        // all in nums(gt..right] > pivot
        int i = left + 1;

        while (i <= gt) {
            if (freq[charArray[i]] > freq[pivot]) {
                swap(charArray, i, lt);
                lt++;
                i++;
            } else if (charArray[i] == pivot) {
                i++;
            } else {
                // nums[i] > pivot
                swap(charArray, i, gt);
                gt--;
            }
        } 
        
        swap(charArray, left, lt - 1);

        quickSort(charArray, left, lt - 2);
        quickSort(charArray, gt + 1, right);
    }

    

    private void swap(char[] charArray, int index1, int index2) {
        char temp = charArray[index1];
        charArray[index1] = charArray[index2];
        charArray[index2] = temp;
    }

}
```

**参考代码 2**：

```java
import java.util.Random;

public class Solution {

    private int[] freq;

    private static final Random RANDOM = new Random(System.currentTimeMillis());

    public String frequencySort(String s) {
        // 先转换为字符数组，以避免 charAt() 方法每次都检查下标有效性
        char[] charArray = s.toCharArray();
        // 用 128 是测试出来的，说明题目中的字符只有 a-zA-Z
        freq = new int[128];
        for (char c : charArray) {
            freq[c]++;
        }

        int len = charArray.length;
        quickSort(charArray, 0, len - 1);
        return new String(charArray);
    }

    private void quickSort(char[] charArray, int left, int right) {
        if (left >= right) {
            return;
        }
        int randomIndex = left + RANDOM.nextInt(right - left + 1);
        swap(charArray, randomIndex, left);

        // 循环不变量定义
        // all in [left + 1..lt] 的频数 > pivot 的频数
        // all in [lt + 1..i) 的频数 = pivot 的频数
        // all in [gt..right] 的频数 < pivot 的频数
        int pivot = charArray[left];
        int lt = left;
        int gt = right + 1;

        int i = left + 1;
        while (i < gt) {
            // 只需要在这句话外面套一层 freq [] ，其它逻辑和快速排序一样
            if (freq[charArray[i]] > freq[pivot]) {
                lt++;
                swap(charArray, i, lt);
                i++;
            } else if (charArray[i] == pivot) {
                i++;
            } else {
                gt--;
                swap(charArray, i, gt);
            }
        }
        swap(charArray, left, lt);
        // 注意这里，大大减少了分治的区间
        quickSort(charArray, left, lt - 1);
        quickSort(charArray, gt, right);
    }

    private void swap(char[] charArray, int index1, int index2) {
        char temp = charArray[index1];
        charArray[index1] = charArray[index2];
        charArray[index2] = temp;
    }
}
```