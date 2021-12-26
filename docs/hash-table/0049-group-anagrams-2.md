# 「力扣」 第 49 题：字母异位词分组

+ 题目链接：[49. 字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)

给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

**示例:**

```
输入: ["eat", "tea", "tan", "ate", "nat", "bat"]。
输出:[["ate","eat","tea"],["nat","tan"],["bat"]]。
说明：1、所有输入均为小写字母。2、不考虑答案输出的顺序。
```

## 参考代码：

```python
class Solution:
    def groupAnagrams(self, strs):
        map = dict()

        if len(strs) == 0:
            return []

        for s in strs:
            key = ''.join(sorted(list(s)))
            if key not in map:
                map[key] = [s]
            else:
                map[key].append(s)

        return list(map.values())
```

