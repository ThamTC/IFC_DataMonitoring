const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();
const webpushController = require("./webpushController");
client.on("error", function (err) {
  console.log("Error " + err);
});
webpushController.config();

const meterController = {
  alarm: async (req, res) => {
    console.log("frame: ", req.body);
    if (Object.keys(req.body).length === 0) {
      return res.status(500).json("Please check frame data");
    }
    try {
      var dataRedis = {};
      var contact = req.body?.contact ? req.body?.contact.split(",") : [];

      if (contact.length > 1) {
        dataRedis.contact = contact[0] + ",...";
      } else {
        dataRedis.contact = contact[0];
      }
      dataRedis.name = req.body?.name;
      dataRedis.content = req.body?.content;
      dataRedis.style = req.body?.style;
      dataRedis.status = req.body?.status;
      dataRedis.contactAppend = req.body?.contact;
      dataRedis.time = req.body?.time;

      global.io.sockets.emit("realtime", dataRedis);
      var realtimeData = [];
      const resRealtime = await client.get("realtime");
      if (resRealtime != null) {
        realtimeData = JSON.parse(resRealtime);
      }
      realtimeData.unshift(dataRedis);
      await client.set("realtime", JSON.stringify(realtimeData));
      var doneData = [];
      const resStatistic = await client.get("statistic");
      if (resStatistic != null) {
        doneData = JSON.parse(resStatistic);
        // tang so dem ban ghi trung nhau
        var isDuplicate = false;
        doneData.forEach((element) => {
          if (req.body.content === element.content) {
            element.count++;
            // update time
            const d = new Date();
            element.updateAt = Math.round(d.getTime() / 1000);
            isDuplicate = true;
          }
        });
        // neu khong tim thay ban ghi trung nhau thi them vao mang
        if (!isDuplicate) {
          const d = new Date();
          doneData.push({
            name: req.body.name || "",
            content: req.body.content || "",
            count: 1,
            isAction: false,
            username: "",
            contact: req.body.contact || "",
            createAt: Math.round(d.getTime() / 1000),
            updateAt: Math.round(d.getTime() / 1000),
          });
        }
        // sap xep giam dan
        doneData.sort(function (a, b) {
          if (a.count > b.count) return -1;
          if (a.count < b.count) return 1;
          return 0;
        });
      } else {
        // add default element
        doneData.push({
          name: req.body.name || "",
          content: req.body.content || "",
          count: 1,
          isAction: false,
          username: "",
        });
      }

      await client.set("statistic", JSON.stringify(doneData));
      global.io.sockets.emit("statistic", doneData);
      // push notification to clients
      webpushController
        .pushNotification(dataRedis.content)
        .then((data) => {
          console.log("data: ", data);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
      return res.status(200).json("success");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Please check frame data");
    }
  },
  test: async (req, res) => {
    // nhan data tu cac request -> luu xuong test_realtime -> lay data tu sorted_test -> chen data theo thu tu -> luu xuong sorted_test -> socket sang client hien thi
    console.log(req.body);
    if (Object.keys(req.body).length == 0) {
      return res.status(500).json("Please check frame data");
    }
    // nhan data tu cac request
    const d = new Date();
    const payload = {
      type: req.body.type ?? "test",
      system: req.body.system ?? "test",
      parameter: req.body.parameter ?? "test",
      value: req.body.value ?? "test",
      unit: req.body.unit ?? "test",
      time: req.body.time ?? d.toISOString(),
      status: req.body.status ?? "Null",
      priority: req.body.priority ?? "0",
      message: req.body.message ?? "test",
      action: req.body.action ?? "none",
      contact: req.body.contact ?? "",
      timeout: req.body.timeout ?? 10,
      count: req.body.count ?? 10
    };
    // luu xuong test_realtime theo id la so phan tu co trong key real_realtime
    client
      .get("test_sorted")
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
        // gui data sang client de hien thi realtime theo thu tu uu tien
        global.io.sockets.emit("test_realtime", resParser);
        // luu xuong sorted_test
        return client.set("test_sorted", JSON.stringify(resParser));
      })
      .then(() => {
        // lay data tu test_statistic
        return client.get("test_statistic");
      })
      .then((data) => {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = new Date(Date.now()-tzoffset).toISOString()
        var resData = JSON.parse(data);
        const statisticPayload = {
          type: payload.type,
          system: payload.system,
          parameter: payload.parameter,
          priority: payload.priority,
          action: payload.action,
          total: 1,
          timeout: payload.timeout,
          count: payload.count,
          isAction: false,
          username: "",
          createAt: localISOTime,
          updateAt: localISOTime,
        };
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
              priority = 1
            } else {
              priority = parseInt(prioPayload) + 1
              if (parseInt(prioPayload) == 0) {
                priority = 0
              }
            }
            console.log("priority: ", priority)
            // tim element dau tien co priority lon hon priority hien tai 1 don vi
            const idxFound = resData.findIndex((ele) => {
              return ele.priority == priority || ele.priority == 0
            })
            // neu tim thay thi insert tai vi tri duoc tim thay
            console.log("idxFound: ", idxFound)
            if (idxFound >= 0) {
              resData.splice(idxFound, 0, statisticPayload)
            }else{
              resData.push(statisticPayload)
            }
          }
        } else {
          resData.push(statisticPayload);
        }
        console.log("resData: ", resData);
        global.io.sockets.emit("test_statistic", resData)
        return client.set("test_statistic", JSON.stringify(resData));
      })
      .catch((error) => {
        console.log("error", error);
        return res.status(500).json("Please check frame data");
      });
    return res.status(200).json("success");
  },
};

module.exports = meterController;
