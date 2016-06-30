#!groovy

node {

    stage 'checkout repository'
    checkout scm

    stage 'gradle assemble'
    sh 'gradle assemble'

    stage 'gradle run'
    sh 'gradle run'

}
