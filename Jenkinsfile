#!groovy

node {
    stage 'try to kill server'
    sh 'if value=$(<.pid.lock); ' +
        'then kill -9 $value; fi'

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
