---
title: 「力扣」第 17 题：电话号码的字母组合（中等）
icon: yongyan
categories: 回溯算法
tags:
  - 回溯算法
  - 递归
  - 树形问题
  - 深度优先遍历
  - 字符串
---

> 以前我不知道算法和数据结构如此重要，只是为了准备面试才会去看「面试宝典」里的算法。「面试宝典」里讲的就只有选择排序和插入排序，学完一次忘记一次。其实在算法的世界，有很多知识要我们去学习。

+ 题目链接：[17. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)；
+ 题解链接：[回溯搜索（无显式回溯）、广度优先遍历（Java）](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/solution/hui-su-sou-suo-wu-xian-shi-hui-su-yan-du-you-xian-/)。

## 题目描述

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。答案可以按 **任意顺序** 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/11/09/200px-telephone-keypad2svg.png)

**示例 1：**

```
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

**示例 2：**

```
输入：digits = ""
输出：[]
```

**示例 3：**

```
输入：digits = "2"
输出：["a","b","c"]
```

 

**提示：**

- `0 <= digits.length <= 4`
- `digits[i]` 是范围 `['2', '9']` 的一个数字。



![image.png](https://pic.leetcode-cn.com/1603521238-wPCUhU-image.png)


先画出递归树，然后思考如何编写代码在这棵递归树上搜索所有可行解。

![image.png](https://pic.leetcode-cn.com/6220273b46ef1b045af3cedba43216b1e4d4a9172a7d477e8553a0a7f3dea5c5-image.png)

可以深度优先遍历，也可以广度优先遍历。

**注意**：

+ 由于字符追加到后面，是新创建一个对象，因此 **没有显式回溯（状态重置）的过程 **；
+ 在叶子结点结算。


### 方法一：回溯（特指使用深度优先遍历搜索所有的解）

**参考代码 1**：

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        int len = digits.length();
        if (len == 0) {
            return res;
        }
        String[] digitsMap = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        findCombinations(digits, digitsMap, 0, "", res);
        return res;
    }

    /**
     * @param digits 原始字符串
     * @param start  从原始字符串的第几位开始搜索
     * @param pre    已经得到的子串
     */
    private void findCombinations(String digits, String[] digitsMap, int start, String pre, List<String> res) {
        // 先写递归终止条件
        if (start == digits.length()) {
            // 由于字符串的特殊性，pre 每次都是新的，因此无需再创建拷贝
            res.add(pre);
            return;
        }
        // 注意：这里要减去一个偏移
        String nextStr = digitsMap[digits.charAt(start) - '2'];
        // 下一个数字所代表的的字母的长度
        int len = nextStr.length();
        for (int i = 0; i < len; i++) {
            // 注意：这里没有状态重置
            findCombinations(digits, digitsMap, start + 1, pre + nextStr.charAt(i), res);
        }
    }
}
```
### 方法二：广度优先遍历

说明：这个广度优先遍历的代码不是很套路，但是也不难琢磨出来。

+ 新一层在上一层的末尾添加字符得到；
+ 新一层得到了以后，上一层就不用了；
+ 最开始的时候，是一个空字符串。

**参考代码 2**：

```Java []
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        int len = digits.length();
        if (len == 0) {
            return res;
        }

        String[] digitsMap = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

        // 注意：设置 res 的初始值为 ""
        res.add("");

        // 思路：新一轮在上一轮的基础末尾追加数字
        for (int i = 0; i < len; i++) {
            // 得到当前的数字，注意：这个偏移是 '2'
            int num = digits.charAt(i) - '2';
            String strList = digitsMap[num];
            List<String> cur = new ArrayList<>();
            for (String s : res) {
                for (char c : strList.toCharArray()) {
                    cur.add(s + c);
                }
            }
            res = cur;
        }
        return res;
    }
}
```
