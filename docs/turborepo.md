# Turborepo 주요 기능 활용

이 문서에서는 Turborepo의 강력한 기능인 **Pruning**과 **원격 캐싱(Remote Caching)**을 활용하는 방법을 설명합니다.

## 🚀 배포 (Pruning)

Turborepo의 `prune` 기능을 사용하면 특정 애플리케이션(`host` 등)을 빌드하고 배포하는 데 필요한 최소한의 파일만 추출할 수 있습니다. 이는 Docker 이미지를 최적화하거나, 특정 패키지만 독립적으로 배포할 때 매우 유용합니다.

### `host` 애플리케이션 Pruning 방법

1.  **Prune 스크립트 실행**

    프로젝트 루트에서 다음 명령어를 실행하여 `host` 애플리케이션과 의존성을 `out` 디렉터리로 추출합니다.

    ```bash
    turbo prune --scope=host --out-dir=out
    ```

2.  **결과 확인**

    명령이 성공적으로 실행되면, 프로젝트 루트에 `out` 디렉터리가 생성됩니다. 이 디렉터리에는 다음과 같은 구조로 파일이 정리됩니다.

    -   `out/full/`: `host` 애플리케이션을 빌드하는 데 필요한 모든 소스 코드
    -   `out/package.json`: Pruned된 모노레포의 `package.json`
    -   `out/pnpm-lock.yaml`: Pruned된 모노레포의 `pnpm-lock.yaml`

3.  **의존성 설치 및 빌드**

    `out` 디렉터리 내부에서 의존성을 설치하고 애플리케이션을 빌드할 수 있습니다.

    ```bash
    cd out
    pnpm install
    pnpm build
    ```

이제 `out` 디렉터리는 `host` 애플리케이션을 실행하는 데 필요한 모든 것을 갖춘 독립적인 프로젝트가 됩니다.

> **참고**: `prune` 명령이 예상대로 동작하지 않을 경우, Turborepo의 버전과 `pnpm`과의 호환성 문제를 확인해볼 필요가 있습니다.

## ⚡️ 원격 캐싱 (Remote Caching)

원격 캐싱은 팀원들과 CI/CD 환경에서 빌드 및 테스트 결과를 공유하여 시간을 획기적으로 단축하는 기능입니다. 한 번 빌드된 결과물은 Vercel의 원격 캐시 저장소에 저장되고, 다른 환경에서는 빌드를 실행하는 대신 결과물을 다운로드하여 사용합니다.

### 원격 캐싱 설정 방법

1.  **Vercel 계정 로그인**

    터미널에서 Vercel CLI에 로그인합니다.

    ```bash
    npx vercel login
    ```

2.  **Turborepo 원격 캐시 연결**

    프로젝트를 Vercel의 원격 캐시와 연결합니다.

    ```bash
    npx turbo link
    ```

    명령을 실행하면 Vercel 대시보드로 이동하여 새로운 Scope를 생성하거나 기존 Scope에 연결할 수 있습니다. 연결이 완료되면 `.turbo/config.json` 파일이 생성됩니다.

3.  **빌드 실행**

    이제 평소처럼 빌드 명령을 실행합니다.

    ```bash
    pnpm build
    ```

    첫 빌드 결과는 원격 캐시에 업로드됩니다. 이후 동일한 코드 베이스에서 다른 팀원이나 CI가 빌드를 실행하면, 로컬에서 빌드하는 대신 캐시된 결과물을 다운로드하여 사용하므로 빌드 시간이 크게 단축됩니다.

    원격 캐시가 사용되었는지 확인하려면 터미널 출력에서 `REMOTE`라는 표시를 찾을 수 있습니다.
