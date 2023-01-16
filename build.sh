# Build and Package the backend (Ktor) and frontend (Angular)

function buildBackend() {
  cd backend || exit
  ./gradlew clean build tgz
  cp dist/backend.tgz ../dist
}

function buildFrontend() {
  cd ../frontend/dist || exit
  ng build frontend
  tar -cvzf ../../dist/frontend.tgz ./frontend/
}

buildBackend
buildFrontend
#scp dist/backend.tgz unraid:/tmp/