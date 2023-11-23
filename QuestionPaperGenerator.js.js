const _ = require('lodash');

class QuestionPaperGenerator {
  constructor(questionStore) {
    this.questionStore = questionStore;
  }

  generateQuestionPaper({ totalMarks, subjectSelect, difficultyDistribution, topicDistribution }) {
    const questionPaper = [];
    const marksDistribution = this.calculateMarksDistribution(totalMarks, difficultyDistribution);

    for (const [difficulty, count] of Object.entries(marksDistribution)) {
      for (const topic of Object.keys(topicDistribution)) {
        const questionsByDifficultyAndTopic = this.getQuestionsByDifficultyAndTopic(difficulty, topic, subjectSelect);
        const selectedQuestions = this.selectRandomQuestions(questionsByDifficultyAndTopic, count * topicDistribution[topic]);
        questionPaper.push(...selectedQuestions);
      }
    }
    if (questionPaper.length === 0) {
      console.log("No questions available for the specified criteria.");
      return [{ question: "NOT PROVIDED IN DB", marks: 0 }];
    }
    console.log("Generated Question Paper:", questionPaper);
    return questionPaper;
  }

  calculateMarksDistribution(totalMarks, difficultyDistribution) {
    const marksDistribution = {};
    const totalPercentage = _.sum(Object.values(difficultyDistribution));

    for (const [difficulty, percentage] of Object.entries(difficultyDistribution)) {
      marksDistribution[difficulty] = Math.floor((percentage / totalPercentage) * totalMarks);
    }

    return marksDistribution;
  }
 
  getQuestionsByDifficultyAndTopic(difficulty, topic, subjectSelect) {
    const filteredQuestions = this.questionStore
      .getAllQuestions()
      .filter(question => {
        const match = (
          question.difficulty === difficulty &&
          question.topic === topic &&
          question.subject.toLowerCase() === subjectSelect.toLowerCase()
        );
        return match;
      });
  
    return filteredQuestions;
  }
  

  selectRandomQuestions(questions, count) {
    return _.sampleSize(questions, count);
  }
}

module.exports = QuestionPaperGenerator;
