// Дауыстық тану функциясы
function startSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        recognition.onstart = function() {
            console.log('Дауыстық тану басталды...');
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            console.log('Танылған сөз: ' + transcript);
            document.getElementById('speech-result').textContent = transcript;
        };
        
        recognition.onerror = function(event) {
            console.error('Қате пайда болды: ' + event.error);
        };
        
        recognition.start();
    } else {
        alert('Браузеріңіз дауыстық тануды қолдамайды');
    }
}

// Сөздік жаттығулары
function initVocabularyExercises() {
    const words = [
        { word: "apple", translation: "алма" },
        { word: "book", translation: "кітап" },
        { word: "computer", translation: "компьютер" }
    ];
    
    // Келесі сөзді көрсету
    function showNextWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        const currentWord = words[randomIndex];
        document.getElementById('current-word').textContent = currentWord.word;
        document.getElementById('word-translation').textContent = currentWord.translation;
        document.getElementById('word-translation').style.display = 'none';
    }
    
    // Аударманы көрсету/жасыру
    document.getElementById('show-translation').addEventListener('click', function() {
        const translation = document.getElementById('word-translation');
        if (translation.style.display === 'none') {
            translation.style.display = 'block';
            this.textContent = 'Аударманы жасыру';
        } else {
            translation.style.display = 'none';
            this.textContent = 'Аударманы көрсету';
        }
    });
    
    // Келесі сөз
    document.getElementById('next-word').addEventListener('click', showNextWord);
    
    // Бастапқы сөзді көрсету
    showNextWord();
}

// DOM жүктелгенде
document.addEventListener('DOMContentLoaded', function() {
    // Дауыстық тану батырмасы
    if (document.getElementById('start-recognition')) {
        document.getElementById('start-recognition').addEventListener('click', startSpeechRecognition);
    }
    
    // Сөздік жаттығулары
    if (document.getElementById('vocabulary-exercise')) {
        initVocabularyExercises();
    }
    
    // Прогресс бар
    if (document.querySelector('.progress-bar')) {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-progress');
            bar.style.width = percent + '%';
            bar.textContent = percent + '%';
        });
    }
});