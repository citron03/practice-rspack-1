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
- `pnpm prune`: `host` 애플리케이션을 빌드하는 데 필요한 파일만 `out` 디렉터리에 추출합니다. Docker 이미지 생성 등에 유용합니다.

## 🚀 배포 (Pruning)

Turborepo의 `prune` 기능을 사용하면 특정 애플리케이션(`host` 등)을 빌드하고 배포하는 데 필요한 최소한의 파일만 추출할 수 있습니다. 이는 Docker 이미지를 최적화하거나, 특정 패키지만 독립적으로 배포할 때 매우 유용합니다.

### `host` 애플리케이션 Pruning 방법

1.  **Prune 스크립트 실행**

    프로젝트 루트에서 다음 명령어를 실행합니다.

    ```bash
    pnpm prune
    ```

2.  **결과 확인**

    명령이 성공적으로 실행되면, 프로젝트 루트에 `out` 디렉터리가 생성됩니다. 이 디렉터리에는 `host` 애플리케이션을 빌드하는 데 필요한 모든 소스 코드, `package.json` 파일, 그리고 `pnpm-lock.yaml` 파일의 축소 버전이 포함됩니다.

3.  **의존성 설치 및 빌드**

    `out` 디렉터리 내부에서 의존성을 설치하고 애플리케이션을 빌드할 수 있습니다.

    ```bash
    cd out
    pnpm install
    pnpm build
    ```

이제 `out` 디렉터리는 `host` 애플리케이션을 실행하는 데 필요한 모든 것을 갖춘 독립적인 프로젝트가 됩니다.