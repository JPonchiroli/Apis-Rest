const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/api/grades', (req, res) => {
  const student = req.body.name;
  const group = req.body.group;
  const grade1 = parseFloat(req.body.gradeOne);
  const grade2 = parseFloat(req.body.gradeTwo);
  const grade3 = parseFloat(req.body.gradeThree);
  const finalGrade = (grade1 + grade2 + grade3) / 3;
  var status = "";

  if(finalGrade > 7){
    status = "Approved"
  } else {
    status = "Failed"
  }

  const ReportCard = {
    Student: student,
    Group: group,
    FirstGrade: grade1,
    SecondGrade: grade2,
    ThirdGrade: grade3,
    FinalGrade: finalGrade.toFixed(1),
    Status: status
  }

  res.json({ReportCard})
})

app.listen(port, () => {
  console.log(`Service Running @ http://localhost:${port}`)
})