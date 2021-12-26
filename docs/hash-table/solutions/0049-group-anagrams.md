---
title: 「力扣」第 49 题：字母异位词分组（哈希表）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
  - 滚动哈希
---

+ 题目链接：[49. 字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)。


| 题目                                                         | 难度 | 题解                                                         |
| ------------------------------------------------------------ | ---- | ------------------------------------------------------------ |
| [49. 字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/) | 中等 | [自定义字符串的哈希规则，使用质数作为乘法因子（Java）](https://leetcode-cn.com/problems/group-anagrams/solution/zi-ding-yi-zi-fu-chuan-de-ha-xi-gui-ze-shi-yong-zh/) |

给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

**示例:**

```
输入: ["eat", "tea", "tan", "ate", "nat", "bat"]。
输出:[["ate","eat","tea"],["nat","tan"],["bat"]]。
说明：1、所有输入均为小写字母。2、不考虑答案输出的顺序。
```

**参考代码**：

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



思路：

+ 每个字符串其实对应一个 key，相同字母组合对应的 key 是相等的。这里考察了哈希函数。


<CodeGroup>
<CodeGroupItem title="Java">
```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class Solution {


    public List<List<String>> groupAnagrams(String[] strs) {

        // 考察了哈希函数的基本知识，只要 26 个即可
        // （小写字母ACSII 码 - 97 ）以后和质数的对应规则，这个数组的元素顺序无所谓
        // key 是下标，value 就是数值
        int[] primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
                31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
                73, 79, 83, 89, 97, 101};

        // key 是字符串自定义规则下的哈希值
        Map<Integer, List<String>> hashMap = new HashMap<>();
        for (String s : strs) {
            int hashValue = 1;

            char[] charArray = s.toCharArray();
            for (char c : charArray) {
                hashValue *= primes[c - 'a'];
            }


            if (hashMap.containsKey(hashValue)) {
                List<String> curList = hashMap.get(hashValue);
                curList.add(s);
            } else {
                List<String> newList = new ArrayList<>();
                newList.add(s);

                hashMap.put(hashValue, newList);
            }
        }
        return new ArrayList<>(hashMap.values());
    }

    public static void main(String[] args) {
        String[] strs = {"eat", "tea", "tan", "ate", "nat", "bat"};

        Solution solution = new Solution();
        List<List<String>> res = solution.groupAnagrams(strs);
        System.out.println(res);

        System.out.println((int) 'a');
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def groupAnagrams(self, strs):
        """
        :type strs: List[str]
        :rtype: List[List[str]]
        """
        # 26 个质数
        primes = [2, 3, 5, 7, 11,
                  13, 17, 19, 23, 29,
                  31, 37, 41, 43, 47,
                  53, 59, 61, 67, 71,
                  73, 79, 83, 89, 97,
                  101]

        # hash_arr 中存放的是与 res 对应的 hash 值
        hash_arr = []
        res = []

        for s in strs:
            hash_val = 1
            for alpha in s:
                hash_val *= primes[ord(alpha) - ord('a')]
            index = 0
            while index < len(hash_arr):
                if hash_arr[index] == hash_val:
                    res[index].append(s)
                    break
                index += 1
            if index == len(hash_arr):
                hash_arr.append(hash_val)
                res.append([s])
        return res


if __name__ == '__main__':
    strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
    solution = Solution()
    result = solution.groupAnagrams(strs)
    print(result)

```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def groupAnagrams(self, strs):
        """
        :type strs: List[str]
        :rtype: List[List[str]]
        """
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
</CodeGroupItem>
</CodeGroup>







