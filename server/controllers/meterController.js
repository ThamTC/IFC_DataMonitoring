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
      var contact = req.body?.contact ? req.body?.contact.split(","):[];

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
            const d = new Date()
            element.updateAt = Math.round(d.getTime()/1000)
            isDuplicate = true;
          }
        });
        // neu khong tim thay ban ghi trung nhau thi them vao mang
        if (!isDuplicate) {
            const d = new Date()
          doneData.push({
            name: req.body.name || "",
            content: req.body.content || "",
            count: 1,
            isAction: false,
            username: "",
            contact: req.body.contact || "",
            createAt: Math.round(d.getTime()/1000),
            updateAt: Math.round(d.getTime()/1000)
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
      console.log(error)
      return res.status(500).json("Please check frame data");
    }
  },
  test: async(req, res) => {
    // nhan data tu cac request -> luu xuong test_realtime -> lay data tu sorted_test -> chen data theo thu tu -> luu xuong sorted_test -> socket sang client hien thi
    console.log(req.body);
    if (Object.keys(req.body).length === 0) {
      return res.status(500).json("Please check frame data");
    }
    try {
      // nhan data tu cac request
      const d = new Date()
      const payload = {
        type: req.body?.type ?? "test",
        system: req.body?.system ?? "test",
        parameter: req.body?.parameter ?? "test",
        value: req.body?.value ?? "test",
        unit: req.body?.unit ?? "test",
        time: req.body?.time ?? d.toISOString(),
        status: req.body?.status ?? "Null",
        priority: req.body?.priority ?? '0',
        message: req.body?.message ?? "test",
        action: req.body?.action ?? "test",
        contact: req.body?.contact
      }
      // luu xuong test_realtime theo id la so phan tu co trong key real_realtime
      const len = await client.hlen("test_realtime")
      await client.hsetnx("test_realtime", "test:"+len, JSON.stringify(payload))
      //  lay data tu sorted_test
      const data = await client.get("test_sorted")
      // value la string nen can parse sang object
      var resParser = []
      if (data !== "[]") {
        resParser = JSON.parse(data)
      }
      // sau khi parse ta duoc array chua cac object
      // chen data theo thu tu
      for (let idx = 0; idx < resParser.length; idx++) {
        if (
          resParser[idx].priority == 0 ||
          (payload.priority > 0 && payload.priority <= resParser[idx].priority)
        ) {
          resParser.splice(idx, 0, payload);
          break;
        } else if (idx == resParser.length - 1) {
          resParser.push(payload);
          break
        }
      }
      console.log(resParser)
      // luu xuong sorted_test
      await client.set("test_sorted", JSON.stringify(resParser))
      // gui data sang client de hien thi
      global.io.sockets.emit("test_realtime", resParser)
      // const resData = await client.hgetall("test")
      // const itemArray = []
      // if (resData) {
      //   Object.keys(resData).forEach((ele)=>{
      //     itemArray.push(JSON.parse(resData[ele]))
      //   })
      // }else {
      //   await client.hsetnx("test", "test:0", JSON.stringify(payload))
      //   global.io.sockets.emit("test", payload);
      //   // console.log("done:", isDone)
      //   return res.status(200).json("success");
      // }
      // const priorPos = payload.priority;
      
      // // console.log(typeof(itemArray[0]))
      
      // console.log(itemArray)
      // var payloadToSave
      // for (let idx = 0; idx < itemArray.length; idx++) {
        
      // }
      // save to redis with key=test
      // await client.hsetnx("test", "test:" + payload.time, JSON.stringify(payload))
      // send to client using socke.io
      // global.io.sockets.emit("test", payload);
      // console.log("done:", isDone)
      return res.status(200).json("success");
    } catch (error) {
      console.log("error", error)
      return res.status(500).json("Please check frame data");
    }
  }
};

module.exports = meterController;
