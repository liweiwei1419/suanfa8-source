---
title: 「力扣」第 234 题：回文链表（简单）
icon: yongyan
category: 链表
tags:
  - 链表
  - 递归
---

+ 题目链接：[234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)；
+ 题解链接：[转到字符数组中判断、使用栈、反转后半部分](https://leetcode-cn.com/problems/palindrome-linked-list/solution/zhuan-dao-zi-fu-shu-zu-zhong-pan-duan-shi-yong-zha/)。

## 题目描述

给你一个单链表的头节点 `head` ，请你判断该链表是否为回文链表。如果是，返回 `true` ；否则，返回 `false` 。

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg)

```
输入：head = [1,2,2,1]
输出：true
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg)

```
输入：head = [1,2]
输出：false
```

 

**提示：**

- 链表中节点数目在范围 $[1, 10^5]$ 内
- `0 <= Node.val <= 9`

**进阶**：你能否用 $O(n)$ 时间复杂度和 $O(1)$ 空间复杂度解决此题？

### 方法一：放在一个动态数组中，然后判断这个动态数组的回文性

**参考代码 1**：

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {

    public boolean isPalindrome(ListNode head) {
        List<Integer> arr = new ArrayList<>();
        while (head != null) {
            arr.add(head.val);
            head = head.next;
        }
        return judgeArrPalindrome(arr);
    }

    private boolean judgeArrPalindrome(List<Integer> arr) {
        int left = 0;
        int right = arr.size() - 1;

        while (left < right) {
            if (arr.get(left).equals(arr.get(right))) {
                left++;
                right--;
            } else {
                return false;
            }
        }
        return true;
    }
}
```

### 方法二：借助栈

**参考代码 2**：

```java
import java.util.Stack;

public class Solution {
    // 分清楚奇数和偶数结点两种情况，不反转链表，借助栈完成回文链表的判断
    //      slow
    // 1，2，3，4，5

    //   slow
    // 1，2，3，4

    /**
     * @param head
     * @return
     */
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) {
            return true;
        }

        Stack<Integer> stack = new Stack<>();
        ListNode fastNode = head;
        ListNode slowNode = head;
        stack.add(slowNode.val);

        while (fastNode.next != null && fastNode.next.next != null) {
            slowNode = slowNode.next;
            fastNode = fastNode.next.next;
            stack.add(slowNode.val);
        }
        if (fastNode.next == null) {
            // 链表有奇数个结点
            stack.pop();
        }
        slowNode = slowNode.next;
        while (slowNode != null) {
            if (stack.pop() != slowNode.val) {
                return false;
            }
            slowNode = slowNode.next;
        }
        return true;
    }
}
```

### 方法三：快慢指针找中点、反转后面的链表

**参考代码 3**：

```java
public class Solution {

    public boolean isPalindrome(ListNode head) {
        // 特判
        if (head == null || head.next == null) {
            return true;
        }

        // 1、使用快慢指针找到链表的中间结点
        // 偶数个结点的时候，来到了中间靠左的那个结点
        ListNode slowNode = head;
        ListNode fastNode = head;

        while (fastNode.next != null && fastNode.next.next != null) {
            slowNode = slowNode.next;
            fastNode = fastNode.next.next;
        }
        // 2、slowNode 的下一个就是新链表，反转它
        ListNode curNode = slowNode.next;
        // 注意：这里要切点连接，否则反转的额时候会出问题
        slowNode.next = null;

        // 3、反转链表的后半部分
        ListNode pre = null;
        while (curNode != null) {
            ListNode next = curNode.next;
            curNode.next = pre;
            pre = curNode;
            curNode = next;
        }

        // 此时 pre 成为新链表的表头
        // 4、逐个比对，两边长度不一，但只要"前缀部分相等即可"
        while (head != null && pre != null) {
            if (head.val != pre.val) {
                return false;
            }
            head = head.next;
            pre = pre.next;
        }
        return true;
    }
}
```

---

补充：

用于测试的结点类（这部分代码不用提交给「力扣」）。

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


用于测试的主方法（这部分代码不用提交给「力扣」）。

```java
```

