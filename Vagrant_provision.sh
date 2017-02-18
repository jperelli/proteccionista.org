#!/bin/bash

if [ -z "$ENV" ]; then
  echo "WARN: ENV empty, using 'development'"
  ENV=development
fi

if [ "$ENV" != "development" -a "$ENV" != "production" ]; then
  echo "ERROR: ENV var should be 'development' or 'production' (or empty='production')"
  exit 1
fi

NODE_ENV="$ENV"

DB_NAME="proteccionista_$ENV"

# set variables
APP_PATH="/app"
REPO="$APP_PATH/repo"

# exit if some command fails
set -ex

# use postgresl 9.6 official repo Packages
echo "deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main" > /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# add latest nodejs 6.x.x ppa
wget https://deb.nodesource.com/setup_6.x -O- | sudo bash

# Install base packages
apt -y install nodejs postgresql-9.6 postgresql-client

# Configure pgsql
echo "local all postgres trust" > /etc/postgresql/9.6/main/pg_hba.conf
echo "host all postgres 127.0.0.1/32 trust" >> /etc/postgresql/9.6/main/pg_hba.conf
service postgresql restart

# create database
set +e
su postgres -c "createdb $DB_NAME"
set -e

# Install base app packages
(cd /app/repo && npm install --verbose)

## run migrations
(cd /app/repo/ && node_modules/.bin/sequelize db:migrate)

## add a user maybe?
#echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'admin')" | $MANAGE shell ; true


if [ "$ENV" == "development" ]; then
  npm install -g nodemon
fi


if [ "$ENV" == "production" ]; then
  apt -y install nginx

  cat > /etc/nginx/sites-enabled/default <<HEREDOC
server {
        server_name _;
        listen   80;

        access_log  /var/log/nginx/app_access.log;
        error_log   /var/log/nginx/app_error.log;

        location / {
                proxy_set_header X-Real-IP \$remote_addr;
                proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
                proxy_set_header Host \$http_host;
                proxy_pass http://127.0.0.1:3000/;
        }
}
HEREDOC

  cat > /etc/systemd/system/node-proteccionista.service <<HEREDOC
[Service]
ExecStart=/app/repo/bin/www
Restart=always
Environment=NODE_ENV=development
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=node-proteccionista

[Install]
WantedBy=multi-user.target
HEREDOC

  systemctl enable node-proteccionista.service

  service nginx restart
  service node-proteccionista restart
fi
