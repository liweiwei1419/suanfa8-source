---
title: 「力扣」第 142 题：环形链表 II（中等）
icon: yongyan
category: 链表
tags:
  - 链表
  - 快慢指针
---

+ 题目链接：[142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii)；
+ 题解链接：[快慢指针（Java、C++、Python）](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/kuai-man-zhi-zhen-by-liweiwei1419-2/)。

## 题目链接

给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

说明：不允许修改给定的链表。

示例 1：

```
输入：head = [3,2,0,-4], pos = 1
输出：tail connects to node index 1
解释：链表中有一个环，其尾部连接到第二个节点。
```

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist.png)

示例 2：

```
输入：head = [1,2], pos = 0
输出：tail connects to node index 0
解释：链表中有一个环，其尾部连接到第一个节点。
```

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test2.png)

**示例 3：**

```
输入：head = [1], pos = -1
输出：no cycle
解释：链表中没有环。
```

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/12/07/circularlinkedlist_test3.png)

**进阶：**
你是否可以不用额外空间解决此题？




---


这道题首先要判断链表中是否有环，根据「力扣」第 141 题：[“环形链表”](https://leetcode-cn.com/problems/linked-list-cycle/)的方法，使用“快慢指针”。刚开始的时候，“快指针”和“慢指针”都在链表的起始结点。然后快指针一次走 2 步，慢指针一次走 1 步，如果链表中有环，当慢指针进入环的时候，由于它们每次行走步伐的差恒定为 1，“快指针”一定可以从“慢指针”的后面赶上“慢指针”。

链表存在环的前提下，快慢指针一定在环中相遇。

在这个有环的链表上，有 3 个很重要的结点：

1. 链表的起始结点；

2. 环的入口结点；

3. 快慢指针相遇的结点。

![142-1.png](https://pic.leetcode-cn.com/de08d221c812c1da6e4528f770c38f35b78fb615a8e92879bedc88c20d972c63-142-1.png)


这 3 个结点，把这个有环的链表分成了 3 个部分，我们用左闭右开区间分别表示它们：

1、（绿色部分）`[链表的起始结点, 环的入口结点)`，设这部分结点的个数为 `a`；

2、（蓝色部分）`[环的入口结点, 快慢指针相遇的结点)`，设这部分结点的个数为 `b`；

3、（红色部分）`[快慢指针相遇的结点, 环的入口结点)`，设这部分结点的个数为 `c`；

我们还注意到一点（这一点非常重要，自己画一个图，具体数一下，就能清楚这个事实）：

---

> **从一个颜色结点的开始，走到另一个颜色结点的开始，走的步数恰好等于这个颜色结点的个数。**

---


如图，从绿色结点的开始到黄色结点的开始，一共走了 $6$ 步，恰恰好就是绿色结点的个数。

在任何时刻，都有“慢指针走过的步数 * 2 = 快指针走过的步数”。特别地，在“快慢指针”相遇的时候

1、“慢指针走过的步数” = $a + b$；

2、“快指针走过的步数” = $a + N * ( b + c ) + b$。

根据“慢指针走过的步数 * 2 = 快指针走过的步数”，我们可以得到：

$$
2 \times（a + b） = a + N（b + c）+ b
$$

这里 $N$ 表示快指针在环中走过了多少圈，$N \ge 1$，$N$ 是自然数。

我们化简一下这个等式，等式的两边都有 $a$  和 $b$ 这两项，我们可以在等式两边同时减去 $a$ 和 $b$，得到：
$$
a + b = N \times (b + c)
$$


我们看到，左边和右边都有 $b$ ，我们把右边 $N$ 个 $(b + c)$ 中拿 $1$ 个出来，写成：

$$
a + b = b + c + (N - 1) \times (b + c)
$$


两边再约去 $b$，得到

$$
a =  c + (N - 1) \times (b + c)
$$
这里 $b + c$ 其实就是环中的结点个数，$a$ 就是从链表起点到环的入口结点要走过的步数，$c$ 是从相遇结点到环入口结点走过的步数。


因此再看一眼我们之前画出来的图和强调过的一个事实：“从一个颜色结点的开始，走到另一个颜色结点的开始，走的步数恰好等于这个颜色结点的个数”。

我们就可以设计一个算法：在相遇以后，把其中一个指针放在链表的起始位置，然后两个指针步伐一致，你走一步我也走一步，它们再一次相遇一定就在链表的起始结点。

它们再一次相遇的时候，**在环中的这个结点可能已经绕着环走了几圈了**，走几圈都是有可能的。大家可以画几个具体的例子验证一下。这个方法虽然节约了空间，但是相应的时间也多消耗了一些。

**参考代码 1**：

```Java []
public class Solution {

    public ListNode detectCycle(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            // 注意：不要习惯性把 head 返回回去
            return null;
        }

        // 起点要一样，这里利用第 141 题的结论
        ListNode slow = head;
        ListNode fast = head;

        // 注意这种写法，因为快指针一次走两步，
        // 所以要看它下一个结点以及下下一个结点是否为空
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                break;
            }
        }

        // 特判，如果只是因为链表不存在环，那就返回空，因为既然不存在环，肯定没有重复结点
        if (fast == null || fast.next == null) {
            return null;
        }

        slow = head;

        while (slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }
        return slow;
    }
}
```
```C++ []
#include <iostream>

using namespace std;

class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if (head == NULL || head->next == NULL) {
            return NULL;
        }

        ListNode *slow = head;
        ListNode *fast = head;

        while (fast->next != NULL && fast->next->next != NULL) {
            fast = fast->next->next;
            slow = slow->next;

            if (fast == slow) {
                break;
            }
        }

        if (fast->next == NULL || fast->next->next == NULL) {
            return NULL;
        }

        slow = head;
        while (slow != fast) {
            fast = fast->next;
            slow = slow->next;
        }
        return slow;
    }
};
```
```Python []
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        if head is None or head.next is None:
            return None

        slow = head
        fast = head
        while fast.next and fast.next.next:
            fast = fast.next.next
            slow = slow.next
            if fast == slow:
                break

        if fast.next is None or fast.next.next is None:
            return None

        slow = head
        while slow != fast:
            slow = slow.next
            fast = fast.next
        return slow
```


---


Java 代码：

```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
        next = null;
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


public class Solution {

    public ListNode detectCycle(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            // 注意：不要习惯性把 head 返回回去
            return null;
        }

        // 起点要一样，这里第 141 题的结论
        ListNode slow = head;
        ListNode fast = head;

        // 注意这种写法，因为快指针一次走两步，
        // 所以要看它下一个结点以及下下一个结点是否为空
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                break;
            }
        }

        // 特判，如果只是因为链表不存在环，那就返回空，因为既然不存在环，肯定没有重复结点
        if (fast.next == null || fast.next.next == null) {
            return null;
        }

        slow = head;

        while (slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }
        return slow;
    }
}
```

Python 代码：

```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        if head is None or head.next is None:
            return None

        slow = head
        fast = head
        while fast.next and fast.next.next:
            fast = fast.next.next
            slow = slow.next
            if fast == slow:
                break

        if fast.next is None or fast.next.next is None:
            return None

        slow = head
        while slow != fast:
            slow = slow.next
            fast = fast.next
        return slow
```