---
title: 「力扣」第 1010 题：总持续时间可被 60 整除的歌曲（中等）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
---

- 题目链接：[1010. 总持续时间可被 60 整除的歌曲](https://leetcode-cn.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/)；
- 题解链接：[数组 + 哈希表（Python 代码、Java 代码）](https://leetcode-cn.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/solution/shu-zu-ha-xi-biao-python-dai-ma-java-dai-ma-by-liw/)。

## 题目描述

在歌曲列表中，第 `i` 首歌曲的持续时间为 `time[i]` 秒。

返回其总持续时间（以秒为单位）可被 `60` 整除的歌曲对的数量。形式上，我们希望下标数字 `i` 和 `j` 满足 `i < j` 且有 `(time[i] + time[j]) % 60 == 0`。

**示例 1：**

```
输入：time = [30,20,150,100,40]
输出：3
解释：这三对的总持续时间可被 60 整除：
(time[0] = 30, time[2] = 150): 总持续时间 180
(time[1] = 20, time[3] = 100): 总持续时间 120
(time[1] = 20, time[4] = 40): 总持续时间 60
```

**示例 2：**

```
输入：time = [60,60,60]
输出：3
解释：所有三对的总持续时间都是 120，可以被 60 整除。
```

**提示：**

- `1 <= time.length <= 6 * 10^4`
- `1 <= time[i] <= 500`

## 思路分析

思路有点像 [「力扣」第 1 题： 两个数之和](https://leetcode-cn.com/problems/two-sum/)和[「力扣」第 454 题：四数相加 II](https://leetcode-cn.com/problems/4sum-ii/)。

1、题目要求找整数对，并且是“总持续时间”，即两首歌曲之和，“可被 60 整除”，因此我们做预处理，把数组里所有的数处理成模 60 的余数；

说明：这个思路来自「力扣」第 1 题： 两数之和。

2、做计数统计是必要的，因此需要使用哈希表，键是当前遍历的秒数，值是这个秒数出现的次数，在遍历的过程中，统计 “60 - 当前遍历的秒数”，这个秒数已经出现了几次，那么当前遍历的数就能够和之前的若干次组成“歌曲对”；

说明：这个思路来自「力扣」第 18 题： 四数之和。

3、针对整一分钟，例如 `[60, 60, 60]` 这样的测试用例，预处理完成以后就是 `[0, 0, 0]`，所以 “60 - 当前遍历的秒数” 也要模 60。

说明：这是在提交测试用例的时候发现的。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int numPairsDivisibleBy60(int[] time) {
        // 预处理：把数组中的元素全都模 60
        int len = time.length;
        for (int i = 0; i < len; i++) {
            time[i] = time[i] % 60;
        }
        // 注意：[60, 60, 60] 会被处理成 [0, 0, 0]
        Map<Integer, Integer> map = new HashMap<>();
        int res = 0;
        for (int i = 0; i < len; i++) {
            // 注意：要记得模 60
            int residue = (60 - time[i]) % 60;

            Integer preCount = map.get(residue);
            if (preCount != null) {
                res += preCount;
            }

            // 计数，应该放在统计之后做，因为后面的参考前面的
            Integer curCount = map.get(time[i]);
            if (curCount == null) {
                map.put(time[i], 1);
            } else {
                map.put(time[i], curCount + 1);
            }
        }
        return res;
    }

}

````
</CodeGroupItem>

<CodeGroupItem title="Python3">
```python
from typing import List


class Solution:

    def numPairsDivisibleBy60(self, time: List[int]) -> int:
        # 预处理：把数组中的元素全都模 60
        time = [t % 60 for t in time]

        from collections import defaultdict
        d = defaultdict(int)

        res = 0
        for t in time:
            # 1、先计数
            # 针对 [0, 0, 0] 这一类特殊用例，要模 60
            residue = (60 - t) % 60
            if residue in d:
                res += d[residue]

            # 2、再记录频数
            d[t] += 1

        return res
````

</CodeGroupItem>
</CodeGroup>

**复杂度分析：**

- 时间复杂度：$O(N)$，这里 $N$ 是数组的长度，算法把数组看了两次；
- 空间复杂度：$O(N)$，使用了长度为 $N$ 的哈希表。
