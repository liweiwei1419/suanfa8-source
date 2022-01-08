---
title: 「力扣」第 876 题：链表的中间结点（简单）
icon: yongyan
category: 链表
tags:
  - 链表
---

+ 中文地址：[「力扣」第 876 题：链表的中间结点（简单）](https://leetcode-cn.com/problems/middle-of-the-linked-list/)；
+ 题解地址：[快慢指针（Python 代码、Java 代码）](https://leetcode-cn.com/problems/middle-of-the-linked-list/solution/kuai-man-zhi-zhen-zhu-yao-zai-yu-diao-shi-by-liwei/)。

## 题目描述

给定一个头结点为 `head` 的非空单链表，返回链表的中间结点。

如果有两个中间结点，则返回第二个中间结点。

**示例 1：**

```
输入：[1,2,3,4,5]
输出：此列表中的结点 3 (序列化形式：[3,4,5])
返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。
注意，我们返回了一个 ListNode 类型的对象 ans，这样：
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
```



**示例 2：**

```
输入：[1,2,3,4,5,6]
输出：此列表中的结点 4 (序列化形式：[4,5,6])
由于该列表有两个中间结点，值分别为 3 和 4，我们返回第二个结点。
```

**提示：**

- 给定链表的结点数介于 `1` 和 `100` 之间。

---

**朴素解法**：这道题最朴素的做法是，先遍历一次，计算链表的长度，进而计算链表中间结点的下标（注意偶数结点的时候，得到的是中间的第二个结点），然后再遍历一次，来到所要求结点的位置。

缺点：

+ 必须先遍历完整个链表，然后才可以「干正事」，再遍历到一半，找到中间结点；
+ 在链表的长度很长的时候，**这种方法之前的等待会很久**。

**快慢指针**：比较经典的做法是：

+ 使用两个指针变量，刚开始都位于链表的第 1 个结点，一个永远一次只走 1 步，一个永远一次只走 2 步，一个在前，一个在后，**同时走**。这样当快指针走完的时候，慢指针就来到了链表的中间位置。

思想是：快慢指针的前进方向相同，且它们步伐的「差」是恒定的，根据这种确定性去解决链表中的一些问题。使用这种思想还可以解决链表的以下问题：

+ 「力扣」第 19 题： [倒数第 k 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)，快指针先走几步，不是靠猜的，要在纸上画图模拟一下，就清楚了；
+ 「力扣」第 141 题：[环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)，在环中的时候可以想象，A 同学开始有存款 100 元，每天赚 1 元，B 同学开始有存款 50 元，每天赚 2 元，B 同学一定会在某一天和 A 同学的存款一样；
+ 「力扣」第 142 题：[环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)；
+ 「力扣」第 161 题：[相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)，起点不同，构造相同长度让它们相遇，同样是利用了同步走这个等量关系。

解决这些问题的共同特点就是使用两个指针变量同步移动。

----

## 方法：快慢指针（Python 代码、Java 代码）

使用快慢指针是求单链表中间结点，以及 [倒数第 k 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/) 的常用方法。

题目要求：如果有两个中间结点，则返回第二个中间结点。此时快指针可以前进的条件是：当前快指针和当前快指针的下一个结点都非空。


如果题目要求「在两个中间结点的时候，返回第一个中间结点」，此时快指针可以前进的条件是：当前快指针的下一个结点和当前快指针的 **下下一个结点** 都非空。

注意体会以上二者的不同之处，其实画一个图就很清楚了。

![876-1.png](https://pic.leetcode-cn.com/2b7a4130111600cf615b5584b3cc7f863d289a9a7d43b90147c79f51f68a5aa6-876-1.png)
![876-2.png](https://pic.leetcode-cn.com/5c3f88cc6b312b7193a6e071cef93ec5eb3070005af23cad22a11e10ea0aca3e-876-2.png)


说明：图例中使用了 Python 语言的写法，例如 `while fast` 在 `fast` 变量不是空结点的时候，返回 `True`，写成 `while fast is not None` 是语义更清晰的写法，但由于约定，且这种写法非常常见，我们就简写了。




**参考代码**：

<CodeGroup>
<CodeGroupItem title="Java">
```java
public class Solution {

    public ListNode middleNode(ListNode head) {
        if (head == null) {
            return null;
        }
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class Solution:
    def middleNode(self, head: ListNode) -> ListNode:
        if head is None:
            return None

        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow
```
</CodeGroupItem>
</CodeGroup>





**复杂度分析**：

+ 时间复杂度：$O(N)$，$N$ 是链表的长度，快指针变量需要遍历完整个链表，因此最多走 $N$ 步；
+ 空间复杂度：$O(1)$。

---

补充：

用于测试的结点类（这部分代码不用提交给「力扣」）。



<CodeGroup>
<CodeGroupItem title="Java">
```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }

    public ListNode(int[] nums) {
        if (nums == null || nums.length == 0) {
            throw new IllegalArgumentException("arr can not be empty");
        }
        this.val = nums[0];
        ListNode curr = this;
        for (int i = 1; i < nums.length; i++) {
            curr.next = new ListNode(nums[i]);
            curr = curr.next;
        }
    }

    @Override
    public String toString() {
        StringBuilder s = new StringBuilder();
        ListNode cur = this;
        while (cur != null) {
            s.append(cur.val);
            s.append(" -> ");
            cur = cur.next;
        }
        s.append("NULL");
        return s.toString();
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


def create_linked_list(nums):
    if len(nums) == 0:
        return None
    head = ListNode(nums[0])
    cur = head
    for i in range(1, len(nums)):
        cur.next = ListNode(nums[i])
        cur = cur.next
    return head


def print_linked_list(list_node):
    if list_node is None:
        return

    cur = list_node
    while cur:
        print(cur.val, '->', end=' ')
        cur = cur.next
    print('null')
```
</CodeGroupItem>
</CodeGroup>


用于测试的主方法（这部分代码不用提交给「力扣」）。


<CodeGroup>
<CodeGroupItem title="Java">
```java
public static void main(String[] args) {
    int[] arr = new int[]{1, 2, 3, 4, 5, 6};
    // int[] arr = new int[]{1, 2, 3, 4, 5};
    ListNode head = new ListNode(arr);
    Solution solution = new Solution();
    ListNode res = solution.middleNode(head);
    System.out.println(res);
}
```
</CodeGroupItem>

<CodeGroupItem title="Python">
```python
if __name__ == '__main__':
    # nums = [1, 2, 3, 4, 5, 6, 7]
    nums = [1, 2, 3, 4, 5, 6, 7, 8]
    head = create_linked_list(nums)
    solution = Solution()
    result = solution.middleNode(head)
    print('结果：')
    print_linked_list(result)
```
</CodeGroupItem>
</CodeGroup>

