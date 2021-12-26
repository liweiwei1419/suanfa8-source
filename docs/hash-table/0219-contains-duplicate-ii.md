### 「力扣」第 219 题： 存在重复元素 II



给定一个整数数组和一个整数 *k*，判断数组中是否存在两个不同的索引 *i* 和 *j*，使得 **nums [i] = nums [j]**，并且 *i* 和 *j* 的差的绝对值最大为 *k*。

示例 1：

```
输入: nums = [1,2,3,1], k = 3
输出: true
```


在遍历的过程中，即要检测重复，又要知道重复元素的索引是什么，哈希表就可以胜任。

<code-group>
<code-block title="Java">

```java
import java.util.HashMap;

public class Solution {

    // 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，
    // 使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值最大为 k。
    // "并且 i 和 j 的差的绝对值最大为 k"，改成"并且 i 和 j 的差的绝对值不超过 k" 或许就好理解多了
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        int len = nums.length;
        // 先将极端用例返回
        if (len < 2) {
            return false;
        }
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < len; i++) {
            if (map.containsKey(nums[i])) {
                if (i - map.get(nums[i]) <= k) {
                    return true;
                }
            }
            map.put(nums[i], i);
        }
        return false;
    }
}
```

</code-block>

<code-block title="Python">

```python
class Solution:

    # 应该写 is not None
    # 判断存在重复元素的索引之差小于某个数

    def containsNearbyDuplicate(self, nums, k):
        # 先判断 nums [i] = nums [j]
        # 然后判断索引值是否相等，所以索引值可以用 map 存起来。

        size = len(nums)
        if size == 0:
            return False

        map = dict()
        for index in range(size):
            if nums[index] in map and index - map[nums[index]] <= k:
                # 只要存在就返回了，
                return True
            # 更新为最新的索引
            map[nums[index]] = index
        return False
```

</code-block>
</code-group>





