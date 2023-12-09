# 使用 Ubuntu 22.04 作为基础镜像
FROM ubuntu:22.04

# 安装基本工具和依赖项
RUN apt-get update && \
    apt-get install -y \
    curl \
    sudo \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# 设置 root 用户的密码为 'levifree'，并添加sudo权限
RUN echo 'root:levifree' | chpasswd && \
    usermod -aG sudo root

# 启用 SSH 服务
RUN mkdir /var/run/sshd

# 暴露所有端口
EXPOSE 1-65535

# 下载并运行 quick_start.sh 脚本
RUN curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && \
    chmod +x quick_start.sh && \
    ./quick_start.sh

# 启动 SSH 服务
CMD service ssh start
