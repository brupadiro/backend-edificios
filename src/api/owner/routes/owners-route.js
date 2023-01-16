module.exports = {
    routes: [
        { // Path defined with an URL parameter
          method: 'POST',
          path: '/owners-controller/register', 
          handler: 'owners-controller.register',
        }
      ]
    
}