---
title: 「力扣」第 1079 题：活字印刷（中等）
icon: yongyan
category: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 字符串
---

+ 题目链接：[1079. 活字印刷](https://leetcode-cn.com/problems/letter-tile-possibilities/)；
+ 题解链接：[回溯算法（设计递归函数的返回值）](https://leetcode-cn.com/problems/letter-tile-possibilities/solution/hui-su-suan-fa-python-dai-ma-by-liweiwei1419/)

## 题目描述

你有一套活字字模 `tiles`，其中每个字模上都刻有一个字母 `tiles[i]`。返回你可以印出的非空字母序列的数目。

**注意：**本题中，每个活字字模只能使用一次。

**示例 1：**

```
输入："AAB"
输出：8
解释：可能的序列为 "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"。
```

**示例 2：**

```
输入："AAABBC"
输出：188
```



 **提示：**

1. `1 <= tiles.length <= 7`
2. `tiles` 由大写英文字母组成



**思路分析**：

+ 这道题与「力扣」第 90 题 （[子集 II](https://leetcode-cn.com/problems/subsets-ii/)）很像，区别在于第 90 题的每一个解不强调顺序，而当前问题每一个解强调顺序，不同顺序构成了一个解。即：第 90 题是一个组合问题，当前问题是一个排列问题；
+ 输入字符串还有多少字符可用是我们关注的，因此需要得到输入字符串的字符 **频数** 数组。题目最后说：「`tiles` 由大写英文字母组成」，因此可以使用长度为 `26` 的整型数组表示字符频数数组。


## 方法：回溯算法

由于是排列，我们不难想到，解决这个问题的思路应该是一个树形结构。不妨先从规模小的问题入手，以题目示例 1 的输入：`"AAB"` 为例，可以画出树形图如下。


@slidestart

![1079-1.png](https://pic.leetcode-cn.com/86611a1790f0cd59a53f2c6e82a2fcf4ee30bd1c76b5989a9fe7d129f8d25442-1079-1.png)

---

![1079-2.png](https://pic.leetcode-cn.com/ca0badefbbd5053af8fc12519f4e78f98f4afa377b66202eea607d0be33f2e5d-1079-2.png)

---

![1079-3.png](https://pic.leetcode-cn.com/2cf88e64cede096223a3f1c14169a65ad87f376a5c68c6b88984aa74259de773-1079-3.png)

---

![1079-4.png](https://pic.leetcode-cn.com/0e1f10d4937dac42c3f119d02c44bce58628095becc5562ef7b06b30266a8649-1079-4.png)

---

![1079-5.png](https://pic.leetcode-cn.com/f07cce05beeb1c9fb91218535324e7ce4926b83f4e0d7a3b97eb46e6bee11739-1079-5.png)

---

![1079-6.png](https://pic.leetcode-cn.com/17bd7d14715dbfaa2a2754c6a64d19173d5733694150b0d0e313566703dd2ac6-1079-6.png)

---

![1079-7.png](https://pic.leetcode-cn.com/c0fc7ce8c4972c9ff1b41e6ef05eb0856347f7a88405dc28f2860d9bfc856d2e-1079-7.png)

---

![1079-8.png](https://pic.leetcode-cn.com/0e98e076a9f631cd64a6506e63612b31be771ee87f6e43aa5815352aeb5c01c3-1079-8.png)

---

![1079-9.png](https://pic.leetcode-cn.com/864fa954faf3774b3a6bc4ae2e411073fb15eef578c503399d901b0d069b23d1-1079-9.png)

---

![1079-10.png](https://pic.leetcode-cn.com/75f390e54c3e0012ee4e871d3bb6b3cc68c7a7296c881c86ecb7b7bb87e0f482-1079-10.png)

---

![1079-11.png](https://pic.leetcode-cn.com/42eb4a22c1ae87f256a7175d0a535a8d119c75983d1812eb68b6217bcc77db01-1079-11.png)

---

![1079-12.png](https://pic.leetcode-cn.com/f3d7d44e36ff5aeeed0cbac791c847b874d5c973a3876ae531c2a584ae998e67-1079-12.png)

---

![1079-13.png](https://pic.leetcode-cn.com/882d2a16cc40d58d3eb8b28c50886149c69cb7c87ce8717052ae21f6e2b0fd35-1079-13.png)

@slideend

我们只要一开始做一个字母频次统计，如果当前这个字母的频次为 $0$，就不再往下执行，然后回溯。在回溯的过程中一定要记得状态重置。


**编码细节**：

+ 递归终止条件是：所有的字符都使用完毕。递归终止条件隐含在递归方法中；
+ 递归函数的返回值的含义：以当前字符频数数组 `count` 能够产生的排列的总数。

**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public int numTilePossibilities(String tiles) {
        int[] count = new int[26];
        char[] charArray = tiles.toCharArray();
        for (char c : charArray) {
            count[c - 'A']++;
        }
        // tiles 里所有的信息都存在 count 里，对 count 执行深度优先遍历即可
        return dfs(count);
    }

    /**
     * 设计递归函数的返回值
     *
     * @return 在当前的频数数组下，可以产生的排列数
     */
    private int dfs(int[] count) {
        // 递归终止条件是：当前没有可以用的字符（没有显示递归终止条件）
        int res = 0;
        for (int i = 0; i < 26; i++) {
            if (count[i] == 0) {
                continue;
            }
            res++;
            count[i]--;

            res += dfs(count);
            // 只需要重置字符频数数组
            count[i]++;
        }
        return res;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:

    def numTilePossibilities(self, tiles: str) -> int:
        counter = [0] * 26
        for alpha in tiles:
            counter[ord(alpha) - ord('A')] += 1
        return self.__dfs(counter)

    def __dfs(self, counter):
        res = 0
        for i in range(26):
            if counter[i] == 0:
                continue
            res += 1
            counter[i] -= 1

            res += self.__dfs(counter)
            counter[i] += 1
        return res
```
</CodeGroupItem>
</CodeGroup>




