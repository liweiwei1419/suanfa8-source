# 「力扣」第 1 题：两数之和

Python 代码：

```python
class Solution:
    def twoSum(self, nums, target):
        map = dict()
        for index, num in enumerate(nums):
            if target - num in map:
                return [index, map[target - num]]
            else:
                map[num] = index
```



