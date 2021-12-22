---
title: 「力扣」第 146 题：LRU 缓存机制（中等）
icon: yongyan
categories: 链表
tags:
 - 哈希表
 - 双向链表
---

+ 题目链接：[146. LRU 缓存机制](https://leetcode-cn.com/problems/lru-cache/)；
+ 题解链接：[哈希表 + 双向链表（Java）](https://leetcode-cn.com/problems/lru-cache/solution/ha-xi-biao-shuang-xiang-lian-biao-java-by-liweiw-2/)

## 题目描述

运用你所掌握的数据结构，设计和实现一个 [LRU (最近最少使用) 缓存机制](https://baike.baidu.com/item/LRU) 。

实现 `LRUCache` 类：

- `LRUCache(int capacity)` 以正整数作为容量 `capacity` 初始化 LRU 缓存
- `int get(int key)` 如果关键字 `key` 存在于缓存中，则返回关键字的值，否则返回 `-1` 。
- `void put(int key, int value)` 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

**进阶**：你是否可以在 `O(1)` 时间复杂度内完成这两种操作？



**示例：**

```
输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
```

**提示：**

- `1 <= capacity <= 3000`
- `0 <= key <= 10000`
- $0 <= value <= 10^5$
- 最多调用 $2 * 10^5$ 次 `get` 和 `put`

## 题意分析

::: info 题意概括
缓存是有限的，在缓存满的时候，删除哪些元素，就有不同的缓存删除策略。
:::

### LRU （Least Recently Used）缓存机制

+ 在缓存满的时候，删除缓存里最久未使用的数据，然后再放入新元素；
+ 数据的访问时间很重要，**访问时间距离现在最近**，就最不容易被删除。

核心思想：在删除元素的时候，只看在缓存里的存在时间。

另一种缓存删除机制是 LFU （Least Frequently Used，最不经常使用）缓存机制，这道题是「力扣」第 460 题：[LFU 缓存](https://leetcode-cn.com/problems/lfu-cache/)。算法的设计思想其实是一样的。


## 思路

+ 由于题目的时间复杂度要求 $O(1)$，空间肯定不能省，存取数据时间性能最好的就是哈希表，因此底层的数据结构一定是一个哈希表；
+ 根据题目意思，访问某个数据，时间优先级得提前，还有删除末尾结点的需求，**这样的数据结构得在头尾访问数据最快，这种数据结构是「双向链表」**；
+ 「链表」结点需要记录：1、value，2、key（在哈希表里删除的时候用得上），3、前驱结点引用，4、后继结点引用。

这样一套设计下来，题目中要求的操作就是 $O(1)% 了。

下面是内存结构示意图：

![image.png](https://pic.leetcode-cn.com/9f81c68ea2fcc02af72dcc30987984d8457e7f1260762810f99c97cb88f0b0a7-image.png)


编码说明：

+ 应该先弄清楚思路，再编码；
+ 可以设计成「双向链表」的尾部存储较新访问的结点，头部是当前频次最旧的结点。双向链表在结构上是对称的，编码的时候注意保持语义一致；
+ 「双向链表」的常见操作是使用两个虚拟结点，一个访问头部最快，另一个访问尾部最快，这个技巧其实在「单链表」中我们已经见过，叫「哨兵结点」；
+ 链表中的相关操作建议画图去思考实现，否则凭空想象一些指针变量的指向操作容易出错；
+ 在一些操作中相同的操作，应该考虑抽取成公用的方法；
+ 在编码完成以后，需要注意调试，这一步是很花时间的，也没有过多的技巧，添加打印输出语句。

注意：

1. 以下代码由于本人水平有限，封装还不够好，仅供参考；
2. 下面的代码细节特别多，读者**浏览即可，不建议模仿**，应该尝试自己编写完成，相信是一个不错的编程练习；
3. Java 里的 `LinkedList` 就是双向链表，这里只是为了练习，定制化一些操作，因此手写。

**参考代码**：

```java
import java.util.HashMap;
import java.util.Map;

public class LRUCache {

    private Map<Integer, ListNode> map;

    /**
     * 双链表结点类
     */
    private class ListNode {

        private Integer key;
        private Integer value;
        /**
         * 前驱结点 precursor
         */
        private ListNode pre;
        /**
         * 后继结点 successor（写成 next 是照顾单链表的表示习惯）
         */
        private ListNode next;

        public ListNode() {
        }

        public ListNode(Integer key, Integer value) {
            this.key = key;
            this.value = value;
        }
    }

    private int capacity;

    /**
     * 虚拟头结点没有前驱
     */
    private ListNode dummyHead;
    /**
     * 虚拟尾结点没有后继
     */
    private ListNode dummyTail;

    public LRUCache(int capacity) {
        map = new HashMap<>(capacity);
        this.capacity = capacity;
        dummyHead = new ListNode(-1, -1);
        dummyTail = new ListNode(-1, -1);
        // 初始化链表为 head <-> tail

        dummyHead.next = dummyTail;
        dummyTail.pre = dummyHead;
    }

    /**
     * 如果存在，把当前结点移动到双向链表的头部
     *
     * @param key
     * @return
     */
    public int get(int key) {
        if (map.containsKey(key)) {
            ListNode node = map.get(key);
            int val = node.value;

            // 把当前 node 移动到双向链表的头部
            moveNode2Head(key);
            return val;
        } else {
            return -1;
        }
    }

    /**
     * 如果哈希表的容量满了，就要删除一个链表末尾元素，然后在链表头部插入新元素
     *
     * @param key
     * @param value
     */
    public void put(int key, int value) {
        if (map.containsKey(key)) {
            // 1、更新 value
            map.get(key).value = value;
            // 2、把当前 node 移动到双向链表的头部
            moveNode2Head(key);
            return;
        }

        // 放元素的操作是一样的

        if (map.size() == capacity) {
            // 如果满了
            ListNode oldTail = removeTail();

            // 设计 key 就是为了在这里删除
            map.remove(oldTail.key);
        }

        // 然后添加元素
        ListNode newNode = new ListNode(key, value);
        map.put(key, newNode);
        addNode2Head(newNode);
    }

    // 为了突出主干逻辑，下面是 3 个公用的方法

    /**
     * 删除双链表尾部结点
     */
    private ListNode removeTail() {
        ListNode oldTail = dummyTail.pre;
        ListNode newTail = oldTail.pre;

        // 两侧结点建立连接
        newTail.next = dummyTail;
        dummyTail.pre = newTail;

        // 释放引用
        oldTail.pre = null;
        oldTail.next = null;

        return oldTail;
    }

    /**
     * 把当前 key 指向的结点移到双向链表的头部
     *
     * @param key
     */
    private void moveNode2Head(int key) {
        // 1、先把 node 拿出来
        ListNode node = map.get(key);

        // 2、原来 node 的前驱和后继接上
        node.pre.next = node.next;
        node.next.pre = node.pre;

        // 3、再把 node 放在末尾
        addNode2Head(node);
    }

    /**
     * 在双链表的头部新增一个结点
     *
     * @param newNode
     */
    private void addNode2Head(ListNode newNode) {
        // 1、当前头结点
        ListNode oldHead = dummyHead.next;

        // 2、末尾结点的后继指向新结点
        oldHead.pre = newNode;

        // 3、设置新结点的前驱和后继
        newNode.pre = dummyHead;
        newNode.next = oldHead;

        // 4、更改虚拟头结点的后继结点
        dummyHead.next = newNode;
    }


    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        System.out.println(cache.map.keySet());

        int res1 = cache.get(1);
        System.out.println(res1);

        cache.put(3, 3);

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



