# 关于 while (left <= right) 写法返回值的详细讨论

二分查找在通常的资料里会介绍几种模板的写法，但我并不推荐通过模板学习算法的方式。我相信写算法没有那么模板，设计算法的人一定是通过了深入的思考，才设计出一个个精妙的算法和数据结构。

请大家一定不要去记忆所谓的二分查找模板，一题一个模板，相当于没有模板。

# 二分查找的三种写法

二分查找通常有以下几种写法，区别主要在于 `while` 里面，


| 形式                   | 结论与建议 |
| ---------------------- | ---- |
| `while (left <= right)` | 简单问题用，在循环体里能找到答案以后退出。 |
| `while (left < right)` | 复杂问题用，把答案留到退出循环以后，再判断。是解决二分问题的利器，尤其在边界问题用，这种方式考虑细节最少，但是需要一定练习才能灵活运用。 |
| `while (left + 1 < right)` | 不建议，本质上和 `while (left <= right)` 写法一样，盲目套这个所谓的最无脑模板，反而学不会二分。 |


其实理解这三种写法并不难。关键在于掌握：**退出循环的时候，`left` 和 `right` 的位置关系**。只需要掌握一种写法就可以了。

# LeetCode 第 34 题采用 `while(left <= right)` 

本篇题解采用 `while(left <= right)` 这种二分查找的写法，并分析如何在循环体里设置 `left` 和 `right`，和应该返回 `left` 和 `right`，即怎样思考边界问题。**只要逻辑是完备，并且足够细心，写对二分查找问题并不困难**。



## 第 1 部分：查找 target 出现的第 1 个位置

二分查找的基本用法是在一个有序数组里查找目标元素，具体是看区间中间元素的值 `nums[mid]` 与 `target` 的大小关系。

+ 如果等于，就可以直接返回；
+ 如果严格大于，就往右边查找；
+ 如果严格小于，就往左边查找。

**就这 $3$ 种情况**，先判断等于，然后再判断大于还是小于，符合人们正常的思维。


具体到当前「力扣」第 34 题，由于一个元素出现多次，在具体分类讨论的时候，就有一点细微差别。

（如果嫌下面文字多，可以直接看代码，都有注释。）
+ 如果当前看到的元素 **恰好等于**  `target`，那么当前元素有可能是 `target` 出现的第 $1$ 个位置，由于我们要找第 $1$ 个位置，此时我们应该向左边继续查找；
+ 如果当前看到的元素 **严格大于**  `target`，那么当前元素一定不是要找的 `target` 出现的第 $1$ 个位置，第 $1$ 个位置肯定出现在 `mid` 的 **左边** ，因此就需要在 `[left, mid]` 区间里继续查找；
+ 如果当前看到的元素 **严格小于** `target`，那么当前元素一定不是要找的 `target` 出现的第 $1$ 个位置，第 $1$ 个位置肯定出现在 `mid` 的 **右边** ，因此就需要在 `[mid + 1, right]` 区间里继续查找。

代码 1：

```Java []
private int findFirstPosition(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            // ① 不可以直接返回，应该继续向左边找，即 [left..mid - 1] 区间里找
            right = mid - 1;
        } else if (nums[mid] < target) {
            // 应该继续向右边找，即 [mid + 1, right] 区间里找
            left = mid + 1;
        } else {
            // 此时 nums[mid] > target，应该继续向左边找，即 [left..mid - 1] 区间里找
            right = mid - 1;
        }
    }

    // 此时 left 和 right 的位置关系是 [right, left]，注意上面的 ①，此时 left 才是第 1 次元素出现的位置
    // 因此还需要特别做一次判断
    if (left != nums.length && nums[left] == target) {
        return left;
    }
    return -1;
}
```

**解释**：
+ 第 $1$ 次出现的位置和最后 $1$ 次出现的位置肯定都在数组里。因此，初始化的时候 `left = 0` 、 `right = nums.length - 1`；
+ `nums[mid] == target` 的时候，在 `[left, mid - 1]` 区间里找，有没有可能 `nums[mid]` 就是第 $1$ 次出现的位置，有可能，但不要紧，退出循环的时候 `right` 指针在左，`left` 在右。**如果数组里存在 `target`，那么 `left` 一定位于 `target` 出现的第 $1$ 个位置**，请看下图。

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gu5k1t70nvj61iw0lsdhj02.jpg)

还有一种特殊情况，当要查找的目标元素不存在的时，分两种情况：（1）target 很大，（2）target 很小：

+ target 很大，还是上面的例子

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gu5k1u19kmj61mg0lgtau02.jpg)

+ `target` 很小，还是上面的例子

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gu5k1ukdpuj61ky0lsmz402.jpg)

以上特殊例子，解释了为什么在 `while (left <= right)` 退出循环以后，需要单独判断 `left` 是否越界，以及判断 `nums[left]` 是不是目标元素的原因。


## 第 2 部分：查找 target 出现的最后 1 个位置

可以直接看注释。

代码 2：

```Java []
private int findLastPosition(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            // 只有这里不一样：不可以直接返回，应该继续向右边找，即 [mid + 1, right] 区间里找
            left = mid + 1;
        } else if (nums[mid] < target) {
            // 应该继续向右边找，即 [mid + 1, right] 区间里找
            left = mid + 1;
        } else {
            // 此时 nums[mid] > target，应该继续向左边找，即 [left, mid - 1] 区间里找
            right = mid - 1;
        }
    }
    // 由于 findFirstPosition 方法可以返回是否找到，这里无需单独再做判断
    return right;
}
```

为什么返回 `right` 解释如下图：

![image.png](https://tva1.sinaimg.cn/large/008i3skNgy1gu5k1wukvbj61jo0l2q4n02.jpg)

这里**注意**：**无需讨论不存在的情况**。这是因为先执行了 `findFirstPosition()` 方法，这个方法如果返回 $-1$，显然我们就知道数组里不存在目标元素，可以直接返回 `[-1, -1]`。

接下来，我们补上主调方法：

代码 3：

```Java []
public int[] searchRange(int[] nums, int target) {
    if (nums.length == 0) {
        return new int[]{-1, -1};
    }
    int firstPosition = findFirstPosition(nums, target);
    // 如果第 1 次出现的位置都找不到，肯定不存在最后 1 次出现的位置
    if (firstPosition == -1) {
        return new int[]{-1, -1};
    }
    int lastPosition = findLastPosition(nums, target);
    return new int[]{firstPosition, lastPosition};
}
```

---

完整代码如下：

## 完整代码 1（其实就是把上面的三个代码拼凑出来）

代码 4：

```Java []
public class Solution {

    public int[] searchRange(int[] nums, int target) {
        if (nums.length == 0) {
            return new int[]{-1, -1};
        }
        int firstPosition = findFirstPosition(nums, target);
        if (firstPosition == -1) {
            return new int[]{-1, -1};
        }
        int lastPosition = findLastPosition(nums, target);
        return new int[]{firstPosition, lastPosition};
    }


    private int findFirstPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                // ① 不可以直接返回，应该继续向左边找，即 [left, mid - 1] 区间里找
                right = mid - 1;
            } else if (nums[mid] < target) {
                // 应该继续向右边找，即 [mid + 1, right] 区间里找
                left = mid + 1;
            } else {
                // 此时 nums[mid] > target，应该继续向左边找，即 [left, mid - 1] 区间里找
                right = mid - 1;
            }
        }

        // 此时 left 和 right 的位置关系是 [right, left]，注意上面的 ①，此时 left 才是第 1 次元素出现的位置
        // 因此还需要特别做一次判断
        if (left != nums.length && nums[left] == target) {
            return left;
        }
        return -1;
    }

    private int findLastPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                // 只有这里不一样：不可以直接返回，应该继续向右边找，即 [mid + 1, right] 区间里找
                left = mid + 1;
            } else if (nums[mid] < target) {
                // 应该继续向右边找，即 [mid + 1, right] 区间里找
                left = mid + 1;
            } else {
                // 此时 nums[mid] > target，应该继续向左边找，即 [left, mid - 1] 区间里找
                right = mid - 1;
            }
        }
        // 由于 findFirstPosition 方法可以返回是否找到，这里无需单独再做判断
        return right;
    }
}
```
```C++ []
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int> &nums, int target) {
        if (nums.empty()) {
            return vector<int>{-1, -1};
        }

        int firstPosition = findFirstPosition(nums, target);
        // 如果第 1 次出现的位置都找不到，肯定不存在最后 1 次出现的位置
        if (firstPosition == -1) {
            return vector<int>{-1, -1};
        }
        int lastPosition = findLastPosition(nums, target);
        return vector<int>{firstPosition, lastPosition};
    }

private:
    int findFirstPosition(vector<int> &nums, int target) {
        int left = 0;
        int right = nums.size() - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                // ① 不可以直接返回，应该继续向左边找，即 [left, mid - 1] 区间里找
                right = mid - 1;
            } else if (nums[mid] < target) {
                // 应该继续向右边找，即 [mid + 1, right] 区间里找
                left = mid + 1;
            } else {
                // 此时 nums[mid] > target，应该继续向左边找，即 [left, mid - 1] 区间里找
                right = mid - 1;
            }
        }

        // 此时 left 和 right 的位置关系是 [right, left]，注意上面的 ①，此时 left 才是第 1 次元素出现的位置
        // 因此还需要特别做一次判断
        if (left != nums.size() && nums[left] == target) {
            return left;
        }
        return -1;
    }

    int findLastPosition(vector<int> &nums, int target) {
        int left = 0;
        int right = nums.size() - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                // 只有这里不一样：不可以直接返回，应该继续向右边找，即 [mid + 1, right] 区间里找
                left = mid + 1;
            } else if (nums[mid] < target) {
                // 应该继续向右边找，即 [mid + 1, right] 区间里找
                left = mid + 1;
            } else {
                // 此时 nums[mid] > target，应该继续向左边找，即 [left, mid - 1] 区间里找
                right = mid - 1;
            }
        }
        // 由于 findFirstPosition 方法可以返回是否找到，这里无需单独再做判断
        return right;
    }
};
```

## 完整代码 2

应评论区网友要求，写了一个不利用 `findFirstPosition()` 结果的版本，**和「完整代码 1」没有本质上的区别**。

不利用 `findFirstPosition()` 的结果写 `findLastPosition()`。这里要注意，`findLastPosition()` 的逻辑当 `left == right` 的之后再执行下去，看 `findLastPosition()` 里面的逻辑，找到相等以后 `left = mid + 1;` 所以 `left` 右移一位，退出循环以后 `right` 在左，`left` 在右。因此 `right` 才是 `target` 最后一次出现的位置。但是要注意分支逻辑中有 `right = mid - 1;`，因此 `right` 有可能等于 `-1` 。所以退出循环以后要判断的逻辑是：

```Java []
if (right != -1 && nums[right] == target) {
    return right;
}
```

完整代码如下：

代码 5：

```Java []
import java.util.Arrays;

public class Solution {

    public int[] searchRange(int[] nums, int target) {
        if (nums.length == 0) {
            return new int[]{-1, -1};
        }
        int firstPosition = findFirstPosition(nums, target);
        int lastPosition = findLastPosition(nums, target);
        return new int[]{firstPosition, lastPosition};
    }


    private int findFirstPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                // ① 不可以直接返回，应该继续向左边找，即 [left, mid - 1] 区间里找
                right = mid - 1;
            } else if (nums[mid] < target) {
                // 应该继续向右边找，即 [mid + 1, right] 区间里找
                left = mid + 1;
            } else {
                // 此时 nums[mid] > target，应该继续向左边找，即 [left, mid - 1] 区间里找
                right = mid - 1;
            }
        }

        // 此时 left 和 right 的位置关系是 [right, left]，注意上面的 ①，此时 left 才是第 1 次元素出现的位置
        // 因此还需要特别做一次判断
        if (left != nums.length && nums[left] == target) {
            return left;
        }
        return -1;
    }


    private int findLastPosition(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                // 只有这里不一样：不可以直接返回，应该继续向右边找，即 [mid + 1, right] 区间里找
                left = mid + 1;
            } else if (nums[mid] < target) {
                // 应该继续向右边找，即 [mid + 1, right] 区间里找
                left = mid + 1;
            } else {
                // 此时 nums[mid] > target，应该继续向左边找，即 [left, mid - 1] 区间里找
                right = mid - 1;
            }
        }

        if (right != -1 && nums[right] == target) {
            return right;
        }
        return -1;
    }
}
```

# `while(left < right)` 写法的好处在于退出循环的时候 `left` 与 `right` 的重合

至于 `while(left < right)` 的写法，建议大家参考本题的 [题解](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/solution/si-lu-hen-jian-dan-xi-jie-fei-mo-gui-de-er-fen-cha/) 和第 35 题 [高赞题解](https://leetcode-cn.com/problems/search-insert-position/solution/te-bie-hao-yong-de-er-fen-cha-fa-fa-mo-ban-python-/)，我平常也多用 `while(left < right)` 的写法去思考复杂问题，确实可以少考虑很多细节，把思考的精力用于求解问题上。

# `while(left <= right)` 与 `while(left < right)` 写法的区别


这一部分也来自评论区网友的提问，我的理解如下：

首先抓住它们最主要的特征：

+ `while(left <= right)` 在退出循环的时候 `left = right + 1`，即 `right` 在左，`left` 在右；
+ `while(left < right)` 在退出循环的时候，有 `left == right` 成立。

我的经验是 `left <= right` 用在简单的二分问题中，如果题目要我们找的数的性质很简单，可以用这种写法，**在循环体里找到了就退出**。

在一些复杂问题中，例如找一些边界的值（就比如当前这个问题），用 `while(left < right)` 其实是更简单的，**把要找的数留到最后，在退出循环以后做判断**。我觉得最重要的原因是退出循环以后有 `left == right` 成立，这种思考问题的方式不容易出错。

`while(left < right)` 写法难点在于理解：初学的时候很难理解出现死循环的原因。特别是很难理解分支的取法决定中间数的取法。不过通过练习和调试，把这一关过了，相信解决一些难度较大的额额分查找问题就相对容易了。建议大家尝试使用 `while(left < right)` 的方式去解决一些较困难的问题。

# `while (left + 1 < right)` 的写法

一些资料上号称这是最无脑的写法，但是我有一些不同的意见：

+ 首先 `while (left + 1 < right)` 这种写法就很奇怪；
+ 其次，这种写法在设置边界的时候屏蔽了细节，全部写成 `left = mid` 和 `right = mid`，没有加 1 减 1，这一点虽然号称是优点，但我觉得是缺点，加 1 减 1 完全可以分析出来，屏蔽这个细节不能算是优点；
+ 退出循环的时候必须针对 `left` 和 `right` 编写逻辑，这是一个负担，增加了出错的可能；
+ 如果拿这种写法做当前这道题（LeetCode 第 34 题），就会发现代码很不好写。


# 总结

算法不能靠模板来学习，**应该先理解思想，然后通过练习和思考巩固**，这样在面对新问题的时候才不至于被一些边界和死循环给绕晕。