import store from "../stores/store";
import convert from "../untils/convert";

const storeController = {
  currentDataStore: (data) => {
    const message = (data.type ?? "") + " " + (data.system ?? "") + " " + (data.parameter ?? "")
    const colorName = convert.idToColor(data.priority);
    store.commit("setCurrentData", {msg: message, color: colorName})
  },
  realtimeStore: (data) => {
    var resParser = store.getters.getDataRealtime;
    if (resParser.length > 0) {
      // chen data theo thu tu
      for (let idx = 0; idx < resParser.length; idx++) {
        if (
          resParser[idx].priority == 0 ||
          (data.priority > 0 && data.priority <= resParser[idx].priority)
        ) {
          resParser.splice(idx, 0, data);
          break;
        } else if (idx == resParser.length - 1) {
          resParser.push(data);
          break;
        }
      }
    } else {
      resParser.push(data);
    }
    store.commit("setDataRealtime", resParser);
  },
  redisRealtimeStore: (data) => {
    store.commit("setDataRealtime", data);
  },
  counterColorStore: () => {
    const data = store.getters.getDataRealtime;
    var showCountSorted = {};
    data.forEach((ele) => {
      const colorName = convert.idToColor(ele.priority);
      showCountSorted[colorName] = (showCountSorted[colorName] || 0) + 1;
    });
    store.commit("setCountColors", Object.entries(showCountSorted));
  },
};

export default storeController;
