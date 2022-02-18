

module.exports = {
    // get ratings and no. of comments?
    async getAll(req, res) {

        console.log('what was searched', req.query);


        try {
            

        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(400)
        }

    },


    async getSingle(req, res) {

        console.log('what was searched', req.query);


        try {
            

        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(400)
        }

    },
}