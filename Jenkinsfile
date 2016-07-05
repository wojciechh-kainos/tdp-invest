#!groovy

node {
    stage 'try to kill server'
    sh 'if value=$(<.pid.lock); ' +
        'then if ps -p $value > /dev/null; then kill -9 $value; ' +
        'rm .pid.lock; fi; fi'

    stage 'checkout'
    checkout scm

    stage 'assemble'
    sh 'gradle assemble'

    stage 'npm install'
    sh 'npm install'

    stage 'bower install'
    sh 'bower install --allow-root'

    stage 'start server'
    sh 'gradle startServer'

}
