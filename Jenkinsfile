#!groovy

node {

    stage 'checkout repository'
    checkout scm

    stage 'gradle assemble'
    sh 'gradle assemble'

    stage 'kill application'
    sh 'lsof -i :8888 | grep java | sed \'s/java    \\([0-9]*\\).*/\\1/g\' | xargs kill -9 || echo \'Application not running\''

    stage 'gradle run'
    sh 'gradle run &'

}
