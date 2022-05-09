const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();
const webpushController = require("./webpushController");
const formatPayload = require("../utils/formatPayload")
const logger = require("../services/logger")("request-realtime", "request")

client.on("error", function (err) {
  console.log("Error " + err);
});
webpushController.config();

const meterController = {
  
  realtime: async (req, res) => {
    // nhan data tu cac request -> luu xuong realtime -> lay data tu realtime -> chen data theo thu tu -> luu xuong realtime -> socket sang client hien thi
    if (Object.keys(req.body).length == 0) {
      logger.log("error", req.body)
      return res.status(500).json("Please check frame data");
    }
    logger.log("info", req.body)
    if (req.body?.mode) {
      return res.status(200).json("success");
    }
    // nhan data tu cac request
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(Date.now()-tzoffset).toISOString()
    const payload = formatPayload.payload(req.body, localISOTime)
    // gui data sang client de hien thi realtime theo thu tu uu tien
    global.io.sockets.emit("realtime", payload);
    // luu xuong realtime theo id la so phan tu co trong key real_realtime
    client
      .get("realtime")
      .then((data) => {
        // value la string nen can parse sang object
        var resParser = [];
        if (data !== "[]") {
          resParser = JSON.parse(data);
          // sau khi parse ta duoc array chua cac object
          // chen data theo thu tu
          for (let idx = 0; idx < resParser.length; idx++) {
            if (
              resParser[idx].priority == 0 ||
              (payload.priority > 0 &&
                payload.priority <= resParser[idx].priority)
            ) {
              resParser.splice(idx, 0, payload);
              break;
            } else if (idx == resParser.length - 1) {
              resParser.push(payload);
              break;
            }
          }
        } else {
          resParser.push(payload);
        }
        // luu xuong sorted_realtime
        return client.set("realtime", JSON.stringify(resParser));
      })
      .then(() => {
        // lay data tu statistic
        return client.get("statistic");
      })
      .then((data) => {
        var resData = JSON.parse(data);
        const statisticPayload = formatPayload.statisticPayload(payload, localISOTime)
        if (resData.length > 0) {
          const strPayload =
            statisticPayload.type +
            statisticPayload.system +
            statisticPayload.parameter;
          const prioPayload = statisticPayload.priority;
          var isFoundPriority = false
          var idx = 0
          for (; idx < resData.length; idx++) {
            const strCompare =
              resData[idx].type + resData[idx].system + resData[idx].parameter;
            const prioCompare = resData[idx].priority
            // priority bang nhau
            if (prioPayload == prioCompare) {
              isFoundPriority = true
              // noi dung canh bao giong nhau
              if (strPayload == strCompare) {
                // tang bien total
                resData[idx].total++
                // cap nhat lai time
                resData[idx].updateAt = localISOTime
                // sap xep lai thu tu total
                const posPriorityFirst = resData.findIndex((ele) => ele.priority == prioPayload)
                var newIdx = idx
                while (newIdx > posPriorityFirst) {
                  // doi vi tri neu total moi lon hon hoac bang total truoc do
                  if (resData[idx].total >= resData[newIdx-1].total) {
                    const t = resData[newIdx]
                    resData[newIdx] = resData[newIdx-1]
                    resData[newIdx-1] = t
                  }
                  newIdx--
                }
                break
              }
            }
          }
          if(idx == resData.length) {
            var priority
            if (isFoundPriority) {
              priority = prioPayload
            } else {
              priority = parseInt(prioPayload) + 1
              if (parseInt(prioPayload) == 0) {
                priority = 0
              }
            }
            // tim element dau tien co priority lon hon priority hien tai 1 don vi
            const idxFound = resData.findIndex((ele) => {
              return priority != 0 ? (ele.priority >= priority) : (ele.priority == 0)
            })
            // neu tim thay thi insert tai vi tri duoc tim thay
            if (idxFound >= 0) {
              resData.splice(idxFound, 0, statisticPayload)
            }else{
              resData.push(statisticPayload)
            }
          }
        } else {
          resData.push(statisticPayload);
        }
        global.io.sockets.emit("statistic", resData)
        return client.set("statistic", JSON.stringify(resData));
      })
      .catch((error) => {
        return res.status(500).json("Please check frame data");
      });
    return res.status(200).json("success");
  },
};

module.exports = meterController;
