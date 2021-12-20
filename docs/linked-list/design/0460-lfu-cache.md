---
title: 「力扣」第 460 题：LFU 缓存
icon: yongyan
categories: 专题 6：链表
tags:
 - 哈希表
 - 双向链表
---

+ [题目链接](https://leetcode-cn.com/problems/lfu-cache)
+ [题解链接](https://leetcode-cn.com/problems/lfu-cache/solution/ha-xi-biao-shuang-xiang-lian-biao-java-by-liweiwei/)

> 设计并实现最不经常使用（LFU）缓存的数据结构。它应该支持以下操作：get 和 put。
>
> get(key) - 如果键存在于缓存中，则获取键的值（总是正数），否则返回 -1。
> put(key, value) - 如果键不存在，请设置或插入值。当缓存达到其容量时，它应该在插入新项目之前，使最不经常使用的项目无效。在此问题中，当存在平局（即两个或更多个键具有相同使用频率）时，最近最少使用的键将被去除。
>
> 进阶：
> 你是否可以在 O(1) 时间复杂度内执行两项操作？
>
> 示例：
>
> ```
> LFUCache cache = new LFUCache( 2 /* capacity (缓存容量) */ );
> 
> cache.put(1, 1);
> cache.put(2, 2);
> cache.get(1);       // 返回 1
> cache.put(3, 3);    // 去除 key 2
> cache.get(2);       // 返回 -1 (未找到key 2)
> cache.get(3);       // 返回 3
> cache.put(4, 4);    // 去除 key 1
> cache.get(1);       // 返回 -1 (未找到 key 1)
> cache.get(3);       // 返回 3
> cache.get(4);       // 返回 4
> ```
>


题目意思：缓存是有限的，在缓存满的时候，删除哪些元素，就有不同的缓存删除策略。

说明：如果缓存不限制大小，就没有下面的这两道问题了。即下面这两种策略是在缓存满的情况下，两种不同的缓存删除规则。

### LRU （Least Recently Used）缓存机制（看时间）

「力扣」第 146 题：[LRU缓存机制](https://leetcode-cn.com/problems/lru-cache/)

+ 在缓存满的时候，删除缓存里最久未使用的数据，然后再放入新元素；
+ 数据的访问时间很重要，**访问时间距离现在越近**，就越不容易被删除；

就是喜新厌旧，淘汰在缓存里呆的时间最久的元素。在删除元素的时候，只看「时间」这一个维度。


### LFU （Least Frequently Used）缓存机制（看访问次数）

+ 在缓存满的时候，删除缓存里使用次数最少的元素，然后在缓存中放入新元素；
+ 数据的访问次数很重要，**访问次数越多**，就越不容易被删除；
+ 根据题意，「当存在平局（即两个或更多个键具有相同使用频率）时，最近最少使用的键将被去除」，即在「访问次数」相同的情况下，按照时间顺序，先删除在缓存里时间最久的数据。

说明：本题其实就是在「力扣」第 146 题：[LRU缓存机制](https://leetcode-cn.com/problems/lru-cache/) 的基础上，在删除策略里多考虑了一个维度（「访问次数」）的信息。

核心思想：先考虑访问次数，在访问次数相同的情况下，再考虑缓存的时间。

## 思路

+ 由于题目的时间复杂度要求 $O(1)$，空间肯定不能省，存取数据时间性能最好的就是哈希表，因此底层的数据结构一定是一个哈希表；
+ 又由于缓存大小有限制，删除策略是「先看访问频次，再看访问时间」，所以需要记录每个数据访问的频次；
+ 「删除某个数据」得 $O(1)$，访问某个数据，时间优先级得提前（提前到当前频次最高），**这样的数据结构符合在头尾访问数据最快，并且删除其中一个结点也得是 $O(1)$，这种数据结构是「双向链表」**；
+ 「链表」结点得记录：1、value，2、key（在哈希表里删除的时候用得上），3、访问次数信息，以便知道下一个访问次数是多少；4、前驱结点引用，5、后继结点引用；
+ 哈希表存储的 key 就是题目的 key，方便快速查询和删除，value 是结点的引用，方便对结点进行操作。

这样一套设计下来，题目中要求的操作就是 $O(1)$ 了。


下面是内存结构示意图：

![image.png](https://pic.leetcode-cn.com/909ea661e76e600e49763d06d2fa72b7897e36ebf47d966292636bce1b241734-image.png)

（图是用软件 OmniGraffle 画的。不太复杂的规则图形，用 PPT 也可以画出来。）

+ 每次访问一个已经存在的元素的时候：应该先把结点类从当前所属的访问次数双链表里删除，然后再添加到它「下一个访问次数」的双向链表的头部。


编码说明：

+ 应该先弄清楚思路，再编码；
+ 可以设计成「双向链表」的尾部存储较新访问的结点，头部是当前频次最旧的结点。双向链表在结构上是对称的，编码的时候注意保持语义一致；
+ 「双向链表」的常见操作是使用两个虚拟结点，一个访问头部最快，另一个访问尾部最快，这个技巧其实在「单链表」中我们已经见过，叫「哨兵结点」；
+ 链表中的相关操作建议画图去思考实现，否则凭空想象一些指针变量的指向操作容易出错；
+ 如果在编码的过程中，发现一些数据需要维护，可以适当增加属性；
+ 在一些操作中相同的操作，应该考虑抽取成公用的方法；
+ 在编码完成以后，需要注意调试，这一步是很花时间的，也没有过多的技巧，添加打印输出语句。

注意：

1. 以下代码由于本人水平有限，封装还不够好，仅供参考；
2. 下面的代码细节特别多，读者**浏览即可，不建议模仿，应该尝试自己编写完成，相信是一个不错的编程练习**；
3. `ListNode` 结点类，哈希表要用到，双向链表也会用到，因此设计在外面；
4. Java 里的 `LinkedList` 就是双向链表，这里只是为了练习，定制化一些操作，因此手写。


**参考代码**：

感谢 [@zhangkyou](/u/zhangkyou/) 和 [@lzhlyle](/u/lzhlyle/) 朋友的提醒，原来我的代码维护的是 `maxFrequent`，时间复杂度没有到 $O(1)$，应该维护的是 `minFrequent`。需要在以下两处维护这个变量：

+ 插入一个新结点的时候，因为这个结点之前肯定没有被访问过，此时设置 `minFrequent = 1`，相当于归位了；
+ 当 `put` 和 `get` 的时候，都有把当前链表里的结点移到另一个链表结点的操作。如果移除的那个链表恰好是访问次数最小链表，并且移除以后链表的结点个数为 `0`，`minFrequent` 需要加 1 。


```Java []
import java.util.HashMap;
import java.util.Map;

public class LFUCache {

    /**
     * key 就是题目中的 key
     * value 是结点类
     */
    private Map<Integer, ListNode> map;

    /**
     * 访问次数哈希表，使用 ListNode[] 也可以，不过要占用很多空间
     */
    private Map<Integer, DoubleLinkedList> frequentMap;

    /**
     * 外部传入的容量大小
     */
    private Integer capacity;

    /**
     * 全局最高访问次数，删除最少使用访问次数的结点时会用到
     */
    private Integer minFrequent = 1;


    public LFUCache(int capacity) {
        map = new HashMap<>(capacity);
        frequentMap = new HashMap<>();
        this.capacity = capacity;
    }

    /**
     * get 一次操作，访问次数就增加 1；
     * 从原来的链表调整到访问次数更高的链表的表头
     *
     * @param key
     * @return
     */
    public int get(int key) {
        // 测试测出来的，capacity 可能传 0
        if (capacity == 0) {
            return -1;
        }

        if (map.containsKey(key)) {
            // 获得结点类
            ListNode listNode = removeListNode(key);

            // 挂接到新的访问次数的双向链表的头部
            int frequent = listNode.frequent;
            addListNode2Head(frequent, listNode);
            return listNode.value;
        } else {
            return -1;
        }
    }

    /**
     * @param key
     * @param value
     */
    public void put(int key, int value) {
        if (capacity == 0) {
            return;
        }

        // 如果 key 存在，就更新访问次数 + 1，更新值
        if (map.containsKey(key)) {
            ListNode listNode = removeListNode(key);

            // 更新 value
            listNode.value = value;
            int frequent = listNode.frequent;
            addListNode2Head(frequent, listNode);
            return;
        }

        // 如果 key 不存在
        // 1、如果满了，先删除访问次数最小的的末尾结点，再删除 map 里对应的 key
        if (map.size() == capacity) {
            // 1、从双链表里删除结点
            DoubleLinkedList doubleLinkedList = frequentMap.get(minFrequent);
            ListNode removeNode = doubleLinkedList.removeTail();

            // 2、删除 map 里对应的 key
            map.remove(removeNode.key);
        }

        // 2、再创建新结点放在访问次数为 1 的双向链表的前面
        ListNode newListNode = new ListNode(key, value);
        addListNode2Head(1, newListNode);
        map.put(key, newListNode);

        // 【注意】因为这个结点是刚刚创建的，最少访问次数一定为 1
        this.minFrequent = 1;
    }

    // 以下部分主要是结点类和双向链表的操作

    /**
     * 结点类，是双向链表的组成部分
     */
    private class ListNode {
        private int key;
        private int value;
        private int frequent = 1;
        private ListNode pre;
        private ListNode next;

        public ListNode() {
        }

        public ListNode(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    /**
     * 双向链表
     */
    private class DoubleLinkedList {
        /**
         * 虚拟头结点，它无前驱结点
         */
        private ListNode dummyHead;
        /**
         * 虚拟尾结点，它无后继结点
         */
        private ListNode dummyTail;

        /**
         * 当前双向链表的有效结点数
         */
        private int count;

        public DoubleLinkedList() {
            // 虚拟头尾结点赋值多少无所谓
            this.dummyHead = new ListNode(-1, -1);
            this.dummyTail = new ListNode(-2, -2);

            dummyHead.next = dummyTail;
            dummyTail.pre = dummyHead;
            count = 0;
        }

        /**
         * 把一个结点类添加到双向链表的开头（头部是最新使用数据）
         *
         * @param addNode
         */
        public void addNode2Head(ListNode addNode) {
            ListNode oldHead = dummyHead.next;
            // 两侧结点指向它
            dummyHead.next = addNode;
            oldHead.pre = addNode;
            // 它的前驱和后继指向两侧结点
            addNode.pre = dummyHead;
            addNode.next = oldHead;
            count++;
        }

        /**
         * 把双向链表的末尾结点删除（尾部是最旧的数据，在缓存满的时候淘汰）
         *
         * @return
         */
        public ListNode removeTail() {
            ListNode oldTail = dummyTail.pre;
            ListNode newTail = oldTail.pre;

            // 两侧结点建立连接
            newTail.next = dummyTail;
            dummyTail.pre = newTail;

            // 它的两个属性切断连接
            oldTail.pre = null;
            oldTail.next = null;

            // 重要：删除一个结点，当前双向链表的结点个数少 1
            count--;
            return oldTail;
        }
    }


    /**
     * 将原来访问次数的结点，从双向链表里脱离出来
     *
     * @param key
     * @return
     */
    private ListNode removeListNode(int key) {
        // 获得结点类
        ListNode deleteNode = map.get(key);

        ListNode preNode = deleteNode.pre;
        ListNode nextNode = deleteNode.next;
        // 两侧结点建立连接
        preNode.next = nextNode;
        nextNode.pre = preNode;
        // 删除去原来两侧结点的连接
        deleteNode.pre = null;
        deleteNode.next = null;

        // 维护双链表结点数
        frequentMap.get(deleteNode.frequent).count--;

        // 【注意】维护 minFrequent
        // 如果当前结点正好在最小访问次数的链表上，并且移除以后结点数为 0，最小访问次数需要加 1
        if (deleteNode.frequent == minFrequent && frequentMap.get(deleteNode.frequent).count == 0) {
            minFrequent++;
        }

        // 访问次数加 1
        deleteNode.frequent++;
        return deleteNode;
    }


    /**
     * 把结点放在对应访问次数的双向链表的头部
     *
     * @param frequent
     * @param addNode
     */
    private void addListNode2Head(int frequent, ListNode addNode) {
        DoubleLinkedList doubleLinkedList;

        // 如果不存在，就初始化
        if (frequentMap.containsKey(frequent)) {
            doubleLinkedList = frequentMap.get(frequent);
        } else {
            doubleLinkedList = new DoubleLinkedList();
        }

        // 添加到 DoubleLinkedList 的表头
        doubleLinkedList.addNode2Head(addNode);
        frequentMap.put(frequent, doubleLinkedList);
    }

    public static void main(String[] args) {
        LFUCache cache = new LFUCache(2);

        cache.put(1, 1);
        cache.put(2, 2);

        System.out.println(cache.map.keySet());

        int res1 = cache.get(1);
        System.out.println(res1);

        cache.put(3, 3);
        System.out.println(cache.map.keySet());

        int res2 = cache.get(2);
        System.out.println(res2);

        int res3 = cache.get(3);
        System.out.println(res3);

        cache.put(4, 4);
        System.out.println(cache.map.keySet());

        int res4 = cache.get(1);
        System.out.println(res4);

        int res5 = cache.get(3);
        System.out.println(res5);

        int res6 = cache.get(4);
        System.out.println(res6);
    }
}
```

（本节完）