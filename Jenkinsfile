// Jenkinsfile
pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-registry.io'
        APP_NAME = 'tosyeno-web-app'
        HELM_CHART_PATH = './helm'
        KUBECONFIG = credentials('kubeconfig')
        
        // Define deployment environments
        DEV_NAMESPACE = 'development'
        STAGING_NAMESPACE = 'staging'
        PROD_NAMESPACE = 'production'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build and Test') {
            steps {
                script {
                    // Build application (example using Docker)
                    sh """
                        docker build -t ${DOCKER_REGISTRY}/${APP_NAME}:${BUILD_NUMBER} .
                        docker tag ${DOCKER_REGISTRY}/${APP_NAME}:${BUILD_NUMBER} ${DOCKER_REGISTRY}/${APP_NAME}:latest
                    """
                }
            }
        }
        
        stage('Lint Helm Chart') {
            steps {
                sh """
                    helm lint ${HELM_CHART_PATH}
                """
            }
        }
        
        stage('Deploy to Development') {
            steps {
                script {
                    // Update Helm values with new image tag
                    sh """
                        helm upgrade --install ${APP_NAME} ${HELM_CHART_PATH} \
                            --namespace ${DEV_NAMESPACE} \
                            --create-namespace \
                            --set image.tag=${BUILD_NUMBER} \
                            --wait
                    """
                }
            }
        }
        
        stage('Integration Tests') {
            steps {
                script {
                    // Run integration tests against dev environment
                    sh """
                        echo "Running integration tests..."
                        # Add your test commands here
                    """
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Deploy to staging with manual approval
                    timeout(time: 10, unit: 'MINUTES') {
                        input message: 'Deploy to Staging?'
                    }
                    
                    sh """
                        helm upgrade --install ${APP_NAME} ${HELM_CHART_PATH} \
                            --namespace ${STAGING_NAMESPACE} \
                            --create-namespace \
                            --set image.tag=${BUILD_NUMBER} \
                            --wait
                    """
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Deploy to production with manual approval
                    timeout(time: 15, unit: 'MINUTES') {
                        input message: 'Deploy to Production?'
                    }
                    
                    sh """
                        helm upgrade --install ${APP_NAME} ${HELM_CHART_PATH} \
                            --namespace ${PROD_NAMESPACE} \
                            --create-namespace \
                            --set image.tag=${BUILD_NUMBER} \
                            --wait
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check the logs for details."
        }
    }
}