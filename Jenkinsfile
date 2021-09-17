pipeline {
  agent any 
  
  states {
    stage("build") {
      steps {
        echo 'Hello from build stage'  
      }
    }
    
    stage("test") {
      steps {
        echo 'Hello from test stage'
      }
    }
    
    stage("deploy") {
      steps {
        echo 'Hello from deploy stage'
      }
    }
  }
}
