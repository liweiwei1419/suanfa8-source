# LeetCode 第 219 题：“存在重复元素 II”题解

题解地址：[哈希表（Python 代码、Java 代码）](https://leetcode-cn.com/problems/contains-duplicate-ii/solution/ha-xi-biao-python-dai-ma-java-dai-ma-by-liweiwei14/)。

说明：文本首发在力扣的题解版块，更新也会在第 1 时间在上面的网站中更新，这篇文章只是上面的文章的一个快照，您可以点击上面的链接看到其他网友对本文的评论。

传送门：[219. 存在重复元素 II](https://leetcode-cn.com/problems/contains-duplicate-ii/)。

>给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值最大为 k。
>
>示例 1:
>
>输入: nums = [1,2,3,1], k = 3
>输出: true
>示例 2:
>
>输入: nums = [1,0,1,1], k = 1
>输出: true
>示例 3:
>
>输入: nums = [1,2,3,1,2,3], k = 2
>输出: false

## 哈希表（Python 代码、Java 代码）

**思路分析**：

如果你做过[「力扣」第 1 题： 两数之和](https://leetcode-cn.com/problems/two-sum/)，这题不在话下。

1、判定重复元素，首先我们会想到使用哈希表；

2、题目又要求“ `i` 和 `j` 的差的绝对值最大为 `k`”，因此，哈希表的 key 为数组元素，value 为其对应的索引；

3、“是否存在问题”的做法是：在遍历的过程中找到就直接返回，如果找不到，才返回 `false`。因此找到（或者说存在）的充分必要条件是：

> 找到重复元素的索引与之前出现过的这个元素的索引的差小于等于 `k`，后出现的数的索引一定比前出现的数的索引大，因此绝对值不用考虑。

### 方法：哈希表

**参考代码**：

Python 代码：


```Python []
from typing import List


class Solution:

    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        # 判断存在重复元素的索引之差小于某个数
        # 先判断 nums [i] = nums [j]
        # 然后判断索引值是否相等，所以索引值可以用 map 存起来

        size = len(nums)
        if size == 0:
            return False

        map = dict()
        for i in range(size):
            if nums[i] in map and i - map[nums[i]] <= k:
                # 只要找到 1 个符合题意的就返回
                return True
            # 更新为最新的索引，这里有贪心选择的思想，索引越靠后，符合题意的数据对的存在性就越大
            map[nums[i]] = i
        # 遍历完成以后，都没有符合题意的时候，才返回 False
        return False
```

Java 代码：

```Java []
import java.util.HashMap;

public class Solution {

    // "并且 i 和 j 的差的绝对值最大为 k"，改成"并且 i 和 j 的差的绝对值不超过 k" 或许就好理解多了

    public boolean containsNearbyDuplicate(int[] nums, int k) {
        int len = nums.length;
        // 特判
        if (len < 2) {
            return false;
        }
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < len; i++) {
            if (map.containsKey(nums[i])) {
                if (i - map.get(nums[i]) <= k) {
                    // 只要找到 1 个符合题意的就返回
                    return true;
                }
            }
            // 更新为最新的索引，这里有贪心选择的思想，索引越靠后，符合题意的数据对的存在性就越大
            map.put(nums[i], i);
        }
        // 遍历完成以后，都没有符合题意的时候，才返回 False
        return false;
    }

}
```
**复杂度分析：**

+ 时间复杂度：$O(N)$，这里 $N$ 是数组的元素个数，算法遍历了一次数组。
+ 空间复杂度：$O(N)$，这里使用了哈希表存储已经出现的数，可以说是以空间换时间了。


<Vssue title="contains-duplicate-ii"/>



