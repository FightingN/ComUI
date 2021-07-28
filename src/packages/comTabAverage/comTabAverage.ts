Component({
  properties: {
    selectTab: {
      type: String,
      value: 'tab1',
    },
    tabList: {
      type: Array,
      value: [
        {
          value: 'tab1',
          label: '标签1',
        },
        {
          value: 'tab2',
          label: '标签2',
        },
      ],
    },
  },
  data: {},
  methods: {
    onClickTab(e: any) {
      const { tab } = e.currentTarget.dataset
      this.setData({
        selectTab: tab,
      })
      this.triggerEvent('onClickTab', e.currentTarget)
    },
  },
})
