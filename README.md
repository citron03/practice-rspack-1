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

## 📂 프로젝트 구조

```
/practice-rspack-1
├── host/         # 메인 애플리케이션 (Consumer)
├── remote/       # 원격 모듈 (Provider)
├── shared/       # host와 remote가 공유하는 코드 (e.g., zustand store)
├── .vscode/      # VS Code 에디터 설정 (자동 포맷팅)
├── biome.json    # Biome 설정 파일
├── package.json  # 루트 package.json
├── pnpm-workspace.yaml # pnpm 워크스페이스 설정
└── turbo.json    # Turborepo 파이프라인 설정
```

## 🚀 시작하기

### 1. 의존성 설치

프로젝트 루트에서 다음 명령어를 실행하여 모든 의존성을 설치합니다.

```bash
pnpm install
```

### 2. 개발 서버 실행

모든 패키지(`host`, `remote`)의 개발 서버를 동시에 실행합니다.

```bash
pnpm dev
```

- `host` 애플리케이션은 `http://localhost:3000` 에서 실행됩니다.
- `remote` 애플리케이션은 `http://localhost:3001` 에서 실행됩니다.

브라우저에서 `http://localhost:3000`에 접속하여 결과를 확인할 수 있습니다.

## 🛠️ 주요 명령어

모든 명령어는 프로젝트의 루트 디렉토리에서 실행합니다.

- `pnpm dev`: 모든 애플리케이션의 개발 서버를 실행합니다.
- `pnpm build`: 모든 패키지를 빌드합니다.
- `pnpm lint`: 모든 패키지의 코드를 Biome으로 검사합니다.
- `pnpm lint:fix`: Biome으로 코드 문제를 자동으로 수정합니다. (이 스크립트는 추가가 필요할 수 있습니다.)