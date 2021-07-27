Component({
  properties: {
    typeList: {
      type: Array,
      value: [
        { type: '1', name: 'tab1', select: true, deptType: "0" },
        { type: '2', name: 'tab2', select: false, deptType: '1'},
        { type: '3', name: 'tab3', select: false, deptType: '2' },
        { type: '4', name: 'tab4', select: false, deptType: '1'},
        { type: '5', name: 'tab5', select: false, deptType: '2' },
        { type: '6', name: 'tab6', select: false, deptType: '1'},
        { type: '7', name: 'tab7', select: false, deptType: '2' },
        { type: '8', name: 'tab8', select: false, deptType: '1'},
        { type: '9', name: 'tab9', select: false, deptType: '2' }
      ]
    }
  },
  data: {
    scrollLeft: 0,
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  methods: {
    onButtonChange: function (e) {
      const list = this.data.typeList
      let that = this;
      list.forEach(item => {
        if (item.type === e.currentTarget.dataset.type) {
          item.select = true
        } else {
          item.select = false
        }
      })
      that.setData({
        typeList: list,
      })
      var query = wx.createSelectorQuery().in(that);//创建节点查询器
      query.select('#item-' + e.currentTarget.dataset.type).boundingClientRect();//选择id='#item-' + selectedId的节点，获取节点位置信息的查询请求
      query.select('#scroll-view').boundingClientRect();//获取滑块的位置信息
      query.select('#scroll-view').scrollOffset();//获取页面滑动位置的查询请求
      query.exec(function (res) {
        that.setData({
          scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
        });
      });
      this.triggerEvent('chooseType', e.currentTarget.dataset)
    },
  }
})
