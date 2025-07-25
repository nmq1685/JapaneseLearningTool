/**
 * Hiragana Learning Tool JavaScript
 * Handles flashcards, tests, quick reflex game, and review functionality
 */

// Hiragana data
const hiraganaData = [
    { hiragana: 'あ', romaji: 'a' },
    { hiragana: 'い', romaji: 'i' },
    { hiragana: 'う', romaji: 'u' },
    { hiragana: 'え', romaji: 'e' },
    { hiragana: 'お', romaji: 'o' },
    { hiragana: 'か', romaji: 'ka' },
    { hiragana: 'き', romaji: 'ki' },
    { hiragana: 'く', romaji: 'ku' },
    { hiragana: 'け', romaji: 'ke' },
    { hiragana: 'こ', romaji: 'ko' },
    { hiragana: 'さ', romaji: 'sa' },
    { hiragana: 'し', romaji: 'shi' },
    { hiragana: 'す', romaji: 'su' },
    { hiragana: 'せ', romaji: 'se' },
    { hiragana: 'そ', romaji: 'so' },
    { hiragana: 'た', romaji: 'ta' },
    { hiragana: 'ち', romaji: 'chi' },
    { hiragana: 'つ', romaji: 'tsu' },
    { hiragana: 'て', romaji: 'te' },
    { hiragana: 'と', romaji: 'to' },
    { hiragana: 'な', romaji: 'na' },
    { hiragana: 'に', romaji: 'ni' },
    { hiragana: 'ぬ', romaji: 'nu' },
    { hiragana: 'ね', romaji: 'ne' },
    { hiragana: 'の', romaji: 'no' },
    { hiragana: 'は', romaji: 'ha' },
    { hiragana: 'ひ', romaji: 'hi' },
    { hiragana: 'ふ', romaji: 'fu' },
    { hiragana: 'へ', romaji: 'he' },
    { hiragana: 'ほ', romaji: 'ho' },
    { hiragana: 'ま', romaji: 'ma' },
    { hiragana: 'み', romaji: 'mi' },
    { hiragana: 'む', romaji: 'mu' },
    { hiragana: 'め', romaji: 'me' },
    { hiragana: 'も', romaji: 'mo' },
    { hiragana: 'や', romaji: 'ya' },
    { hiragana: 'ゆ', romaji: 'yu' },
    { hiragana: 'よ', romaji: 'yo' },
    { hiragana: 'ら', romaji: 'ra' },
    { hiragana: 'り', romaji: 'ri' },
    { hiragana: 'る', romaji: 'ru' },
    { hiragana: 'れ', romaji: 're' },
    { hiragana: 'ろ', romaji: 'ro' },
    { hiragana: 'わ', romaji: 'wa' },
    { hiragana: 'を', romaji: 'wo' },
    { hiragana: 'ん', romaji: 'n' }
];

// Flashcard Class
class FlashcardManager {
    constructor() {
        this.currentCardIndex = 0;
        this.shuffledCards = [...hiraganaData];
        this.autoFlipInterval = null;
        this.initializeElements();
        this.bindEvents();
        this.updateCard();
    }

    initializeElements() {
        this.hiraganaCard = document.getElementById('hiraganaCard');
        this.hiraganaFront = document.getElementById('hiraganaFront');
        this.hiraganaBack = document.getElementById('hiraganaBack');
        this.cardCount = document.getElementById('cardCount');
        this.flipBtn = document.getElementById('flipBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.autoFlipBtn = document.getElementById('autoFlipBtn');
    }

    bindEvents() {
        this.flipBtn.addEventListener('click', () => this.hiraganaCard.classList.toggle('flipped'));
        this.hiraganaCard.addEventListener('click', () => this.hiraganaCard.classList.toggle('flipped'));
        this.prevBtn.addEventListener('click', () => this.previousCard());
        this.nextBtn.addEventListener('click', () => this.nextCard());
        this.shuffleBtn.addEventListener('click', () => this.shuffleCards());
        this.autoFlipBtn.addEventListener('click', () => this.toggleAutoFlip());
    }

    updateCard() {
        this.hiraganaFront.textContent = this.shuffledCards[this.currentCardIndex].hiragana;
        this.hiraganaBack.textContent = this.shuffledCards[this.currentCardIndex].romaji;
        this.cardCount.textContent = `${this.currentCardIndex + 1}/${this.shuffledCards.length}`;
        this.hiraganaCard.classList.remove('flipped');
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    shuffleCards() {
        this.stopAutoFlip();
        this.shuffledCards = this.shuffleArray([...hiraganaData]);
        this.currentCardIndex = 0;
        this.updateCard();
    }

    toggleAutoFlip() {
        if (this.autoFlipInterval) {
            this.stopAutoFlip();
            this.autoFlipBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Auto Flip';
        } else {
            this.startAutoFlip();
            this.autoFlipBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Auto Flip';
        }
    }

    startAutoFlip() {
        this.autoFlipInterval = setInterval(() => {
            this.hiraganaCard.classList.add('flipped');
            setTimeout(() => {
                this.currentCardIndex = (this.currentCardIndex < this.shuffledCards.length - 1) ? this.currentCardIndex + 1 : 0;
                this.updateCard();
            }, 1000);
        }, 3000);
    }

    stopAutoFlip() {
        if (this.autoFlipInterval) {
            clearInterval(this.autoFlipInterval);
            this.autoFlipInterval = null;
        }
    }

    previousCard() {
        this.stopAutoFlip();
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
            this.updateCard();
        }
    }

    nextCard() {
        this.stopAutoFlip();
        if (this.currentCardIndex < this.shuffledCards.length - 1) {
            this.currentCardIndex++;
            this.updateCard();
        }
    }

    goToCard(index) {
        if (index >= 0 && index < this.shuffledCards.length) {
            this.currentCardIndex = index;
            this.updateCard();
        }
    }
}

// Test Manager Class
class TestManager {
    constructor() {
        this.testQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedOption = null;
        this.testInProgress = false;
        this.isMultipleChoice = true;
        this.currentTestMistakes = [];
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.questionHiragana = document.getElementById('questionHiragana');
        this.questionPrompt = document.getElementById('questionPrompt');
        this.optionsContainer = document.getElementById('optionsContainer');
        this.typingContainer = document.getElementById('typingContainer');
        this.answerInput = document.getElementById('answerInput');
        this.nextQuestionBtn = document.getElementById('nextQuestionBtn');
        this.questionCount = document.getElementById('questionCount');
        this.progressBar = document.getElementById('progressBar');
        this.resultsModal = document.getElementById('resultsModal');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.resultMessage = document.getElementById('resultMessage');
        this.retryTestBtn = document.getElementById('retryTestBtn');
        this.closeResultsBtn = document.getElementById('closeResultsBtn');
        this.multipleChoiceMode = document.getElementById('multipleChoiceMode');
        this.typingMode = document.getElementById('typingMode');
    }

    bindEvents() {
        this.multipleChoiceMode.addEventListener('click', () => this.setMultipleChoiceMode());
        this.typingMode.addEventListener('click', () => this.setTypingMode());
        this.nextQuestionBtn.addEventListener('click', () => this.handleNextQuestion());
        this.retryTestBtn.addEventListener('click', () => this.retryTest());
        this.closeResultsBtn.addEventListener('click', () => this.closeResults());
        this.answerInput.addEventListener('input', () => this.handleTypingInput());
        this.answerInput.addEventListener('keypress', (e) => this.handleKeyPress(e));
    }

    generateTestQuestions() {
        const shuffled = this.shuffleArray([...hiraganaData]);
        return shuffled.map(item => {
            const incorrectOptions = this.shuffleArray(
                hiraganaData.filter(opt => opt.romaji !== item.romaji).map(opt => opt.romaji)
            ).slice(0, 3);
            const options = this.shuffleArray([...incorrectOptions, item.romaji]);
            return { hiragana: item.hiragana, correctAnswer: item.romaji, options };
        });
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    setMultipleChoiceMode() {
        this.isMultipleChoice = true;
        this.multipleChoiceMode.classList.remove('bg-gray-700', 'text-gray-300');
        this.multipleChoiceMode.classList.add('bg-indigo-600', 'text-white');
        this.typingMode.classList.remove('bg-indigo-600', 'text-white');
        this.typingMode.classList.add('bg-gray-700', 'text-gray-300');
        
        this.optionsContainer.classList.remove('hidden');
        this.typingContainer.classList.add('hidden');
        this.questionPrompt.textContent = 'What is the correct pronunciation?';
        
        if (this.testInProgress) this.displayQuestion();
    }

    setTypingMode() {
        this.isMultipleChoice = false;
        this.typingMode.classList.remove('bg-gray-700', 'text-gray-300');
        this.typingMode.classList.add('bg-indigo-600', 'text-white');
        this.multipleChoiceMode.classList.remove('bg-indigo-600', 'text-white');
        this.multipleChoiceMode.classList.add('bg-gray-700', 'text-gray-300');
        
        this.optionsContainer.classList.add('hidden');
        this.typingContainer.classList.remove('hidden');
        this.questionPrompt.textContent = 'Type the romaji pronunciation:';
        
        if (this.testInProgress) this.displayQuestion();
    }

    startTest() {
        this.testQuestions = this.generateTestQuestions();
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.currentTestMistakes = [];
        this.testInProgress = true;
        
        this.answerInput.classList.remove('border-green-500', 'border-red-500');
        this.displayQuestion();
    }

    displayQuestion() {
        if (this.currentQuestionIndex >= this.testQuestions.length) {
            this.showResults();
            return;
        }
        
        const question = this.testQuestions[this.currentQuestionIndex];
        this.questionHiragana.textContent = question.hiragana;
        this.questionCount.textContent = `${this.currentQuestionIndex + 1}/${this.testQuestions.length}`;
        this.progressBar.style.width = `${((this.currentQuestionIndex + 1) / this.testQuestions.length) * 100}%`;
        
        if (this.isMultipleChoice) {
            this.displayMultipleChoiceOptions(question);
        } else {
            this.displayTypingInput();
        }
    }

    displayMultipleChoiceOptions(question) {
        this.optionsContainer.innerHTML = '';
        question.options.forEach(option => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option p-4 bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-white';
            optionBtn.textContent = option;
            optionBtn.dataset.answer = option;
            optionBtn.addEventListener('click', () => this.selectOption(optionBtn, option));
            this.optionsContainer.appendChild(optionBtn);
        });
        this.selectedOption = null;
        this.nextQuestionBtn.disabled = true;
    }

    displayTypingInput() {
        this.answerInput.value = '';
        this.answerInput.focus();
        this.selectedOption = null;
        this.nextQuestionBtn.disabled = true;
    }

    selectOption(optionBtn, option) {
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        optionBtn.classList.add('selected');
        this.selectedOption = option;
        this.nextQuestionBtn.disabled = false;
    }

    handleTypingInput() {
        if (!this.isMultipleChoice && this.answerInput.value.trim()) {
            this.nextQuestionBtn.disabled = false;
            this.selectedOption = this.answerInput.value.trim().toLowerCase();
        } else if (!this.isMultipleChoice) {
            this.nextQuestionBtn.disabled = true;
            this.selectedOption = null;
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !this.nextQuestionBtn.disabled) {
            this.nextQuestionBtn.click();
        }
    }

    handleNextQuestion() {
        if (!this.testInProgress) return;
        this.checkAnswer();
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }, 1000);
    }

    checkAnswer() {
        const question = this.testQuestions[this.currentQuestionIndex];
        const isCorrect = this.selectedOption === question.correctAnswer;
        
        if (this.isMultipleChoice) {
            this.showMultipleChoiceFeedback(question, isCorrect);
        } else {
            this.showTypingFeedback(question, isCorrect);
        }
        
        if (isCorrect) {
            this.score++;
        } else {
            this.addMistake(question);
        }
    }

    showMultipleChoiceFeedback(question, isCorrect) {
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('correct', 'incorrect');
            if (option.dataset.answer === question.correctAnswer) {
                option.classList.add('correct');
            } else if (option.dataset.answer === this.selectedOption && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
    }

    showTypingFeedback(question, isCorrect) {
        if (isCorrect) {
            this.answerInput.classList.add('border-green-500');
            this.answerInput.classList.remove('border-red-500');
        } else {
            this.answerInput.classList.add('border-red-500');
            this.answerInput.classList.remove('border-green-500');
            setTimeout(() => {
                this.answerInput.value = question.correctAnswer;
            }, 500);
        }
    }

    addMistake(question) {
        const mistake = {
            hiragana: question.hiragana,
            correctAnswer: question.correctAnswer,
            userAnswer: this.selectedOption,
            timestamp: new Date().toISOString()
        };
        this.currentTestMistakes.push(mistake);
    }

    showResults() {
        this.testInProgress = false;
        
        if (this.currentTestMistakes.length > 0) {
            const mistakes = JSON.parse(localStorage.getItem('hiragana_mistakes') || '[]');
            const updatedMistakes = [...mistakes, ...this.currentTestMistakes];
            localStorage.setItem('hiragana_mistakes', JSON.stringify(updatedMistakes));
        }
        
        this.scoreDisplay.textContent = `${this.score}/${this.testQuestions.length}`;
        const percentage = (this.score / this.testQuestions.length) * 100;
        
        this.resultMessage.textContent = this.getResultMessage(percentage);
        if (this.currentTestMistakes.length > 0) {
            this.resultMessage.textContent += ` Check the Review tab to practice your mistakes.`;
        }
        
        this.resultsModal.classList.remove('hidden');
    }

    getResultMessage(percentage) {
        if (percentage >= 90) return "Excellent! You've mastered these Hiragana!";
        if (percentage >= 70) return "Good job! You're making great progress.";
        if (percentage >= 50) return "Not bad! Keep practicing to improve.";
        return "Keep practicing! You'll get better with time.";
    }

    retryTest() {
        this.resultsModal.classList.add('hidden');
        this.startTest();
    }

    closeResults() {
        this.resultsModal.classList.add('hidden');
    }
}

// Quick Reflex Game Class
class QuickReflexGame {
    constructor() {
        this.reflexQuestions = [];
        this.currentReflexIndex = 0;
        this.reflexScore = 0;
        this.reflexTimer_interval = null;
        this.reflexTimeLeft = 3;
        this.reflexMistakes = [];
        this.reflexInProgress = false;
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.startReflexBtn = document.getElementById('startReflexBtn');
        this.reflexGameContainer = document.getElementById('reflexGameContainer');
        this.reflexResults = document.getElementById('reflexResults');
        this.reflexCharacter = document.getElementById('reflexCharacter');
        this.reflexInput = document.getElementById('reflexInput');
        this.reflexTimer = document.getElementById('reflexTimer');
        this.reflexTimeBar = document.getElementById('reflexTimeBar');
        this.reflexProgress = document.getElementById('reflexProgress');
        this.skipReflexBtn = document.getElementById('skipReflexBtn');
        this.reflexCorrect = document.getElementById('reflexCorrect');
        this.reflexIncorrect = document.getElementById('reflexIncorrect');
        this.reflexResultMessage = document.getElementById('reflexResultMessage');
        this.retryReflexBtn = document.getElementById('retryReflexBtn');
        this.closeReflexBtn = document.getElementById('closeReflexBtn');
    }

    bindEvents() {
        this.startReflexBtn.addEventListener('click', () => this.startQuickReflex());
        this.reflexInput.addEventListener('keypress', (e) => this.handleKeyPress(e));
        this.skipReflexBtn.addEventListener('click', () => this.skipReflexQuestion());
        this.retryReflexBtn.addEventListener('click', () => this.retryReflex());
        this.closeReflexBtn.addEventListener('click', () => this.resetQuickReflex());
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    resetQuickReflex() {
        this.startReflexBtn.classList.remove('hidden');
        this.reflexGameContainer.classList.add('hidden');
        this.reflexResults.classList.add('hidden');
        
        const progressDisplay = document.getElementById('reflexProgressDisplay');
        if (progressDisplay) progressDisplay.textContent = `0/${hiraganaData.length}`;
        
        this.reflexTimer.textContent = '3';
        this.reflexTimeBar.style.width = '100%';
        this.reflexTimeBar.style.background = 'linear-gradient(90deg, #10b981, #059669)';
        
        this.reflexInput.classList.remove('border-green-500', 'border-red-500');
        this.reflexInput.value = '';
    }

    startQuickReflex() {
        this.reflexQuestions = this.shuffleArray([...hiraganaData]);
        this.currentReflexIndex = 0;
        this.reflexScore = 0;
        this.reflexMistakes = [];
        this.reflexInProgress = true;
        
        this.startReflexBtn.classList.add('hidden');
        this.reflexGameContainer.classList.remove('hidden');
        this.reflexResults.classList.add('hidden');
        
        this.showReflexQuestion();
    }

    showReflexQuestion() {
        if (this.currentReflexIndex >= this.reflexQuestions.length) {
            this.showReflexResults();
            return;
        }
        
        const question = this.reflexQuestions[this.currentReflexIndex];
        
        this.reflexCharacter.textContent = question.hiragana;
        this.reflexCharacter.parentElement.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.reflexCharacter.parentElement.style.transform = 'scale(1)';
        }, 100);
        
        this.reflexInput.value = '';
        this.reflexInput.classList.remove('border-green-500', 'border-red-500');
        this.reflexInput.focus();
        
        if (this.reflexProgress) {
            this.reflexProgress.textContent = `Question ${this.currentReflexIndex + 1} of ${this.reflexQuestions.length}`;
        }
        
        this.startReflexTimer();
    }

    startReflexTimer() {
        this.reflexTimeLeft = 3.0;
        this.reflexTimer.textContent = '3';
        this.reflexTimeBar.style.width = '100%';
        this.reflexTimeBar.style.backgroundColor = '#10b981';
        
        this.reflexTimer_interval = setInterval(() => {
            this.reflexTimeLeft -= 0.05;
            
            const displayTime = Math.max(0, Math.ceil(this.reflexTimeLeft));
            this.reflexTimer.textContent = displayTime;
            
            const percentage = Math.max(0, (this.reflexTimeLeft / 3) * 100);
            this.reflexTimeBar.style.width = `${percentage}%`;
            
            if (this.reflexTimeLeft <= 1) {
                this.reflexTimeBar.style.backgroundColor = '#ef4444';
            } else if (this.reflexTimeLeft <= 2) {
                this.reflexTimeBar.style.backgroundColor = '#f59e0b';
            }
            
            if (this.reflexTimeLeft <= 0) {
                clearInterval(this.reflexTimer_interval);
                this.reflexTimer.textContent = '0';
                this.reflexTimeBar.style.width = '0%';
                this.handleReflexTimeout();
            }
        }, 50);
    }

    handleReflexTimeout() {
        const question = this.reflexQuestions[this.currentReflexIndex];
        this.reflexMistakes.push({
            hiragana: question.hiragana,
            correctAnswer: question.romaji,
            userAnswer: 'timeout',
            timestamp: new Date().toISOString()
        });
        
        this.reflexInput.value = question.romaji;
        this.reflexInput.classList.add('border-red-500');
        
        setTimeout(() => {
            this.nextReflexQuestion();
        }, 1000);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && this.reflexInProgress) {
            this.checkReflexAnswer();
        }
    }

    checkReflexAnswer() {
        if (!this.reflexInProgress) return;
        
        clearInterval(this.reflexTimer_interval);
        const question = this.reflexQuestions[this.currentReflexIndex];
        const userAnswer = this.reflexInput.value.trim().toLowerCase();
        
        if (userAnswer === question.romaji) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer(question, userAnswer);
        }
        
        setTimeout(() => {
            this.nextReflexQuestion();
        }, 1200);
    }

    handleCorrectAnswer() {
        this.reflexScore++;
        this.reflexInput.classList.add('border-green-500');
        this.reflexInput.classList.remove('border-red-500');
        
        this.reflexCharacter.parentElement.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        this.reflexCharacter.parentElement.style.transform = 'scale(1.1)';
        
        const checkmark = document.createElement('div');
        checkmark.innerHTML = '<i class="fas fa-check text-white text-2xl"></i>';
        checkmark.className = 'absolute top-2 right-2 bg-green-500 rounded-full w-8 h-8 flex items-center justify-center animate-bounce';
        this.reflexCharacter.parentElement.appendChild(checkmark);
    }

    handleIncorrectAnswer(question, userAnswer) {
        this.reflexMistakes.push({
            hiragana: question.hiragana,
            correctAnswer: question.romaji,
            userAnswer: userAnswer,
            timestamp: new Date().toISOString()
        });
        
        this.reflexInput.value = question.romaji;
        this.reflexInput.classList.add('border-red-500');
        this.reflexInput.classList.remove('border-green-500');
        
        this.reflexCharacter.parentElement.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        this.reflexCharacter.parentElement.style.transform = 'scale(1.1)';
        
        const xmark = document.createElement('div');
        xmark.innerHTML = '<i class="fas fa-times text-white text-2xl"></i>';
        xmark.className = 'absolute top-2 right-2 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center animate-bounce';
        this.reflexCharacter.parentElement.appendChild(xmark);
    }

    nextReflexQuestion() {
        this.reflexInput.classList.remove('border-green-500', 'border-red-500');
        
        this.reflexCharacter.parentElement.style.background = 'linear-gradient(135deg, #7c3aed, #4338ca)';
        this.reflexCharacter.parentElement.style.transform = 'scale(1)';
        
        const feedbackIcons = this.reflexCharacter.parentElement.querySelectorAll('.absolute');
        feedbackIcons.forEach(icon => {
            if (icon !== this.reflexCharacter.parentElement.querySelector('.animate-ping')) {
                icon.remove();
            }
        });
        
        this.currentReflexIndex++;
        this.showReflexQuestion();
    }

    skipReflexQuestion() {
        if (!this.reflexInProgress) return;
        
        clearInterval(this.reflexTimer_interval);
        const question = this.reflexQuestions[this.currentReflexIndex];
        this.reflexMistakes.push({
            hiragana: question.hiragana,
            correctAnswer: question.romaji,
            userAnswer: 'skipped',
            timestamp: new Date().toISOString()
        });
        
        this.nextReflexQuestion();
    }

    showReflexResults() {
        this.reflexInProgress = false;
        
        if (this.reflexMistakes.length > 0) {
            const mistakes = JSON.parse(localStorage.getItem('hiragana_mistakes') || '[]');
            const updatedMistakes = [...mistakes, ...this.reflexMistakes];
            localStorage.setItem('hiragana_mistakes', JSON.stringify(updatedMistakes));
        }
        
        this.reflexGameContainer.classList.add('hidden');
        this.reflexResults.classList.remove('hidden');
        
        this.reflexCorrect.textContent = this.reflexScore;
        this.reflexIncorrect.textContent = this.reflexQuestions.length - this.reflexScore;
        
        const percentage = (this.reflexScore / this.reflexQuestions.length) * 100;
        this.reflexResultMessage.textContent = this.getReflexResultMessage(percentage);
        
        if (this.reflexMistakes.length > 0) {
            this.reflexResultMessage.textContent += ` Check the Review tab to practice your mistakes.`;
        }
    }

    getReflexResultMessage(percentage) {
        if (percentage >= 90) return "Amazing reflexes! You're a Hiragana master!";
        if (percentage >= 70) return "Great job! Your reflexes are getting better.";
        if (percentage >= 50) return "Good effort! Keep practicing to improve your speed.";
        return "Don't worry! Speed comes with practice.";
    }

    retryReflex() {
        this.resetQuickReflex();
        this.startQuickReflex();
    }
}

// Review Manager Class
class ReviewManager {
    constructor(flashcardManager) {
        this.flashcardManager = flashcardManager;
        this.mistakes = JSON.parse(localStorage.getItem('hiragana_mistakes') || '[]');
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.mistakesContainer = document.getElementById('mistakesContainer');
        this.noMistakesMessage = document.getElementById('noMistakesMessage');
        this.clearMistakesBtn = document.getElementById('clearMistakesBtn');
    }

    bindEvents() {
        this.clearMistakesBtn.addEventListener('click', () => this.clearAllMistakes());
    }

    displayMistakes() {
        this.mistakes = JSON.parse(localStorage.getItem('hiragana_mistakes') || '[]');
        
        if (this.mistakes.length === 0) {
            this.noMistakesMessage.classList.remove('hidden');
            this.mistakesContainer.innerHTML = '';
            this.mistakesContainer.appendChild(this.noMistakesMessage);
            return;
        }
        
        this.noMistakesMessage.classList.add('hidden');
        this.mistakesContainer.innerHTML = '';
        
        const groupedMistakes = this.groupMistakesByHiragana();
        
        Object.values(groupedMistakes).forEach(mistakeGroup => {
            const mistakeCard = this.createMistakeCard(mistakeGroup);
            this.mistakesContainer.appendChild(mistakeCard);
        });
        
        this.bindPracticeButtons();
    }

    groupMistakesByHiragana() {
        const groupedMistakes = {};
        this.mistakes.forEach(mistake => {
            if (!groupedMistakes[mistake.hiragana]) {
                groupedMistakes[mistake.hiragana] = {
                    hiragana: mistake.hiragana,
                    correctAnswer: mistake.correctAnswer,
                    attempts: []
                };
            }
            groupedMistakes[mistake.hiragana].attempts.push({
                userAnswer: mistake.userAnswer,
                timestamp: mistake.timestamp
            });
        });
        return groupedMistakes;
    }

    createMistakeCard(mistakeGroup) {
        const mistakeCard = document.createElement('div');
        mistakeCard.className = 'bg-gray-700 rounded-lg p-4 border border-red-500/30';
        mistakeCard.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-4">
                    <span class="text-4xl font-bold text-red-400">${mistakeGroup.hiragana}</span>
                    <div>
                        <p class="text-green-400 font-medium">Correct: ${mistakeGroup.correctAnswer}</p>
                        <p class="text-gray-400 text-sm">Mistakes: ${mistakeGroup.attempts.length}</p>
                    </div>
                </div>
                <button class="practice-btn px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all duration-300" data-hiragana="${mistakeGroup.hiragana}" data-romaji="${mistakeGroup.correctAnswer}">
                    Practice
                </button>
            </div>
            <div class="text-sm text-gray-400">
                Recent attempts: ${mistakeGroup.attempts.slice(-3).map(attempt => attempt.userAnswer).join(', ')}
            </div>
        `;
        return mistakeCard;
    }

    bindPracticeButtons() {
        document.querySelectorAll('.practice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const hiragana = e.target.dataset.hiragana;
                const romaji = e.target.dataset.romaji;
                this.practiceSpecificCharacter(hiragana, romaji);
            });
        });
    }

    practiceSpecificCharacter(hiragana, romaji) {
        // Switch to flashcard mode and show specific character
        const flashcardTab = document.getElementById('flashcardTab');
        const flashcardSection = document.getElementById('flashcardSection');
        
        // Use the tab switching function
        if (window.tabManager) {
            window.tabManager.switchTab(flashcardTab, flashcardSection);
        }
        
        // Find the character in the data
        const charIndex = hiraganaData.findIndex(item => item.hiragana === hiragana);
        if (charIndex !== -1 && this.flashcardManager) {
            this.flashcardManager.goToCard(charIndex);
        }
    }

    clearAllMistakes() {
        if (confirm('Are you sure you want to clear all mistakes? This action cannot be undone.')) {
            this.mistakes = [];
            localStorage.removeItem('hiragana_mistakes');
            this.displayMistakes();
        }
    }
}

// Tab Manager Class
class TabManager {
    constructor(testManager, quickReflexGame, reviewManager) {
        this.testManager = testManager;
        this.quickReflexGame = quickReflexGame;
        this.reviewManager = reviewManager;
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.flashcardTab = document.getElementById('flashcardTab');
        this.testTab = document.getElementById('testTab');
        this.quickReflexTab = document.getElementById('quickReflexTab');
        this.reviewTab = document.getElementById('reviewTab');
        this.flashcardSection = document.getElementById('flashcardSection');
        this.testSection = document.getElementById('testSection');
        this.quickReflexSection = document.getElementById('quickReflexSection');
        this.reviewSection = document.getElementById('reviewSection');
    }

    bindEvents() {
        this.flashcardTab.addEventListener('click', () => {
            this.switchTab(this.flashcardTab, this.flashcardSection);
        });

        this.testTab.addEventListener('click', () => {
            this.switchTab(this.testTab, this.testSection);
            this.testManager.startTest();
        });

        this.quickReflexTab.addEventListener('click', () => {
            this.switchTab(this.quickReflexTab, this.quickReflexSection);
            this.quickReflexGame.resetQuickReflex();
        });

        this.reviewTab.addEventListener('click', () => {
            this.switchTab(this.reviewTab, this.reviewSection);
            this.reviewManager.displayMistakes();
        });
    }

    switchTab(activeTab, activeSection) {
        // Hide all sections
        this.flashcardSection.classList.add('hidden');
        this.testSection.classList.add('hidden');
        this.quickReflexSection.classList.add('hidden');
        this.reviewSection.classList.add('hidden');
        
        // Reset all tabs
        [this.flashcardTab, this.testTab, this.quickReflexTab, this.reviewTab].forEach(tab => {
            tab.classList.remove('bg-gradient-to-r', 'from-indigo-600', 'to-indigo-700', 'text-white', 'shadow-md');
            tab.classList.add('text-gray-300');
        });
        
        // Activate selected tab and section
        activeSection.classList.remove('hidden');
        activeTab.classList.add('bg-gradient-to-r', 'from-indigo-600', 'to-indigo-700', 'text-white', 'shadow-md');
        activeTab.classList.remove('text-gray-300');
        
        // Stop any auto flip if switching away from flashcards
        if (activeSection !== this.flashcardSection && window.flashcardManager) {
            window.flashcardManager.stopAutoFlip();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all managers
    window.flashcardManager = new FlashcardManager();
    window.testManager = new TestManager();
    window.quickReflexGame = new QuickReflexGame();
    window.reviewManager = new ReviewManager(window.flashcardManager);
    window.tabManager = new TabManager(window.testManager, window.quickReflexGame, window.reviewManager);
    
    console.log('Hiragana Learning Tool initialized successfully!');
});