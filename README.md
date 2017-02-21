# proteccionista.org

# develop

    apt install vagrant
    apt install ruby-dev libffi-dev gcc zlib1g-dev lxc redir
    vagrant plugin install vagrant-lxc

    vagrant up --provider=lxc

    # start server
    vagrant ssh -c "cd /app/repo/ && sudo PORT=80 ENV=development NODE_ENV="development" nodemon /app/repo/bin/www"
    
    # start server on debug mode
    vagrant ssh -c "cd /app/repo/ && sudo PORT=80 ENV=development NODE_ENV="development" nodemon --inspect /app/repo/bin/www"

    # on upgrade codebase, migrate database with
    vagrant ssh -c "cd /app/repo/ && NODE_ENV="$ENV" node_modules/.bin/sequelize db:migrate"

    # revert last database migration
    vagrant ssh -c "cd /app/repo/ && NODE_ENV="$ENV" node_modules/.bin/sequelize db:migrate:undo"

# license

GNU AGPL
