# 使用 Ubuntu 22.04 作为基础镜像
FROM ubuntu:22.04

# 安装基本工具和依赖项
RUN apt-get update && \
    apt-get install -y \
    curl \
    wget \
    nano \
    sudo \
    screen \
    git \
    neofetch \
    openssh-server \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# 安装 Shellinabox
RUN apt-get update && \
    apt-get install -y shellinabox && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# 安装面板服务（这里使用 curl 安装 quick_start.sh 脚本）
RUN curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && \
    sudo bash quick_start.sh && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    rm quick_start.sh

# 设置 root 用户的密码为 'levifree'，并添加sudo权限
RUN echo 'root:levifree' | chpasswd && \
    usermod -aG sudo root

# 启用 SSH 服务
RUN mkdir /var/run/sshd

# 暴露 22 端口（用于 SSH）
EXPOSE 22

# 暴露 Shellinabox 端口（默认是 4200）
EXPOSE 4200

# 暴露面板服务的端口（假设是 8080）
EXPOSE 8080

# 启动 SSH 服务、Shellinabox 和面板服务
CMD service ssh start && /usr/bin/shellinaboxd -t -s "/:LOGIN" && service panel-service start
