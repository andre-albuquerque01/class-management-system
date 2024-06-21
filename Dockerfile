# Usar a imagem base oficial do PHP com FPM e Nginx
FROM php:8.1-fpm

# Instalar as extensões necessárias
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    && docker-php-ext-install -j$(nproc) iconv \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo pdo_mysql \
    && docker-php-ext-install ctype curl dom fileinfo filter hash mbstring openssl pcre xml tokenizer session \
    && apt-get clean

# Copiar o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/sites-available/default

# Configurar o diretório de trabalho
WORKDIR /srv/example.com

# Copiar o código do projeto para o diretório de trabalho
COPY Api/ /srv/example.com

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o PHP-FPM e o Nginx
CMD service php8.1-fpm start && nginx -g 'daemon off;'
