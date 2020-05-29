import { observable } from "mobx";

export default observable({
  showFilter: false,
  byRows: true,
  pagination: { current: 2, count: 5 }
});
