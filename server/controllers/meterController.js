const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();
const webpushController = require("./webpushController");
client.on("error", function (err) {
  console.log("Error " + err);
});
webpushController.config();

const meterController = {
  alarm: async (req, res) => {
    console.log(req.body);
    try {
      var dataRedis = {};
      var contact = req.body.contact.split(",");

      if (contact.length > 1) {
        dataRedis.contact = contact[0] + ",...";
      } else {
        dataRedis.contact = contact[0];
      }
      console.log(dataRedis.contact);
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
      return res.status(500).json("Please check frame data");
    }
  },
  test: async(req, res) => {
    console.log(req.body);
    try {
      var dataRedis = {};
      var contact = req.body.contact.split(",");

      if (contact.length > 1) {
        dataRedis.contact = contact[0] + ",...";
      } else {
        dataRedis.contact = contact[0];
      }
      console.log(dataRedis.contact);
      dataRedis.name = req.body?.name;
      dataRedis.content = req.body?.content;
      dataRedis.style = req.body?.style;
      dataRedis.status = req.body?.status;
      dataRedis.contactAppend = req.body?.contact;
      dataRedis.time = req.body?.time;

      global.io.sockets.emit("test", dataRedis);
      var realtimeData = [];
      const resRealtime = await client.get("test");
      if (resRealtime != null) {
        realtimeData = JSON.parse(resRealtime);
      }
      realtimeData.unshift(dataRedis);
      await client.set("test", JSON.stringify(realtimeData));
      
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json("Please check frame data");
    }
  }
};

module.exports = meterController;
