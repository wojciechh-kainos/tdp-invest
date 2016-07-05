#!groovy

node {

    stage 'checkout'
    checkout scm

    stage 'assemble'
    sh 'gradle assemble'

    stage 'npm install'
    sh 'npm install'

    stage 'bower install'
    sh 'bower install --allow-root'

    stage 'stop server'
    sh 'gradle stopServer || echo "server not running"'

    stage 'try to kill server'
    sh ' value=$(<.pid.lock) ' +
            'kill -9 $value '

    stage 'start server'
    sh 'gradle startServer'

}
