---
title: 「力扣」第 349 题：计算两个数组的交集
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

+ 题目链接：[]()；
+ 题解链接：[]()。

## 题目描述



#### [349. 两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)



Java 代码：

```java
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;


public class Solution {

    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set1 = new HashSet<>();
        for (int value : nums1) {
            set1.add(value);
        }
        
        Set<Integer> set2 = new HashSet<>();
        for (int value : nums2) {
            if (set1.contains(value)) {
                set2.add(value);
            }
        }
        
        int size = set2.size();
        int[] res = new int[size];
        int next = 0;
        for (Integer num : set2) {
            res[next] = num;
            next++;
        }
        return res;
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 2, 2, 1};
        int[] nums2 = {2, 2};
        int[] res = new Solution().intersection(nums1, nums2);
        System.out.println(Arrays.toString(res));
    }
}
```

### 