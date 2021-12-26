# LeetCode 第 0218 题：天际线问题（困难）





### 扫描线法

作者：ivan_allen
链接：https://leetcode-cn.com/problems/the-skyline-problem/solution/218tian-ji-xian-wen-ti-sao-miao-xian-fa-by-ivan_al/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



1、使用扫描线，从左至右扫过；

2、如果遇到左端点，将高度入堆，如果遇到右端点，则将高度从堆中删除；

3、使用 `last` 变量记录上一个转折点。

可以参考下面的图，扫描线下方的方格就是堆。

![skyline.gif](https://pic.leetcode-cn.com/0bf43198e107719f1dbdbda82a7d213d87019200b4288a11bf49822d7646a4b1-skyline.gif)



```c++
class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        multiset<pair<int, int>> all;
        vector<vector<int>> res;
        
        for (auto& e : buildings) {
            all.insert(make_pair(e[0], -e[2])); // critical point, left corner
            all.insert(make_pair(e[1], e[2])); // critical point, right corner
        }
        
        multiset<int> heights({0}); // 保存当前位置所有高度。
        vector<int> last = {0, 0}; // 保存上一个位置的横坐标以及高度
        for (auto& p : all) {
            if (p.second < 0) heights.insert(-p.second); // 左端点，高度入堆
            else heights.erase(heights.find(p.second)); // 右端点，移除高度
            
            // 当前关键点，最大高度
            auto maxHeight = *heights.rbegin();
            
            // 当前最大高度如果不同于上一个高度，说明这是一个转折点
            if (last[1] != maxHeight) {
                // 更新 last，并加入结果集
                last[0] = p.first;
                last[1] = maxHeight;
                res.push_back(last);
            }
        }
        
        return res;
    }
};

作者：ivan_allen
链接：https://leetcode-cn.com/problems/the-skyline-problem/solution/218tian-ji-xian-wen-ti-sao-miao-xian-fa-by-ivan_al/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```



很巧妙的做法，利用了 muliset 这一数据结构自动排序的特性。

multiset中的元素是 pair，对pair排序默认的方式是，先比较 first，哪个小则排在前；first 相等则 second小的排在前。 而 first 这里表示横坐标，second 为负时，表示建筑的左侧在这一位置，其绝对值表示建筑在的高度；second 为正时，表示建筑的右侧在这一位置。

所以对muliset遍历时，首先会取出横坐标小的点。如果2个点横坐标相等，会先取出 second 小的点，对于负数来说，其实就是高度更高的建筑。也就是说，两个点上有高度不同的建筑，会先取高的出来放入高度集合，集合中高度最大值和之前高度不同，就直接放入结果。后面更低高度的建筑加入并不会改变最大高度。

如果second为正，表示建筑物在此处结束，需要把相应高度从高度集合中删除。有相同建筑同时在此结束，则会先让较低的建筑离开，因为它们不会改变最大高度。只有当最高的建筑物离开时，才进行改变。

如果一个位置既有建筑物进来，又有建筑物离开，会先选择进来的，同理。 总结起来，我就是想说，这里把建筑物起始点的高度设为负数，真的很巧妙。



代码其实可以优化一下的啊。

```c++
class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        vector<pair<int,int>> h;
        multiset<int> m;
        vector<vector<int>> res;

        //1、将每一个建筑分成“两个部分”，例如:[2,9,10]可以转换成[2，-10][9,10]，我们用负值来表示左边界
        for(const auto& b:buildings)
        {
            h.push_back({b[0], -b[2]});
            h.push_back({b[1], b[2]});
        }

        //2、根据x值对分段进行排序
        sort(h.begin(),h.end());
        int prev = 0, cur = 0;
        m.insert(0);

        3、遍历
        for (auto i:h)
        {
            if (i.second < 0) m.insert(-i.second);  //左端点，高度入堆
            else m.erase(m.find(i.second));         //右端点，高度出堆
            cur = *m.rbegin();                      //当前最大高度高度
            if (cur != prev) {                      //当前最大高度不等于最大高度perv表示这是一个转折点
                res.push_back({i.first, cur});      //添加坐标
                prev = cur;                         //更新最大高度
            }
        }
        return res;
    }
};
```

