pipeline {
  agent any 
  
  stages {
    stage("run") {
      steps {
        echo 'Hello from run stage!'
        sh 'npm run serve -- --port 4000'
      }
    }
  }
}
