var app = new Vue({
  el: "#app",
  data: {
    activeTab: 2,
    showFilter: true,
    byRows: false
  },
  computed: {
    containerClasses: function() {
      return {
        "main-container--blocks": !this.byRows,
        "section-white_bg": !this.byRows,
        "section-bordered": !this.byRows,
        "main-container--rows": this.byRows
      };
    },
    cardClasses: function() {
      return {
        col: !this.byRows,
        "section-white_bg": this.byRows,
        "section-bordered": this.byRows
      };
    }
  },
  methods: {
    getTabItemClass: function(index) {
      return {
        "nav-item--active": this.activeTab == index
      };
    },
    getTabLinkClass: function(index) {
      return {
        active: this.activeTab == index
      };
    }
  }
});
