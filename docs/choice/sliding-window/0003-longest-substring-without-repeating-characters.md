---
title: 「力扣」第 3 题：无重复字符的最长子串
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

![0003](https://tva1.sinaimg.cn/large/008i3skNgy1gx95jc8xwpj30p00anaan.jpg)

+ 题目链接：[3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)、[剑指 Offer II 016. 不含重复字符的最长子字符串](https://leetcode-cn.com/problems/wtcaE1/)（两题一模一样）；
+ 题解地址：[滑动窗口入门问题（Java）](https://leetcode-cn.com/problems/wtcaE1/solution/hua-dong-chuang-kou-ru-men-wen-ti-java-b-x4cx/)

## 题目描述

给定一个字符串 `s` ，请你找出其中不含有重复字符的 **最长连续子字符串** 的长度。

**示例 1:**

```
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

**示例 2:**

```
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

**示例 3:**

```
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

**示例 4:**

```
输入: s = ""
输出: 0
```

 **提示：**

- $0 \le s.length \le 5 * 10^4$
- `s` 由英文字母、数字、符号和空格组成

## 思路描述


这道问题的暴力解法是：枚举所有的子串（时间复杂度 $O(N^2)$），再对每一个子串判断是否有重复字符（时间复杂度 $O(N)$），总的时间复杂度为 $O(N^3)$，这里 $N$ 是输入字符的长度。

**关键字**：

+ 连续子字符串，「连续」很重要；
+ 只要求返回长度，不要求得到具体的子串的结果。

注意到以下两个事实：

+ 如果一个子串包含重复字符，那么与它有相同左端点的、长度更长的字符串一定也包含重复字符；
+ 又由于题目只要求我们找最长不重复子串的 **长度**，如果已经找到了一个长度为 $n$ 的子串，那么小于等于长度 $n$ 的子串就没有必要再枚举了。

### 方法：滑动窗口

基于以上两点，我们就可以使用 **右指针、左指针交替向右移动的方式** 考虑完所有暴力解法需要考虑的子串，因此「滑动窗口」是「暴力解法」的优化。

**「滑动窗口」算法只要右指针移动到数组的末尾程序就结束了**。暴力解法需要考虑的子串的数量级是 $O(N^2)$（具体我们就不计算它了），而滑动窗口我们需要考虑的子串为 $O(2N) = O(N)$。

还需要解决的一个问题，如何判断子串里是否有重复的字符，很容易想到使用「哈希表」统计字符出现次数。注意到题目的「数据范围」里说到：`s` 由英文字母、数字、符号和空格组成。我们还可以使用数组代替哈希表，事实上哈希表的底层也是数组。

+ 当右指针向右移动将字符纳入滑动窗口的时候，字符的频数加 $1$；
+ 当左指针向右移动将字符移出滑动窗口的时候，字符的频数减 $1$。

其它细节请见「参考代码 1」：

**参考代码 1**：

```java
public class Solution {

    public int lengthOfLongestSubstring(String s) {
        int len = s.length();
        if (len < 2) {
            return len;
        }

        char[] charArray = s.toCharArray();
        int left = 0;
        int right = 0;

        int[] freq = new int[128];
        int res = 1;
        while (right < len){
            freq[charArray[right]]++;
            while (freq[charArray[right]] == 2){
                freq[charArray[left]]--;
                left++;
            }
            // charArray[left..right] 不包含重复字符
            res = Math.max(res , right - left + 1);
            right++;
        }
        return res;
    }
}
```

**说明**：
+ 注意内层循环：`while (freq[charArray[right]] == 2)`：出现重复字符的时候，只能让左边界 `left` 右移，同时减少左边界字符的频数，直到右边界字符的频数为 $1$；
+ 退出内层循环以后，区间 `[left..right]` 不包含重复字符，此时，记录区间的长度，并取最大值。



**复杂度分析**：

+ 时间复杂度：右指针遍历了数组一次、左指针还没有遍历到数组的末尾就停了下来，因此时间复杂度为 $O(N)$；
+ 空间复杂度：空间复杂度取决于输入字符串中有哪些字符。

---

下面给出的另一种「滑动窗口」的代码，基本的思想是：**当前得到的最长不重复的字符，一定存在于两个相同的字符之间**。因此，可以在遍历的时候，记录遍历到的字符出现的位置：如果当前遍历到的字符以前出现过，以前出现过的位置 + 1，到当前位置就是一个最长不重复的子串。

![image.png](https://pic.leetcode-cn.com/1630724197-DphsTe-image.png){:style="width:500px"}{:align=center}

这里要注意一个细节：以前出现过的位置，如果在左边界 `left` 之前，是「无效」的，请看下面这个例子。

![image.png](https://pic.leetcode-cn.com/1630725009-VJYTRI-image.png){:style="width:400px"}{:align=center}

所以只有在上一次出现的位置在 `left` 以及 `left` 以后，才更新 `left` 到上一次出现的位置的下一个。

**参考代码 2**：

```java
import java.util.Arrays;

public class Solution {

    public int lengthOfLongestSubstring(String s) {
        int len = s.length();
        if (len < 2) {
            return len;
        }

        // 记录了每个元素在数组中的下标
        int[] position = new int[128];
        Arrays.fill(position, -1);

        char[] charArray = s.toCharArray();
        int res = 1;
        int left = 0;
        for (int right = 0; right < len; right++) {
            // 如果已经出现过，左边界应该更新到上一次相同字符的下一个位置
            if (position[charArray[right]] != -1 && position[charArray[right]] >= left) {
                left = position[charArray[right]] + 1;
            }
            res = Math.max(res, right - left + 1);
            position[charArray[right]] = right;
        }
        return res;
    }
}
```
```Java []
import java.util.Arrays;

public class Solution {

    public int lengthOfLongestSubstring(String s) {
        int len = s.length();
        if (len < 2) {
            return len;
        }

        // 记录了每个元素在数组中的下标
        int[] position = new int[128];
        Arrays.fill(position, -1);

        char[] charArray = s.toCharArray();
        int res = 1;
        int left = 0;
        for (int right = 0; right < len; right++) {
            // 如果已经出现过，左边界应该更新到上一次相同字符的下一个位置
            if (position[charArray[right]] != -1) {
                left = Math.max(left, position[charArray[right]] + 1);
            }
            res = Math.max(res, right - left + 1);
            position[charArray[right]] = right;
        }
        return res;
    }
}
```


---

**小结**：

滑动窗口的问题基本上都可以写成「双重循环」的样子，其中：

+ 外层循环让右指针向右移动；
+ 内层循环让左指针向右移动。

暴力解法我们需要考虑所有可能的子串，我们把它们列出表格如下。我们用数对 $(i,j)$ 表示子串 `s[i..j]` 。

![image.png](https://pic.leetcode-cn.com/1630673981-lUwPHd-image.png)

而使用「滑动窗口」算法我们需要考虑的子串如下图所示。

![image.png](https://pic.leetcode-cn.com/1630673994-PiHZuU-image.png)



