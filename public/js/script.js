var app = new Vue({
  el: "#app",
  data: {
    byRows: true
  },
  computed: {
    containerClasses: function() {
      return {
        "p-0": this.byRows,
        "pb-37": !this.byRows,
        "pl-27": !this.byRows,
        "pt-md-4": !this.byRows,
        "pr-md-19": !this.byRows,
        "pb-md-14": !this.byRows,
        "pl-md-23": !this.byRows,
        "shadow-sm": !this.byRows,
        "section-container--light_bg": !this.byRows
      };
    },
    cardModifClass: function() {
      return {
        "card--row": this.byRows
      };
    }
  },
  methods: {
    displayBlocks: function() {
      return (this.byRows = false);
    },
    displayRows: function() {
      return (this.byRows = true);
    }
  }
});
