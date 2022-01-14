---
title: 「力扣」第 461 题：汉明距离（简单）
icon: yongyan
category: 数组
tags:
  - 数组
---

- 题目链接：[461. 汉明距离](https://leetcode-cn.com/problems/hamming-distance)。

## 题目描述

两个整数之间的 [汉明距离](https://baike.baidu.com/item/汉明距离) 指的是这两个数字对应二进制位不同的位置的数目。

给你两个整数 `x` 和 `y`，计算并返回它们之间的汉明距离。

**示例 1：**

```
输入：x = 1, y = 4
输出：2
解释：
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
上面的箭头指出了对应二进制位不同的位置。
```

**示例 2：**

```
输入：x = 3, y = 1
输出：1
```

**提示：**

- `0 <= x, y <= 2^31 - 1`

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
class Solution {
    public int hammingDistance(int x, int y) {
        StringBuilder xx = new StringBuilder(Integer.toBinaryString(x));
        StringBuilder yy = new StringBuilder(Integer.toBinaryString(y));
        if (xx.length() > yy.length()) {
            StringBuilder temp = xx;
            xx = yy;
            yy = temp;
        }
        int diff = yy.length() - xx.length();
        for (int i = 0; i < diff; i++) {
            xx.insert(0,'0');
        }
        int sum = 0;
        for (int i = 0; i < yy.length(); i++) {
            if (xx.charAt(i) != yy.charAt(i)) {
                sum++;
            }
        }
        return sum;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Java">
```java
class Solution {
    public int hammingDistance(int x, int y) {
        StringBuilder xx = new StringBuilder(Integer.toBinaryString(x));
        StringBuilder yy = new StringBuilder(Integer.toBinaryString(y));

        boolean bothNegative = x < 0 && y < 0;
        if (!bothNegative) {
            // 始终让 xx 是长度比较小的那个字符串，这样补齐总是在 x 的前面补 0
            if (xx.length() > yy.length()) {
                StringBuilder temp = xx;
                xx = yy;
                yy = temp;
            }
            int diff = yy.length() - xx.length();
            for (int i = 0; i < diff; i++) {
                xx.insert(0, '0');
            }
        }
        int sum = 0;
        for (int i = 0; i < yy.length(); i++) {
            if (xx.charAt(i) != yy.charAt(i)) {
                sum++;
            }
        }
        return sum;
    }

}

```
</CodeGroupItem>
</CodeGroup>
```
