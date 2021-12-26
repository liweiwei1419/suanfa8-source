---
ID: 480
TITLE: 滑动窗口中位数
TAG: C++, Java, Python, 设计, 堆（优先队列）
---



本题和 [295. 数据流的中位数](https://leetcode-cn.com/problems/find-median-from-data-stream/) 非常相似，唯一区别是本题中的滑动窗口在向右移动时，会导致一些数被移出滑动窗口。可以使用哈希表来标记所有被移除的无效元素，如果某个堆的堆顶是一个无效元素，我们才会把它删除。下面给出了我们的算法：

只要两个堆是平衡的，我们仍然可以从堆顶得到中位数。



我们维护两个堆：

- 一个大根堆 `lo`，用来存放较小的那一半的元素；

- 一个小根堆 `hi`，用来存放较大的那一半的元素。



使用哈希集合（HashSet）或者哈希映射（HashMap），记为 `hash_table`，标记所有被移除的无效元素，哈希表的大小等于在堆中无效元素的数量；



大根堆 `lo` 最多允许比小根堆 `hi` 存放多一个元素，当我们已经处理了 `k` 个元素时：

- 如果 `k = 2n + 1` 为奇数，那么 `lo` 中存储 `k + 1` 个元素，`hi` 中存储 `k` 个元素；
- 如果 `k = 2n` 为偶数，那么 `lo` 和 `hi` 中都存储 `k` 个元素；





根据这样的性质，我们就可以从堆顶元素得到中位数。

注意：当我们考虑堆中的元素个数时，我们指的是堆中有效的元素个数，无效的元素并不会被计入，它们只是暂时地被存放在堆中；



使用变量 `balance` 表示两个堆是否平衡：

- 如果 `balance == 0`，那么两个堆平衡；

- 如果 `balance < 0`，那么 `lo` 中的元素较少，需要从 `hi` 中取出若干个元素放入 `lo`；

- 如果 `balance > 0`，那么 `hi` 中的元素较少，需要从 `lo` 中取出若干个元素放入 `hi`。





- 此时我们需要插入一个新的元素 `in_num`：

  - 如果 `in_num` 小于等于 `lo` 的堆顶元素，那么它可以被放入 `lo` 中，此时需要增加 `balance` 的值；

  - 否则，`in_num` 可以被放入 `hi` 中，此时需要减少 `balance` 的值。

- 延迟删除被移出窗口的元素 `out_num`：

  - 如果 `out_num` 在 `lo` 中，那么需要减少 `balance` 的值；

  - 如果 `out_num` 在 `hi` 中，那么需要增加 `balance` 的值；

  - 我们将 `out_num` 放入哈希表中；

  - **每当无效的元素出现在堆顶，我们就将其从堆中删除，同时从哈希表中删除。**



`delay` 有删除标记的意思。







```C++ [sol1]
vector<double> medianSlidingWindow(vector<int>& nums, int k)
{
    vector<double> medians;
    unordered_map<int, int> hash_table;
    priority_queue<int> lo;                                 // max heap
    priority_queue<int, vector<int>, greater<int> > hi;     // min heap

    int i = 0;      // index of current incoming element being processed

    // initialize the heaps
    while (i < k)
        lo.push(nums[i++]);
    for (int j = 0; j < k / 2; j++) {
        hi.push(lo.top());
        lo.pop();
    }

    while (true) {
        // get median of current window
        medians.push_back(k & 1 ? lo.top() : ((double)lo.top() + (double)hi.top()) * 0.5);

        if (i >= nums.size())
            break;                          // break if all elements processed

        int out_num = nums[i - k],          // outgoing element
            in_num = nums[i++],             // incoming element
            balance = 0;                    // balance factor

        // number `out_num` exits window
        balance += (out_num <= lo.top() ? -1 : 1);
        hash_table[out_num]++;

        // number `in_num` enters window
        if (!lo.empty() && in_num <= lo.top()) {
            balance++;
            lo.push(in_num);
        }
        else {
            balance--;
            hi.push(in_num);
        }

        // re-balance heaps
        if (balance < 0) {                  // `lo` needs more valid elements
            lo.push(hi.top());
            hi.pop();
            balance++;
        }
        if (balance > 0) {                  // `hi` needs more valid elements
            hi.push(lo.top());
            lo.pop();
            balance--;
        }

        // remove invalid numbers that should be discarded from heap tops
        while (hash_table[lo.top()]) {
            hash_table[lo.top()]--;
            lo.pop();
        }
        while (!hi.empty() && hash_table[hi.top()]) {
            hash_table[hi.top()]--;
            hi.pop();
        }
    }

    return medians;
}
```

**复杂度分析**

* 时间复杂度：$O(N \log k)$，其中 $N$ 是数组的长度。

* 空间复杂度：$O(N)$。

#### 方法二：多重集合 + 迭代器

这种方法基于特定的语言，即 C++ 中的 `multiset`（多重集合）数据结构。

我们使用一个多重集合和一个迭代器（iterator），其中迭代器指向集合中的中位数。当我们添加或删除元素时，我们修改迭代器的指向，保证其仍然指向中位数。下面给出了我们的算法：

- 我们维护多重集合 `window` 的迭代器 `mid`；

- 首先我们在 `window` 中加入前 `k` 个元素，并让 `mid` 指向 `window` 中的第 $\lfloor k/2 \rfloor$ 个元素（从 `0` 开始计数）；

- 当我们在 `window` 中加入数 `num` 时：

    - 如果 `num < *mid`，那么我们需要将 `mid` 往前移；

    - 如果 `num >= mid`，我们不需要对 `mid` 进行任何操作。

- 当我们在 `windows` 中删除数 `num` 时：

    - 如果 `num < *mid`，我们需要将 `mid` 先往后移，再删除 `num`；

    - 如果 `num > *mid`，我们不需要对 `mid` 进行任何操作；

    - 如果 `num == *mid`，我们需要找到 `num` 第一次出现的位置对应的迭代器（使用 `lower_bound()`）并删除，而不是删除 `mid` 对应的数。随后和 `num < *mid` 的处理方式相同。

```C++ [sol2]
vector<double> medianSlidingWindow(vector<int>& nums, int k)
{
    vector<double> medians;
    multiset<int> window(nums.begin(), nums.begin() + k);

    auto mid = next(window.begin(), k / 2);

    for (int i = k;; i++) {

        // Push the current median
        medians.push_back(((double)(*mid) + *next(mid, k % 2 - 1)) * 0.5);

        // If all done, break
        if (i == nums.size())
            break;

        // Insert incoming element
        window.insert(nums[i]);
        if (nums[i] < *mid)
            mid--;                  // same as mid = prev(mid)

        // Remove outgoing element
        if (nums[i - k] <= *mid)
            mid++;                  // same as mid = next(mid)

        window.erase(window.lower_bound(nums[i - k]));
    }

    return medians;
}
```

**复杂度分析**

* 时间复杂度：$O(N \log k)$，其中 $N$ 是数组的长度。

* 空间复杂度：$O(N)$。







markdown 语法：



$\texttt{insert(num)}$：将一个数 $\textit{num}$ 加入数据结构；





如果当前需要维护的元素个数为 $x$，那么 $\textit{small}$ 中维护了 $\lceil \frac{x}{2} \rceil$ 个元素，$\textit{large}$ 中维护了 $\lfloor \frac{x}{2} \rfloor$ 个元素，其中 $\lceil y \rceil$ 和 $\lfloor y \rfloor$ 分别表示将 $y$ 向上取整和向下取整。也就是说：

> $\textit{small}$ 中的元素个数要么与 $\textit{large}$ 中的元素个数相同，要么比 $\textit{large}$ 中的元素个数恰好多 $1$ 个。



#### 方法一：双优先队列 + 延迟删除

**思路与算法**

而对于 $\texttt{insert(num)}$ 而言，如果当前两个优先队列都为空，那么根据元素个数的要求，我们必须将这个元素加入 $\textit{small}$；如果 $\textit{small}$ 非空（显然不会存在 $\textit{small}$ 空而 $\textit{large}$ 非空的情况），我们就可以将 $\textit{num}$ 与 $\textit{small}$ 的堆顶元素 $\textit{top}$ 比较：

- 如果 $\textit{num} \leq \textit{top}$，我们就将其加入 $\textit{small}$ 中；

- 如果 $\textit{num} > \textit{top}$，我们就将其加入 $\textit{large}$ 中。

在成功地加入元素 $\textit{num}$ 之后，两个优先队列的元素个数可能会变得不符合要求。由于我们只加入了一个元素，那么不符合要求的情况只能是下面的二者之一：

- $\textit{small}$ 比 $\textit{large}$ 的元素个数多了 $2$ 个；

- $\textit{small}$ 比 $\textit{large}$ 的元素个数少了 $1$ 个。

对于第一种情况，我们将 $\textit{small}$ 的堆顶元素放入 $\textit{large}$；对于第二种情况，我们将 $\textit{large}$ 的堆顶元素放入 $\textit{small}$，这样就可以解决问题了，$\texttt{insert(num)}$ 也就设计完成了。

---

然而对于 $\texttt{erase(num)}$ 而言，设计起来就不是那么容易了，因为我们知道，**优先队列是不支持移出非堆顶元素**这一操作的，因此我们可以考虑使用「延迟删除」的技巧，即：

# 重点在这里

> 当我们需要移出优先队列中的某个元素时，我们只将这个删除操作「记录」下来，而不去真的删除这个元素。当这个元素出现在 $\textit{small}$ 或者 $\textit{large}$ 的堆顶时，我们再去将其移出对应的优先队列。

「延迟删除」使用到的辅助数据结构一般为哈希映射 $\textit{delayed}$，其中的每个键值对 $(\textit{num}, \textit{freq})$，表示元素 $\textit{num}$ 还需要被删除 $\textit{freq}$ 次。「优先队列 + 延迟删除」有非常多种设计方式，体现在「延迟删除」的时机选择。在本题解中，我们使用一种比较容易编写代码的设计方式，即：

> 我们保证在任意操作 $\texttt{insert(num)}$，$\texttt{erase(num)}$，$\texttt{getMedian()}$ 完成之后（或者说任意操作开始之前），$\textit{small}$ 和 $\textit{large}$ 的堆顶元素都是不需要被「延迟删除」的。这样设计的好处在于：我们无需更改 $\texttt{getMedian()}$ 的设计，只需要略加修改 $\texttt{insert(num)}$ 即可。

我们首先设计一个辅助函数 $\texttt{prune(heap)}$，它的作用很简单，就是对 $\textit{heap}$ 这个优先队列（$\textit{small}$ 或者 $\textit{large}$ 之一），不断地弹出其需要被删除的堆顶元素，并且减少 $\textit{delayed}$ 中对应项的值。在 $\texttt{prune(heap)}$ 完成之后，我们就可以保证 **$\textit{heap}$ 的堆顶元素是不需要被「延迟删除」的**。

这样我们就可以在 $\texttt{prune(heap)}$ 的基础上设计另一个辅助函数 $\texttt{makeBalance()}$，它的作用即为调整 $\textit{small}$ 和 $\textit{large}$ 中的元素个数，使得二者的元素个数满足要求。由于有了 $\texttt{erase(num)}$ 以及「延迟删除」，我们在将一个优先队列的堆顶元素放入另一个优先队列时，第一个优先队列的堆顶元素可能是需要删除的。因此我们就可以用 $\texttt{makeBalance()}$ 将 $\texttt{prune(heap)}$ 封装起来，它的逻辑如下：

- 如果 $\textit{small}$ 和 $\textit{large}$ 中的元素个数满足要求，则不进行任何操作；

- 如果 $\textit{small}$ 比 $\textit{large}$ 的元素个数多了 $2$ 个，那么我们我们将 $\textit{small}$ 的堆顶元素放入 $\textit{large}$。此时 $\textit{small}$ 的对应元素可能是需要删除的，因此我们调用 $\texttt{prune(small)}$；

- 如果 $\textit{small}$ 比 $\textit{large}$ 的元素个数少了 $1$ 个，那么我们将 $\textit{large}$ 的堆顶元素放入 $\textit{small}$。此时 $\textit{large}$ 的对应的元素可能是需要删除的，因此我们调用 $\texttt{prune(large)}$。

此时，我们只需要在原先 $\texttt{insert(num)}$ 的设计的最后加上一步 $\texttt{makeBalance()}$ 即可。然而对于 $\texttt{erase(num)}$，我们还是需要进行一些思考的：

- 如果 $\textit{num}$ 与 $\textit{small}$ 和 $\textit{large}$ 的堆顶元素都不相同，那么 $\textit{num}$ 是需要被「延迟删除」的，我们将其在哈希映射中的值增加 $1$；

- 否则，例如 $\textit{num}$ 与 $\textit{small}$ 的堆顶元素相同，那么该元素是可以理解被删除的。虽然我们没有实现「立即删除」这个辅助函数，但只要我们将 $\textit{num}$ 在哈希映射中的值增加 $1$，并且调用「延迟删除」的辅助函数 $\texttt{prune(small)}$，那么就相当于实现了「立即删除」的功能。

无论是「立即删除」还是「延迟删除」，其中一个优先队列中的元素个数发生了变化（减少了 $1$），因此我们还需要用 $\texttt{makeBalance()}$ 调整元素的个数。

此时，所有的接口都已经设计完成了。由于 $\texttt{insert(num)}$ 和 $\texttt{erase(num)}$ 的最后一步都是 $\texttt{makeBalance()}$，而 $\texttt{makeBalance()}$ 的最后一步是 $\texttt{prune(heap)}$，因此我们就保证了任意操作完成之后，$\textit{small}$ 和 $\textit{large}$ 的堆顶元素都是不需要被「延迟删除」的。

具体的实现很难完全叙述清楚，读者可以参考下面的代码和注释进一步理解。










**代码**

```C++ [sol1-C++]
class DualHeap {
private:
    // 大根堆，维护较小的一半元素
    priority_queue<int> small;
    // 小根堆，维护较大的一半元素
    priority_queue<int, vector<int>, greater<int>> large;
    // 哈希映射，记录「延迟删除」的元素，key 为元素，value 为需要删除的次数
    unordered_map<int, int> delayed;

    int k;
    // small 和 large 当前包含的元素个数，需要扣除被「延迟删除」的元素
    int smallSize, largeSize;

public:
    DualHeap(int _k): k(_k), smallSize(0), largeSize(0) {}

private:
    // 不断地弹出 heap 的堆顶元素，并且更新哈希映射
    template<typename T>
    void prune(T& heap) {
        while (!heap.empty()) {
            int num = heap.top();
            if (delayed.count(num)) {
                --delayed[num];
                if (!delayed[num]) {
                    delayed.erase(num);
                }
                heap.pop();
            }
            else {
                break;
            }
        }
    }

    // 调整 small 和 large 中的元素个数，使得二者的元素个数满足要求
    void makeBalance() {
        if (smallSize > largeSize + 1) {
            // small 比 large 元素多 2 个
            large.push(small.top());
            small.pop();
            --smallSize;
            ++largeSize;
            // small 堆顶元素被移除，需要进行 prune
            prune(small);
        }
        else if (smallSize < largeSize) {
            // large 比 small 元素多 1 个
            small.push(large.top());
            large.pop();
            ++smallSize;
            --largeSize;
            // large 堆顶元素被移除，需要进行 prune
            prune(large);
        }
    }

public:
    void insert(int num) {
        if (small.empty() || num <= small.top()) {
            small.push(num);
            ++smallSize;
        }
        else {
            large.push(num);
            ++largeSize;
        }
        makeBalance();
    }

    void erase(int num) {
        ++delayed[num];
        if (num <= small.top()) {
            --smallSize;
            if (num == small.top()) {
                prune(small);
            }
        }
        else {
            --largeSize;
            if (num == large.top()) {
                prune(large);
            }
        }
        makeBalance();
    }

    double getMedian() {
        return k & 1 ? small.top() : ((double)small.top() + large.top()) / 2;
    }
};

class Solution {
public:
    vector<double> medianSlidingWindow(vector<int>& nums, int k) {
        DualHeap dh(k);
        for (int i = 0; i < k; ++i) {
            dh.insert(nums[i]);
        }
        vector<double> ans = {dh.getMedian()};
        for (int i = k; i < nums.size(); ++i) {
            dh.insert(nums[i]);
            dh.erase(nums[i - k]);
            ans.push_back(dh.getMedian());
        }
        return ans;
    }
};
```

```Java [sol1-Java]

```

```Python [sol1-Python3]
class DualHeap:
    def __init__(self, k: int):
        # 大根堆，维护较小的一半元素，注意 python 没有大根堆，需要将所有元素取相反数并使用小根堆
        self.small = list()
        # 小根堆，维护较大的一半元素
        self.large = list()
        # 哈希映射，记录「延迟删除」的元素，key 为元素，value 为需要删除的次数
        self.delayed = collections.Counter()

        self.k = k
        # small 和 large 当前包含的元素个数，需要扣除被「延迟删除」的元素
        self.smallSize = 0
        self.largeSize = 0


    # 不断地弹出 heap 的堆顶元素，并且更新哈希映射
    def prune(self, heap: List[int]):
        while heap:
            num = heap[0]
            if heap is self.small:
                num = -num
            if num in self.delayed:
                self.delayed[num] -= 1
                if self.delayed[num] == 0:
                    self.delayed.pop(num)
                heapq.heappop(heap)
            else:
                break
    
    # 调整 small 和 large 中的元素个数，使得二者的元素个数满足要求
    def makeBalance(self):
        if self.smallSize > self.largeSize + 1:
            # small 比 large 元素多 2 个
            heapq.heappush(self.large, -self.small[0])
            heapq.heappop(self.small)
            self.smallSize -= 1
            self.largeSize += 1
            # small 堆顶元素被移除，需要进行 prune
            self.prune(self.small)
        elif self.smallSize < self.largeSize:
            # large 比 small 元素多 1 个
            heapq.heappush(self.small, -self.large[0])
            heapq.heappop(self.large)
            self.smallSize += 1
            self.largeSize -= 1
            # large 堆顶元素被移除，需要进行 prune
            self.prune(self.large)

    def insert(self, num: int):
        if not self.small or num <= -self.small[0]:
            heapq.heappush(self.small, -num)
            self.smallSize += 1
        else:
            heapq.heappush(self.large, num)
            self.largeSize += 1
        self.makeBalance()

    def erase(self, num: int):
        self.delayed[num] += 1
        if num <= -self.small[0]:
            self.smallSize -= 1
            if num == -self.small[0]:
                self.prune(self.small)
        else:
            self.largeSize -= 1
            if num == self.large[0]:
                self.prune(self.large)
        self.makeBalance()

    def getMedian(self) -> float:
        return float(-self.small[0]) if self.k % 2 == 1 else (-self.small[0] + self.large[0]) / 2


class Solution:
    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:
        dh = DualHeap(k)
        for num in nums[:k]:
            dh.insert(num)
        
        ans = [dh.getMedian()]
        for i in range(k, len(nums)):
            dh.insert(nums[i])
            dh.erase(nums[i - k])
            ans.append(dh.getMedian())
        
        return ans
```

**复杂度分析**

由于「延迟删除」的存在，$\textit{small}$ 比 $\textit{large}$ 在最坏情况下可能包含所有的 $n$ 个元素，即没有一个元素被真正删除了。因此优先队列的大小是 $O(n)$ 而不是 $O(k)$ 的，其中 $n$ 是数组 $\textit{nums}$ 的长度。

- 时间复杂度：$O(n\log n)$。$\texttt{insert(num)}$ 和 $\texttt{erase(num)}$ 的单次时间复杂度为 $O(\log n)$，$\texttt{getMedian()}$ 的单次时间复杂度为 $O(1)$。因此总时间复杂度为 $O(n\log n)$。

- 空间复杂度：$O(n)$。即为 $\textit{small}$，$\textit{large}$ 和 $\textit{delayed}$ 需要使用的空间。

#### 结语

读者可以尝试回答如下的两个问题来检验自己是否掌握了该方法：

- 在 $\texttt{insert(num)}$ 的最后我们加上了一步 $\texttt{makeBalance()}$，其中包括可能进行的 $\texttt{prune(heap)}$ 操作，这对于 $\texttt{insert(num)}$ 操作而言是否是必要的？

- 在 $\texttt{insert(num)}$ 的过程中，如果我们将 $\texttt{insert(num)}$ 放入了 $\textit{large}$ 中，并且 $\textit{num}$ 恰好出现在 $\textit{large}$ 的堆顶位置，且两个优先队列的元素个数满足要求，不需要进行调整。此时会不会出现 $\textit{num}$ 是一个需要被「延迟删除」的元素的情况，这样就不满足在 $\texttt{insert(num)}$ 操作完成之后 $\textit{large}$ 的堆顶是不需要被「延迟删除」的要求了？

**答案**

- 实际上是不必要的。因为在 $\texttt{insert(num)}$ 操作之前，两个优先队列的堆顶元素都是不需要被删除的，而我们**只可能从那个被加入了一个元素的优先队列的堆顶元素放入另一个优先队列中**，因此两个优先队列的堆顶元素仍然都是不需要被删除的。这样写只是为了将 $\texttt{insert(num)}$ 和 $\texttt{erase(num)}$ 操作统一起来，减少代码的冗余。

- 不可能会出现这种情况，假设出现了这种情况，那么 $\textit{num}$ 显然不会等于 $\textit{large}$ 原先的堆顶元素，因为 $\textit{large}$ 原先的堆顶元素一定是不需要被删除的。那么 $\textit{num}$ 满足：

    $$
    \textit{small} ~的堆顶元素 < \textit{num} < \textit{large} ~的堆顶元素
    $$

    由于 $\textit{small}$ 是大根堆，$\textit{large}$ 是小根堆，因此**根本就不存在与 $\textit{num}$ 值相同的元素**，也就不可能会被延迟删除了。
