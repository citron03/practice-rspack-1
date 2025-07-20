# Docker 가이드

이 문서는 프로젝트의 Docker 환경을 설정하고 실행하는 방법을 안내합니다.

## 사전 요구 사항

- [Docker](https://www.docker.com/get-started)가 설치되어 있어야 합니다.

## 아키텍처

이 프로젝트는 Docker Compose를 사용하여 여러 개의 컨테이너화된 애플리케이션을 관리합니다.

-   **`host`**: 메인 애플리케이션 (포트 `8080`에서 실행)
-   **`remote`**: `host` 애플리케이션에 의해 동적으로 로드되는 원격 모듈 (포트 `8081`에서 실행)
-   **`vanilla-remote`**: `host` 애플리케이션에 의해 동적으로 로드되는 순수 JavaScript 원격 모듈 (포트 `8082`에서 실행)

각 애플리케이션은 자체 `Dockerfile`을 가지고 있으며, 멀티-스테이지 빌드를 사용하여 프로덕션용 경량 Nginx 이미지를 생성합니다.

## 실행 방법

1.  **Docker 이미지 빌드 및 컨테이너 실행:**

    프로젝트 루트 디렉토리에서 다음 명령어를 실행하여 모든 서비스를 빌드하고 시작합니다.

    ```bash
    docker-compose up --build
    ```

    `-d` 플래그를 추가하면 백그라운드에서 컨테이너를 실행할 수 있습니다.

    ```bash
    docker-compose up --build -d
    ```

2.  **애플리케이션 접속:**

    -   Host App: [http://localhost:8080](http://localhost:8080)
    -   Remote App (직접 접속용): [http://localhost:8081](http://localhost:8081)
    -   Vanilla Remote App (직접 접속용): [http://localhost:8082](http://localhost:8082)

    일반적으로 `host` 애플리케이션에만 접속하면, `host`가 다른 원격 애플리케이션들을 동적으로 로드합니다.

## 컨테이너 중지

실행 중인 모든 Docker 컨테이너를 중지하려면 다음 명령어를 사용합니다.

```bash
docker-compose down
```

볼륨까지 삭제하려면 `-v` 옵션을 추가합니다.

```bash
docker-compose down -v
```

## 개별 서비스 관리

`docker-compose` 명령어를 사용하여 특정 서비스를 빌드하거나 실행할 수도 있습니다.

```bash
# host 서비스만 빌드하고 실행
docker-compose up --build host

# remote 서비스만 재시작
docker-compose restart remote
```
