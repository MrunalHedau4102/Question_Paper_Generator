class QuestionStore {
  constructor() {
    this.questions = [];
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  getAllQuestions() {
    return this.questions;
  }
}

module.exports = QuestionStore;
