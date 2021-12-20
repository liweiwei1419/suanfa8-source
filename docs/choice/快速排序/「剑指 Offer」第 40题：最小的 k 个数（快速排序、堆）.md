「剑指 Offer」第 40题：最小的 k 个数（快速排序、堆）


Java 代码：

```java
import java.util.Arrays;

public class Solution {

    // 知识点：快速排序
    // 最小的 k 个数的：即下标区间为 [0, k - 1] 的这些数
    // 使用 partition 过程找到下标为 k - 1 的那个数即可

    // 缺点：一次性得将所有元素读入内存
    // 时间复杂度：O(N \logN)
    // 空间复杂度：O(1)

    public int[] getLeastNumbers(int[] arr, int k) {
        int len = arr.length;
        if (k == 0 || k > len) {
            return new int[0];
        }

        int target = k - 1;
        int left = 0;
        int right = len - 1;

        while (true) {
            int pIndex = partition(arr, left, right);

            if (pIndex == target) {
                int[] res = new int[k];
                System.arraycopy(arr, 0, res, 0, k);
                return res;
            } else if (pIndex < target) {
                // 下一轮搜索区间在 [pIndex + 1, right]
                left = pIndex + 1;
            } else {
                // pIndex > target
                // 下一轮搜索区间在 [left, pIndex - 1]
                right = pIndex - 1;
            }
        }
    }

    private int partition(int[] arr, int left, int right) {
        // 这里最好随机化

        // 循环不变量定义
        // [left + 1, lt] < pivot
        // (lt, i) >= pivot
        int pivot = arr[left];
        int lt = left;

        for (int i = left + 1; i <= right; i++) {
            if (arr[i] < pivot) {
                lt++;
                swap(arr, lt, i);
            }
        }
        swap(arr, left, lt);
        return lt;
    }

    private void swap(int[] arr, int index1, int index2) {
        int temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }

    public static void main(String[] args) {
        int[] arr = {0, 0, 0, 2, 0, 5};
        int k = 0;

        Solution solution = new Solution();
        int[] res = solution.getLeastNumbers(arr, k);
        System.out.println(Arrays.toString(res));
    }
}
```


Java 代码：

```java
import java.util.Arrays;
import java.util.PriorityQueue;

public class Solution2 {

    // 使用最大堆
    // 时间复杂度：O(N \logK)
    // 空间复杂度：O(K)

    public int[] getLeastNumbers(int[] arr, int k) {

        int len = arr.length;
        if (k == 0 || k > len) {
            return new int[0];
        }

        // 应该使用大顶堆，传入 k 是为了防止扩容
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(k, (o1, o2) -> -o1 + o2);
        for (int i = 0; i < k; i++) {
            maxHeap.add(arr[i]);
        }

        for (int i = k; i < len; i++) {
            Integer head = maxHeap.peek();
            if (head > arr[i]) {
                // 这里应该使用 replace ，但是 Java 不提供
                maxHeap.poll();
                maxHeap.add(arr[i]);
            }
        }

        // 这样写一行太长，目前没找到更好的写法，意思就是直接读取最大堆里面的数组，而不去 poll
        return Arrays.stream(maxHeap.toArray(new Integer[0])).mapToInt(Integer::valueOf).toArray();
    }

    public static void main(String[] args) {
        Solution2 solution2 = new Solution2();
        int[] arr = {3, 2, 1};
        int k = 2;
        int[] res = solution2.getLeastNumbers(arr, k);
        System.out.println(Arrays.toString(res));
    }
}
```