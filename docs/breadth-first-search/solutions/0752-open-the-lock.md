---
title: 「力扣」第 752 题：打开转盘锁（中等）
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
---



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