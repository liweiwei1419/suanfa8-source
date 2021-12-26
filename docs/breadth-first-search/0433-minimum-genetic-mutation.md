---
title: 「力扣」第 433 题：最小基因变化
icon: yongyan
category: 广度优先遍历
tags:
  - 广度优先遍历
---


#### [433. 最小基因变化](https://leetcode-cn.com/problems/minimum-genetic-mutation/)（单向、双向广度优先遍历）

---

一条基因序列由一个带有 $8$ 个字符的字符串表示，其中每个字符都属于 `"A"`, `"C"`, `"G"`, `"T"`中的任意一个。

假设我们要调查一个基因序列的变化。**一次**基因变化意味着这个基因序列中的**一个**字符发生了变化。

例如，基因序列由`"AACCGGTT"` 变化至 `"AACCGGTA" `即发生了一次基因变化。

与此同时，每一次基因变化的结果，都需要是一个合法的基因串，即该结果属于一个基因库。

现在给定 $3$ 个参数 — `start`, `end`, `bank`，分别代表起始基因序列，目标基因序列及基因库，请找出能够使起始基因序列变化为目标基因序列所需的最少变化次数。如果无法实现目标变化，请返回 $-1$。

注意：

1. 起始基因序列默认是合法的，但是它并不一定会出现在基因库中。
2. 如果一个起始基因序列需要多次变化，那么它每一次变化之后的基因序列都必须是合法的。
3. 假定起始基因序列与目标基因序列是不一样的。

**示例 1**：

```
start: "AACCGGTT"
end:   "AACCGGTA"
bank: ["AACCGGTA"]

返回值: 1
```

**示例 2**：

```
start: "AACCGGTT"
end:   "AAACGGTA"
bank: ["AACCGGTA", "AACCGCTA", "AAACGGTA"]

返回值: 2
```

**示例 3**：

```
start: "AAAAACCC"
end:   "AACCCCCC"
bank: ["AAAACCCC", "AAACCCCC", "AACCCCCC"]

返回值: 3
```

参考代码：





### 方法一：单向广度优先遍历



```Java []
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

public class Solution {

    public int minMutation(String start, String end, String[] bank) {
        // 先把 bank 中所有的单词加入哈希表，方便判重
        Set<String> hashSet = new HashSet<>();
        Collections.addAll(hashSet, bank);

        // 起始基因序列默认是合法的，但是它并不一定会出现在基因库中。因此，无需特殊判断 start 是否出现在 hashSet 中
        if (!hashSet.contains(end)) {
            return -1;
        }

        char[] banks = {'A', 'C', 'G', 'T'};
        Queue<String> queue = new LinkedList<>();
        queue.offer(start);
        Set<String> visited = new HashSet<>();
        visited.add(start);

        int count = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String front = queue.poll();

                char[] charArray = front.toCharArray();
                for (int j = 0; j < 8; j++) {
                    char origin = charArray[j];
                    for (char c : banks) {
                        charArray[j] = c;
                        String next = new String(charArray);
                        if (next.equals(end)) {
                            return count + 1;
                        }

                        // 如果一个起始基因序列需要多次变化，那么它每一次变化之后的基因序列都必须是合法的。
                        if (hashSet.contains(next) && !visited.contains(next)) {
                            queue.offer(next);
                            // 添加到队列中以后，马上标记为已经访问
                            visited.add(next);
                        }
                    }
                    charArray[j] = origin;
                }
            }
            count++;
        }
        return -1;
    }
}
```

### 方法二：双向广度优先遍历

参考资料：https://leetcode-cn.com/problems/minimum-genetic-mutation/solution/shen-du-you-xian-yan-du-you-xian-shuang-xiang-yan-/

```Java []

```

