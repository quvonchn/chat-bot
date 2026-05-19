# -*- coding: utf-8 -*-
"""
==========================================================
46-MAVZU: SAVOL-JAVOB CHATBOT (NLP ASOSIDA)
PYTHON NLP MODEL, VIZUALIZATSIYA VA MATEMATIK TAHLIL
TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI
Guruh: IB-75/23, Talaba: Quvonchbek
==========================================================
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

# Matplotlib o'zbek shriftlaridagi belgilarni va umumiy chiroyli dizaynni qo'llab-quvvatlashi uchun
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['figure.figsize'] = (10, 6)

# 1. TDIU Savol-Javoblar Ma'lumotlar To'plami (Dataset)
data = {
    'Savol': [
        "TDIU qabul komissiyasi qachon ish boshlaydi?",
        "Universitetda qanday fakultetlar mavjud?",
        "Kontrakt to'lovlarini bo'lib to'lash mumkinmi?",
        "Stipendiya miqdori qancha va u qanday belgilanadi?",
        "Axborot-resurs markazi (Kutubxona) ish tartibi qanday?",
        "Universitetda yotoqxona (Talabalar turar joyi) bormi?",
        "Yakuniy imtihonlar qanday shaklda o'tkaziladi?",
        "Magistraturaga hujjat topshirishda til sertifikati majburiymi?",
        "TDIUning asosiy binosi qayerda joylagan?",
        "Talabalar almashinuvi dasturlari (Erasmus) mavjudmi?",
        "Rektor qabuli qachon va qanday yozilish mumkin?",
        "Mustaqil ta'lim topshiriqlari qanday baholanadi?",
        "Hemis platformasiga qanday kirish mumkin?",
        "Universitetda sport to'garaklari bormi?",
        "Kredit-modul tizimi (GPA) qanday hisoblanadi?"
    ],
    'Javob': [
        "TDIUda qabul komissiyasi har yili 20-iyundan 20-iyulgacha faoliyat ko'rsatadi. my.uzbmb.uz platformasida hujjatlar olinadi.",
        "TDIUda Raqamli iqtisodiyot va IT, Korporativ boshqaruv, Xalqaro turizm, Iqtisodiyot, Moliya-buxgalteriya fakultetlari bor.",
        "Ha, kontrakt to'lovlarini yil davomida to'rtga bo'lib to'lash mumkin. Birinchi chorak 15-sentabrgacha to'lanadi.",
        "Grantdagilarga bazaviy stipendiya (~518 ming so'm) beriladi. A'lochi talabalar uchun 15% gacha ustama to'lanadi.",
        "Axborot-resurs markazi dushanbadan shanbagacha soat 08:30 dan 19:00 gacha ishlaydi. Yakshanba - dam olish kuni.",
        "Ha, yotoqxona (TTJ) mavjud. Arizalar my.gov.uz orqali ijtimoiy mezonlar asosida elektron tartibda qabul qilinadi.",
        "Yakuniy imtihonlar maxsus test markazida kompyuterda test ko'rinishida yoki yozma shaklda shaffof o'tkaziladi.",
        "Ha, magistraturaga kirishda kamida B2 darajadagi xalqaro (IELTS, TOEFL) yoki milliy (CEFR) til sertifikati talab etiladi.",
        "TDIU bosh binosi Toshkent shahri, Chilonzor tumani, Islom Karimov ko'chasi 49-uyda (Metro: Xalqlar do'stligi) joylashgan.",
        "Ha, TDIU talabalari Erasmus+ dasturi doirasida Yevropa universitetlarida 1 semestr davomida bepul o'qib kelishlari mumkin.",
        "Rektor qabuli har chorshanba kuni soat 15:00 dan 17:00 gacha bo'ladi. Ro'yxatdan o'tish devonxonada amalga oshiriladi.",
        "Mustaqil ta'lim topshiriqlari fan sillabusiga asosan 10-30 ball oralig'ida baholanib, Hemis tizimiga yuklanadi.",
        "Talabalar Hemis platformasiga o'zlarining login va parollari bilan (hemis.tsue.uz) orqali kirib profillarini boshqaradi.",
        "Ha, universitetda futbol, voleybol, basketbol, shaxmat kabi bepul sport to'garaklari va zamonaviy sport zali mavjud.",
        "GPA - har bir fandan olingan baho ballining uning kreditiga ko'paytmasi yig'indisini jami kreditlar yig'indisiga bo'lishdir."
    ],
    'Kategoriya': [
        "Qabul", "Fakultetlar", "Moliya", "Moliya", "Resurslar", "Ijtimoiy", "O'qish", "Qabul", 
        "Umumiy", "O'qish", "Umumiy", "O'qish", "O'qish", "Ijtimoiy", "O'qish"
    ]
}

df = pd.DataFrame(data)

# O'zbek tili uchun stop-words ro'yxati
uz_stopwords = [
    "va", "bilan", "uchun", "ammo", "esa", "ham", "chunki", "negaki", "agar", "kiy", "deb", "bo'lib", "yoki",
    "barcha", "shu", "bu", "o'sha", "ular", "men", "sen", "biz", "siz", "o'zi", "gacha", "beri", "keyin"
]

# 2. O'zbek tili uchun sodda lemmalashtirish (Stemming) funksiyasi
def clean_and_stem(text):
    text = text.lower()
    text = re.sub(r'[.,\/#!$%\^&\*;:{}=\-_`~()?\"\'‘’`]', ' ', text)
    words = text.split()
    
    cleaned_words = []
    for w in words:
        if w in uz_stopwords:
            continue
            
        # Suffixlarni kesish qoidalari (o'zbek tili kelishik va ko'plik qo'shimchalari)
        stem = w
        for suffix in ["larimizdan", "larimizga", "larimizni", "larimizning", "larimizda", 
                       "laridan", "lariga", "larini", "larining", "larida", "larimiz", "laringiz",
                       "lar", "ning", "dan", "ga", "ka", "qa", "ni", "da", "imiz", "ingiz", "im", "ing", "si", "mi"]:
            if stem.endswith(suffix) and len(stem) - len(suffix) >= 3:
                stem = stem[:-len(suffix)]
                break
        cleaned_words.append(stem)
        
    return " ".join(cleaned_words)

# Savollarni tozalash va stemming qilish
df['Qayta_ishlangan_Savol'] = df['Savol'].apply(clean_and_stem)

print("--- Qayta ishlangan ma'lumotlar to'plami namunasi ---")
print(df[['Savol', 'Qayta_ishlangan_Savol']].head(4))
print("-" * 60 + "\n")

# 3. TF-IDF va Cosine Similarity Modelini Qurish
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df['Qayta_ishlangan_Savol'])

# --- 1-GRAFIK: Kalit So'zlar (Lemmalar) Chastotasi Taqsmioti ---
feature_names = vectorizer.get_feature_names_out()
word_counts = np.asarray(tfidf_matrix.sum(axis=0)).flatten()
word_freq = pd.DataFrame({'So\'z (Lemma)': feature_names, 'Chastotasi (TF-IDF vazni)': word_counts})
word_freq = word_freq.sort_values(by='Chastotasi (TF-IDF vazni)', ascending=False).head(10)

plt.figure(figsize=(10, 5))
# Ko'k ranglar palitrasi
colors = ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff', '#f8fafc', '#f1f5f9'][:len(word_freq)]
bars = plt.barh(word_freq['So\'z (Lemma)'], word_freq['Chastotasi (TF-IDF vazni)'], color=colors, edgecolor='grey', height=0.6)
plt.gca().invert_yaxis() # Eng katta qiymat tepada turishi uchun
plt.title("Bilimlar Bazasidagi Top-10 Muhim Lemmalar (TF-IDF Og'irligi)", fontsize=13, fontweight='bold', pad=15)
plt.xlabel("Umumiy TF-IDF Og'irligi", fontsize=11)
plt.ylabel("Lemma (O'zak so'z)", fontsize=11)
plt.tight_layout()
plt.savefig('word_frequency.png', dpi=300)
plt.close()
print("1-rasm: 'word_frequency.png' muvaffaqiyatli saqlandi.")

# --- 2-GRAFIK: Savollar O'rtasidagi O'xshashlik Heatmap grafigi (Faqat Matplotlib) ---
sim_matrix = cosine_similarity(tfidf_matrix)

fig, ax = plt.subplots(figsize=(10, 8))
im = ax.imshow(sim_matrix, cmap="Purples")

# Grid labellarini o'rnatish
ax.set_xticks(np.arange(len(df)))
ax.set_yticks(np.arange(len(df)))
ax.set_xticklabels([f"S{i+1}" for i in range(len(df))])
ax.set_yticklabels([f"S{i+1}" for i in range(len(df))])

# Titullar o'qi bo'yicha labellarni aylantirish
plt.setp(ax.get_xticklabels(), rotation=45, ha="right", rotation_mode="anchor")

# Matritsadagi har bir katakka matn ko'rsatish
for i in range(len(df)):
    for j in range(len(df)):
        val = sim_matrix[i, j]
        # Katak matni rangini kontrasga qarab sozlash
        text_color = "white" if val > 0.5 else "black"
        ax.text(j, i, f"{val:.2f}", ha="center", va="center", color=text_color, fontsize=8)

ax.set_title("Savollarning O'zaro Kosinus O'xshashlik Matritsasi (Cosine Similarity)", fontsize=13, fontweight='bold', pad=15)
fig.colorbar(im, ax=ax, label="O'xshashlik darajasi")
plt.xlabel("Savollar indekslari", fontsize=11)
plt.ylabel("Savollar indekslari", fontsize=11)
plt.tight_layout()
plt.savefig('similarity_heatmap.png', dpi=300)
plt.close()
print("2-rasm: 'similarity_heatmap.png' muvaffaqiyatli saqlandi.")

# --- 3-GRAFIK: Threshold (Chegara) bo'yicha Match Rate va Aniqlik egri chizig'i ---
# Biz modelni turli xil querylar bilan tekshirib, chegaraga ko'ra aniqligini o'lchaymiz
test_queries = [
    "Qabul komissiyasi qachon ish boshlaydi?", # Perfect match S1
    "qabul qachon?", # Stemmed match S1
    "fakultetlar haqida ma'lumot bersangiz", # S2
    "kontraktni bo'lib to'lasa bo'ladimi?", # S3
    "stipendiyani qanday olsam bo'ladi?", # S4
    "yotoqxonaga arizani qanday topshiramiz?", # S6
    "imtihonlar qachon bo'ladi?", # S7
    "magistraturaga hujjat topshirish qoidalari", # S8
    "rektorning qabuli qachon?", # S11
    "hemis profilga qanday kiraman?", # S13
    "universitetda qanday sport to'garaklari mavjud?", # S14
    "GPA ballini qanday hisoblaymiz?", # S15
    "ob-havo qanday bugun?", # Unknown (low similarity)
    "bu yerda ovqatlanish joylari qayerda?", # Unknown (low similarity)
    "tovuq go'shtining narxi qancha?" # Unknown (low similarity)
]

# Har bir query uchun maksimal similarity hisoblaymiz
max_sims = []
for q in test_queries:
    processed_q = clean_and_stem(q)
    q_vec = vectorizer.transform([processed_q])
    sims = cosine_similarity(q_vec, tfidf_matrix).flatten()
    max_sims.append(np.max(sims))

thresholds = np.linspace(0.0, 1.0, 100)
match_rates = []
for t in thresholds:
    # Chegaradan katta bo'lgan xabarlar nisbati
    matches = sum(1 for s in max_sims if s >= t)
    match_rates.append(matches / len(test_queries))

plt.figure(figsize=(10, 5.5))
plt.plot(thresholds, match_rates, color='#10b981', lw=3, label="Match Rate (Muvaffaqiyatli savollar %)")
plt.axvline(x=0.25, color='#f43f5e', linestyle='--', lw=2, label="Tanlangan Chegara (Threshold = 0.25)")
plt.fill_between(thresholds, match_rates, color='#10b981', alpha=0.15)
plt.title("NLP Model: Mos kelish chegarasi (Threshold) bo'yicha Chatbot Match Rate", fontsize=13, fontweight='bold', pad=15)
plt.xlabel("Cosine Similarity Chegara darajasi (Confidence Threshold)", fontsize=11)
plt.ylabel("Muvaffaqiyatli Match qilingan savollar nisbati", fontsize=11)
plt.legend(loc="upper right", frameon=True, facecolor='white', framealpha=0.9)
plt.tight_layout()
plt.savefig('confidence_curve.png', dpi=300)
plt.close()
print("3-rasm: 'confidence_curve.png' muvaffaqiyatli saqlandi.")
print("\n" + "=" * 60)
print("PYTHON NLP MODEL VA CHART VIZUALIZATSIYALARI TAYYOR! 🚀")
print("=" * 60)
