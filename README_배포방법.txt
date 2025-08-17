# CEP Profile (Vercel 배포용)

## 1) 로컬 없이 GitHub → Vercel로
1. 이 폴더의 파일들을 그대로 GitHub 새 저장소에 업로드합니다.
2. vercel.com → Add New Project → 해당 저장소 Import
3. Framework: Vite, Build: `npm run build`, Output: `dist`
4. Deploy → 발급된 https://…vercel.app 주소로 접속

## 2) 로컬 실행(선택)
```
npm install
npm run dev
```
