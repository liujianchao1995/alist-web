# 打包前端文件
FROM node:latest as builderA

WORKDIR /app

COPY . /app
RUN git submodule update --init --recursive

RUN npm install -g pnpm
RUN pnpm install && pnpm build


# 打包可执行文件
FROM golang:latest as builderB

WORKDIR /go/src/app

RUN git clone https://github.com/alist-org/alist.git .

COPY --from=builderA /app/dist /go/src/app/public/dist

RUN appName="alist" \
  builtAt="$(date +'%F %T %z')" \
  goVersion=$(go version | sed 's/go version //') \
  gitAuthor=$(git show -s --format='format:%aN <%ae>' HEAD) \
  gitCommit=$(git log --pretty=format:"%h" -1) \
  version=$(git describe --long --tags --dirty --always) \
  webVersion=$(wget -qO- -t1 -T2 "https://api.github.com/repos/alist-org/alist-web/releases/latest" | grep "tag_name" | head -n 1 | awk -F ":" '{print $2}' | sed 's/\"//g;s/,//g;s/ //g') \
  ldflags="\
  -w -s \
  -X 'github.com/alist-org/alist/v3/internal/conf.BuiltAt=$builtAt' \
  -X 'github.com/alist-org/alist/v3/internal/conf.GoVersion=$goVersion' \
  -X 'github.com/alist-org/alist/v3/internal/conf.GitAuthor=$gitAuthor' \
  -X 'github.com/alist-org/alist/v3/internal/conf.GitCommit=$gitCommit' \
  -X 'github.com/alist-org/alist/v3/internal/conf.Version=$version' \
  -X 'github.com/alist-org/alist/v3/internal/conf.WebVersion=$webVersion' \
  " \
  go build -ldflags="$ldflags" .

RUN chmod +x alist


# 输出精简镜像
FROM frolvlad/alpine-glibc

WORKDIR /app

COPY --from=builderB /go/src/app/alist /app/
CMD ["./alist", "server"]

VOLUME /app/data/
EXPOSE 5244
