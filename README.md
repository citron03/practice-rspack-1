# Rspack Module Federation Monorepo 연습

이 프로젝트는 **Rspack**의 Module Federation 기능을 **pnpm workspace**와 **Turborepo**를 사용한 모노레포 환경에서 연습하고, **Biome**을 통해 코드 품질을 관리하는 것을 목표로 합니다.

`host`와 `remote` 애플리케이션 간에 `zustand` 상태 저장소를 공유하는 예제를 포함합니다.

## ✨ 주요 기술 스택

- **Package Manager**: [pnpm](https://pnpm.io/) (workspaces)
- **Monorepo Tool**: [Turborepo](https://turbo.build/)
- **Code Formatter & Linter**: [Biome](https://biomejs.dev/)
- **Bundler**: [Rspack](https://www.rspack.dev/)
- **UI Framework**: [React](https://react.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Module Federation**: Rspack의 [ModuleFederationPlugin](host/rspack.config.js)

## 📂 프로젝트 구조

```
/practice-rspack-1
├── host/             # 메인 애플리케이션 (Consumer, React + MF)
│   ├── src/
│   ├── public/
│   ├── rspack.config.js
│   ├── tsconfig.json
│   └── package.json
├── remote/           # 원격 모듈 (Provider, React + MF)
│   ├── src/
│   ├── rspack.config.js
│   ├── tsconfig.json
│   └── package.json
├── vanilla-remote/   # 바닐라 JS 원격 모듈 (Provider)
│   ├── src/
│   ├── rspack.config.js
│   ├── tsconfig.json
│   └── package.json
├── shared/           # host와 remote가 공유하는 코드 (e.g., zustand store)
│   ├── store.ts
│   ├── tsconfig.json
│   └── package.json
├── .vscode/          # VS Code 에디터 설정 (자동 포맷팅)
├── biome.json        # Biome 설정 파일
├── package.json      # 루트 package.json
├── pnpm-workspace.yaml # pnpm 워크스페이스 설정
├── turbo.json        # Turborepo 파이프라인 설정
└── docs/             # 문서 및 Turborepo 활용법
```

## 🚀 시작하기

### 1. 의존성 설치

프로젝트 루트에서 다음 명령어를 실행하여 모든 의존성을 설치합니다.

```bash
pnpm install
```

### 2. 개발 서버 실행

모든 패키지(`host`, `remote`, `vanilla-remote`)의 개발 서버를 동시에 실행합니다.

```bash
pnpm dev
```

- `host`: http://localhost:3000
- `remote`: http://localhost:3001
- `vanilla-remote`: http://localhost:3003

브라우저에서 `http://localhost:3000`에 접속하여 결과를 확인할 수 있습니다.

## 🛠️ 주요 명령어

모든 명령어는 프로젝트의 루트 디렉토리에서 실행합니다.

- `pnpm dev`: 모든 애플리케이션의 개발 서버를 실행합니다.
- `pnpm build`: 모든 패키지를 빌드합니다.
- `pnpm lint`: 모든 패키지의 코드를 Biome으로 검사합니다.
- `pnpm lint:fix`: Biome으로 코드 문제를 자동으로 수정합니다.
- `pnpm prune`: `host` 애플리케이션을 빌드하는 데 필요한 파일만 `out` 디렉터리에 추출합니다.

## 🚀 배포 (Pruning)

Turborepo의 `prune` 기능을 사용하면 특정 애플리케이션(`host` 등)을 빌드하고 배포하는 데 필요한 최소한의 파일만 추출할 수 있습니다. 이는 Docker 이미지를 최적화하거나, 특정 패키지만 독립적으로 배포할 때 매우 유용합니다.

### `host` 애플리케이션 Pruning 방법

1.  **Prune 스크립트 실행**

    ```bash
    turbo prune --scope=host --out-dir=out
    ```

2.  **결과 확인**

    `out` 디렉터리에 `host` 애플리케이션을 빌드하는 데 필요한 모든 소스 코드, `package.json`, `pnpm-lock.yaml`이 포함됩니다.

3.  **의존성 설치 및 빌드**

    ```bash
    cd out
    pnpm install
    pnpm build
    ```

## ⚡️ 원격 캐싱 (Remote Caching)

Turborepo의 원격 캐싱을 활용하면 빌드 및 테스트 결과를 Vercel의 원격 캐시에 저장하고, 팀원 및 CI 환경에서 빠르게 재사용할 수 있습니다.

### 원격 캐싱 설정 방법

1. Vercel CLI 로그인  
   `npx vercel login`

2. Turborepo 원격 캐시 연결  
   `npx turbo link`

3. 빌드 실행  
   `pnpm build`  
   터미널에서 `REMOTE` 표시가 뜨면 원격 캐시가 정상적으로 동작한 것입니다.

---

자세한 Turborepo 활용법은 [docs/turborepo.md](docs/turborepo.md) 참고.