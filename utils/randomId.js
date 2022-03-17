async function randomId (length) {
    if (!length) return console.log("!!! [PROCESS] (Generate Id) Error :: No length was provided for the ID you wish to be generated. !!!")
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var random_string = '';

    for (var i = 0; i < length; i++) {
        random_string += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return random_string
}

module.exports = randomId