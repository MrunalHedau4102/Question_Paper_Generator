const express = require('express');
const bodyParser = require('body-parser');
const Question = require('./Question');
const QuestionStore = require('./QuestionStore');
const QuestionPaperGenerator = require('./QuestionPaperGenerator.js');

const app = express();
const port = 3000;

const questionStore = new QuestionStore();

questionStore.addQuestion(new Question({ question: "Law of Thermodynamics", subject: "Physics", topic: "Thermodynamics", difficulty: "Medium", marks: 4 }));
questionStore.addQuestion(new Question({ question: "Quantum Mechanics", subject: "Physics", topic: "QuantumPhysics", difficulty: "Hard", marks: 5 }));
questionStore.addQuestion(new Question({ question: "Electromagnetic Waves", subject: "Physics", topic: "Electromagnetism", difficulty: "Medium", marks: 4 }));
questionStore.addQuestion(new Question({ question: "Stoichiometry", subject: "Chemistry", topic: "ChemicalReactions", difficulty: "Easy", marks: 3 }));
questionStore.addQuestion(new Question({ question: "Acid-Base Equilibria", subject: "Chemistry", topic: "ChemicalEquilibria", difficulty: "Hard", marks: 5 }));
questionStore.addQuestion(new Question({ question: "Organometallic Chemistry", subject: "Chemistry", topic: "OrganometallicCompounds", difficulty: "Medium", marks: 4 }));
questionStore.addQuestion(new Question({ question: "Differential Equations", subject: "Maths", topic: "DifferentialEquations", difficulty: "Hard", marks: 5 }));
questionStore.addQuestion(new Question({ question: "Trigonometry", subject: "Maths", topic: "Trigonometry", difficulty: "Easy", marks: 3 }));
questionStore.addQuestion(new Question({ question: "Number Theory", subject: "Maths", topic: "NumberTheory", difficulty: "Medium", marks: 4 }));



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

const qpg = new QuestionPaperGenerator(questionStore);

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/generate', (req, res) => {
  const selectedSubject = req.body.subject;
  const selectedDifficulty = req.body.difficulty;

  const paperRequirements = {
    totalMarks: 100,
    subjectSelect: selectedSubject, 
    difficultyDistribution: { [selectedDifficulty]: 1 }, 
    topicDistribution: { "Trigonometry": 0.2, "DifferentialEquations": 0.5, "NumberTheory": 0.3 ,"ChemicalReactions": 0.2, "ChemicalEquilibria": 0.5, "Electromagnetism": 0.3,"Thermodynamics": 0.3, "QuantumPhysics": 0.5, "Electromagnetism": 0.3 }, 
    
  };

  
  const questionPaper = qpg.generateQuestionPaper(paperRequirements);

  
  res.render('questionPaper', { questionPaper, selectedSubject, selectedDifficulty });
});


app.get('/generatePaper', (req, res) => {
  const question = req.query.question;
  
  
  res.send(`Question Paper Generated for: ${question}`);
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
