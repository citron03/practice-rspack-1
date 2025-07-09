# practice-rspack-1
rspack을 통해서 mfa를 연습 해보는 레포

## 🧩 Rspack Module Federation + Zustand Shared Store 예제

이 프로젝트는 **Rspack 기반 Module Federation** 구조에서 `zustand` 상태를 **싱글톤으로 공유**하는 예제입니다.

## 📦 프로젝트 구조

mf-zustand-shared/
├── host/ # 메인 앱
├── remote/ # 외부 모듈 (zustand store, Counter 컴포넌트 제공)
├── shared/ # 공통 store.ts


## ▶️ 실행 방법

### 1. 의존성 설치

루트에서 모든 패키지 설치:

```bash
npm install
```

2. 앱 실행
```bash
npm run dev
```
- remote (3001), host (3000)에서 각각 실행합니다.

✅ 결과 확인

브라우저에서 http://localhost:3000 접속 시

Shared Count와 Remote Counter가 동기화됨

zustand store가 완전히 공유됨

