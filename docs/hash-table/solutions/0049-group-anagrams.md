---
title: 「力扣」第 49 题：字母异位词分组（哈希表）
icon: yongyan
category: 哈希表
tags:
  - 哈希表
  - 滚动哈希
---

- 题目链接：[49. 字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)；
- 题解链接：[自定义字符串的哈希规则，使用质数作为乘法因子（Java）](https://leetcode-cn.com/problems/group-anagrams/solution/zi-ding-yi-zi-fu-chuan-de-ha-xi-gui-ze-shi-yong-zh/)。

::: danger 视频讲解
:tv: 这道题在 [B 站](https://www.bilibili.com/video/BV1eU4y1J7Ti?spm_id_from=333.999.0.0) 可以收看视频讲解，可以点击下面的视频右上角「去 bilibili 观看」，选择快速播放，获得更好的观看体验。

:::

<div style="position: relative; padding: 30% 45%;">
<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;" src="https://player.bilibili.com/player.html?aid=674603390&bvid=BV1eU4y1J7Ti&cid=382924220&page=1" frameborder="no" scrolling="no"></iframe>
</div>

发布在「算法吧」的视频（带字幕和进度条）：

<video src="https://suanfa8.com/files/hash-table/lc-0049.mp4" controls="controls" width="800" height="450">
Your browser does not support the video tag.
</video>

## 题目描述

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

- 每个字符串其实对应一个 key，相同字母组合对应的 key 是相等的。这里考察了哈希函数。

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

````
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

````

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

````
</CodeGroupItem>
</CodeGroup>

---

这篇题解不是很严谨，可以这么做是我尝试出来的，限于本人对这个知识点的理解有限，思路没有办法说得很清楚，也没有办法证明给大家看，只能说是思路通过测试得到验证。

大家直接看代码，或者看这个题解评论区置顶的评论，有朋友提到证明部分。


有哈希表的基础知识，是很容易想到思路的。这里「哈希」是 hash 的音译，意译是「散列」。

**思路**：

+ 分入一组的字符串的特征：字符以及字符的个数相等，但是顺序不同；
+ 这样的特征其实可以做一个映射，思想来源于哈希规则。这里要去除顺序的影响，那么我们就只关心每个字符以及它出现的次数；
+ 每个字符对应一个 ASCII 值，用 ASCII 值乘以字符出现的次数的和感觉上就能表征一组字符串，但是很容易想到，这里面会有重复的值；
+ 一个替代的做法是，把 ASCII 值 替换成为质数，于是这些数值一定不会有公约数，不在一组的数，它们的和一定不相等（也就是放在哈希表里，肯定不会被分在一个桶里）；
+ 所有输入均为小写字母，因此只需要做 26 个映射，这种映射可以通过数组实现。

评论有朋友提到，这样计算出来的「哈希值」是有可能整型越界的，这一点是我一开始没有想到的。但是仔细算了一下，这里「消耗」最大的值就是字母 `z` ，它对应的 ASCII 码是 25（已经减去了偏移），它对应的质数最大是 101，如果全部使用 `z` 是最消耗值的，运行下面这段代码：

```java
System.out.println(Integer.MAX_VALUE / 101 / 25);
````

输出：850488。

因此，要产生溢出，输入字符至少长度要达到 850488 才可以。在这里认为不存在这种测试用例。

知识点复习：

- 哈希表的底层就是数组；
- 哈希函数；
- 哈希冲突的解决办法：1、链接法；2、开放地址法；
- 哈希表的扩容。

参考《算法导论》或者《算法 4》，初学的时候懂得意思，有个感性认知即可。

**参考代码**：

```Java []
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {

    public List<List<String>> groupAnagrams(String[] strs) {
        // 考察了哈希函数的基本知识，只要 26 个即可
        // （小写字母ACSII 码 - 97 ）以后和质数的对应规则，这个数组的元素顺序无所谓
        // key 是下标，value 就是数值
        int[] primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
                31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
                73, 79, 83, 89, 97, 101};

        long mod = 1000000000 + 7;

        // key 是字符串自定义规则下的哈希值
        Map<Long, List<String>> hashMap = new HashMap<>();
        for (String s : strs) {
            long hashValue = 1;

            char[] charArray = s.toCharArray();
            for (char c : charArray) {
                hashValue = ((hashValue % mod) * (primes[c - 'a'] % mod)) % mod;
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
}
```
