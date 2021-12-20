# 链表问题




LRU（看现在）：活在当下。比如在公司中，一个新员工做出新业绩，马上会得到重用。

LFU（看历史）：以史为镜。还是比如在公司中，新员工必须做出比那些功勋卓著的老员工更多更好的业绩才可以受到老板重视，这样的方式比较尊重「前辈」。



## 链表

## 单向链表（单链表）

## 双链表

## 单向循环链表

## 双向循环链表

约瑟夫问题

## 静态链表

「力扣」第 23 题：合并K个排序链表

+ [链接](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

合并 *k* 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

思维难度上比较难，但是编码并不困难。

你可以把所有的链表头都遍历一遍，时间复杂度是 $O(N)$，使用最小堆就可以降到 $O(\log N)$。

## 「力扣」第 24 题：两两交换链表的结点

1、穿针引线

2、虚拟头结点








### 链表

| 题目序号                                                     | 题解                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [题目：206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)（已用） | [穿针引线 + 递归](https://leetcode-cn.com/problems/reverse-linked-list/solution/chuan-zhen-yin-xian-di-gui-by-liweiwei1419/) |
| [题目：92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/) | [4 个指针、3 个指针](https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/4-ge-zhi-zhen-3-ge-zhi-zhen-by-liweiwei1419/) |
| [24. 两两交换链表中的节点（中等）](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)（已用） | [穿针引线、递归](https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/chuan-zhen-yin-xian-di-gui-by-liweiwei1419-2/) |
| [61. 旋转链表（中等）](https://leetcode-cn.com/problems/rotate-list/)（已用） | [题解](https://leetcode-cn.com/problems/rotate-list/solution/chuan-zhen-yin-xian-by-liweiwei1419/) |
| 203（已用）                                                  |                                                              |
| [234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)（已用） | [转到字符数组中判断、使用栈、反转后半部分](https://leetcode-cn.com/problems/palindrome-linked-list/solution/zhuan-dao-zi-fu-shu-zu-zhong-pan-duan-shi-yong-zha/) |
| [2. 两数相加（中等）](https://leetcode-cn.com/problems/add-two-numbers/)（已用） | [穿针引线](https://leetcode-cn.com/problems/add-two-numbers/solution/chuan-zhen-yin-xian-by-liweiwei1419-3/) |
| [445. 两数相加 II（中等）（已用）](https://leetcode-cn.com/problems/add-two-numbers-ii/) | [两个栈、使用头插法生成结果链表](https://leetcode-cn.com/problems/add-two-numbers-ii/solution/liang-ge-zhan-shi-yong-tou-cha-fa-sheng-cheng-jie-/) |
| [21. 合并两个有序链表（简单）](https://leetcode-cn.com/problems/merge-two-sorted-lists/)（已用） | [穿针引线、递归（C++、Java、Python）](https://leetcode-cn.com/problems/merge-two-sorted-lists/solution/chuan-zhen-yin-xian-java-dai-ma-by-liweiwei1419/) |
| [题目：206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)（已用） | [穿针引线 + 递归](https://leetcode-cn.com/problems/reverse-linked-list/solution/chuan-zhen-yin-xian-di-gui-by-liweiwei1419/) |
| [19. 删除链表的倒数第N个节点（中等）（已用）](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/) | [快慢指针](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/solution/kuai-man-zhi-zhen-by-liweiwei1419/) |
|                                                              |                                                              |
| 第 2 部分                                                    |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |
| [题目：147. 对链表进行插入排序](https://leetcode-cn.com/problems/insertion-sort-list/) | [穿针引线](https://leetcode-cn.com/problems/insertion-sort-list/solution/chuan-zhen-yin-xian-by-liweiwei1419-2/) |
| [题目：142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/) | [快慢指针（Java、C++、Python）](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/kuai-man-zhi-zhen-by-liweiwei1419-2/) |
| [题目：622. 设计循环队列](https://leetcode-cn.com/problems/design-circular-queue/) | [数组实现的循环队列](https://leetcode-cn.com/problems/design-circular-queue/solution/shu-zu-shi-xian-de-xun-huan-dui-lie-by-liweiwei141/) |
|                                                              |                                                              |
| [题目：876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)（已用） | [快慢指针（注意链表长度为偶数时，返回第 2 个结点的细节）](https://leetcode-cn.com/problems/middle-of-the-linked-list/solution/kuai-man-zhi-zhen-zhu-yao-zai-yu-diao-shi-by-liwei/) |
| [355. 设计推特（中等）](https://leetcode-cn.com/problems/design-twitter/) | [哈希表 + 链表 + 优先队列（经典多路归并问题）（Java）](https://leetcode-cn.com/problems/design-twitter/solution/ha-xi-biao-lian-biao-you-xian-dui-lie-java-by-liwe/) |
| [460. LFU缓存（困难）](https://leetcode-cn.com/problems/lfu-cache/) | [哈希表 + 双向链表（Java）](https://leetcode-cn.com/problems/lfu-cache/solution/ha-xi-biao-shuang-xiang-lian-biao-java-by-liweiwei/) |
| [146. LRU缓存机制（中等）](https://leetcode-cn.com/problems/lru-cache/) | [哈希表 + 双向链表（Java）](https://leetcode-cn.com/problems/lru-cache/solution/ha-xi-biao-shuang-xiang-lian-biao-java-by-liweiw-2/) |



完成「力扣」第 355 题：设计推特（中等）；

## 知识点总结

+ 链表问题只要涉及到头结点的操作的，一般都会用到设置「虚拟头结点」这个技巧；
+ 链表中的问题，很多可以归结为“穿针引线”，“穿针引线”要写正确的一个重要技巧就是“画图”，“画图”会使自己的思路更加清晰，这一点是非常重要的；
+ 链表中可以递归处理的问题有：（1）合并有序链表；（2）删除链表中的结点；（3）反转链表；（4）两两交换链表中的结点。
+ 有的时候，链表的操作，有循环或者判断的，一定要记得看一看循环或者判断的循环体或者判断逻辑，就能检查出自己的代码是否写得正确，例如 LeetCode 第 148 题，使用“归并排序”将单链表进行排序和“单链表找中点”。

下面这句话不一定对，暂且先放在这里：链表的动态特性，很适合用来实现栈。数组适合在尾部操作，要扩容、缩容。链表适合在头部操作，每次都要 **new** **一个内存空间。**所以，其实不论是数组实现还是链表实现，都没有本质区别。

### 「力扣」第 206 题：反转链表

###  「力扣」第 92 题：反转从位置 m 到 n 的链表，k 个组进行一次反转

穿针引线。

###  「力扣」第 86 题：分割链表

不难，不过一直搞不清楚这个问题的意思。

### 「力扣」第 2 题、第 445 题：链表求和

### 「力扣」第 2 题：两数相加

要求：给出两个 **非空** 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 **逆序** 的方式存储的，并且它们的每个节点只能存储 **一位** 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

分析：这道题其实不难，主要考察了代码的编写能力。

1、首先应该考虑到边界情况：

```python
if l1 is None:
    return l2

if l2 is None:
    return l1
```

2、链表问题一般都会设置虚拟头结点；

3、进位问题有模板写法：模 $10$ 得到位数，再除以 $10$ 得到进位；

4、最后考虑要不要进位 $1$。

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def addTwoNumbers(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        if l1 is None:
            return l2

        if l2 is None:
            return l1

        dummy_node = ListNode(-1)
        cur_node = dummy_node
        s = 0

        # 只要二者之一非空，就加下去
        while l1 or l2:
            if l1:
                s += l1.val
                l1 = l1.next
            if l2:
                s += l2.val
                l2 = l2.next
            cur_node.next = ListNode(s % 10)
            s //= 10
            cur_node = cur_node.next
        if s == 1:
            cur_node.next = ListNode(1)
        return dummy_node.next

```

 

问题并不难，但是编码上要注意。转换成数字不是不可以，但是链表很长的时候，就有越界的风险。

思考为什么要使用虚拟头结点，计算 carry 是一个常见的关于进位的操作。第 445 题稍微复杂，要借助栈完成。

### LeetCode 第 445 题：两数相加 II

传送门：[445. 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/description/)。

## 删除链表中等于给定值 val 的所有结点

### 「力扣」第 203 题：删除链表中等于给定值 val 的所有结点

一个对于链表常用的操作就是设置虚拟头结点。

### 「力扣」第 203 题：移除链表元素

传送门：[移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements)。

只要涉及跟链表头结点有关的，都要设计虚拟头结点来避免繁琐的讨论。

###  「力扣」第 82 题：删除排序链表中的重复元素 II

传送门：[删除排序链表中的重复元素 II](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii)。

### 「力扣」第 83 题：删除排序链表中的重复元素

传送门：[删除排序链表中的重复元素](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list)。

和 82 题完全不同。

分析：这道题给出两种解法。
相同之处：

- 都使用了当前指针和当前指针的下一指针，一共两个指针来帮助我们完成逻辑。
- 当前指针的下一指针和"当前指针"作判断，如果一样，说明应该丢弃"当前指针的下一指针"，如果一样，说明应该保留"当前指针的下一指针"。
  不同之处在于如何保留：
- 发现一样的元素的时候，马上把 next 指针后移；
- 发现一样的元素的时候，马上把 current 指针挪到 next 指针的下一位。

关键点：

- 保证在遍历过程中保持循环不变量的定义：current 总是指向第 1 次出现该数组的位置，next 用于遍历，会走过所有的元素。

解法1：

提示：要考虑到一些特殊情况，才能写好逻辑。

```java
public class Solution2 {

    /**
     * 从一个有序的链表中删除重复的元素
     * 思路：从后面往前面看，有重复就删除
     *
     * @param head
     * @return
     */
    public ListNode deleteDuplicates(ListNode head) {
        if(head==null){
            return null;
        }
        ListNode cur = head;
        ListNode next = cur.next;

        while (next!=null){
            if(next.val == cur.val){ //  1,1,1,1,2,3
                // next 后移一位
                next = next.next;
            }else { // 1,2,3
                cur.next = next; // 把 cur 的指针指向下一位
                cur = next; // 移动指针
                next = next.next;
            }
        }
        // 这一行是一个要小心的陷阱
        cur.next = null;
        return head;
    }

    public static void main(String[] args) {
        ListNode head1 = createListNode(new int[]{1,1,2,2,2,2,3,3,3,3});
        Solution2 solution2 = new Solution2();
        ListNode head2 = solution2.deleteDuplicates(head1);
        printLinkedList(head2);

    }


    public static ListNode createListNode(int[] nums) {
        if (nums.length == 0) {
            return null;
        }

        ListNode head = new ListNode(nums[0]);
        ListNode curNode = head;

        for (int i = 1; i < nums.length; i++) {
            curNode.next = new ListNode(nums[i]);
            curNode = curNode.next;
        }
        return head;
    }


    // 超级简单的一个工具方法
    public static void printLinkedList(ListNode head) {
        ListNode curNode = head;
        while (curNode != null) {
            System.out.printf("%s\t", curNode.val);
            curNode = curNode.next;
        }
        System.out.printf("null");
    }
}
```

解法2

```java
public class Solution3 {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null) {
            return null;
        }
        ListNode cur = head;
        ListNode next = cur.next;
        while (next != null) {
            if (next.val == cur.val) { // 1,1,2
                // 因为 next 不被使用了，所以 cur 的下一个就指向 next 的下一个
                cur.next = next.next;
                // 此时不能移动 cur，因为 cur 一定是第 1 个出现的元素，注意这里保持循环不变量的定义
                next = next.next;
            } else { // 1,2,3
                cur = next;
                next = next.next;
            }
        }
        return head;
    }

    public static void main(String[] args) {
        ListNode head1 = createListNode(new int[]{1, 1, 2, 2, 2, 2, 3, 3, 3, 3});
        Solution3 solution3 = new Solution3();
        ListNode head2 = solution3.deleteDuplicates(head1);
        printLinkedList(head2);
    }

    public static ListNode createListNode(int[] nums) {
        if (nums.length == 0) {
            return null;
        }
        ListNode head = new ListNode(nums[0]);
        ListNode curNode = head;
        for (int i = 1; i < nums.length; i++) {
            curNode.next = new ListNode(nums[i]);
            curNode = curNode.next;
        }
        return head;
    }

    // 超级简单的一个工具方法
    public static void printLinkedList(ListNode head) {
        ListNode curNode = head;
        while (curNode != null) {
            System.out.printf("%s\t", curNode.val);
            curNode = curNode.next;
        }
        System.out.printf("null");
    }
}
```

### 「力扣」第 328 题：奇数（Odd）偶数（Even）链表

传送门： https://leetcode.com/problems/odd-even-linked-list/description/

思路：在遍历的过程中，标记奇数节点和偶数节点，把奇数节点和偶数节点分开。最后把奇数节点的最后一个节点指向偶数节点的开始节点，具体细节请见代码。

我的解答：

```java
class ListNode {
    int val;
    ListNode next;

    ListNode(int x) {
        val = x;
    }
}

public class Solution {

    public ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode oddHead = head;
        ListNode evenHead = oddHead.next;
        ListNode oddNode = oddHead;
        ListNode evenNode = evenHead;
        ListNode currentNode = evenHead.next;
        boolean isodd = true;
        while (currentNode != null) {
            if (isodd) {
                oddNode.next = currentNode;
                oddNode = currentNode;
            } else {
                evenNode.next = currentNode;
                evenNode = currentNode;
            }
            isodd = !isodd;
            currentNode = currentNode.next;
        }
        isodd = !isodd;
        if (isodd) {
            oddNode.next = evenHead;
            evenNode.next = null;
        } else {
            oddNode.next = evenHead;
        }
        return oddHead;
    }


    public static void main(String[] args) {
        ListNode node1 = createListNode(new int[]{1, 2, 3, 4, 5});
        Solution solution = new Solution();
        ListNode result1 = solution.oddEvenList(node1);
        printLinkedList(result1);

        System.out.println("------");


        ListNode node2 = createListNode(new int[]{1, 2, 3, 4});
        ListNode result2 = solution.oddEvenList(node2);
        printLinkedList(result2);

        System.out.println("------");


        ListNode node3 = createListNode(new int[]{1, 2});
        ListNode result3 = solution.oddEvenList(node3);
        printLinkedList(result3);
    }

    public static ListNode createListNode(int[] nums) {
        if (nums.length == 0) {
            return null;
        }
        ListNode head = new ListNode(nums[0]);
        ListNode curNode = head;
        for (int i = 1; i < nums.length; i++) {
            curNode.next = new ListNode(nums[i]);
            curNode = curNode.next;
        }
        return head;
    }

    // 超级简单的一个工具方法
    public static void printLinkedList(ListNode head) {
        ListNode curNode = head;
        while (curNode != null) {
            System.out.printf("%s\t", curNode.val);
            curNode = curNode.next;
        }
        System.out.printf("null");
    }
}
```

网友的解答：http://blog.csdn.net/guicaisa/article/details/50557475
显然，网友的解法会更简洁一些：
根据网友的解答自己写了一遍：

```java
public class Solution2 {

    public ListNode oddEvenList(ListNode head) {
        if (head == null) {
            return head;
        }
        ListNode oddNode = head;
        ListNode evenNode = head.next;
        ListNode evenHead = evenNode;
        while (evenNode != null && evenNode.next != null) {
            oddNode.next = evenNode.next;
            oddNode = oddNode.next;
            evenNode.next = oddNode.next;
            evenNode = evenNode.next;
        }
        oddNode.next = evenHead;
        return head;
    }


    public static void main(String[] args) {
        ListNode node1 = createListNode(new int[]{1, 2, 3, 4, 5});
        Solution2 solution = new Solution2();
        ListNode result1 = solution.oddEvenList(node1);
        printLinkedList(result1);

        System.out.println("------");


        ListNode node2 = createListNode(new int[]{1, 2, 3, 4});
        ListNode result2 = solution.oddEvenList(node2);
        printLinkedList(result2);

        System.out.println("------");


        ListNode node3 = createListNode(new int[]{1, 2});
        ListNode result3 = solution.oddEvenList(node3);
        printLinkedList(result3);
    }

    public static ListNode createListNode(int[] nums) {
        if (nums.length == 0) {
            return null;
        }
        ListNode head = new ListNode(nums[0]);
        ListNode curNode = head;
        for (int i = 1; i < nums.length; i++) {
            curNode.next = new ListNode(nums[i]);
            curNode = curNode.next;
        }
        return head;
    }

    // 超级简单的一个工具方法
    public static void printLinkedList(ListNode head) {
        ListNode curNode = head;
        while (curNode != null) {
            System.out.printf("%s\t", curNode.val);
            curNode = curNode.next;
        }
        System.out.printf("null");
    }
}
```



### 「力扣」第 147 题：单链表的插入排序

重刷

### 「力扣」第 148 题：单链表的排序，使用归并排序

### 「力扣」第 24 题：两两交换链表中的结点

### 「力扣」第 25 题：k 个一组交换链表

### 「力扣」第 138 题：复制带随机指针的链表

### 「力扣」第 109 题：有序链表转换二叉搜索树  

英文网址：[109. Convert Sorted List to Binary Search Tree](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/description/)  ，中文网址：[109. 有序链表转换二叉搜索树](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/description/)  。  

### 「力扣」第 237 题：删除链表中的结点

要求：请编写一个函数，使其可以删除某个链表中给定的（非末尾的）结点，您将只被给予要求被删除的结点。

### 「力扣」第 21 题：[合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists)






### 「力扣」第 21 题：合并两个有序链表

使用递归解决穿针引线，单双转换

穿针引线：

![image-20190111135807481](http://upload-images.jianshu.io/upload_images/414598-6a6fb52487a91c87.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

递归写法：首先先写好递归终止条件。

![image-20190111135825172](http://upload-images.jianshu.io/upload_images/414598-2976372c3621c67c.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)







### 「力扣」第 23 题：[合并 K 个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists)



### 「力扣」第 19 题：[删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list)

### 「力扣」第 61 题：[旋转链表](https://leetcode-cn.com/problems/rotate-list)

### 「力扣」第 143 题：[重排链表](https://leetcode-cn.com/problems/reorder-list)

### 「力扣」第 234 题：[回文链表](https://leetcode-cn.com/problems/palindrome-linked-list)

### 「力扣」第 141 题：找出链表中是否有环

### 「力扣」第 142 题：找出链表的入口结点


### 「力扣」第 114 题：[二叉树展开为链表](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list)

要求：给定一个二叉树，[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95/8010757)将它展开为链表。

例如，给定二叉树

```
    1
   / \
  2   5
 / \   \
3   4   6
```

将其展开为：

```
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
```

Java 代码：后序遍历

```java
class Solution {
    public void flatten(TreeNode root) {
        if(root == null){
            return ;
        }
        
        flatten(root.left);
        flatten(root.right);
        
        if(root.left != null){
            TreeNode right = root.right;//记录右结点
            root.right = root.left;
            root.left = null;//将左结点置空
            TreeNode node = root.right;//到左结点的最后一个结点
            while(node.right != null){
                node = node.right;
            }
            node.right = right; 
        }
    }
}
```

## 链表的中间结点

### 「力扣」第 876 题：单链表的一个常见操作，设置快慢指针。



---

### 「力扣」第 61 题：链表向右旋转

传送门：[61. 旋转链表](https://leetcode-cn.com/problems/rotate-list/)。

> 给定一个链表，旋转链表，将链表每个节点向右移动 *k* 个位置，其中 *k* 是非负数。
>
> **示例 1:**
>
> ```
> 输入: 1->2->3->4->5->NULL, k = 2
> 输出: 4->5->1->2->3->NULL
> 解释:
> 向右旋转 1 步: 5->1->2->3->4->NULL
> 向右旋转 2 步: 4->5->1->2->3->NULL
> ```
>
> **示例 2:**
>
> ```
> 输入: 0->1->2->NULL, k = 4
> 输出: 2->0->1->NULL
> 解释:
> 向右旋转 1 步: 2->0->1->NULL
> 向右旋转 2 步: 1->2->0->NULL
> 向右旋转 3 步: 0->1->2->NULL
> 向右旋转 4 步: 2->0->1->NULL
> ```

Python 代码：

```python
# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution(object):
    def rotateRight(self, head, k):
        """
        :type head: ListNode
        :type k: int
        :rtype: ListNode
        """
        if head is None or k <= 0:
            return head

        # 先看链表有多少元素
        node = head
        # 先数这个链表的长度
        counter = 1
        while node.next:
            node = node.next
            counter += 1

        node.next = head
        k = k % counter
        node = head
        # counter - k - 1 可以取一些极端的例子找到规律
        for _ in range(counter - k - 1):
            node = node.next
        new_head = node.next
        node.next = None
        return new_head
```

（本节完） 