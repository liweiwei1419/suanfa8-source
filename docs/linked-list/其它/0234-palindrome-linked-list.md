---
title: 「力扣」第 234 题：回文链表（简单）
date: 2017-08-22 08:00:00
author: liweiwei1419
top: false
mathjax: true
categories: 专题 6：链表
tags:
  - 单链表
permalink: leetcode-algo/0234-palindrome-linked-list
---

## 「力扣」第 234 题：回文链表（简单）

+ 链接：https://leetcode-cn.com/problems/palindrome-linked-list

> 请判断一个链表是否为回文链表。
>
> 示例 1:
>
> ```
> 输入: 1->2
> 输出: false
> ```
>
>
> 示例 2:
>
> ```
> 输入: 1->2->2->1
> 输出: true
> ```
>
> 进阶：
> 你能否用 $O(n)$ 时间复杂度和 $O(1)$ 空间复杂度解决此题？

### 方法一：

放在一个动态数组中，然后判断这个动态数组的回文性。

Java 代码：

```java
import java.util.ArrayList;
import java.util.List;

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

Java 代码：

```java
import java.util.Stack;

public class Solution2 {
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

### 方法三：反转后面的链表

Java 代码：

```java
public class Solution3 {

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

### 练习3：LeetCode 第 234 题：[回文链表](https://leetcode-cn.com/problems/palindrome-linked-list)

传送门：[234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)。

> 请判断一个链表是否为回文链表。
>
> **示例 1:**
>
> ```
> 输入: 1->2
> 输出: false
> ```
>
> **示例 2:**
>
> ```
> 输入: 1->2->2->1
> 输出: true
> ```
>
> **进阶：**
> 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

求解关键：找到链表中间位置的结点，做一些相关的处理。特别要注意的是，不管哪种方法，都要对一些细节问题仔细考虑，可以举出具体的例子，画图帮助编码实现。

思路1：从中间位置开始反转链表，逐个比较。

Java 代码：

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
            s.append(cur.val + " -> ");
            cur = cur.next;
        }
        s.append("NULL");
        return s.toString();
    }
}


/**
 * https://leetcode-cn.com/problems/palindrome-linked-list/description/
 *
 * @author liwei
 */
public class Solution {

    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) {
            return true;
        }
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // slow 的下一个就是新链表，反转它
        ListNode cur = slow.next;
        slow.next = null;
        ListNode pre = null;
        while (cur != null) {
            ListNode next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        // 此时 pre 成为新链表开头
        while (head != null && pre != null) {
            if (head.val != pre.val) {
                return false;
            }
            head = head.next;
            pre = pre.next;
        }
        return true;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 0, 2, 1};
        Solution solution = new Solution();
        ListNode head = new ListNode(nums);
        boolean palindrome = solution.isPalindrome(head);
        System.out.println(palindrome);
    }
}

```

思路2：在寻找链表中间结点的过程中，慢结点向前遍历的时候，把遍历到的值放入一个栈中。

Java 代码：

```java
import java.util.Stack;

/**
 * @author liwei
 */
public class Solution2 {
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
        ListNode fast = head;
        ListNode slow = head;
        stack.add(slow.val);

        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            stack.add(slow.val);
        }
        if (fast.next == null) {
            // 链表有奇数个结点
            stack.pop();
        }
        slow = slow.next;
        while (slow != null) {
            if (stack.pop() != slow.val) {
                return false;
            }
            slow = slow.next;
        }
        return true;
    }

    public static void main(String[] args) {
        Solution2 solution2 = new Solution2();
        int[] nums = {1, 2, 3, 2, 1};
        ListNode head = new ListNode(nums);
        boolean palindrome = solution2.isPalindrome(head);
        System.out.println(palindrome);
    }
}
```

