module.exports = {
    routes : [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/apartaments/count',
            handler: 'room-controller.count',
        },
    ]
    
}