---
title: 「力扣」第 424 题：替换后的最长重复字符（中等）
icon: yongyan
category: 滑动窗口
tags:
  - 滑动窗口
---

- 题目链接：[424. 替换后的最长重复字符](https://leetcode-cn.com/problems/longest-repeating-character-replacement/)；
- 题解链接：[🎦 替换后的最长重复字符](https://leetcode-cn.com/problems/longest-repeating-character-replacement/solution/ti-huan-hou-de-zui-chang-zhong-fu-zi-fu-eaacp/)。

::: danger 视频讲解
:tv: 这道题在 [官方题解](ttps://leetcode-cn.com/problems/longest-repeating-character-replacement/solution/ti-huan-hou-de-zui-chang-zhong-fu-zi-fu-eaacp/) 和 [B 站](https://www.bilibili.com/video/BV14r4y1K7rN) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=756442454&bvid=BV14r4y1K7rN&cid=291912784&page=1" frameborder="no" scrolling="no"></iframe>
</div>

## 题目描述

给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，总共可最多替换 _k_ 次。在执行上述操作后，找到包含重复字母的最长子串的长度。

**注意：** 字符串长度 和 _k_ 不会超过 104。

**示例 1：**

```
输入：s = "ABAB", k = 2
输出：4
解释：用两个'A'替换为两个'B',反之亦然。
```

**示例 2：**

```
输入：s = "AABABBA", k = 1
输出：4
解释：
将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
子串 "BBBB" 有最长重复字母, 答案为 4。
```

**Constraints:**

- $1 <= s.length <= 10^5$
- `s` consists of only uppercase English letters.
- `0 <= k <= s.length`

**参考代码**：

```java
public class Solution {

    public int characterReplacement(String s, int k) {
        int len = s.length();
        if (len < 2) {
            return len;
        }

        char[] charArray = s.toCharArray();
        int[] freq = new int[26];
        int maxCount = 0;

        int left = 0;
        int right = 0;
        // [left..right) 内最多替换 k 个字符可以得到只有一种字符的子串
        while (right < len) {
            freq[charArray[right] - 'A']++;
            maxCount = Math.max(maxCount, freq[charArray[right] - 'A']);
            right++;

            if (right - left > maxCount + k) {
                freq[charArray[left] - 'A']--;
                left++;
            }
        }
        return right - left;
    }
}
```
