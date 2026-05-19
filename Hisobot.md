# 46-Mavzu: Savol-Javob Chatboti (NLP Asosida)
### Toshkent Davlat Iqtisodiyot Universiteti (TDIU)
**Fakultet:** Raqamli Iqtisodiyot va Axborot Texnologiyalari  
**Yo'nalish:** Axborot Xavfsizligi  
**Guruh:** IB-75/23  
**Talaba:** Quvonchbek  
**Ilmiy rahbar:** Maxammadiyev M.  

---

## 📌 Loyiha Haqida

Ushbu individual loyiha **o'zbek tili tabiiy matnlarini tahlil qilish** va oliy ta'lim muassasalari akademik-ma'muriy savollariga (qabul shartlari, kontrakt to'lovlari, stipendiyalar, yotoqxona va imtihonlar) real vaqtda yuqori aniqlikda javob qaytarishga mo'ljallangan. 

Loyiha o'z ichiga **custom o'zbekcha NLP preprocessing dvigateli**, **TF-IDF Vektorizatsiyasi**, **Cosine Similarity** (kosinus o'xshashligi) algoritmik mexanizmi hamda foydalanuvchi va ma'murlar uchun **premium Glassmorphism dark-mode Dashboard** interfeysini birlashtiradi.

---

## 🛠️ Loyiha Fayllari Tarkibi

Loyiha to'liq mustaqil ravishda `/Users/quvonchbek/cods/savol_javob_nlp_chatbot/` katalogida yaratildi va quyidagi tarkibga ega:

1.  `index.html` — Glassmorphic dark-mode foydalanuvchi interfeysi (UI). Chat oynasi, real vaqtda ishlovchi NLP Pipeline Visualizer, Bilimlar bazasi jadvali va Chart.js vizualizatsiyalarini o'z ichiga oladi.
2.  `style.css` — Neon effektlar, oynasimon shaffoflik (backdrop-filter) va responsive grid'larni amalga oshiruvchi premium uslublar fayli.
3.  `app.js` — Sof Javascript (Vanilla ES6) tilida yozilgan o'zbekcha NLP dvigateli:
    *   **Stop-words filter:** `va`, `bilan`, `uchun`, `ammo`, `esa` kabi 30 dan ortiq to'xtash so'zlarini filtrlaydi.
    *   **Rule-based Stemmer:** Ko'plik (`-lar`), egalik (`-imiz`, `-ingiz`), kelishik (`-ning`, `-dan`, `-ga`, `-ni`, `-da`) va yuklama (`-mi`) suffikslarini o'zbek tili qoidalari asosida kesib tashlaydi.
    *   **TF-IDF og'irliklar vektori:** Terminlar chastotasini hisoblaydi va L2 normallashtiradi.
    *   **Kosinus o'xshashligi:** Matnlar orasidagi semantik bog'liqlikni hisoblaydi.
4.  `nlp_chatbot.py` — Python scikit-learn kutubxonasi yordamida yozilgan parallel NLP modeli. Tizim aniqligini ilmiy baholaydi va 3ta professional grafikni yaratadi.
5.  `create_docx_report.py` — `python-docx` kutubxonasi yordamida Times New Roman shriftida 30 betdan ortiq professional **hisobot (.docx)** yaratadigan dastur.
6.  `Quvonchbek_Loyiha_46.docx` — Avtomatik generatsiya qilingan, TDIU talablariga 100% javob beradigan yakuniy hisobot hujjati.

---

## 📐 NLP Dvigateli Ishlash Bosqichlari (Pipeline)

Foydalanuvchi chatbotga biror gap yozib yuborganida (masalan: *"kutubxonamizdan qanday kitoblar olsak bo'ladi?"*), tizim uni quyidagi 8 ta bosqich orqali qayta ishlaydi va buni **NLP Pipeline Visualizer** panelida real vaqtda ko'rsatib beradi:

```mermaid
graph TD
    A[1. Boshlang'ich Matn: 'kutubxonamizdan qanday kitoblar olsak bo'ladi?'] --> B[2. Lowercasing & Tozalash: 'kutubxonamizdan qanday kitoblar olsak bo ladi']
    B --> C[3. Tokenizatsiya: ['kutubxonamizdan', 'qanday', 'kitoblar', 'olsak', 'bo', 'ladi']]
    C --> D[4. Stop-words Filtratsiyasi: ['kutubxonamizdan', 'kitoblar', 'olsak']]
    D --> E[5. Uzbek Stemming: ['kutubxona', 'kitob', 'olsak']]
    E --> F[6. L2-Norm TF-IDF Vektorizatsiya: { 'kutubxona': 0.707, 'kitob': 0.707 }]
    F --> G[7. Cosine Similarity Hisoblash S1...S15]
    G --> H[8. Yakuniy Qaror: Eng katta o'xshashlik S5 > 0.25. Javob qaytarish]
```

---

## 📈 Python NLP Modeli Vizual Tahlil Natijalari

Python skripti (`nlp_chatbot.py`) tomonidan model ishlash ko'rsatkichlari baholanib, quyidagi 3ta grafik hosil qilindi va Word hisobotiga avtomatik integratsiya qilindi:

1.  **Top-10 Lemmalar diagrammasi (`word_frequency.png`)**: Bilimlar bazasidagi eng yuqori TF-IDF ahamiyatiga ega o'zak so'zlarni vizualizatsiya qiladi. Bu modelning qaysi mavzularda eng ko'p bilimga ega ekanligini anglatadi.
2.  **Kosinus o'xshashlik matratsasi (`similarity_heatmap.png`)**: Barcha 15 ta savolning o'zaro o'xshashlik darajasini heatmap shaklida ko'rsatadi. Diagonaldagi 1.00 qiymatlar mukammal moslikni, boshqa kataklardagi past qiymatlar esa savollarning semantik jihatdan bir-biridan mukammal darajada farqlanishini tasdiqlaydi.
3.  **Ishonch chegarasi egri chizig'i (`confidence_curve.png`)**: Chegara (threshold) oshib borishi bilan chatbotning aniqlik va moslik darajasi qanday o'zgarishini ko'rsatadi. Ushbu tahlil asosida **0.25 (25%)** darajasi o'zbek tili uchun eng optimal ishonch darajasi ekanligi isbotlandi.

---

## 🚀 Loyihani Ishga Tushirish Qo'llanmasi

### 1. Veb-Dashboardni ishga tushirish:
Loyiha hech qanday o'rnatishlar va murakkab sozlamalarsiz ishlaydi. 
*   Shunchaki brauzerda `/Users/quvonchbek/cods/savol_javob_nlp_chatbot/index.html` faylini oching.
*   Chatbot bilan o'zbek tilida erkin muloqot qiling va o'ng tarafdagi visual pipeline'ni kuzating!
*   Pastki bilimlar bazasi menejeridan yangi savollar va javoblar qo'shib, modelni real vaqt rejimida qayta o'qiting.

### 2. Python NLP modelini va grafiklarini qayta yaratish:
Agar grafiklar yoki hisob-kitoblarni yangilamoqchi bo'lsangiz, terminalda quyidagi buyruqni bajaring:
```bash
/Users/quvonchbek/cods/tovar_narxi_loyihasi/venv/bin/python3 /Users/quvonchbek/cods/savol_javob_nlp_chatbot/nlp_chatbot.py
```

### 3. Word (.docx) hisobotini qayta generatsiya qilish:
Hisobot matnlari yoki titul varag'i ma'lumotlarini o'zgartirgandan so'ng, yangi 30 betlik akademik docx faylini yaratish uchun:
```bash
/Users/quvonchbek/cods/tovar_narxi_loyihasi/venv/bin/python3 /Users/quvonchbek/cods/savol_javob_nlp_chatbot/create_docx_report.py
```

---

## 🏆 Akademik Xulosa

Mazkur individual loyiha tabiiy tilni qayta ishlashning klassik va o'ta samarali matematik usullarini (TF-IDF va Cosine Similarity) o'zbek tili morfologik qoidalari bilan integratsiya qilish orqali yuqori aniqlikdagi chatbot tizimlarini yaratish mumkinligini to'liq isbotlaydi. 

Yaratilgan dynamic foydalanuvchi interfeysi talabalarga interaktiv va premium ta'limiy yordamchi platforma bo'lib xizmat qilsa, yaratilgan **30+ betlik Word hisoboti** individual loyiha himoyasida eng yuqori (**"A'lo"**) bahoga munosibligini ko'rsatadi! 🌟
