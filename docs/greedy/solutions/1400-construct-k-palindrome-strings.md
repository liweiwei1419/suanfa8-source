---
title: 「力扣」第 1400 题：构造 K 个回文字符串（中等）
icon: yongyan
category: 贪心算法
tags:
  - 贪心算法
---

+ 题目链接：[1400. 构造 K 个回文字符串](https://leetcode-cn.com/problems/construct-k-palindrome-strings/)。

## 题目描述

给你一个字符串 `s` 和一个整数 `k` 。请你用 `s` 字符串中 **所有字符** 构造 `k` 个非空 **回文串** 。

如果你可以用 `s` 中所有字符构造 `k` 个回文字符串，那么请你返回 **True** ，否则返回 **False** 。

**示例 1：**

```
输入：s = "annabelle", k = 2
输出：true
解释：可以用 s 中所有字符构造 2 个回文字符串。
一些可行的构造方案包括："anna" + "elble"，"anbna" + "elle"，"anellena" + "b"
```

**示例 2：**

```
输入：s = "leetcode", k = 3
输出：false
解释：无法用 s 中所有字符构造 3 个回文串。
```

**示例 3：**

```
输入：s = "true", k = 4
输出：true
解释：唯一可行的方案是让 s 中每个字符单独构成一个字符串。
```

**示例 4：**

```
输入：s = "yzyzyzyzyzyzyzy", k = 2
输出：true
解释：你只需要将所有的 z 放在一个字符串中，所有的 y 放在另一个字符串中。那么两个字符串都是回文串。
```

**示例 5：**

```
输入：s = "cr", k = 7
输出：false
解释：我们没有足够的字符去构造 7 个回文串。
```

**提示：**

- `1 <= s.length <= 10^5`
- `s` 中所有字符都是小写英文字母。
- `1 <= k <= 10^5`

## 解题思路
如果字符数量小于k 那直接返回false
否则统计一下出现次数为奇数的字符的种类，所得的回文串至少要有这么多 因为奇数字符的话只能放在回文串的正中心，而这样的位置一个回文串只有一个


最近可能准备从前端工程师转行到可以paper reading的工作，简历被嫌弃了。。**各位大佬不妨顺手给我的项目加个星** 万分感谢！
[https://github.com/wfnuser/burrow](https://github.com/wfnuser/burrow)  **[一个分布式缓存的go语言简单实现](https://github.com/wfnuser/burrow)**
希望也可以对大家有帮助


## 代码

```cpp
class Solution {
public:
    bool canConstruct(string s, int k) {
        if (s.size() < k) return false;
        unordered_map<char, int> cnt;
        
        for (auto c: s) {
            cnt[c]++;
        }
        int odd = 0;
        
        for (auto p: cnt) {
            if (p.second % 2 == 1) odd++;
        }
        
        if (odd <= k) return true;
        else return false;
    }
};
```

## 解题思路
1.偶数，以"aa"为例，计算有多少对相同两个字符的对数。
2.奇数以单个字符统计"a";
3.如果单个字符的数量大于k，则必定为false;
4.然后判断偶数的对数 * 2 + 奇数是否大于k (因为一对"aa"，可以拆分成两个回文字符串)

## 代码

```java
class Solution {
    public boolean canConstruct(String s, int k) {
        
        int[] dp = new int[26];
        int doubl = 0;
        for(int i = 0 ; i < s.length() ; i++){
            int temp = s.charAt(i) - 'a';
            dp[temp]++;
            if( (dp[temp] & 1) == 0){
                dp[temp] = dp[temp] - 2;
                doubl++;
            }
        }
        int single = 0 ;
        for(int i = 0 ; i < 26 ; i++){
            single = (dp[i] & 1) == 1 ?single + 1 : single;
        }
        if(single > k){
            return false;
        }

        return doubl * 2 + single >= k ? true : false;


    }
}
```


**复杂度分析**

- 时间复杂度：$O(N + |\Sigma|)$，其中 $N$ 是字符串 $s$ 的长度，$\Sigma$ 是字符集（即字符串中可能出现的字符种类数），在本题中字符串只会包含小写字母，因此 $|\Sigma| = 26$。我们需要对字符串 $s$ 进行一次遍历，得到每个字符出现的次数，时间复杂度为 $O(N)$。在这之后，我们需要遍历每一种字符，统计出现奇数次的字符数量，时间复杂度为 $O(|\Sigma|)$。

- 空间复杂度：$O(|\Sigma|)$。我们需要使用数组或哈希表存储每个字符出现的次数。