---
title: 「力扣」第 341 题：扁平化嵌套列表迭代器（中等）
icon: yongyan
category: 栈
tags:
  - 栈
---

+ 题目链接：[341. 扁平化嵌套列表迭代器](https://leetcode-cn.com/problems/flatten-nested-list-iterator/description/)。


## 题目描述

给你一个嵌套的整数列表 `nestedList` 。每个元素要么是一个整数，要么是一个列表；该列表的元素也可能是整数或者是其他列表。请你实现一个迭代器将其扁平化，使之能够遍历这个列表中的所有整数。

实现扁平迭代器类 `NestedIterator` ：

+  `NestedIterator(List<NestedInteger> nestedList)` 用嵌套列表 `nestedList` 初始化迭代器。
+ `int next()` 返回嵌套列表的下一个整数。
+ `boolean hasNext()` 如果仍然存在待迭代的整数，返回 `true` ；否则，返回 `false` 。

你的代码将会用下述伪代码检测：

```
initialize iterator with nestedList
res = []
while iterator.hasNext()
    append iterator.next() to the end of res
return res
```

如果 `res` 与预期的扁平化列表匹配，那么你的代码将会被判为正确。

**示例 1：**

```
输入：nestedList = [[1,1],2,[1,1]]
输出：[1,1,2,1,1]
解释：通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,1,2,1,1]。
```

**示例 2：**

```
输入：nestedList = [1,[4,[6]]]
输出：[1,4,6]
解释：通过重复调用 next 直到 hasNext 返回 false，next 返回的元素的顺序应该是: [1,4,6]。
```

**提示：**

- `1 <= nestedList.length <= 500`
- 嵌套列表中的整数值在范围 `[-106, 106]` 内

**参考代码**：

```python
class NestedIterator(object):

    def __init__(self, nestedList):
        """
        Initialize your data structure here.
        :type nestedList: List[NestedInteger]
        """
        self.stack = nestedList[::-1]
        # 临时存放值的地方
        self.value = None

    def next(self):
        """
        :rtype: int
        """

        result = self.hasNext()

        if result:
            ret = self.value
            self.value = None
            return ret

    def hasNext(self):
        """
        :rtype: bool
        """

        if self.value is not None:
            # 就不执行了，因为没有被取出来
            return True

        # 如果 self.value 为 None 的话
        # 就要从 stack 中弹出元素了

        while self.stack:
            top = self.stack.pop()
            # 如果栈中有元素，看看这个元素是什么
            if top.isInteger():
                # 是数字，就放在临时变量上
                self.value = top.getInteger()
                return True
            else:
                self.stack.extend(top.getList()[::-1])
        return False
```

