---
title: 「力扣」第 752 题：打开转盘锁（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
---


+ 题目链接：[752. 打开转盘锁](https://leetcode-cn.com/problems/open-the-lock/)。

## 题目描述

你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： `'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'` 。每个拨轮可以自由旋转：例如把 `'9'` 变为 `'0'`，`'0'` 变为 `'9'` 。每次旋转都只能旋转一个拨轮的一位数字。

锁的初始数字为 `'0000'` ，一个代表四个拨轮的数字的字符串。

列表 `deadends` 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。

字符串 `target` 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 `-1` 。

**示例 1:**

```
输入：deadends = ["0201","0101","0102","1212","2002"], target = "0202"
输出：6
解释：
可能的移动序列为 "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202"。
注意 "0000" -> "0001" -> "0002" -> "0102" -> "0202" 这样的序列是不能解锁的，
因为当拨动到 "0102" 时这个锁就会被锁定。
```

**示例 2:**

```
输入: deadends = ["8888"], target = "0009"
输出：1
解释：
把最后一位反向旋转一次即可 "0000" -> "0009"。
```

**示例 3:**

```
输入: deadends = 
["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
输出：-1
解释：
无法旋转到目标数字且不被锁定。
```

**示例 4:**

```
输入: deadends = ["0000"], target = "8888"
输出：-1
```

**提示：**

- `1 <= deadends.length <= 500`
- `deadends[i].length == 4`
- `target.length == 4`
- `target` **不在** `deadends` 之中
- `target` 和 `deadends[i]` 仅由若干位数字组成

::: warning 说明
因时间和精力关系，本题没有写详解，只给出了参考代码。读者可以在「力扣」这道题的评论区和题解区找到适合自己的思路分析和代码。如果确实需要我编写具体的解题思路，可以发邮件到 liweiwei1419@gmail.com。
:::

**参考代码**：


```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

public class Solution {

    public int openLock(String[] deadends, String target) {
        // 为了判重方便，需要将 deadends 添加到哈希表中
        Set<String> deadendSet = new HashSet<>();
        Collections.addAll(deadendSet, deadends);

        // 下面是 3 种特殊情况
        if ("0000".equals(target)) {
            return 0;
        }
        if (deadendSet.contains("0000")) {
            return -1;
        }
        if (deadendSet.contains(target)) {
            return -1;
        }

        // 开始广度优先遍历
        Queue<String> queue = new LinkedList<>();
        queue.offer("0000");
        Set<String> visited = new HashSet<>();
        visited.add("0000");

        int step = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String top = queue.poll();
                char[] charArray = top.toCharArray();

                List<String> nexts = new ArrayList<>();
                for (int j = 0; j < 4; j++) {
                    // 只能改变一个字符，所以需要暂存，修改以后恢复
                    char temp = charArray[j];

                    charArray[j] = (char) ((charArray[j] - '0' + 1) % 10 + '0');
                    nexts.add(new String(charArray));
                    charArray[j] = temp;

                    charArray[j] = (char) ((charArray[j] - '0' + 9) % 10 + '0');
                    nexts.add(new String(charArray));
                    charArray[j] = temp;
                }

                for (String next : nexts) {
                    if (!deadendSet.contains(next) && !visited.contains(next)) {
                        if (next.equals(target)) {
                            return step + 1;
                        }
                        queue.add(next);
                        visited.add(next);
                    }
                }
            }
            step++;
        }
        return -1;
    }
}
```