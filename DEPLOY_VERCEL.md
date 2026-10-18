# tech item – Deployment Guide (Vercel & Cloud Database)

এই প্রজেক্টটি সরাসরি [Vercel](https://vercel.com) অথবা যেকোনো হোস্টিং প্ল্যাটফর্মে হোস্ট করার জন্য প্রস্তুত।

---

### ১. লোকাল বা প্রিভিউতে চালানোর জন্য:
- কোনো এনভায়রনমেন্ট ভেরিয়েবল (API Keys) দেওয়া বাধ্যতামূলক **নয়**।
- সমস্ত প্রজেক্ট ডেটা, কাস্টমার লিডস, ক্লায়েন্ট ফিডব্যাক এবং বিলিং রেকর্ড ব্রাউজারের ভেতর স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে।
- অ্যাডমিন প্যানেল থেকে আপনি যেকোনো সময় **"Download Full Backup (JSON)"** দিয়ে সম্পূর্ণ ডেটা এক্সপোর্ট করে রাখতে পারবেন।

---

### ২. Vercel-এ হোস্ট করার নিয়ম:
1. প্রজেক্টটি আপনার GitHub রিপোজিটরিতে পুশ করুন:
   ```bash
   git init
   git add .
   git commit -m "feat: tech item portfolio release"
   git push origin main
   ```
2. **Vercel Dashboard**-এ গিয়ে **Add New Project** > GitHub রিপোজিটরি নির্বাচন করুন।
3. Framework Preset: **Vite** (স্বয়ংক্রিয়ভাবে ডিটেক্ট হবে)।
4. **Deploy** বাটনে ক্লিক করলেই আপনার সাইট `your-app.vercel.app`-এ লাইভ হয়ে যাবে!

---

### ৩. ভবিষ্যতে Firebase বা MongoDB যোগ করতে চাইলে (ঐচ্ছিক):
যদি আপনি একাধিক ডিভাইস বা রিমোট ডাটাবেসের সাথে রিয়েলটাইম সিঙ্ক করতে চান:
- **Firebase Firestore**: অ্যাডমিন প্যানেলের `Database & Cloud` ট্যাব থেকে প্রজেক্ট আইডি ও এপিআই কি বসাতে পারবেন।
- **MongoDB Atlas**: Vercel Settings > **Environment Variables**-এ গিয়ে `MONGODB_URI` অ্যাড করতে পারেন।
