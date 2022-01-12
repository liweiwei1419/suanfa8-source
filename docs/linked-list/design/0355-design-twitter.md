---
title: 「力扣」第 355 题：设计推特（中等）
icon: yongyan
category: 链表
tags:
  - 链表
  - 快慢指针
---

- 题目链接：[355. 设计推特（中等）](https://leetcode-cn.com/problems/design-twitter)；
- 题解链接：[哈希表 + 链表 + 优先队列（经典多路归并问题）（Java）](https://leetcode-cn.com/problems/design-twitter/solution/ha-xi-biao-lian-biao-you-xian-dui-lie-java-by-liwe/)。

## 题目描述

设计一个简化版的推特(Twitter)，可以让用户实现发送推文，关注/取消关注其他用户，能够看见关注人（包括自己）的最近 `10` 条推文。

实现 `Twitter` 类：

- `Twitter()` 初始化简易版推特对象
- `void postTweet(int userId, int tweetId)` 根据给定的 `tweetId` 和 `userId` 创建一条新推文。每次调用此函数都会使用一个不同的 `tweetId` 。
- `List<Integer> getNewsFeed(int userId)` 检索当前用户新闻推送中最近 `10` 条推文的 ID 。新闻推送中的每一项都必须是由用户关注的人或者是用户自己发布的推文。推文必须 **按照时间顺序由最近到最远排序** 。
- `void follow(int followerId, int followeeId)` ID 为`followerId` 的用户开始关注 ID 为 `followeeId` 的用户。
- `void unfollow(int followerId, int followeeId)` ID 为 `followerId` 的用户不再关注 ID 为 `followeeId` 的用户。

**示例：**

```java
输入
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
输出
[null, null, [5], null, null, [6, 5], null, [5]]

解释
Twitter twitter = new Twitter();
twitter.postTweet(1, 5); // 用户 1 发送了一条新推文 (用户 id = 1, 推文 id = 5)
twitter.getNewsFeed(1);  // 用户 1 的获取推文应当返回一个列表，其中包含一个 id 为 5 的推文
twitter.follow(1, 2);    // 用户 1 关注了用户 2
twitter.postTweet(2, 6); // 用户 2 发送了一个新推文 (推文 id = 6)
twitter.getNewsFeed(1);  // 用户 1 的获取推文应当返回一个列表，其中包含两个推文，id 分别为 -> [6, 5] 。推文 id 6 应当在推文 id 5 之前，因为它是在 5 之后发送的
twitter.unfollow(1, 2);  // 用户 1 取消关注了用户 2
twitter.getNewsFeed(1);  // 用户 1 获取推文应当返回一个列表，其中包含一个 id 为 5 的推文。因为用户 1 已经不再关注用户 2
```

**提示：**

- `1 <= userId, followerId, followeeId <= 500`
- $0 <= tweetId <= 10^4$
- 所有推特的 ID 都互不相同
- `postTweet`、`getNewsFeed`、`follow` 和 `unfollow` 方法最多调用 $3 * 10^4$ 次

---

这里「推特」，可以理解为中国的「微博」、「朋友圈」、「力扣」，真正的数据数需要存在数据库里的，并且还要加上一些非关系型的数据库（redis 等），不能是放在内存里的，这里只是简化了需求。

**分析**：

- 这是一类系统设计问题（上周我们做过的 LFU 缓存也是属于这一类问题），通常简化了很多需求，只要题目意思理解清楚，一般情况下不难写出，难在编码的细节和调试；
- 这里需求 3 和需求 4，只需要维护「我关注的人的 id 列表」 即可，不需要维护「谁关注了我」，由于不需要维护有序性，为了删除和添加方便， 「我关注的人的 id 列表」需要设计成哈希表（`HashSet`），而每一个人的和对应的他关注的列表存在一个哈希映射（`HashMap`）里；
- 最复杂的是需求 2 `getNewsFeed(userId):`
  - 每一个人的推文和他的 id 的关系，依然是存放在一个哈希表里；
  - 对于每一个人的推文，只有顺序添加的需求，没有查找、修改、删除操作，因此可以使用线性数据结构，链表或者数组均可；
    - 使用数组就需要在尾部添加元素，还需要考虑扩容的问题（使用动态数组）；
    - 使用链表就得在头部添加元素，由于链表本身就是动态的，无需考虑扩容；
  - 检索最近的十条推文，需要先把这个用户关注的人的列表拿出来（实际上不是这么做的，请看具体代码，或者是「多路归并」的过程），然后再合并，排序以后选出 Top10，这其实是非常经典的「多路归并」的问题（「力扣」第 23 题：[合并 K 个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists)），这里需要使用的数据结构是优先队列，所以在上一步**在存储推文列表的时候使用单链表是合理的**，并且应该存储一个时间戳字段，用于比较哪一队的队头元素先出列。

剩下的就是一些细节问题了，例如需要查询关注人（包括自己）的最近十条推文，所以要把自己的推文也放进优先队列里。在出队（优先队列）、入队的时候需要考虑是否为空。

编写对这一类问题，需要仔细调试，并且养成良好的编码习惯，是很不错的编程练习问题。

**总结**：

- 如果需要维护数据的时间有序性，链表在特殊场景下可以胜任。因为时间属性通常来说是相对固定的，而不必去维护顺序性；
- 如果需要**动态维护数据有序性**，「优先队列」（堆）是可以胜任的，「力扣」上搜索「堆」（heap）标签，可以查看类似的问题；
- 设计类问题也是一类算法和数据结构的问题，并且做这一类问题有助于我们了解一些数据结构的大致思想和细节，「力扣」上搜索「设计」标签，可以查看类似的问题；
- 做完这个问题，不妨仔细思考一下这里使用链表存储推文的原因。

![image.png](https://pic.leetcode-cn.com/12d46207bc63bff12262667caaf208de177a94de65b48c9e9ab991347e66bfe1-image.png)

下面是动画演示，可以帮助大家理解「优先队列」是如何在「合并 `k` 个有序链表」上工作的。只不过「设计推特」这道题不需要去真的合并，并且使用的是最大堆。

这是个「多路归并」的问题，不熟悉的朋友，一定要掌握，非常重要。

@slidestart

![23-1.png](https://pic.leetcode-cn.com/a4fa231f8aff34ff8e5b9b8392ed5dede6776b2a539755da4e162d7d5e33f1a9-23-1.png)

---

![23-2.png](https://pic.leetcode-cn.com/e9af07422dfae1620d7ecf72a610b5dce1d7c94475fbbff6e48f03571ce42a5c-23-2.png)

---

![23-3.png](https://pic.leetcode-cn.com/490a4d7cf88d7644917c2633777a009d830ff21800c4095996d7e80df3519b31-23-3.png)

---

![23-4.png](https://pic.leetcode-cn.com/b355521b8898c3651838b8eae99538fb10870e86a9b6abc9da19dd3a8b628767-23-4.png)

---

![23-5.png](https://pic.leetcode-cn.com/ea03ee7e30e4f2cb9e30cd81af04d2d7a4e51c028f010c56bbd87dc4d822d2e5-23-5.png)

---

![23-6.png](https://pic.leetcode-cn.com/fcf082bd9ca51ea49b859f119624abb4e0c85d0098b38c8efdaab96b53c948ef-23-6.png)

---

![23-7.png](https://pic.leetcode-cn.com/414c49b5d3c6bb83dc84175b34c106e0420b6a6bf9f4d8d0a8a48776728d7efe-23-7.png)

---

![23-8.png](https://pic.leetcode-cn.com/f5240287ae384ae88f7b65244905f942cf9ebedb550309227ee2082a6896bb78-23-8.png)

---

![23-9.png](https://pic.leetcode-cn.com/a72672828770ebf292dbc060e510f42c553c04316f1b21e0cc96533b19ee2510-23-9.png)

---

![23-10.png](https://pic.leetcode-cn.com/67d5b52f33338011dfaa7123a2e018f9603b7e2e1a0af01f24f3392c1cf15775-23-10.png)

---

![23-11.png](https://pic.leetcode-cn.com/8b136abc90cc8f7ad4a59f9dd081dcf600d48a94433f15b997838588933d28cf-23-11.png)

---

![23-12.png](https://pic.leetcode-cn.com/3a734b4443508b4f3d9c3a34b486788268fbe2299cc7c6d6526c15ea5b375c1e-23-12.png)

---

![23-13.png](https://pic.leetcode-cn.com/cf5e300c97ae3e7e6515583b6c9b08e91a67c4252a46f2714ab1acc3c500730e-23-13.png)

---

![23-14.png](https://pic.leetcode-cn.com/84eaf674de0021d80980d723877aa6b9ff03adcb1040d1b3c337f76c7ab8de97-23-14.png)

---

![23-15.png](https://pic.leetcode-cn.com/36876081dcb305b270fd8a4b28172596f7bc4bc0758cd31dd8fc3fbe57f0848e-23-15.png)

---

![23-16.png](https://pic.leetcode-cn.com/4f6866ec025f34975b6324d6abdf504833f9fe62367222f0c28bf346f59f143e-23-16.png)

---

![23-17.png](https://pic.leetcode-cn.com/9331232d92e3d52d98f69be9c57b9f07758dfea08607171fcd9b182455eccc4e-23-17.png)

---

![23-18.png](https://pic.leetcode-cn.com/e03bfa3904c71f85e0cfeceabca222b3628a29129dabbdeefb853dc9fbdedf6c-23-18.png)

---

![23-19.png](https://pic.leetcode-cn.com/2d1b505cd9596523a41cdffcadaf25bbef7a5711f98476f0d170cb9c1b87a2bc-23-19.png)

---

![23-20.png](https://pic.leetcode-cn.com/24437c8e3e7d46c87150f4a8ddfe58e3e331560f32259222a214d81504512583-23-20.png)

---

![23-21.png](https://pic.leetcode-cn.com/b2c82ca75937b926dbc6f12e3e01d92fe2ed9e58b320ccdecde9ead14cd06881-23-21.png)

---

![23-22.png](https://pic.leetcode-cn.com/f15f25d23f4211a641fad12e4c81e201c5353c73ac8fe3fe48041346423d12ab-23-22.png)

---

![23-23.png](https://pic.leetcode-cn.com/ba9c022320e25c21a3c50baaa46cd1bcd3a80b75ef4165f795a4f6521e48657f-23-23.png)

---

![23-24.png](https://pic.leetcode-cn.com/9dd9daf23cf05f1b82c4a6def22eb91fae569522054374eb953b5197e7fbf6d8-23-24.png)

---

![23-25.png](https://pic.leetcode-cn.com/129dda70b3870c08664005577bbd3a26c85eaa4d9693307cced5b011c8fde1c5-23-25.png)

---

![23-26.png](https://pic.leetcode-cn.com/c5c0f56929ef0321ae7f086ebe67a998a615e4c82bacdf8129cb3ed5a973dd62-23-26.png)

---

![23-27.png](https://pic.leetcode-cn.com/bd310ddcb9a20229fb9a0a034c1151eaf6f24e4b592ced02ff22cc9f723b9c6d-23-27.png)

---

![23-28.png](https://pic.leetcode-cn.com/694e6bc6b7be711d95f7248593f9344e017227b6ae19ad653ab04ea6a3565fe4-23-28.png)

---

![23-29.png](https://pic.leetcode-cn.com/18432c5e6a0a9c30d6031226591fe6b2995f69779fd1e50bb121bc0a408750b8-23-29.png)

---

![23-30.png](https://pic.leetcode-cn.com/ce36ff10507e11076a9e83df1bedb111250b481f4d73ddbf96e9febcb8d3d089-23-30.png)

---

![23-31.png](https://pic.leetcode-cn.com/a170b5a59410c78e6bc171b3b2d89fab49f0a4efd7548972da3e33a2e88e05b4-23-31.png)

---

![23-32.png](https://pic.leetcode-cn.com/bf225f5b91ccf35fc769352fc45a82353bd8027bb5be3573a8892eefbb084b01-23-32.png)

---

![23-33.png](https://pic.leetcode-cn.com/fe779d1eaa4232eef21ade0dc3fdb8920bd6c4c945cc7dc7e271ec827c903d56-23-33.png)

---

![23-34.png](https://pic.leetcode-cn.com/320af131c6958f4c4dab69fa846b8b6113a4884880bff2002283eec6ed537260-23-34.png)

---

![23-35.png](https://pic.leetcode-cn.com/f6eca3984d6c347e7f541d1f4062cd540316d931081ce3dbb9efda3f8443963f-23-35.png)

---

![23-36.png](https://pic.leetcode-cn.com/f0f691a7a666fedf0adedac0a9d9fb987766e4f7c3b5c9359628e15ea5d434ad-23-36.png)

---

![23-37.png](https://pic.leetcode-cn.com/eccf6b0700619e60e950a18fffb5adf836924cb4a4cff29c4f856c701efe1729-23-37.png)

---

![23-38.png](https://pic.leetcode-cn.com/6fad48b641b82a3bf2f46551495a2c9b7ef807e6224a7f8464ce088c97f8c4a9-23-38.png)

---

![23-39.png](https://pic.leetcode-cn.com/a9e9e1ff327e8d6a5b9a42ba148559b79364eb33f6fd8475acc98dcf67c8d18e-23-39.png)

---

![23-40.png](https://pic.leetcode-cn.com/c928178eaa11afd5a953850a4922faabfe9a911a29994cd995dc56e055ebb374-23-40.png)

---

![23-41.png](https://pic.leetcode-cn.com/b4882c27f1368729e87701e8e38a08d07b7407db9ee28d1209fbc5d4cc042890-23-41.png)

@slideend

多路归并问题（「力扣」第 23 题）题解：[贪心算法、优先队列 + 分治法（Python 代码、Java 代码）](https://leetcode-cn.com/problems/merge-k-sorted-lists/solution/tan-xin-suan-fa-you-xian-dui-lie-fen-zhi-fa-python/)。

**参考代码**：

```Java []
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

public class Twitter {

    /**
     * 用户 id 和推文（单链表）的对应关系
     */
    private Map<Integer, Tweet> twitter;

    /**
     * 用户 id 和他关注的用户列表的对应关系
     */
    private Map<Integer, Set<Integer>> followings;

    /**
     * 全局使用的时间戳字段，用户每发布一条推文之前 + 1
     */
    private static int timestamp = 0;

    /**
     * 合并 k 组推文使用的数据结构（可以在方法里创建使用），声明成全局变量非必需，视个人情况使用
     */
    private static PriorityQueue<Tweet> maxHeap;

    /**
     * Initialize your data structure here.
     */
    public Twitter() {
        followings = new HashMap<>();
        twitter = new HashMap<>();
        maxHeap = new PriorityQueue<>((o1, o2) -> -o1.timestamp + o2.timestamp);
    }

    /**
     * Compose a new tweet.
     */
    public void postTweet(int userId, int tweetId) {
        timestamp++;
        if (twitter.containsKey(userId)) {
            Tweet oldHead = twitter.get(userId);
            Tweet newHead = new Tweet(tweetId, timestamp);
            newHead.next = oldHead;
            twitter.put(userId, newHead);
        } else {
            twitter.put(userId, new Tweet(tweetId, timestamp));
        }
    }

    /**
     * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
     */
    public List<Integer> getNewsFeed(int userId) {
        // 由于是全局使用的，使用之前需要清空
        maxHeap.clear();

        // 如果自己发了推文也要算上
        if (twitter.containsKey(userId)) {
            maxHeap.offer(twitter.get(userId));
        }

        Set<Integer> followingList = followings.get(userId);
        if (followingList != null && followingList.size() > 0) {
            for (Integer followingId : followingList) {
                Tweet tweet = twitter.get(followingId);
                if (tweet != null) {
                    maxHeap.offer(tweet);
                }
            }
        }

        List<Integer> res = new ArrayList<>(10);
        int count = 0;
        while (!maxHeap.isEmpty() && count < 10) {
            Tweet head = maxHeap.poll();
            res.add(head.id);

            // 这里最好的操作应该是 replace，但是 Java 没有提供
            if (head.next != null) {
                maxHeap.offer(head.next);
            }
            count++;
        }
        return res;
    }


    /**
     * Follower follows a followee. If the operation is invalid, it should be a no-op.
     *
     * @param followerId 发起关注者 id
     * @param followeeId 被关注者 id
     */
    public void follow(int followerId, int followeeId) {
        // 被关注人不能是自己
        if (followeeId == followerId) {
            return;
        }

        // 获取我自己的关注列表
        Set<Integer> followingList = followings.get(followerId);
        if (followingList == null) {
            Set<Integer> init = new HashSet<>();
            init.add(followeeId);
            followings.put(followerId, init);
        } else {
            if (followingList.contains(followeeId)) {
                return;
            }
            followingList.add(followeeId);
        }
    }


    /**
     * Follower unfollows a followee. If the operation is invalid, it should be a no-op.
     *
     * @param followerId 发起取消关注的人的 id
     * @param followeeId 被取消关注的人的 id
     */
    public void unfollow(int followerId, int followeeId) {
        if (followeeId == followerId) {
            return;
        }

        // 获取我自己的关注列表
        Set<Integer> followingList = followings.get(followerId);

        if (followingList == null) {
            return;
        }
        // 这里删除之前无需做判断，因为查找是否存在以后，就可以删除，反正删除之前都要查找
        followingList.remove(followeeId);
    }

    /**
     * 推文类，是一个单链表（结点视角）
     */
    private class Tweet {
        /**
         * 推文 id
         */
        private int id;

        /**
         * 发推文的时间戳
         */
        private int timestamp;
        private Tweet next;

        public Tweet(int id, int timestamp) {
            this.id = id;
            this.timestamp = timestamp;
        }
    }

    public static void main(String[] args) {

        Twitter twitter = new Twitter();
        twitter.postTweet(1, 1);
        List<Integer> res1 = twitter.getNewsFeed(1);
        System.out.println(res1);

        twitter.follow(2, 1);

        List<Integer> res2 = twitter.getNewsFeed(2);
        System.out.println(res2);

        twitter.unfollow(2, 1);

        List<Integer> res3 = twitter.getNewsFeed(2);
        System.out.println(res3);
    }
}
```
