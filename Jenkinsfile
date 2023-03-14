pipeline {
    agent any

    environment{
        BOT_TOKEN= credentials('telegram_bot_token')
        CHAT_ID= credentials('telegram_chat_id')
    }
    stages {
        stage('start') { 
            steps {
                echo "It starting"
            }
        }
        stage('Deploy') { 
            steps {
               sh 'ssh -o StrictHostKeyChecking=no root@139.162.45.153 " cd /root/Portfolio/api/;\
                git pull;\
                cd ..;\
                docker-compose up -d --build;\
                "'
            }
        }
        stage('end') { 
            steps {
                echo "Ending deploy"
            }
        }
    }
    post{
        success{
            sh '''
            sh 1_success_deploy.sh; \
            '''
        }
        failure{
            sh '''
            sh 1_fail_deploy.sh; \
            '''
        }
    }
}