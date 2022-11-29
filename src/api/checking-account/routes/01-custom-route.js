module.exports = {
  routes: [
    { // Path defined with an URL parameter
      method: 'POST',
      path: '/checking-accounts/deleteMultiple', 
      handler: 'checking-account.deleteMultiple',
    }
  ]
}
 
