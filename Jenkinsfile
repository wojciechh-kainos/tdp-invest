#!groovy

node {

    stage 'checkout'
    checkout scm

    stage 'assemble'
    sh 'gradle assemble'

    stage 'stop server'
    sh 'gradle stopServer || echo "server not running"'

    stage 'start server'
    sh 'gradle startServer'

}
