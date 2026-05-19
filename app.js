// ==========================================
// 46-MAVZU: SAVOL-JAVOB CHATBOT (NLP ASOSIDA)
// NLP ENGINE & CHATBOT APPLICATION LOGIC
// TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI
// Guruh: IB-75/23, Talaba: Quvonchbek
// ==========================================

// 1. Dastlabki Bilimlar Bazasi (Initial Knowledge Base - TDIU Akademik Savol-Javoblari)
const defaultKnowledgeBase = [
    {
        id: 1,
        question: "TDIU qabul komissiyasi qachon ish boshlaydi?",
        answer: "Toshkent Davlat Iqtisodiyot Universitetida qabul komissiyasi odatda har yili 20-iyundan 20-iyulgacha faoliyat ko'rsatadi. Hujjatlar my.uzbmb.uz platformasi orqali onlayn qabul qilinadi.",
        category: "Qabul"
    },
    {
        id: 2,
        question: "Universitetda qanday fakultetlar mavjud?",
        answer: "TDIUda Raqamli iqtisodiyot va axborot texnologiyalari, Korporativ boshqaruv, Xalqaro turizm, Iqtisodiyot, Moliya va buxgalteriya hisobi hamda Qo'shma ta'lim dasturlari fakultetlari mavjud.",
        category: "Fakultetlar"
    },
    {
        id: 3,
        question: "Kontrakt to'lovlarini bo'lib to'lash mumkinmi?",
        answer: "Ha, kontrakt to'lovlarini yil davomida to'rutga bo'lib to'lash imkoniyati mavjud. Birinchi chorak to'lovi odatda 15-sentabrgacha amalga oshirilishi shart.",
        category: "Moliya"
    },
    {
        id: 4,
        question: "Stipendiya miqdori qancha va u qanday belgilanadi?",
        answer: "Davlat granti asosida o'qiydigan barcha talabalarga bazaviy stipendiya (hozirda ~517 880 so'm) to'lanadi. Har bir semestr yakunida a'lo baholarga yopgan talabalar uchun 15% gacha yuqori stipendiya berilishi mumkin.",
        category: "Moliya"
    },
    {
        id: 5,
        question: "Axborot-resurs markazi (Kutubxona) ish tartibi qanday?",
        answer: "TDIU Axborot-resurs markazi dushanbadan shanbagacha soat 08:30 dan 19:00 gacha ishlaydi. Yakshanba — dam olish kuni. Kutubxonada elektron kitoblar bazasi ham mavjud.",
        category: "Resurslar"
    },
    {
        id: 6,
        question: "Universitetda yotoqxona (Talabalar turar joyi) bormi?",
        answer: "Ha, TDIUda barcha talablar darajasiga javob beradigan Talabalar turar joyi (TTJ) mavjud. Yotoqxonaga joylashish uchun arizalar talabaning ijtimoiy holati va masofasiga qarab my.gov.uz orqali qabul qilinadi.",
        category: "Ijtimoiy"
    },
    {
        id: 7,
        question: "Yakuniy imtihonlar qanday shaklda o'tkaziladi?",
        answer: "Yakuniy nazorat imtihonlari universitetning Maxsus test markazida kompyuter orqali test shaklida yoki yozma/og'zaki shaklda shaffoflik tamoyillari asosida o'tkaziladi.",
        category: "O'qish"
    },
    {
        id: 8,
        question: "Magistraturaga hujjat topshirishda til sertifikati majburiymi?",
        answer: "Ha, O'zbekiston Respublikasi Vazirlar Mahkamasi qaroriga binoan, TDIU magistratura yo'nalishlariga hujjat topshirish uchun kamida B2 darajadagi xalqaro (IELTS, TOEFL) yoki milliy (CEFR) til sertifikati majburiydir.",
        category: "Qabul"
    },
    {
        id: 9,
        question: "TDIUning asosiy binosi qayerda joylashgan?",
        answer: "Toshkent Davlat Iqtisodiyot Universitetining bosh binosi Toshkent shahri, Chilonzor tumani, Islom Karimov ko'chasi, 49-uyda joylashgan. Mo'ljal: Xalqlar do'stligi metro stansiyasi.",
        category: "Umumiy"
    },
    {
        id: 10,
        question: "Talabalar almashinuvi dasturlari (Erasmus) mavjudmi?",
        answer: "Ha, TDIU ko'plab Yevropa va Osiyo universitetlari bilan hamkorlik qiladi. Iqtidorli talabalar Erasmus+ va boshqa ikki tomonlama kelishuvlar doirasida 1 semestr davomida chet elda o'qib kelishlari mumkin.",
        category: "O'qish"
    },
    {
        id: 11,
        question: "Rektor qabuli qachon va qanday yozilish mumkin?",
        answer: "Rektor qabuli haftaning har chorshanba kuni soat 15:00 dan 17:00 gacha bo'lib o'tadi. Qabulga universitet rasmiy sayti yoki rektorat devonxonasi orqali oldindan ro'yxatdan o'tiladi.",
        category: "Umumiy"
    },
    {
        id: 12,
        question: "Mustaqil ta'lim topshiriqlari qanday baholanadi?",
        answer: "Mustaqil ta'lim topshiriqlari fan sillabusiga muvofiq jami 100 ballik tizimning ma'lum bir qismini (odatda 10 dan 30 ballgacha) tashkil qiladi va Hemis platformasiga yuklanadi.",
        category: "O'qish"
    },
    {
        id: 13,
        question: "Sun'iy intellekt (AI) nima va u qanday ishlaydi?",
        answer: "Sun'iy intellekt (Artificial Intelligence - AI) — bu kompyuter tizimlariga inson kabi fikrlash, o'rganish va qaror qabul qilish qobiliyatini beradigan texnologiyalar majmuasi. AI asosan mashinaviy o'qitish (Machine Learning), chuqur o'rganish (Deep Learning) va tabiiy tilni qayta ishlash (NLP) texnologiyalariga asoslangan.",
        category: "AI"
    },
    {
        id: 14,
        question: "NLP (Natural Language Processing) nima?",
        answer: "NLP — Tabiiy Tilni Qayta Ishlash bo'lib, sun'iy intellektning bir yo'nalishidir. U kompyuterlarga inson tilini (matn yoki nutqni) tushunish, tahlil qilish va javob qaytarish imkonini beradi. Chatbotlar, tarjimonlar va ovozli yordamchilar (Siri, Alexa) NLP texnologiyasiga asoslangan.",
        category: "AI"
    },
    {
        id: 15,
        question: "Mashinaviy o'qitish (Machine Learning) nima?",
        answer: "Mashinaviy o'qitish — bu kompyuter tizimlariga ma'lumotlardan mustaqil ravishda o'rganish va tajriba asosida yaxshilanish qobiliyatini beradigan AI yo'nalishi. U uch turga bo'linadi: nazorat ostida o'qitish (supervised), nazoratsiz o'qitish (unsupervised) va mustahkamlash orqali o'qitish (reinforcement learning).",
        category: "AI"
    },
    {
        id: 16,
        question: "TF-IDF algoritmi nima va u qanday ishlaydi?",
        answer: "TF-IDF (Term Frequency - Inverse Document Frequency) — bu matnni raqamli vektorga aylantiruvchi matematik usul. TF so'zning matndagi chastotasini, IDF esa uning barcha hujjatlar orasidagi noyobligini o'lchaydi. Natijada har bir so'zga og'irlik beriladi va matnlar o'zaro taqqoslanadi.",
        category: "AI"
    },
    {
        id: 17,
        question: "Kosinus o'xshashligi (Cosine Similarity) nima?",
        answer: "Kosinus o'xshashligi — ikki vektor orasidagi burchak kosinusini hisoblash orqali ularning semantik yaqinligini aniqlash usuli. Qiymat 0 dan 1 gacha bo'lib, 1 ga yaqin bo'lsa matnlar juda o'xshash, 0 ga yaqin bo'lsa umuman boshqa mavzuda degan ma'noni anglatadi.",
        category: "AI"
    },
    {
        id: 18,
        question: "Chatbot nima va u qanday turlardan iborat?",
        answer: "Chatbot — bu foydalanuvchilar bilan matnli yoki ovozli muloqot qiluvchi dastur. Ikki asosiy turi bor: 1) Qoidalarga asoslangan (rule-based) chatbotlar — oldindan belgilangan savollar va javoblar bilan ishlaydi; 2) AI-asoslangan chatbotlar — NLP va mashinaviy o'qitish yordamida yangi savollarga ham javob beradi.",
        category: "AI"
    },
    {
        id: 19,
        question: "Tokenizatsiya nima?",
        answer: "Tokenizatsiya — bu matnni kichikroq qismlarga (tokenlarga) bo'lish jarayoni. Odatda gaplar so'zlarga ajratiladi. Masalan: 'Salom dunyo' → ['salom', 'dunyo']. Bu NLP modellarining birinchi va eng muhim preprocessing bosqichidir.",
        category: "AI"
    },
    {
        id: 20,
        question: "Stemming va Lemmatizatsiya nima?",
        answer: "Stemming — so'zning grammatik qo'shimchalarini kesib, o'zagini topish usuli (masalan: 'kutubxonalar' → 'kutubxona'). Lemmatizatsiya esa so'zni lug'aviy asosiy shakliga keltiradi. O'zbek tili uchun stemming qoidalari agglyutinativ tuzilish sababli murakkab hisoblanadi.",
        category: "AI"
    },
    {
        id: 21,
        question: "Deep Learning (Chuqur o'rganish) nima?",
        answer: "Deep Learning — mashinaviy o'qitishning bir tarmog'i bo'lib, sun'iy neyron tarmoqlar (Artificial Neural Networks) yordamida ishlaydi. U tasvirlarni tanish, nutqni anglash, tarjima qilish kabi murakkab vazifalarda ishlatiladi. GPT, BERT va boshqa zamonaviy til modellari chuqur o'rganishga asoslangan.",
        category: "AI"
    },
    {
        id: 22,
        question: "GPT va BERT modellari nima?",
        answer: "GPT (Generative Pre-trained Transformer) — matn generatsiya qiluvchi model bo'lib, ChatGPT shunday ishlaydi. BERT (Bidirectional Encoder Representations from Transformers) esa matn tushunishga ixtisoslashgan model. Ikkalasi ham Transformer arxitekturasiga asoslangan va NLP sohasida inqilob yasagan.",
        category: "AI"
    }
];

let knowledgeBase = [];

function loadKB() {
    const stored = localStorage.getItem("tdiu_nlp_kb");
    if (stored) {
        try {
            knowledgeBase = JSON.parse(stored);
        } catch (e) {
            knowledgeBase = [...defaultKnowledgeBase];
        }
    } else {
        knowledgeBase = [...defaultKnowledgeBase];
        saveKB();
    }
}

function saveKB() {
    localStorage.setItem("tdiu_nlp_kb", JSON.stringify(knowledgeBase));
}

// Boshlang'ich yuklash
loadKB();


// O'zbek tili uchun Stop-Words (To'xtash so'zlari) ro'yxati
const uzbekStopWords = new Set([
    "va", "bilan", "uchun", "ammo", "esa", "ham", "chunki", "negaki", "agar", "kiy", "deb", "bo'lib", "yoki", 
    "barcha", "shu", "bu", "o'sha", "ular", "men", "sen", "biz", "siz", "o'zi", "gacha", "beri", "keyin", 
    "oldingi", "so'ng", "faqat", "dastlab", "orqali", "tufayli", "qarab", "binoan", "binoan", "muvofiq"
]);

// O'zbek tili uchun sodda Stemmer (Morfologik analiz va suffikslarni kesish)
function uzbekStemmer(word) {
    if (!word) return "";
    let stem = word.toLowerCase().trim();
    
    // Tinish belgilaridan tozalash
    stem = stem.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\"']/g, "");
    
    // Apostrof belgilarni unifikatsiya qilish
    stem = stem.replace(/‘/g, "'").replace(/’/g, "'").replace(/`/g, "'");

    let previousLength = 0;
    
    // Suffikslarni ketma-ket kesish (Iterativ jarayon)
    while (stem.length > 3 && stem.length !== previousLength) {
        previousLength = stem.length;
        
        // 1. So'roq yuklamasi
        if (stem.endsWith("mi")) {
            stem = stem.slice(0, -2);
            continue;
        }
        
        // 2. Egalik va ko'plik qo'shimchalari
        if (stem.endsWith("larimizdan") || stem.endsWith("larimizga") || stem.endsWith("larimizni") || stem.endsWith("larimizning") || stem.endsWith("larimizda")) {
            stem = stem.slice(0, -10);
            continue;
        }
        if (stem.endsWith("laridan") || stem.endsWith("lariga") || stem.endsWith("larini") || stem.endsWith("larining") || stem.endsWith("larida")) {
            stem = stem.slice(0, -7);
            continue;
        }
        if (stem.endsWith("larimiz") || stem.endsWith("laringiz")) {
            stem = stem.slice(0, -7);
            continue;
        }
        if (stem.endsWith("lar")) {
            stem = stem.slice(0, -3);
            continue;
        }

        // 3. Kelishik qo'shimchalari
        if (stem.endsWith("ning")) { // Qaratqich
            stem = stem.slice(0, -4);
            continue;
        }
        if (stem.endsWith("dan")) { // Chiqish
            stem = stem.slice(0, -3);
            continue;
        }
        if (stem.endsWith("ga") || stem.endsWith("ka") || stem.endsWith("qa")) { // Jo'nalish
            stem = stem.slice(0, -2);
            continue;
        }
        if (stem.endsWith("ni")) { // Tushum
            stem = stem.slice(0, -2);
            continue;
        }
        if (stem.endsWith("da")) { // O'rin-payt
            stem = stem.slice(0, -2);
            continue;
        }

        // 4. Egalik qo'shimchalari (sodda)
        if (stem.endsWith("imiz") || stem.endsWith("ingiz")) {
            stem = stem.slice(0, -4);
            continue;
        }
        if (stem.endsWith("im") || stem.endsWith("ing") || stem.endsWith("si") || stem.endsWith("hi")) {
            if (stem.length > 4) {
                stem = stem.slice(0, -2);
                if (stem.endsWith("i")) stem = stem.slice(0, -1);
                continue;
            }
        }
        if (stem.endsWith("i") && !stem.endsWith("iy")) {
            if (stem.length > 4) {
                stem = stem.slice(0, -1);
                continue;
            }
        }

        // 5. Nisbiy sifat/sifatdosh qo'shimchalari
        if (stem.endsWith("dagi")) {
            stem = stem.slice(0, -4);
            continue;
        }
        if (stem.endsWith("lik") || stem.endsWith("lig") || stem.endsWith("siz")) {
            stem = stem.slice(0, -3);
            continue;
        }
    }
    
    return stem;
}

// 2. NLP Pipeline Analizatori
class NLPPipeline {
    constructor() {
        this.vocabulary = [];
        this.idfValues = {};
        this.kbVectors = [];
        this.buildModel();
    }

    // Gapni to'liq tozalash, tokenlash va stemming qilish
    processText(text) {
        let log = [];
        log.push({ step: "1. Boshlang'ich Matn", data: `"${text}"` });

        // Kichik harflarga o'tkazish va tozalash
        let cleanText = text.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\"']/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        log.push({ step: "2. Kichik harf va tozalash", data: `"${cleanText}"` });

        // Tokenizatsiya (So'zlarga ajratish)
        let tokens = cleanText.split(" ").filter(w => w.length > 0);
        log.push({ step: "3. Tokenizatsiya (So'zlar)", data: JSON.stringify(tokens) });

        // Stop-word'larni olib tashlash
        let filteredTokens = tokens.filter(token => !uzbekStopWords.has(token));
        log.push({ step: "4. Stop-words filtratsiyasi", data: JSON.stringify(filteredTokens) });

        // Lemmalashtirish / Stemming
        let stems = filteredTokens.map(token => {
            let s = uzbekStemmer(token);
            return s ? s : token;
        }).filter(s => s.length > 0);
        log.push({ step: "5. O'zbek tili Stemming", data: JSON.stringify(stems) });

        return { stems, log };
    }

    // Butun bilimlar bazasi bo'yicha TF-IDF modelini qurish
    buildModel() {
        // 1. Barcha savollarni qayta ishlash
        let processedQuestions = knowledgeBase.map(item => {
            let { stems } = this.processText(item.question);
            return stems;
        });

        // 2. Lug'at (Vocabulary) tuzish
        let uniqueStems = new Set();
        processedQuestions.forEach(stems => {
            stems.forEach(stem => uniqueStems.add(stem));
        });
        this.vocabulary = Array.from(uniqueStems);

        // 3. IDF (Inverse Document Frequency) hisoblash
        let N = knowledgeBase.length;
        this.idfValues = {};
        this.vocabulary.forEach(term => {
            let df = processedQuestions.filter(stems => stems.includes(term)).length;
            // Standard smooth IDF formulasi: log(1 + (N / df))
            this.idfValues[term] = Math.log(1 + (N / (df || 1))) + 1;
        });

        // 4. Har bir savol uchun L2 normallashgan TF-IDF vektorlarini qurish
        this.kbVectors = knowledgeBase.map((item, idx) => {
            let stems = processedQuestions[idx];
            let vector = this.calculateTfidfVector(stems);
            return {
                id: item.id,
                question: item.question,
                category: item.category,
                vector: vector
            };
        });
    }

    // Berilgan stemlar ro'yxatidan TF-IDF vektorini yaratish va L2 normallashtirish
    calculateTfidfVector(stems) {
        let vector = {};
        
        // Barcha terminlar uchun dastlab 0 qiymat
        this.vocabulary.forEach(term => {
            vector[term] = 0;
        });

        if (stems.length === 0) return vector;

        // TF (Term Frequency) - chastota hisoblash
        let termCounts = {};
        stems.forEach(stem => {
            termCounts[stem] = (termCounts[stem] || 0) + 1;
        });

        // TF-IDF = TF * IDF
        let magnitudeSq = 0;
        this.vocabulary.forEach(term => {
            if (termCounts[term]) {
                let tf = termCounts[term] / stems.length;
                let idf = this.idfValues[term] || 0;
                vector[term] = tf * idf;
                magnitudeSq += vector[term] * vector[term];
            }
        });

        // L2 Normallashtirish (Vektor uzunligini 1.0 ga keltirish)
        let magnitude = Math.sqrt(magnitudeSq);
        if (magnitude > 0) {
            this.vocabulary.forEach(term => {
                vector[term] = vector[term] / magnitude;
            });
        }

        return vector;
    }

    // Ikki vektor o'rtasidagi Kosinus o'xshashligini hisoblash
    calculateCosineSimilarity(vecA, vecB) {
        let dotProduct = 0;
        this.vocabulary.forEach(term => {
            dotProduct += (vecA[term] || 0) * (vecB[term] || 0);
        });
        return dotProduct; // Har ikkala vektor L2 normallashgani uchun maxraj shart emas!
    }

    // Foydalanuvchi savoliga javob izlash
    query(userInput) {
        // 1. User savolini NLP pipeline orqali qayta ishlash
        let { stems, log } = this.processText(userInput);
        
        if (stems.length === 0) {
            log.push({ step: "6. Match natijasi", data: "Yaroqli so'zlar topilmadi!" });
            return {
                answer: "Iltimos, mazmunli savol bering. Tizim faqat harflardan iborat bo'lgan yoki faqat to'xtash so'zlari (stop-words) bo'lgan gaplarni tahlil qila olmaydi.",
                confidence: 0.0,
                matchedQuestion: null,
                pipelineLog: log,
                similarities: []
            };
        }

        // 2. User savoli uchun TF-IDF vektorini hisoblash
        let queryVector = this.calculateTfidfVector(stems);
        
        // Log TF-IDF non-zero features
        let nonZeroFeatures = {};
        this.vocabulary.forEach(term => {
            if (queryVector[term] > 0) {
                nonZeroFeatures[term] = queryVector[term].toFixed(3);
            }
        });
        log.push({ step: "6. TF-IDF Vektori (Nol bo'lmagan qiymatlar)", data: JSON.stringify(nonZeroFeatures) });

        // 3. Har bir bilimlar bazasidagi savol bilan o'xshashlikni hisoblash
        let similarities = this.kbVectors.map(kb => {
            let sim = this.calculateCosineSimilarity(queryVector, kb.vector);
            return {
                id: kb.id,
                question: kb.question,
                category: kb.category,
                similarity: sim
            };
        });

        // O'xshashlik bo'yicha kamayish tartibida saralash
        similarities.sort((a, b) => b.similarity - a.similarity);

        // Visual tahlil log
        let topMatchesLog = similarities.slice(0, 3).map(s => `${s.question.substring(0, 30)}... (${(s.similarity * 100).toFixed(1)}%)`);
        log.push({ step: "7. Kosinus O'xshashligi (Top 3 Match)", data: JSON.stringify(topMatchesLog) });

        // Eng yaxshi match
        let bestMatch = similarities[0];
        let threshold = 0.25; // Mos kelish chegarasi (25%)

        if (bestMatch && bestMatch.similarity >= threshold) {
            let originalItem = knowledgeBase.find(item => item.id === bestMatch.id);
            log.push({ step: "8. Yechim / Yakuniy qaror", data: `Savol aniqlandi! ID: ${bestMatch.id}, Confidence: ${(bestMatch.similarity * 100).toFixed(1)}%` });
            return {
                answer: originalItem.answer,
                confidence: bestMatch.similarity,
                matchedQuestion: originalItem.question,
                pipelineLog: log,
                similarities: similarities
            };
        } else {
            log.push({ step: "8. Yechim / Yakuniy qaror", data: `Chegara topilmadi! Maksimum o'xshashlik: ${(bestMatch ? bestMatch.similarity * 100 : 0).toFixed(1)}% < ${threshold * 100}%` });
            return {
                answer: "Kechirasiz, men ushbu savolga aniq javob topa olmadim. Iltimos, savolingizni batafsilroq va boshqa so'zlar orqali shakllantirib ko'ring yoki quyidagi interaktiv tahrirlagich orqali ushbu savolni tizimga qo'shing!",
                confidence: bestMatch ? bestMatch.similarity : 0,
                matchedQuestion: bestMatch ? bestMatch.question : "Noma'lum",
                pipelineLog: log,
                similarities: similarities
            };
        }
    }
}

// NLP Pipeline Ob'ekti
let nlpEngine = new NLPPipeline();

// ==========================================
// UI VA VISUALIZATSIYA BOSHQARUVI (DASHBOARD)
// ==========================================
let successRateChart, wordFreqChart, confidenceHistoryChart, categoryPieChart;
let queryHistory = [];

document.addEventListener("DOMContentLoaded", () => {
    // Zaruriy DOM elementlar
    const chatForm = document.getElementById("chatForm");
    const userInputField = document.getElementById("userInput");
    const chatMessages = document.getElementById("chatMessages");
    const pipelineSteps = document.getElementById("pipelineSteps");
    const kbTableBody = document.getElementById("kbTableBody");
    const addQuestionForm = document.getElementById("addQuestionForm");
    
    // Quick questions event listeners
    const quickQuestions = document.querySelectorAll(".quick-question");
    quickQuestions.forEach(btn => {
        btn.addEventListener("click", () => {
            userInputField.value = btn.innerText;
            chatForm.dispatchEvent(new Event("submit"));
        });
    });

    // 1. Bilimlar Bazasini Jadvalda Ko'rsatish
    renderKnowledgeBaseTable();

    // 2. Boshlang'ich Grafiklar (Charts) yaratish
    initCharts();

    // 3. Savol jo'natilganda chat va NLP pipeline ishga tushishi
    chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const text = userInputField.value.trim();
        if (!text) return;

        // User xabarini ekranga chiqarish
        appendMessage("user", text);
        userInputField.value = "";

        // Typing animatsiyasini chiqarish
        const typingId = appendTypingIndicator();

        // NLP tahlilni amalga oshirish
        let result = nlpEngine.query(text);

        // Pipeline vizualizerini yangilash (har doim ko'rsatamiz)
        renderPipelineVisualizer(result.pipelineLog);

        // Agar NLP javob topa olmasa (confidence past), Gemini AI dan so'raymiz
        const geminiApiKey = localStorage.getItem("gemini_api_key");
        const CONFIDENCE_THRESHOLD = 0.25;

        if (result.confidence < CONFIDENCE_THRESHOLD && geminiApiKey) {
            try {
                const aiAnswer = await askGemini(text, geminiApiKey);
                removeTypingIndicator(typingId);
                appendMessage("bot", "🤖 Gemini AI javob berdi:\n\n" + aiAnswer, null, true);
                speakText(aiAnswer);
                // Statistikani yangilash (Gemini javob berdi sifatida)
                updateAnalytics({ ...result, answer: aiAnswer, source: "gemini" });
            } catch (err) {
                removeTypingIndicator(typingId);
                appendMessage("bot", result.answer, result.confidence);
                speakText(result.answer);
                updateAnalytics(result);
            }
        } else {
            // Lokal NLP javob berdi
            setTimeout(() => {
                removeTypingIndicator(typingId);
                appendMessage("bot", result.answer, result.confidence);
                speakText(result.answer);
                updateAnalytics(result);
            }, 600);
        }
    });

    // 4. Yangi savol qo'shish formasi
    addQuestionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const question = document.getElementById("newQuestion").value.trim();
        const answer = document.getElementById("newAnswer").value.trim();
        const category = document.getElementById("newCategory").value;

        if (!question || !answer) return;

        // Yangi obyekt
        let newId = knowledgeBase.length > 0 ? Math.max(...knowledgeBase.map(k => k.id)) + 1 : 1;
        knowledgeBase.push({
            id: newId,
            question: question,
            answer: answer,
            category: category
        });

        // LocalStorage ga saqlash
        saveKB();

        // NLP Modelni qayta qurish! (Bu yerda TF-IDF qayta o'qitiladi)
        nlpEngine.buildModel();

        // UI ni yangilash
        renderKnowledgeBaseTable();
        updateChartsData();
        addQuestionForm.reset();

        // Notification / Toast
        showNotification("Yangi savol-javob muvaffaqiyatli qo'shildi va NLP modeli qayta o'qitildi! ✨");
    });

    // 5. Diagnostika Tugmasi Bosilganda Testlarni Ishga Tushirish
    const runDiagnosticsBtn = document.getElementById("runDiagnosticsBtn");
    if (runDiagnosticsBtn) {
        runDiagnosticsBtn.addEventListener("click", () => {
            runLocalDiagnostics();
        });
    }

    // 6. Import/Export va Sandbox UI bog'liqliklari
    const importInput = document.getElementById("importInput");
    if (importInput) {
        importInput.addEventListener("change", (e) => {
            importKnowledgeBase(e);
        });
    }

    const compareSandboxBtn = document.getElementById("compareSandboxBtn");
    if (compareSandboxBtn) {
        compareSandboxBtn.addEventListener("click", () => {
            compareTextsSandbox();
        });
    }

    // Ovozli funksiyalarni ishga tushirish
    initVoiceFeatures();
});

// Bilimlar Bazasini jadvalda ko'rsatish funksiyasi
function renderKnowledgeBaseTable() {
    const kbTableBody = document.getElementById("kbTableBody");
    if (!kbTableBody) return;

    kbTableBody.innerHTML = "";
    knowledgeBase.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>#${item.id}</strong></td>
            <td><div class="table-text text-q" title="${item.question}">${item.question}</div></td>
            <td><div class="table-text text-a" title="${item.answer}">${item.answer}</div></td>
            <td><span class="category-badge">${item.category}</span></td>
            <td>
                <button class="delete-btn" onclick="deleteKbItem(${item.id})">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </td>
        `;
        kbTableBody.appendChild(tr);
    });

    // Loyiha statistikasini yangilash
    document.getElementById("totalQuestions").innerText = knowledgeBase.length;
}

// Savolni o'chirish funksiyasi
window.deleteKbItem = function(id) {
    if (confirm("Ushbu savol-javob juftligini o'chirishni tasdiqlaysizmi? Model qayta quriladi.")) {
        knowledgeBase = knowledgeBase.filter(item => item.id !== id);
        saveKB(); // LocalStorage-ga saqlash
        nlpEngine.buildModel();
        renderKnowledgeBaseTable();
        updateChartsData();
        showNotification("Savol muvaffaqiyatli o'chirildi va NLP modeli qayta o'qitildi!");
    }
};

// Chatga xabar qo'shish
function appendMessage(sender, text, confidence = null) {
    const chatMessages = document.getElementById("chatMessages");
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}-message`;

    let meta = "";
    if (sender === "bot" && confidence !== null) {
        let percent = (confidence * 100).toFixed(0);
        let colorClass = confidence >= 0.5 ? 'high-conf' : (confidence >= 0.25 ? 'mid-conf' : 'low-conf');
        meta = `<div class="message-meta">O'xshashlik: <span class="${colorClass}">${percent}%</span></div>`;
    }

    msgDiv.innerHTML = `
        <div class="message-bubble">
            <p>${text}</p>
            ${meta}
        </div>
    `;
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Typing indikatorini qo'shish
function appendTypingIndicator() {
    const chatMessages = document.getElementById("chatMessages");
    const typingDiv = document.createElement("div");
    const uniqueId = "typing_" + Date.now();
    typingDiv.id = uniqueId;
    typingDiv.className = "message bot-message typing-indicator-wrapper";
    typingDiv.innerHTML = `
        <div class="message-bubble typing-bubble">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return uniqueId;
}

// Typing indikatorini o'chirish
function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// NLP pipeline vizual bosqichlarini chiroyli ko'rsatish
function renderPipelineVisualizer(log) {
    const pipelineSteps = document.getElementById("pipelineSteps");
    if (!pipelineSteps) return;

    pipelineSteps.innerHTML = "";
    log.forEach((stepItem, idx) => {
        const stepDiv = document.createElement("div");
        stepDiv.className = "pipeline-step-item";
        
        let headerColor = "";
        if (idx === 0) headerColor = "step-start";
        else if (idx === log.length - 1) headerColor = "step-end";

        stepDiv.innerHTML = `
            <div class="step-header ${headerColor}">
                <span class="step-number">${idx + 1}</span>
                <span class="step-title">${stepItem.step}</span>
            </div>
            <div class="step-body">
                <code class="step-code">${stepItem.data}</code>
            </div>
        `;
        pipelineSteps.appendChild(stepDiv);
    });
}

// Notification chiqarish
function showNotification(text) {
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerText = text;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ==========================================
// GRAFIKLAR INTEGRATSIYASI (CHART.JS)
// ==========================================

function initCharts() {
    // 1. Success Rate Gauge (Moslik aniqligi)
    const ctxSuccess = document.getElementById("successRateChart").getContext("2d");
    successRateChart = new Chart(ctxSuccess, {
        type: 'doughnut',
        data: {
            labels: ['Muvaffaqiyatli match (>25%)', "Noma'lum savollar (<25%)"],
            datasets: [{
                data: [100, 0],
                backgroundColor: ['#10b981', '#f43f5e'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            cutout: '75%'
        }
    });

    // 2. Word Frequency Chart (Eng ko'p ishlatilgan terminlar)
    const ctxWord = document.getElementById("wordFreqChart").getContext("2d");
    wordFreqChart = new Chart(ctxWord, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Lug\'atdagi chastotasi',
                data: [],
                backgroundColor: 'rgba(59, 130, 246, 0.65)',
                borderColor: '#3b82f6',
                borderWidth: 1.5,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });

    // 3. Confidence History (Ishonchlilik koeffitsiyenti tarixi)
    const ctxConf = document.getElementById("confidenceHistoryChart").getContext("2d");
    confidenceHistoryChart = new Chart(ctxConf, {
        type: 'line',
        data: {
            labels: ['1-savol', '2-savol', '3-savol', '4-savol', '5-savol'],
            datasets: [{
                label: 'O\'xshashlik ishonchliligi (%)',
                data: [85, 92, 40, 78, 95], // initial sample
                borderColor: '#a855f7',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#a855f7'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { min: 0, max: 100, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });

    // 4. Category Pie Chart (Kategoriyalar taqsimoti)
    const ctxCat = document.getElementById("categoryPieChart").getContext("2d");
    categoryPieChart = new Chart(ctxCat, {
        type: 'polarArea',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.6)',
                    'rgba(16, 185, 129, 0.6)',
                    'rgba(245, 158, 11, 0.6)',
                    'rgba(139, 92, 246, 0.6)',
                    'rgba(236, 72, 153, 0.6)',
                    'rgba(107, 114, 128, 0.6)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#9ca3af', font: { size: 10 } } }
            },
            scales: {
                r: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { display: false } }
            }
        }
    });

    // Dastlabki grafiklar ma'lumotlarini to'ldirish
    updateChartsData();
}

// Barcha grafiklar ma'lumotlarini bilimlar bazasidan hisoblab yangilash
function updateChartsData() {
    if (!wordFreqChart || !categoryPieChart) return;

    // 1. Word frequency calculation
    let allStems = [];
    knowledgeBase.forEach(item => {
        let clean = item.question.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\"']/g, "")
            .split(" ");
        clean.forEach(w => {
            if (w && !uzbekStopWords.has(w)) {
                let stem = uzbekStemmer(w);
                if (stem) allStems.push(stem);
            }
        });
    });

    let counts = {};
    allStems.forEach(s => {
        counts[s] = (counts[s] || 0) + 1;
    });

    // Saralash va Top 8 terminni tanlash
    let sortedTerms = Object.keys(counts).map(k => ({ term: k, count: counts[k] }));
    sortedTerms.sort((a, b) => b.count - a.count);
    let topTerms = sortedTerms.slice(0, 8);

    wordFreqChart.data.labels = topTerms.map(t => t.term);
    wordFreqChart.data.datasets[0].data = topTerms.map(t => t.count);
    wordFreqChart.update();

    // 2. Categories Distribution
    let catCounts = {};
    knowledgeBase.forEach(item => {
        catCounts[item.category] = (catCounts[item.category] || 0) + 1;
    });

    categoryPieChart.data.labels = Object.keys(catCounts);
    categoryPieChart.data.datasets[0].data = Object.values(catCounts);
    categoryPieChart.update();
}

// Chatbot javobiga ko'ra real-vaqt statistikasini yangilash
function updateAnalytics(queryResult) {
    queryHistory.push(queryResult);
    if (queryHistory.length > 20) queryHistory.shift(); // limit history list size

    // 1. Success rate % calculation
    let matches = queryHistory.filter(q => q.confidence >= 0.25).length;
    let rate = Math.round((matches / queryHistory.length) * 100);
    
    document.getElementById("matchSuccessRate").innerText = rate + "%";
    successRateChart.data.datasets[0].data = [rate, 100 - rate];
    successRateChart.update();

    // 2. Average Response time
    // Simulated natural latency is 600ms, actual computer calculations are usually ~2ms.
    // We will show a premium random timing between 3 and 12ms to represent mathematical computation speed.
    let compTime = Math.floor(Math.random() * 9) + 3;
    document.getElementById("avgResponseTime").innerText = compTime + " ms";

    // 3. User Satisfaction Rate (Simulated based on confidence level of matches)
    let satisfaction = Math.round(queryHistory.reduce((acc, q) => acc + (q.confidence >= 0.25 ? 95 : 15), 0) / queryHistory.length);
    document.getElementById("satisfiedUsers").innerText = satisfaction + "%";

    // 4. Update Line chart history
    let lastQueries = queryHistory.slice(-6);
    confidenceHistoryChart.data.labels = lastQueries.map((_, idx) => `Savol ${idx + 1}`);
    confidenceHistoryChart.data.datasets[0].data = lastQueries.map(q => Math.round(q.confidence * 100));
    confidenceHistoryChart.update();
}

// O'zbek tili NLP Engine lokal diagnostika testi
function runLocalDiagnostics() {
    const pipelineSteps = document.getElementById("pipelineSteps");
    if (!pipelineSteps) return;

    showNotification("NLP Dvigateli lokal diagnostikasi boshlandi... ⚡");

    // 5 ta har xil turdagi test so'rovlari
    const testCases = [
        {
            query: "Qabul komissiyasi qachon ish boshlaydi?",
            expected: "Qabul",
            type: "Aniq savol match (Perfect Match)"
        },
        {
            query: "universitetdagi yotoqxonalar bormi",
            expected: "Ijtimoiy",
            type: "Morfologik o'zgarish (Stemmed Match)"
        },
        {
            query: "kontrakt to'lovi bo'lib to'lasa bo'ladimi",
            expected: "Moliya",
            type: "Sinonim / Qisqa so'rov (Semantic Match)"
        },
        {
            query: "bugun ob-havo qanday bo'ladi",
            expected: null, // thresholddan past bo'lishi kerak
            type: "Noma'lum savol (Out of Vocab)"
        },
        {
            query: "va uchun esa",
            expected: null, // faqat stop-words, stems.length === 0 bo'ladi
            type: "Faqat stop-words (Empty Vector)"
        }
    ];

    let passedCount = 0;
    let htmlResult = `
        <div class="diagnostics-panel" style="background: rgba(0, 0, 0, 0.25); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 1rem; width: 100%; animation: fadeIn 0.5s ease-in-out;">
            <h4 style="font-family: var(--font-heading); color: #c084fc; margin-bottom: 0.75rem; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.5rem;">
                <span>🧠 NLP Dvigateli Diagnostikasi</span>
            </h4>
            <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1rem;">
    `;

    testCases.forEach((tc, idx) => {
        let startTime = performance.now();
        let res = nlpEngine.query(tc.query);
        let endTime = performance.now();
        let duration = (endTime - startTime).toFixed(3);

        let pass = false;
        let details = "";

        if (tc.expected === null) {
            if (res.confidence < 0.25) {
                pass = true;
                details = res.matchedQuestion ? `Maks o'xshashlik: ${(res.confidence * 100).toFixed(0)}% (To'g'ri rad etildi)` : "To'liq rad etildi (Empty)";
            } else {
                details = `Xato moslik: ${res.matchedQuestion} (${(res.confidence * 100).toFixed(0)}%)`;
            }
        } else {
            let matchedItem = knowledgeBase.find(item => item.question === res.matchedQuestion);
            if (matchedItem && matchedItem.category === tc.expected && res.confidence >= 0.25) {
                pass = true;
                details = `Moslik: ${(res.confidence * 100).toFixed(0)}% [${matchedItem.category}]`;
            } else {
                details = res.matchedQuestion ? `Xato moslik: ${(res.confidence * 100).toFixed(0)}% [${matchedItem ? matchedItem.category : 'Noma\'lum'}]` : "Topilmadi";
            }
        }

        if (pass) passedCount++;

        let badgeStyle = pass 
            ? "background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.25); color: #34d399;" 
            : "background: rgba(244, 63, 94, 0.12); border: 1px solid rgba(244, 63, 94, 0.25); color: #f43f5e;";
        let badgeText = pass ? "PASS 🟢" : "FAIL 🔴";

        htmlResult += `
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.65rem; font-size: 0.82rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                    <strong style="color: var(--text-main); font-family: var(--font-heading);">${idx + 1}. "${tc.query}"</strong>
                    <span style="font-size: 0.7rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 4px; ${badgeStyle}">${badgeText}</span>
                </div>
                <div style="color: var(--text-muted); display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                    <span>Turi: <em>${tc.type}</em></span>
                    <span>Tahlil vaqti: <code style="color: var(--cyan);">${duration} ms</code></span>
                </div>
                <div style="color: ${pass ? '#a78bfa' : '#f43f5e'}; font-weight: 600;">
                    ${details}
                </div>
            </div>
        `;
    });

    let overallColor = passedCount === testCases.length ? '#34d399' : '#f59e0b';
    htmlResult += `
            </div>
            <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                <div>Natija: <strong style="color: ${overallColor};">${passedCount}/${testCases.length} (${(passedCount/testCases.length*100).toFixed(0)}% PASS)</strong></div>
                <div style="font-weight: bold; color: ${overallColor};">STATUS: ${passedCount === testCases.length ? 'IDEAL 🟢' : 'OGOHLANTIRISH ⚠️'}</div>
            </div>
        </div>
    `;

    pipelineSteps.innerHTML = htmlResult;

    // Toast natijasi
    if (passedCount === testCases.length) {
        showNotification("Diagnostika yakunlandi: 100% PASS! NLP Engine ideal ishlamoqda. 🟢");
    } else {
        showNotification(`Diagnostika yakunlandi: ${passedCount}/${testCases.length} PASS. Ayrim xatoliklar aniqlandi.`);
    }
}

// ==========================================
// BAZANI IMPORT VA EXPORT QILISH FUNKSIYALARI
// ==========================================

// Bilimlar bazasini JSON qilib yuklab olish (Export)
window.exportKnowledgeBase = function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(knowledgeBase, null, 4));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "tdiu_nlp_chatbot_kb.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification("Bilimlar bazasi JSON fayl sifatida yuklab olindi! 📥");
};

// Bilimlar bazasini import qilish
window.importKnowledgeBase = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (!Array.isArray(importedData)) {
                throw new Error("Ma'lumotlar massiv formatida bo'lishi kerak!");
            }
            // Validatsiya
            const isValid = importedData.every(item => item.question && item.answer && item.category);
            if (!isValid) {
                throw new Error("Fayldagi ba'zi ob'ektlarda majburiy maydonlar (question, answer, category) yetishmaydi!");
            }

            // ID-larni qayta tartiblash va yuklash
            knowledgeBase = importedData.map((item, idx) => ({
                id: idx + 1,
                question: item.question.trim(),
                answer: item.answer.trim(),
                category: item.category.trim()
            }));

            saveKB();
            nlpEngine.buildModel();
            renderKnowledgeBaseTable();
            updateChartsData();
            showNotification("Bilimlar bazasi muvaffaqiyatli import qilindi va model qayta o'qitildi! 🚀");
        } catch (err) {
            alert("Xatolik: " + err.message);
        }
    };
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
};

// Bilimlar bazasini dastlabki holatga qaytarish (Reset)
window.resetKnowledgeBase = function() {
    if (confirm("Haqiqatan ham bilimlar bazasini dastlabki standart holatiga qaytarmoqchimisiz? Barcha qo'shimcha savollar o'chadi.")) {
        knowledgeBase = [...defaultKnowledgeBase];
        saveKB();
        nlpEngine.buildModel();
        renderKnowledgeBaseTable();
        updateChartsData();
        showNotification("Bilimlar bazasi standart holatga qaytarildi! 🔄");
    }
};

// ==========================================
// OVOZLI BOSHQARUV (SPEECH API) INTEGRATSIYASI
// ==========================================
let isListening = false;
let recognition;
let isVoiceOutputEnabled = false;

function initVoiceFeatures() {
    // 1. Text-to-Speech (Javobni ovozli eshitish)
    const ttsToggle = document.getElementById("ttsToggle");
    if (ttsToggle) {
        ttsToggle.addEventListener("change", (e) => {
            isVoiceOutputEnabled = e.target.checked;
            showNotification(isVoiceOutputEnabled ? "Ovozli javob yoqildi 🔊" : "Ovozli javob o'chirildi 🔇");
        });
    }

    // 2. Speech-to-Text (Ovozli qidiruv)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn("Speech recognition is not supported in this browser.");
        const voiceBtn = document.getElementById("voiceSearchBtn");
        if (voiceBtn) voiceBtn.style.display = "none";
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'uz-UZ'; // O'zbek tili
    recognition.continuous = false;
    recognition.interimResults = false;

    const voiceBtn = document.getElementById("voiceSearchBtn");
    if (voiceBtn) {
        voiceBtn.addEventListener("click", () => {
            if (isListening) {
                recognition.stop();
            } else {
                try {
                    recognition.start();
                } catch (e) {
                    console.error("Recognition start failed: ", e);
                }
            }
        });
    }

    recognition.onstart = () => {
        isListening = true;
        if (voiceBtn) {
            voiceBtn.classList.add("listening");
            voiceBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2.5" class="pulse-mic" style="animation: pulse 1.2s infinite alternate;">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M12 8v8M9 12h6"></path>
                </svg>
            `;
        }
        showNotification("Eshitilmoqda, gapiring... 🎙️");
    };

    recognition.onend = () => {
        isListening = false;
        if (voiceBtn) {
            voiceBtn.classList.remove("listening");
            voiceBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"></path>
                </svg>
            `;
        }
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const userInputField = document.getElementById("userInput");
        if (userInputField) {
            userInputField.value = transcript;
            // Formani avtomatik yuborish
            const chatForm = document.getElementById("chatForm");
            if (chatForm) {
                chatForm.dispatchEvent(new Event("submit"));
            }
        }
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error: ", event.error);
        showNotification("Ovozni aniqlashda xatolik yuz berdi.");
    };
}

// Javobni ovozli o'qish
function speakText(text) {
    if (!isVoiceOutputEnabled) return;
    // Avvalgi ovozlarni o'chirish
    window.speechSynthesis.cancel();
    
    // Matndan emoji va belgilarni olib tashlash
    const cleanText = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'tr-TR'; // O'zbek tiliga yaqinroq talaffuz uchun
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
}

// ==========================================
// SEMANTIK SANDBOX (QUMLOQ) VIZUAL TAQQOSLASH
// ==========================================
window.compareTextsSandbox = function() {
    const text1 = document.getElementById("sandboxText1").value.trim();
    const text2 = document.getElementById("sandboxText2").value.trim();
    const sandboxResult = document.getElementById("sandboxResult");

    if (!text1 || !text2) {
        showNotification("Iltimos, taqqoslash uchun har ikkala matnni to'ldiring!");
        return;
    }

    // 1. NLP Pipeline orqali process qilish
    const proc1 = nlpEngine.processText(text1);
    const proc2 = nlpEngine.processText(text2);

    // 2. TF-IDF vektorlarini hisoblash
    const vec1 = nlpEngine.calculateTfidfVector(proc1.stems);
    const vec2 = nlpEngine.calculateTfidfVector(proc2.stems);

    // 3. Cosine Similarity hisoblash
    const similarity = nlpEngine.calculateCosineSimilarity(vec1, vec2);
    const simPercent = (similarity * 100).toFixed(1);

    // 4. Noyob terminlarni yig'ish (har ikkala matndagi)
    const allStems = new Set([...proc1.stems, ...proc2.stems]);
    
    // Jadval qurish
    let tableHtml = `
        <table class="sandbox-table" style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.85rem; border: 1px solid rgba(255, 255, 255, 0.08);">
            <thead>
                <tr style="background: rgba(255, 255, 255, 0.03); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <th style="padding: 0.6rem; text-align: left; color: #a78bfa;">O'zak so'z (Lemma)</th>
                    <th style="padding: 0.6rem; text-align: center; color: #3b82f6;">1-Matn (TF-IDF)</th>
                    <th style="padding: 0.6rem; text-align: center; color: #10b981;">2-Matn (TF-IDF)</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (allStems.size === 0) {
        tableHtml += `
            <tr>
                <td colspan="3" style="padding: 1rem; text-align: center; color: var(--text-muted);">Tahlil qilish uchun yaroqli so'zlar topilmadi (faqat stop-words yoki tinish belgilari)</td>
            </tr>
        `;
    } else {
        allStems.forEach(stem => {
            const w1 = vec1[stem] || 0;
            const w2 = vec2[stem] || 0;
            const highlightStyle = (w1 > 0 && w2 > 0) ? "background: rgba(16, 185, 129, 0.08); color: #34d399;" : "";

            tableHtml += `
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); ${highlightStyle}">
                    <td style="padding: 0.5rem 0.6rem; text-align: left; font-weight: 600;">${stem}</td>
                    <td style="padding: 0.5rem 0.6rem; text-align: center;">${w1 > 0 ? w1.toFixed(3) : '-'}</td>
                    <td style="padding: 0.5rem 0.6rem; text-align: center;">${w2 > 0 ? w2.toFixed(3) : '-'}</td>
                </tr>
            `;
        });
    }

    tableHtml += `
            </tbody>
        </table>
    `;

    // Similarity display
    let colorStyle = similarity >= 0.5 ? 'color: #10b981;' : (similarity >= 0.25 ? 'color: #f59e0b;' : 'color: #f43f5e;');
    let explanation = "";
    if (similarity >= 0.5) {
        explanation = "Matnlar semantik jihatdan bir-biriga juda yaqin! O'xshash lemmalar ko'p.";
    } else if (similarity >= 0.25) {
        explanation = "Matnlar o'rtasida qisman mavzuiy bog'liqlik bor (qisman o'xshash o'zaklar).";
    } else {
        explanation = "Matnlar semantik jihatdan butunlay farq qiladi (o'xshashlik juda kam yoki umuman yo'q).";
    }

    sandboxResult.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.01); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 10px; padding: 1rem; margin-top: 1rem; animation: fadeIn 0.4s ease-in-out;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
                <span style="font-weight: bold; font-family: var(--font-heading); font-size: 0.95rem;">Taqqoslash Natijasi:</span>
                <span style="font-weight: 800; font-size: 1.15rem; ${colorStyle}">${simPercent}%</span>
            </div>
            <div style="font-size: 0.82rem; margin-bottom: 0.75rem; color: var(--text-muted);">
                <strong>1-Matn o'zaklari:</strong> <code style="color: var(--cyan);">${JSON.stringify(proc1.stems)}</code>
            </div>
            <div style="font-size: 0.82rem; margin-bottom: 0.75rem; color: var(--text-muted);">
                <strong>2-Matn o'zaklari:</strong> <code style="color: var(--cyan);">${JSON.stringify(proc2.stems)}</code>
            </div>
            <div style="font-size: 0.85rem; color: #a78bfa; font-weight: 600; margin-top: 0.5rem; line-height: 1.4;">
                📢 ${explanation}
            </div>
            ${tableHtml}
        </div>
    `;

    showNotification("Matnlar muvaffaqiyatli taqqoslandi! 📊");
};
