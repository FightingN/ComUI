Component({
  properties: {
    conditionList: {
      type: Array,
      value: [
        {
          title: '标签1',
          id: '1',
          select: true,
        },
        {
          title: '标签2',
          id: '2',
          select: false,
        },
        {
          title: '标签3',
          id: '3',
          select: false,
        },
        {
          title: '标签4',
          id: '4',
          select: false,
        },
        {
          title: '标签5',
          id: '5',
          select: false,
        },
        {
          title: '标签6',
          id: '6',
          select: false,
        },
        {
          title: '标签7',
          id: '7',
          select: false,
        },
        {
          title: '标签8',
          id: '8',
          select: false,
        },
      ],
    },
    choosedCondition: {
      type: Object,
      value: {},
    },
    conditionVisible: {
      type: Boolean,
      value: false,
    },
  },
  data: {},
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        'choosedCondition.title': this.data.conditionList[0].title,
        'choosedCondition.id': this.data.conditionList[0].id,
      })
    },
  },
  methods: {
    showCondition() {
      this.setData({
        conditionVisible: !this.data.conditionVisible,
      })
    },
    // 改变查询项
    onChangeCondition(e: any) {
      const list = this.data.conditionList
      list.forEach((item) => {
        if (item.id === e.currentTarget.dataset.id) {
          item.select = true
          this.setData({
            'choosedCondition.title': item.title,
            'choosedCondition.id': item.id,
          })
        } else {
          item.select = false
        }
      })
      this.setData({
        conditionList: list,
      })
      this.triggerEvent('onChangeDropDown', e.currentTarget.dataset)
    },
  },
})
