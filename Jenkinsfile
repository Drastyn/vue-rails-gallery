pipeline {
  agent any 
  
  stages {
    stage("build") {
      steps {
        echo 'Hello from build stage!'
        sh 'eslint --init'
        sh 'npm i'
      }
    }
    stage("run") {
      steps {
        echo 'Hello from run stage!'
        sh 'npm run serve -- --port 4000'
      }
    }
  }
}
