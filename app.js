const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/testdata", (req, res) => {
  // テストデータ
  res.send({
    status: true,
    data: {
      totalScore: [
        // efficiency
        { dateTime: "2022-6-29", score: 20 },
        { dateTime: "2022-6-30", score: 30 },
        { dateTime: "2022-7-1", score: 40 },
      ],
      levels: [
        { dateTime: "2022-6-29 23:0", level: 0 }, // level: wake
        { dateTime: "2022-6-29 23:30", level: 1 }, //level: rem
        { dateTime: "2022-6-30 1:0", level: 1 },
        { dateTime: "2022-6-30 1:30", level: 1 },
        { dateTime: "2022-6-30 2:0", level: 2 }, // level: light
        { dateTime: "2022-6-30 2:30", level: 2 },
        { dateTime: "2022-6-30 3:0", level: 2 },
        { dateTime: "2022-6-30 3:30", level: 3 }, // level: deep
        { dateTime: "2022-6-30 4:0", level: 2 },
        { dateTime: "2022-6-30 4:30", level: 1 },
        { dateTime: "2022-6-30 5:0", level: 2 },
        { dateTime: "2022-6-30 5:30", level: 3 },
        { dateTime: "2022-6-30 6:0", level: 2 },
        { dateTime: "2022-6-30 6:30", level: 2 },
        { dateTime: "2022-6-30 7:0", level: 1 },
        { dateTime: "2022-6-30 7:30", level: 0 },
        { dateTime: "2022-6-30 23:0", level: 0 }, // level: wake
        { dateTime: "2022-6-30 23:30", level: 1 }, //level: rem
        { dateTime: "2022-7-1 0:0", level: 1 },
      ],
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
