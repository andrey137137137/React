var app = new Vue({
  el: "#app",
  data: {
    byRows: false
  },
  computed: {
    containerClasses: function() {
      return {
        "main-container--blocks": !this.byRows,
        "section-white_bg": !this.byRows,
        "main-container--rows": this.byRows
      };
    },
    cardClasses: function() {
      return {
        col: !this.byRows,
        "section-white_bg": this.byRows
      };
    }
  }
});
