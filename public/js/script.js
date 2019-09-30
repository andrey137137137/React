var app = new Vue({
  el: "#app",
  data: {
    byRows: false
  },
  computed: {
    containerClasses: function() {
      return {
        "pr-0": this.byRows,
        // "pb-37": !this.byRows,
        // "pl-27": !this.byRows,
        // "pt-md-4": !this.byRows,
        // "pr-md-19": !this.byRows,
        // "pb-md-14": !this.byRows,
        // "pl-md-23": !this.byRows,
        "shadow-sm": !this.byRows,
        "section-container--light_bg": !this.byRows,
        "main-container--blocks": !this.byRows
      };
    },
    cardModifClass: function() {
      return {
        "card--row": this.byRows
      };
    }
  }
});
