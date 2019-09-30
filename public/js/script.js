var app = new Vue({
  el: "#app",
  data: {
    byRows: false
  },
  computed: {
    containerClasses: function() {
      return {
        "main-container--rows": this.byRows,
        "shadow-sm": !this.byRows,
        "section-container--light_bg": !this.byRows,
        "main-container--blocks": !this.byRows
      };
    }
  }
});
