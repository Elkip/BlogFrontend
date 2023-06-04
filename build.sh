# Build frontend (Angular)


function buildFrontend() {
  cd ../frontend/dist || exit
  ng build frontend
  tar -cvzf ../../dist/frontend.tgz ./frontend/
}

buildFrontend