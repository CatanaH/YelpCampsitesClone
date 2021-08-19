module.exports = func => {
    return (req, res, next) => {
        console.log('---test-3----')
        func(req, res, next).catch(next);
    }
}